// TODO:
//   manipulate scopes - move - delete the whole scope
//   add dates aggregated as an array day hour...
//   please waite dialog on merge and delete
//   log
//   update
var currentdisplay = "mix";
var goalindicator = "intensity";

$( document ).ready(function() {
    showMixed();
    $('#mergesearch').on('input',function(e){
	afelLog("search for merging", currentlyshowing, "searched for merging "+$('#mergesearch').val());
	mergesearch($('#mergesearch').val());
    });
    $('#movesearch').on('input',function(e){
	afelLog("search for moving", currentlyshowing, "searched for moving "+$('#movesearch').val());
	movesearch($('#movesearch').val());
    });
    $("#nggobut").click(function(){
	afelLog("create new goal", currentlyshowing, "created new goal "+currentlyshowing);	
	createGoal(currentlyshowing, goalindicator);
	showChartPage();
    });
    $("#ngclosebut").click(function(){
	if (currentlyshowing) showChartPage();
	else showFrontPage();
    });
    $("#mergebutton").click(function(){
	showMergeDialog();
    });
     $("#movecancel").click(function(){
	 hideMoveDialog();
    });    
    $("#plusbut").click(function(){
	toggleActions();
    });
    $("#goalaction").click(function(){
//	toggleActions();
	showGoalPage();
    });
    $("#deleteaction").click(function(){
//	toggleActions();
	afelLog("delete scope", currentlyshowing, "deleted scope "+currentlyshowing);
	deleteScope();
    });
    $("#backbut").click(function(){
	afelLog("back to front page", currentlyshowing, "went back to frontpage "+currentlyshowing);
	showFrontPage();
    });
    window.onhashchange = function(){
	if (window.location.hash == ""){
	    afelLog("reload front page", currentlyshowing, "reloaded frontpage "+currentlyshowing);
	    showFrontPage();
	}
    };
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
	afelLog("changed display", "mixed", "changed display to mixed");
	showMixed();
	switchCurrentDisplay("mix");
    });
    $("#intbut").click(function(){
	afelLog("changed display", "intensity", "changed display to intensity");
	var a = getDataArray(data, 'intensity');
	showScopeCloud(a, 'scopecloud', 'Learning scopes by intensity')
	switchCurrentDisplay("int");
	console.log(a)
    });
    $("#covbut").click(function(){
	afelLog("changed display", "coverage", "changed display to coverage");
	var a = getDataArray(data, 'coverage');
	showScopeCloud(a, 'scopecloud', 'Learning scopes by topic coverage')
	switchCurrentDisplay("cov");
    });
    $("#divbut").click(function(){
	afelLog("changed display", "diversity", "changed display to diversity");
	var a = getDataArray(data, 'diversity');
	showScopeCloud(a, 'scopecloud', 'Learning scopes by diversity')	
	switchCurrentDisplay("div");
    });
    $("#combut").click(function(){
	afelLog("changed display", "complexity", "changed display to complexity");
	var a = getDataArray(data, 'complexity');
	showScopeCloud(a, 'scopecloud', 'Learning scopes by complexity')	
	switchCurrentDisplay("com");
    });
    $("#workmore").click(function(){
	goalindicator = "intensity"
	$("#workmore").addClass("dselected")
	$("#inccoverage").removeClass("dselected")
	$("#inccomplexity").removeClass("dselected")
	$("#incdiversity").removeClass("dselected")
	$("#gtip").html("The Didactalia AFEL app monitors your activity on Didactalia. It can remind you to focus on the topic you have choosen and to simply read more, watch more and do more on that topic.");
    });
    $("#inccoverage").click(function(){
	goalindicator = "coverage"
	$("#workmore").removeClass("dselected")
	$("#inccoverage").addClass("dselected")
	$("#inccomplexity").removeClass("dselected")
	$("#incdiversity").removeClass("dselected")
	$("#gtip").html("To increase coverage, try to focus on activities that explore different areas of the topic you have selected. A given learning scope can be wide and you can explore it more completely by choosing resources that are wide themselves, or by carrying out a number of specialised and varied activities.");	
    });
    $("#inccomplexity").click(function(){
	goalindicator = "complexity"
	$("#workmore").removeClass("dselected")
	$("#inccoverage").removeClass("dselected")
	$("#inccomplexity").addClass("dselected")
	$("#incdiversity").removeClass("dselected")
	$("#gtip").html("As you become more familiar with a topic, you can expect to be able to tackle more and more complex activities. They migh seem more difficult, but they also help you go deeper and become more specialised in the topic you have choosen.");
    });
    $("#incdiversity").click(function(){
	goalindicator = "diversity"
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
		(a1[i].weight+a2[i].weight+a3[i].weight+a4[i].weight)/4});
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
    var names = []
    for(var sc in data.scopes){
	name = data.scopes[sc].name
	if (names.includes(name)) {
	    name = name+"*"
	    data.scopes[sc].name = name
	}
	res.push({"name": name, "weight": data.scopes[sc][field]})
	names.push (name)
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
    showRecommendations();
    showPolar();
    showCloudForScope();
    // showTimes();
    if (config.show_act) showActivities();
    $('#front-page').css('display','none');
    $('#goalpage').css('display','none');
    $('#chart-page').css('display','block');
    $('#mergebutton').css('display','block');
    $('#deleteaction').css('display','block');
}

