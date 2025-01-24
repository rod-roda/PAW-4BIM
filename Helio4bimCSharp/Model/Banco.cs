using MySql.Data.MySqlClient;

namespace Helio4bimCSharp.Model {
    public static class Banco
    {
        private const string Host = "127.0.0.1";
        private const string User = "root";
        private const string Password = "";
        private const string DatabaseName = "api_rest";
        private const string Port = "3306";

        private static MySqlConnection? CONEXAO;

        private static void Connect()
        {
            string connectionString = $"Server={Host};Database={DatabaseName};UserID={User};Password={Password};Port={Port};";
            CONEXAO = new MySqlConnection(connectionString);
            CONEXAO.Open();
        }

        public static MySqlConnection GetConnection()
        {
            if(CONEXAO ==null || CONEXAO.State != System.Data.ConnectionState.Open)
            {
                Banco.Connect();
            }
            return CONEXAO;
        }
    }
}