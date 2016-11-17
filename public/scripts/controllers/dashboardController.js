(function(module) {

  const dashboardController = {};

  dashboardController.reveal = function() {
    $('.tab-content').hide();
    // Because the landing page if signed in
    $('#dashboard-page').fadeIn('slow');
    
  };

  module.dashboardController = dashboardController;

})(window);
