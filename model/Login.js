const Banco = require('./Banco')

class Login {
    constructor() {
        this._id_usuario = null;
        this._usuario = '';
        this._senha = '';
    }

    get id_usuario() {
        return this._id_usuario;
    }

    set id_usuario(id) {
        this._id_usuario = id;
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

    async create() {
        const conexao = await Banco.getConexao();
        const sql = "INSERT INTO login (usuario, senha) VALUES (?,?);";
        try {
            const [result] = await conexao.execute(sql, [this._usuario, this._senha]);
            this._id_usuario = result.insertId;
            return result.affectedRows > 0;
        } catch (error) {
            console.error('Erro ao criar: ', error);
            return false;
        } 
    }

    async readAll() { 
        const conexao = await Banco.getConexao();
        const sql = "SELECT * FROM login ORDER BY id_usuario;"; 
        try { 
            const [rows] = await conexao.execute(sql);
            return rows;
        } catch (error) {
            console.error("Erro ao ler: ",error);
            return [];
        }
    }

    async readById() {
        const conexao = await Banco.getConexao();
        const sql = "SELECT id_usuario, usuario, senha FROM login WHERE id_usuario = ?;"; 
        try { 
            const [rows] = await conexao.execute(sql, [this._id_usuario]);
            return rows;
        } catch (error) {
            console.error("Erro ao ler por id: ",error);
            return null;
        }
    }

    async update() {
        const conexao = await Banco.getConexao();
        const sql = "UPDATE login SET usuario = ?,senha = ? WHERE id_usuario = ?;";
        try {
            const [result] = await conexao.execute(sql, [this._usuario, this._senha, this._id_usuario]);
            return result.affectedRows > 0;
        } catch (error) {
            console.error("Erro ao atualizar: ", error)
            return false;
        }
    }

    async delete() {
        const conexao = await Banco.getConexao();
        const sql = "DELETE FROM login WHERE id_usuario = ?;";
        try {
            const [result] = await conexao.execute(sql, [this._id_usuario]);
            return result.affectedRows > 0;
        } catch (error) {
            console.error("Erro ao excluir: ", error);
            return false;
        }
    }

    async isLogin() {
        const conexao = await Banco.getConexao();
        const sql = "SELECT COUNT(*) AS qtd FROM login WHERE usuario = ?;";
        try {
            const [rows] = await conexao.execute(sql, [this._usuario]);
            return rows[0].qtd > 0;
        } catch (error) {
            console.error("Erro ao verificar: ", error);
            return false;
        }
    }
}

module.exports = Login;