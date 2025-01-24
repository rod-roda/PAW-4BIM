const Banco = require('./Banco');

class Logar {
    constructor() {
        this._usuario = '';
        this._senha = '';
    }

    get usuario() {
        return this._usuario;
    }

    set usuario(usuario) {
        this._usuario = usuario;
    }

    get senha() {
        return this._senha;
    }

    set senha(senha) {
        this._senha = senha;
    }

    async logar() {
        const conexao = await Banco.getConexao();
        const sql = "SELECT COUNT(*) AS qtd FROM login WHERE usuario = ? and senha = ?;";
        try {
            const[rows] = await conexao.execute(sql,[this._usuario,this._senha]);
            return rows[0].qtd > 0;
       } catch (error) {
            console.log("Usuário inválido!");
            return false;
       }
    }
}

module.exports = Logar;