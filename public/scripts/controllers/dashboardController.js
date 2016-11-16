(function(module) {

  const dashboardcontroller = {};

  dashboardController.index = function() {
    $('.signin').hide();
    $('.signup').hide();
    
  };

  module.dashboardController = dashboardController;

})(window);
