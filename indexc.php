<!DOCTYPE html>
<html lang="he" ng-app="cashbox">
  <head>
    <title></title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <meta charset="UTF-8">
  <?
  
  	//include 'prodj2.php';
  	$cashbox=true;
	//print_r($_COOKIE);
	//require("../include/common.php");
	$simple=1;
	
$flg=0;
	require("../include/common.php");
	
	include "inc/conn.inc";
	$rootdir 	=$GOCONFIG->file_storage_path;
	$stock=$_REQUEST['stock'];
	
	if(!isset($_REQUEST['stock'])){
		$query="select ID,StockName,TerminalID,
	 initBalance, 
	initBalanceOfficeUserId  as initBalanceUser, 
	initBalanceTimestamp as initBalanceDate,
	SortOrder from vcx_weberp.listingsStocks s where TerminalID!=999999 and user_ID = $userID and Status=1 
    and (id in (select stock_id from vcx_weberp.userstocks where userid = $userID2 and r=1) or $userID2=$userID)
    order by SortOrder, binary StockName";
	//echo $query;
    $result=mysql_query($query);
		if(mysql_num_rows($result)==1){
			$row=mysql_fetch_array($result);
			$stock=$row[TerminalID];
			
		}
		else{
			$stock=-1;
		}
	}
	$rootdir.="$username/POS/$stock";
	$target_image_dir="../../../officefiles/".$username."/_MlaitekPro";
	if($stock>1){
		function sql2json($query) {
    $data_sql = mysql_query($query) or die("'';//" . mysql_error());// If an error has occurred, 
            //    make the error a js comment so that a javascript error will NOT be invoked
    $json_str = ""; //Init the JSON string.

    if($total = mysql_num_rows($data_sql)) { //See if there is anything in the query
        $json_str .= "[\n";

        $row_count = 0;    
        while($data = mysql_fetch_assoc($data_sql)) {
            if(count($data) > 1) $json_str .= "{\n";

            $count = 0;
            foreach($data as $key => $value) {
            	$value=str_replace("\'", "", $value);
                //If it is an associative array we want it in the format of "key":"value"
                if(count($data) > 1) $json_str .= "\"$key\":\"$value\"";
                else $json_str .= "\"$value\"";

                //Make sure that the last item don't have a ',' (comma)
                $count++;
                if($count < count($data)) $json_str .= ",\n";
            }
            $row_count++;
            if(count($data) > 1) $json_str .= "}\n";

            //Make sure that the last item don't have a ',' (comma)
            if($row_count < $total) $json_str .= ",\n";
        }

        $json_str .= "]\n";
    }

    //Replace the '\n's - make it faster - but at the price of bad redability.
    $json_str = str_replace("\n","",$json_str); //Comment this out when you are debugging the script
//$json_str=str_replace("'","",$json_str);
    //Finally, output the data
    return $json_str;
}
			$sql="select StockName,ID from vcx_weberp.listingsStocks where TerminalID=$stock and user_ID=$userID";
			//echo $sql;
			$dbname 	= $GOCONFIG->stock_db_name;

			$rs = $conn->Execute($sql);
			echo mysql_error();
			while (!$rs->EOF) {
				$stockname=$rs->fields[StockName];
				$stockid=$rs->fields[ID];			
				$rs->MoveNext(); 
			}
			$dbname="vcx_$username";
		$sql="select action,id from vcx_$username.cashbox_actions where terminal_id=$stock order by id desc limit 1";
			$rs = $conn->Execute($sql);
			echo mysql_error();		
			if($rs->EOF){
				$stat="close_cashbox";
			}	
			else{
				$stat=$rs->fields[action];				
			}
			//echo $stat;
			
			

	}
?>
    <!--src="../../../officefiles/yedatop/POS/$stockname/prod.js" -->
    <script src="../../../officefiles/yedatop/POS/<?=$stockname?>/prod.js"  type="text/javascript"></script>
    <link href="js/bootstrap/bootstrap.min.css" rel="stylesheet" media="screen"> 
 	<script src="angucomplete-alt-master/angucomplete-alt.css"  rel="stylesheet" ></script>
    <script src="js/angular.min.js" type="text/javascript"></script>
    
