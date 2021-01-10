(function() {
  var app = angular.module('AnachaM', []);
	
 app.controller('AnachaController',[ '$scope', '$rootScope','cash_global','local','tabs','alert',function ($scope,$rootScope,cash_global,local,tabs,alert){ 
 		
		$rootScope.isMoadon=true;
 		$rootScope.start_anacha = function (){
 			/*if($rootScope.before_global_dis!=$rootScope.amount){
 				$(".s_original").val($rootScope.before_global_dis);
 				$(".s_new").val($rootScope.amount);				  
 				$(".anacha_txt.anacha_txt2").val($rootScope.SearchClient['group_p']);
 				$(".pop_anacha  input[type=text],.anacha_half.right input").prop('disabled','true');
 				openwrap(".pop_anacha,.calc_area",".an,.pop_anacha");
 				return;
 			}*/
 			if($rootScope.right_pass==1||$rootScope.premission_list['permission_discount']=='on'){
 				$rootScope.right_pass=0;
 				tabs.setTab(5);
				if($rootScope.amount!=0&&$rootScope.amount!=0.00){
					$rootScope.new1=$rootScope.amount;
					//if($(".s_new").val()==''){
						$(".s_new").val($rootScope.amount);
						$(".s_original").val($scope.getTotal());
					//}
		
			 		if($rootScope.anacha==undefined||$rootScope.anacha==0){
			 			$rootScope.anacha='';
			 		}
	
			 			$rootScope.original_afterprod=$scope.getTotal();	
	
			 		openwrap(".pop_anacha,.calc_area",".an,.pop_anacha");
			 		$(".anacha,.pop_anacha .anacha_txt").focus();
				}
 			}
 			else{
 				$rootScope.action="start_anacha";
 				alert.alert_site('משתמש לא מורשה',3,1);
 			}	
	 		
		};
		
		$scope.anacha_btn = function (this1){
			$('.anacha_half.right .mybtn').removeClass('btnorange');
			$('.anacha_half.right .mybtn').removeClass('anacha_btn');
			$(this1).addClass('btnorange');
			if(this1.indexOf('shch')>-1){
				$rootScope.discounttype=2;
			}
			else{
				$rootScope.discounttype=1;
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
		
		$scope.calc_anacha = function (){
				var x1=$rootScope.new1;
				var x2=$rootScope.new2;

				$rootScope.befrore1=$rootScope.before_global_dis;

			if($(".container_pop.an .anacha_txt").val()!=''){
				if($(".container_pop.an input[name=achuz]").hasClass("btnorange")){
					$rootScope.discounttype=1;
					$rootScope.disccperc=parseFloat($(".container_pop.an .anacha_txt").val());
					$rootScope.new1=(parseFloat($(".container_pop.an .s_original").val())*(100-parseFloat($(".container_pop.an .anacha_txt").val()))/100).toFixed(2);
					if($rootScope.amount>0){
						$rootScope.new2=(parseFloat($(".container_pop.an .s_original").val())-parseFloat($(".container_pop.an .anacha_txt").val())).toFixed(2);
					}
					else{
						$rootScope.new2=(parseFloat($(".container_pop.an .s_original").val())+parseFloat($(".container_pop.an .anacha_txt").val())).toFixed(2);
					}					
					$rootScope.before_global_dis=($scope.getTotal()*(100-parseFloat($(".container_pop.an .anacha_txt").val()))/100).toFixed(2);
				}
				else{
					if($(".container_pop.an input[name=shch]").hasClass("btnorange")){
					$rootScope.discounttype=2;
					$rootScope.disccperc=parseFloat($(".container_pop.an .anacha_txt").val());
					if($rootScope.amount>0){
						$rootScope.new1=(parseFloat($(".container_pop.an .s_original").val())-parseFloat($(".container_pop.an .anacha_txt").val())).toFixed(2);
					}
					else{
						$rootScope.new1=(parseFloat($(".container_pop.an .s_original").val())+parseFloat($(".container_pop.an .anacha_txt").val())).toFixed(2);
					}
					
					$rootScope.new2=(parseFloat($(".container_pop.an .s_original").val())*(100-parseFloat($(".container_pop.an .anacha_txt").val()))/100).toFixed(2);
					$rootScope.before_global_dis=($scope.getTotal()-parseFloat($(".container_pop.an .anacha_txt").val())).toFixed(2);
					}
				}
				if(isNaN($rootScope.new1)){
					$rootScope.new1=x1;
					$rootScope.new12=x2;
				}
					
				$rootScope.new1=parseFloat($rootScope.new1).toFixed(2);
				$(".s_new").val($rootScope.new1);
			}
		};
		$scope.end_anacha = function(){
			flag=1;
			ann=$('input[name=anacha_all]').val();
			ann=parseFloat(ann);
			
			
			if($(".an input[name=achuz]").hasClass("btnorange")){
				typelog="אחוז";
					$('.an input[name=achuz]').click();
					if(ann<0||ann>100){
						alert.alert_site('סכום הנחה אינו תקין',1,1);
						flag=0;
					}
			}
			else{
				if(ann<0||ann>Math.abs($rootScope.amount)){
					alert.alert_site('סכום הנחה אינו תקין',1,1);
					flag=0;
				}
				typelog="שח";
					$('.an input[name=shch]').click();
			}	
			if(flag==1){
			$( '.wrap' ).click();
		writelog("הוספת הנחה לחשבון: "+"לפני הנחה:"+$rootScope.amount+" אחרי הנחה: "+$rootScope.new1+" "+typelog);
			$rootScope.amount=(parseFloat($rootScope.new1)).toFixed(2);
			//$rootScope.amount=($rootScope.amount*$rootScope.global_dis).toFixed(2);
			//$rootScope.before_global_dis=$rootScope.new1;
			//$rootScope.global_dis1=parseFloat(((1-$rootScope.global_dis).toFixed(2)))+1;
			//$rootScope.before_global_dis=$rootScope.new1*$rootScope.global_dis1;
			//$rootScope.amount_maam=(parseFloat($rootScope.new1)*0.17).toFixed(2);/*sk 08/10 change vat*/
			$rootScope.check_discounts();
			 $rootScope.amount_maam = ((parseFloat($rootScope.new1)* 17)/117).toFixed(2);
			 $rootScope.amount_out= ($rootScope.amount-$rootScope.amount_maam).toFixed(2);
			//$rootScope.amount_out=(parseFloat($rootScope.new1)*0.83).toFixed(2);/*sk 08/10 change vat*/
			$(".before_calc").show();
			if($rootScope.itra!=0&&$rootScope!=""){
				$rootScope.itra=(parseFloat($rootScope.amount)-parseFloat($rootScope.paid)).toFixed(2);
			}
			}
		};
		
		$scope.end_anach_prod=function(){
			ann=$('input[name=anacha_parit]').val();
			ann=parseFloat(ann);
			flag=1;
			
			$rootScope.amount=(parseFloat($rootScope.before_global_dis)).toFixed(2);
			$rootScope.isMoadon=false;                  //   lc 06/06/2016 remove -isMoadon need also true
			$rootScope.SearchClient['group_p']=0;       //   lc 06/06/2016 remove
			$(".discount_group p:last-child").hide();   //   lc 06/06/2016 remove
			key1=$('.an_prod input[name=BarCode]:hidden').val();
			for(var i = 0; i < cash_global.products.length; i++){
		       var product = cash_global.products[i];
				if(product['index']==$rootScope.currIndex){
					var product2=cash_global.products[i];
					break;
				}
		    }
		    product=product2;
			if($(".an_prod input[name=achuz]").hasClass("btnorange")){
				if(ann<0||ann>100){
						alert.alert_site('סכום הנחה אינו תקין',1,1);
					flag=0;
				}
					$('.an_prod input[name=achuz]').click();
			}
			else{
				if(ann<0||ann>Math.abs(cash_global.products[i]['SalePrice'])){
					alert.alert_site('סכום הנחה אינו תקין',1,1);
					flag=0;
				}
					$('.an_prod input[name=shch]').click();
			}	
			if(flag==1){
			$( '.wrap' ).click();
			if($('.container_pop.an_prod input[name=shch]').hasClass('btnorange')){
				var typedis=2;
				var typedislog="שח";
			}
			else{
				var typedis=1;
				var typedislog="אחוז";
			}
			
			
			//for(var i = 0; i < cash_global.products.length; i++){
		        //var product = cash_global.products[i];
		       // var product=cash_global.products[$rootScope.currIndex];
		       // var i=$rootScope.currIndex;
		        //if(product['BarCode']==key1){

		        	cash_global.products[i]['Discount']=parseFloat((cash_global.products[i]['SalePrice'])-parseFloat($(".an_prod .s_new1").val())).toFixed(2);	
		     	    cash_global.products[i]['finalamount']= $(".an_prod .s_new1").val();  
		     	    cash_global.products[i]['Discount2']=parseFloat((cash_global.products[i]['SalePrice'])-parseFloat($(".an_prod input[name='s_new2']").val())).toFixed(2);	
		     	   if(typedis==1){
						cash_global.products[i]['discountperc']=parseFloat((cash_global.products[i]['SalePrice'])-parseFloat($(".an_prod .s_new1").val())).toFixed(2);		     	 
					}
					else{
						cash_global.products[i]['discountamount']=parseFloat((cash_global.products[i]['SalePrice'])-parseFloat($(".an_prod .s_new1").val())).toFixed(2);			     	 
					}		     	    
		     	    cash_global.products[i]['cdisctype']=typedis;  	
		     	    writelog("הנחת פריט ל ברקוד: "+typedislog+" לפני הנחה:"+cash_global.products[i]['SalePrice']+" לאחר הנחה:"+$(".an_prod .s_new1").val()+" לברקוד: "+cash_global.products[i]['BarCode']);
		        	//break;
		       // }
		   // }
			
			if($rootScope.new1!=""&&$rootScope.new1!=0&$rootScope.new1!=undefined&&$rootScope.original_afterprod!=""&&$rootScope.original_afterprod!=0&$rootScope.original_afterprod!=undefined){
				$rootScope.amount=(parseFloat($scope.getTotal()-($rootScope.original_afterprod-$rootScope.new1))).toFixed(2) ;//lc 06/06/2016 getTotal() -> getTotalOfMoadon()
				if($rootScope.isMoadon){
					$rootScope.amount=($rootScope.amount*$rootScope.global_dis).toFixed(2);
					
				}
				$rootScope.before_global_dis=$scope.getTotal()-($rootScope.original_afterprod-$rootScope.new1);
			}
			else{
				$rootScope.amount=(parseFloat($scope.getTotal())).toFixed(2); //lc 06/06/2016 getTotal() -> getTotalOfMoadon()
				if($rootScope.isMoadon){
					$rootScope.amount=($rootScope.amount*$rootScope.global_dis).toFixed(2);
					
				}
				// $amountOfTransactionsDiscount=(parseFloat($scope.getTotalOfDiscountOnly())).toFixed(2);                   // lc 06/06/2016 get all sum of transactions whith discount
				// $rootScope.amount = (parseFloat($rootScope.amount)+parseFloat($amountOfTransactionsDiscount)).toFixed(2); // lc 06/06/2016 add to amount sum whith out discount 
				$rootScope.before_global_dis=$scope.getTotal();
			}
						
			//$rootScope.amount_maam=(parseFloat($rootScope.amount)*0.17).toFixed(2);/*sk 08/10 change vat*/
			//$rootScope.amount_out=(parseFloat($rootScope.amount)*0.83).toFixed(2);/*sk 08/10 change vat*/
			$rootScope.check_discounts();
              $rootScope.amount_maam = (($rootScope.amount * 17)/117).toFixed(2);
              $rootScope.amount_out= ($rootScope.amount-$rootScope.amount_maam).toFixed(2);
			$rootScope.original_afterprod=$scope.getTotal();	
			//$(".before_calc").show();
			local.setLocal('products',cash_global.products);
			$rootScope.currIndex=-1;
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

		/*lc 06/06/2016 for calculation discount moadon without discount an item */
		$scope.getTotalOfMoadon = function(){
		   	var totalDiscount=0;
		    var total = 0;
		    for(var i = 0; i < cash_global.products.length; i++){
		        var product = cash_global.products[i]; 
		        if(product.Discount>0){
		        	totalDiscount+=(product.SalePrice)*product.Amount -product.Discount;
		                }
		        total += (product.SalePrice)*product.Amount -product.Discount;
		     	 }
		    return total.toFixed(2)-totalDiscount.toFixed(2);  
		}
		
			/*lc 06/06/2016 for calculation mam also on transaction discount*/
		$scope.getTotalOfDiscountOnly = function(){
		   	var totalDiscountOnly=0;
		    for(var i = 0; i < cash_global.products.length; i++){
		        var product = cash_global.products[i]; 
		        if(product.Discount>0){
		        	totalDiscountOnly+=(product.SalePrice)*product.Amount -product.Discount;
		                }
		     	 }
		    return totalDiscountOnly.toFixed(2);  
		}
		
		
		$scope.calc_anacha_prod = function(){
			
			
			key1=$('.an_prod input[name=BarCode]:hidden').val();
			for(var i = 0; i < cash_global.products.length; i++){
		        var product = cash_global.products[i];
				if(product['index']==$rootScope.currIndex){
					var sale=cash_global.products[i]['SalePrice'];
				}
		    }
		    
			if(parseFloat($rootScope.price)<0){
				var minus=-1;
			}
			else{
				var minus=1;
			}
			var ezer=$(".an_prod .anacha_txt").val();
			
			if($(".an_prod input[name=achuz]").hasClass("btnorange")){
					x=(parseFloat(sale)*(100-parseFloat($(".an_prod .anacha_txt").val()))/100).toFixed(1);
					x2=(parseFloat(sale)-parseFloat($(".an_prod .anacha_txt").val())*minus ).toFixed(2);
					type=0;
				}
				else{
					x=(parseFloat(sale)-parseFloat($(".an_prod .anacha_txt").val())*minus).toFixed(2);
					x2=(parseFloat(sale)*(100-parseFloat($(".an_prod .anacha_txt").val()))/100).toFixed(2);
					type=1;
				}
				if(!isNaN(x)){
					$(".an_prod .s_new1").val(parseFloat(x).toFixed(2));
					$(".an_prod input[name=s_new2]:hidden").val(parseFloat(x2).toFixed(2));
					$(".an_prod input[name=type]:hidden").val(type);
				}
				
		};
		
  }]);
})();

