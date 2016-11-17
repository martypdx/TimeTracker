(function(module) {

  const signinController = {};

  signinController.reveal = function() {
    $('.tab-content').hide();
    $('#landing-page').fadeIn('slow');
    
  };

  signinController.postInfo = function(username, password, next) {
    $.ajax({
      type: 'POST',
      url: '/api/auth/signin',
      data: {username, password},
      success: data => {
        localStorage.setItem('timetrackertoken', data);
        next();
        //TODO: what else does this need to do?
      },
      error: (xkr, type, err) => {
        //TODO: update with better error handler?
        alert(`Error: ${err}. Please try again`);
      }
    });
  };

  module.signinController = signinController;

})(window);