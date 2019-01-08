// Intro Screen
const introPanel = $("#intro");
const setUpGameBtn = $("#setUpGameBtn");
const joinGameBtn = $("#joinGameBtn");

// Set Up Screen
const setUpScreen = $("#setUpScreen");
const setUpForm = $("#setUpForm");
const nameOfCity = $("#nameOfCity");
const passwordForCity = $("#passwordForCity");
const retypePassword = $("#retypePassword");
const backBtnSetUp = $("#backBtnSetUp");

// Waiting For Players
const waitingForPlayersScreen = $("#waitingForPlayersScreen");
const nameOfCityDisplayed = $("#nameOfCityDisplayed");
const passwordForCityDisplayed = $("#passwordForCityDisplayed");
const startGameBtn = $("#startGameBtn");

// Find City Screen
const findCityScreen = $("#findCityScreen");
const findCityForm = $("#findCityForm");
const findCityName = $("#findCityName");
const findCityPassword = $("#findCityPassword");
const backBtnJoinGame = $("#backBtnJoinGame");

// Join Game Screen
const joinGameScreen = $("#joinGameScreen");
const joinGameForm = $("#joinGameForm");
const playerNameInput = $("#playerNameInput");
const playerPINInput = $("#playerPINInput");

// List of players, one on lobby for players and one on main hub for host
const lobbyScreen = $('#lobbyScreen');
const listOfPlayers1 = $("#listOfPlayers1");
const listOfPlayers2 = $("#listOfPlayers2");

// Game start
const gameStartedScreen = $("#gameStartedScreen");
const countDownElement = $("#gameStartCountDown");
const quizContainer = $("#quizContainer");
const question = $("#question");

// Answers
const answers = [$("#answer_0"), $("#answer_1"), $("#answer_2"), $("#answer_3")];
// Give each answer div the function that allows player to answer the question
answers.map((val, index) => val.click(() => playerAnswered(index)));

// Correct Message
const correctMsg = $("#correctMsg");
const incorrectMsg = $("#incorrectMsg");

// Penalty
const penaltyPanel = $("#penaltyPanel");
const penaltyMsg = $("#penaltyMsg");

// Initialise
setUpScreen.hide();
waitingForPlayersScreen.hide();
findCityScreen.hide();
joinGameScreen.hide();
lobbyScreen.hide();
gameStartedScreen.hide();
correctMsg.hide();
incorrectMsg.hide();
penaltyPanel.hide();

// Set up screen elements
setUpGameBtn.click(() => {
    introPanel.hide();
    setUpScreen.show();
});

// Set Up Form
setUpForm.submit(e => {
    // If passwords don't match
    if (passwordForCity.val() !== retypePassword.val()) {
        return alert("Your passwords do not match, please try again.");
    }
    const postObject = {
        name: nameOfCity.val(),
        password: passwordForCity.val()
    };
    $.post("/createCity/" + JSON.stringify(postObject), function(id) {
        if (id !== "exists") {
            setUpScreen.hide();
            introPanel.hide();
            waitingForPlayersScreen.show();
            nameOfCityDisplayed.html("<b>NAME: </b>" + postObject.name);
            passwordForCityDisplayed.html("<b>PASSWORD: </b>" + postObject.password);
            cityId = id;
        } else {
            alert("A city with that name already exists, please choose another one.");
        }
    });
    e.preventDefault();
});

// Back button to exit set up back to home
backBtnSetUp.click(function() {
    setUpScreen.hide();
    introPanel.show();
});

// Back button for the join game screen
backBtnJoinGame.click(function() {
    findCityScreen.hide();
    introPanel.show();
});

// Join game button
joinGameBtn.click(function() {
    introPanel.hide();
    findCityScreen.show();
});

// Find city form - when players type in the host-given name and password
findCityForm.submit(function(e) {
    const postObject = {
        name: findCityName.val(),
        password: findCityPassword.val()
    };
    $.get("/findCity/" + JSON.stringify(postObject), function(response) {
        if (response === "not found") {
            alert("Could not find city with that name")
        } else if (response === "wrong password") {
            alert("wrong password");
        } else {
            // Correct name and password
            findCityScreen.hide();
            joinGameScreen.show();
            cityId = response;
        }
    });
    e.preventDefault();
});

// Joining Game Form - player chooses team name and pin
joinGameForm.submit(function(e) {
    const postObject = {
        name: playerNameInput.val(),
        pin: playerPINInput.val(),
        cityId: cityId
    };
    $.post("/joinGame/"+JSON.stringify(postObject), function(response) {
        if (response !== "access granted") {
            return alert(response);
        }
        joinGameScreen.hide();
        lobbyScreen.show();
    });
    e.preventDefault();
});

// Start game button
startGameBtn.click(function() {
    $.get('/startGame/'+cityId, function(response) {
        if (response !== "granted") {
            return alert(response);
        }
    });
});