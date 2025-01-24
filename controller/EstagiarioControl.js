const express = require('express');
const Estagiario = require('../model/Estagiario');
const MeuTokenJWT = require('../model/MeuTokenJWT');

module.exports = class EstagiarioControl {

    async estagiario_create_control(request,response) {
        const token = request.headers['authorization'];
        const JWT = new MeuTokenJWT();
        
        if (await JWT.validarToken(token)){
            var estagiario = new Estagiario();
            estagiario.nome_estagiario = request.body.nome_estagiario;
            estagiario.data_nascimento = request.body.data_nascimento;
            estagiario.telefone = request.body.telefone;
            estagiario.email = request.body.email;
            estagiario.id_empresa = request.body.id_empresa;
            const isCreated = await estagiario.create();
    
            const objResposta = {
                cod : isCreated ? 1 : 2,
                status : isCreated,
                msg : isCreated ? "Estagiário cadastrado com sucesso!" : "Erro ao cadastrar estagiário!"
            };
            response.status(200).send(objResposta);
        }else {
            const objResposta = {
                cod: 3,
                status: false,
                msg: 'Token inválido!'
            };
            response.status(401).send(objResposta); // Código de erro 401 para não autorizado
        }
        
    }

    async estagiario_delete_control(request,response) {
        const token = request.headers['authorization'];
        const JWT = new MeuTokenJWT();
        
        if (await JWT.validarToken(token)){
            var estagiario = new Estagiario();
            estagiario.id_estagiario = request.params.id;
            const isDeleted = await estagiario.delete();
    
            const objResposta = {
                cod : isDeleted ? 1 : 2,
                status : isDeleted,
                msg : isDeleted ? "Estagiário deletado com sucesso!" : "Erro ao deletar estagiário!"
            };
            response.status(200).send(objResposta);
        }else {
            const objResposta = {
                cod: 3,
                status: false,
                msg: 'Token inválido!'
            };
            response.status(401).send(objResposta); // Código de erro 401 para não autorizado
        }
        
    }

    async estagiario_update_control(request,response) {
        const token = request.headers['authorization'];
        const JWT = new MeuTokenJWT();
        
        if (await JWT.validarToken(token)){
            var estagiario = new Estagiario();
            estagiario.id_estagiario = request.params.id;
            estagiario.nome_estagiario = request.body.nome_estagiario;
            estagiario.data_nascimento = request.body.data_nascimento;
            estagiario.telefone = request.body.telefone;
            estagiario.email = request.body.email;
            const isUpdated = await estagiario.update();
    
            const objResposta = {
                cod : isUpdated ? 1 : 2,
                status : isUpdated,
                msg : isUpdated ? "Estagiário atualizado com sucesso!" : "Erro ao atualizar estagiário!"
            };
            response.status(200).send(objResposta);
        }else {
            const objResposta = {
                cod: 3,
                status: false,
                msg: 'Token inválido!'
            };
            response.status(401).send(objResposta); // Código de erro 401 para não autorizado
        }
        
    }

    async estagiario_read_all_control(request,response) {
        const token = request.headers['authorization'];
        const JWT = new MeuTokenJWT();
        
        if (await JWT.validarToken(token)){
            var estagiario = new Estagiario();
            const resultado = await estagiario.readAll();
    
            const objResposta = {
                cod : resultado == [] ? 2 : 1,
                status : true,
                msg : "Executado com sucesso!",
                estagiarios : resultado
            };
            response.status(200).send(objResposta);
        }else {
            const objResposta = {
                cod: 3,
                status: false,
                msg: 'Token inválido!'
            };
            response.status(401).send(objResposta); // Código de erro 401 para não autorizado
        }
        
    }

    async estagiario_read_by_id_control(request,response) {
        const token = request.headers['authorization'];
        const JWT = new MeuTokenJWT();
        
        if (await JWT.validarToken(token)){
            var estagiario = new Estagiario();
            estagiario.id_estagiario = request.params.id;
            const resultado = await estagiario.readById();
    
            const objResposta = {
                cod : resultado == false ? 2 : 1,
                status : resultado == false ? false : true,
                msg : resultado == false ? "Estagiário não encontrado!" : "Estagiário encontrado!",
                estagiario : resultado
            };
            response.status(200).send(objResposta);
        }else {
            const objResposta = {
                cod: 3,
                status: false,
                msg: 'Token inválido!'
            };
            response.status(401).send(objResposta); // Código de erro 401 para não autorizado
        }
    }
}