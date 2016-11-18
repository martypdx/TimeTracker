(function(module) {

  const dashboardController = {};
  dashboardController.categoryData = [];
  dashboardController.actualHrsData = [];
  dashboardController.targetHrsData = [];

  dashboardController.fetchWeeklySummaryData = function() {

    var tttoken = manageToken.getToken();
  
    console.log('tttoken ', tttoken);

    superagent
      .get('http://localhost:3000/api/wkly_totals?by=activity')
      .set('Authorization', tttoken)
      .then((results) => {
        dashboardController.categoryData = results.body.activity;
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

    let wkly_summary_chart = new Chart(ctx, { // eslint-disable-line no-unused-vars, no-undef
      type: 'bar',
      data: {
        // labels: dashboardController.categoryData,
        labels: [ 0, 1, 2, 3 ],
        datasets: [{
          label: 'Actual Hours',
          // data: dashboardController.actualHrsData,
          data: [ 5, 6, 7, 8 ],
          backgroundColor: '#382765'
        }, {
          label: 'Target Hours',
          // data: dashboardController.targetHrsData,
          data: [ 6, 5, 4, 5 ],
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
