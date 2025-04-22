const intro= document.querySelector('.intro')
const btiniciaJogo= document.querySelector('#iniciaJogo')
const introMusic = new Audio ('./assets/audio/BleachSound.mp3')

intro.addEventListener('click',iniciaPartida)

function iniciaPartida (){
    intro.style.display='none'
    stage.style.display='flex'
    introMusic.play()
}

const stage= document.querySelector('.stage');
const symbols = ['Aizen', 'Ywahch'];
const player1jogadas = []
const player2jogadas = []
const board = []
let vencedor = false
let currentPlayer = 0

let possibilidadesVitoria =  [ 
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6] 
];


function pegaIdJogador (event){
    let idItemClicado =  event.target.id
    let itemClicado = event.target
   
        
    fazJogada(idItemClicado,itemClicado)   
}
stage.addEventListener('click',pegaIdJogador)



function addClass (itemClicado){
    
    itemClicado.classList.add(symbols[currentPlayer])
}


function fazJogada (id,item){
   

    if(!board.includes(id)){
        board.push(id)

        if(currentPlayer === 0){
           
            player1jogadas.push(Number(id))
            player1jogadas.sort()
            addClass(item)
            verificaVencedor(player1jogadas)
            currentPlayer++
        }else{
            player2jogadas.push(Number(id))
            player2jogadas.sort()
            addClass(item)
            verificaVencedor(player2jogadas)
            currentPlayer--
        }

    }else{
        alert('esse item já foi jogado');
    }
  
    
   
    verificaFim()
}


function verificaVencedor(playerJogada){
 
    possibilidadesVitoria.forEach(item =>{
       
        let verificaVencedor = playerJogada.includes(item[0]) && playerJogada.includes(item[1]) && playerJogada.includes(item[2])

        if(verificaVencedor){
            vencedor=true
            alert(`Fim de jogo, Jogador: ${symbols[currentPlayer].toUpperCase()} venceu!`);
            stage.removeEventListener('click',pegaIdJogador)

            reiniciaJogo()
        }

    })
  
    
}



function verificaFim(){
    const verificaEmpate = board.length === 9 && vencedor === false
    
    if(verificaEmpate){
        setTimeout(() => {
            alert('Empatou!')
            stage.removeEventListener('click',pegaIdJogador)
            reiniciaJogo()
        }, 300);
        
    }
    

}


function reiniciaJogo (){
    setTimeout(() => {
        location.reload()
    }, 1000);
}






