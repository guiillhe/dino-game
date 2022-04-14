const dino = document.querySelector(".dino")
const background = document.querySelector(".background")

let isJumping = false;
let position = 0
let score = 0  

//função para saber qual tecla eu estou usando 
function handleKeyUp(event) {
  if (event.keyCode === 32) {
    jump()
    
    if (!isJumping) {
      jump();
    } 
  }
}

//Função do pulo 
function jump() {

     
  isJumping = true
  let upInterval = setInterval(()=>{
    if (position>=150) {
      clearInterval(upInterval); 

      let downInterval = setInterval(() => {
        if (position <= 0) {
          clearInterval(downInterval);
          isJumping = false;
        } else {
          position -= 20;
          dino.style.bottom = position + 'px';
        }
      }, 20);
    } else {   
  }
    position += 20;
    dino.style.bottom = position+'px'
  },20);
}
//Fim função do pulo 
//criação dos cactos
function createCactus(){
  const cactus = document.createElement('div');
  let cactusPosition = 1000;
  let randomTime = Math.random() * 6000;


  cactus.classList.add('cactus');
  cactus.style.left = cactusPosition + 'px';
  background.appendChild(cactus)

  let leftTimer = setInterval(() => {
    

    if (cactusPosition < -60) {
      // Saiu da tela
      clearInterval(leftTimer);
      background.removeChild(cactus);
      score += 10;
      document.querySelector('.score').innerHTML = "Pontos: " + score; 
    }else if (cactusPosition > 0 && cactusPosition < 60 && position < 20) {
      //console.log('bateu')
      // Game over
      clearInterval(leftTimer);
      background.removeChild(cactus);
      isGameOver = true;
      document.body.innerHTML = `<div class="game-over"><h1>Game over  </h1><h2 class="sub">Você fez ${score} pontos</h2> <button class="button" onclick="window.location.reload();"> Restart</button></div>`;
    }else{
      cactusPosition -=10
      cactus.style.left = cactusPosition +'px';
    }
    },20 );

    setTimeout(createCactus, randomTime)
   
}
createCactus();
document.addEventListener('keyup', handleKeyUp);