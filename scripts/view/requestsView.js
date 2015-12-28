var requestsView = {};

requestsView.displayAll = function(requestRow){
  requestArray.forEach(requestsView.displayRequest);

  requestsView.displayRequest(requestArray.first_name, requestArray.last_name, requestArray.age, requestArray.email, requestArray.story, requestArray.category, requestArray.brand, requestArray.amount, requestArray.request_dt);
};

requestsView.displayRequest = function(firstName, lastName, age, email, story, category, brand, amount, request_dt){
  $('<div/>').text(firstName +' '+ lastName +' '+ age +' '+ email +' '+ story +' '+ category +' '+ brand +' '+ amount +' '+ request_dt).prepend($('<p/>')).appendTo($('#requesterList'));
};
