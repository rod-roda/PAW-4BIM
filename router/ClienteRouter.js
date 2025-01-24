const express = require('express');
const ClienteControl = require('../controller/ClienteControl');
const ClienteMiddleware = require('../middleware/ClienteMiddleware')

module.exports = class ClienteRouter {
    constructor() {
        this._router = express.Router();
        this._clienteControl = new ClienteControl();
        this._clienteMiddleware = new ClienteMiddleware();
    }

    criarRotasCliente() {
        this._router.get('/',
            //chamar funcao readAll()
            this._clienteControl.cliente_read_all_control,
        );

        this._router.get('/:id',
            //chamar funcao readById
            this._clienteControl.cliente_read_by_id_control
        );

        this._router.post('/',
            //fazer verificacao usando middleware *quantas forem necessarias
            //chamar funcao create
            this._clienteMiddleware.validar_NomeCliente,
            this._clienteMiddleware.validar_pedido_cliente,
            this._clienteMiddleware.existe_NomeCliente_cadastrado,
            this._clienteControl.cliente_create_control
        );

        this._router.delete('/:id',
            //chamar funcao delete
            this._clienteControl.cliente_delete_control
        );

        this._router.put('/:id',
            //chamar funcao update
            this._clienteMiddleware.validar_NomeCliente,
            this._clienteMiddleware.validar_pedido_cliente,
            this._clienteControl.cliente_update_control
        );

        return this._router;
    }
}