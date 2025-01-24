const Banco = require('./Banco')

class Estagiario {
    constructor(){
        this._id_estagiario = null;
        this._nome_estagiario = '';
        this._data_nascimento = '';
        this._telefone = '';
        this._email;
        this._id_empresa;
    }

    get id_estagiario() {
        return this._id_estagiario;
    }

    set id_estagiario(id_estagiario) {
        this._id_estagiario = id_estagiario;
    }

    get nome_estagiario() {
        return this._nome_estagiario;
    }

    set nome_estagiario(nome_estagiario) {
        this._nome_estagiario = nome_estagiario;
    }

    get data_nascimento() {
        return this._data_nascimento;
    }

    set data_nascimento(data_nascimento) {
        this._data_nascimento = data_nascimento;
    }

    get telefone() {
        return this._telefone;
    }

    set telefone(telefone) {
        this._telefone = telefone;
    }

    get email() {
        return this._email;
    }

    set email(email) {
        this._email = email;
    }

    get id_empresa() {
        return this._id_empresa;
    }

    set id_empresa(id_empresa) {
        this._id_empresa = id_empresa;
    }

    async create() {
        const conexao = await Banco.getConexao();
        const sql = "INSERT INTO estagiarios (id_estagiario,nome_estagiario,data_nascimento,telefone,email,id_empresa) VALUES (?,?,?,?,?,?);";
        try {
            const [result] = await conexao.execute(sql, [this._id_estagiario, this._nome_estagiario, this._data_nascimento, this._telefone, this._email, this._id_empresa]);
            this._id_estagiario = result.insertId;
            return result.affectedRows > 0;
        } catch (error) {
            console.error("Erro ao criar estagiario: ", error);
            return false;
        }
        
    }

    async readAll() {
        const conexao = await Banco.getConexao();
        const sql = "SELECT id_estagiario, nome_estagiario, DATE_FORMAT(data_nascimento, '%Y-%m-%d') AS data_nascimento, telefone, email, id_empresa FROM estagiarios;";
        try {
            const [rows] = await conexao.execute(sql);
            return rows;
        } catch (error) {
            console.error("Erro ao ler estagiarios: ", error);
            return [];
        }
    }

    async readById() {
        const conexao = await Banco.getConexao();
        const sql = "SELECT id_estagiario, nome_estagiario, DATE_FORMAT(data_nascimento, '%Y-%m-%d') AS data_nascimento, telefone, email, id_empresa FROM estagiarios WHERE id_estagiario = ?;";
        try {
            const [rows] = await conexao.execute(sql, [this._id_estagiario]);
            return rows;
        } catch (error) {
            console.error("Erro ao ler estagiario: ", error);
            return null;
        }
    }

    async update() {
        const conexao = await Banco.getConexao();
        const sql = "UPDATE estagiarios SET nome_estagiario = ?,data_nascimento = ?, telefone = ?, email = ? WHERE id_estagiario = ?;";
        try {
            const [result] = await conexao.execute(sql, [this._nome_estagiario, this._data_nascimento, this._telefone, this._email, this._id_estagiario]);
            return result.affectedRows > 0;
        } catch (error) {
            console.error("Erro ao atualizar estagiario: ", error);
            return false;
        }
    }

    async delete() {
        const conexao = await Banco.getConexao();
        const sql = "DELETE FROM estagiarios WHERE id_estagiario = ?;";
        try {
            const [result] = await conexao.execute(sql, [this._id_estagiario]);
            return result.affectedRows > 0;
        } catch (error) {
            console.error("Erro ao deletar estagiario: ", error);
            return false;
        }
    }

    async isEstagiario() {
        const conexao = await Banco.getConexao();
        const sql = "SELECT COUNT(*) AS qtd FROM estagiarios WHERE nome_estagiario = ?;";
        try {
            const [rows] = await conexao.execute(sql, [this._nome_estagiario]);
            return rows[0].qtd > 0;
        } catch (error) {
            console.error("Erro ao verificar estagiario: ", error);
            return false;
        }
    }
}

module.exports = Estagiario;