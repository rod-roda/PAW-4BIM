const mysql = require('mysql2/promise');

class Banco {
    static host = 'localhost';
    static user = 'root';
    static password = '';
    static banco = 'api_rest';
    static porta = 3306;
    static conexao = null;

    static async conectarBanco() {
        if (Banco.conexao === null) {
            try {
                Banco.conexao = await mysql.createConnection({
                    host: Banco.host,
                    user: Banco.user,
                    password: Banco.password,
                    database: Banco.banco,
                    port: Banco.porta
                });
                console.log("Conexão bem-sucedida!");
            } catch (error) {
                let resposta = {
                    cod: 1,
                    erro: error.message
                };
                console.error(JSON.stringify(resposta)); // Exibe o JSON de erro
                throw error;
            }
        }
    }

    static async getConexao() {
        if (Banco.conexao === null) {
            await Banco.conectarBanco();
        }
        return Banco.conexao;
    }
}

module.exports = Banco;
