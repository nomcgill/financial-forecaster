function onAddHurdleClick(){
  if(loans.length < 9) {
    console.log('addHurdleClick is being run')
    $('#popup-form').trigger("reset")
    $("#list-builder").fadeIn("fast", () => {
        $("#popup-box").fadeIn("fast", () => {});
    });
  
    $("#popup-close").click(() => {
        $("#list-builder, #popup-box").hide();
    });             
    $("#new-card-cancel").click(() => {
      $("#list-builder, #popup-box").hide();
  });                                                                                                                
  }
  else {
  alert("Financial forecaster won't fit more than 9 hurdles!")
  }
}

$("form").submit(() => {
  event.preventDefault();
  var newCard = gatherInputs()
  loans.push(newCard)
  $("#list-builder, #popup-box").hide();
})

function timeFrame(){
  $("#new-card-pay, #new-card-apr, #new-card-balance").change(() => {
    var card = gatherInputs()
    console.log("card balance " + card.balance + " & card rate " + card.rate + " & card payment " + card.payment)
    
    if ( card.balance !== "" && card.rate !== "" && card.payment !== "" ){
      // console.log([card])
      var intCalc = calculateSimpleInt(card)
      console.log(intCalc)
      if (!isNaN(intCalc.count)){
        $(`#longevity`).replaceWith(
        `<div id="longevity">${intCalc.count} payments will cost you $${formatNumber(intCalc.paid)}.</div>`
      )};
      if (isNaN(intCalc.count)){
        $(`#longevity`).replaceWith(
        `<div id="longevity">With that payment and interest? Not in this lifetime, buckaroo.</div>`
      )};
    }
    else {
      $(`#longevity`).replaceWith(
        `<div id="longevity">Still needs more info...</div>`
      )}
  }
)};

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
  
$(document).ready(function() {
    $('input.currency').currencyInput();
    $('input.percent').percentInput();
    watchForm()
    timeFrame()
});

function watchForm(){
  $('defaultBox').click(function(){
    onAddHurdleClick()
  });
}