<script src="js/datepicker.js" type="text/javascript"></script>
    <script src="http://hamefits.com/proj/yitzhar/cashbox.js" type="text/javascript"></script>
    <script src="js/product.js" type="text/javascript"></script>
    <script src="js/client.js" type="text/javascript"></script>
    <script src="js/worker.js" type="text/javascript"></script>
    <script src="js/payment.js" type="text/javascript"></script>
    <script src="js/jquery.cookie.js" type="text/javascript"></script>
	<script src="js/anacha.js" type="text/javascript"></script>
	<script src="js/pause.js" type="text/javascript"></script>
	<script src="js/achlafa.js" type="text/javascript"></script>
	<script src="js/keyboard.js" type="text/javascript"></script>
	<script src="js/debtpayment.js" type="text/javascript"></script>
	<script src="js/add_prod.js" type="text/javascript"></script>
	<script src="js/settings.js" type="text/javascript"></script>
	<script src="js/fastclick.js" type="text/javascript"></script>
    <link href="http://netdna.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css" rel="stylesheet"> 
    <link href="css/style.css" rel="stylesheet" media="screen">   
    <script src="http://code.jquery.com/jquery-latest.min.js" type="text/javascript"></script>
   <!-- <object style="display:none" id="SOME_ID" classid="clsid:SOME_CLASS_ID" codebase="./somePath.dll"></object>-->
   
    <script src="angucomplete-alt-master/angucomplete-alt.js" type="text/javascript"></script>
    <!--<script src="js/jquery.cookie.js" type="text/javascript"></script>-->
    <link rel="stylesheet" href="//code.jquery.com/ui/1.11.2/themes/smoothness/jquery-ui.css">
     <script src="//code.jquery.com/ui/1.11.3/jquery-ui.js"></script>
     <script src="http://hamefits.com/proj/yitzhar/script.js" type="text/javascript"></script>
     
  </head>
  <body class="" onload="initFastButtons();" ng-controller="CashboxController as cashc">
  
    

  	<span id="fastclick">
	<div class="disable_cash" style="position: absolute;width:100%;height:100%;z-index: 999;background: rgba(31, 30, 30, 0.7)"></div>
  	<script>   		
		function invoice(){
			android.invoice_details();
		}  
		
  	</script>  
  	<?


  	if($stock<1){ 
  		
	?>
	<script>
		$(document).ready(function(){ 	
		
   alert(navigator.appVersion +navigator.appName );

			$('#select_kupa').change(function(){				
				if($('#select_kupa').val()!=-1){
					window.location.href="?stock="+$('#select_kupa').val();					
				}
			});
		});
	</script>
		<div style="position: absolute;width:100%;height: 100%;z-index: 1000;background: rgba(40, 38, 38, 0.9);">
			<div style="background-color: white;z-index: 2000;width: 400px;height: 208px;margin: 0 auto;margin-top: 100px;padding: 50px;">
				<h2 style="text-align: center;font-size: 170%;">בחר קופה:</h2>
				<select id="select_kupa" style="font-size: 120%;margin: 66px;">
					<option value="-1">בחר קופה</option>
		
<?
						$dbname 	= $GOCONFIG->db_name;
						$sql = "select TerminalID, StockName 
						from $TABLE_LISTINGSSTOCKS s
						where user_id = $userID AND TerminalID !=999999";
						/*$sql="SELECT TerminalID, StockName  FROM listingsStocks where StockName != ''  and (user_id = (select stock_user from vcx00.users where id = '$user_id') or user_id = '$user_id') ORDER BY StockName";*/
						//echo "<!--sql:$sql-->";
						$rs = $conn->Execute($sql);
						while (!$rs->EOF) {
							$stock=$rs->fields[StockName];
							$term=$rs->fields[TerminalID];
							echo "<option value='$term'>$stock</option>";
							$rs->MoveNext(); 
						}

?>					
				</select>
			</div>
		</div>
		
<?
	}
else{
?>
			<script>
			$(document).ready(function(){ 
				$(".openclose.cl").css({position: 'absolute'});
			});
			</script>
<?	
}
	
if(isset($_REQUEST[yitrat_kupa])){
	$sql="select max(ID) as JournalNum2 from vcx_$username.transactionpackages";
	$dbname 	= $GOCONFIG->stock_db_name;
	$flg=1;
				$rs = $conn->Execute($sql);
				echo mysql_error();
				if($rs->EOF){
					$journal=0;
				}
				else{
					$journal=$rs->fields[JournalNum2];	
				}
				$journal=$journal+1;
				$date1=date("Y-m-d h:i:s");
				$date2=time();
				$sql="INSERT INTO vcx_$username.transactionpackages( `stock_id`, `TerminalID`, `JournalNum`, `TransCount`, `JournalDate`, `DateTimeStamp`,`start_cash`)
				VALUES ('$stockid','$stock','$journal','0','$date1','$date2','$_REQUEST[yitrat_kupa]')";
				$rs = $conn->Execute($sql);	
				$sql="";		
				$trannum=1;			
				$sql="insert into vcx_$username.cashbox_actions (action,terminal_id) values ('open_cashbox',$stock)";
				mysql_query($sql);
				?>
				<script>
				function createCookie(name,value,days) {
				    if (days) {
				        var date = new Date();
				        date.setTime(date.getTime()+(days*24*60*60*1000));
				        var expires = "; expires="+date.toGMTString();
				    }
				    else var expires = "";
				    document.cookie = name+"="+value+expires+"; path=/";
				}
				createCookie("journal","<?=$journal?>",7);
				</script>
				<?
				//$journal=mysql_insert_id();
				echo "<!--journal:$journal-->";
				echo mysql_error();
				$stat="open_cashbox";			
?>

				<script>
					var journal=<?=$journal?>;
					var start_cash=<?=$_REQUEST[yitrat_kupa]?>;
				</script>
				
<?				
					
	}
	elseif(isset($_REQUEST[machzor])){
		$sql="insert into vcx_$username.cashbox_actions (action,terminal_id) values ('close_cashbox',$stock)";
				mysql_query($sql);
				echo mysql_error();
				$stat="close_cashbox";
				$sql="select max(JournalNum) as JournalNum2,TransCount from vcx_$username.transactionpackages where TerminalID=$stock";
		
		$rs = $conn->Execute($sql);
		
		$journal=$rs->fields[JournalNum2];
		if(isset($_COOKIE[trannum])){
			$sql="update vcx_$username.transactionpackages set TransCount=$_COOKIE[trannum] where JournalNum=$journal and TerminalID=$stock";
			$trannum=$_COOKIE[trannum];
		}
		else{
			$trannum=$rs->fields[TransCount]+1;
		}
		if (file_exists($_SERVER['DOCUMENT_ROOT'].'/modules/stock/cashbox2/bill/json'))
		{
		    $put=file_get_contents($_SERVER['DOCUMENT_ROOT'].'/modules/stock/cashbox2/bill/json');
		  //  $put=substr($put,1,-1);
		    $put='http://a.yeda-t.com/modules/stock/plujson.php?com=trans|yedatop|'.$stock.'|{"transactions":{"terminal":"'.$stock.'","transaction":'.$put.'}}';
		//echo	urlencode($put);
		$put = preg_replace('/\s+/', '', $put);
	       $answer= file_get_contents($put);
	       if(trim($answer) == "ok"){
		   //file_put_contents($_SERVER['DOCUMENT_ROOT'].'/modules/stock/cashbox2/bill/json', "[]");
		   }
			else{
				echo "errorrrrrrrrrrrrrrr $answer";
			}
	      
		    //$put=json_decode($put,true);
		}
	}
	else{
		$sql="select max(ID) as JournalNum2,TransCount,start_cash from vcx_$username.transactionpackages where TerminalID=$stock";
		
		$rs = $conn->Execute($sql);
		
		$journal=$rs->fields[JournalNum2];
		$start_cash=$rs->fields[start_cash]; 
		/*if(isset($_COOKIE[trannum])){
			$sql="update vcx_$username.transactionpackages set TransCount=$_COOKIE[trannum] where id=$journal and TerminalID=$stock";
			$trannum=$_COOKIE[trannum];
		}
		else{
			$trannum=$rs->fields[TransCount]+1;			
		}*/

?>

				<script>
					var journal=<?=$journal?>;
					var start_cash=<?=$start_cash?>;
				</script>
				
<?				
	
	}
	if($stat=="open_cashbox" && $flg!=1){
				if($_COOKIE[journal]!=$journal){
					$stat="close_cashbox";
					
					?>
				<label style="z-index: 9999999999999999;position: absolute;z-index: 1000;font-size: 150%;color: white;top: 85px;right: 200px;">
				
הקופה פתוחה במחשב אחר על מנת לסגור את הקופה במחשב השני ולפתוח מחדש לחץ על פתיחת קופה				
</label>
					<?
				}
			}
	/*$sql = "
			select *,CASE
           WHEN lse.SalePrice is NULL THEN ld.SalePrice          
           ELSE lse.SalePrice
        END as SalePrice,ld.ID as ID from  vcx_$username.listingsDB as ld LEFT OUTER JOIN vcx_$username.listingsStocksElements as lse on lse.ListingID=ld.ID and lse.StockID=$stockid limit 8000 ";
	$productj=sql2json($sql);
	
	
	
	?>
	<script>
			var productj=<?=$productj?>;
	</script>
	<script>
	/*var productj="";
	$.ajax({
					url : 'get_data.php',
					type : 'POST',					
					data : {
						stat2 :  "prod",
						stock:5000011
					},
					error : function() {
						alert('k');
						return true;
					},
					success : function(data) {
						
						 var start = data.indexOf("jsonprod:");
					   	var end = data.indexOf(":jsonprod");
					   	var len="jsonprod".length+1;
					   	str=data.substr(start+len,end-start-len);
					   	productj=JSON.parse(str);
					   	alert(str);
					}
				});
			*/
	</script>
  	<script type="text/javascript">
  	function launchFullScreen(element) {
	  if(element.requestFullScreen) {
	    element.requestFullScreen();
	  } else if(element.mozRequestFullScreen) {
	    element.mozRequestFullScreen();
	  } else if(element.webkitRequestFullScreen) {
	    element.webkitRequestFullScreen();
	  }
	}
  	function full_screen(){		
  		if((window.fullScreen) ||
		   (window.innerWidth == screen.width && window.innerHeight == screen.height)) {
			// Launch fullscreen for browsers that support it!
				launchFullScreen(document.documentElement); // the whole page
				
				//launchFullScreen(document.getElementById("videoElement")); // any individual element
		} else {
		
		}
		
  	} 

