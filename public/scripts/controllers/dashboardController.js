(function(module) {

  const dashboardController = {};
  dashboardController.categoryData = [];
  dashboardController.actualHrsData = [];
  dashboardController.targetHrsData = [];

  dashboardController.fetchWeeklySummaryData = function() {
  
    superagent
      .get('/api/wkly_totals?by=activity')
      .set('Authorization', manageToken.getToken())
      .then((results) => {
        dashboardController.categoryData = results.body.category;
        dashboardController.actualHrsData = results.body.hrs;
        dashboardController.targetHrsData = results.body.target;
        let ctx = document.getElementById('bar_chart_canvas');
        dashboardController.drawGraph(ctx);
      })
      .catch((err) => {
        console.log('err ', err);
      });

  };
    
  dashboardController.drawGraph = function(ctx) {

    // Add as global to .eslintrc
    new Chart(ctx, { // eslint-disable-line no-undef
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

  dashboardController.renderDashboard = function() {
    dashboardController.reveal();
    dashboardController.fetchWeeklySummaryData();
  };

  dashboardController.reveal = function() {
    
    $('.tab-content').hide();
    // dashboardController.fetchWeeklySummaryData();

    // let ctx = document.getElementById('chart_canvas');
    // dashboardController.drawGraph(ctx);
 
    $('#dashboard-page').fadeIn('slow');
    // $('#bar_chart_canvas').fadeIn('slow');
    
  };

  module.dashboardController = dashboardController;

})(window);
