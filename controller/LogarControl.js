const express = require('express');
const Logar = require('../model/Logar');
const MeuTokenJWT = require('../model/MeuTokenJWT');

module.exports = class LogarControl { 

    async logar_control(request, response) {
        var logar = new Logar();
        logar.usuario = request.body.usuario;
        logar.senha = request.body.senha;
    
        try {
            const autenticado = await logar.logar(); // Use await aqui
            let objResposta;
    
            if (autenticado) {
                var token = new MeuTokenJWT();
                var claims = {
                    usuario: logar.usuario
                };
                var Token = token.gerarToken(claims);
    
                objResposta = {
                    cod: 1,
                    status: true,
                    msg: "Logado com sucesso!",
                    token: Token
                };
            } else {
                objResposta = {
                    cod: 2,
                    status: false,
                    msg: "Usuário ou senha incorretos!"
                };
            }
            response.status(200).send(objResposta);
    
        } catch (error) {
            console.error("Erro ao logar:", error);
            response.status(500).send({
                cod: 3,
                status: false,
                msg: "Erro interno ao logar"
            });
        }
    }
    
}


