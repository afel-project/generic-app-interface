<?php   session_start();  ?>
<!DOCTYPE html>
<html lang="en">

<head>
<link rel="shortcut icon" href="../images/didactalia_logo.ico"/>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  <meta name="description" content="">
  <meta name="author" content="">
  <title>Didactalia</title>
  <!-- Bootstrap core CSS-->
  <link href="vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet">
  <!-- Custom fonts for this template-->
  <link href="vendor/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css">
  <!-- Page level plugin CSS-->
  <link href="vendor/datatables/dataTables.bootstrap4.css" rel="stylesheet">
  <!-- Custom styles for this template-->
  <link href="css/sb-admin.css" rel="stylesheet">
    <link rel="stylesheet" type="text/css" href="../assets/css/dc.css"/>
    <script src="../assets/js/jquery.min.js"></script>
    <script src="../assets/js/jquery.scrollzer.min.js"></script>
			<script src="../assets/js/jquery.scrolly.min.js"></script>
			<script src="../assets/js/skel.min.js"></script>
    			<script src="../assets/js/util.js"></script>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
    <script type="text/javascript">
    $(document).ready(function(){ 
    $("#myTab a").click(function(e){
    	e.preventDefault();
    	$(this).tab('show');
    });
        $("#myTab2 a").click(function(e){
    	e.preventDefault();
    	$(this).tab('show');
    });
});
</script>
    <style>
.bg-dark{
    background-color: #E4042B !important;
}
#topic-chart{ width: 90vw; margin-left: 5%;}
#view-chart{ width: 90vw; margin-left: 5%;}
#complexity-chart{ width: 90vw; margin-left: 5%;}
.container{width: 100%; padding: 0px;}
body.fixed-nav{padding-top: 0px;}
.navbar{margin-bottom: 0px;}
</style>
</head>

<body class="fixed-nav sticky-footer bg-dark" id="page-top">
<?php
      if(!isset($_SESSION['username'])) // If session is not set then redirect to Login Page
       {
           header("Location:../login.php");  
       }
?>
  <!-- Navigation-->
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top" id="mainNav">
    <a class="navbar-brand"><?php echo $_GET["scope"]; ?></a>
    <button class="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarResponsive">
      <ul class="navbar-nav navbar-sidenav" id="exampleAccordion">
        <li class="nav-item" data-toggle="tooltip" data-placement="right" title="Dashboard">
          <a class="nav-link" href="http://analytics.didactalia.net/mobile/">
            <i class="fa fa-fw fa-dashboard" style="color: white"></i>
            <span class="nav-link-text" style="color: white">Back to learning scopes</span>
          </a>
        </li>         
<!--        <li class="nav-item">
          <a class="nav-link text-center" id="sidenavToggler">
            <i class="fa fa-fw fa-angle-left"></i>
          </a>
        </li>
      </ul>
      <ul class="navbar-nav ml-auto">
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle mr-lg-2" id="messagesDropdown" href="#" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <i class="fa fa-fw fa-envelope"></i>
            <span class="d-lg-none">Messages
            
            </span>
            <span class="indicator text-primary d-none d-lg-block">
              <i class="fa fa-fw fa-circle"></i>
            </span>
          </a>
          <div class="dropdown-menu" aria-labelledby="messagesDropdown">
            <h6 class="dropdown-header">New Messages:</h6>
            <div class="dropdown-divider"></div>
            
            <a class="dropdown-item small" href="#">View all messages</a>
          </div>
        </li>
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle mr-lg-2" id="alertsDropdown" href="#" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <i class="fa fa-fw fa-bell"></i>
            <span class="d-lg-none">Alerts
             
            </span>
            <span class="indicator text-warning d-none d-lg-block">
              <i class="fa fa-fw fa-circle"></i>
            </span>
          </a>
          <div class="dropdown-menu" aria-labelledby="alertsDropdown">
            <h6 class="dropdown-header">New Alerts:</h6>
            <div class="dropdown-divider"></div>
              
            <a class="dropdown-item small" href="#">View all alerts</a>
          </div>
        </li>
        <li class="nav-item">
          <form class="form-inline my-2 my-lg-0 mr-lg-2">
            <div class="input-group">
              <input class="form-control" type="text" placeholder="Search for...">
              <span class="input-group-btn">
                <button class="btn btn-primary" type="button">
                  <i class="fa fa-search"></i>
                </button>
              </span>
            </div>
          </form>
        </li> -->
        <li class="nav-item">
          <a class="nav-link"  href="../logout.php" style="color: white">
            <i class="fa fa-fw fa-sign-out" style="color: white"></i>Logout</a>
        </li>
      </ul>
    </div>
  </nav>
  <div class="content-wrapper">
    <div class="container-fluid">
      <!-- Breadcrumbs-->
      <ol class="breadcrumb">
        <a href="javascript:dc.filterAll(); dc.renderAll();">Reset all filters</a>      
