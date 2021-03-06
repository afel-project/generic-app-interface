<?php  
ini_set('default_socket_timeout', 900);
set_time_limit (900);
include("custom/custom.php");
session_start(); 
if(!isset($_SESSION['afeluserid']))
       {
           header("Location:login.php");
           exit;
       }
?>
<!DOCTYPE HTML>
<html>
	<head>
<link rel="shortcut icon" href="custom/logo.ico"/>
    <title><?php echo $app_custom_conf["title"]; ?></title>
		<meta charset="utf-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1" />
		<!--[if lte IE 8]><script src="assets/js/ie/html5shiv.js"></script><![endif]-->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
    <link rel="stylesheet" href="assets/css/afel.css" />
    <link rel="stylesheet" href="custom/custom.css" />
		<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <!-- Scripts -->
			<script src="assets/js/jquery.min.js"></script>
			<script src="assets/js/jquery.scrollzer.min.js"></script>
			<script src="assets/js/jquery.scrolly.min.js"></script>
			<script src="assets/js/skel.min.js"></script>
			<script src="assets/js/util.js"></script>
			<!--[if lte IE 8]><script src="assets/js/ie/respond.min.js"></script><![endif]-->
    <script src="https://code.highcharts.com/highcharts.js"></script>
    <script src="https://code.highcharts.com/highcharts-more.js"></script>
    <script src="https://code.highcharts.com/modules/wordcloud.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
		<script type="text/javascript" src="https://cdn.jsdelivr.net/jquery.jssocials/1.4.0/jssocials.min.js"></script>

<link type="text/css" rel="stylesheet" href="https://cdn.jsdelivr.net/jquery.jssocials/1.4.0/jssocials.css" />


<link type="text/css" rel="stylesheet" href="https://cdn.jsdelivr.net/jquery.jssocials/1.4.0/jssocials-theme-classic.css" />

    <script src="assets/js/afel.js"></script>
    <script src="custom/custom.js"></script>
    <style>
    .toolbutton{
  color: #fff;
  border: 1px #fff solid;
  border-radius: 5px;
  padding: 5px 5px 5px 5px;
  margin-right: 10px;
  float: right;
    }
    .toolbuttonright{
  color: #fff;
  border: 1px #fff solid;
  border-radius: 5px;
  padding: 5px 5px 5px 5px;
  margin-left: 10px;
  float: left;
  display: none;
    }
   #goalaction{
  color: #fff;
  border: 1px #fff solid;
  border-radius: 5px;
  padding: 5px 5px 5px 5px;
  margin-left: 10px;
  float: left;
    }

    </style>
</head>
	<body>
    <script> var recos; </script>
<?php
			// If session is not set and token has no value then redirect to Login Page

      // getting recommendations
      // should be done on a scope by scope basis later...
      // TODO: make robust to down times...
      /*    $process = curl_init('http://afel-rec.know-center.tugraz.at:80/recommendCF?user=cd330929-4725-441b-8091-5e4581722bd5&maxRecommendations=10');
curl_setopt($process, CURLOPT_USERPWD, 'reco1::eN9@L+Bl4l~29#?5');
curl_setopt($process, CURLOPT_TIMEOUT, 60);
curl_setopt($process, CURLOPT_RETURNTRANSFER, TRUE);
$return = curl_exec($process);
curl_close($process);
      */
/*
echo "<script>";
echo "var recos = ".$return.';';
echo "</script>"; */
?>

<div id='header'>
    <img id='logo' src="custom/top_banner.png" alt="" />
    <a href="../download/" class="toolbutton">download</a>
    <a href="../dashboard/" class="toolbutton">dashboard</a>
    <a id="mergebutton" class="toolbuttonright">merge</a>
    <a id="deleteaction" class="toolbuttonright">delete</a> 
    <div id="goalaction">Goals</div>
</div>

<!-- common -->

<div id='main'>
<?php if ($app_custom_conf["show_time_control"]===true) { ?>
<div id='timecontrol'>
         <span class='tbutton tselected' id='lmbut'>last month</span>
         <span class='tbutton' id='lwbut'>last week</span>
         <span class='tbutton' id='ldbut'>last day</span>
         </div>
<?php } ?>

<div id="front-page">
    <div class='displaycontrol'>
      <span class='dbutton dselected' id='mixbut'>mixed</span>
      <span class='dbutton' id='intbut'>intensity</span>
      <span class='dbutton' id='covbut'>coverage</span>
      <span class='dbutton' id='divbut'>diversity</span>
      <span class='dbutton' id='combut'>complexity</span>
    </div>
    <div id="scopecloud"> </div>
</div> <!-- front page -->

<div id="chart-page">
    <div id="polarchart"> </div>
    <div id="cloudforscope"> </div>
    <div id="timearea">
