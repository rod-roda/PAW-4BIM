const express = require('express');
const Cliente = require('../model/Cliente');
const MeuTokenJWT = require('../model/MeuTokenJWT');

module.exports = class ClienteControl {

    async cliente_create_control(request, response) {
        const token = request.headers['authorization'];
        const JWT = new MeuTokenJWT();

        if (await JWT.validarToken(token)) {
            const cliente = new Cliente();
            cliente.nome_cliente = request.body.nome_cliente;
            cliente.pedido_cliente = request.body.pedido_cliente;
            // Verificando se as propriedades estão definidas
            if (!request.body.nome_cliente || !request.body.pedido_cliente) {
                return response.status(400).send({
                    cod: 2,
                    status: false,
                    msg: 'Nome do cliente e pedido são obrigatórios!'
                });
            }

            const isCreated = await cliente.create();

            if (isCreated) {
                const objResposta = {
                    cod: 1,
                    status: isCreated,
                    msg: 'Cliente criado com sucesso!'
                };
                response.status(200).send(objResposta);
            } else {
                const objResposta = {
                    cod: 2,
                    status: isCreated,
                    msg: 'Erro ao criar cliente'
                };
                response.status(500).send(objResposta); // Código de erro 500 para erro interno
            }
        } else {
            const objResposta = {
                cod: 3,
                status: false,
                msg: 'Token inválido!'
            };
            response.status(401).send(objResposta); // Código de erro 401 para não autorizado
        }
    }


    async cliente_delete_control(request, response) {
        const token = request.headers['authorization'];
        const JWT = new MeuTokenJWT();

        if (await JWT.validarToken(token)) {
            var cliente = new Cliente();
            cliente.id_cliente = request.params.id;
            const isDeleted = await cliente.delete();

            const objResposta = {
                cod: isDeleted ? 1 : 2,
                status: isDeleted,
                msg: isDeleted ? 'Cliente excluído com sucesso!' : 'Erro ao excluir cliente'
            };
            response.status(200).send(objResposta);
        } else {
            const objResposta = {
                cod: 3,
                status: false,
                msg: 'Token inválido!'
            };
            response.status(401).send(objResposta); // Código de erro 401 para não autorizado
        }

    }

    async cliente_update_control(request, response) {
        const token = request.headers['authorization'];
        const JWT = new MeuTokenJWT();

        if (await JWT.validarToken(token)) {
            var cliente = new Cliente();
            cliente.id_cliente = request.params.id;
            cliente.nome_cliente = request.body.nome_cliente;
            cliente.pedido_cliente = request.body.pedido_cliente;
            const isUpdated = await cliente.update();

            const objResposta = {
                cod: isUpdated ? 1 : 2,
                status: isUpdated,
                msg: isUpdated ? 'Cliente atualizado com sucesso!' : 'Erro ao atualizar cliente'
            };
            response.status(200).send(objResposta);
        } else {
            const objResposta = {
                cod: 3,
                status: false,
                msg: 'Token inválido!'
            };
            response.status(401).send(objResposta); // Código de erro 401 para não autorizado
        }

    }
    
    async cliente_read_all_control(request, response) {
        const token = request.headers['authorization'];
        const JWT = new MeuTokenJWT();
        
        if (await JWT.validarToken(token)){
            var cliente = new Cliente();
            const resultado = await cliente.readAll();
            
            const objResposta = {
                cod : resultado == [] ? 2 : 1,
                status : true,
                msg : "Executado com sucesso",
                clientes : resultado
            };
            response.status(200).send(objResposta);
        }else{
            const objResposta = {
                cod: 3,
                status: false,
                msg: 'Token inválido!'
            };
            response.status(401).send(objResposta); // Código de erro 401 para não autorizado
        } 
    }

    async cliente_read_by_id_control(request, response) {
        const token = request.headers['authorization'];
        const JWT = new MeuTokenJWT();

        if (await JWT.validarToken(token)) {
            var cliente = new Cliente();
            cliente.id_cliente = request.params.id;
            const resultado = await cliente.readById();

            const objResposta = {
                cod: resultado == null ? 2 : 1,
                status: true,
                msg: resultado ? 'Cliente encontrado' : 'Cliente não encontrado',
                cliente: resultado
            };
            response.status(200).send(objResposta);
        } else {
            const objResposta = {
                cod: 3,
                status: false,
                msg: 'Token inválido!'
            };
            response.status(401).send(objResposta); // Código de erro 401 para não autorizado
        }
    }
}