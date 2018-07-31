// TODO:
//   back button...
//   worldcloud of scopes...
//   last 100 activities....
//   button to dashboard and data download...
//   manipulate scopes...
//   add dates aggregated as an array day hour...
var currentdisplay = "mix";

$( document ).ready(function() {
    showMixed();
    $("#nggobut").click(function(){
	showChartPage();
    });
    $("#plusbut").click(function(){
	toggleActions();
    });
    $("#goalaction").click(function(){
	toggleActions();
	showGoalPage();
    });
    $("#backbut").click(function(){
	showFrontPage();
    });
    $("#lmbut").click(function(){
	alert("not yet implemented");	
    });
    $("#lwbut").click(function(){
	alert("not yet implemented");	
    });
    $("#ldbut").click(function(){
	alert("not yet implemented");	
    });
    $("#mixbut").click(function(){
	showMixed();
	switchCurrentDisplay("mix");
    });
    $("#intbut").click(function(){
	var a = getDataArray(data, 'intensity');
	showScopeCloud(a, 'scopecloud', 'Learning scopes by intensity')
	switchCurrentDisplay("int");
	console.log(a)
    });
    $("#covbut").click(function(){
	var a = getDataArray(data, 'coverage');
	showScopeCloud(a, 'scopecloud', 'Learning scopes by topic coverage')
	switchCurrentDisplay("cov");
    });
    $("#divbut").click(function(){
	var a = getDataArray(data, 'diversity');
	showScopeCloud(a, 'scopecloud', 'Learning scopes by diversity')	
	switchCurrentDisplay("div");
    });
    $("#combut").click(function(){
	var a = getDataArray(data, 'complexity');
	showScopeCloud(a, 'scopecloud', 'Learning scopes by complexity')	
	switchCurrentDisplay("com");
    });
    $("#workmore").click(function(){
	$("#workmore").addClass("dselected")
	$("#inccoverage").removeClass("dselected")
	$("#inccomplexity").removeClass("dselected")
	$("#incdiversity").removeClass("dselected")
	$("#gtip").html("The Didactalia AFEL app monitors your activity on Didactalia. It can remind you to focus on the topic you have choosen and to simply read more, watch more and do more on that topic.");
    });
    $("#inccoverage").click(function(){
	$("#workmore").removeClass("dselected")
	$("#inccoverage").addClass("dselected")
	$("#inccomplexity").removeClass("dselected")
	$("#incdiversity").removeClass("dselected")
	$("#gtip").html("To increase coverage, try to focus on activities that explore different areas of the topic you have selected. A given learning scope can be wide and you can explore it more completely by choosing resources that are wide themselves, or by carrying out a number of specialised and varied activities.");	
    });
    $("#inccomplexity").click(function(){
	$("#workmore").removeClass("dselected")
	$("#inccoverage").removeClass("dselected")
	$("#inccomplexity").addClass("dselected")
	$("#incdiversity").removeClass("dselected")
	$("#gtip").html("As you become more familiar with a topic, you can expect to be able to tackle more and more complex activities. They migh seem more difficult, but they also help you go deeper and become more specialised in the topic you have choosen.");
    });
        $("#incdiversity").click(function(){
	$("#workmore").removeClass("dselected")
	$("#inccoverage").removeClass("dselected")
	$("#inccomplexity").removeClass("dselected")
	    $ ("#incdiversity").addClass("dselected")
	     $("#gtip").html("To increase diversity, try to focus on activities from different sources and different authors from the ones you usually consider. You might especially want to consider resources from authors living in a different place, of a different gender, of a different age group or with a different political view from the ones you would usually go for.");
	});
    $("#ngmonthly").click(function(){
	$("#ngmonthly").addClass("tselected")
	$("#ngweekly").removeClass("tselected")
	$("#ngdaily").removeClass("tselected")
    });
    $("#ngweekly").click(function(){
	$("#ngmonthly").removeClass("tselected")
	$("#ngweekly").addClass("tselected")
	$("#ngdaily").removeClass("tselected")
    });
    $("#ngdaily").click(function(){
	$("#ngmonthly").removeClass("tselected")
	$("#ngweekly").removeClass("tselected")
	$("#ngdaily").addClass("tselected")
    });
});

