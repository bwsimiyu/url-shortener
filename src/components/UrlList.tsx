import { Box } from '@mui/system';
import * as React from 'react';

export interface URL {
    original: string;
    shortened: string;
}
interface State {
    urls: URL[]
}

export function UrlListComponent () {
    const [urls, setUrls] = React.useState<State>({
        urls: []
    })
    return (
        <Box minWidth="50%">
        </Box>
    )
}