(function(module) {
  signupView = {};

  signupView.handleSubmitInput = function () {
    $('#signup-submit').on('click', function (){
      // this is where the username and password is being sent to /api/auth/signup
      signupController.reveal();
    });
  };

  signupView.handleSubmitInput();

  module.signupView = signupView;


})(window);