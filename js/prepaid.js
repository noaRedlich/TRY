(function() {
  var app = angular.module('PrepaidM', []);
	app.controller('PrepaidController',[ '$http','$scope', '$rootScope','$compile','tabs','clean','local','cash_global','openwindows','alert'
	,function ($http,$scope,$rootScope, $compile,tabs,clean,local,cash_global,openwindows,alert){ 
		
		var y="";
		var y2="";
		setInterval(function () {
			var x=$('.pop_prepaid_load  .prepaidload_num ').val();
			if(x==y&&x!=""&&$('.pop_prepaid_load  .prepaidload_sum ').val()!=""){
				$scope.load_prepaid();	
				$('.pop_prepaid_load  .prepaidload_num ').val('');
				x='';
				y='';			
			}
			else{
				y=x;
			}
			

			var x2=$('.pop_prepaid_check   .prepaidload_num  ').val();
			if(x2==y2&&x2!=""&&$('.pop_prepaid_check   .prepaidload_num  ').val()!=""){
				$scope.check_prepaid();	
				$('.pop_prepaid_check   .prepaidload_num  ').val('');
				x2='';
				y2='';			
			}
			else{
				y2=x2;
			}
			
			
			
		}, 500);
	
		$scope.check_prepaid_page=function () {
			$(".card_money").text("");
			$(".pop_prepaid input[type=text],.pop_prepaid input[type=tel]").val("");
			openwindows.openwrap2('pop_prepaid','.pop_prepaid_check,.pop_prepaid_check .container_pop ');
			$(".card_visibility").focus();
		};
		
		$scope.load_prepaid_page=function () {
			$(".card_load_msg").text("");
			$(".pop_prepaid input[type=text],.pop_prepaid input[type=tel]").val("");		
			openwindows.openwrap2('pop_prepaid','.pop_prepaid_load,.pop_prepaid_load .container_pop ');
			$(".pop_prepaid_load  .prepaidload_sum").focus();
			
		};
		
		$scope.check_prepaid=function () {
				var prepaidload_num_f=$(".pop_prepaid_check .prepaidload_num").val();
				if( prepaidload_num_f.split(/\n/).length>1){
					   		if( prepaidload_num_f.split(/\n/)[1]!=""){
					   			var  prepaidload_num_f= prepaidload_num_f.split(/\n/)[1];
					   		}
					   		else{
					   			var  prepaidload_num_f= prepaidload_num_f.split(/\n/)[0];
					   		}
					   	 
					   	}	   
					   
					   if( prepaidload_num_f.split('?').length>1&&prepaidload_num_f.search(';')!=-1){
					   		 prepaidload_num_f= prepaidload_num_f.split(';')[1];
					   		 prepaidload_num_f= prepaidload_num_f.split('?')[0];
					   	}
					   	if( prepaidload_num_f.split('?').length>1&&prepaidload_num_f.search('ף')!=-1){
					   		 prepaidload_num_f= prepaidload_num_f.split('ף')[1];
					   		 prepaidload_num_f= prepaidload_num_f.split('?')[0];
					   	}
					   
				$rootScope.prepaidload_num=prepaidload_num_f;	
				$.post( "inc/functions.php", { prepaid_check: 1, prepaid_num: $rootScope.prepaidload_num })
				  .done(function( data ) {
				    		if(data==-1){
								 alert.alert_site('כרטיס אינו תקין',1,1);
							}
							else {
								if(data==""){
									data=0;
								}
								$(".card_money").text('בכרטיס '+data+' שח');
							}
				  });
		};
		
		$scope.load_prepaid=function () {
			// here code: card sign
			// 	$rootScope.cardSign = 1;
			// 	$rootScope.cardNum = $('.prepaidload_num').val();
		
				$rootScope.amount=$(".pop_prepaid_load .prepaidload_sum").val();
				if($rootScope.amount==""||$rootScope.amount==0){
					alert.alert_site('לא הכנס סכום',1,1);
				}
				var prepaidload_num_f=$(".prepaidload_num").val();
				if( prepaidload_num_f.split(/\n/).length>1){
					   		if( prepaidload_num_f.split(/\n/)[1]!=""){
					   			var  prepaidload_num_f= prepaidload_num_f.split(/\n/)[1];
					   		}
					   		else{
					   			var  prepaidload_num_f= prepaidload_num_f.split(/\n/)[0];
					   		}
					   	 
					   	}			   
					   
					   if( prepaidload_num_f.split('?').length>1&& prepaidload_num_f.search(';')!=-1){
					   		 prepaidload_num_f= prepaidload_num_f.split(';')[1];
					   		 prepaidload_num_f= prepaidload_num_f.split('?')[0];
					   	}
					   
				$rootScope.prepaidload_num=prepaidload_num_f;
				
				
				
				$.post( "inc/functions.php", { prepaid_check: 1, prepaid_num: $rootScope.prepaidload_num })
					  .done(function( data ) {
					    		if(data==-1){
									 alert.alert_site('כרטיס אינו תקין',1,1);
								}
								else {
									writelog("טעינת פריפייד: "+$rootScope.amount);
									$rootScope.prepaid=1;
									$(".prepaid_disabled").attr("disabled","true");								
									//$(".wrap").click();
									$rootScope.start_pay();
								}
					  });
			
			
				  
		    /*$.ajax("inc/functions.php?prepaid_check=1&prepaid_num="+$rootScope.prepaidload_num, {async: false})
			        .success(function(data){
						if(data==-1){
							 	alert.alert_site('כרטיס אינו תקין',1,1);
						}
						else {
								$rootScope.prepaid=1;
								$(".prepaid_disabled").attr("disabled","true");								
								$rootScope.start_pay();
						}
		  	});	*/

		};

  	}]);
})();
