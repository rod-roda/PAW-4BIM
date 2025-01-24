using MySql.Data.MySqlClient;
using Helio4bimCSharp.Model;

public class Cliente
{
    public uint Id_Cliente { get; set; } // Armazena o ID do cargo
    public string NomeCliente { get; set; } // Armazena o nome do cargo
    public string PedidoCliente {get; set;}

    public bool Create()
    {
        try
        {
            // Cria um comando SQL para inserir um novo cargo na tabela
            MySqlCommand mysqlCommand = new MySqlCommand("INSERT INTO clientes (nome_cliente, pedido_cliente) VALUES(@nome_cliente, @pedido_cliente)", Banco.GetConnection());
            // Adiciona o valor da propriedade NomeCargo como parâmetro para a consulta SQL
            mysqlCommand.Parameters.AddWithValue("@nome_cliente", NomeCliente);
            mysqlCommand.Parameters.AddWithValue("@pedido_cliente", PedidoCliente);
            // Executa a consulta e retorna o número de linhas afetadas
            int itensInseridos = mysqlCommand.ExecuteNonQuery();
            // Verifica se algum item foi inserido
            if (itensInseridos > 0)
            {
                // Recupera o último ID inserido no banco de dados
                uint idClienteInserido = Convert.ToUInt32(mysqlCommand.LastInsertedId);
                // Atribui o ID recuperado à propriedade IdCargo do objeto
                this.Id_Cliente = idClienteInserido;
                return true; // Retorna true se a inserção foi bem-sucedida
            }
        }
        catch (Exception ex)
        {
            // Captura qualquer exceção e imprime a mensagem de erro no console
            Console.WriteLine("Erro ao criar cliente: " + ex.Message);
            return false; // Retorna false se ocorrer um erro
        }
        return false; // Retorna false se não houve inserção
    }

    // Método para ler todos os registros da tabela Cargo
    public List<Cliente> Read()
    {
        // Cria uma lista para armazenar os objetos Cargo
        List<Cliente> clientes = new List<Cliente>();
        try
        {
            // Cria um comando SQL para selecionar todos os registros da tabela Cargo
            MySqlCommand mysqlCommand = new MySqlCommand("SELECT * FROM clientes", Banco.GetConnection());
            // Executa a consulta e obtém o resultado na forma de um MySqlDataReader
            MySqlDataReader matrizRegistros = mysqlCommand.ExecuteReader();
            // Percorre todos os registros obtidos
            while (matrizRegistros.Read())
            {
                // Cria um novo objeto Cargo e popula suas propriedades
                Cliente cliente = new Cliente();
                cliente.Id_Cliente = matrizRegistros.GetUInt32("id_Cliente");
                cliente.NomeCliente = matrizRegistros.GetString("nome_cliente");
                cliente.PedidoCliente = matrizRegistros.GetString("pedido_cliente");
                // Adiciona o objeto Cargo à lista
                clientes.Add(cliente);
            }
            // Fecha o leitor de dados
            matrizRegistros.Close();
        }
        catch (Exception ex)
        {
            // Captura qualquer exceção e imprime a mensagem de erro no console
            Console.WriteLine("Erro ao ler clientes: " + ex.Message);
        }
        return clientes; // Retorna a lista de cargos
    }

    // Método para ler um registro específico pelo Id
    public Cliente ReadById()
    {
        Cliente cliente = new Cliente(); // Cria um novo objeto Cargo
        try
        {
            // Cria um comando SQL para selecionar um cargo específico pelo Id
            MySqlCommand mySqlCommand = new MySqlCommand("SELECT * FROM clientes WHERE id_cliente = @id_Cliente", Banco.GetConnection());
            // Adiciona o IdCargo como parâmetro para a consulta
            mySqlCommand.Parameters.AddWithValue("@id_Cliente", this.Id_Cliente);
            // Executa a consulta e obtém o resultado na forma de um MySqlDataReader
            MySqlDataReader matrizRegistros = mySqlCommand.ExecuteReader();
            // Verifica se algum registro foi encontrado
            if (matrizRegistros.Read())
            {
                // Popula o objeto Cargo com os dados do registro
                cliente = new Cliente();
                cliente.Id_Cliente = matrizRegistros.GetUInt32("id_cliente");
                cliente.NomeCliente = matrizRegistros.GetString("nome_cliente");
                cliente.PedidoCliente = matrizRegistros.GetString("pedido_cliente");
            }
            // Fecha o leitor de dados
            matrizRegistros.Close();
        }
        catch (Exception ex)
        {
            // Captura qualquer exceção e imprime a mensagem de erro no console
            Console.WriteLine("Erro ao ler cliente por ID: " + ex.Message);
        }
        return cliente; // Retorna o objeto Cargo
    }

