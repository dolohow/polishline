function debounce(callback, timeout) {
    let timerId = null;
    return function() {
        clearTimeout(timerId);
        timerId = setTimeout(callback, timeout);
    }
}


export { debounce };