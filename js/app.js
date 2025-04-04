// Array para armazenar os nomes dos amigos
let amigos = [];

// Função para adicionar um amigo à lista
function adicionar() { 
    const input = document.getElementById('nome-amigo');
    if(input.value == '') {
        alert('Informe o nome.');
        return;
    }

    const nomeAmigo = input.value.trim();

    if (nomeAmigo) {
        amigos.push(nomeAmigo);
        input.value = ''; // Limpa o campo de entrada
        atualizarListaAmigos();
    } else {
        alert('Por favor, digite um nome válido.');
    }
}

function excluirAmigo(index) {
    amigos.splice(index, 1);
    atualizarLista();
    atualizarSorteio();
}

// Função para atualizar a lista de amigos na tela
function atualizarListaAmigos() {
    let lista = document.getElementById('lista-amigos');
    lista.innerHTML = '';


    for (let i = 0; i < amigos.length; i++) {
        // Cria um elemento de parágrafo para cada amigo
        let paragrafo = document.createElement('p');
        paragrafo.textContent = amigos[i];
       
        // Adiciona um evento de clique para excluir o amigo
        paragrafo.addEventListener('click', function() {
            excluirAmigo(i);
        });


        // Adiciona o parágrafo à lista
        lista.appendChild(paragrafo);
    }
}

// Função para sortear um amigo secreto
function sortear() {
    if (amigos.length < 2) {
        alert('Adicione pelo menos dois amigos para sortear.');
        return;
    }

    const sorteio = amigos.slice(); // Faz uma cópia da lista de amigos
    const resultados = {};

    // Embaralha a lista de amigos
    embaralhar(amigos);

    // Atribui cada amigo a outro amigo
    for (let i = 0; i < amigos.length; i++) {
        const amigo = amigos[i];
        const amigoSorteado = sorteio[(i + 1) % amigos.length]; // O próximo na lista
        resultados[amigo] = amigoSorteado;
    }

    mostrarResultados(resultados);
}

function embaralhar(lista) {
    for (let indice = lista.length; indice; indice--) {
        const indiceAleatorio = Math.floor(Math.random() * indice);
        [lista[indice - 1], lista[indiceAleatorio]] = [lista[indiceAleatorio], lista[indice - 1]];
    }
}

// Função para mostrar os resultados do sorteio
function mostrarResultados(resultados) {
    let sorteio = document.getElementById('lista-sorteio');
    for (let i = 0; i < amigos.length; i++) {
        if (i == amigos.length - 1) {
            sorteio.innerHTML = sorteio.innerHTML + amigos[i] +' --> ' +amigos[0] + '<br/>';
        } else {
            sorteio.innerHTML = sorteio.innerHTML + amigos[i] +' --> ' +amigos[i + 1] + '<br/>';
        }
    }
}
// Função para reiniciar o jogo
function reiniciar() {
    amigos = [];
    atualizarListaAmigos();
    document.getElementById('lista-sorteio').innerHTML = '';
    document.getElementById('nome-amigo').value = '';
}