</script>
<?
if($stat=="open_cashbox"){
				?>
				<script>
				$(document).ready(function(){
					$(".disable_cash").hide();	
					$(".clock").css("position","inherit");
				});
					
				</script>
<?	
			}
?>



<script>
$( document ).ready(function() {
		
	/*$( "body" ).delegate( "#cust_search_value", "focus", function() {
		searchStr='ddd';
		focus_element="#cust_search_value";
   		str=".popup.keyboard";
   		popup=".popup.keyboard,.popup.keyboard .container_pop";
   		$(str).css({'z-index':'9999'});
	    $(popup).fadeIn();
		$(".wrap").show();
	});*/
});

	
</script>

<div class="wrap display"></div>
	
	<keyboard></keyboard>
	<anacha></anacha>	
	<settdetails></settdetails>
	<addcust></addcust>
	<beynaim></beynaim>
	<achlafa></achlafa>	
	<pause></pause>
	<clock></clock>
	<prepaid></prepaid>	
	<comment></comment>
	<payment1></payment1>
	<addprod></addprod>
	<div class="popup pop_peulot  pop_debtpayments" style="z-index: 9999;left:25%" ng-controller="DebtController">
		<!--<img src="images/box_small.png" class="img_wrap"/>	-->	
		<div class="container_pop debt" ng-controller="Client">
		<h2 class="relative">תשלום חוב</h2>
			<p style="font-size: 200%;margin-top: 20px;margin-bottom: 10px;">הכנס לקוח</p>
			<div class="large-padded-row" style="  display: inline-block; width: 96%;" >
			      <div angucomplete-alt id="cust_search" placeholder="חיפוש לקוחות" pause="100" selected-object="selectedClient" local-data="clients" search-fields="SupplierName,sortorder" title-field="SupplierName"  minlength="1" input-class="form-control form-control-small  my_search_auto" match-class="highlight" clear-selected="true" >
			     </div> 
			</div>
			<p class="" style="font-size: 200%;margin-top: 20px;margin-bottom: 10px;">הכנס סכום</p>
			<input type="text" class="text debt_sum" style="width: 92%;background: white;border: 1px solid #cfd2d9;height: 37px;"/>
			<div class="newrow2 find_cust_container display"><label class="lbl1 name">שם: {{SearchClient.SupplierName}}</label><span>|</span></span><label class="lbl2 border num">מספר: {{SearchClient.ClientNum}}</label>
  				<i class="fa fa-calendar" style="color: black;margin-right: 26px;"></i>
  				<label class="lbl1">ביקור אחרון: 25.06.2014</label><i class="fa fa-info-circle" style="margin-right: 18px;  color: #e65844;  color: #e65844;"></i></span><label class="lbl2 border yitrat_hov" style="padding-right: 5px;">יתרה: </label>
  			</div>
			<input class="mybtn leftbottom btnblue " type="button" value="אישור" ng-click="start_debt()"/>
			<input class="mybtn btnlightgray rightbottom" onclick="$( '.wrap' ).click();" type="button" value="ביטול">
			
		</div>
	</div>	
	<div class="popup pop_peulot  pop_chooseworker" style="z-index: 9999;left:25%" >
			<div class="container_pop add_worker" ng-controller="WorkerController  as workers">
			<h2 class="relative" style="  font-size: 150%;margin: 20px;"> עובדים:</h2>
	
			
			<table class="workers_tb" style="width: 98%;">
				<tr>
					 <th>שם עובד</th>
					 <th>טלפון</th>
					 <th>נייד</th>
					 <th>אימייל</th>
					 <th>מס"ד</th>
					 <th></th>
				</tr>
				
				<tr class="worker_{{worker1.WorkerNum}}" ng-repeat="worker1 in workerslist" data-id="{{worker1.WorkerNum}}" ng-click="workers.choose_worker(this,worker1.WorkerNum)" >
					<td>{{worker1.SupplierName}}</td>
					<td>{{worker1.Phone}}</td>
					<td>{{worker1.CellPhone}}</td>
					<td>{{worker1.Email}}</td>
					<td>{{worker1.WorkerNum}}</td>
					<td><i  class='fa fa-check-circle display'></i></td>
				</tr>		
			</table>
						<input class="mybtn btngray rightbottom" type="button" value="ביטול" ng-click="workers.cancel_choose()" onclick="$( '.wrap' ).click();" >
			<input class="mybtn btnblue leftbottom" onclick="$( '.wrap' ).click();" ng-click="workers.save_choose()" type="button" value="בחירה">
		</div>
	</div>
  <div class="header" style="z-index: 99999">
  	<i class="fa fa-bars"></i>
	<!--<div class="inline full_s" onclick="full_screen(this)" style="width:40%;text-align: center;color: white;"><i class="fa fa-tablet" onclick="full_screen(this)"></i><!--<button onclick="invoice();">JavaScript interface</button></div>-->
	<i class="fa fa-tablet" style="  position: absolute;top: 11px;  right: 4%" onclick="full_screen(this)"></i>
	
	<div class="inline relative" style="width:50px;margin-right: 50px;  right: 3px;" onclick="openwrap('.pop_chooseworker','.pop_chooseworker,.pop_chooseworker .add_worker')">
		<i class="left fa fa-user"></i>
		<i class="left fa fa-refresh"></i>
	</div>
	<span style="color:white;width:77px;  display: inline-block;" ng-controller="WorkerController as wrkk">{{SearchWorker.SupplierName}}</span>		
	<i class="fa fa-usd" style="  width: 36px;  margin-top: 10px;" onclick="openwrap3('.popup.pop_beynaim','.popup.pop_beynaim,.pop_beynaim .container_pop');$('.closebb').hide()" ng-click="alltash()"></i>
	<!--<a href="javascript:wopen('http://a.yeda-t.com/modules/stock/cashbox3/top.php?t=clock&fromcash=1&stock=<?=$stock?>','add',900)">-->
	<i class=" fa fa-clock-o clock" style="  width: 45px;  position: absolute;z-index: 999!important;"></i><!--</a>-->
	<i class="fa fa-credit-card prepaid" style="  margin-right: 48px;"></i>	
	<i class="fa fa-money" style="  margin: 0 25px;" onclick="openwrap('.pop_debtpayments','.pop_debtpayments,.pop_debtpayments .debt')"></i>
	<!--<button onclick="localStorage.clear();location.reload();">איפוס</button>
	<button onclick="invoice()">הדפס</button>-->
	<div class="stat inline">
		<label id="stock_name" data-id="<?=$stock?>"><?=$stockname?></label>
	</div>
	<div class="stat inline btn">		
		<div class="openclose op <?if($stat!="open_cashbox")echo "display";?>">
			<i class="fa fa-check"></i>
			<span class=" stt open"  onclick="openwrap('.popup.pop_beynaim','.popup.pop_beynaim,.pop_beynaim .container_pop');$('.closebb').show()" ng-click="alltash()">פתוח</span>
		</div>	
		<div class="openclose cl <?if($stat=="open_cashbox")echo "display";?>" style="z-index: 99999;" >
			<i class="fa fa-times "></i>
			<span class="stt close" style="z-index: 99999;margin-left: 30px;" >סגור</span>
		</div>	
	</div>
	
	<i class=" fa fa-cog" onclick="openwrap3('.pop_sett','.pop_sett,.pop_sett .details')"></i>
	<div class="logo_border">
		<img src="images/logoex.png">		
	</div>
	
  </div>
  <div class="leftmenu display">
  	<div class="leftmenu_inner" onclick="location.href='top.php?t=clients&stock=<?=$stock?>'">
  		<i class=" fa fa-group"></i>
  		<p>לקוחות</p>
  	</div>
  	<div class="leftmenu_inner" onclick='location.href="top.php?t=reports&stock=<?=$stock?>"'>
  		<i class="fa fa-file-text-o"></i>
  		<p>דוחות</p>
  	</div>
  	<div class="leftmenu_inner" onclick="location.href='top.php?t=documents&stock=<?=$stock?>'">
  		<i class=" fa fa-file-o"></i>
  		<p>מסמכים</p>
  	</div>
  	<div class="leftmenu_inner"  onclick="location.href='top.php?t=mail&stock=<?=$stock?>'">
  		<i class="fa fa-envelope-o"></i>
  		<p>מערכת דיוור</p>
  	</div>
  	<div class="leftmenu_inner"  onclick="location.href='top.php?t=prepaid&stock=<?=$stock?>'">
  		<i class=" fa fa-money"></i>
  		<p>כרטיס מתנה</p>
  	</div>
  	<div class="leftmenu_inner"  onclick="location.href='top.php?t=check_check&stock=<?=$stock?>'">
  		<i class="fa fa-check-square-o"></i>
  		<p>בדיקת המחאות</p>
  	</div>
  	<div class="leftmenu_inner"  onclick="location.href='top.php?t=check_credit&stock=<?=$stock?>'">
  		<i class="fa fa-check-square-o"></i>
  		<p>בדיקת אשראי</p>
  	</div>
  </div>

  <div class="mainarea" >
  	<div ng-controller="CashProdController  as cash_prod">
  	<div class="right rightside" ng-controller="ProductController as prod" ng-enter="search_barcode()">
  		
  		<!-- form for barcode. not visible -->
