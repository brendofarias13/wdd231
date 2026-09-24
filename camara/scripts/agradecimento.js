// ========================================
// DADOS DO FORMULÁRIO
// ========================================

const parametros = new URLSearchParams(window.location.search);


// ========================================
// FUNÇÃO PARA MOSTRAR OS DADOS
// ========================================

function mostrarDado(idElemento, nomeParametro) {

    const elemento = document.querySelector(`#${idElemento}`);
    const valor = parametros.get(nomeParametro);

    if (elemento && valor) {
        elemento.textContent = valor;
    }
}


// ========================================
// PREENCHER OS CAMPOS
// ========================================

mostrarDado("resultado-nome", "nome");

mostrarDado("resultado-sobrenome", "sobrenome");

mostrarDado("resultado-email", "email");

mostrarDado("resultado-telefone", "telefone");

mostrarDado("resultado-organizacao", "organizacao");

mostrarDado("resultado-timestamp", "timestamp");