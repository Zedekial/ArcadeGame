// Enemies our player must avoid
var Enemy = function(x, y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    resetX = x;
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
  }
  update(dt) {
    if (player.y <= 50) {
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
          console.log('cant move');
        }else {
          console.log('left move');
          player.x -= 100;
        }
        break;
      case 'right':
        if (player.x === 400) {
          console.log('cant move');
        }else {
          console.log('right move');
          player.x += 100;
        }
        break;
      case 'up':
        if (player.y === -50) {
          console.log('cant move');
        }else {
          console.log('up move');
          player.y -= 90;
        }
        break;
      case 'down':
        if (player.y >= 400) {
          console.log('cant move');
        }else {
          console.log('up move');
          player.y += 90;
        }
        break;
    }
  }
};

//Gems for extra score
class Gem {
  constructor(color, score, x, y) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.score = score;
    this.height = 95;
    this.width = 90;
    this.sprite = 'images/gem-' + this.color +'.png';
  }

  update() {
    allGems.forEach(function(gem) {
      if (player.x < gem.x + gem.width &&
        player.x + player.width > gem.x &&
        player.y < gem.y + gem.height &&
        player.height + player.y > gem.y) {
          console.log('bling!')
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
    console.log('whoops you DIED')
    player.x = 200;
    player.y = 400;
  },

  playerWon: function() {
    console.log('you win!')
    setTimeout (function(){
      player.x = 200;
      player.y = 400;
    },1000)
  },
  gemCollected: function(score) {
    console.log('gem collected! ' + score + ' points')
  }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
const player = new Player(200, 400);
const enemyOne = new Enemy(-100, 60);
const enemyTwo = new Enemy(-100, 140);
const enemyThree = new Enemy(-100, 220);
const enemyFour = new Enemy(-200, 60);
const enemyFive = new Enemy(-200, 140);
const enemySix = new Enemy(-200, 220);
const enemySeven = new Enemy(-350, 60);
const enemyEight = new Enemy(-350, 140);
const enemyNine = new Enemy(-350, 220);
const allEnemies = [enemyOne, enemyTwo, enemyThree, enemyFour, enemyFive, enemySix, enemySeven,
   enemyEight, enemyNine];

const gemOne = new Gem('blue', 400, 302, 400);
const gemTwo = new Gem('green', 200, 2, 400);
const gemThree = new Gem('orange', 100, 102, 400);
const allGems = [gemOne, gemTwo, gemThree];

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