<?
	if(isset($_REQUEST[online])&&$_REQUEST[online]=='off'){
?> 		
		<form>
  			<input type="text" class="search_input1" id="search_prod"   ng-keydown="call_setTab(44)"  ng-model="searchText2.BarCode" ng-model-options="{ debounce: 10000000 }" 
  				style="  background: transparent; border: transparent;  outline: none;color:transparent;  position: absolute; " />
  		</form>
<?
	}
	else{
?>
  		<form>
  			<input type="text" class="search_input1" id="search_prod"  
  				style="  background: transparent; border: transparent;  outline: none;color:transparent;  position: absolute; " />
  		</form>  		 		
  		

 <?
	}
 ?> 		
  <form class="search_form relative">
 <?
	if(isset($_REQUEST[online])&&$_REQUEST[online]=='off'){
?> 		
		<input type="text" class="search_input" id="search_prod2"   ng-keydown="call_setTab(4)"  placeholder="חיפוש מוצר"  ng-model="searchText"  />
<?
	}
	else{
?>
  		<input type="text" class="search_input" id="search_prod2"  placeholder="חיפוש מוצר"  />

 <?
	}
 ?> 
			
			<input type="button" ng-click="search_p();call_setTab(4)" class="search_p_global" value="חפש"/>
			<i class="fa fa-plus-circle search_p_plus" ></i>
			<i class="fa fa-search" ></i>
			<!--<a href="javascript:wopen('http://a.yeda-t.com/modules/stock/add_listing.php?&simple=1&fromcash=1','add')">	-->
				
  			<div class="relative submit_wrap"> 				
  				<input type="button"  value="" onclick="openwrap3('.pop_add_prod','.pop_add_prod ,.pop_add_prod .container_pop')"/>
  				<i class="fa fa-tag"></i>				
				<i class="fa fa-plus"></i>
  			</div>
  		</a>
  		</form>
  		<div >
  		<div class="rightcenter prod_area relative" ng-show="call_isSet(1)" > 			
  			<div class="prod_div">
  			<div class="prod_title">
				<p id="cat_name" style="margin-right: 15%;">מחלקות</p>				
				<span id="num_product" style="float: left;margin-top: 11px;margin-left: 8px;color: white;"></span>
			</div>			 		 
  			<div class="prod_container">
  				<div id="resizable" class="prod_row ui-widget-content" style="text-align: center;"> 
  					<i class="fa fa-spinner fa-spin spinner1" style="font-size: 100px;  color: rgb(85,193,231);margin-top: 7%;"></i> 						
  					<div class="prod"  ng-repeat="cat in prod.catJson">
  					<div  class=" first main_cat" id="button_cats_{{cat.ID}}" ng-click="prod.getCategory2(cat.ID,cat.Title)">  						
  						<img ng-src="{{prod.image('<?=$target_image_dir?>',cat.picture)}}"></img>
						<p>{{cat.CategoryName|cut:true:15:' ...'}}</p>
  					</div>
					</div>
    				</div>
  			</div>
  			</div>
  			<!--<img src="images/arrow_o.png" class="arrow_o"/>-->
  			
  		</div>
  		<div class="rightcenter prod_area relative" ng-show="call_isSet(3)">
  			<div class="prod_div">
  			<div class="prod_title">
  				<p ng-click="call_setTab(1);reset()" class="prod_btntop">למחלקות</p>				
				<p  class="prod_btntop" ng-click="prev()" ng-show="isprev()">הקודם</p>
				<p  class="prod_btntop" ng-click="next()" ng-show="isnext()">הבא</p>
				<span id="num_product" style="float: left;margin-top: 11px;margin-left: 8px;color: white;">מס' הפריטים: <span class="numpritim1">{{filtered.length}}</span></span>
			</div>			 		 
  			<div class="prod_container">
  				<div id="resizable" class="prod_row ui-widget-content" style="text-align: center;"> 
  						<i class="fa fa-spinner fa-spin spinner2" style="font-size: 100px;  color: rgb(85,193,231);margin-top: 7%;"></i> 	
  					<div class="prod"  ng-repeat="cat2 in filtered=(prod.products | filter: { ProductGroup: prod.currgroup }  | slice:start:end)" >

  					<div  class=" first main_cat" id="button_cats_{{cat2.ID}}" ng-click="cash_prod.add_cart(cat2)">  						
  						<img src="images/product.png"></img>
						<p>{{cat2.Title|cut:true:15:' ...'}}</p>
  					</div> 					 
					</div>
    				</div>
  			</div>
  			</div>
  			<!--<img src="images/arrow_o.png" class="arrow_o"/>-->
  			
  		</div>  		
