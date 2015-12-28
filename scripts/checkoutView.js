// NOTE: checkout is heavily dependent on wall MVC

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
