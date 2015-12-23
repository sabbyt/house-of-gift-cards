var wallController = {};

// if (localStorage.getItem('claimed-keys')) {
//   wallController.claimed = JSON.parse(localStorage.getItem('claimed-keys'));
//   wallController.claimed.forEach(function(key) {
//     $('#entry').find('button[data-key=' + key + ']').trigger('click');
//   });
// } else {
  // wallController.claimed = [];
// }

wallController.claimed = [];

console.log(wallController.claimed);


wallController.listView = function() {
  giftWall.getListTemplate(wallView.renderListAll);
};

wallController.handleClaimButtons = function() {
  $('#entry').on('click', '.claim-button', function(event) {
    event.preventDefault();
    console.log('claimed ' + $(this).data('key'));
    wallView.claim($(this));

    wallController.addClaim($(this).data('key'));
    wallController.updateLS();
  });

  $('#entry').on('click', '.unclaim-button', function(event) {
    event.preventDefault();
    console.log('unclaimed ' + $(this).data('key'));
    wallView.unclaim($(this));

    wallController.removeClaim($(this).data('key'));
    wallController.updateLS();
  });
};

wallController.addClaim = function(key) {
  if (wallController.claimed.indexOf(key) < 0) {
    wallController.claimed.push(key);
  }
};

wallController.removeClaim = function(key) {
  var index = wallController.claimed.indexOf(key);
  wallController.claimed.splice(index, 1);
};

wallController.updateLS = function() {
  localStorage.setItem('claimed-keys', JSON.stringify(wallController.claimed));
  console.log(wallController.claimed);
};

wallController.listView();
wallController.handleClaimButtons();
