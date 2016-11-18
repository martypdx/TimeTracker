(function(module) {

  const manageController = {};

  manageController.reveal = function() {
    $('.tab-content').hide();
    $('#manage-page').fadeIn('slow');
    
  };

  var tttoken = manageToken.getToken();

  manageController.getUser = function() {
    superagent
      .get('/api/users')
      .set('Authorization', tttoken)
      .then(res => {
        alert('Got user!');
        console.log('User:', res.body);
      })
      .catch(err => {
        alert(JSON.parse(err.response.text).error);
      });
  };

  manageController.editUser = function(obj, next) { 

    console.log('edituser', tttoken);
    //obj passed in should be an object with activities or domains in this format {activites: {act1: 5, act2: 10}, domains: {dom1: 5, dom2: 10}}
    superagent
      .put('/api/users')
      .set('Authorization', tttoken)
      .send(obj)
      .then(res => {
        alert('Successfully updated user!')
        console.log('Updated User:', res.body);
      })
      .catch(err => {
        alert(JSON.parse(err.response.text).error);
      });
  };

  manageController.getAllTimeBlocks = () => {

    superagent 
      .get('/api/timeblocks/users')
      .set('Authorization', tttoken)
      .then(res => {
        alert('Got all timeblocks');
        console.log('Timeblocks', res.body);
      })
      .catch(err => {
        alert(JSON.parse(err.response.text).error);
      });
  };

  manageController.getOneTimeBlock = (id, next) => {
    
    superagent
      .get(`/api/timeblocks/${id}`)
      .set('Authorization', tttoken)
      .then(res => {
        alert('Got timeblock');
        console.log('Timeblock', res.body);
      })
      .catch(err => {
        alert(JSON.parse(err.response.text).error);
      });
  };

  manageController.editTimeBlock = (id, obj) => {

    superagent
      .put(`/api/timeblocks/${id}`)
      .set('Authorization', tttoken)
      .send(obj)
      .then(res => {
        alert('Successfully updated timeblock');
        console.log('Updated timeblock:', res.body);
      })
      .catch(err => {
        alert(JSON.parse(err.response.text).error);
      });

  };

  manageController.deleteTimeBlock = (id, next) => {

    superagent
      .del(`/api/timeblocks/${id}`)
      .set('Authorization', tttoken)
      .then(res => {
        alert('Successfully deleted timeblock');
        console.log('Deleted timeblock', res.body);
      })
      .catch( err => console.log(err.response.text).error);

  };

  manageController.addTimeBlock = (obj) => {

    superagent
      .post('/api/timeblocks')
      .set('Authorization', tttoken)
      .send(obj)
      .then(res => {
        alert('Added new timeblock!');
        console.log('New timeblock: ', res.body);
        page('/dashboard');
      })
      .catch(err => {
        alert(JSON.parse(err.response.text).error);
      });


  };

  module.manageController = manageController;

})(window);