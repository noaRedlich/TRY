(function() {
  var app = angular.module('PauseM', []);
	 app.controller('PauseController',[ '$scope', '$rootScope','cash_global','local','alert',function ($scope,$rootScope,cash_global,local,alert){ 
		this.cashes = cash_global.cashes;
		$scope.go_in = function(cash_num){
			writelog("כניסה לעסקה בהשהיה: "+cash_num);
			$( '.wrap' ).click();
			//$rootScope.amount=cash_global.cashes['cash_num'+cash_num].amount;
			/*sk create new object in scope.cahes and dell the cashes white the '*' */
	        var current_cash_num=$rootScope.cash_num;
	       /* cash_global.cashes['cash_num'+current_cash_num]=cash_global.cashes['cash_num'+cash_num+'*'];
	        $scope.cashes['cash_num'+current_cash_num]=cash_global.cashes['cash_num'+cash_num+'*'];
	        $scope.cashes['cash_num'+current_cash_num].cash_kupanum=$rootScope.cash_kupanum;
	        cash_global.cashes['cash_num'+current_cash_num].cash_kupanum=$rootScope.cash_kupanum;*/
			$rootScope.isMoadon=cash_global.cashes['cash_num'+cash_num+'*'].isMoadon;/*sk 09/09/2015 pause ches*/
			$rootScope.paid=cash_global.cashes['cash_num'+cash_num+'*'].paid;//סכום שכבר שולם
			$rootScope.itra=cash_global.cashes['cash_num'+cash_num+'*'].itra;//סכום החשבונית שנותר לשלם
			//$rootScope.cash_amount_help=cash_global.cashes['cash_num'+cash_num].cash_amount_help;
			$rootScope.amount=cash_global.cashes['cash_num'+cash_num+'*'].finalamount;
			$rootScope.amount_maam=cash_global.cashes['cash_num'+cash_num+'*'].vat;//סכום מעמ חשבונית
			$rootScope.amount_out=cash_global.cashes['cash_num'+cash_num+'*'].amountbeforevat;//סכום החשבונית לפני מעןמ
			$rootScope.SearchClient=cash_global.cashes['cash_num'+cash_num+'*'].SearchClient;//לקוח חשבונית
			$rootScope.discounttype=cash_global.cashes['cash_num'+cash_num+'*'].discounttype;
			$rootScope.before_global_dis=cash_global.cashes['cash_num'+cash_num+'*'].before_global_dis;
			if(typeof cash_global.cashes['cash_num'+cash_num+'*'].discount_sale == "undefined"){
				cash_global.cashes['cash_num'+cash_num+'*'].discount_sale = 0;
			}
			$rootScope.discount_sale=cash_global.cashes['cash_num'+cash_num+'*'].discount_sale;
			$rootScope.index=cash_global.cashes['cash_num'+cash_num+'*'].index;
			/*sk 30/12/15 pause chess*/
			$rootScope.numprod_hova_cash=cash_global.cashes['cash_num'+cash_num+'*'].numprod_hova_cash;
			$rootScope.numprod_zchut_cash=cash_global.cashes['cash_num'+cash_num+'*'].numprod_zchut_cash;
			$rootScope.numprod_hova=$rootScope.numprod_hova+cash_global.cashes['cash_num'+cash_num+'*'].numprod_hova_cash;
			$rootScope.numprod_zchut=$rootScope.numprod_zchut+cash_global.cashes['cash_num'+cash_num+'*'].numprod_zchut_cash;
			
			//client
			if($rootScope.SearchClient!=undefined&&$rootScope.SearchClient!=""){
				$(".leftside .find_cust_container ").show();
			}
			 $("#add_customer_m").val(cash_global.cashes['cash_num'+cash_num+'*']['customer_m_name']) ;
			 $("#add_customer_m_phone").val(cash_global.cashes['cash_num'+cash_num+'*']['customer_m_phone']) ;
			 $("#add_customer_m_car").val(cash_global.cashes['cash_num'+cash_num+'*']['customer_m_car']) ;
			 
			$('input[name="chequebanknumber"]').val($rootScope.SearchClient.BankNo);	
			$('input[name="chequebranch"]').val($rootScope.SearchClient.BankDeptNo);	
			$('input[name="chequeaccountnumber"]').val($rootScope.SearchClient.BankCntNo);	
			if($rootScope.SearchClient.GroupId!=0&&$rootScope.SearchClient.GroupId!=undefined){
				if($rootScope.SearchClient.length!=0||$rootScope.SearchClient.ID!=$rootScope.SearchClientlast.ID){
						$rootScope.SearchClient['group_p']=$scope.clientgroups[$scope.getIndex($scope.clientgroups ,parseInt($rootScope.SearchClient.GroupId))].Percent;
						/*sk 09/09/2015 pause ches*/
						if(!$rootScope.isMoadon){
							$rootScope.SearchClient['group_p']=0;
						}
						$rootScope.SearchClient['group_name']=$scope.clientgroups[$scope.getIndex($scope.clientgroups ,parseInt($rootScope.SearchClient.GroupId))].GroupName;
						$rootScope.global_dis=(100-$rootScope.SearchClient['group_p'])/100;	
						if($rootScope.before_global_dis==undefined||$rootScope.before_global_dis==0){
							$rootScope.before_global_dis=$rootScope.amount;	
							$rootScope.amount=($rootScope.amount*$rootScope.global_dis).toFixed(2);
						}	
						else{
							$rootScope.amount=($rootScope.before_global_dis*$rootScope.global_dis).toFixed(2);
						}
		
						//$rootScope.amount_maam=(parseFloat($rootScope.amount)*0.17).toFixed(2);/*sk 08/10 change vat*/
						//$rootScope.amount_out=(parseFloat($rootScope.amount)*0.83).toFixed(2);/*sk 08/10 change vat*/
						$rootScope.check_discounts();
			              $rootScope.amount_maam = (($rootScope.amount * 17)/117).toFixed(2);
			              $rootScope.amount_out= ($rootScope.amount-$rootScope.amount_maam).toFixed(2);
						$(".discount_group").show();
				}
			
			}
			else{
				$rootScope.amount=$rootScope.before_global_dis;	
				$(".discount_group").hide();
			}
			$scope.hov=parseInt($rootScope.SearchClient.Hov)-(parseInt($rootScope.SearchClient.Zikui)+parseInt($rootScope.SearchClient.Hakafa));
			if(isNaN($scope.hov)){
				$scope.hov=0;
			}
			if($scope.hov>=0){
				$(".yitrat_hov").text("יתרה: "+$scope.hov);
			}
			else{
				$(".yitrat_hov").text("יתרה: "+parseInt($scope.hov)*-1);			
			}	
			//end client
			
			$rootScope.countprod=cash_global.cashes['cash_num'+cash_num+'*'].countprod;
			if($rootScope.countprod==undefined||$rootScope.countprod==""){
				$rootScope.countprod=0;
			}
			if($rootScope.discounttype==1){
		    	$rootScope.new1=cash_global.cashes['cash_num'+cash_num+'*'].discountperc;
				$rootScope.new2=cash_global.cashes['cash_num'+cash_num+'*'].discountamount;
		    }
		    else{
		    	$rootScope.new1=cash_global.cashes['cash_num'+cash_num+'*'].discountamount;
				$rootScope.new2=cash_global.cashes['cash_num'+cash_num+'*'].discountperc;
		    }
			
			
			$rootScope.comment=cash_global.cashes['cash_num'+cash_num+'*'].comment;
			$rootScope.commentClass=cash_global.cashes['cash_num'+cash_num+'*'].commentClass;
			cash_global.worker=cash_global.cashes['cash_num'+cash_num+'*'].worker;
			$('.worker_'+cash_global.worker+' .fa-check-circle').show();
			local.setLocal('worker',cash_global.worker);
			
			cash_global.products.splice(0, cash_global.products.length);			
			if(typeof cash_global.cashes['cash_num'+cash_num+'*'].products !=='object'){
					cash_global.cashes['cash_num'+cash_num+'*'].products=JSON.parse(cash_global.cashes['cash_num'+cash_num+'*'].products);
				}
			for(var k in cash_global.cashes['cash_num'+cash_num+'*'].products) {
			   cash_global.products.push(cash_global.cashes['cash_num'+cash_num+'*'].products[k]);
			}
			cash_global.payments_type.akafa=0;
	    	 cash_global.payments_type.cash.splice(0, cash_global.payments_type.cash.length);
	    	 cash_global.payments_type.cheque.splice(0, cash_global.payments_type.cheque.length);
	    	 cash_global.payments_type.credit.splice(0, cash_global.payments_type.credit.length);
	    	 cash_global.payments_type.akafadebt.splice(0, cash_global.payments_type.akafa.length);
	    	 cash_global.payments_type.shovar.splice(0, cash_global.payments_type.shovar.length);
	    	 cash_global.payments_type.shovarzicuy.splice(0, cash_global.payments_type.shovarzicuy.length);	    	 
	    	 cash_global.payments_type.points.splice(0, cash_global.payments_type.points.length);
	    	 cash_global.payments_type.prepaid.splice(0, cash_global.payments_type.prepaid.length);
	    	 
			if(typeof cash_global.cashes['cash_num'+cash_num+'*'].payments !=='object'){
					cash_global.cashes['cash_num'+cash_num+'*'].payments=JSON.parse(cash_global.cashes['cash_num'+cash_num+'*'].payments);
				}
			if(cash_global.cashes['cash_num'+cash_num+'*'].payments!=null){
				for(var k in cash_global.cashes['cash_num'+cash_num+'*'].payments['cash']) {
					   cash_global.payments_type['cash'].push(cash_global.cashes['cash_num'+cash_num+'*'].payments['cash'][k]);
					   /*sk 30/12/15*/
					  $rootScope.finalltash['all']= (parseFloat($rootScope.finalltash['all'])+parseFloat(cash_global.cashes['cash_num'+cash_num+'*'].payments['cash'][k].amount)).toFixed(2);
					  $rootScope.finalltash['cash']= (parseFloat($rootScope.finalltash['cash'])+parseFloat(cash_global.cashes['cash_num'+cash_num+'*'].payments['cash'][k].amount)).toFixed(2);
					  if(parseFloat(cash_global.cashes['cash_num'+cash_num+'*'].payments['cash'][k].amount)>0){
					  	  $rootScope.finalltash['cash1']['hova']= (parseFloat($rootScope.finalltash['cash1']['hova'])+parseFloat(cash_global.cashes['cash_num'+cash_num+'*'].payments['cash'][k].amount)).toFixed(2);
					  }
					  else{
					  	$rootScope.finalltash['cash1']['zicuy']= (parseFloat($rootScope.finalltash['cash1']['zicuy'])+parseFloat(cash_global.cashes['cash_num'+cash_num+'*'].payments['cash'][k].amount)).toFixed(2);
					  }
					  
				}
				for(var k in cash_global.cashes['cash_num'+cash_num+'*'].payments['cheque']) {
					   cash_global.payments_type['cheque'].push(cash_global.cashes['cash_num'+cash_num+'*'].payments['cheque'][k]);
					   /*sk 30/12/15*/
					  $rootScope.finalltash['all']= (parseFloat($rootScope.finalltash['all'])+parseFloat(cash_global.cashes['cash_num'+cash_num+'*'].payments['cheque'][k].amount)).toFixed(2);
					  $rootScope.finalltash['cheque']= (parseFloat($rootScope.finalltash['cheque'])+parseFloat(cash_global.cashes['cash_num'+cash_num+'*'].payments['cheque'][k].amount)).toFixed(2);
					  if(parseFloat(cash_global.cashes['cash_num'+cash_num+'*'].payments['cheque'][k].amount)>0){
					  	  $rootScope.finalltash['cheque1']['hova']= (parseFloat($rootScope.finalltash['cheque1']['hova'])+parseFloat(cash_global.cashes['cash_num'+cash_num+'*'].payments['cheque'][k].amount)).toFixed(2);
					  }
					  else{
					  	$rootScope.finalltash['cheque1']['zicuy']= (parseFloat($rootScope.finalltash['cheque1']['zicuy'])+parseFloat(cash_global.cashes['cash_num'+cash_num+'*'].payments['cheque'][k].amount)).toFixed(2);
					  }
				}
				for(var k in cash_global.cashes['cash_num'+cash_num+'*'].payments['credit']) {
					   cash_global.payments_type['credit'].push(cash_global.cashes['cash_num'+cash_num+'*'].payments['credit'][k]);
					    /*sk 30/12/15*/
					  $rootScope.finalltash['all']= (parseFloat($rootScope.finalltash['all'])+parseFloat(cash_global.cashes['cash_num'+cash_num+'*'].payments['credit'][k].amount)).toFixed(2);
					  $rootScope.finalltash['credit']= (parseFloat($rootScope.finalltash['credit'])+parseFloat(cash_global.cashes['cash_num'+cash_num+'*'].payments['credit'][k].amount)).toFixed(2);
					  if(parseFloat(cash_global.cashes['cash_num'+cash_num+'*'].payments['credit'][k].amount)>0){
					  	  $rootScope.finalltash['credit1']['hova']= (parseFloat($rootScope.finalltash['credit1']['hova'])+parseFloat(cash_global.cashes['cash_num'+cash_num+'*'].payments['credit'][k].amount)).toFixed(2);
					  }
					  else{
					  	$rootScope.finalltash['credit1']['zicuy']= (parseFloat($rootScope.finalltash['credit1']['zicuy'])+parseFloat(cash_global.cashes['cash_num'+cash_num+'*'].payments['credit'][k].amount)).toFixed(2);
					  }
				}
				for(var k in cash_global.cashes['cash_num'+cash_num+'*'].payments['akafa']) {
					   cash_global.payments_type['akafa'].push(cash_global.cashes['cash_num'+cash_num+'*'].payments['akafa'][k]);
				}
				for(var k in cash_global.cashes['cash_num'+cash_num+'*'].payments['shovar']) {
					   cash_global.payments_type['shovar'].push(cash_global.cashes['cash_num'+cash_num+'*'].payments['shovar'][k]);
				}
				for(var k in cash_global.cashes['cash_num'+cash_num+'*'].payments['shovarzicuy']) {
					   cash_global.payments_type['shovarzicuy'].push(cash_global.cashes['cash_num'+cash_num+'*'].payments['shovarzicuy'][k]);
				}
				for(var k in cash_global.cashes['cash_num'+cash_num+'*'].payments['points']) {
					   cash_global.payments_type['points'].push(cash_global.cashes['cash_num'+cash_num+'*'].payments['points'][k]);
				}
				for(var k in cash_global.cashes['cash_num'+cash_num+'*'].payments['prepaid']) {
					   cash_global.payments_type['prepaid'].push(cash_global.cashes['cash_num'+cash_num+'*'].payments['prepaid'][k]);
				}
			}
			/*dell the pause chess*/
			cash_global.cashes['cash_num'+cash_num+'*']={};
			$scope.cashes['cash_num'+cash_num+'*']={};
			
			/*sk 09/12 not save cash_num in pause chess*/
			$rootScope.cash_num_pause=cash_num;
			local.setLocal('payment',cash_global.payments_type);
			local.setLocal('products',cash_global.products);
			
		}
		
		$scope.printpause=function(){
			$( '.wrap' ).click();
			$scope.printTemp1($scope.curr_cash);
			$(".pop_hachlafa2 tr").removeClass('details_choose');	
		}
		
		
		$scope.getIndex = function(groups, groupId){
			var idx = 0;
			var ret = 0;
				groups.filter(function(obj){
					if(obj["ID"] == groupId){
						ret = idx;
					}
					idx++;
				});
				return ret;
		}
		$scope.choose_cash=function(this1,id){
	    	/*$(".pop_hachlafa2 tr").css('background','white');
			$(".pop_hachlafa2 tr .fa-check-circle").hide();
		    $(this1).css('background','#dcf3f9');	
			$('.pause_'+id+' .fa-check-circle').show();*/
			$(".pop_hachlafa2 tr").removeClass('details_choose');	
			$('.pause_'+id).addClass('details_choose');
			$scope.curr_cash=id;
    	};
    	
    	$scope.start_pausecashes=function(){
    		if($rootScope.amount==0){
    			openwrap('.pause,.pop_hachlafa2','.an,.pop_hachlafa2,.pop_hachlafa');
    		}
    		else{
    			alert.alert_site('יש להשהות עסקה נוכחית כדי להכנס לעסקאות בהשהייה',1,1);
    		}    		    		
		}
	
  }])
})();

