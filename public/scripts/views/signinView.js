(function(module) {
  signinView = {};


  signinView.handleSubmitInput = function () {
    $('#signin-submit').on('click', function (){

      var username = $('#signin-form input[name=username]').val();
      var password = $('#signin-form input[name=password]').val();
      // this is where the username and password is being sent to /api/auth/signin

      signinController.postInfo(username, password);
      // signinController.reveal();
    });
  };

  signinView.handleSubmitInput();

  module.signinView = signinView;


})(window);