function toggleActions(){
    if ($('#actions').css('display') == "none")
	$('#actions').css('display', 'block');
    else
	$('#actions').css('display', 'none');
}

function switchCurrentDisplay(nd){
    $('#'+currentdisplay+'but').removeClass("dselected");
    currentdisplay = nd;
    $('#'+nd+'but').addClass("dselected");
}

function showMixed(){
    var a1 = getDataArray(data, 'coverage');
    var a2 = getDataArray(data, 'diversity');
    var a3 = getDataArray(data, 'complexity');
    var a4 = getDataArray(data, 'intensity');
    var a = [];
    for (var i in a1){
	a.push({"name": a1[i].name, "weight":
		(a1[i].weight+a1[i].weight+a1[i].weight+a4[i].weight)/4});
    }
    console.log(a);
    showScopeCloud(a,'scopecloud', "Learning scope by mix of indicators");
}

function getScopeCountsArray(data){
    var map = data.reduce(function(map, item) {
	var name = item.scope
	var topic = +1
	map[name] = (map[name] || 0) + topic
	return map
    }, {})
    var tmp = Object.keys(map).map(function(name) {
	return {
	    name: name,
	    score: map[name]
	}
    })
    console.log("count 1");
    console.log(tmp);    
    var max=0;
    for (var i in tmp){
	if (tmp[i].score>max) max = tmp[i].score;	
    }
    var res = [];
    for (var i in tmp){
	res.push({"name": tmp[i].name, "weight": parseFloat(tmp[i].score)/parseFloat(max)})
    }
    console.log("count");
    console.log(res);
    return res;
}

function getDataArray(data, field){
    var res = []
    for(var sc in data.scopes){
	res.push({"name": data.scopes[sc].name, "weight": data.scopes[sc][field]})
    }
    return res
}


function showScopeCloud(a,e,t){
Highcharts.chart(e, {
chart: {
        borderColor: '#ffffff',
        borderWidth: 2,
        type: 'line'
},
  credits: {
        enabled: false
    },
    series: [{
        type: 'wordcloud',
        data: a
    }],
    title: {
      text: t,
            style: {"fontSize": "14px"},
            verticalAlign: 'bottom'
    },
  plotOptions: {
        series: {
            cursor: 'pointer',
            point: {
                events: {
                    click: function () {
click(this);
                        
                    }
                }
            }
        }
    },
});

}

// ------------- chart page  ----------------

function showChartPage(){
    // include change the url so that we can go back...
    if (config.show_rec) showRecommendations();
    showPolar();
    showCloudForScope();
    // showTimes();
    if (config.show_act) showActivities();
    $('#front-page').css('display','none');
    $('#goalpage').css('display','none');
    $('#chart-page').css('display','block');
}

