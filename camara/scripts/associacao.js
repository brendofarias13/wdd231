// ========================================
// PÁGINA DE ASSOCIAÇÃO
// ========================================

// DATA E HORA DO ENVIO
const timestamp = document.querySelector("#timestamp");

if (timestamp) {
    const agora = new Date();

    timestamp.value = agora.toLocaleString("pt-BR");
}


// ========================================
// MODAIS DOS NÍVEIS DE ASSOCIAÇÃO
// ========================================

const linksModal = document.querySelectorAll(".abrir-modal");

linksModal.forEach((link) => {

    link.addEventListener("click", (event) => {

        event.preventDefault();

        const idModal = link.getAttribute("data-modal");
        const modal = document.querySelector(`#${idModal}`);

        if (modal) {
            modal.showModal();
        }
    });
});


// ========================================
// FECHAR MODAIS
// ========================================

const botoesFechar = document.querySelectorAll(".fechar-modal");

botoesFechar.forEach((botao) => {

    botao.addEventListener("click", () => {

        const modal = botao.closest("dialog");

        if (modal) {
            modal.close();
        }
    });
});


// ========================================
// FECHAR CLICANDO FORA DO MODAL
// ========================================

const modais = document.querySelectorAll("dialog");

modais.forEach((modal) => {

    modal.addEventListener("click", (event) => {

        if (event.target === modal) {
            modal.close();
        }
    });
});