<!--         <div class="reset" style="visibility: hidden;">Time: <span class="filter"></span> -->
      </ol> 


    <div class="container">
		<div class="bs-example">
            <ul class="nav nav-tabs" id="myTab">        
               <li class="active"><a href="#topics">Topics</a></li>
               <li><a href="#scope">Views</a></li>
	           <li><a href="#complexity">Complexity</a></li>
            </ul>
            <div class="tab-content">
              <div id="topics" class="tab-pane fade in active">
                 <div id="topic-chart"></div>
              </div>
             <div id="scope" class="tab-pane fade">
                <div id="view-chart"> </div>
             </div>
	         <div id="complexity" class="tab-pane fade">
                 <div id="complexity-chart"></div>
             </div>
           </div>
        </div>
    </div>


    <div class="container">
		<div class="bs-example">
            <ul class="nav nav-tabs" id="myTab2">        
               <li class="active"><a href="#days"> Day</a></li>
               <li><a href="#hours">Hour</a></li>
	           <li><a href="#cloud">Topic Cloud</a></li>
            </ul>
            <div class="tab-content">
              <div id="days" class="tab-pane fade in active">
                <div id="chart-row-spenders" width="100%" height="30"> 
                 <div class="reset" style="visibility: hidden;">Selected: <span class="filter"></span>
                   <a href="javascript:spenderRowChart.filterAll();dc.redrawAll();">reset</a>
                 </div>
                </div>
              </div>
             <div id="hours" class="tab-pane fade">
               <div id="chart-hist-spend" width="100%" height="30">
                 <div class="reset" style="visibility: hidden;">Range: <span class="filter"></span>
                  <a href="javascript:spendHistChart.filterAll();dc.redrawAll();">reset</a>
                 </div>
               </div>
             </div>
	         <div id="cloud" class="tab-pane fade">      
               <div id="clouds" width="100%" height="30">
                 <div class="reset" style="visibility: hidden;">Selected: <span class="filter"></span>
                   <a href="javascript:wordcloudChart.filterAll();dc.redrawAll();">reset</a>
                 </div>
              </div>
             </div>
           </div>
        </div>
    </div>       
          
          </div>
        </div>
    <!-- /.container-fluid-->
    <!-- /.content-wrapper-->
    <footer class="sticky-footer">
      <div class="container">
        <div class="text-center">
          <small>Didactalia Copyright © 2017</small>
        </div>
      </div>
    </footer>
    <!-- Scroll to Top Button-->
    <a class="scroll-to-top rounded" href="#page-top">
      <i class="fa fa-angle-up"></i>
    </a>
    <!-- Logout Modal-->
    <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Ready to Leave?</h5>
            <button class="close" type="button" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div class="modal-body">Select "Logout" below if you are ready to end your current session.</div>
          <div class="modal-footer">
            <button class="btn btn-secondary" type="button" data-dismiss="modal">Cancel</button>
            <a  href="../logout.php">Logout</a>
          </div>
        </div>
      </div>
    </div>
    <!-- Bootstrap core JavaScript-->
    <script src="vendor/jquery/jquery.min.js"></script>
    <script src="vendor/bootstrap/js/bootstrap.bundle.min.js"></script>
    <!-- Core plugin JavaScript-->
    <script src="vendor/jquery-easing/jquery.easing.min.js"></script>
    <!-- Page level plugin JavaScript-->
    <script src="vendor/chart.js/Chart.min.js"></script>
    <script src="vendor/datatables/jquery.dataTables.js"></script>
    <script src="vendor/datatables/dataTables.bootstrap4.js"></script>
    <!-- Custom scripts for all pages-->
    <script src="js/sb-admin.min.js"></script>
    <!-- Custom scripts for this page-->
    <script src="js/sb-admin-datatables.min.js"></script>
    <script src="js/sb-admin-charts.min.js"></script>
