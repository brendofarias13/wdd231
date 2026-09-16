export function definirSecaoSelecionada(secoes) {
  const elementoSelect = document.querySelector("#numeroSecao");

  secoes.forEach((secao) => {
    const option = document.createElement("option");
    option.value = secao.numeroSecao;
    option.textContent = `${secao.numeroSecao}`;
    elementoSelect.appendChild(option);
  });
}