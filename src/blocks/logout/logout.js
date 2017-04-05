import template from './logout.xml.js';
import Cookies from 'js-cookie';

export default class Logout {
    constructor(node) {
        this.node = node;
        this.render();
    }

    show() {
        Cookies.remove('user');
        document.location = '/';
    }

    render() {
        this.node.innerHTML = template();
    }
}