function showTimes(){
    var times = {};
    var maxi = 0;
    for (var i in data){
	if (data[i]["scope"] == currentlyshowing){
	    if (data[i]["Day of Week"] && data[i]["Hour"]){
		var key = sDay(parseInt(data[i]["Day of Week"]))+" "+parseInt(data[i]["Hour"]);
		if (!times[key]) times[key] = {};
		if (!times[key].intensity) times[key].intensity=0;
		times[key].intensity++;
		if (times[key].intensity > maxi)
		    maxi = times[key].intensity;	
		if (data[i]["complexity"]){
		    if (!times[key].complexity) times[key].complexity = 0;
		    times[key].complexity += parseFloat(data[i]["complexity"]);
		}
		if (data[i]["coverage"]){
		    if (!times[key].coverage) times[key].coverage = 0;
		    times[key].coverage += parseFloat(data[i]["coverage"]);
		}
		if (data[i]["diversity"]){
		    if (!times[key].diversity) times[key].diversity = 0;
		    times[key].diversity += parseFloat(data[i]["diversity"]);
		}
		
	    }
	}
    }
    var maxc = 0.;
    var mck = "";
    var maxco = 0.;
    var mcok = "";
    var maxd = 0.;
    var mdk = "";
    for (var time in times){
	// average...
	if (times[time].intensity && times[time].intensity!=0){
	    times[time].complexity = parseFloat(times[time].complexity)/parseFloat(times[time].intensity);
	    times[time].coverage = parseFloat(times[time].coverage)/parseFloat(times[time].intensity);
	    times[time].diversity = parseFloat(times[time].diversity)/parseFloat(times[time].intensity);
	}
	if (times[time].complexity > maxc) {
	    maxc = times[time].complexity;
	    mck = time;
	}
	if (times[time].coverage > maxco) {
	    maxco = times[time].coverage;
	    mcok = time;
	}
	if (times[time].diversity > maxd) {
	    maxd = times[time].diversity;
	    mdk = time;
	}
    }
    var keys = [];
    var days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
    for (var d in days){
	for (var h = 0; h <=23; h++){
	    keys.push(days[d]+" "+h);
	}
    }
    var cdata = [];
    var maxmix = 0;
    var mmixk = "";
    for (var k in keys){
	var key = keys[k];
	if (times[key]){
	    if (times[key].intensity) times[key].intensity = times[key].intensity/maxi;
	    else times[key].intensity = 0;
	    if (times[key].complexity) times[key].complexity = times[key].complexity/maxc;
	    else times[key].complexity = 0;
	    if (times[key].coverage) times[key].coverage = times[key].coverage/maxco;
	    else times[key].coverage = 0;
	    if (times[key].diversity) times[key].diversity = times[key].diversity/maxd;
	    else times[key].diversity = 0;
	    var mix = (times[key].intensity+times[key].complexity+times[key].coverage+times[key].diversity)/4;
	    cdata.push(mix);
	    if (mix > maxmix) {
		maxmix = mix;
		mmixk  = key;
	    }	    
	} else {
	    cdata.push(0);
	}
    }
    console.log(times);
    console.log(cdata);    
    Highcharts.chart('timechart', {
	chart: {
	    type: 'column'
	},
	spacingBottom: 0,
	spacingTop: 0,
	title: {
	    text: 'Your Learning Week'
	},
	xAxis: {
	    categories: keys,
	    crosshair: true
	},
	yAxis: {
	    min: 0, max: 1.0,
	    title: ''
	},
	tooltip: {
	    headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
	    pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
		'<td style="padding:0"><b>{point.y:.1f}</b></td></tr>',
	    footerFormat: '</table>',
	    shared: true,
	    useHTML: true
	},
	plotOptions: {
	    column: {
		pointPadding: 0.2,
		borderWidth: 0
	    }
	},
	series: [{
	    name: 'mixed indicators',
	    data: cdata,

	}]
    });

    var st='<div class="besttime">'+
        '<div class="besttimel">Best time Learning about '+currentlyshowing+" overall:</div>"+
	'<div class="besttimev">'+mmixk+" o'clock</div>"+
        '<div class="besttimel">Best time for coverage:</div>'+
	'<div class="besttimev">'+mcok+" o'clock</div>"+
	'<div class="besttimel">Best time for complexity:</div>'+
	'<div class="besttimev">'+mck+" o'clock</div>"+	
        '<div class="besttimel">Best time for diversity:</div>'+
	'<div class="besttimev">'+mdk+" o'clock</div>"+	
	'</div>';
    $('#besttimespanel').html(st);
}


