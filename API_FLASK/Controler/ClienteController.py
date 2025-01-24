from flask import jsonify
from Model.Cliente import Cliente
class ClienteController:
    def __init__(self):
        self._cliente = Cliente()

    def validar_nomeCliente(self):
        if self._cliente.nomeCliente is None:
            raise ValueError("O nome do cliente não pode ser vazio")
        if len(self._cliente.nomeCliente) < 3:
            raise ValueError("O nome do cliente deve ter pelo menos 3 caracteres.")
    
    def validar_pedidoCliente(self):
        if self._cliente.pedidoCliente is None:
            raise ValueError("O pedido do cliente não pode ser vazio")
        if len(self._cliente.pedidoCliente) < 3:
            raise ValueError("O pedido do cliente deve ter pelo menos 3 caracteres.")
    
    def create_control(self):
        self.validar_nomeCliente()  # Valida o nome do cargo antes de prosseguir
        self.validar_pedidoCliente()
        id_novo_cliente = self._cliente.create()  # Tenta criar o novo cargo no banco de dados
        if id_novo_cliente:
            # Retorna o ID do novo cargo e o nome em formato JSON com o status HTTP 201 (Created)
            return jsonify({"message" : "Cliente cadastrado com sucesso!"}), 201
        else:
            # Retorna uma mensagem de erro e o status HTTP 500 (Internal Server Error)
            return jsonify({"message": "Não foi possível criar o cliente"}), 500
    
    def read_all(self):
        clientes = self._cliente.readAll()
        if clientes is not None:
            # Retorna a lista de cargos em formato JSON e o status HTTP 200 (OK)
            return jsonify(clientes), 200
        else:
            # Retorna uma mensagem de erro e o status HTTP 500 (Internal Server Error)
            return jsonify({"message": "Não foi possível obter os clientes"}), 500
    
    def read_by_id(self):
        cliente_data = self._cliente.readClienteById()
        if cliente_data:
            # Retorna os dados do cargo em formato JSON e o status HTTP 200 (OK)
            return jsonify(cliente_data), 200
        else:
            # Retorna uma mensagem de erro e o status HTTP 404 (Not Found)
            return jsonify({"message": "Cliente não encontrado"}), 404
        
    def update(self):
   
        self.validar_nomeCliente()
        self.validar_pedidoCliente()
        id_novo_cliente = self._cliente.update()  # Tenta atualizar o cargo no banco de dados
        if id_novo_cliente:
            # Retorna o ID do cargo atualizado e o nome em formato JSON com o status HTTP 200 (OK)
            return jsonify({"message" : "Cliente atualizado com sucesso!"}), 200
        else:
            # Retorna uma mensagem de erro e o status HTTP 500 (Internal Server Error)
            return jsonify({"message": "Não foi possível atualizar o cargo"}), 500
        
    def delete(self):
        # Exclui um cargo do banco de dados pelo ID.
        # Retorna uma mensagem de sucesso ou erro dependendo do resultado.
        linhas_afetadas = self._cliente.delete()  # Tenta deletar o cargo pelo ID
        if linhas_afetadas:
            # Retorna uma mensagem de sucesso e o status HTTP 200 (OK)
            return jsonify({"message": "Cliente excluído com sucesso"}), 200
        else:
            # Retorna uma mensagem de erro e o status HTTP 404 (Not Found)
            return jsonify({"message": "Cliente não encontrado"}), 404

    @property
    def cliente(self):
        return self._cliente

    @cliente.setter
    def cliente(self, value):
        self._cliente = value