function hideMergeDialog(){
    $("#mergedialog").css("display", "none")
}

function hideMoveDialog(){
    $("#movedialog").css("display", "none")
}

function mergesearch(kw){
    console.log("search "+kw)
    var scopes = []
    for(var s in data["scopes"]){
	const sc = data["scopes"][s]
	for(var t in sc.tags){
	    if (sc.tags[t].name.toLowerCase().indexOf(kw.toLowerCase())!=-1){
		scopes.push(s)
		break;
	    }
	}
    }
    console.log(scopes)
    scope = -1
    for (var s in data["scopes"]){
	if (data["scopes"][s].name == currentlyshowing)
	    scope = s
    }
    var st = ""
    if (scope!=-1){
	for (var i in scopes){
	    if (scopes[i]!=scope){
		st+='<div class="mergesearchitem"><div class="mergesearchitemtitle">'+
                    '<a href="javascript:merge('+scope+','+scopes[i]+');">'+
		    data["scopes"][scopes[i]].tags[0].name+
		    '</a></div>'+
		    '<div class="mergetaglist">'
		var first = true
		for(var t in data["scopes"][scopes[i]].tags){
		    if (!first){
			st+=data["scopes"][scopes[i]].tags[t].name+" "
		    }
		    first = false
		}
		st +='</div></div>'
	    }
	}
    } else {
	console.log("didn't find the scope "+currentlyshowing);
    }
    $("#mergecloud").html(st)
}

function movesearch(kw){
    console.log("search "+kw)
    var scopes = []
    for(var s in data["scopes"]){
	const sc = data["scopes"][s]
	for(var t in sc.tags){
	    if (sc.tags[t].name.toLowerCase().indexOf(kw.toLowerCase())!=-1){
		scopes.push(s)
		break;
	    }
	}
    }
    console.log(scopes)
    scope = -1
    for (var s in data["scopes"]){
	if (data["scopes"][s].name == currentlyshowing)
	    scope = s
    }
    var st = ""
    if (scope!=-1){
	for (var i in scopes){
	    if (scopes[i]!=scope){
		st+='<div class="movesearchitem"><div class="movesearchitemtitle">'+
                    '<a href="javascript:move(\''+tomoveact+'\','+scope+','+scopes[i]+', '+tomoveacti+');">'+
		    data["scopes"][scopes[i]].tags[0].name+
		    '</a></div>'+
		    '<div class="movetaglist">'
		var first = true
		for(var t in data["scopes"][scopes[i]].tags){
		    if (!first){
			st+=data["scopes"][scopes[i]].tags[t].name+" "
		    }
		    first = false
		}
		st +='</div></div>'
	    }
	}
    } else {
	console.log("didn't find the scope "+currentlyshowing);
    }
    $("#movecloud").html(st)
}

function showMergeDialog(){
    $("#mergescname").html(currentlyshowing)
    $("#mergecloud").html("Find a learning scope to merge with")
    $("#mergesearch").val("")
	/* 
	$.ajax({
	    url: "merge.php?scope="+scope,
	    dataType: "json",
	    success: function(result){
		var st = ""
		for (var i in result){
		    st+=
			'<a style="font-size: 1'+parseInt(result[i].sim*120)+'%" href="javascript:merge('+scope+', '+result[i].cluster+');"><br/>'+
		    result[i].tags.tags[0].name+
			"</a>";		    
		}
		st += "</ul>";
		$("#mergecloud").html(st)
	    }
	}) */
    $("#mergedialog").css("display", "block")
}