function showDays(){
    var days = {
	"Monday": {intensity: 0, complexity: 0, coverage: 0, diversity: 0},
	"Tuesday": {intensity: 0, complexity: 0, coverage: 0, diversity: 0},
	"Wednesday": {intensity: 0, complexity: 0, coverage: 0, diversity: 0},
	"Thursday": {intensity: 0, complexity: 0, coverage: 0, diversity: 0},
	"Friday": {intensity: 0, complexity: 0, coverage: 0, diversity: 0},
	"Saturday": {intensity: 0, complexity: 0, coverage: 0, diversity: 0},
	"Sunday": {intensity: 0, complexity: 0, coverage: 0, diversity: 0}
    }
    var maxi = 0;
    for (var i in data){
	if (data[i]["scope"] == currentlyshowing){
	    if (data[i]["Day of Week"]){
		days[data[i]["Day of Week"]].intensity++;
		if (days[data[i]["Day of Week"]].intensity > maxi)
		    maxi = days[data[i]["Day of Week"]].intensity;
	    }	
	    if (data[i]["complexity"]){
		days[data[i]["Day of Week"]].complexity += parseFloat(data[i]["complexity"]);
	    }
	    if (data[i]["topic_coverage"]){
		days[data[i]["Day of Week"]].coverage += parseFloat(data[i]["topic_coverage"]);
	    }
	    if (data[i]["view_coverage"]){
		days[data[i]["Day of Week"]].diversity += parseFloat(data[i]["view_coverage"]);
	    }
	}
    }
    var maxc = 0.;
    var maxco = 0.;
    var maxd = 0.;
    for (var day in days){
	// average...
	if (days[day].intensity!=0){
	    days[day].complexity = parseFloat(days[day].complexity)/parseFloat(days[day].intensity);
	    days[day].coverage = parseFloat(days[day].coverage)/parseFloat(days[day].intensity);
	    days[day].diversity = parseFloat(days[day].diversity)/parseFloat(days[day].intensity);
	}
	if (days[day].complexity > maxc) maxc = days[day].complexity;
	if (days[day].coverage > maxco) maxco = days[day].coverage;
	if (days[day].diversity > maxd) maxd = days[day].diversity;
    }
    for (var day in days){
	days[day].intensity = parseFloat(days[day].intensity)/parseFloat(maxi);
	days[day].complexity = parseFloat(days[day].complexity)/parseFloat(maxc);
	days[day].coverage = parseFloat(days[day].coverage)/parseFloat(maxco);
	days[day].diversity = parseFloat(days[day].diversity)/parseFloat(maxd);
    }
    var datai = [
	days["Monday"].intensity,
	days["Tuesday"].intensity,
	days["Wednesday"].intensity,
	days["Thursday"].intensity,
	days["Friday"].intensity,
	days["Saturday"].intensity,
	days["Sunday"].intensity	
    ];
    var datac = [
	days["Monday"].complexity,
	days["Tuesday"].complexity,
	days["Wednesday"].complexity,
	days["Thursday"].complexity,
	days["Friday"].complexity,
	days["Saturday"].complexity,
	days["Sunday"].complexity	
    ];
    var dataco = [
	days["Monday"].coverage,
	days["Tuesday"].coverage,
	days["Wednesday"].coverage,
	days["Thursday"].coverage,
	days["Friday"].coverage,
	days["Saturday"].coverage,
	days["Sunday"].complexity	
    ];
    var datad = [
	days["Monday"].diversity,
	days["Tuesday"].diversity,
	days["Wednesday"].diversity,
	days["Thursday"].diversity,
	days["Friday"].diversity,
	days["Saturday"].diversity,
	days["Sunday"].diversity	
    ];
    console.log(days);
    Highcharts.chart('timechart', {
	chart: {
	    type: 'column'
	},
	spacingBottom: 0,
	spacingTop: 0,
	title: {
	    text: ''
	},
	xAxis: {
	    categories: [
		'Mon',
		'Tue',
		'Wed',
		'Thu',
		'Fri',
		'Sat',
		'Sun'
	    ],
	    crosshair: true
	},
	yAxis: {
	    min: 0, max: 1.0,
	    title: ''
	},
	tooltip: {
	    headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
	    pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
		'<td style="padding:0"><b>{point.y:.1f}</b></td></tr>',
	    footerFormat: '</table>',
	    shared: true,
	    useHTML: true
	},
	plotOptions: {
	    column: {
		pointPadding: 0.2,
		borderWidth: 0
	    }
	},
	series: [{
	    name: 'intensity',
	    data: datai,

	}, {
	    name: 'coverage',
	    data: dataco,

	}, {
	    name: 'complexity',
	    data: datac,

	}, {
	    name: 'diversity',
	    data: datad

	}]
    });
}


