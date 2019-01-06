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

// Find City Screen
const findCityScreen = $("#findCityScreen");
const findCityForm = $("#findCityForm");
const findCityName = $("#findCityName");
const findCityPassword = $("#findCityPassword");

// Join Game Screen
const joinGameScreen = $("#joinGameScreen");
const joinGameForm = $("#joinGameForm");
const playerNameInput = $("#playerNameInput");
const playerPINInput = $("#playerPINInput");

// Initialise
setUpScreen.hide();
waitingForPlayersScreen.hide();
findCityScreen.hide();
joinGameScreen.hide();

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
    $.post("/createCity/" + JSON.stringify(postObject), function(successful) {
        if (successful) {
            setUpScreen.hide();
            introPanel.hide();
            waitingForPlayersScreen.show();
            nameOfCityDisplayed.html("<b>NAME: </b>" + postObject.name);
            passwordForCityDisplayed.html("<b>PASSWORD: </b>" + postObject.password);
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
        teamName: playerNameInput.val(),
        pin: playerPINInput.val(),
        cityId: cityId
    };
    $.post("/joinGame/"+JSON.stringify(postObject), function(response) {
        if (response !== "access granted") {
            return alert(response);
        }

    });
    e.preventDefault();
});