// Enemies our player must avoid
var Enemy = function(x, y, reset) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    resetX = reset;
    this.height = 70;
    this.width = 100;
    this.speed = Math.floor((Math.random() * 100) + 1) + 65;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    //Sets the speed or 'movement' of the
    this.x += this.speed*dt;
    //Checks each enemy in the array and if they are at the end of the
    //Game board they are reset to the start and their speed is reset.
    allEnemies.forEach(function(enemy) {
      if(enemy.x >= 510) {
        enemy.x = resetX;
        this.speed = Math.floor((Math.random() * 100) + 1) + 65;
      }else {

      }
    });
    //Collision between player and enemy bugs
    //Collision using Axis-Aligned Bounding Box off developer.mozilla.org
    // '2D_collision_detection'
    allEnemies.forEach(function(enemy) {
      if (player.x < enemy.x + enemy.width &&
        player.x + player.width > enemy.x &&
        player.y < enemy.y + enemy.height &&
        player.height + player.y > enemy.y) {
          console.log('collision')
          playerInstances.playerDied();
        }
    });
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function(x, y) {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.height = 80;
    this.width = 70;
    this.sprite = 'images/char-boy.png';
    this.score = 0;
  }
  update(dt) {
    if (won === false && player.y <= 50/player.height) {
      playerInstances.playerWon();
    }
  }

  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }

  handleInput(key) {
    switch (key) {
      case 'left':
        if (player.x === 0) {
        }else {
          player.x -= 100;
        }
        break;
      case 'right':
        if (player.x === 400) {
        }else {
          player.x += 100;
        }
        break;
      case 'up':
        if (player.y === -50) {
        }else {
          player.y -= 90;
        }
        break;
      case 'down':
        if (player.y >= 400) {
        }else {
          player.y += 90;
        }
        break;
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

  update() {
    allGems.forEach(function(gem) {
      if (player.x < gem.x + 10 &&
        player.x + player.width > gem.x &&
        player.y < gem.y + 10 &&
        player.height + player.y > gem.y) {
          console.log('bling!')
          gemToKill = gem.id;
          let gemName = gem.id;
          let gemIndex = allGems.indexOf(gem);
          if(gemToKill == gemName) {
            allGems.splice(gemIndex, 1);
          }
          playerInstances.gemCollected(gem.score);
        }
    });
  }

  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
}

//Instances for player such as death (collision) and winning (crossing the path)
var playerInstances = {
  playerDied: function() {
    player.x = 200;
    player.y = 400;
  },

  playerWon: function() {
    won = true;
    setTimeout(function(){
      if(won === true) {
        won = false;
        alert('You won!, you scored ' + player.score + ' points!');
      }
    }, 350)
    setTimeout(function(){
      player.x = 200;
      player.y = 400;
    }, 200)
  },
  gemCollected: function(score) {
    player.score += score;
  }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
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
const allGems = [gemOne, gemTwo, gemThree];

let gemToKill = '';
let won = false;


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
