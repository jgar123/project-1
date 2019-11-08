function main () {

  const grid = document.querySelector('#grid')
  const scoreBoard = document.querySelector('#score')
  const reset = document.querySelector('#reset')
  const leaderBoard = document.querySelector('#leaderboard')
  const scoresOnTheDoors = document.querySelectorAll('#leaderboard div')
  const sideBit = document.querySelector('#small-stuff')
  const result = document.querySelector('#result')
  const width = 36
  let cells = []
  let snake = [149, 150, 151, 152]
  let intervalId
  let foodPosition
  let score = 0
  let speed = 150
  let top10 = []

  function scoring() {
    scoreBoard.innerHTML = score
  }

  function setup() {
    for (let i = 0; i < width ** 2; i++) {
      const cell = document.createElement('div')
      cells.push(cell)
      grid.appendChild(cell)
      // cell.innerHTML = i
    }
    for (let i = 0; i < width; i++) {
      cells[i].classList.add('border')
    }
    for (let i = (width * 2 - 1); i < width ** 2; i += width) {
      cells[i].classList.add('border')
    }
    for (let i = width ** 2 - width; i < width ** 2; i++) {
      cells[i].classList.add('border')
    }
    for (let i = width; i < width ** 2; i += width) {
      cells[i].classList.add('border')
    }
    for (let i = 0; i < snake.length; i++) {
      cells[snake[i]].classList.add('player')
    }

    foodRandomise()
  }

  setup()
  
  function foodRandomise() {
    foodPosition = Math.floor(Math.random() * width ** 2)
    if (snake.includes(foodPosition) || cells[foodPosition].classList.contains('border')) {
      foodRandomise()
    } else {
      cells[foodPosition].classList.remove('food')
      cells[foodPosition].classList.add('food')
    }
  }

  function selfCollision() {
    for (let i = 0; i < snake.length - 1; i++) {
      if (snake[snake.length - 1] === snake[i]) {
        return true
      }
    }
  }

  function loseConditions() {
    if (cells[snake[snake.length - 1]].classList.contains('border') || selfCollision() === true) {
      console.log('You lost weyyyyy')
      clearInterval(intervalId)
      cells = []
      grid.innerHTML = `GAME OVER! <br>SCORE: ${score}`
      grid.style.fontSize = 'xx-large'
      grid.style.color = 'white'
      grid.style.animation = 'fud 1s infinite'
      grid.style.textShadow = '5px 5px 1px #ff0000, 10px 10px 1px #0000ff'
      return true
    }
  }

  function foodEaten() {
    if (foodPosition === snake[snake.length - 1]) {
      score += 10
      scoring()
      snake.unshift(snake[0] - 1)
      cells[foodPosition].classList.remove('food')
      foodRandomise()
      speed -= 2
    }
  }

  function snakeMove() {
    document.addEventListener('keyup', (e) => {
      switch (e.key) {
        case 'd': {
          clearInterval(intervalId)
          intervalId = setInterval(() => {
            if (loseConditions() === true) {
              return
            }
            cells[snake[0]].classList.remove('player')
            for (let i = 0; i < snake.length - 1; i++) {
              snake[i] = snake[i + 1]
              cells[snake[i]].classList.add('player')
            }
            snake[snake.length - 1] += 1
            cells[snake[snake.length - 1]].classList.add('player')
            foodEaten()
          }, speed)
          break
        }
        case 'a': {
          clearInterval(intervalId)
          intervalId = setInterval(() => {
            if (loseConditions() === true) {
              return
            }
            cells[snake[0]].classList.remove('player')
            for (let i = 0; i < snake.length - 1; i++) {
              snake[i] = snake[i + 1]
              cells[snake[i]].classList.add('player')
            }
            snake[snake.length - 1] -= 1
            cells[snake[snake.length - 1]].classList.add('player')
            foodEaten()
          }, speed)
          break
        }
        case 'w': {
          clearInterval(intervalId)
          intervalId = setInterval(() => {
            if (loseConditions() === true) {
              return
            }
            cells[snake[0]].classList.remove('player')
            for (let i = 0; i < snake.length - 1; i++) {
              snake[i] = snake[i + 1]
              cells[snake[i]].classList.add('player')
            }
            snake[snake.length - 1] = snake[snake.length - 1] - width
            cells[snake[snake.length - 1]].classList.add('player')
            foodEaten()
          }, speed)
          break
        }
        case 's': {
          clearInterval(intervalId)
          intervalId = setInterval(() => {
            if (loseConditions() === true) {
              return
            }
            cells[snake[0]].classList.remove('player')
            for (let i = 0; i < snake.length - 1; i++) {
              snake[i] = snake[i + 1]
              cells[snake[i]].classList.add('player')
            }
            snake[snake.length - 1] = snake[snake.length - 1] + width
            cells[snake[snake.length - 1]].classList.add('player')
            foodEaten()
          }, speed)
          break
        }
      }
    })
  }

  snakeMove()

  function resetGame() {
    reset.addEventListener('click', () => {
      location.reload()

    })
  }

  resetGame()

}

window.addEventListener('DOMContentLoaded', main)

