(function(module) {
  signupView = {};

  signupView.handleSubmitInput = function () {
    $('#signup-submit').on('click', function (){
      var username = $('#signup-form input[name=username]').val();
      var password = $('#signup-form input[name=password]').val();

      signupController.postInfo(username, password);


      console.log(username, password);
      // TODO: Add page navigation to show manage user page.
      // signupController.reveal();
    });
  };

  signupView.handleSubmitInput();

  module.signupView = signupView;


})(window);