    // Método para atualizar um registro existente
    public bool Update()
    {
        try
        {
            // Cria um comando SQL para atualizar um registro na tabela Cargo
            MySqlCommand mySqlCommand = new MySqlCommand("UPDATE clientes SET nome_cliente = @nomeCliente, pedido_cliente = @pedidoCliente WHERE id_cliente = @id_Cliente", Banco.GetConnection());
            // Adiciona os parâmetros IdCargo e NomeCargo à consulta
            mySqlCommand.Parameters.AddWithValue("@id_Cliente", this.Id_Cliente);
            mySqlCommand.Parameters.AddWithValue("@nomeCliente", this.NomeCliente);
            mySqlCommand.Parameters.AddWithValue("@pedidoCliente", this.PedidoCliente);
            // Executa a consulta e retorna o número de linhas afetadas
            int qtdClientesAtualizados = mySqlCommand.ExecuteNonQuery();
            // Retorna true se pelo menos um registro foi atualizado
            return qtdClientesAtualizados > 0;
        }
        catch (Exception ex)
        {
            // Captura qualquer exceção e imprime a mensagem de erro no console
            Console.WriteLine("Erro ao atualizar cliente: " + ex.Message);
            return false; // Retorna false se ocorrer um erro
        }
    }

    // Método para excluir um registro existente
    public bool Delete(uint id)
    {
        try
        {
            // Cria um comando SQL para excluir um cargo pelo Id
            MySqlCommand command = new MySqlCommand("DELETE FROM clientes WHERE id_cliente = @id_Cliente", Banco.GetConnection());
            // Adiciona o IdCargo como parâmetro para a consulta
            command.Parameters.AddWithValue("@id_Cliente", id);
            // Executa a consulta e retorna o número de linhas afetadas
            int qtdClientesExcluidos = command.ExecuteNonQuery();
            // Retorna true se pelo menos um registro foi excluído
            return qtdClientesExcluidos > 0;
        }
        catch (Exception ex)
        {
            // Captura qualquer exceção e imprime a mensagem de erro no console
            Console.WriteLine("Erro ao excluir cliente: " + ex.Message);
            return false; // Retorna false se ocorrer um erro
        }
    }

    // Método para verificar se um cargo com o mesmo nome já existe no banco de dados
    public bool IsCargoByNomeCargo(string nomeCliente)
    {
        bool existe = false; // Variável que indica se o cargo já existe
        try
        {
            // Cria um comando SQL para contar quantos cargos existem com o nome fornecido
            MySqlCommand mySqlCommand = new MySqlCommand("SELECT COUNT(*) as qtd FROM clientes WHERE nome_cliente = @nomeCliente", Banco.GetConnection());
            // Adiciona o nome do cargo como parâmetro para a consulta
            mySqlCommand.Parameters.AddWithValue("@nomeCliente", nomeCliente);
            // Executa a consulta e obtém o resultado (campo qtd do SELECT)
            object resultado = mySqlCommand.ExecuteScalar(); // ExecuteScalar retorna o primeiro valor da primeira linha do resultado
            // Verifica se o resultado não é nulo e o converte para inteiro
            if (resultado != null)
            {
                int qtd = Convert.ToInt32(resultado); // Converte o valor retornado para inteiro
                // Se o número de registros for maior que 0, o cargo já existe
                existe = qtd > 0;
            }
        }
        catch (Exception ex)
        {
            // Captura qualquer exceção e imprime a mensagem de erro no console
            Console.WriteLine("Erro ao verificar se o cliente já existe: " + ex.Message);
        }
        return existe; // Retorna true se o cargo já existe, false caso contrário
    }
}