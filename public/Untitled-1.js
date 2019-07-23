function handleCreateProfile(userInput){
    var postURL = herokuAPIEndpoint + `user-loans/` + userInput

    var data = {
        username: currentUser.username,
        loans: currentUser.loans[0]
    };
    
    fetch(postURL, {
      method: 'POST',
      body: JSON.stringify(data),
      headers:{
        'Content-Type': 'application/json'
      }
    })
    .then(
        res => res.json()
        )
    .then(response => 
        console.log('Success:', JSON.stringify(response)),
        handleLogIn(userInput)
    )
    .catch(error => console.error('Error:', error));
}


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
        loans = currentUser.loans[0]
        loggedIn = true
        return currentUser
    })
    .then(data => {
        $("#log-in").off()
        console.log(data)
        resetBox()
        alert(`Now logged in as ${currentUser.username}.`)            
    })
    .catch (error => alert (`${error}`));
}