// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    this.speed = speed;

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
    this.x += this.speed;

    if(this.x == 500)
    {
        this.x = -100;
        this.y = enemyPositions[Math.floor(Math.random() * (3))];
        this.speed = Math.floor(Math.random() * 6) + 5;
    }
    this.render();

};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
// Enemies our player must avoid
var Player = function(x, y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/char-pink-girl.png';
};

// Draw the enemy on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Update the player's position, required method for game
// Parameter: dt, a time delta between ticks
Player.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.render();

};

Player.prototype.handleInput = function(key)
{
    if(key == 'left')
    {
        if(this.x != 0)
            this.x -= 100;
    }
    else if(key == 'right')
    {
        if(this.x != 400)
            this.x += 100;
    }
    else if(key == 'down')
    {
        if (this.y != 400)
            this.y += 82;
    }
    else if(key == 'up')
    {
        if(this.y != -10)
            this.y -= 82;

        if(this.y == -10)
            setTimeout(function(){player = new Player(200, 400);}, 200);

    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var enemyPositions = [60, 140, 220];
var allEnemies = [];

var enemy = new Enemy(-100, enemyPositions[Math.floor(Math.random() * (3))], Math.floor(Math.random() * 6) + 5);
allEnemies.push(enemy);

var player = new Player(200, 400);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left', //-100 for x
        38: 'up',
        39: 'right', //+100 for x
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});