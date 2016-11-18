(function(module) {
  signinView = {};


  signinView.handleSubmitInput = function () {
    $('#signin-submit').on('click', function (){

      var username = $('#signin-form input[name=username]').val();
      var password = $('#signin-form input[name=password]').val();


      signinController.postInfo(username, password);
      // signinController.reveal();

      $('#signin-form input[name=username]').val('');
      $('#signin-form input[name=password]').val('');

    });
  };

  signinView.signOut = function() {

    $('#signout').on('click', (event) => {
      manageToken.removeToken();
    });
    
  
  }

  signinView.handleSubmitInput();
  signinView.signOut();

  module.signinView = signinView;


})(window);
