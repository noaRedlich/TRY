(function() {
	
  var app = angular.module('cashbox', ['products','PaymentM','ClientM','WorkerM','AnachaM','PauseM','AchlafaM','KeyboardM','DebtM','settings','mezumanInOutM','ngTouch',"angucomplete-alt"]);
	
	
	app.directive('ngEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if(event.which === 13) {
                scope.$apply(function (){
                    scope.$eval(attrs.ngEnter);
                });

                event.preventDefault();
            }
        });
    };
});

app.directive('colorCase', function () {
    return {
        restrict: 'A',
        scope: {
            'condition': '='
        },
        link: function (scope, element, attrs) {
            scope.$watch('condition', function(condition){
                if(condition<0){
                    element.css('color', 'red');
                }
                else{
                    element.css('color', '#a1d46f');
                };
            });
        }
    }
 });   
angular.module('myModule', []).
  run(function() {
  	 event.preventDefault();
     event.stopPropagation();
    FastClick.attach(document.body);
    
  });

//include html pages
	app.directive("addprod", function() {
	  return {
	    restrict: 'E',
	    templateUrl: "inc/add_prod.html"
	  };
	});
	
	app.directive("login", function() {
	  return {
	    restrict: 'E',
	    templateUrl: "inc/login.html"
	  };
	});
	app.directive("settmenu", function() {
	  return {
	    restrict: 'E',
	    templateUrl: "inc/sett_head.html"
	  };
	});
	app.directive("settdetails", function() {
	  return {
	    restrict: 'E',
	    templateUrl: "inc/sett_details.html"
	  };
	});
	app.directive("addcust", function() {
	  return {
	    restrict: 'E',
	    templateUrl: "inc/add_cust.html"
	  };
	});
	app.directive("akafa", function() {
	  return {
	    restrict: 'E',
	    templateUrl: "inc/akafa2.html"
	  };
	});
	app.directive("keyboard", function() {
	  return {
	    restrict: 'E',
	    templateUrl: "inc/keyboard.html"
	  };
	});
	app.directive("anacha", function() {
	  return {
	    restrict: 'E',
	    templateUrl: "inc/anacha.html"
	  };
	});
	app.directive("payment", function() {
	  return {
	    restrict: 'E',
	    templateUrl: "inc/payment10.html"
	  };
	});
	app.directive("achlafa", function() {
	  return {
	    restrict: 'E',
	    templateUrl: "inc/achlafa2.html"
	  };
	});
	app.directive("pause", function() {
	  return {
	    restrict: 'E',
	    templateUrl: "inc/pause.html"
	  };
	});
	
	app.directive("beynaim", function() {
	  return {
	    restrict: 'E',
	    templateUrl: "inc/beynaim1.html"
	  };
	});
	app.directive("clock", function() {
	  return {
	    restrict: 'E',
	    templateUrl: "inc/clock.html"
	  };
	});
	app.directive("mezumaninout", function() {
	  return {
	    restrict: 'E',
	    templateUrl: "inc/mezuman_inout.html"
	  };
	});
	app.directive("prepaid", function() {
	  return {
	    restrict: 'E',
	    templateUrl: "inc/prepaid.html"
	  };
	});
	app.directive("comment", function() {
	  return {
	    restrict: 'E',
	    templateUrl: "inc/comment.html"
	  };
	});
	app.directive("alert", function() {
	  return {
	    restrict: 'E',
	    templateUrl: "inc/alert.html"
	  };
	});
	app.directive("payment1", function() {
	  return {
	    restrict: 'E',
	    templateUrl: "inc/payment.html"
	  };
	});
	//include html pages


	//services
	
	//manage tabs- calculator and products
	 app.factory('tabs', [ '$rootScope', function ($rootScope) {
        return {
            setTab: function(newValue) {
            	//dolog('', 142,'setTab');   
            	// $rootScope.lasttab= $rootScope.tab;
                 $rootScope.tab = newValue;
            },
            isSet: function(tabName) {        
            	//dolog('', 151,'isSet');       	
                return $rootScope.tab === tabName;                
            },
            isSetMultiCalc: function(tabName1,tabName2) {;
          		//dolog('', 151,'isSetMultiCalc');   
                return $rootScope.tab === tabName1||$rootScope.tab === tabName2;
            },
            isSetMulti: function(tabName1,tabName2,tabName3,tabName4,tabName5,tabName6,tabName7) {
            	//dolog('',155,dolog('', 155,'isSetMulti'));   
                return $rootScope.tab === tabName1||$rootScope.tab === tabName2||$rootScope.tab === tabName3||$rootScope.tab === tabName4||$rootScope.tab === tabName5||$rootScope.tab === tabName6||$rootScope.tab === tabName7;
            }
        };
         }]);
         app.factory('dates', [ '$rootScope', function ($rootScope) {
        return {
            date: function()
			{
			    $rootScope.date = new Date();
			}
            
        };
        
    }]);
    
    //validate required fields payments
     app.factory('validate', [ '$rootScope', function ($rootScope) {
        return {
            valid: function() {
            	return true;
            	str=".container_pop.amchaa";
            	if($(str).find('input:text[value=""]').length==0){
            		 return true;
            	}
            	$(str).find('input:text[value=""].required').addClass('red');
                return false;
            }
        };
        
    }]);
    
    //open windows
    app.factory('openwindows', [ '$rootScope', function ($rootScope) {
        return {
            /*openwrap: function(str,popup) {
                $(str).css({'z-index':'9999'});
			    $(popup).fadeIn();
				$(".wrap").show();
            },
            openwrap2:function(str1,str2){
            	if(str1=='checkend'&&(parseFloat($('.span_itra').text())<=0||$("input[name=helpsum]:hidden").val()=='true')){
					str2='.finish.container_pop';		
				}	
            		$(str1)	.hide();
					$(".container_pop")	.hide();
					$(str2).show();
					$(str2).css({'z-index':'9999'});
				    $(str2).fadeIn();

            }*/
            openwrap: function(str,popup) {
                $(str).css({'z-index':'9999'});
			    $(popup).css({'display':'block'});
				$(".wrap").css({'display':'block'});
 
            },
            openwrap2:function(str1,str2){
            	if(str1=='checkend'&&(parseFloat($('.span_itra').text())<=0||$("input[name=helpsum]:hidden").val()=='true')){
					str2='.finish.container_pop';		
				}	
            		$(str1).css({'display':'none'});;
					$(".container_pop").css({'display':'none'});;
					$(str2).css({'display':'block'});
					$(str2).css({'z-index':'9999'});
				    $(str2).css({'display':'block'});
            }
        };
        
    }]);
    
    
    //alerts
    app.factory('alert', [ '$rootScope','$http', function ($rootScope,$http) {
        return {
            alert_site: function(msg,type,index_onoff) {
            	if($rootScope.lrt_list[index_onoff]=='on'||1==1){
            		if(type==3){
            			$('#message').html(msg+"<p class='type_pass'>נא הקש סיסמה</p><input type='text' name='passn' class='passn' />");
            		}
            		else if(type==1){
            			$('#message').html(msg);
            		}
            		else{
            			$('#message').text(msg);
            		}
					
					$(".pop_alert").css({'display':'block'});
					$(".pop_alert").css({'z-index':'9999'});
					$(".pop_alert .container_pop").css({'display':'block'});

            	}
            		
            },
            alert_cancel:function(){
            	//actions that need manager password
            	
            	if($("input[name=passn]").length>0){
            	$http.post('inc/functions.php',  $.param({pass_manager:$('input[name=passn]').val()}), {
		        		headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
			   		 }).success(function(data){		
			   		 	if(data!=1){
			   		 		$(".type_pass").text("סיסמה לא נכונה");
			   		 		return;

			   		 	}
			   		 	else{
			   		 		$rootScope.right_pass=1;
            					switch($rootScope.action) {
							    case 'set_menu':
							        $rootScope.set_menu($rootScope.selector);
							        break;
							   
							    case 'start_clock':
								    $scope.start_clock();
									break;
								
								case 'zicuy':
								    $rootScope.zicuy();
									break;
								
								case 'start_anacha':
								    $rootScope.start_anacha();
									break;	
									
								case 'start_anacha_prod':
								    $rootScope.start_anacha_prod($rootScope.selector1,$rootScope.selector2);
									break;	
									
								case 'akafa':
								    $rootScope.add_type('.over_akafa','הקפה');
								    $rootScope.checkend();	
									break;	
										
								default:
								
							}
							$(".pop_alert").css({'display':'none'});
            				$(".pop_alert").css('z-index',"1");
			   		 	}
			   		 	
				  	});

            	}
            	
            	//actions that need ok from user
            	else if($rootScope.action=='close_k'){
            		$rootScope.print();
            		$rootScope.closebb();
				    $rootScope.end_kupa();
				    $rootScope.call_clean();

            		$(".pop_alert").css({"display":"none"});
            		$(".pop_alert").css("z-index","1");
            		$("#search_prod").focus();
            		
            		//localStorage.setItem('workerslist',JSON.stringify($rootScope.workerslist));
            	}
            	else if($rootScope.action=='add_prd'){
					$(".rightside  .submit_wrap input[type=button]").click();
					$("#p_barcode").val($rootScope.notfound);
				   $(".pop_alert").css({"display":"none"});
            		$(".pop_alert").css("z-index","1");
            		$("#search_prod").focus();
            	}
            	else if($rootScope.action=='del_cash'){
            		$rootScope.call_clean();
				    $(".pop_alert").css({"display":"none"});
            		$(".pop_alert").css("z-index","1");
            		$("#search_prod").focus();
            	}
            	else{
            		$(".pop_alert").css({"display":"none"});
            		$(".pop_alert").css("z-index","1");
            		$("#search_prod").focus();
            	}

            	 //$(".mainarea").click();
            }
        };
        
    }]);
    
     app.factory('add_cart', [ '$rootScope','local','cash_global','total', function ($rootScope,local,cash_global,total) {
     	var obj2 = {};

            obj2.add_cart=function(prod) {
            	
           				id=prod['BarCode'];
						if($rootScope.refund==1){				
							var price=parseFloat(prod['SalePrice'])*-1;
							$('.zicuy').toggleClass("zicuy_zctive");
						}
						else{
							var price=prod['SalePrice'];
						}
						
				 		var x={
				 			"ID":prod['ID'],
				   			"BarCode":prod['BarCode'],
				   			"Title":prod['Title'],
				   			"SalePrice":price,
				   			"Amount":1,
				   			"Discount":0,
				   			"comment":'',
				   			"commentClass":'',
				   			"department":prod['ProductGroup'],
				   			"comptype":"2",
				   			"finalamount":'',
				   			"Discount2":0,
				   			"cdisctype":0,
				   			"refund":$rootScope.refund
				   			
				   		};
				   		var y=0;
				    	cash_global.products.filter(function( obj ) {
								if(obj.BarCode === id){
									if($rootScope.refund==1&&obj.refund==1){
										obj2.plus_count(prod['SalePrice'],prod['BarCode'],$rootScope.refund)	
										y=1;
									}
									else if($rootScope.refund!=1&&obj.refund!=1){								
											obj2.plus_count(prod['SalePrice'],prod['BarCode'],$rootScope.refund)
											y=1;
									}
										
								}						
			
							});
			
					    if(y==1){
					    	y=0;
					    }
						else{
							$rootScope.countprod++;
							cash_global.products.push(x);
							$rootScope.amount=(parseFloat($rootScope.before_global_dis)+parseFloat(price)).toFixed(2);
				$rootScope.amount=($rootScope.amount*$rootScope.global_dis).toFixed(2);
				$rootScope.before_global_dis=(parseFloat($rootScope.before_global_dis)+parseFloat(price)).toFixed(2);
							//$rootScope.original=$rootScope.amount;
							$rootScope.amount_maam=($rootScope.amount*0.18).toFixed(2);
							$rootScope.amount_out=($rootScope.amount*0.82).toFixed(2);
							$rootScope.original_afterprod=total.getTotal();	
						}
					   if($rootScope.refund==0){
					   		$rootScope.numprod_hova++;	
					   		local.ocal('z-numprod_hova',$rootScope.numprod_hova);
					   }
					   else{
					   		$rootScope.numprod_zchut++;	
					   		local.setLocal('z-numprod_zchut',$rootScope.numprod_zchut);
					   }	
					   $rootScope.refund=0;
					   local.setLocal('products',cash_global.products);
						$(".search_input").val("");
						$("#search_prod").val("");
						$("#search_prod").focus();
        }
         obj2.minus_count=function(sum,BarCode,refund){		
		 	$rootScope.countprod--;			
			cash_global.products.filter(function( obj ) {
					if(obj.BarCode === BarCode&&(obj.Amount>1||$rootScope.refund==1)){
						if(refund==1&&obj.SalePrice<0){
							$rootScope.amount=(parseFloat($rootScope.before_global_dis)-parseFloat(sum)).toFixed(2);
				$rootScope.amount=($rootScope.amount*$rootScope.global_dis).toFixed(2);
				$rootScope.before_global_dis=(parseFloat($rootScope.before_global_dis)-parseFloat(sum)).toFixed(2);
							//$rootScope.original=$rootScope.amount;
							$rootScope.amount_maam=($rootScope.amount*0.18).toFixed(2);
							$rootScope.amount_out=($rootScope.amount*0.82).toFixed(2);
							$rootScope.original_afterprod=$scope.getTotal();	
							obj['Amount']-=1;
						}
						else if(refund!=1&&obj.SalePrice>0){
								$rootScope.amount=(parseFloat($rootScope.before_global_dis)-parseFloat(sum)).toFixed(2);
				$rootScope.amount=($rootScope.amount*$rootScope.global_dis).toFixed(2);
				$rootScope.before_global_dis=(parseFloat($rootScope.before_global_dis)-parseFloat(sum)).toFixed(2);
							//$rootScope.original=$rootScope.amount;
							$rootScope.amount_maam=($rootScope.amount*0.18).toFixed(2);
							$rootScope.amount_out=($rootScope.amount*0.82).toFixed(2);
							$rootScope.original_afterprod=$scope.getTotal();	
							obj['Amount']-=1;
							
						}
							
					}						

				});
			local.setLocal('products',cash_global.products);
		}
		obj2.plus_count=function(sum,BarCode,refund){		
			$rootScope.countprod++;		
			cash_global.products.filter(function( obj ) {
					if(obj.BarCode === BarCode){
						if(refund==1&&obj.SalePrice<0){
								$rootScope.amount=(parseFloat($rootScope.before_global_dis)+parseFloat(sum)).toFixed(2);
				$rootScope.amount=($rootScope.amount*$rootScope.global_dis).toFixed(2);
				$rootScope.before_global_dis=(parseFloat($rootScope.before_global_dis)+parseFloat(sum)).toFixed(2);
							//$rootScope.original=$rootScope.amount;
							$rootScope.amount_maam=($rootScope.amount*0.18).toFixed(2);
							$rootScope.amount_out=($rootScope.amount*0.82).toFixed(2);
							$rootScope.original_afterprod=total.getTotal();	
							obj['Amount']+=1;
						}
						else if(refund!=1&&obj.SalePrice>0){
								$rootScope.amount=(parseFloat($rootScope.before_global_dis)+parseFloat(sum)).toFixed(2);
				$rootScope.amount=($rootScope.amount*$rootScope.global_dis).toFixed(2);
				$rootScope.before_global_dis=(parseFloat($rootScope.before_global_dis)+parseFloat(sum)).toFixed(2);
							//$rootScope.original=$rootScope.amount;
							$rootScope.amount_maam=($rootScope.amount*0.18).toFixed(2);
							$rootScope.amount_out=($rootScope.amount*0.82).toFixed(2);
							$rootScope.original_afterprod=total.getTotal();	
							obj['Amount']+=1;
						}
						
					}						

				});
			local.setLocal('products',cash_global.products);
			
		}
        return obj2;
        
    }]);
    
    //get parameter from url
     app.factory('GetURLParameter', [ '$rootScope', function ($rootScope) {
        return {
            GetURLParameter: function(sParam) {
               /* var sPageURL = window.location.search.substring(1);
			    var sURLVariables = sPageURL.split('&');
			    for (var i = 0; i < sURLVariables.length; i++) 
			    {
			        var sParameterName = sURLVariables[i].split('=');
			        if (sParameterName[0] == sParam) 
			        {
			            return sParameterName[1];
			        }
			    }*/
			   return $("#stock_name").attr('data-id');
            }
        };
        
    }]);
	//services
	
	
	//filters
	
	//return empty array


	app.filter('slice', function() {
	  return function(arr, start, end) {
	    
		  	if(arr){
		  		arr=arr.slice(start, end);
		  	}
		  	else{
		  		arr=[];
		  	}
		    return arr;
	  };
	});
	
	app.filter('orderObjectBy', function() {
	  return function(items, field, reverse) {
	    var filtered = [];
	    angular.forEach(items, function(item) {
	      filtered.push(item);
	    });
	    filtered.sort(function (a, b) {
	      return (a[field] > b[field] ? 1 : -1);
	    });
	    if(reverse) filtered.reverse();
	    return filtered;
	  };
	});
	
	//substring 
	app.filter('cut', function() {
	  return function(value, wordwise, max, tail) {
	     if (!value) return '';

            max = parseInt(max, 10);
            if (!max) return value;
            if (value.length <= max) return value;

            value = value.substr(0, max);
            if (wordwise) {
                var lastspace = value.lastIndexOf(' ');
                if (lastspace != -1) {
                    value = value.substr(0, lastspace);
                }
            }

            //return value + (tail || ' …');
            return value ;
	  };
	});
	
	
	app.filter('customFunction1', function(){
	    return function (items) { 
	        var filtered = [];
	        angular.forEach(items, function(item){
	            if (item.pause==1)
	            filtered.push(item);
	        });
	        return filtered;
	    };
	});
	app.filter('customFunction0', function(){
	    return function (items) { 
	        var filtered = [];
	        angular.forEach(items, function(item){
	            if (item.pause!=1)
	            filtered.push(item);
	        });
	        return filtered;
	    };
	});
	
	//round 2 place
	app.filter('fix2', function(){
	    return function (item) { 
	    	if(item!=undefined)
	        	return item.toFixed(2);
	        return 0.00;
	    };
	});
	
	//add 0 to tranid till 9 places
	app.filter('fill_num', function(){
	    return function (item) { 
	    	if(item!=undefined){
	    		var x=9-parseInt(item.toString().length);
	        	for (var i=0; i < x; i++) {
				 	item="0"+item.toString();
				};
	    		return item;
	    	}
	        	
	        return item;
	    };
	});

	//save in local
     app.factory('local', [ '$rootScope', function ($rootScope) {
        return {
            setLocal: function(name,item) {
            	if(name=='settings'||name=='cashes'||name=='cash_num'||name=='kupa_num'||name=='finalltash'||name.indexOf('z-')>-1){
            		 localStorage.setItem(name,JSON.stringify(item));	
            	}
            	else if(name=='worker'){
            		 localStorage.setItem('cash'+$rootScope.cash_num+'_'+name,item);	
            	}  
            	else{
            		localStorage.setItem('cash'+$rootScope.cash_num+'_'+name,JSON.stringify(item));
            	}              
            }
        };
        
    }]);
    
      app.factory('clean', [ 'cash_global','$rootScope','tabs','local', function (cash_global,$rootScope,tabs,local) {
        return {
            clean: function() {
                cash_global.products.splice(0, cash_global.products.length);
				cash_global.payments_type.cash.splice(0, cash_global.payments_type.cash.length);
				cash_global.payments_type.cheque.splice(0, cash_global.payments_type.cheque.length);
				cash_global.payments_type.credit.splice(0, cash_global.payments_type.credit.length);
				cash_global.payments_type.akafadebt.splice(0, cash_global.payments_type.akafadebt.length);
				if(	cash_global.payments_type.akafa!=""){
					cash_global.payments_type.akafa.splice(0, cash_global.payments_type.akafa.length);
				}
				cash_global.payments_type.shovar.splice(0, cash_global.payments_type.shovar.length);
				cash_global.payments_type.shovarzicuy.splice(0, cash_global.payments_type.shovarzicuy.length);
				cash_global.payments_type.prepaid.splice(0, cash_global.payments_type.prepaid.length);
				
				 local.setLocal('products',cash_global.products);
				 local.setLocal('payment',cash_global.payments_type);
				 
				//cash_global.worker='';
				cash_global.original='';
				$rootScope.comment='';
				$rootScope.commentClass='';
				//cash_global.anacha='';
				$rootScope.countprod=0;
				$rootScope.amount=0.00;
				$rootScope.paid=0.00;
				$rootScope.itra=0.00;
				$rootScope.cash_amount_help=0;
				$rootScope.amount=0.00;
				$rootScope.original=0.00;
				$rootScope.amount_maam=0.00;
				$rootScope.amount_out=0.00;
				$rootScope.transtype=0;
				$rootScope.original_afterprod=0;
				$rootScope.new1=0;
				$rootScope.mezumanin1=0;
				$rootScope.mezumanitra=0;
				$rootScope.global_dis=1;
				$rootScope.before_global_dis=0;
				$rootScope.SearchClient=[];
				$rootScope.search_cc=[];
				$(".exitclient,.akafa_client_tb1").hide();
				$(".discount_group").hide();
				$(".workers_tb tr .fa-check-circle").hide();
				$(".find_cust_container").css('display','none');
				$(".text,.toclean").val('');
				$(".before_calc").hide();
				$(".toclean").val('');
				$("select.toclean").val('-1');

				if($rootScope.cash_num_pause!=-1){					
		  			delete cash_global.cashes['cash_num'+$rootScope.cash_num_pause];
		  			$rootScope.cash_num_pause=-1;
		  		}
		  		$rootScope.cash_num_pause=-1;
				
				tabs.setTab(1);
				
           	}
        };
        
    }]);
    
     app.factory('total', [ '$rootScope', function ($rootScope) {
     	return {
            getTotal: function(name,item) {
		    var total = 0;
		    for(var i = 0; i < cash_prd.products.length; i++){
		        var product = cash_prd.products[i];
		        total += (product.SalePrice-product.Discount)*product.Amount;
		    }
		    return total.toFixed(2);
		}
       }; 
    }]);
    
     app.factory('prod_global', [ '$rootScope', function ($rootScope) {
     	 return {    	 	
            products: []   
	        };
        
    }]);
     app.factory('cash_global', [ '$rootScope', function ($rootScope) {
     	 return {
     	 	/*clean: function() {
                cash_global.products.splice(0, cash_global.products.length);
				cash_global.payments_type.cash.splice(0, cash_global.payments_type.cash.length);
				cash_global.payments_type.cheque.splice(0, cash_global.payments_type.cheque.length);
				cash_global.payments_type.credit.splice(0, cash_global.payments_type.credit.length);
				cash_global.payments_type.akafa.splice(0, cash_global.payments_type.akafa.length);
				cash_global.payments_type.shovar.splice(0, cash_global.payments_type.shovar.length);
				cash_global.payments_type.prepaid.splice(0, cash_global.payments_type.prepaid.length);
				cash_global.worker='';
				//cash_global.original='';
				cash_global.new1='';
				cash_global.anacha='';
           	},*/
            products: [],
            cashes:{},
            payments_type: {
	    		cash: [] ,
	    		cheque:[],
	    		credit:[],
	    		akafadebt:[],
	    		akafa:'',
	    		shovar:[],
	    		shovarzicuy:[],
	    		prepaid:[]
	    	},
				worker:'',
				original:'',
				anacha:''    
	        };
        
    }]);
    
   

  app.controller('CashboxController',[ '$http','$scope', '$rootScope','$compile','$timeout','tabs','clean','local','cash_global','GetURLParameter','alert','dates',function ($http,$scope,$rootScope, $compile,$timeout,tabs,clean,local,cash_global,GetURLParameter,alert,dates){ 
	$scope.datet = new Date();
 	$scope.tickInterval = 1000 //ms
	
	$rootScope.stockname=stockname;
	
	var theme=localStorage.getItem('theme');
	if(theme!=null&&$("body").attr("class").indexOf("theme")<=-1){
		$('body').addClass(theme);
	}
    var tick = function() {
        $scope.datet = Date.now() // get the current time
        $timeout(tick, $scope.tickInterval); // reset the timer
    }



    // Start the timer
    $timeout(tick, $scope.tickInterval);
	$scope.call_alert_site = function(msg,type,index_onoff) {
         alert.alert_site(msg,type,index_onoff);
    }
    $scope.call_alert_cancel = function() {
         alert.alert_cancel();
         //$(".pop_alert").css('z-index',"1");
         
    }
    $rootScope.txtCenter=function(txt){
        var i;
       // txt=reverseString(txt);
        len=txt.length;
        for(i=0;i<(num2-len)/2;i++){
            txt=" "+txt+" ";
        }
        return txt;
    }
     $rootScope.txtCenter2=function(txt){
        var i;
       // txt=reverseString(txt);
        len=txt.length;
        for(i=0;i<(29-len)/2;i++){
            txt=" "+txt+" ";
        }
        return txt;
    }
   $rootScope.itemLine3=function(t1,t2) {
        //t1=reverseString(t1);
        //t2=reverseString(t2);
        
        if(typeof android!="undefined"){
        	/*t3=t1;
        	t1=t2;
        	t2=t3;*/
        	t1=t1.toString();
        	t2=t2.toString();
        	num4=22;
        	num3=8;
        	num2=27;
        }
        else{
        	num3=15;
        	num4=32;        	
        }
        len1=t1.length;
        if(len1>num3){
            t1=t1.substring(0,num3-1);
        }
        else{
            for(i=len1;i<num3;i++){
                t1=" "+t1;
            }
        }
        len2=t2.length;
        if(len2>num4){
            t3=t2.substring(0,num4);
            t2=t3+"\n"+t2.substring(num4);
        }
        else{
            for(i=len2;i<num4;i++){
                t2=" "+t2;
            }
        }
        if(typeof android!="undefined"){
        return t1+t2;
        }else{
        	  return t2+t1;
        }
   }
    $rootScope.itemLine2=function( t1, t2, t3){
    	t1=t1.toString();
        	t2=t2.toString();
        	t3=t3.toString();
 if(typeof android!="undefined"){
        	t4=t1;
        	t1=t3;
        	t3=t4;
        	
        	num3=9;
        	num4=10;
        	num5=9;
        }
        else{
        	num3=15;
        	num4=22;
        	num5=11;
        }
        //t1=t1;
        //t1=reverseString(t1);
        //t2=reverseString(t2);
        //t3=reverseString(t3);
        len1=t1.length;
        if(len1>num3){
            t1=t1.substring(0,num3-1);
        }
        else{
            for(i=len1;i<num3;i++){
                t1=" "+t1;
            }
        }
        len2=t2.length;
        if(len2>num4){
            t2=t2.substring(0,num4-1);
        }
        else{
            for(i=len2;i<num4;i++){
                t2=" "+t2;
            }
        }
        len3=t3.length;
        if(len3>num5){
            t3=t3.substring(0,num5-1);
        }
        else{
            for(i=len3;i<num5;i++){
                t3=" "+t3;
            }
        }
         //if(typeof android!="undefined"){
        return t1+" "+t2+" "+t3;
       /* }
        else{
        	return t3+t2+t1;
        }*/
    }
    $rootScope.itemLine4=function(t1,t2,t3){
    	t1=t1.toString();
       t2=t2.toString();
        t3=t3.toString();
        var RegExpression = /[א-ת]/;
         if (!RegExpression.test(t2) ){
			len1=t1.length;
	        t22="";
	        t23="";
	        if(length<14){
	        	for(i=len1;i<14;i++){
	        		t1=" "+t1;
	        	}
	        }
	        len3=t3.length;
	        x=16-len3;
	        len2=t2.length;
	        if(len2<x){
	        	for(i=len2;i<x;i++){
	        		t2=" "+t2;
	        	}
	        }
	        else{
	        	t22=t2.substring(0,x); 
	        	t23="\n  "+t2.substring(x);    
	        	t2="";   	
	        }
	        return t3+" "+t22+t2+t1+t23;
      	} 
	    else {
	        len1=t1.length;
	        t22="";
	        t23="";
	        if(length<14){
	        	for(i=len1;i<14;i++){
	        		t1=t1+" ";
	        	}
	        }
	        len3=t3.length;
	        x=16-len3;
	        len2=t2.length;
	        if(len2<x){
	        	for(i=len2;i<x;i++){
	        		t2=t2+" ";
	        	}
	        }
	        else{
	        	t22=t2.substring(0,x); 
	        	t23="\n  "+t2.substring(x);    
	        	t2="";   	
	        }
	        return t1+t2+t22+" "+t3+t23;
	    }
        
        
    }
    $rootScope.itemLine=function (t1,t2){
       // t1=reverseString(t1);
       // t2=reverseString(t2);
       t1=t1.toString();
       t2=t2.toString();
       if(typeof android!="undefined"){
        	/*t3=t1;
        	t1=t2;
        	t2=t3;*/
        	num2=31;
        }
        end="";

        len=num2-t1.length-t2.length;
        if(len<0){
             x= num2-(t1.length+3);
            end=t2.substring(x);
            t2= t2.substring(0,x);
            len=3;
        }
        t=t1;
        for( i=0;i<len;i++){
            t=t+" ";
        }
        t=t+t2;
        if(end!=""){
            len=end.length;
            for( i=0;i<num2-len;i++){
                end=" "+end;
            }
        }
        return t+end;
    }
    $scope.isclean = function  () {
        $rootScope.action='del_cash';
        if($rootScope.amount!=0||($rootScope.SearchClient!=undefined&&$rootScope.SearchClient.length!=0)){
	        if($rootScope.cash_num_pause!=-1&&$rootScope.cash_num_pause!=undefined){					
				$scope.call_alert_site('האם את\ה בטוח שברצונך למחוק את החשבון? החשבון נמצא בהשהייה',0,'');
			 }
			 else{
			 	$scope.call_alert_site('האם את\ה בטוח שברצונך למחוק את החשבון?',0,'');
			 }	
		 }	
    }
     if(start_cash!=undefined&&start_cash!=''&&start_cash!=0){
     	localStorage.setItem('start_cash',start_cash);
     }
         

	$rootScope.end_kupa = function() {
		tran=JSON.stringify($scope.cashes);
	
	  	$http.post('inc/transactions.php',  $.param({stock:GetURLParameter.GetURLParameter('stock'),journal:journal,journal_id:journal_id,trans:tran}), {
        	headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
   		 }).success(function(data){
   		 	//alert(data+"success");  

   		 	localStorage.clear();
	  	});
		$http.post('inc/functions.php',  $.param({stat: "close",count:$rootScope.cash_num,stock:GetURLParameter.GetURLParameter('stock')}), {
        	headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
   		 }).success(function(data){
   		 	localStorage.clear();
	  	});
    }
	
	$scope.itra_calc = function() {
		
		var item=$rootScope.itra;
         /*if(item<0){
	  		return item*-1;
	  	}*/
	      return item;
    }
    $scope.close_k = function() {
		var x=0;
		angular.forEach($scope.cashes, function(obj) {
	     if(obj.pause === 1){
				    	$scope.call_alert_site('עסקאות בהשהייה פתוחות!',0,'');
				    	x=1;
				    	return;
					}	
	 });
		if(x==1){
			return;
		}
		$rootScope.action="close_k";
		$scope.call_alert_site('האם את\ה בטוח שברצונך לסגור את הקופה?',4,'');
		
    }

	$rootScope.isdisabled=false;
	$rootScope.transtype=0;

	$rootScope.kupa_num=journal*10000;
	local.setLocal('kupa_num',$rootScope.kupa_num);	
	
	/*if(localStorage.getItem('kupa_num')===null){	

		$rootScope.kupa_num=journal*10000;
		local.setLocal('kupa_num',$rootScope.kupa_num);		
	}
	else{
		$rootScope.kupa_num=parseInt(localStorage.getItem('kupa_num'));
		$rootScope.kupa_num++;
	}*/

	
	if(localStorage.getItem('cash_num')===null){
		$rootScope.cash_num=1;
		$rootScope.cash_kupanum=$rootScope.kupa_num+1;
	}
	else{
		$rootScope.cash_num=parseFloat(localStorage.getItem('cash_num'));
		$rootScope.cash_kupanum=$rootScope.kupa_num+$rootScope.cash_num;
	}

	$scope.datec=new Date();
	$scope.cashes={};

	$rootScope.tab = 1;
		
	$scope.call_setTab = function(newValue) {
		dolog('', 707,'call_setTab');   
         tabs.setTab(newValue);
         dolog('', 707,'end call_setTab');   
    }
     
    $scope.call_isSet = function(tabName) {
    	 /* if($('.prod_search4 .prod_container .prod').length == 1){
	            $('.prod_search4 .prod_container .prod div').click();
	         }*/
         return tabs.isSet(tabName);
    }  
    $scope.call_isSetMulti = function(tabName1,tabName2,tabName3,tabName4,tabName5,tabName6,tabName7) {
         return tabs.isSetMulti(tabName1,tabName2,tabName3,tabName4,tabName5,tabName6,tabName7);
    }  
	$scope.call_isSetMultiCalc = function(tabName1,tabName2) {
         return tabs.isSetMulti(tabName1,tabName2);
    } 

    
	$rootScope.amount=0.00;
	$rootScope.original=0.00;
	$rootScope.amount_maam=0.00;
	$rootScope.amount_out=0.00;

	if(localStorage.getItem('cashes')!==null){
		cash_global.cashes = JSON.parse(localStorage.getItem('cashes'));
		/*for(var k in cash_global.cashes) {
		   cash_global.cashes[k]['products']=JSON.parse(cash_global.cashes[k]['products']);
		}*/
	}
	$scope.cashes=cash_global.cashes;
		
	$rootScope.refund=0;
	$rootScope.zicuy=function(){
		if($rootScope.right_pass==1||$rootScope.premission_list['permission_zicuy']=='on'){
			$rootScope.right_pass=0;
			$('.zicuy').toggleClass("zicuy_zctive");
			$rootScope.refund=1;	
		}
		else{
			$rootScope.action="zicuy";
			$rootScope.selector='';
			alert.alert_site('משתמש לא מורשה',3,1);
		}		
	}
	$scope.start_clock=function(){
		if($rootScope.right_pass==1||$rootScope.premission_list['permission_hours']=='on'){
			$rootScope.right_pass=0;
			str=".clock,.pop_clock";
			popup=".an,.pop_clock";
			$("div[name=clock_display]").show();
			$("div[name=clock_display2]").empty();	
			$(".worker_details").empty();		
			$("#num_worker2").focus();
			openwindows.openwrap(str,popup);
			$("#num_worker2").focus();		
		}
		else{
			$rootScope.action="start_clock";
			$rootScope.selector='';
			alert.alert_site('משתמש לא מורשה',3,1);
		}		
	}
	$scope.menuclick=function(url){
		if($rootScope.premission_list['permission_backoffice']=='on'){
			location.href=url;
		}
		else{
			alert.alert_site('משתמש לא מורשה',1,1);
		}		
	}
	
	/*$rootScope.$watch('amount', function() {
		if
		$rootScope.amount2=$rootScope.amount;
       $rootScope.amount=($rootScope.amount*0.5).toFixed(2);
   });*/
   
	$rootScope.checkend = function(){	
		
		if($rootScope.itra<=0||$rootScope.mezumanitra<=0){
			openwrap2('checkend','.type_pay.container_pop');
			$rootScope.end_cash(0);
		}
	};
		
	$rootScope.end_cash = function(ispause){	
  		if(ispause==1&&$rootScope.amount==0){
  			$scope.call_alert_site('אין אפשרות לבצע השהיה, אין מוצרים בחשבון',0,'');  			
  			return;
  		}
  		if($rootScope.cash_num_pause!=-1){
  			delete cash_global.cashes['cash_num'+$rootScope.cash_num_pause];
  			$rootScope.cash_num_pause=-1;
  		}
  		$rootScope.cash_num_pause=-1;
		var today = new Date();
		var dd = today.getDate();
		var mm = today.getMonth()+1; //January is 0!
		var yyyy = today.getFullYear();
		
		if(dd<10) {
		    dd='0'+dd
		} 
		
		if(mm<10) {
		    mm='0'+mm
		} 
		var d = new Date(); 
		h=d.getHours(); 
		m=d.getMinutes();
		s=d.getSeconds(); 
		d=h+':'+m+':'+h;
		today = mm+'/'+dd+'/'+yyyy;
		
		$scope.cashes['cash_num'+$rootScope.cash_num]={};	
		$scope.cashes['cash_num'+$rootScope.cash_num]['products']=JSON.parse(localStorage.getItem('cash'+$rootScope.cash_num+'_'+'products'));
		$scope.cashes['cash_num'+$rootScope.cash_num]['payments']=JSON.parse(localStorage.getItem('cash'+$rootScope.cash_num+'_'+'payment'));
		//$scope.cashes['cash_num'+$rootScope.cash_num]['worker']=localStorage.getItem('cash'+$rootScope.cash_num+'_'+'worker');
		//$scope.cashes['cash_num'+$rootScope.cash_num]['amount']=$rootScope.amount;
		//$scope.cashes['cash_num'+$rootScope.cash_num]['amount_maam']=$rootScope.amount_maam;
		//$scope.cashes['cash_num'+$rootScope.cash_num]['amount_out']=$rootScope.amount_out;
		$scope.cashes['cash_num'+$rootScope.cash_num]['paid']=$rootScope.paid;
		$scope.cashes['cash_num'+$rootScope.cash_num]['itra']=$rootScope.itra;
		$scope.cashes['cash_num'+$rootScope.cash_num]['date']=today;
		$scope.cashes['cash_num'+$rootScope.cash_num]['time']=d;
		$scope.cashes['cash_num'+$rootScope.cash_num]['pause']=ispause;	
		$scope.cashes['cash_num'+$rootScope.cash_num]['countprod']=$rootScope.countprod;
			
		$scope.cashes['cash_num'+$rootScope.cash_num]['cash_num']=$rootScope.cash_num; 
		$scope.cashes['cash_num'+$rootScope.cash_num]['original']=cash_global.original;
		//$scope.cashes['cash_num'+$rootScope.cash_num]['new1']=cash_global.new1;
		//$scope.cashes['cash_num'+$rootScope.cash_num]['anacha']=cash_global.anacha;
		$scope.cashes['cash_num'+$rootScope.cash_num]['SearchClient']=$rootScope.SearchClient;
		
		$scope.cashes['cash_num'+$rootScope.cash_num]['group_discount']=$rootScope.SearchClient['group_p'];
        $scope.cashes['cash_num'+$rootScope.cash_num]['type_group_discount']=2;
		var firstamount = 0;
	    for(var i = 0; i < cash_global.products.length; i++){
	        var product = cash_global.products[i];
	        firstamount += product.SalePrice*product.Amount;
	    }
	    var round=0.00;
	    //round=round-$rootScope.amount;
	    if($rootScope.discounttype==1){
	    	//var discountperc=$rootScope.new1;
	    	var discountperc=$rootScope.disccperc;
	    	var discountamount=$rootScope.new2;
	    }
	    else if($rootScope.discounttype==2){
	    	var discountperc=$rootScope.new2;
	    	//var discountperc=$rootScope.new1;
	    	var discountperc=$rootScope.disccperc;
	    }
	    else{
	    	$rootScope.discounttype=0;
	    }
	    if($rootScope.itra<0){
	    	$rootScope.itraAbs=parseFloat($rootScope.itra)*-1;
	    }
	    else{
	    	$rootScope.itraAbs=$rootScope.itra;
	    }
		$rootScope.itraAbs=Math.round($rootScope.itraAbs);
	   /* var mezuman=$scope.cashes['cash_num'+$rootScope.cash_num]['payments']['cash'][0]['amount'];
	    if(mezuman>$rootScope.itraAbs){
	    	$rootScope.mezumancharge=$rootScope.itraAbs;
	    }
	    else{
	    	$rootScope.mezumancharge=mezuman;
	    }*/
	    //$rootScope.mezumanin=(parseFloat($rootScope.mezumanin)+parseFloat($rootScope.mezumanin1)).toFixed(2);
	    //$rootScope.mezumanout=(parseFloat($rootScope.mezumanout)+parseFloat($rootScope.mezumancharge)).toFixed(2);
	    $rootScope.mezumanin=0;
	    $rootScope.mezumanout=0;
	    local.setLocal('z-mezumanout',$rootScope.mezumanout);	
	    
	    var x=9-parseInt($rootScope.cash_kupanum.toString().length);
	    var cash_kupanum=$rootScope.cash_kupanum;
    	for (var i=0; i < x; i++) {
		 	cash_kupanum="0"+cash_kupanum.toString();
		};
		
		
		$scope.cashes['cash_num'+$rootScope.cash_num]['firstamount']=firstamount;		
		$scope.cashes['cash_num'+$rootScope.cash_num]['finalamount']=$rootScope.amount;
		var amount_help=$rootScope.amount;
		$scope.cashes['cash_num'+$rootScope.cash_num]['amountbeforevat']=$rootScope.amount_out;
		$scope.cashes['cash_num'+$rootScope.cash_num]['round']=round;
		$scope.cashes['cash_num'+$rootScope.cash_num]['vat']=$rootScope.amount_maam;
		$scope.cashes['cash_num'+$rootScope.cash_num]['discounttype']=$rootScope.discounttype;
		$scope.cashes['cash_num'+$rootScope.cash_num]['discountperc']=discountperc;
		$scope.cashes['cash_num'+$rootScope.cash_num]['discountamount']=discountamount;
		$scope.cashes['cash_num'+$rootScope.cash_num]['cashierid']=localStorage.getItem('cash'+$rootScope.cash_num+'_'+'worker');
		$scope.cashes['cash_num'+$rootScope.cash_num]['customerid']=$rootScope.SearchClient['ID'];
		$scope.cashes['cash_num'+$rootScope.cash_num]['change']=$rootScope.itraAbs;
		$scope.cashes['cash_num'+$rootScope.cash_num]['comment']=$rootScope.comment;	
		$scope.cashes['cash_num'+$rootScope.cash_num]['commentClass']=$rootScope.commentClass;			
		$scope.cashes['cash_num'+$rootScope.cash_num]['cash_kupanum']=cash_kupanum.toString();	
		$scope.cashes['cash_num'+$rootScope.cash_num]['transtype']=$rootScope.transtype;	
		$scope.cashes['cash_num'+$rootScope.cash_num]['before_global_dis']=$rootScope.before_global_dis;
		$scope.cashes['cash_num'+$rootScope.cash_num]['original_afterprod']=$rootScope.original_afterprod;
		local.setLocal('cashes',$scope.cashes);		
		local.setLocal('cash_num',$rootScope.cash_num);
		

		$scope.cashes2={};
		$scope.cashes2['cash_num'+$rootScope.cash_num]=$scope.cashes['cash_num'+$rootScope.cash_num];
		tran=JSON.stringify($scope.cashes2);	
	  	$http.post('inc/transactions.php',  $.param({stock:GetURLParameter.GetURLParameter('stock'),journal:journal,journal_id:journal_id,trans:tran,cust:$rootScope.SearchClient['ID']}), {
        	headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
   		 }).success(function(data){
   		 	alert('success1');
	  	});		
	  	
	  	
		$rootScope.call_clean();
		$rootScope.cash_num++;
		$rootScope.cash_kupanum++;
		var num=parseFloat($rootScope.cash_num)-1;
		
		
	  	//alert('feigy');
		if(ispause!=1){
			if(typeof android=='undefined'&&typeof android2=='undefined'){
				/*$http.post("receipt.php?json="+JSON.stringify($scope.cashes['cash_num'+num]),  $.param({}), {
		        	headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
		   		 }).success(function(data){*/
		   		 	//$('#receipt').html(data);
		   		 	if(typeof window.external.print!='undefined'){
		   		 		window.external.print();		   		 	   
		   		 	} 
		   		 	if(amount_help<0){
		   		 		if(typeof window.external.print2!='undefined'){
			   		 		window.external.print2("zicuy1");
			   		 		window.external.print2("zicuy2");
		   		 		}
		   		 	}
			  	/*});	*/
				/*//wopen("receipt.php?json="+JSON.stringify($scope.cashes['cash_num'+num]));
				s=window.open("receipt.php?json="+JSON.stringify($scope.cashes['cash_num'+num]),"חשבונית",'top='+150+',left='+50+',height='+400+',width='+300+',resizable=yes,scrollbars=yes');
				try	{
				s.focus();
				}
				catch(e){};
				
				$('#receipt').load("receipt.php?json="+JSON.stringify($scope.cashes['cash_num'+num]));*/
			}
			else{
				var arr=[$rootScope.details_list,$scope.cashes['cash_num'+num],journal,stock,$rootScope.SearchWorker.SupplierName];
				
				  sumd=0.00;
        //Toast.makeText(getApplicationContext(), s, Toast.LENGTH_LONG).show();
      
       
       // JSONArray jsonArray=new JSONArray(s);
       // JSONObject jsonObject=jsonArray.getJSONObject(1);
      //  JSONObject details_list=jsonArray.getJSONObject(0);
       // String p=("\n"+txtCenter(details_list.getString("name"))+"\n"+txtCenter(details_list.getString("address"))+"\n");
       var a = [];
       if(typeof android =='undefined'){
       	num2=48;
       }
       else{
       	num2=31;
       }
       l=0;
		//a[l] = "";
		//l++;
		//a[l] = "0123456789          0123456789";
		//l++;
        //var p="\n";
         
        if($rootScope.details_list.name!=""){
        	a[l] = "";
			l++;
			a[l] = $rootScope.txtCenter2($rootScope.details_list.name);
			l++;
			//a[l] = "";
			//l++;
			//$rootScope.txtCenter($rootScope.details_list.name)
            //p=p+"\n"+$rootScope.txtCenter($rootScope.details_list.name)+"\n";
        }
        if($rootScope.details_list.tz!=""){
        	//a[l] = "";
			//l++;
			a[l] = $rootScope.txtCenter(" ע.מ./ח.פ.:"+$rootScope.details_list.tz);
			l++;
           // p=p+"\n"+$rootScope.txtCenter(" ע.מ./ח.פ.:"+$rootScope.details_list.tz);
        }
      
        if($rootScope.details_list.address!=""){
        	//a[l] = "";
			//l++;
			a[l] = $rootScope.txtCenter($rootScope.details_list.address);
			l++;
           // p=p+"\n"+$rootScope.txtCenter(" כתובת:"+$rootScope.details_list.address);
        }
          if($rootScope.details_list.tel!=""){
        	//a[l] = "";
			//l++;
			a[l] =$rootScope.txtCenter(" טלפון:"+$rootScope.details_list.tel);
			l++;
           // p=p+"\n"+$rootScope.txtCenter(" טלפון:"+$rootScope.details_list.tel);
        }
        if($rootScope.details_list.fax!=""){
        	//a[l] = "";
			//l++;
			a[l] = $rootScope.txtCenter(" פקס:"+$rootScope.details_list.fax);
			l++;
           // p=p+"\n"+$rootScope.txtCenter(" פקס:"+$rootScope.details_list.fax);
        }
        if($rootScope.details_list.mail!=""){
        	//a[l] = "";
			//l++;
			a[l] = $rootScope.txtCenter(" אימייל:"+$rootScope.details_list.mail);
			l++;
          //  p=p+"\n"+$rootScope.txtCenter(" אימייל:"+$rootScope.details_list.mail);
        }
       // Toast.makeText(getApplicationContext(),"feigy0",Toast.LENGTH_LONG).show();
        amount= parseFloat($scope.cashes['cash_num'+num].finalamount);
       // Toast.makeText(getApplicationContext(),"feigy1",Toast.LENGTH_LONG).show();
         transtype =$scope.cashes['cash_num'+num].transtype;
       // Toast.makeText(getApplicationContext(),"feigy2",Toast.LENGTH_LONG).show();
         takbul=1;
        payments=$scope.cashes['cash_num'+num].payments;
      //  Toast.makeText(getApplicationContext(),"feigy3",Toast.LENGTH_LONG).show();
          
         cash_l= payments['cash'].length;
        cheque_l= payments["cheque"].length;
        credit_l= payments["credit"].length;
        shovar_l= payments["shovar"].length;
        shovarzicuy_l= payments["shovarzicuy"].length;
      
       if((cash_l+cheque_l+credit_l+shovar_l)==0) {
           takbul = 0;
       }
    /*  "payments": {
            "cash": [{
                "type": "מזומן",
                "amount": "16",
                "$$hashKey": "object:543"
            }],
            "cheque": [],
            "credit": [],
            "akafadebt": [],
            "akafa": "",
            "shovar": [],
            "shovarzicuy": [],
            "prepaid": []
            },
        */
        if(transtype==0){
            if(amount>0){
                if(takbul==1){
                	//a[l] = "";
					//l++;
					//a[l] = "";
					//l++;
					a[l] = $rootScope.txtCenter("חשבונית מס קבלה");
					l++;
                    //p = p + "\n\n" + $rootScope.txtCenter("חשבונית מס קבלה");
                }
                else{
                	//a[l] = "";
					//l++;
					//a[l] = "";
					//l++;
					a[l] = $rootScope.txtCenter("חשבונית מס");
					l++;
                    //p = p + "\n\n" + $rootScope.txtCenter("חשבונית מס");
                }
            }
            else{
            	//a[l] = "";
				//l++;
				//a[l] = "";
				//l++;
				a[l] = $rootScope.txtCenter("הודעת זיכוי");
				l++;
               // p = p + "\n\n" + $rootScope.txtCenter("הודעת זיכוי");
            }
        }
        else{
            if(takbul==1){
            	//a[l] = "";
				//l++;
				//a[l] = "";
				//l++;
				a[l] = $rootScope.txtCenter("קבלה");
				l++;
               // p = p + "\n\n" + $rootScope.txtCenter("קבלה");
            }
            else{
                if(shovarzicuy_l==0){
                	//a[l] = "";
					//l++;
					//a[l] = "";
					//l++;
					a[l] = $rootScope.txtCenter("חשבונית מס");
                  //  p = p + "\n\n" + $rootScope.txtCenter("חשבונית מס");
                }
                else{
                    if(shovar_l==0){
                    	//a[l] = "";
						//l++;
						//a[l] = "";
						//l++;
						a[l] = $rootScope.txtCenter("חשבונית מס קבלה");
                       // p = p + "\n\n" + $rootScope.txtCenter("חשבונית מס קבלה");
                    }
                    else{
                    	//a[l] = "";
						//l++;
						//a[l] = "";
						//l++;
						a[l] = $rootScope.txtCenter("אישור תשלום");
                        //p = p + "\n\n" + $rootScope.txtCenter("אישור תשלום");
                    }
                }
            }
        }
		a[l]=$rootScope.txtCenter($scope.cashes['cash_num'+num].cash_kupanum);
		l++;
		a[l]=$rootScope.itemLine(today,d);
				l++;	
       //a[l] = "";
		//l++;
		//a[l] = "";
		//l++;
        if(transtype==0) {
            
                products = $scope.cashes['cash_num'+num].products;
                // Toast.makeText(getApplicationContext(), "2", Toast.LENGTH_LONG).show();
               // p = p + $rootScope.itemLine2("ברקוד", "תיאור", "סה\"כ") + "\n";
                a[l] = $rootScope.itemLine4("ברקוד", "תיאור", "סה\"כ");
				l++;
				//a[l] = "";
				//l++;
                for ( i = 0; i < products.length; i++) {                	
                    product = products[i];
                    if(product["Amount"]>1){
                    	 a[l] =$rootScope.itemLine4(product["BarCode"],product["Title"],"");
						 l++;	
						 a[l] = $rootScope.itemLine( parseFloat(product["Amount"]) * parseFloat(product["SalePrice"]),""+ product["Amount"] + "*" + product["SalePrice"]);
						 l++;
                    }
                    else{
                    	 a[l] =$rootScope.itemLine4(product["BarCode"],product["Title"],product["SalePrice"]);
						l++;	
                    }
                   				
                    //p = p + $rootScope.itemLine3(product["BarCode"], product["Title"]);
                    //a[l] = $rootScope.itemLine( parseFloat(product["Amount"]) * parseFloat(product["SalePrice"]),""+ product["Amount"] + "*" + product["SalePrice"]);
					//l++;
					//p = p + $rootScope.itemLine2("", product["Amount"] + "*" + product["SalePrice"], parseFloat(product["Amount"]) * parseFloat(product["SalePrice"]));
                    // p=p+itemLine(product.getString("BarCode"),product.getString("Title"));
                    // p=p+itemLine(product.getString("Amount")+"*"+product.getString("SalePrice"),String.valueOf((Float.parseFloat(product.getString("Amount")) * Float.parseFloat(product.getString("SalePrice")))));
                    if (parseFloat(product["Discount"]) > 0) {
                        sumd += parseFloat(product["Discount"]);
                        a[l]=$rootScope.itemLine2("", "הנחת מוצר ", "-" + product["Discount"]);
                        l++;
                        //p = p + $rootScope.itemLine2("", "הנחת מוצר ", "-" + product["Discount"]);
                    }
                }
            
        }
        else{

        }
        a[l]=$rootScope.itemLine("        סכום ביניים:",$scope.cashes['cash_num'+num].original_afterprod);
        l++;
        if($scope.cashes['cash_num'+num].finalamount-$scope.cashes['cash_num'+num].original_afterprod>0){
         a[l]=$rootScope.itemLine("        הנחת חשבון:",$scope.cashes['cash_num'+num].finalamount-$scope.cashes['cash_num'+num].original_afterprod);
        l++;
        }
       // p=p+$rootScope.itemLine2("","סיכום ביניים:",$scope.cashes['cash_num'+num].finalamount);
		for (var key in payments) {
		  if (payments.hasOwnProperty(key))
		     for(i = 0 ; i < payments[key].length; i++) {
		     	payment=payments[key][i];
		     	a[l]=$rootScope.itemLine("        "+payment["type"]+":",payment.amount);
       			l++;
       			/*switch(key){
       				case 'cheque':
       				a[l]=$rootScope.itemLine("           מס' שק:"+":",payment.chequenumber);
       				l++;
       				a[l]=$rootScope.itemLine("           מס' שק:"+":",payment.chequenumber);
       				l++;
       				break;
       				case 'credit':
       				a[l]=$rootScope.itemLine("           מס' אשראי:"+":",payment.chequenumber);
       				l++;
       				a[l]=$rootScope.itemLine("           מס' שק:"+":",payment.chequenumber);
       				l++;
       				break;
       				
       			}
       			*/
                   // JSONObject payment= value.getJSONObject(i);
                   // p=p+$rootScope.itemLine2("",payment["type"],payment.amount);
                }

		}
        
        if($scope.cashes['cash_num'+num].round>0){
         a[l]=$rootScope.itemLine("        עיגול אגורות:","-"+$scope.cashes['cash_num'+num].round);

        	//a[l]=$rootScope.itemLine2("עיגול אגורות:","","-"+$scope.cashes['cash_num'+num].round);
       			l++;
            //p=p+$rootScope.itemLine2("עיגול אגורות:","","-"+$scope.cashes['cash_num'+num].round);
        }
        if($scope.cashes['cash_num'+num].change>0){
        	a[l]=$rootScope.itemLine("        עודף:","-"+$scope.cashes['cash_num'+num].change);
        	//a[l]=$rootScope.itemLine2("","עודף:","-"+$scope.cashes['cash_num'+num].round);
       			l++;
            //p=p+$rootScope.itemLine2("","עודף:","-"+$scope.cashes['cash_num'+num].round);
        }
        a[l]=$rootScope.itemLine("        חייב במע\"מ:",$scope.cashes['cash_num'+num].amountbeforevat);
       			l++;
        //p=p+$rootScope.itemLine2("חייב במע\"מ:",$scope.cashes['cash_num'+num].amountbeforevat,"");
        a[l]=$rootScope.itemLine("        סה\"כ מע\"מ:",$scope.cashes['cash_num'+num].vat);
       			l++;
        //p=p+$rootScope.itemLine2("סה\"כ מע\"מ:",$scope.cashes['cash_num'+num].vat,"");
        a[l]=$rootScope.itemLine("        סה\"כ שולם:",$scope.cashes['cash_num'+num].finalamount);
       			l++;
       // p=p+$rootScope.itemLine2("סה\"כ שולם:",$scope.cashes['cash_num'+num].finalamount,"");
        
        //p=p+"\n";
        sumd=$scope.cashes['cash_num'+num].original_afterprod- $scope.cashes['cash_num'+num].finalamount;
        
        if(sumd>0){
        	a[l]="";
       			l++;
        	a[l]=$rootScope.txtCenter("לקוח/ה יקר/ה בקנייה זו חסכת "+sumd.toFixed(2)+" ש\"ח");
       			l++;
           
        }
        /*a[l]="";
		l++;*/
		//a[l]="";
		//l++;
		
		a[l]=$rootScope.txtCenter("מס' פריטים: "+$scope.cashes['cash_num'+num].countprod);
		l++;
		//a[l]="";
		//l++;
        //p=p+"\n\n"+$rootScope.txtCenter("עסקה מספר:"+" "+journal+"-"+$scope.cashes['cash_num'+num].cash_kupanum+"   מס' פריטים: "+$scope.cashes['cash_num'+num].countprod)+"\n";
        a[l]=$rootScope.txtCenter("קופה מספר:"+" "+stock+"   ");
		l++;
        //p=p+$rootScope.txtCenter("קופה מספר:"+" "+stock+"   ");
        if($scope.cashes['cash_num'+num].SearchClient.SupplierName!=undefined){
           	a[l]=$rootScope.txtCenter("לקוח/ה:"+" "+$rootScope.SearchClient.ClientNum+" "+ $scope.cashes['cash_num'+num].SearchClient.SupplierName);
			l++;
           // p=p+$rootScope.txtCenter("קופאי/ת:"+" "+$rootScope.SearchWorker.WorkerNum+" "+$rootScope.SearchWorker.SupplierName);
           } 
           // JSONObject cashier = jsonArray.getJSONObject(4);
           if($rootScope.SearchWorker.SupplierName!=undefined){
           	a[l]=$rootScope.txtCenter("עובד/ת:"+" "+$rootScope.SearchWorker.WorkerNum+" "+$rootScope.SearchWorker.SupplierName);
			l++;
           // p=p+$rootScope.txtCenter("קופאי/ת:"+" "+$rootScope.SearchWorker.WorkerNum+" "+$rootScope.SearchWorker.SupplierName);
           }        
		//a[l]="";
		//l++;
		a[l]=$rootScope.txtCenter("תודה ולהתראות");
		l++;
		
        //p=p+"\n\n"+$rootScope.txtCenter("תודה ולהתראות")+"\n";
        if($rootScope.details_list.comments!=""){
        	//a[l]="";
			//l++;
			a[l]=$rootScope.txtCenter($rootScope.details_list.comments);
			l++;
            //p=p+"\n"+$rootScope.txtCenter($rootScope.details_list.comments);
        }
        if(typeof android!='undefined'){
      		 android.print_invoice(JSON.stringify(a));
       }
       else{
       		if(typeof android2!='undefined'){
				       		android2.print_invoice(JSON.stringify(a));
				       	}
       }
        var a = [];
       l=0;
        //print(p);
        if(amount<0){
            if(takbul>0){
	            a[l]="";
				l++;
				//a[l]="";
				//l++;
				a[l]=$rootScope.txtCenter("שובר מקור");
				l++;
				//a[l]="";
				//l++;
				//a[l]="";
				//l++;			
				a[l]=$rootScope.itemLine(today,d);
				l++;
				a[l]=$rootScope.itemLine(journal+"-"+$scope.cashes['cash_num'+num].cash_kupanum,stock+"");
				l++;
				//a[l]="";
				//l++;
				//a[l]="";
				//l++;
				a[l]=$rootScope.txtCenter("הודעת זיכוי מקור לקופה");
				l++;
				//a[l]="";
				//l++;
				//a[l]="";
				//l++;
				a[l]=$rootScope.txtCenter("סכום זיכוי: "+amount);
				l++;
				//a[l]="";
				//l++;
				//a[l]="";
				//l++;
				a[l]=$rootScope.txtCenter("מספר שובר: "+journal+"-"+$scope.cashes['cash_num'+num].cash_kupanum);
				l++;
				//a[l]="";
				//l++;
				a[l]="";
				l++;
				a[l]=$rootScope.itemLine3("טלפון: ","______________________");
				l++;
				//a[l]="";
				//l++;
				a[l]=$rootScope.itemLine3("חתימה: ","______________________");
				l++;
				//a[l]="";
				//l++;
               /* p="\n\n"+$rootScope.txtCenter("שובר מקור")+"\n\n";
                p=p+$rootScope.txtCenter(now)+"\n";
                p=p+$rootScope.itemLine(journal+"-"+$rootScope.details_list.cash_kupanum,stock+"");
                p=p+"\n\n"+$rootScope.txtCenter("הודעת זיכוי מקור לקופה");
                p=p+"\n\n"+$rootScope.txtCenter("סכום זיכוי: "+amount);
                p=p+"\n\n"+$rootScope.txtCenter("מספר שובר: "+journal+"-"+$scope.cashes['cash_num'+num].cash_kupanum);
                p=p+"\n\n"+$rootScope.itemLine3("טלפון: ","_________________________");
                p=p+"\n"+$rootScope.itemLine3("חתימה: ","_________________________")+"\n";
               // print(p);*/
               if(typeof android!='undefined'){
		      		 android.print_invoice(JSON.stringify(a));
		       }
		       else{
		       	android2.print_invoice(JSON.stringify(a));
		       }
		        var a = [];
      			l=0;
            }
            else{
            	//a[l]="";
				//l++;
				a[l]="";
				//l++;
				a[l]=$rootScope.txtCenter("שובר מקור");
				l++;
				//a[l]="";
				//l++;
				//a[l]="";
				//l++;				
				a[l]=$rootScope.itemLine(today,d);
				l++;
				a[l]=$rootScope.itemLine(journal+"-"+$scope.cashes['cash_num'+num].cash_kupanum,stock+"");
				l++;
				//a[l]="";
				//l++;
				//a[l]="";
				//l++;
				a[l]=$rootScope.txtCenter("הודעת זיכוי מקור ללקוח");
				l++;
				//a[l]="";
				//l++;
				//a[l]="";
				//l++;
				a[l]=$rootScope.txtCenter("סכום זיכוי: "+amount);
				l++;
				//a[l]="";
				//l++;
				//a[l]="";
				//l++;
				a[l]=$rootScope.txtCenter("מספר שובר: "+journal+"-"+$scope.cashes['cash_num'+num].cash_kupanum);
				l++;
				//a[l]="";
				//l++;
				//a[l]="";
				//l++;				
				a[l]=$rootScope.itemLine3("חתימה: ","______________________");
				l++;
				a[l]="";
				l++;
				 if(typeof android!='undefined'){
			      		 android.print_invoice(JSON.stringify(a));
			       }
			       else{
			       	android2.print_invoice(JSON.stringify(a));
			       }
			        var a = [];
       				l=0;
               /* p="\n\n"+$rootScope.txtCenter("שובר מקור")+"\n\n";
                p=p+$rootScope.txtCenter(now)+"\n";
                p=p+$rootScope.itemLine(journal+"-"+$rootScope.details_list.cash_kupanum,stock+"");
                p=p+"\n\n"+$rootScope.txtCenter("הודעת זיכוי מקור ללקוח");
                p=p+"\n\n"+$rootScope.txtCenter("סכום זיכוי: "+amount);
                p=p+"\n\n"+$rootScope.txtCenter("מספר שובר: "+journal+"-"+$scope.cashes['cash_num'+num].cash_kupanum);
                p=p+"\n\n"+$rootScope.itemLine3("חתימה: ","_________________________")+"\n";
                print(p);*/
                a[l]="";
				l++;
				//a[l]="";
				//l++;
				a[l]=$rootScope.txtCenter("שובר העתק");
				l++;
				//a[l]="";
				//l++;
				//a[l]="";
				//l++;			
				a[l]=$rootScope.itemLine(today,d);
				l++;
				a[l]=$rootScope.itemLine(journal+"-"+$scope.cashes['cash_num'+num].cash_kupanum,stock+"");
				l++;
				//a[l]="";
				//l++;
				//a[l]="";
				//l++;
				a[l]=$rootScope.txtCenter("הודעת זיכוי העתק לקופה");
				l++;
				//a[l]="";
				//l++;
				//a[l]="";
				//l++;
				a[l]=$rootScope.txtCenter("סכום זיכוי: "+amount);
				l++;
				//a[l]="";
				//l++;
				//a[l]="";
				//l++;
				a[l]=$rootScope.txtCenter("מספר שובר: "+journal+"-"+$scope.cashes['cash_num'+num].cash_kupanum);
				l++;
				//a[l]="";
				//l++;
				//a[l]="";
				//l++;
				a[l]=$rootScope.itemLine3("טלפון: ","______________________");
				l++;
				//a[l]="";
				//l++;
				a[l]=$rootScope.itemLine3("חתימה: ","______________________");
				l++;
				a[l]="";
				l++;
				 if(typeof android!='undefined'){
			      		 android.print_invoice(JSON.stringify(a));
			       }
			       else{
			       	android2.print_invoice(JSON.stringify(a));
			       }
               /* p="\n\n"+$rootScope.txtCenter("שובר העתק")+"\n\n";
                p=p+$rootScope.txtCenter(now)+"\n";
                p=p+itemLine(journal+"-"+$rootScope.details_list.cash_kupanum,stock+"");
                p=p+"\n\n"+$rootScope.txtCenter("הודעת זיכוי העתק לקופה");
                p=p+"\n\n"+$rootScope.txtCenter("סכום זיכוי: "+amount);
                p=p+"\n\n"+$rootScope.txtCenter("מספר שובר: "+journal+"-"+$rootScope.details_list.cash_kupanum);
                p=p+"\n\n"+$rootScope.itemLine3("טלפון: ","__________________________");
                p=p+"\n"+$rootScope.itemLine3("חתימה: ","__________________________")+"\n";*/
               // print(p);
            }
        }
      
				
				
				
				/*if(typeof android!='undefined'){
					android.invoice_details(JSON.stringify(arr));
				}
				else{
					//android2.show_toast();
					android2.invoice_details(JSON.stringify(arr));
				}*/
			}
		}
		else{
			$(".wrap").click();
		}	
		
	};
	 $rootScope.call_clean = function() {  
         return clean.clean();
    } 
    		this.hachlafa_barcode = function (barcode){
			$('#achlafa_pritim tr[data-id='+barcode+']').find(".fa-check-circle").toggleClass('display');
		}
		this.choose_all_comp = function (){
			$('#achlafa_pritim').find(".fa-check-circle").removeClass('display');
		}
	

  }]);
	
 app.controller('CommentController',[ '$scope', '$rootScope','cash_global','local','openwindows',function ($scope,$rootScope,cash_global,local,openwindows){ 
 	$rootScope.curr_comment='';
		$scope.add_comment = function(){
			$( '.wrap' ).click();
			$rootScope.comment=$(".comment_txt").val();
			if($rootScope.comment!=""){
				$rootScope.commentClass="comment_active";
			}
			else{
				$rootScope.commentClass="";
			}
			
		};
		$scope.start_comment = function(){
			$(".comment_txt").val($rootScope.comment);
			openwindows.openwrap('.pop_comment','.comment_div,.pop_comment');
		};
		$scope.add_comment_prod = function(){
			$( '.wrap' ).click();
			key1=$rootScope.curr_comment;
			 for(var i = 0; i < cash_global.products.length; i++){
		        var product = cash_global.products[i];
		        if(product['BarCode']==key1){
		        	cash_global.products[i]['comment']=$(".comment_txt_prod").val();

				    if($(".comment_txt_prod").val()!=undefined&&$(".comment_txt_prod").val()!=""){ 
				    	cash_global.products[i]['commentClass']="comment_active";
				    }
				    local.setLocal('products',cash_global.products);
		        	break;
		        }
		    }
		    
		};
		
		$scope.start_comment_prod = function(key1){
			//key1=$('input[name=BarCode]:hidden').val();
			$rootScope.curr_comment=key1;
			 for(var i = 0; i < cash_global.products.length; i++){
		        var product = cash_global.products[i];
		        if(product['BarCode']==key1){
		        	$(".comment_txt_prod").val(cash_global.products[i]['comment']);	
		        	break;
		        }
		    }
			openwindows.openwrap('.pop_comment_prod','.comment_div_prod,.pop_comment_prod');		
		};
		
		
  }]);
  
   app.controller('BeynaimController',[ '$scope', '$rootScope','cash_global','local',function ($scope,$rootScope,cash_global,local){ 
	  	var currentdate = new Date(); 
		var datetime = currentdate.getDate() + "/"
	                + (currentdate.getMonth()+1)  + "/" 
	                + currentdate.getFullYear() + "  "  
	                + currentdate.getHours() + ":"  
	                + currentdate.getMinutes() ;
	     $scope.datet=datetime;
	     
	     if(typeof start_cash == "undefined"){
	     	start_cash=0;
	     }
	     $rootScope.start_cash=start_cash;
	    $rootScope.print=function(){
	     	if(typeof android=='undefined'&&typeof android2=='undefined'){
	     		if(typeof window.external.print2!='undefined')
	     		window.external.print2("report_x");
	     	}
	     	else{
	     		var a = [];
			       if(typeof android =='undefined'){
			       	num2=48;
			       }
			       else{
			       	num2=31;
			       }
			       l=0;
					 if($rootScope.details_list.name!=""){
			        	a[l] = "";
						l++;
						a[l] = $rootScope.txtCenter($rootScope.details_list.name+"   ");
						l++;
						//a[l] = "";
						//l++;
						//$rootScope.txtCenter($rootScope.details_list.name)
			            //p=p+"\n"+$rootScope.txtCenter($rootScope.details_list.name)+"\n";
			        }
			        if($rootScope.details_list.tz!=""){
			        	//a[l] = "";
						//l++;
						a[l] = $rootScope.txtCenter(" ע.מ./ח.פ.:"+$rootScope.details_list.tz);
						l++;
			           // p=p+"\n"+$rootScope.txtCenter(" ע.מ./ח.פ.:"+$rootScope.details_list.tz);
			        }
			        if($rootScope.details_list.address!=""){
			        	//a[l] = "";
						//l++;
						a[l] = $rootScope.txtCenter(" כתובת:"+$rootScope.details_list.address);
						l++;
			           // p=p+"\n"+$rootScope.txtCenter(" כתובת:"+$rootScope.details_list.address);
			        }
			        if($rootScope.details_list.tel!=""){
			        	//a[l] = "";
						//l++;
						a[l] =$rootScope.txtCenter(" טלפון:"+$rootScope.details_list.tel);
						l++;
			           // p=p+"\n"+$rootScope.txtCenter(" טלפון:"+$rootScope.details_list.tel);
			        }
			        
			        if($rootScope.details_list.fax!=""){
			        	//a[l] = "";
						//l++;
						a[l] = $rootScope.txtCenter(" פקס:"+$rootScope.details_list.fax);
						l++;
			           // p=p+"\n"+$rootScope.txtCenter(" פקס:"+$rootScope.details_list.fax);
			        }
			        if($rootScope.details_list.mail!=""){
			        	//a[l] = "";
						//l++;
						a[l] = $rootScope.txtCenter(" אימייל:"+$rootScope.details_list.mail);
						l++;
			          //  p=p+"\n"+$rootScope.txtCenter(" אימייל:"+$rootScope.details_list.mail);
			        }
					a[l] = "";
					l++;
					a[l] = $rootScope.txtCenter("דוח x");
					l++;
					a[l] = "";
					l++;					
					//a[l]=$rootScope.itemLine(today+" "+d,$rootScope.kupa_num);
					//l++;
					a[l] = $rootScope.itemLine("מספר עסקאות:",$rootScope.cash_num);
					l++;
					a[l] = $rootScope.itemLine("פריטים שנמכרו:",$rootScope.numprod_hova-$rootScope.numprod_zchut);
					l++;
					a[l] = $rootScope.itemLine("פריטים שחויבו:",$rootScope.numprod_hova);
					l++;
					a[l] = $rootScope.itemLine("פריטים שזוכו:",$rootScope.numprod_zchut);
					l++;
					a[l] = $rootScope.itemLine("דמי מחזור:",$rootScope.start_cash);
					l++;
					a[l] = $rootScope.itemLine("סה\"כ הוספת מזומן לקופה:",$rootScope.mezumanin);
					l++;
					a[l] = $rootScope.itemLine("סה\"כ הוצאת מזומן מהקופה:",$rootScope.mezumanout);
					l++;
					a[l]="";
					l++;
					a[l] = $rootScope.itemLine("מזומן:",$rootScope.finalltash['cash']);
					l++;
					a[l] = $rootScope.itemLine("חיובים:",$rootScope.finalltash['cash1']['hova']);
					l++;
					a[l] = $rootScope.itemLine("זיכויים:",$rootScope.finalltash['cash1']['zicuy']);
					l++;
					a[l] = "";
					l++;					
					a[l] = $rootScope.itemLine("המחאה:",$rootScope.finalltash['cheque']);
					l++;
					a[l] = $rootScope.itemLine("חיובים:",$rootScope.finalltash['cheque1']['hova']);
					l++;
					a[l] = $rootScope.itemLine("זיכויים:",$rootScope.finalltash['cheque1']['zicuy']);
					l++;
					a[l] = "";
					l++;
					a[l] = $rootScope.itemLine("אשראי:",$rootScope.finalltash['credit']);
					l++;
					a[l] = $rootScope.itemLine("חיובים:",$rootScope.finalltash['credit1']['hova']);
					l++;
					a[l] = $rootScope.itemLine("זיכויים:",$rootScope.finalltash['credit1']['zicuy']);
					l++;
					a[l] = "";
					l++;
					a[l] = $rootScope.itemLine("הקפה:",$rootScope.finalltash['akafadebt']['general']);
					l++;
					a[l] = $rootScope.itemLine("מזומן:",$rootScope.finalltash['akafadebt']['cash']);
					l++;
					a[l] = $rootScope.itemLine("אשראי:",$rootScope.finalltash['akafadebt']['credit']);
					l++;
					a[l] = $rootScope.itemLine("המחאה:",$rootScope.finalltash['akafadebt']['cheque']);
					l++;
					a[l] = $rootScope.itemLine("כרטיס מתנה:",$rootScope.finalltash['akafadebt']['prepaid']);
					l++;
					a[l] = "";
					l++;
					a[l] = $rootScope.itemLine("פריפייד:",$rootScope.finalltash['prepaid']);
					l++;
					a[l] = $rootScope.itemLine("מזומן:","0");
					l++;
					a[l] = $rootScope.itemLine("אשראי:","0");
					l++;
					a[l] = $rootScope.itemLine("המחאה:","0");
					l++;
					a[l] = $rootScope.itemLine("כרטיס מתנה:","0");
					l++;
					a[l] = "";
					l++;
					a[l] = $rootScope.itemLine("סה\"כ תקבולים:",$rootScope.finalltash['all']);
					l++;
					a[l] = "";
					l++;
					 if(typeof android!='undefined'){
				      		 android.print_invoice(JSON.stringify(a));
				       }
				       else{
				       	if(typeof android2!='undefined'){
				       		android2.print_invoice(JSON.stringify(a));
				       	}
				       }

	     	}
	     }
	     $scope.checkshow = function(x){
				if(x!=0&&x!=""){
					return true;
				}
				return false;
		};
		
		$rootScope.closebb= function  () {
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
		if(localStorage.getItem('start_cash')===null){
			$rootScope.start_cash=0;
		}
		else{
			$rootScope.start_cash=localStorage.getItem('start_cash');
		}
		
	    if(localStorage.getItem('z-numprod_hova')===null){
			$rootScope.numprod_hova=0;
		}
		else{
			$rootScope.numprod_hova=localStorage.getItem('z-numprod_hova');
		}
		
		if(localStorage.getItem('z-numprod_zchut')===null){
			$rootScope.numprod_zchut=0;
		}
		else{
			$rootScope.numprod_zchut=localStorage.getItem('z-numprod_zchut');
		}
		
		if(localStorage.getItem('z-mezumanin')===null){
			$rootScope.mezumanin=0;
		}
		else{
			$rootScope.mezumanin=localStorage.getItem('z-mezumanin');
		}
		
		if(localStorage.getItem('z-mezumanout')===null){
			$rootScope.mezumanout=0;
		}
		else{
			$rootScope.mezumanout=localStorage.getItem('z-mezumanout');
		}
		
		if(localStorage.getItem('z-sumin')===null){
			$rootScope.sumin=0;
		}
		else{
			$rootScope.sumin=localStorage.getItem('z-sumin');
		}
		
		if(localStorage.getItem('z-sumout')===null){
			$rootScope.sumout=0;
		}
		else{
			$rootScope.sumout=localStorage.getItem('z-sumout');
		}
    }]);
    
})();