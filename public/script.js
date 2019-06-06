"use strict";

console.log("Page is loading...")

let loans = [
    {
        name: "Chase CC",
        balance: 6000,
        rate: 22,
        payment: 200,
        compound: true
    },
    {
        name: "Bank of America CC",
        balance: 4000,
        rate: 15.5,
        payment: 300,
        compound: true
    },
    {
        name: "Mortgage",
        balance: 210000,
        rate: 5,
        payment: 1700,
        compound: false
    },
    {
        name: "Mazda",
        balance: 180000,
        rate: 3.25,
        payment: 325,
        compound: false
    },
    {
        name: "Student Loan",
        balance: 18000,
        rate: 4.25,
        payment: 310,
        compound: true
    }
]

// loans.forEach(function(statistic){
//     console.log(statistic.name);
//     console.log(statistic.balance);
//     console.log(balance)
// });

// function getSum(total, num) {
//     return total + num;
//   }

//   var totalDebt = function totalDebt(loans){
//     var combinedBalances = []
//     loans.forEach(function(statistic){
//         combinedBalances.push(statistic.balance)
//     })
//     console.log(combinedBalances)
//     var total = combinedBalances.reduce(getSum)
//     console.log("Total Debt: " + total)
//     return total
// }
// console.log(loans.length)
// totalDebt(loans)

console.log(loans[0])

function calculateCompoundInt(loans){
    var card = loans[0]
    let newBalance = card.balance
    console.log("Starting Balance: " + newBalance)
    let payments = 0
    while (newBalance > 0){
        console.log(newBalance)
        newBalance = newBalance * card.rate / 1200 + newBalance - card.payment;        
        payments = payments + 1
        console.log(payments)
        }
    // do {nextMonthBal(newMonthBal)}
    // while (newMonthBal > 0)
    // nextMonthBal(newBalance)
    // // var nextMonthBal = card.balance * card.rate / 1200 + card.balance - card.payment
    // for (let i = 0; nextMonthBal > 0; i++){
    //     []
    //     let nextMonthBal = card.balance * card.rate / 1200 + card.balance - card.payment;
    //     consolog.log(nextMonthBal)}
    // console.log(nextMonthBal)
}

calculateCompoundInt(loans)