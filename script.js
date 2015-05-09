// random_uni - 20150509
// Script - v.0.1

// Random Int

function randInt(min, max) {
		return Math.floor(Math.random() * (max - min + 1) + min);
};

// UniBg Function

var elements = ['\u262a'];

function uniBg(array,min_amount,max_amount) {

	var maxX = $(window).width();
	var maxY = $(window).height();
	
	var eCountMax = max_amout;
	var eCountMin = min_amout;
	var eCount = randInt(eCountMin,eCountMax);

	var eSizeMax = maxX*4;
	var eSizeMin = maxY;
	
	/*var elements = ['\u2630','\u2631','\u2632','\u2633','\u2634','\u2635','\u2636','\u2637','\u268a','\u268b','\u268c','\u268d','\u268e','\u268f','\u26ac','\u2022','\u2022','\u2022'];*/
	/*var elements = ['\u2630','\u2633','\u268a','\u268b','\u268c','\u268d','\u268e','\u268f','\u26ac','\u2022'];*/
	
	var colorR = ['114','216'];
	var colorV = ['156','80'];
	var colorB = ['179','55'];
	var rotations = ['0','45','90','135','180','225','270','315','360','-45','-90','-135','-180','-225','-270','-315','-360'];
	var elementsSorted = [''];
	
	for(i=0;i < eCount;i++) {
		var e = array[randInt(0,(array.length-1))];
		var eSize = randInt(eSizeMin,eSizeMax);
		var eSizeEnd = randInt(eSizeMin,eSizeMax);
		var eColorNb = randInt(0,(colorR.length-1));
		var rgba = 'rgba('+colorR[eColorNb]+','+colorV[eColorNb]+','+colorB[eColorNb]+','+(randInt(5,5)/10)+')';
		var eX = randInt(0,maxX-(eSize/2));
		var eY = randInt(0,maxY-(eSize/4));
		var eXend = randInt(0,maxX-(eSize/2));
		var eYend = randInt(0,maxY-(eSize/4));
		var deg = rotations[randInt(0,(rotations.length-1))];
		var degEnd = rotations[randInt(0,(rotations.length-1))]
		var elementClass = 'element';
		elementsSorted.push(e);
		
		$('#bgWrap').append('<span class=\"'+elementClass+'\" style=\"font-size:'+eSize+'px\;color:'+rgba+';\" data-start=\"left:'+eX+'px;top:'+eY+'px;font-size:'+eSize+'px;transform:rotate(00deg);transform:rotate('+deg+'deg);\" data-end=\"left:'+eXend+'px;top:'+eYend+'px;font-size:'+eSizeEnd+'px;transform:rotate('+degEnd+'deg);\" >'+e+'</span>');	
	}
}

// JQUERY UI

$(document).ready(function() {
	$('#bgWrap').hide();
   
});

$(window).load(function() {
	$('#bgWrap').fadeIn(500);
	$("#e_amount_slider").slider({
		range: true,
		min: 0,
		max: 500,
		values: [50, 100],
		slide: function(event, ui) {
			$("#e_amount_range").val(ui.values[0]+' - '+ui.values[1]);
		}
	});
	$("#e_amount_range").val($("#e_amount_slider").slider("values", 0)+' - '+$("#e_amount_slider").slider("values", 1));
	
	var min_amout = $("#e_amount_range").val($("#e_amount_slider").slider("values", 0));
	var max_amout = $("#e_amount_range").val($("#e_amount_slider").slider("values", 1));
	
	$('#submit').click(function(){
		uniBg(elements,min_amount,max_amount);
	});
});

