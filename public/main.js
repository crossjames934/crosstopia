/*
Choose topic then answer question against the clock. Getting more questions right results in more money

You get missiles by default, but you can buy more.

You can also buy shield, brutal weapons, avoid topics, and allow topic to appear every round

 */

let playerId;
let cityId; // get draw to re-write over city id

function setup() {
    const cnv = createCanvas(window.innerWidth, window.innerHeight);
    cnv.parent = "canvasContainer";
    rectMode(CENTER);
    angleMode(DEGREES);
    noFill();
}

function draw() {
    background(200, 200, 255);
    pattern();
}

function pattern() {
    translate(width/2, height/2);
    stroke(255);
    const mumBoxes = 8;
    const sonBoxes = 6;
    rotate(frameCount);
    for (let i = 0; i < mumBoxes; i++) {
        rotate(360 / mumBoxes);
        // noFill();
        // rect(0, height * 0.2, width * 0.1, height * 0.1);
        fill(255, 50);
        for (let j = 0; j < sonBoxes; j++) {
            translate(0, height * 0.2);
            rotate(360 / sonBoxes);
            rect(0, height * 0.1, width * 0.05, height * 0.05);
            translate(0, -height * 0.2);
        }
    }
    translate(-width/2, -height/2);
}

function windowResized() {
    setup();
}

function startGameCount() {
    waitingForPlayersScreen.hide();
    lobbyScreen.hide();
    quizContainer.hide();
    gameStartedScreen.show();
    countDownElement.show();
    const countDown = function(count) {
        countDownElement.text("GAME STARTS IN: "+count);
        if (count > 0) {
            setTimeout(function () {
                countDown(count-1);
            }, 1000);
        } else {
            countDownElement.hide();
            quizContainer.show();
            generateAdditionQuestion(3);
            questionContainer.render();
        }
    };
    countDown(1);
}