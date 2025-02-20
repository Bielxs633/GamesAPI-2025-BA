'use strict'

async function pesquisarGames(jogo){
    const url = `https://api.allorigins.win/get?url=${encodeURIComponent('https://www.freetogame.com/api/games?category=' + jogo)}`
    const response = await fetch(url)

    const data = await response.json()
    return JSON.parse(data.contents)
}

async function criarJogo(jogo){
    const galeria = document.getElementById('galeria')
    const novoJogo = document.createElement('div')
    
    const imagem = document.createElement('img')
    imagem.src = jogo.thumbnail
    imagem.alt = jogo.title
    imagem.style.width = '300px'

    const titulo = document.createElement('p')
    titulo.textContent = jogo.title

    novoJogo.appendChild(imagem)
    novoJogo.appendChild(titulo)
    galeria.appendChild(novoJogo)
}

async function preencherGames() {
    const jogo = document.getElementById('jogo').value
    
    try {
        const games = await pesquisarGames(jogo)
        const galeria = document.getElementById('galeria')
        galeria.replaceChildren('')

        if (games.length === 0) {
            const mensagem = document.createElement('p')
            mensagem.textContent = 'Nenhum jogo encontrado.'
            galeria.appendChild(mensagem);
            return;
        }

        games.forEach(criarJogo)
    } catch (error) {
        console.error(error)
        const galeria = document.getElementById('galeria')
        galeria.innerHTML = '<p>Erro ao buscar jogos. Tente novamente mais tarde.</p>'
    }
}

document.getElementById('pesquisar').addEventListener('click', preencherGames)