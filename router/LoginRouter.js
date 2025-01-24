const express = require('express');
const LoginControl = require('../controller/LoginControl');

module.exports = class LoginRouter {
    constructor() {
        this._router = express.Router();
        this._loginControl = new LoginControl();
    }

    criarRotasLogin() {
        this._router.get('/',
            this._loginControl.login_read_all_control
        );

        this._router.get('/:id',
            this._loginControl.login_read_by_id_control
        );

        this._router.post('/',
            this._loginControl.login_create_control
        );
        
        this._router.delete('/:id',
            this._loginControl.login_delete_control
        );

        this._router.put('/:id',
            this._loginControl.login_update_control
        );

        return this._router;
    }
}