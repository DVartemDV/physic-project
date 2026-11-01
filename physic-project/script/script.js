const canvas = document.getElementById('physCanvas');
const ctx = canvas.getContext('2d');
const screenWidth = 500;
let isRunning = false;
let logRunning = false;

let ball = {
    x : 100,
    speed : 15,
    radius : 15
}

const logEl = document.getElementById('log')

let stepCount = 0
// inputs
const newSpeed = document.getElementById('ballSpeedInput')
const newXPos = document.getElementById('ballXInput')
// buttons
const btnStart = document.getElementById('btnStart');
const btnStop = document.getElementById('btnStop');
const btnRestart = document.getElementById('btnRestart');

btnStart.addEventListener('click', () => {
    isRunning = true;
    ball.x = Number(newXPos.value);
    ball.speed = Number(newSpeed.value);
});

btnStop.addEventListener('click', () => {
    isRunning = false;
    logRunning = false;
    ball.x = Number(newXPos.value);
    ball.speed = Number(newSpeed.value);
});

btnRestart.addEventListener('click', () => {
    ball.x = Number(newXPos.value)
    isRunning = false;
    ball.speed = Number(newSpeed.value);
    logRunning = false;
    logEl.innerHTML = '';
    stepCount = 0
});





function draw() {
    ctx.clearRect(0, 0, screenWidth, 300);
    ctx.beginPath();
    ctx.arc(ball.x, 150, ball.radius,0, Math.PI * 2);
    ctx.fillStyle = 'red';
    ctx.fill();
}

function updateP() {
    let res = ball.x + ball.speed;
    if (res > screenWidth - ball.radius) {
        ball.x = screenWidth - ball.radius - (res - (screenWidth - ball.radius));
        ball.speed = -ball.speed * 0.8
    } else if (res < ball.radius) {
        ball.x = ball.radius + (ball.radius - res);
        ball.speed = -ball.speed * 0.8
    }else {
        ball.x = res;
    }
}

function loop() {
    if (isRunning) {
        updateP();
        logRunning = true;
    }    
    draw();
    requestAnimationFrame(loop);
    stepCount++;
    if (logRunning === true) {
    if (stepCount % 50 === 0) {
        const line = document.createElement('div');
        line.textContent = `Шаг ${stepCount} | x: ${ball.x.toFixed(1)} | v: ${ball.speed.toFixed(1)}`
        logEl.appendChild(line)
        logEl.scrollTop = logEl.scrollHeight;
    }
    }
}

requestAnimationFrame(loop);