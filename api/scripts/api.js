const tempAtual = document.querySelector("#temp-atual");
const iconeDoClima = document.querySelector("#icone-do-clima");
const descrDaLegenda = document.querySelector("figcaption");

const apiKey = "2621f4580e4d30673803a07e103bb4a6";

const url = `https://api.openweathermap.org/data/2.5/weather?lat=49.75&lon=6.64&units=metric&appid=${apiKey}`;

async function apiFetch() {
    try {
        const resposta = await fetch(url);

        if (resposta.ok) {
            const dados = await resposta.json();

            console.log(dados);
            mostrarResultados(dados);
        } else {
            throw Error(await resposta.text());
        }
    } catch (erro) {
        console.log(erro);
    }
}

function mostrarResultados(dados) {
    tempAtual.innerHTML = `${dados.main.temp}&deg;C`;

    const iconesrc = `https://openweathermap.org/img/wn/${dados.weather[0].icon}@2x.png`;
    const descr = dados.weather[0].description;

    iconeDoClima.setAttribute("src", iconesrc);
    iconeDoClima.setAttribute("alt", descr);
    descrDaLegenda.textContent = descr;
}

apiFetch();