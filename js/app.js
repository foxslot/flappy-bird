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

let grav = 1.8; // bird gravitation

let score = 0;

//действия при нажатии кнопки
document.addEventListener(`keydown`, moveUp);
document.addEventListener(`click`, moveUp);
document.addEventListener(`touchstart`, moveUp);

function moveUp() {
    yPos = yPos - 40;
    fly.play();
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
        if(pipe[i].x == 125) {
            pipe.push(
                {
                    x: cvs.width,
                    y: Math.floor(Math.random() * pipeUp.height) - pipeUp.height    
                }    
            );
        }

        //отслеживание прикосновений
        if((xPos + bird.width >= pipe[i].x 
            && xPos <= pipe[i].x + pipeUp.width
            && (yPos <= pipe[i].y + pipeUp.height 
                || yPos + bird.height >= pipe[i].y + pipeBottom.height))
            ) {
                location.reload();
        }

        //отслеживание ударов об землю
        if (yPos + bird.height >= cvs.height - fg.height) {            
            location.reload();    
        }

        //подсчет очков
        if (pipe[i].x == 5) {
            score++; 
            score_audio.play();
        }

    }

    ctx.drawImage(fg, 0, cvs.height - fg.height);
    ctx.drawImage(bird, xPos, yPos);

    yPos = yPos + grav;

    ctx.fillStyle = `#000`;
    ctx.font = `24px Verdana`;
    ctx.fillText(`Счет: ` + score, 10, cvs.height - 20);

    requestAnimationFrame(draw);

}

console.dir(pipeBottom);
pipeBottom.onload = draw;
