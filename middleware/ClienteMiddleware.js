const Cliente = require('../model/Cliente');

module.exports = class ClienteMiddleware {
    validar_NomeCliente(request, response, next) {
        const nomeCliente = request.body.nome_cliente;
        if (nomeCliente == "" || nomeCliente.lenght < 3) {
            const objResposta = {
                status: false,
                msg: "O nome não pode ser vazio ou menor que 3 caracteres!"
            }
            response.status(200).send(objResposta);
        } else {
            next();
        }
    }

    validar_pedido_cliente(request,response,next) {
        const pedidoCliente = request.body.pedido_cliente;
        if (pedidoCliente == "") {
            const objResposta = {
                status: false,
                msg: "Digite pedido válido!"
            }
            response.status(200).send(objResposta);
        } else {
            next();
        }
    }

    async existe_NomeCliente_cadastrado(request, response, next) {
        const nomeCliente = request.body.nome_cliente;

        const objCliente = new Cliente();
        objCliente.nome_cliente = nomeCliente;

        const clienteExiste = await objCliente.isCliente();

        if (clienteExiste) {
            const objResposta = {
                status: false,
                msg: "Cliente já cadastrado!"
            }
            response.status(200).send(objResposta);
        } else {
            next();
        }
    }
}