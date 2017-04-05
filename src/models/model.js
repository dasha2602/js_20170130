export default class Model {
    constructor(url) {
        this.url = url;
    }

    send(method, params) {
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            const data = JSON.stringify(params);

            xhr.open(method, this.url, true);
            xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');

            xhr.addEventListener('readystatechange', (event) => {
                const target = event.target;

                if (target.readyState !== XMLHttpRequest.DONE) {
                    return;
                }

                if (target.status !== 200) {
                    reject(target);
                } else {
                    this.success(target, resolve);
                }
            });

            xhr.send(data);
        });
    }

    success(data, callback) {
        const response = JSON.parse(data.responseText);

        callback(response);

        if (response.status === 'success') {
            const event = new CustomEvent('user.login');
            document.body.dispatchEvent(event);
        }
    }
}
