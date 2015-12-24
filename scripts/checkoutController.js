// NOTE: checkout is heavily dependent on wall MVC

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

// ======== TO ROUTER =========
checkoutController.showCheckout();
