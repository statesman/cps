Highcharts = (function(Highcharts) {

  Highcharts.setOptions({
    chart: {
      style: {
        fontFamily: '"Merriweather Sans", sans-serif'
      }
    },
    colors: ['#395271', '#ca3a29', '#74BA0D'],
    tooltip: {
      backgroundColor: '#fff',
      borderColor: '#f7f7f7',
      borderRadius: 0
    },
    yAxis: {
      title: {
        text: null
      }
    },
    credits: {
      enabled: false
    }
  });

  return Highcharts;

}(Highcharts));
