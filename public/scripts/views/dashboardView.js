// From signin landing page, option to stay signed in makes dashboard = landing
let ctx = document.getElementById('chart_canvas');

jQuery.ajax( // eslint-disable-line no-unused-vars, no-undef
  'http://localhost:3000/api/wkly_totals'
)
.done((results) => {
  let wkly_summary_chart = new Chart(ctx, { // eslint-disable-line no-unused-vars, no-undef
    type: 'bar',
    data: {
      labels: results.activity,
      datasets: [{
        label: 'Hours',
        data: results.hrs
      }]
    }
  });
});

