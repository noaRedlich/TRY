(function() {

	var app = angular.module('cashbox', ['products', 'PaymentM', 'ClientM', 'WorkerM', 'AnachaM', 'TipM', 'PauseM', 'AchlafaM', 'KeyboardM', 'DebtM', 'settings', 'mezumanInOutM', 'PrepaidM', 'ngTouch']);

	app.directive('ngEnter', function() {
		return function(scope, element, attrs) {
			element.bind("keydown keypress", function(event) {
				if (event.which === 13) {
					scope.$apply(function() {
						scope.$eval(attrs.ngEnter);
					});

					event.preventDefault();
				}
			});
		};
	});

	app.directive('colorCase', function() {
		return {
			restrict : 'A',
			scope : {
				'condition' : '='
			},
			link : function(scope, element, attrs) {
				scope.$watch('condition', function(condition) {
					if (condition < 0) {
						element.css('color', 'red');
					} else {
						element.css('color', '#a1d46f');
					};
				});
			}
		}
	});
	angular.module('myModule', []).run(function() {
		event.preventDefault();
		event.stopPropagation();
		FastClick.attach(document.body);

	});

	//include html pages
	app.directive("addprod", function() {
		return {
			restrict : 'E',
			templateUrl : "inc/add_prod.html"
		};
	});

	app.directive("login", function() {
		return {
			restrict : 'E',
			templateUrl : "inc/login.html"
		};
	});
	app.directive("settmenu", function() {
		return {
			restrict : 'E',
			templateUrl : "inc/sett_head.html"
		};
	});
	app.directive("settdetails", function() {
		return {
			restrict : 'E',
			templateUrl : "inc/sett_details.html"
		};
	});
	app.directive("addcust", function() {
		return {
			restrict : 'E',
			templateUrl : "inc/add_cust.html"
		};
	});
	app.directive("akafa", function() {
		return {
			restrict : 'E',
			templateUrl : "inc/akafa2.html"
		};
	});
	app.directive("keyboard", function() {
		return {
			restrict : 'E',
			templateUrl : "inc/keyboard.html"
		};
	});
	app.directive("anacha", function() {
		return {
			restrict : 'E',
			templateUrl : "inc/anacha.html"
		};
	});
	app.directive("tip", function() {
		return {
			restrict : 'E',
			templateUrl : "inc/tip.html"
		};
	});
	app.directive("payment", function() {
		return {
			restrict : 'E',
			templateUrl : "inc/payment10.html"
		};
	});
	app.directive("achlafa", function() {
		return {
			restrict : 'E',
			templateUrl : "inc/achlafa2.html"
		};
	});
	app.directive("pause", function() {
		return {
			restrict : 'E',
			templateUrl : "inc/pause.html"
		};
	});

	app.directive("beynaim", function() {
		return {
			restrict : 'E',
			templateUrl : "inc/beynaim1.html"
		};
	});
	app.directive("clock", function() {
		return {
			restrict : 'E',
			templateUrl : "inc/clock.html"
		};
	});
	app.directive("mezumaninout", function() {
		return {
			restrict : 'E',
			templateUrl : "inc/mezuman_inout.html"
		};
	});
	app.directive("prepaid", function() {
		return {
			restrict : 'E',
			templateUrl : "inc/prepaid.html"
		};
	});
	app.directive("comment", function() {
		return {
			restrict : 'E',
			templateUrl : "inc/comment.html"
		};
	});
	app.directive("alert", function() {
		return {
			restrict : 'E',
			templateUrl : "inc/alert.html"
		};
	});
	app.directive("payment1", function() {
		return {
			restrict : 'E',
			templateUrl : "inc/payment.html"
		};
	});
	//include html pages

	//services

	//manage tabs- calculator and products
	app.factory('tabs', ['$rootScope',
	function($rootScope) {
		return {
			setTab : function(newValue) {
				//dolog('', 142,'setTab');
				// $rootScope.lasttab= $rootScope.tab;
				$rootScope.tab = newValue;
			},
			isSet : function(tabName) {
				//dolog('', 151,'isSet');
				return $rootScope.tab === tabName;
			},
			isSetMultiCalc : function(tabName1, tabName2) {;
				//dolog('', 151,'isSetMultiCalc');
				return $rootScope.tab === tabName1 || $rootScope.tab === tabName2;
			},
			isSetMulti : function(tabName1, tabName2, tabName3, tabName4, tabName5, tabName6, tabName7) {
				//dolog('',155,dolog('', 155,'isSetMulti'));
				return $rootScope.tab === tabName1 || $rootScope.tab === tabName2 || $rootScope.tab === tabName3 || $rootScope.tab === tabName4 || $rootScope.tab === tabName5 || $rootScope.tab === tabName6 || $rootScope.tab === tabName7;
			}
		};
	}]);
	app.factory('dates', ['$rootScope',
	function($rootScope) {
		return {
			date : function() {
				$rootScope.date = new Date();
			}
		};

	}]);

	//validate required fields payments
	app.factory('validate', ['$rootScope',
	function($rootScope) {
		return {
			valid : function() {
				return true;
				str = ".container_pop.amchaa";
				if ($(str).find('input:text[value=""]').length == 0) {
					return true;
				}
				$(str).find('input:text[value=""].required').addClass('red');
				return false;
			}
		};

	}]);

	//open windows
	app.factory('openwindows', ['$rootScope',
	function($rootScope) {
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
			openwrap : function(str, popup) {
				$(str).css({
					'z-index' : '9999'
				});
				$(popup).css({
					'display' : 'block'
				});
				$(".wrap").css({
					'display' : 'block'
				});

			},
			openwrap2 : function(str1, str2) {
				if (str1 == 'checkend' && (parseFloat($('.span_itra').text()) <= 0 || $("input[name=helpsum]:hidden").val() == 'true')) {
					str2 = '.finish.container_pop';
				}
				$(str1).css({
					'display' : 'none'
				});
				;
				$(".container_pop").css({
					'display' : 'none'
				});
				;
				$(str2).css({
					'display' : 'block'
				});
				$(str2).css({
					'z-index' : '9999'
				});
				$(str2).css({
					'display' : 'block'
				});
			}
		};

	}]);

	//alerts
	app.factory('alert', ['$rootScope', '$http',
	function($rootScope, $http) {
		return {
			alert_site : function(msg, type, index_onoff) {
				if ( 1 == 1) {//$rootScope.lrt_list[index_onoff] == 'on' ||
					if (type == 3) {
						$('#message').html(msg + "<p class='type_pass'>נא הקש סיסמה</p><input type='text' name='passn' class='passn' />");
					} else if (type == 1) {
						$('#message').html(msg);
					} else {
						$('#message').text(msg);
					}

					$(".pop_alert").css({
						'display' : 'block'
					});
					$(".pop_alert").css({
						'z-index' : '9999'
					});
					$(".pop_alert .container_pop").css({
						'display' : 'block'
					});

				}

			},
			alert_cancel : function() {
				
				//actions that need manager password
				$(".loading").hide();
				
				if ($("input[name=passn]").length > 0) {
					var action=$rootScope.action;
					$http.post('inc/functions.php', $.param({
						pass_manager : $('input[name=passn]').val()
					}), {
						headers : {
							'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
						}
					}).success(function(data) {
						if (data != 1) {
							$(".type_pass").text("סיסמה לא נכונה");
							return;

						} else {
							$rootScope.right_pass = 1;
							switch(action) {
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
							case 'start_tip':
								$rootScope.start_tip();
								break;
 							case 'close_k':
								$rootScope.close_k();
								break;

                            case 'open_backoffice':
								$rootScope.open_backoffice();
								break;

							case 'start_anacha_prod':
								$rootScope.start_anacha_prod($rootScope.selector1, $rootScope.selector2);
								break;

							case 'akafa':
										/*30/8 sk*/
								writelog('alert cancel');
								$rootScope.add_type('.over_akafa', 'הקפה');
								$rootScope.checkend();
								openwrap2('','.type_pay.container_pop');
								break;

							default:

							}
							$(".pop_alert").css({
								'display' : 'none'
							});
							$(".pop_alert").css('z-index', "1");
							$rootScope.action='';
						}

					});
					
					
				}

				//actions that need ok from user
				else if ($rootScope.action == 'close_k') {
					
					$rootScope.print();
					$rootScope.closebb();
					$rootScope.end_kupa();
					$rootScope.call_clean();

					$(".pop_alert").css({
						"display" : "none"
					});
					$(".pop_alert").css("z-index", "1");
					$("#search_prod").focus();
					localStorage.clear();
					//localStorage.setItem('workerslist',JSON.stringify($rootScope.workerslist));
				} else if ($rootScope.action == 'add_prd') {
					$(".rightside  .submit_wrap input[type=button]").click();
					$("#p_barcode").val($rootScope.notfound);
					$(".pop_alert").css({
						"display" : "none"
					});
					$(".pop_alert").css("z-index", "1");
					$("#search_prod").focus();
				} else if ($rootScope.action == 'del_cash') {
					writelog("מחיקת חשבון");
					$rootScope.numprod_hova_cash = $rootScope.numprod_hova_cash != undefined ? $rootScope.numprod_hova_cash : 0;
					$rootScope.numprod_zchut_cash = $rootScope.numprod_zchut_cash != undefined ? $rootScope.numprod_zchut_cash : 0;
					$rootScope.numprod_hova -= $rootScope.numprod_hova_cash;
					$rootScope.numprod_zchut -= $rootScope.numprod_zchut_cash;
					$rootScope.call_clean();
					$(".pop_alert").css({
						"display" : "none"
					});
					$(".pop_alert").css("z-index", "1");
					$("#search_prod").focus();
				} else {
					$(".pop_alert").css({
						"display" : "none"
					});
					$(".pop_alert").css("z-index", "1");
					$("#search_prod").focus();
				}
				$rootScope.action='';
				//$(".mainarea").click();
			}
		};

	}]);

	app.factory('add_cart', ['$rootScope', 'local', 'cash_global', 'total',
	function($rootScope, local, cash_global, total) {
		var obj2 = {};

		obj2.add_cart = function(prod) {

			id = prod['BarCode'];
			if ($rootScope.refund == 1) {
				var price = parseFloat(prod['SalePrice']) * -1;
				$('.zicuy').toggleClass("zicuy_zctive");
			} else {
				var price = prod['SalePrice'];
			}

			var x = {
				"ID" : prod['ID'],
				"BarCode" : prod['BarCode'],
				"Title" : prod['Title'],
				"SalePrice" : price,
				"Amount" : 1,
				"Discount" : 0,
				"comment" : '',
				"commentClass" : '',
				"department" : prod['ProductGroup'],
				"comptype" : "2",
				"finalamount" : '',
				"Discount2" : 0,
				"cdisctype" : 0,
				"refund" : $rootScope.refund,
				"Unit": prod['Unit'],
				"discount_desc": prod['discount_desc']

			};
			var y = 0;
			/*cash_global.products.filter(function(obj) {
				if (obj.BarCode === id) {
					if ($rootScope.refund == 1 && obj.refund == 1) {
						obj2.plus_count(prod['SalePrice'], prod['BarCode'], $rootScope.refund)
						y = 1;
					} else if ($rootScope.refund != 1 && obj.refund != 1) {
						obj2.plus_count(prod['SalePrice'], prod['BarCode'], $rootScope.refund)
						y = 1;
					}

				}

			});*/
            
 
            
			if (y == 1&&1==0) {
				y = 0;
			} else {
				$rootScope.countprod++;

				cash_global.products.push(x);
				$rootScope.amount = (parseFloat($rootScope.before_global_dis) + parseFloat(price)).toFixed(2);
				$rootScope.amount = ($rootScope.amount * $rootScope.global_dis).toFixed(2);
				$rootScope.before_global_dis = (parseFloat($rootScope.before_global_dis) + parseFloat(price)).toFixed(2);
				//$rootScope.original=$rootScope.amount;
						//$rootScope.amount_maam=(parseFloat($rootScope.amount)*0.17).toFixed(2);/*sk 08/10 change vat*/
			//$rootScope.amount_out=(parseFloat($rootScope.amount)*0.83).toFixed(2);/*sk 08/10 change vat*/
			$rootScope.check_discounts();
              $rootScope.amount_maam = (($rootScope.amount * 17)/117).toFixed(2);
              $rootScope.amount_out= ($rootScope.amount-$rootScope.amount_maam).toFixed(2);
				$rootScope.original_afterprod = total.getTotal();
			}
			if ($rootScope.refund == 0) {
				$rootScope.numprod_hova++;
				$rootScope.numprod_hova_cash++;
				local.ocal('z-numprod_hova', $rootScope.numprod_hova);
			} else {
				$rootScope.numprod_zchut++;
				$rootScope.numprod_zchut_cash++;
				local.setLocal('z-numprod_zchut', $rootScope.numprod_zchut);
			}
			$rootScope.refund = 0;
			local.setLocal('products', cash_global.products);
			$(".search_input").val("");
			$("#search_prod").val("");
			$("#search_prod").focus();
		}
		obj2.minus_count = function(sum, index, refund) {
			$rootScope.countprod--;
			cash_global.products.filter(function(obj) {
				if (obj.index === index && (obj.Amount > 1 || $rootScope.refund == 1)) {
					if (refund == 1 && obj.SalePrice < 0) {
						$rootScope.numprod_zchut--;
						$rootScope.numprod_zchut_cash--;
						$rootScope.amount = (parseFloat($rootScope.before_global_dis) - parseFloat(sum)).toFixed(2);
						$rootScope.amount = ($rootScope.amount * $rootScope.global_dis).toFixed(2);
						$rootScope.before_global_dis = (parseFloat($rootScope.before_global_dis) - parseFloat(sum)).toFixed(2);
						//$rootScope.original=$rootScope.amount;
						//$rootScope.amount_maam=(parseFloat($rootScope.amount)*0.17).toFixed(2);/*sk 08/10 change vat*/
						//$rootScope.amount_out=(parseFloat($rootScope.amount)*0.83).toFixed(2);/*sk 08/10 change vat*/
						$rootScope.check_discounts();
              			$rootScope.amount_maam = (($rootScope.amount * 17)/117).toFixed(2);
             			$rootScope.amount_out= ($rootScope.amount-$rootScope.amount_maam).toFixed(2);
						$rootScope.original_afterprod = $scope.getTotal();
						obj['Amount'] -= 1;
					} else if (refund != 1 && obj.SalePrice > 0) {
						$rootScope.numprod_hova--;
						$rootScope.numprod_hova_cash--;
						$rootScope.amount = (parseFloat($rootScope.before_global_dis) - parseFloat(sum)).toFixed(2);
						$rootScope.amount = ($rootScope.amount * $rootScope.global_dis).toFixed(2);
						$rootScope.before_global_dis = (parseFloat($rootScope.before_global_dis) - parseFloat(sum)).toFixed(2);
						$rootScope.check_discounts();
						//$rootScope.original=$rootScope.amount;
						//$rootScope.amount_maam=(parseFloat($rootScope.amount)*0.17).toFixed(2);/*sk 08/10 change vat*/
						//$rootScope.amount_out=(parseFloat($rootScope.amount)*0.83).toFixed(2);/*sk 08/10 change vat*/
			              $rootScope.amount_maam = (($rootScope.amount * 17)/117).toFixed(2);
			              $rootScope.amount_out= ($rootScope.amount-$rootScope.amount_maam).toFixed(2);
						$rootScope.original_afterprod = $scope.getTotal();
						obj['Amount'] -= 1;

					}

				}

			});
			local.setLocal('products', cash_global.products);
		}
		obj2.plus_count = function(sum, index, refund) {
			$rootScope.countprod++;
			cash_global.products.filter(function(obj) {
				if (obj.index === index) {
					if (refund == 1 && obj.SalePrice < 0) {
						$rootScope.numprod_zchut++;
						$rootScope.numprod_zchut_cash++;
						$rootScope.amount = (parseFloat($rootScope.before_global_dis) + parseFloat(sum)).toFixed(2);
						$rootScope.amount = ($rootScope.amount * $rootScope.global_dis).toFixed(2);
						$rootScope.before_global_dis = (parseFloat($rootScope.before_global_dis) + parseFloat(sum)).toFixed(2);
						//$rootScope.original=$rootScope.amount;
						//$rootScope.amount_maam=(parseFloat($rootScope.amount)*0.17).toFixed(2);/*sk 08/10 change vat*/
						//$rootScope.amount_out=(parseFloat($rootScope.amount)*0.83).toFixed(2);/*sk 08/10 change vat*/
						$rootScope.check_discounts();
			              $rootScope.amount_maam = (($rootScope.amount * 17)/117).toFixed(2);
			              $rootScope.amount_out= ($rootScope.amount-$rootScope.amount_maam).toFixed(2);
						$rootScope.original_afterprod = total.getTotal();
						obj['Amount'] += 1;
					} else if (refund != 1 && obj.SalePrice > 0) {
						$rootScope.numprod_hova++;
						$rootScope.numprod_hova_cash++;
						$rootScope.amount = (parseFloat($rootScope.before_global_dis) + parseFloat(sum)).toFixed(2);
						$rootScope.amount = ($rootScope.amount * $rootScope.global_dis).toFixed(2);
						$rootScope.before_global_dis = (parseFloat($rootScope.before_global_dis) + parseFloat(sum)).toFixed(2);
						//$rootScope.original=$rootScope.amount;
						//$rootScope.amount_maam=(parseFloat($rootScope.amount)*0.17).toFixed(2);/*sk 08/10 change vat*/
						//$rootScope.amount_out=(parseFloat($rootScope.amount)*0.83).toFixed(2);/*sk 08/10 change vat*/
						$rootScope.check_discounts();
			              $rootScope.amount_maam = (($rootScope.amount * 17)/117).toFixed(2);
			              $rootScope.amount_out= ($rootScope.amount-$rootScope.amount_maam).toFixed(2);
						$rootScope.original_afterprod = total.getTotal();
						obj['Amount'] += 1;
					}

				}

			});
			local.setLocal('products', cash_global.products);

		}
		return obj2;

	}]);

	//get parameter from url
	app.factory('GetURLParameter', ['$rootScope',
	function($rootScope) {
		return {
			GetURLParameter : function(sParam) {
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

			if (!(jQuery.isEmptyObject(arr)) ) {
				arr = arr.slice(start, end);
			} else {
				arr = [];
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
			filtered.sort(function(a, b) {
				return (a[field] > b[field] ? 1 : -1);
			});
			if (reverse)
				filtered.reverse();
			return filtered;
		};
	});

	//substring
	app.filter('cut', function() {
		return function(value, wordwise, max, tail) {
			if (!value)
				return '';

			max = parseInt(max, 10);
			if (!max)
				return value;
			if (value.length <= max)
				return value;

			value = value.substr(0, max);
			if (wordwise) {
				var lastspace = value.lastIndexOf(' ');
				if (lastspace != -1) {
					value = value.substr(0, lastspace);
				}
			}

			//return value + (tail || ' …');
			return value;
		};
	});

	app.filter('customFunction1', function() {
		return function(items) {
			var filtered = [];
			angular.forEach(items, function(item) {
				if (item.pause == 1)
					filtered.push(item);
			});
			return filtered;
		};
	});
	app.filter('customFunction0', function() {
		return function(items) {
			var filtered = [];
			angular.forEach(items, function(item) {
				if (item.pause != 1)
					filtered.push(item);
			});
			return filtered;
		};
	});

	//round 2 place
	app.filter('fix2', function() {
		return function(item) {
			if (item != undefined)
				return item.toFixed(2);
			return 0.00;
		};
	});

	//add 0 to tranid till 9 places
	app.filter('fill_num', function() {
		return function(item) {
			if (item != undefined) {
				var x = 9 - parseInt(item.toString().length);
				for (var i = 0; i < x; i++) {
					item = "0" + item.toString();
				};
				return item;
			}

			return item;
		};
	});

	//save in local
	app.factory('local', ['$rootScope',
	function($rootScope) {
		return {
			setLocal : function(name, item) {
				if (name == 'settings' || name == 'cashes' || name == 'cash_num' || name == 'kupa_num' || name == 'finalltash' || name == 'finalltash2' || name.indexOf('z-') > -1) {
					localStorage.setItem(name, JSON.stringify(item));
				} else if (name == 'worker') {
					localStorage.setItem('cash' + $rootScope.cash_num + '_' + name, item);
				} else {
					localStorage.setItem('cash' + $rootScope.cash_num + '_' + name, JSON.stringify(item));
				}
			}
		};

	}]);

	app.factory('clean', ['cash_global', '$rootScope', 'tabs', 'local',
	function(cash_global, $rootScope, tabs, local) {
		return {
			clean : function() {
				if($rootScope.action=="del_cash"){
					payments=cash_global.payments_type;
					for (var key in cash_global.payments_type) {
						if (cash_global.payments_type.hasOwnProperty(key)){
							for ( i = 0; i < payments[key].length; i++) {
								payment = payments[key][i];
								/*$rootScope.finalltash.all=(parseFloat($rootScope.finalltash.all)-parseFloat(payment.amount)).toFixed(2);*///sk 03/09
								if(key!='akafa' && key!='shovarzicuy'){/*sk 03/09 add the conditiion*///בהקפה לא מוסיפים את הכסום לסכום הכללי
								   $rootScope.finalltash.all=(parseFloat($rootScope.finalltash.all)-parseFloat(payment.amount)).toFixed(2);//מחיקת התשלומים במחיקת חשבון
								}
								$rootScope.finalltash[key]=(parseFloat($rootScope.finalltash[key])-parseFloat(payment.amount)).toFixed(2);
								if(payment.amount<0){
									$rootScope.finalltash[key+"1"]['zicuy']=(parseFloat($rootScope.finalltash[key+"1"]['zicuy'])+parseFloat(payment.amount)).toFixed(2);
								}
								else{/*sk 03/09 add the condition*/
									/*$rootScope.finalltash[key+"1"]['hova']=(parseFloat($rootScope.finalltash[key+"1"]['hova'])-parseFloat(payment.amount)).toFixed(2);//delete credit and debit per payment type*///sk 03/09
									if(key!='akafa' && key!='shovarzicuy'){/*sk 07/09*/
										$rootScope.finalltash[key+"1"]['hova']=(parseFloat($rootScope.finalltash[key+"1"]['hova'])-parseFloat(payment.amount)).toFixed(2);//delete credit and debit per payment type 
									}
								}
								
							}
						}
					}
				}
				cash_global.products.splice(0, cash_global.products.length);
				cash_global.payments_type.cash.splice(0, cash_global.payments_type.cash.length);
				cash_global.payments_type.cheque.splice(0, cash_global.payments_type.cheque.length);
				cash_global.payments_type.credit.splice(0, cash_global.payments_type.credit.length);
				cash_global.payments_type.akafadebt.splice(0, cash_global.payments_type.akafadebt.length);
				if (cash_global.payments_type.akafa != "") {
					cash_global.payments_type.akafa.splice(0, cash_global.payments_type.akafa.length);
				}
				cash_global.payments_type.shovar.splice(0, cash_global.payments_type.shovar.length);
				cash_global.payments_type.shovarzicuy.splice(0, cash_global.payments_type.shovarzicuy.length);
				cash_global.payments_type.prepaid.splice(0, cash_global.payments_type.prepaid.length);

				local.setLocal('products', cash_global.products);
				local.setLocal('payment', cash_global.payments_type);

				//cash_global.worker='';
				cash_global.original = '';
				$rootScope.comment = '';
				$rootScope.commentClass = '';
				//cash_global.anacha='';
				$rootScope.isMoadon=true;
				$rootScope.index=-1;
				$rootScope.numprod_hova_cash = 0;
				$rootScope.numprod_zchut_cash = 0;
				$rootScope.countprod = 0;
				$rootScope.amount = 0.00;
				$rootScope.paid = 0.00;
				$rootScope.itra = 0.00;
				$rootScope.cash_amount_help = 0;
				$rootScope.amount = 0.00;
				$rootScope.original = 0.00;
				$rootScope.amount_maam = 0.00;
				$rootScope.discount_sale = 0.00
				$rootScope.amount_out = 0.00;
				$rootScope.transtype = 0;
				$rootScope.original_afterprod = 0;
				$rootScope.new1 = 0;
				$rootScope.mezumanin1 = 0;
				$rootScope.mezumanitra = 0;
				$rootScope.global_dis = 1;
				$rootScope.before_global_dis = 0;
				$rootScope.finalamount=0;
				$rootScope.firstamount=0;
				$rootScope.new2=0;
				$rootScope.disccperc=0;
				$rootScope.SearchClient = [];
				$rootScope.search_cc = [];
				$rootScope.search_cc2 ={};
				$(".debt .newrow2 ").hide();
				$rootScope.prepaid = 0;
				$(".prepaid_disabled").removeAttr('disabled');
				$(".exitclient,.akafa_client_tb1").hide();
				$(".discount_group").hide();
				$(".workers_tb tr .fa-check-circle").hide();
				$(".find_cust_container").css('display', 'none');
				$(".text,.toclean").val('');
				$(".before_calc").hide();
				$(".toclean").val('');
				$("select.toclean").val('-1');
				$(".is_mezuman:hidden").val('0');
			   /*sk 08/02/2016 */
                $(".is_change:hidden").val('0');
				$(".ddd3").val($rootScope.currdate);

				if ($rootScope.cash_num_pause != -1) {
					 // delete cash_global.cashes['cash_num' + $rootScope.cash_num_pause]; //sk 12/01/16 pause chess
                    delete cash_global.cashes['cash_num' + $rootScope.cash_num_pause+'*'];
					$rootScope.cash_num_pause = -1;
				}
				$rootScope.cash_num_pause = -1;

				 /*sk 02/03/2016*/
				if($rootScope.prefers_list.pr_viewprod=='on'){
	                tabs.setTab(2);
				}
				else{
					tabs.setTab(1);
				}
                }
            };

        }]);

	app.factory('total', ['$rootScope',
	function($rootScope) {
		return {
			getTotal : function(name, item) {
				var total = 0;
				for (var i = 0; i < cash_prd.products.length; i++) {
					var product = cash_prd.products[i];
					total += (product.SalePrice - product.Discount) * product.Amount;
				}
				return total.toFixed(2);
			}
		};
	}]);

	app.factory('prod_global', ['$rootScope',
	function($rootScope) {
		return {
			products : []
		};

	}]);
	app.factory('cash_global', ['$rootScope',
	function($rootScope) {
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
			products : [],
			cashes : {},
			payments_type : {
				cash : [],
				cheque : [],
				credit : [],
				akafadebt : [],
				akafa : '',
				shovar : [],
				shovarzicuy : [],
				prepaid : []
			},
			worker : '',
			original : '',
			anacha : '',
			tip: '',
		};

	}]);

	app.controller('CashboxController', ['$http', '$scope', '$rootScope', '$compile', '$timeout', 'tabs', 'clean', 'local', 'cash_global', 'GetURLParameter', 'alert', 'dates','total',
	function($http, $scope, $rootScope, $compile, $timeout, tabs, clean, local, cash_global, GetURLParameter, alert, dates, total) {
		$scope.datet = new Date();
		$scope.tickInterval = 1000//ms

		$rootScope.stockname = stockname;
		$( ".prepaid" ).click(function() { 
			if($rootScope.amount==0){
    			str=".pop_prepaid.prepaidmain";
				popup=".an,.pop_prepaid.prepaidmain";
				
				//$('#trannum').text($.cookie("trannum"));
				openwrap(str,popup);	
    		}
    		else{
    			alert.alert_site('יש להשהות עסקה נוכחית בכדי לטעון כרטיס מתנה',1,1);
    		}   
				
			////$(".s_anacha").val($(".finall_price").text());		
			//$(".s_between").val(current_finnal_amount);
			//if($(".anacha_txt").val()!=""){
			//	calc_anacha();		
			//}	
		});
		var theme = localStorage.getItem('theme');
		if (theme != null && $("body").attr("class").indexOf("theme") <= -1) {
			$('body').addClass(theme);
		}
		var tick = function() {
			$scope.datet = Date.now()// get the current time
			$timeout(tick, $scope.tickInterval);
			// reset the timer
		}
		// Start the timer
		$timeout(tick, $scope.tickInterval);
		$scope.call_alert_site = function(msg, type, index_onoff) {
			alert.alert_site(msg, type, index_onoff);
		}
		$scope.call_alert_cancel = function() {
			alert.alert_cancel();
			//$(".pop_alert").css('z-index',"1");

		}
		//sk 04/08/2016 cancel the action on cancle click
		  $scope.cancel_func = function () {
          	$rootScope.action='';
            writelog('in cancel function');
                //$(".pop_alert").css('z-index',"1");

          }
		//type
            // 1------48 תוים בשורה
            // 2------31
            // 3------html
            $rootScope.txtCenter = function (txt, type) {
                if (type == 1) {
                    num2 = 48;
                } else if (type == 2) {
                    num2 = 31;
                }

                if (type == 3) {

                    return "<tr><th colspan='3'>" + txt + "</th></tr>";
                }

                var i;
                if (txt.indexOf("<br>") == -1 && txt.indexOf("<hr>") == -1 && txt.indexOf("<img") == -1) {
                    // txt=reverseString(txt);
                    len = txt.length;
                    for (i = 0; i < (num2 - len) / 2; i++) {
                        txt = " " + txt + " ";
                    }
                    return txt;
                }
                return "";
            }
            $rootScope.txtCenter2 = function (txt, type) {
                var i;
                // txt=reverseString(txt);
                len = txt.length;
                for (i = 0; i < (29 - len) / 2; i++) {
                    txt = " " + txt + " ";
                }
                return txt;
            }
            $rootScope.itemLine3 = function (t1, t2, type) {
                if (type == 3) {
                    return "<tr><td>" + t1 + "</td><td colspan='2'>" + t2 + "</td></tr>";
                }
                //t1=reverseString(t1);
                //t2=reverseString(t2);

                if (type == 2) {
                    /*t3=t1;
                     t1=t2;
                     t2=t3;*/
                    t1 = t1.toString();
                    t2 = t2.toString();
                    num4 = 22;
                    num3 = 8;
                    num2 = 27;
                } else if (type == 1) {
                    num3 = 15;
                    num4 = 32;
                }
                len1 = t1.length;
                if (len1 > num3) {
                    t1 = t1.substring(0, num3 - 1);
                } else {
                    for (i = len1; i < num3; i++) {
                        t1 = " " + t1;
                    }
                }
                len2 = t2.length;
                if (len2 > num4) {
                    t3 = t2.substring(0, num4);
                    t2 = t3 + "\n" + t2.substring(num4);
                } else {
                    for (i = len2; i < num4; i++) {
                        t2 = " " + t2;
                    }
                }
                if (type == 2) {
                    return t1 + t2;
                } else if (type == 1) {
                    return t2 + t1;
                }
            }
            $rootScope.itemLine2 = function (t1, t2, t3, type) {
                if (type == 3) {
                	t1 = t1.toString();
	                t2 = t2.toString();
	                t3 = t3.toString();
	                if(this.details_list.barkod_len != null && this.details_list.barkod_len != 0){
	                	t1 = t1.substring(0,this.details_list.barkod_len);
	                	t2 = t2.substring(0,this.details_list.desc_len);
	                	t3 = t3.substring(0,this.details_list.total_len);
	                }
                    return "<tr><td>" + t1 + "</td><td>" + t2 + "</td><td>" + t3 + "</td></tr>";
                }
                t1 = t1.toString();
                t2 = t2.toString();
                t3 = t3.toString();
                if (type == 2) {
                    t4 = t1;
                    t1 = t3;
                    t3 = t4;

                    num3 = 9;
                    num4 = 10;
                    num5 = 9;
                } else {
                    num3 = 15;
                    num4 = 22;
                    num5 = 11;
                }
                /*
                 if(typeof android2!="undefined"){
                 t4 = t1;
                 t1 = t3;
                 t3 = t4;
                 num3 = 15;
                 num4 = 22;
                 num5 = 11;
                 }*/

                //t1=t1;
                //t1=reverseString(t1);
                //t2=reverseString(t2);
                //t3=reverseString(t3);
                len1 = t1.length;
                if (len1 > num3) {
                    t1 = t1.substring(0, num3 - 1);
                } else {
                    for (i = len1; i < num3; i++) {
                        t1 = " " + t1;
                    }
                }
                len2 = t2.length;
                if (len2 > num4) {
                    t2 = t2.substring(0, num4 - 1);
                } else {
                    for (i = len2; i < num4; i++) {
                        t2 = " " + t2;
                    }
                }
                len3 = t3.length;
                if (len3 > num5) {
                    t3 = t3.substring(0, num5 - 1);
                } else {
                    for (i = len3; i < num5; i++) {
                        t3 = " " + t3;
                    }
                }
                //if(typeof android!="undefined"){
                return t1 + " " + t2 + " " + t3;
                /* }
                 else{
                 return t3+t2+t1;
                 }*/
            }
		$rootScope.cutWord = function(t){
			arr=t.split(" ");
			for(i=0;i<arr.length;i++){
				if(arr[i].length>10){
					x=arr[i].substr(0,10)+" "+arr[i].substr(10,arr[i].length-10);
					t=t.replace(arr[i],x);
				}
			}
			return t;
		}
		
		
		//-----------------------lc 18/07/2016 old code---------start-------
			  $rootScope.itemLine4 = function (t1, t2, t3, type){
			  	 t1 = t1.toString();
                t2 = t2.toString();
                t3 = t3.toString();
			  	 if(this.details_list.barkod_len != null && this.details_list.barkod_len != 0){
	                	t1 = t1.substring(0,this.details_list.barkod_len);
	                	
	                }
					if(this.details_list.desc_len != null && this.details_list.desc_len != 0){
	                t2 = t2.substring(0,this.details_list.desc_len);
	               }
	                if(this.details_list.total_len != null && this.details_list.total_len != 0){
	                	t3 = t3.substring(0,this.details_list.total_len);
	                }
			                if (type == 3) {
			                    return "<tr><td style='width:110px;padding-left:5px;'>" + t1 + "</td><td style='width:120px;'>" + $rootScope.cutWord(t2) + "</td><td style='width:70px;text-align:left;'>" + t3 + "</td></tr>";
			                }
		//-----------------------lc 18/07/2016 old code----------end-----
		
		
  // $rootScope.itemLine4 = function (t1, t2, t3, type,underLine='') { //lc 18/07/2016 add underLine to title in cheshbonit
                // if (type == 3) {
                    // return "<tr><td style='width:110px;padding-left:5px;"+underLine+"'>" + t1 + "</td><td style='width:120px;"+underLine+"'>" + $rootScope.cutWord(t2) + "</td><td style='width:70px;text-align:left;"+underLine+"'>" + t3 + "</td></tr>";
                // }
                   
                /*
                 if(typeof android == 'undefined'&&typeof android2 == 'undefined'){

                 return "<tr><td style='width:110px;padding-left:5px;'>"+t1+"</td><td style='width:120px;'>"+$rootScope.cutWord(t2)+"</td><td style='width:70px;text-align:left;'>"+t3+"</td></tr>";
                 }*/

                t1 = t1.toString();
                t2 = t2.toString();
                t3 = t3.toString();
                var RegExpression = /[א-ת]/;
                if (!RegExpression.test(t2)) {
                    len1 = t1.length;
                    t22 = "";
                    t23 = "";
                    if (length < 14) {
                        for (i = len1; i < 14; i++) {
                            t1 = " " + t1;
                        }
                    }
                    len3 = t3.length;
                    x = 16 - len3;
                    len2 = t2.length;
                    if (len2 < x) {
                        for (i = len2; i < x; i++) {

                            t2 = " " + t2;

                        }
                    } else {
                        t22 = t2.substring(0, x);
                        t23 = "\n  " + t2.substring(x);
                        t2 = "";
                    }
                    //if (typeof window.external=='undefined'|| typeof window.external.print4 == 'undefined') {

                    return t3 + " " + t22 + t2 + t1 + t23;
                    /*	} else {
                     /*t2=t2.trim();
                     t3=t3.trim();
                     //t2=$rootScope.addSpace(t2,17-t3.length,1);
                     if(t2.length<17-t3.length){
                     t3=$rootScope.addSpace(t3,17-t2.length,0);
                     }
                     t4= $rootScope.addSpace2(17-(t3.length + t2.length) );
                     //return t1+t2+t3+" "+t22+t23;

                     //t4="\t";
                     /*t9 =  t3+t2+t1+t4 + "\n";
                     t9 += t3+t2+t4+t1 + "\n";
                     t9 += t3+t1+t2+t4 + "\n";
                     t9 += t3+t1+t4+t2 + "\n";
                     t9 += t3+t4+t2+t1 + "\n";
                     t9 += t3+t4+t1+t2 + "\n";*/

                    //return t1+;
                    /*	return t3 + " " + t22 + t2 + t1 + t23;
                     }*/
                } else {
                    len1 = t1.length;
                    t22 = "";
                    t23 = "";
                    if (length < 14) {
                        for (i = len1; i < 14; i++) {
                            t1 = t1 + " ";
                        }
                    }
                    len3 = t3.length;
                    x = 16 - len3;
                    if (type == 1) {
                        x = 34 - len3;
                    }
                    len2 = t2.length;
                    if (len2 < x) {
                        for (i = len2; i < x; i++) {
                            t2 = t2 + " ";
                        }
                    } else {
                        t22 = t2.substring(0, x);
                        t23 = "\n  " + t2.substring(x);
                        t2 = "";
                    }
                    return t1 + t2 + t22 + " " + t3 + t23;
                }

            }

		$rootScope.addSpace2 = function(lenght_of_string) {
			t = "";

			for ( i = 0; i < lenght_of_string; i++) {

				t = " " + t;

			}
			return t;

		}

		$rootScope.addSpace = function(t, lenght_of_string, start) {
			if (t.length > lenght_of_string) {
				t = t.substring(0, lenght_of_string);
			} else {
				for ( i = t.length; i < lenght_of_string; i++) {
					if (start == 1) {
						t = " " + t;
					} else {
						t = t + " ";
					}
				}
			}
			return t;

		}
$rootScope.open_drawer=function (){
	if(typeof android !='undefined')
		android.open_drw();
	else{ 
		a=[]; 
		printPrinter(a);
	}
	$rootScope.finalltash.opendrawer++;
	localStorage.setItem('finalltash',JSON.stringify($rootScope.finalltash));
	//$rootScope.finalltash=JSON.parse(localStorage.getItem('finalltash'));
}
		            $rootScope.itemLine = function (t1, t2, type) {
                if (type == 3) {

                    return "<tr><td colspan='2'>" + t1 + "</td><td style='text-align:left'>" + t2 + "</td></tr>";
                }
                // t1=reverseString(t1);
                // t2=reverseString(t2);
                t1 = t1.toString();
                t2 = t2.toString();
                if (type == 2) {
                    /*t3=t1;
                     t1=t2;
                     t2=t3;*/
                    num2 = 31;
                }
                end = "";

                len = num2 - t1.length - t2.length;
                if (len < 0) {
                    x = num2 - (t1.length + 3);
                    end = t2.substring(x);
                    t2 = t2.substring(0, x);
                    len = 3;
                }
                t = t1;
                for (i1 = 0; i1 < len; i1++) {
                    t = t + " ";
                }
                t = t + t2;
                if (end != "") {
                    len = end.length;
                    for (i1 = 0; i1 < num2 - len; i1++) {
                        end = " " + end;
                    }
                }
                return t + end;
            }
		$scope.isclean = function() {
			  // $rootScope.action = 'del_cash';sk 03/04/2016 remove two line under
			if ($rootScope.amount != 0 ||$rootScope.countprod!=0|| ($rootScope.SearchClient != undefined && $rootScope.SearchClient.length != 0)) {
				 $rootScope.action = 'del_cash';
				if ($rootScope.cash_num_pause != -1 && $rootScope.cash_num_pause != undefined) {
					$scope.call_alert_site('האם ברצונך למחוק את החשבון? החשבון נמצא בהשהייה', 0, '');
				} else {
					$scope.call_alert_site('האם ברצונך למחוק את החשבון?', 0, '');
				}
			}
		}
		if (start_cash != undefined && start_cash != '' && start_cash != 0) {
			localStorage.setItem('start_cash', start_cash);
		}
		$rootScope.open_backoffice = function(){
	
 			if($rootScope.right_pass==1||$rootScope.premission_list['permission_backoffice']=='on'){
 				$rootScope.right_pass=0;
 				window.location.href='/main2.php?kupa=1';
 			}
 			else{
 				$rootScope.action="open_backoffice";
 				alert.alert_site('משתמש לא מורשה',3,1);
 			}	
		};
		
		$rootScope.end_kupa = function() {
			//sk 24/12/15 send offline transactions
    	    flag_send_cashes=0
    		if(!$.isEmptyObject($rootScope.send_cashes)){
				tran=JSON.stringify($rootScope.send_cashes);
				if(tran.length>2){
					writelog("offline tran : "+tran);
					$http.post('inc/transactions.php', $.param({
						stock : GetURLParameter.GetURLParameter('stock'),
						journal : journal,
						journal_id : journal_id,
						trans : tran, 
						cust : $rootScope.SearchClient['ID'],
						offline:1,
					},{async:false}), {
						headers : {
							'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
						}				
					}).success(function(data) {
						//$(".loading").css('display','none');
						flag_send_cashes=1;
						$rootScope.send_cashes={};
						localStorage.setItem('send_cashes', JSON.stringify($rootScope.send_cashes));
					}).error(function(){
						hhhhh=1;
						
					});
				}
			}
	    	/*if(flag_send_cashes==1){
	    		$rootScope.send_cashes={};
	    	}*/
			tran = JSON.stringify($scope.cashes);

			$http.post('inc/transactions.php', $.param({
				stock : GetURLParameter.GetURLParameter('stock'),
				journal : journal,
				journal_id : journal_id,
				trans : tran
			}), {
				headers : {
					'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
				}
			}).success(function(data) {
				//alert(data+"success");

				localStorage.clear();
			});
			
			$http.post('inc/functions.php', $.param({
				stat : "close",
				count : $rootScope.cash_num,
				stock : GetURLParameter.GetURLParameter('stock')
			}), {
				headers : {
					'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
				}
			}).success(function(data) {
				localStorage.clear();
			});
		}

		$scope.itra_calc = function() {

			var item = $rootScope.itra;
			/*if(item<0){
			 return item*-1;
			 }*/
			return item;
		}
	            $scope.close_k = function () {
	            	if($rootScope.right_pass==1||$rootScope.premission_list['permission_openclose_kupa']=='on'){
 				$rootScope.right_pass=0;
 				
 			
                var x = 0;
//              lc 20/03/2016 close kupa with internet online
                var display= document.getElementById('error_internet_connect').style.display;
                if (display!="none") { 
                	 $scope.call_alert_site('אין אינטרנט!! לא ניתן לבצע סגירת קופה.', 0, '');
       			 	 x = 1;
           			 return;
                }
                angular.forEach($scope.cashes, function (obj) {
                    if (obj.pause === 1) {
                        $scope.call_alert_site('עסקאות בהשהייה פתוחות!', 0, '');
                        x = 1;
                        return;
                    }
                });
                if (x == 1) {
			    	return;
			    }
                $rootScope.action = "close_k";
                $scope.call_alert_site('האם ברצונך לסגור את הקופה?', 4, '');
                }
 			else{
 				$rootScope.action="close_k";
 				alert.alert_site('משתמש לא מורשה',3,1);
 			}	
            }
            

		$rootScope.isdisabled = false;
		$rootScope.transtype = 0;

		$rootScope.kupa_num = journal * 10000;
		local.setLocal('kupa_num', $rootScope.kupa_num);

		/*if(localStorage.getItem('kupa_num')===null){

		 $rootScope.kupa_num=journal*10000;
		 local.setLocal('kupa_num',$rootScope.kupa_num);
		 }
		 else{
		 $rootScope.kupa_num=parseInt(localStorage.getItem('kupa_num'));
		 $rootScope.kupa_num++;
		 }*/

		if (localStorage.getItem('cash_num') === null) {
			$rootScope.cash_num = 1;
			$rootScope.cash_kupanum = $rootScope.kupa_num + 1;
		} else {
			$rootScope.cash_num = parseFloat(localStorage.getItem('cash_num'));
			$rootScope.cash_kupanum = $rootScope.kupa_num + $rootScope.cash_num;
		}
		$scope.datec = new Date();
		$scope.cashes = {};
        $rootScope.send_cashes={};
        /*lc 22/03/2016 save exchange print document offline */
        $rootScope.print_offline_exchange = {};
        /*lc 22/03/2016 save invoice print document offline */
        $rootScope.print_offline_invoice = {};
		$rootScope.tab = 1;
           /*sk 02/03/2016 view product or calculator*/
           var aaa=$("#show_div_prod").val();
           if(aaa==1){
           	  $rootScope.tab = 2;
           }

		$scope.call_setTab = function(newValue) {
			dolog('', 707, 'call_setTab');
			tabs.setTab(newValue);
			dolog('', 707, 'end call_setTab');
		}
		
		$scope.call_setCountIndex = function(newValue) {
			$rootScope.count_index = newValue;
			str=".calc_numbers.rightcenter.calc_area";
			   		$(str).css({'z-index':'9999999','position':'absolute'});
				    $(str).css({'display':'block'});
					//if(typeof android!='undefined'){
						$(this).blur();
		}
		$scope.calc_doit =function() {
    var x = $('.calc_numbers .calc_result').val();
    var t = $('input[name=flag_focusedk]:hidden').val();
   /*sk 17/12/2015 additional in prepaid*/
    if(t=='.text.prepaidload_sum'){
    	  $.ajax({
            type: "POST",
            url: "inc/functions.php",
            data: {
                calc_prepaid_amount: 1,
                 prepaid_sum1122: x
            },
            success: function (msg) {
            	/*sk 20/12/15 addition in prepaid*/
				$('.additional').val(msg);
				$('.sum_additional').val(msg);
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {

            }
        });
    }
    $(t).val(x);
    $(' .calc_result').val('');
    $(".calc_numbers").hide();
    if (t.indexOf('prepaidload_sum') > -1) {
        $(".card_visibility").focus();
    }

}
		
		$scope.change_count = function(){
			if($rootScope.count_index != undefined && $rootScope.count_index != -1){
				var x=$('.calc_numbers .calc_result').val();
				
				$('.input_result input[name=Input]').val("");
				cash_global.products.filter(function( obj ) {
					if(obj.index === $rootScope.count_index){
						var sum = (x-obj['Amount']) * (obj['SalePrice'] - obj['Discount']);
						if(obj.SalePrice < 0){
							$rootScope.numprod_zchut+= (x-obj['Amount']);	
					   		$rootScope.numprod_zchut_cash+=(x-obj['Amount']);
					   			$rootScope.countprod+= (x-obj['Amount']);	
							
							if(obj.cdisctype==1){
								discount2=(parseFloat(obj.discountperc));/*sk 26/11 fix bug in calc anacha*/
								sum+=(parseFloat(discount2) * (x-obj['Amount']));
								obj.discountamount=parseFloat(obj.discountamount)-(discount2 * (x-obj['Amount']));
								obj.Discount=parseFloat(obj.Discount)-(discount2 * (x-obj['Amount']));
								obj.Discount2=parseFloat(obj.Discount2)-(discount2 * (x-obj['Amount']));
							}	
							$rootScope.amount=(parseFloat($rootScope.before_global_dis)+parseFloat(sum)).toFixed(2);
							$rootScope.before_global_dis=(parseFloat($rootScope.before_global_dis)+parseFloat(sum)).toFixed(2);/*sk 11/10 add count of zicuy ptroduct*/
							if($rootScope.isMoadon){
								$rootScope.amount=($rootScope.amount*$rootScope.global_dis).toFixed(2);1
								
							}
							
							
			              $rootScope.amount_maam = (($rootScope.amount * 17)/117).toFixed(2);
			              $rootScope.amount_out= ($rootScope.amount-$rootScope.amount_maam).toFixed(2);
							$rootScope.original_afterprod=total.getTotal();	
							obj['Amount']=parseInt(x);
							
						}
						else{
							$rootScope.numprod_hova+= (x-obj['Amount']);	
					   		$rootScope.numprod_hova_cash+= (x-obj['Amount']);		
					   		$rootScope.countprod+= (x-obj['Amount']);	
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
				              obj['Amount']=parseInt(x);
							$rootScope.original_afterprod=total.getTotal();	
						}
						local.setLocal('products',cash_global.products);
					}
			});
		}
		$rootScope.count_index = -1;
		$rootScope.check_discounts();
		}
		
		$scope.addCategory = function(newValue) {

	 		
			$rootScope.addCategory = true;
		}

		$scope.call_isSet = function(tabName) {
			/* if($('.prod_search4 .prod_container .prod').length == 1){
			 $('.prod_search4 .prod_container .prod div').click();
			 }*/
			return tabs.isSet(tabName);
		}
		$scope.call_isSetMulti = function(tabName1, tabName2, tabName3, tabName4, tabName5, tabName6, tabName7) {
			return tabs.isSetMulti(tabName1, tabName2, tabName3, tabName4, tabName5, tabName6, tabName7);
		}
		$scope.call_isSetMultiCalc = function(tabName1, tabName2) {
			return tabs.isSetMulti(tabName1, tabName2);
		}

		$rootScope.amount = 0.00;
		$rootScope.original = 0.00;
		$rootScope.amount_maam = 0.00;
		$rootScope.amount_out = 0.00;

		if (localStorage.getItem('cashes') !== null) {
			cash_global.cashes = JSON.parse(localStorage.getItem('cashes'));
			/*for(var k in cash_global.cashes) {
			 cash_global.cashes[k]['products']=JSON.parse(cash_global.cashes[k]['products']);
			 }*/
		}
		$scope.cashes = cash_global.cashes;

		$rootScope.refund = 0;
		$rootScope.zicuy = function() {
			if ($rootScope.right_pass == 1 || $rootScope.premission_list['permission_zicuy'] == 'on') {
				$rootScope.right_pass = 0;
				$('.zicuy').toggleClass("zicuy_zctive");
				if($rootScope.refund == 1){
					writelog("ביטול פעולת זיכוי");
					$rootScope.refund = 0;
				}
				else{
					$rootScope.refund=1;
					writelog(" פעולת זיכוי");
				}
			} else {
				$rootScope.action = "zicuy";
				$rootScope.selector = '';
				alert.alert_site('משתמש לא מורשה', 3, 1);
			}
		};
		
	
		$scope.start_clock = function() {
			if ($rootScope.right_pass == 1 || $rootScope.premission_list['permission_hours'] == 'on') {
				$rootScope.right_pass = 0;
				str = ".clock,.pop_clock";
				popup = ".an,.pop_clock";
				$("div[name=clock_display]").show();
				$("div[name=clock_display2]").empty();
				$(".worker_details").empty();
				$("#num_worker2").focus();
				openwindows.openwrap(str, popup);
				$("#num_worker2").focus();
			} else {
				$rootScope.action = "start_clock";
				$rootScope.selector = '';
				alert.alert_site('משתמש לא מורשה', 3, 1);
			}
		}
		$scope.menuclick = function(url) {
			if ($rootScope.premission_list['permission_backoffice'] == 'on') {
				location.href = url;
			} else {
				alert.alert_site('משתמש לא מורשה', 1, 1);
			}
		}
		/*$rootScope.$watch('amount', function() {
		 if
		 $rootScope.amount2=$rootScope.amount;
		 $rootScope.amount=($rootScope.amount*0.5).toFixed(2);
		 });*/

		$rootScope.checkend = function() {
			$scope.$apply();
			/* ||($rootScope.amount<0&&$rootScope.itra==0) */
			if ($rootScope.itra == 0 ||(($rootScope.itra <= 0 || $rootScope.mezumanitra <= 0)&&$rootScope.amount>0)) {
				openwrap2('checkend', '.type_pay.container_pop');
				writelog("סיום חשבון: "+$rootScope.cash_num);
				writelog("---------------------------------------");
				$rootScope.end_cash(0);
			}
			
		};

		$rootScope.end_cash = function(ispause) {
			writelog("----------------in end_cash function in office-----------------------");
			if(ispause==1){
				writelog("השהיית עיסקה: "+$rootScope.cash_num)
			}
			$rootScope.interval=true;
			var xx = new Date(); // for now

			//$(".loading").show();
			if (ispause == 1 && $rootScope.amount == 0) {
				$scope.call_alert_site('אין אפשרות לבצע השהיה, אין מוצרים בחשבון', 0, '');
				return;
			}
			if ($rootScope.cash_num_pause != -1) {
				 // delete cash_global.cashes['cash_num' + $rootScope.cash_num_pause]; //sk 12/01/16 pause chess
                    delete cash_global.cashes['cash_num' + $rootScope.cash_num_pause+'*'];
				$rootScope.cash_num_pause = -1;
			}
			$rootScope.cash_num_pause = -1;
			var today = new Date();
			var dd = today.getDate();
			var mm = today.getMonth() + 1;
			//January is 0!
			var yyyy = today.getFullYear();

			if (dd < 10) {
				dd = '0' + dd
			}

			if (mm < 10) {
				mm = '0' + mm
			}
			var d = new Date();
			h = d.getHours();
			m = d.getMinutes();
			s = d.getSeconds();
			d = h + ':' + m + ':' + s;
			dflag=d;
			today = mm + '/' + dd + '/' + yyyy;
			today2 = dd + '/' + mm + '/' + yyyy;
			var round = 0.00;
			//round=round-$rootScope.amount;
			if ($rootScope.discounttype == 1) {
				//var discountperc=$rootScope.new1;
				var discountperc = $rootScope.disccperc;
				var discountamount = $rootScope.new2;
			} else if ($rootScope.discounttype == 2) {
				var discountperc = $rootScope.new2;
				//var discountperc=$rootScope.new1;
				var discountperc = $rootScope.disccperc;
			} else {
				$rootScope.discounttype = 0;
			}
			if ($rootScope.itra < 0) {
				$rootScope.itraAbs = parseFloat($rootScope.itra) * -1;
			} else {
				$rootScope.itraAbs = $rootScope.itra;
			}
					//$rootScope.itraAbs = Math.round($rootScope.itraAbs);
			/*if($rootScope.itraAbs!="0"&&$rootScope.itraAbs!="0.00"){
				if($rootScope.itraAbs.toString()[($rootScope.itraAbs.toString()).length-1]==5){
					$rootScope.itraAbs=($rootScope.itraAbs-0.05).toFixed(2);
				}
				else{
					$rootScope.itraAbs = parseFloat($rootScope.itraAbs).toFixed(1);
				}					
				
			}*/
			   /*sk 21/21/2015 fix bug in round agorot*/
                whith_agorot=1;//check if there is 5 agorot
                if($rootScope.itraAbs.toString().indexOf('.') === -1){
                	whith_agorot=0;
                }
                if ($rootScope.itraAbs != "0" && $rootScope.itraAbs != "0.00") {
                    if ($rootScope.itraAbs.toString()[($rootScope.itraAbs.toString()).length - 1] == 5 && ($rootScope.itraAbs.toString()).length>1 && whith_agorot==1) {
                      $rootScope.itraAbs = ($rootScope.itraAbs - 0.05).toFixed(1);
                       
                        $rootScope.itraAbs = parseFloat($rootScope.itraAbs).toFixed(2);
                    }
                    else {
                        $rootScope.itraAbs = parseFloat($rootScope.itraAbs).toFixed(1);
                    }

                }
			$rootScope.finalltash["all"]=(parseFloat($rootScope.finalltash["all"])-parseFloat($rootScope.itraAbs)).toFixed(2);
			$rootScope.finalltash["cash"]=(parseFloat($rootScope.finalltash["cash"])-parseFloat($rootScope.itraAbs)).toFixed(2);
			if($rootScope.itra<0){
				$rootScope.finalltash["cash1"]["hova"]=(parseFloat($rootScope.finalltash["cash1"]["hova"])-parseFloat($rootScope.itraAbs)).toFixed(2);
			}
			else{
				$rootScope.finalltash["cash1"]["zicuy"]=(parseFloat($rootScope.finalltash["cash1"]["zicuy"])+parseFloat($rootScope.itraAbs)).toFixed(2);
			}
			local.setLocal('finalltash', $rootScope.finalltash);
			/*sk 12/01/16 pause chess*/
			var pause_string="";
			var cash_num_help = $rootScope.cash_num;
            if(ispause==1){
            	pause_string='*';
            	
        	/*sk 23/02/2016 fix bug in pause chess one after  one*/
            	/*if do pause chess after pause chess. we have to save whith other number*/
            	var cash_num_back=0;
            	var test_exist_pause=$scope.cashes['cash_num' + $rootScope.cash_num+pause_string];//check if there are object in puase whith the same number
            	if(test_exist_pause!=undefined){
            		 cash_num_back=$rootScope.cash_num;//save the cash num number
            		$rootScope.cash_num=$rootScope.cash_num*1000; //change the tran number
            		test_exist_pause=$scope.cashes['cash_num' + $rootScope.cash_num+pause_string];
            		while(test_exist_pause!=undefined){/*if they do many pause one after one*/
            			$rootScope.cash_num=$rootScope.cash_num+1;
            			test_exist_pause=$scope.cashes['cash_num' + $rootScope.cash_num+pause_string];
            		}
            	} 
            	           	
            }
			$scope.cashes['cash_num' + $rootScope.cash_num+pause_string] = {};
			$scope.cashes['cash_num'+$rootScope.cash_num+pause_string]['products'] = JSON.parse(localStorage.getItem('cash' + cash_num_help + '_' + 'products'));
			$scope.cashes['cash_num'+$rootScope.cash_num+pause_string]['payments'] = JSON.parse(localStorage.getItem('cash' + cash_num_help + '_' + 'payment'));
			//$scope.cashes['cash_num'+$rootScope.cash_num]['worker']=localStorage.getItem('cash'+$rootScope.cash_num+'_'+'worker');
			//$scope.cashes['cash_num'+$rootScope.cash_num]['amount']=$rootScope.amount;
			//$scope.cashes['cash_num'+$rootScope.cash_num]['amount_maam']=$rootScope.amount_maam;
			//$scope.cashes['cash_num'+$rootScope.cash_num]['amount_out']=$rootScope.amount_out;
			$scope.cashes['cash_num'+$rootScope.cash_num+pause_string]['paid'] = $rootScope.paid;
			$scope.cashes['cash_num'+$rootScope.cash_num+pause_string]['itra'] = $rootScope.itra;
			$scope.cashes['cash_num'+$rootScope.cash_num+pause_string]['date'] = today;
			$scope.cashes['cash_num'+$rootScope.cash_num+pause_string]['time'] = d;
			$scope.cashes['cash_num'+$rootScope.cash_num+pause_string]['index'] = $rootScope.index;
			$scope.cashes['cash_num'+$rootScope.cash_num+pause_string]['pause'] = ispause;
			$scope.cashes['cash_num'+$rootScope.cash_num+pause_string]['countprod'] = $rootScope.countprod;
			$scope.cashes['cash_num'+$rootScope.cash_num+pause_string]['another_shovar'] = $rootScope.another_shovar;
			$scope.cashes['cash_num'+$rootScope.cash_num+pause_string]['isMoadon'] = $rootScope.isMoadon;/*sk 09/09 pause ches*/
			
			$scope.cashes['cash_num'+$rootScope.cash_num+pause_string]['cash_num'] = $rootScope.cash_num;
			$scope.cashes['cash_num'+$rootScope.cash_num+pause_string]['original'] = cash_global.original;
			//$scope.cashes['cash_num'+$rootScope.cash_num]['new1']=cash_global.new1;
			//$scope.cashes['cash_num'+$rootScope.cash_num]['anacha']=cash_global.anacha;
			$scope.cashes['cash_num'+$rootScope.cash_num+pause_string]['SearchClient'] = $rootScope.SearchClient;

			$scope.cashes['cash_num'+$rootScope.cash_num+pause_string]['group_discount'] = $rootScope.SearchClient['group_p'];
			$scope.cashes['cash_num'+$rootScope.cash_num+pause_string]['type_group_discount'] = 2;
			/*sk 22/03/16*/
			$scope.cashes['cash_num'+$rootScope.cash_num+pause_string]['update_in_db'] = 0;
			var firstamount = 0;
			for (var i = 0; i < cash_global.products.length; i++) {
				var product = cash_global.products[i];
				firstamount += product.SalePrice * product.Amount;
			}
			
			
			/* var mezuman=$scope.cashes['cash_num'+$rootScope.cash_num]['payments']['cash'][0]['amount'];
			if(mezuman>$rootScope.itraAbs){
			$rootScope.mezumancharge=$rootScope.itraAbs;
			}
			else{
			$rootScope.mezumancharge=mezuman;
			}*/
			//$rootScope.mezumanin=(parseFloat($rootScope.mezumanin)+parseFloat($rootScope.mezumanin1)).toFixed(2);
			//$rootScope.mezumanout=(parseFloat($rootScope.mezumanout)+parseFloat($rootScope.mezumancharge)).toFixed(2);
			$rootScope.mezumanin = 0;
			$rootScope.mezumanout = 0;
			local.setLocal('z-mezumanout', $rootScope.mezumanout);

			var x = 9 - parseInt($rootScope.cash_kupanum.toString().length);
			var cash_kupanum = $rootScope.cash_kupanum;
			for (var i = 0; i < x; i++) {
				cash_kupanum = "0" + cash_kupanum.toString();
			};
			$scope.cashes['cash_num'+$rootScope.cash_num+pause_string]['prepaid2']=($rootScope.prepaid==1)?1:0;
			if ($rootScope.prepaid == 1) {
				
				$.post( "inc/functions.php", { prepaid_sum2: $rootScope.amount, prepaid_num2: $rootScope.prepaidload_num })
				  .done(function( data ) {
				    		if(data==-1){
								 writelog('בעיה בחיוב האשראי');
								$scope.call_alert_site('בעיה בחיוב האשראי', 0, '');
							}
							else {
								$rootScope.prepaid = 0;
								$(".prepaid_disabled").removeAttr('disabled');
							}
				  });
				  
				/*$.ajax("inc/functions.php?prepaid_sum2=" + $rootScope.amount + "&prepaid_num2=" + $rootScope.prepaidload_num, {
					async : false
				}).success(function(data) {
					if (data == -1) {
						alert('בעיה בחיוב האשראי');
						$scope.call_alert_site('בעיה בחיוב האשראי', 0, '');
					} else {
						$rootScope.prepaid = 0;
						$(".prepaid_disabled").removeAttr('disabled');
					}
				}); */

			}
			$scope.cashes['cash_num'+$rootScope.cash_num+pause_string]['firstamount'] = firstamount;
			$scope.cashes['cash_num'+$rootScope.cash_num+pause_string]['finalamount'] = $rootScope.amount;
			var amount_help = $rootScope.amount;
			$scope.cashes['cash_num'+$rootScope.cash_num+pause_string]['amountbeforevat'] = $rootScope.amount_out;
			$scope.cashes['cash_num'+$rootScope.cash_num+pause_string]['round'] = round;
			$scope.cashes['cash_num'+$rootScope.cash_num+pause_string]['vat'] = $rootScope.amount_maam;
			$scope.cashes['cash_num'+$rootScope.cash_num+pause_string]['discount_sale'] = $rootScope.discount_sale;

			$scope.cashes['cash_num'+$rootScope.cash_num+pause_string]['discounttype'] = $rootScope.discounttype;
			$scope.cashes['cash_num'+$rootScope.cash_num+pause_string]['discountperc'] = discountperc;
			$scope.cashes['cash_num'+$rootScope.cash_num+pause_string]['discountamount'] = discountamount;
			$scope.cashes['cash_num'+$rootScope.cash_num+pause_string]['cashierid'] = localStorage.getItem('cash' + cash_num_help + '_' + 'worker');
			$scope.cashes['cash_num'+$rootScope.cash_num+pause_string]['customerid'] = $rootScope.SearchClient['ID'];
			$scope.cashes['cash_num'+$rootScope.cash_num+pause_string]['change'] = $rootScope.itraAbs;
			$scope.cashes['cash_num'+$rootScope.cash_num+pause_string]['comment'] = $rootScope.comment;
			$scope.cashes['cash_num'+$rootScope.cash_num+pause_string]['commentClass'] = $rootScope.commentClass;
			$scope.cashes['cash_num'+$rootScope.cash_num+pause_string]['cash_kupanum'] = cash_kupanum.toString();
			$scope.cashes['cash_num'+$rootScope.cash_num+pause_string]['transtype'] = $rootScope.transtype;
			$scope.cashes['cash_num'+$rootScope.cash_num+pause_string]['before_global_dis'] = $rootScope.before_global_dis;
			$scope.cashes['cash_num'+$rootScope.cash_num+pause_string]['original_afterprod'] = $rootScope.original_afterprod;
			$scope.cashes['cash_num'+$rootScope.cash_num+pause_string]['another_shovar'] = $rootScope.another_shovar;
			//$scope.cashes['cash_num'+$rootScope.cash_num]['prepaid2']=($rootScope.prepaid==1)?1:0;
			local.setLocal('cashes', $scope.cashes);
			//local.setLocal('cash_num', $rootScope.cash_num);
			  /*sk 23/02/2016 fix bug in pause chess one after one*/
           	if(cash_num_back>0 && ispause == 1){
            	$rootScope.cash_num=cash_num_back;
            	cash_num_back=0;
          	 }
			local.setLocal('cash_num', $rootScope.cash_num+1);/*sk 23/12/15 fix bug in*/

			$scope.cashes2 = {};
			$scope.cashes2['cash_num' + $rootScope.cash_num] = $scope.cashes['cash_num' + $rootScope.cash_num];
			tran = JSON.stringify($scope.cashes2);
			tran2=$scope.cashes2['cash_num' + $rootScope.cash_num];
			cash_numf=$rootScope.cash_num;
			flag_send_cashes=0;
			//$rootScope.action
			  writelog("$rootScope.action =  "+$rootScope.action); //lc 27/06/2016 wrire to log
		  	  writelog("ispause =  "+ispause);                     //lc 27/06/2016 wrire to log
              
			            if ($rootScope.action != 'del_cash' && ispause != 1){
	                //set parameters for X report
	                //all payment
	                /*if($rootScope.transtype !=1 && $rootScope.prepaid !=1 && $rootScope.amount>0){*/
	                	$rootScope.finalltash2["all"]=$rootScope.finalltash2["all"]?(parseFloat($rootScope.finalltash2["all"])+parseFloat($rootScope.amount)).toFixed(2):$rootScope.amount;//the all tashlumim
	                /*}*/
	                //all payment on credit
	                
	                //add the payments
	                payments1 = cash_global.payments_type;
	                // writelog("payments1 =  "+payments1); //lc 27/06/2016 wrire to log
	                        for (var key in payments1) {
	                                if (payments1.hasOwnProperty(key))
	                                
	                                    for (j = 0; j < payments1[key].length; j++) {
	                                        payment1 = payments1[key][j];
	                                        //בתשלום בהקפה או בשובר זיכוי לא מוסיפים את הסכום לסכום הכללי
	                                            if(key=='shovarzicuy'){
	                                            	if(payment1.amount>0){
	                                            		$rootScope.finalltash2["all"]=$rootScope.finalltash2["all"]?(parseFloat($rootScope.finalltash2["all"])-parseFloat($rootScope.amount)).toFixed(2):$rootScope.amount;
	                                            	}
	                                            	else{
	                                            		$rootScope.finalltash2["all"]=$rootScope.finalltash2["all"]?(parseFloat($rootScope.finalltash2["all"])+parseFloat($rootScope.amount)*-1).toFixed(2):$rootScope.amount;
	                                            	}
	                                            }
	                                            if(key =='akafa'){
	                                            	$rootScope.finalltash2["akafa"]=(parseFloat($rootScope.finalltash2["akafa"])+parseFloat($rootScope.amount)).toFixed(2);
	                                            	if(payment1.amount>0){
	                                            		$rootScope.finalltash2["all"]=$rootScope.finalltash2["all"]?(parseFloat($rootScope.finalltash2["all"])-parseFloat($rootScope.amount)).toFixed(2):$rootScope.amount;
	                                            	}
	                                            	else{
	                                            		$rootScope.finalltash2["all"]=$rootScope.finalltash2["all"]?(parseFloat($rootScope.finalltash2["all"])+parseFloat($rootScope.amount)*-1).toFixed(2):$rootScope.amount;
	                                            	}
	                                            }
	                                            if(key=='credit'){
	                                            	//add to credit type global
	                                            	//$rootScope.finalltash2['credit']=(parseFloat($scope.finalltash2['credit'])+parseFloat(payment1.amount)).toFixed(2);
	                                            	//clearinghouseCompany type of credit
	                                            	//debet
	                                            	if($rootScope.amount>0){
	                                            		$rootScope.finalltash2.credit2[payment1['clearinghouseCompany']]['DEBIT']=(parseFloat($rootScope.finalltash2.credit2[payment1['clearinghouseCompany']]['DEBIT'])+Math.abs(parseFloat(payment1.amount))).toFixed(2);
	                                            		writelog("הוספה לדוח debit"+Math.abs(parseFloat(payment1.amount)));
	                                            	}
	                                            	//credit
	                                            	else{
	                                            		$rootScope.finalltash2.credit2[payment1['clearinghouseCompany']]['CREDIT']=(parseFloat($rootScope.finalltash2.credit2[payment1['clearinghouseCompany']]['CREDIT'])+Math.abs(parseFloat(payment1.amount))).toFixed(2);
	                                            		writelog("הוספה לדוח credit"+Math.abs(parseFloat(payment1.amount)));

	                                            	}
	                                            }
	                                            if(key!='akafa' && key!='prepaid'){
												
												 // ----------------------lc 27/06/2016 start write to log------------------------
	                                            	writelog("#####################################");
	                                            	writelog("one row befor sum to all ");	
	                                            	writelog("all = " +parseFloat($scope.finalltash2[key]));
	                                            	writelog("sum to add = " +parseFloat(payment1.amount)); 
                                                    writelog("#####################################");
                                                    // ----------------------lc 27/06/2016 end write to log---------------------------
													
												
													$rootScope.finalltash2[key]=(parseFloat($scope.finalltash2[key])+parseFloat(payment1.amount)).toFixed(2);
													if($rootScope.amount>0){
														$rootScope.finalltash2[key+'1']['hova']=(parseFloat($rootScope.finalltash2[key+'1']['hova'])+parseFloat(payment1.amount)).toFixed(2);
														writelog("************************************");
														writelog($rootScope.finalltash2[key+'1']['hova']);
														writelog("הוספה לדוח "+parseFloat(payment1.amount));
														writelog(key);
														writelog($rootScope.finalltash2[key+'1']['hova']);
														writelog("************************************");
													} 
													else{
														writelog("************************************");
														writelog($rootScope.finalltash2[key+'1']['zicuy']);
														$rootScope.finalltash2[key+'1']['zicuy']=(parseFloat($rootScope.finalltash2[key+'1']['zicuy'])+parseFloat(payment1.amount)*-1).toFixed(2);
													
														writelog("הוספה לדוח "+parseFloat(payment1.amount)*-1);
														writelog($rootScope.finalltash2[key+'1']['zicuy']);
														writelog("************************************");
	
													}
												}
												if(key=='prepaid'){
														writelog("************************************");
														writelog($rootScope.finalltash2['prepaid']);
														writelog("הוספה לדוח prepaid "+parseFloat(payment1.amount));
												
													$rootScope.finalltash2['prepaid']=(parseFloat($rootScope.finalltash2['prepaid'])+parseFloat(payment1.amount)).toFixed(2);
														writelog($rootScope.finalltash2['prepaid']);
														writelog("************************************");
													$rootScope.finalltash2["all"]=(parseFloat($rootScope.finalltash2['all'])-parseFloat(payment1.amount)).toFixed(2);
													
												}
												//hakafa
												if($rootScope.transtype==1){
													writelog("************************************");
														writelog($rootScope.finalltash2['prepaid']);
														writelog("הוספה לדוח prepaid"+parseFloat(payment1.amount));
													$rootScope.finalltash2['akafadebt']['general']=(parseFloat($rootScope.finalltash2['akafadebt']['general'])+parseFloat(payment1.amount)).toFixed(2);
													$rootScope.finalltash2['akafadebt'][key]=(parseFloat($rootScope.finalltash2['akafadebt'][key])+parseFloat(payment1.amount)).toFixed(2);
													
												}
											 	if($rootScope.prepaid==1){
											 		
			    									$rootScope.finalltash2['prepaiddebt'][key]=(parseFloat($scope.finalltash2['prepaiddebt'][key])+parseFloat(payment1.amount)).toFixed(2); 
			    									$rootScope.finalltash2['prepaiddebt']['general']=(parseFloat($scope.finalltash2['prepaiddebt']['general'])+parseFloat(payment1.amount)).toFixed(2);  
			    								}
			    									
												
	                                    }
	
	                            }
	                            //הורדת העודף מתקבולים במזומן
	                            if($rootScope.itraAbs>0){
	                            	if($rootScope.amount > 0){
	                            		writelog("************************************");
										writelog($rootScope.finalltash2['cash']);
	                            		$rootScope.finalltash2['cash']=(parseFloat($scope.finalltash2['cash'])-parseFloat($rootScope.itraAbs)).toFixed(2);
	                            		
										writelog("הוספה לדוח עודף"+(parseFloat($rootScope.itraAbs)*-1));
	                            		$rootScope.finalltash2['cash1']['hova']=(parseFloat($rootScope.finalltash2['cash1']['hova'])-parseFloat($rootScope.itraAbs)).toFixed(2);
	                            		writelog($rootScope.finalltash2['cash']);
	                            		writelog("************************************");
	                            	}
	                            	else{
	                            		$rootScope.finalltash2['cash1']['hova']=(parseFloat($rootScope.finalltash2['cash1']['hova'])-parseFloat($rootScope.itraAbs)).toFixed(2);
	                            	}
	                            }
	                 //count product in zchut and hova
	               	 for (var i = 0; i < cash_global.products.length; i++) {
	 					 var product = cash_global.products[i];
						 if(product.SalePrice > 0){
						 	$rootScope.finalltash2['numprod_hova']=$rootScope.finalltash2['numprod_hova']+product.Amount;
						 }
						 else{
						 	
						 	$rootScope.finalltash2['numprod_zchut']=$rootScope.finalltash2['numprod_zchut']+product.Amount;
						 }
               	 }
                
             
                
                	localStorage.setItem('finalltash2', JSON.stringify($rootScope.finalltash2));
               }
			
			if(ispause!=1){
				if($scope.cashes['cash_num'+$rootScope.cash_num+pause_string]['cashierid'] == null && typeof $rootScope.SearchWorker.WorkerNum != 'undefined'){
					$scope.cashes['cash_num'+$rootScope.cash_num+pause_string]['cashierid'] = $rootScope.SearchWorker.WorkerNum;
					$scope.cashes2 = {};
					$scope.cashes2['cash_num' + $rootScope.cash_num] = $scope.cashes['cash_num' + $rootScope.cash_num];
					tran = JSON.stringify($scope.cashes2);
					tran2=$scope.cashes2['cash_num' + $rootScope.cash_num];
				}
				$http.post('inc/transactions.php', $.param({
					stock : GetURLParameter.GetURLParameter('stock'),
					journal : journal,
					journal_id : journal_id,
					trans : tran,
					cust : $rootScope.SearchClient['ID']
				}), {
					headers : {
						'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
					}				
				}).success(function(data) {
					$(".loading").hide();
					/*sk 22/03/2016*/
					tran_test=tran2;
					cashes21=localStorage.getItem('cashes');
					cashes34=JSON.parse(cashes21);
					
					//JSON.stringify
					cashes34['cash_num'+cash_numf]['update_in_db']=1;
					localStorage.setItem('cashes',JSON.stringify(cashes34));
					local.setLocal('cashes', cashes34);					
					tran=JSON.stringify($rootScope.send_cashes);
					$http.post('inc/transactions.php', $.param({
						stock : GetURLParameter.GetURLParameter('stock'),
						journal : journal,
						journal_id : journal_id,
						trans : tran, 
						offline:1,
						cust : $rootScope.SearchClient['ID']
					}), {
						headers : {
							'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
						}				
					}).success(function(data) {
						flag_send_cashes=1;
	                    $rootScope.send_cashes = {};
	                    localStorage.setItem('send_cashes', JSON.stringify($rootScope.send_cashes));
						$(".loading").hide();
						/*30/8/15 sk*/
						writelog('ajax succes');
						
						$rootScope.send_cashes={};
						localStorage.setItem('send_cashes', JSON.stringify($rootScope.send_cashes));
					}).error(function(){
						
					});
				}).error(function(){
					$rootScope.send_cashes['cash_num' + cash_numf]=tran2; 
					localStorage.setItem('send_cashes', JSON.stringify($rootScope.send_cashes));
					/*30/8 sk*/
					writelog('ajax error');
				});
				 if(flag_send_cashes==1){
                	$rootScope.send_cashes = {};
                }
                
                 //create achlafa paper- copy and save it in documents copy table
                 
                  var b = [];
                var num2=31;
     
		 for (var i = 1; i < 4; i++) {
		 	 var l=0;
              b[i] = [];
      
        		b[i][l]="";
				l++;
				if(i==3){
					b[i][l]='<table style="font-family: Courier New;font-size: 15;font-weight: bold;direction: rtl;width: 250px;margin-left: 5px;">';
					l++;
					 if($rootScope.details_list.logo!=""){ //lc 24/07/2016 add logo
    	             b[i][l] = $rootScope.txtCenter("https://office.yedatop.com/officefiles/"+user_name+"/_MlaitekPro/"+$rootScope.details_list.logo,i); //lc 21/07/2016
		             l++;
                 }
				}
				b[i][l]=$rootScope.txtCenter($rootScope.details_list.name,i);
				l++;
        		
					if($rootScope.details_list.tz!=""){
        	
			b[i][l] = $rootScope.txtCenter(" ע.מ./ח.פ.:"+$rootScope.details_list.tz,i);
			l++;
           
        }
				if($rootScope.details_list.address!="" && $rootScope.details_list.print_address == '1'){
        	
			b[i][l] = $rootScope.txtCenter(" כתובת:"+$rootScope.details_list.address,i);
			l++;
          
        }
        if($rootScope.details_list.mikud!="" && $rootScope.details_list.print_mikud == '1'){
        	
			b[i][l] = $rootScope.txtCenter(" מיקוד:"+$rootScope.details_list.mikud,i);
			l++;
          
        }
				if($rootScope.details_list.tel!="" && $rootScope.details_list.print_tel == '1'){
        
			b[i][l] =$rootScope.txtCenter(" טלפון:"+$rootScope.details_list.tel,i);
			l++;
           
        }
        
        
        if($rootScope.details_list.fax!="" && $rootScope.details_list.print_fax == '1'){
        	
			b[i][l] = $rootScope.txtCenter(" פקס:"+$rootScope.details_list.fax,i);
			l++;
           
        }
        if($rootScope.details_list.mail!="" && $rootScope.details_list.print_mail == '1'){
        	
			b[i][l] = $rootScope.txtCenter(" אימייל:"+$rootScope.details_list.mail,i);
			l++;
          
        }
        if ($rootScope.details_list.web != "" && $rootScope.details_list.print_web == '1') {
            //a[i][l] = "";
            //l++;
            b[i][l] = $rootScope.txtCenter(" אתר אינטרנט:" + $rootScope.details_list.web, i);
            l++;
            //  p=p+"\n"+$rootScope.txtCenter(" דוא\"ל:"+$rootScope.details_list.mail);
        }

				b[i][l]=$rootScope.txtCenter("פתק החלפה",i);
				l++;	
				b[i][l]=$rootScope.txtCenter(cash_kupanum,i);
				l++;
				b[i][l]=$rootScope.itemLine($('#current_date').html(), $('#curr_date').html(), i);
				l++;						
				products=cash_global.products;
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
				if(i==3){
					b[i][l]="</table>";
					l++;
				}
			}
			
			/*lc 22/03/2016 save exchange print document offline */
			  print_save_exchange = {};
                   c = {0: b[1], 1: removeEmptyLines(b[2]), 2: json_html(b[3])};
            
                        print_save_exchange['html'] = c[2];
                        print_save_exchange['json31'] =c[1];
                        print_save_exchange['json48'] = c[0];
                        $http.post('inc/functions.php', $.param({
                            print_save_doc: true,
                            json: JSON.stringify(print_save_exchange),
                            trannum: cash_kupanum,
                            stock: stock,
                            journal: journal,
                            journal_id: journal_id,
                            cash_num:$rootScope.cash_num,
                            type:"hachlafa"
                        }), {
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                            }
                        }).success(function (data) {
                            //alert(data);
                        }).error(function(){
                        	print_object1={};
                        	print_object1['json']=JSON.stringify(print_save_exchange);
                        	print_object1['trannum']=$rootScope.cash_num-1;
                        	print_object1['stock']=stock;
                        	print_object1['journal']=journal;
                        	print_object1['journal_id']=journal_id;
                        	print_object1['type']="hachlafa";
						   	$rootScope.print_offline_exchange[journal*1000+ $rootScope.cash_num-1]=print_object1;
						});
						
						setInterval(function () {
							if(!$.isEmptyObject($rootScope.print_offline_exchange)){
								print_offline_exchange=JSON.stringify($rootScope.print_offline_exchange);
								if(print_offline_exchange.length>2){
									$http.post('inc/functions.php', $.param({
										print_offline_exchange1: print_offline_exchange
									  },{async:false}), {
										headers : {
											'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
										}				
									}).success(function(data) {
										$rootScope.print_offline_exchange={};
									}).error(function(){
										hhhhh=1;
									});
								}
	                       }
		                }, 500);
				
			}
		
                 
		/*	$(".wrap").click(){
				$(".loading").hide();
				alert('success1');
			};*/
			/* 30/8 sk*/
			writelog("before clean in office.yeda-t.com");
			$rootScope.call_clean();
			writelog("after clean in office.yeda-t.com");
			$rootScope.another_shovar=0;
			/* sk 12/01/16 not save cash num on pause chess add the condition */
           if (ispause != 1) {
	        	$rootScope.cash_num++;
	        	$rootScope.cash_kupanum++;
           }
			var num = parseFloat($rootScope.cash_num) - 1;
			var d = new Date();
			h = d.getHours();
			m = d.getMinutes();
			s = d.getSeconds();
			d = h + ':' + m + ':' + h;
			dflag=d;
			//$scope.call_alert_site(dflag, 0, '');
			//$(".loading").hide();
			//alert('feigy');
			
			
			if (ispause != 1) {
				 	print_save = {};
                    print_save['html'] = [];
                    print_save['json31'] = [];
                    print_save['json48'] = [];
				if ( typeof android == 'undefined' && typeof android2 == 'undefined' && 1 == 0) {
					/*$http.post("receipt.php?json="+JSON.stringify($scope.cashes['cash_num'+num]),  $.param({}), {
					headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
					}).success(function(data){*/
					//$('#receipt').html(data);
					if (typeof window.external!='undefined'&& typeof window.external.print != 'undefined') {
						window.external.print();
					}
					if (amount_help < 0) {
						if (typeof window.external!='undefined'&& typeof window.external.print2 != 'undefined') {
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
				} else {
					var arr = [$rootScope.details_list, $scope.cashes['cash_num' + num], journal, stock, $rootScope.SearchWorker.SupplierName];

					sumd = 0.00;
					//Toast.makeText(getApplicationContext(), s, Toast.LENGTH_LONG).show();

					// JSONArray jsonArray=new JSONArray(s);
					// JSONObject jsonObject=jsonArray.getJSONObject(1);
					//  JSONObject details_list=jsonArray.getJSONObject(0);
					// String p=("\n"+txtCenter(details_list.getString("name"))+"\n"+txtCenter(details_list.getString("address"))+"\n");
					var a = [];
			      for (var i = 1; i < 4; i++) {
                        sumd = 0.00;/*sk 29/02/2016 */
                        a[i] = [];
                        l = 0;
                        if (i == 1) {
                            num2 = 48;
                        } else {
                            num2 = 31;
                        }
					l = 0;
					//----------------------lc 21/07/2016 add logo img--------start------------------------
					if ($rootScope.details_list.logo != "") {
                         //a[i][l] = $rootScope.details_list.logo;
                         a[i][l] = $rootScope.txtCenter('<img style="max-width:170px;width:170px;" src="https://office.yedatop.com/officefiles/'+user_name+'/_MlaitekPro/'+$rootScope.details_list.logo+'"/>',i);
                         l++;
                     }
                     //----------------------lc 21/07/2016 add logo img---------end-----------------------------
					
					 if ($rootScope.details_list.name != "") {
                                a[i][l] = "";
                                l++;
                                a[i][l] = $rootScope.txtCenter($rootScope.details_list.name, i);
                                l++;
                                //a[i][l] = "";
                                //l++;
                                //$rootScope.txtCenter($rootScope.details_list.name)
                                //p=p+"\n"+$rootScope.txtCenter($rootScope.details_list.name)+"\n";
                            }
                            if ($rootScope.details_list.tz != "") {
                                //a[i][l] = "";
                                //l++;
                                a[i][l] = $rootScope.txtCenter(" ע.מ./ח.פ.:" + $rootScope.details_list.tz, i);
                                l++;
                                // p=p+"\n"+$rootScope.txtCenter(" ע.מ./ח.פ.:"+$rootScope.details_list.tz);
                            }

                            if ($rootScope.details_list.address != "" && $rootScope.details_list.print_address == '1') {
                                //a[i][l] = "";
                                //l++;
                                a[i][l] = $rootScope.txtCenter($rootScope.details_list.address, i);
                                l++;
                                // p=p+"\n"+$rootScope.txtCenter(" כתובת:"+$rootScope.details_list.address);
                            }
                            if($rootScope.details_list.mikud!="" && $rootScope.details_list.print_mikud == '1'){
        	
								a[i][l] = $rootScope.txtCenter(" מיקוד:"+$rootScope.details_list.mikud,i);
								l++;
					          
					        }
                            if ($rootScope.details_list.tel != "" && $rootScope.details_list.print_tel == '1') {
                                //a[i][l] = "";
                                //l++;
                                a[i][l] = $rootScope.txtCenter(" טלפון:" + $rootScope.details_list.tel, i);
                                l++;
                                // p=p+"\n"+$rootScope.txtCenter(" טלפון:"+$rootScope.details_list.tel);
                            }
                            if ($rootScope.details_list.fax != "" && $rootScope.details_list.print_fax == '1') {
                                //a[i][l] = "";
                                //l++;
                                a[i][l] = $rootScope.txtCenter(" פקס:" + $rootScope.details_list.fax, i);
                                l++;
                                // p=p+"\n"+$rootScope.txtCenter(" פקס:"+$rootScope.details_list.fax);
                            }
                            if ($rootScope.details_list.mail != "" && $rootScope.details_list.print_mail == '1') {
                                //a[i][l] = "";
                                //l++;
                                a[i][l] = $rootScope.txtCenter(" דוא\"ל:" + $rootScope.details_list.mail, i);
                                l++;
                                //  p=p+"\n"+$rootScope.txtCenter(" דוא\"ל:"+$rootScope.details_list.mail);
                            }
                            if ($rootScope.details_list.web != "" && $rootScope.details_list.print_web == '1') {
                                //a[i][l] = "";
                                //l++;
                                a[i][l] = $rootScope.txtCenter(" אתר אינטרנט:" + $rootScope.details_list.web, i);
                                l++;
                                //  p=p+"\n"+$rootScope.txtCenter(" דוא\"ל:"+$rootScope.details_list.mail);
                            }
                            a[i][l] = $rootScope.txtCenter("<hr>", i);
                            l++;
                             /*if(dtoday != 'undefined' && dd1 != 'undefined'){
			                            	a[i][l] = $rootScope.itemLine(dtoday, dd1, i);
			                            }
			                            else{
			                            	a[i][l] = $rootScope.itemLine(today2, d, i);
			                            }*/
			                        a[i][l] = $rootScope.itemLine($('#current_date').html(), $('#curr_date').html(),i);
                            l++;
                            // Toast.makeText(getApplicationContext(),"feigy0",Toast.LENGTH_LONG).show();
                            amount = parseFloat($scope.cashes['cash_num' + num].finalamount);
                            // Toast.makeText(getApplicationContext(),"feigy1",Toast.LENGTH_LONG).show();
                            transtype = $scope.cashes['cash_num' + num].transtype;
                            // Toast.makeText(getApplicationContext(),"feigy2",Toast.LENGTH_LONG).show();
                            takbul = 1;
                            payments = $scope.cashes['cash_num' + num].payments;
                            //  Toast.makeText(getApplicationContext(),"feigy3",Toast.LENGTH_LONG).show();
                            cash_l = payments['cash'].length;
                            cheque_l = payments["cheque"].length;
                            credit_l = payments["credit"].length;
                            shovar_l = payments["shovar"].length;
                            akafa_l = payments["akafa"].length;
                            shovarzicuy_l = payments["shovarzicuy"].length;
                            /*sk update shovarzicuy to used 03/09*/
                            is_update = parseFloat(amount_help) > 0 ? 1 : 0;
                            if (shovarzicuy_l > 0 && is_update > 0) {//if there is apayment whith shovarzikuy

                                var shovar_num = [];
                                var index_shovar=0;
                                for (s1 = 0; s1 < shovarzicuy_l; s1++) {//for same shovarim
                                	var amount_s = payments["shovarzicuy"][s1]["amount"];
                                	if(amount_s>0){
                                       shovar_num[index_shovar] = payments["shovarzicuy"][index_shovar]["shovarzicuy_num"];
                                       index_shovar++;
                                    }
                                }
                                if (shovar_num.length > 0) {

                                    $http.post('inc/functions.php', $.param({
                                        update_shovar_to_used: JSON.stringify(shovar_num)
                                    }), {
                                        headers: {
                                            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                                        }
                                    }).success(function (data) {


                                    }).error(function () {

                                    });

                                }
                            }
                            


                            if ((cash_l + cheque_l + credit_l + shovar_l) == 0) {
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

                            a[i][l] = $rootScope.txtCenter("<br>", i);
                            l++;
                            if ($scope.cashes['cash_num' + num].prepaid2 == 1) {
                                a[i][l] = $rootScope.txtCenter("קבלה על טעינת כרטיס", i);
                                l++;
                            }
                            else {
                                if (transtype == 0) {
                                    if (amount > 0) {
                                        if (takbul == 1) {
                                            //a[i][l] = "";
                                            //l++;
                                            //a[i][l] = "";
                                            //l++;
                                            /*sk 03/03/16*/
                                            if($('#add_customer_m').val()!= ''){
                                            	string_customer='לכבוד: ';
                                            	string_customer=string_customer+$('#add_customer_m').val();
                                            	a[i][l] = $rootScope.txtCenter(string_customer, i);
                                            	l++;
                                            	
                                            }
                                            a[i][l] = $rootScope.txtCenter("חשבונית מס קבלה - מקור", i);
                                            l++;
                                            //p = p + "\n\n" + $rootScope.txtCenter("חשבונית מס קבלה",i);
                                        } else {
                                            //a[i][l] = "";
                                            //l++;
                                            //a[i][l] = "";
                                            //l++;
                                            a[i][l] = $rootScope.txtCenter("מקור- חשבונית מס", i);
                                            l++;
                                            //p = p + "\n\n" + $rootScope.txtCenter("חשבונית מס",i);
                                        }
                                    } else {
                                        //a[i][l] = "";
                                        //l++;
                                        //a[i][l] = "";
                                        //l++;
                                        a[i][l] = $rootScope.txtCenter("הודעת זיכוי", i);
                                        l++;
                                        // p = p + "\n\n" + $rootScope.txtCenter("הודעת זיכוי",i);
                                    }
                                } else {
                                    if (takbul == 1) {
                                        //a[i][l] = "";
                                        //l++;
                                        //a[i][l] = "";
                                        //l++;
                                        a[i][l] = $rootScope.txtCenter("קבלה", i);
                                        l++;
                                        // p = p + "\n\n" + $rootScope.txtCenter("קבלה",i);
                                    } else {
                                        if (shovarzicuy_l == 0) {
                                            //a[i][l] = "";
                                            //l++;
                                            //a[i][l] = "";
                                            //l++;
                                            a[i][l] = $rootScope.txtCenter("חשבונית מס - מקור", i);
                                            l++;
                                            //  p = p + "\n\n" + $rootScope.txtCenter("חשבונית מס",i);
                                        } else {
                                            if (shovar_l == 0) {
                                                //a[i][l] = "";
                                                //l++;
                                                //a[i][l] = "";
                                                //l++;
                                                a[i][l] = $rootScope.txtCenter("מקור- חשבונית מס קבלה", i);
                                                l++;
                                                // p = p + "\n\n" + $rootScope.txtCenter("חשבונית מס קבלה",i);
                                            } else {
                                                //a[i][l] = "";
                                                //l++;
                                                //a[i][l] = "";
                                                //l++;
                                                a[i][l] = $rootScope.txtCenter("אישור תשלום", i);
                                                l++;
                                                //p = p + "\n\n" + $rootScope.txtCenter("אישור תשלום",i);
                                            }
                                        }
                                    }
                                    a[i][l] = $rootScope.txtCenter("תשלום חוב", i);
                                    l++;
                                }

                            }
                            a[i][l] = $rootScope.txtCenter($scope.cashes['cash_num' + num].cash_kupanum, i);
                            l++;

                            a[i][l] = $rootScope.txtCenter("<br>", i);
                            l++;

                            //a[i][l] = "";
                            //l++;
                            //a[i][l] = "";
                            //l++;
                            akafa_b = 0;
                            if ($scope.cashes['cash_num' + num].transtype == 1) {
                                akafa_b = -1 * parseFloat($scope.cashes['cash_num' + num].finalamount);
                            }
                            if (transtype == 0 && $scope.cashes['cash_num' + num].prepaid2 == 0) {

                                products = $scope.cashes['cash_num' + num].products;
                                // Toast.makeText(getApplicationContext(), "2", Toast.LENGTH_LONG).show();
                                // p = p + $rootScope.itemLine2("ברקוד", "תיאור", "סה\"כ") + "\n";
                                a[i][l] = $rootScope.itemLine4("ברקוד", "תיאור", "סה\"כ", i);                   
                                 l++;
                                //a[i][l] = "";
                                //l++;
							    tip = "";
                                for (j = 0; j < products.length; j++) {
                                    product = products[j];
                                    if(product["category"] == "9999"){
                                    	tip = "בחשבון זה שולם שירות בסך"+ product['comment'];
                                    	tip = tip.replace("טיפ","");
                                    }
                                    if (product["Amount"] != 1 ) {
                                        a[i][l] = $rootScope.itemLine4(product["BarCode"], product["Title"], "", i);
                                        l++;
                                        if (i != 3) {
                                            a[i][l] = $rootScope.itemLine((parseFloat(product["Amount"]) * parseFloat(product["SalePrice"])).toFixed(2), "" + product["Amount"] + "*" + product["SalePrice"], i);
                                        } else {
                                            a[i][l] = $rootScope.itemLine("" + product["Amount"] + "*" + product["SalePrice"], (parseFloat(product["Amount"]) * parseFloat(product["SalePrice"])).toFixed(2), i);

                                        }
                                        l++;
                                    } else {
                                        a[i][l] = $rootScope.itemLine4(product["BarCode"], product["Title"], product["SalePrice"], i);
                                        l++;
                                    }
                                    if(product["comment"] != ""){
                                    	a[i][l] = $rootScope.txtCenter("* " + product["comment"], i);
                                		l++;
                                    }

                                    //p = p + $rootScope.itemLine3(product["BarCode"], product["Title"],i);
                                    //a[i][l] = $rootScope.itemLine( parseFloat(product["Amount"]) * parseFloat(product["SalePrice"]),""+ product["Amount"] + "*" + product["SalePrice"],i);
                                    //l++;
                                    //p = p + $rootScope.itemLine2("", product["Amount"] + "*" + product["SalePrice"], parseFloat(product["Amount"]) * parseFloat(product["SalePrice"]),i);
                                    // p=p+itemLine(product.getString("BarCode"),product.getString("Title"),i);
                                    // p=p+itemLine(product.getString("Amount")+"*"+product.getString("SalePrice"),String.valueOf((Float.parseFloat(product.getString("Amount")) * Float.parseFloat(product.getString("SalePrice")))),i);
                                    if (parseFloat(product["Discount"]) != 0) {
                                        sumd += parseFloat(product["Discount"]);
                                        a[i][l] = $rootScope.itemLine("    הנחת מוצר ", "-" + product["Discount"], i);
                                        l++;
                                        //p = p + $rootScope.itemLine2("", "הנחת מוצר ", "-" + product["Discount"],i);
                                    }
                                    if (parseFloat(product["discount_sale"]) != 0) {
                                        sumd += parseFloat(product["discount_sale"]);
                                        a[i][l] = $rootScope.itemLine("    "+product["discount_desc"]+ " ", "-" + product["discount_sale"], i);
                                        l++;
                                        //p = p + $rootScope.itemLine2("", "הנחת מוצר ", "-" + product["Discount"],i);
                                    }
                                }
                                a[i][l] = "";
                                l++;

                            } else {

                            }
                            a[i][l] = $rootScope.txtCenter("<br>", i);
                            l++;
                            if (typeof $scope.cashes['cash_num' + num].original_afterprod != 'undefined') {
                                a[i][l] = $rootScope.itemLine("        סכום ביניים:", $scope.cashes['cash_num' + num].original_afterprod, i);
                                l++;
                            }
                            
                            if ($scope.cashes['cash_num' + num].finalamount - $scope.cashes['cash_num' + num].original_afterprod > 0 && transtype == 0 && $scope.cashes['cash_num' + num].prepaid2 == 0) {

                                a[i][l] = $rootScope.itemLine("        הנחת חשבון:", ($scope.cashes['cash_num' + num].finalamount - $scope.cashes['cash_num' + num].original_afterprod).toFixed(2), i);
                                l++;
                            }
                            totalf = 0;
                            // p=p+$rootScope.itemLine2("","סיכום ביניים:",$scope.cashes['cash_num'+num].finalamount,i);
                            for (var key in payments) {
                                if (payments.hasOwnProperty(key))
                                    for (j = 0; j < payments[key].length; j++) {
                                        payment = payments[key][j];
                                        totalf += parseFloat(payment.amount);
                                        if (payment["type"] == 'הקפה') {
                                            akafa_b = akafa_b + parseFloat(payment.amount);
                                        }
                                        if (payment["type"] != 'מזומן' && payment["type"] != 'המחאה' && payment["type"] != 'הקפה' && payment["type"] != 'פריפייד') {
                                            a[i][l] = $rootScope.itemLine("        " + payment["type"] + ":", payment.amount, i);
                                        }
                                        else if(payment["type"] == 'פריפייד'){
                                        	a[i][l] = $rootScope.itemLine("        " + payment["type"] + ":", payment.amount, i);
                                        	l++;
                                        	a[i][l] = $rootScope.itemLine("        מספר כרטיס:", payment.prepaid_num, i);
                                        	l++;
                                        	a[i][l] = $rootScope.itemLine("        יתרה בכרטיס:", parseFloat(payment.balance) - parseFloat(payment.amount), i);
                                        }
                                        else if (payment["type"] != 'המחאה' && payment["type"] != 'הקפה') {
                                            a[i][l] = $rootScope.itemLine("        התקבל במזומן:", parseFloat(payment.amount), i);

                                        }
                                        else {
                                            if (payment["type"] != 'הקפה') {
                                                a[i][l] = $rootScope.itemLine("        " + payment["type"] + ": (מס' המחאה:" + payment.chequenumber + ")", payment.amount, i);
                                            }
                                            else {
                                                a[i][l] = $rootScope.itemLine("        " + payment["type"] + ":", payment.amount, i);
                                            }

                                        }
                                        l++;
                                        if (key == 'credit') {
                                            a[i][l] = $rootScope.itemLine("          מס' כרטיס:", payment.ashray_numcard.substr(payment.ashray_numcard.length - 4), i);
                                            l++;
                                            a[i][l] = $rootScope.itemLine("          מס' אישור:", payment.approvalNumber, i);
                                            l++;
                                            if (payment.pay_num > 0) {
                                                a[i][l] = $rootScope.itemLine("          מס' תשלומים:", payment.pay_num, i);
                                                l++;
                                                if (payment.pay_first > 0) {
                                                    a[i][l] = $rootScope.itemLine("          תשלום ראשון:", payment.pay_first, i);
                                                    l++;
                                                }
                                            }
                                            else {
                                                if (payment.ashray_f_credit) {
                                                    a[i][l] = $rootScope.itemLine("          מס' תשלומי קרדיט:", payment.creditbrand, i);
                                                    l++;
                                                }
                                            }
                                        }


                                        /*switch(key){
                                         case 'cheque':
                                         a[i][l]=$rootScope.itemLine("           מס' שק:"+":",payment.chequenumber,i);
                                         l++;
                                         a[i][l]=$rootScope.itemLine("           מס' שק:"+":",payment.chequenumber,i);
                                         l++;
                                         break;
                                         case 'credit':
                                         a[i][l]=$rootScope.itemLine("           מס' אשראי:"+":",payment.chequenumber,i);
                                         l++;
                                         a[i][l]=$rootScope.itemLine("           מס' שק:"+":",payment.chequenumber,i);
                                         l++;
                                         break;

                                         }
                                         */
                                        // JSONObject payment= value.getJSONObject(i);
                                        // p=p+$rootScope.itemLine2("",payment["type"],payment.amount);
                                    }

                            }

                            if ($scope.cashes['cash_num' + num].round > 0) {
                                a[i][l] = $rootScope.itemLine("        עיגול אגורות:", "-" + $scope.cashes['cash_num' + num].round, i);

                                //a[i][l]=$rootScope.itemLine2("עיגול אגורות:","","-"+$scope.cashes['cash_num'+num].round,i);
                                l++;
                                //p=p+$rootScope.itemLine2("עיגול אגורות:","","-"+$scope.cashes['cash_num'+num].round,i);
                            }
                            if ($scope.cashes['cash_num' + num].change > 0) {
                                a[i][l] = $rootScope.itemLine("        עודף:", $scope.cashes['cash_num' + num].change, i);
                                totalf -= parseFloat($scope.cashes['cash_num' + num].change);
                                //a[i][l]=$rootScope.itemLine2("","עודף:",$scope.cashes['cash_num'+num].round,i);
                                l++;
                                //p=p+$rootScope.itemLine2("","עודף:",$scope.cashes['cash_num'+num].round,i);
                            }
                            if (transtype == 0 && $scope.cashes['cash_num' + num].prepaid2 == 0) {

                                var free_vat=$rootScope.details_list.free_vat;
                                if(free_vat==1){
	                                a[i][l] = $rootScope.itemLine("        חייב מע\"מ:", "פטור מע\"מ", i);
	                                l++;
                                }
                                else{
                                	a[i][l] = $rootScope.itemLine("        חייב מע\"מ:", $scope.cashes['cash_num' + num].amountbeforevat, i);
	                                l++;
	                                a[i][l] = $rootScope.itemLine("        סה\"כ מע\"מ:", $scope.cashes['cash_num' + num].vat, i);
	                                l++;
                                }
                            }
                            //p=p+$rootScope.itemLine2("סה\"כ מע\"מ:",$scope.cashes['cash_num'+num].vat,"",i);
                            totalf=parseFloat(totalf).toFixed(2);
                            a[i][l] = $rootScope.itemLine("        סה\"כ שולם:", totalf, i);
                            l++;
                            /*sk 20/12/15*/
                         if( $(".sum_additional").val()){
					            if($scope.cashes['cash_num' + num].prepaid2 == 1){
					             	a[i][l] = $rootScope.itemLine("        תוספת לכרטיס נטען", parseFloat($(".sum_additional").val()-amount_help).toFixed(2), i);
	                                 l++;
					             }
                            }
                            
                            // p=p+$rootScope.itemLine2("סה\"כ שולם:",$scope.cashes['cash_num'+num].finalamount,"",i);

                            //p=p+"\n";
                            a[i][l] = $rootScope.txtCenter("<br>", i);
                            l++;
                            sumd = sumd + parseFloat($scope.cashes['cash_num' + num].original_afterprod - $scope.cashes['cash_num' + num].finalamount, i);
                            sumd = sumd - parseFloat($scope.cashes['cash_num' + num].discount_sale);
                            if(tip !=""){
                            	a[i][l] = "";
                                l++;
                                a[i][l] = $rootScope.txtCenter(tip, i);
                                l++;
                            }
                            if (sumd > 0 && transtype == 0 && $scope.cashes['cash_num' + num].prepaid2 == 0) {

                                a[i][l] = "";
                                l++;
                                a[i][l] = $rootScope.txtCenter("לקוח/ה יקר/ה בקנייה זו חסכת " + sumd.toFixed(2) + " ש\"ח", i);
                                l++;

                            }
                            if (typeof $scope.cashes['cash_num' + num].SearchClient != 'undefined' && typeof $scope.cashes['cash_num' + num].SearchClient.CreditBalance != 'undefined') {
                                if (typeof akafa_b == 'undefined') {
                                    akafa_b = 0;
                                }

                                a[i][l] = $rootScope.txtCenter("יתרת חוב: " + (parseFloat($scope.cashes['cash_num' + num].SearchClient.CreditBalance) - akafa_b).toFixed(2), i);
                                l++;
                            }
                            /*a[i][l]="";
                             l++;*/
                            //a[i][l]="";
                            //l++;
                            a[i][l] = $rootScope.txtCenter("<br>", i);
                            l++;
                            if (!$scope.cashes['cash_num' + num].prepaid2 == 1) {
                                a[i][l] = $rootScope.txtCenter("מס' פריטים: " + $scope.cashes['cash_num' + num].countprod, i);
                                l++;
                            }
                            a[i][l] = $rootScope.txtCenter("<br>", i);
                            l++;
                            //p=p+"\n\n"+$rootScope.txtCenter("עסקה מספר:"+" "+journal+"-"+$scope.cashes['cash_num'+num].cash_kupanum+"   מס' פריטים: "+$scope.cashes['cash_num'+num].countprod)+"\n";
                            a[i][l] = $rootScope.txtCenter("מספר קופה:" + " " + stock + "   ", i);
                            l++;
                            a[i][l] = $rootScope.txtCenter("<br>", i);
                            l++;
                            //p=p+$rootScope.txtCenter("קופה מספר:"+" "+stock+"   ",i);
                            if ($scope.cashes['cash_num' + num].SearchClient.SupplierName != undefined) {
                                a[i][l] = $rootScope.txtCenter("לקוח/ה:" + " " + $scope.cashes['cash_num' + num].SearchClient.ClientNum + " " + $scope.cashes['cash_num' + num].SearchClient.SupplierName, i);
                                l++;
                                // p=p+$rootScope.txtCenter("קופאי/ת:"+" "+$rootScope.SearchWorker.WorkerNum+" "+$rootScope.SearchWorker.SupplierName,i);
                            }
                            // JSONObject cashier = jsonArray.getJSONObject(4);
                            if ($rootScope.SearchWorker.SupplierName != undefined) {
                                a[i][l] = $rootScope.txtCenter("עובד/ת:" + " " + $rootScope.SearchWorker.WorkerNum + " " + $rootScope.SearchWorker.SupplierName, i);
                                l++;
                                // p=p+$rootScope.txtCenter("קופאי/ת:"+" "+$rootScope.SearchWorker.WorkerNum+" "+$rootScope.SearchWorker.SupplierName,i);
                            }
                            //a[i][l]="";
                            //l++;
                            a[i][l] = "";
                            l++;
                            a[i][l] = $rootScope.txtCenter("תודה ולהתראות", i);
                            l++;
                            //p=p+"\n\n"+$rootScope.txtCenter("תודה ולהתראות")+"\n";
                            if($scope.cashes['cash_num' + num].comment != undefined && $scope.cashes['cash_num' + num].comment != ""){
                            	a[i][l] = $rootScope.txtCenter("* "+$scope.cashes['cash_num' + num].comment, i);
                                l++;
                            }
                            if ($rootScope.details_list.comments != "") {
                                //a[i][l]="";
                                //l++;
                                a[i][l] = $rootScope.txtCenter($rootScope.details_list.comments, i);
                                l++;
                                //p=p+"\n"+$rootScope.txtCenter($rootScope.details_list.comments,i);
                            }
                            a[i][l] = $rootScope.txtCenter("<br>", i);
                            l++;
                            a[i][l] = $rootScope.txtCenter('<img style="max-width:170px;width:170px;" src="https://office.yedatop.com/modules/stock/cashbox_fe/inc/barcode.php?height=50&barcode=' + $scope.cashes['cash_num' + num].cash_kupanum + '"/>', i);
                            l++;

                            /*a[i][l] = $rootScope.txtCenter("<br>",i);
                             l++;
                             a[i][l] = $rootScope.txtCenter("<br>",i);
                             l++;*/
                        }
                        b = printPrinter2(a, $scope.cashes['cash_num' + num].cash_kupanum, i);
                        print_save['html'][print_save['html'].length] = b[2];
                        print_save['json31'][print_save['json31'].length] = b[1];
                        print_save['json48'][print_save['json48'].length] = b[0];
                        var a = [];

                        if (akafa_l > 0) {
                            for (var i = 1; i < 4; i++) {
                                a[i] = [];
                                l = 0;
                                if ($rootScope.details_list.name != "") {
                                    a[i][l] = "";
                                    l++;
                                    a[i][l] = $rootScope.txtCenter($rootScope.details_list.name, i);
                                    l++;
                                    //a[i][l] = "";
                                    //l++;
                                    //$rootScope.txtCenter($rootScope.details_list.name)
                                    //p=p+"\n"+$rootScope.txtCenter($rootScope.details_list.name)+"\n";
                                }
                                if ($rootScope.details_list.tz != "") {
                                    //a[i][l] = "";
                                    //l++;
                                    a[i][l] = $rootScope.txtCenter(" ע.מ./ח.פ.:" + $rootScope.details_list.tz, i);
                                    l++;
                                    // p=p+"\n"+$rootScope.txtCenter(" ע.מ./ח.פ.:"+$rootScope.details_list.tz,i);
                                }

                                if ($rootScope.details_list.address != "" && $rootScope.details_list.print_address == '1') {
                                    //a[i][l] = "";
                                    //l++;
                                    a[i][l] = $rootScope.txtCenter($rootScope.details_list.address, i);
                                    l++;
                                    // p=p+"\n"+$rootScope.txtCenter(" כתובת:"+$rootScope.details_list.address,i);
                                }
                                if($rootScope.details_list.mikud!="" && $rootScope.details_list.print_mikud == '1'){
        	
									a[i][l] = $rootScope.txtCenter(" מיקוד:"+$rootScope.details_list.mikud,i);
									l++;
						          
						        }
                                if ($rootScope.details_list.tel != "" && $rootScope.details_list.print_tel == '1') {
                                    //a[i][l] = "";
                                    //l++;
                                    a[i][l] = $rootScope.txtCenter(" טלפון:" + $rootScope.details_list.tel, i);
                                    l++;
                                    // p=p+"\n"+$rootScope.txtCenter(" טלפון:"+$rootScope.details_list.tel,i);
                                }
                                if ($rootScope.details_list.fax != "" && $rootScope.details_list.print_fax == '1') {
                                    //a[i][l] = "";
                                    //l++;
                                    a[i][l] = $rootScope.txtCenter(" פקס:" + $rootScope.details_list.fax, i);
                                    l++;
                                    // p=p+"\n"+$rootScope.txtCenter(" פקס:"+$rootScope.details_list.fax,i);
                                }
                                if ($rootScope.details_list.mail != "" && $rootScope.details_list.print_mail == '1') {
                                    //a[i][l] = "";
                                    //l++;
                                    a[i][l] = $rootScope.txtCenter(" דוא\"ל:" + $rootScope.details_list.mail, i);
                                    l++;
                                    //  p=p+"\n"+$rootScope.txtCenter(" דוא\"ל:"+$rootScope.details_list.mail,i);
                                }
                                if ($rootScope.details_list.web != "" && $rootScope.details_list.print_web == '1') {
                                //a[i][l] = "";
                                //l++;
                                a[i][l] = $rootScope.txtCenter(" אתר אינטרנט:" + $rootScope.details_list.web, i);
                                l++;
                                //  p=p+"\n"+$rootScope.txtCenter(" דוא\"ל:"+$rootScope.details_list.mail);
                            }
                                a[i][l] = $rootScope.txtCenter("<hr>", i);
                                l++;
                                   /*if(dtoday != 'undefined' && dd1 != 'undefined'){
			                            	a[i][l] = $rootScope.itemLine(dtoday, dd1, i);
			                            }
			                            else{
			                            	a[i][l] = $rootScope.itemLine(today2, d, i);
			                            }*/
			                        a[i][l] = $rootScope.itemLine($('#current_date').html(), $('#curr_date').html(), i);
                                l++;
                                a[i][l] = $rootScope.txtCenter("<br>", i);
                                l++;
                                a[i][l] = $rootScope.txtCenter("שובר חוב בהקפה", i);
                                l++;
                                a[i][l] = $rootScope.txtCenter("<br>", i);
                                l++;
                                a[i][l] = $rootScope.itemLine("סה\"כ לתשלום:", amount, i);
                                l++;
                                a[i][l] = $rootScope.txtCenter("<br>", i);
                                l++;
                                a[i][l] = $rootScope.itemLine3("חתימה: ", "__________________", i);
                                l++;
                                a[i][l] = $rootScope.txtCenter("<br>", i);
                                l++;
                                a[i][l] = $rootScope.txtCenter("תודה ולהתראות", i);
                                l++;
                                a[i][l] = $rootScope.txtCenter("<br>", i);
                                l++;
                                a[i][l] = $rootScope.txtCenter("<br>", i);
                                l++;
                            }
                            b = printPrinter3(a, 5);
                            print_save['html'][print_save['html'].length] = b[2];
                            print_save['json31'][print_save['json31'].length] = b[1];
                            print_save['json48'][print_save['json48'].length] = b[0];
                        }
                        
                      if (credit_l > 0) {
                            /*sk 08/11 print ashray vocher*/
                            for (j = 0; j < credit_l; j++) {
                                var a = [];
                                for (var i = 1; i < 4; i++) {
                                    a[i] = [];
                                    l = 0;
                                    if ($rootScope.details_list.name != "") {
                                        a[i][l] = "";
                                        l++;
                                        a[i][l] = $rootScope.txtCenter($rootScope.details_list.name, i);
                                        l++;
                                        //a[i][l] = "";
                                        //l++;
                                        //$rootScope.txtCenter($rootScope.details_list.name)
                                        //p=p+"\n"+$rootScope.txtCenter($rootScope.details_list.name)+"\n";
                                    }
                                    if ($rootScope.details_list.tz != "") {
                                        //a[i][l] = "";
                                        //l++;
                                        a[i][l] = $rootScope.txtCenter(" ע.מ./ח.פ.:" + $rootScope.details_list.tz, i);
                                        l++;
                                        // p=p+"\n"+$rootScope.txtCenter(" ע.מ./ח.פ.:"+$rootScope.details_list.tz,i);
                                    }

                                    if ($rootScope.details_list.address != "" && $rootScope.details_list.print_address == '1') {
                                        //a[i][l] = "";
                                        //l++;
                                        a[i][l] = $rootScope.txtCenter($rootScope.details_list.address, i);
                                        l++;
                                        // p=p+"\n"+$rootScope.txtCenter(" כתובת:"+$rootScope.details_list.address,i);
                                    }
                                    if($rootScope.details_list.mikud!="" && $rootScope.details_list.print_mikud == '1'){
								        	
											a[i][l] = $rootScope.txtCenter(" מיקוד:"+$rootScope.details_list.mikud,i);
											l++;
								          
								        }
                                    if ($rootScope.details_list.tel != "" && $rootScope.details_list.print_tel == '1') {
                                        //a[i][l] = "";
                                        //l++;
                                        a[i][l] = $rootScope.txtCenter(" טלפון:" + $rootScope.details_list.tel, i);
                                        l++;
                                        // p=p+"\n"+$rootScope.txtCenter(" טלפון:"+$rootScope.details_list.tel,i);
                                    }
                                    if ($rootScope.details_list.fax != "" && $rootScope.details_list.print_fax == '1') {
                                        //a[i][l] = "";
                                        //l++;
                                        a[i][l] = $rootScope.txtCenter(" פקס:" + $rootScope.details_list.fax, i);
                                        l++;
                                        // p=p+"\n"+$rootScope.txtCenter(" פקס:"+$rootScope.details_list.fax,i);
                                    }
                                    if ($rootScope.details_list.mail != "" && $rootScope.details_list.print_mail == '1') {
                                        //a[i][l] = "";
                                        //l++;
                                        a[i][l] = $rootScope.txtCenter(" דוא\"ל:" + $rootScope.details_list.mail, i);
                                        l++;
                                        //  p=p+"\n"+$rootScope.txtCenter(" דוא\"ל:"+$rootScope.details_list.mail,i);
                                    }
                                    if ($rootScope.details_list.web != "" && $rootScope.details_list.print_web == '1') {
		                                //a[i][l] = "";
		                                //l++;
		                                a[i][l] = $rootScope.txtCenter(" אתר אינטרנט:" + $rootScope.details_list.web, i);
		                                l++;
		                                //  p=p+"\n"+$rootScope.txtCenter(" דוא\"ל:"+$rootScope.details_list.mail);
		                            }
                                    /*sk 25/01/15 add date and time and journal num*/
                                    a[i][l] = $rootScope.txtCenter("<hr>", i);
	                                l++;
	                                   /*if(dtoday != 'undefined' && dd1 != 'undefined'){
			                            	a[i][l] = $rootScope.itemLine(dtoday, dd1, i);
			                            }
			                            else{
			                            	a[i][l] = $rootScope.itemLine(today2, d, i);
			                            }*/
			                        a[i][l] = $rootScope.itemLine($('#current_date').html(), $('#curr_date').html(), i);
	                                l++;
                                    /*sk 25/01/15 add date and time and journal num*/                                   
                                    a[i][l] = $rootScope.txtCenter("<br>", i);
                                    l++;
                                    a[i][l] = $rootScope.txtCenter("שובר אשראי", i);
                                    l++;
                                    /*sk 25/01/15 add date and time and journal num*/
                                    a[i][l] = $rootScope.txtCenter($scope.cashes['cash_num' + num].cash_kupanum, i);
                            		l++;
                                   /*sk 25/01/15 add date and time and journal num*/
                                    a[i][l] = $rootScope.txtCenter(payments["credit"][j].creditbrand, i);
                                    l++;
                                    if (payments["credit"][j].pay_num > 0) {
                                        a[i][l] = $rootScope.itemLine("מס' תשלומים:", payments["credit"][j].pay_num, i);
                                        l++;
                                        if (payments["credit"][j].pay_first > 0) {
                                            a[i][l] = $rootScope.itemLine("תשלום ראשון:", payments["credit"][j].pay_first, i);
                                            l++;
                                        }
                                    }
                                    else {
                                        if (payments["credit"][j].ashray_f_credit) {
                                            a[i][l] = $rootScope.itemLine("מס' תשלומי קרדיט:", payments["credit"][j].creditbrand, i);
                                            l++;
                                        }
                                    }
                                    a[i][l] = "";
                                    l++;
                                    a[i][l] = $rootScope.itemLine("מס' כרטיס:", payments["credit"][j].ashray_numcard, i);
                                    l++;
                                    a[i][l] = $rootScope.itemLine("מס' אישור:", payments["credit"][j].approvalNumber, i);
                                    l++;
                                    a[i][l] = $rootScope.txtCenter("<br>", i);
                                    l++;
                                    if (payments["credit"][j].amount < 0) {
                                        a[i][l] = $rootScope.txtCenter("עסקת זיכוי", i);
                                    }
                                    else {
                                        a[i][l] = $rootScope.txtCenter("עסקת חיוב", i);
                                    }
                                    l++;
                                    a[i][l] = $rootScope.txtCenter("<br>", i);
                                    l++;
                                    a[i][l] = $rootScope.itemLine("סה\"כ:", payments["credit"][j].amount + " ש\"ח", i);
                                    l++;
                                    a[i][l] = $rootScope.txtCenter("<br>", i);
                                    l++;
                                    a[i][l] = $rootScope.itemLine3("טלפון: ", "__________________", i);
                                    l++;
                                    a[i][l] = $rootScope.txtCenter("<br>", i);
                                    l++;
                                    a[i][l] = $rootScope.itemLine3("חתימה: ", "__________________", i);
                                    l++;
                                    a[i][l] = $rootScope.txtCenter("<br>", i);
                                    l++;
                                    a[i][l] = $rootScope.txtCenter("תודה ולהתראות", i);
                                    l++;
                                    a[i][l] = "";
                                    l++;
                                    a[i][l] = "";
                                    l++;
                                }
                                b = printPrinter3(a, 5 * j);
                                print_save['html'][print_save['html'].length] = b[2];
                                print_save['json31'][print_save['json31'].length] = b[1];
                                print_save['json48'][print_save['json48'].length] = b[0];
                            }
                        }
					credit_l = payments["credit"].length;
					/*sk 03/03/16*/
					document.getElementById('add_customer_m').value = "";
					var a = [];
					l = 0;

					//print(p);
			if (amount < 0 || typeof $scope.cashes['cash_num' + num]['another_shovar'] != "undefined" && $scope.cashes['cash_num' + num]['another_shovar'] > 0) {
                            if (takbul > 0 && !(typeof $scope.cashes['cash_num' + num]['another_shovar'] != "undefined" && $scope.cashes['cash_num' + num]['another_shovar'] > 0)) {
                                for (var i = 1; i < 4; i++) {
                                    a[i] = [];
                                    l = 0;
                                    a[i][l] = $rootScope.txtCenter("<br>", i);
                                    l++;
                                    //a[i][l]="";
                                    //l++;
                                    a[i][l] = $rootScope.txtCenter("שובר מקור", i);
                                    l++;
                                    //a[i][l]="";
                                    //l++;
                                    a[i][l] = $rootScope.txtCenter("<br>", i);
                                    l++;
                                      /*if(dtoday != 'undefined' && dd1 != 'undefined'){
			                            	a[i][l] = $rootScope.itemLine(dtoday, dd1, i);
			                            }
			                            else{
			                            	a[i][l] = $rootScope.itemLine(today2, d, i);
			                            }*/
			                        a[i][l] = $rootScope.itemLine($('#current_date').html(), $('#curr_date').html(), i);
                                    l++;
                                    a[i][l] = $rootScope.itemLine(journal + "-" + $scope.cashes['cash_num' + num].cash_kupanum, stock + "", i);
                                    l++;
                                    //a[i][l]="";
                                    //l++;
                                    //a[i][l]="";
                                    //l++;
                                    a[i][l] = $rootScope.txtCenter("הודעת זיכוי מקור לקופה", i);
                                    l++;
                                    //a[i][l]="";
                                    //l++;
                                    //a[i][l]="";
                                    //l++;
                                    a[i][l] = $rootScope.txtCenter("סכום זיכוי: " + amount, i);
                                    l++;
                                    //a[i][l]="";
                                    //l++;
                                    //a[i][l]="";
                                    //l++;
                                    a[i][l] = $rootScope.txtCenter("מספר שובר: " + journal + "-" + $scope.cashes['cash_num' + num].cash_kupanum, i);
                                    l++;
                                    //a[i][l]="";
                                    //l++;
                                    a[i][l] = $rootScope.txtCenter("<br>", i);
                                    l++;
                                    a[i][l] = $rootScope.itemLine3("טלפון: ", "__________________", i);
                                    l++;
                                    //a[i][l]="";
                                    //l++;
                                    a[i][l] = $rootScope.itemLine3("חתימה: ", "__________________", i);
                                    l++;
                                    //a[i][l]="";
                                    //l++;
                                    /* p="\n\n"+$rootScope.txtCenter("שובר מקור")+"\n\n";
                                     p=p+$rootScope.txtCenter(now)+"\n";
                                     p=p+$rootScope.itemLine(journal+"-"+$rootScope.details_list.cash_kupanum,stock+"",i);
                                     p=p+"\n\n"+$rootScope.txtCenter("הודעת זיכוי מקור לקופה",i);
                                     p=p+"\n\n"+$rootScope.txtCenter("סכום זיכוי: "+amount,i);
                                     p=p+"\n\n"+$rootScope.txtCenter("מספר שובר: "+journal+"-"+$scope.cashes['cash_num'+num].cash_kupanum,i);
                                     p=p+"\n\n"+$rootScope.itemLine3("טלפון: ","__________________",i);
                                     p=p+"\n"+$rootScope.itemLine3("חתימה: ","__________________")+"\n";
                                     // print(p,i);*/
                                }
                                b = printPrinter3(a, 5);
                                print_save['html'][print_save['html'].length] = b[2];
                                print_save['json31'][print_save['json31'].length] = b[1];
                                print_save['json48'][print_save['json48'].length] = b[0];

                                var a = [];
                                l = 0;
                            } else {
                                for (var i = 1; i < 4; i++) {
                                    a[i] = [];
                                    l = 0;
                                    if (typeof $scope.cashes['cash_num' + num]['another_shovar'] != "undefined" && $scope.cashes['cash_num' + num]['another_shovar'] > 0) {
                                        amount = $scope.cashes['cash_num' + num]['another_shovar'];
                                    }
                                    amount = Math.abs(amount);
                                    //a[i][l]="";
                                    //l++;
                                    a[i][l] = $rootScope.txtCenter("<br>", i);
                                    l++;
                                    a[i][l] = $rootScope.txtCenter("שובר מקור", i);
                                    l++;
                                    //a[i][l]="";
                                    //l++;
                                    //a[i][l]="";
                                    //l++;
                                       /*if(dtoday != 'undefined' && dd1 != 'undefined'){
			                            	a[i][l] = $rootScope.itemLine(dtoday, dd1, i);
			                            }
			                            else{
			                            	a[i][l] = $rootScope.itemLine(today2, d, i);
			                            }*/
			                        a[i][l] = $rootScope.itemLine($('#current_date').html(), $('#curr_date').html(), i);
                                    l++;
                                    a[i][l] = $rootScope.itemLine(journal + "-" + $scope.cashes['cash_num' + num].cash_kupanum, stock + "", i);
                                    l++;
                                    //a[i][l]="";
                                    //l++;
                                    a[i][l] = $rootScope.txtCenter("<br>", i);
                                    l++;
                                    a[i][l] = $rootScope.txtCenter("הודעת זיכוי מקור ללקוח", i);
                                    l++;
                                    a[i][l] = $rootScope.txtCenter("<br>", i);
                                    l++;
                                    //a[i][l]="";
                                    //l++;
                                    a[i][l] = $rootScope.txtCenter("סכום זיכוי: " + amount, i);
                                    l++;
                                    //a[i][l]="";
                                    //l++;
                                    //a[i][l]="";
                                    //l++;
                                    a[i][l] = $rootScope.txtCenter("מספר שובר: " + journal + "-" + $scope.cashes['cash_num' + num].cash_kupanum, i);
                                    l++;
                                    //a[i][l]="";
                                    //l++;
                                    a[i][l] = $rootScope.txtCenter("<br>", i);
                                    l++;
                                    a[i][l] = $rootScope.itemLine3("חתימה: ", "__________________", i);
                                    l++;
                                    a[i][l] = $rootScope.txtCenter("<br>", i);
                                    l++;
                                    a[i][l] = $rootScope.txtCenter('<img style="max-width:170px;width:170px;" src="https://office.yedatop.com/modules/stock/cashbox_fe/inc/barcode.php?height=50&barcode=' + $scope.cashes['cash_num' + num].cash_kupanum + '"/>', i);
                                    l++;
                                    a[i][l] = $rootScope.txtCenter("<br>", i);
                                    l++;
                                    a[i][l] = $rootScope.txtCenter("<br>", i);
                                    l++;

                                }
                                b = printPrinter4(a, $scope.cashes['cash_num' + num].cash_kupanum, 1);
                                print_save['html'][print_save['html'].length] = b[2];
                                print_save['json31'][print_save['json31'].length] = b[1];
                                print_save['json48'][print_save['json48'].length] = b[0];

                                var a = [];
                                for (var i = 1; i < 4; i++) {
                                    a[i] = [];
                                    l = 0;


                                    /* p="\n\n"+$rootScope.txtCenter("שובר מקור")+"\n\n";
                                     p=p+$rootScope.txtCenter(now)+"\n";
                                     p=p+$rootScope.itemLine(journal+"-"+$rootScope.details_list.cash_kupanum,stock+"");
                                     p=p+"\n\n"+$rootScope.txtCenter("הודעת זיכוי מקור ללקוח");
                                     p=p+"\n\n"+$rootScope.txtCenter("סכום זיכוי: "+amount);
                                     p=p+"\n\n"+$rootScope.txtCenter("מספר שובר: "+journal+"-"+$scope.cashes['cash_num'+num].cash_kupanum);
                                     p=p+"\n\n"+$rootScope.itemLine3("חתימה: ","__________________")+"\n";
                                     print(p);*/
                                    a[i][l] = "";
                                    l++;
                                    //a[i][l]="";
                                    //l++;
                                    a[i][l] = $rootScope.txtCenter("שובר העתק", i);
                                    l++;
                                    //a[i][l]="";
                                    //l++;
                                    a[i][l] = $rootScope.txtCenter("<br>", i);
                                    l++;
                                      /*if(dtoday != 'undefined' && dd1 != 'undefined'){
			                            	a[i][l] = $rootScope.itemLine(dtoday, dd1, i);
			                            }
			                            else{
			                            	a[i][l] = $rootScope.itemLine(today2, d, i);
			                            }*/
			                        a[i][l] = $rootScope.itemLine($('#current_date').html(), $('#curr_date').html(), i);
                                    l++;
                                    a[i][l] = $rootScope.itemLine(journal + "-" + $scope.cashes['cash_num' + num].cash_kupanum, stock + "", i);
                                    l++;
                                    //a[i][l]="";
                                    //l++;
                                    a[i][l] = $rootScope.txtCenter("<br>", i);
                                    l++;
                                    a[i][l] = $rootScope.txtCenter("הודעת זיכוי העתק לקופה", i);
                                    l++;
                                    a[i][l] = $rootScope.txtCenter("<br>", i);
                                    l++;
                                    //a[i][l]="";
                                    //l++;
                                    a[i][l] = $rootScope.txtCenter("סכום זיכוי: " + amount, i);
                                    l++;
                                    //a[i][l]="";
                                    //l++;
                                    //a[i][l]="";
                                    //l++;
                                    a[i][l] = $rootScope.txtCenter("מספר שובר: " + journal + "-" + $scope.cashes['cash_num' + num].cash_kupanum, i);
                                    l++;
                                    //a[i][l]="";
                                    //l++;
                                    a[i][l] = $rootScope.txtCenter("<br>", i);
                                    l++;
                                    a[i][l] = $rootScope.itemLine3("טלפון: ", "__________________", i);
                                    l++;
                                    a[i][l] = $rootScope.txtCenter("<br>", i);
                                    l++;
                                    a[i][l] = $rootScope.itemLine3("חתימה: ", "__________________", i);
                                    l++;
                                    a[i][l] = "";
                                    l++;
                                }
                                b = printPrinter3(a, 10);
                                print_save['html'][print_save['html'].length] = b[2];
                                print_save['json31'][print_save['json31'].length] = b[1];
                                print_save['json48'][print_save['json48'].length] = b[0];
                                /* p="\n\n"+$rootScope.txtCenter("שובר העתק")+"\n\n";
                                 p=p+$rootScope.txtCenter(now)+"\n";
                                 p=p+itemLine(journal+"-"+$rootScope.details_list.cash_kupanum,stock+"");
                                 p=p+"\n\n"+$rootScope.txtCenter("הודעת זיכוי העתק לקופה");
                                 p=p+"\n\n"+$rootScope.txtCenter("סכום זיכוי: "+amount);
                                 p=p+"\n\n"+$rootScope.txtCenter("מספר שובר: "+journal+"-"+$rootScope.details_list.cash_kupanum);
                                 p=p+"\n\n"+$rootScope.itemLine3("טלפון: ","__________________");
                                 p=p+"\n"+$rootScope.itemLine3("חתימה: ","__________________")+"\n";*/
                                // print(p);
                            }
                        }
                        print_save['html'] = JSON.stringify(print_save['html']);
                        print_save['json31'] = JSON.stringify(print_save['json31']);
                        print_save['json48'] = JSON.stringify(print_save['json48']);

                        $http.post('inc/functions.php', $.param({
                            print_save: true,
                            json: JSON.stringify(print_save),
                            trannum: $rootScope.cash_num,
                            stock: stock,
                            journal: journal,
                            journal_id: journal_id
                        }), {
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                            }
                        }).success(function (data) {
                            //alert(data);
                        }).error(function(){
                        	print_object={};
                        	print_object['json']=JSON.stringify(print_save);
                        	print_object['trannum']=$rootScope.cash_num-1;
                        	print_object['stock']=stock;
                        	print_object['journal']=journal;
                        	print_object['journal_id']=journal_id;
                        	print_object['type']='hachlafa';
						   	$rootScope.print_offline_invoice[journal*1000+ $rootScope.cash_num-1]=print_object;
						});
						
						setInterval(function () {
							if(!$.isEmptyObject($rootScope.print_offline_invoice)){
								print_offline_invoice=JSON.stringify($rootScope.print_offline_invoice);
								if(print_offline_invoice.length>2){
									$http.post('inc/functions.php', $.param({
										print_offline_invoice11: print_offline_invoice
									  },{async:false}), {
										headers : {
											'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
										}				
									}).success(function(data) {
										$rootScope.print_offline_invoice={};
									}).error(function(){
										hhhhh=1;
									});
								}
	                       }
		                }, 500);  
		                if (typeof window.external != 'undefined' && typeof window.external.writelog != 'undefined') {
                            window.external.writelog(journal_id, desc);
                        }
                    }

                    /*if(typeof android!='undefined'){
                     android.invoice_details(JSON.stringify(arr));
                     }
                     else{
                     //android2.show_toast();
                     android2.invoice_details(JSON.stringify(arr));
                     }*/

                } else {
				$(".wrap").click();
			}
         is_update=0;/*sk 03/9 update shovarzicuy to used*/
		};
		$rootScope.call_clean = function() {
			return clean.clean();
		}
		this.hachlafa_barcode = function(barcode) {
			$('#achlafa_pritim tr[data-id=' + barcode + ']').find(".fa-check-circle").toggleClass('display');
		}
		this.choose_all_comp = function() {
			$('#achlafa_pritim').find(".fa-check-circle").removeClass('display');
		}
	}]);

	app.controller('CommentController', ['$scope', '$rootScope', 'cash_global', 'local', 'openwindows',
	function($scope, $rootScope, cash_global, local, openwindows) {
		$rootScope.curr_comment = '';
		$scope.add_comment = function() {
			$('.wrap').click();
			$rootScope.comment = $(".comment_txt").val();
			if ($rootScope.comment != "") {
				$rootScope.commentClass = "comment_active";
			} else {
				$rootScope.commentClass = "";
			}
			writelog("הוספת הערה לחשבון: "+$(".comment_txt").val());
		};
		$scope.start_comment = function() {
			$(".comment_txt").val($rootScope.comment);
			openwindows.openwrap('.pop_comment', '.comment_div,.pop_comment');
		};
		$scope.add_comment_prod = function() {
			$('.wrap').click();
			key1 = $rootScope.curr_comment;
			
			for (var i = 0; i < cash_global.products.length; i++) {
				var product = cash_global.products[i];
				if (product['BarCode'] == key1) {
					cash_global.products[i]['comment'] = $(".comment_txt_prod").val();

					if ($(".comment_txt_prod").val() != undefined && $(".comment_txt_prod").val() != "") {
						cash_global.products[i]['commentClass'] = "comment_active";
					}
					local.setLocal('products', cash_global.products);
					writelog("הוספת הערה לפריט: "+product['BarCode']+" "+$(".comment_txt_prod").val());
					break;
				}
			}

		};

		$scope.start_comment_prod = function(key1) {
			//key1=$('input[name=BarCode]:hidden').val();
			$rootScope.curr_comment = key1;
			for (var i = 0; i < cash_global.products.length; i++) {
				var product = cash_global.products[i];
				if (product['BarCode'] == key1) {
					$(".comment_txt_prod").val(cash_global.products[i]['comment']);
					break;
				}
			}
			openwindows.openwrap('.pop_comment_prod', '.comment_div_prod,.pop_comment_prod');
		};

	}]);

	app.controller('BeynaimController', ['$scope', '$rootScope', 'cash_global', 'local',
	function($scope, $rootScope, cash_global, local) {
		var currentdate = new Date();
		var datetime = currentdate.getDate() + "/" + (currentdate.getMonth() + 1) + "/" + currentdate.getFullYear() + "  " + currentdate.getHours() + ":" + currentdate.getMinutes();
		$scope.datet = datetime;

		if ( typeof start_cash == "undefined") {
			start_cash = 0;
		}
		$rootScope.start_cash = start_cash;
		
		$rootScope.print = function () {
            	
                writelog("הדפסת דוח x");
                var a = [];
                for (i = 1; i < 4; i++) {
                    a[i] = [];
                    if (typeof android == 'undefined' && (typeof window.external == 'undefined' || typeof window.external.print4 == 'undefined')) {
                        num2 = 48;
                    } else {
                        num2 = 31;
                    }
                    l = 0;
                    if ($rootScope.details_list.name != "") {
                        a[i][l] = "";
                        l++;
                        a[i][l] = $rootScope.txtCenter($rootScope.details_list.name + "   ",i);
                        l++;
                        //a[i][l] = "";
                        //l++;
                        //$rootScope.txtCenter($rootScope.details_list.name)
                        //p=p+"\n"+$rootScope.txtCenter($rootScope.details_list.name)+"\n";
                    }
                    if ($rootScope.details_list.tz != "") {
                        //a[i][l] = "";
                        //l++;
                        a[i][l] = $rootScope.txtCenter(" ע.מ./ח.פ.:" + $rootScope.details_list.tz,i);
                        l++;
                        // p=p+"\n"+$rootScope.txtCenter(" ע.מ./ח.פ.:"+$rootScope.details_list.tz);
                    }
                    if ($rootScope.details_list.address != "" && $rootScope.details_list.print_address == '1') {
                        //a[i][l] = "";
                        //l++;
                        a[i][l] = $rootScope.txtCenter(" כתובת:" + $rootScope.details_list.address,i);
                        l++;
                        // p=p+"\n"+$rootScope.txtCenter(" כתובת:"+$rootScope.details_list.address);
                    }
                    if($rootScope.details_list.mikud!="" && $rootScope.details_list.print_mikud == '1'){
			        	
						a[i][l] = $rootScope.txtCenter(" מיקוד:"+$rootScope.details_list.mikud,i);
						l++;
			          
			        }
                    if ($rootScope.details_list.tel != "" && $rootScope.details_list.print_tel == '1') {
                        //a[i][l] = "";
                        //l++;
                        a[i][l] = $rootScope.txtCenter(" טלפון:" + $rootScope.details_list.tel,i);
                        l++;
                        // p=p+"\n"+$rootScope.txtCenter(" טלפון:"+$rootScope.details_list.tel);
                    }

                    if ($rootScope.details_list.fax != "" && $rootScope.details_list.print_fax == '1') {
                        //a[i][l] = "";
                        //l++;
                        a[i][l] = $rootScope.txtCenter(" פקס:" + $rootScope.details_list.fax,i);
                        l++;
                        // p=p+"\n"+$rootScope.txtCenter(" פקס:"+$rootScope.details_list.fax);
                    }
                    if ($rootScope.details_list.mail != "" && $rootScope.details_list.print_mail == '1') {
                        //a[i][l] = "";
                        //l++;
                        a[i][l] = $rootScope.txtCenter(" דוא\"ל:" + $rootScope.details_list.mail,i);
                        l++;
                        //  p=p+"\n"+$rootScope.txtCenter(" דוא\"ל:"+$rootScope.details_list.mail);
                    }
                    if ($rootScope.details_list.web != "" && $rootScope.details_list.print_web == '1') {
                            //a[i][l] = "";
                            //l++;
                            a[i][l] = $rootScope.txtCenter(" אתר אינטרנט:" + $rootScope.details_list.web, i);
                            l++;
                            //  p=p+"\n"+$rootScope.txtCenter(" דוא\"ל:"+$rootScope.details_list.mail);
                        }
                	a[i][l] = "";
                    l++;
                    if ($rootScope.action == 'close_k') {
                        a[i][l] = $rootScope.txtCenter("דוח z - סגירת קופה",i);
                        l++;
                    }
                    else {
                        a[i][l] = $rootScope.txtCenter("דוח x - סכום ביניים",i);
                        l++;
                    }
                    /*sk 15/02/2016  print journal num in X report*/
                 	if (journal!='undefined' && journal!='') {
                           
                             a[i][l] = $rootScope.txtCenter("מספר סרט:  "+journal,i);
                            l++;
                       }
                    a[i][l] = "";
                    l++;
                    var today = new Date();
                    var dd = today.getDate();
                    var mm = today.getMonth() + 1;
                    //January is 0!
                    var yyyy = today.getFullYear();

                    if (dd < 10) {
                        dd = '0' + dd
                    }

                    if (mm < 10) {
                        mm = '0' + mm
                    }
                    var d = new Date();
                    h = d.getHours();
                    m = d.getMinutes();
                    s = d.getSeconds();
                    d = h + ':' + m + ':' + s;
                    dflag = d;
                    today = dd + '/' + mm + '/' + yyyy;
                    /*if(dtoday != 'undefined' && dd1 != 'undefined'){
                		a[i][l] = $rootScope.itemLine(dtoday, dd1, i);
                        }
                        else{
                        	a[i][l] = $rootScope.itemLine(today2, d, i);
                        }*/
                    a[i][l] = $rootScope.itemLine($('#current_date').html(), $('#curr_date').html(), i);
                    l++;
                    a[i][l] = $rootScope.itemLine("מספר עסקאות:", $rootScope.cash_num,i);
                    l++;
                    a[i][l] = $rootScope.itemLine("פריטים שנמכרו:", $rootScope.finalltash2['numprod_hova'] - $rootScope.finalltash2['numprod_zchut'],i);
                    l++;
                    a[i][l] = $rootScope.itemLine("פריטים שחויבו:", $rootScope.finalltash2['numprod_hova'],i);
                    l++;
                    a[i][l] = $rootScope.itemLine("פריטים שזוכו:",$rootScope.finalltash2['numprod_zchut'] ,i);
                    l++;
                    a[i][l] = $rootScope.itemLine("דמי מחזור:", $rootScope.start_cash,i);
                    l++;
                    a[i][l] = $rootScope.itemLine("סה\"כ הוספת מזומן לקופה:", $rootScope.mezumanin,i);
                    l++;
                    a[i][l] = $rootScope.itemLine("סה\"כ הוצאת מזומן מהקופה:", $rootScope.mezumanout,i);
                    l++;
                    a[i][l] = "";
                    l++;
                    a[i][l] = $rootScope.itemLine("מזומן:", $rootScope.finalltash2['cash'],i);
                    l++;
                    a[i][l] = $rootScope.itemLine("חיובים:", $rootScope.finalltash2['cash1']['hova'],i);
                    l++;
                    a[i][l] = $rootScope.itemLine("זיכויים:", $rootScope.finalltash2['cash1']['zicuy'],i);
                    l++;
                    a[i][l] = "";
                    l++;
                    a[i][l] = $rootScope.itemLine("המחאה:", $rootScope.finalltash2['cheque'],i);
                    l++;
                    a[i][l] = $rootScope.itemLine("חיובים:", $rootScope.finalltash2['cheque1']['hova'],i);
                    l++;
                    a[i][l] = $rootScope.itemLine("זיכויים:", $rootScope.finalltash2['cheque1']['zicuy'],i);
                    l++;
                    a[i][l] = "";
                    l++;
                    a[i][l] = $rootScope.itemLine("אשראי:", $rootScope.finalltash2['credit'],i);
                    l++;
                    a[i][l] = $rootScope.itemLine("חיובים:", $rootScope.finalltash2['credit1']['hova'],i);
                    l++;
                    a[i][l] = $rootScope.itemLine("זיכויים:", $rootScope.finalltash2['credit1']['zicuy'],i);
                    l++;
                    a[i][l] = "";
                    l++;
                    
                    a[i][l] = $rootScope.itemLine("שובר:", $rootScope.finalltash2['shovar'],i);
                    l++;
                    a[i][l] = $rootScope.itemLine("חיובים:", $rootScope.finalltash2['shovar1']['hova'],i);
                    l++;
                    a[i][l] = $rootScope.itemLine("זיכויים:", $rootScope.finalltash2['shovar1']['zicuy'],i);
                    l++;
                    a[i][l] = "";
                    l++;
                    
                    a[i][l] = $rootScope.itemLine("הקפה:", $rootScope.finalltash2['akafadebt']['general'],i);
                    l++;
                    a[i][l] = $rootScope.itemLine("מזומן:", $rootScope.finalltash2['akafadebt']['cash'],i);
                    l++;
                    a[i][l] = $rootScope.itemLine("אשראי:", $rootScope.finalltash2['akafadebt']['credit'],i);
                    l++;
                    a[i][l] = $rootScope.itemLine("המחאה:", $rootScope.finalltash2['akafadebt']['cheque'],i);
                    l++;
                    a[i][l] = $rootScope.itemLine("כרטיס מתנה:", $rootScope.finalltash2['akafadebt']['prepaid'],i);
                    l++;
                    a[i][l] = "";
                    l++;
                    a[i][l] = $rootScope.itemLine("פריפייד:", $rootScope.finalltash2['prepaid'],i);
                    l++;
                    a[i][l] = $rootScope.itemLine("מזומן:", "0",i);
                    l++;
                    a[i][l] = $rootScope.itemLine("אשראי:", "0",i);
                    l++;
                    a[i][l] = $rootScope.itemLine("המחאה:", "0",i);
                    l++;
                    a[i][l] = $rootScope.itemLine("כרטיס מתנה:", "0",i);
                    l++;
                    a[i][l] = "";
                    l++;
                    a[i][l] = $rootScope.itemLine("סה\"כ תקבולים:", $rootScope.finalltash2['cash'] * 1 + $rootScope.finalltash2['credit'] * 1 + $rootScope.finalltash2['cheque'] * 1 + $rootScope.finalltash2['shovar'] * 1,i);
                    l++;
                    a[i][l] = "";
                    l++;
                }
                  print_save = {};
                 b=  printPrinter(a);
                 print_save['html'] = b[2];
                 print_save['json31'] = b[1];
                 print_save['json48'] = b[0];
                  
                       $.post("inc/functions.php", {
                       	
                       	    print_save_doc: true,
                            json: JSON.stringify(print_save),
                           //trannum: cash_kupanum,
                            stock: stock,
                            journal: journal,
                            journal_id: journal_id,
                            //cash_:$rootScope.cash_num,
                            type:"Zreport"
                       })
                        .done(function (data) {
                           
                        }); 

            }
/*sk 08/12/15 get current time from server*/
	/*	$(document).ready(function () {
    setInterval(function () {
        $.ajax({
            type: "POST",
            url: "inc/functions.php",
            data: "update_current_time=1",
            success: function (msg) {
               dd1=msg;
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {

            }
        });
    }, 5000);
});*/
/*sk 08/12/15 get current time from server*/
      /*  $(document).ready(function () {
    setInterval(function () {
        $.ajax({
            type: "POST",
            url: "inc/functions.php",
            data: "update_current_time1=1",
            success: function (msg) {
               dtoday=msg;
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {

            }
        });
    }, 5000);
});*/
		$scope.checkshow = function(x) {
			if (x != 0 && x != "") {
				return true;
			}
			return false;
		};

/*lc 04/04/2016 change btn close-open kupa*/
            $rootScope.closebb = function () {
               /* $(".stt.open").animate({
                    'marginLeft': '+=30px'
                }, function () {*/ 
                    $(".openclose.cl").toggleClass('display');
                    $(".openclose.op").toggleClass('display');
                    $(".disable_cash").show();
                    $(".clock").css("position", "absolute");
                    $('.wrap').click();
                // });
            }
            
        if (localStorage.getItem('send_cashes') === null) {
			$rootScope.send_cashes = {};
		} else {
			$rootScope.send_cashes = JSON.parse(localStorage.getItem('send_cashes'));
		}
		if (localStorage.getItem('start_cash') === null) {
			$rootScope.start_cash = 0;
		} else {
			$rootScope.start_cash = localStorage.getItem('start_cash');
		}

		if (localStorage.getItem('z-numprod_hova') === null) {
			$rootScope.numprod_hova = 0;
		} else {
			$rootScope.numprod_hova = localStorage.getItem('z-numprod_hova');
		}
		$rootScope.numprod_zchut = 0;
		$rootScope.numprod_hova_cash = 0;

		if (localStorage.getItem('z-numprod_zchut_cash') === null) {
			$rootScope.numprod_zchut_cash = 0;
		} else {
			$rootScope.numprod_zchut = localStorage.getItem('z-numprod_zchut_cash');
		}

		if (localStorage.getItem('z-mezumanin') === null) {
			$rootScope.mezumanin = 0;
		} else {
			$rootScope.mezumanin = localStorage.getItem('z-mezumanin');
		}

		if (localStorage.getItem('z-mezumanout') === null) {
			$rootScope.mezumanout = 0;
		} else {
			$rootScope.mezumanout = localStorage.getItem('z-mezumanout');
		}

		if (localStorage.getItem('z-sumin') === null) {
			$rootScope.sumin = 0;
		} else {
			$rootScope.sumin = localStorage.getItem('z-sumin');
		}

		if (localStorage.getItem('z-sumout') === null) {
			$rootScope.sumout = 0;
		} else {
			$rootScope.sumout = localStorage.getItem('z-sumout');
		}
	}]);

})(); 