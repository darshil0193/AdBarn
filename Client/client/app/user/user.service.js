export default class loginService {

    constructor($http) {
        this.http = $http;
        this.message = 'there';
        this.signIn = {
            email: '',
            password: '',
            forgotPassword: false
        };
    }

    doLogin() {
        return this.http.post('/loginwhatever').then((response) => {
        }).catch((response) => {
        });
    }

    addComment(obj) {
        return this.http.post('https://ad-barn-backend.herokuapp.com/user/comments', obj);
    }

    getUserCoins(username) {
        return this.http.get(`https://ad-barn-backend.herokuapp.com/user/coins/${username}`);
    }

    claimCoins(username) {
        return this.http.post('https://ad-barn-backend.herokuapp.com/user/redeem/', {username:username});
    }

    getViewedHistory(id) {
        return this/http/get(`https://ad-barn-backend.herokuapp.com/user/history/${id}`);
    }

    getAllUserInfo(id) {
        return this.http.get(`https://ad-barn-backend.herokuapp.com/user/getAllUserInfo/${id}`);
    }
}

loginService.$inject = ['$http'];
