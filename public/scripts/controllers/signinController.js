(function(module) {

  const signinController = {};

  signinController.reveal = function() {
    $('.tab-content').hide();
    $('#landing-page').fadeIn('slow');
    
  };

  module.signinController = signinController;

})(window);