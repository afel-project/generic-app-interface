var data = [{
  "name": "FEMALE",
  "weight": 100,
  "color": "#c87969",
  "value": 84
}, {
  "name": "UNDERWENT",
  "weight": 319,
  "color": "#49f7bc",
  "value": 84
}, {
  "name": "SURGEON",
  "weight": 320,
  "color": "#beb3d7",
  "value": 85
}, {
  "name": "CODE",
  "weight": 321,
  "color": "#79cf77",
  "value": 85
}, {
  "name": "CHAIR",
  "weight": 322,
  "color": "#1e5644",
  "value": 86
}, {
  "name": "TRANSPORT",
  "weight": 323,
  "color": "#b07241",
  "value": 86
}, {
  "name": "PLAINTIFF",
  "weight": 324,
  "color": "#d4bc9f",
  "value": 87
}, {
  "name": "CASE",
  "weight": 325,
  "color": "#019421",
  "value": 87
}, {
  "name": "NEED",
  "weight": 326,
  "color": "#f02c13",
  "value": 88
}, {
  "name": "BP",
  "weight": 327,
  "color": "#7f165c",
  "value": 88
}, {
  "name": "SEEN",
  "weight": 328,
  "color": "#434d8e",
  "value": 88
}, {
  "name": "SECURITY",
  "weight": 329,
  "color": "#50fab6",
  "value": 90
}, {
  "name": "SUPERVISOR",
  "weight": 330,
  "color": "#381b50",
  "value": 90
}, {
  "name": "CONTRAST",
  "weight": 331,
  "color": "#e402e9",
  "value": 90
}]

//$.get(data, function(csv) {
    $('#scope').highcharts({
    series: [{
        type: 'wordcloud',
        data: data
    }],
    title: {
        text: 'Wordcloud of Lorem Ipsum'
    }
});
//});
