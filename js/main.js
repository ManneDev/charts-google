let arrayDatos =[
  ['País', 'Población'],
];

/*axios.get('https://www.inegi.org.mx/app/api/indicadores/desarrolladores/jsonxml/INDICATOR/289242/es/0700/false/BIE/2.0/3355ac86-7791-fd29-0c87-2a2d09e0696e?type=json')*/
axios.get('https://app.diegotorrero.tech/charts-app/countryPopulation.php')
  .then(function (response) {
    // handle success
    //console.log(response.data);
    
    response.data.forEach((elemento, indice)=>{
      arrayDatos.push([elemento['Name'], parseInt(elemento['Population'])]);
    });
    console.log(arrayDatos);
    console.log('Mensaje');
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  /*.finally(function () {
    // always executed
  })*/;

  google.charts.load('current', {packages: ['corechart', 'bar']});
  google.charts.setOnLoadCallback(drawMultSeries);

  

  function drawMultSeries() {
        var data = google.visualization.arrayToDataTable(arrayDatos);
  
        var options = {
          title: 'Population of Largest U.S. Cities',
          chartArea: {width: '50%', height: '100%'},
          hAxis: {
            title: 'Total Population',
            minValue: 0
          },
          vAxis: {
            title: 'City'
          }
        };
  
        var chart = new google.visualization.BarChart(document.getElementById('chart_div'));
        chart.draw(data, options);
      }