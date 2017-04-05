import Model from './model';

export default class User extends Model {
    login(login, password) {
        return this.send('POST', {
            login,
            password
        });
    }

    signup(login, password, email) {
        return this.send('POST', {
            login,
            password,
            email
        });
    }
}
