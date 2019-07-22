
function replyClick(){
    var theID = event.srcElement.id
    var lastChar = theID[theID.length -1];
    return lastChar
}

function existingCardClick(num){
    document.getElementById("popup-form").reset();
    placement = num -1
    // placement = replyClick()-1
    var whichCard = loans[placement]
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

    $("#popup-form").submit(event => {
        event.preventDefault();
        event.stopImmediatePropagation();
        var text = $('#add-title').text();
        if(text !== "Add New Debt Hurdle"){
            editedCard = gatherInputs()
            if (calculateSimpleInt(editedCard) !== false){
                loans.splice(placement, 1, editedCard)
            }
            else {alert("Stuck in Debt Hell! Payment too small to add to Financial Forecast")}
            clearPopup(deleteCard)
        }
    })

    $("#delete-card").click(() => {
        removeLoan(placement)
        clearPopup(deleteCard)
    });     
    $("#popup-close").click(() => {
        clearPopup(deleteCard)
    });             
    $("#new-card-cancel").click(() => {
        clearPopup(deleteCard)
    });
}

function removeLoan(placement){
    loans.splice(placement,1)
}

function clearPopup(deleteCard){
    $("#grid").empty()
    gatherInfo(loans)
    $("#list-builder, #popup-box").hide();
    $(`#new-card-save`).replaceWith(`<button type="submit" id="new-card-save" name="Add-Hurdle">Add Hurdle</button>`)
    $(`#add-title`).replaceWith(`<h2 id="add-title">Add New Debt Hurdle</h2>`)                                                                                     
    if (deleteCard !== undefined){
        deleteCard.classList.add("hidden")}
    stopListening()
    reassessNavBar()
}

function stopListening(){
    $('#grid').off()
    $("#popup-form").off()
    $("#delete-card").off()
    $("#popup-close").off()
    $("#new-card-cancel").off()
    watchForEdits()
    watchForAdd()
}

function watchForEdits(){
    $('#grid').on("click", ".editable", function(){
        var clicked = this.id
        var lastChar = clicked[clicked.length -1]
        existingCardClick(lastChar)
    });
}

// function watchForEdits(){
//     $('.editable').click(function(){
//         existingCardClick(loans)
//     });
// }