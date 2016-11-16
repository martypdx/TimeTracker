(function(module) {

  const signupController = {};

  signupController.index = function() {
    $('.home').hide();
    $('.about').hide();
    $('.manage').hide();
    $('.dashboard').slideDown(300);

    signupView.formClick();
  };

  module.signupController = signupController;


})