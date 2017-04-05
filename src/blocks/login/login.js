import template from './login.xml.js';
import User from '../../models/user';

export default class Login {
    constructor(node) {
        this.node = node;
        this.render();
        this.cache();
        this.events();
        this.initForm();
    }

    render() {
        this.node.innerHTML = template({
            texts: {
                login: 'Login',
                password: 'Password'
            }
        });
    }

    show() {
        this.node.hidden = false;
    }

    hide() {
        this.node.hidden = true;
    }

    cache() {
        this.form = document.forms.formLogin;
    }

    events() {
        this.form.addEventListener('submit', this.submit.bind(this));
    }

    initForm() {
        this.node.hidden = true;
        this.model = new User(this.form.getAttribute('action'));
    }

    submit(ev) {
        const form = ev.target;

        ev.preventDefault();

        this.model.login(form.login.value, form.password.value)
            .then((response) => {
                alert(response.message);
            }, (error) => {
                alert(`${error.status}: ${error.statusText}`);
            });
    }
}
