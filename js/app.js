console.log(`worked`);

// getting element `canvas` and his context
const cvs = document.getElementById(`canvas`);
const ctx = cvs.getContext(`2d`);

// creating objects of game

const bird = new Image();
bird.src = `img/flappy_bird_bird.png`;

const bg = new Image();
bg.src = `img/flappy_bird_bg.png`;

const fg = new Image();
fg.src = `img/flappy_bird_fg.png`;

const pipeUp = new Image();
pipeUp.src = `img/flappy_bird_pipeUp.png`;

const pipeBottom = new Image();
pipeBottom.src = `img/flappy_bird_pipeBottom.png`;

// init sounds
const fly = new Audio();
fly.src = `audio/fly.mp3`;

const score_audio = new Audio();
score_audio.src = `audio/score.mp3`;

// creating main parametrs
let gap = 90; //расстояние между трубами

let xPos = 10; // bird position X
let yPos = 270; // bird position Y

let grav = 1; // bird gravitation

//действия при нажатии кнопки
document.addEventListener(`keydown`, moveUp);

function moveUp() {
    yPos = yPos - 20;
}

// создание блоков

const pipe = [];

pipe[0] = {
    x: cvs.width,
    y: 0
}

function draw() {

    ctx.drawImage(bg, 0, 0);

    for(let i = 0; i < pipe.length; i++) {

        //создание труб 
        ctx.drawImage(pipeUp, pipe[i].x, pipe[i].y);
        ctx.drawImage(pipeBottom, pipe[i].x, pipe[i].y + gap + pipeUp.height);

        pipe[i].x = pipe[i].x - 1; //движение труб

        //повторное создание труб
        if(pipe[i].x ==   125) {
            pipe.push(
                {
                    x: cvs.width,
                    y: Math.floor(Math.random() * pipeUp.height) - pipeUp.height    
                }    
            );
        }


    }

    ctx.drawImage(fg, 0, cvs.height - fg.height);
    ctx.drawImage(bird, xPos, yPos);

    yPos = yPos + grav;

    requestAnimationFrame(draw);

}

console.dir(pipeBottom);
pipeBottom.onload = draw;
