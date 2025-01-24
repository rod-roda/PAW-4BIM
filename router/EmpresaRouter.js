const express = require('express');
const EmpresaControl = require('../controller/EmpresaControl');
const EmpresaMiddleware = require('../middleware/EmpresaMiddleware');

module.exports = class EmpresaRouter {
    constructor() {
        this._router = express.Router();
        this._empresaControl = new EmpresaControl();
        this._empresaMiddleware = new EmpresaMiddleware();
       }

    criarRotasEmpresa() {
        this._router.get('/',
            //chamar funcao readAll()
            this._empresaControl.empresa_read_all_control
        );

        this._router.get('/:id',
            //chamar funcao readById
            this._empresaControl.empresa_read_by_id_control
        );

        this._router.post('/',
            //chamar funcao create
            this._empresaMiddleware.validar_nome_empresa,
            this._empresaMiddleware.validar_cnpj_empresa,
            this._empresaMiddleware.existe_empresa_cadastrada,
            this._empresaControl.empresa_create_control
        );

        this._router.delete('/:id',
            //chamar funcao delete
            this._empresaControl.empresa_delete_control
        );

        this._router.put('/:id',
            //chamar funcao update
            this._empresaMiddleware.validar_nome_empresa,
            this._empresaMiddleware.validar_cnpj_empresa,
            this._empresaControl.empresa_update_control
        );

        return this._router;
    }
}