(function() {
  var app = angular.module('settings', []);

 app.controller('SettingsController',[ '$scope', '$rootScope','$http','cash_global','local','alert','GetURLParameter',function ($scope,$rootScope,$http,cash_global,local,alert,GetURLParameter){
	$rootScope.masof=$("#stock_name").text();
	 var tel= '';
	 var fax= '';
	 var email= '';
	 var address= '';
	 var mikud= '';
  if(phone_li!=''){
  	tel=phone_li;
  }
  else{
  	tel=details_list[0]['tel'];
  }

  if(fax_li!=''){
  	fax=fax_li;
  }
  else{
  	fax=details_list[0]['fax'];
  }

  if(email_li!=''){
  	email=email_li;
  }
  else{
  	email=details_list[0]['email'];
  }

  if(address_li!=''){
  	address=address_li;
  }
  else{
  	address=details_list[0]['address'];
  }

  if(mikud_li!=''){
  	mikud=mikud_li;
  }
  else{
  	mikud=details_list[0]['mikud'];
  }
    if(name_for_cash_li!=''){//03/08 print name per stock
  	name_c=name_for_cash_li;
  }
  else{
  	name_c=details_list[0]['name'];
  }

  
	$rootScope.recepite_list=[];
	$rootScope.details_list={
		//"name":details_list[0]['name'],//03/08 print name per stock
		"name":name_c,
		"tz":details_list[0]['tz'],
		"tel":tel,
		"fax":fax,
		"address":address,
		"mikud":mikud,
		"mail":email,
		"web":details_list[0]['web'],
		"logo":details_list[0]['logo'],
		"comments":details_list[0]['comments'],
		"print_setting":print_setting,
		"show_days_report":show_days_report,
		"free_vat":free_vat,
		"barkod_len": details_list[0]['barkod_len'],
        "desc_len": details_list[0]['desc_len'],
        "total_len": details_list[0]['total_len'],
        'print_tel': details_list[0]['print_tel'],
		'print_fax': details_list[0]['print_fax'],
		'print_mail': details_list[0]['print_mail'],
		'print_web': details_list[0]['print_web'],
		'print_address': details_list[0]['print_address'],
		'print_mikud': details_list[0]['print_mikud'],
		'print_logo': details_list[0]['print_logo'],
		'print_comments': details_list[0]['print_comments']

	};

	$rootScope.prefers_list={
		"pr_langs":"hebrew",
		"pr_currency":"usd",
		"pr_themes":premission_list[0]['pr_themes'],
		"pr_online":(premission_list[0]['pr_online']==1?'on':'off'),
		"pr_global_item":(premission_list[0]['global_item']==1?'on':'off'),
		"pr_tip":(premission_list[0]['tip']==1?'on':'off'),
		"pr_slika":premission_list[0]['pr_slika'],
		"pr_masof":premission_list[0]['pr_masof'],
		"pr_viewprod":(premission_list[0]['pr_viewprod']==1?'on':'off'),
		"pr_save_mizdamen":(premission_list[0]['pr_save_mizdamen']==1?'on':'off'),
		"pr_viewpayment_mezuman":(premission_list[0]['pr_viewpayment_mezuman']==1?'on':'off'),
		"pr_viewpayment_amchaa":(premission_list[0]['pr_viewpayment_amchaa']==1?'on':'off'),
		"pr_viewpayment_credit":(premission_list[0]['pr_viewpayment_credit']==1?'on':'off'),
		"pr_viewpayment_shovarzicuy":(premission_list[0]['pr_viewpayment_shovarzicuy']==1?'on':'off'),
		"pr_viewpayment_akafa":(premission_list[0]['pr_viewpayment_akafa']==1?'on':'off'),
		"pr_viewpayment_prepaid":(premission_list[0]['pr_viewpayment_prepaid']==1?'on':'off'),
		"pr_viewpayment_shovar":(premission_list[0]['pr_viewpayment_shovar']==1?'on':'off'),
		"pr_numcust":premission_list[0]['pr_numcust'],
		"pr_currnumcust":premission_list[0]['pr_currnumcust'],
		"pr_group":premission_list[0]['pr_group'],
		"pr_currpass":'',
		"pr_pass":"",
		"pr_pass2":"",
		"pr_show_cash_button":(premission_list[0]['show_cash_button']==1?'on':'off'),/*sk 07/01/16 show payments buttons on main page*/
		"pr_show_credit_button":(premission_list[0]['show_credit_button']==1?'on':'off'),
		"pr_show_cheque_button":(premission_list[0]['show_cheque_button']==1?'on':'off'),
		"pr_show_shovar_button":(premission_list[0]['show_shovar_button']==1?'on':'off'),
		"pr_show_prepaid_button":(premission_list[0]['show_prepaid_button']==1?'on':'off'),
		"pr_show_akafa_button":(premission_list[0]['show_akafa_button']==1?'on':'off'),
		"pr_show_shovarzicuy_button":(premission_list[0]['show_shovarzicuy_button']==1?'on':'off'),

	};
	$scope.change_group=function (group) {
		if(group.ID==-1){
			$rootScope.pr_discount2=0;
		}
		else{
			$rootScope.pr_discount2= $rootScope.clientgroups[group.ID].Percent;
		}
	}
	$http.post('get_data.php',  $.param({stat2: "clientgroup",stock:GetURLParameter.GetURLParameter('stock')}), {
        	headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
   		 }).success(function(data){
		   	var start = data.indexOf("jsonclientgroup:");
		   	var end = data.indexOf(":jsonclientgroup");
		   	var len="jsonclientgroup".length+1;
		   	str=data.substr(start+len,end-start-len);
		   	str= str.replace("$","");
			 if(str != ''){
				$rootScope.clientgroups= JSON.parse(str);
           }
           else{
           		$rootScope.clientgroups={};
           }

		    $rootScope.clientgroups.filter(function( obj ) {
			if(obj.ID==$rootScope.prefers_list['pr_group']){
				$scope.pr_group= obj;
				$rootScope.pr_discount2= obj.Percent;
			}

			});

	  	});

	if(typeof open_c !="undefined" ){

		var a = [];
		for (var i=1; i < 4; i++) {
		 a[i]=[];
		 l=0;
       if(i==1){
       	num2=48;
       }
       else{
       	num2=31;
       }
       l=0;

      // בהדפסת דמי מחזור יודפס כותרת בית העסק מספר סרט הקופה תאריך שעה והסכום


				a[i][l]="";
				l++;

				 if($rootScope.details_list.name!=""){
				a[i][l]=$rootScope.txtCenter($rootScope.details_list.name,i);

				l++;
				}

				 if($rootScope.details_list.tz!=""){
        	//a[i][l] = "";
			//l++;
			a[i][l] = $rootScope.txtCenter(" ע.מ./ח.פ.:"+$rootScope.details_list.tz,i);
			l++;
           // p=p+"\n"+$rootScope.txtCenter(" ע.מ./ח.פ.:"+$rootScope.details_list.tz);
        }

        if($rootScope.details_list.address!=""){
        	//a[i][l] = "";
			//l++;
			a[i][l] = $rootScope.txtCenter($rootScope.details_list.address,i);
			l++;
           // p=p+"\n"+$rootScope.txtCenter(" כתובת:"+$rootScope.details_list.address);
        }
          if($rootScope.details_list.tel!=""){
        	//a[i][l] = "";
			//l++;
			a[i][l] =$rootScope.txtCenter(" טלפון:"+$rootScope.details_list.tel,i);
			l++;
           // p=p+"\n"+$rootScope.txtCenter(" טלפון:"+$rootScope.details_list.tel);
        }
        if($rootScope.details_list.fax!=""){
        	//a[i][l] = "";
			//l++;
			a[i][l] = $rootScope.txtCenter(" פקס:"+$rootScope.details_list.fax,i);
			l++;
           // p=p+"\n"+$rootScope.txtCenter(" פקס:"+$rootScope.details_list.fax);
        }
        if($rootScope.details_list.mail!=""){
        	//a[i][l] = "";
			//l++;
			a[i][l] = $rootScope.txtCenter(" דוא\"ל:"+$rootScope.details_list.mail,i);
			l++;
          //  p=p+"\n"+$rootScope.txtCenter(" אימייל:"+$rootScope.details_list.mail);
        }
				//a[i][l]="";
				//l++;

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
		today = dd+'/'+mm+'/'+yyyy;
				a[i][l]=$rootScope.itemLine(today, d,i);
				l++;
				a[i][l]=$rootScope.txtCenter("<hr>",i);
				l++;
				a[i][l]=$rootScope.txtCenter("דמי מחזור",i);
				l++;
				a[i][l]=$rootScope.txtCenter("<br>",i);
				l++;
				a[i][l]=$rootScope.itemLine("מספר סרט:",journal,i);
				l++;

				a[i][l]=$rootScope.itemLine("מספר קופה:",stock,i);
				l++;
				a[i][l]=$rootScope.txtCenter("<br>",i);
				l++;
				a[i][l]=$rootScope.txtCenter("סכום דמי מחזור: "+open_c,i);
				l++;
				a[i][l]=$rootScope.txtCenter("עבודה נעימה",i);
				l++;
				a[i][l]=$rootScope.txtCenter("<br>",i);
				l++;
				a[i][l]=$rootScope.txtCenter("<br>",i);
				l++;
				a[i][l]=$rootScope.txtCenter("<br>",i);
				l++;
		}
				printPrinter(a);

	}

	$scope.img="images/color"+1+".png";

	$scope.openwrap3 = function(str,popup){
		$(".container_pop")	.hide();
		$(popup).css({'z-index':'9999'});
	    $(popup).fadeIn();
	    $(".header .fa-cog").addClass('active_cog');
		//$(".wrap").show();
	};
	/*$scope.alert_site=function(msg,type,index_onoff) {
            		if(type==3){
            			$('#message2').html(msg+"<p>נא הקש סיסמה</p><input type='text' name='passn'/>");
            		}
					$(".pop_alert_sett").css({'display':'block'});
					$(".pop_alert_sett").css({'z-index':'9999'});
					$(".pop_alert_sett .container_pop").css({'display':'block'});


           };
    $scope.alert_cancel_sett=function(){
            	if($("input[name=passn").length>0){
            		if($("input[name=passn").val()=='22'){
            			$rootScope.right_pass=1;

            		}
            		else{
            			alert('j');
            		}
            	}
            	$(".pop_alert_sett").css({'display':'none'});
            	$(".pop_alert_sett").css('z-index',"1");
            };
      $scope.call_alert_cancel_sett = function() {
        $scope.alert_cancel_sett();
         $(".pop_alert_sett").css('z-index',"1");
    }*/
	$rootScope.set_menu = function(classname,x) {
		if($rootScope.right_pass==1){
				$rootScope.right_pass=0;

				$scope.openwrap3($(".sett_menu p.active"),classname)
				$(".sett_menu p").removeClass('active');
				$(classname).addClass('active');
			}
		if((classname==".alerts" && $rootScope.premission_list['permission_alerts']=='off')||classname==".permission"||(classname==".checks" && $rootScope.premission_list['permission_checks']=='off')
		||(classname==".prefers" && $rootScope.premission_list['permission_prefer']=='off')||(classname==".details" && $rootScope.premission_list['permission_details']=='off')){
			$rootScope.action="set_menu";
			$rootScope.selector=classname;
			alert.alert_site('משתמש לא מורשה',3,1);

		}
		else{
			$scope.openwrap3($(".sett_menu p.active"),classname)
			$(".sett_menu p").removeClass('active');
			$(classname).addClass('active');
		}

    };
	$scope.set_stat = function(stat) {
		$scope.openwrap3($(".sett_menu p.active"),classname)
		$(".sett_menu p").removeClass('active');
		$(classname).addClass('active');

    };

    $scope.add_to_recepit = function(stat) {
    	$rootScope.details_list[stat] = ($rootScope.details_list[stat] == '1')?'0':'1';
		/*var x={"type":stat};
		var task="add";
		var y=0;
		$rootScope.recepite_list.filter(function( obj,i ) {
					if(obj.type === stat){
						y=i;
						$("."+stat).removeClass('sett_recepit');
						task="remove";
						return;
					}
			});
		if(task=='add'){
			$rootScope.recepite_list.push(x);
			$("."+stat).addClass('sett_recepit');
		}
		else{
			delete $rootScope.recepite_list[y];
		}*/
    };


    $scope.theme = function(stat,img,logo) {
    	for (var i=2; i < 6; i++) {
		  $('body').removeClass('theme'+i);
		};
		$('body').addClass(stat);
		//if(user_id!=570)
			//$(".logo_border img").attr('src',"images/"+logo);
		$rootScope.prefers_list['pr_themes']=stat;
		//$scope.img="images/color"+img+".png";
		if(stat==undefined){
			stat="";
		}
		//localStorage.setItem("theme",stat);
    };
    $scope.save_details = function() {
    	// window.location.href=	window.location.href+"&online="+$scope.prefers_online;
    	$rootScope.details_list.name=$("#st_det_name").val();
    	$rootScope.details_list.tz=$("#st_det_tz").val();
    	$rootScope.details_list.tel=$("#st_det_tel").val();
    	$rootScope.details_list.fax=$("#st_det_fax").val();
    	$rootScope.details_list.address=$("#st_det_address").val();
    	$rootScope.details_list.mikud=$("#st_det_mikud").val();
    	$rootScope.details_list.mail=$("#st_det_mail").val();
    	$rootScope.details_list.address=$("#st_det_address").val();
    	$rootScope.details_list.web=$("#st_det_web").val();
    	$rootScope.details_list.logo=$("#st_det_logo").val();
    	$rootScope.details_list.comments=$("#st_det_comments").val();
    	$rootScope.details_list.barkod_len=$("#st_det_barkod_len").val();
    	$rootScope.details_list.desc_len=$("#st_det_desc_len").val();
    	$rootScope.details_list.total_len=$("#st_det_total_len").val();
    	$http.post('inc/functions.php',  $.param({save_details: 1,data_sett:$rootScope.details_list,stock11:stock}), {
		        	headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
		   		 }).success(function(data){
		   		 	//alert(data);
			  	});
			 // local.set_local('prefers_list',$rootScope.prefers_list);
			 $( '.wrap' ).click();
   };
    $scope.save_prefers = function() {

    	$("#a_c_group").val($("#pr_group").val());
    	if($("#pr_group").val()=='?'||$("#pr_group").val()=='-1'){

    	}
    	else{
    		$rootScope.pr_discount= $rootScope.clientgroups[$("#pr_group").val()].Percent;
    	}

    	// window.location.href=	window.location.href+"&online="+$scope.prefers_online;
    	$rootScope.prefers_list.pr_lang=$("#pr_lang").val();
    	$rootScope.prefers_list.pr_currency=$("#pr_currency").val();
    	$rootScope.prefers_list.pr_theme=$("#pr_theme").val();
    	//$rootScope.prefers_list.pr_online=$("#pr_online").val();
    	$rootScope.prefers_list.pr_slika=$("#pr_slika").val();
    	$rootScope.prefers_list.pr_masof=$("#pr_masof").val();

     	if($rootScope.prefers_list.pr_currnumcust==""||$rootScope.prefers_list.pr_currnumcust==0||$rootScope.prefers_list.pr_numcust!=$("#pr_numcust").val()  ){
     		$rootScope.prefers_list.pr_numcust=$("#pr_numcust").val();
    		$rootScope.prefers_list.pr_currnumcust=$rootScope.prefers_list.pr_numcust;
    	}
    	else{
    		$rootScope.prefers_list.pr_numcust=$("#pr_numcust").val();
    	}
    	//$rootScope.prefers_list.pr_currnumcust=$("#pr_currnumcust").val();

    	$rootScope.prefers_list.pr_group=$("#pr_group").val();
    	//$rootScope.prefers_list.pr_viewprod=$(".pr_viewprod").val();
    	
    	/*$rootScope.prefers_list.pr_viewpayment_mezuman=$(".pr_viewpayment_mezuman").val();
    	$rootScope.prefers_list.pr_viewpayment_amchaa=$(".pr_viewpayment_amchaa").val();
    	$rootScope.prefers_list.pr_viewpayment_credit=$(".pr_viewpayment_credit").val();
    	$rootScope.prefers_list.pr_viewpayment_shovarzicuy=$(".pr_viewpayment_shovarzicuy").val();
    	$rootScope.prefers_list.pr_viewpayment_akafa=$(".pr_viewpayment_akafa").val();
    	$rootScope.prefers_list.pr_viewpayment_prepaid=$(".pr_viewpayment_prepaid").val();
    	$rootScope.prefers_list.pr_viewpayment_shovar=$(".pr_viewpayment_shovar").val();*/
    	
    	$rootScope.prefers_list.pr_currpass=$("#pr_currpass").val();
    	$rootScope.prefers_list.pr_pass=$("#pr_pass").val();
    	$rootScope.prefers_list.pr_pass2=$("#pr_pass2").val();
    	flag_pass=0;
    	if($("#pr_pass2").val()!='' || $("#pr_pass").val() !='' || $("#pr_currpass").val()!='' ){
    		flag_pass=1;
    	}
    	/*sk 07/01/16 show payments buttons on main page*/
    	$rootScope.prefers_list.check_global_item=$rootScope.prefers_list.pr_global_item=='on'?1:0;
    	$rootScope.prefers_list.check_tip=$rootScope.prefers_list.pr_tip=='on'?1:0;
    	$rootScope.prefers_list.check_cash_button=$rootScope.prefers_list.pr_show_cash_button=='on'?1:0;
    	$rootScope.prefers_list.check_credit_button=$rootScope.prefers_list.pr_show_credit_button=='on'?1:0;
    	$rootScope.prefers_list.check_cheque_button=$rootScope.prefers_list.pr_show_cheque_button=='on'?1:0;
    	$rootScope.prefers_list.check_akafa_button=$rootScope.prefers_list.pr_show_akafa_button=='on'?1:0;
    	$rootScope.prefers_list.check_prepaid_button=$rootScope.prefers_list.pr_show_prepaid_button=='on'?1:0;
    	$rootScope.prefers_list.check_shovar_button=$rootScope.prefers_list.pr_show_shovar_button=='on'?1:0;
    	$rootScope.prefers_list.check_shovarzicuy_button=$rootScope.prefers_list.pr_show_shovarzicuy_button=='on'?1:0;
    	$http.post('inc/functions.php',  $.param({save_prefers: 1,data_sett:$rootScope.prefers_list}), {
		        	headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
		   		 }).success(function(data){
		   		if(data=='22'){
		   		 		flag_pass=2;
		   		 		$("#pr_pass").val('');
		   		 		$("#pr_pass2").val('');
		   		 		$("#pr_currpass").val('');
		   		 		alert.alert_site('סיסמה נוכחית לא נכונה', 0, '');
		   		 	}
		   		 	if(data=='11'){
		   		 		$("#pr_pass").val('');
		   		 		$("#pr_pass2").val('');
		   		 		$("#pr_currpass").val('');
		   		 		flag_pass=2;
		   		 		alert.alert_site('ש להזין סיסמאות תואמות', 0, '');
		   		 	}
		   		 	if(flag_pass==1){
		   		 		$("#pr_pass").val('');
		   		 		$("#pr_pass2").val('');
		   		 		$("#pr_currpass").val('');
		   		 		$( '.wrap' ).click();
		   		 	}

			  	});
			 // local.set_local('prefers_list',$rootScope.prefers_list);
				 if(flag_pass==0)
			 $( '.wrap' ).click();
    }

 }]);
 app.controller('SettingsStat',[ '$scope', '$rootScope', '$http','cash_global','local',function ($scope,$rootScope, $http,cash_global,local){


	$scope.prefers_online='on';
	$scope.stat='off';


	$rootScope.premission_list={

		"permission_open_drawer":(premission_list[0]['drawer_open']==1?'on':'off'),
		"permission_openclose_kupa":(premission_list[0]['kupa_openclose']==1?'on':'off'),
		"permission_hours":(premission_list[0]['time']==1?'on':'off'),
		"permission_alerts":(premission_list[0]['alerts']==1?'on':'off'),
		"permission_zicuy":(premission_list[0]['promotional']==1?'on':'off'),
		"permission_discountprod":(premission_list[0]['discount_prod']==1?'on':'off'),
		"permission_discount":(premission_list[0]['discount_cash']==1?'on':'off'),
		"permission_prefer":(premission_list[0]['prefers']==1?'on':'off'),
		"permission_checks":(premission_list[0]['checkings']==1?'on':'off'),
		"permission_langs":(premission_list[0]['lang_mng']==1?'on':'off'),
		"permission_worker":(premission_list[0]['charge_worker']==1?'on':'off'),
		"permission_worker_cach":(premission_list[0]['worker_cash']==1?'on':'off'),
		"permission_backoffice":(premission_list[0]['enter_mng']==1?'on':'off'),
		"permission_force_cash":(premission_list[0]['force_cash']==1?'on':'off'),
		"permission_details":(premission_list[0]['details']==1?'on':'off')
	};


	//$rootScope.premission_list['permission_worker']=charge_worker==1?'on':'off';
	$rootScope.lrt_list={
		"lrt_sendemail":"off",
		"lrt_sms":"off",
		"lrt_openkupa":"off",
		"lrt_closeup":"off",
		"lrt_zicuy":"off"
	};

	$scope.set_stat2 = function(selector) {

		if(selector.indexOf('prefers')>-1){
			$scope.prefers_online=$scope.prefers_online=='on'?'off':'on';
		}
		$("."+selector+'.off').animate({
				'right': '53%'
			}, function() {
		  });
		$("."+selector+'.on').animate({
				'right': '0'
			}, function() {
		  });

    };



     $scope. save_premission = function() {

    	 		$http.post('inc/functions.php',  $.param({save_premission: 1,data_sett:$rootScope.premission_list}), {
		        	headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
		   		 }).success(function(data){

			  	});
			 // local.set_local('premission_list',$rootScope.premission_list);
			 $( '.wrap' ).click();
    }

	$scope.set_stat = function(selector) {

		if(selector.indexOf('permission')>-1){
			$scope.stat=$rootScope.premission_list[selector]=='on'?'off':'on';
			$rootScope.premission_list[selector]=$scope.stat;
		}
		else if(selector.indexOf('lrt')>-1){
			$scope.stat=$rootScope.lrt_list[selector]=='on'?'off':'on';
			$rootScope.lrt_list[selector]=$scope.stat;
		}
		if(selector.indexOf('pr_')>-1){
			$scope.stat=$rootScope.prefers_list[selector]=='on'?'off':'on';
			$rootScope.prefers_list[selector]=$scope.stat;
		}
		else {

		}
		$("."+selector+'.off').animate({
				'right': '53%'
			}, function() {
		  });
		$("."+selector+'.on').animate({
				'right': '0'
			}, function() {
		  });
    };
            //sk 07/01/16 animate in display buttons and set the button display imn the main page
    	$scope.set_stat_buttons = function(selector) {
		if(selector.indexOf('pr_')>-1){
			$scope.stat=$rootScope.prefers_list[selector]=='on'?'off':'on';
			$rootScope.prefers_list[selector]=$scope.stat;
			if($scope.stat=='on'){
				$("#in_"+selector).css("display", "");
			}
			else{
				$("#in_"+selector).css("display", "none");
			}

			}
			else {

			}
			$("."+selector+'.off').animate({
					'right': '53%'
				}, function() {
			  });
			$("."+selector+'.on').animate({
					'right': '0'
				}, function() {
			  });
	    };

 }]);
})();