import * as axios from 'axios';
const Axios = axios.default

export function shortenUrl(url: string) {
    return Axios.post(process.env.REACT_APP_API_URL + '/shorten', {
        url
    });
}