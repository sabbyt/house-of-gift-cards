var checkout = {};
checkout.total = [];

if (JSON.parse(localStorage.getItem('claimed-keys')).length) {
  checkout.claimed = JSON.parse(localStorage.getItem('claimed-keys'));
  console.log(checkout.claimed);

  giftWall.getListTemplate(function() {
    giftWall.renderList(checkout.claimed, checkout.showTotal);
  });

} else {
  $('#empty-cart').show();
}

checkout.sum = function(acc, num) {
  return acc + num;
};

checkout.showTotal = function() {
  var total = checkout.total.reduce(checkout.sum);
  var $tr = $('<tr class="warning">');
  $tr.append($('<td>')).append($('<td>')).append($('<td>'))
    .append($('<td>').text('TOTAL:')).append($('<td>').text('$' + total)).append($('<td>'));
  $('#entry').append($tr);
  checkout.handleConfirm();
};

checkout.handleConfirm = function() {
  $('#checkout-confirm').show().on('click', function(event) {
    event.preventDefault();
    $(this).hide();
    checkout.claimed.forEach(giftWall.confirmRequestByKey);
    $('#checkout-success').show();

    $('#checkout-to-stats').on('click', function(event) {
      event.preventDefault();
      // TODO: replace with page.js redirect
      $(location).attr('href', '/stats.html');
    });
  });
};
