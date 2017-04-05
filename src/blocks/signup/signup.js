import template from './signup.xml.js';
import User from '../../models/user';

export default class Signup {
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
                password: 'Password',
                email: 'Email'
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
        this.form = document.forms.formSingup;
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

        this.model.signup(form.login.value, form.password.value, form.email.value)
            .then((response) => {
                alert(response.message);
            }, (error) => {
                alert(`${error.status}: ${error.statusText}`);
            });
    }
}