function showHours(){
    var maxi = 0;
    var hours = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    console.log(data);
    for (var i in data){
	if (data[i]["scope"] == currentlyshowing){
	    if (data[i]["Hour"]){
		hours[parseInt(data[i]["Hour"])]++;
	    }
	}
    }
    console.log(hours);
    Highcharts.chart('hourchart', {
	chart: {
	    type: 'column'
	},
	spacingBottom: 0,
	spacingTop: 0,
	title: {
	    text: ''
	},
	xAxis: {
	    categories: [
		'00h',
		'01h',
		'02h',
		'03h',
		'04h',
		'05h',		
		'06h',
		'07h',
		'08h',
		'09h',
		'10h',
		'11h',
		'12h',
		'13h',
		'14h',
		'15h',
		'16h',
		'17h',
		'18h',
		'19h',
		'20h',
		'21h',
		'22h',
		'23h'		
	    ],
	    crosshair: true
	},
	yAxis: {
	    min: 0,
	    title: ''
	},
	tooltip: {
	    headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
	    pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
		'<td style="padding:0"><b>{point.y:.1f}</b></td></tr>',
	    footerFormat: '</table>',
	    shared: true,
	    useHTML: true
	},
	plotOptions: {
	    column: {
		pointPadding: 0.2,
		borderWidth: 0
	    }
	},
	series: [{
	    name: 'intensity',
	    data: hours,

	}]
    });
}

function showRecommendations(){
    // initial list
    if (recos){
	var st = "<h3>Recommendations</h3>";
	for (var i in recos.recoIds){
	    st += '<div class="recresult">'+
		recos.recoIds[i]+
		'</div>';	
	}	
	$('#recresults').html(st);
    }
    var rids = [];
    if (recos) rids = recos.recoIds;
    else rids = ["908947e9-58d6-4cba-a532-f8cca57cc746","248250f3-4c5a-4cbe-9e66-20b4aa9c4e66","bb99df57-1a16-4257-b05a-9d9a83e5c5e8","609a22f2-7cc6-429c-a071-079622f05773","1eae742b-7ad3-4ee3-aabf-03ec0c0e413e","810d093c-f4db-4720-bab7-9404d212ea00","edfc37db-eca2-4cee-a484-21f8e3c81a2a","39d99e7e-ced0-4126-9577-275337f8348b","31d7882a-1ff8-4c6d-97a3-f5729fcef033","d2e29ce0-9d26-4c94-b566-92f1ae671b1a"];
    var url = "recodetails.php?l="+JSON.stringify(rids);
	$.ajax({
	    url: url,
	    dataType: "json",
	    success: function(result){
		console.log(result);
		var st = "";		
		var title = "";
		var link = "";
		for (var i in rids){		    
		    for (var j in result.hits.hits){
			var doc = result.hits.hits[j];
			if (doc._id == rids[i]){
			    title = doc._source.title;
			    link = doc._source.resource_url;
			}
		    }
		    st += '<div class="recresult">'+
			'<a href="'+link+'">'+title+'</a>'+
			'</div>';	
		}
		$('#recresults').html(st);
	    }});
}

function showActivities(){
    scope = -1
    for (var s in data["scopes"]){
	if (data["scopes"][s].name == currentlyshowing)
	    scope = s
    }
    if (scope != -1){
	$.ajax({
	    url: "activities.php?scope="+scope,
	    dataType: "json",
	    success: function(result){
		console.log(result)
		var found = false;
		var st = "";
		for (var i in result){
		    if (result[i].url){
			found = true;
			if (result[i].title && result[i].title!="")
			    st+='<div class="activityitem"><a href="'+result[i].url+'" target="_blank">'+result[i].title+'</div>'
			else
			    st+='<div class="activityitem"><a href="'+result[i].url+'" target="_blank">'+reduceURL(result[i].url)+'</div>'
		    }
		}
		if (found = true) st = '<h3>Latest activities in the scope</h3><div id="activitylist">'+st+'</div>'		
		$("#actarea").html(st)
	    }
	})
    } else {
	console.log("didn't find the scope "+currentlyshowing);
    }
}

function reduceURL(u){
    return u
}

