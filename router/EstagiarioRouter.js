const express = require('express');
const EstagiarioControl = require('../controller/EstagiarioControl')
const EstagiarioMiddleware = require('../middleware/EstagiarioMiddleware');

module.exports = class EstagiarioRouter {
    constructor() {
        this._router = express.Router();
        this._estagiarioControl = new EstagiarioControl();
        this._estagiarioMiddleware = new EstagiarioMiddleware();
    }

    criarRotasEstagiario() {
        this._router.get('/',
            this._estagiarioControl.estagiario_read_all_control
        );

        this._router.get('/:id',
            this._estagiarioControl.estagiario_read_by_id_control
        );

        this._router.post('/',
            this._estagiarioMiddleware.validar_nome_estagiario,
            this._estagiarioMiddleware.validar_data_nascimento,
            this._estagiarioMiddleware.validar_telefone,
            this._estagiarioMiddleware.validar_email,
            this._estagiarioMiddleware.validar_id_empresa,
            this._estagiarioMiddleware.existe_estagiario_cadastrado,
            this._estagiarioControl.estagiario_create_control
        );

        this._router.delete('/:id',
            this._estagiarioControl.estagiario_delete_control
        );

        this._router.put('/:id',
            this._estagiarioMiddleware.validar_nome_estagiario,
            this._estagiarioMiddleware.validar_data_nascimento,
            this._estagiarioMiddleware.validar_telefone,
            this._estagiarioMiddleware.validar_email,
            this._estagiarioControl.estagiario_update_control
        );

        return this._router;
    }
}