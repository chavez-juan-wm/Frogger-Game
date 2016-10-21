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
    this.render();

    this.x += (this.speed * dt);

    if(this.x >= 510)
    {
        this.x = -100;
        this.y = enemyPositions[randomNumber(2, 0)];
        this.speed = randomNumber(400, 200);
    }

    checkCollision(this.x, this.y);
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

function randomNumber(max, min){
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function(x, y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    this.row = -2;

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/char-boy.png';
};

// Draw the player on the screen, required method for game
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
        {
            this.y += 82;
            this.row--;
        }
    }
    else if(key == 'up')
    {
        if(this.y != -10)
        {
            this.y -= 82;
            this.row++;
        }

        if(this.y == -10)
        {
            this.nextLevel();
        }
    }
};

Player.prototype.nextLevel = function()
{
    if(allEnemies.length != 5)
        allEnemies.push(new Enemy(-100, enemyPositions[randomNumber(2, 0)], randomNumber(400, 200)));
    player = new Player(200, 400);
};

function checkCollision(enemyX, enemyY)
{
    if (player.x < enemyX + 50 &&
        player.x + 50 > enemyX &&
        player.y < enemyY + 50 &&
        50 + player.y > enemyY) {
        // collision detected!
        player = new Player(200, 400);
    }

}


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var enemyPositions = [220, 140, 60];
var allEnemies = [];

var enemy = new Enemy(-100, enemyPositions[randomNumber(2, 0)], randomNumber(400, 200));
allEnemies.push(enemy);

var player = new Player(200, 400);

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
