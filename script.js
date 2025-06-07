const canvas = document.getElementById('pong');
const ctx = canvas.getContext('2d');

// Game constants
const WIDTH = canvas.width;
const HEIGHT = canvas.height;
const PADDLE_WIDTH = 12;
const PADDLE_HEIGHT = 90;
const BALL_SIZE = 14;
const PADDLE_MARGIN = 18;
const PLAYER_COLOR = "#09f";
const AI_COLOR = "#f33";
const BALL_COLOR = "#fff";

// Paddle objects
const player = {
    x: PADDLE_MARGIN,
    y: HEIGHT/2 - PADDLE_HEIGHT/2,
    width: PADDLE_WIDTH,
    height: PADDLE_HEIGHT,
    color: PLAYER_COLOR,
    dy: 0 // Not used for player
};

const ai = {
    x: WIDTH - PADDLE_MARGIN - PADDLE_WIDTH,
    y: HEIGHT/2 - PADDLE_HEIGHT/2,
    width: PADDLE_WIDTH,
    height: PADDLE_HEIGHT,
    color: AI_COLOR,
    dy: 0 // Used for AI movement
};

// Ball object
const ball = {
    x: WIDTH/2 - BALL_SIZE/2,
    y: HEIGHT/2 - BALL_SIZE/2,
    size: BALL_SIZE,
    speed: 5,
    dx: 5,
    dy: 3
};

function resetBall() {
    ball.x = WIDTH/2 - BALL_SIZE/2;
    ball.y = HEIGHT/2 - BALL_SIZE/2;
    // Randomize initial direction
    ball.dx = (Math.random() > 0.5 ? 1 : -1) * ball.speed;
    ball.dy = (Math.random() > 0.5 ? 1 : -1) * (ball.speed - 2 + Math.random() * 4);
}

// Drawing functions
function drawRect(x, y, w, h, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, w, h);
}

function drawBall(x, y, size, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x + size/2, y + size/2, size/2, 0, Math.PI*2);
    ctx.fill();
}

function drawNet() {
    ctx.strokeStyle = "#444";
    ctx.lineWidth = 4;
    ctx.beginPath();
    for(let y = 0; y < HEIGHT; y += 30) {
        ctx.moveTo(WIDTH/2, y);
        ctx.lineTo(WIDTH/2, y + 18);
    }
    ctx.stroke();
}

// Game logic
function update() {
    // Move ball
    ball.x += ball.dx;
    ball.y += ball.dy;

    // Wall collision (top/bottom)
    if (ball.y <= 0 || ball.y + BALL_SIZE >= HEIGHT) {
        ball.dy *= -1;
        ball.y = Math.max(0, Math.min(ball.y, HEIGHT - BALL_SIZE));
    }

    // Paddle collision (player)
    if (
        ball.x <= player.x + player.width &&
        ball.y + BALL_SIZE >= player.y &&
        ball.y <= player.y + player.height &&
        ball.x > player.x // prevent stuck
    ) {
        ball.dx *= -1;
        // Add some "spin"
        let collidePoint = (ball.y + BALL_SIZE/2) - (player.y + player.height/2);
        collidePoint = collidePoint / (player.height/2);
        ball.dy = ball.speed * collidePoint;
        ball.x = player.x + player.width; // prevent sticking
    }

    // Paddle collision (AI)
    if (
        ball.x + BALL_SIZE >= ai.x &&
        ball.y + BALL_SIZE >= ai.y &&
        ball.y <= ai.y + ai.height &&
        ball.x < ai.x + ai.width // prevent stuck
    ) {
        ball.dx *= -1;
        // Add some "spin"
        let collidePoint = (ball.y + BALL_SIZE/2) - (ai.y + ai.height/2);
        collidePoint = collidePoint / (ai.height/2);
        ball.dy = ball.speed * collidePoint;
        ball.x = ai.x - BALL_SIZE; // prevent sticking
    }

    // Score (left/right wall)
    if (ball.x < 0 || ball.x > WIDTH) {
        resetBall();
    }

    // AI movement (simple tracking)
    let aiCenter = ai.y + ai.height/2;
    if (ball.x > WIDTH/2) {
        if (aiCenter < ball.y + BALL_SIZE/2 - 10) {
            ai.y += 4;
        } else if (aiCenter > ball.y + BALL_SIZE/2 + 10) {
            ai.y -= 4;
        }
    } else {
        // AI "waits" when ball is far
        if (aiCenter < HEIGHT/2 - 10) ai.y += 2;
        else if (aiCenter > HEIGHT/2 + 10) ai.y -= 2;
    }
    // Clamp AI paddle
    ai.y = Math.max(0, Math.min(ai.y, HEIGHT - ai.height));
}

// Mouse control for player paddle
canvas.addEventListener('mousemove', function(e) {
    const rect = canvas.getBoundingClientRect();
    let mouseY = e.clientY - rect.top;
    player.y = mouseY - player.height/2;
    // Clamp paddle
    player.y = Math.max(0, Math.min(player.y, HEIGHT - player.height));
});

// Render loop
function render() {
    // Clear
    ctx.clearRect(0, 0, WIDTH, HEIGHT);

    // Net
    drawNet();

    // Paddles
    drawRect(player.x, player.y, player.width, player.height, player.color);
    drawRect(ai.x, ai.y, ai.width, ai.height, ai.color);

    // Ball
    drawBall(ball.x, ball.y, ball.size, BALL_COLOR);
}

function gameLoop() {
    update();
    render();
    requestAnimationFrame(gameLoop);
}

// Start game
resetBall();
gameLoop();