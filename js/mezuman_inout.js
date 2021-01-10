(function() {
  var app = angular.module('mezumanInOutM', []);
	
 app.controller('MezumanInOutController',[ '$scope', '$rootScope','alert','local',function ($scope,$rootScope,alert,local){ 
 		
 		//init variables
 		if(localStorage.getItem('z-mezumanin')===null){
			$rootScope.mezumanin=0;
		}
		else{
			$rootScope.mezumanin=JSON.parse(localStorage.getItem('z-mezumanin'));
		}
		
		if(localStorage.getItem('z-mezumanout')===null){
			$rootScope.mezumanout=0;
		}
		else{
			$rootScope.mezumanout=JSON.parse(localStorage.getItem('z-mezumanout'));
		}
 		
		$scope.mezuman_in = function (){
			writelog("הכנסת מזומן לקופה: "+$("input[type=tel].mezuman_inout").val());
			if($("input[type=tel].mezuman_inout").val()!=""){
				$scope.sum=$("input[type=tel].mezuman_inout").val();			
				$rootScope.mezumanin=(parseFloat($rootScope.mezumanin)+parseFloat($scope.sum)).toFixed(2);
				local.setLocal('z-mezumanin',$rootScope.mezumanin);
				$("input[type=tel].mezuman_inout").val('');
				$(".wrap").click();
				alert.alert_site('פעולה נקלטה בהצלחה',0,1);
			}
		};
		
		$scope.mezuman_out = function (){
			writelog("הוצאת מזומן מהקופה: "+$("input[type=tel].mezuman_inout").val());
			if($("input[type=tel].mezuman_inout").val()!=""){
				$scope.sum=$("input[type=tel].mezuman_inout").val();	
				$rootScope.mezumanout=(parseFloat($rootScope.mezumanout)+parseFloat($scope.sum)).toFixed(2);
				local.setLocal('z-mezumanout',$rootScope.mezumanout);
				$("input[type=tel].mezuman_inout").val('');
				$(".wrap").click();
				alert.alert_site('פעולה נקלטה בהצלחה',0,1);
			}
		};
		
		$scope.choose_worker = function(WorkerNum) {
			 $rootScope.workerslist.filter(function( obj ) {
						if(obj.WorkerNum === WorkerNum){
					    	$rootScope.SearchWorker = obj;	
					    	$scope.SearchWorker = obj;		
						}						
					});	
			$(".mezuman_inout .worker_details").html("מספר עובד: "+$scope.SearchWorker.WorkerNum+"<br>שם עובד: "+$scope.SearchWorker.SupplierName);	
			$(".mezuman_inout #num_worker:hidden").val($scope.SearchWorker.ID);
	
	    }
  }]);
})();

