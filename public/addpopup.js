
function onAddHurdleClick(){
  document.getElementById("popup-form").reset();
  $(`#longevity`).replaceWith(`<div id="longevity"></div>`)
  if (loans.length === 7){
    alert("Financial Forecaster is limited to 8 hurdles. This is one the last available!")
  }  
  $("#list-builder").fadeIn("fast", () => {
      $("#popup-box").fadeIn("fast", () => {});
  });

  var cardName = document.getElementById("new-card-name")
  var cardPay = document.getElementById("new-card-pay")
  var cardAPR = document.getElementById("new-card-apr")
  var cardBal = document.getElementById("new-card-balance")

  cardPay.addEventListener("keyup", timeFrame)
  cardAPR.addEventListener("keyup", timeFrame)
  cardBal.addEventListener("keyup", timeFrame)
  cardName.setAttribute("value", ``)
  cardPay.setAttribute("value", ``)
  cardAPR.setAttribute("value", ``)
  cardBal.setAttribute("value", ``)

  $("#popup-form").submit(event => {
    console.log("ADD form submit ran")
    event.preventDefault()
    event.stopImmediatePropagation();
    var text = $('#add-title').text();
    if(text === "Add New Debt Hurdle"){
      newCard = gatherInputs()
      if (calculateSimpleInt(newCard) !== false){
        loans.push(newCard)
        $("#list-builder, #popup-box").hide();
      }
      else {alert("Stuck in Debt Hell! Payment too small to add to Financial Forecast")}
      $("#grid").empty()
      gatherInfo(loans)
      stopListening()
    }
  })

  $("#popup-close").click(() => {
    $("#list-builder, #popup-box").hide();
    stopListening()
  });             
  $("#new-card-cancel").click(() => {
    $("#list-builder, #popup-box").hide();
    stopListening()
  });                                                                                                              
}

function timeFrame(){
  // var numberBoxes = "#new-card-pay, #new-card-apr, #new-card-balance"
  // $(numberBoxes).change(() => {
    var card = gatherInputs()
    // console.log("card balance " + card.balance + " & card rate " + card.rate + " & card payment " + card.payment)
    
    if ( card.balance !== 0 && card.rate !== 0 && card.payment !== 0 ){
      // console.log([card])
      var intCalc = calculateSimpleInt(card)
      // console.log(intCalc)
      if (!isNaN(intCalc.count)){
        $(`#longevity`).replaceWith(
        `<div id="longevity">${intCalc.count} payments will cost you $${formatNumber(intCalc.paid)}.</div>`
      )};
      if (isNaN(intCalc.count)){
        $(`#longevity`).replaceWith(
        `<div id="longevity">Increase your payments if you ever want to finish...</div>`
      )};
    }
    else {
      $(`#longevity`).replaceWith(
        `<div id="longevity">Still needs more info...</div>`
      )}
  // })
};

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

(function($) {
    $.fn.currencyInput = function() {
      this.each(function() {
        var wrapper = $("<div class='currency-input' />");
        $(this).wrap(wrapper);
        $(this).before("<span class='currency-symbol'>$ </span>");
        $(this).change(function() {
          var min = parseFloat($(this).attr("min"));
          var max = parseFloat($(this).attr("max"));
          var value = this.valueAsNumber;
          if(value < min)
            value = min;
          else if(value > max)
            value = max;
          $(this).val(value.toFixed(2)); 
        });
      });
    };
  })(jQuery);

(function($) {
    $.fn.percentInput = function() {
      this.each(function() {
        var wrapper = $("<div class='percent-input' />");
        $(this).wrap(wrapper);
        $(this).before("<span class='percent-symbol'>% </span>");
        $(this).change(function() {
          var min = parseFloat($(this).attr("min"));
          var max = parseFloat($(this).attr("max"));
          var value = this.valueAsNumber;
          if(value < min)
            value = min;
          else if(value > max)
            value = max;
          $(this).val(value.toFixed(2)); 
        });
      });
    };
  })(jQuery);

function watchForAdd(){
  $('defaultBox').click(function(){
    onAddHurdleClick(loans)
  });
}