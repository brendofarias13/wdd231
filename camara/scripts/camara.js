// ==============================
// ELEMENTOS DO SITE
// ==============================

const membrosContainer = document.querySelector("#membros");
const gradeButton = document.querySelector("#grade-button");
const listaButton = document.querySelector("#lista-button");
const menuButton = document.querySelector("#menu-button");
const navigation = document.querySelector("#navigation");

// ==============================
// MENU RESPONSIVO
// ==============================

if (menuButton && navigation) {
    menuButton.addEventListener("click", () => {
        navigation.classList.toggle("aberto");

        const menuAberto = navigation.classList.contains("aberto");

        menuButton.setAttribute(
            "aria-label",
            menuAberto ? "Fechar menu" : "Abrir menu"
        );
    });
}

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

        if (membrosContainer) {
            exibirMembros(membros);
        }

        exibirDestaques(membros);

    } catch (erro) {
        console.error("Erro:", erro);

        if (membrosContainer) {
            membrosContainer.innerHTML = `
                <p class="erro">
                    Não foi possível carregar os membros.
                </p>
            `;
        }
    }
};

// ==============================
// EXIBIR MEMBROS DO DIRETÓRIO
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

if (gradeButton && listaButton && membrosContainer) {

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
}

// ==============================
// OPENWEATHERMAP
// ==============================


const API_KEY = "2621f4580e4d30673803a07e103bb4a6";

const LATITUDE = -4.9475;
const LONGITUDE = -47.5050;

// ==============================
// CLIMA ATUAL
// ==============================

const obterClima = async () => {

    const temperaturaElemento =
        document.querySelector("#temperatura");

    const descricaoElemento =
        document.querySelector("#descricao-tempo");

    if (!temperaturaElemento || !descricaoElemento) {
        return;
    }

    try {

        const url =
            `https://api.openweathermap.org/data/2.5/weather?lat=${LATITUDE}&lon=${LONGITUDE}&units=metric&lang=pt_br&appid=${API_KEY}`;

        const resposta = await fetch(url);

        if (!resposta.ok) {
            throw new Error("Não foi possível obter o clima.");
        }

        const dados = await resposta.json();

        temperaturaElemento.textContent =
            `${Math.round(dados.main.temp)} °C`;

        descricaoElemento.textContent =
            dados.weather[0].description;

    } catch (erro) {

        console.error("Erro ao buscar clima:", erro);

        temperaturaElemento.textContent =
            "Indisponível";

        descricaoElemento.textContent =
            "Não foi possível carregar o clima.";
    }
};

// ==============================
// PREVISÃO DO TEMPO
// ==============================

const obterPrevisao = async () => {

    const previsaoElemento =
        document.querySelector("#previsao");

    if (!previsaoElemento) {
        return;
    }

    try {

        const url =
            `https://api.openweathermap.org/data/2.5/forecast?lat=${LATITUDE}&lon=${LONGITUDE}&units=metric&lang=pt_br&appid=${API_KEY}`;

        const resposta = await fetch(url);

        if (!resposta.ok) {
            throw new Error("Não foi possível obter a previsão.");
        }

        const dados = await resposta.json();

        const previsoes = dados.list
            .filter((item) => item.dt_txt.includes("12:00:00"))
            .slice(0, 3);

        previsaoElemento.innerHTML = "";

        previsoes.forEach((dia) => {

            const data = new Date(dia.dt_txt);

            const cartao = document.createElement("article");

            cartao.classList.add("previsao-dia");

            cartao.innerHTML = `
                <h4>
                    ${data.toLocaleDateString("pt-BR", {
                        weekday: "long",
                        day: "2-digit",
                        month: "2-digit"
                    })}
                </h4>

                <p>
                    <strong>
                        ${Math.round(dia.main.temp)} °C
                    </strong>
                </p>

                <p>
                    ${dia.weather[0].description}
                </p>
            `;

            previsaoElemento.appendChild(cartao);
        });

    } catch (erro) {

        console.error("Erro ao buscar previsão:", erro);

        previsaoElemento.innerHTML = `
            <p>
                Não foi possível carregar a previsão.
            </p>
        `;
    }
};

// ==============================
// EMPRESAS EM DESTAQUE
// ==============================

const exibirDestaques = (membros) => {

    const destaques =
        document.querySelector("#destaques");

    if (!destaques) {
        return;
    }

    const membrosElegiveis = membros.filter((membro) => {
        return membro.nivel === 2 || membro.nivel === 3;
    });

    const empresasEmbaralhadas =
        [...membrosElegiveis].sort(() => Math.random() - 0.5);

    const empresasSelecionadas =
        empresasEmbaralhadas.slice(0, 3);

    destaques.innerHTML = "";

    empresasSelecionadas.forEach((membro) => {

        const cartao = document.createElement("article");

        cartao.classList.add("cartao-destaque");

        let nomeNivel;

        if (membro.nivel === 3) {
            nomeNivel = "Ouro";
        } else {
            nomeNivel = "Prata";
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
                <strong>Telefone:</strong>
                ${membro.telefone}
            </p>

            <p>
                <strong>Endereço:</strong><br>
                ${membro.endereco}
            </p>

            <p>
                <strong>Associação:</strong>
                ${nomeNivel}
            </p>

            <a 
                href="${membro.site}"
                target="_blank"
                rel="noopener noreferrer"
            >
                Visitar site
            </a>
        `;

        destaques.appendChild(cartao);
    });
};

// ==============================
// ANO ATUAL
// ==============================

const anoAtual = document.querySelector("#current-year");

if (anoAtual) {
    anoAtual.textContent = new Date().getFullYear();
}

// ==============================
// ÚLTIMA MODIFICAÇÃO
// ==============================

const ultimaModificacao =
    document.querySelector("#last-modified");

if (ultimaModificacao) {
    ultimaModificacao.textContent = document.lastModified;
}

// ==============================
// INICIAR
// ==============================

obterMembros();
obterClima();
obterPrevisao();