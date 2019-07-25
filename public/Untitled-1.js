

function handleSavePutRequest(logIn){
    var myId = $(this).attr('id')
    var postURL = herokuAPIEndpoint + `user-loans/` + myId
    console.log(postURL)
    var data = {
        username: currentUser.username,
        loans: loans
    };
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
        console.log('Success:', JSON.stringify(response))
        alert("Your Hurdles have been saved.")
    })
    .then(response => {
    })
    .catch(error => console.error('Error:', error))
}