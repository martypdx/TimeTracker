(function(module) {

  const signinController = {};

  signinController.reveal = function() {
    $('.tab-content').hide();
    $('#landing-page').fadeIn('slow');
    
  };

  signinController.postInfo = function(username, password) {
    let user = {username: username, password: password};

    superagent
      .post('/api/auth/signin')
      .send(user)
      .then(res => {
        alert('Signin successful');
        let token = JSON.stringify(res.body.token);
        localStorage.setItem('timetrackertoken', token);
        console.log('got token from LS: ', JSON.parse(localStorage.getItem('timetrackertoken')));
        page('/dashboard');
      })
      .catch(err => {
        alert(`${JSON.parse(err.response.text).error}. Please try again.`);
      });
  };

  
  module.signinController = signinController;

})(window);