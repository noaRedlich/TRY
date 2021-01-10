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
			"prepaid":0,
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
			"prepaiddebt":{ "general":0,
					"cash":0,
					"cheque":0,
					"credit":0,
					"shovar":0,
					"akafa":0,
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
	/*sk 06/01/16 new X report*/
	if(localStorage.getItem('finalltash2')===null){	
		$rootScope.finalltash2={
			"cash":0,
			"cheque":0,
			"credit":0,
			"prepaid":0,
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
			"prepaiddebt":{ "general":0,
					"cash":0,
					"cheque":0,
					"credit":0,
					"shovar":0,
					"akafa":0,
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
			"numprod_hova":0,
			"numprod_zchut":0,
		};
	}
	else{
		$rootScope.finalltash2=JSON.parse(localStorage.getItem('finalltash2'));
	}
	
	
	/*$scope.finalltash={
			cash:0,
			cheque:0,
			credit:0,
			akafa:0,
			shovar:0,
			prepaid:0
		};*/

	$rootScope.flag_select=false;
	$scope.payments_type=cash_global.payments_type;

	$scope.call_setTab = function(newValue) {
         tabs.setTab(newValue);
    }
     $("#search_prod").focus(function(){
     	if($rootScope.credit_error==1){
					$rootScope.credit_error=0;
					$("textarea[name=ashray_f]").focus();
					$rootScope.interval=true;
		}
     });
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
	$rootScope.start_credix = function(){
			$('#payments').hide();
			$('#credit_p').hide();
			$('#credit_appr').hide();
			$('#yadani').hide();
			$('textarea[name=ashray_f]').focus();
		 if($rootScope.itra==0.00||$rootScope.itra==0){
		 	$rootScope.itra=$rootScope.amount;
		 }
		if(typeof window.external != "undefined" && typeof window.external.startPayCredit != "undefined" && Math.abs($rootScope.amount) > 0){
			str = window.external.startPayCredit($rootScope.itra);
			
			writelog("תגובה מcredix: "+str);
			if(str.indexOf("error")<0){
			data_arr = JSON.parse(str);
			ashray_f_credit = 0;
			if(data_arr['creditTerms']=="PAYMENTS"){
				ashray_f_credit = data_arr['numberOfPayments'];
			}
			/*var x={"type":'אשראי',"amount":data_arr['amount'],"pay_first":data_arr['firstPaymentAmount'],
			 "pay_num":data_arr['numberOfPayments'],"ashray_numcard":data_arr['cardNumber'],
			 "ashray_tokef":data_arr['cardExpirationDate'],"creditbrand":data_arr['cardBrand'],
			 "approvalNumber":data_arr['voucherNumber'],"clearinghouseCompany":data_arr['creditCardCompanyIssuerCode'],
			 "ashray_f_credit":ashray_f_credit};*/
			
			   		 		 if(data_arr['amount']<0) {			   		 		 	
			   		 		 	$rootScope.finalltash.credit2[data_arr['creditCardCompanyIssuerCode']]['CREDIT']=(parseFloat($rootScope.finalltash.credit2[data_arr['creditCardCompanyIssuerCode']]['CREDIT'])+Math.abs(parseFloat(data_arr['amount']))).toFixed(2);
			   		 		 }
			   		 		 else{
			   		 		 	$rootScope.finalltash.credit2[data_arr['creditCardCompanyIssuerCode']]['DEBIT']=(parseFloat($rootScope.finalltash.credit2[data_arr['creditCardCompanyIssuerCode']]['DEBIT'])+Math.abs(parseFloat(data_arr['amount']))).toFixed(2);
			   		 		 }
			   		 		   $rootScope.finalltash['all']=(parseFloat( $rootScope.finalltash['all'])+parseFloat(data_arr['amount'])).toFixed(2); 	
							 var x={"type":'אשראי',"amount":data_arr['amount'],"pay_first":data_arr['firstPaymentAmount'], "pay_num":data_arr['numberOfPayments'],"ashray_numcard":data_arr['cardNumber'],"ashray_tokef":data_arr['cardExpirationDate'],"creditbrand":data_arr['cardBrand'],"approvalNumber":data_arr['voucherNumber'],"clearinghouseCompany":data_arr['creditCardCompanyIssuerCode'],"ashray_f_credit":ashray_f_credit};
			   		 		  
			   		 		   $scope.payments_type['credit'].push(x);
			   		 		   $scope.$apply(); 
			   		 		   writelog("תגובה x: "+JSON.stringify($scope.payments_type['credit']));
			   		 		   writelog("push x: "+JSON.stringify(x));
			   		 		    writelog("הוספת תשלום באשראי: "+data_arr['amount']);
			   		 			paym.update_paid(parseFloat(data_arr['amount']));
			   		 			writelog("תגובה update_paid: "+parseFloat(data_arr['amount']));
			   		 			if($rootScope.transtype==1){
							    	$rootScope.finalltash['akafadebt']['credit']=(parseFloat($scope.finalltash['akafadebt']['credit'])+parseFloat(data_arr['amount'])).toFixed(2); 
							    	$rootScope.finalltash['akafadebt']['general']=(parseFloat($scope.finalltash['akafadebt']['general'])+parseFloat(data_arr['amount'])).toFixed(2); 
							    }
							     if($rootScope.prepaid==1){
							    	$rootScope.finalltash['prepaiddebt']['credit']=(parseFloat($scope.finalltash['prepaiddebt']['credit'])+parseFloat(data_arr['amount'])).toFixed(2); 
							    	$rootScope.finalltash['prepaiddebt']['general']=(parseFloat($scope.finalltash['prepaiddebt']['general'])+parseFloat(data_arr['amount'])).toFixed(2);
							    }
							     $rootScope.finalltash['credit']=(parseFloat($scope.finalltash['credit'])+parseFloat(data_arr['amount'])).toFixed(2); 
							    if($rootScope.amount>0){
							    	 $rootScope.finalltash['credit1']['hova']=(parseFloat($scope.finalltash['credit1']['hova'])+parseFloat(data_arr['amount'])).toFixed(2); 
							    }
							    else{
							    	 $rootScope.finalltash['credit1']['zicuy']=((parseFloat($scope.finalltash['credit1']['zicuy'])+parseFloat(data_arr['amount']))*-1).toFixed(2); 
							    }	
							    localStorage.setItem('finalltash',JSON.stringify($rootScope.finalltash));	
			   		 		   // openwindows.openwrap2('','.type_pay.container_pop')
			   		 		   if($rootScope.itra>0){
			   		 		   		openwindows.openwrap2('','.type_pay.container_pop');
			   		 		   }
			   		 		   else{
			   		 		   		openwindows.openwrap2('checkend','.type_pay.container_pop');			   		 		   	
			   		 		   }			   		 		   
							  	//$scope.call_alert_site("האשראי העבר בהצלחה",1,'on');
								$(".ashray_text").val("");
								$scope.$apply();
								local.setLocal('payment',$scope.payments_type);
								local.setLocal('finalltash',$scope.finalltash);
								paym.check_end2('');
								$rootScope.checkend();					
								
		}
		}
	}
	$rootScope.start_pay = function(){
		$rootScope.flag_select=true;
			 if($rootScope.itra==0.00||$rootScope.itra==0){
			 	$rootScope.itra=$rootScope.amount;
			 }				
			else{
				$rootScope.itra=$rootScope.amount-$rootScope.paid;
			}				
			$(".ddd3").val($rootScope.currdate);
			
			if($rootScope.prepaid!=1){
				$(".prepaid_disabled").removeAttr('disabled');
			}
             if(($("#total_prod").text()!="0"&&$(".popup_pay").css('display')=='none')||$rootScope.transtype==1||$rootScope.prepaid==1){
          					
				if($rootScope.premission_list['permission_worker']=='on'){ 
					$rootScope.SearchWorker=[];
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
            $scope.$apply();  
			
	};
		/*sk 07/01/16 open the match popup payment*/
		$rootScope.start_pay111 = function(str){
			
			 if($rootScope.itra==0.00||$rootScope.itra==0)
				$rootScope.itra=$rootScope.amount;
			else
				$rootScope.itra=$rootScope.amount-$rootScope.paid;
		    if($rootScope.itra){
					if(str ==".mezuman"){
						$rootScope.itra=parseFloat($rootScope.itra).toFixed(1);
					}
					if($rootScope.prepaid!=1){
						$(".prepaid_disabled").removeAttr('disabled');
					}
					if(str==".shovarzicuy" && $rootScope.transtype==1){
						$scope.call_alert_site('תשלום חוב ! לא מורשה תשלום בשובר זיכוי',1,0);			
				 	}      					
							$('.input_sum ').text($rootScope.itra);
							$('.input_sum ').val($rootScope.itra);
							$('.span_sum ').text($rootScope.itra);
							$('.span').val($rootScope.itra);
							
							//popup pop_peulot popup_pay
						    popup="#main_payment_div";
							$(popup).css({'display':'block'});
							 $(popup).css({'z-index': '9999'});
							$(".wrap").css({'display':'block'});
						    $(str).css({'display': 'block'});
						    $(str).css({'z-index': '9999'});
					if(str==".shovarzicuy" && $rootScope.transtype!=1){
						$scope.start_shovarzivuy();	
			 			$rootScope.is_shovar=1;	
						
					}
					if(str=='.ashray'){
				 		$('textarea[name=ashray_f]').focus();
				 	} 
					
            }
         }	
	$scope.force = function(){	
					/*30/8 sk*/
	writelog('force start');	
		if($rootScope.premission_list['permission_force_cash']=='on'){			
			$rootScope.add_type('.over_akafa','הקפה');
			paym.check_end2('');		
		}
		else{
			$rootScope.action="akafa";		
			$scope.call_alert_site('משתמש לא מורשה',3,1);
		}
					/*30/8 sk*/
	writelog('force end');	
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
		$rootScope.interval=true;	
		tabs.setTab(5);
		$(".calc_area").css('z-index','999');
		$(".calc_area").css('position','relative');
		$(".input_sum").val($(".span_itra").text());
		var x = parseFloat($(".span_itra").text());
		$(".input_sum.ashray_text").val(x);

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
		$rootScope.flag_select=true;		
		$('input[name=helpsum]:hidden').val($rootScope.flag_select.toString());
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
		$rootScope.flag_select=true;		
		$('input[name=helpsum]:hidden').val($rootScope.flag_select.toString());
		$('.input_sum').select();	
	};
	//the same as this.init_sum	
	
	this.select = function(){	
		$('input[name=chequenumber]').select();
	};
	 
	var y="";
	var y2="";
	
	$scope.start_ashray= function(){	
		$rootScope.interval=true;
		$(".loading").show();
	};
	setInterval(function () {
		var x=$('textarea[name=ashray_f]').val();
		if(x==y&&x!=""){
			//$scope.call_alert_site(x,1,0);
			/*paym.check_end2('.ashray');
			$rootScope.add_type('.ashray_text','אשראי');
			$rootScope.checkend();*/
			$(".loading").show();
			
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

	}, 500);
	
	$rootScope.interval=true;
	setInterval(function () {

		if($(".loading").css("display")=="block"&&$rootScope.interval){
			paym.check_end2('.ashray');
			$rootScope.add_type('.ashray_text','אשראי');
			$rootScope.checkend();
			$rootScope.interval=false;
		}
		

	}, 700);
	
		$rootScope.interval=true;
	
	setInterval(function () {

		// sk 03/02/16 send offline enter and exit worker
			//trans
			
			if(!$.isEmptyObject($rootScope.send_cashes)){
				tran=JSON.stringify($rootScope.send_cashes);
				
				if(tran.length>2){
					$http.post('inc/transactions.php', $.param({
						//stock : GetURLParameter.GetURLParameter('stock'),
						stock : stock,/*sk 24/12 check offline transactions*/
					   journal : journal,
				       journal_id : journal_id,
						trans : tran, 
						cust : $rootScope.SearchClient['ID'],
						offline:1,
					},{async:false}), {
						headers : {
							'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
						}				
					}).success(function(data) {
						//$(".loading").css('display','none');
						flag_send_cashes=1;
						$rootScope.send_cashes={};
					}).error(function(){
						hhhhh=1;
						
					});
				}
			}
	}, 2*1000);
	
	/*sk 7/02/2016 update enter and exit workers in offline  interval
	  that check if there are enter or exit that has done in offline*/
	$rootScope.interval=true;
	setInterval(function () {

		// sk 03/02/16 send offline enter and exit worker
			if(!$.isEmptyObject($rootScope.offline_workers)){
			  var offline_worker_json=JSON.stringify($rootScope.offline_workers);
			  
			  if(offline_worker_json.length>2){//check if there are workers
			  	$http.post('inc/functions.php', $.param({
						//stock : GetURLParameter.GetURLParameter('stock'),
						offline_worker : 1,
				    	 json_offline_worker :offline_worker_json ,
				       
					},{async:false}), {
						headers : {
							'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
						}				
					}).success(function(data) {
						//$(".loading").css('display','none');
					$rootScope.offline_workers={};//delete the content if it update
					}).error(function(){
						hhhhh=1;
						
					});
                			  	
			  }
			}
	}, 1000);
	
	this.check_end2 = function(str){
		
		if(str=='.mecholelsum_text'){
			if($(".amchaa_sum").val()==""||$("input[name=chequenumber]").val()==""||$("input[name=chequeaccountnumber]").val()==""||$("input[name=chequepaymentdat]").val()==""||$("input[name=chequebanknumber]").val()==""||$("input[name=chequebranch]").val()==""){
				return;
			}
		}
		if(str==".ashray_yadany"){
			if($(".ashray_numcard").val()==undefined||$(".ashray_tokef").val()==undefined/*||$(".ashray_cvv").val()==undefined*/
			||$(".ashray_numcard").val()==""||$(".ashray_tokef").val()==""/*||$(".ashray_cvv").val()==""*/){/*sk 01/9 remove cvv from the condition*/
				return;
			}
		}
		if(str==".ashray"){
			if($(".input_num.ashray_text").val()==""){
				if($(".ashray_numcard").val()==undefined||$(".ashray_tokef").val()==undefined/*||$(".ashray_cvv").val()==undefined*/
			||$(".ashray_numcard").val()==""||$(".ashray_tokef").val()==""/*||$(".ashray_cvv").val()==""*/){/*sk 01/9 remove cvv from the condition*/
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
			if($(".ashray_numcard").val()==undefined||$(".ashray_tokef").val()==undefined/*||$(".ashray_cvv").val()==undefined*/||
			$(".ashray_numcard").val()==""||$(".ashray_tokef").val()==""/*||$(".ashray_cvv").val()==""*/){/*sk 01/9 remove cvv from the condition*/
				$scope.call_alert_site('נא למלא את כל פרטי האשראי',1,0);
				return;
			}
			else{
				/*$(".loading").css('display','block');
				 setTimeout(function(){
    				}, 2000);
				$scope.$apply();*/
			}
		}
		if(type=="אשראי"){
			if($("textarea[name=ashray_f]").val()==""&&
			($(".ashray_numcard").val()==""||$(".ashray_tokef").val()==undefined/*||$(".ashray_cvv").val()==undefined*/||
			$(".ashray_numcard").val()==""||$(".ashray_tokef").val()==""/*||$(".ashray_cvv").val()==""*/)){/*sk 01/9 remove cvv from the condition*/
				$scope.call_alert_site('נא העבר כרטיס אשראי',1,0);
				return;
			}
			else{
				/*$(".loading").css('display','block');
				  setTimeout(function(){
    				}, 2000);
				$scope.$apply();*/
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
		credit_error=false;
		$scope.valid=validate.valid();
		if(!$scope.valid){
			return false;
		}
		if($(str).val()!=''){
	    	switch (type) {
			    case 'מזומן': 	
			    $rootScope.mezumanitra2=$rootScope.mezumanitra;
			    $rootScope.mezumanitra=(parseFloat($rootScope.mezumanitra)-parseFloat($('.mezuman_sum ').val())).toFixed(2);
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
			    writelog("הוספת תשלום במזומן: "+pay)	;
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
			      if($rootScope.prepaid==1){
			    	$rootScope.finalltash['prepaiddebt']['cash']=(parseFloat($scope.finalltash['prepaiddebt']['cash'])+parseFloat($(str).val())).toFixed(2); 
			    	$rootScope.finalltash['prepaiddebt']['general']=(parseFloat($scope.finalltash['prepaiddebt']['general'])+parseFloat($rootScope.finalltash['prepaiddebt']['cash'])).toFixed(2);  
			    }	
			    
			    $rootScope.finalltash['cash']=(parseFloat($scope.finalltash['cash'])+parseFloat($(str).val())) .toFixed(2);  
			    
			    $(".is_mezuman:hidden").val('1');
			    /*sk 08/02/16*/
			    var itra_abs=$rootScope.itra < 0 ? $rootScope.itra *-1 :$rootScope.itra;
			    $(".is_change:hidden").val(itra_abs);
			     
			    break;
			    case 'המחאה':
			    var date_cheque=$('input[name=chequepaymentdat]').val();
			    date_cheque=date_cheque.split('/');
				var yy=date_cheque[2].substr(2,2);
				date_cheque=date_cheque[0]+date_cheque[1]+yy;
			    var x={"type":'המחאה',"amount":$(str).val(),"chequepaymentdate":date_cheque,"chequebanknumber":$('input[name=chequebanknumber]').val(),"chequebranch":$('input[name=chequebranch]').val(),"chequeaccountnumber":$('input[name=chequeaccountnumber]').val(),"chequenumber":$('input[name=chequenumber]').val()
			    ,"mecholel_firstsum":$('input[name=mecholel_firstsum]').val(),"mecholel_datefirst":$('input[name=mecholel_datefirst]').val(),"mecholel_numcheck":$('input[name=mecholel_numcheck]').val(),"mecholel_bank":$('input[name=mecholel_bank]').val(),"mecholel_snif":$('input[name=mecholel_snif]').val(),"mecholel_bill":$('input[name=mecholel_bill]').val()};
			    $scope.payments_type['cheque'].push(x);
			     writelog("הוספת תשלום בהמחאה: "+$(str).val())	;
			    paym.update_paid($(str).val());
			     if($rootScope.transtype==1){
			    	$rootScope.finalltash['akafadebt']['cheque']=(parseFloat($scope.finalltash['akafadebt']['cheque'])+parseFloat($(str).val())) .toFixed(2); 
			    	$rootScope.finalltash['akafadebt']['general']=(parseFloat($scope.finalltash['akafadebt']['general'])+parseFloat($(str).val())) .toFixed(2); 
			    }
			     if($rootScope.prepaid==1){
			    	$rootScope.finalltash['prepaiddebt']['cheque']=(parseFloat($scope.finalltash['prepaiddebt']['cheque'])+parseFloat($(str).val())).toFixed(2); 
			    	$rootScope.finalltash['prepaiddebt']['general']=(parseFloat($scope.finalltash['prepaiddebt']['general'])+parseFloat($(str).val())) .toFixed(2); 
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
			   //$(".loading").show();
			  /* var x={"type":'אשראי',"amount":$(str).val(),"ashray_numcard":$('input[name=ashray_numcard]').val(),"ashray_tokef":$('input[name=ashray_tokef]').val(),"ashray_cvv":$('input[name=ashray_cvv]').val(),"ashray_tashlumim":$('input[name=ashray_tashlumim]').val(),
			   "optionsashray_tz":$('input[name=optionsashray_tz]').val(),"optionsashray_threenum":$('input[name=optionsashray_threenum]').val(),"optionsashray_currency":$('input[name=optionsashray_currency]').val(),"optionsashray_numishur":$('input[name=optionsashray_numishur]').val(),
			    "mecholel_firstsum":$('input[name=mecholel1_firstsum]').val(),"mecholel_datefirst":$('input[name=mecholel1_datefirst]').val(),"mecholel_numcheck":$('input[name=mecholel1_numcheck]').val(),"mecholel_bank":$('input[name=mecholel1_bank]').val(),"mecholel_snif":$('input[name=mecholel1_snif]').val(),"mecholel_bill":$('input[name=mecholel1_bill]').val()};
			    */
			   var sum_c=$(str).val();
			   $rootScope.sum_c=sum_c;
			    var num_c=$('textarea[name=ashray_f]').val();
			   	if(num_c.split(/\n/).length>1){
			   		if(num_c.split(/\n/)[1]!=""){
			   			var num_c=num_c.split(/\n/)[1];
			   		}
			   		else{
			   			var num_c=num_c.split(/\n/)[0];
			   		}
			   	 
			   	}			   
			   	
			
			  
			   if(num_c.split('?').length>1&&num_c.search(';')!=-1){
			   		num_c=num_c.split(';')[1];
			   		num_c=num_c.split('?')[0];
			   	}
			   
			   $('textarea[name=ashray_f]').val("");	
			 var pay_num=$('input[name=ashray_f_num]').val();
			 var pay_first=$('input[name=ashray_f_first]').val();
			 var ashray_f_credit=$('input[name=ashray_f_credit]').val();
			 var ashray_numcard =$('input[name=ashray_numcard]').val();
			  var ashray_tokef =$('input[name=ashray_tokef]').val();
			   var ashray_cvv  =$('input[name=ashray_cvv]').val();
			    var ashray_tz =$('input[name=ashray_tz]').val();
			    if(typeof voucherNumberss == "undefined" && localStorage.getItem('voucherNumberss')===null){
			    	voucherNumberss = [];
			    }
				if (typeof voucherNumberss == "undefined"){
					voucherNumberss =  JSON.parse(localStorage.getItem('voucherNumberss'));					
				}
			 // "&ashray_numcard="+ashray_numcard+"&ashray_tokef="+ashray_tokef+"&ashray_cvv="+ashray_cvv+"&ashray_tz="+ashray_tz

							/*sk 15/12/15 get ipay terminal details per stock*/		
				   //$.ajax("inc/functions.php?amount="+sum_c+"&track2="+num_c+"&pay_num="+pay_num+"&pay_first="+pay_first+"&ashray_f_credit="+ashray_f_credit+"&ashray_numcard="+ashray_numcard+"&ashray_tokef="+ashray_tokef+"&ashray_cvv="+ashray_cvv+"&ashray_tz="+ashray_tz+"&ApprovalNumber="+$("input[name=aproval_num_f]").val(), {async: false})
				            $.ajax("inc/functions.php?amount="+sum_c+"&track2="+num_c+"&stock="+stock+"&pay_num="+pay_num+"&pay_first="+pay_first+"&ashray_f_credit="+ashray_f_credit+"&ashray_numcard="+ashray_numcard+"&ashray_tokef="+ashray_tokef+"&ashray_cvv="+ashray_cvv+"&ashray_tz="+ashray_tz+"&ApprovalNumber="+$("input[name=aproval_num_f]").val(), {async: false})
					        .success(function(data){
					        	if(data.indexOf("error")<0 ){
					        		data_arr=JSON.parse(data);
					        	}
			   		 	if(data.indexOf("error")<0 && voucherNumberss.indexOf(data_arr['voucherNumber']) == -1){
			   		 		voucherNumberss.push(data_arr['voucherNumber']);
			   		 		localStorage.setItem('voucherNumberss',JSON.stringify(voucherNumberss));	
			   		 		writelog("================response data===========");
			   		 		writelog("inc/functions.php?amount="+sum_c+"&track2="+num_c+"&stock="+stock+"&pay_num="+pay_num+"&pay_first="+pay_first+"&ashray_f_credit="+ashray_f_credit+"&ashray_numcard="+ashray_numcard+"&ashray_tokef="+ashray_tokef+"&ashray_cvv="+ashray_cvv+"&ashray_tz="+ashray_tz+"&ApprovalNumber="+$("input[name=aproval_num_f]").val());
			   		 		writelog(data);
			   		 		writelog("================response data end===========");
			   		 		
			   		 		
			   		 		if(typeof data_arr['firstPaymentAmount'] == "undefined"){
			   		 			data_arr['firstPaymentAmount'] = 0;
			   		 		}
			   		 		if(typeof data_arr['numberOfPayments'] == "undefined"){
			   		 			data_arr['numberOfPayments'] = 0;
			   		 		}
			   		 		ashray_f_credit = 0;
			   		 		if(data_arr['creditTerms'] == "PAYMENTS"){
			   		 			ashray_f_credit = data_arr['numberOfPayments'];
			   		 		}
			   		 		 var x={"type":'אשראי',"amount":data_arr['amount'],"pay_first":data_arr['firstPaymentAmount'], "pay_num":data_arr['numberOfPayments'],"ashray_numcard":data_arr['cardNumber'],"ashray_tokef":data_arr['cardExpirationDate'],"creditbrand":data_arr['cardBrand'],"approvalNumber":data_arr['voucherNumber'],"clearinghouseCompany":data_arr['creditCardCompanyIssuerCode'],"ashray_f_credit":ashray_f_credit};
			   		 		 if(data_arr['amount']<0) {			   		 		 	
			   		 		 	$rootScope.finalltash.credit2[data_arr['creditCardCompanyIssuerCode']]['CREDIT']=(parseFloat($rootScope.finalltash.credit2[data_arr['creditCardCompanyIssuerCode']]['CREDIT'])+Math.abs(parseFloat(data_arr['amount']))).toFixed(2);
			   		 		 }
			   		 		 else{
			   		 		 	$rootScope.finalltash.credit2[data_arr['creditCardCompanyIssuerCode']]['DEBIT']=(parseFloat($rootScope.finalltash.credit2[data_arr['creditCardCompanyIssuerCode']]['DEBIT'])+Math.abs(parseFloat(data_arr['amount']))).toFixed(2);
			   		 		 }
			   		 		   $rootScope.finalltash['all']=(parseFloat( $rootScope.finalltash['all'])+parseFloat(data_arr['amount'])).toFixed(2); 	
								
			   		 		  
			   		 		   $scope.payments_type['credit'].push(x);
			   		 		    writelog("הוספת תשלום באשראי: "+data_arr['amount']);
			   		 			paym.update_paid(data_arr['amount']);
			   		 			if($rootScope.transtype==1){
							    	$rootScope.finalltash['akafadebt']['credit']=(parseFloat($scope.finalltash['akafadebt']['credit'])+parseFloat(data_arr['amount'])).toFixed(2); 
							    	$rootScope.finalltash['akafadebt']['general']=(parseFloat($scope.finalltash['akafadebt']['general'])+parseFloat(data_arr['amount'])).toFixed(2); 
							    }
							     if($rootScope.prepaid==1){
							    	$rootScope.finalltash['prepaiddebt']['credit']=(parseFloat($scope.finalltash['prepaiddebt']['credit'])+parseFloat(data_arr['amount'])).toFixed(2); 
							    	$rootScope.finalltash['prepaiddebt']['general']=(parseFloat($scope.finalltash['prepaiddebt']['general'])+parseFloat(data_arr['amount'])).toFixed(2);
							    }
							     $rootScope.finalltash['credit']=(parseFloat($scope.finalltash['credit'])+parseFloat($(str).val())).toFixed(2); 
							    if($rootScope.amount>0){
							    	 $rootScope.finalltash['credit1']['hova']=(parseFloat($scope.finalltash['credit1']['hova'])+parseFloat(data_arr['amount'])).toFixed(2); 
							    }
							    else{
							    	 $rootScope.finalltash['credit1']['zicuy']=((parseFloat($scope.finalltash['credit1']['zicuy'])+parseFloat(data_arr['amount']))*-1).toFixed(2); 
							    }	
							    localStorage.setItem('finalltash',JSON.stringify($rootScope.finalltash));	
			   		 		   // openwindows.openwrap2('','.type_pay.container_pop')
			   		 		   if($rootScope.itra>0){
			   		 		   		openwindows.openwrap2('','.type_pay.container_pop');
			   		 		   }
			   		 		   else{
			   		 		   		openwindows.openwrap2('checkend','.type_pay.container_pop');			   		 		   	
			   		 		   }			   		 		   
							  	//$scope.call_alert_site("האשראי העבר בהצלחה",1,'on');
								$(".ashray_text").val("");
					   		 	
						}
			   		 	else{
			   		 		if(data.indexOf("error")<0 && voucherNumberss.indexOf(data_arr['voucherNumber']) != -1){
			   		 			$("textarea[name=ashray_f]").focus();
				   		 		data=data.replace("error","");
				   		 		credit_error=true;
				   		 		$rootScope.credit_error=1;
				   		 		$rootScope.interval=true;
				   		 		$(str).val(sum_c);
				   		 		$scope.call_alert_site("קיימת עסקת אשראי עם אותם פרטים, נא העבר שוב",1,'on');	
				   		 		$('textarea[name=ashray_f]').val("");	
				   		 		writelog("יש להעביר אשראי שוב: "+data);
			   		 		}
			   		 		else{
			   		 			if(data.indexOf("התקשר")<0){
			   		 				
			   		 				$("textarea[name=ashray_f]").focus();
					   		 		data=data.replace("error","");
					   		 		credit_error=true;
					   		 		$rootScope.credit_error=1;
					   		 		$rootScope.interval=true;
					   		 		$(str).val(sum_c);
					   		 		$scope.call_alert_site(data,1,'on');	
					   		 		$('textarea[name=ashray_f]').val("");	
					   		 		writelog("אשראי מחזיר שגיאה: "+data);
				   		 			
				   		 		}  
				   		 		else{
				   		 			str2="inc/functions.php?amount="+sum_c+"&track2="+num_c+"&pay_num="+pay_num+"&pay_first="+pay_first+"&ashray_f_credit="+ashray_f_credit+"&ashray_numcard="+ashray_numcard+"&ashray_tokef="+ashray_tokef+"&ashray_cvv="+ashray_cvv+"&ashray_tz="+ashray_tz;
				   		 		$("input[name=credit_approval_details]").val(str2);
				   		 		openwindows.openwrap2('','.credit_approval.container_pop');
				   		 			paym.init_sum2();
				   		 			$(".ashray_text").val("");
						   		 	writelog("אשראי דורש אישור");
						   		 	
				   		 			
				   		 		}
			   		 		}		 		
			   		 	}			   		 	
			   		 	$(".loading").css('display','none');
			   		 	$rootScope.interval=true;
				  	}).fail(function() {
				  		//26-10 el for ashray pawa

				  		$(".loading").css('display','none');

					    $("textarea[name=ashray_f]").focus();		   		 		
		   		 		credit_error=true;
		   		 		$rootScope.credit_error=1;
		   		 		$rootScope.interval=true;
		   		 		$(str).val(sum_c);
		   		 		$scope.call_alert_site("התקשורת אינה תקינה נסה שנית.",1,'on');	
		   		 		 writelog("התקשורת אינה תקינה ואשראי נפל");

		   		 		$('textarea[name=ashray_f]').val("");	
					  });	


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
			 /*  30-08 sk*/
			  /* case 'אשראי2':
			   //  var sum_c=$(str).val();
			   var sum_c=$rootScope.sum_c;
			   var ashray_f_credit=$('input[name=ashray_f_credit]').val();
			     $.ajax($("input[name=credit_approval_details]").val()+"&ApprovalNumber="+$("input[name=credit_approval_num]").val(), {async: false})
			     
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
			   		 	//$(".loading").css('display','none');
				  	});	
			  
			    break;*/
			   /*sk 01/09 add change the case אשראי2*/
			   case 'אשראי2':
			   //  var sum_c=$(str).val();
			   var sum_c=$rootScope.sum_c;//the amount of the payment.
			   var ashray_f_credit=$('input[name=ashray_f_credit]').val();
			   //sk 30-08 :hidden
			     $.ajax($("input[name=credit_approval_details]:hidden").val()+"&ApprovalNumber="+$("input[name=credit_approval_num]").val(), {async: false})//send data to ipay
			
					        .success(function(data){
					        	writelog("====================================");
			   		 				writelog("אשראי________________"+data);
			   		 		    writelog("====================================");
			   		 		  if(data.indexOf("error")<0){
			   		 		  
				   		 	        data_arr=JSON.parse(data);
				   		 		    var x={"type":'אשראי',"amount":data_arr['amount'],"pay_first":pay_first, "pay_num":pay_num,"ashray_numcard":data_arr['cardNumber'],"ashray_tokef":data_arr['cardExpirationDate'],"creditbrand":data_arr['cardBrand'],"approvalNumber":data_arr['voucherNumber'],"clearinghouseCompany":data_arr['creditCardCompanyIssuerCode'],"ashray_f_credit":ashray_f_credit};  		 		 	
				   		 		    $rootScope.finalltash.credit2[data_arr['creditCardCompanyIssuerCode']]['CREDIT']=(parseFloat($rootScope.finalltash.credit2[data_arr['creditCardCompanyIssuerCode']]['CREDIT'])+Math.abs(parseFloat(data_arr['amount']))).toFixed(2);
				   		 		    $rootScope.finalltash['all']=(parseFloat( $rootScope.finalltash['all'])+parseFloat(Math.abs(data_arr['amount'])*-1)).toFixed(2); //add the amount whith - becouse it credit.	
								
				   		 		  
				   		 		    $scope.payments_type['credit'].push(x);
				   		 		    writelog("הוספת תשלום באשראי: "+data_arr['amount']);
				   		 			paym.update_paid(sum_c);
				   		 			//update credit and debit for x report
				   		 			if($rootScope.transtype==1){
								    	$rootScope.finalltash['akafadebt']['credit']=(parseFloat($scope.finalltash['akafadebt']['credit'])+parseFloat(Math.abs(data_arr['amount']))).toFixed(2); 
								    	$rootScope.finalltash['akafadebt']['general']=(parseFloat($scope.finalltash['akafadebt']['general'])+parseFloat(Math.abs(data_arr['amount']))).toFixed(2); 
								    }
								     if($rootScope.prepaid==1){
								    	$rootScope.finalltash['prepaiddebt']['credit']=(parseFloat($scope.finalltash['prepaiddebt']['credit'])+parseFloat(Math.abs(data_arr['amount']))).toFixed(2); 
								    	$rootScope.finalltash['prepaiddebt']['general']=(parseFloat($scope.finalltash['prepaiddebt']['general'])+parseFloat(Math.abs(data_arr['amount']))).toFixed(2);
								    }
								     $rootScope.finalltash['credit']=(parseFloat($scope.finalltash['credit'])+parseFloat(Math.abs(data_arr['amount'])*-1)).toFixed(2); 
								    if($rootScope.amount>0){
								    	 $rootScope.finalltash['credit1']['hova']=(parseFloat($scope.finalltash['credit1']['hova'])+parseFloat(Math.abs(data_arr['amount']))).toFixed(2); 
								    }
								    else{
								    	 $rootScope.finalltash['credit1']['zicuy']=(parseFloat($scope.finalltash['credit1']['zicuy'])+parseFloat(Math.abs(data_arr['amount']))).toFixed(2); 
								    }	
								    localStorage.setItem('finalltash',JSON.stringify($rootScope.finalltash));	
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
			   		 	//$(".loading").css('display','none');
				  	});	
			    
			    break;
			 /*   case 'אשראי ידני':
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
			      $.ajax("inc/functions.php?credit="+myJsonString+"amount="+sum_c+"&track2="+num_c+"&pay_num="+pay_num+"&pay_first="+pay_first+"&ashray_f_credit="+ashray_f_credit, {async: false})
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
			   		 	//$(".loading").css('display','none');
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
			  // break;
			   case 'הקפה':
			   var x={"type":'הקפה',"amount":$(str).val()};
			    $scope.payments_type['akafa']=[x];
			     writelog("הוספת תשלום בהקפה: "+$(str).val());

			    paym.update_paid($(str).val());
			    if($rootScope.prepaid==1){
			    	$rootScope.finalltash['prepaiddebt']['akafa']=(parseFloat($scope.finalltash['prepaiddebt']['akafa'])+parseFloat($(str).val())) .toFixed(2);
			    	$rootScope.finalltash['prepiddebt']['general']=(parseFloat($scope.finalltash['prepaiddebt']['general'])+parseFloat($(str).val())) .toFixed(2);
			    }	 
			     if($rootScope.transtype!=1){
			    		$rootScope.finalltash['akafa']=(parseFloat($scope.finalltash['akafa'])+parseFloat($(str).val())).toFixed(2); 		
			    }
			   break;
			   case 'שובר':
			   var x={"type":'שובר',"amount":$(str).val(),"shovar_num":$('input[name=shovar_num]').val()};
			    $scope.payments_type['shovar'].push(x);
			     writelog("הוספת תשלום בשובר: "+$(str).val());
			    paym.update_paid($(str).val());	 	
			     if($rootScope.transtype==1){
			    	$rootScope.finalltash['akafadebt']['shovar']=(parseFloat($scope.finalltash['akafadebt']['shovar'])+parseFloat($(str).val())) .toFixed(2);
			    	$rootScope.finalltash['akafadebt']['general']=(parseFloat($scope.finalltash['akafadebt']['general'])+parseFloat($(str).val())) .toFixed(2);
			    }
			    if($rootScope.prepaid==1){
			    	$rootScope.finalltash['prepaiddebt']['shovar']=(parseFloat($scope.finalltash['prepaiddebt']['shovar'])+parseFloat($(str).val())) .toFixed(2);
			    	$rootScope.finalltash['prepiddebt']['general']=(parseFloat($scope.finalltash['prepaiddebt']['general'])+parseFloat($(str).val())) .toFixed(2);
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
			    var is_exist_message=0;/*fix bug in shovar zicuy*/
			    var is_exit=1;
			    if($(str).val()>0){
			    	
			    	 $.ajax("inc/functions.php?check_shovar_num="+$('input[name=shovarzicuy_num]').val()+"&rand="+Math.floor(Math.random() * 10000) + 1  , {async: false})
				        .success(function (data) {
				          is_exit=data;
					   		 	
				      });
				       /*sk 07/09 check if shovar has been exist in the acount */
				       shovarzicuy_length = $scope.payments_type["shovarzicuy"].length;
				       if(shovarzicuy_length){
				       	    for(s1=0;s1<shovarzicuy_length;s1++){//for same shovarim
	                    	
	                    	   shovar_num_in_ches=$scope.payments_type["shovarzicuy"][s1]['shovarzicuy_num'];
	                    	   if($('input[name=shovarzicuy_num]').val()==shovar_num_in_ches){
	                    	   	  is_exit=0;
	                    	   	  is_exist_message=1;
	                    	   	  break;
	                    	   }
	                    	}
	                    }
				       
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
									    writelog("הוספת תשלום בשובר זיכוי: "+sum);
									    paym.update_paid(sum);	
									  
									     if($rootScope.transtype==1){
									    	$rootScope.finalltash['akafadebt']['shovarzicuy']=(parseFloat($scope.finalltash['akafadebt']['shovarzicuy'])+parseFloat(sum)) .toFixed(2);
									    	$rootScope.finalltash['akafadebt']['general']=(parseFloat($scope.finalltash['akafadebt']['general'])+parseFloat($rootScope.finalltash['akafadebt']['shovarzicuy'])) .toFixed(2); 	
									    }
									     
										$rootScope.finalltash['shovarzicuy1']['hova']=(parseFloat($scope.finalltash['shovarzicuy1']['hova'])+parseFloat(sum)) .toFixed(2); 							   
									    $rootScope.finalltash['shovarzicuy']=(parseFloat($scope.finalltash['shovarzicuy'])+parseFloat(sum)) .toFixed(2); 
									    //$rootScope.finalltash['all']=(parseFloat( $rootScope.finalltash['all'])+parseFloat(sum)) .toFixed(2); 
									    
									    if($rootScope.itra<0){
									    	//$rootScope.amount=sum;
									    		
									    	var item=$rootScope.cash_kupanum;
									    	 	
											var x=9-parseInt(item.toString().length);
											
								        	for (var i=0; i < x; i++) {
											 	item="0"+item.toString();
											};
									    	 var x={"type":'שובר זיכוי',"amount":$rootScope.itra,"shovarzicuy_num":item};
									    	
										    $scope.payments_type['shovarzicuy'].push(x);
										     writelog("הוספת תשלום בשובר זיכוי: "+$rootScope.itra);
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
						  			/*sk 07/09 check if shovar has been exist in the acount */
						  			if(is_exist_message){
						  				$scope.call_alert_site(' שובר כבר בשימוש בחשבון',1,0);
						  				is_exist_message=0;
						  			}
						  			else{
						  			$scope.call_alert_site(' שובר  אינו תקין',1,0);
						  			}
						}   	 
			    }
			    else{
			    	 
			    		 var x={"type":'שובר זיכוי',"amount":$(str).val(),"shovarzicuy_num":$('input[name=shovarzicuy_num]').val()};
								    $scope.payments_type['shovarzicuy'].push(x);
								   writelog("הוספת תשלום בשובר זיכוי: "+$(str).val());
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
			   if( num_p.split(/\n/).length>1){
					   		if( num_p.split(/\n/)[1]!=""){
					   			var  num_p= num_p.split(/\n/)[1];
					   		}
					   		else{
					   			var  num_p= num_p.split(/\n/)[0];
					   		}
					   	 
					   	}	   
					   
					   if( num_p.split('?').length>1&&num_p.search(';')!=-1){
					   		 num_p= num_p.split(';')[1];
					   		 num_p= num_p.split('?')[0];
					   	}
					  if( num_p.split('?').length>1&&num_p.search('ף')!=-1){
					   		 num_p= num_p.split('ף')[1];
					   		 num_p= num_p.split('?')[0];
					   	}
					   	
			   flag=0;
			   for (i=0;i<$scope.payments_type['prepaid'].length;i++){
			   	if($scope.payments_type['prepaid'][i].prepaid_num==num_p){
			   		sum_p=parseFloat(sum_p)+parseFloat($scope.payments_type['prepaid'][i].amount);
			   		flag=1;
			   	}
			   }
			   
			   
			     if($rootScope.transtype==1){
			    	$rootScope.finalltash['akafadebt']['prepaid']=(parseFloat($scope.finalltash['akafadebt']['prepaid'])+parseFloat($(str).val())) .toFixed(2); 
			    	$rootScope.finalltash['akafadebt']['general']=(parseFloat($scope.finalltash['akafadebt']['general'])+parseFloat($(str).val())) .toFixed(2); 
			    }
			    
			   $rootScope.finalltash['prepaid']=(parseFloat($scope.finalltash['prepaid'])+parseFloat(sum_p)).toFixed(2);  
			
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
		   		 		    writelog("הוספת תשלום בפריפייד: "+data);
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
			/*sk 01/09 add אשראי2 in the condition*/
			if(type!="הקפה"&&type!="פריפייד"&&type!='שובר זיכוי'&&type!='אשראי' && type!='אשראי2'){
				$rootScope.finalltash['all']=(parseFloat( $rootScope.finalltash['all'])+parseFloat($(str).val())) .toFixed(2); 
			
			}
			if(is_done){
				$scope.$apply();
				local.setLocal('payment',$scope.payments_type);
				local.setLocal('finalltash',$scope.finalltash);
				$('.popup_pay  input[type=text]').val('');
					if(credit_error==true){
						credit_error=false;
		   		 		$(str).val(sum_c);
		   		 	}
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
	    	$rootScope.finalltash['akafadebt']['cheque']=(parseFloat($scope.finalltash['akafadebt']['cheque'])+parseFloat(amount_general)).toFixed(2); 
	    	$rootScope.finalltash['akafadebt']['general']=(parseFloat($scope.finalltash['akafadebt']['general'])+parseFloat(amount_general)).toFixed(2); 
	    }
	    if($rootScope.amount>0){
	    	 $rootScope.finalltash['cheque1']['hova']=(parseFloat($scope.finalltash['cheque1']['hova'])+parseFloat(amount_general)).toFixed(2); 
	    }
	    else{
	    	 $rootScope.finalltash['cheque1']['zicuy']=((parseFloat($scope.finalltash['cheque1']['zicuy'])+parseFloat(amount_general))*-1) .toFixed(2); 
	    }
	    
	    $rootScope.finalltash['cheque']=(parseFloat($scope.finalltash['cheque'])+parseFloat(amount_general)).toFixed(2); 
		$rootScope.finalltash['all']=(parseFloat($scope.finalltash['all'])+parseFloat(amount_general)).toFixed(2); 
	    
			    
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
    	if($rootScope.amount<0){
			sum=Math.abs(parseFloat(sum))*-1;
		}
		var x=$('.mezuman_sum').val();
		if(x==""){
			x=0;
		}
		if(sum==""){
			sum=0;
		}
		if($rootScope.flag_select){
			
			$('input[name=helpsum]:hidden').val($rootScope.flag_select.toString());
			$rootScope.flag_select=false;
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
	/*sk 29/12*/
	this.calc2 = function(sum){
		/*var x=parseFloat($('.mezuman_sum').val().toFixed(2));
		if(x==""||x==undefined){
			x=0;
		}
		if(sum==""||sum==undefined){
			sum=0;
		}
		if($rootScope.flag_select){
			$rootScope.flag_select=false;
			$('input[name=helpsum]:hidden').val($rootScope.flag_select.toString());
		}
		$('.mezuman_sum').val(x);*/
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
		if($(".popup_pay ").css("display")=="block"||$(".pop_anacha ").css("display")=="block"||$(".pop_tip ").css("display")=="block"){
			var x=$('.input_result input[name=Input]').val();
			if(x==""||x==undefined||isNaN(x)){
				x=0;
			}
			else{
				var t=$('input[name=flag_focused]:hidden').val();
				if($(t).hasClass("input_sum")){
					if($rootScope.amount<0){
						x=Math.abs(parseFloat(x))*-1;
					}
				}
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
            
		$rootScope.itra=($rootScope.amount-$rootScope.paid).toFixed(2);
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
			if($(".popup_pay ").css("display")=="block"||$(".pop_anacha ").css("display")=="block"||$(".pop_tip ").css("display")=="block"){
				var x=$('.input_result input[name=Input]').val();
				if(x==""||x==undefined||isNaN(x)){
					x=0;
				}
				else{
					var t=$('input[name=flag_focused]:hidden').val();
					if($(t).hasClass("input_sum")){
						if($rootScope.amount<0){
							x=Math.abs(parseFloat(x))*-1;
						}
					}					
					$(t).val(x);
					$(t).focus();
					
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
				
				// <!-- lc 17/03/2016 focus in ashray --> 
             
                if($(".ashray").css("display")=="block"){
                   if($("#yadani").css("display")=="inline-block"){	 
                   	  if(t.indexOf('ashray_numcard')>-1){
						 $(t).next().focus();
					  } 
					  if(t.indexOf('ashray_tokef')>-1){
						 $(t).next().focus();
					  }
					  if(t.indexOf('ashray_cvv')>-1){
						 $(t).next().focus();
					  }
				   }
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