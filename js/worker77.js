(function() {
  var app = angular.module('WorkerM', []);

 app.controller('WorkerController', ['$http','local','cash_global','GetURLParameter','$scope','$rootScope','openwindows','alert', function($http,local,cash_global,GetURLParameter,$scope,$rootScope,openwindows,alert){
 	
 	//init variables
 	var wrk=this;
    wrk.workerslist = [];
	wrk.curr_wrk=cash_global.worker;
    $rootScope.searchw=[];
    $rootScope.SearchWorker=[];
    /*sk 03/01/16 */
//מתזמן שבודק אם העבירו כטיםס או הזינו ידנית מספר עובד בשעון נוכחות
		setInterval(function () {
	
			var num_worker_input=$('#num_worker3').val();//מספר עובד שהעביר כרטיס
			if(num_worker_input != ""){
				writelog("מספר עובד1: "+ num_worker_input);
			}
			
			if(num_worker_input){
				var num_worker_whithout_space= num_worker_input.replace(/\s/g, '');
			}
			if(num_worker_input != ""){
				writelog(num_worker_whithout_space);
			}
			if(num_worker_input!==''){
				$('#num_worker3').val('');
				$scope.choose_worker(num_worker_whithout_space);
			}
			
		}, 1000);
   
		$scope.start_work = function(){
		if($rootScope.SearchWorker.is_clock && $rootScope.details_list.show_days_report==0){/*sk 02/02/16 not allow to do enter if the worker is already enter*/
			$("div[name=clock_display2]").html("<h2 class='big_text'>כבר בוצעה כניסה</h2>");
					$("div[name=clock_display2]").css({'display':'block'});
					$("div[name=clock_display]").css({'display':'none'});	
					$("#worker_details").html('');
					setTimeout(function () {
						$("div[name=clock_display2]").html("");
				      $(".wrap").click();	
				    }, 3000);	
				  
			}
		if($rootScope.SearchWorker.length!=0&&$rootScope.SearchWorker!=undefined  ){	
			
			var n=$("#num_worker:hidden").val();
			
			if(n==""){
				n=$("#num_worker2").val();
				is_worker_id=1;
				if(n.indexOf(";")>-1 &&n.indexOf("?")>n.indexOf(";")){
					n = n.substr(n.indexOf(';')+1, n.indexOf('?')-n.indexOf(';')-1);
				}
				//n=n.substring(7, 10);		
			}
			$("#num_worker:hidden").val("");
			
			stock_name=$('#stock_name').text();
			writelog("כניסת עובד: "+ n);
			show_days_report=$rootScope.details_list.show_days_report;
			$http.post('inc/functions.php',  $.param({id_worker: n,stat:"start",stock:stock,show_days_report:show_days_report}, {async: true}), {
	        	headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
	   		 }).success(function(data){
					$("div[name=clock_display2]").html("<h2 class='big_text'>כניסה בוצעה בהצלחה<br>עבודה נעימה!</h2>");
					$("div[name=clock_display2]").css({'display':'block'});
					$("div[name=clock_display]").css({'display':'none'});
	
					$rootScope.workerslist.filter(function( obj ) {
						if(obj.ID === n){
							obj.is_clock=1;
							worker_name1=obj.SupplierName;
							worker_num1=obj.WorkerNum;
						}						
					});	
					if($rootScope.details_list.print_setting){	
		  				var b = [];		 
						b[0]= $rootScope.txtCenter('ביצוע כניסה', 1);
						b[1]= $rootScope.txtCenter("שם עובד: "+ worker_name1, 1);		
					  	b[2]= $rootScope.txtCenter("עובד מס': "+ worker_num1, 1);
					    b[3]= $rootScope.txtCenter("תאריך: "+ $('#current_date').html(), 1);
					    b[4]= $rootScope.txtCenter("שעה: "+ $('#curr_date').html(), 1);
					    b[5]= $rootScope.txtCenter("עבודה נעימה!!!", 1);
							console.log('printPrinter 1');
					    printPrinter(b);
		  	        }
					setTimeout(function () {
					  $("div[name=clock_display2]").html("");
				      $(".wrap").click();	
				    }, 3000);	
				    $rootScope.searchw ={};
					$rootScope.SearchWorker=[];					
					$("input[name=search_w]").val('');
					$("#worker_details").html('');
					localStorage.setItem('workerslist',JSON.stringify($rootScope.workerslist));
			        }).error(function(){
			        	$("div[name=clock_display2]").html("<h2 class='big_text'>כניסה בוצעה בהצלחה<br>עבודה נעימה!!!!</h2>");
					    $("div[name=clock_display2]").css({'display':'block'});
					    $("div[name=clock_display]").css({'display':'none'});
						hhhhh=1;
						$rootScope.workerslist.filter(function( obj ) {
						if(obj.ID === n){
							obj.is_clock=1;
							worker_name1=obj.SupplierName;
							worker_num1=obj.WorkerNum;
						}						
					});	
					if($rootScope.details_list.print_setting){	
						var b = [];		 
						b[0]= $rootScope.txtCenter('ביצוע כניסה', 1);
						b[1]= $rootScope.txtCenter("שם עובד: "+ worker_name1, 1);		
					  	b[2]= $rootScope.txtCenter("עובד מס': "+ worker_num1, 1);
					    b[3]= $rootScope.txtCenter("תאריך: "+ $('#current_date').html(), 1);
					    b[4]= $rootScope.txtCenter("שעה: "+ $('#curr_date').html(), 1);
					    b[5]= $rootScope.txtCenter("עבודה נעימה!!!", 1);
							console.log('printPrinter 2');
					    printPrinter(b);
					   }
					localStorage.setItem('workerslist',JSON.stringify($rootScope.workerslist));
						state='start';
						time_s=$('#curr_date').html();
						date_s=$('#current_date').html();
						id_worker=n;
						
						//$rootScope.offline_workers[n+'_'+date_s+'_'+time_s]=worker_array;
						$rootScope.offline_workers[parseInt($rootScope.index_offline)]={};
						$rootScope.offline_workers[parseInt($rootScope.index_offline)]['state']=state;
						$rootScope.offline_workers[parseInt($rootScope.index_offline)]['time_s']=time_s;
						$rootScope.offline_workers[parseInt($rootScope.index_offline)]['date_s']=date_s;
						$rootScope.offline_workers[parseInt($rootScope.index_offline)]['id_worker']=id_worker;
						
				
						$rootScope.index_offline=$rootScope.index_offline+1;	
						
							setTimeout(function () {
					  $("div[name=clock_display2]").html("");
				      $(".wrap").click();	
				    }, 3000);
											
					});		
		}	
			
	};
	
	$scope.end_work = function(){
		console.log('$scope.end_work function start');
		if($rootScope.SearchWorker.is_clock==0){/*sk 02/02/16 not allow to do exit whith no enter*/
			$("div[name=clock_display2]").html("<h2 class='big_text'>לא בוצעה כניסה</h2>");
					$("div[name=clock_display2]").css({'display':'block'});
					$("div[name=clock_display]").css({'display':'none'});	
					$("#worker_details").html('');
					setTimeout(function () {
					  $("div[name=clock_display2]").html("");
				      $(".wrap").click();	
				    }, 3000);	
			}
		if($rootScope.SearchWorker.length!=0&&$rootScope.SearchWorker!=undefined && $rootScope.SearchWorker.is_clock==1){	
			    $("div[name=clock_display2]").html('');
				$("div[name=clock_display2]").css({'display':'block'});
				var n=$("#num_worker:hidden").val();
				stock_name=$('#stock_name').text();
				if(n==""){
					n=$("#num_worker2").val();
					//n=n.substring(7, 10);		
				}
				if(n.indexOf(";")>-1 &&n.indexOf("?")>n.indexOf(";")){
					n =n.substr(n.indexOf(';')+1, n.indexOf('?')-n.indexOf(';')-1);
				}
				$("#num_worker:hidden").val("");
				$("#num_worker2").val("");
				writelog("יציאת עובד: "+ n);
				$http.post('inc/functions.php',  $.param({id_worker: n,stat:"end",stock:stock}), {
		        	headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
		   		 }).success(function(data){
						$("div[name=clock_display2]").html("<h2 class='big_text'>יציאה בוצעה בהצלחה<br>המשך יום נעים!</h2>");
						$("div[name=clock_display]").css({'display':'none'});	
						$("#worker_details").html('');
						$rootScope.workerslist.filter(function( obj ) {
							if(obj.ID === n){
								obj.is_clock=0;
								worker_name1=obj.SupplierName;
								worker_num1=obj.WorkerNum;
							}						
						});	
						console.log('$rootScope.details_list.print_setting: ', $rootScope.details_list.print_setting);
						if($rootScope.details_list.print_setting){	
							var b = [];		 
							b[0]= $rootScope.txtCenter('ביצוע יציאה', 1);
							b[1]= $rootScope.txtCenter("שם עובד: "+ worker_name1, 1);		
						  	b[2]= $rootScope.txtCenter("עובד מס': "+ worker_num1, 1);
						    b[3]= $rootScope.txtCenter("תאריך: "+ $('#current_date').html(), 1);
						    b[4]= $rootScope.txtCenter("שעה: "+ $('#curr_date').html(), 1);
						    b[5]= $rootScope.txtCenter("המשך יום טוב!!!", 1);
								console.log('printPrinter 3');
						    printPrinter(b);
						 }
						setTimeout(function () {
					  $("div[name=clock_display2]").html("");
				      $(".wrap").click();	
				    }, 3000);	
				    $rootScope.SearchWorker=[];
				    $rootScope.searchw ={};
					$("input[name=search_w]").val('');
					$("#worker_details").html('');
						localStorage.setItem('workerslist',JSON.stringify($rootScope.workerslist));
				 }).error(function(){
						$("div[name=clock_display2]").html("<h2 class='big_text'>יציאה בוצעה בהצלחה<br>המשך יום נעים!!!!</h2>");
					    $("div[name=clock_display2]").css({'display':'block'});
					    $("div[name=clock_display]").css({'display':'none'});
					    $("#worker_details").html('');
						hhhhh=1;
						$rootScope.workerslist.filter(function( obj ) {
						if(obj.ID === n){
							obj.is_clock=0;
							worker_name1=obj.SupplierName;
							worker_num1=obj.WorkerNum;
						}						
					});	
					if($rootScope.details_list.print_setting){	
						var b = [];		 
						b[0]= $rootScope.txtCenter('ביצוע יציאה', 1);
						b[1]= $rootScope.txtCenter("שם עובד: "+ worker_name1, 1);		
					  	b[2]= $rootScope.txtCenter("עובד מס': "+ worker_num1, 1);
					    b[3]= $rootScope.txtCenter("תאריך: "+ $('#current_date').html(), 1);
					    b[4]= $rootScope.txtCenter("שעה: "+ $('#curr_date').html(), 1);
					    b[5]= $rootScope.txtCenter("המשך יום טוב!!!", 1);
							console.log('printPrinter 4');
					    printPrinter(b);
					 }
					localStorage.setItem('workerslist',JSON.stringify($rootScope.workerslist));

						
						
						state='end';
						time_s=$('#curr_date').html();
						date_s=$('#current_date').html();
						id_worker=n;
						
						//$rootScope.offline_workers[n+'_'+date_s+'_'+time_s]=worker_array;
						$rootScope.offline_workers[parseInt($rootScope.index_offline)]={};
						$rootScope.offline_workers[parseInt($rootScope.index_offline)]['state']=state;
						$rootScope.offline_workers[parseInt($rootScope.index_offline)]['time_s']=time_s;
						$rootScope.offline_workers[parseInt($rootScope.index_offline)]['date_s']=date_s;
						$rootScope.offline_workers[parseInt($rootScope.index_offline)]['id_worker']=id_worker;
						
						
						
						
						$rootScope.index_offline=$rootScope.index_offline+1;	
						setTimeout(function () {
						$("div[name=clock_display2]").html("");
				      $(".wrap").click();	
				    }, 3000);
											
					});					
			//	$( '.wrap' ).click();
		}
	};
	$scope.search_w = function() {
      		$scope.s=$("input[name=search_w]").val();
				$http.post('inc/functions.php',  $.param({search_w: $scope.s}), {
		        	headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
		   		 }).success(function(data){		
				      $rootScope.searchw ={};
				   	  $rootScope.searchw= data;		    
			  	});
    }
    
    $scope.choose_worker = function(WorkerNum) {
if(WorkerNum.indexOf(";")>-1 &&WorkerNum.indexOf("?")>WorkerNum.indexOf(";")){
					WorkerNum =WorkerNum.substr(WorkerNum.indexOf(';')+1, WorkerNum.indexOf('?')-WorkerNum.indexOf(';')-1);
				}
		 $rootScope.workerslist.filter(function( obj ) {
					if(obj.WorkerNum === WorkerNum){
				    	$rootScope.SearchWorker = obj;	
				    	$scope.SearchWorker = obj;		
					}						
				});	
		$("#worker_details").html("מספר עובד: "+$scope.SearchWorker.WorkerNum+"<br>שם עובד: "+$scope.SearchWorker.SupplierName);	
		$("#num_worker:hidden").val($scope.SearchWorker.ID);

    }
    
    $rootScope.workerslist_help=JSON.parse(localStorage.getItem('workerslist'));
	$http.post('get_data.php',  $.param({stat2: "worker",stock:GetURLParameter.GetURLParameter('stock')}), {
        	headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
   		 }).success(function(data){
		   	var start = data.indexOf("jsonworker:");
		   	var end = data.indexOf(":jsonworker");
		   	var len="jsonworker".length+1;
		   	/*sk 28/01/16 fix bug whith enter workers*/
		   	str=data.substr(start+len,end-start-len);
		   	str = str.replace(/(\r\n|\n|\r)/gm,"");
		   	if(str!=''){
		        $rootScope.workerslist = JSON.parse(str);
		    }
		    else{
		    	$rootScope.workerslist = {};
		    }
		   // $rootScope.workerslist = JSON.parse(str);

		     // $(this1).css('background','#dcf3f9');	
		//$('.worker_'+id+' .fa-check-circle').show();
		id=wrk.curr_wrk;
		$scope.i=0;
				$rootScope.workerslist.filter(function( obj ) {
					if(obj.ID === id){
				    	$rootScope.SearchWorker = obj;	
				    	$('.popup_pay .worker_2541 .fa-check-circle').show();
					}					
				});	
				if($rootScope.workerslist_help!=null){
					$rootScope.workerslist_help.filter(function( obj ) {
						if(obj.is_clock === 1){
					    	$rootScope.workerslist[$scope.i]['is_clock']=1;
						}					
						$scope.i++;
					});	
				}
				

	  	});
	$scope.mezuman_in=function(){
		$rootScope.mezumanin=parseFloat($rootScope.mezumanin)+parseFloat($(".text.mezuman_inout").val());
	}
	$scope.mezuman_out=function(){
		$rootScope.mezumanout=parseFloat($rootScope.mezumanout)+parseFloat($(".text.mezuman_inout").val());
	}
	$scope.remoteUrlRequestFn = function(str) {
      return {q: str};
    };

    $scope.selectedWorker = function(selected) {   	 
      $scope.search_worker_sbm(selected.originalObject['ID']);     
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
      $scope.focusState = 'Out';
      focusInputElem.classList.add('small-input');
    }

    $scope.disableInput = true;
    
    $scope.search_worker_sbm = function (id){
    	 $rootScope.workerslist.filter(function( obj ) {
					if(obj.ID === id){
				    	$rootScope.SearchWorker = obj;	
				    	$scope.SearchWorker = obj;		
					}						
				});	
		$("#worker_details").html("מספר עובד: "+$scope.SearchWorker.WorkerNum+"<br>שם עובד: "+$scope.SearchWorker.SupplierName);	
		$("#num_worker:hidden").val($scope.SearchWorker.ID);
		
	}

	this.choose_worker=function(this1,id){  
    	$(".workers_tb tr").css('background','white');
		$(".workers_tb tr .fa-check-circle").hide();
	    $(this1).css('background','#dcf3f9');	
		$('.worker_'+id+' .fa-check-circle').show();
		
		//wrk.last_wrk=wrk.curr_wrk;
		wrk.curr_wrk=id;
		//$rootScope.SearchWorker=id;
		$rootScope.workerslist.filter(function( obj ) {
						if(obj.WorkerNum === id){
					    	$rootScope.SearchWorker = obj;	
					    	writelog("בחירת עובד: "+obj['WorkerNum']+" "+obj['SupplierName']);
					    	//$scope.SearchWorker = obj;		
						}						
					});	
    };
    
    this.save_choose2=function(){
      	$( '.wrap' ).click();
		this.save_choose();

    };
    if(localStorage.getItem('worker')===null){

	}
	else{
		$rootScope.SearchWorker=JSON.parse(localStorage.getItem('worker'));
	}
	
    this.save_choose=function(){
      	if($rootScope.SearchWorker!=""&&$rootScope.SearchWorker!=undefined){
      		id=wrk.curr_wrk;
			$rootScope.workerslist.filter(function( obj ) {
						if(obj.WorkerNum === id){
					    	$rootScope.SearchWorker = obj;	
					    	writelog("בחירת עובד: "+obj['WorkerNum']+" "+obj['SupplierName']);
					    	//$scope.SearchWorker = obj;		
						}						
					});	
	 
			local.setLocal('worker',wrk.curr_wrk);
			localStorage.setItem('worker',JSON.stringify($rootScope.SearchWorker));
			openwindows.openwrap2('.add_worker.container_pop','.type_pay.container_pop');
      	}
      	else if($(".pay_workers").is('tr')){
      		alert.alert_site('בחר/י עובד',1,1);
      	}
      	else{
      		openwindows.openwrap2('.add_worker.container_pop','.type_pay.container_pop');
      	}

    };
    
    
 /*sk 07/02/16 enter and exit workers in offline*/
    $( document ).ready(function() {    
	    $rootScope.offline_workers={};
	    $rootScope.index_offline={};
	    $rootScope.index_offline=0;
});

}]);  
})();



