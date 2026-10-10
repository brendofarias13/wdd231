
import { abrirModal, fecharModal } from "./principal.js";

const gradeSabores = document.querySelector("#flavor-grid");
const filtroSabores = document.querySelector("#flavor-filter");
const mensagemSabores = document.querySelector("#flavor-message");
const saborFavorito = document.querySelector("#favorite-flavor");

const CHAVE_FAVORITO = "favoriteFlavor";

let produtos = [];

const categorias = {
  todos: "Todos os produtos",
  "recheados-5": "Recheados de R$ 5",
  "recheados-7": "Recheados especiais de R$ 7",
  encomendas: "Mini brownies",
  sazonais: "Produtos sazonais"
};

// Sabores que não devem aparecer no catálogo.
const saboresRemovidos = ["oreo", "morango"];

function normalizarTexto(texto) {
  return String(texto || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim()
    .toLowerCase();
}

function obterFavorito() {
  try {
    return localStorage.getItem(CHAVE_FAVORITO) || "";
  } catch (erro) {
    console.warn("Não foi possível acessar os favoritos.", erro);
    return "";
  }
}

function salvarFavorito(nome) {
  try {
    localStorage.setItem(CHAVE_FAVORITO, nome);
    mostrarFavorito();
  } catch (erro) {
    console.warn("Não foi possível salvar o favorito.", erro);

    if (mensagemSabores) {
      mensagemSabores.textContent =
        "Não foi possível salvar seu favorito neste navegador.";
    }
  }
}

function escaparHTML(valor) {
  return String(valor).replace(/[&<>"']/g, (caractere) => {
    const entidades = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    };

    return entidades[caractere];
  });
}

function formatarPreco(preco, categoria) {
  if (categoria === "encomendas") {
    return `R$ ${Number(preco).toFixed(2).replace(".", ",")} o cento`;
  }

  return `R$ ${Number(preco).toFixed(2).replace(".", ",")}`;
}

function criarCard(produto) {
  const nome = escaparHTML(produto.nome);
  const descricao = escaparHTML(produto.descricao);
  const imagem = escaparHTML(produto.imagem);
  const categoria = escaparHTML(produto.categoria);
  const tamanho = escaparHTML(produto.tamanho);
  const peso = escaparHTML(produto.peso);
  const preco = formatarPreco(produto.preco, produto.categoria);
  const favoritoAtual = obterFavorito() === produto.nome;

  const card = document.createElement("article");
  card.className = "flavor-card";

  card.innerHTML = `
    <img
      src="${imagem}"
      alt="Brownie ${nome}"
      width="400"
      height="300"
      loading="lazy"
    >

    <div class="flavor-card-content">
      <p class="flavor-category">
        ${categorias[produto.categoria] || categoria}
      </p>

      <h3>${nome}</h3>
      <p>${descricao}</p>
      <p><strong>Preço:</strong> ${preco}</p>
      <p><strong>Tamanho:</strong> ${tamanho}</p>
      <p><strong>Peso:</strong> ${peso}</p>

      <button
        class="favorite-button"
        type="button"
        data-favorite="${nome}"
        aria-pressed="${favoritoAtual}"
      >
        ${favoritoAtual ? "★ Sabor favorito" : "☆ Favoritar sabor"}
      </button>
    </div>
  `;

  const imagemCard = card.querySelector("img");

  imagemCard.addEventListener("error", () => {
    imagemCard.alt = `Foto de ${produto.nome} indisponível`;
    imagemCard.classList.add("image-unavailable");
  });

  const botaoFavorito = card.querySelector("[data-favorite]");

  botaoFavorito.addEventListener("click", () => {
    salvarFavorito(produto.nome);
    renderizarProdutos();
  });

  return card;
}

function mostrarFavorito() {
  if (!saborFavorito) return;

  const favorito = obterFavorito();

  saborFavorito.textContent = favorito
    ? `Seu sabor favorito é: ${favorito}.`
    : "Escolha seu sabor favorito!";
}

function renderizarProdutos() {
  if (!gradeSabores) return;

  const categoriaSelecionada = filtroSabores?.value || "todos";

  const produtosFiltrados = produtos.filter((produto) => {
    return categoriaSelecionada === "todos" ||
      produto.categoria === categoriaSelecionada;
  });

  gradeSabores.replaceChildren();

  if (produtosFiltrados.length === 0) {
    if (mensagemSabores) {
      mensagemSabores.textContent =
        "Nenhum produto encontrado nesta categoria.";
    }
    return;
  }

  const fragmento = document.createDocumentFragment();

  produtosFiltrados.forEach((produto) => {
    fragmento.appendChild(criarCard(produto));
  });

  gradeSabores.appendChild(fragmento);

  if (mensagemSabores) {
    mensagemSabores.textContent =
      `${produtosFiltrados.length} produtos encontrados.`;
  }
}

async function carregarProdutos() {
  if (!gradeSabores) return;

  try {
    const resposta = await fetch("dados/sabores.json");

    if (!resposta.ok) {
      throw new Error(`Erro ao carregar os produtos: ${resposta.status}`);
    }

    const dados = await resposta.json();

    if (!Array.isArray(dados)) {
      throw new Error("O arquivo de produtos possui um formato inválido.");
    }

    produtos = dados.filter((produto) => {
      const nome = normalizarTexto(produto.nome);

      return !saboresRemovidos.some((sabor) => {
        return nome.includes(sabor);
      });
    });

    renderizarProdutos();
    mostrarFavorito();
  } catch (erro) {
    console.error("Erro ao carregar o catálogo:", erro);

    if (mensagemSabores) {
      mensagemSabores.textContent =
        "Não foi possível carregar os produtos. Confira o arquivo JSON e tente novamente.";
    }
  }
}

if (filtroSabores) {
  filtroSabores.addEventListener("change", renderizarProdutos);
}

carregarProdutos();
