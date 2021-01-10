
 (function() {
  var app = angular.module('AchlafaM', []);
	
  
 app.controller('AchlafaController',[ '$scope', '$rootScope','cash_global',function ($scope,$rootScope,cash_global){ 
		
		$rootScope.showprod=false;
		this.cashes = cash_global.cashes;
		$scope.repeatin=cash_global.products;

		$rootScope.prod={};
		$scope.index=0;
		$scope.start_achlafa = function (){
			$rootScope.showprod=false;
			$rootScope.prod={};
		};
    	$scope.hachlafa_barcode = function (barcode){
    		$('#achlafa_pritim tr[data-id="'+barcode+'"]').toggleClass('details_choose');
			$('#achlafa_pritim tr[data-id="'+barcode+'"]').find(".fa-check-circle").toggleClass('display');
			if($('#achlafa_pritim tr[data-id="'+barcode+'"]').find(".fa-check-circle").css('display')=='none'){
				 angular.forEach($scope.repeatin, function(obj,i){
		           if(obj.BarCode === barcode){
							delete $rootScope.prod_for_achlafa[i];							
					}	
		        });				
			}
			else{
				$scope.repeatin.filter(function( obj ) {
					if(obj.BarCode === barcode){
						$rootScope.prod_for_achlafa[$scope.index]=obj;
						$scope.index++;
					}						

				});
			}
			
			
		};
		$scope.choose_all_comp = function (){
			$('#achlafa_pritim tr').find(".fa-check-circle").removeClass('display');
			$('#achlafa_pritim tr').addClass('details_choose');
			$rootScope.prod_for_achlafa=[];
			angular.copy(this.cashes['cash_num'+$scope.cash_num].products, $rootScope.prod_for_achlafa);
			
		};
		
		$scope.set_tab = function (val,cash_num){
			
			$rootScope.prod_for_achlafa=[];
			$scope.cash_num=cash_num;
			$scope.curr_achlafa=cash_num;
			if(cash_num==-2){
				if(typeof cash_global.products !=='object'){
					cash_global.products=JSON.parse(cash_global.products);
				}
				$scope.repeatin=cash_global.products;
			}
			else if(cash_num!=-1){
				if(typeof this.cashes['cash_num'+cash_num].products !=='object'){
					this.cashes['cash_num'+cash_num].products=JSON.parse(this.cashes['cash_num'+cash_num].products);
				}
				$scope.repeatin=this.cashes['cash_num'+cash_num].products;
			}
			 $rootScope.showprod=val;
			 $scope.choose_all_comp();
		};	
		
		$scope.printfff = function (){
			writelog("הדפסת פתק החלפה: "+$scope.curr_achlafa);
			 var b = [];
     var num2=31;
     
		 for (var i = 1; i < 4; i++) {
		 	 var l=0;
              b[i] = [];
      // בהדפסת דמי מחזור יודפס כותרת בית העסק מספר סרט הקופה תאריך שעה והסכום
        		b[i][l]="";
				l++;
				
				b[i][l]=$rootScope.txtCenter2($rootScope.details_list.name,i);
				l++;
        		//b[l]="";
				//l++;
					if($rootScope.details_list.tz!=""){
        	
			b[i][l] = $rootScope.txtCenter(" ע.מ./ח.פ.:"+$rootScope.details_list.tz,i);
			l++;
           // p=p+"\n"+$rootScope.txtCenter(" ע.מ./ח.פ.:"+$rootScope.details_list.tz);
        }
				if($rootScope.details_list.address!=""){
        	
			b[i][l] = $rootScope.txtCenter(" כתובת:"+$rootScope.details_list.address,i);
			l++;
           // p=p+"\n"+$rootScope.txtCenter(" כתובת:"+$rootScope.details_list.address);
        }
				if($rootScope.details_list.tel!=""){
        
			b[i][l] =$rootScope.txtCenter(" טלפון:"+$rootScope.details_list.tel,i);
			l++;
           // p=p+"\n"+$rootScope.txtCenter(" טלפון:"+$rootScope.details_list.tel);
        }
        
        
        if($rootScope.details_list.fax!=""){
        	
			b[i][l] = $rootScope.txtCenter(" פקס:"+$rootScope.details_list.fax,i);
			l++;
           // p=p+"\n"+$rootScope.txtCenter(" פקס:"+$rootScope.details_list.fax);
        }
        if($rootScope.details_list.mail!=""){
        	
			b[i][l] = $rootScope.txtCenter(" אימייל:"+$rootScope.details_list.mail,i);
			l++;
          //  p=p+"\n"+$rootScope.txtCenter(" אימייל:"+$rootScope.details_list.mail);
        }
				//b[l]="";
				//l++;
				b[i][l]=$rootScope.txtCenter("פתק החלפה",i);
				l++;	
				b[i][l]=$rootScope.txtCenter(this.cashes['cash_num'+$scope.curr_achlafa].cash_kupanum,i);
				l++;
				var today = new Date();
		var dd = today.getDate();
		var mm = today.getMonth()+1; //January is 0!
		var yyyy = today.getFullYear();
		
		if(dd<10) {
		    dd='0'+dd;
		} 
		
		if(mm<10) {
		    mm='0'+mm;
		} 
		var d = new Date(); 
		h=d.getHours(); 
		m=d.getMinutes();
		s=d.getSeconds(); 
		d=h+':'+m+':'+h;
		today = mm+'/'+dd+'/'+yyyy;
				b[i][l]=$rootScope.itemLine(today,d,i);
				l++;			
				//b[l]="";
				//l++;
				//b[l]="";
				//l++;
				products=$rootScope.prod_for_achlafa;
				var j=0;
				while(typeof products[j]!="undefined"){
					b[i][l]=$rootScope.itemLine2(products[j].BarCode,products[j].Title,products[j].Amount,i);
					l++;
					j++;
				}		
				b[i][l]=$rootScope.txtCenter("החלפת מוצרים עד 14 יום מיום הקניה",i);
				l++;
				/*sk 08/02/16 print comment in hachlafa*/
				if ($rootScope.details_list.comments != "") {
                    b[i][l] = $rootScope.txtCenter($rootScope.details_list.comments,i);
                    l++;
                }
				b[i][l] = $rootScope.txtCenter('<img style="max-width:130px;width:130px;" src="https://office.yedatop.com/modules/stock/cashbox_fe/inc/barcode.php?height=50&barcode='+$scope.cashes['cash_num' + $scope.cash_num].cash_kupanum+'"/>',i);
				l++;
				b[i][l]="";
				l++;
			}
			printPrinter(b);

			//window.external.print2("achlafa");
		
			/*s=window.open("replace_receipt.php?json="+JSON.stringify($rootScope.prod_for_achlafa),"חשבונית",'top='+150+',left='+50+',height='+400+',width='+300+',resizable=yes,scrollbars=yes');
			try	{
			s.focus();
			}
			catch(e){};
			$rootScope.prod_for_achlafa*/
		};
	
  }]);
})();


 