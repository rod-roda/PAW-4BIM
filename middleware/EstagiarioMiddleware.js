const Estagiario = require('../model/Estagiario');

module.exports = class EstagiarioMiddleware {
    validar_nome_estagiario(request, response, next) {
        const nomeEstagiario = request.body.nome_estagiario;
        if (nomeEstagiario == "") {
            const objResposta = {
                status: false,
                msg: "Digite nome válido!"
            }
            response.status(200).send(objResposta);
        } else {
            next();
        }
    }

    validar_data_nascimento(request, response, next) {
        const dataNascimento = request.body.data_nascimento;
        if (dataNascimento == "") {
            const objResposta = {
                status: false,
                msg: "Digite data de nascimento válida!"
            }
            response.status(200).send(objResposta)
        } else {
            next();
        }
    }

    validar_telefone(request, response, next) {
        const telefone = request.body.telefone;
        if (telefone == "") {
            const objResposta = {
                status: false,
                msg: "Digite telefone válido!"
            }
            response.status(200).send(objResposta);
        } else {
            next();
        }
    }

    validar_email(request, response, next) {
        const email = request.body.email;
        if (email == "") {
            const objResposta = {
                status: false,
                msg: "Digite E-mail válido"
            }
            response.status(200).send(objResposta);
        } else {
            next();
        }
    }

    validar_id_empresa(request, response, next) {
        const id_empresa = request.body.id_empresa;
        if (id_empresa == "" || isNaN(id_empresa)) {
            const objResposta = {
                status: false,
                msg: "Digite ID válido!"
            }
            response.status(200).send(objResposta);
        } else {
            next();
        }
    }

    async existe_estagiario_cadastrado(request, response, next) {
        const nome = request.body.nome_estagiario;
        const email = request.body.email;
        const telefone = request.body.telefone;

        const objEstagiario = new Estagiario();
        objEstagiario.nome_estagiario = nome;
        objEstagiario.email = email;
        objEstagiario.telefone = telefone;

        const estagiarioExiste = await objEstagiario.isEstagiario();

        if (estagiarioExiste) {
            const objResposta = {
                status: false,
                msg: "Estagiário já cadastrado!"
            }
            response.status(200).send(objResposta);
        } else {
            next();
        }
    }
}