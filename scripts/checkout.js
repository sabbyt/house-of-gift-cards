var checkout = {};
checkout.total = [];

if (localStorage.getItem('claimed-keys')) {
  checkout.claimed = JSON.parse(localStorage.getItem('claimed-keys'));
  console.log(checkout.claimed);

  giftWall.getListTemplate(function() {
    giftWall.renderList(checkout.claimed, function() {
      console.log(checkout.total);
    });
    // checkout.claimed.forEach(giftWall.renderListByKey);
  });

} else {
  $('#empty-cart').removeClass('hidden');
}
