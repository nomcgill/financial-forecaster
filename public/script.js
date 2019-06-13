"use strict";

// import { link } from "fs";

var loans = []

// $(document).ready(function(loans) {

// });

function gatherInfo(loans){
    // if (loans.length > 0){
        createCards(loans)
        createAddCardBox()
        addEmUp(loans)
    // }
    // else {
        // createAddCardBox()
    // }
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

function createCards(loans){
    loans.forEach((loan) => {
        // console.log("Loan heard: " + loan.name)
        var grid = document.getElementById("grid")
        var newCard = document.createElement("div")
        var children = grid.children.length + 1
        newCard.setAttribute("id", "area" + children)
        newCard.setAttribute("class", "boxes")
        newCard.appendChild(document.createTextNode(`${loan.name}`))
        newCard.appendChild(document.createTextNode(`Payment: ${loan.payment}`))
        grid.appendChild(newCard)
        // document.getElementById(`area${children}`).addEventListener("click", onAddHurdleClick);
    })
}

// var grid2 = document.getElementById("results")
// var eachResult = document.createElement("div")
// var children = grid2.children.length + 1
// oneResult.setAttribute("id", "oneResult" + children)
// oneResult.setAttribute("class", "footResults")
// oneResult.appendChild(document.createTextNode(`Hello! Number`))
// grid2.appendChild(oneResult)

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
    console.log([card])
    let count = 0
    let balanceTracker = [card.balance]
    let payments = []
    let lastKnownBalance = card.balance
    do {
        if (lastKnownBalance > 9999999){
            count = count + 1
            var paid = roundCents(payments.reduce(getSum))
            var results = ["$" + paid + " paid on " + card.name, "Stopped counting after " + ((count + 1)/12) + " years because balance reached over $1,000,000."]
            console.log(results)
            return [results]
        }
        if (count > 1999){
            count = count + 1
            var paid = roundCents(payments.reduce(getSum))
            console.log("A lifetime of debt.")
            var results = ["$" + paid + " paid", "Stopped counting after " + (count + 1) + " months."]
            console.log(results)
            return [results]
        }      
        lastKnownBalance = balanceTracker[balanceTracker.length -1]
        if (card.payment < lastKnownBalance){
            console.log("Payment made of " + card.payment)
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
            console.log(results.count + " : count")
            // console.log("Made it to the end! Results: " + card.name + ": " + results.paid + " in " + count + " months.")
            return results
        }
    }
    while (balanceTracker[balanceTracker.length - 1] > 0)
}

function findInterestPaid(card){
    var result = roundCents(calculateSimpleInt(card).paid - card.balance)
    console.log("findIntPaid: " + card.name + ": " + result)
    return result
}

function addEmUp(loans){
    console.log("addEmUp is run")
    var monthlyPay = []
    var cardStartingBalance = []
    var totals = []
    if (loans.length > 0 ){
        for (let i=0; i < loans.length; i++){
            var card = loans[i]
            console.log(card.name + ":")
            var cardPaid = calculateSimpleInt(card)
            console.log(cardPaid.paid + " in " + cardPaid.count + " payments.")
            if (isNaN(cardPaid.paid)){
                alert(card.name + " excluded from calculations for unreasonable nature.")
            }
            else {            
                console.log("cardPaid: " + cardPaid.paid)
                monthlyPay.push(card.payment)
                cardStartingBalance.push(card.balance)
                totals.push(cardPaid.paid)
            }
        }
        var monthlyTotal = roundCents(monthlyPay.reduce(getSum))
        var startingBalance = roundCents(cardStartingBalance.reduce(getSum))
        var totalPaid = roundCents(totals.reduce(getSum))
        console.log("$" + totalPaid + ": totalPaid")
        postMonthlyCost(monthlyTotal)
        postStartingBalance(startingBalance)
        postTotalPaid(totalPaid)
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
    console.log("starting balance: " + totalOwed)
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

// function watchForm() {
//     $('form').submit(event => {
//       event.preventDefault();
//        var ratingInput = document.getElementById("challenge-rating").value
//        checkMonsterList(ratingInput)
//        });
//   }
  
$(function() {
    console.log('App loaded! Waiting for submit!');
    // gatherInfo(exampleLoans)
    gatherInfo(loans)
    // watchForm();
});