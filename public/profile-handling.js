var herokuAPIEndpoint = "https://financial-forecaster.herokuapp.com/"

function watchForSave(){
    $("nav").click(function(){
        handleProfileClick()
    })
    $("#save-profile").click(function(){

        clickSave(loggedIn)
    })
}

function clickSave(loggedIn){
    if (loggedIn === false){
        alert("You must be logged in to save hurdles.")
        return
    }
    //check userID, then successful PUT request, updating database loans of that username
} 

function handleProfileClick(){
    if (currentUser.username == false){
        createProfilePopup()
    }
    if (currentUser.username){
        createLogOutPopUp(loadedUser)
    }
}

function handleCreateProfile(userInput){
    console.log("handleCreateProfile run")
    var userInput = document.getElementById("username-input").value
    console.log(userInput)
    //Check for existing username. If none, POST new username & pass to database. username : userInput, loans : []
    .then(
        handleLogIn(userInput)
    )
}

function handleLogIn(){
    var userInput = document.getElementById("username-input").value
    console.log(userInput)
    GETbyUsernameURL = herokuAPIEndpoint + `find?username=` + userInput
    console.log(GETbyUsernameURL)
    fetch (GETbyUsernameURL)
    .then(response => {
        if (response.ok) {
            return response.json();
        }
        throw new Error (response.statusText);
    })
    .then (userObject => {
        currentUser = userObject
    })
    .then(function(){
        loggedIn = true
        console.log(`Now logged in as ${Bulma}`)
        reassessSituation()
    })
    .catch (error => alert (`Error in GETting users: ${error.message}`));
}

function logOut(){
    alert("You've been logged out.")
//Revoke passport token
    window.location.reload(true)
}

function createProfilePopup(){
    $("#list-builder").fadeIn("fast", () => {
        $("#popup-box").fadeIn("fast", () => {});
    });
    document.getElementById("popup-form").reset();
    // var userInput = document.getElementById("username-input").value
    $(`.loan-card`).hide()
    $(`#longevity`).replaceWith(`<div id="longevity"></div>`)
    $(`.profile-card`).show()
    $(`#username-input`).prop('required',true);
    $(`.currency-symbol`).replaceWith(
        `<span class="currency-symbol"></span>`
    )
    $(`.percent-symbol`).replaceWith(
        `<span class="percent-symbol"></span>`
    )
    var logIn = document.getElementById("log-in")
    $(`#new-card-save`).replaceWith(`<button type="button" id="new-card-save" name="Create Profile">Create Profile</button>`)
    $(`#add-title`).replaceWith(`<h2 id="add-title">Create Profile or Log In</h2>`)
    logIn.classList.remove("hidden")
    $("#new-card-save").click(function(){
        handleCreateProfile()
        resetBox(logIn)
    })

    $("#log-in").click(function(){
        handleLogIn()
        resetBox(logIn)
    })
   
    $("#popup-close").click(() => {
        resetBox(logIn)
    });             
    $("#new-card-cancel").click(() => {
        resetBox(logIn)
    });
}

function createLogOutPopUp(){
    $("#list-builder").fadeIn("fast", () => {
        $("#popup-box").fadeIn("fast", () => {});
    });
    document.getElementById("popup-form").reset();
    var userInput = document.getElementById("username-input").value
    $(`#longevity`).replaceWith(`<div id="longevity"></div>`)
    $(`form input`).hide()
    $(`.currency-symbol`).replaceWith(
        `<span class="currency-symbol"></span>`
        )
        $(`.percent-symbol`).replaceWith(
            `<span class="percent-symbol"></span>`
            )
            $(`#new-card-save`).replaceWith(`<button type="button" id="new-card-save" name="Log Out">Log Out?</button>`)
            $(`#add-title`).replaceWith(`<h2 id="add-title">Log Out?</h2>`)
            
            $("#new-card-save").click(function(){
                logOut()
            })
            
            $("#log-in").click(function(){
                handleLogIn(userInput)
        resetBox()
    })
   
    $("#popup-close").click(() => {
        resetBox()
    });             
    $("#new-card-cancel").click(() => {
        resetBox()
    });
}

function resetBox(logIn){
    $(`.loan-card`).show()
    $(`#username-input`).prop('required',false);
    $(`.profile-card`).hide()
    $(`.currency-symbol`).replaceWith(
        `<span class="currency-symbol">$ </span>`)
    $(`.percent-symbol`).replaceWith(
        `<span class="percent-symbol">% </span>`)
    clearPopup(logIn)
}

function reassessSituation(){
    console.log("Let's reassess who's logged in and the loan situation.")
}