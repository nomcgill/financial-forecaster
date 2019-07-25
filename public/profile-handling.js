
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
    handleSavePutRequest()
} 

function handleProfileClick(){
    if (currentUser.username == false){
        createProfilePopup()
    }
    if (currentUser.username){
        createLogOutPopUp()
    }
}


function handleCreateProfile(logIn){
    var userInput = document.getElementById("username-input").value
    var postURL = herokuAPIEndpoint + `user-loans/`
    console.log(postURL)
    var data = {
        username: userInput,
        loans: loans
    };
    console.log(JSON.stringify(data))
    fetch(postURL, {
      method: 'POST',
      body: JSON.stringify(data),
      headers:{
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        }
        throw new Error (response.statusText);
    })
    .then(response => {
        console.log('Success:', JSON.stringify(response))
    })
    .then(response => {
        handleLogIn(logIn)
    })
    .catch(error => console.error('Error:', error))
}


function handleLogIn(logIn){
    console.log("handleLogIn")
    var userInput = document.getElementById("username-input").value
    var GETbyUsernameURL = herokuAPIEndpoint + `find?username=` + userInput
    fetch (GETbyUsernameURL)
    .then(response => {
        if (response.status === 404) {
            throw new Error (response.status + `: Username not found.`);
        }
        if (response.status === 200) {
            return response.json();
        }
    })
    .then(data => {
        currentUser = data
        loans = currentUser.loans
        debugger
        loggedIn = true
        return currentUser
    })
    .then(data => {
        $("#log-in").off()
        resetBox(logIn)
        alert(`Now logged in as ${currentUser.username}.`)            
    })
    .catch (error => alert (`${error}`));
}



function handleSavePutRequest(logIn){
    var myId = $(`nav`).attr('id')
    console.log(myId)
    var postURL = herokuAPIEndpoint + `user-loans/` + myId
    console.log(postURL)
    var data = {
        _id: currentUser._id,
        username: currentUser.username,
        loans: currentUser.loans
    };
    debugger
    console.log(JSON.stringify(data))
    fetch(postURL, {
      method: 'PUT',
      body: JSON.stringify(data),
      headers:{
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        }
        throw new Error (response.statusText);
    })
    .then(response => {
        console.log(`Success: ${response.message}`)
        alert("Your Hurdles have been saved.")
    })
    .catch(error => console.error('Error:', error))
}

function logOut(){
    loggedIn = false
    alert("You've been logged out.")
    window.location.reload(true)
}

function createProfilePopup(){
    $("#list-builder").fadeIn("fast", () => {
        $("#popup-box").fadeIn("fast", () => {});
    });
    document.getElementById("popup-form").reset();
    $(`.loan-card`).hide()
    $("#log-in").show()
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
    })

    $("#log-in").click(function(){
        handleLogIn(logIn)
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
    $(`#longevity`).replaceWith(`<div id="longevity"></div>`)
    $(`form input`).hide()
    $(`#log-in`).hide()
    $(`.currency-symbol`).replaceWith(
        `<span class="currency-symbol"></span>`
        )
    $(`.percent-symbol`).replaceWith(
        `<span class="percent-symbol"></span>`
        )
    $(`#new-card-save`).replaceWith(`<button type="button" id="new-card-save" name="Log Out">Log Out?</button>`)
    $(`#add-title`).replaceWith(`<h2 id="add-title">Log Out?</h2>`)
    
    $("#new-card-save").click(function(){
        $(`#log-in`).hide()
        logOut()
    })
   
    $("#popup-close").click(() => {
        resetBox()
    });             
    $("#new-card-cancel").click(() => {
        resetBox()
    });
}

function resetBox(){
    $(`#log-in`).off()
    $(`#log-in`).hide()
    $(`.loan-card`).show()
    $(`#username-input`).prop('required',false);
    $(`.profile-card`).hide()
    $(`.currency-symbol`).replaceWith(
        `<span class="currency-symbol">$ </span>`)
    $(`.percent-symbol`).replaceWith(
        `<span class="percent-symbol">% </span>`)
    clearPopup()
}

function reassessNavBar(){
    if (loggedIn){
        $(`nav`).replaceWith(`<nav id="${currentUser._id}">Profile: <span id="profile">${currentUser.username}</span></nav>`)
    }
    else {
        $(`nav`).replaceWith(`<nav>Log In to Save Hurdles</nav>`)
    }
    $("nav").off()
    $("#save-profile").off()
    watchForSave()
}
