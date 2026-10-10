
/* =========================================================
   MR. BROWNIE GOURMET
   Funções gerais do site
   ========================================================= */

// Menu responsivo para dispositivos móveis
const botaoMenu = document.querySelector("#menu-button");
const navegacao = document.querySelector("#main-navigation");

if (botaoMenu && navegacao) {
  botaoMenu.addEventListener("click", () => {
    const menuAberto = navegacao.classList.toggle("open");

    botaoMenu.setAttribute("aria-expanded", String(menuAberto));
    botaoMenu.setAttribute(
      "aria-label",
      menuAberto ? "Fechar menu" : "Abrir menu"
    );

    botaoMenu.textContent = menuAberto ? "✕" : "☰";
  });

  navegacao.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navegacao.classList.remove("open");
      botaoMenu.setAttribute("aria-expanded", "false");
      botaoMenu.setAttribute("aria-label", "Abrir menu");
      botaoMenu.textContent = "☰";
    });
  });
}

// Atualiza automaticamente o ano do rodapé
const elementosAno = document.querySelectorAll("#current-year, #ano");

elementosAno.forEach((elemento) => {
  elemento.textContent = new Date().getFullYear();
});

// Identifica a página atual na navegação
const paginaAtual = window.location.pathname.split("/").pop() || "index.html";

document.querySelectorAll("#main-navigation a").forEach((link) => {
  const destino = link.getAttribute("href");

  if (destino === paginaAtual) {
    link.classList.add("active");
    link.setAttribute("aria-current", "page");
  } else {
    link.classList.remove("active");
    link.removeAttribute("aria-current");
  }
});

// Funções do modal acessível
const abrirModal = (modal) => {
  if (!modal) return;

  if (typeof modal.showModal === "function") {
    modal.showModal();
  } else {
    modal.setAttribute("open", "");
  }
};

const fecharModal = (modal) => {
  if (!modal) return;

  if (typeof modal.close === "function" && modal.open) {
    modal.close();
  } else {
    modal.removeAttribute("open");
  }
};

// Permite que outros módulos usem as funções do modal
export { abrirModal, fecharModal };
