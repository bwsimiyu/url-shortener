const Express = require('express');
const cors = require('cors');
const shortid = require('shortid');
const bodyParser = require('body-parser');

const app = Express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res, next) => {
    res.json({
        description: 'URL Shortening API',
        version: '1.0.0'
    });
});
app.post('/api/v1/shorten', (req, res, next) => {
    const { url } = req.body;
    const urlId = shortid.generate();
    // Example base
    const base = 'short.io';
    res.json({
        original: url,
        short: `${base}/${urlId}`
    });
});

const PORT = 4000;
app.listen(PORT, () => {
    console.log(`App running at PORT ${PORT}`);
});
