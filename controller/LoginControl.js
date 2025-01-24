const express = require('express');
const Login = require('../model/Login');


module.exports = class LoginControl {
    
    async login_create_control(request,response) {
        var login = new Login();
        login.usuario = request.body.usuario;
        login.senha = request.body.senha;
        const isCreated = await login.create();

        const objResposta = {
            cod : isCreated ? 1 : 2,
            status : isCreated,
            msg : isCreated ? "Login cadastrado com sucesso!" : "Erro ao cadastrar login!"
        };
        response.status(200).send(objResposta);
    }

    async login_delete_control(request,response) {
        var login = new Login();
        login.id_usuario = request.params.id;
        const isDeleted = await login.delete();

        const objResposta = {
            cod : isDeleted ? 1 : 2,
            status : isDeleted,
            msg : isDeleted ? "Login deletado com sucesso!" : 
            "Erro ao excluir login!"
        }
        response.status(200).send(objResposta);
    }

    async login_update_control(request,response) {
        var login = new Login();
        login.id_usuario = request.params.id;
        login.usuario = request.body.usuario;
        login.senha = request.body.senha;
        const isUpdated = await login.update();

        const objResposta = {
            cod : isUpdated ? 1 : 2,
            status : isUpdated,
            msg : isUpdated ? "Login atualizado com sucesso!" : "Erro ao atualizar login!"
        };
        response.status(200).send(objResposta);
    }

    async login_read_all_control(request,response) {
        var login = new Login();
        const resultado = await login.readAll();

        const objResposta = {
            cod : resultado == [] ? 2 : 1,
            status : true,
            msg : "Executado com sucesso!",
            login : resultado
        };
        response.status(200).send(objResposta);
    }

    async login_read_by_id_control(request,response) {
        var login = new Login();
        login.id_usuario = request.params.id;
        const resultado = await login.readById();

        const objResposta = {
            cod : resultado == false ? 2 : 1,
            status : resultado == false ? false : true,
            msg : resultado == false ? "Login não encontrado!" : "Login encontrado!",
            login : resultado
        };
        response.status(200).send(objResposta);
    }
}