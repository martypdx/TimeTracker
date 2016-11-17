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
        label: 'Actual Hours',
        data: results.hrs,
        backgroundColor: '#382765'
      }, {
        label: 'Target Hours',
        data: [ 8, 2, 3, 3, 5, 4, 2, 10 ],
        backgroundColor: '#7BC225'
      }]
    }
  });
});

