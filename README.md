# project-1

## Overview

This is my first project of the General Assembly Software Engineering course. I was tasked with creating a simple grid based game to render in browser utilising HTML, CSS and Javascript. This project was to be completed individually. 

## Brief:
- Render a game in the browser
- Switch turns between two players
- Design logic for winning & visually display which player won
- Include separate HTML / CSS / JavaScript files
- Stick with KISS (Keep It Simple Stupid) and DRY (Don't Repeat Yourself) principles
- Use Javascript for DOM manipulation
- Deploy your game online, where the rest of the world can access it
- Use semantic markup for HTML and CSS (adhere to best practices)
- For this project, we were required to select a game to build and a result, have altered requirements:
    - The snake should be able to eat food to grow bigger
    - The game should end when the snake hits the wall or itself
    - Snake speeds up as it eats more

Technologies Used:
- HTML5
- CSS
- JavaScript (ES6)
- Git
- GitHub
- Google Fonts

## Approach taken:
### Grid layout:
I decided to display my grid using an array of div’s then use flex box to position the div’s correctly. Using this method allowed movement for the player more simple (n +/- width for up and down movement and n +/- 1 for left and right). Using this method allowed for board expansion with minor tweaks to the CSS. Snake ‘food’ was added to the grid randomly using math.random. To prevent food being added directly onto the player or the grid border, a check was added for the players current position.

### Functionality:
- Collision:
I had 3 types of collisions to deal with, the first with borders, the second with snake ‘food’ and the third, with the snake itself. For all 3, identifying the class of which the collision occurs determined the result. If a user ‘ate’ food they would receive 10 points, if they hit a wall it was game over and the same for if the user collided with themselves.
- Snake growth logic:
The snake growth logic required checking for the snake's collision with 'food'. The function below `foodEaten()` check's if the snake's head is equal to that of the food `foodPosition`. If true, it add's to the users score and adds to the snake array by taking the first value in the index and minus 1 from it. Then, the foodRandomise function is called to place the food down elsewhere on the grid and the speed of the snake is increase by 2ms (this is actually reducing the time on the setInterval specificied for the snakes movement). 
```
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
```
- Food placement:
Whilst generating the position of the food, I noticed the possiblity of the food being randomly placed on the snake. To avoid this, I decided to use recursion to run the function until the position the food was placed on a valid index on the grid.
```
 function foodRandomise() {
    foodPosition = Math.floor(Math.random() * width ** 2)
    if (snake.includes(foodPosition) || cells[foodPosition].classList.contains('border')) {
      foodRandomise()
    } else {
      cells[foodPosition].classList.remove('food')
      cells[foodPosition].classList.add('food')
    }
  }
```
## Screenshots
![Home screen](/images/snake.png)
![Game over](/images/gameover.png)

## Potential Future Features
- Mobile compatability
- Implement several levels and new methods of increasing the difficulty (instead of just increasing the snake speed).
- Store high scores on a back end server so they they would available to everyone playing the game. 

## Lessons learned
- The game of snake is simple to make logic wise and so attempting to refactor my code to make it as streamlined as possible was a real challenge.
- Planning is key part in game development as there were unforseen problems with the code that could have bee avoided with more planning.