<?
	if(isset($_REQUEST[online])&&$_REQUEST[online]=='off'){
?>
  		<div class="rightcenter prod_area relative " ng-show="call_isSet(4);">
  			<div class="prod_div">
  			<div class="prod_title">
  				<p ng-click="call_setTab(1);reset()" class="prod_btntop">למחלקות</p>	
				
				<p  class="prod_btntop" ng-click="prev()" ng-show="isprev()">הקודם</p>	
				<p  class="prod_btntop" ng-click="next()" ng-show="isnext()">הבא</p>
				<span id="num_product" style="float: left;margin-top: 11px;margin-left: 8px;color: white;">מס' הפריטים: <span class="numpritim2">{{filterprod.length}}</span></span>
				
			</div>			 		 
  			<div class="prod_container">
  				<div id="resizable" class="prod_row ui-widget-content"> 
  					
  					<div class="prod"  ng-repeat="cat2 in filterprod=(prod.products | filter: searchText | slice:start:end) " >

  					<div  class=" first main_cat" id="button_cats_{{cat2.ID}}" ng-click="cash_prod.add_cart(cat2)">  						
  						<img src="images/product.png" ></img>
						<p>{{cat2.Title|cut:true:15:' ...'}}</p>
  					</div> 					 
					</div>
    				</div>
  			</div>
  			</div>
  			<!--<img src="images/arrow_o.png" class="arrow_o"/>-->
  			
  		</div>
  		<!--<div class="rightcenter prod_area relative prod_search4" ng-show="call_isSet(44);">
  			<div class="prod_div">
  			<div class="prod_title">
  				<p ng-click="call_setTab(1);reset()" class="prod_btntop">למחלקות</p>	
				
				<p  class="prod_btntop" ng-click="prev()" ng-show="isprev()">הקודם</p>	
				<p  class="prod_btntop" ng-click="next()" ng-show="isnext()">הבא</p>
				<span id="num_product" style="float: left;margin-top: 11px;margin-left: 8px;color: white;">מס' הפריטים: <span class="numpritim2">{{filterprod2.length}}</span></span>
				
			</div>			 		 
  			<div class="prod_container">
  				<div id="resizable" class="prod_row ui-widget-content"> 
  					
  					<div class="prod"  ng-repeat="cat2 in filterprod2=(prod.products | filter: searchText2 | slice:start:end) " >

  					<div  class=" first main_cat" id="button_cats_{{cat2.ID}}" ng-click="cash_prod.add_cart(cat2)">  						
  						<img src="images/product.png" ></img>
						<p>{{cat2.Title|cut:true:15:' ...'}}</p>
  					</div> 					 
					</div>
    				</div>
  			</div>
  			</div>
  			
  			
  		</div>-->
<?
	}
	else{
?>
		<div class="rightcenter prod_area relative " ng-show="call_isSet(4);">
  			<div class="prod_div">
  			<div class="prod_title">
  				<p ng-click="call_setTab(1);reset()" class="prod_btntop">למחלקות</p>	
				
				<p  class="prod_btntop" ng-click="prev()" ng-show="isprev()">הקודם</p>	
				<p  class="prod_btntop" ng-click="next()" ng-show="isnext()">הבא</p>
				<span id="num_product" style="float: left;margin-top: 11px;margin-left: 8px;color: white;">מס' הפריטים: <span class="numpritim2">{{search_prd.length}}</span></span>
				
			</div>			 		 
  			<div class="prod_container">
  				<div id="resizable" class="prod_row ui-widget-content"> 
  					
  					<div class="prod"  ng-repeat="cat2 in filtered=(search_prd |  slice:start:end)" >

  					<div  class=" first main_cat" id="button_cats_{{cat2.ID}}" ng-click="cash_prod.add_cart(cat2)">  						
  						<img src="images/product.png" ></img>
						<p>{{cat2.Title|cut:true:15:' ...'}}</p>
  					</div> 					 
					</div>
    				</div>
  			</div>
  			</div>
  			<!--<img src="images/arrow_o.png" class="arrow_o"/>-->
  			
  		</div>
  		<div class="rightcenter prod_area relative prod_search4" ng-show="call_isSet(44);">
  			<div class="prod_div">
  			<div class="prod_title">
  				<p ng-click="call_setTab(1);reset()" class="prod_btntop">למחלקות</p>	
				
				<p  class="prod_btntop" ng-click="prev()" ng-show="isprev()">הקודם</p>	
				<p  class="prod_btntop" ng-click="next()" ng-show="isnext()">הבא</p>
				<span id="num_product" style="float: left;margin-top: 11px;margin-left: 8px;color: white;">מס' הפריטים: <span class="numpritim2">{{filterprod2.length}}</span></span>
				
			</div>			 		 
  			<div class="prod_container">
  				<div id="resizable" class="prod_row ui-widget-content"> 
  					
  					<div class="prod"  ng-repeat="cat2 in filterprod2=(search_prd_barcode |slice:start:end) " >

  					<div  class=" first main_cat" id="button_cats_{{cat2.ID}}" ng-click="cash_prod.add_cart(cat2)">  						
  						<img src="images/product.png" ></img>
						<p>{{cat2.Title|cut:true:15:' ...'}}</p>
  					</div> 					 
					</div>
    				</div>
  			</div>
  			</div>
  			<!--<img src="images/arrow_o.png" class="arrow_o"/>-->
  			
  		</div>
<?
	}
