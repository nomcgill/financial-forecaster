
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
    //check Token, then successful PUT request, updating database loans of that username
    console.log("successful save!")

} 

function handleProfileClick(){
    console.log("handleProfileClick run")
    var loadedUser = document.getElementById("#profile-click-user")
    if (loadedUser === false){
        createProfilePopup()
    }
    if (loadedUser === true){
        createLogOutPopUp(loadedUser)
    }
}

function createProfilePopup(){
    var userInput = document.getElementById("user-input").value
    //display username and password input fields above 2 buttons:
    $('#create-profile').click(function(){
        handleCreateProfile(userInput)
    })
    $('#log-in').click(function(){
        handleLogIn(userInput)
    })
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

function createLogOutPopUp(loadedUser){
    //display loadedUser, and give single button option to log out.
    $('#log-out').click(function(){
        logOut()
    })
}

function logOut(){
    alert("You've been logged out.")
    window.location.reload(true)
}