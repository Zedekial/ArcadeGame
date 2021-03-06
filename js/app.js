'use strict';

// Enemies our player must avoid
// When a new enemy is created it is passed an x, y and reset number
var Enemy = function(x, y, reset) {
    // Declares variables which are used within the enemy object
    this.x = x;
    this.y = y;
    this.resetX = reset;
    this.startPos = x;
    // Height and width are declared for use later in collision calculations
    this.height = 70;
    this.width = 90;
    // Speed is set using the Math.random to create a number between 1 and 100
    // To stop the speed from rolling too low any final result has 65 added to it
    this.speed = Math.floor((Math.random() * 100) + 1) + 65;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // Sets the speed or 'movement' of the enemy object, this is multiplied by
    // the dt parameter for uniformity across computers.
    this.x += this.speed*dt;
    //Checks each enemy in the array and if they are at the end of the
    //Game board they are reset to the start and their speed is reset.
    if(this.x >= 510) {
      this.x = this.resetX;
      this.speed = Math.floor((Math.random() * 100) + 1) + 65;
    }
  };

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function(x, y) {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Player class object. This is built using an x and y coordinate and includes
// a height and width, sprite and score variable.
class Player {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    // As with enemy objects the height and width is used for collision calculations.
    this.height = 80;
    this.width = 65;
    this.sprite = 'images/char-boy.png';
    // Score is updated when gems are collected.
    this.score = 0;
  }
  update(dt) {
    const thisPlayer = this;
    if (won === false && this.y <= 50/this.height) {
      won = true;
      setTimeout(function(){
        if(won === true) {
          alert('You won!, you scored ' + thisPlayer.score + ' points!');
          //Reset is a global function which points to line 169 in engine.js
          //Reset refreshes the game state by resetting gems and enemies
          reset();
          won = false;
        }
      }, 350);
      setTimeout(function(){
        this.x = 200;
        this.y = 400;
      }, 200);
    }
    allEnemies.forEach(function(enemy) {
      //Collision between player and enemy bugs
      //Collision using Axis-Aligned Bounding Box off developer.mozilla.org
      // '2D_collision_detection'
      if(playerHit === false) {
        if (thisPlayer.x < enemy.x + enemy.width &&
          thisPlayer.x + thisPlayer.width > enemy.x &&
          thisPlayer.y < enemy.y + enemy.height &&
          thisPlayer.height + thisPlayer.y > enemy.y) {
            playerHit = true;
            if(playerHit === true) {
              setTimeout(function() {
                alert('Oops you were squashed by a bug!, how ironic');
                //Reset is a global function which points to line 169 in engine.js
                //Reset refreshes the game state by resetting gems and enemies
                reset();
              }, 190);
              setTimeout(function() {
                playerHit = false;
              }, 200);
            };
          }
        };
    });
    //Collision between player and gems
    //Collision using Axis-Aligned Bounding Box off
    // '2D_collision_detection'
    allGems.forEach(function(gem) {
      if (thisPlayer.x < gem.x + 10 &&
        thisPlayer.x + gem.width > gem.x &&
        thisPlayer.y < gem.y + 10 &&
        thisPlayer.height + thisPlayer.y > gem.y) {
          // Once a gem is collected it is spliced from the gem array.
          let gemIndex = allGems.indexOf(gem);
          let gemScore = gem.score;
          allGems.splice(gemIndex, 1);
          thisPlayer.score += gemScore;
        }
    });
  }

  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }

  // handleInput uses a switch to check for each input of the allowedKeys
  // this will first check to make sure the player isn't at the edge of the
  // game board, if true it will prevent movement in that direction.
  handleInput(key) {
    if(playerHit === false){
      switch (key) {
        case 'left':
          if (this.x === 0) {
          }else {
            this.x -= 100;
          }
          break;
        case 'right':
          if (this.x === 400) {
          }else {
            this.x += 100;
          }
          break;
        case 'up':
          if (this.y === -50) {
          }else {
            this.y -= 90;
          }
          break;
        case 'down':
          if (this.y >= 400) {
          }else {
            this.y += 90;
          }
          break;
      }
    }
  }
};

//Gems for extra score
class Gem {
  constructor(color, score, x, y, id) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.score = score;
    this.id = id;
    this.height = 60;
    this.width = 70;
    this.sprite = 'images/half-gem-' + this.color +'.png';
  }

  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
}

// A player object is created using the Player constructor, then a number of enemies
// and finally gems. The enemies and gems are added to their own arrays.
const player = new Player(200, 400);
const enemyOne = new Enemy(100, 60, -100);
const enemyTwo = new Enemy(100, 140, -100);
const enemyThree = new Enemy(100, 220, -200);
const enemyFour = new Enemy(-100, 60, -200);
const enemyFive = new Enemy(-100, 140, -200);
const enemySix = new Enemy(-100, 220, -100);
const enemySeven = new Enemy(-200, 60, -150);
const enemyEight = new Enemy(-200, 140, -150);
const enemyNine = new Enemy(-200, 220, -250);
const allEnemies = [enemyOne, enemyTwo, enemyThree, enemyFour, enemyFive, enemySix, enemySeven,
   enemyEight, enemyNine];

const gemOne = new Gem('blue', 400, 317, 80, 'blueOne');
const gemTwo = new Gem('green', 200, 17, 160, 'greenOne');
const gemThree = new Gem('orange', 100, 117, 240, 'orangeOne');
let allGems = [gemOne, gemTwo, gemThree];
// gemArray is declared here for the resetGems function.
let gemArray = allGems;

// Functions used for resetting the game for a win or a death.
function resetGems() {
  gemArray.splice(0, gemArray.length);
  allGems = [gemOne, gemTwo, gemThree];
}

function resetEnemies() {
  allEnemies.forEach(function(enemy){
      enemy.x = enemy.startPos;
  });
}

// These booleans are used in various checks.
let won = false;
let playerHit = false;

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});
