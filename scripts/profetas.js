const url = 'https://byui-cse.github.io/cse-ww-program-pt/data/profetas-dos-ultimos-dias.json';

const cartoes = document.querySelector('#cartoes');

async function obterDadosDeProfetas() {
    const resposta = await fetch(url);
    const dados = await resposta.json();

    console.table(dados.profetas);

    exibirProfetas(dados.profetas);
}

const exibirProfetas = (profetas) => {
    profetas.forEach((profeta) => {
        const cartao = document.createElement('section');

        const nomeCompleto = document.createElement('h2');
        nomeCompleto.textContent = `${profeta.nome} ${profeta.sobrenome}`;

        const nascimento = document.createElement('p');
        nascimento.textContent = `Nascimento: ${profeta.nascimento}`;

        const localNascimento = document.createElement('p');
        localNascimento.textContent = `Local de nascimento: ${profeta.localNascimento}`;

        const retrato = document.createElement('img');

        const nome = `${profeta.nome} ${profeta.sobrenome}`;

        const imagensOficiais = {
            "Brigham Young":
                "https://newsroom.churchofjesuschrist.org/media/285x285/brigham-young-portrait.jpg",

            "John Taylor":
                "https://newsroom.churchofjesuschrist.org/media/285x285/John-Taylor-Painting.jpg",

            "Wilford Woodruff":
                "https://newsroom.churchofjesuschrist.org/media/285x285/e674e38ee2a82240a0020e07d23d0092734b1cfb.jpeg",

            "Lorenzo Snow":
                "https://newsroom.churchofjesuschrist.org/media/285x285/Lorenzo-Snow-Painting.jpg",

            "Joseph F. Smith":
                "https://newsroom.churchofjesuschrist.org/media/285x285/Joseph-F-Smith-Painting.jpg",

            "Heber J. Grant":
                "https://newsroom.churchofjesuschrist.org/media/285x285/Heber-J-Grant-Painting.jpg",

            "George A. Smith":
                "https://newsroom.churchofjesuschrist.org/media/285x285/George-Albert-Smith-Painting.jpg",

            "David O. McKay":
                "https://newsroom.churchofjesuschrist.org/media/285x285/David-O-McKay-Painting.jpg",

            "Joseph Fielding Smith":
                "https://newsroom.churchofjesuschrist.org/media/285x285/Joseph-Fielding-Smith-Painting.jpg",

            "Harold B. Lee":
                "https://newsroom.churchofjesuschrist.org/media/285x285/Harold-B-Lee-Painting.jpg",

            "Spencer W. Kimball":
                "https://newsroom.churchofjesuschrist.org/media/285x285/Spencer-W-Kimball-Painting.jpg",

            "Ezra Taft Benson":
                "https://newsroom.churchofjesuschrist.org/media/285x285/Ezra-Taft-Benson-Painting.jpg",

            "Howard W. Hunter":
                "https://newsroom.churchofjesuschrist.org/media/285x285/Howard-W-Hunter-Painting.jpg",

            "Gordon B. Hinckley":
                "https://newsroom.churchofjesuschrist.org/media/285x285/Gordon-B-Hinckley-Painting.jpg",

            "Thomas S. Monson":
                "https://newsroom.churchofjesuschrist.org/media/285x285/Thomas-Monson-Painting.jpg"
        };

        retrato.src = imagensOficiais[nome] || profeta.urlImagem;

        retrato.alt = `Retrato de ${profeta.nome} ${profeta.sobrenome}`;
        retrato.loading = 'lazy';
        retrato.width = 340;
        retrato.height = 440;

        cartao.appendChild(nomeCompleto);
        cartao.appendChild(nascimento);
        cartao.appendChild(localNascimento);
        cartao.appendChild(retrato);

        cartoes.appendChild(cartao);
    });
};

obterDadosDeProfetas();