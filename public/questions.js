// Question is stored here, overwritten with a new instance of Question constructor when answered
let questionContainer;

// Constructor for question
class Question {
    // Question is String, answers in array, correctNum is index of answers array which is correct
    constructor(question, answers, correctNum) {
        this.question = question;
        this.answers = answers;
        this.correctNum = correctNum;
    }

    render() {
        console.log(question);
        question.html(this.question);
        answers.map((value, index) => {
            value.html(this.answers[index]);
        });
    }
}

// When Player answers, decide what to do based on correctness
function playerAnswered(num) {
    // If correct
    if (Number(num) === questionContainer.correctNum) {
        flashResult(correctMsg);
    } else {
        flashResult(incorrectMsg);
        penalty();
    }
    easyMaths();
}

// Penalty when player answers incorrectly
function penalty() {
    penaltyPanel.show();
    const penaltyCountDown = count => {
        penaltyMsg.text(`You will be able to answer in ${count} seconds`);
        if (count > 0) {
            setTimeout(() => {
                penaltyCountDown(count-1);
            }, 1000);
        } else {
            penaltyPanel.hide();
        }
    };
    penaltyCountDown(5);
}

// Manages the re=triggering of css animation
function flashResult(msg) {
    msg.hide();
    msg.show();
    msg.removeClass("burstAnimation");
    setTimeout( () => {
        msg.addClass("burstAnimation");
    }, 10);
}

// Generates an addition questions, takes the number of digits as an argument
function generateAdditionQuestion(digits) {
    const digitMult = Math.pow(10, digits);
    const numX = Math.floor(Math.random() * digitMult);
    const numY = Math.floor(Math.random() * digitMult);
    const numZ = numX + numY;
    const correctAnswerIndex = Math.floor(Math.random() * 4);
    const randomNotZero = () => Math.ceil(Math.random() * 20) * (Math.random() > 0.5 ? -1: 1);
    let answerArray = [];
    for (let i = 0; i < 4; i++) {
        answerArray.push(numZ + randomNotZero());
    }
    answerArray[correctAnswerIndex] = numZ;
    questionContainer = new Question(
       `What is ${numX} + ${numY}?`,
        answerArray,
        correctAnswerIndex
    );
    questionContainer.render();
}

// Generate easy maths question
function easyMaths() {
    generateAdditionQuestion(2);
}