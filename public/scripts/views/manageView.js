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
  };

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

  manageView.handleDomain = function () {
    $('#domain-submit').on('click', function (){

      console.log('obj', obj);
      var domain = $('#domains-form select[name=domain]').val();
      var target = $('#domains-form input[name=target]').val(); 

      var obj = {};
      obj[domain] = target;
      var domains = {domains: obj};


      manageController.editUser(domains);
      // manageController.reveal();
    });
  };

    manageView.handleNewDomain = function() {
 
    $('#new-domain-submit').on('click', function () {

      console.log('obj', obj);
      var newdomain = $('#new-domains-form input[name=new-domain]').val();
      var target = $('#new-domains-form input[name=target]').val();

      var obj = {};
      obj[newdomain] = target;
      var domains = {domains: obj};

      manageController.editUser(domains);
    });
  };



    // $('#domain-submit').on('click', function (){
    //   // this is where the ajax call is made to post user domain input to /api/users/domains
    //   // manageController.reveal();
    //  });


  // }



  manageView.handleActivity();
  manageView.handleNewActivity();
  manageView.handleDomain();
  manageView.handleNewDomain();

  module.manageView = manageView;


})(window);