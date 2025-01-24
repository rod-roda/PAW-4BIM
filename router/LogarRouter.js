const express = require('express');
const LogarControl = require('../controller/LogarControl');

module.exports = class LogarRouter {
    constructor() {
        this._router = express.Router();
        this._logarControl = new LogarControl();
    }

    criarRotasLogar() {
        this._router.post('/',
            this._logarControl.logar_control
        );

        return this._router;
    }
}