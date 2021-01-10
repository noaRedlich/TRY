(function() {
  var app = angular.module('DebtM', []);
	app.controller('DebtController',[ '$http','$scope', '$rootScope','$compile','tabs','clean','local','cash_global','openwindows','alert'
	,function ($http,$scope,$rootScope, $compile,tabs,clean,local,cash_global,openwindows,alert){ 
		
		$scope.get_length=function (myarray) {
			var len=0;
	  		angular.forEach(myarray, function(index) {
			  len++
			});
	  		return len;
		}
		
		$scope.start_debt = function(){
			if($rootScope.SearchClient.length==0){
				alert.alert_site("חובה להכניס שם לקוח/ה ",0);
			} 
			else{
				var len = $scope.get_length($rootScope.search_cc2);			
				if($(".debt .debt_sum").val()!=""&&len==1){				
					$rootScope.amount=$(".debt .debt_sum").val();
					$rootScope.transtype=1;
					writelog("תשלום חוב הקפה: "+$rootScope.amount+" ללקוח: "+$rootScope.search_cc2[0]['ClientNum']+" "+$rootScope.search_cc2[0]['SupplierName'])
					$(".wrap").click();
					$rootScope.start_pay();
					$rootScope.search_cc2 ={};
				}	
				else{
					alert.alert_site("חובה להכניס שם לקוח/ה וסכום",0);
				}	
			}				
		};


  	}]);
})();
