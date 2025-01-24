from flask import Flask, jsonify, request
from Controler.ClienteController import ClienteController
from Model.Cliente import Cliente  # Ajuste conforme a localização do arquivo da classe Cargo
from Model.Banco import Banco
from mysql.connector import Error

# Cria a aplicação Flask
app = Flask("rest_api")

def handle_validation_error(e):
    return jsonify({"erro": str(e)}), 400

@app.route('/clientes/', methods=['GET'])
def readAll():
    try:
        # Instancia o controlador de Cargo
        clienteController = ClienteController()
        # Chama o método para buscar todos os cargos e retorna o resultado
        return clienteController.read_all()
    except ValueError as e:
        # Se houver um erro de validação, lida com ele
        return handle_validation_error(e)
    
@app.route('/clientes/<int:id>', methods=['GET'])
def readById(id):
    try:
        # Instancia o controlador de Cargo
        objClienteController = ClienteController()
        # Define o ID do cargo no objeto CargoController
        objClienteController.cliente.idCliente = id
        # Chama o método para buscar o cargo pelo ID e retorna o resultado
        return objClienteController.read_by_id()
    except ValueError as e:
        # Lida com erros de validação e retorna a mensagem de erro
        return handle_validation_error(e)
    
@app.route('/clientes/', methods=['POST'])
def create():
    try:
    # Obtém o corpo da requisição em formato JSON
        body = request.get_json()
        # Instancia o controlador de Cargo
        objClienteController = ClienteController()
        # Define o nome do cargo com base nos dados recebidos
        objClienteController.cliente.nomeCliente = body['Cliente']['nomeCliente']
        objClienteController.cliente.pedidoCliente = body['Cliente']['pedidoCliente']
        # Chama o método para criar o cargo e retorna o resultado
        return objClienteController.create_control()
    except ValueError as e:
        # Lida com erros de validação e retorna a mensagem de erro
        return handle_validation_error(e)
    
@app.route('/clientes/<int:id>', methods=['PUT'])
def update(id):
    try:
        # Obtém o corpo da requisição em formato JSON
        body = request.get_json()
        # Instancia o controlador de Cargo
        objClienteController = ClienteController()
        # Define o nome e o ID do cargo com base nos dados recebidos
        objClienteController.cliente.nomeCliente = body['Cliente']['nomeCliente']
        objClienteController.cliente.pedidoCliente = body['Cliente']['pedidoCliente']
        objClienteController.cliente.idCliente = id
        # Chama o método para atualizar o cargo e retorna o resultado
        return objClienteController.update()
    except ValueError as e:
        # Lida com erros de validação e retorna a mensagem de erro
        return handle_validation_error(e)
    
@app.route('/clientes/<int:id>', methods=['DELETE'])
def delete(id):
    try:
        # Instancia o controlador de Cargo
        objClienteController = ClienteController()
        # Define o ID do cargo a ser deletado
        objClienteController.cliente.idCliente = id
        # Chama o método para deletar o cargo e verifica o resultado
        clientesExcluidos = objClienteController.cliente.delete()
        if clientesExcluidos:
            # Se o cargo foi excluído com sucesso, retorna uma mensagem de sucesso
            return jsonify({"message": "Cliente deletado com sucesso"}), 200
        else:
             # Se o cargo não foi encontrado, retorna uma mensagem de erro
            return jsonify({"message": "Cliente não encontrado"}), 404
    except ValueError as e:
        # Lida com erros de validação e retorna a mensagem de erro
        return handle_validation_error(e)

app.run(host='0.0.0.0', port=8080)