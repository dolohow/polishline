function debounce(callback, timeout) {
    let timerId = null;
    return function(args) {
        clearTimeout(timerId);
        timerId = setTimeout(callback.bind(this, args), timeout);
    }
}

function getThumbnailUrlFromFullUrl(imageUrl) {
    const extension = imageUrl.substr(imageUrl.lastIndexOf('.'))
    return imageUrl.substr(0, imageUrl.lastIndexOf('.')) + '-150x150' + extension;
}


export { debounce, getThumbnailUrlFromFullUrl };