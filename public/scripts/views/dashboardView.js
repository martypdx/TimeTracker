// From signin landing page, option to stay signed in makes dashboard = landing
(function(module) {

  const dashboardView = {};
  const $selectActivity = $('#activity-filter');
  const $selectDomain = $('#domain-filter');

  dashboardView.populateFilters = function() {
  $.ajax({
    url: '/api/users/activities'
    //dataType:
    success:function(data){
      $selectActivity.html('');


    }
    $.ajax({
      url: '/api/users/domains'
      /
    })

  })
})