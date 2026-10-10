
/* =========================================================
   MR. BROWNIE GOURMET
   Controle de modal acessível
   ========================================================= */

   import { abrirModal, fecharModal } from "./principal.js";

   const botoesAbrir = document.querySelectorAll("[data-modal-open]");
   
   botoesAbrir.forEach((botao) => {
     botao.addEventListener("click", () => {
       const idModal = botao.dataset.modalOpen;
       const modal = document.getElementById(idModal);
   
       if (!modal) {
         console.warn(`Modal "${idModal}" não encontrado.`);
         return;
       }
   
       // Guarda o botão para devolver o foco quando a janela fechar
       modal.dataset.botaoAnterior = botao.id || "";
   
       abrirModal(modal);
   
       // Coloca o foco em um elemento apropriado dentro do modal
       const elementoFoco = modal.querySelector(
         "[data-modal-close], button, a[href], input, textarea, select"
       );
   
       if (elementoFoco) {
         elementoFoco.focus();
       }
     });
   });
   
   document.querySelectorAll("dialog[data-modal]").forEach((modal) => {
     const botoesFechar = modal.querySelectorAll("[data-modal-close]");
   
     botoesFechar.forEach((botao) => {
       botao.addEventListener("click", () => {
         fecharModal(modal);
       });
     });
   
     // Permite fechar clicando fora do conteúdo do modal
     modal.addEventListener("click", (evento) => {
       if (evento.target === modal) {
         fecharModal(modal);
       }
     });
   
     // Devolve o foco ao botão que abriu o modal
     modal.addEventListener("close", () => {
       const idBotaoAnterior = modal.dataset.botaoAnterior;
   
       if (idBotaoAnterior) {
         document.getElementById(idBotaoAnterior)?.focus();
       }
     });
   });
   