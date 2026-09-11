const membrosContainer = document.querySelector("#membros");
const gradeButton = document.querySelector("#grade-button");
const listaButton = document.querySelector("#lista-button");
const menuButton = document.querySelector("#menu-button");
const navigation = document.querySelector("#navigation");


// ==============================
// MENU RESPONSIVO
// ==============================

menuButton.addEventListener("click", () => {
    navigation.classList.toggle("aberto");

    const menuAberto = navigation.classList.contains("aberto");

    menuButton.setAttribute(
        "aria-label",
        menuAberto ? "Fechar menu" : "Abrir menu"
    );
});


// ==============================
// BUSCAR MEMBROS
// ==============================

const obterMembros = async () => {

    try {

        const resposta = await fetch("data/membros.json");

        if (!resposta.ok) {
            throw new Error("Não foi possível carregar os membros.");
        }

        const membros = await resposta.json();

        exibirMembros(membros);

    } catch (erro) {

        console.error("Erro:", erro);

        membrosContainer.innerHTML = `
            <p class="erro">
                Não foi possível carregar os membros.
            </p>
        `;
    }
};


// ==============================
// EXIBIR MEMBROS
// ==============================

const exibirMembros = (membros) => {

    membrosContainer.innerHTML = "";

    membros.forEach((membro) => {

        const cartao = document.createElement("article");

        cartao.classList.add("cartao-membro");

        let nomeNivel;

        if (membro.nivel === 3) {
            nomeNivel = "Ouro";
        } else if (membro.nivel === 2) {
            nomeNivel = "Prata";
        } else {
            nomeNivel = "Membro";
        }

        cartao.innerHTML = `
            <img 
                src="imagens/${membro.imagem}" 
                alt="Logo da empresa ${membro.nome}"
                loading="lazy"
                width="220"
                height="140"
            >

            <h3>${membro.nome}</h3>

            <p>
                <strong>Categoria:</strong>
                ${membro.categoria}
            </p>

            <p>
                ${membro.descricao}
            </p>

            <p>
                <strong>Endereço:</strong><br>
                ${membro.endereco}
            </p>

            <p>
                <strong>Telefone:</strong>
                ${membro.telefone}
            </p>

            <span class="nivel">
                Associação: ${nomeNivel}
            </span>

            <br>

            <a 
                href="${membro.site}" 
                target="_blank"
                rel="noopener noreferrer"
            >
                Visitar site
            </a>
        `;

        membrosContainer.appendChild(cartao);
    });
};


// ==============================
// VISUALIZAÇÃO EM GRADE
// ==============================

gradeButton.addEventListener("click", () => {

    membrosContainer.classList.remove("lista");
    membrosContainer.classList.add("grade");

    gradeButton.classList.add("ativo");
    listaButton.classList.remove("ativo");
});


// ==============================
// VISUALIZAÇÃO EM LISTA
// ==============================

listaButton.addEventListener("click", () => {

    membrosContainer.classList.remove("grade");
    membrosContainer.classList.add("lista");

    listaButton.classList.add("ativo");
    gradeButton.classList.remove("ativo");
});


// ==============================
// ANO ATUAL
// ==============================

document.querySelector("#current-year").textContent =
    new Date().getFullYear();


// ==============================
// ÚLTIMA MODIFICAÇÃO
// ==============================

document.querySelector("#last-modified").textContent =
    document.lastModified;


// ==============================
// INICIAR
// ==============================

obterMembros();