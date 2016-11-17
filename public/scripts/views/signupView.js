(function(module) {
  signupView = {};

  signupView.handleSubmitInput = function () {
    $('#signup-submit').on('click', function (){
      var username = $('#signup-form input[name=username]').val();
      var password = $('#signup-form input[name=password]').val();

      signupController.postInfo(username, password);

      console.log(username, password);
      // this is where the username and password is being sent to /api/auth/signup
      // signupController.reveal();
    });
  };

  signupView.handleSubmitInput();

  module.signupView = signupView;


})(window);