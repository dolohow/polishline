function debounce(callback, timeout) {
    let timerId = null;
    return function(args) {
        clearTimeout(timerId);
        timerId = setTimeout(callback.bind(this, args), timeout);
    }
}


export { debounce };