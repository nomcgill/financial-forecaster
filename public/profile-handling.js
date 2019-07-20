
function watchForSave(){
    $("nav").click(function(){
        handleProfileClick()
    })
    var loggedIn = false
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
    var loadedUser = document.getElementById("#profile-click-user")
    if (loadedUser == null){
        createProfilePopup()
    }
    if (loadedUser !== null){
        createLogOutPopUp(loadedUser)
    }
}

function handleCreateProfile(userInput){
    console.log("handleCreateProfile run")
    //Check for existing username. If none, POST new username & pass to database. username : userInput, loans : []
    .then(
        handleLogIn(userInput)
    )
}

function handleLogIn(userInput){
    console.log("handleLogIn run")
    //check userInput and password creditentials against database
    //Deny access with alert, or generate 7-day Token!
    //GET username from database, fetching loans array
    //THEN update local loans array with fetched loans array.
    .then(function(){
        var loggedIn = true
        $("#save-profile").off("click");
        $("#save-profile").click(function(){
        clickSave(loggedIn)
        })
    })
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
    // var userInput = document.getElementById("user-input").value
    $(`.loan-card`).hide()
    $(`.profile-card`).show()
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
        handleCreateProfile(userInput)
        resetBox(logIn)
    })

    $("#log-in").click(function(){
        handleLogIn(userInput)
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
    // var userInput = document.getElementById("user-input").value
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
    $(`.profile-card`).hide()
    $(`.currency-symbol`).replaceWith(
        `<span class="currency-symbol">$ </span>`)
    $(`.percent-symbol`).replaceWith(
        `<span class="percent-symbol">% </span>`)
    clearPopup(logIn)
}