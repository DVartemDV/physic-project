const canvas = document.getElementById('physCanvas');
const ctx = canvas.getContext('2d');

const W = 700;
const H = 300;

const joyCanvas = document.getElementById('joyAngleCanvas');
const joyCtx = joyCanvas.getContext('2d');

const logEl = document.getElementById('log');
const angleDisplay = document.getElementById('angleDisplay');

const inputForce = document.getElementById('f');
const inputMass = document.getElementById('mass');

const btnStart = document.getElementById('btnStart');
const btnStop = document.getElementById('btnStop');
const btnRestart = document.getElementById('btnRestart');

const SCALE = 20;
const GRAVITY = 0.4;
const AIR_DRAG = 0.985;
const BOUNCE = 0.6;

let isRunning = false;
let angleDeg = 45;
let isDrugging = false;

let ball = {
    x : 50,
    y : H - 15,
    vx : 0,
    vy : 0,
    radius : 15,
    maxHeight : 0
};

