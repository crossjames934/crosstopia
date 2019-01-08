let questionContainer;

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

function playerAnswered(num) {
    alert(Number(num) === question.correctNum);
}

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
}