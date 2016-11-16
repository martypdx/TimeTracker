(function(module) {

  const signupController = {};

  signupController.reveal = function() {
    $('.tab-content').hide();
    $('#signup-page').fadeIn('slow');
    
  };

  module.signupController = signupController;

})(window);