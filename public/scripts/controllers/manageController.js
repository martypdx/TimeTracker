(function(module) {

  const manageController = {};

  manageController.reveal = function() {
    $('.tab-content').hide();
    $('#manage-page').fadeIn('slow');
    
  };

  module.manageController = manageController;

})(window);