function showMoveDialog(){
    $("#movecloud").html("Find a learning scope to move to...")
    $("#movesearch").val("")
	/* 
	$.ajax({
	    url: "merge.php?scope="+scope,
	    dataType: "json",
	    success: function(result){
		var st = ""
		for (var i in result){
		    st+=
			'<a style="font-size: 1'+parseInt(result[i].sim*120)+'%" href="javascript:merge('+scope+', '+result[i].cluster+');"><br/>'+
		    result[i].tags.tags[0].name+
			"</a>";		    
		}
		st += "</ul>";
		$("#mergecloud").html(st)
	    }
	}) */
    $("#movedialog").css("display", "block")
}


// TODO should ask for confirmation... no time...
function merge(sc1, sc2){
    afelLog("merge", currentlyshowing, "merging "+sc1+" "+sc2);
    $.ajax({
	url: "merge.php?scope1="+sc1+"&scope2="+sc2,
	dataType: "json",
	success: function(result){
	    console.log(result);
	    $("#mergecloud").html("Reloading, please wait...")		
	    location.reload();
	}
    }); 
    console.log("merging "+sc1+" "+sc2);
}

function move(act, sc1, sc2, i){
    afelLog("move", currentlyshowing, "moving "+sc1+" "+sc2+" act");
    $('#act_'+i).css("display", "none");
    $("#movecloud").html("Moving, please wait...")
    $.ajax({
	    url: "move.php?act="+act+"&scope1="+sc1+"&scope2="+sc2,
	    dataType: "json",
	    success: function(result){
		console.log(result)
		hideMoveDialog()
	    }
	});
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

function recoClicked(rid, r){
    afelLog('recocheck', currentlyshowing, 'clicked on resource '+r);
    $.post("recofb.php", {rid: rid, r: r}, function( d ) {
	console.log(d)
    });
}

function showRecommendations(){    
    var scope = -1;
    for (var s in data["scopes"]){
	if (data["scopes"][s].name == currentlyshowing)
	    scope = s
    }
    var ascope = []
    for (var t in data["scopes"][scope]["tags"])
	ascope.push(data["scopes"][scope]["tags"][t].name)
    console.log("ascope")
    console.log(ascope)
    $.post("reco.php", {scope: ascope}, function( d ) {
	console.log(d);
	const ddata = JSON.parse(d);
	console.log(ddata);
	var st = "";
	for (var i in ddata.recomms){
	    if (ddata.recomms[i].indexOf("open.edu")!=-1){
		st += '<div class="recresult">'+
		    '<a onclick="javascript:recoClicked(\''+ddata.recommId+'\', \''+ddata.recomms[i]+'\');" target="_blank" href="'+ddata.recomms[i]+'">'+
		    openEdURLtoTitle(ddata.recomms[i])+
		    '</a></div>';
	    }
	}
	$('#recresults').html(st);
    });
    //});
    return ;
}

function openEdURLtoTitle(u){
    const nu = u.replace(/\/content-section-.*/, '')
    return nu.substring(nu.lastIndexOf('/')+1).replace(/-/g, ' ')
}


function deleteActivity(id, i){
    afelLog("delete activity", currentlyshowing, "deleting "+id);
    $('#act_'+i).css("display", "none");
    $.ajax({
	url: "delete.php?act="+id,
	dataType: "json",
	success: function(result){
	    console.log("done deleting")
	    console.log(result);
	}
    });
}

function deleteScope(){
    var scope = -1;
    for (var s in data["scopes"]){
	if (data["scopes"][s].name == currentlyshowing)
	    scope = s
    }
    if (scope != -1){
	$.ajax({
	    url: "delete_s.php?scope="+scope,
	    dataType: "json",
	    success: function(result){
		console.log("done deleting")
		console.log(result);
		console.log("reloading")		
		location.reload();	
	    }
	});	
    }
}

var tomoveact = "";
var tomoveacti = -1;

function moveActivity(id, i){
    tomoveact = id;
    tomoveacti = i;
    showMoveDialog();
}

function showActivities(){
    $("#actarea").html("")
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
			    st+='<div class="activityitem" id="act_'+i+'"><a class="actlink" href="'+result[i].url+'" target="_blank">'+result[i].title+'</a><a class="deletebutton" href="javascript:deleteActivity(\''+result[i].id+'\', '+i+');">delete</a><a class="movebutton" href="javascript:moveActivity(\''+result[i].id+'\', '+i+');">move</a></div>'
			else
			    st+='<div class="activityitem" id="act_'+i+'"><a class="actlink" href="'+result[i].url+'" target="_blank">'+reduceURL(result[i].url)+'</a><a class="deletebutton" href="javascript:deleteActivity(\''+result[i].id+'\', '+i+');">delete</a><a class="movebutton" href="javascript:moveActivity(\''+result[i].id+'\', '+i+');">move</a></div>'
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
    console.log(a1)
    console.log(a4)
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
		    return "how activities in this scope cover a wide range of views (currently based on variety of sources): <strong>"+parseInt(this.y*100)+"%";
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
    var sum = 0
    var count = 0
    for (var i in a){
	if (a[i].name == s) return a[i].weight
    }
    return 0.0
}

function showFrontPage(){
    currentlyshowing = null;
    $('#chart-page').css('display','none');
    $('#goalpage').css('display','none');
    $('#mergebutton').css('display','none');
    $('#mergedialog').css('display','none');
    $('#movedialog').css('display','none');        
    $('#deleteaction').css('display','none');
    $('#front-page').css('display','block');
}


function createGoal(scope, indicator){
    $.ajax({
	url: "set_goal.php?scope="+scope+"&indicator="+indicator,
	dataType: "json",
	success: function(result){
	    console.log(result)
	}
    });
}

function deleteGoal(i,s){
    afelLog("delete goal", currentlyshowing, "deleting goal "+i+" in "+s);
    $.ajax({
	url: "delete_goal.php?scope="+s+"&indicator="+i,
	dataType: "json",
	success: function(result){
	    console.log(result)
	}});
    if (currentlyshowing) showChartPage();
    else showFrontPage();
}


function showGoalPage(){
    // currentlyShowing = null;
    $('#chart-page').css('display','none');
    $('#front-page').css('display','none');
    $('#goalpage').css('display','block');
    if (currentlyshowing){
	$('#newgoalsection').css('display','block');
	$('#goalscopetitle').html(currentlyshowing);
    } else {
	$('#newgoalsection').css('display','none');
    }
    // get the list of goals...
    $('#existinggoalssection').html("Loading your learning goals...")
    $.ajax({
	url: "get_goals.php",
	dataType: "json",
	success: function(result){
	    console.log("Goals::")
	    console.log(result)
	    var st = ''
	    for (var g in result){
		st += '<div class="goalview">'
		const goal = result[g]
		st+='<div class="goallabel">'+goal.indicator+' in '+goal.scope+'<br/> <a href="javascript:deleteGoal(\''+goal.indicator+'\',\''+goal.scope+'\');">(delete)</a></div>'
		st+='<div class="goalchart" id="goalchart'+g+'"></div>'
		st+='</div>'		
	    }
	    $('#existinggoalssection').html(st)
	    for(var g in result){
		const vals = result[g].values;
		var dvals = {}
		for (var v in vals){
		    dvals[Date.parse(v)] = vals[v]
		}
		var ovals = {}
		Object.keys(dvals).sort().forEach(function(key) {
		    ovals[key] = dvals[key];
		});
		var data = []
		for (var v in ovals){
		    const item = [parseInt(v), ovals[v]]
		    data.push(item)
		}
		console.log(data)
		Highcharts.chart('goalchart'+g, {
		    chart: {
			type: 'spline',
			marginBottom: 25
		    },
		    xAxis: {
			type: 'datetime',
			dateTimeLabelFormats: { 
			    month: '%e. %b',
			    year: '%b'
			},
			title: {text: ''}
		    },
		    yAxis: {
			title: {text: ''}
		    },
		    plotOptions: {
			spline: {
			    marker: {
				enabled: true
			    }
			}
		    },
		    title: { text: '' },
		    series: [{
			name: "Winter 2014-2015",
			data: data			
		    }]						
		})
	    }
	}
    });
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

function afelLog(type, label, message){
    $.post( "log.php", {type: type, label: label, message: message}, function( d ) {
	console.log("Logged");
	console.log(d);
    });
}
