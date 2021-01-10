(function() {
var app = angular.module('ClientM', []);
app.controller('Client', ['$scope', '$http','$rootScope','GetURLParameter','local','alert','openwindows',
function MainController($scope, $http,$rootScope,GetURLParameter,local,alert,openwindows) {

  	//init variables
	  	$rootScope.clientgroups={};
	  	$rootScope.SearchClient=[];
	  	$scope.CurrClient=[];
	  	$scope.id=1;
	  	$scope.a_c_hakafa='off';

	  	//init clients
	  	/*$http.post('get_data.php',  $.param({stat2: "client",stock:GetURLParameter.GetURLParameter('stock')}), {
	        	headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
	   		 }).success(function(data){
			   	var start = data.indexOf("jsonclient:");
			   	var end = data.indexOf(":jsonclient");
			   	var len="jsonclient".length+1;
			   	str=data.substr(start+len,end-start-len);
			   	str= str.replace("$","");
				$rootScope.clients= JSON.parse(str);
				//$rootScope.search_cc=$rootScope.clients;
		 });*/
		$rootScope.clients={};

	  	//init groups
	  	$http.post('get_data.php',  $.param({stat2: "clientgroup",stock:GetURLParameter.GetURLParameter('stock')}), {
	        	headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
	   		 }).success(function(data){
			   	var start = data.indexOf("jsonclientgroup:");
			   	var end = data.indexOf(":jsonclientgroup");
			   	var len="jsonclientgroup".length+1;
			   	str=data.substr(start+len,end-start-len);
			   	str= str.replace("$","");
				$rootScope.clientgroups= JSON.parse(str);
				 var x={ID: "-1",
					GroupName: "קבוצות",
					Percent:"0"};
			    $rootScope.clientgroups.unshift(x);
			    $scope.c_GroupId= $rootScope.clientgroups[0];
			    if($rootScope.prefers_list['pr_group']!=-1){
			    	$scope.pr_group= $rootScope.clientgroups[$rootScope.prefers_list['pr_group']];
			    	$rootScope.pr_discount= $rootScope.clientgroups[$rootScope.prefers_list['pr_group']].Percent;
			    }

		});
	//end init variables

	//change group
	$scope.change_group=function (group) {
		if(group.ID==-1){
			$rootScope.pr_discount=0;
		}
		else{
			$rootScope.pr_discount= $rootScope.clientgroups[group.ID].Percent;
		}
	}

	//save client
	$scope.save_client = function() {
    	$scope.err='';
    	if($("#a_c_num").val()==""){
    		$scope.err+="מספר לקוח שדה חובה</br>";
    	}
    	if($("#a_c_name").val()==""){
    		$scope.err+="שם משפחה שדה חובה</br>";
    	}
    	if($("#a_c_tz").val()==""){
    		$scope.err+="ע.מ/ת.ז שדה חובה</br>";
    	}
    	if($("#a_c_cellphone").val()==""){
    		$scope.err+="טלפון נייד שדה חובה</br>";
    	}
    	else if(!$.isNumeric($("#a_c_cellphone").val())){
    		$scope.err+="טלפון נייד בלתי חוקי</br>";
    	}
    	else if($("#a_c_cellphone").val().length<8||$("#a_c_cellphone").val().length>10){
    		$scope.err+="במספר טלפון 9 או 10 ספרות</br>";
    	}
    	if($scope.err!=""){
    		alert.alert_site($scope.err,1,1);
      		return false;
    	}
    	else{
    		if($("#a_c_obligo").val()==""){
    			var obligo=0;
    		}
    		else{
    			var obligo=$("#a_c_obligo").val();
    		}
    		var x={
    			Address:  $("#a_c_address").val(),
				CellPhone: $("#a_c_cellphone").val(),
				ClientNum: $("#a_c_num").val(),
				CreditBalance: obligo,
				Hakafa:0,
				HomePhone:  $("#a_c_phone").val(),
				Hov: "0",
				ID: "new"+$scope.id,
				SupplierName:  $("#a_c_name").val(),
				Zikui: "0.00",
				client: $("#a_c_group").val(),
				id: "",
				sortorder: "",
				value: "",
    		};
    		$scope.id++;

    		$http.post('inc/functions.php',  $.param({cust: "add",a_c_num: $("#a_c_num").val(),a_c_address:$("#a_c_address").val(),a_c_name:$("#a_c_name").val(),a_c_tz:$("#a_c_tz").val()
    		,a_c_birthdate:$("#a_c_birthdate").val(),a_c_phone:$("#a_c_phone").val(),a_c_cellphone:$("#a_c_cellphone").val(),a_c_mail:$("#a_c_mail").val()
    		,a_c_group:$("#a_c_group").val() ,a_c_discount:$("#a_c_discount").val() ,a_c_hakafa:$("#a_c_hakafa").val(),a_c_obligo:$("#a_c_obligo").val(),pr_currnumcust:$rootScope.prefers_list.pr_currnumcust }), {
	        	headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
	   		 }).success(function(data){
	   		 	if(data==1||data==0){
	   		 		alert.alert_site('שם משתמש עם פרטים זהים קיים ',1,1);
	   		 		$(".pop_add_client input[type=tel],.pop_add_client input[type=date],.pop_add_client input[type=text]:not(.fixed)").val("");
					$scope.pr_group= $rootScope.clientgroups[$rootScope.prefers_list['pr_group']];
			   		$rootScope.pr_discount= $rootScope.clientgroups[$rootScope.prefers_list['pr_group']].Percent;
	   		 	}
	   		 	else{
	   		 		$rootScope.prefers_list.pr_currnumcust++;

					$("#a_c_num").val($rootScope.prefers_list.pr_currnumcust);
	   		 		$(".wrap").click();
	   		 		alert.alert_site('לקוח/ה נשמר/ה',1,1);
					if($rootScope.clients==undefined){
						$rootScope.clients={};
					}
					$(".pop_add_client input[type=tel],.pop_add_client input[type=date],.pop_add_client input[type=text]:not(.fixed)").val("");
					$scope.pr_group= $rootScope.clientgroups[$rootScope.prefers_list['pr_group']];
			   		$rootScope.pr_discount= $rootScope.clientgroups[$rootScope.prefers_list['pr_group']].Percent;
					$rootScope.clients.push(x);
	   		 	}
		  	});
    	}
    };

	//set stat on-off
    $scope.set_stat = function(selector) {
		$scope.a_c_hakafa=$scope.a_c_hakafa=='on'?'off':'on';
		$("."+selector+'.off').animate({
				'right': '53%'
			}, function() {
		  });
		$("."+selector+'.on').animate({
				'right': '0'
			}, function() {
		  });
    };

	$scope.itra1=function(obligo,balance){
			if(obligo==''){
				obligo=0;
			}
			if(balance==''){
				balance=0;
			}
	    	return parseFloat(obligo)+parseFloat(balance);
	};

	//search
		//search client
		$scope.search_c = function(sel){
		  		if(online=='on'){
		  			$scope.s=$(sel).val();
					$http.post('inc/functions.php',  $.param({search_c1: $scope.s,table:'listingsSuppliers'}), {
			        	headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
			   		 }).success(function(data){
					      $rootScope.search_cc ={};
					   	 $rootScope.search_cc= data;
				  	});
		  		}
		  		else{
		  			$scope.flag_p=[];
		  			$scope.s=$("#cust_search_value").val();
		  			$rootScope.search_prd_off={};
		  			prd.products.filter(function( obj ) {
						if(obj.Title.indexOf($scope.s) >-1){
							$scope.flag_p.push(obj);
						}

					});
					$rootScope.search_prd_off=$scope.flag_p;
		  		}
				$(".exitclient,.akafa_client_tb1").show();
		 };

		 //search client for debt
		 $scope.search_c2 = function(sel){
		  		if(online=='on'){
		  			$scope.s=$(sel).val();
					$http.post('inc/functions.php',  $.param({search_c1: $scope.s,table:'listingsSuppliers'}), {
			        	headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
			   		 }).success(function(data){
					      $rootScope.search_cc2 ={};
					   	 $rootScope.search_cc2= data;
				  	});
		  		}
		  		else{
		  			$scope.flag_p=[];
		  			$scope.s=$("#cust_search_value").val();
		  			$rootScope.search_prd_off={};
		  			prd.products.filter(function( obj ) {
						if(obj.Title.indexOf($scope.s) >-1){
							$scope.flag_p.push(obj);
						}

					});
					$rootScope.search_prd_off=$scope.flag_p;
		  		}
				$(".exitclient,.akafa_client_tb1").show();
		};

		//advanced search
		$scope.advanced_search_cust = function  () {
		 		$scope.BusinessNum=$("#advanced_c_BusinessNum").val();
		    	$scope.CellPhone=$("#advanced_c_CellPhone").val();
		    	$scope.Address=$("#advanced_c_Address").val();
		    	$scope.ClientNum=$("#advanced_c_ClientNum").val();
				$scope.SupplierName=$("#advanced_c_SupplierName").val();
				$scope.GroupId=$("#advanced_c_GroupId").val();
		  		if(online=='on'){
					$http.post('inc/functions.php',  $.param({advanced_search_c: 1,SalePrice:$scope.SalePrice,CellPhone:$scope.CellPhone,Address:$scope.Address,ClientNum:$scope.ClientNum,SupplierName:$scope.SupplierName,GroupId:$scope.GroupId,BusinessNum:$scope.BusinessNum}), {
			        	headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
			   		 }).success(function(data){
					    $rootScope.search_cc ={};
					    $rootScope.search_cc= data;
					    $(".toclean").val('');
						$("select").val('-1');
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
					$(".toclean").val('');
					$("select").val('-1');
		  		}
		};

		//choose client from search
		$scope.choose_client = function(cust) {
		writelog("הוספת לקוח: "+ cust["ClientNum"]+" "+cust['SupplierName'])
			$rootScope.search_cc ={};
			$rootScope.search_cc[0]= cust;
			$rootScope.SearchClientlast=$rootScope.SearchClient;
			$rootScope.SearchClient =cust;
			$(".leftside .find_cust_container ").show();
			$('input[name="chequebanknumber"]').val($rootScope.SearchClient.BankNo);
			$('input[name="chequebranch"]').val($rootScope.SearchClient.BankDeptNo);
			$('input[name="chequeaccountnumber"]').val($rootScope.SearchClient.BankCntNo);
			/*if($rootScope.SearchClient.groupId!=0){
				$rootScope.SearchClient[group_p]=$scope.clientgroups[0];
			}*/
			if($rootScope.isMoadon){
				if($rootScope.SearchClient.GroupId!=0){
					if($rootScope.SearchClient.ID!=$rootScope.SearchClientlast.ID||1==1){
						if(typeof $scope.clientgroups[parseInt($rootScope.SearchClient.GroupId)] != 'undefined'){
							$rootScope.SearchClient['group_p']=$scope.clientgroups[parseInt($rootScope.SearchClient.GroupId)].Percent;
							$rootScope.SearchClient['group_name']=$scope.clientgroups[parseInt($rootScope.SearchClient.GroupId)].GroupName;
						}
						else{
							$rootScope.SearchClient['group_p']=0;
							$rootScope.SearchClient['group_name']= '';
						}
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
				              $rootScope.amount_maam = (($rootScope.amount * 17)/117).toFixed(2);
				              $rootScope.amount_out= ($rootScope.amount-$rootScope.amount_maam).toFixed(2);
							$(".discount_group,.discount_group p").show();
							$rootScope.isMoadon=true;

							$rootScope.itra=$rootScope.amount-$rootScope.paid;

							$(".input_sum,.span_itra").val($rootScope.itra);
							//if($rootScope.itra<0)
					}
				}
				else{
					$rootScope.amount=$rootScope.before_global_dis;
					$(".discount_group").hide();
				}
			}
	    }

	    //choose client from search for debt
	 	 $scope.choose_client2 = function(cust) {
			$rootScope.search_cc2 ={};
			$rootScope.search_cc2[0]= cust;
			$rootScope.SearchClientlast=$rootScope.SearchClient;
			$rootScope.SearchClient =cust;
			$(".debt .find_cust_container ").show();
			$('input[name="chequebanknumber"]').val($rootScope.SearchClient.BankNo);
			$('input[name="chequebranch"]').val($rootScope.SearchClient.BankDeptNo);
			$('input[name="chequeaccountnumber"]').val($rootScope.SearchClient.BankCntNo);
	    };

	    //probably not in use

			//search autocomplete
			$scope.get_length=function (myarray) {
					var len=0;
			  		angular.forEach(myarray, function(index) {
					  len++
					});
			  		return len;
			};

		  	$scope.exitClient = function() {
		      if($scope.get_length($rootScope.search_cc)==1){
		      	$rootScope.SearchClient=$rootScope.search_cc[0];
		      	return true;
		      }
		      return false;
		    };

		    $scope.remoteUrlRequestFn = function(str) {
		      return {q: str};
		    };

		    $scope.selectedClient = function(selected) {
		      $scope.search_cust_sbm(selected.originalObject['ID']);
		      $scope.search_cust();
		    };

		    $scope.inputChanged = function(str) {
		      $scope.console10 = str;
		    }

		    $scope.focusState = 'None';

		    $scope.focusIn = function() {
		      var focusInputElem = document.getElementById('ex12_value');
		      $scope.focusState = 'In';
		      focusInputElem.classList.remove('small-input');
		    }

		    $scope.focusOut = function() {
		     // $scope.focusState = 'Out';
		    //  focusInputElem.classList.add('small-input');
		      focusInputElem.val('');
		    }

		    $scope.disableInput = true;

		     $scope.search_cust_sbm = function (id){
		    	 $rootScope.clients.filter(function( obj ) {
							if(obj.ID === id){
						    	$rootScope.SearchClient = obj;
						    	$scope.CurrClient = obj;
							}
						});
				$scope.hov=$rootScope.SearchClient.CreditBalance;
				//$scope.hov=parseInt($rootScope.SearchClient.Hov)-(parseInt($rootScope.SearchClient.Zikui)+parseInt($rootScope.SearchClient.Hakafa));
				if($scope.hov<=0){
					$(".find_cust_container .fa-info-circle").css('color','#76BE33');
				}
				else{
					$(".find_cust_container .fa-info-circle").css('color','#e65844');
				}
				if($scope.hov!=''&&$rootScope.SearchClient.Obligo!=""){
					$(".yitrat_hov").text(parseInt($rootScope.SearchClient.Obligo)- parseInt($scope.hov));
				}
				else{
					$(".yitrat_hov").text(0);
				}
				$(".find_cust_container").css('display','inline-block');
				$(".cust_search .workers_tb").show();
			}
		    //end search autocomplete

		    $scope.search_c = function(){
			  		if(online=='on'){
			  			// $rootScope.search_cc ={};
			  			// $scope.$apply();
			  			$scope.s=$(".leftside .search_form .cust_search_value").val();
						$http.post('inc/functions.php',  $.param({search_c1: $scope.s,table:'listingsSuppliers'}), {
				        	headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
				   		 }).success(function(data){
						   //   $rootScope.search_cc ={};
						   	 $rootScope.search_cc= data;
						   	 $scope.$apply();
					  	});
			  		}
			  		else{
			  			$scope.flag_p=[];
			  			$scope.s=$("#cust_search_value").val();
			  			$rootScope.search_prd_off={};
			  			prd.products.filter(function( obj ) {
							if(obj.Title.indexOf($scope.s) >-1){
								$scope.flag_p.push(obj);
							}

						});
						$rootScope.search_prd_off=$scope.flag_p;
			  		}
					$(".exitclient,.akafa_client_tb1").show();
			};

			$scope.search_cust = function () {
			   if(online=='on'){
			  			$scope.s=$("#search_prod2").val();
						$http.post('inc/functions.php',  $.param({prod_search: $scope.s}), {
				        	headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
				   		 }).success(function(data){
						    $rootScope.search_prd ={};
						    $rootScope.search_prd= data;
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
						$rootScope.search_prd_off=$scope.flag_p;
			  		}
			 };
		//end probably not in use
	//end search
}

]);
})();

