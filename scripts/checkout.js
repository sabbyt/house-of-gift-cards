var checkout = {};
checkout.totalArray = [];

checkout.sumArray = function(acc, num) {
  return acc + num;
};

var checkoutView = {};

checkoutView.showTotal = function() {
  checkout.total = checkout.totalArray.reduce(checkout.sumArray);
  var $tr = $('<tr id="checkout-total" class="warning">');
  $tr.append($('<td>')).append($('<td>')).append($('<td>'))
    .append($('<td>').text('TOTAL:'))
    .append($('<td id="checkout-total-amount" class="amount">').text('$' + checkout.total)).append($('<td>'));
  $('#entry').append($tr);
  checkoutController.handleConfirm();
};

checkoutView.showCheckout = function() {
  giftWall.getListTemplate(function() {
    wallView.renderListByKeys(giftWall.claimed, checkoutView.showTotal);
  });
};

checkoutView.showEmptyCart = function() {
  $('#checkout-confirm').hide();
  $('#empty-cart').show();
  $('#checkout-total').remove();
};

var checkoutController = {};

// OVERARCHING CALL FOR CHECKOUT PAGE
checkoutController.showCheckout = function() {
  if (JSON.parse(localStorage.getItem('claimed-keys')).length) {
    giftWall.claimed = JSON.parse(localStorage.getItem('claimed-keys'));
    console.log(giftWall.claimed);
    checkoutView.showCheckout();
    checkoutController.handleRemoveClaim();
  } else {
    checkoutView.showEmptyCart();
  }
};

checkoutController.handleConfirm = function() {
  $('#checkout-confirm').show().on('click', function(event) {
    event.preventDefault();
    $(this).hide();
    $('#checkout-to-wall').hide();
    $('button.close').hide();
    $('#checkout-success').show();
    giftWall.claimed.forEach(giftWall.confirmRequestByKey);

    giftWall.claimed = [];
    giftWall.updateLS();
  });
};

checkoutController.handleRemoveClaim = function() {
  $('#entry').on('click', '.close', function(event) {
    event.preventDefault();
    console.log('removed' + $(this).data('key'));
    var tdAmount = $(this).parent().siblings('td[name=amount]')[0];
    var removedAmount = parseInt($(tdAmount).text().substring(1));
    checkout.total -= removedAmount;
    $('#checkout-total-amount').text('$' + checkout.total);
    $(this).parent().parent('tr').remove();

    giftWall.removeClaim($(this).data('key'));

    if (checkout.total === 0) {
      checkoutView.showEmptyCart();
    }
  });
};


checkoutController.showCheckout();
