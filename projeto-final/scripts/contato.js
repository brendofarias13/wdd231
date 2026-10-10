
const formulario = document.querySelector("#form-contato");
const resultado = document.querySelector("#resultado-contato");

const camposResultado = {
  nome: document.querySelector("#resultado-nome"),
  telefone: document.querySelector("#resultado-telefone"),
  assunto: document.querySelector("#resultado-assunto"),
  mensagem: document.querySelector("#resultado-mensagem")
};

const numeroWhatsApp = "5599991599690";

const assuntos = {
  pedido: "Fazer um pedido",
  duvida: "Tirar uma dúvida",
  informacao: "Informações sobre produtos",
  outro: "Outro assunto"
};

function mostrarResultado() {
  const parametros = new URLSearchParams(window.location.search);

  if (!parametros.has("nome") || !parametros.has("mensagem")) {
    return;
  }

  const nome = parametros.get("nome")?.trim() || "";
  const telefone = parametros.get("telefone")?.trim() || "";
  const assunto = parametros.get("assunto") || "";
  const mensagem = parametros.get("mensagem")?.trim() || "";

  if (!nome || !mensagem || !assuntos[assunto]) {
    return;
  }

  camposResultado.nome.textContent = nome;
  camposResultado.telefone.textContent = telefone || "Não informado";
  camposResultado.assunto.textContent = assuntos[assunto];
  camposResultado.mensagem.textContent = mensagem;

  resultado.hidden = false;

  const textoWhatsApp = [
    "Olá! Enviei uma mensagem pelo site da Mr. Brownie Gourmet.",
    "",
    `Nome: ${nome}`,
    `Telefone: ${telefone || "Não informado"}`,
    `Assunto: ${assuntos[assunto]}`,
    `Mensagem: ${mensagem}`
  ].join("\n");

  const linkWhatsApp = document.querySelector("#link-whatsapp");

  if (linkWhatsApp) {
    linkWhatsApp.href =
      `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(textoWhatsApp)}`;
  }
}

if (formulario) {
  formulario.addEventListener("submit", (evento) => {
    if (!formulario.checkValidity()) {
      evento.preventDefault();
      formulario.reportValidity();
    }
  });
}

mostrarResultado();
