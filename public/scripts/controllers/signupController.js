(function(module) {

  const signupController = {};

  signupController.reveal = function() {
    $('.tab-content').hide();
    $('#signup-page').fadeIn('slow');
    
  };

  signupController.postInfo = function(username, password) {
    $.ajax({
      type: 'POST',
      url: '/api/auth/signup',
      data: {username, password},
      success: data => {
        localStorage.setItem('timetrackertoken', data);
        //TODO: what else does this need to do?
      },
      error: (xkr, type, err) => {
        //TODO: update with better error handler?
        alert(`Error: ${err}. Please try again`);
      }
    });
  };

  module.signupController = signupController;

})(window);