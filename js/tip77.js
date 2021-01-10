(function() {
  var app = angular.module('TipM', []);
	
 app.controller('TipController',[ '$scope', '$rootScope','cash_global','local','tabs','alert','openwindows',function ($scope,$rootScope,cash_global,local,tabs,alert,openwindows){ 
 		
		$rootScope.isMoadon=true;
 		$rootScope.start_tip = function (mode){
 			//if($rootScope.right_pass==1||$rootScope.premission_list['permission_tip']=='on'){
 				$rootScope.tip_mode = mode;
 				$rootScope.right_pass=0;
 				tabs.setTab(5);
				if($rootScope.amount!=0&&$rootScope.amount!=0.00){
					$rootScope.new1=$rootScope.amount;
				   $(".s_original").val($rootScope.amount);


			 			$rootScope.tip2=0;
			 		
	
			 			$rootScope.original_afterprod=$scope.getTotal();	
	
			 		openwrap(".pop_tip,.calc_area",".container_pop.tip,.pop_tip");
			 		$(".container_pop.tip,.pop_tip").css({'z-index':'99999'});
			 		$(".tip,.pop_tip .tip_txt").focus();
				}
 			/*}
 			else{
 				$rootScope.action="start_tip";
 				alert.alert_site('משתמש לא מורשה',3,1);
 			}	*/
	 		$scope.$apply();
		};
		
		$scope.tip_btn = function (this1){
			$('.tip_half.right .mybtn').removeClass('btnorange');
			$('.tip_half.right .mybtn').removeClass('tip_btn');
			$(this1).addClass('btnorange');
			if(this1.indexOf('shch')>-1){
				$rootScope.tiptype=2;
			}
			else{
				$rootScope.tiptype=1;
			}
		};


    	this.products=cash_global.products;
		$scope.getTotal = function(){
		    var total = 0;
		    for(var i = 0; i < this.products.length; i++){
		        var product = this.products[i];
		        total += (product.SalePrice-product.Discount)*product.Amount;
		    }
		    return total.toFixed(2);
		}
		
		$scope.add_tip_to_cart = function(cat_name,price){
			price = parseFloat(price);
	    			$rootScope.countprod++;
	    			$rootScope.new_id++;
	    			 if($rootScope.refund==0){
					   		$rootScope.numprod_hova++;	
					   		$rootScope.numprod_hova_cash++;	
					   		local.setLocal('z-numprod_hova',$rootScope.numprod_hova);
					   }
					   else{
					   		$rootScope.numprod_zchut++;	
					   		$rootScope.numprod_zchut_cash++;	
					   		local.setLocal('z-numprod_zchut',$rootScope.numprod_zchut);
					   }	
		    		if($rootScope.refund==1){				
						$('.zicuy').toggleClass("zicuy_zctive");
						price=-price
						//$rootScope.refund=0;
					}
					
					writelog("הוספת טיפ  בסכום: "+price);
					$rootScope.index++;
			   		var x={
			   			"Amount": 1,
						"ID":"0",
						"Title": "טיפ" ,
						"BarCode":"newid_"+$rootScope.new_id,
						"SalePrice":price,
						"Amount":1,
						"Discount":0, 
						"Discount2":0,
						"comment": cat_name,	   			
						"commentClass":'',			   			
			   			"comptype":"2",
			   			"department":"-1",
			   			"finalamount":price,			   			
			   			"cdisctype":0,
			   			"refund":$rootScope.refund,
			   			"index":$rootScope.index,
			   			"category":"9999",
			   			"Unit": 0,
			   			"discount_sale":0
			   			
			   		};
			   		
			   		$rootScope.refund=0;
					cash_prd.products.push(x);
					$rootScope.amount=(parseFloat($rootScope.before_global_dis)+parseFloat(price)).toFixed(2);
					if($rootScope.isMoadon){
						$rootScope.amount=($rootScope.amount*$rootScope.global_dis).toFixed(2);
						
					}
					$rootScope.before_global_dis=(parseFloat($rootScope.before_global_dis)+parseFloat(price)).toFixed(2);
		              $rootScope.amount_maam = (($rootScope.amount * 17)/117).toFixed(2);
		              $rootScope.amount_out= ($rootScope.amount-$rootScope.amount_maam).toFixed(2);
					$rootScope.original_afterprod=$scope.getTotal();	
					
					$('.input_result input[name=Input]').val('');
				    local.setLocal('products',cash_prd.products);
	    		
	    		
	    				
	    	$scope.$apply();
	    	var elem = document.getElementById('cat2');
  			elem.scrollTop = elem.scrollHeight;
		
		};
		
		$scope.calc_tip = function (){

				$rootScope.befrore1=$rootScope.before_global_dis;

			if($(".container_pop.tip .tip_txt").val()!=''){
				if($(".container_pop.tip input[name=achuz]").hasClass("btnorange")){
					$rootScope.tiptype=1;
					$rootScope.tip2=parseFloat($(".container_pop.tip .tip_txt").val());
					$rootScope.tip2 = $rootScope.tip2 * $rootScope.amount / 100;
				}
				else{
					if($(".container_pop.tip input[name=shch]").hasClass("btnorange")){
						$rootScope.tiptype=2;
						$rootScope.tip2=parseFloat($(".container_pop.tip .tip_txt").val());
					
					}
				}	
			}
			 if($rootScope.refund==0){
				$rootScope.new1 = parseFloat($rootScope.amount) + parseFloat($rootScope.tip2);
			}
			else{
				$rootScope.new1 = parseFloat($rootScope.amount) - parseFloat($rootScope.tip2);
				$rootScope.tip2 = -$rootScope.tip2;
			}
			$rootScope.new1 = $rootScope.new1.toFixed(2);
			$(".s_new").val($rootScope.new1);
			$rootScope.refund=0;
		};
		$scope.end_tip = function(){
			flag=1;
			tip=$('input[name=tip_all]').val();
			tip=parseFloat(tip);
			if($(".tip input[name=achuz]").hasClass("btnorange")){
				typelog="אחוז";
					$('.tip input[name=achuz]').click();
					if(tip<0||tip>100){
						alert.alert_site('סכום טיפ אינו תקין',1,1);
						flag=0;
					}
								$scope.add_tip_to_cart("טיפ "+tip+"% מהחשבון",$rootScope.tip2);

			}
			else{
				
				typelog="שח";
					$('.tip input[name=shch]').click();
								$scope.add_tip_to_cart("טיפ "+ $rootScope.tip2 + " ש\"ח ",$rootScope.tip2);

			}	
			if(flag==1){
			$( '.wrap' ).click();
		writelog("הוספת tip לחשבון: "+"לפני tip:"+$rootScope.amount+" אחרי tip: "+$rootScope.new1+" "+typelog);
			
			$(".before_calc").show();
			$(".input_sum.ashray_text").text($rootScope.itra + $rootScope.tip - $rootScope.tip_paid);
			if($rootScope.itra!=0&&$rootScope!=""){
				$rootScope.itra=(parseFloat($rootScope.amount)-parseFloat($rootScope.paid)).toFixed(2);
			}
			}
			str=".pay,.pop_peulot";
			popup=".type_pay.container_pop,.popup_pay ";
			$(str).css({'z-index':'9999'});
		    $(popup).css({'display':'block'});
			$(".wrap").css({'display':'block'});
			$(".input_sum").val($rootScope.itra);
			if($rootScope.tip_mode=='credit'){
				openwindows.openwrap2('','.ashray.container_pop');
				$('textarea[name=ashray_f]').focus();

			}
			if($rootScope.tip_mode=='gift'){
				openwindows.openwrap2('','.prifeyd.container_pop');
			}
		};
		

		
		$scope.getTotal = function(){
		    var total = 0;
		    for(var i = 0; i < cash_global.products.length; i++){
		        var product = cash_global.products[i];
		        total += (product.SalePrice-product.Discount)*product.Amount;
		    }
		    return total.toFixed(2);
		}


		
  }]);
})();

