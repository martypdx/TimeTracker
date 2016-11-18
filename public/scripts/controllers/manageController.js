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
        alert('Got it');
        console.log('Get user:', res.body);
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
        console.log('success', res.body);
      })
      .catch(err => {
        alert(JSON.parse(err.response.text).error);
      });
  };

//TODO: check after adding timeblocks
  manageController.getAllTimeBlocks = () => {
    // $.ajax({
    //   url: '/api/timeblocks/users', //TODO: check to make sure this is correct after Caitlyn moves it to timeblocks out of users.
    //   type: 'GET', 
    //   headers: {Authorization: tttoken}, 
    //   success: data => {
    //     alert('Success! Got the timeblocks, check console:');
    //     console.log(`GET ALL TB: ${data}`);

    //     //TODO: write a thing to do with the data
    //     next(data);
    //   }, 
    //   error: (xhr, type, err) => alert(`Error: ${err}`)
    // });

    superagent 
      .get('api/timeblocks/users')
      .set('Authorization', tttoken)
      .then(res => {
        alert(`Got timeblock`);
        console.log(res.body);
      })
      .catch(err => {
        alert(JSON.parse(err.response.text).error);
      });
  };

  manageController.getOneTimeBlock = (id, next) => {
    // $.ajax({
    //   url: `/api/timeblocks/${id}`, 
    //   type: 'GET', 
    //   headers: {Authorization: tttoken},
    //   success: data => {
    //     //TODO: write better handler
    //     alert('Got data, check console');
    //     console.log(`GET ONE TIMEBLOCK: ${data}`);
    //     next(data);
    //   }, 
    //   error: (xhr, type, err) => {
    //     alert(`Error: ${err}`);
    //   }
    // });
    superagent
      .get(`/api/timeblocks/${id}`)
      .set('Authorization', tttoken)
      .then(res => {
        alert(`Got timeblock`);
        console.log(res.body);
      })
      .catch(err => {
        alert(JSON.parse(err.response.text).error);
      });
  };

  manageController.editTimeBlock = (id, obj, next) => {
    $.ajax({
      url: `/api/timeblocks/${id}`, 
      type: 'PUT', 
      headers: {Authorization: tttoken},
      data: obj,
      success: data => {
        alert('Successfully updated timeblock, check console');
        console.log(`PUT TIMEBLOCK: ${data}`);
        next(data);
      },
      error: (xhr, type, err) => {
        console.log(`Error: ${err}`);
      }
    });
  };

  manageController.deleteTimeBlock = (id, next) => {
    $.ajax({
      url: `/api/timeblocks/${id}`, 
      type: 'DELETE', 
      headers: {Authorization: tttoken},
      success: data => {
        alert('Successfully deleted timeblock, check console');
        console.log(`DELETE TIMEBLOCK: ${data}`);
        next(data);
      },
      error: (xhr, type, err) => {
        console.log(`Error: ${err}`);
      }
    });
  };

  manageController.addTimeBlock = (obj) => {
    // $.ajax({
    //   url: `/api/timeblocks/${id}`, 
    //   type: 'POST', 
    //   headers: {Authorization: tttoken},
    //   data: obj,
    //   success: data => {
    //     alert('Successfully added timeblock, check console');
    //     console.log(`POST NEW TIMEBLOCK: ${data}`);
    //     next(data);
    //   },
    //   error: (xhr, type, err) => {
    //     console.log(`Error: ${err}`);
    //   }
    // });

    superagent
      .post('/api/timeblocks')
      .set('Authorization', tttoken)
      .send(obj)
      .then(res => {
        console.log('success: ', res.body);
      })
      .catch(err => {
        alert(JSON.parse(err.response.text).error);
      });


  };

  module.manageController = manageController;

})(window);