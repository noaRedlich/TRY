(function() {
  var app = angular.module('WorkerM', []);

 app.controller('Worker', ['$http', function($http){
      this.workers = [];
	 $http.post('get_data.php',  $.param({stat2: "worker"}), {
        	headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
   		 }).success(function(data){
		   	var start = data.indexOf("$jsonworker:");
		   	var end = data.indexOf(":$jsonworker");
		   	var len="$jsonworker".length+1;
		   	str=data.substr(start+len,end-start-len);
		    this.workers = JSON.parse(str);

	  	});
	
    }]);

})();