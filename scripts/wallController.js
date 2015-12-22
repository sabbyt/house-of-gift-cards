var wallController = {};
wallController.claimed = [];

wallController.listView = function() {
  giftWall.getListTemplate(wallView.renderListAll);
};

wallController.handleClaimButtons = function() {
  $('#entry').on('click', '.claim-button', function(event) {
    event.preventDefault();
    console.log('claimed' + $(this).data('key'));
    $(this).text('Unclaim').removeClass('claim-button').addClass('unclaim-button');
    $(this).parent().parent('tr').toggleClass('selected');

    wallController.claimed.push($(this).data('key'));
    console.log(wallController.claimed);
    localStorage.setItem('claimed-keys', wallController.claimed);
  });

  $('#entry').on('click', '.unclaim-button', function(event) {
    event.preventDefault();
    console.log('unclaimed' + $(this).data('key'));
    $(this).text('Claim').removeClass('unclaim-button').addClass('claim-button');
    $(this).parent().parent('tr').toggleClass('selected');

    var index = wallController.claimed.indexOf($(this).data('key'));
    wallController.claimed.splice(index, 1);
    console.log(wallController.claimed);
    localStorage.setItem('claimed-keys', wallController.claimed);
  });
};

wallController.listView();
wallController.handleClaimButtons();
