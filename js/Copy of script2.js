// On document ready set the div height to window
$(document).ready(function(){ 

	$("#cust_search_value,#search_prod2,.advanced_input ").keyup(function(e){
			if(e.which == 13) {
		      $("#search_prod").focus();
			}
	});

	$( "#datepicker11" ).datepicker();
 	$(".rightside .search_input1").focus();
 	$('.mainarea input[type=button],.mainarea').click(function(e) {
 		if($(".popup_pay.add_worker ").css("display")!="block"){
 		if(e.target.id!="cust_search_value"&&e.target.id!="result_calc"&&e.target.id!="search_prod"&&e.target.id!="search_prod2"&&!(e.target.id.indexOf('advanced_')>-1)){
 				$("#search_prod").focus();
 		}

 		}
			
	});
	$( "body" ).delegate( ".popup_pay input[type=text],.popup_pay .text,.pop_anacha input[type=text],.pop_anacha .text", "blur", function() {
		$('.input_result input[name=Input]').val(eval($('.input_result input[name=Input]').val()))
		 if($(this).attr('class')!=''&&$(this).attr('class')!=undefined){
		 	flag_focused=$(this).attr('class');
		 	flag_focused= flag_focused.replace(' ','.');
		 	flag_focused= flag_focused.replace(' ','.');
		 	flag_focused= flag_focused.replace(' ','.');
		 	flag_focused= flag_focused.replace(' ','.');
		 	flag_focused='.'+flag_focused;
		 	flag_focused2=$(this).attr('name');
		 	if(flag_focused2!=""&&flag_focused2!=undefined){
		 		flag_focused2=" input[name="+flag_focused2+"]";
		 	}
		 	else{
		 		flag_focused2='';
		 	}
		 	 	 $('input[name=flag_focused]:hidden').val(flag_focused2+flag_focused);
		 }
	
		});
	$( "body" ).delegate( "#cust_search_value,.cust_search_value,#search_prod2,.comment_txt,.comment_txt_prod,.mainarea2 input[type=text]", "blur", function() {
		 if($(this).attr('id')!=''&&$(this).attr('id')!=undefined){
		 	flag_focusedk='#'+$(this).attr('id');
		 	$('input[name=flag_focusedk]:hidden').val(flag_focusedk);
		 }
		 else
		 if($(this).attr('class')!=''&&$(this).attr('class')!=undefined){
		 	flag_focusedk=$(this).attr('class');
		 	flag_focusedk= flag_focusedk.replace(' ','.');
		 	flag_focusedk= flag_focusedk.replace(' ','.');
		 	flag_focusedk= flag_focusedk.replace(' ','.');
		 	flag_focusedk= flag_focusedk.replace(' ','.');
		 	flag_focusedk='.'+flag_focusedk;
		 	flag_focusedk2=$(this).attr('name');
		 	if(flag_focusedk2!=""&&flag_focusedk2!=undefined){
		 		flag_focusedk2=" input[name="+flag_focusedk2+"]";
		 	}
		 	else{
		 		flag_focusedk2='';
		 	}
		 	 	 $('input[name=flag_focusedk]:hidden').val(flag_focusedk2+flag_focusedk);
		 	 	
		 }
	
		});
		$( "body" ).delegate( "#cust_search_value,.cust_search_value,#search_prod2,.comment_txt,.comment_txt_prod,.mainarea2 input[type=text]", "focus", function(e) {
			if(!$(this).parent().hasClass('switchtoggle')){
					$(".keyboard_result").val($(this).val());
			   		str=".popup.keyboard";
			   		popup=".popup.keyboard,.popup.keyboard .container_pop";
			   		$(str).css({'z-index':'9999'});
				    $(popup).fadeIn();
					$(".wrap").show();
					if(typeof android!='undefined'){
						$(this).blur();
					}
			}
		
		});
	var flag_focused='';
	var flag_focusedk='';
	$(".popup_pay input[type=text]").blur(function(){
	  	flag_focused=$(this).attr('name');
	  	//alert(flag_focused);
	});
	
	if($(window).width()<1250){
	
		$('.prod_container').css({'height':(($(window).height())-250)+'px'});	
		$('.details_area').css({'height':(($(window).height())-400)+'px'});

		$('body').css({'height':(($(window).height())-50)+'px'});	
		$('.inner_calc td,.input_result').css({'height':(parseInt($(window).height()-230)/5)+'px'});	
	}
	else{
			
		$('.prod_container').css({'height':(($(window).height())-280)+'px'});	
		$('.details_area').css({'height':(($(window).height())-420)+'px'});
		$('body').css({'height':(($(window).height())-45)+'px'});
		$('.inner_calc td,.input_result').css({'height':(parseInt($(window).height()-260)/5)+'px'});
	}
	
	$('.active .fa-plus-circle').click(function() {
		var x= parseInt($(this).parent().children('p').text(), 10)+1;
		$(this).parent().children('p').html(x);
	});
	$('.active .fa-minus-circle').click(function() {
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
	
	 $( ".openclose.cl .stt,.fa-times" ).click(function() {
	 	$(".stt.open").animate({
				'marginLeft': '-=30px'
			}, function() {
				$(".openclose.cl").toggleClass('display');
				$(".openclose.op").toggleClass('display');
				open_kupa();
				$(".disable_cash").hide();
				$(".clock").css("position","inherit");
		  });
		
	 });	
	// $( ".openclose.op .stt" ).click(function() {
		
	$( ".closebb" ).click(function() {
	 	$(".stt.open").animate({
				'marginLeft': '+=30px'
			}, function() {
				/*
				 alert("ff");
		$http.post('functions.php',  $.param({stat: "close",count:$rootScope.cash_num,stock:GetURLParameter.GetURLParameter('stock')}), {
        	headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
   		 }).success(function(data){
   		 	alert(data+"success");
		   
		    
	  	});
				 * */
				$(".openclose.cl").toggleClass('display');
				$(".openclose.op").toggleClass('display');
				$(".disable_cash").show();
				$(".clock").css("position","absolute");
				$( '.wrap' ).click();
		  });
		  
	 });
	 
	/* $( ".openclose.op .stt" ).click(function() {
	 	$(".openclose.cl").toggleClass('display');
		$(".openclose.op").toggleClass('display');
		$(".disable_cash").show();
	 });	
	 $( ".openclose.cl .stt" ).click(function() {
		$(".openclose.cl").toggleClass('display');
		$(".openclose.op").toggleClass('display');
		if($(".openclose.cl").hasClass('display')){
			open_kupa();
		}
		else{
			close_kupa();
		}
	 });*/
	
	 
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
	);*/
	$(".workers_tb tr").click(function() {
		$(".workers_tb tr").css('background','white');
		$(".workers_tb tr .fa-check-circle").hide();
	    $(this).css('background','#dcf3f9');	
	    cashier=$(this).attr('data-id');
		$(this).find('.fa-check-circle').show();
	  });
	var str;
	var popup;

	var flag_calc=false;
	/*$( ".anacha" ).click(function() { 
		/*if($(".calc_area").css('display')=='none'){
			$(".calc_area").show();
			$(".prod_area").hide();
			flag_calc=true;
		}
		$('.result2').show();*/
		//str=".anacha,.pop_anacha,.calc_area";
		//popup=".an,.pop_anacha";
		//openwrap(str,popup);		
		/*$(".s_anacha").val($(".finall_price").text());		
		$(".s_between").val(current_finnal_amount);
		if($(".anacha_txt").val()!=""){
			calc_anacha();		
		}*/	
	//});

	$( ".hachlafa" ).click(function() { 
		str=".hachlafa,.pop_hachlafa";
		popup=".an,.pop_hachlafa";
		
		/*$('#achlafa_pritim').empty();
		html="<tr class='details_title'><th>שם פריט</th><th>מחיר</th><th  style=''>כמות</th><th>הנחה</th><th class='border_table'>סה&quot;כ</th><th class='border_table' style='width: 50px;'></th></tr>";
		for (comp in my_cookie){
			if(comp=="general"||comp=="tax"){
				continue;
			}
			html+="<tr onclick=hachlafa_barcode('"+my_cookie[comp]['BarCode']+"')  data-id='"+my_cookie[comp]['BarCode']+"'><td>"+my_cookie[comp]['Title']+"</td><td>"+my_cookie[comp]['SalePrice']+"</td><td>"+my_cookie[comp]['amount']+"</td><td></td><td>"+my_cookie[comp]['amount']*my_cookie[comp]['SalePrice']+"</td><td><i class='fa fa-check-circle display'></i></td></tr>";
		}
		$('#achlafa_pritim').append(html);*/
		openwrap(str,popup);		
		////$(".s_anacha").val($(".finall_price").text());		
		//$(".s_between").val(current_finnal_amount);
		//if($(".anacha_txt").val()!=""){
		//	calc_anacha();		
		//}	
	});
$( ".pause" ).click(function() { 
		str=".pause,.pop_pause";
		popup=".an,.pop_pause";
		//$('#trannum').text($.cookie("trannum"));
		openwrap(str,popup);		
		////$(".s_anacha").val($(".finall_price").text());		
		//$(".s_between").val(current_finnal_amount);
		//if($(".anacha_txt").val()!=""){
		//	calc_anacha();		
		//}	
	});
	
	$( ".prepaid" ).click(function() { 
		str=".pop_prepaid";
		popup=".an,.pop_prepaid";
		
		//$('#trannum').text($.cookie("trannum"));
		openwrap(str,popup);		
		////$(".s_anacha").val($(".finall_price").text());		
		//$(".s_between").val(current_finnal_amount);
		//if($(".anacha_txt").val()!=""){
		//	calc_anacha();		
		//}	
	});

	iskeyboard=0;
	$( ".wrap" ).click(function() {
		if(iskeyboard==1){
				$(".popup.keyboard").hide();
				iskeyboard=0;
				var isclosewrap=0;
				$( ".pop_peulot" ).each(function( index ) {
				 	if($(this).css('display')=='block'){	
				 		isclosewrap=1;		 		
				 		 return false;
				 	}
				})
				if (isclosewrap == 0){
					$(".wrap").hide();
				}
				
		}
		else{
			if(flag_calc){
			$(".calc_area").hide();
				$(".prod_area").show();			
			}
			$(".result2").hide();
			flag_calc=false;
			$(".wrap").hide();
			$(".popup_pay ").hide();	
			$(".cust_search").hide();
			$(".pop_anacha")	.hide();
			$(".pop_comment")	.hide();
			$(".pop_comment_prod")	.hide();
			$(".container_pop")	.hide();
	
			$(".pop_chooseworker").hide();
			$(".mainarea2").hide();
			$(".pop_debtpayments").hide();
			$(".pop_sett").hide();
			$(".container_pop .add_worker").show();
		}
		
		
			$(".fa-cog").removeClass('active_cog');
			
		    $(str).css({'z-index':'9'});
		    $(".calc_area").css({'z-index':'0'});
		    $(popup).fadeOut();
		    $('.pop_hachlafa2,.pop_hachlafa').fadeOut();
		    $("#search_prod").focus();
		   //  $(".zerofloat2").val("0.00");
	});
	$(".pop_anacha  .anacha_txt").focusout(function(){
		calc_anacha();
     });
     

     $(".an_prod  .anacha_txt").focusout(function(){
		calc_anacha_prod();
     });  
     $(".input_sum").focus(function(){
     	if(typeof android!='undefined'){
     		$(".input_sum").blur();
     	}
		$('input[name=helpsum]:hidden').val('false');
     })

            
});
 function maxWindow() {
 
		$('body').fullscreen();
    }
function GetURLParameter(sParam){
	            var sPageURL = window.location.search.substring(1);
			    var sURLVariables = sPageURL.split('&');
			    for (var i = 0; i < sURLVariables.length; i++) 
			    {
			        var sParameterName = sURLVariables[i].split('=');
			        if (sParameterName[0] == sParam) 
			        {
			            return sParameterName[1];
			        }
			    }
	 }
	 var stock=GetURLParameter('stock');
	 function open_kupa(){
		html="<form id='open_kupa'><div style='position: absolute;width:100%;height: 100%;z-index: 1000;background: rgba(40, 38, 38, 0.9);'>";
		html=html+	"<div style='background-color: white;z-index: 2000;width: 650px;height: 500px;margin: 0 auto;margin-top: 40px;padding: 50px;position: relative;'>";
		//html=html+		"<h2 style='text-align: center;font-size: 170%;'>פתיחת קופה:</h2>";
		//html=html+"<input type='text' name='yitrat_kupa'/><input type='submit' value='שלח'/>";
		html=html+"<input type='hidden' value='"+stock+"' name='stock'/ >";		
		//html=html+	"</div>";
		html=html+	"<div class='container_pop mezuman display' style='display: block; z-index: 9999;height: 90%;'>";
		html=html+	"	<h2 style='  font-size: 200%;'  class='relative'>פתיחת קופה</h2>";
		html=html+	"	<h5 style='  font-size: 200%;' >הכנס דמי מחזור:</h5>";
		html=html+	"	<input type='text' value='0.00' name='yitrat_kupa' class='' style='  font-size: 280%;'>";
		html=html+	"	<div class='shtar'>";
		html=html+	"		<img src='images/money8.png' onclick=calc2('200')>";
		html=html+	"		<img src='images/money2.png' onclick=calc2('100')>";
		html=html+	"		<img src='images/money1.png' onclick=calc2('50')>";
		html=html+	"		<img src='images/money7.png' onclick=calc2('20')>";				
		html=html+	"	</div>";
		html=html+	"	<div class='matbea'>";
		html=html+	"		<img src='images/money3.png' onclick=calc2('10')>";
		html=html+	"		<img src='images/money6.png' onclick=calc2('5')>";
		html=html+	"		<img src='images/money9.png' onclick=calc2('2')>";
		html=html+	"		<img src='images/money10.png' onclick=calc2('1')>";
		html=html+	"		<img src='images/money5.png' onclick=calc2('0.5')>";
		html=html+	"		<img src='images/money4.png' onclick=calc2('0.1')>";
		html=html+	"	</div>";
		html=html+	"	<input class='mybtn btnlightgray rightbottom' type='button' onclick=$('#open_kupa').remove() value='ביטול'>";
		html=html+	"	<input class='mybtn btnblue leftbottom' onclick=$('#open_kupa').submit() type='button' value='אישור'>";
		html=html+	"</div>";
		html=html+"</div></form>";
		$('body').prepend(html);
}
function close_kupa(){
	html="<form id='close_kupa'><div style='position: absolute;width:100%;height: 100%;z-index: 1000;background: rgba(40, 38, 38, 0.9);'>";
		html=html+	"<div style='background-color: white;z-index: 2000;width: 520px;height: 500px;margin: 0 auto;margin-top: 40px;padding: 50px;position: relative;'>";
		//html=html+		"<h2 style='text-align: center;font-size: 170%;'>פתיחת קופה:</h2>";
		//html=html+"<input type='text' name='yitrat_kupa'/><input type='submit' value='שלח'/>";
		html=html+"<input type='hidden'value='"+stock+"' name='stock'/>";		
		//html=html+	"</div>";
		html=html+	"<div class='container_pop mezuman display' style='display: block; z-index: 9999;  height: 90%;'>";
		html=html+	"	<h2 style='  font-size: 200%;' class='relative'>סגירת קופה</h2>";
		html=html+	"	<h5 style='  font-size: 200%;'>הכנס דמי מחזור:</h5>";
		html=html+	"	<input type='text' value='0.00' name='machzor' class='' style='  font-size: 280%;'>";
		html=html+	"	<div class='shtar'>";
		html=html+	"		<img src='images/money8.png' onclick=calc3('200')>";
		html=html+	"		<img src='images/money2.png' onclick=calc3('100')>";
		html=html+	"		<img src='images/money1.png' onclick=calc3('50')>";
		html=html+	"		<img src='images/money7.png' onclick=calc3('20')>";				
		html=html+	"	</div>";
		html=html+	"	<div class='matbea'>";
		html=html+	"		<img src='images/money3.png' onclick=calc3('10')>";
		html=html+	"		<img src='images/money6.png' onclick=calc3('5')>";
		html=html+	"		<img src='images/money9.png' onclick=calc3('2')>";
		html=html+	"		<img src='images/money10.png' onclick=calc3('1')>";
		html=html+	"		<img src='images/money5.png' onclick=calc3('0.5')>";
		html=html+	"		<img src='images/money4.png' onclick=calc3('0.1')>";
		html=html+	"	</div>";
		html=html+	"	<input class='mybtn btnlightgray rightbottom' onclick=$('#close_kupa').remove() type='button' value='ביטול'>";
		html=html+	"	<input class='mybtn btnblue leftbottom' onclick=$('#close_kupa').submit() type='button' value='אישור'>";
		html=html+	"</div>";
		html=html+"</div></form>";
		$('body').prepend(html);
}
function anac() {
  $( '.wrap' ).click();
  $('.finall_price').text($('.s_anacha').val());
  var in1=(parseFloat($('.s_anacha').val())*0.82).toFixed(2);
   var tax=(parseFloat($('.s_anacha').val())*0.18).toFixed(2);
  $('.in_sum').text(in1);
   $('.tax_sum').text(tax);
   $(".zerofloat").val("0.00");
}
function anac_prod(){
	key=$('.an_prod input[name=barcode]:hidden').val();
	my_cookie[key]['discount']=$('.an_prod .anacha_txt').val();
	var y2=parseInt($('.tr_'+key+' td')[5].innerText);
	if($('.an_prod input[name=achuz]').hasClass('btnorange')){
		aa='%'+my_cookie[key]['discount'];
		my_cookie[key]['discount_type']=0;
		y2=((100-parseInt($('.an_prod .anacha_txt').val()))*my_cookie[key]['SalePrice']*my_cookie[key]['amount'])/100;
	}
	else{
		my_cookie[key]['discount_type']=1;
		aa='₪'+my_cookie[key]['discount'];
		y2=(my_cookie[key]['SalePrice']-parseInt($('.an_prod .anacha_txt').val()))*my_cookie[key]['amount'];
	}
	y3=parseFloat($('.tr_'+key+' td')[5].innerText);
	$('.tr_'+key+' td')[5].innerText=y2;
	$('.tr_'+key+' td:nth-child(5)').empty();
	$('.tr_'+key+' td:nth-child(5)').append("<span onclick=anacha_prod('"+key+"')>"+aa+"</span>");
	sum=y3-y2;
	var y=parseFloat($('.newrow3 label.finall_price:first').text(),10);
	$('.newrow3 label.finall_price:first').text((y-sum).toFixed(2));
	var z=parseFloat($('.newrow2 div label.tax_sum:first').text(),10);
	$('.newrow2 div label.tax_sum:first').text((z-sum*0.18).toFixed(2));
	var z2=parseFloat($('.newrow2 div label.in_sum:first').text(),10);
	$('.newrow2 div label.in_sum:first').text((z2-sum*0.82).toFixed(2));

	
	current_finnal_amount=current_finnal_amount-sum;
	$( '.wrap' ).click();
}
function calc_anacha(){
	if($("input[name=achuz]").hasClass("btnorange")){
			x=parseFloat($(".s_between").val())*(100-parseFloat($(".anacha_txt").val()))/100;
		}
		else{
			x=parseFloat($(".s_between").val())-parseFloat($(".anacha_txt").val());
		}
		$(".s_anacha").val(x.toFixed(2));
}
function calc_anacha_prod(){
	key=$('input[name=barcode]:hidden').val();
	sale=my_cookie[key]['SalePrice'];
	if($(".an_prod input[name=achuz]").hasClass("btnorange")){
			x=parseFloat(sale)*(100-parseFloat($(".an_prod .anacha_txt").val()))/100;
		}
		else{
			x=parseFloat(sale)-parseFloat($(".an_prod .anacha_txt").val());
		}
		$(".an_prod .s_between").val(x.toFixed(2));
}
	function search_cust_sbm(){
		$(".find_cust_container").css('display','inline-block');
		$(".search_cust_container").css({'display': 'inline-block','width': '20%','float': 'left'});
		$(".show").show();
		$(".show").hide();
		var id=$('#client_search_id').val();
		var i=0;
		while(i<client.length&&client[i].ID!=id){
			i++;
		}
		var x='שם: '+client[i].SupplierName;
		$(".find_cust_container .lbl1.name").text(x);
		var y='מספר: '+client[i].ClientNum;
		$(".find_cust_container .lbl2.num").text(y);
		w=(parseInt(client[i].Hov)-(parseInt(client[i].Zikui)+parseInt(client[i].Hakafa)));
		if(w>=0){
			$(".find_cust_container .fa-info-circle").css("color","#e65844!important");
			$(".find_cust_container .lbl2.yitrat_hov").css("color","#e65844!important");
			var z='יתרת חוב: '+w;
		}
		else{
			$(".find_cust_container .fa-info-circle").css("color","#599f25!important");
			$(".find_cust_container .lbl2.yitrat_hov").css("color","#599f25!important");
			z='יתרת זכות: '+w;
		}
	
		$(".find_cust_container .lbl2.yitrat_hov").text(z);
		//$(to).val($(from).val());
	}
function change_right(str,btn){
	$(".curr_btn input[type=button]").hide();
	$(".rightcenter").hide();
	$(str).show();
	$(btn).show();
}
function openwrap(str,popup){
	$(".pop_alert").css('z-index',"1");
	$(str).css({'z-index':'9999'});
    $(popup).fadeIn();
	$(".wrap").show();
}
function openwrap3(str,popup){
	$(".pop_alert").css('z-index',"1");
	$(str).css({'z-index':'9999'});
    $(popup).fadeIn();
    if(str.indexOf('sett')>0){
    	$(".header .fa-cog").addClass('active_cog');
    }
    
	//$(".wrap").show();
}
function set_tash_tab () {
  $('.tash1').toggleClass('display');
  $('.ashray1').toggleClass('display');
  $('.tashtab1').toggleClass('active_tash');
  $('.tashtab2').toggleClass('active_tash');
  $('.tashtab1 i').toggleClass('fa-angle-left');
  $('.tashtab2 i').toggleClass('fa-angle-left');
  $('.tashtab1 i').toggleClass('fa-angle-down');
  $('.tashtab2 i').toggleClass('fa-angle-down');
}
    function wopen(url,name,width,height,center,resizable){
        var left = 150;
        var top = 50;
        var s;
        if (typeof(width)=="undefined")width=720;
        if (typeof(height)=="undefined")height=500;
        if (typeof(resizable)=="undefined")resizable="yes";
        if (typeof(center)!="undefined"){
            left = Math.round((screen.availWidth-width)/2);
            top = Math.round((screen.availHeight-height)/2);
        }
        s = window.open(url+'&simple=1',name,'top='+top+',left='+left+',height='+height+',width='+width+',resizable='+resizable+',scrollbars=yes');
        try{
            s.focus();
        }
        catch(e){};
    }
function insert_trans(action){
	if(action=="pause"){
		trans2=JSON.parse($.cookie("on_hold"));
	}
	else{
		trans2=trans;
	}
	$('#achlafa_trans').empty();
		html="<tr class='details_title'><th>שם לקוח</th><th>מספר עסקה</th><th  style=''>תאריך</th><th>שעה</th><th class='border_table'>סכום</th><th class='border_table' style='width: 50px;'></th></tr>";
		for(var i=0;i<trans2.length;i++){
			html+="<tr onclick=choose_tran('"+i+"','"+action+"')  data-id='"+trans2[i]['trannum']+"'><td>"+trans2[i]['cashierid']+"</td><td>"+trans2[i]['trannum']+"</td><td>"+trans2[i]['trandate']+"</td><td>"+trans2[i]['trantime']+"</td><td>"+trans2[i]['finalamount']+"</td><td><i class='fa fa-check-circle display'></i></td></tr>";
		}
		$('#achlafa_trans').append(html);
}
function choose_tran(j,action){
	if(action=="pause"){
		$('.pop_hachlafa2,.pop_pause').fadeOut();
		my_cookie_hold=JSON.parse($.cookie('on_hold'))[j];
		
		my_cookie_0=my_cookie_hold['components']['component'];
		var i=0;
		while(typeof my_cookie_0[i] != 'undefined'){
			if(my_cookie_0[i]['cquantity']>0){
				for(var k=0;k<parseInt(my_cookie_0[i]['cquantity']);k++){
					add_cart(my_cookie_0[i]['code'])
				}
			}
			else{
				for(var k=0;k>parseInt(my_cookie_0[i]['cquantity']);k--){
					refund=1;
					add_cart(my_cookie_0[i]['code']);
				}
			}
			i++;
		}
	}
	else{
		str=".hachlafa,.pop_hachlafa";
		popup=".an,.pop_hachlafa";
		comp=trans[j]['components']['component'];
		$('#achlafa_pritim').empty();
		html="<tr class='details_title'><th>שם פריט</th><th>מחיר</th><th  style=''>כמות</th><th>הנחה</th><th class='border_table'>סה&quot;כ</th><th class='border_table' style='width: 50px;'></th></tr>";
		for(var i=0;i<comp.length;i++){
			html+="<tr onclick=hachlafa_barcode('"+comp[i]['code']+"')  data-id='"+comp[i]['code']+"'><td>"+comp[i]['description']+"</td><td>"+comp[i]['cfirstamount']+"</td><td>"+comp[i]['cquantity']+"</td><td>"+comp[i]['camountdiscount']+"</td><td>"+comp[i]['cfinalamount']+"</td><td><i class='fa fa-check-circle display'></i></td></tr>";
		}
		$('#achlafa_pritim').append(html);
		$('.pop_hachlafa2').fadeOut();
		openwrap(str,popup);	
	}	
}
function choose_all_comp(){
	$('#achlafa_pritim').find(".fa-check-circle").removeClass('display');
}
function openwrap2(str1,str2){
	$(".pop_alert").css('z-index',"1");
	if(str1=='checkend'&&(parseFloat($('.span_itra').text())<=0||$("input[name=helpsum]:hidden").val()=='true')){
		str2='.finish.container_pop';		
	}	
	
		$(".container_pop")	.hide();
		$(str2).show();
		$(str2).css({'z-index':'9999'});
	    $(str2).fadeIn();
	    if(str2.indexOf('finish')>-1){  
	    	 	
	    	setTimeout(function(){
			  $( '.wrap' ).click();
			  $('input[type=text]').val('');
				$('.text').val('');
			}, 2500);
	
	
		/*$(".zerofloat").text('0.00');
		$(".zerofloat").val('0.00');
		
		$(".type_pay .fa-times-circle").parent().parent().remove();
		$(".details_area .active").remove();*/
		
    }
    
}
function anacha_doit() {
  $(".anacha_txt").val($(".input_result input").val());
  calc_anacha();
}
function check_akafa () {
	if($(".akafa_text").val()>=0){
		openwrap2('','.type_pay.container_pop');
 	 	add_type('.akafa_text','הקפה');
	}
	else{
		openwrap2('','.akafa3.container_pop');
	}
  
}
function calc1(sum){
	var x=$('.mezuman_sum').val();
	x= parseFloat(x, 10)+parseFloat(sum);
	$('.mezuman_sum').val(x);
}
function calc2(sum){
	var x=$('input[name=yitrat_kupa]').val();
	x= parseFloat(x, 10)+parseFloat(sum);
	$('input[name=yitrat_kupa]').val(x);
}
function calc3(sum){
	var x=$('input[name=machzor]').val();
	x= parseFloat(x, 10)+parseFloat(sum);
	$('input[name=machzor]').val(x);
}

function get_val(from,to){
	$(to).val($(from).val());
}
function init_sum () {
  $(".input_sum").val($(".span_itra").text());		
		var now = new Date();		
		var day = ("0" + now.getDate()).slice(-2);
		var month = ("0" + (now.getMonth() + 1)).slice(-2);
		var today = now.getFullYear()+"-"+(month)+"-"+(day) ;
		$("input[type=date]").val(today);		
		//alert(prettyDate);
		$('.input_sum').select();		
		$scope.flag_select=true;		
		$('input[name=helpsum]:hidden').val($scope.flag_select.toString());		
}
function add_type(str,type){
	var x=$(str).val();
	switch (type) {
	    case 'מזומן': 	    
	    payments['cash']={"cashamount":$(str).val()};	 
	    break;
	    case 'המחאה':
	    var x={"chequeamount":$(str).val(),"chequepaymentdate":$('input[name=chequepaymentdate]').val(),"chequebanknumber":$('input[name=chequebanknumber]').val(),"chequebranch":$('input[name=chequebranch]').val(),"chequebanknumber":$('input[name=chequebanknumber]').val(),"chequeaccountnumber":$('input[name=chequeaccountnumber]').val(),"chequebanknumber":$('input[name=chequebanknumber]').val(),"chequenumber":$('input[name=chequenumber]').val(),"chequebanknumber":$('input[name=chequebanknumber]').val(),"chequepaymentdate":$('input[name=chequepaymentdate]').val(),"chequebanknumber":$('input[name=chequebanknumber]').val()};
	    payments['cheque'][ payments['cheque'].length]=x;
	    break;
	   case 'אשראי':
	    payments['credit']={"creditamount":$(str).val()};	 	   
	   break;
	}
	if($('.type_pay .workers_tb tr[data-type='+type+']').length )
	{
		y=parseFloat($('.type_pay .workers_tb tr[data-type='+type+']:first')[0].children[1].innerText,10);
		x= parseFloat(x, 10)+parseFloat($('.type_finall_sum').text());
		$('.type_finall_sum').text(x-y);
		var itra=parseFloat($(".span_sum:first").text())-x+y;
		$(".span_itra").text(itra);
		x=parseFloat($(str).val(),10);
		//alert(x);
		$('.type_pay .workers_tb tr[data-type='+type+']:first')[0].children[1].innerText=x;
	}
	else{
		
		x= parseFloat(x, 10)+parseFloat($('.type_finall_sum').text());
		$('.type_finall_sum').text(x);
		var itra=parseFloat($(".span_sum:first").text())-x;
		$(".span_itra").text(itra);
		var row_type='<tr data-type="'+type+'" style="background: white;"><td>'+type+'</td><td>'+$(str).val()+'</td><td><i class="fa fa-times-circle" onclick=$(this).parent().parent().remove();></i></td></tr>';
		$('.type_pay .workers_tb').append(row_type);
	}
	
}
function func(){
	$(".popup_pay").removeClass("add_worker");
	$(".popup_pay").addClass("mezumzn");
	$(".add_worker .container_pop").
	$(".mezumzn .container_pop")
}
function zicuy () {
  /*if($(".calc_area").css('display')=='none'){
			$(".calc_area").show();
			$(".prod_area").hide();
			flag_calc=true;
		}
		str=".calc_area";
		popup="";
		openwrap(str,popup);		
		*/	
}
function hachlafa_barcode(barcode){
	$('#achlafa_pritim tr[data-id='+barcode+']').find(".fa-check-circle").toggleClass('display');
}

// On window resize run through the sizing again
$(window).resize(function(){
	
	if($(window).width()<1250){
		$('.prod_container').css({'max-height':(($(window).height())-350)+'px'});	
		$('.details_area').css({'max-height':(($(window).height())-250)+'px'});
		$('body').css({'height':(($(window).height()))+'px'});		
	}
	else{
		$('.prod_container').css({'max-height':(($(window).height())-380)+'px'});	
		$('.details_area').css({'max-height':(($(window).height())-274)+'px'});
		$('body').css({'height':(($(window).height()))+'px'});
	}

});

function an_help () {		
		if($(".an_prod input[name=achuz]").hasClass("btnorange")){
				$('.an_prod input[name=achuz]').click();
		}
		else{
				$('.an_prod input[name=shch]').click();
		}		
}
function calc_tash (x) {
	if($('input[name=mecholel_firstsum]').val()==''||$('input[name=mecholel_firstsum]').val()==undefined||x=='1'){
		$('input[name=mecholel_secsum]').val((eval(parseFloat($('.mecholelsum_text').val())/parseFloat($('input[name=mecholel_numtash]').val()))).toFixed(2));
		if(x=='1'){
			$('input[name=mecholel_firstsum]').val($('input[name=mecholel_secsum]').val());

		}
	}
	else{
		$('input[name=mecholel_secsum]').val((eval((parseFloat($('.mecholelsum_text').val())-parseFloat($('input[name=mecholel_firstsum]').val()))/(parseFloat($('input[name=mecholel_numtash]').val())-1))).toFixed(2));
		
}
  
}
function calc_tash1 () {
  $('input[name=mecholel_secsum]').val((eval((parseFloat($('.mecholelsum_text').val())-parseFloat($('input[name=mecholel_firstsum]').val()))/(parseFloat($('input[name=mecholel_numtash]').val())-1))).toFixed(2));
}
 function akafa_checking(str) {
 	
 	if(!$(".exitclient").hasClass("ng-hide")){
	 	var itra_free=$(".itra_free:first").text();
	 	var sum=parseFloat(itra_free)-parseFloat($(str).val());
	 	if(sum>=0&&parseFloat($('.itra55').val())>0){
	 		check_end('.akafa');
	 		/*openwrap2('.add_worker.container_pop','.type_pay.container_pop')*/
	 	}
	 	else{
	 		$(".akafa3 .input_sum").val($(".akafa .input_sum").val());
	 		openwrap2('.add_worker.container_pop','.akafa3.container_pop')
	 		
	 	}
	  }
	  else{
	  	
	  }
	 }
function start_work(){
	var n=$("#num_worker:hidden").val();
	if(n==""){
		n=$("#num_worker2").val();
		n=n.substring(7, 10);		
	}
	$("#num_worker:hidden").val("");
	$("#num_worker2").val("");
	stock_name=$('#stock_name').text();
	$.post("inc/functions.php",{id_worker:n,stat:"start",stock:stock_name},function(response){		
		$("div[name=clock_display2]").html("<h2 class='big_text'>כניסה בוצעה בהצלחה<br>עבודה נעימה!</h2>");
			$("div[name=clock_display]").hide();
		setTimeout(function () {
	      $(".wrap").click();	
	    }, 2000);
			
	});
}
function end_work(){
	var n=$("#num_worker:hidden").val();
	stock_name=$('#stock_name').text();
	if(n==""){
		n=$("#num_worker2").val();
		n=n.substring(7, 10);		
	}
	$("#num_worker:hidden").val("");
	$("#num_worker2").val("");
	$.post("inc/functions.php",{id_worker:n,stat:"end",stock:stock_name},function(response){
			$("div[name=clock_display2]").html("<h2 class='big_text'>יציאה בוצעה בהצלחה<br>המשך יום נעים!</h2>");
			$("div[name=clock_display]").hide();	
			setTimeout(function () {
	      $(".wrap").click();	
	    }, 2000);	
		
	});
}
function valid1 (str) {

  if(str==".shovar"){
  	if($(str).find("input[name=shovar_num]").val()==""){
  		return false;
  	}
  	else if(str=='.amchaa'){
  		if($(str).find("input[name=chequenumber]").val()==""||$(str).find("input[name=chequepaymentdate]").val()==""||$(str).find("input[name=chequebanknumber]").val()==""||$(str).find("input[name=chequebranch]").val()==""||$(str).find("input[name=chequeaccountnumber]").val()==""){
	  		return false;
	  	}
  	} 
  	else if(str=='.ashray_yadany'){
  		if($(str).find("input[name=ashray_numcard]").val()==""||$(str).find("input[name=ashray_tokef]").val()==""||$(str).find("input[name=ashray_tashlumim]").val()==""){
	  		return false;
	  	}
  	} 
  	
  	return true;
  }
}
/*function check_end (str) {
	if(str=='.mecholelsum_text'){
		if($(".amchaa_sum").val()!=""||$("input[name=chequenumber]").val()!=""||$("input[name=chequeaccountnumber]").val()!=""||$("input[name=chequepaymentdate]").val()!=""||$("input[name=chequebanknumber]").val()!=""||$("input[name=chequebranch]").val()!=""){
			return;
		}
	}
	if(str==".ashray_yadany"){
		if($(".ashray_numcard").val()==undefined||$(".ashray_tokef").val()==undefined||$(".ashray_cvv").val()==undefined
		||$(".ashray_numcard").val()==""||$(".ashray_tokef").val()==""||$(".ashray_cvv").val()==""){
			return;
		}
	}
	if(1==1||valid1(str)){
		if(parseFloat($(str).find('.input_sum').val())>=parseFloat($(str).find('.span_sum').text())){
			openwrap2('checkend','.type_pay.container_pop');
		}
	  	else{
	  	openwrap2('','.type_pay.container_pop');
	  	}
	}
	
}*/
function alert_site(msg){
	//str=".alert,.alert";
		//popup=".an,.pop_alert";
		$('#message').text(msg);
		//$('#trannum').text($.cookie("trannum"));
		$(".pop_alert").show();
		  setTimeout(function () {
       $(".pop_alert").hide();
    }, 2000);
			
}
function closebb(){
	 	$(".stt.open").animate({
				'marginLeft': '+=30px'
			}, function() {

				$(".openclose.cl").toggleClass('display');
				$(".openclose.op").toggleClass('display');
				$(".disable_cash").show();
				$(".clock").css("position","absolute");
				$( '.wrap' ).click();
		  });
		  
	 }
	
function trigg () {
					 var e = $.Event('keypress');
				    e.which =50; // Character 'A'
				    $('.rrr').trigger(e);
				  

				  }
function doit () {
  var x=$('.keyboard_result').val();
			var t=$('input[name=flag_focusedk]:hidden').val();
			$(t).val(x);
			$('.keyboard_result').val('');
}				  			
function barc(val,pos,posnot){
	if(!$.isNumeric(val)&&val!=""){
		$('#search_prod'+pos).val(val);
		$('#search_prod'+pos).show();
		$('#search_prod'+posnot).hide()
	}
}
function barc2(val,pos,posnot){
	if($.isNumeric(val)&&val!=""){
		$('#search_prod'+pos).val(val);
		$('#search_prod'+pos).show();
		$('#search_prod'+posnot).hide()
	}
}

