const canvas = document.getElementById('physCanvas');
const ctx = canvas.getContext('2d');
const screenWidth = 500;
const screenHeight = 300;

const joyCanvas = document.getElementById('joyAngleCanvas');
const joyCtx = joyCanvas.getContext('2d');
const angleDisplay = document.getElementById('angleDisplay')



let angleDeg = 45;
let isDragging = false;
let showArrow = true;


let isRunning = false;
let stepCount = 0;


let ball = {
    x: 100,
    y: 100,
    vx : 0,
    vy : 0,
    radius : 15
 }
// log
const logEl = document.getElementById('log') 


// buttons
const btnStart = document.getElementById('btnStart') 
const btnStop = document.getElementById('btnStop')
const btnRestart = document.getElementById('btnRestart') 




function applyInputs() {
    // inputs
    const speed = Number(document.getElementById('ballSpeedInput').value);
    const startX = Number(document.getElementById('ballXInput').value);
    const startY = Number(document.getElementById('ballYInput').value);
    const rad = angleDeg * Math.PI / 180;
    ball.vx = speed * Math.cos(rad);
    ball.vy = speed * Math.sin(rad);

    ball.x = startX;
    ball.y = startY;
}

function updateP() {
    if (ball.vx === 0 && ball.vy === 0) return;

    ball.x += ball.vx;
    ball.y += ball.vy;

    if (ball.x > screenWidth - ball.radius) {
        ball.x = screenWidth - ball.radius;
        ball.vx = -ball.vx * 0.8;
    } else if (ball.x < ball.radius) {
        ball.x = ball.radius;
        ball.vx = -ball.vx * 0.8;
    }

    if (ball.y > screenHeight - ball.radius) {
        ball.y = screenHeight - ball.radius;
        ball.vy = -ball.vy * 0.8;
    } else if (ball.y < ball.radius) {
        ball.y = ball.radius;
        ball.vy = -ball.vy * 0.8;
    }
}

function draw() {
    ctx.clearRect(0,0, screenWidth, screenHeight);
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fillStyle = 'red';
    ctx.fill();

    if (showArrow) {
        const rad = angleDeg * Math.PI / 180;
        const lineLength = 50;
        const endX = ball.x + Math.cos(rad) * lineLength;
        const endY = ball.y + Math.sin(rad) * lineLength;

        ctx.beginPath();
        ctx.moveTo(ball.x, ball.y);
        ctx.lineTo(endX, endY);
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 3;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(endX, endY, 2, 0, Math.PI * 2);
        ctx.fillStyle = 'black';
        ctx.fill();
}}


joyCanvas.addEventListener('mousedown', () => {
    isDragging = true;    
})

joyCanvas.addEventListener('mousemove', (e) =>{
    if (!isDragging) return;
    
    const rect = joyCanvas.getBoundingClientRect();

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const angleRad = Math.atan2(mouseY - 60, mouseX - 60);
    angleDeg = angleRad * 180 / Math.PI;
    
    if (angleDeg < 0) angleDeg += 360;
    if (angleDisplay) angleDisplay.textContent = Math.round(angleDeg);

    drawJoystick();
});

window.addEventListener('mouseup', () => {
    isDragging = false;
})


function loop() {
    if (isRunning) {
        updateP();
        
        stepCount++;
        if (stepCount % 10 === 0) {
            const line = document.createElement('div');
            line.textContent = `Шаг ${stepCount} | x: ${ball.x.toFixed(1)} y: ${ball.y.toFixed(1)} | vx: ${ball.vx.toFixed(1)} vy: ${ball.vy.toFixed(1)}`;
            logEl.appendChild(line);
            logEl.scrollTop = logEl.scrollHeight;
        }
    }
    draw();
    requestAnimationFrame(loop);
}

btnStart.addEventListener('click', () =>{
    applyInputs();
    isRunning = true;
    showArrow = false;
})
btnStop.addEventListener('click', () =>{
    isRunning = false;
    showArrow = true;
})
btnRestart.addEventListener('click', () =>{
    applyInputs();
    isRunning = false;
    stepCount = 0;
    logEl.innerHTML = '';
    showArrow = true;
})

function drawJoystick() {
    joyCtx.clearRect(0,0, 120, 120);

    const centerX = 60;
    const centerY = 60;
    const radius = 45;

    joyCtx.beginPath();
    joyCtx.arc(centerX, centerY, radius, 0, Math.PI * 2);
    joyCtx.fillStyle = '#f0f0f0';
    joyCtx.fill();
    joyCtx.strokeStyle = '#ccc';
    joyCtx.lineWidth = 2;
    joyCtx.stroke();

    const rad = angleDeg * Math.PI / 180;

    const handleX = centerX + Math.cos(rad) * radius;
    const handleY = centerY + Math.sin(rad) * radius;


    joyCtx.beginPath();
    joyCtx.moveTo(centerX, centerY);
    joyCtx.lineTo(handleX, handleY);
    joyCtx.strokeStyle = '#333';
    joyCtx.lineWidth = 2;
    joyCtx.stroke();


    joyCtx.beginPath();
    joyCtx.arc(handleX, handleY, 8, 0, Math.PI * 2);
    joyCtx.fillStyle = '#007bff';
    joyCtx.fill();
}





drawJoystick();
requestAnimationFrame(loop);