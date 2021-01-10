var app = angular.module('datep', []);


app.directive('datepicker', function () {
return {
    restrict: 'C',
    require: 'ngModel',
     link: function (scope, element, attrs, ngModelCtrl) {
            $(element).datepicker({
                dateFormat: 'dd, MM, yy',
                onSelect: function (date) {
                    scope.date = date;
                    scope.$apply();
                }
            });
        }    
    Y};
});