?>
  		
  		</div>
  		
		<div class="curr_btn" style="height: 40px;position: absolute;bottom: 19px;width: 39%;">
  				<input type="button" class="rightcenter_btn btngreen prod_btn" value="הוסף פריט כללי  / מזער פריסט"  ng-show="call_isSetMulti(1,3,4,44)"  ng-click="call_setTab(2)">
  				<input type="button" class="rightcenter_btn btnorange  calc_btn" value="מחלקות / מוצרים מהירים"  ng-show="call_isSetMultiCalc(2,5)"  ng-click="call_setTab(1)">
  			</div>
  		<div class="rightcenter calc_area"   ng-show="call_isSetMultiCalc(2,5)">
  			<div class="rightcenter calc_area" style="">
  			<form name="Calc">
		<table style="width:100%" border="0" cellpadding="0" cellspacing="0">
		<tbody><tr>
		<td id="result_calc" class="input_result" style="height: 143.8px;">
		<input type="text" name="Input" style="width:98%;padding-right:2%;color:#42494f;height:92%">
		<br>
		</td>
		</tr>
		<tr>
		<td>
		<table class="inner_calc" style="direction: ltr;" border="0" cellpadding="0" cellspacing="0" ng-controller="PaymentController  as payment">
			<tbody><tr>
				
				<td style="height: 143.8px;"><input type="button" name="one" value="  1  " onclick="Calc.Input.value += '1'">  </td>
				<td style="height: 143.8px;"><input type="button" name="two" value="  2  " onclick="Calc.Input.value += '2'">  </td>
				<td style="height: 143.8px;"><input type="button" name="three" value="  3  " onclick="Calc.Input.value += '3'">  </td>
				<td style="height: 143.8px;"><input type="button" class="math" name="plus" value="  +  " onclick="Calc.Input.value += ' + '"></td>
				<td style="height: 143.8px;"><input type="button" class="math" name="clear" onclick="Calc.Input.value = ''" style="background:url('images/erase.png')no-repeat 51% 50% #e6e9ee!important"></td>				
			</tr>
			<tr>
			
		<td rowspan="1" style="height: 143.8px;"><input type="button" name="four" value="  4  " onclick="Calc.Input.value += '4'"></td>
		<td rowspan="1" style="height: 143.8px;"><input type="button" name="five" value="  5  " onclick="Calc.Input.value += '5'">  </td>
		<td rowspan="1" style="height: 143.8px;"><input type="button" name="six" value="  6  " onclick="Calc.Input.value += '6'">  </td>
		<td rowspan="1" style="height: 143.8px;"><input type="button" class="math" name="minus" value="  -  " onclick="Calc.Input.value += ' - '"></td>
		<td rowspan="3" style="position: relative; height: 143.8px;"><div name="DoIt" class="result" onclick="Calc.Input.value = eval(Calc.Input.value);" ng-click="cash_prod.add_new_cart();payment.calc3()"><i class="fa fa-check-circle"></i></div>
			<div name="DoIt" class="result2 display" onclick="Calc.Input.value = eval(Calc.Input.value);anacha_doit()"><i class="fa fa-check-circle"></i></div>
		</td>
			</tr>
			<tr>
		<td style="height: 143.8px;"><input type="button" name="seven" value="  7  " onclick="Calc.Input.value += '7'"></td>
		<td style="height: 143.8px;"><input type="button" name="eight" value="  8  " onclick="Calc.Input.value += '8'">  </td>
		<td style="height: 143.8px;"><input type="button" name="nine" value="  9  " onclick="Calc.Input.value += '9'">  </td>
		<td style="height: 143.8px;"><input type="button" class="math" name="times" value="  x  " onclick="Calc.Input.value += ' * '"></td>
			</tr>
			<tr>
		<td style="height: 143.8px;"><input type="button" name="dot" value="  .  " onclick="Calc.Input.value += '.'"></td>
		<td style="height: 143.8px;"><input type="button" name="zero" value="  0  " onclick="Calc.Input.value += '0'">  </td>
		<td style="height: 143.8px;"><input type="button" name="zerozero" value="  00  " onclick="Calc.Input.value += '00'"></td>
		<!-- <td><INPUT TYPE="button" NAME="DoIt"  VALUE="  =  " OnClick="Calc.Input.value = eval(Calc.Input.value)"></td> -->
		<td style="height: 143.8px;"><input type="button" class="math" name="div" value="  %  " onclick="Calc.Input.value += ' % '"></td>
			</tr>
		</tbody></table>
		</td>
		</tr>
		</tbody></table>
		</form>
  </div>
  		</div>
  	</div>

  	<div class="left leftside">
  		<div ng-controller='Client as clnt'>
		<div  class="relative search_form ">
			 <div class="large-padded-row" style="  display: inline-block; width: 92%;">
			      <div angucomplete-alt id="cust_search" placeholder="חיפוש לקוחות" pause="100" selected-object="selectedClient" local-data="clients" search-fields="SupplierName,sortorder" title-field="SupplierName"  minlength="1" input-class="form-control form-control-small  my_search_auto" match-class="highlight" clear-selected="true" >
			     </div> 
			     <i class="fa fa-search show"></i>
			</div>
			
			<div class="relative submit_wrap" onclick="openwrap('','.pop_add_client,.pop_add_client .container_pop ');$('.client.mainarea2 input').val('')">
				<input type="button"  value="" class="search_cust_sbm" onclick=""/>
				<i class="fa fa-user"></i>
				<i class="fa fa-plus"></i>
			</div>
			
		</div>
  			<div class="newrow2 find_cust_container display"><label class="lbl1 name">שם: {{SearchClient.SupplierName}}</label><span>|</span></span><label class="lbl2 border num">מספר: {{SearchClient.ClientNum}}</label>
  				<span>|</span><i class="fa fa-calendar" style="color: black;padding-right: 12px;"></i>
  				<label class="lbl1">25.06.2014</label>
  				<span>|</span><i class="fa fa-phone" style="color: black;padding-right: 12px;"></i>
  				<label class="lbl1">{{SearchClient.CellPhone}}</label>
  				<i class="fa fa-info-circle" style="margin-right: 18px;  color: #e65844;  color: #e65844;"></i></span><label class="lbl2 border yitrat_hov" style="padding-right: 5px;">יתרה: </label>
  			</div>
  		</div>
  		<div class="details_area" id="cat2" style="width: 100%;overflow-y: scroll;" >
  			<table style="width: 100%;font-size:150%;">
  				<tr class="details_title">
				    <th class="border_table"></th>
				 <!--   <th style="width:20%">בר קוד</th> -->
				    <th>שם פריט</th>
				    <th>מחיר</th>
				    <th  style="">כמות</th>
				    <th>הנחה</th>
				    <th class="border_table">סה"כ</th>
				    <th class="border_table"></th>
				  </tr>
				  <tr class="active tr_{{cash_prd.BarCode}}" ng-repeat="cash_prd in cash_prod.products">		    
				  	<td class="border_table text_center" ng-controller="CommentController as commentC" ng-click="start_comment_prod(cash_prd.BarCode);;call_setTab(5)" onclick="openwrap('.pop_comment_prod','.comment_div_prod,.pop_comment_prod');"><i class="fa fa-info-circle {{cash_prd.commentClass}}"></i></td>		    
				  	<td><p style="height:40px;overflow: hidden;">{{cash_prd.Title|cut:true:15:' ...'}}</p></td>		    
				  	<td class="prod_SalePrice">{{cash_prd.SalePrice}}</td>		    
				  	<td class="text_center"><i class="fa fa-plus-circle" ng-click="cash_prod.plus_count(cash_prd.SalePrice,cash_prd.BarCode,cash_prd.refund)"></i><p style="display: inline-block;width:60px;text-align:center;">{{cash_prd.Amount}}</p><i class="fa fa-minus-circle" ng-click="cash_prod.minus_count(cash_prd.SalePrice,cash_prd.BarCode,cash_prd.refund);"></i></td>
				  	<td onclick="anacha_prod()" ng-click="cash_prod.start_anacha_prod(cash_prd,(cash_prd.SalePrice-cash_prd.Discount)*cash_prd.Amount)"><i class="fa fa-tag {{isdiscount(cash_prd.Discount)}}" style="margin-left: 10px;" ></i>{{cash_prd.Discount}}</td>		    
				  	<td class="border_table padding_5 sum_p_l">{{(cash_prd.SalePrice-cash_prd.Discount)*cash_prd.Amount|fix2}}</td>		    
				  	<td class="border_table text_center" ng-click="cash_prod.remove_cart(cash_prd.BarCode,cash_prd.SalePrice);"><i class="fa fa-times" ></i></td> 		  
				  </tr>
				  
				  
  			</table>
  			
  		</div>
  		
  		<img src="images/zigzag.png" class="bordr_wave"/>
  		
		<div class="abso">
  		<div class="sum_area">
  			<div class="right inline">
  				<div class="newrow1" ng-controller="CommentController as commentC" ng-click="start_comment()" onclick="openwrap('.pop_comment','.comment_div,.pop_comment');"><label class="block" style="  font-size: 120%;"><i class="fa fa-pencil {{commentClass}}" style="width:30px"></i>הוסף הערה</label></div>
  				<div class="newrow2" style="  font-size: 125%;"><label class="lbl1" style="  margin-right: 30px;">סה"כ פריטים: <span id="total_prod">{{countprod}}</span></label></div>
  				<!--<div class="newrow2"><label class="lbl1">שם: יהב כהן</label><span>|</span></span><label class="lbl2 border">מספר: 159</label>
				<label class="lbl3">ביקור אחרון: 25.6.2014</label>
				</div>
  				<div class="newrow3"><label>יתרת חוב: </label><label >  ₪</label><label id=before_tax style="font-size: 150%;"></label></div>-->
  			</div>
  			<div class="left inline">
  				<div class="newrow2"> 				
  					<div style="width: 100%;height: 26px;font-size: 130%;"><label class="right">סכום ביניים:</label><label class="left in_sum zerofloat">{{amount_out}}</label><label class="left">₪</label></div>
  					<div style="width: 100%;height: 26px;font-size: 130%;"><label class="right">18% מע"מ:</label><label class="left tax_sum zerofloat">{{amount_maam}}</label><label class="left">₪</label></div>
  					<div class="before_calc" style="width: 100%;height: 26px;font-size: 130%;display: none"><label class="right">לפני הנחה:</label><label class="left in_sum zerofloat">{{original_afterprod}}</label><label class="left">₪</label></div>  						
  				  				
  				<div class="newrow3"><label class="finall_price zerofloat">{{amount}}</label><span class="curr">₪</span></div>
  				
  			</div>
  			
  		</div>
  		<div style="clear: both;"></div>
  		<div class="peulot" style="font-size: 120%;" >
  			<button  value=""  ng-click="cashc.call_clean()" class="trash"><i class="fa fa-trash-o"></i></button>
  			<input type="button"  value="הנחה" class="anacha" ng-controller="AnachaController as anachaC" ng-click="start_anacha();call_setTab(5)" />
  			<input type="button" class="pause"  value="השהייה"/>
  			<input type="button" class="hachlafa"  value="פ. החלפה" ng-controller="AchlafaController"  ng-click="start_achlafa()"/>
  			<input type="button" ng-click="call_alert_site('פעולת זיכוי',0,'lrt_zicuy');cashc.zicuy()" class="zicuy"  value="זיכוי" />
  			<input type="button"  value="לתשלום" class="pay" ng-controller="PaymentController  as payment"   ng-click="payment.start_pay();call_setTab(5)"/>

  		</div>
		</div>
  	</div>
  </div>
  </div>
  </div>
  <div class="clear"></div>
  <alert></alert>
<style type="text/css" media="screen">
	.ui-widget-content.ng-scope{
		display: inline-block;
	}
</style>
</span>
<div id="receipt"></div>
  </body>
</html>