<script type="text/javascript" src="../assets/js/d3.js"></script>
<script type="text/javascript" src="../assets/js/crossfilter.js"></script>
    <script type="text/javascript" src="../assets/js/dc.js"></script>
<script type="text/javascript" src="../assets/js/d3.layout.cloud.js"></script>
<script type="text/javascript" src="../assets/js/dc-worldcloud.js"></script>
<script type="text/javascript" src="../assets/js/colorbrewer.js"></script>
<script type="text/javascript" src="../assets/js/d3-timeseries.js"></script>	
<script type="text/javascript" src="../assets/js/dc-bubblecloud.js"></script>
<script type="text/javascript">
var scope = 
<?php
echo json_encode($_GET["scope"]);
?>;
//console.log(scope);
var csv = 
<?php
echo json_encode($_SESSION['csv']);
?>;
var arr=[];
for(var i = 0; i < csv.length; i++)
{
  if(csv[i].scope == scope)
  {
    arr.push(csv[i]);
  }
}
//console.log(arr);
var parseDate = d3.time.format.utc("%Y-%m-%dT%H:%M:%SZ").parse;

arr.forEach(function(d) {
        d.TxnDate = parseDate(d.date);

    });
 spendHistChart  = dc.barChart("#chart-hist-spend"),
    spenderRowChart = dc.rowChart("#chart-row-spenders"),
wordcloudChart = dc.bubbleCloud('#clouds'),
 nasdaqCount = dc.dataCount('.dc-data-count'),
nasdaqTable = dc.dataTable('.dc-data-table'),
 topicChart = dc.lineChart('#topic-chart');
 viewChart = dc.lineChart('#view-chart');
 complexityChart = dc.lineChart('#complexity-chart');

 var fmt = d3.format('02d');
// set crossfilter
var ndx = crossfilter(arr),
 
    spendDim = ndx.dimension(function(d) {return d.Hour;}),
    nameDim  = ndx.dimension(function(d) {return d["Day of Week"];}),
	wordDim = ndx.dimension(function(d){ return d.title;
        }),
dateDimensions = ndx.dimension(function(d) { return new Date(d.date); }),
runDimension = ndx.dimension(function(d) { return d.date; }),
    spendPerName = nameDim.group().reduceCount(),
    spendHist    = spendDim.group().reduceCount(),
	wordGroup = wordDim.group().reduceCount(),
 complexityTotalsGroup  = dateDimensions.group().reduceSum(function(d) { return d.complexity; }),
     topic_CoverageTotalsGroup = dateDimensions.group().reduceSum(function(d) { return d.topic_coverage; }),
     view_CoverageTotalsGroup = dateDimensions.group().reduceSum(function(d) { return d.view_coverage; }),
runGroup1 = runDimension.group().reduceSum(function(d) { return d.complexity;  }),
runGroup2 = runDimension.group().reduceSum(function(d) { return d.topic_coveragey;  }),
runGroup3 = runDimension.group().reduceSum(function(d) { return  d.view_coverage;  });



 var all = ndx.groupAll();
var dateDimension = ndx.dimension(function (d) {
        return d.Year;
    });


var minDate = dateDimensions.bottom(1)[0].TxnDate;
var maxDate = dateDimensions.top(1)[0].TxnDate;

 
   spendHistChart
.width($('.container').first().width())
       .dimension(spendDim)
    .group(spendHist)
    .x(d3.scale.linear().domain([0,23]))
.colors(d3.scale.category20())
    .elasticY(true)
    .controlsUseVisibility(true);

spenderRowChart
.width($('.container').first().width())
.dimension(nameDim)
    .group(spendPerName)
.colors(d3.scale.category10())
    .elasticX(true)
    .controlsUseVisibility(true);

  wordcloudChart.options({
//height: 700,
   width:$('.container').first().width(),
        //   minY: -100,
        //   minX: -350,
 relativeSize: 10,
 elasticRadius: true,

//rotate:function(d) { return 0; },
            dimension: wordDim,
            group: wordGroup
});


 wordcloudChart    
