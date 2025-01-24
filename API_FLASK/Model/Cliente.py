from Model.Banco import Banco
from mysql.connector import Error

class Cliente:
    def __init__(self):
        self._idCliente = None
        self._nomeCliente = None
        self._pedidoCliente = None
    
    def create(self):
        conexao = Banco.getConexao()
        if conexao:
            try:
                cursor = conexao.cursor()
                sql = "INSERT INTO clientes(nome_cliente, pedido_cliente) VALUES (%s, %s)"
                cursor.execute(sql, (self.nomeCliente, self.pedidoCliente))
                conexao.commit()
                self._idCliente = cursor.lastrowid
                return self._idCliente
            except Error as e:
                print(f"Erro ao criar cargo: {e}")
                raise ValueError("Ocorreu um erro ao cadastrar o cliente")
            finally:
                cursor.close()

    def readAll(self):
        conexao = Banco.getConexao()
        if conexao:
            try:
                cursor = conexao.cursor(dictionary=True)
                sql = "SELECT * FROM clientes order by nome_cliente asc"
                cursor.execute(sql)
                return cursor.fetchall()
            except Error as e:
                print(f"Erro ao obter clientes: {e}")
                raise ValueError("Ocorreu um erro ao selecionar todos os clientes")
            finally:
                cursor.close()

    def readClienteById(self):
        conexao = Banco.getConexao()
        if conexao:
            try:
                cursor = conexao.cursor(dictionary=True)
                sql = "SELECT * FROM clientes WHERE id_cliente = %s"
                cursor.execute(sql, (self.idCliente,))
                linhaRespostaSQL = cursor.fetchone()
                if linhaRespostaSQL:
                    self.idCliente = linhaRespostaSQL['id_cliente']
                    self.nomeCliente = linhaRespostaSQL['nome_cliente']
                    self.pedidoCliente = linhaRespostaSQL['pedido_cliente']
                return linhaRespostaSQL
            except Error as e:
                print(f"Erro ao obter cliente por ID: {e}")
                return None
            finally:
                cursor.close()
    
    def update(self):
        conexao = Banco.getConexao()
        if conexao:
            try:
                cursor = conexao.cursor()
                sql = "UPDATE clientes SET nome_cliente = %s, pedido_cliente = %s WHERE id_cliente = %s"
                cursor.execute(sql, (self.nomeCliente, self.pedidoCliente, self.idCliente))
                conexao.commit()
                return cursor.rowcount
            except Error as e:
                print(f"Erro ao atualizar cliente: {e}")
                raise ValueError("Erro ao atualizar o cliente.")
            finally:
                cursor.close()

    def delete(self):
        conexao = Banco.getConexao()
        if conexao:
            try:
                cursor = conexao.cursor()
                sql = "DELETE FROM clientes WHERE id_cliente = %s"
                cursor.execute(sql, (self.idCliente,))
                conexao.commit()
                qtdExcluidos = cursor.rowcount
                return qtdExcluidos
            except Error as e:
                print(f"Erro ao deletar cliente: {e}")
                return None
            finally:
                cursor.close()

    # Getter para idCargo
    @property
    def idCliente(self):
        return self._idCliente

    # Setter para idCargo
    @idCliente.setter
    def idCliente(self, value):
        self._idCliente = value

    @property
    def nomeCliente(self):
        return self._nomeCliente

    @nomeCliente.setter
    def nomeCliente(self, value):
        self._nomeCliente = value

    @property
    def pedidoCliente(self):
        return self._pedidoCliente

    @pedidoCliente.setter
    def pedidoCliente(self, value):
        self._pedidoCliente = value