<?php   session_start();
include("custom/custom.php");
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
				.jssocials-share-link { border-radius: 50%; }
				</style>
</head>
	<body>
    <script> var recos; </script>
<?php
			// If session is not set and token has no value then redirect to Login Page
      if(!isset($_SESSION['username']) && !isset($_GET['token']) )
       {
           // TODO custom login page
           header("Location:login.php");
       }

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
    <div id="timearea">
    <div id="timechart"> </div>
    <div id="besttimespanel"> </div>
    </div>
    <div id="recarea">
        <div id="recresults">
        </div>
    </div>
    <div id="actarea">
    </div>
    <div id="footer">
      <a href="http://afel-project.eu">Developed by the AFEL project</a>
    </div>
    <div id="backbut" class="tbutton">Back</div>
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
    </div>
</div> --> <!-- chart page -->

<div id="goalpage">
<h3>New Goal in learning scope impressionism</h3>
<div id="newgoalcontrol">
    <div class="gbutton dselected" id="workmore">work more</div>
    <div class="gbutton" id="inccoverage">increase coverage</div>
    <div class="gbutton" id="inccomplexity">increase complexity</div>
    <div class="gbutton" id="incdiversity">increase diversity</div>
</div>
    <div id="gtip">
    The Didactalia AFEL app monitors your activity on Didactalia. It can remind you to focus on the topic you have choosen and to simply read more, watch more and do more on that topic.
    </div>
    <h4>Timing:</h4>
    <div id="ngtiming">
      <div class="tbutton" id="ngmonthly">monthly</div>
      <div class="tbutton tselected" id="ngweekly">weekly</div>
      <div class="tbutton " id="ngdaily">daily</div>
    </div>
    <div class="gobutton" id="nggobut">go</div>
    </div> <!-- goal-page -->


</div> <!-- main -->

 <script src="assets/js/d3.js"></script>
    <script src="assets/js/d3.layout.cloud.js"></script>

    <script>
		var sharJson=null;
		var currentlyshowing = null;
		var shareData=null;
		var shareURL=null;
		var stringLength = 15;

		// list containing characters for the random string
		var stringArray = ['0','1','2','3','4','5','6','7','8','9','a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','!','?'];
		var guest =
		<?php
		if(isset($_GET['token']))
		{
			echo 1;
		}
		else {
			echo 0;
		}
		?>;
		console.log(guest);
		        if(guest === 1) {
		            $("#plusbut").hide();
		        }

		var data =
		 <?php
		 if(isset($_GET['token']))
		 {

	 echo $_SESSION['scopeData'];
		 }
		 else {

/**
* For quick access of data from file.
*/
	/*$rows = array_map('str_getcsv', file('myfile.csv'));
	 $header = array_shift($rows);
	 $csv = array();
	 foreach ($rows as $row) {
	   $csv[] = array_combine($header, $row);
}
  $_SESSION['csv']=$csv;
 //Finally, encode our array into a JSON string format so that we can print it out.
 echo json_encode($csv);
}*/

             // TODO That's what we need to change...
             // The API can only be called from localhost
             // (except the CSV API)
             // need a way to get ID from credentials
             // implement own login page
     $username=$_SESSION['username'];
	 $password=$_SESSION['password'];
	 $context = stream_context_create(array (
			 'http' => array (
					 'header' => 'Authorization: Basic ' . base64_encode("$username:$password")
			 )
	 ));
     // CONFIG: change here
     $apibase = "https://.....";
     // CONFIG
	 $data = file_get_contents($apibase."/?user=1a1e9b204dd8cacb2e2c4b1a38c34793", false, $context);
if (!empty($data))
{
	 $lines = explode("\n", $data);
	 $head = str_getcsv(array_shift($lines));
	 $csv = array();
	 foreach ($lines as $line) {
		 $csv[] = array_combine($head, str_getcsv($line));
	 }
	 $_SESSION['csv']=$csv;
     $fcsv = array();
     foreach($csv as $line){
         if (strcmp($line["scope"], "_scope_of_routine_activities_")!==0){
             $fcsv[] = $line;
         }
     }
	 echo json_encode($fcsv);
 }
}

	 ?>;

function click(e)
{

    currentlyshowing = e.name;
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

	function showAndroidToast(toastmsg) {

        Android.showToast(toastmsg);

    }

 function showAndroidDialog(dialogmsg) {

        Android.showDialog(dialogmsg);

    }

 function moveToScreenTwo() {

        Android.moveToNextScreen();

    }
		function displayNotification() {

	         Android.displayNotification();
	     }
			 $('#toggle_event_editing button').click(function(){
			 	if($(this).hasClass('locked_active') || $(this).hasClass('unlocked_inactive')){
			 		/* code to do when unlocking */
					/* check if user login from Android or Web App*/
					var ua = navigator.userAgent.toLowerCase();
					var isAndroid = ua.indexOf("android") > -1; //&& ua.indexOf("mobile");
					if(isAndroid) {
  // Do something!
  // Redirect to Android-function
	Android.displayNotification();
	$('#switch_status').html('Notification Switched on.');

				 	/* reverse locking status */
				 	$('#toggle_event_editing button').eq(0).toggleClass('locked_inactive locked_active btn-default btn-info');
				 	$('#toggle_event_editing button').eq(1).toggleClass('unlocked_inactive unlocked_active btn-info btn-default');
											}
											else {
												alert("Notifications are only available on Android");
											}

		}
		else{

			/* code to do when locking */
	        $('#switch_status').html('Notification Switched off.');

								 	/* reverse locking status */
								 	$('#toggle_event_editing button').eq(0).toggleClass('locked_inactive locked_active btn-default btn-info');
								 	$('#toggle_event_editing button').eq(1).toggleClass('unlocked_inactive unlocked_active btn-info btn-default');
	Android.stopNotification();
		}

			 });
function share()
{
	var ua = navigator.userAgent.toLowerCase();
	var isAndroid = ua.indexOf("android") > -1; //&& ua.indexOf("mobile");
	if(isAndroid) {

		var rndString = "";

		// build a string with random characters
		for (var i = 1; i < stringLength; i++) {
			var rndNum = Math.ceil(Math.random() * stringArray.length) - 1;
			rndString = rndString + stringArray[rndNum];
		}

		rndString=rndString;
		shareJson=JSON.stringify(getObjects(data,'scope',currentlyshowing));

$.ajax({
									 type: "POST",
									 url: 'shareServer.php',
								data: {
												"scope":currentlyshowing,
								 				"tokenNo": rndString,
												"scopeData": shareJson
											},
									 success: function(data)
									 {
										 console.log(data);
									 }
							 });
////jsSocials not working in Android//////
			/*				 $("#share").jsSocials({
								 url: "Hello, Someone has shared Didactalia contents with you.\nVisit "+" http://url.to.share " +"and submit you token id:  "+rndString+"  to display share contents.\n Remember it is valid till tomorrow." ,
	 text: "Didactalia Share Content",
							     showLabel: false,
							     showCount: false,
							     shares: ["email"]
							 });*/

	Android.shareData(rndString);
}
else {
	alert("Share only available on Android");
}

}
</script>

	</body>
</html>

