// From signin landing page, option to stay signed in makes dashboard = landing
let ctx = document.getElementById('chart_canvas');

$.ajax(

);

let wkly_summary_chart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: [ 'first', 'second', 'third' ],
    datasets: [{
      label: 'stuff',
      data: [ 2, 9, 5 ]
    }]
  }
});