// On document ready set the div height to window
$(document).ready(function(){ 
 
	if($(window).width()<1250){
		$('.prod_container').css({'height':(($(window).height())-450)+'px'});	
		$('.details_area').css({'max-height':(($(window).height())-355)+'px'});
		$('body').css({'height':(($(window).height()))+'px'});		
	}
	else{
		$('.prod_container').css({'height':(($(window).height())-480)+'px'});	
		$('.details_area').css({'max-height':(($(window).height())-374)+'px'});
		$('body').css({'height':(($(window).height()))+'px'});
	}
		
	$('.details_area .fa-plus-circle').click(function() {
		var x= parseInt($(this).parent().children('p').text(), 10)+1;
		$(this).parent().children('p').html(x);
	});
	$('.details_area .fa-minus-circle').click(function() {
		var x= parseInt($(this).parent().children('p').text(), 10)-1;
		$(this).parent().children('p').html(x);
	});
	$( ".arrow_o" ).click(function() {
		var collapsedHeight;	
		 	 if ($('.prod_container').hasClass('expanded')) {
			  	if($(window).width()<1250){
					collapsedHeight=$(window).height()-450;			
				}
				else{
					collapsedHeight=$(window).height()-480;
				}
		        $('.prod_container').animate({'height': collapsedHeight}, 800);
		        $('.prod_container').removeClass('expanded');
		      }
		      else {
		      	if($(window).width()<1250){
					collapsedHeight=$(window).height()-200;	
				}
				else{
					collapsedHeight=$(window).height()-290;
				}
		        $('.prod_container').animate({'height': collapsedHeight}, 800);
		        $('.prod_container').addClass('expanded');
		      }
	});
	$( ".fa-bars" ).click(function() {
		$(".leftmenu").slideToggle();
	});
	 $( ".openclose .stt" ).click(function() {
		$(".openclose.cl").toggleClass('display');
		$(".openclose.op").toggleClass('display');
	 });
	
	 /*$(".active").hover(
	   function() {
	     $(this).css('background','#dcf3f9');
	 	$(this).find('fa-times').css('color','#fb6e5a');
	 	$(this).find('fa-info-circle').css('color','#a2d473');
	   },
	   function() {
	      $(this).css('background','white');
	 	$(this).find('fa-times').css('color','#fb6e5a');
	 	$(this).find('fa-info-circle').css('color','#a2d473');
	   }
	);*/	$(".workers_tb tr").click(function() {		$(".workers_tb tr").css('background','white');
		$(".workers_tb tr").hide();	    $(this).css('background','#dcf3f9');			$(this).find('.fa-check-circle').show();	  });
	var str;
	var popup;
	$( ".pay" ).click(function() {
		str=".pay,.pop_peulot";
		popup=".add_worker";
		openwrap(str,popup);
	});
	$( ".wrap" ).click(function() {
		$(".wrap").hide();	
		$(".container_pop")	.hide();
		$(".container_pop .add_worker").show();
	    $(str).css({'z-index':'9'});
	    $(popup).fadeOut();
	});
});

function openwrap(str,popup){
	$(str).css({'z-index':'9999'});
    $(popup).fadeIn();
	$(".wrap").show();
}
function openwrap2(str1,str2){	
	$(".container_pop")	.hide();
	$(str2).show();
	$(str2).css({'z-index':'9999'});
    $(str2).fadeIn();
    if(str2.indexOf('finish')>-1){
    	$( '.wrap' ).delay(800).click();
    }
}
function func(){
	$(".popup_pay").removeClass("add_worker");
	$(".popup_pay").addClass("mezumzn");
	$(".add_worker .container_pop").
	$(".mezumzn .container_pop")
}
// On window resize run through the sizing again
$(window).resize(function(){
	if($(window).width()<1250){
		$('.prod_container').css({'max-height':(($(window).height())-450)+'px'});	
		$('.details_area').css({'max-height':(($(window).height())-350)+'px'});
		$('body').css({'height':(($(window).height()))+'px'});		
	}
	else{
		$('.prod_container').css({'max-height':(($(window).height())-480)+'px'});	
		$('.details_area').css({'max-height':(($(window).height())-374)+'px'});
		$('body').css({'height':(($(window).height()))+'px'});
	}
});