function showCloudForScope(){
    tags = getTags();
    console.log(tags)
    var res = []
    for(var t in tags){
	res.push({"name": tags[t].name, "weight": tags[t].tfid})
    }
    Highcharts.chart("cloudforscope", {
chart: {
        borderColor: '#ffffff',
        borderWidth: 2,
        type: 'line'
},
  credits: {
        enabled: false
    },
    series: [{
        type: 'wordcloud',
        data: res
    }],
    title: {
      text: "topics in this learning scope",
//            style: {"fontSize": "14px"},
//            verticalAlign: 'bottom'
    },
  plotOptions: {
        series: {
            cursor: 'pointer',
            point: {
                events: {
                    click: function () {
//click(this);
                        
                    }
                }
            }
        }
    },
});

}

function getTags(){
    for(var i in data.scopes){
	if (data.scopes[i].name == currentlyshowing){
	    return data.scopes[i].tags
	}
    }
    return []
}

function showPolar(){
    var a1 = getDataArray(data, 'coverage');
    var a2 = getDataArray(data, 'diversity');
    var a3 = getDataArray(data, 'complexity');    
    var a4 = getDataArray(data, 'intensity');    
    console.log("currentlyshowing=")
    console.log(currentlyshowing);
    var polardata = [
	getWeight(a1, currentlyshowing),
	getWeight(a4, currentlyshowing),
	getWeight(a3, currentlyshowing),
	getWeight(a2, currentlyshowing),
    ];
    console.log(polardata);
    Highcharts.chart('polarchart', {
	chart: {
	    polar: true,
	    type: 'line'
	},
	spacingBottom: 0,
	title: {
	    text: 'Scope: '+currentlyshowing,
	    margin: 0,
	    verticalAlign: "top"
	},
	pane: {
	    size: '70%'
	},
	legend:{
	    width: 0,
	},
	xAxis: {
	    categories: ['coverage', 'intensity', 'complexity', 'diversity'],
	    tickmarkPlacement: 'on',
	    lineWidth: 0
	},
	yAxis: {
	    gridLineInterpolation: 'polygon',
	    lineWidth: 0,
	    min: 0,
	    max: 1
	},
	tooltip: {
	    shared: true,
	    formatter: function(){
		if (this.x == "coverage"){
		    return "the average amount of new concepts each activity has introduced in the scope: <strong>"+parseInt(this.y*100)+"%";
		}
		if (this.x == "intensity"){
		    return "the number of activities of in this scope compared to others: <strong>"+parseInt(this.y*100)+"%";
		}
		if (this.x == "complexity"){
		    return "the average complexity of activities of in this scope: <strong>"+parseInt(this.y*100)+"%";
		}
		if (this.x == "diversity"){
		    return "how activities in this scope cover a wide range of views (currently based on estimated age and gender of author): <strong>"+parseInt(this.y*100)+"%";
		}
	    }
	},
	series: [{
	    name: 'indicators',
	    data: polardata,
	    pointPlacement: 'on'
	}]

    });
}

function getWeight(a, s){
    for (var i in a){
	if (a[i].name == s) return a[i].weight;
    }
}


function showFrontPage(){
    currentlyShowing = null;
    $('#chart-page').css('display','none');
    $('#goalpage').css('display','none');
    $('#front-page').css('display','block');
}


function showGoalPage(){
    currentlyShowing = null;
    $('#chart-page').css('display','none');
    $('#front-page').css('display','none');
    $('#goalpage').css('display','block');
}

function getMax(arr, prop) {
     var max;
    for (var i=0 ; i<arr.length ; i++) {
        if (!max || arr[i][prop] > max[prop])
            max = arr[i];
    }
    return max;
}

function getMin(arr, prop) {
  
var min ;
    for (var i=0 ; i<arr.length ; i++) {
        if (!min|| arr[i][prop] < min[prop])
            min = arr[i];
    }
    return min;
}

function normalize(val,min, max) {
    var delta = max - min;
    var t=(val - min) / delta;
    var threshold=0.1;
    if(t<threshold)
    {
    return 0.1;
    }
    else{
       return t;
       }
}

function sDay(i){
    if (i==0) return "Monday";
    if (i==1) return "Tuesday";
    if (i==2) return "Wednesday";
    if (i==3) return "Thursday";
    if (i==4) return "Friday";    
    if (i==5) return "Saturday";
    if (i==6) return "Sunday";
    return "what?";
}
