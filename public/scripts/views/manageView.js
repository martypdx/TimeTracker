(function(module) {
  manageView = {};

  manageView.handleSubmitInput = function () {
    $('#activity-submit').on('click', function (){
     // this is where the ajax call is made to post user activity input to /api/users/activities,
      manageController.reveal();
    });
    $('#domain-submit').on('click', function (){
      // this is where the ajax call is made to post user domain input to /api/users/domains
      manageController.reveal();
     });
  };

  manageView.handleInput();

  module.manageView = manageView;


})(window);