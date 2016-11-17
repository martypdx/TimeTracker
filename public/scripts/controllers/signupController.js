(function(module) {

  const signupController = {};

  signupController.reveal = function() {
    $('.tab-content').hide();
    $('#signup-page').fadeIn('slow');
    
  };

  signupController.postInfo = function(username, password) {
    let user = {username: username, password: password};
    console.log('USER: ', user, typeof user);

    superagent
      .post('http://localhost:3000/api/auth/signup')
      .send(user)
      .then(res => {
        alert('Signup successful');
        let token = JSON.stringify(res.body.token);
        localStorage.setItem('timetrackertoken', token);
        console.log('got token from LS: ', JSON.parse(localStorage.getItem('timetrackertoken')));
      })
      .catch(err => {
        alert(`${JSON.parse(err.response.text).error}. Please try again.`);
      });
  };

  module.signupController = signupController;

})(window);