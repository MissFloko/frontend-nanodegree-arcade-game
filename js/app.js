// Enemies our player must avoid
var Enemy = function(x,y,speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';

    this.x = x;
    this.y = y;

    this.speed = speed;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if(player.hasWon){
        return;
    }
    this.x += (this.speed * dt);
    if(this.x >= 5) {
        this.x = 0;
    }
    
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x*101, this.y*70);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function () {
    this.sprite = 'images/char-horn-girl.png';
    
    //value in column
    this.reset();
    
};

Player.prototype.update = function() {

};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite),this.x*101, this.y*75);
};

Player.prototype.reset = function() {
    this.x = 2;
    this.y = 5;
    this.hasWon = false;
    
}

Player.prototype.handleInput = function(direction) {
    if(player.hasWon){
        return;
    }
    switch(direction) {
        case "up":
            if(this.y > 0) this.y--;
            break;
        case "right":
            if(this.x < 4) this.x++;
            break;
        case "down":
            if(this.y < 5) this.y++;
            break;
        case "left":
            if(this.x > 0) this.x--;
            break;
        default:
            break;
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
const allEnemies = [new Enemy(0,1,1), new Enemy(1,2,1.6), new Enemy(2,3,1.2)];
const player = new Player();
var tries = 1;

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

function checkCollisions() {
    const hasCollided = allEnemies.some(function(enemy){
        return Math.floor(enemy.x) === player.x && enemy.y === player.y
    });

    if (hasCollided) {
        player.reset();
        incrementScore();
    }
}

function incrementScore(){
    tries++;
}

function checkWin() {
    if (player.y === 0 && !player.hasWon) {
        player.hasWon = true;

        setTimeout(() => resetGame(), 1500);
    }
}

function resetGame() {
    player.reset();
    playerHasWon = false;
    tries = 1;
}
