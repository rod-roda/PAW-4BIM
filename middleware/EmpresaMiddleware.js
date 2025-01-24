const Empresa = require('../model/Empresa');

module.exports = class EmpresaMiddleware {
    validar_nome_empresa(request, response, next) {
        const nomeEmpresa = request.body.nome_empresa;
        if (nomeEmpresa == "" || nomeEmpresa.lenght < 3) {
            const objResposta = {
                status: false,
                msg: "O nome não pode ser vazio ou menor que 3 caracteres!"
            }
            response.status(200).send(objResposta);
        } else {
            next();
        }
    }

    validar_cnpj_empresa(request, response, next) {
        const cnpj_empresa = request.body.cnpj;
        if (cnpj_empresa == "") {
            const objResposta = {
                status: false,
                msg: "CNPJ inválido! Digite corretamente!"
            }
            response.status(200).send(objResposta);
        } else {
            next();
        }
    }

    async existe_empresa_cadastrada(request, response, next) {
        const nomeEmpresa = request.body.nome_empresa;
        const cnpjEmpresa = request.body.cnpj;

        const objEmpresa = new Empresa();
        objEmpresa.nome_empresa = nomeEmpresa;
        objEmpresa.cnpj = cnpjEmpresa;

        const empresaExiste = await objEmpresa.isEmpresa();

        if (empresaExiste) {
            const objResposta = {
                status: false,
                msg: "Empresa já cadastrada!"
            }
            response.status(200).send(objResposta);
        } else {
            next();
        }
    }
}