if('serviceWorker' in navigator) {
    navigator.serviceWorker
        .register('sw.js')
        .then(() => console.log('Server Worker Registered'))
        .catch(err => console.log(err));
}
