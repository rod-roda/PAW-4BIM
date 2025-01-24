const Banco = require('./Banco')

class Empresa {
    constructor() {
        this._id_empresa = null;
        this._id_cliente_empresa = null;
        this._nome_empresa = '';
        this._cnpj = null;
    }

    get id_empresa() {
        return this._id_empresa;
    }

    set id_empresa(id_empresa) {
        this._id_empresa = id_empresa;
    }

    get id_cliente_empresa() {
        return this._id_cliente_empresa;
    }

    set id_cliente_empresa(id_cliente_empresa) {
        this._id_cliente_empresa = id_cliente_empresa;
    }

    get nome_empresa() {
        return this._nome_empresa;
    }

    set nome_empresa(nome_empresa) {
        this._nome_empresa = nome_empresa;
    }

    get cnpj() {
        return this._cnpj;
    }

    set cnpj(cnpj) {
        this._cnpj = cnpj;
    }

    async create() {
        const conexao = await Banco.getConexao();
        const sql = "INSERT INTO empresas (id_cliente_empresa, nome_empresa, cnpj) VALUES (?,?,?);";
        try {
            const [result] = await conexao.execute(sql, [this._id_cliente_empresa, this._nome_empresa, this._cnpj]);
            this._id_empresa = result.insertId;
            return result.affectedRows > 0;
        } catch (error) {
            console.error("Erro ao criar empresa: ", error);
            return false;
        }
    }

    async readAll() {
        const conexao = await Banco.getConexao();
        const sql = "SELECT * FROM empresas ORDER BY id_empresa;";
        try {
            const [rows] = await conexao.execute(sql);
            return rows;
        } catch (error) {
            console.error("Erro ao ler empresas: ", error);
            return [];
        }
    }

    async readById() {
        const conexao = await Banco.getConexao();
        const sql = "SELECT id_empresa, id_cliente_empresa, nome_empresa, cnpj FROM empresas WHERE id_empresa = ?;";
        try {
            const [rows] = await conexao.execute(sql, [this._id_empresa]);
            console.log(rows);
            return rows;
        } catch (error) {
            console.error("Erro ao ler empresa: ", error);
            return false;
        }
    }

    async update() {
        const conexao = await Banco.getConexao();
        const sql = "UPDATE empresas SET nome_empresa = ?, cnpj = ? WHERE id_empresa = ?;";
        try {
            const [result] = await conexao.execute(sql, [this._nome_empresa, this._cnpj, this._id_empresa]);
            return result.affectedRows > 0;
        } catch (error) {
            console.error("Erro ao atualizar empresa: ", error);
            return false;
        }
        
    }

    async delete() {
        const conexao = await Banco.getConexao();
        const sql = "DELETE FROM empresas WHERE id_empresa = ?;";
        try { 
            const [result] = await conexao.execute(sql, [this._id_empresa]);
            return result.affectedRows > 0;
        } catch (error) {
            console.error("Erro ao deletar empresa: ", error);
            return false;
        }
    }

    async isEmpresa() {
        const conexao = await Banco.getConexao();
        const sql = "SELECT COUNT(*) AS qtd FROM empresas WHERE nome_empresa = ? or cnpj = ?;";
        try { 
            const [rows] = await conexao.execute(sql, [this._nome_empresa,this._cnpj]);
            return rows[0].qtd > 0;
        } catch (error) {
            console.error("Erro ao verificar empresa: ", error);
            return false;
        }
    }
}

module.exports = Empresa;