
// console.log(loans[1].name + "global scope heard")

function onAddHurdleClick(){
    $('#popup-form').trigger("reset")
    $("#list-builder").fadeIn("fast", () => {
        $("#popup-box").fadeIn("fast", () => {});
    });

    document.getElementById("new-card-pay").addEventListener("keyup", timeFrame)
    document.getElementById("new-card-apr").addEventListener("keyup", timeFrame)
    document.getElementById("new-card-balance").addEventListener("keyup", timeFrame)

    $("#popup-form").submit(() => {
      event.preventDefault();
      var newCard = gatherInputs()
      console.log(newCard)
      if (calculateSimpleInt(newCard) !== false){
        loans.push(newCard)
        $("#list-builder, #popup-box").hide();
      }
      else {alert("Stuck in Debt Hell! Payment too small to add to Financial Forecast")}
      $("#grid").empty()
      gatherInfo(loans)
    })

    $("#popup-close").click(() => {
        $("#list-builder, #popup-box").hide();
    });             
    $("#new-card-cancel").click(() => {
      $("#list-builder, #popup-box").hide();
  });              
  if (loans.length = 7){
    alert("Financial Forecaster is limited to 8 hurdles. This is one the last available!")
  }                                                                                                  
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
  // console.log("stats: " + stats.name + " added")
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