export default class Router {
    constructor(node) {
        this.node = node;
        this.routes = {};
        this.current = null;
    }

    /**
     * Метод регестрирует новое view
     * @param {string} route
     * @param {Object} view
     */
    register(route, view) {
        this.routes[route] = view;
    }

    start() {
        this.node
            .addEventListener('click', event => this.onRouteChange(event));
    }

    events() {
        document.body.addEventListener('user.login', () => {
            document.querySelector('.js-login-view').innerHTML = '';
            document.querySelector('.js-signup-view').innerHTML = '';

            // const logout = new Logout(document.querySelector('.js-logout-view'));
            // initNotesList();
        });
    }

    _getRouteByPath(path) {
        return this.routes[path];
    }

    go(path) {
        if (this.current) {
            this.current.hide();
        }

        this.current = this._getRouteByPath(path);
        this.current.show();

        window.history.pushState({ page: 1 }, 'Title', path);
    }

    onRouteChange(event) {
        if (!(event.target instanceof HTMLAnchorElement)) {
            return;
        }

        this.go(event.target.getAttribute('href'));
        event.preventDefault();
    }

}
