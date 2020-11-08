console.log(`worked`);

// getting element `canvas` and his context
const cvs = document.getElementById(`canvas`);
const ctx = cvs.getContext(`2d`);

// creating objects of game

const bird          = new Image();
bird.src            = `img/flappy_bird_bird.png`;

const bg            = new Image();
bg.src              = `img/flappy_bird_bg.png`;

const fg            = new Image();
fg.src              = `img/flappy_bird_fg.png`;

const pipeUp        = new Image();
pipeUp.src          = `img/flappy_bird_pipeUp.png`;

const pipeBottom    = new Image();
pipeBottom.src      = `img/flappy_bird_pipeBottom.png`;

// init sounds
const fly = new Audio();
fly.src = `audio/fly.mp3`;

const score_audio = new Audio();
score_audio.src = `audio/score.mp3`;

