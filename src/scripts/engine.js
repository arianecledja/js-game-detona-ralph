const state = {
  view: {
    squares: document.querySelectorAll('.square'),
    enemy: document.querySelector('.enemy'),
    timeLeft: document.querySelector('#time-left'),
    score: document.querySelector('#score'),
    lifes: document.querySelector('#lives')
  },
  values: {
    gameVelocity: 1000,
    hitPosition: 0,
    result: 0,
    curretTime: 60,
    remainingLives: 3
  },
  actions: {
    timerId: setInterval(randomSquare, 1000),
    countDownTimerId: setInterval(countDown, 1000),
  },
}

function playSound(audioName) {
  let audio = new Audio(`./src/audios/${audioName}.m4a`)
  audio.volume = 0.2
  audio.play()
}

function endGame() {
  clearInterval(state.actions.countDownTimerId)
  clearInterval(state.actions.timerId)
  state.values.remainingLives = 3
  alert("Game Over! O seu resultado foi: " + state.values.result)
  var result = confirm('Jogar novamente?')
  if(result == true) {
    location.reload()
  }
}

function countLifes() {
  if(state.values.remainingLives === 0) {
    endGame()
  }
}

function countDown() {
  state.values.curretTime--
  state.view.timeLeft.textContent = state.values.curretTime

  if (state.values.curretTime <= 0) {
    endGame()
  }
}

function randomSquare() {
  state.view.squares.forEach((square) => {
    square.classList.remove('enemy')
  })

  let randomNumber = Math.floor(Math.random() * 9)
  let randomSquare = state.view.squares[randomNumber]
  randomSquare.classList.add('enemy')
  state.values.hitPosition = randomSquare.id
}

function addListenerHitBox() {
  state.view.squares.forEach((square) => {
    square.addEventListener('mousedown', () => {
      if (square.id === state.values.hitPosition) {
        state.values.result++
        state.view.score.textContent = state.values.result
        state.values.hitPosition = null;
        playSound('hit')
      } else {
        state.values.remainingLives--
        state.view.lifes.textContent = state.values.remainingLives
        countLifes()
      }
    })
  })
}

function initialize() {
  addListenerHitBox()
}

initialize()


