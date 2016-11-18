(function(module) {
  signupView = {};

  signupView.handleSubmitInput = function () {
    $('#signup-submit').on('click', function (){
      var username = $('#signup-form input[name=username]').val();
      var password = $('#signup-form input[name=password]').val();

      signupController.postInfo(username, password);

      $('#signup-form input[name=username]').val('');
      $('#signup-form input[name=password]').val('');
    });
  };

  signupView.handleSubmitInput();

  module.signupView = signupView;


})(window);