.colors(d3.scale.category10())
.x(d3.scale.ordinal())
    .r(d3.scale.linear())
    .radiusValueAccessor(function(d) {
        return d.value;
    })
    . valueAccessor(function(d) {
        return d.value;
    })
    .colorAccessor(function(d) {
        return d.value;
    })
    .label(function(d) {
        return d.key;
    })
    .renderLabel(true)
    .title(function(d) {
        return d.key + ': ' + d.value;
    })
    .renderTitle(true);

//wordcloudChart.render();
 var rangeChart = dc.barChart('#range_chart')
     //   .width(900)
     //   .height(100)
        .dimension(dateDimensions)
        .group(topic_CoverageTotalsGroup)
        .x(d3.time.scale().domain([minDate,maxDate]))
    
    ;


topicChart
.width($('.container').first().width())
  // .height(400)
      .transitionDuration(500)
     // .brushOn(false)
      .elasticY(true)
      .mouseZoomable(true)
     // .renderLabel(true)
     // .renderHorizontalGridLines(true)
//.rangeChart(overviewChart)
      .x(d3.time.scale().domain([minDate,maxDate]))
      .dimension(dateDimensions)
// .legend(dc.legend().x(45).y(0).itemHeight(8).gap(4))
     .controlsUseVisibility(true)
.valueAccessor(function(d) {
            return d.value;
        })
//     .compose([
//     dc.lineChart(compositeChart).group(complexityTotalsGroup, 'Complexity').colors('red'),
//     dc.lineChart(compositeChart).group(topic_CoverageTotalsGroup, 'Topic Coverage').colors('blue'),
//     dc.lineChart(compositeChart).group(view_CoverageTotalsGroup, 'View Coverage').colors('green')
//      ])
.group(topic_CoverageTotalsGroup).colors('red')
.rangeChart(rangeChart)
        .brushOn(false)
        .render();

viewChart
.width($('.container').first().width())
//    .width(300)
  // .height(400)
      .transitionDuration(500)
     // .brushOn(false)
      .elasticY(true)
      .mouseZoomable(true)
     // .renderLabel(true)
     // .renderHorizontalGridLines(true)
//.rangeChart(overviewChart)
      .x(d3.time.scale().domain([minDate,maxDate]))
      .dimension(dateDimensions)
// .legend(dc.legend().x(45).y(0).itemHeight(8).gap(4))
     .controlsUseVisibility(true)
.valueAccessor(function(d) {
            return d.value;
        })
//     .compose([
//     dc.lineChart(compositeChart).group(complexityTotalsGroup, 'Complexity').colors('red'),
//     dc.lineChart(compositeChart).group(topic_CoverageTotalsGroup, 'Topic Coverage').colors('blue'),
//     dc.lineChart(compositeChart).group(view_CoverageTotalsGroup, 'View Coverage').colors('green')
//      ])
.group(view_CoverageTotalsGroup).colors('green')
.rangeChart(rangeChart)
        .brushOn(false)
        .render();

complexityChart
    .width($('.container').first().width())
  // .height(400)
      .transitionDuration(500)
     // .brushOn(false)
      .elasticY(true)
      .mouseZoomable(true)
     // .renderLabel(true)
     // .renderHorizontalGridLines(true)
//.rangeChart(overviewChart)
      .x(d3.time.scale().domain([minDate,maxDate]))
      .dimension(dateDimensions)
// .legend(dc.legend().x(45).y(0).itemHeight(8).gap(4))
     .controlsUseVisibility(true)
.valueAccessor(function(d) {
            return d.value;
        })
//     .compose([
//     dc.lineChart(compositeChart).group(complexityTotalsGroup, 'Complexity').colors('red'),
//     dc.lineChart(compositeChart).group(topic_CoverageTotalsGroup, 'Topic Coverage').colors('blue'),
//     dc.lineChart(compositeChart).group(view_CoverageTotalsGroup, 'View Coverage').colors('green')
//      ])
.group(complexityTotalsGroup).colors('blue')
.rangeChart(rangeChart)
        .brushOn(false)
        .render();

    rangeChart.render();

 

