(function(module) {

  const manageController = {};

  manageController.reveal = function() {
    $('.tab-content').hide();
    $('#manage-page').fadeIn('slow');
    
  };

  var tttoken = manageToken.getToken();

  manageController.getUser = function(next) {
    $.ajax({
      url:'/api/users/',
      type: 'GET', 
      headers: {Authorization: tttoken},
      success: data => {
        alert(data);
        //TODO: add page render to handle this
        next();
      },
      error: (xhr, type, err) => {
        //TODO: update error handler;
        alert(`Error: ${err}`);
      }

    })
  }

  manageController.editUser = function(obj, next) { 
    //obj passed in should be an object with activities or domains in this format {activites: {act1: 5, act2: 10}, domains: {dom1: 5, dom2: 10}}

    $.ajax({
      url: '/api/users/',
      type: 'PUT',
      headers: {Authorization: tttoken},
      data: obj,
      success: data => {
        //TODO: update this
        if data => alert(`User ${data.username}'s targets successfully updated`);
        next();
        //TODO: add page render function to replace old tb with updated tb (which will get passed in as next)
      }, 
      error: (xhr, type, err) => {
        //TODO: write better handler;
        alert(`Error: ${err}`);
      }
    })
  }

  module.manageController = manageController;

})(window);