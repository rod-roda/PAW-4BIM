const express = require('express');
const cors = require('cors');
const LogarRouter = require('./router/LogarRouter')
const LoginRouter = require('./router/LoginRouter');
const ClienteRouter = require('./router/ClienteRouter');
const EmpresaRouter = require('./router/EmpresaRouter');
const EstagiarioRouter = require('./router/EstagiarioRouter')
const app = express();
const porta = 2007;

app.use(cors());
app.use(express.json());
const logarRoteador = new LogarRouter();
const loginRoteador = new LoginRouter();
const clienteRoteador = new ClienteRouter();
const empresaRoteador = new EmpresaRouter();
const estagiarioRoteador = new EstagiarioRouter();

app.use('/logar',
    logarRoteador.criarRotasLogar()
)

app.use('/login',
    loginRoteador.criarRotasLogin()
)

//////////////////////////////////////////////////////////

app.use('/clientes',
    clienteRoteador.criarRotasCliente()
);

app.use('/empresas',
    empresaRoteador.criarRotasEmpresa()
);

app.use('/estagiarios',
    estagiarioRoteador.criarRotasEstagiario()
);

app.listen(porta, () => {
    console.log(`API rodando no endereço: http://localhost:${porta}/`);
});