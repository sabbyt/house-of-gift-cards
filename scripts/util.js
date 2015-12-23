var util = {};

util.currentSection = function() {
  var path = $(location).attr('pathname');
  var section = path.match(/\/\w+/)[0].substring(1).toLowerCase();
  return section;
};

util.setActiveNav = function(section) {
  $('#navbar li').removeClass('active');
  $('#navbar li[data-section=' + section + ']').addClass('active');
};

/* ========================= HANDLEBARS HELPERS ========================= */
Handlebars.registerHelper('if_wall', function (block) {
  if (util.currentSection() === 'wall') {
    return block.fn(this);
  } else {
    return block.inverse(this);
  }
});

Handlebars.registerHelper('if_checkout', function (block) {
  if (util.currentSection() === 'checkout') {
    return block.fn(this);
  } else {
    return block.inverse(this);
  }
});