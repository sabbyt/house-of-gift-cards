var wallController = {};

wallController.listView = function() {
  giftWall.getListTemplate(wallView.renderListAll);
};

wallController.listView();

$('#entry').on('click', '.claim-button', function(event) {
  event.preventDefault();
  console.log('claimed' + $(this).data('key'));
  $(this).text('Unclaim').removeClass('claim-button').addClass('unclaim-button');
  $(this).parent().parent('tr').toggleClass('selected');
});

$('#entry').on('click', '.unclaim-button', function(event) {
  event.preventDefault();
  console.log('unclaimed' + $(this).data('key'));
  $(this).text('Claim').removeClass('unclaim-button').addClass('claim-button');
  $(this).parent().parent('tr').toggleClass('selected');
});
