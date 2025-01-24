using Helio4bimCSharp.Model; // Importa os modelos usados pela API
using Microsoft.AspNetCore.Mvc;
// Define o namespace do controlador
namespace Helio4bimCSharp.Control
{
    // Indica que esta classe é um controlador de API
    [ApiController]
    // Define a rota base para este controlador
    [Route("/[controller]")]
    public class ClienteController : ControllerBase // Classe que herda de ControllerBase, usada para criar APIs RESTful
    {
        // Define um endpoint HTTP GET para obter cargo por ID
        [HttpGet("/clientes/{id_cliente}/")]
        // Método que lida com solicitações GET para "/cargos/{idCargo}/"
        public IActionResult Get_Clientes_by_Id(uint id_cliente)
        {
            // Cria uma nova instância do objeto Cargo
            Cliente objCliente = new Cliente();
            // Atribui o ID do cargo que foi passado pela rota
            objCliente.Id_Cliente = id_cliente;
            // Cria uma resposta contendo o cargo retornado pelo método ReadById()
            object resposta = new
            {
                clientes = objCliente.ReadById() // Obtém os dados do cargo pelo ID
            };
            // Retorna a resposta com status 200 OK
            return Ok(resposta);
        }
        [HttpPost("/clientes/")]
        public IActionResult Post_Clientes([FromBody] Dictionary<string, Dictionary<string, object>> jsonData)
        {
            try
            {
                Dictionary<string, object> clienteData = jsonData["cliente"];
                string nomeCliente = clienteData["nome_cliente"].ToString();
                string pedidoCliente = clienteData["pedido_cliente"].ToString();
                Cliente cliente = new Cliente();
                cliente.NomeCliente = nomeCliente;
                cliente.PedidoCliente = pedidoCliente;
                if (cliente.Create() == false)
                {
                    object resposta = new
                    {
                        mensagem = "Erro ao salvar cliente." // Mensagem de erro
                    };
                    return StatusCode(500, resposta);
                }
                else
                {
                    object resposta = new
                    {
                        mensagem = "Cliente criado com sucesso", // Mensagem de sucesso
                        clientes = cliente // Inclui o cargo criado na resposta
                    };
                    return Ok(resposta);
                }
            }
            catch (Exception e)
            { // Captura qualquer exceção que possa ocorrer
              // Cria uma resposta de erro com a mensagem da exceção
                object resposta = new
                {
                    mensagem = e.Message // Mensagem de erro
                };
                // Retorna uma resposta 400 Bad Request
                return BadRequest(resposta);
            }
        }

        [HttpPut("/clientes/{id}")]
        public IActionResult Put_Clientes(uint id, [FromBody] Dictionary<string, Dictionary<string, object>> jsonData)
        {
            try
            {
                Dictionary<string, object> clienteData = jsonData["cliente"];
                string nomeCliente = clienteData["nome_cliente"].ToString();
                string pedidoCliente = clienteData["pedido_cliente"].ToString();
                Cliente cliente = new Cliente();
                cliente.Id_Cliente = id; // Define o ID do cargo a ser atualizado
                cliente.NomeCliente = nomeCliente; // Atribui o nome do cargo
                cliente.PedidoCliente = pedidoCliente;
                if (cliente.Update() == false)
                { // Verifica se o método Update() falhou
                    object resposta = new
                    {
                        mensagem = "Erro ao atualizar cliente." // Mensagem de erro
                    };
                    // Retorna uma resposta de erro 500 Internal Server Error
                    return StatusCode(500, resposta);
                }
                else
                {
                    // Cria uma resposta de sucesso
                    object resposta = new
                    {
                        mensagem = "Cliente atualizado com sucesso", // Mensagem de sucesso
                        cliente = cliente // Inclui o cargo atualizado na resposta
                    };
                    // Retorna a resposta com status 200 OK
                    return Ok(resposta);
                }
            }
            catch (Exception e)
            { // Captura qualquer exceção que possa ocorrer
              // Cria uma resposta de erro com a mensagem da exceção
                object resposta = new
                {
                    mensagem = e.Message // Mensagem de erro
                };
                // Retorna uma resposta 400 Bad Request
                return BadRequest(resposta);
            }
        }
        // Define um endpoint HTTP GET para obter todos os cargos
        [HttpGet("/clientes/")]
        public IActionResult Get_Clientes()
        { // Método que lida com solicitações GET para "/cargos/"
            Cliente objCliente = new Cliente();
            object resposta = new
            {
                status = true, // Define o status como sucesso
                mensagem = "Executado com sucesso", // Mensagem de sucesso
                clientes = objCliente.Read() // Chama o método Read() que retorna a lista de cargos
            };
            // Retorna a resposta com status 200 OK
            return Ok(resposta);
        }

        [HttpDelete("/clientes/{id}")]
        public IActionResult Delete_Clientes(uint id)
        { // Método que lida com solicitações GET para "/cargos/"
            try
            {
                Cliente objCliente = new Cliente();
                objCliente.Id_Cliente = id;
                if(objCliente.Delete(id))
                {
                    object resposta = new
                    {
                        status = true, // Define o status como sucesso
                        mensagem = "Deletado com sucesso", // Mensagem de sucesso
                        cliente = objCliente.ReadById() // Chama o método Read() que retorna a lista de cargos
                    };
                    // Retorna a resposta com status 200 OK
                    return Ok(resposta);
                }
                else
                {
                    object resposta = new
                    {
                        status = false, // Define o status como sucesso
                        mensagem = "Cliente inexistente", // Mensagem de sucesso
                        cliente = objCliente.ReadById() // Chama o método Read() que retorna a lista de cargos
                    };
                    // Retorna a resposta com status 200 OK
                    return StatusCode(500, resposta);
                }
            }
            catch(Exception e)
            {
                object resposta = new
                {
                    mensagem = e.Message // Mensagem de erro
                };
                // Retorna uma resposta 400 Bad Request
                return BadRequest(resposta);
            }           
        }
    }
}
    
