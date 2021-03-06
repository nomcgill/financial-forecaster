"use strict";
// import { link } from "fs";
var loggedIn = false

let currentUser = {
    _id: false,
    username: false,
    loans: [
        {
            "name": "Sample Hurdle",
            "balance": 15000,
            "rate": 3.25,
            "payment": 290    
        }
    ]
}

var loans = currentUser.loans

function gatherInfo(loans){
        loans.forEach((loan) => {
            createCards(loan)
        })
        addEmUp(loans)
        if (loans.length < 12){
        createAddCardBox()
        }
}

function roundCents(input){
    return Math.round(100 *(input))/100;
}

function formatNumber(num){
    var num_parts = num.toString().split(".");
    num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return num_parts.join(".");
}

function getSum(total, num) {
    return total + num;
}

function createCards(loan){
        var grid = document.getElementById("grid")
        var newCard = document.createElement("div")
        var children = grid.children.length + 1
        newCard.setAttribute("id", "area" + children)
        newCard.setAttribute("class", "boxes editable")
        newCard.setAttribute("onClick", "replyClick()")
        grid.appendChild(newCard)
        var newDiv = document.getElementById(`area${children}`)
        var newH4 = document.createElement(`h4`)
        newH4.appendChild(document.createTextNode(`${loan.name}`))
        newDiv.appendChild(newH4)
        var newH3 = document.createElement(`h3`)
        newH3.appendChild(document.createTextNode(`$${loan.payment}`))
        newDiv.appendChild(newH3)
        // newCard.appendChild(document.createTextNode(`${loan.name}`))
        // newCard.appendChild(document.createTextNode(`Payment: ${loan.payment}`))
        
}

function createAddCardBox(){
    var grid = document.getElementById("grid")
    var newCard = document.createElement("div")
    newCard.setAttribute("id", "defaultBox")
    newCard.setAttribute("class", "boxes")
    newCard.appendChild(document.createTextNode(`Add a New Hurdle...`))
    grid.appendChild(newCard)
    document.getElementById("defaultBox").addEventListener("click", onAddHurdleClick);
}

function calculateSimpleInt(card){
    let count = 0
    let balanceTracker = [card.balance]
    let payments = []
    let lastKnownBalance = card.balance
    do {
        if (lastKnownBalance > 9999999){
            count = count + 1
            var paid = roundCents(payments.reduce(getSum))
            var results = ["$" + paid + " paid on " + card.name, "Stopped counting after " + ((count + 1)/12) + " years because balance reached over $1,000,000."]
            return false
        }
        if (count > 1999){
            count = count + 1
            var paid = roundCents(payments.reduce(getSum))
            var results = ["$" + paid + " paid", "Stopped counting after " + (count + 1) + " months."]
            return false
        }      
        lastKnownBalance = balanceTracker[balanceTracker.length -1]
        if (card.payment < lastKnownBalance){
            lastKnownBalance = lastKnownBalance * card.rate / 1200 + lastKnownBalance - card.payment;
            balanceTracker.push(lastKnownBalance);
            payments.push(card.payment)
            count = count + 1
        }
        if (card.payment >= lastKnownBalance){
            payments.push(lastKnownBalance)
            var paid = roundCents(payments.reduce(getSum))
            var results = {
                paid: paid, 
                count : count + 1,
                lastKnownBalance : lastKnownBalance
            }
            return results
        }
    }
    while (balanceTracker[balanceTracker.length - 1] > 0)
}

function findInterestPaid(card){
    var result = roundCents(calculateSimpleInt(card).paid - card.balance)
    return result
}

function addEmUp(loans){
    var monthlyPay = []
    var cardStartingBalance = []
    var totals = []
    if (loans.length > 0 ){
        for (let i=0; i < loans.length; i++){
            var card = loans[i]
            var cardPaid = calculateSimpleInt(card)
            if (isNaN(cardPaid.paid)){
                alert(card.name + " excluded from calculations for unreasonable nature.")
            }
            else {            
                monthlyPay.push(card.payment)
                cardStartingBalance.push(card.balance)
                totals.push(cardPaid.paid)
            }
        }
        var monthlyTotal = roundCents(monthlyPay.reduce(getSum))
        var startingBalance = roundCents(cardStartingBalance.reduce(getSum))
        var totalPaid = roundCents(totals.reduce(getSum))
        emptyTotals()
        postMonthlyCost(monthlyTotal)
        postStartingBalance(startingBalance)
        postTotalPaid(totalPaid)
    }
    else {
        emptyTotals()
        postMonthlyCost(0)
        postStartingBalance(0)
        postTotalPaid(0)
    }
}

function emptyTotals(){
    if (document.getElementById("your-monthly-cost")){
        document.getElementById("your-monthly-cost").remove();
        document.getElementById("your-total-owed").remove();
        document.getElementById("your-total-paid").remove();
    }
}

function postMonthlyCost(monthlyTotal){
    var monthlyCost = document.getElementById("monthly-cost")
    var theTotal = document.createElement("h2")
    theTotal.setAttribute("id","your-monthly-cost")
    theTotal.setAttribute("class", "bottom-line")
    theTotal.appendChild(document.createTextNode(`$${formatNumber(monthlyTotal)}`))
    monthlyCost.appendChild(theTotal)
}

function postStartingBalance(totalOwed){
    var theTotalOwed = document.getElementById("total-owed")
    var theTotal = document.createElement("h2")
    theTotal.setAttribute("id","your-total-owed")
    theTotal.setAttribute("class", "bottom-line")
    theTotal.appendChild(document.createTextNode(`$${formatNumber(totalOwed)}`))
    theTotalOwed.appendChild(theTotal)
}

function postTotalPaid(totalPaid){
    var yourTotalPaid = document.getElementById("total-paid")
    var theTotal = document.createElement("h2")
    theTotal.setAttribute("id","your-total-paid")
    theTotal.setAttribute("class", "bottom-line")
    theTotal.appendChild(document.createTextNode(`$${formatNumber(totalPaid)}`))
    yourTotalPaid.appendChild(theTotal)
}
  
$(function() {
    swal('The Financial Forecaster', 
    "The Financial Forecaster is a tool used to organize and prioritize a monthly budget. Each source of debt—credit cards, loans, etc.—should be added as a hurdle, and your totals will be calculated automatically. If you plan to return, don't forget to make a profile! Click a card to get started.")
    gatherInfo(loans)
    $('input.currency').currencyInput();
    $('input.percent').percentInput();
    $("#area1").one("click", function () {
        document.getElementById("description-box").style.display = "none"
    })
    watchForAdd()
    watchForEdits()
    watchForSave()
});