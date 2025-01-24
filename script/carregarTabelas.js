function carregarClientes(filtro) {
    const uri = "http://localhost:2007/clientes/"
    let token = localStorage.getItem('token')
    fetch(uri, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    })
    .then((response) => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    }).then((textoJson) => {
        //console.log(textoJson.clientes)
        inserirDados(textoJson.clientes, filtro);
    })
    .catch((error) => {
        console.error("Erro na requisição:", error);
    });
    
}


function carregarEmpresas(filtro) {
    const uri = "http://localhost:2007/empresas"
    let token = localStorage.getItem('token')
    fetch(uri, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization' : 'Bearer ' + token
        }
    }).then((response) => {
        return response.json()
    }).then((textoJson) => {
        //console.log(textoJson.empresas) //dados retornados da API
        inserirDados(textoJson.empresas,filtro)
    }).catch((error) => {
        console.log("Erro: ", error)
    })
}

function carregarEstagiarios(filtro) {
    const uri = "http://localhost:2007/estagiarios"
    let token = localStorage.getItem('token')
    fetch(uri, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization' : 'Bearer ' + token
        }
    }).then((response) => {
        return response.json()
    }).then((textoJson) => {
        //console.log(textoJson.estagiarios) //dados retornados da API
        inserirDados(textoJson.estagiarios,filtro)
    }).catch((error) => {
        console.log("Erro: ", error)
    })
}