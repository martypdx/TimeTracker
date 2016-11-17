// From signin landing page, option to stay signed in makes dashboard = landing
(function(module) {

  const dashboardView = {};
  const $selectActivity = $('#activity-tag');
  const $selectDomain = $('#domain-tag');

  dashboardView.populateFilters = function() {
  $.ajax({
    url: '/api/users/activities'
    dataType: 
    success:function(data){
      $selectActivity.html('');


    }
    $.ajax({
      url: '/api/users/domains'
      //dataType:
      success:function(data)('')
    })

  })
}
dashboardView.handleSumbitTimeblock = function() {
  $.ajax({
    url: '/api/users/timeblocks'
  })
})