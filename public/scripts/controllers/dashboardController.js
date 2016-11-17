(function(module) {

  const dashboardController = {};
  dashboardController.categoryData = [];
  dashboardController.actualHrsData = [];
  dashboardController.targetHrsData = [];

  dashboardController.fetchWeeklySummaryData = function() {
    
 
    jQuery.ajax( // eslint-disable-line no-unused-vars, no-undef
      'http://localhost:3000/api/wkly_totals?by=activity'
    )
    .done((results) => {
      dashboardController.categoryData = results[0];
      dashboardController.actualHrsData = results[1];
      dashboardController.targetHrsData = results[2];
    });

  };
    
  dashboardController.drawGraph = function(ctx) {

    let wkly_summary_chart = new Chart(ctx, { // eslint-disable-line no-unused-vars, no-undef
      type: 'bar',
      data: {
        labels: dashboardController.categoryData,
        datasets: [{
          label: 'Actual Hours',
          data: dashboardController.actualHrsData,
          backgroundColor: '#382765'
        }, {
          label: 'Target Hours',
          data: dashboardController.targetHrsData,
          backgroundColor: '#7BC225'
        }]
      }
    });

  };

  dashboardController.reveal = function() {
    $('.tab-content').hide();
    dashboardController.fetchWeeklySummaryData();

    let ctx = document.getElementById('chart_canvas');
    dashboardController.drawGraph(ctx);
 
    $('#dashboard-page').fadeIn('slow');
    
  };

  module.dashboardController = dashboardController;

})(window);