/*overviewChart
    .width(880)
    .height(150)

    .x(d3.time.scale().domain([new Date("2017-09-06T08:43:29Z"), new Date("2017-10-09T09:36:21Z")]))
//.round(d3.time.month.round)
    .brushOn(true)
    .margins({top: 0, right: 50, bottom: 20, left: 40})
    //.clipPadding(10)
    .dimension(runDimension)
.compose([
     dc.barChart(overviewChart).group(runGroup1, 'c').colors('red'),
        dc.barChart(overviewChart).group(runGroup2, 'total').colors('blue'),
     dc.barChart(overviewChart).group(runGroup3, 'tiph').colors('green')
      ])
.yAxis().ticks(0);

*/
    nasdaqCount /* dc.dataCount('.dc-data-count', 'chartGroup'); */
        .dimension(ndx)
        .group(all)
        // (_optional_) `.html` sets different html when some records or all records are selected.
        // `.html` replaces everything in the anchor with the html given using the following function.
        // `%filter-count` and `%total-count` are replaced with the values obtained.
        .html({
            some: '<strong>%filter-count</strong> selected out of <strong>%total-count</strong> records' +
                ' | <a href=\'javascript:dc.filterAll(); dc.renderAll();\'>Reset All</a>',
            all: 'All records selected. Please click on the graph to apply filters.'
        });

    //#### Data Table

    // Create a data table widget and use the given css selector as anchor. You can also specify
    // an optional chart group for this chart to be scoped within. When a chart belongs
    // to a specific group then any interaction with such chart will only trigger redraw
    // on other charts within the same chart group.
    // <br>API: [Data Table Widget](https://github.com/dc-js/dc.js/blob/master/web/docs/api-latest.md#data-table-widget)
    //
    // You can statically define the headers like in
    //
    // ```html
    //    <!-- anchor div for data table -->
    //    <div id='data-table'>
    //       <!-- create a custom header -->
    //       <div class='header'>
    //           <span>Date</span>
    //           <span>Open</span>
    //           <span>Close</span>
    //           <span>Change</span>
    //           <span>Volume</span>
    //       </div>
    //       <!-- data rows will filled in here -->
    //    </div>
    // ```
    // or do it programmatically using `.columns()`.

    nasdaqTable /* dc.dataTable('.dc-data-table', 'chartGroup') */
        .dimension(dateDimension)
        // Data table does not use crossfilter group but rather a closure
        // as a grouping function
        .group(function (d) {
            var format = d3.format('02d');
            return d.Year + '/' + format((d.Month ));
        })
        // (_optional_) max number of records to be shown, `default = 25`
        .size(Infinity)
        // There are several ways to specify the columns; see the data-table documentation.
        // This code demonstrates generating the column header automatically based on the columns.
        .columns([
            // Use the `d.date` field; capitalized automatically
            'date',
'Day of Week',
'Hour',
             'topic_coverage',
	'view_coverage',
            'complexity',
            'scope',
	'title'
            
        ])

        // (_optional_) sort using the given field, `default = function(d){return d;}`
        .sortBy(function (d) {
            return d.Year;
        })
        // (_optional_) sort order, `default = d3.ascending`
        .order(d3.ascending)
        // (_optional_) custom renderlet to post-process chart using [D3](http://d3js.org)
        .on('renderlet', function (table) {
            table.selectAll('.dc-table-group').classed('info', true);
        });

  function show_empty_message(chart) {
      var is_empty = d3.sum(chart.group().all().map(chart.valueAccessor())) === 0;
      var data = is_empty ? [1] : [];
      var empty = chart.svg().selectAll('.empty-message').data(data);
      empty.enter().append('text')
          .text('NO DATA!')
          .attr({
              'text-anchor': 'middle',
              'alignment-baseline': 'middle',
              class: 'empty-message',
              x: chart.margins().left + chart.effectiveWidth()/2,
              y: chart.margins().top + chart.effectiveHeight()/2
          })
          .style('opacity', 0);
      empty.transition().duration(1000).style('opacity', 1);
      empty.exit().remove();
  }

  spendHistChart.on('pretransition', show_empty_message);
  spenderRowChart.on('pretransition', show_empty_message);
//overviewChart.on('pretransition', show_empty_message);
wordcloudChart.on('pretransition', function(chart) {
    chart.selectAll('text').on('click', function(d) {
        wordDim.filter(d.text);
        dc.redrawAll();
    });
});


dc.renderAll();

</script>
  </div>
</body>

</html>
