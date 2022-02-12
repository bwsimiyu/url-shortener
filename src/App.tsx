import * as React from 'react';
import { Alert, Button, Card, CardContent, FormControl, Grid, IconButton, InputAdornment, InputLabel, List, ListItem, ListItemText, OutlinedInput, Snackbar, Typography, } from "@mui/material";
import { ContentCopy } from "@mui/icons-material";
import { shortenUrl } from './services/UrlService';
import { setUrl, getUrls } from './services/StoreService';
import { validUrl } from './shared/Validators';
import { copyToClipboard } from './shared/Utils';
import "./App.css";

interface State {
  url: string;
  loading: boolean;
}

function App() {
  const [formValue, setFormValue] = React.useState<State>({
    url: "",
    loading: false,
  });
  const [myURLs, setMyURLs] = React.useState<any> (getUrls());
  const handleFormChange = (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormValue({
      ...formValue,
      [prop]: event.target.value,
    });
  };
  const handleLoading = (): void => {
    setFormValue({
      ...formValue,
      loading: !formValue.loading,
    });
  };
  const onShoten = (): void => {
    handleLoading();
    shortenUrl(formValue.url).then(res => {
      setUrl(res.data);
      alert('URL Shortened successsfully')
    }).catch(error => {
      alert('An Error Occured')
    }).finally(() => {
      handleLoading();
      setMyURLs(getUrls);
      setFormValue({ ...formValue, url: "" });
    });
  };
  const MyURLs = myURLs.map((url: any, index: number) => {
    return (
      <ListItem
        key={index}
        secondaryAction={
          <IconButton edge="end" aria-label="copy" onClick={() => copyToClipboard(url.short)}>
            <ContentCopy />
          </IconButton>
        }
      >
        <ListItemText
          primary={
            <span>
              {index + 1}.&nbsp;
              <a href={url.short} target="_blank" rel="noreferrer">{url.short}</a>
            </span>
          }
          secondary={
            <span>
              Original:&nbsp;
              <a href={url.original} target="_blank" rel="noreferrer">{url.original}</a>
            </span>
          }
        />
      </ListItem>
    )}
  );
  return (
    <div className="app">
      <header className="app-header">
        <span>My URL Shortener</span>
      </header>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        style={{ padding: '2%', minHeight: '40vh' }}
      >
        <FormControl sx={{ minWidth: 200, width: 500, m: 1 }} variant="outlined">
          <InputLabel htmlFor="url-form-fild">{!validUrl(formValue.url) ? "Enter a valid URL" : "Enter URL"}</InputLabel>
          <OutlinedInput
            id="url-form-fild"
            value={formValue.url}
            onChange={handleFormChange("url")}
            error={!validUrl(formValue.url)}
            label="Enter URL"
          />
        </FormControl>
        <Button
          variant="contained"
          aria-label="submit-button"
          onClick={() => onShoten()}
          style={{ marginRight: '2%' }}
          disabled={!validUrl(formValue.url)}
        >
          Shorten URL
        </Button>
        <Card sx={{ minWidth: 200 }}>
          <CardContent>
            <Typography variant="h5" component="div">
              My Shortened URLs
            </Typography>
            {
              myURLs.length ?
              <List sx={{ width: '100%' }}>
                {MyURLs}
              </List> :
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                No URLs
              </Typography>
            }

          </CardContent>
        </Card>
      </Grid>
    </div>
  );
}

export default App;