<!--    <div id="timechart"> </div> -->
    <div id="besttimespanel"> </div>
    </div>
    <div id="recarea">
    <h3>Recommendations</h3>
      <div id="recresults">
       Loading...
      </div>
    </div>       
    <div id="actarea">
    </div>
    <div id="footer">
      <a href="http://afel-project.eu">Developed by the AFEL project</a>
    </div>
<!--    <div id="backbut" class="tbutton">Back</div> -->
<?php if ($app_custom_conf["show_actions"]===true){ ?>
    <div id="plusbut" class="roundbut">+</div>
    <div id="actions">
		<div class="dbutton">	<button class="fa fa-share-alt" id="share" onclick="share()"></button></div>
    <!--<div class="dbutton" id="shareaction">Share</div>-->
    <div class="dbutton" id="goalaction">Set goal</div>
		<div class="dbutton" id="toggle_event_editing">
	<button type="button" class="btn btn-info locked_active">OFF</button>
	<button type="button" class="btn btn-default unlocked_inactive">ON</button>
</div>
<?php } ?>
                                                         
<!-- <div class="alert alert-info" id="switch_status">Notification Switched off.</div>
    </div> -->
</div> <!-- chart page -->


<div id="goalpage">
          <div id="newgoalsection">
<h3>New Goal for learning scope <span id="goalscopetitle"></span></h3>
<div id="newgoalcontrol">
    <div class="dbutton dselected" id="workmore">work more</div>
    <div class="dbutton" id="inccoverage">increase coverage</div>
    <div class="dbutton" id="inccomplexity">increase complexity</div>
    <div class="dbutton" id="incdiversity">increase diversity</div>
</div>
    <div id="gtip">
    The AFEL app monitors your online learning activity. It can remind you to focus on the topic you have choosen and to simply read more, watch more and do more on that topic.
    </div>
<!--    <h4>Timing:</h4>
    <div id="ngtiming">
      <div class="tbutton" id="ngmonthly">monthly</div>
      <div class="tbutton tselected" id="ngweekly">weekly</div>
      <div class="tbutton " id="ngdaily">daily</div>
    </div> -->          
    <div class="gobutton" id="nggobut">go</div>
          </div> <!-- newgoalsection -->
    <div class="closebutton" id="ngclosebut">close</div>          
          <h3>Your learning goals</h3>
          <div id="existinggoalssection">
          <p>Loading your learning goals...</p>
          </div> <!-- existing goal section -->
 </div> <!-- goal-page -->

<div id="viewgoalpage">
    <div id="viewgoalheader">
       <h3 id="viewgoaltitle">Goals for scope <span id="viewgoalscope"></span></h3>
       <div class="dbutton dslected" id="closeviewgoalbut">close</div>
    </div>
    <div id="goallist"></div>
</div>

</div> <!-- main -->

<div id="mergedialog">
    <h3>Merging scope <span id="mergescname">XXX</span></h3>
    <input type="text" id="mergesearch" placeholder="keyword" />
    <div id="mergecloud">
       Find a learning scope to merge with....
    </div>
    <div class="dbutton " id="mergecancel">cancel</div>
</div>

<div id="movedialog">
    <h3>Move activity to...</h3>
    <input type="text" id="movesearch" placeholder="keyword" />
    <div id="movecloud">
       Find a learning scope to move to....
    </div>
    <div class="dbutton " id="movecancel">cancel</div>
</div>
        
 <script src="assets/js/d3.js"></script>
    <script src="assets/js/d3.layout.cloud.js"></script>
    <script>
		var sharJson=null;
		var currentlyshowing = null;
		var shareData=null;
		var shareURL=null;
		var stringLength = 15;
        window.location.hash = ""

     <?php
// CONFIG: change here
$apibase = "http://localhost:8004/";
// CONFIG
$data = file_get_contents($apibase."?user=".$_SESSION['afeluserid'], false);
// $data = '{username: "'.$_SESSION["afeluserid"].'"}';
echo 'var data = '.$data.";\n";


?>;

function click(e)
{
    afelLog("view scope", e.name, "clicked on scope "+e.name);
    currentlyshowing = e.name;
    window.location.hash = e.name;
    showChartPage();

	//////For Sharing--> grabbing objects that match some currentlyshowing scope in data////////
 //shareJson=getObjects(data,'scope',currentlyshowing);
}
function getObjects(obj, key, val) {
    var objects = [];
    for (var i in obj) {
        if (!obj.hasOwnProperty(i)) continue;
        if (typeof obj[i] == 'object') {
            objects = objects.concat(getObjects(obj[i], key, val));
        } else
        //if key matches and value matches or if key matches and value is not passed (eliminating the case where key matches but passed value does not)
        if (i == key && obj[i] == val || i == key && val == '') { //
            objects.push(obj);
        } else if (obj[i] == val && key == ''){
            //only add if the object is not already in the array
            if (objects.lastIndexOf(obj) == -1){
                objects.push(obj);
            }
        }
    }
    return objects;
}

</script>

	</body>
</html>

