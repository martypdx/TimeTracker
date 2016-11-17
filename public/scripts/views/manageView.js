(function(module) {
  manageView = {};


// $('#signin-submit').on('click', function (){

//       var username = $('#signin-form input[name=username]').val();
//       var password = $('#signin-form input[name=password]').val();
//       // this is where the username and password is being sent to /api/auth/signin

//       signinController.postInfo(username, password);
//       // signinController.reveal();
//     })




  manageView.handleSubmitInput = function () {
    $('#activity-submit').on('click', function (){
      var activity = $('#activities-form select[name=activity]').val();
      var target = $('#activities-form input[name=target]').val(); 

      var obj = {};
      obj[activity] = target;
      var activities = {activities: obj};


     manageController.editUser(activities);
      // manageController.reveal();
    });

    $('#new-activity-submit').on('click', function () {
      var newactivity = $('activities-form input[name=new-activity]').val();
      var target = $('new-activities-form input[name=target]').val();
    })



    $('#domain-submit').on('click', function (){
      // this is where the ajax call is made to post user domain input to /api/users/domains
      // manageController.reveal();
     });
  };

  manageView.handleSubmitInput();

  module.manageView = manageView;


})(window);