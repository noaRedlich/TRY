(function() {
  var app = angular.module('PaymentM', []);
 
  app.controller('PaymentController',[ '$http','$scope', '$rootScope','$compile','tabs','local','cash_global','validate','alert','openwindows',function ($http,$scope,$rootScope, $compile,tabs,local,cash_global,validate,alert,openwindows){ 
	
	paym=this;
	$rootScope.paid=0.00;
	$rootScope.itra=0.00;
	$rootScope.cash_amount_help=0;
	var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!

    var yyyy = today.getFullYear();
    if(dd<10){
        dd='0'+dd
    } 
    if(mm<10){
        mm='0'+mm
    } 
    var today = dd+'/'+mm+'/'+yyyy;
	$rootScope.currdate=today;
	if(localStorage.getItem('finalltash')===null){	
		$rootScope.finalltash={
			"cash":0,
			"cheque":0,
			"credit":0,
			"cash1":{"hova":0,"zicuy":0},
			"cheque1":{"hova":0,"zicuy":0},
			"credit1":{"hova":0,"zicuy":0},
			"shovar1":{"hova":0,"zicuy":0},
			"shovarzicuy1":{"hova":0,"zicuy":0},
			"shovarzicuy":0,
			"akafadebt":{ "general":0,
					"cash":0,
					"cheque":0,
					"credit":0,
					"shovar":0,
					"prepaid":0,
					"shovarzicuy":0},
			"credit2":{
						"ISRACARD":{"DEBIT":0,"CREDIT":0},
						"VISA_CAL":{"DEBIT":0,"CREDIT":0},
						"DINERS":{"DEBIT":0,"CREDIT":0},
						"AMEX":{"DEBIT":0,"CREDIT":0},
						"JCB":{"DEBIT":0,"CREDIT":0},
						"LEUMICARD":{"DEBIT":0,"CREDIT":0},
						"INVALID":{"DEBIT":0,"CREDIT":0},
					 },
			"akafa":0,
			"shovar":0,
			"prepaid":0,
			"all":0,
			"opendrawer":0,
		};
	}
	else{
		$rootScope.finalltash=JSON.parse(localStorage.getItem('finalltash'));
	}
	
	/*$scope.finalltash={
			cash:0,
			cheque:0,
			credit:0,
			akafa:0,
			shovar:0,
			prepaid:0
		};*/

	$scope.flag_select=false;
	$scope.payments_type=cash_global.payments_type;

	$scope.call_setTab = function(newValue) {
         tabs.setTab(newValue);
    }
    $scope.prepaid_start = function(){
    	if(typeof android=='undefined'){
			$('input[name=prepaid_num]').focus();
		}
		
	}
	 $scope.isdebt = function(type){
	 	if(type==1){
	 		if($rootScope.transtype!=1){
		 		openwrap2('','.akafa.container_pop');
	    		$scope.init_sum();		
		 	}
		 	else{
		 		$scope.call_alert_site('תשלום חוב ! לא מורשה תשלום בהקפה',1,0);
		 	}
	 	}
	 	else if(type==2){
	 		if($rootScope.transtype!=1){
	 			openwrap2('','.shovarzicuy.container_pop');
	 			$scope.init_sum();
	 			$scope.start_shovarzivuy();		
		 	}
		 	else{
		 		$scope.call_alert_site('תשלום חוב ! לא מורשה תשלום בשובר זיכוי',1,0);
		 	}
	 	}	 	   	
	}
	
	$scope.prepaid_pay=function(){		
		$http.post("functions.php?prepaid_sum="+$('input[name=prepaid_sum]').val()+"&prepaid_num="+$('input[name=prepaid_num]').val(),  $.param({}), {
        	headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
   		 }).success(function(data){
   		 	if(data==""){
   		 		check_end('.prifeyd');
   		 		$rootScope.add_type('.prepaid_sum','פריפייד');
   		 		cashc.checkend();
   		 	}
   		 	else{
   		 		call_alert_site("",1,'on');
   		 		openwrap2('','.type_pay.container_pop');
   		 	}
	  	});	
	}
	$rootScope.start_pay = function(){
			 if($rootScope.itra==0.00||$rootScope.itra==0)
				$rootScope.itra=$rootScope.amount;
			else
				$rootScope.itra=$rootScope.amount-$rootScope.paid;
			$(".ddd3").val($rootScope.currdate);
			if($rootScope.prepaid!=1){
				$(".prepaid_disabled").removeAttr('disabled');
			}
             if(($("#total_prod ").text()!="0"&&$(".popup_pay ").css('display')=='none')||$rootScope.transtype==1||$rootScope.prepaid==1){            					
				if($rootScope.premission_list['permission_worker']=='on'){
					$rootScope.SearchWorker='';
					$(".workers_tb tr.pay_workers .fa-check-circle").hide();	
					str=".pay,.pop_peulot";
					popup=".add_worker";
					$(str).css({'z-index':'9999'});
				    $(popup).css({'display':'block'});
					$(".wrap").css({'display':'block'});
				}
				else{
					str=".pay,.pop_peulot";
					popup=".type_pay.container_pop,.popup_pay ";
					$(str).css({'z-index':'9999'});
				    $(popup).css({'display':'block'});
					$(".wrap").css({'display':'block'});
					//$rootScope.action="hours";		
					//$scope.call_alert_site('משתמש לא מורשה',3,1);
				}
            }	      
			
	};
	$scope.force = function(){		
		if($rootScope.premission_list['permission_force_cash']=='on'){			
			$rootScope.add_type('.over_akafa','הקפה');
			paym.check_end2('');		
		}
		else{
			$rootScope.action="akafa";		
			$scope.call_alert_site('משתמש לא מורשה',3,1);
		}
			
	};
	
	this.is_charge= function  () {
		if($rootScope.premission_list['permission_worker']=='on'){
			 openwindows.openwrap2('.mezuman.container_pop','.add_worker.container_pop');
		}
		else{
			 $(".wrap").click();
		}
	 
	};
	$scope.get_val = function(from,to){
		$(to).val($(from).val());
	};
	$scope.openwrap2 = function  (x,y) {
		openwindows.openwrap2(x,y);
	};
	this.init_sum2 = function(){		
		tabs.setTab(5);
		$(".calc_area").css('z-index','999');
		$(".calc_area").css('position','relative');
		$(".input_sum").val($(".span_itra").text());
		//$rootScope.mezumanitra=	Math.round(parseFloat($(".span_itra").text()));
		$rootScope.mezumanitra=Math.round(parseFloat($(".span_itra").text())*10)/10;
		$("#mezuman_itra").val($rootScope.mezumanitra);	
		$(".mezuman .span_sum").text($rootScope.mezumanitra);			
			
		var now = new Date();		
		var day = ("0" + now.getDate()).slice(-2);
		var month = ("0" + (now.getMonth() + 1)).slice(-2); 
		var today = now.getFullYear()+"-"+(month)+"-"+(day) ;
		$("input[type=date]").val(today);		
		//alert(prettyDate);
		//$('.input_sum').select();		
		$("textarea[name=ashray_f]").focus();	
	};
	this.init_sum = function(){		
		tabs.setTab(5);
		$(".calc_area").css('z-index','999');
		$(".calc_area").css('position','relative');
		$(".input_sum").val($(".span_itra").text());
		//$rootScope.mezumanitra=	Math.round(parseFloat($(".span_itra").text()));
		$rootScope.mezumanitra=Math.round(parseFloat($(".span_itra").text())*10)/10;
		$("#mezuman_itra").val($rootScope.mezumanitra);	
		$(".mezuman .span_sum").text($rootScope.mezumanitra);	
		$(".ddd3").val($rootScope.currdate);		
			
		var now = new Date();		
		var day = ("0" + now.getDate()).slice(-2);
		var month = ("0" + (now.getMonth() + 1)).slice(-2); 
		var today = now.getFullYear()+"-"+(month)+"-"+(day) ;
		$("input[type=date]").val(today);		
		//alert(prettyDate);
		//$('.input_sum').select();		
		$scope.flag_select=true;		
		$('input[name=helpsum]:hidden').val($scope.flag_select.toString());
		$('.input_sum').select();	
		//$(".keyboard .result").click();
	};
	
	//the same as this.init_sum	
	$scope.init_sum = function(){		
		tabs.setTab(5);
		$(".calc_area").css('z-index','999');
		$(".calc_area").css('position','relative');
		$(".input_sum").val($(".span_itra").text());
		//$rootScope.mezumanitra=	Math.round(parseFloat($(".span_itra").text()));
		$rootScope.mezumanitra=Math.round(parseFloat($(".span_itra").text())*10)/10;
		$("#mezuman_itra").val($rootScope.mezumanitra);	
		$(".mezuman .span_sum").text($rootScope.mezumanitra);			
			
		var now = new Date();		
		var day = ("0" + now.getDate()).slice(-2);
		var month = ("0" + (now.getMonth() + 1)).slice(-2); 
		var today = now.getFullYear()+"-"+(month)+"-"+(day) ;
		$("input[type=date]").val(today);		
		//alert(prettyDate);
		//$('.input_sum').select();		
		$scope.flag_select=true;		
		$('input[name=helpsum]:hidden').val($scope.flag_select.toString());
		$('.input_sum').select();	
	};
	//the same as this.init_sum	
	
	this.select = function(){	
		$('input[name=chequenumber]').select();
	};
	 
	var y="";
	var y2="";
	setInterval(function () {
		var x=$('textarea[name=ashray_f]').val();
		if(x==y&&x!=""){
			//$scope.call_alert_site(x,1,0);
			paym.check_end2('.ashray');
			$rootScope.add_type('.ashray_text','אשראי');
			$rootScope.checkend();
			
		}
		else{
			y=x;
		}
		
		//prepaid
		var x2=$('.prifeyd  .prepaid_num  ').val();
			if(x2==y2&&x2!=""&&$('.prifeyd  .prepaid_num ').val()!=""){
				$(".submit_prepaid").click();
				$('.prifeyd  .prepaid_num  ').val('');
				x2='';
				y2='';			
			}
			else{
				y2=x2;
			}
			//trans
			if(!$.isEmptyObject($scope.send_cashes)){
				tran=JSON.stringify($scope.send_cashes);
				$http.post('inc/transactions.php', $.param({
					stock : GetURLParameter.GetURLParameter('stock'),
					journal : journal,
					journal_id : journal_id,
					trans : tran, 
					cust : $rootScope.SearchClient['ID']
				}), {
					headers : {
						'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
					}				
				}).success(function(data) {
					$(".loading").hide();
					
					send_cashes={};
				}).error(function(){
					
				});
			}
	}, 500);
	
	this.check_end2 = function(str){
		
		if(str=='.mecholelsum_text'){
			if($(".amchaa_sum").val()==""||$("input[name=chequenumber]").val()==""||$("input[name=chequeaccountnumber]").val()==""||$("input[name=chequepaymentdat]").val()==""||$("input[name=chequebanknumber]").val()==""||$("input[name=chequebranch]").val()==""){
				return;
			}
		}
		if(str==".ashray_yadany"){
			if($(".ashray_numcard").val()==undefined||$(".ashray_tokef").val()==undefined||$(".ashray_cvv").val()==undefined
			||$(".ashray_numcard").val()==""||$(".ashray_tokef").val()==""||$(".ashray_cvv").val()==""){
				return;
			}
		}
		if(str==".ashray"){
			if($(".input_num.ashray_text").val()==""){
				if($(".ashray_numcard").val()==undefined||$(".ashray_tokef").val()==undefined||$(".ashray_cvv").val()==undefined
			||$(".ashray_numcard").val()==""||$(".ashray_tokef").val()==""||$(".ashray_cvv").val()==""){
				$scope.call_alert_site('נא העבר/י כרטיס אשראי או מלא פרטים ידנית',1,0);
			}
				return;
			}
		}
		if(1==1&&str!=".ashray"){
			if (($rootScope.itra <= 0 || $rootScope.mezumanitra <= 0)&&$rootScope.amount>0||($rootScope.amount<0&&$rootScope.itra==0)) {
				openwindows.openwrap2('checkend','.type_pay.container_pop');
			}
		  	else{
		  		openwindows.openwrap2('','.type_pay.container_pop');
		  	}
		}
	};
	//add payment each type
	$rootScope.add_type = function(str,type){
		$rootScope.right_pass=0;
		if(type=="אשראי ידני"){
			if($(".ashray_numcard").val()==undefined||$(".ashray_tokef").val()==undefined||$(".ashray_cvv").val()==undefined||
			$(".ashray_numcard").val()==""||$(".ashray_tokef").val()==""||$(".ashray_cvv").val()==""){
				$scope.call_alert_site('נא למלא את כל פרטי האשראי',1,0);
				return;
			}
			else{
				$(".loading").show();
				$scope.$apply();
			}
		}
		if(type=="אשראי"){
			if($("textarea[name=ashray_f]").val()==""&&
			($(".ashray_numcard").val()==""||$(".ashray_tokef").val()==undefined||$(".ashray_cvv").val()==undefined||
			$(".ashray_numcard").val()==""||$(".ashray_tokef").val()==""||$(".ashray_cvv").val()=="")){
				$scope.call_alert_site('נא העבר כרטיס אשראי',1,0);
				return;
			}
			else{
				$(".loading").show();
				$scope.$apply();
			}
		}
		if(type=="המחאה"){
			if($(".amchaa_sum").val()==""||$("input[name=chequenumber]").val()==""||$("input[name=chequeaccountnumber]").val()==""||$("input[name=chequepaymentdat]").val()==""||$("input[name=chequebanknumber]").val()==""||$("input[name=chequebranch]").val()==""){
				$scope.call_alert_site('נא למלא את כל פרטי ההמחאה',1,0);
				return;
			}
			else if ($('input[name=tashlumin]').val()!=""&&$('input[name=tashlumin]').val()>0){
				$scope.call_alert_site('נא בחר/י מסך חולל תשלומים',1,0);
				return;
			}
		}
		/*if(1==1||valid1(str)){
			if(parseFloat($(str).find('.input_sum').val())>=parseFloat($(str).find('.span_sum').text())){
				openwrap2('checkend','.type_pay.container_pop');
			}
		  	else{
		  	openwrap2('','.type_pay.container_pop');
		  	}
		}*/
		var is_done=true;
		$scope.valid=validate.valid();
		if(!$scope.valid){
			return false;
		}
		if($(str).val()!=''){
	    	switch (type) {
			    case 'מזומן': 	
			    $rootScope.mezumanitra2=$rootScope.mezumanitra;
			    $rootScope.mezumanitra=parseInt($rootScope.mezumanitra)-parseInt($('.mezuman_sum ').val());
			    var x=$scope.payments_type['cash'][0];
			    if(x==undefined){
			    	//if($rootScope.mezumanitra<0 && $rootScope.amount>0){
			    		  var pay=$(str).val();	
			    	//}
			    	//else{			    		
			    	//	 var pay=$rootScope.mezumanitra2;	
			    	//}
			    	
			    }	
			    else{
			    	 var pay=parseFloat(x['amount'])+parseFloat($(str).val());	
			    }
			    $rootScope.mezumanin1=parseFloat(pay).toFixed(2);      
			    $scope.payments_type['cash']=[{"type":'מזומן',"amount":pay}];	 	
			    paym.update_paid($(str).val());	
			    if($rootScope.transtype==1){
			    	$rootScope.finalltash['akafadebt']['cash']=(parseFloat($scope.finalltash['akafadebt']['cash'])+parseFloat($(str).val())) .toFixed(2); 
			    	$rootScope.finalltash['akafadebt']['general']=(parseFloat($scope.finalltash['akafadebt']['general'])+parseFloat($rootScope.finalltash['akafadebt']['cash'])) .toFixed(2);  
			    }
			    if($rootScope.amount>0){
			    	$rootScope.finalltash['cash1']['hova']=(parseFloat($scope.finalltash['cash1']['hova'])+parseFloat($(str).val())) .toFixed(2);  
			    }
			    else{
			    	$rootScope.finalltash['cash1']['zicuy']=((parseFloat($scope.finalltash['cash1']['zicuy'])+parseFloat($(str).val()))*-1) .toFixed(2);  
			    }
			    
			    $rootScope.finalltash['cash']=(parseFloat($scope.finalltash['cash'])+parseFloat($(str).val())) .toFixed(2);  
			    
			    $(".is_mezuman:hidden").val('1');
			     
			    break;
			    case 'המחאה':
			    var date_cheque=$('input[name=chequepaymentdat]').val();
			    date_cheque=date_cheque.split('/');
				var yy=date_cheque[2].substr(2,2);
				date_cheque=date_cheque[0]+date_cheque[1]+yy;
			    var x={"type":'המחאה',"amount":$(str).val(),"chequepaymentdate":date_cheque,"chequebanknumber":$('input[name=chequebanknumber]').val(),"chequebranch":$('input[name=chequebranch]').val(),"chequeaccountnumber":$('input[name=chequeaccountnumber]').val(),"chequenumber":$('input[name=chequenumber]').val()
			    ,"mecholel_firstsum":$('input[name=mecholel_firstsum]').val(),"mecholel_datefirst":$('input[name=mecholel_datefirst]').val(),"mecholel_numcheck":$('input[name=mecholel_numcheck]').val(),"mecholel_bank":$('input[name=mecholel_bank]').val(),"mecholel_snif":$('input[name=mecholel_snif]').val(),"mecholel_bill":$('input[name=mecholel_bill]').val()};
			    $scope.payments_type['cheque'].push(x);
			    paym.update_paid($(str).val());
			     if($rootScope.transtype==1){
			    	$rootScope.finalltash['akafadebt']['cheque']=(parseFloat($scope.finalltash['akafadebt']['cheque'])+parseFloat($(str).val())) .toFixed(2); 
			    	$rootScope.finalltash['akafadebt']['general']=(parseFloat($scope.finalltash['akafadebt']['general'])+parseFloat($rootScope.finalltash['akafadebt']['cheque'])) .toFixed(2); 
			    }
			    if($rootScope.amount>0){
			    	 $rootScope.finalltash['cheque1']['hova']=(parseFloat($scope.finalltash['cheque1']['hova'])+parseFloat($(str).val())) .toFixed(2); 
			    }
			    else{
			    	 $rootScope.finalltash['cheque1']['zicuy']=((parseFloat($scope.finalltash['cheque1']['zicuy'])+parseFloat($(str).val()))*-1) .toFixed(2); 
			    }
			    
			    $rootScope.finalltash['cheque']=(parseFloat($scope.finalltash['cheque'])+parseFloat($(str).val())) .toFixed(2); 
			    
			    
			  
			    break;
			   case 'אשראי':
			    /*$.ajax("inc/functions.php", {async: true})
					        .success(function(data){
					   		 	$(".loading").show();
						  	});	*/
			   $(".loading").show();
			  /* var x={"type":'אשראי',"amount":$(str).val(),"ashray_numcard":$('input[name=ashray_numcard]').val(),"ashray_tokef":$('input[name=ashray_tokef]').val(),"ashray_cvv":$('input[name=ashray_cvv]').val(),"ashray_tashlumim":$('input[name=ashray_tashlumim]').val(),
			   "optionsashray_tz":$('input[name=optionsashray_tz]').val(),"optionsashray_threenum":$('input[name=optionsashray_threenum]').val(),"optionsashray_currency":$('input[name=optionsashray_currency]').val(),"optionsashray_numishur":$('input[name=optionsashray_numishur]').val(),
			    "mecholel_firstsum":$('input[name=mecholel1_firstsum]').val(),"mecholel_datefirst":$('input[name=mecholel1_datefirst]').val(),"mecholel_numcheck":$('input[name=mecholel1_numcheck]').val(),"mecholel_bank":$('input[name=mecholel1_bank]').val(),"mecholel_snif":$('input[name=mecholel1_snif]').val(),"mecholel_bill":$('input[name=mecholel1_bill]').val()};
			    */
			   var sum_c=$(str).val();
			   $rootScope.sum_c=sum_c;
			   if(typeof window.external.print4 !="undefined"){
			   	 var num_c=$('textarea[name=ashray_f]').val().split(/\n/)[1];
			   }
			   else{
			   	 var num_c=$('textarea[name=ashray_f]').val();
			   }
			   $('textarea[name=ashray_f]').val("");	
			 var pay_num=$('input[name=ashray_f_num]').val();
			 var pay_first=$('input[name=ashray_f_first]').val();
			 var ashray_f_credit=$('input[name=ashray_f_credit]').val();
			 var ashray_numcard =$('input[name=ashray_numcard]').val();
			  var ashray_tokef =$('input[name=ashray_tokef]').val();
			   var ashray_cvv  =$('input[name=ashray_cvv]').val();
			    var ashray_tz =$('input[name=ashray_tz]').val();
			   var flag_ashray=0;
			 // "&ashray_numcard="+ashray_numcard+"&ashray_tokef="+ashray_tokef+"&ashray_cvv="+ashray_cvv+"&ashray_tz="+ashray_tz
				if(flag_ashray==1||1==1){	
									
				   $.ajax("inc/functions.php?amount="+sum_c+"&track2="+num_c+"&pay_num="+pay_num+"&pay_first="+pay_first+"&ashray_f_credit="+ashray_f_credit+"&ashray_numcard="+ashray_numcard+"&ashray_tokef="+ashray_tokef+"&ashray_cvv="+ashray_cvv+"&ashray_tz="+ashray_tz+"&ApprovalNumber="+$("input[name=aproval_num_f]").val(), {async: true})
					        .success(function(data){
			   		 	if(data.indexOf("error")<0){
			   		 		
			   		 		data_arr=JSON.parse(data);
			   		 		 var x={"type":'אשראי',"amount":sum_c,"pay_first":pay_first, "pay_num":pay_num,"ashray_numcard":data_arr['cardNumber'],"ashray_tokef":data_arr['cardExpirationDate'],"creditbrand":data_arr['cardBrand'],"approvalNumber":data_arr['voucherNumber'],"clearinghouseCompany":data_arr['clearinghouseCompany'],"ashray_f_credit":ashray_f_credit}; 
			   		 		   $rootScope.finalltash.credit2[data_arr['clearinghouseCompany']][data_arr['transactionType']]++;
			   		 		  	localStorage.setItem('finalltash',JSON.stringify($rootScope.finalltash));
			   		 		   $scope.payments_type['credit'].push(x);
			   		 			paym.update_paid(sum_c);		
			   		 		   // openwindows.openwrap2('','.type_pay.container_pop')
			   		 		   if($rootScope.itra>0){
			   		 		   		openwindows.openwrap2('','.type_pay.container_pop');
			   		 		   }
			   		 		   else{
			   		 		   		openwindows.openwrap2('checkend','.type_pay.container_pop');			   		 		   	
			   		 		   }			   		 		   
							  	//$scope.call_alert_site("האשראי העבר בהצלחה",1,'on');

						}
			   		 	else{
			   		 		if(data.indexOf("התקשר")<0){
				   		 		data=data.replace("error","");
				   		 		$scope.call_alert_site(data,1,'on');	
				   		 		$('textarea[name=ashray_f]').val("");	
			   		 		}   
			   		 		else{
			   		 			str2="inc/functions.php?amount="+sum_c+"&track2="+num_c+"&pay_num="+pay_num+"&pay_first="+pay_first+"&ashray_f_credit="+ashray_f_credit+"&ashray_numcard="+ashray_numcard+"&ashray_tokef="+ashray_tokef+"&ashray_cvv="+ashray_cvv+"&ashray_tz="+ashray_tz;
			   		 		$("input[name=credit_approval_details]").val(str2);
			   		 		openwindows.openwrap2('','.credit_approval.container_pop');
			   		 		$(".loading").hide();
			   		 			$scope.init_sum2()
			   		 		}	
			   		 		 		
			   		 	}
			   		 	if (($rootScope.itra <= 0 || $rootScope.mezumanitra <= 0)&&$rootScope.amount>0||($rootScope.amount<0&&$rootScope.itra==0)) {
			   		 			$(".loading").hide();
								openwrap2('checkend', '.type_pay.container_pop');
								$rootScope.end_cash(0);
							}	
			   		 	$(".ashray_text").val("");
			   		 	$(".loading").hide();
				  	});	
			  }
			  else{
			  	$scope.call_alert_site("האשראי לא תקין",1,'on');
			  	$('textarea[name=ashray_f]').val("");
			  }
			  /* var x={"type":'אשראי',"amount":$(str).val(),"ashray_numcard":$('input[name=ashray_numcard]').val()};
			   
			   $scope.payments_type['credit'].push(x);
			  
			    
			    paym.update_paid($(str).val());
			     if($rootScope.transtype==1){
			    	$rootScope.finalltash['akafadebt']['credit']=(parseFloat($scope.finalltash['akafadebt']['credit'])+parseFloat($(str).val())) .toFixed(2);
			    	$rootScope.finalltash['akafadebt']['general']=(parseFloat($scope.finalltash['akafadebt']['general'])+parseFloat($rootScope.finalltash['akafadebt']['credit'])) .toFixed(2); 	 	 	
			    }
			   if($rootScope.amount>0){
			    	 $rootScope.finalltash['credit1']['hova']=(parseFloat($scope.finalltash['credit1']['hova'])+parseFloat($(str).val())) .toFixed(2); 
			    }
			    else{
			    	 $rootScope.finalltash['credit1']['zicuy']=((parseFloat($scope.finalltash['credit1']['zicuy'])+parseFloat($(str).val()))*-1) .toFixed(2); 
			    }
			    $rootScope.finalltash['credit']=(parseFloat($scope.finalltash['credit'])+parseFloat($(str).val())) .toFixed(2); 	 	
			    
			       */
			   break;
			    case 'אשראי2':
			   //  var sum_c=$(str).val();
			   var sum_c=$rootScope.sum_c;
			   var ashray_f_credit=$('input[name=ashray_f_credit]').val();
			     $.ajax($("input[name=credit_approval_details]").val()+"&ApprovalNumber="+$("input[name=credit_approval_num]").val(), {async: true})
			     
					        .success(function(data){
			   		 	if(data.indexOf("error")<0){
			   		 		data_arr=JSON.parse(data);
			   		 		 var x={"type":'אשראי',"amount":data_arr['amount'],"pay_first":data_arr['firstPaymentAmount'], "pay_num":data_arr['numberOfPayments'],"ashray_numcard":data_arr['cardNumber'],"ashray_tokef":data_arr['cardExpirationDate'],"creditbrand":data_arr['cardBrand'],"approvalNumber":data_arr['voucherNumber'],"clearinghouseCompany":data_arr['clearinghouseCompany'],"ashray_f_credit":ashray_f_credit}; 
			   		 		   $scope.payments_type['credit'].push(x);
			   		 			paym.update_paid(sum_c);		
			   		 		   // openwindows.openwrap2('','.type_pay.container_pop')
			   		 		   if($rootScope.itra>0){
			   		 		   		openwindows.openwrap2('','.type_pay.container_pop');
			   		 		   }
			   		 		   else{
			   		 		   		openwindows.openwrap2('checkend','.type_pay.container_pop');			   		 		   	
			   		 		   }			   		 		   
							  	//$scope.call_alert_site("האשראי העבר בהצלחה",1,'on');

						}
			   		 	else{
			   		 		if(data.indexOf("התקשר")<0){
				   		 		data=data.replace("error","");
				   		 		$scope.call_alert_site(data,1,'on');	
				   		 		$('textarea[name=ashray_f]').val("");	
			   		 		}   
			   		 		else{
			   		 			str2="inc/functions.php?amount="+sum_c+"&track2="+num_c+"&pay_num="+pay_num+"&pay_first="+pay_first+"&ashray_f_credit="+ashray_f_credit+"&ashray_numcard="+ashray_numcard+"&ashray_tokef="+ashray_tokef+"&ashray_cvv="+ashray_cvv+"&ashray_tz="+ashray_tz;
			   		 			$("input[name=credit_approval_details]").val(str2);
			   		 			openwindows.openwrap2('','.credit_approval.container_pop');
			   		 			$scope.init_sum2()
			   		 			
			   		 		}		 		
			   		 	}
			   		 	$(".ashray_text").val("");
			   		 	$(".loading").hide();
			   		 	if (($rootScope.itra <= 0 || $rootScope.mezumanitra <= 0)&&$rootScope.amount>0||($rootScope.amount<0&&$rootScope.itra==0)) {
							openwrap2('checkend', '.type_pay.container_pop');
							$rootScope.end_cash(0);
						}
				  	});	
			    
			    break;
			   case 'אשראי ידני':
			    var sum_c=$(str).val();
			   if(typeof window.external.print4 !="undefined"){
			   	 var num_c=$('textarea[name=ashray_f]').val().split(/\n/)[1]
			   	 $rootScope.sum_c=sum_c;
			   }
			   else{
			   	 var num_c=$('textarea[name=ashray_f]').val();
			   }
			 var pay_num=$('input[name=ashray_f_num]').val();
			 var pay_first=$('input[name=ashray_f_first]').val();
			 var ashray_f_credit=$('input[name=ashray_f_credit]').val();
			   var x={"type":'אשראי',"amount":$(str).val(),"ashray_numcard":$('input[name=ashray_numcard]').val(),"ashray_tokef":$('input[name=ashray_tokef]').val(),"ashray_cvv":$('input[name=ashray_cvv]').val(),"ashray_tashlumim":$('input[name=ashray_tashlumim]').val(),
			   "optionsashray_tz":$('input[name=optionsashray_tz]').val(),"optionsashray_threenum":$('input[name=optionsashray_threenum]').val(),"optionsashray_currency":$('input[name=optionsashray_currency]').val(),"optionsashray_numishur":$('input[name=optionsashray_numishur]').val(),
			    "mecholel_firstsum":$('input[name=mecholel1_firstsum]').val(),"mecholel_datefirst":$('input[name=mecholel1_datefirst]').val(),"mecholel_numcheck":$('input[name=mecholel1_numcheck]').val(),"mecholel_bank":$('input[name=mecholel1_bank]').val(),"mecholel_snif":$('input[name=mecholel1_snif]').val(),"mecholel_bill":$('input[name=mecholel1_bill]').val()};
			  //  $scope.payments_type['credit'].push(x);
			      var myJsonString = JSON.stringify(x);
			    //  amount="+sum_c+"&track2="+num_c+"&pay_num="+pay_num+"&pay_first="+pay_first+"&ashray_f_credit="+ashray_f_credit
			      $.ajax("inc/functions.php?credit="+myJsonString+"amount="+sum_c+"&track2="+num_c+"&pay_num="+pay_num+"&pay_first="+pay_first+"&ashray_f_credit="+ashray_f_credit, {async: true})
					        .success(function(data){
			   		 	if(data!="error"){
			   		 		$scope.call_alert_site(data,1,'on');
			   		 		data_arr=JSON.parse(data);
			   		 		 var x={"type":'אשראי',"amount":sum_c,"pay_first":pay_first, "pay_num":pay_num,"ashray_numcard":data_arr['cardNumber'],"ashray_tokef":data_arr['cardExpirationDate'],"creditbrand":data_arr['cardBrand'],"approvalNumber":data_arr['voucherNumber'],"clearinghouseCompany":data_arr['clearinghouseCompany'],"ashray_f_credit":ashray_f_credit}; 
			   		 		   $scope.payments_type['credit'].push(x);
			   		 			paym.update_paid(sum_c);		
			   		 		   // openwindows.openwrap2('','.type_pay.container_pop')
			   		 		   if($rootScope.itra>0){
			   		 		   		openwindows.openwrap2('','.type_pay.container_pop');
			   		 		   }
			   		 		   else{
			   		 		   		openwindows.openwrap2('checkend','.type_pay.container_pop');			   		 		   	
			   		 		   }			   		 		   
							  	//$scope.call_alert_site("האשראי העבר בהצלחה",1,'on');

						}
			   		 	else{
			   		 		$scope.call_alert_site("האשראי לא תקין",1,'on');
			   		 		$('textarea[name=ashray_f]').val("");		   		 		
			   		 	}
			   		 	$(".ashray_text").val("");
			   		 	$(".loading").hide();
			   		 	if (($rootScope.itra <= 0 || $rootScope.mezumanitra <= 0)&&$rootScope.amount>0||($rootScope.amount<0&&$rootScope.itra==0)) {
							openwrap2('checkend', '.type_pay.container_pop');
							$rootScope.end_cash(0);
						}
				  	});	
			  /*  $.ajax("inc/functions.php?credit="+myJsonString, {async: false})
				        .success(function (data) { 
				          alert(data);
					   		 	
				      });
			    paym.update_paid($(str).val());
			     if($rootScope.transtype==1){
			    	$rootScope.finalltash['akafadebt']['credit']=(parseFloat($scope.finalltash['akafadebt']['credit'])+parseFloat($(str).val())) .toFixed(2);
			    	$rootScope.finalltash['akafadebt']['general']=(parseFloat($scope.finalltash['akafadebt']['general'])+parseFloat($rootScope.finalltash['akafadebt']['credit'])) .toFixed(2); 	 	 	
			    }
			   if($rootScope.amount>0){
			    	 $rootScope.finalltash['credit1']['hova']=(parseFloat($scope.finalltash['credit1']['hova'])+parseFloat($(str).val())) .toFixed(2); 
			    }
			    else{
			    	 $rootScope.finalltash['credit1']['zicuy']=((parseFloat($scope.finalltash['credit1']['zicuy'])+parseFloat($(str).val()))*-1) .toFixed(2); 
			    }
			    $rootScope.finalltash['credit']=(parseFloat($scope.finalltash['credit'])+parseFloat($(str).val())) .toFixed(2); 	 	
			    
			       */
			   break;
			   case 'הקפה':
			   var x={"type":'הקפה',"amount":$(str).val()};
			    $scope.payments_type['akafa']=[x];
			    paym.update_paid($(str).val());	 
			     if($rootScope.transtype!=1){
			    		$rootScope.finalltash['akafa']=(parseFloat($scope.finalltash['akafa'])+parseFloat($(str).val())).toFixed(2); 		
			    }
			   break;
			   case 'שובר':
			   var x={"type":'שובר',"amount":$(str).val(),"shovar_num":$('input[name=shovar_num]').val()};
			    $scope.payments_type['shovar'].push(x);
			    paym.update_paid($(str).val());	 	
			     if($rootScope.transtype==1){
			    	$rootScope.finalltash['akafadebt']['shovar']=(parseFloat($scope.finalltash['akafadebt']['shovar'])+parseFloat($(str).val())) .toFixed(2);
			    	$rootScope.finalltash['akafadebt']['general']=(parseFloat($scope.finalltash['akafadebt']['general'])+parseFloat($rootScope.finalltash['akafadebt']['shovar'])) .toFixed(2); 	
			    }
			    if($rootScope.amount>0){
			    	 $rootScope.finalltash['shovar1']['hova']=(parseFloat($scope.finalltash['shovar1']['hova'])+parseFloat($(str).val())) .toFixed(2); 
			    }
			    else{
			    	 $rootScope.finalltash['shovar1']['zicuy']=((parseFloat($scope.finalltash['shovar1']['zicuy'])+parseFloat($(str).val()))*-1) .toFixed(2); 
			    }	
			    $rootScope.finalltash['shovar']=(parseFloat($scope.finalltash['shovar'])+parseFloat($(str).val())) .toFixed(2); 
			    
			    break;
			   
			    case 'שובר זיכוי':
			   
			    
			    var is_exit=1;
			    if($(str).val()>0){
			    	
			    	 $.ajax("inc/functions.php?check_shovar_num="+$('input[name=shovarzicuy_num]').val(), {async: false})
				        .success(function (data) {
				          is_exit=data;
					   		 	
				      });
				       
				    	if(is_exit!=0){
				    		  
				    				if(parseFloat(is_exit)>parseFloat($(str).val())){
				    					sum=is_exit;
				    					$rootScope.another_shovar=parseFloat(is_exit)-parseFloat($(str).val());
				    				}
				    				else{
				    					sum=is_exit;
				    					//$rootScope.another_shovar=parseFloat(is_exit)-parseFloat($(str).val());
				    				}
								  	var x={"type":'שובר זיכוי',"amount":sum,"shovarzicuy_num":$('input[name=shovarzicuy_num]').val()};
									    $scope.payments_type['shovarzicuy'].push(x);
									    
									    paym.update_paid(sum);	
									  
									     if($rootScope.transtype==1){
									    	$rootScope.finalltash['akafadebt']['shovarzicuy']=(parseFloat($scope.finalltash['akafadebt']['shovarzicuy'])+parseFloat(sum)) .toFixed(2);
									    	$rootScope.finalltash['akafadebt']['general']=(parseFloat($scope.finalltash['akafadebt']['general'])+parseFloat($rootScope.finalltash['akafadebt']['shovarzicuy'])) .toFixed(2); 	
									    }
									     
										$rootScope.finalltash['shovarzicuy1']['hova']=(parseFloat($scope.finalltash['shovarzicuy1']['hova'])+parseFloat(sum)) .toFixed(2); 							   
									    $rootScope.finalltash['shovarzicuy']=(parseFloat($scope.finalltash['shovarzicuy'])+parseFloat(sum)) .toFixed(2); 
									    $rootScope.finalltash['all']=(parseFloat( $rootScope.finalltash['all'])+parseFloat(sum)) .toFixed(2); 
									    
									    if($rootScope.itra<0){
									    	$rootScope.amount=sum;
									    		
									    	var item=$rootScope.cash_kupanum;
									    	 	
											var x=9-parseInt(item.toString().length);
											
								        	for (var i=0; i < x; i++) {
											 	item="0"+item.toString();
											};
									    	 var x={"type":'שובר זיכוי',"amount":$rootScope.itra,"shovarzicuy_num":item};
									    	
										    $scope.payments_type['shovarzicuy'].push(x);
										    paym.update_paid($rootScope.itra);	 	
										     if($rootScope.transtype==1){
										    	$rootScope.finalltash['akafadebt']['shovarzicuy']=(parseFloat($scope.finalltash['akafadebt']['shovarzicuy'])+parseFloat($(str).val())) .toFixed(2);
										    	$rootScope.finalltash['akafadebt']['general']=(parseFloat($scope.finalltash['akafadebt']['general'])+parseFloat($rootScope.finalltash['akafadebt']['shovarzicuy'])) .toFixed(2); 	
										    }								   
										    $rootScope.finalltash['shovarzicuy']=(parseFloat($scope.finalltash['shovarzicuy'])+parseFloat($(str).val())) .toFixed(2); 
								
											$rootScope.finalltash['shovarzicuy1']['zicuy']=((parseFloat($scope.finalltash['shovarzicuy1']['zicuy'])+parseFloat($(str).val()))*-1) .toFixed(2); 
									    }
									    else{
									    	if($rootScope.itra>0){
									    		openwindows.openwrap2('','.type_pay.container_pop');
									    	}
									    }
						}
						else{
						  			is_done=false;
						  			$scope.call_alert_site(' שובר  אינו תקין',1,0);
						}   	 
			    }
			    else{
			    	 
			    		 var x={"type":'שובר זיכוי',"amount":$(str).val(),"shovarzicuy_num":$('input[name=shovarzicuy_num]').val()};
								    $scope.payments_type['shovarzicuy'].push(x);
								   
								    paym.update_paid($(str).val());	 	
								    
								     if($rootScope.transtype==1){
								    	$rootScope.finalltash['akafadebt']['shovarzicuy']=(parseFloat($scope.finalltash['akafadebt']['shovarzicuy'])+parseFloat($(str).val())) .toFixed(2);
								    	$rootScope.finalltash['akafadebt']['general']=(parseFloat($scope.finalltash['akafadebt']['general'])+parseFloat($rootScope.finalltash['akafadebt']['shovarzicuy'])) .toFixed(2); 	
								    }	
								     
								      
								    			   
								    $rootScope.finalltash['shovarzicuy']=(parseFloat($scope.finalltash['shovarzicuy'])+parseFloat($(str).val())).toFixed(2); 
								     
							
						$rootScope.finalltash['shovarzicuy1']['zicuy']=((parseFloat($scope.finalltash['shovarzicuy1']['zicuy'])+parseFloat($(str).val()))*-1).toFixed(2);  
	
			    }
			    
			   break;
			    case 'פריפייד':
			  // var x={"type":'פריפייד',"amount":$(str).val()};
			   var sum_p=$('.prifeyd  .prepaid_sum').val();
			   var sum_flag=sum_p;
			   var num_p=$('.prifeyd  .prepaid_num').val();
			   flag=0;
			   for (i=0;i<$scope.payments_type['prepaid'].length;i++){
			   	if($scope.payments_type['prepaid'][i].prepaid_num==num_p){
			   		sum_p=parseFloat(sum_p)+parseFloat($scope.payments_type['prepaid'][i].amount);
			   		flag=1;
			   	}
			   }
			   $.post( "inc/functions.php", { prepaid_sum: sum_p, prepaid_num: num_p},{async: true})
				  .done(function( data ) {
				    	if(data==""){
				    	$scope.call_alert_site("כרטיס מתנה לא תקין",1,'on');	
				    }
		   		 	else if(parseFloat(data)>0){
		   		 		if(flag==1){
		   		 			f=0;
		   		 			for (i=0;i<$scope.payments_type['prepaid'].length;i++){
							   	if($scope.payments_type['prepaid'][i].prepaid_num==num_p){
							   		f=$scope.payments_type['prepaid'][i].amount;
							   		$scope.payments_type['prepaid'][i].amount=data;
							   		flag=1;
							   	}
							   }
								paym.update_paid(data-f);	
		   		 		}
		   		 		else{
		   		 			var x={"type":'פריפייד',"amount":data,"prepaid_num":num_p};
		   		 		   $scope.payments_type['prepaid'].push(x);
		   		 		   paym.update_paid(data);		
		   		 		}
		   		 		 
		   		 			
		   		 		   // openwindows.openwrap2('','.type_pay.container_pop')
		   		 		   if($rootScope.itra>0){
		   		 		   	openwindows.openwrap2('','.type_pay.container_pop');
		   		 		   }
		   		 		   else{
		   		 		   	openwindows.openwrap2('checkend','.type_pay.container_pop');
		   		 		   	
		   		 		   }
		   		 		    /*if(parseFloat($(".prifeyd").find('.input_sum').val())>=parseFloat($(".prifeyd").find('.span_sum').text())){
							 openwindows.openwrap2('checkend','.type_pay.container_pop');
							}
						  	else{
						  	 openwindows.openwrap2('','.type_pay.container_pop');
						  	}*/
					}
		   		 	else if(parseFloat(data)==0){
		   		 		$scope.call_alert_site("אין יתרה בכרטיס",1,'on');	   
		   		 	}
		   		 	else{
		   		 		$scope.call_alert_site("אין יתרה בכרטיס",1,'on');	   		 		
		   		 	}
		   		 	local.setLocal('payment',$scope.payments_type);
		   		 	$scope.$apply();
		   		 	if($rootScope.itra<=0){
		   		 		$(".prepaid_num,.prepaid_sum").val("");
						openwindows.openwrap2('checkend','.type_pay.container_pop');
						$rootScope.end_cash(0);
					}
				  });
				  
				  
			    /* $.ajax("inc/functions.php?prepaid_sum="+sum_p+"&prepaid_num="+num_p, {async: false})
				        .success(function(data){
				    if(data==""){
				    	$scope.call_alert_site("כרטיס מתנה לא תקין",1,'on');	
				    }
		   		 	else if(data>0){
		   		 		if(flag==1){
		   		 			f=0;
		   		 			for (i=0;i<$scope.payments_type['prepaid'].length;i++){
							   	if($scope.payments_type['prepaid'][i].prepaid_num==num_p){
							   		f=$scope.payments_type['prepaid'][i].amount;
							   		$scope.payments_type['prepaid'][i].amount=data;
							   		flag=1;
							   	}
							   }
								paym.update_paid(data-f);	
		   		 		}
		   		 		else{
		   		 			var x={"type":'פריפייד',"amount":data,"prepaid_num":num_p};
		   		 		   $scope.payments_type['prepaid'].push(x);
		   		 		   paym.update_paid(data);		
		   		 		}
		   		 		 
		   		 			
		   		 		   // openwindows.openwrap2('','.type_pay.container_pop')
		   		 		   if($rootScope.itra>0){
		   		 		   	openwindows.openwrap2('','.type_pay.container_pop');
		   		 		   }
		   		 		   else{
		   		 		   	openwindows.openwrap2('checkend','.type_pay.container_pop');
		   		 		   	
		   		 		   }
		   		 		    /*if(parseFloat($(".prifeyd").find('.input_sum').val())>=parseFloat($(".prifeyd").find('.span_sum').text())){
							 openwindows.openwrap2('checkend','.type_pay.container_pop');
							}
						  	else{
						  	 openwindows.openwrap2('','.type_pay.container_pop');
						  	}*/
					/*}
		   		 	if(data==0){
		   		 		$scope.call_alert_site("אין יתרה בכרטיס",1,'on');	   
		   		 	}
		   		 	else{
		   		 		$scope.call_alert_site("אין יתרה בכרטיס",1,'on');	   		 		
		   		 	}
			  	});	
			 */
			   
			    /*if($rootScope.transtype==1){
			    	$rootScope.finalltash['akafa']['prepaid']=(parseFloat($scope.finalltash['akafa']['prepaid'])+parseFloat($(str).val())) .toFixed(2); 
			    	$rootScope.finalltash['akafa']['general']=(parseFloat($scope.finalltash['akafa']['general'])+parseFloat($rootScope.finalltash['akafa']['prepaid'])) .toFixed(2); 		 
			    }
			    else{
			    	$rootScope.finalltash['prepaid']=(parseFloat($scope.finalltash['prepaid'])+parseFloat($(str).val())) .toFixed(2); 		 
			    }*/
			      
			   break;
			   
			}
			if(type!="הקפה"&&type!="פריפייד"&&type!='שובר זיכוי'){
				$rootScope.finalltash['all']=(parseFloat( $rootScope.finalltash['all'])+parseFloat($(str).val())) .toFixed(2); 	
			}
			if(is_done&&!(str.indexOf('ashray')>-1)){
				$scope.$apply();
				local.setLocal('payment',$scope.payments_type);
				local.setLocal('finalltash',$scope.finalltash);
				$('.popup_pay  input[type=text]').val('');
				/*if($rootScope.itra<=0){
					
				}*/
			}
			
		}
		else {
			if(type=='מזומן'){
				//this.remove_item('cash',0);
				var type='cash';
				var index=0;
				$rootScope.cash_amount_help=0;	
				$scope.payments_type[type].splice(index, 1);
				local.setLocal('payment',$scope.payments_type);	 
			}
			/*if(type=='הקפה'){
				this.remove_item('akafa',0);
			}*/
		}

    };
    $scope.call_alert_site = function(msg,type,index_onoff) {
         alert.alert_site(msg,type,index_onoff);
    }
    $scope.call_alert_cancel = function() {
         alert.alert_cancel();
    }
    /*this.cholel = function(){
		if($('input[name=mecholel_firstsum]').val()!=''&&$('input[name=mecholel_firstsum]').val()!=undefined){
			amount=$('input[name=mecholel_firstsum]').val();
			var x={"type":'המחאה',"amount":amount,"chequepaymentdat":$('input[name=chequepaymentdat]').val(),"chequebanknumber":$('input[name=chequebanknumber]').val(),"chequebranch":$('input[name=chequebranch]').val(),"chequeaccountnumber":$('input[name=chequeaccountnumber]').val(),"chequenumber":$('input[name=chequenumber]').val()
		    ,"mecholel_firstsum":$('input[name=mecholel_firstsum]').val(),"mecholel_datefirst":$('input[name=mecholel_datefirst]').val(),"mecholel_numcheck":$('input[name=mecholel_numcheck]').val(),"mecholel_bank":$('input[name=mecholel_bank]').val(),"mecholel_snif":$('input[name=mecholel_snif]').val(),"mecholel_bill":$('input[name=mecholel_bill]').val()};
		 	$scope.payments_type['cheque'].push(x);
		}
		amount=$('input[name=mecholel_secsum]').val();
		for (var i=0; i < $('input[name=mecholel_numtash]').val(); i++) {
		  	 var x={"type":'המחאה',"amount":amount,"chequepaymentdat":$('input[name=chequepaymentdat]').val(),"chequebanknumber":$('input[name=chequebanknumber]').val(),"chequebranch":$('input[name=chequebranch]').val(),"chequeaccountnumber":$('input[name=chequeaccountnumber]').val(),"chequenumber":$('input[name=chequenumber]').val()
			    ,"mecholel_firstsum":$('input[name=mecholel_firstsum]').val(),"mecholel_datefirst":$('input[name=mecholel_datefirst]').val(),"mecholel_numcheck":$('input[name=mecholel_numcheck]').val(),"mecholel_bank":$('input[name=mecholel_bank]').val(),"mecholel_snif":$('input[name=mecholel_snif]').val(),"mecholel_bill":$('input[name=mecholel_bill]').val()};
			 $scope.payments_type['cheque'].push(x);
		};
    	
		    
		 paym.update_paid($('.mecholelsum_text').val());
    };*/

   this.cholel2 = function(){
		var num=$("input[name=tashlumin]").val();
		var amount_general=0;
		for (var i=0; i < num; i++) {
			var date_cheque=$('input[name=mecholel_date_'+i+']').val();
		    date_cheque=date_cheque.split('/');
			var yy=date_cheque[2].substr(2,2);
			var dd=date_cheque[0];
			if(dd.length==1){
				dd='0'+dd;
			}
			var mm=date_cheque[1];
			if(mm.length==1){
				mm='0'+mm;
			}
			date_cheque=dd+mm+yy;
			
		  	 var x={"type":'המחאה',"amount":$('input[name=mecholel_amount_'+i+']').val(),"chequepaymentdate":date_cheque,"chequenumber":$('input[name=mecholel_numcheck_'+i+']').val(),"chequebanknumber":$('input[name=mecholel_bank_'+i+']').val(),"chequebranch":$('input[name=mecholel_snif_'+i+']').val(),"chequeaccountnumber":$('input[name=mecholel_bill_'+i+']').val()};
			 $scope.payments_type['cheque'].push(x);
			 amount_general+=parseFloat($('input[name=mecholel_amount_'+i+']').val());			
		};
	  	paym.update_paid(amount_general);
		  if($rootScope.transtype==1){
	    	$rootScope.finalltash['akafadebt']['cheque']=(parseFloat($scope.finalltash['akafadebt']['cheque'])+parseFloat($(str).val())) .toFixed(2); 
	    	$rootScope.finalltash['akafadebt']['general']=(parseFloat($scope.finalltash['akafadebt']['general'])+parseFloat($rootScope.finalltash['akafadebt']['cheque'])) .toFixed(2); 
	    }
	    if($rootScope.amount>0){
	    	 $rootScope.finalltash['cheque1']['hova']=(parseFloat($scope.finalltash['cheque1']['hova'])+parseFloat($(str).val())) .toFixed(2); 
	    }
	    else{
	    	 $rootScope.finalltash['cheque1']['zicuy']=((parseFloat($scope.finalltash['cheque1']['zicuy'])+parseFloat($(str).val()))*-1) .toFixed(2); 
	    }
	    
	    $rootScope.finalltash['cheque']=(parseFloat($scope.finalltash['cheque'])+parseFloat($(str).val())) .toFixed(2); 
			    
			    
		 $scope.$apply();
		local.setLocal('payment',$scope.payments_type);
		local.setLocal('finalltash',$scope.finalltash);
		$('.popup_pay  input[type=text]').val('');
		 paym.check_end2('mecholel');
		 $rootScope.checkend();
    };
    
    $scope.start_tashlumim=function(){
    	if($("input[name=chequenumber]").val()!=""&&$("input[name=chequebanknumber]").val()!=""&&$("input[name=chequebranch]").val()!=""&&$("input[name=chequeaccountnumber]").val()!=""&&$("input[name=tashlumin]").val()!=""){
    		$(".cholel_tbl .mecholel_details").remove();
    		
    		var amount=$(".amchaa_sum ").val();
			var num=$("input[name=tashlumin]").val();
			var amount_d=(parseFloat(amount)/parseFloat(num)).toFixed(2);
			var amount_last=(parseFloat(amount)-(parseFloat(amount_d)*(parseFloat(num)-1))).toFixed(2);
			
			var chequenumber=$("input[name=chequenumber]").val();
			var chequebanknumber=$("input[name=chequebanknumber]").val();
			var chequebranch=$("input[name=chequebranch]").val();
			var chequeaccountnumber=$("input[name=chequeaccountnumber]").val();

			var today = new Date();
		    var dd = today.getDate();
		    var mm = today.getMonth()+1; //January is 0!		
		    var yyyy = today.getFullYear();
		    if(dd<10){
		        dd='0'+dd
		    } 
		    if(mm<10){
		        mm='0'+mm
		    } 
		    var today = dd+'/'+mm+'/'+yyyy;
		    
			  for (var i=0; i < num; i++) { 
			  	mm++;
				if(mm==13){
					mm=1;
					yyyy++;
				}
				today = dd+'/'+mm+'/'+yyyy;
				id="mecholel_line"+i;	
				if((i+1)==num){
					amount_d=amount_last;
				}
			    $(".cholel_tbl").append('<tr  class="mecholel_details"><td><input type="text" name="mecholel_numcheck_'+i+'" class="mecholel_numcheck_'+i+'"  value="'+chequenumber+'"/></td><td><input type="text" id='+id+' name="mecholel_date_'+i+'"  class="mecholel_date"  value="'+today+'"/></td><td><input type="text" name="mecholel_bank_'+i+'"  class="mecholel_bank_'+i+'"  value="'+chequebanknumber+'"/></td>'+
			    						'<td><input type="text" name="mecholel_bill_'+i+'" class="mecholel_bill_'+i+'"  value="'+chequeaccountnumber+'"/></td><td><input type="text" name="mecholel_snif_'+i+'" class="mecholel_snif_'+i+'"  value="'+chequebranch+'"/></td><td><input type="text" class="mecholel_amount" name="mecholel_amount_'+i+'" class="mecholel_amount_'+i+'" value="'+amount_d+'"/></td></tr>');
				
				var date = new Date();
		        var year = date.getFullYear();
		        $.datepicker.setDefaults({
		            changeMonth: true,// show months list
		            changeYear: true, // show years list
		            yearRange: "1930:" + year // set years list range
		        });
		
		        // set Hebrew calendar
		        $( "#"+id ).datepicker($.datepicker.regional["he"]);
				chequenumber++;
				
			};
			
			
				openwindows.openwrap2('','.mecholel_amchaa2.container_pop');
				this.init_sum();
			}
			else{
				$scope.call_alert_site('נא למלא את כל הנתונים',0,0);
			}
			
			
			
    };
    this.calc1 = function(sum){
		var x=$('.mezuman_sum').val();
		if(x==""){
			x=0;
		}
		if(sum==""){
			sum=0;
		}
		if($scope.flag_select){
			$scope.flag_select=false;
			$('input[name=helpsum]:hidden').val($scope.flag_select.toString());
			x=sum;
		}
		else{
			x= (parseFloat(x)+parseFloat(sum)).toFixed(2);
		}
		
		$('.mezuman_sum').val(x);
		var itrazmani=parseFloat($(".mezumzn .span_sum").text())-parseFloat(x);
		$(".mezumzn .span_sum").text(itrazmani);
		/*if($rootScope.cash_amount_help>0)
			paym.update_paid( parseFloat($rootScope.cash_amount_help)*-1);*/ 
		//paym.update_paid(x); 

		/*paym.update_paid(parseFloat(x)-$rootScope.cash_amount_help);
				$rootScope.cash_amount_help=x; */
	};
	this.calc2 = function(sum){
		var x=toFixed(2);($('.mezuman_sum').val().toFixed(2));
		if(x==""||x==undefined){
			x=0;
		}
		if(sum==""||sum==undefined){
			sum=0;
		}
		if($scope.flag_select){
			$scope.flag_select=false;
			$('input[name=helpsum]:hidden').val($scope.flag_select.toString());
		}
		$('.mezuman_sum').val(x);
		/*if($rootScope.cash_amount_help>0)
			paym.update_paid( parseFloat($rootScope.cash_amount_help)*-1);*/ 
		//paym.update_paid(x); 
		//$rootScope.cash_amount_help+=x; 
		/*if(1==1||sum!=0){
			paym.update_paid(parseFloat(x)-$rootScope.cash_amount_help);
		}
		$rootScope.cash_amount_help=x;*/
	};
	this.calc3 = function(){ 
		if($(".popup_pay ").css("display")=="block"||$(".pop_anacha ").css("display")=="block"){
			var x=$('.input_result input[name=Input]').val();
			if(x==""||x==undefined||isNaN(x)){
				x=0;
			}
			else{
				var t=$('input[name=flag_focused]:hidden').val();
				$(t).val(x);
			}
			//if($(".container_pop.amchaa").css('display'))
			$(".container_pop.display .input_sum ").val(x)
			//$('.mezuman_sum').val(x);
			/*if(1==1||sum!=0){
				paym.update_paid(parseFloat(x)-$rootScope.cash_amount_help);
			}
			$rootScope.cash_amount_help=x;*/
			$('.input_result input[name=Input]').val('');
			if($(".amchaa").css("display")=="block"){
				$(t).next().focus();
			}
		}
		
	};
	this.remove_item = function(type,index){
		paym.update_paid(($scope.payments_type[type][index].amount*-1));
		if(type=='cash'){
			$rootScope.cash_amount_help=0;
			 $rootScope.mezumanin1=0; 
		}		
		//$rootScope.paid+=parseFloat($(str).val());
		//$rootScope.itra-=parseFloat($(str).val());
		$scope.payments_type[type].splice(index, 1);
		$scope.finalltash[type]=(parseFloat($scope.finalltash[type])-parseFloat($scope.payments_type[type][index].amount)).toFixed(2); 
		local.setLocal('payment',$scope.payments_type);
		local.setLocal('finalltash',$scope.finalltash);
	}
	
	this.update_paid = function(sum){
		$rootScope.paid=parseFloat(parseFloat($rootScope.paid)+parseFloat(sum)).toFixed(2);
		$rootScope.itra=parseFloat(parseFloat($rootScope.itra)-parseFloat(sum)).toFixed(2);
		$rootScope.sumin=(parseFloat($rootScope.sumin)+parseFloat(sum)).toFixed(2);
		$scope.$apply();
		
	};
	
	this.akafa_checking = function(str1,str2){
		if($rootScope.SearchClient.length==0||$rootScope.SearchClient==undefined){
			$scope.call_alert_site('נא לבחור שם לקוח/ה',0,0);
		}
		else if(!$(".exitclient").hasClass("ng-hide")){
			var itra_free=$(".itra_free:first").text();
		 	var sum=parseFloat(itra_free)-parseFloat($(str1).val());
		 	if(sum>=0){
		 		$rootScope.add_type(str1,'הקפה');
		 	}	
		 	$(".akafa3 .input_sum").val($(".akafa .input_sum").val());
		 	$(".over_sum .input_sum").val($(".akafa_sum .input_sum"));
	 		openwrap2('.add_worker.container_pop','.akafa_c ,.akafa3.container_pop')	;	 	
		}
		
			
	};

	$scope.start_paying=function(){
         dolog('', 587,'start_paying');      
		$rootScope.itra=$rootScope.amount;
	};
	$scope.start_shovarzivuy = function(){
		if($rootScope.amount<0){
			var item=$rootScope.cash_kupanum;
				var x=9-parseInt(item.toString().length);
	        	for (var i=0; i < x; i++) {
				 	item="0"+item.toString();
				};
	    		//return item;
			$("input[name=shovarzicuy_num]").val(item);
			$("input[name=shovarzicuy_num]").prop('disabled', true);
			
		}
		else{
			$("input[name=shovarzicuy_num]").val('');
			$("input[name=shovarzicuy_num]").prop('disabled', false);
			$("input[name=shovarzicuy_num]").select();
		}
	};
  }]);
	app.controller('CalcController',[ '$scope', '$rootScope',function ($scope,$rootScope){ 
 	
		this.calc3 = function(){ 
			if($(".popup_pay ").css("display")=="block"||$(".pop_anacha ").css("display")=="block"){
				var x=$('.input_result input[name=Input]').val();
				if(x==""||x==undefined||isNaN(x)){
					x=0;
				}
				else{
					var t=$('input[name=flag_focused]:hidden').val();
					$(t).val(x);
					
				}
				//$('.mezuman_sum').val(x);
				$('.input_result input[name=Input]').val('');
				if(t.indexOf(".input_sum.ashray_text")>-1){
						$("textarea[name=ashray_f]").focus();	
				}
				if(t.indexOf(".ashray_f_first")>-1){
					$("textarea[name=ashray_f]").focus();	
				}
				if(t.indexOf(".ashray_f_num")>-1){
					$("textarea[name=ashray_f]").focus();	
				}
				if(t.indexOf(".ashray_f_credit")>-1){
					$("textarea[name=ashray_f]").focus();	
				}
				
				if(t.indexOf(".prepaid_sum.input_sum")>-1){
					$('input[name=prepaid_num]').focus();
				}
				
				if($(".amchaa").css("display")=="block"){
					if(t.indexOf('chequenumber')>-1){
						$(t).next().next().focus();
					}
					else{
						$(t).next().focus();
					}
				}
				if(t.indexOf("mecholel_amount_")>-1){
					var x=(t.split('_')[2]).split(']')[0];
					var amount=parseInt($(".amchaa_sum ").val());
					var num=$("input[name=tashlumin]").val();
					var amount_done=0;
					var amount_todo=0;
					var i=0;
					
					$(".mecholel_amount").each(function( index ) {
					   y=($(this).attr("name").split('_')[2]).split(']')[0];
					   if(y<=x){
					   		i++;
					   		amount_done+=parseFloat($(this).val());
					   		amount_todo=(amount-amount_done)/(num-i);
					   }
					   else{
					   		$(this).val(amount_todo);
					   }
					});
				}
				/*if(t.indexOf('mecholel_date_')>-1){
							var x=(t.split('_')[2]).split(']')[0];
						    var dd = x.getDate();
						    var mm = x.getMonth()+1; //January is 0!		
						    var yyyy = x.getFullYear();
						    if(dd<10){
						        dd='0'+dd;
						    } 
						    if(mm<10){
						        mm='0'+mm;
						    } 
						    var today = dd+'/'+mm+'/'+yyyy;
						    

				}*/
			}
			
		};
		
	$scope.calc_type = function (x){
			$(".calc_result").val( $(".calc_result").val()+x);
	}
  }]);
})();