var altura = 0
var largura = 0
var vidas = 1
var tempo = 15

var criaMosquitoTempo = 2500

var nivel = window.location.search
nivel = nivel.replace('?', '')

if(nivel === 'normal') {
    criaMosquitoTempo = 2500
}else if(nivel === 'dificil') {
    criaMosquitoTempo = 2000
}else if(nivel === 'maisQueDificil') {
    criaMosquitoTempo = 1500
}

function ajustaTamanhoPalcoJogo() {
    altura = window.innerHeight
    largura = window.innerWidth
    console.log(largura, altura)
}

ajustaTamanhoPalcoJogo()
//o DOM cria o objeto ID da variável cronometro e o 'innerHTML' é para usarmos esse ID no app.html junto com a variável tempo
var cronometro = setInterval(function(){
    tempo -= 1 //a variável tempo é decrementada para o tempo ir diminuindo e também é usada como valor do DOM

    if(tempo < 0) {
        clearInterval(cronometro) //interrompe a função setInterval para o jogo se encerrar
        clearInterval(criaMosca) //interrompe a função setInterval para mais mosquitos não aparecerem
        window.location.href = 'vitoria.html' //redireciona para a página 'vitoria'
    } else {
        document.getElementById('cronometro').innerHTML = tempo //através da tag span recuperamos esses valores no app.html
    }
}, 1000)

function posicaoRandomica() {

    //remover o mosquito anterior caso exista
    if(document.getElementById('mosquito')) {
        document.getElementById('mosquito').remove()

    //laço para perder vidas se o mosquito não for clicado e gerar o game over, está sendo acrescentado o coração vazio
        if(vidas > 3) {
            window.location.href = 'fim_de_jogo.html'
        }else
            document.getElementById('v' + vidas).src = "imagens/imagens/coracao_vazio.png"
            vidas ++
    }
    
    var posicaoX = Math.floor(Math.random() * largura) - 90 //Math.random é uma biblioteca utilizada para posições de elementos 
    var posicaoY = Math.floor(Math.random() * altura)  - 90 //Math.floor é para arredondamento de casas decimais 

    posicaoX = posicaoX < 0 ? 0 : posicaoX   //se o valor da posição for menor que 0, o valor da posição fica sendo 0 para a
    posicaoY = posicaoY < 0 ? 0 : posicaoY   //imagem não sumir do console 

    console.log(posicaoX, posicaoY)

    //criar o elemento html
    var mosquito = document.createElement('img')
    mosquito.src = 'imagens/imagens/mosca.png'
    mosquito.className = tamanhoAleatorio() + ' ' + ladoAleatorio()
    mosquito.style.left = posicaoX + 'px'
    mosquito.style.top = posicaoY + 'px'
    mosquito.style.position = 'absolute'
    mosquito.id = 'mosquito'
    mosquito.onclick = function() { //se clicarmos no mosquito as vidas não vão ser alteradas 
        this.remove()
    }

    document.body.appendChild(mosquito)

    tamanhoAleatorio()
}

function tamanhoAleatorio() {
    var classe = Math.floor(Math.random() * 3) //é multiplicado por 3 por causa das classes 
    
    switch(classe) {
        case 0:
            return 'mosquito1'
        case 1:
            return 'mosquito2'
        case 2:
            return 'mosquito3'
    }
}

function ladoAleatorio() {
    var classe = Math.floor(Math.random() * 2) //é multiplicado por 2 por causa das classes 
    
    switch(classe) {
        case 0:
            return 'ladoA'
        case 1:
            return 'ladoB'
    }
}
