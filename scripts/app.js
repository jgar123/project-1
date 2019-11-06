function main () {

  const grid = document.querySelector('#grid')
  const scoreBoard = document.querySelector('#score')
  const reset = document.querySelector('#reset')
  const leaderBoard = document.querySelector('#leaderboard')
  const sideBit = document.querySelector('#small-stuff')
  const width = 36
  const cells = []
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
    for (let i = 0; i < 10; i++) {
      const test = document.createElement('div')
      top10.push(test)
      leaderBoard.appendChild(test)
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
      for (let i = 0; i < width ** 2; i++) {
        grid.removeChild(grid.firstChild)
        grid.innerHTML = `GAME OVER - FINAL SCORE: ${score}`
        // sideBit.removeChild(sideBit.firstChild)

        // if (cells[i].classList.contains('player') || cells[i].classList.contains('food')) {
        //   cells[i].classList.remove('player')
        //   cells[i].classList.remove('food')
        // }
      }
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
    document.addEventListener('keydown', (e) => {
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

  // function resetGame() {
  //   reset.addEventListener('click', () => {
  //     // location.reload()
  //     grid.innerHTML = ''
  //     snake = [149, 150, 151, 152]
  //     score = 0
  //     speed = 150
  //     setup()
  //     snakeMove()
  //   })
  // }

  // resetGame()

}

window.addEventListener('DOMContentLoaded', main)

// const grid = document.querySelector('#grid')
// const width = 18
// const cells = []
// let player = 290
// let playerCord = []
// let intervalId
// let x
// let y



// const border = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 26, 27, 35, 36, 38, 39, 40, 41, 42, 44, 45, 47, 48, 49, 50, 51, 53, 54, 56, 57, 58, 59, 60, 62, 63, 65, 66, 67, 68, 69, 71, 72, 89, 90, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 107, 108, 114, 119, 125, 126, 127, 128, 129, 130, 132, 134, 135, 137, 139, 140, 141, 142, 143, 152, 153, 162, 163, 164, 165, 166, 168, 173, 175, 176, 177, 178, 179, 180, 181, 182, 183, 184, 186, 187, 188, 189, 190, 191, 193, 194, 195, 196, 197, 198, 206, 207, 215, 216, 218, 219, 220, 222, 224, 225, 227, 229, 230, 231, 233, 234, 236, 237, 238, 240, 245, 247, 248, 249, 251, 252, 258, 259, 260, 261, 262, 263, 269, 270, 272, 273, 274, 275, 276, 277, 278, 279, 280, 281, 282, 283, 284, 285, 287, 288, 305, 306, 307, 308, 309, 310, 311, 312, 313, 314, 315, 316, 317, 318, 319, 320, 321, 322, 323]

// function makeGrid() {
//   for (let i = 0; i < 18 ** 2; i++) {
//     const cell = document.createElement('div')
//     cells.push(cell)
//     grid.appendChild(cell)
//     cell.innerHTML = i
//   }
//   for (let i = 0; i < border.length; i++) {
//     cells[border[i]].classList.add('border')
//   }
// }

// makeGrid()

// cells[player].classList.add('player')

// // create direction variable when pacman movement is equal to it i.e. left then ignore other keystrokes until border reached???

// function pacCord (player) {
//   playerCord = []
//   x = player % width
//   y = (player - x) / width
//   playerCord.push(x)
//   playerCord.push(y)
//   return playerCord
// }

// function movePac() {
//   document.addEventListener('keyup', (e) => {
//     switch (e.key) {
//       case 'd': {
//         clearInterval(intervalId)
//         intervalId = setInterval(() => {
//           if (player === 161) {
//             cells[player].classList.remove('player')
//             player = 143
//             cells[player].classList.add('player')
//           }
//           if (cells[player + 1].classList.contains('border')) {
//             return
//           } 
//           cells[player].classList.remove('player')
//           player += 1
//           cells[player].classList.add('player')
//           console.log(pacCord(player))
//         }, 125)
//         break
//       }
//       case 'a': {
//         clearInterval(intervalId)
//         intervalId = setInterval(() => {
//           if (player === 144) {
//             cells[player].classList.remove('player')
//             player = 162
//             cells[player].classList.add('player')
//           }
//           if (cells[player - 1].classList.contains('border')) {
//             return
//           }
//           cells[player].classList.remove('player')
//           player -= 1
//           cells[player].classList.add('player')
//           console.log(pacCord(player))
//         }, 125)
//         break
//       }
//       case 'w': {
//         clearInterval(intervalId)
//         intervalId = setInterval(() => {
//           if (cells[player - width].classList.contains('border')) {
//             return
//           }
//           cells[player].classList.remove('player')
//           player = player - width
//           cells[player].classList.add('player')
//           console.log(pacCord(player))
//         }, 125)
//         break
//       }
//       case 's': {
//         clearInterval(intervalId)
//         intervalId = setInterval(() => {
//           if (cells[player + width].classList.contains('border')) {
//             return
//           }
//           cells[player].classList.remove('player')
//           player = player + width
//           cells[player].classList.add('player')
//           console.log(pacCord(player))
//         }, 125)
//         break
//       }
//     }
//   })
// }

// movePac()

// let ghost1 = 115
// let ghost2 = 118
// let ghost3 = 172

// let ghost1Hist = []

// cells[ghost1].classList.add('ghost')
// cells[ghost2].classList.add('ghost')
// cells[ghost3].classList.add('ghost')

// const area = [19, 20, 21, 22, 23, 24, 25, 28, 29, 30, 31, 32, 33, 34, 37, 43, 46, 52, 55, 61, 64, 70, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 91, 106, 109, 110, 111, 112, 113, 115, 116, 117, 118, 120, 121, 122, 123, 124, 131, 133, 136, 138, 144, 145, 146, 147, 148, 149, 150, 151, 154, 155, 156, 157, 158, 159, 160, 161, 167, 169, 170, 171, 172, 174, 185, 192, 199, 200, 201, 202, 203, 204, 205, 206, 207, 208, 209, 210, 211, 212, 213, 214, 217, 221, 223, 226, 228, 232, 235, 239, 241, 242, 243, 244, 246, 250, 253, 254, 255, 256, 257, 264, 265, 266, 267, 268, 271, 286, 289, 290, 291, 292, 293, 294, 295, 296, 297, 298, 299, 300, 301, 302, 303, 304]