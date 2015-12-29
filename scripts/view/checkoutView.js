// NOTE: checkout is heavily dependent on wall MVC

var checkoutView = {};

checkoutView.showTotal = function() {
  checkout.total = checkout.totalArray.reduce(checkout.sumArray);
  console.log(checkout.total);
  var $tr = $('<tr id="checkout-total" class="warning">');
  $tr.append($('<td>')).append($('<td>')).append($('<td>'))
    .append($('<td>').text('TOTAL:'))
    .append($('<td id="checkout-total-amount" class="amount">').text('$' + checkout.total)).append($('<td>'));
  $('#checkout-table').append($tr);
  if (!checkoutController.confirmHandlersOn) {
    checkoutController.handleConfirm();
  }
};

checkoutView.showCheckout = function() {
  $('#checkout-table tr').not(':first-child').remove();
  giftWall.getListTemplate(function() {
    checkoutView.renderListByKeys(giftWall.claimed, checkoutView.showTotal);
  });
};

checkoutView.showEmptyCart = function() {
  $('#checkout-confirm').hide();
  $('#empty-cart').show();
  $('#checkout-total').remove();
};

checkoutView.toListHTML = function(data) {
  var html = giftWall.listTemplate(data);
  $('#checkout-table').append(html);
};

checkoutView.renderListByKeys = function(keys, callback) {
  var renderCount = 0;
  checkout.totalArray = [];
  keys.forEach(function(key) {
    giftWall.findByKey(key, function(snapshot) {
      var temp = snapshot.val()[key];
      temp.key = key;
      checkoutView.toListHTML(temp);
      checkout.totalArray.push(parseInt(temp.amount));

      renderCount++;
      if (renderCount === keys.length) {
        callback();
      }
    });
  });
};
