(function(module) {
  manageView = {};

  manageView.handleActivity = function () {
    $('#activity-submit').on('click', function (){

      console.log('obj', obj);
      var activity = $('#activities-form select[name=activity]').val();
      var target = $('#activities-form input[name=target]').val(); 

      var obj = {};
      obj[activity] = parseInt(target, 10);
      var activities = {activities: obj};
      console.log('user activities: ', activities);

      var target = $('#activities-form input[name=target]').val();
      manageController.editUser(activities);
    });
  };

  manageView.handleNewActivity = function() {
    $('#new-activity-submit').on('click', function () {

      var newactivity = $('#new-activities-form input[name=new-activity]').val();
      var target = $('#new-activities-form input[name=target]').val();

      var obj = {};
      obj[newactivity] = parseInt(target, 10);
      var activities = {activities: obj};

      manageController.editUser(activities);

      $('#new-activities-form input[name=new-activity]').val();
      $('#new-activities-form input[name=target]').val();

    });
  };

  manageView.handleDomain = function () {
    $('#domain-submit').on('click', function (){

      var domain = $('#domains-form select[name=domain]').val();
      var target = $('#domains-form input[name=target]').val(); 

      var obj = {};
      obj[domain] = parseInt(target, 10);
      var domains = {domains: obj};


      manageController.editUser(domains);
      
      $('#domains-form input[name=target]').val(); 

    });
  };

  manageView.handleNewDomain = function() {
 
    $('#new-domain-submit').on('click', function () {

      var newdomain = $('#new-domains-form input[name=new-domain]').val();
      var target = $('#new-domains-form input[name=target]').val();

      var obj = {};
      obj[newdomain] = parseInt(target, 10);
      var domains = {domains: obj};

      manageController.editUser(domains);

      $('#new-domains-form input[name=new-domain]').val();
      $('#new-domains-form input[name=target]').val();
    });
  };

  manageView.addTimeBlock = function() {
    $('#timeblock-submit').on('click', function () {

      var timeblock = {};
      timeblock.startTime = $('input[name=startTime]').val();
      timeblock.endTime = $('input[name=endTime]').val();
      timeblock.description = $('input[name=description]').val();
      timeblock.activity =$('#activity-tag').val();
      timeblock.domain =$('#domain-tag').val();

      console.log('timeblock.startTime', timeblock.startTime, typeof timeblock.startTime);

      manageController.addTimeBlock(timeblock);

      $('input[name=startTime]').val();
      $('input[name=endTime]').val();
      $('input[name=description]').val();
    });
  };

  manageView.handleActivity();
  manageView.handleNewActivity();
  manageView.handleDomain();
  manageView.handleNewDomain();
  manageView.addTimeBlock();

  module.manageView = manageView;

})(window);