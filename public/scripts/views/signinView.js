(function(module) {
  signinView = {};

  signinView.handleSubmitInput = function () {
    $('#signin-submit').on('click', function (){
      // this is where the username and password is being sent to /api/auth/signin
      signinController.reveal();
    });
  };

  signinView.handleSubmitInput();

  module.signinView = signinView;


})(window);
