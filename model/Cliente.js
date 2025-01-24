const Banco = require('./Banco')

class Cliente {
    constructor() {
        this._id_cliente = null;
        this._nome_cliente = '';
        this._pedido_cliente = '';
    }

    get id_cliente() {
        return this._id_cliente;
    }

    set id_cliente(id_cliente) {
        this._id_cliente = id_cliente;
    }

    get nome_cliente() {
        return this._nome_cliente;
    }

    set nome_cliente(nome_cliente) {
        this._nome_cliente = nome_cliente;
    }

    get pedido_cliente() {
        return this._pedido_cliente;
    }

    set pedido_cliente(pedido_cliente) {
        this._pedido_cliente = pedido_cliente;
    }

    async create() {
        const conexao = await Banco.getConexao();
        const sql = "INSERT INTO clientes (nome_cliente, pedido_cliente) VALUES (?,?);";
        try {
            const [result] = await conexao.execute(sql, [this._nome_cliente, this._pedido_cliente]);
            this._id_cliente = result.insertId;
            return result.affectedRows > 0;
        } catch (error) {
            console.error('Erro ao criar cliente: ', error);
            return false;
        }
    }

    async readAll() { 
        const conexao = await Banco.getConexao();
        const sql = "SELECT * FROM clientes ORDER BY id_cliente;"; 
        try { 
            const [rows] = await conexao.execute(sql);
            return rows;
        } catch (error) {
            console.error("Erro ao ler clientes: ",error);
            return [];
        }
    }

    async readById() {
        const conexao = await Banco.getConexao();
        const sql = "SELECT id_cliente, nome_cliente, pedido_cliente FROM clientes WHERE id_cliente = ?;"; 
        try { 
            const [rows] = await conexao.execute(sql, [this._id_cliente]);
            return rows;
        } catch (error) {
            console.error("Erro ao ler cliente: ",error);
            return null;
        }

    }

    async update() {
        const conexao = await Banco.getConexao();
        const sql = "UPDATE clientes SET nome_cliente = ?,pedido_cliente = ? WHERE id_cliente = ?;";
        try {
            const [result] = await conexao.execute(sql, [this._nome_cliente, this._pedido_cliente, this._id_cliente]);
            return result.affectedRows > 0;
        } catch (error) {
            console.error("Erro ao atualizar cliente: ", error)
            return false;
        }
    }

    async delete() {
        const conexao = await Banco.getConexao();
        const sql = "DELETE FROM clientes WHERE id_cliente = ?;";
        try {
            const [result] = await conexao.execute(sql, [this._id_cliente]);
            return result.affectedRows > 0;
        } catch (error) {
            console.error("Erro ao excluir cliente: ", error);
            return false;
        }
    }

    async isCliente() {
        const conexao = await Banco.getConexao();
        const sql = "SELECT COUNT(*) AS qtd FROM clientes WHERE nome_cliente = ?;";
        try {
            const [rows] = await conexao.execute(sql, [this._nome_cliente]);
            return rows[0].qtd > 0;
        } catch (error) {
            console.error("Erro ao verificar cliente: ", error);
            return false;
        }
    }
}

module.exports = Cliente;