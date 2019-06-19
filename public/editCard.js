
function replyClick(){
    var theID = event.srcElement.id
    var lastChar = theID[theID.length -1];
    // console.log(lastChar)
    return lastChar
}

function existingCardClick(loans){
    console.log(loans[1].name + " editCard heard")
    var whichCard = loans[replyClick()-1]
    var cardName = document.getElementById("new-card-name")
    var cardPay = document.getElementById("new-card-pay")
    var cardAPR = document.getElementById("new-card-apr")
    var cardBal = document.getElementById("new-card-balance")
    var deleteCard = document.getElementById("delete-card")
    $(`#new-card-save`).replaceWith(`<button type="submit" id="new-card-save" name="Add-Hurdle">Save Changes</button>`)
    $(`#add-title`).replaceWith(`<h2 id="add-title">${whichCard.name}</h2>`)

    cardName.setAttribute("value", `${whichCard.name}`)
    cardPay.setAttribute("value", `${whichCard.payment}`)
    cardAPR.setAttribute("value", `${whichCard.rate}`)
    cardBal.setAttribute("value", `${whichCard.balance}`)

    $("#list-builder").fadeIn("fast", () => {
        $("#popup-box").fadeIn("fast", () => {});
    });
    
    deleteCard.classList.remove("hidden")
    cardPay.addEventListener("keyup", timeFrame)
    cardAPR.addEventListener("keyup", timeFrame)
    cardBal.addEventListener("keyup", timeFrame)
    $("#delete-card").click(() => {
        deleteCard(replyClick()-1)
        clearPopup(deleteCard)
    });     
    $("#popup-close").click(() => {
        clearPopup(deleteCard)
    });             
    $("#new-card-cancel").click(() => {
        clearPopup(deleteCard)
    });
}

function deleteCard(placement){
    console.log(loans.splice(placement,1))
    return loans.splice(placement,1)
}

function clearPopup(deleteCard){
    $('#popup-form').trigger("reset")
    $("#list-builder, #popup-box").hide();
    $(`#new-card-save`).replaceWith(`<button type="submit" id="new-card-save" name="Add-Hurdle">Add Hurdle</button>`)
    $(`#add-title`).replaceWith(`<h2 id="add-title">Add New Debt Hurdle</h2>`)                                                                                     
    deleteCard.classList.add("hidden")
}
  
function gatherInputs(){
    var NAME = document.getElementById("new-card-name").value
    var BALANCE = Number(document.getElementById("new-card-balance").value)
    var APR = Number(document.getElementById("new-card-apr").value)
    var PAY = Number(document.getElementById("new-card-pay").value)
    var stats = {
        name : NAME,
        balance : BALANCE,
        rate : APR,
        payment : PAY
    }
    return stats
}
  
function watchForEdits(){
    $('.editable').click(function(){
        existingCardClick(loans)
    });
}