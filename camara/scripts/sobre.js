import { interesses } from "../data/interesses.mjs";

const galeria = document.querySelector("#galeria-interesses");
const mensagemVisita = document.querySelector("#mensagem-visita");

// Cria os cartões dos locais
interesses.forEach((local) => {
    const card = document.createElement("article");
    card.classList.add("interesse-card");

    card.innerHTML = `
        <h2>${local.nome}</h2>

        <figure>
            <img
                src="${local.imagem}"
                alt="${local.nome}"
                loading="lazy"
                width="300"
                height="200"
            >
        </figure>

        <address>${local.endereco}</address>

        <p>${local.descricao}</p>

        <a
            href="${local.link}"
            target="_blank"
            rel="noopener noreferrer"
            class="botao-saiba-mais"
        >
            Saiba mais
        </a>
    `;

    galeria.appendChild(card);
});

// Controle da última visita
const ultimaVisita = localStorage.getItem("ultimaVisita");
const agora = Date.now();

if (!ultimaVisita) {
    mensagemVisita.textContent =
        "Boas-vindas! Entre em contato conosco caso tenha alguma dúvida.";
} else {
    const diferenca = agora - Number(ultimaVisita);
    const dias = Math.floor(diferenca / (1000 * 60 * 60 * 24));

    if (dias < 1) {
        mensagemVisita.textContent = "Já voltou? Que legal!";
    } else if (dias === 1) {
        mensagemVisita.textContent =
            "Seu último acesso foi há 1 dia.";
    } else {
        mensagemVisita.textContent =
            `Seu último acesso foi há ${dias} dias.`;
    }
}

localStorage.setItem("ultimaVisita", agora);