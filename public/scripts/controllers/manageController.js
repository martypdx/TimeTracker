(function(module) {

  const manageController = {};

  manageController.reveal = function() {
    $('.tab-content').hide();
    $('#manage-page').fadeIn('slow');
    
  };

  var tttoken = manageToken.getToken();

  manageController.getUser = function(next) {
    $.ajax({
      url:'/api/users/',
      type: 'GET', 
      headers: {Authorization: tttoken},
      success: data => {
        alert('Got it! Check console for res');
        console.log(`Get user: ${data}`);
        //TODO: add page render to handle this
        next(data);
      },
      error: (xhr, type, err) => {
        //TODO: update error handler;
        alert(`Error: ${err}`);
      }

    });
  };

  manageController.editUser = function(obj, next) { 
    //obj passed in should be an object with activities or domains in this format {activites: {act1: 5, act2: 10}, domains: {dom1: 5, dom2: 10}}

    $.ajax({
      url: '/api/users/',
      type: 'PUT',
      headers: {Authorization: tttoken},
      data: obj,
      success: data => {
        //TODO: update this
        if (data) alert(`User ${data.username}'s targets successfully updated`);
        console.log(`PUT User: ${data}`);
        next();
        //TODO: add page render function to replace old tb with updated tb (which will get passed in as next)
      }, 
      error: (xhr, type, err)=> {
        //TODO: write better handler;
        alert(`Error: ${err}`);
      }
    });
  };

  manageController.getAllTimeBlocks = next => {
    $.ajax({
      url: '/api/timeblocks/users', //TODO: check to make sure this is correct after Caitlyn moves it to timeblocks out of users.
      type: 'GET', 
      headers: {Authorization: tttoken}, 
      success: data => {
        alert('Success! Got the timeblocks, check console:');
        console.log(`GET ALL TB: ${data}`);

        //TODO: write a thing to do with the data
        next(data);
      }, 
      error: (xhr, type, err) => alert(`Error: ${err}`)
    });
  };

  manageController.getOneTimeBlock = (id, next) => {
    $.ajax({
      url: `/api/timeblocks/${id}`, 
      type: 'GET', 
      headers: {Authorization: tttoken},
      success: data => {
        //TODO: write better handler
        alert('Got data, check console');
        console.log(`GET ONE TIMEBLOCK: ${data}`);
        next(data);
      }, 
      error: (xhr, type, err) => {
        alert(`Error: ${err}`);
      }
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

  manageController.addTimeBlock = (id, obj, next) => {
    $.ajax({
      url: `/api/timeblocks/${id}`, 
      type: 'POST', 
      headers: {Authorization: tttoken},
      data: obj,
      success: data => {
        alert('Successfully added timeblock, check console');
        console.log(`POST NEW TIMEBLOCK: ${data}`);
        next(data);
      },
      error: (xhr, type, err) => {
        console.log(`Error: ${err}`);
      }
    });
  };

  module.manageController = manageController;

})(window);