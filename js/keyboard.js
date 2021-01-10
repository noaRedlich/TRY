(function() {
  var app = angular.module('KeyboardM', []);
	
  
 app.controller('KeyboardController',[ '$scope', '$rootScope','cash_global',function ($scope,$rootScope,cash_global){ 
		
	$scope.shift=false;
	$scope.inputs={en:['r','p','o','i','u','y','t','r','e','l','k','j','h','g','f','d','s','a','q','w','m','n','b','v','c','x','z','he'],he:['ף','פ','ם','ן','ו','ט','א','ר','ק','ך','ל','ח','י','ע','כ','ג','ד','ש','ץ','ת','צ','מ','נ','ה','ב','ס','ז','en'],ysm:['!','@','#','$','%','^','&','*','(',')','{','}','[',']','_','','','','','','','','','','','','','he']};
	$scope.lang=$scope.inputs['he'];	

	$scope.keyboard_type = function (x){
		 if(!$scope.shift){
			$(".keyboard_result").val( $(".keyboard_result").val()+x);
			}
			 else{
			  	$(".keyboard_result").val( $(".keyboard_result").val()+x.toUpperCase());
			  }
		};
		
		$scope.erase = function (){
			$(".keyboard_result").val( $(".keyboard_result").val().substring(0,$(".keyboard_result").val().length-1));
		};
		
		$scope.shft = function (){
			if($scope.shift){
				$scope.shift=false;
				$(".shiftc").css({'background':'white'});
			}
			else{
				$scope.shift=true;
				$(".shiftc").css({'background':'#e6e9ee'});
			}			
		};

		$scope.change_lang = function (new_lang){
			$scope.lang=$scope.inputs[new_lang];	
		};
		/*$scope.doit = function (){
			var x=$('.keyboard_result').val();
			var t=$('input[name=flag_focusedk]:hidden').val();
			$(t).val(x);
			$('.keyboard_result').val('');
		};*/
  }]);
})();

// 09-08-2019 s
setInterval(function() {
  var str = $('.keyboard_result').val().replace('?', '');
  str = str.replace(';', '')
  $('.keyboard_result').val(str)
}, 500)