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

    //stop the enemies when the player win the game
    if(player.hasWon){
        return;
    }
    //update the enemies position
    this.x += (this.speed * dt);
    if(this.x >= 5) {
        this.x = 0;
    }
    
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x*101, this.y*70);
};

//Player class
var Player = function () {
    this.sprite = 'images/char-horn-girl.png';
    
    //replace the player at his initial position
    this.reset();
    
};

Player.prototype.update = function() {

};


//draw the player on the screen
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite),this.x*101, this.y*77);
};

//reset the player position
Player.prototype.reset = function() {
    this.x = 2;
    this.y = 5;

    //initialize the condition : player won or not
    this.hasWon = false;
    
}

//handle the player movements
Player.prototype.handleInput = function(direction) {
    //stop the player when it has won the game
    if(player.hasWon){
        return;
    }
    //limit the player movements in the canvas
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

// verify if the player won the game
Player.prototype.checkWin = function() {
    if (player.y === 0 && !player.hasWon) {
        player.hasWon = true;

        setTimeout(() => resetGame(), 1500);
    }
}

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

    //accept only entries from the keys listed above
    player.handleInput(allowedKeys[e.keyCode]);
});

//verify if there is a collision between an enemy and the player
function checkCollisions() {
    const hasCollided = allEnemies.some(function(enemy){
        return Math.floor(enemy.x) === player.x && enemy.y === player.y
    });

    if (hasCollided) {
        player.reset();
        incrementScore();
    }
}

//increment the number of tries to win the game
function incrementScore(){
    tries++;
}

//reset the whole game
function resetGame() {
    player.reset();
    playerHasWon = false;
    tries = 1;
}
