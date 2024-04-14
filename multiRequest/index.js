const concurrency = async (urls, limit) => {
    const urlPool = urls;
    const res = [];
    while(urlPool.length) {
        const requests = urlPool.slice(0, limit);
        res.push(...await Promise.all(wrapUrlPormise(requests)));

        urlPool = urlPool.splice(limit);
    }
}


const wrapUrlPormise = (urls) => {
    return urls.map((u) => {
        return fetch(u)
    })
}