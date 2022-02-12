export const setUrl = (payload: object) => {
    let urls: any = localStorage.getItem('urls');
    if (Boolean(urls)) {
        let old = JSON.parse(urls);
        old.unshift(payload);
        localStorage.setItem('urls', JSON.stringify(old));
    } else {
        localStorage.setItem('urls', JSON.stringify([payload]));
    }
}

export const getUrls = (): any[] => {
    let urls: any = localStorage.getItem('urls');
    if (Boolean(urls)) return JSON.parse(urls);
    return [];
}
