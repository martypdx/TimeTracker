(function(module) {
  manageView = {};


// $('#signin-submit').on('click', function (){

//       var username = $('#signin-form input[name=username]').val();
//       var password = $('#signin-form input[name=password]').val();
//       // this is where the username and password is being sent to /api/auth/signin

//       signinController.postInfo(username, password);
//       // signinController.reveal();
//     })




  manageView.handleActivity = function () {
    $('#activity-submit').on('click', function (){

      console.log('obj', obj);
      var activity = $('#activities-form select[name=activity]').val();
      var target = $('#activities-form input[name=target]').val(); 

      var obj = {};
      obj[activity] = target;
      var activities = {activities: obj};


     manageController.editUser(activities);
      // manageController.reveal();
    });
  }

  manageView.handleNewActivity = function() {
//TODO: figure out why this is limiting to two activities in the console. 
    $('#new-activity-submit').on('click', function () {

      console.log('obj', obj);
      var newactivity = $('#new-activities-form input[name=new-activity]').val();
      var target = $('#new-activities-form input[name=target]').val();

      var obj = {};
      obj[newactivity] = target;
      var activities = {activities: obj};

      manageController.editUser(activities);
    });
  };



    // $('#domain-submit').on('click', function (){
    //   // this is where the ajax call is made to post user domain input to /api/users/domains
    //   // manageController.reveal();
    //  });


  // }



  manageView.handleActivity();
  manageView.handleNewActivity();

  module.manageView = manageView;


})(window);