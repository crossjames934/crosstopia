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

// Initialise
setUpScreen.hide();
waitingForPlayersScreen.hide();

// Set up screen elements
setUpGameBtn.click(() => {
    introPanel.hide();
    setUpScreen.show();
});

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

        } else {
            alert("A city with that name already exists, please choose another one.");
        }
    });
    e.preventDefault();
});

backBtnSetUp.click(function() {
    setUpScreen.hide();
    introPanel.show();
});

