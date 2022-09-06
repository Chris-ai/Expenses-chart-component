   let labels = [];
   let data = [];

   //    function to find max value
   function argMax(array) {
       return array.map((x, i) => [x, i]).reduce((r, a) => (a[0] > r[0] ? a : r))[1];
   }

   //    fetch data
   fetch("./data.json")
       .then(response => response.json())
       .then(json => {
           json.forEach(element => {
               labels.push(element.day)
               data.push(element.amount)
           });
       }).then(() => {
           let color = data.map(x => 'hsl(10, 79%, 65%)');
           color[argMax(data)] = 'hsl(186, 34%, 60%)';

           const chartData = {
               labels: labels,
               datasets: [{
                   backgroundColor: color,
                   borderRadius: 8,
                   borderSkipped: false,
                   data: data,

               }]
           };

           const config = {
               type: 'bar',
               data: chartData,
               options: {
                   onHover: (event, chartElement) => {
                       if (chartElement.length === 1) {
                           event.native.target.style.cursor = 'pointer'
                       }
                   },
                   plugins: {
                       legend: {
                           display: false,
                       },
                       tooltip: {
                           backgroundColor: "hsl(25, 47%, 15%)",
                           bodyColor: 'hsl(33, 100%, 98%)',
                           bodyFont: {
                               size: 14,
                           },
                           displayColors: false,
                           caretSize: 0,
                           caretPadding: 6,
                           yAlign: 'bottom',
                           callbacks: {
                               title: function () {},
                               label: function (context) {
                                   return '$' + context.raw;
                               },
                               labelTextColor: function (context) {
                                   return 'hsl(27, 66%, 92%)';
                               }
                           }
                       }
                   },
                   scales: {
                       x: {
                           grid: {
                               drawBorder: false,
                               display: false
                           },
                           ticks: {
                               color: 'hsl(28, 10%, 53%)',
                               font: {
                                   family: 'DM Sans'
                               }
                           }
                       },
                       y: {
                           display: false,
                       }
                   }
               }
           };

           new Chart(
               document.getElementById('myChart'),
               config
           );
       });