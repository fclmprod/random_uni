// random_uni - 20150509
// Script - v.0.1

// Random Int

function randInt(min, max) {
		return Math.floor(Math.random() * (max - min + 1) + min);
};

function arrayPusher(output,toPush) {
	for(i=0;i<toPush.length;i++){
		output.push(toPush[i]);	
	}
}

// .draggable Drag function
(function($) {
    $.fn.drags = function(opt) {

        opt = $.extend({handle:"",cursor:"move"}, opt);

        if(opt.handle === "") {
            var $el = this;
        } else {
            var $el = this.find(opt.handle);
        }

        return $el.css('cursor', opt.cursor).on("mousedown", function(e) {
            if(opt.handle === "") {
                var $drag = $(this).addClass('draggable');
            } else {
                var $drag = $(this).addClass('active-handle').parent().addClass('draggable');
            }
            var drg_h = $drag.outerHeight(),
                drg_w = $drag.outerWidth(),
                pos_y = $drag.offset().top + drg_h - e.pageY,
                pos_x = $drag.offset().left + drg_w - e.pageX;
            $drag.parents().on("mousemove", function(e) {
                $('.draggable').offset({
                    top:e.pageY + pos_y - drg_h,
                    left:e.pageX + pos_x - drg_w
                }).on("mouseup", function() {
            
                });
            });
            //e.preventDefault(); // disable selection
        }).on("mouseup", function() {
            if(opt.handle === "") {
                $(this).removeClass('draggable');
            } else {
            }
        });

    }
})(jQuery);

// UniBg Function

var elements = ['\u2630','\u2633','\u268a','\u268b','\u268c','\u268d','\u268e','\u268f','\u26ac','\u2022'];

var elemensts3 = ['\u2630','\u2631','\u2632','\u2633','\u2634','\u2635','\u2636','\u2637','\u268a','\u268b','\u268c','\u268d','\u268e','\u268f','\u26ac','\u2022','\u2022','\u2022'];

var elements2 = ['&#9829;'];
for(i=09999;i<10010;i++){
	elements2.push('&#'+i);
}

for(i=10010;i<10100;i++){
	elements2.push('&#'+i);
}

for(i=10100;i<11000;i++){
	elements2.push('&#'+i);
}


arrayPusher(elements,elements2);


function uniBg(array,min_amount,max_amount,min_size,max_size,colorRandom) {
	
	var maxX = window.innerWidth;
	var maxY = window.innerHeight;
	
	var eCountMax = max_amount;
	var eCountMin = min_amount;
	var eCount = randInt(eCountMin,eCountMax);

	var eSizeMax = max_size;
	var eSizeMin = min_size;
	
	
	/*var elements = ['\u2630','\u2633','\u268a','\u268b','\u268c','\u268d','\u268e','\u268f','\u26ac','\u2022'];*/
	
	var colorR = ['250','72'];
	var colorV = ['128','209'];
	var colorB = ['114','204'];
	var rotations = ['0','45','90','135','180','225','270','315','360','-45','-90','-135','-180','-225','-270','-315','-360'];
	var elementsSorted = [''];
	
	for(i=0;i < eCount;i++) {
		var e = array[randInt(0,(array.length-1))];
		var eSize = randInt(eSizeMin,eSizeMax);
		var eSizeEnd = randInt(eSizeMin,eSizeMax);
		if(colorRandom==1){
			var rgba = 'rgba('+randInt(0,255)+','+randInt(0,255)+','+randInt(0,255)+','+(randInt(0,10)/10)+')';
		}
		else {
			
			var eColorNb = randInt(0,(colorR.length-1));
			var rgba = 'rgba('+colorR[eColorNb]+','+colorV[eColorNb]+','+colorB[eColorNb]+','+(randInt(0,10)/10)+')';
		
		}
		var eX = randInt(0,maxX-(eSize/2));
		var eY = randInt(0,maxY-(eSize/4));
		var eXend = randInt(0,maxX-(eSize/2));
		var eYend = randInt(0,maxY-(eSize/4));
		var deg = rotations[randInt(0,(rotations.length-1))];
		var degEnd = rotations[randInt(0,(rotations.length-1))]
		var elementClass = 'element';
		elementsSorted.push(e);
		
		$('#bgWrap').append('<span class=\"'+elementClass+'\" id=\"'+elementClass+i+'\"style=\"font-size:'+eSize+'px\;color:'+rgba+';\left:'+eX+'px;top:'+eY+'px;transform:rotate(00deg);transform:rotate('+deg+'deg);\" data-end=\"left:'+eXend+'px;top:'+eYend+'px;font-size:'+eSizeEnd+'px;transform:rotate('+degEnd+'deg);\" >'+e+'</span>');
		$('#'+elementClass+i).drags();
	}
}

// JQUERY UI

$(document).ready(function() {
	$('#bgWrap').hide();
   
});

$(window).load(function() {
	$('#bgWrap').fadeIn(500);
	
	for(i=0;i<elements.length;i++) {
		$('#e').append('<option>'+elements[i]+'</option>');
	};
	
	$("#e_amount_slider").slider({
		range: true,
		min: 1,
		max: 500,
		values: [10, 100],
		slide: function(event, ui) {
			$("#e_amount_range").val(ui.values[0]+' - '+ui.values[1]);
		}
	});
	$("#e_amount_range").val($("#e_amount_slider").slider("values", 0)+' - '+$("#e_amount_slider").slider("values", 1));
	
	$("#e_size_slider").slider({
		range: true,
		min: 1,
		max: 10000,
		values: [50, 100],
		slide: function(event, ui) {
			$("#e_size_range").val(ui.values[0]+' - '+ui.values[1]);
		}
	});
	$("#e_size_range").val($("#e_size_slider").slider("values", 0)+' - '+$("#e_size_slider").slider("values", 1));
	
	
	var elementsOutput = [];
	
	$('#add').click(function(){
		elementsOutput.push($('#e').val());
		$('#eOutput').append('<span>'+$('#e').val()+'</span>');
	});
	
	$('#remove').click(function(){
		elementsOutput.pop();
		var temp = $('#eOutput > span:last');
		temp.remove();
	});
	$('.element').drags();
	$('#submit').click(function(){
		$('#bgWrap').html('');
		var min_amount = $("#e_amount_slider").slider("values", 0);
		var max_amount = $("#e_amount_slider").slider("values", 1);
		var min_size = $("#e_size_slider").slider("values", 0);
		var max_size = $("#e_size_slider").slider("values", 1);
		if(elementsOutput.length==0){
			elementsOutput.push('Choose characters');
			min_amount = 1;
			max_amount = 1;
			min_size = 25;
			max_size = 100;
		}
		if($('#colors1').is(':checked')){
			var colorRandom = 1;
		}
		
		else {
			var colorRandom = 0;
		}
		uniBg(elementsOutput,min_amount,max_amount,min_size,max_size,colorRandom);
	});
	
	$('.element').hover(function(){
		$(this).css('font-size',+1);
	});
});

