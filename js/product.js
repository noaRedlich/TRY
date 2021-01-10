/*sk 09/11 fix the large button in keyboard*/
var update_val;
function onblur0(){
	update_val=1;
}
function onblur1(){
	update_val=2;
}
function onblur3(){
	update_val=3;
}
function onblur4(){
	update_val=4;
}
function update_input_val(){
			if(update_val==1){
				if($("#p_beforervat").val()==''){
					$('#p_SalePrice').val('');
					return;
				}
				var b=$("#p_beforervat").val();
				var a=parseFloat(b*1.17).toFixed(2);
				$('#p_SalePrice').val(a);
				return;
			}
			if(update_val==2){
				if($("#p_SalePrice").val()==''){
					$('#p_beforervat').val('');
					return;
				}
				var b=$("#p_SalePrice").val();
				var a=parseFloat(parseFloat(b*17)/117).toFixed(2);
				var c=parseFloat(b-a);
				$('#p_beforervat').val(c);
				return;
			}
			if(update_val==3){
				if($("#p_cost").val()==''){
					$('#p_cost_whith_vat').val('');
					return;
				}
				var b=$("#p_cost").val();
				var a=parseFloat(b*1.17).toFixed(2);
				$('#p_cost_whith_vat').val(a);
				return;
			}
			if(update_val==4){
				if($("#p_cost_whith_vat").val()==''){
					$('#p_cost').val('');
					return;
				}
				var b=$("#p_cost_whith_vat").val();
				var a=parseFloat(parseFloat(b*17)/117).toFixed(2);
				var c=parseFloat(b-a);
				$('#p_cost').val(c);
				return;
			}
}
(function() {
  var app = angular.module('products', []);

	 app.controller('ProductController', ['$http','$scope', '$rootScope', '$compile','tabs','GetURLParameter','prod_global','add_cart','alert', function($http,$scope,$rootScope, $compile,tabs,GetURLParameter,prod_global,add_cart,alert){
	  var prd=this;
	  prd.currgroup=2;
	  prd.catJson = [];	  	  		
     // prd.products = []; 	
      $scope.start=0;
      $scope.end=50;
      
      $rootScope.amount=0;
	  $rootScope.before_global_dis=0;
	  $rootScope.global_dis=1;		
      $rootScope.search_prd ={};
      $rootScope.search_prd_off ={};
     
       	
      if(typeof pjson !='undefined'){
		prod_global.products =pjson;
	    prd.products=prod_global.products;
	    $rootScope.search_prd=prd.products;
	    $rootScope.search_prd_barcode =prd.products;
	    $rootScope.search_prd_off=prd.products;
	    $rootScope.search_prd_barcode_off =prd.products;
	    $(".spinner2").hide();
    	$(".spinner2").parent().css('text-align','inherit');
	}
      $.ajax("get_data.php?stat2=prod&stock="+stock)
		.success(function(data){        
   		 	$.getScript(data)
		  	.done(function( script, textStatus ) {		  		
			     prod_global.products =pjson;
			    prd.products=prod_global.products;
			    $rootScope.search_prd=prd.products;
			    $rootScope.search_prd_barcode =prd.products;
			    $rootScope.search_prd_off=prd.products;
			    $rootScope.search_prd_barcode_off =prd.products;
			    $(".spinner2").hide();
		    $(".spinner2").parent().css('text-align','inherit');

			  })
			  .fail(function( jqxhr, settings, exception ) {
			    console.log( exception );
			});
   		 });
	  $http.post('get_data.php',  $.param({stat2: "cat",stock:stock}), {
        	headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
   		 }).success(function(data){
			
		    prd.products ={};
		   	var start = data.indexOf("jsoncat:");
		   	var end = data.indexOf(":jsoncat");
		   	var len="jsoncat".length+1;
		   	str=data.substr(start+len,end-start-len);
		    prd.catJson= JSON.parse(str);
		    $(".spinner1").hide();
		    $(".spinner1").parent().css('text-align','inherit');
		     prd.product_bard={}; 		    
	  	});
	  	
	  	$http.post('get_data.php',  $.param({stat2: "discount",stock:stock}), {
        	headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
   		 }).success(function(data){
			
		   	var start = data.indexOf("jsondiscount:");
		   	var end = data.indexOf(":jsondiscount");
		   	var len="jsondiscount".length+1;
		   	str=data.substr(start+len,end-start-len);
		    $rootScope.discounts= JSON.parse(str);
		    $(".spinner1").hide();
		    $(".spinner1").parent().css('text-align','inherit');	    
	  	});
	  	
	  	
	  	
		$scope.search_barcode = function() {
			$scope.s=$("#search_prod").val();
		    $scope.search_barcode_main();
	    	$("#search_prod").val('');
	    }
	    $scope.search_barcode2 = function(str) {
	    	$scope.s="";
			$scope.s=str;
		    $scope.search_barcode_main();
	    }
	   
	    $scope.search_barcode_main = function() {
			/*sk 03/11 */
			/*&& $(".shovarzicuy").css('display')!='block'*/

			if ($(".disable_cash").css('display') != 'block' && $rootScope.is_shovar != 1) {
				$rootScope.notfound = 0;
				// sk 18/05/2016 search product in offline
				//if(online=='on'){
				if (document.getElementById("error_internet_connect").style.display == "none") {
					if ($scope.s != "" && $scope.s != undefined) {
						flag_search = 0;
						prd.products.filter(function(obj) {
							if (obj.BarCode == $scope.s) {
								cash_prd.add_cart(obj);
								//add_cart.add_cart(obj);
								flag_search = 1;
								return;
							}

						});
						if (flag_search == 0) {
							$http.post('inc/functions.php', $.param({
								prod_search_barcode : $scope.s
							}), {
								headers : {
									'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
								}
							}).success(function(data) {
								if (data != '' && data[0].SalePrice != "") {
									$rootScope.search_prd_barcode = {};
									$rootScope.search_prd_barcode = data;
									cash_prd.add_cart($rootScope.search_prd_barcode[0]);
								} else {
									$rootScope.notfound = $scope.s;
									$(".pop_alert").css({
										'display' : 'block'
									});
									$(".pop_alert").css({
										'z-index' : '9999'
									});
									$(".pop_alert .container_pop").css({
										'display' : 'block'
									});
									$rootScope.action = 'add_prd';
									$('#message').text("פריט לא קיים. האם ברצונך להקים פריט חדש?");
								}

							});
						}

					}
				} else {
					flag_search = 0;
					prd.products.filter(function(obj) {
						if (obj.BarCode == $scope.s) {
							cash_prd.add_cart(obj);
							//add_cart.add_cart(obj);
							flag_search = 1;
							return;
						}

					});
					if (flag_search == 0) {
						alert.alert_site('פריט לא קיים', 0, 1);
					}
				}

				$("#search_prod").val('');
			}
			if ($rootScope.is_shovar == 1 && typeof android != "undefined") {
				var x = $scope.s;
				$('input[name=shovarzicuy_num]').val(x);
			}

		}
	    
// 	    
	    	    // $scope.search_barcode_main = function() {
	    	// /*sk 03/11 */
	    	// /*&& $(".shovarzicuy").css('display')!='block'*/
// 	    
	    	// if($(".disable_cash").css('display')!='block' && $rootScope.is_shovar!=1){
	    		// $rootScope.notfound=0;
	    		// // sk 18/05/2016 search product in offline
		    	// //if(online=='on'){
		    		// if(document.getElementById("error_internet_connect").style.display=="inline-flex"){
			    	// if($scope.s!=""&&$scope.s!=undefined){
			  			// $http.post('inc/functions.php',  $.param({prod_search_barcode: $scope.s}), {
				        	// headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
				   		 // }).success(function(data){
				   		 	// if(data!=''&&data[0].SalePrice!=""){
				   		 		// $rootScope.search_prd_barcode ={};
							    // $rootScope.search_prd_barcode= data;
							    // cash_prd.add_cart($rootScope.search_prd_barcode[0]);
				   		 	// }
				   		 	// else{
				   		 		// $rootScope.notfound=$scope.s;
				   		 		// $(".pop_alert").css({'display':'block'});
								// $(".pop_alert").css({'z-index':'9999'});
								// $(".pop_alert .container_pop").css({'display':'block'});
								// $rootScope.action='add_prd';
								// $('#message').text("פריט לא קיים. האם ברצונך להקים פריט חדש!?");
				   		 	// }
// 						    
						 // });
					 // }
		  		// }
		  		// else{
		  			// flag_search=0;
		  			// writelog("ירית ברקוד "+$scope.s);
					 // prd.products.filter(function( obj ) {
						// if(obj.BarCode.indexOf($scope.s) >-1){
							// cash_prd.add_cart(obj);
							// //add_cart.add_cart(obj);
							// flag_search=1;
							// return;
						// }
// 												
// 	
// 					
		  			// });
		  			// if(flag_search==0){
		  				// alert.alert_site('פריט לא קיים!!!!!!!!',0,1);
		  			// }
		    	// }
// 	
		    	// $("#search_prod").val('');
		    	// }
		    	// if($rootScope.is_shovar==1 && typeof android!="undefined"){
	    			// var	x=$scope.s;
		    		// $('input[name=shovarzicuy_num]').val(x);
	    // }
// 
	    // }
  	$scope.search_p = function(){
	  		/*sk 17/05/2016 do search in offline state*/
	  		// if(online=='on'){
	  			if(1==0 && document.getElementById("error_internet_connect").style.display=="none"){
	  			$scope.s=$("#search_prod2").val();
				$http.post('inc/functions.php',  $.param({prod_search: $scope.s,table:'listingsDB'}), {
		        	headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
		   		 }).success(function(data){		
		   		 	if(data!=''&&data[0].SalePrice!=""){
					    $rootScope.search_prd ={};
					    $rootScope.search_prd= data;	
				    }	    
			  	});
	  		}
	  		else{
	  			$scope.flag_p=[];
	  			$scope.s=$("#search_prod2").val();
	  			$rootScope.search_prd_off={};
	  			
	  			prd.products.filter(function( obj ) {
					if(obj.Title.indexOf($scope.s) >-1){
						$scope.flag_p.push(obj);
					}						

				});
				/*sk 17/05/2016 do search in offline state*/
				//$rootScope.search_prd_off=$scope.flag_p;
				//$rootScope.search_prd ={};
				$rootScope.search_prd= $scope.flag_p;
				if($scope.flag_p.length == 0){
				$http.post('inc/functions.php',  $.param({prod_search: $scope.s,table:'listingsDB'}), {
		        	headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
		   		 }).success(function(data){		
		   		 	if(data!=''&&data[0].SalePrice!=""){
					    $rootScope.search_prd ={};
					    $rootScope.search_prd= data;	
				    }	    
			  	});
			  }
	  		}
			
	    };
	    $scope.advanced_search_p = function(){
	    	$scope.Barcode=$("#advanced_s_Barcode").val();
	    	$scope.SalePrice=$("#advanced_s_SalePrice").val();
	    	$scope.ProductGroup=$("#advanced_s_ProductGroup").val();
			$scope.MisparZar=$("#advanced_s_MisparZar").val();
			$scope.Sapak=$("#advanced_s_Sapak").val();
			$scope.MisparSiduri=$("#advanced_s_MisparSiduri").val();
			$scope.chalifinum=$("#advanced_s_chalifinum").val();
			/*sk 17/05/2016 do search in offline state*/
	  		//if(online=='on'){
	  			if(document.getElementById("error_internet_connect").style.display=="none"){				
				$http.post('inc/functions.php',  $.param({advanced_search: 1,SalePrice:$scope.SalePrice,ProductGroup:$scope.ProductGroup,MisparZar:$scope.MisparZar,Sapak:$scope.Sapak,MisparSiduri:$scope.MisparSiduri,chalifinum:$scope.chalifinum,barcode:$scope.Barcode}), {
		        	headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
		   		 }).success(function(data){		
		   		 	$rootScope.search_prd ={};
		   		 	if(data!=''&&data[0].SalePrice!=""){
					   		$rootScope.search_prd= data;	
					   		tabs.setTab(4);					   		
							$("select.toclean").val('-1');
				    }	
				    else{
				    	alert.alert_site('מוצר לא נמצא',0,1);
				    }  
				    $(".toclean").val('');  
				    $("select").val('-1');
			  	});
	  		}
	  		else{
	  			$scope.flag_p=[];
	  			$rootScope.search_prd_off={};
	  			prd.products.filter(function( obj ) {
	  				var a='22222222';
	  				/*if(  $scope.Barcode != '' && obj.BarCode.indexOf($scope.Barcode) >-1) {
	  					$scope.flag_p.push(obj);
	  				}*/
	  				flag=0;
	  				flag2=0;
	  				if($scope.Barcode != ''){
	  					if(obj.BarCode.indexOf($scope.Barcode) >-1){
	  						flag=1;
	  					}
	  					else{
	  						flag2=1;
	  						flag=0;
	  					}
	  				}
	  				if(flag2==0){
		  				if($scope.SalePrice != ''){
		  					if(obj.SalePrice==$scope.SalePrice){
		  						flag=1;
		  					}	
		  					else{
		  						flag=0;
		  						flag2=1;
		  					}
		  					
		  				}
	  				}
	  				if(flag2==0){
		  				if($scope.ProductGroup != '' && $scope.ProductGroup!= -1){
		  					if(obj.ProductGroup==$scope.ProductGroup){
		  						flag=1;
		  					}	
		  					else{
		  						flag=0;
		  						flag2=1;
		  					}
		  					
		  				}
	  				}
	  				if(flag2==0){
		  				if($scope.MisparZar	 != ''){
		  					if(obj.MisparZar.indexOf($scope.MisparZar) >-1){
		  						flag=1;
		  					}	
		  					else{
		  						flag=0;
		  						flag2=1;
		  					}
		  					
		  				}
	  				}
  					// if(flag2==0){
	  				// if($scope.Sapak	 != ''){
	  					// if(obj.Sapak==$scope.Sapak){
	  						// flag=1;
	  					// }	
	  					// else{
	  						// flag=0;
	  						// flag2=1;
	  					// }
// 	  					
	  				// }
	  				// }
// 	  				
	  				
	  				if(flag==1){
	  				   $scope.flag_p.push(obj);
	  				}
	  				
	  				/*switch(type) {
    					case 'SalePrice':
					        if(obj.SalePrice.indexOf($scope.s) >-1){
								$scope.flag_p.push(obj);
							}	
					        break;
					    case 'ProductGroup':
					       if(obj.ProductGroup.indexOf($scope.s) >-1){
								$scope.flag_p.push(obj);
							}	
					        break;
					    default:
					       
					}*/
										

				});
				/*sk 17/05/2016 do search in offline state*/
				//$rootScope.search_prd_off=$scope.flag_p;
				if($scope.flag_p.length){
				$rootScope.search_prd ={};
				$rootScope.search_prd= $scope.flag_p;
			      tabs.setTab(4);		
			      }
			      else{
			      	alert.alert_site('מוצר לא נמצא',0,1);
			      }			   		
							//$("select.toclean").val('-1');
				// $(".toclean").val('');  
				// $("select").val('-1');
	  		}
			
	    };
	    /*
	     *  $scope.advanced_search_p = function(type){
	    	$scope.s=$("#advanced_s_"+type).val();
	  		if(online=='on'){				
				$http.post('inc/functions.php',  $.param({prod_search: $scope.s,prod_type:type}), {
		        	headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
		   		 }).success(function(data){		
				    $rootScope.search_prd ={};
				    $rootScope.search_prd= data;		    
			  	});
	  		}
	  		else{
	  			$scope.flag_p=[];
	  			$rootScope.search_prd_off={};
	  			prd.products.filter(function( obj ) {
	  				switch(type) {
    					case 'SalePrice':
					        if(obj.SalePrice.indexOf($scope.s) >-1){
								$scope.flag_p.push(obj);
							}	
					        break;
					    case 'ProductGroup':
					       if(obj.ProductGroup.indexOf($scope.s) >-1){
								$scope.flag_p.push(obj);
							}	
					        break;
					    default:
					       
					}
										

				});
				$rootScope.search_prd_off=$scope.flag_p;
	  		}
			
	    };
	     */
		$scope.isnext = function(){
			if($rootScope.tab==3){
				if(parseInt($(".numpritim1").text())!=200)
	  		 	return false;
			}
			else if($rootScope.tab==4){
				if(parseInt($(".numpritim2").text())!=200)
	  		 	return false;
			}
	  		return true;
	    };
	    $scope.isprev = function(){
	  		 if($scope.start==0)
	  		 	return false;
	  		 return true;
	    };
	  	$scope.next = function(){
	  		 $scope.start=parseInt($scope.start)+200;
      		 $scope.end=parseInt($scope.end)+200;	
	    };
	    $scope.prev = function(){
	  		 $scope.start=parseInt($scope.start)-200;
      		 $scope.end=parseInt($scope.end)-200;	
	    };
	     $scope.reset = function(){
	  		 $scope.start=0;
      		 $scope.end=200;	
	    };
	    

	    
	  	this.getCategory2 = function(id_cat,cat_name){
	  		if($rootScope.addCategory == true){
	  			$rootScope.addCategory = false;	  			
	  			cash_prd.add_general_new_cart(id_cat,cat_name);
	  	
	  		}
	  		else{
		  		if(id_cat!=undefined){
		  			prd.currgroup=id_cat;
		  			 tabs.setTab(3);
		  		}	  
	  		}			
	    };
	    
	    this.find_product=function(){
	    	tabs.setTab(4);
		};
		this.filterFunction = function(element){
			 return element.Title.match(/^Ma/) ? true : false;
		};

		this.image = function(path,picture){				
				if(picture!=''){
					return path+'/'+picture;
				}
				else{
					return "images/main.jpg";
				}
		};
		//sk 19/06/2016 add picture to product
	this.draw_img = function(path,picture){				
				if(picture!=''){
					return path+'/'+picture;
				}
				else{
					return "images/tag.svg";
				}
		};
	this.add_style=function(picture){
			if(picture!=''){
					return '';
				}
				else{
					return "width:26px !important";
				}
		};

		        		        
    }]);
    app.controller('AddProductController', ['$scope', '$rootScope','prod_global','$http','GetURLParameter','alert', function($scope,$rootScope,prod_global,$http,GetURLParameter,alert){
    	$scope.unit ={};
    	$scope.sapak ={};
    	$scope.category ={};
    	 $http.post('get_data.php',  $.param({stat2: "add_prod",stock:GetURLParameter.GetURLParameter('stock')}), {
        	headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
   		 }).success(function(data){

		    
		   	var start = data.indexOf("jsonunit:");
		   	var end = data.indexOf(":jsonunit");
		   	var len="jsonunit".length+1;
		   	str=data.substr(start+len,end-start-len);
		    $scope.unit= JSON.parse(str);
		    var x={ID: "-1",
				name: "מחיר ל"};
		    $scope.unit.unshift(x);
		    $scope.p_Sapak=$scope.unit[0];		    
		    
			var start = data.indexOf("jsonsapak:");
		   	var end = data.indexOf(":jsonsapak");
		   	var len="jsonsapak".length+1;
		   	str=data.substr(start+len,end-start-len);
		    $scope.sapak= JSON.parse(str);
		    x={ID: "-1",
				SupplierName: "ספקים"};
		    $scope.sapak.unshift(x);
		    $scope.p_Unit=$scope.sapak[0];
		    
		    var start = data.indexOf("jsoncategory:");
		   	var end = data.indexOf(":jsoncategory");
		   	var len="jsoncategory".length+1;
		   	str=data.substr(start+len,end-start-len);
		    $scope.category= JSON.parse(str);
		    x={ID: "-1",
				CategoryName: "מחלקות"};
		    $scope.category.unshift(x);
		    $scope.p_ProductGroup=$scope.category[0];
	  	});
	    $scope.add_product = function(){
	    	var x={
	    		BarCode: $("#p_barcode").val(),
				ProductGroup: $("#p_ProductGroup").val(),
				SalePrice: $("#p_SalePrice").val(),
				Title:$("#p_name").val(),
				sum_saled: "0",
				Cost: $("#p_cost_whith_vat").val(),  /*sk 21/09/2015 add cost to product +*/
				
	    	};
	  		prod_global.products.push(x);
	  		/*$http.post('inc/functions.php',  $.param({prod_add: "1",Title: $("#p_name").val(),BarCode:$("#p_barcode").val(),SalePrice:$("#p_SalePrice").val(),Unit: $("#p_Unit").val(),
	  		ProductGroup: $("#p_ProductGroup").val(),Sapak: $("#p_Sapak").val(),MisparZar: $("#p_MisparZar").val(),description: $("#p_description").val(),
	  		MisparSiduri: $("#p_MisparSiduri").val(),MisparChalifi: $("#p_MisparChalifi").val(),StockMin: $("#p_StockMin").val(),StockMax: $("#p_StockMax").val(),
	  		Mikum: $("#p_Mikum").val(),
	  		 }), {
	        	headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
	   		 }).success(function(data){
    			$(".wrap").click();
    			$(".pop_add_prod  input[type=text]").val("");
		  	});*/
		  	/*sk require fields*/
	  		var barcode_product = $("#p_barcode").val();
	  		var sale_price =$("#p_SalePrice").val();
	  		var name_product=$("#p_name").val();
	  		if(barcode_product== '' || sale_price=='' || name_product == ''){
	  				alert.alert_site('יש למלא שדות חובה',0,1);
	  				return;
	  		}
	  		//sk 22/03/2016 validate barcode length 
	  		if(barcode_product.length>13){
	  			$('#p_barcode').val('');
	  			alert.alert_site('יש להזין  ברקוד עד 13 תוים',0,1);
	  				return;
	  		}
	  		
		  	/*sk 21/09/2015 add cost to product*/
		  	/*sk 13/03/16 set default to unit*/
		  	var unit=$("#p_Unit").val();
		  	if(unit==-1){
		  		unit=0;
		  	}
	  		$http.post('inc/functions.php',  $.param({prod_add: "1",Title: $("#p_name").val(),BarCode:$("#p_barcode").val(),SalePrice:$("#p_SalePrice").val(),Unit:unit,
	  		ProductGroup: $("#p_ProductGroup").val(),Sapak: $("#p_Sapak").val(),MisparZar: $("#p_MisparZar").val(),description: $("#p_description").val(),
	  		MisparSiduri: $("#p_MisparSiduri").val(),MisparChalifi: $("#p_MisparChalifi").val(),StockMin: $("#p_StockMin").val(),StockMax: $("#p_StockMax").val(),
	  		Mikum: $("#p_Mikum").val(),Cost:$("#p_cost_whith_vat").val()
	  		 }), {
	        	headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
	   		 }).success(function(data){
	   		 	/*sk  14/03/2016 not offer to create products whith same barcode*/
	   		 	if(data==1){
	   		 		document.getElementById('p_barcode').value="";
	   		 		alert.alert_site('ברקוד כבר קיים במערכת!!',0,1);
	   		 	}
	   		 	else{
		   		    prod_global.products.push(x);
	    			$(".wrap").click();
	    			$(".pop_add_prod  input[type=text]").val("");
    			}
    			
		  	});
	    };
        /*sk 21/09/2015  */
	/*update price whith vat*/
	$rootScope.on_blur=function(){
    $rootScope.update_vat=1;
    };
    /*update price whithout vat*/
    $rootScope.on_blur1=function(){
    $rootScope.update_vat=2;
    };
    $rootScope.on_blur3=function(){
    	$rootScope.update_vat=3;
    };
    $rootScope.on_blur4=function(){
    	$rootScope.update_vat=4;
    };
    $rootScope.calc_price_whith_vat=function(){
    x=this.val();
    b=$("#p_beforervat").val();
    c=$("#p_SalePrice").val();
    
    };
     /*sk 14/10 cal price whith vat*/
    $rootScope.update_input_val=function(){
			if($rootScope.update_vat==1){
				if($("#p_beforervat").val()==''){
					$('#p_SalePrice').val('');
					return;
				}
				var b=$("#p_beforervat").val();
				var a=parseFloat(b*1.17).toFixed(2);
				$('#p_SalePrice').val(a);
				return;
			}
			if($rootScope.update_vat==2){
				if($("#p_SalePrice").val()==''){
					$('#p_beforervat').val('');
					return;
				}
				var b=$("#p_SalePrice").val();
				var a=parseFloat(parseFloat(b*17)/117).toFixed(2);
				var c=parseFloat(b-a);
				$('#p_beforervat').val(c);
				return;
			}
			if($rootScope.update_vat==3){
				if($("#p_cost").val()==''){
					$('#p_cost_whith_vat').val('');
					return;
				}
				var b=$("#p_cost").val();
				var a=parseFloat(b*1.17).toFixed(2);
				$('#p_cost_whith_vat').val(a);
				return;
			}
			if($rootScope.update_vat==4){
				if($("#p_cost_whith_vat").val()==''){
					$('#p_cost').val('');
					return;
				}
				var b=$("#p_cost_whith_vat").val();
				var a=parseFloat(parseFloat(b*17)/117).toFixed(2);
				var c=parseFloat(b-a);
				$('#p_cost').val(c);
				return;
			}
			
		};
		        		        
    }]);
    app.controller('CashProdController', ['$http','$scope', '$rootScope','local','cash_global','tabs','alert', function($http,$scope,$rootScope, local,cash_global,tabs,alert){
    	cash_prd=this;
    	cash_prd.products=cash_global.products;
    	$rootScope.new_id=0;
		$rootScope.index=-1;
		
		cash_prd.add_cart = function(prod){
			//$rootScope.back=true;
			
			id=prod['BarCode'];
			if($rootScope.refund==1){				
				var price=parseFloat(prod['SalePrice'])*-1;
				$('.zicuy').toggleClass("zicuy_zctive");
			}
			else{
				var price=prod['SalePrice'];
			}
			
			var amount = 1;
			if(prod['Unit'] == 2 ){
				if(typeof window.external != 'undefined' && typeof window.external.getWeight != 'undefined'){
				   amount= window.external.getWeight();
				}
				 else{
				 	
				 	amount =0;
				 }
			}
			
			
			$rootScope.index++;
	 		var x={
	 			"ID":prod['ID'].toString(),
	   			"BarCode":prod['BarCode'],
	   			"Title":prod['Title'],
	   			"SalePrice":price,
	   			"Amount":amount,
	   			"Discount":0,
	   			"comment":'',
	   			"commentClass":'',
	   			"department":prod['department'],
	   			"comptype":"2",
	   			"finalamount":'',
	   			"Discount2":0,
	   			"cdisctype":0,
	   			"refund":$rootScope.refund,
	   			"index":$rootScope.index,
	   			"Unit": prod["Unit"],
	   			"discount_desc": prod['discount_desc']
	   		};
	   		writelog("הוספת פריט: "+prod['BarCode']+" "+prod['Title']+" מחיר: "+price);
	   		var y=0;
	    	/*cash_prd.products.filter(function( obj ) {
					if(obj.BarCode === id){
						if($rootScope.refund==1&&obj.refund==1){
							$rootScope.back=false;
							cash_prd.plus_count(prod['SalePrice'],prod['BarCode'],$rootScope.refund)	
							y=1;
						}
						else if($rootScope.refund!=1&&obj.refund!=1){	
							$rootScope.back=false;							
								cash_prd.plus_count(prod['SalePrice'],prod['BarCode'],$rootScope.refund)
								y=1;
						}
							
					}						

				});*/
			
		    if(y==1&&1==0){
		    	
		    	y=0;
		    }
			else{
				$rootScope.countprod++;
				cash_prd.products.push(x);
				$rootScope.amount=(parseFloat($rootScope.before_global_dis)+parseFloat(price*amount)).toFixed(2);
				if($rootScope.isMoadon){
					$rootScope.amount=($rootScope.amount*$rootScope.global_dis).toFixed(2);
				}
					$rootScope.before_global_dis=(parseFloat($rootScope.before_global_dis)+parseFloat(price*amount)).toFixed(2);
				
				//$rootScope.original=$rootScope.amount;
			//$rootScope.amount_maam=(parseFloat($rootScope.amount)*0.17).toFixed(2);/*sk 08/10 change vat*/
			//$rootScope.amount_out=(parseFloat($rootScope.amount)*0.83).toFixed(2);/*sk 08/10 change vat*/
              $rootScope.amount_maam = (($rootScope.amount * 17)/117).toFixed(2);
              $rootScope.amount_out= ($rootScope.amount-$rootScope.amount_maam).toFixed(2);
				$rootScope.original_afterprod=$scope.getTotal();	
			}
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
		   $rootScope.refund=0;
		   local.setLocal('products',cash_prd.products);
			$(".search_input").val("");
			$("#search_prod").val("");
			$("#search_prod").focus();
			$scope.$apply();
			var elem = document.getElementById('cat2');
  			elem.scrollTop = elem.scrollHeight;
	    };

		$rootScope.countprod=0;

		$scope.getTotal = function(){
		    var total = 0;
		    for(var i = 0; i < cash_prd.products.length; i++){
		        var product = cash_prd.products[i];
		        total += (product.SalePrice-product.Discount)*product.Amount;
		    }
		    $rootScope.check_discounts();
		    return total.toFixed(2);
		};

		$rootScope.compare = function(a,b) {
		  if (parseFloat(a.SalePrice)-parseFloat(a.Discount) < parseFloat(b.SalePrice)-parseFloat(b.Discount))
		    return 1;
		  if (parseFloat(a.SalePrice)-parseFloat(a.Discount) > parseFloat(b.SalePrice)-parseFloat(b.Discount))
		    return -1;
		  return 0;
		}
		$rootScope.check_discounts = function(){
			if (typeof $rootScope.discount_sale == 'undefined'){
				$rootScope.discount_sale = 0;
			}
			$rootScope.before_global_dis = parseFloat($rootScope.before_global_dis) + $rootScope.discount_sale;
			$rootScope.amount=$rootScope.before_global_dis;
			$rootScope.discount_sale = 0;
			if($rootScope.isMoadon){
				$rootScope.amount=($rootScope.amount*$rootScope.global_dis).toFixed(2);				
			}
			for(var i = 0; i < cash_prd.products.length; i++){
				cash_prd.products[i].discount_sale = 0;
			}
			$rootScope.discount_sale = 0;
			for(var j = 0; j < $rootScope.discounts.length; j++){
				var discount = $rootScope.discounts[j];
				var cnt = 0;
				var discount_prd = [];
				for(var i = 0; i < cash_prd.products.length; i++){
		       		 var product = cash_prd.products[i];
		        	if(discount.items.indexOf(parseInt(product.ID)) != -1 && parseFloat(product.SalePrice) > 0){
	        			cnt+=parseFloat(product.Amount);		        		
	        			discount_prd.push(product);
		        	}
		        }
		        var ind = 0;
		        var discount_amount = 0;
		        switch(discount.type) {
		        	case "1"://n+n
		        	    if(cnt > parseInt(discount.op1)){
		        	    	discount_prd.sort($scope.compare);		        	    	
		        	    	for(var x = 0; x < discount_prd.length; x++){
		        	    		discount_amount = 0;		        	    		
		        	    		for (var z =0; z < discount_prd[x].Amount; z++){
		        	    			if(ind == parseInt(discount.op1)+parseInt(discount.op2)){
		        	    				ind = 0;
		        	    			}		        	    			
		        	    			ind++;
		        	    			if(ind > parseInt(discount.op1) && ind <= parseInt(discount.op1)+parseInt(discount.op2)){
		        	    				discount_amount = discount_amount + (discount_prd[x].SalePrice - discount_prd[x].Discount);		        	    			
		        	    			}		        	    			
		        	    		}
		        	    		if(discount_amount > 0){
		        	    			$rootScope.discount_sale = $rootScope.discount_sale + discount_amount;
		        	    			prd = cash_prd.products.filter(function(obj){		        	    				
		        	    				return obj.index == discount_prd[x].index;
		        	    			});
		        	    			prd[0].discount_sale = prd[0].discount_sale + discount_amount;    	    				        	    		
			        	    	}
			        	    }
		        	    }
		        		break;
		        	case "2"://n ב nה
		        		if(cnt >= parseInt(discount.op1)){
		        	    	discount_prd.sort($scope.compare);
		        	    	for(var x = 0; x < discount_prd.length; x++){
		        	    		discount_amount = 0;		        	    		
		        	    		for (var z =0; z < discount_prd[x].Amount; z++){
		        	    			if(ind == parseInt(discount.op1)){
		        	    				ind = 0;
		        	    			}		        	    			
		        	    			ind++;
		        	    			if(ind == parseInt(discount.op1)){
		        	    				discount_amount = discount_amount + (discount_prd[x].SalePrice - discount_prd[x].Discount) - parseInt(discount.op2);		        	    			
		        	    			}		        	    			
		        	    		}
		        	    		if(discount_amount > 0){
		        	    			$rootScope.discount_sale = $rootScope.discount_sale + discount_amount;
		        	    			prd = cash_prd.products.filter(function(obj){		        	    				
		        	    				return obj.index == discount_prd[x].index;
		        	    			});
		        	    			prd[0].discount_sale = prd[0].discount_sale + discount_amount;    	    				        	    		
			        	    	}
			        	    }
		        	   }
		        		break;
		        	case "3":// n ב n
		        		if(cnt >= parseInt(discount.op1)){
		        			discount_amount = 0;
		        	    	discount_prd.sort($scope.compare);
		        	    	for(var x = 0; x < discount_prd.length; x++){
		        	    		    	    		
		        	    		for (var z =0; z < discount_prd[x].Amount; z++){
		        	    			if(ind == parseInt(discount.op1)){
		        	    				ind = 0;
		        	    			}		        	    			
		        	    			ind++;
		        	    			discount_amount = discount_amount + (discount_prd[x].SalePrice - discount_prd[x].Discount) ;		        	    			
		        	    					        	    			
		        	    		
		        	    		if(ind == parseInt(discount.op1)){
		        	    			prd = cash_prd.products.filter(function(obj){		        	    				
		        	    				return obj.index == discount_prd[x].index;
		        	    			});
		        	    			$rootScope.discount_sale = $rootScope.discount_sale + discount_amount - parseInt(discount.op2);
		        	    			prd[0].discount_sale = prd[0].discount_sale + discount_amount - parseInt(discount.op2);    	  
		        	    			

		        	    			discount_amount = 0;  				        	    		
			        	    	}
			        	    	}
			        	    }
		        	   }
		        		break;
		        	case "4"://הנחה % n ב n ה
		        		if(cnt >= parseInt(discount.op1)){
		        	    	discount_prd.sort($scope.compare);
		        	    	for(var x = 0; x < discount_prd.length; x++){
		        	    		discount_amount = 0;		        	    		
		        	    		for (var z =0; z < discount_prd[x].Amount; z++){
		        	    			if(ind == parseInt(discount.op1)){
		        	    				ind = 0;
		        	    			}		        	    			
		        	    			ind++;
		        	    			if(ind == parseInt(discount.op1)){
		        	    				discount_amount = discount_amount + (discount_prd[x].SalePrice - discount_prd[x].Discount) * parseInt(discount.op2) / 100;		        	    			
		        	    			}		        	    			
		        	    		}
		        	    		if(discount_amount > 0){
		        	    			$rootScope.discount_sale = $rootScope.discount_sale + discount_amount;
		        	    			prd = cash_prd.products.filter(function(obj){		        	    				
		        	    				return obj.index == discount_prd[x].index;
		        	    			});
		        	    			prd[0].discount_sale = prd[0].discount_sale + discount_amount;    	    				        	    		
			        	    	}
			        	    }
		        	   }
		        		break;
		        }
		    }
		$rootScope.before_global_dis = $rootScope.before_global_dis - $rootScope.discount_sale;
			$rootScope.amount=$rootScope.before_global_dis;
			if($rootScope.isMoadon){
				$rootScope.amount=($rootScope.amount*$rootScope.global_dis).toFixed(2);				
			}
			 $rootScope.amount_maam = ((parseFloat($rootScope.amount)* 17)/117).toFixed(2);
			 $rootScope.amount_out= ($rootScope.amount-$rootScope.amount_maam).toFixed(2);
			$(".before_calc").show();
			if($rootScope.itra!=0&&$rootScope!=""){
				$rootScope.itra=(parseFloat($rootScope.amount)-parseFloat($rootScope.paid)).toFixed(2);
			}
			$rootScope.amount = parseFloat($rootScope.amount).toFixed(2);
		};
		
		$rootScope.start_anacha_prod = function(prod,after_disc) {
			if($rootScope.right_pass==1||$rootScope.premission_list['permission_discountprod']=='on'){
				$rootScope.right_pass=0;
				
				str=".pop_anacha,.calc_area";
				popup=".an_prod,.pop_anacha";
				openwrap(str,popup);
				tabs.setTab(5);
				
				if($rootScope.original_afterprod==undefined||$rootScope.original_afterprod==0){
		 			$rootScope.original_afterprod=$rootScope.amount;
		 		}
				$(".an_prod .s_new1").val(after_disc);
				$('.an_prod input[name=BarCode]:hidden').val(prod['BarCode']);
				$(".an_prod .anacha_txt").val("");
				$(".an_prod .anacha_txt").focus();
				$rootScope.price=prod['SalePrice'];
				$rootScope.currIndex=prod['index'];
			}
			else{
				$rootScope.action="start_anacha_prod";
				$rootScope.selector1=prod;
				$rootScope.selector2=after_disc;
				alert.alert_site('משתמש לא מורשה',3,1);
			}
		};
		this.permission_global_item = function() {
	  		if($rootScope.prefers_list['pr_global_item']=='on'){
		  		alert.alert_site('לא ניתן להוסיף פריט כללי',1,1);
				return false;
			}
			return true; 
	  };
		this.add_general_new_cart = function(cat_id,cat_name){
			if (this.permission_global_item()){
			
			if($('.input_result input[name=Input]').val()!=''&&$('.input_result input[name=Input]').val()!='undefined'){
	    		if($(".add_worker.popup_pay  ").css("display")=="block"||$(".pop_anacha ").css("display")=="block"||$(".pop_tip ").css("display")=="block"){
	    			//$(".mezuman_sum").val($('.input_result input[name=Input]').val())
	    		}
	    		else{
	    			$rootScope.countprod++;
	    			$('.input_result input[name=Input]').val(eval($('.input_result input[name=Input]').val()));
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
						var price=(parseFloat($('.input_result input[name=Input]').val())*-1).toFixed(2);
						$('.zicuy').toggleClass("zicuy_zctive");
						//$rootScope.refund=0;
					}
					else{
						var price=parseFloat($('.input_result input[name=Input]').val()).toFixed(2);
					}
					writelog("הוספת פריט כללי בסכום: "+price);
					$rootScope.index++;
			   		var x={
			   			"Amount": 1,
						"ID":"0",
						"Title":cat_name + " - "+  "פריט כללי" ,
						"BarCode":"newid_"+$rootScope.new_id,
						"SalePrice":price,
						"Amount":1,
						"Discount":0, 
						"Discount2":0,
						"comment":'',	   			
						"commentClass":'',			   			
			   			"comptype":"2",
			   			"department":"-1",
			   			"finalamount":'',			   			
			   			"cdisctype":0,
			   			"refund":$rootScope.refund,
			   			"index":$rootScope.index,
			   			"category":cat_id,
			   			"Unit": 0
			   			
			   		};
			   		
			   		$rootScope.refund=0;
					cash_prd.products.push(x);
					$rootScope.amount=(parseFloat($rootScope.before_global_dis)+parseFloat(price)).toFixed(2);
					if($rootScope.isMoadon){
						$rootScope.amount=($rootScope.amount*$rootScope.global_dis).toFixed(2);
						
					}
					$rootScope.before_global_dis=(parseFloat($rootScope.before_global_dis)+parseFloat(price)).toFixed(2);
					//$rootScope.original=$rootScope.amount;
					//$rootScope.amount_maam=(parseFloat($rootScope.amount)*0.17).toFixed(2);/*sk 08/10 change vat*/
					//$rootScope.amount_out=(parseFloat($rootScope.amount)*0.83).toFixed(2);/*sk 08/10 change vat*/
		              $rootScope.amount_maam = (($rootScope.amount * 17)/117).toFixed(2);
		              $rootScope.amount_out= ($rootScope.amount-$rootScope.amount_maam).toFixed(2);
					$rootScope.original_afterprod=$scope.getTotal();	
					
					$('.input_result input[name=Input]').val('');
				    local.setLocal('products',cash_prd.products);
	    		}
	    		
	    	}  
	    	else{
	    		$('.input_result input[name=Input]').val('');
	    	} 			
	    	$scope.$apply();
	    	var elem = document.getElementById('cat2');
  			elem.scrollTop = elem.scrollHeight;
		}
		};
	    this.add_new_cart = function(){ 
	    	
	    	
	    	if($('.input_result input[name=Input]').val()!=''&&$('.input_result input[name=Input]').val()!='undefined'){
	    		if($(".add_worker.popup_pay  ").css("display")=="block"||$(".pop_anacha ").css("display")=="block"||$(".pop_tip ").css("display")=="block"){
	    			//$(".mezuman_sum").val($('.input_result input[name=Input]').val())
	    		}
	    		else{
	    			if (this.permission_global_item()){
	    			$rootScope.countprod++;
	    			$('.input_result input[name=Input]').val(eval($('.input_result input[name=Input]').val()));
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
						var price=(parseFloat($('.input_result input[name=Input]').val())*-1).toFixed(2);
						$('.zicuy').toggleClass("zicuy_zctive");
						//$rootScope.refund=0;
					}
					else{
						var price=parseFloat($('.input_result input[name=Input]').val()).toFixed(2);
					}
					writelog("הוספת פריט כללי בסכום: "+price);
					$rootScope.index++;
			   		var x={
			   			"Amount": 1,
						"ID":"0",
						"Title":"פריט כללי",
						"BarCode":"newid_"+$rootScope.new_id,
						"SalePrice":price,
						"Amount":1,
						"Discount":0,
						"Discount2":0,
						"comment":'',	   			
						"commentClass":'',			   			
			   			"comptype":"2",
			   			"department":"-1",
			   			"finalamount":'',			   			
			   			"cdisctype":0,
			   			"refund":$rootScope.refund,
			   			"index":$rootScope.index,
			   			"Unit": 0
			   		};
			   		
			   		$rootScope.refund=0;
					cash_prd.products.push(x);
					$rootScope.amount=(parseFloat($rootScope.before_global_dis)+parseFloat(price)).toFixed(2);
					if($rootScope.isMoadon){
						$rootScope.amount=($rootScope.amount*$rootScope.global_dis).toFixed(2);
						
					}
					$rootScope.before_global_dis=(parseFloat($rootScope.before_global_dis)+parseFloat(price)).toFixed(2);
					//$rootScope.original=$rootScope.amount;
					//$rootScope.amount_maam=(parseFloat($rootScope.amount)*0.17).toFixed(2);/*sk 08/10 change vat*/
					//$rootScope.amount_out=(parseFloat($rootScope.amount)*0.83).toFixed(2);/*sk 08/10 change vat*/
		              $rootScope.amount_maam = (($rootScope.amount * 17)/117).toFixed(2);
		              $rootScope.amount_out= ($rootScope.amount-$rootScope.amount_maam).toFixed(2);
					$rootScope.original_afterprod=$scope.getTotal();	
					
					$('.input_result input[name=Input]').val('');
				    local.setLocal('products',cash_prd.products);
				   }
	    		}
	    		
	    	}  
	    	else{
	    		$('.input_result input[name=Input]').val('');
	    	} 			
	    	$scope.$apply();
	    	var elem = document.getElementById('cat2');
  			elem.scrollTop = elem.scrollHeight;
		};
		this.add_general_weight_cart = function(){ 
	    	
	    	
	    	if($('.input_result input[name=Input]').val()!=''&&$('.input_result input[name=Input]').val()!='undefined'){
	    		if($(".add_worker.popup_pay  ").css("display")=="block"||$(".pop_anacha ").css("display")=="block"||$(".pop_tip ").css("display")=="block"){
	    			//$(".mezuman_sum").val($('.input_result input[name=Input]').val())
	    		}
	    		else{
	    			$rootScope.countprod++;
	    			$('.input_result input[name=Input]').val(eval($('.input_result input[name=Input]').val()));
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
						var price=(parseFloat($('.input_result input[name=Input]').val())*-1).toFixed(2);
						$('.zicuy').toggleClass("zicuy_zctive");
						//$rootScope.refund=0;
					}
					else{
						var price=parseFloat($('.input_result input[name=Input]').val()).toFixed(2);
					}
					
					var amount = 1;
					
						if(typeof window.external != 'undefined' && typeof window.external.getWeight != 'undefined'){
						   amount= window.external.getWeight();
						}
						 else{
						 	
						 	amount =0;
						 }
					
					
					writelog("הוספת פריט כללי בסכום: "+price);
					$rootScope.index++;
			   		var x={
			   			"Amount": amount,
						"ID":"0",
						"Title":"פריט כללי",
						"BarCode":"newid_"+$rootScope.new_id,
						"SalePrice":price,						
						"Discount":0,
						"Discount2":0,
						"comment":'',	   			
						"commentClass":'',			   			
			   			"comptype":"2",
			   			"department":"-1",
			   			"finalamount":'',			   			
			   			"cdisctype":0,
			   			"refund":$rootScope.refund,
			   			"index":$rootScope.index,
			   			"Unit": 2,
			   			"discount_sale":0
			   		};
			   		
			   		$rootScope.refund=0;
					cash_prd.products.push(x);
					$rootScope.amount=(parseFloat($rootScope.before_global_dis)+parseFloat(price)*amount).toFixed(2);
					if($rootScope.isMoadon){
						$rootScope.amount=($rootScope.amount*$rootScope.global_dis).toFixed(2);
						
					}
					$rootScope.before_global_dis=(parseFloat($rootScope.before_global_dis)+parseFloat(price)*amount).toFixed(2);
					//$rootScope.original=$rootScope.amount;
					//$rootScope.amount_maam=(parseFloat($rootScope.amount)*0.17).toFixed(2);/*sk 08/10 change vat*/
					//$rootScope.amount_out=(parseFloat($rootScope.amount)*0.83).toFixed(2);/*sk 08/10 change vat*/
		              $rootScope.amount_maam = (($rootScope.amount * 17)/117).toFixed(2);
		              $rootScope.amount_out= ($rootScope.amount-$rootScope.amount_maam).toFixed(2);
					$rootScope.original_afterprod=$scope.getTotal();	
					
					$('.input_result input[name=Input]').val('');
				    local.setLocal('products',cash_prd.products);
	    		}
	    		
	    	}  
	    	else{
	    		$('.input_result input[name=Input]').val('');
	    	} 			
	    	$scope.$apply();
	    	var elem = document.getElementById('cat2');
  			elem.scrollTop = elem.scrollHeight;
		};
		 this.minus_count= function(sum,index,refund){			
			cash_prd.products.filter(function( obj ) {
					if(obj.index === index&&(obj.Amount>1||$rootScope.refund==1)){
						if(refund==1&&obj.SalePrice<0){
							$rootScope.numprod_zchut--;	
					   		$rootScope.numprod_zchut_cash--;	
							$rootScope.countprod--;	
							$rootScope.amount=(parseFloat($rootScope.before_global_dis)-parseFloat(sum)).toFixed(2);
							if($rootScope.isMoadon){
								$rootScope.amount=($rootScope.amount*$rootScope.global_dis).toFixed(2);
								
							}
							$rootScope.before_global_dis=(parseFloat($rootScope.before_global_dis)-parseFloat(sum)).toFixed(2);
							//$rootScope.original=$rootScope.amount;
						//$rootScope.amount_maam=(parseFloat($rootScope.amount)*0.17).toFixed(2);/*sk 08/10 change vat*/
						//$rootScope.amount_out=(parseFloat($rootScope.amount)*0.83).toFixed(2);/*sk 08/10 change vat*/
			              $rootScope.amount_maam = (($rootScope.amount * 17)/117).toFixed(2);
			              $rootScope.amount_out= ($rootScope.amount-$rootScope.amount_maam).toFixed(2);
							$rootScope.original_afterprod=$scope.getTotal();	
							obj['Amount']-=1;
						}
						else if(refund!=1&&obj.SalePrice>0){
							$rootScope.numprod_hova--;	
					   		$rootScope.numprod_hova_cash--;	
							$rootScope.countprod--;	
							$rootScope.amount=(parseFloat($rootScope.before_global_dis)-parseFloat(sum)).toFixed(2);
							if($rootScope.isMoadon){
								$rootScope.amount=($rootScope.amount*$rootScope.global_dis).toFixed(2);
								
							}
							$rootScope.before_global_dis=(parseFloat($rootScope.before_global_dis)-parseFloat(sum)).toFixed(2);
							//$rootScope.original=$rootScope.amount;
								//$rootScope.amount_maam=(parseFloat($rootScope.amount)*0.17).toFixed(2);/*sk 08/10 change vat*/
								//$rootScope.amount_out=(parseFloat($rootScope.amount)*0.83).toFixed(2);/*sk 08/10 change vat*/
					              $rootScope.amount_maam = (($rootScope.amount * 17)/117).toFixed(2);
					              $rootScope.amount_out= ($rootScope.amount-$rootScope.amount_maam).toFixed(2);
							$rootScope.original_afterprod=$scope.getTotal();	
							obj['Amount']-=1;
							
						}
							
					}					

				});
			$rootScope.original_afterprod=$scope.getTotal();
			local.setLocal('products',cash_prd.products);
		};
		this.plus_count= function(sum,index,refund){	/*sk 30/11 fix bug in plus and count whith discount*/	
			//$rootScope.countprod++;		
			var flag=true;
			cash_prd.products.filter(function( obj ) {
					if(obj.index === index&&flag){
						/*cash_prd.add_cart(obj);
						flag=false;
						return;*/
						//meantime
						$rootScope.countprod++;
						if(refund==1&&obj.SalePrice<0){
							$rootScope.numprod_zchut++;	
					   		$rootScope.numprod_zchut_cash++;
					   		if(obj.cdisctype==1){
								//discount2=parseFloat(obj.SalePrice)*(parseFloat(obj.discountperc)/100);
								discount2=(parseFloat(obj.discountperc));/*sk 26/11 fix bug in calc anacha*/
								sum+=parseFloat(discount2);
								obj.discountamount=parseFloat(obj.discountamount)-discount2;
								obj.Discount=parseFloat(obj.Discount)-discount2;
								obj.Discount2=parseFloat(obj.Discount2)-discount2;
							}	
							$rootScope.amount=(parseFloat($rootScope.before_global_dis)+parseFloat(sum)).toFixed(2);
							$rootScope.before_global_dis=(parseFloat($rootScope.before_global_dis)+parseFloat(sum)).toFixed(2);/*sk 11/10 add count of zicuy ptroduct*/
							if($rootScope.isMoadon){
								$rootScope.amount=($rootScope.amount*$rootScope.global_dis).toFixed(2);1
								
							}
							
							/*$rootScope.amount=(parseFloat($rootScope.amount)+parseFloat(sum)).toFixed(2);
							
							if($rootScope.isMoadon){
								$rootScope.amount=($rootScope.amount*$rootScope.global_dis).toFixed(2);
								
							}*/
							
							//$rootScope.amount=(parseFloat($rootScope.amount)+parseFloat(sum)).toFixed(2);
								
							
							
							//$rootScope.original=$rootScope.amount;
						//$rootScope.amount_maam=(parseFloat($rootScope.amount)*0.17).toFixed(2);/*sk 08/10 change vat*/
						//$rootScope.amount_out=(parseFloat($rootScope.amount)*0.83).toFixed(2);/*sk 08/10 change vat*/
			              $rootScope.amount_maam = (($rootScope.amount * 17)/117).toFixed(2);
			              $rootScope.amount_out= ($rootScope.amount-$rootScope.amount_maam).toFixed(2);
							$rootScope.original_afterprod=$scope.getTotal();	
							obj['Amount']+=1;
						}
						else if(refund!=1&&obj.SalePrice>0){
							$rootScope.numprod_hova++;	
					   		$rootScope.numprod_hova_cash++;	
							//obj.Discount סכום ההנחה בשקלים לכל מוצר
							//obj.Discount2 סכום ההנחה באחוזים לכל מוצר  
							if(obj.cdisctype==1){
								//obj.Discount=parseFloat(obj.Discount)+parseFloat(obj.discountperc);
								//discount2=parseFloat(obj.SalePrice)*(parseFloat(obj.discountperc)/100);
								//discount2=(parseFloat(obj.discountperc));/*sk 26/11 fix bug in calc anacha*/
								//sum-=parseFloat(discount2);
								//obj.discountamount=parseFloat(obj.discountamount)+discount2;
								//obj.Discount=parseFloat(obj.Discount)+discount2;
								//obj.Discount2=parseFloat(obj.Discount2)+discount2;
							}
							$rootScope.amount=(parseFloat($rootScope.before_global_dis)+parseFloat(sum)).toFixed(2);
							if($rootScope.isMoadon){
								$rootScope.amount=($rootScope.amount*$rootScope.global_dis).toFixed(2);
								
							}
							$rootScope.before_global_dis=(parseFloat($rootScope.before_global_dis)+parseFloat(sum)).toFixed(2);
							//$rootScope.original=$rootScope.amount;
							//$rootScope.amount_maam=(parseFloat($rootScope.amount)*0.17).toFixed(2);/*sk 08/10 change vat*/
							//$rootScope.amount_out=(parseFloat($rootScope.amount)*0.83).toFixed(2);/*sk 08/10 change vat*/
				              $rootScope.amount_maam = (($rootScope.amount * 17)/117).toFixed(2);
				              $rootScope.amount_out= ($rootScope.amount-$rootScope.amount_maam).toFixed(2);
				              obj['Amount']+=1;
							$rootScope.original_afterprod=$scope.getTotal();	
							
						}
						local.setLocal('products',cash_prd.products);
						//$rootScope.check_discount(obj);
						
					}						

				});
				//meantime
			//$rootScope.original_afterprod=$scope.getTotal();
			//local.setLocal('products',cash_prd.products);
			$rootScope.check_discounts();
		};
/*sk 11/10 change this function and i put the source in remark*/
		/*this.plus_count= function(sum,BarCode,refund){		
			//$rootScope.countprod++;		
			var flag=true;
			cash_prd.products.filter(function( obj ) {
					if(obj.BarCode === BarCode&&flag){
						cash_prd.add_cart(obj);
						flag=false;
						return;
						//meantime
						/*if(refund==1&&obj.SalePrice<0){
							$rootScope.numprod_zchut++;	
					   		$rootScope.numprod_zchut_cash++;	
							$rootScope.amount=(parseFloat($rootScope.before_global_dis)+parseFloat(sum)).toFixed(2);
							if($rootScope.isMoadon){
								$rootScope.amount=($rootScope.amount*$rootScope.global_dis).toFixed(2);
								
							}
							
							//$rootScope.original=$rootScope.amount;
							$rootScope.amount_maam=($rootScope.amount*0.18).toFixed(2);
							$rootScope.amount_out=($rootScope.amount*0.82).toFixed(2);
							$rootScope.original_afterprod=$scope.getTotal();	
							obj['Amount']+=1;
						}
						else if(refund!=1&&obj.SalePrice>0){
							$rootScope.numprod_hova++;	
					   		$rootScope.numprod_hova_cash++;	
							$rootScope.amount=(parseFloat($rootScope.before_global_dis)+parseFloat(sum)).toFixed(2);
							if($rootScope.isMoadon){
								$rootScope.amount=($rootScope.amount*$rootScope.global_dis).toFixed(2);
								
							}
							$rootScope.before_global_dis=(parseFloat($rootScope.before_global_dis)+parseFloat(sum)).toFixed(2);
							//$rootScope.original=$rootScope.amount;
							$rootScope.amount_maam=($rootScope.amount*0.18).toFixed(2);
							$rootScope.amount_out=($rootScope.amount*0.82).toFixed(2);
							$rootScope.original_afterprod=$scope.getTotal();	
							obj['Amount']+=1;
						}*/
						
					/*}						

				});
				//meantime
			//$rootScope.original_afterprod=$scope.getTotal();
			//local.setLocal('products',cash_prd.products);
			
		};*/
		this.remove_cart = function(id,SalePrice,index){		
			writelog("מחיקת פריט מהחשבון בסכום: "+SalePrice);	//lc 21/06/2016 add write to log		
			var y=0;
				cash_prd.products.filter(function( obj,i ) {
					if(obj.index === index){
						//obj=cash_prd.products[index];
						if(obj.refund==1&&SalePrice<0){
							$rootScope.numprod_zchut-=obj['Amount'];	
					   		$rootScope.numprod_zchut_cash-=obj['Amount'];	
							$rootScope.amount=parseFloat($rootScope.before_global_dis-((obj['SalePrice']-obj['Discount'])*obj['Amount'])).toFixed(2);
							if($rootScope.isMoadon){
								$rootScope.amount=($rootScope.amount*$rootScope.global_dis).toFixed(2);
								
							}
							$rootScope.before_global_dis=parseFloat($rootScope.before_global_dis-((obj['SalePrice']-obj['Discount'])*obj['Amount'])).toFixed(2);
							$rootScope.countprod-=obj['Amount'];
							y=i;
							return;
						}
						else if(obj.refund==0&&SalePrice>0){
							$rootScope.numprod_hova-=obj['Amount'];	
					   		$rootScope.numprod_hova_cash-=obj['Amount'];	
							$rootScope.amount=parseFloat($rootScope.before_global_dis-((obj['SalePrice']-obj['Discount'])*obj['Amount']) + obj['discount_sale']).toFixed(2);
							$rootScope.discount_sale -= obj['discount_sale'];
							if($rootScope.isMoadon){
								$rootScope.amount=($rootScope.amount*$rootScope.global_dis).toFixed(2);
								
							}
							$rootScope.before_global_dis=parseFloat($rootScope.before_global_dis-((obj['SalePrice']-obj['Discount'])*obj['Amount']) + obj['discount_sale']).toFixed(2);
							$rootScope.countprod-=obj['Amount'];
							y=i;
							return;
						}
						
					}	
				    return obj.BarCode !== id;
				});
				
				
			//$rootScope.amount_maam=(parseFloat($rootScope.amount)*0.17).toFixed(2);/*sk 08/10 change vat*/
			//$rootScope.amount_out=(parseFloat($rootScope.amount)*0.83).toFixed(2);/*sk 08/10 change vat*/
			
              $rootScope.amount_maam = (($rootScope.amount * 17)/117).toFixed(2);
              $rootScope.amount_out= ($rootScope.amount-$rootScope.amount_maam).toFixed(2);
				$rootScope.original_afterprod=($rootScope.original_afterprod-((cash_prd.products[y]['SalePrice']-cash_prd.products[y]['Discount'])*cash_prd.products[y]['Amount'])).toFixed(2);	
					delete cash_prd.products[y];
					cash_prd.products.splice(y,1);
				if(cash_prd.products.length==0){
					$rootScope.amount=0;
					$rootScope.before_global_dis=0;
					$rootScope.amount_maam=0;
					$rootScope.amount_out=0;
				}
				local.setLocal('products',cash_prd.products);
				$rootScope.check_discounts();
				
		};
	
		$scope.isdiscount = function(discount){
			if(discount!=""&&discount!=0){
				return 'discount_icon';
			}
			return '';
		};
		$scope.isgroup = function(){
			if($rootScope.before_global_dis==$rootScope.amount){
				return false;
			}
			return true;
		};
		$scope.isdiscount2 = function(discount){
			if(discount!=""){
				return "1";
			}
			return "0";
		};
		$scope.$watch('amount', function() {

				var total = 0;
			    for(var i = 0; i < cash_prd.products.length; i++){
			        var product = cash_prd.products[i];
			        total += product.SalePrice*product.Amount;
			    }
			    $rootScope.original=total;

		    	

	   });
		
	 }]);
	    


})();







