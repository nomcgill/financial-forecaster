"use strict";

// import { link } from "fs";

let exampleLoans = [
    {
        name: "Chase CC",
        balance: 6000,
        rate: 22.75,
        payment: 200
    },
    {
        name: "Bank of America CC",
        balance: 4000,
        rate: 15.5,
        payment: 2000    
    },
    {
        name: "Mortgage",
        balance: 210000,
        rate: 5,
        payment: 1700    
    },
    {
        name: "Mazda",
        balance: 15000,
        rate: 3.25,
        payment: 400    
    },
    {
        name: "Student Loan",
        balance: 18000,
        rate: 4.25,
        payment: 310    
    },
    {
        name: "Child Support",
        balance: 6000,
        rate: 30,
        payment: 500    
    },
    {
        name: "HELOC",
        balance: 40000,
        rate: 4.25,
        payment: 600  
    }
]

// var ul = document.getElementById("list");
// var li = document.createElement("li");
// li.appendChild(document.createTextNode("Four"));
// li.setAttribute("id", "element4"); // added line
// ul.appendChild(li);


function gatherInfo(loans){
    createCards(loans)
    addEmUp(loans)
}

function roundCents(input){
    return Math.round(100 *(input))/100;
}

function getSum(total, num) {
    return total + num;
}

function createCards(loans){
    loans.forEach((loan) => {
    console.log("Loan heard: " + loan.name)
    var grid = document.getElementById("grid")
    var newCard = document.createElement("div")
    var children = grid.children.length + 1
    newCard.setAttribute("id", "area" + children)
    newCard.appendChild(document.createTextNode(`${loan.name}`))
    grid.appendChild(newCard)
    })
}

function calculateSimpleInt(card){
    // console.log("calculateSimpleInt is run")
    let count = 0
    let balanceTracker = [card.balance]
    let payments = []
    let lastKnownBalance = card.balance
    do {
        count = count + 1
        if (lastKnownBalance > 9999999){
            var paid = roundCents(payments.reduce(getSum))
            var results = ["$" + paid + " paid on " + card.name, "Stopped counting after " + ((count + 1)/12) + " years because balance reached over $1,000,000."]
            console.log(results)
            return [results]
        }
        if (count > 1999){
            var paid = roundCents(payments.reduce(getSum))
            console.log("A lifetime of debt.")
            var results = ["$" + paid + " paid", "Stopped counting after " + (count + 1) + " months."]
            console.log(results)
            return [results]
        }      
        lastKnownBalance = balanceTracker[balanceTracker.length -1]
        if (card.payment < lastKnownBalance){
            lastKnownBalance = lastKnownBalance * card.rate / 1200 + lastKnownBalance - card.payment;
            balanceTracker.push(lastKnownBalance);
            payments.push(card.payment)
        }
        if (card.payment >= lastKnownBalance){
            payments.push(lastKnownBalance)
            var paid = roundCents(payments.reduce(getSum))
            var results = [paid, count + 1]
            return results
        }
    }
    while (balanceTracker[balanceTracker.length - 1] > 0)
}

function addEmUp(loans){
    console.log("addEmUp is run")
    var totals = []
    for (let i=0; i < loans.length; i++){
        var card = loans[i]
        console.log(card.name + ":")
        if (isNaN(calculateSimpleInt(card)[0])){
            console.log(card.name + " excluded for unreasonable nature.")
        }
        else {            
            var cardPaid = calculateSimpleInt(card)[0]
            console.log("cardPaid: " + cardPaid)
            totals.push(cardPaid)
        }
    }
    console.log(totals)
    var totalPaid = roundCents(totals.reduce(getSum))
    console.log("$" + totalPaid + ": totalPaid")
    return totalPaid
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
    gatherInfo(loans)
    // watchForm();
});