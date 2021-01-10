<!DOCTYPE html>
<html lang="he" ng-app="cashbox">
  <head>
    <title></title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0,user-scalable=no"/>
    <meta charset="UTF-8"> 
    <script>
      
      
    	var start_cash='<?=$_REQUEST['yitrat_kupa']?>';
    	/*if(typeof android=='undefined'){
		alert("not android");
		}
		else{
			alert("android");
		}*/
		
		
    </script>
  <?


  $stockname='';
	$stockid='';
  	function buildSelect($select_join,$fld_id,$fld_name,$select_name,$select_tag="",
						$selected_id=-1, $where="",$select_tag2="",$select_tag_option="",$def=-1,
						$onChange="",$caption="בחר"){

			if (!strstr($select_join,"select")) {
				$select_join = "select * from $select_join ";
			}


			if (strlen($onChange)>0){ //דוגמה: $onChange= index.php?id_city=
				$tag3 = <<<EOT
onchange="document.location.href='$onChange' + this.value "
EOT;
			}

			$s = "$select_join $where ";
			//echo $s;
			$x = mysql_query($s);
			echo "<select $tag3 $select_tag $select_tag2 name='$select_name' id='$select_name'>";

			//if ($selected_id < 1){
			echo "<option $select_tag_option value=-1>$caption</option>";
			//}


			while ($r = mysql_fetch_array($x)){
				$id = $r[$fld_id];

				$names = explode(",",$fld_name);
				if($fld_name=='Mezahe,Teur'){
					$Tarich=$r[Tarich];
					$name = date('my',strtotime($Tarich))." -";
				}
				else{
					$name = "";
				}

	            foreach ( $names as $key_value ){
	            	$name = $name . " " . $r[$key_value];
	            }

				$name = implode(' ', array_slice(explode(' ', $name), 0, 20));

				//$name = $r[$fld_name];

				$sel = "";
				if ($selected_id == $id || $def == $id)
					$sel=' selected="selected" ';
				echo "<option $select_tag_option $sel value='$id'>$name</option>";
			}
			echo "</select>";
	}

  	if(isset($_REQUEST[online])){
			$online=$_REQUEST[online];
	}
	else{
		$online='on';
	}
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

	//1111111111111111111111111111111111111
	if(!isset($_REQUEST['stock'])){
		echo "<!--1111111111111111111111111111111111111-->";
		$query="select ID,StockName,TerminalID,
			 initBalance,
			initBalanceOfficeUserId  as initBalanceUser,
			initBalanceTimestamp as initBalanceDate,
			SortOrder from vcx_weberp.listingsStocks s where TerminalID!=999999 and user_ID = $userID and Status=1
		    and (id in (select stock_id from vcx_weberp.userstocks where userid = $userID2 and r=1) or $userID2=$userID)
		    order by SortOrder, binary StockName";
			echo "<!--$query-->";
		    $result=mysql_query($query);
		if(mysql_num_rows($result)==1){
			$row=mysql_fetch_array($result);
			$stock=$row[TerminalID];

		}
		else{
			if(isset($_COOKIE['stockf'])){
				$stock=$_COOKIE['stockf'];
			}
			else{
				$stock=-1;
			}
		}
	}
	$stock_user_username = $stock_user['username'];
	$rootdir.="$username/POS/$stock";
	$target_image_dir="../../../officefiles/".$username."/_MlaitekPro";
	$target_image_product_dir = "../../../officefiles/" . $username . "/product";//sk 19/06/2016 add picture to product
	//222222222222222222222222222222222222222222222222
	if($stock>1){
		setcookie("stockf",$stock,time()+3600*24*365,"/","",0);
		echo "<!--222222222222222222222222222222222222222222-->";
		function sql2json($query) {
	    $data_sql = mysql_query($query) or die("'';//" . mysql_error().$query."<hr>");// If an error has occurred,
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
	                $value = str_replace('"', '\"', $value);
                    $value = str_replace('\\"', '\"', $value);
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
			//sk 04/04/2016 get details per listing
			//$sql="select StockName,ID from vcx_weberp.listingsStocks where TerminalID=$stock and user_ID=$userID";
			 //$sql = "select StockName,ID,Mikud,Email,Fax,Phone,Address from vcx_weberp.listingsStocks where TerminalID=$stock and user_ID=$userID";
			 $sql = "select StockName,ID,Mikud,Email,Fax,Phone,Address,name_for_cashbox,IpayEmv,RunScript,print_check from vcx_weberp.listingsStocks where TerminalID=$stock and user_ID=$userID";//03/08 print name per stock

			//echo "ppp".$sql;
			$dbname 	= $GOCONFIG->stock_db_name;
	/*sk 04/04/2016 set details per listing*/
			$rs = $conn->Execute($sql);
			$phone_li='';
			$address_li='';
			$fax_li='';
			$mikud_li='';
			$email_li='';
			$name_for_cash_li='';

			while (!$rs->EOF) {
				$stockname=$rs->fields[StockName];
				/*sk 04/04/2016 set details per listing*/
				$phone_li=$rs->fields[Phone];
				$fax_li=$rs->fields[Fax];
				$mikud_li=$rs->fields[Mikud];
				$address_li=$rs->fields[Address];
				$email_li=$rs->fields[Email];
				$ipay_emv = $rs->fields[IpayEmv];
				$show_check = $rs->fields[RunScript];
				//echo "ppp".$stockname;
				$name_for_cash_li=str_replace('"', ' ', $rs->fields[name_for_cashbox]);//03/08 print name per stock
				$print_check_li = $rs->fields[print_check];
				$stockid=$rs->fields[ID];
				$rs->MoveNext();
			}
			$dbname="vcx_$username";
		$sql="select action,id from vcx_$username.cashbox_actions where terminal_id=$stock order by id desc limit 1";
			$rs = $conn->Execute($sql);

			if($rs->EOF){
              $stat="close_cashbox";
            }
            else{
              $stat=$rs->fields[action];
            }
			//echo $stat;



	}
?>

      <script>
          var userID = <?=$userID?>;
      </script>

    <!--src="../../../officefiles/yedatop/POS/$stockname/prod.js" -->
    <script src="../../../officefiles/<?=$username?>/POS/<?=$stock?>/prod<?=date("dmy")?>.js"  type="text/javascript"></script>

    <!--<link href="js/bootstrap/bootstrap.min.css" rel="stylesheet" media="screen"> -->
 	<!--<script src="angucomplete-alt-master/angucomplete-alt.css"  rel="stylesheet" ></script> -->
    <script src="js/angular.min.js" type="text/javascript"></script>
    <script src="js/angular-ng-touch.js" type="text/javascript"></script>
<!--<script src="js/datepicker.js" type="text/javascript"></script>-->
	<script src="js/settings77.js?ver5" type="text/javascript"></script>
    <script src="js/cashbox78.js?ver10" type="text/javascript"></script>

    <!--<script src="js/cashbox5.js" type="text/javascript"></script>-->
    <script src="js/product78.js?<?= time()?>" type="text/javascript"></script>
    <script src="js/client77.js?ver=1" type="text/javascript"></script>
    <script src="js/worker77.js" type="text/javascript"></script>
    <script src="js/payment78.js?cash_fxiz" type="text/javascript"></script>
    <script src="js/jquery.cookie.js" type="text/javascript"></script>
	<script src="js/anacha77.js" type="text/javascript"></script>
	<script src="js/tip77.js" type="text/javascript"></script>
	<script src="js/pause77.js?ver9" type="text/javascript"></script>
	<script src="js/achlafa77.js" type="text/javascript"></script>
	<script src="js/keyboard.js" type="text/javascript"></script>
	<script src="js/debtpayment.js" type="text/javascript"></script>
	<script src="js/prepaid.js" type="text/javascript"></script>
	<script src="js/add_prod.js" type="text/javascript"></script>

	<script src="js/mezuman_inout.js" type="text/javascript"></script>
	<script src="js/fastclick.js" type="text/javascript"></script>

    <link href="font-awesome-4.3.0/css/font-awesome.min.css" rel="stylesheet">
    <link href="css/style.css?v7" rel="stylesheet" media="screen">
    <!--[if IE]>
		<link rel="stylesheet" type="text/css" href="css/ie.css" />
	<![endif]-->


   <!-- <object style="display:none" id="SOME_ID" classid="clsid:SOME_CLASS_ID" codebase="./somePath.dll"></object>-->

    <script src="angucomplete-alt-master/angucomplete-alt.js" type="text/javascript"></script>
    <script src="js/jquery.min.js" type="text/javascript"></script>
    <!--<script src="js/jquery.cookie.js" type="text/javascript"></script>-->
    <!--<link rel="stylesheet" href="//code.jquery.com/ui/1.11.2/themes/smoothness/jquery-ui.css">-->
     <script src="//code.jquery.com/ui/1.11.3/jquery-ui.js"></script>
     <script src="js/script9.js?27" type="text/javascript"></script>
     <script src="js/jquery.ui.datepicker-he.js"></script>
     <!--<script src="js/script.js" type="text/javascript"></script>-->
  </head>
  <body class="" onload="" ng-controller="CashboxController as cashc">



  	<span id="fastclick">
	<div class="disable_cash" style="position: absolute;width:100%;height:100%;z-index: 999;background: rgba(31, 30, 30, 0.7)"></div>
  	<script>
<?php if($_REQUEST['stat']=='open'){ ?>
    	$(document).ready(function(){
	    	open_kupa2();
	    });
    <?php } ?>

  	function barcode(str){
  		//alert(str);
  		var scope = angular.element(document.getElementById("product_main")).scope().search_barcode2(str);

  	}
  	if(typeof android!='undefined'){
  		android.hideKeyboard();
  	}
  	var link="../../../officefiles/<?=$username?>/POS/<?=$stock?>/prod<?=date("dmy")?>.js";
		function invoice(){
			android.invoice_details();
		}

  	</script>
  	<?

  	//333333333333333333333333333333333333333333333333333333
  	if($stock<1){
  		echo "<!--333333333333333333333333333333333333333333333333333333-->";
	?>
	<script>
		$(document).ready(function(){

   //alert(navigator.appVersion +navigator.appName );

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
							if($term=='2141098'){
?>
							<script>
								$(document).ready(function(){
										document.location.href="?stock=2141098";
										});
							</script>
<?
							}
							$rs->MoveNext();
						}

?>
				</select>

			</div>
		</div>

<?
	}
	//44444444444444444444444444444444444444444
else{
	echo "<!--44444444444444444444444444444444444444444-->";
?>
			<script>
			$(document).ready(function(){
				$(".openclose.cl").css({position: 'absolute'});
			});
			</script>
<?
}
//5555555555555555555555555555555555555555555555555
if(isset($_REQUEST[yitrat_kupa])){

	echo "<!--5555555555555555555555555555555555555555555555555-->";
	$sql="select max(JournalNum) as JournalNum2 from vcx_$username.transactionpackages where stock_id='$stockid'";
	$dbname 	= $GOCONFIG->stock_db_name;
	$flg=1;
				$rs = $conn->Execute($sql);

				if($rs->EOF){
					$journal=1;
				}
				else{
					$journal=$rs->fields[JournalNum2];
				}
				$journal=$journal+1;
				echo "<!--uuuu$journal-->";
				$date1=date("Y-m-d h:i:s");
				$date2=time();
				$sql="INSERT INTO vcx_$username.transactionpackages( `stock_id`, `TerminalID`, `JournalNum`, `TransCount`, `JournalDate`, `DateTimeStamp`,`start_cash`)
				VALUES ('$stockid','$stock','$journal','0','$date1','$date2','$_REQUEST[yitrat_kupa]')";
				$rs = $conn->Execute($sql);
				echo "<!--uuuu$sql-->";
				$journal_id=mysql_insert_id();

					//$rs = $conn->Execute($sql);


				$sql="";
				$trannum=1;
				$sql="insert into vcx_$username.cashbox_actions (action,terminal_id) values ('open_cashbox',$stock)";
				mysql_query($sql);
				?>
				<script>
				$(document).ready(function(){
					writelog("test_פתיחת קופה");
				});

				function createCookie(name,value,days) {
				    if (days) {
				        var date = new Date();
				        date.setTime(date.getTime()+(days*24*60*60*1000));
				        var expires = "; expires="+date.toGMTString();
				    }
				    else var expires = "";
				    document.cookie = name+"="+value+expires+"; path=/";
				}
			/*sk 19/10 not change jornal on internat fail cange from journal_id to journal*/
					createCookie("journal","<?=$journal?>",7);
				</script>
				<?
				//$journal=mysql_insert_id();
				echo "<!--journal:$journal-->";

				$stat="open_cashbox";

?>

				<script>
					var journal=<?=$journal?>;
					var journal_id='<?=$journal_id?>';
					var stockname='<?=$stockname?>';
					var open_c=<?=$_REQUEST[yitrat_kupa]?>;
					var online="<?=$online?>";
					localStorage.clear();
				</script>

<?

	}//66666666666666666666666666666666666666666666666666
	elseif(isset($_REQUEST[machzor])){
		//echo "<!--66666666666666666666666666666666666666666666666666-->";
?>
		if(typeof android!='undefined'){
				android.open_drw();
		}
<?
		$sql="insert into vcx_$username.cashbox_actions (action,terminal_id) values ('close_cashbox',$stock)";
				mysql_query($sql);

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
		    $put='../plujson.php?com=trans|yedatop|'.$stock.'|{"transactions":{"terminal":"'.$stock.'","transaction":'.$put.'}}';
			//echo	urlencode($put);
			$put = preg_replace('/\s+/', '', $put);
	       $answer= file_get_contents($put);
	       if(trim($answer) == "ok"){
		   }
			else{
				echo "errorrrrrrrrrrrrrrr $answer";
			}

		    //$put=json_decode($put,true);
		}
	}

//77777777777777777777777777777777777777777777777777
	else {
		echo "<!--77777777777777777777777777777777777777777777777777-->";
		/*sk 19/10 not change the journal after internet failling*/
		//$sql="select max(ID) as JournalNum2,TransCount,start_cash from vcx_$username.transactionpackages where TerminalID=$stock";
	    $sql="select max(JournalNum) as JournalNum2,TransCount,start_cash from vcx_$username.transactionpackages where TerminalID=$stock";
		$rs = $conn->Execute($sql);

		/*sk 26/01/2016 not change jornal num on return from the office and get the Id of transactionpackages and not journalnum */
		$sql_get_id="SELECT ID FROM vcx_$username.transactionpackages WHERE TerminalID =$stock  and  `JournalNum` = ( SELECT MAX( JournalNum ) AS JournalNum2 FROM vcx_$username.transactionpackages WHERE TerminalID =$stock )";
		$rs2 = $conn->Execute($sql_get_id);


		$journal=$rs->fields[JournalNum2];
		$start_cash=$rs->fields[start_cash];
		if(!$journal){
			/*sk 19/10 not change the journal after internet failling*/
			//$sql="select max(ID) as JournalNum2 from vcx_$username.transactionpackages where stock_id='$stockid'";

			$sql="select max(JournalNum) as JournalNum2 from vcx_$username.transactionpackages where stock_id='$stockid'";
				$dbname 	= $GOCONFIG->stock_db_name;
				$flg=1;
				$rs = $conn->Execute($sql);

				if($rs->EOF){
					$journal=1;
				}
				else{
					$journal=$rs->fields[JournalNum2];
				}
				if(!$_COOKIE[journal]){
					$journal=$journal+1;

					$date1=date("Y-m-d h:i:s");
					$date2=time();
					$sql="INSERT INTO vcx_$username.transactionpackages( `stock_id`, `TerminalID`, `JournalNum`, `TransCount`, `JournalDate`, `DateTimeStamp`,`start_cash`)
					VALUES ('$stockid','$stock','$journal','0','$date1','$date2','0.00')";
					$rs = $conn->Execute($sql);
					$journal_id=mysql_insert_id();
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
					/*sk 19/10 not change jornal on internat fail*/
					createCookie("journal","<?=$journal?>",7);

					</script>
					<?
					//$journal=mysql_insert_id();
					echo "<!--journal:$journal-->";

					$stat="open_cashbox";
				}
?>

				<script>
					var journal=<?=$journal?>;
					var x3='';
					var journal_id='<?=$journal_id?>';
					start_cash=0.00;
					var online="<?=$online?>";

				</script>

<?
		}
		else{
			/*sk 26/01/2016 not change journal num on retturn from the office and get the id instead of journalnum*/
			//$journal_id=$rs->fields[JournalNum2];
			$journal_id = $rs2->fields[ ID ];
		}
?>	<script>

					var journal=<?=$journal?>;
					var x4='';
					var journal_id='<?=$journal_id?>';
					var online="<?=$online?>";
					var stockname='<?=$stockname?>';
					$(document).ready(function(){
						writelog("test_מס' פתיחת קופה: "+journal+" ");
					});
				</script>

<?
		/*if(isset($_COOKIE[trannum])){
			$sql="update vcx_$username.transactionpackages set TransCount=$_COOKIE[trannum] where id=$journal and TerminalID=$stock";
			$trannum=$_COOKIE[trannum];
		}
		else{
			$trannum=$rs->fields[TransCount]+1;
		}*/



	}
//888888888888888888888888888888888888888
/*sk 26/01/2016 cancel single user*/
	if($stat=="open_cashbox" && $flg!=1){
		echo "<!--888888888888888888888888888888888888888if($_COOKIE[journal]!=$journal)-->";
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
//99999999999999999999999999999999999999999999
if($stat=="open_cashbox"){
	echo "<!--99999999999999999999999999999999999999999999-->";
				?>
				<script>
				$(document).ready(function(){
					$(".disable_cash").hide();
					$(".clock").css("position","inherit");
				});

				</script>
<?
			}

//init settings and settings_user and create row if not exit
//settings
$sql="select * from vcx00.settings where user_id='$userID'";

$result=mysql_query($sql);
$num=mysql_num_rows($result);
if($num<=0){
	$sql="INSERT INTO vcx00.settings (`user_id`) VALUES ('$userID') ";
	mysql_query($sql);
	$sql="select * from vcx00.settings where user_id='$userID'";
	$premission_list=sql2json($sql);
	$result=mysql_query($sql);
	while ($row = mysql_fetch_array($result)) {
	    $charge_worker=$row['charge_worker'];
	}
}
else{
	$premission_list=sql2json($sql);
	while ($row = mysql_fetch_array($result)) {
	    $charge_worker=$row['charge_worker'];
	}
}
/*07/01/16 sk display payments button in main page*/
		$sql11 = "select * from vcx00.settings where user_id='$userID'";

		$result1 = mysql_query($sql11);
		$num22 = mysql_num_rows($result1);
        $row11 = mysql_fetch_array($result1);
        $display_cash_button=$row11['show_cash_button'] ? "": "none";
		$display_credit_button=$row11['show_credit_button']? "": "none";
		$display_checkcheque_button=$row11['show_checkcheque_button']? "": "none";
		$display_cheque_button=$row11['show_cheque_button']? "": "none";
		$display_shovar_button=$row11['show_shovar_button']? "": "none";
		$display_shovarzicuy_button=$row11['show_shovarzicuy_button']? "": "none";
		$display_points_button=$row11['show_points_button']? "": "none";
		$display_prepaid_button=$row11['show_prepaid_button']? "": "none";
		$display_akafa_button=$row11['show_akafa_button']? "": "none";


		$sql="select * from vcx_".$username.".`title_definition` ";
		echo '<!-- klor1 '.$sql.'-->';
    	$result_for_menu=mysql_query($sql);

		 $s='';
		while ($row=mysql_fetch_array($result_for_menu))
		 {
			$title_definitioins[$row['title_id']]=1;
			$s.=$row['title_id'];
			$s.=",";

		 }
		 $s=rtrim($s, ",");

	$sql="select * from vcx00.menu_titles where id in (".$s.")";
	echo '<!-- klor klor'.$sql.'-->';
	$titles_to_draw=mysql_query($sql);


//settings_user
 //sk 16/12/2015 update osek murshe
	$sql2="select zehut from  vcx00.users where id='$userID'";

	$result2 = mysql_query($sql2);
    $num2 = mysql_num_rows($result2);
     $row1 = mysql_fetch_array($result2);
    $val=$row1['zehut'];

	if ($num2 > 0) {
		$xx="update vcx00.settings_user set tz='$val' where user_id='$userID'";
		mysql_query($xx);

	}

$sql="select * from vcx00.settings_user where user_id='$userID'";
$result=mysql_query($sql);
$num=mysql_num_rows($result);
if($num<=0){

	$sql="select * from vcx00.users where id='$userID'";
			$x = mysql_query($sql);
			if($x){
				$row=mysql_fetch_array($x);
				$sql="INSERT INTO vcx00.settings_user ( `user_id`,name,tz,email)
				VALUES ('$userID','$row[name]','$row[businessnum]','$row[email]') ";
				echo $sql;
				mysql_query($sql);
				$sql="select * from vcx00.settings_user where user_id='$userID'";
				$details_list=sql2json($sql);

			}
}
else{
	$details_list=sql2json($sql);

}
global $user;


/*echo "<!--detailes_list ";
var_dump($details_list);
var_dump('"tz":"'.getCommonParentUserField('zehut').'"');
var_dump('"tz":"'.getCommonStockOrParentUserField('zehut').'"');
echo " -->";/**/
/*details stock user*/
$details_list = str_replace('"tz":"'.getCommonParentUserField('zehut').'"', '"tz":"'.getCommonStockOrParentUserField('zehut').'"', $details_list);

//sk 09/02/16 get the setting if print on enter or exit worker
		   $sql = "select `PrintOnExitOrEnter`,`ShowDaysReport`,`free_vat`  from vcx_weberp.userdata where `office_user_id`='$userID'";
		 echo "<!--sqlllllllllllll $sql -->";
           $print_setting = sql2json($sql);
		   $result = mysql_query($sql);
			 $print_setting=0;
		   if($result){
					$row = mysql_fetch_array($result);

	            $print_setting = $row['PrintOnExitOrEnter'];
				$show_days_report= $row['ShowDaysReport'];
				$free_vat=$row['free_vat'];
		   }
//end init settings
?>
	<script>
    //sk 04/04/16 set details per stock
		var phone_li="<?=$phone_li?>";
		var fax_li="<?=$fax_li?>";
		var mikud_li="<?=$mikud_li?>";
		var address_li="<?=$address_li?>";
		var email_li="<?=$email_li?>";
	    var name_for_cash_li="<?=$name_for_cash_li?>";//03/08 print name per stock
	   var user_name = "<?=$username?>";
		var charge_worker="<?=$charge_worker?>";
		var premission_list= <?=$premission_list?>;
		var details_list= <?=$details_list?>;
		var print_setting = <?=$print_setting?>;
		var show_days_report = <?=$show_days_report?>;
		var free_vat=<?=$free_vat?>;
		var ipay_emv = <?=$ipay_emv?>;
		var print_check_li = <?=$print_check_li?>;
		for (var i=2; i < 6; i++) {
		  $('body').removeClass('theme'+i);
		};
		$('body').addClass("theme"+premission_list[0]['pr_theme']);
	</script>
<div class="wrap display"></div>

    <tip></tip>
	<anacha></anacha>
	<settdetails></settdetails>
	<!-- sk 18/10 add date picker-->
	<div class="popup  pop_add_client poptype1 mainarea2" ng-controller="Client" style="display:none">

		<h2>כרטיס לקוח/ה חדש/ה</h2>
		<div class="container_pop an" style="background: none;border:none;">

			<div class="part">
			<label>מספר לקוח/ה*</label>
			<input type="text" id="a_c_num"  class="fixed" value="{{prefers_list['pr_currnumcust']}}"/>
			<label>שם פרטי ומשפחה*</label>
			<input type="text" id="a_c_name"/>
			<label>*ע.מ. / ת.ז.</label>
			<input type="tel" id="a_c_tz"/>
			<label>תאריך לידה</label>
			<div id='date_birth_div' name="date_birth_div" class='date_bitrh'>
			<input type="text" id="a_c_birthdate" name="date_birth" class="ddd4" ng-blur="$('#ui-datepicker-div').style.left='39%!important';"/>
			</div>
			</div>
			<div class="part">
			<label>כתובת</label>
			<input type="text" id="a_c_address"/>
			<label>מספר טלפון</label>
			<input type="tel" id=""/>
			<label>*מספר נייד</label>
			<input type="tel" id="a_c_cellphone"/>
			<label>דואר אלקטרוני</label>
			<input type="text" id="a_c_mail"/>
			</div>
			<div class="part">
			<label>קבוצה / מועדון לקוחות</label>
			<select id="a_c_group" class="advanced_input toclean" ng-model="pr_group"   ng-change="change_group(pr_group)" ng-options="GroupName.GroupName for GroupName in  clientgroups track by GroupName.ID"></select>


			<label>הנחה קבועה</label>
			<input type="text" id="a_c_discount" class="fixed" value="{{pr_discount}}" disabled="disabled"/>
			<label>מכירה בהקפה</label>
			<!--<input type="text" id="a_c_hakafa"/>-->
			<div class="switchtoggle" >
						<input type="text" id="a_c_hakafa"/>
						<span class="{{a_c_hakafa}} a_c_hakafa" ng-click="set_stat('a_c_hakafa')">{{a_c_hakafa| uppercase}}</span>
					</div>
			<label>אובליגו</label>
			<input type="tel" id="a_c_obligo"/>

			<input class="mybtn btngray leftbottom  " type="button" value="ביטול" onclick='$(".wrap" ).click();$(".pop_add_client input[type=tel],.pop_add_client input[type=date],.pop_add_client input[type=text]:not(.fixed)").val("");'>
			<input class="mybtn btngreen leftbottom2  " type="button" value="שמירה" onclick='writeClientRegistrationLog();' ng-click="save_client();">
			</div>

		</div>
	</div>
	<beynaim></beynaim>
	<achlafa></achlafa>
	<pause></pause>
	<clock></clock>
	<prepaid></prepaid>
	<comment></comment>
	<mezumaninout></mezumaninout>
	
<script>

//client logging
	function writeClientRegistrationLog(){ // todo: change trigger of event to button where client will be saved
		var registrationFormData = {
			eventTime: new Date(),
			a_c_num: $('#a_c_num').val(),
			a_c_name: $('#a_c_name').val(),
			a_c_tz: $('#a_c_tz').val(),
			a_c_cellphone: $('#a_c_cellphone').val(),
		}
		var registrationFormDataJson = JSON.stringify(registrationFormData);
		
		$.ajax({
			url: '/modules/stock/ClientLog/transportAjaxDataToLog.php',
			type: 'post',
			data: {
					fileName: 'cashbox_fe->index.php',
					ajaxDataForLog: registrationFormDataJson,
					logId: registrationFormData["a_c_num"]
				},
			success: function(info){
				console.log('cashbox_fe/index.php: ');
				console.log(info);
			},
		});
	}
</script>

<div class="popup pop_peulot popup_pay add_worker " ng-controller="PaymentController  as payment" id="main_payment_div">
		<!--<img src="images/box_large.png" class="img_wrap"/>	-->
		<div class="container_pop add_worker display" ng-controller="WorkerController  as workers">
			<h2 class="relative">סה"כ לתשלום: <span style="font-size: 100%">₪</span><span class="span_sum zerofloat">{{amount}}</span></h2>
			<h5>הוסף עובד/ת למכירה:</h5>
			<div style="overflow-y: auto;height: 100%;">
				<table class="workers_tb" style="width: 93%;overflow:auto;">
					<tr>
						<th>שם עובד</th>
						<th>טלפון</th>
						<th>נייד</th>
						<th>אימייל</th>
						<th>מס"ד</th>
						<th></th>
					</tr>
					<tr class="worker_{{worker1.WorkerNum}} pay_workers" ng-repeat="worker1 in filtered=(workerslist | filter: { is_clock: 1 } )"  data-id="{{worker1.WorkerNum}}" ng-click="workers.choose_worker(this,worker1.WorkerNum);" >
						<td>{{worker1.SupplierName}}</td>
						<td>{{worker1.Phone}}</td>
						<td>{{worker1.CellPhone}}</td>
						<td>{{worker1.Email}}</td>
						<td>{{worker1.WorkerNum}}</td>
						<td><i  class='fa fa-check-circle display'></i></td>
					</tr>
				</table>
			</div>
			<input class="mybtn btngray rightbottom" type="button" value="ביטול" onclick="$( '.wrap' ).click();">
			<input class="mybtn btnblue leftbottom"  ng-click="workers.save_choose();start_paying()" type="button" value="בחירה">
		</div>

		<div class="container_pop type_pay display" >
			<h2 class="relative">סה"כ לתשלום: <span style="font-size: 100%">₪</span><span class="span_sum zerofloat">{{amount}}</span></h2>
			<h5>בחר אמצעי תשלום:</h5>
			<div class="type_half right" >
				 <!--localStorage.getItem('products');-->
				<div class="type_b">
					<input type="hidden" class="is_mezuman"/>
				   <!--sk 08/02/2016-->
            		<input type="hidden" class="is_change"/>
					<input class="mybtn btnorange " type="button" value="מזומן"   ng-click="openwrap2('.type_pay.container_pop','.mezuman.container_pop');payment.init_sum();payment.select()">
					<input class="mybtn btnblue " type="button" value="המחאה"  ng-click="openwrap2('','.amchaa.container_pop');payment.init_sum();payment.select()">
					<input class="mybtn btngreen " type="button" value="אשראי" onclick="open_credit();"  ng-click="openwrap2('','.ashray.container_pop');payment.init_sum2();start_credix();">
					<!--<input class="mybtn btngreen " type="button" value="אשראי ידני"  ng-click="openwrap2('','.ashray_yadany.container_pop');payment.init_sum()">-->
				</div>
				<div class="type_s right type_b">
					<input class="mybtn btngray prepaid_disabled" type="button" value="שובר זיכוי"  ng-click="isdebt(2)">
					<input class="mybtn btngray " type="button" value="הקפה"   ng-click="isdebt(1)">
					<input class="mybtn btngray prepaid_disabled" type="button" value="נקודות"  ng-click="isdebt(3)">					
				</div>
				<div class="type_s left type_b">
					<input class="mybtn btngray " type="button" value="כרטיס מתנה" ng-click="openwrap2('','.prifeyd.container_pop');payment.init_sum();prepaid_start();">
					<input class="mybtn btngray prepaid_disabled" type="button" value="שובר"   ng-click="openwrap2('','.shovar.container_pop');payment.init_sum()">
					<!--<input class="mybtn btnblue " type="button" value="אישור" class="end_btn"  ng-click="cashc.end_cash(0)" onclick="$('input[type=text]').val('');$('.text').val('');openwrap2('','.finish.container_pop')">-->
					<input class="mybtn btnlightgray " type="button" value="יציאה" ng-click="payment.is_charge()">
				</div>
			</div>

			<input type="hidden" name="helpsum"/>
			<div class="type_half left">
				<table class="workers_tb">
					<tr>
						 <th>סוג תשלום</th>
						 <th>סכום</th>
						 <th  ng-click="add_type('.mezuman_sum','מזומן')"></th>
					</tr>
					<tr  ng-repeat="pay in payments_type.cash">
						<td>{{pay.type}}</td>
						<td>{{pay.amount}}</td>
						<td><i class="fa fa-times-circle" ng-click="payment.remove_item('cash',$index)"></i></td>
					</tr>
					<tr  ng-repeat="pay in payments_type.cheque" >
						<td>{{pay.type}}</td>
						<td>{{pay.amount}}</td>
						<td><i class="fa fa-times-circle" ng-click="payment.remove_item('cheque',$index)"></i></td>
					</tr>
					<tr  ng-repeat="pay in payments_type.credit">
						<td>{{pay.type}}</td>
						<td>{{pay.amount}}</td>
						<td><i class="fa fa-times-circle" ng-click="payment.remove_item('credit',$index)"></i></td>
					</tr>
					<tr  ng-repeat="pay in payments_type.akafa">
						<td>{{pay.type}}</td>
						<td>{{pay.amount}}</td>
						<td><i class="fa fa-times-circle" ng-click="payment.remove_item('akafa',$index)"></i></td>
					</tr>
					<tr  ng-repeat="pay in payments_type.shovar">
						<td>{{pay.type}}</td>
						<td>{{pay.amount}}</td>
						<td><i class="fa fa-times-circle" ng-click="payment.remove_item('shovar',$index)"></i></td>
					</tr>
					<tr  ng-repeat="pay in payments_type.shovarzicuy">
						<td>{{pay.type}}</td>
						<td>{{pay.amount}}</td>
						<td><i class="fa fa-times-circle" ng-click="payment.remove_item('shovarzicuy',$index)"></i></td>
					</tr>
					<tr  ng-repeat="pay in payments_type.points">
						<td>{{pay.type}}</td>
						<td>{{pay.amount}}</td>
						<td><i class="fa fa-times-circle" ng-click="payment.remove_item('points',$index)"></i></td>
					</tr>
					<tr  ng-repeat="pay in payments_type.prepaid">
						<td>{{pay.type}}</td>
						<td>{{pay.amount}}</td>
						<td><i class="fa fa-times-circle" ng-click="payment.remove_item('prepaid',$index)"></i></td>
					</tr>
				</table>
			</div>
			<div class="leftbottom">
				<p class="pay_p"><span class="right">התקבל:</span><span class="left" style="width: 25px;font-size: 105%;"> ₪ </span><span class="left type_finall_sum zerofloat">{{paid}}</span></p>
				<p class="itra_p"><span class="right">יתרה לתשלום:</span><span class="left" style="width: 25px;font-size: 105%;"> ₪ </span><span class="left span_sum span_itra zerofloat">{{itra_calc()}}</span></p>
			</div>
		</div>
		<div class="container_pop mezuman display" >
			<h2 class="relative">תשלום במזומן</h2>
			<h5>לתשלום:<span style="font-size: 100%;color: #fa6f58;">₪</span><span class="span_sum zerofloat" style="color: #fa6f58;"></span></h5>
			<input type="text" value="{{itra}}" id="mezuman_itra"  class="input_sum mezuman_sum zerofloat" onchange="if($(this).val()=='')$(this).val(0.00);" ng-blur="payment.calc2($('mezuman_sum').val())"/>
			<div class="shtar">
				<img src="images/money8.png"  ng-click="payment.calc1('200')">
				<img src="images/money2.png"  ng-click="payment.calc1('100')">
				<img src="images/money1.png"  ng-click="payment.calc1('50')">
				<img src="images/money7.png"  ng-click="payment.calc1('20')">
			</div>
			<div class="matbea">
				<img src="images/money3.png" ng-click="payment.calc1('10')">
				<img src="images/money6.png" ng-click="payment.calc1('5')">
				<img src="images/money9.png" ng-click="payment.calc1('2')">
				<img src="images/money10.png" ng-click="payment.calc1('1')">
				<img src="images/money5.png" ng-click="payment.calc1('0.5')">
				<img src="images/money4.png" ng-click="payment.calc1('0.1')">
			</div>
			<input class="mybtn btnlightgray rightbottom" type="button" value="ביטול" onclick="openwrap2('','.type_pay.container_pop')">
			<input class="mybtn btnblue leftbottom" type="button" value="אישור"  ng-click="payment.check_end2('.mezuman');add_type('.mezuman_sum','מזומן');checkend();" >
		</div>
		<div class="container_pop finish display">
			<h2 class="relative">סיום עסקה</h2>
			<p style="font-size: 224%;margin-top: 20px;margin-bottom: 10px;">העסקה בוצעה בהצלחה</p>
			<p  style="font-size: 224%; " class="change">עודף: {{itraAbs}}</p>
		</div>
		<div class="container_pop amchaa display">
			<h2 class="relative" >תשלום בהמחאה</h2>
			<h5>לתשלום:<span style="font-size: 100%;color: #fa6f58;">₪</span><span class="span_sum zerofloat"  style="color: #fa6f58;">{{itra}}</span></h5>
			<form class="amchaa_frm" style="width: 64%;margin: 0 auto;">
			<?php if($show_check) { ?>
			<div class="pricing-switcher">
					<p class="fieldset">
						<input type="radio" name="duration" value="3" id="monthly-1" checked>
						<label for="monthly-1">מזומן</label>
						<input type="radio" name="duration" value="39" id="yearly-1">
						<label for="yearly-1">תשלומים</label>
						<input type="radio" name="duration" value="150" id="d-1">
						<label for="d-1">דחוי</label>
						<span class="switch"></span>
						
					</p>
				</div>
			<script>
				var confirmCode = '';
				 $(function () {
				 	   
				        var date = new Date();
				      function checkDate(){
				      		
				      		var futuredate = (new Date).setDate(date.getDate() +  parseInt($("input[name='duration']:checked").val()));
				      	date.setHours(0,0,0,0);
					  	console.log($("#chequepaymentdat").datepicker('getDate')>=date, $("#chequepaymentdat").datepicker('getDate')<=new Date(futuredate));
				      		if($("#chequepaymentdat").datepicker('getDate')>=date && $("#chequepaymentdat").datepicker('getDate')<=new Date(futuredate)) {
				      		$('.error-date').hide();
				      		$(".allbottom>*").attr('disabled',false);
				      			}
				      		else {	
				      			$('.error-date').show();
				      				$(".allbottom>*").attr('disabled',true);
				      		
				      		}
				      	
				      	}
				        var year = date.getFullYear();
				        $.datepicker.setDefaults({
				            changeMonth: true,// show months list
				            changeYear: true, // show years list
							maxDate: 3,
							minDate: date,
				            yearRange: year + ":" + (year+10) // set years list range
				        });
						$("#chequepaymentdat").keyup(function(){
							 checkDate();
						});
				 		$("input[name=tashlumin],.tashlumin").hide();
						$("input[name='duration']").change(function(){
							$.datepicker.setDefaults({
							    changeMonth: true,// show months list
							    changeYear: true, // show years list
								maxDate: $(this).val(),
								minDate: date,
							    yearRange: year + ":" + (year+10) // set years list range
							});
							 $("#chequepaymentdat").datepicker($.datepicker.regional["he"]);   
							 checkDate();
							 var ind = $('input[name="duration"]:checked').index('input[name="duration"]');
							 if(ind === 0 || ind === 2) {
							 	$("input[name=tashlumin],.tashlumin").hide()
							 	 $(".main-check").show();
							 	}
							 else {
							 $(".main-check").hide();
							 $("input[name=tashlumin],.tashlumin").val(0).show() }
							$(".fieldset").removeClass('step0 step1 step2').addClass('step'+ind);
						})
				        // set Hebrew calendar
				           	 $("#chequepaymentdat").datepicker($.datepicker.regional["he"]);   
				           	
				    });
			</script>
		<?php } ?>
				<input type="text"  value="0.00" class="text amchaa_sum input_sum zerofloat" name="amount" />
				<div style="width:30%;margin-right: 2%;float:right">
					<p>מספר המחאה:</p>
					<p>תאריך:</p>
					<p>מספר בנק:</p>
					<p>מספר סניף:</p>
					<p>מספר חשבון:</p>
					<p class="tashlumin">מספר תשלומים:</p>
					<?php if($show_check) { ?>
					<p>ת.ז. רשום בצ'ק:</p>
					<p>טל. רשום בצ'ק:</p>
					<p>ת.ז. של ערב :</p>
						<?php } ?>
				</div>

				<div style="width:60%;float:left">
					<input name="chequenumber" class="text required" />
					<input type="text" id="chequepaymentdat"  name="chequepaymentdat"  class="text required ddd3" />
					<div class="error-date" style="color:red;font-weight:bold;display:none;">Invalid date!</div>
					<input name="chequebanknumber"  class="text required" />
					<input name="chequebranch"  class="text required" />
					<input name="chequeaccountnumber" class="text required" />
					<input name="tashlumin" class="text required" value="0" />
				<?php if($show_check) { ?>
				
					<input name="identification" class="text required" />
					<input name="telcheck" class="text required" />
					<input name="garant" class="text required" />
			
				<?php }
				 
				 ?>
					<input name="businessID"  type="hidden"  value="514911924<?=$user['businessnum'];?>"/>
				</div>
				<?php if($show_check) { ?>
				 <div class="check-cheque main-check" onclick="check_cheque()"  
				 ng-show = "prefers_list['pr_show_checkcheque_button'] == 'on'" >לבדוק המחאה</div>
			 	<?php } ?>
				 <div class="error-message"></div>
				 
			</form><input type="text" class="confirmCode" name="confirmCode" placeholder="אישור צ'ק מספר"> 

			<div class="allbottom">
				<input class="mybtn btnlightgray " type="button" value="ביטול" onclick="openwrap2('','.type_pay.container_pop')">
				<!--<input class="mybtn btngreen " type="button" value="בדיקת המחאה" onclick="openwrap2('','')">-->
				<!--<input class="mybtn btnorange " type="button" value="מחולל התשלומים" onclick="$('input[name=mecholel_numtash]').val('2');get_val('.amchaa_sum','.amchaa_frm  .mecholelsum_text');calc_tash('1');openwrap2('','.mecholel_amchaa2.container_pop');init_sum()">-->
				<input class="mybtn btnorange " type="button" value="מחולל התשלומים" ng-click="start_tashlumim();">
				<input class="mybtn btnblue "  type="button"
				 value="אישור" ng-click="payment.check_end2('.mecholelsum_text');add_type('.amchaa_sum','המחאה');checkend();" >
			</div>
		</div>
		<div class="container_pop ashray display">
			<h2 class="relative">תשלום באשראי</h2>
			<h5>לתשלום:<span style="font-size: 100%;color: #fa6f58;">₪</span><span class="span_sum zerofloat" style="color: #fa6f58;">{{(itra-0) + (tip-0) - tip_paid}}</span></h5>
			<form class="amchaa_frm" style="width: 64%;margin: 0 auto;">
				<input type="text" value="0.00" class="text input_sum ashray_text zerofloat" />
				<input class="mybtn btnorange " type="button" value="תשלומים רגיל" style="width: 100%;"onclick="$('#payments').toggle();$('#credit_p').hide();$('#yadani').hide();$('#credit_appr').hide();$('textarea[name=ashray_f]').focus();">
<div id="payments" style="display: none;width:100%">
				<input type="text" style="font-size: 150%;  margin-top: 14px;width: 100%;" value="" name="ashray_f_num" placeholder="מס' תשלומים" class="text ashray_f_num zerofloat" />
			<input type="text" value="" style="font-size: 150%;width: 100%;" name="ashray_f_first" placeholder="תשלום ראשון" class="text ashray_f_first zerofloat" />
			</div>

			<input class="mybtn btnorange " type="button" value="קרדיט תשלומים" style="width: 100%;margin-top: 14px;" onclick="$('#payments').hide();$('#credit_p').toggle();$('#yadani').hide();$('#credit_appr').hide();$('textarea[name=ashray_f]').focus();">
			<div id="credit_p" style="display: inline-block;width: 100%;">
			<input type="text" value="" style="font-size: 150%;width: 100%;margin-top: 14px;" name="ashray_f_credit" placeholder="מס' תשלומים" class="text ashray_f_credit zerofloat" />
			</div>
			<input class="mybtn btnorange " type="button" value="הקלדה ידנית" style="width: 100%;margin-top: 14px;" onclick="$('#payments').hide();$('#credit_p').hide();$('#credit_appr').hide();$('#yadani').toggle();$('textarea[name=ashray_f]').focus();$('input[name=ashray_numcard]').focus();"><!-- lc 17/03/2016 focus in ashray -->

				<!-- background: transparent; border: transparent!important;  outline: none;color:transparent;-->

				<!--<input type="text" style="  width: 385px;font-size: 16px;" name="ashray_f"  />	-->

			<!--<input class="mybtn btnorange " type="button" value="הקלדה ידנית" style="width: 64%;"onclick="openwrap2('','.ashray_yadany.container_pop');init_sum()"> -->
			<div id="yadani" style="display: none">
			<input type="text" value="" style="font-size: 150%;width: 100%;margin-top: 14px;" name="ashray_numcard" placeholder="מספר כרטיס" class="text ashray_numcard zerofloat" />
			<input type="text" value="" style="font-size: 150%;width: 100%;margin-top: 14px;" name="ashray_tokef" placeholder="תוקף כרטיס" class="text ashray_tokef zerofloat" />
			<input type="text" value="" style="font-size: 150%;width: 100%;margin-top: 14px;" name="ashray_cvv" placeholder="cvv שלש ספרות בגב הכרטיס" class="text ashray_cvv zerofloat" />
			<input type="text" value="" style="font-size: 150%;width: 100%;margin-top: 14px;" name="ashray_tz" placeholder=".ת.ז" class="text ashray_tz zerofloat" />
			<input class="mybtn btnblue" style="font-size: 150%;width: 100%;margin-top: 14px;" type="button" value="אישור"  ng-click="start_ashray()"  >

</div>
	<input class="mybtn btnorange " type="button" value="עיסקה מאושרת" style="width: 100%;margin-top: 14px;" onclick="$('#payments').hide();$('#credit_p').hide();$('#yadani').hide();$('#credit_appr').toggle();$('textarea[name=ashray_f]').focus();">


				<!-- background: transparent; border: transparent!important;  outline: none;color:transparent;-->

				<!--<input type="text" style="  width: 385px;font-size: 16px;" name="ashray_f"  />	-->

			<!--<input class="mybtn btnorange " type="button" value="הקלדה ידנית" style="width: 64%;"onclick="openwrap2('','.ashray_yadany.container_pop');init_sum()"> -->
			<div id="credit_appr" style="display: none;width: 100%">
			<input type="text" value="" style="font-size: 150%;width: 100%;margin-top: 14px;" name="aproval_num_f" placeholder="מספר אישור" class="text ashray_numcard zerofloat" />
 
</div>
<input class="mybtn btnblue tip" ng-show = "prefers_list['pr_tip'] == 'on'" type="button" value="טיפ" style="width: 100%;margin-top: 50px;"
           onclick="$('#payments').hide();$('#credit_p').hide();$('#yadani').hide();$('#credit_appr').hide();"
           ng-controller="TipController as tipC" ng-click="start_tip('credit')" >
  <?php if($ipay_emv == 1){ ?>
    <input class="mybtn btngreen " type="button" value="עסקת אשראי במסוף חכם" style="width: 100%;margin-top: 14px;" onclick="$("p.emvp").text("הכנס כרטיס אשראי למסוף החכם");" ng-click='start_ashray_emv();'>
<?php } ?>
<textarea type="text" style="   height: 5px; width: 385px;font-size: 16px;" name="ashray_f" value="" class="text input_num zerofloat" ></textarea>
			</form>
  <?php if($ipay_emv == 1){ ?>
    <p class="emvp" style="font-size: 224%;margin-top: 20px;margin-bottom: 10px;"></p>
<?php } ?>
  <?php if($ipay_emv != 1){ ?>
    <p  style="font-size: 224%;margin-top: 20px;margin-bottom: 10px;">העבר כרטיס אשראי</p>
<?php } ?>
			<input class="mybtn btnlightgray rightbottom ashraycancel" type="button" value="ביטול" onclick="openwrap2('','.type_pay.container_pop');$('.loading').css('display','none');">
			<!--<input class="mybtn btnblue leftbottom" type="button" value="אישור" onclick="$('.loading').css('display','block')" ng-click="payment.check_end2('.ashray');add_type('.ashray_text','אשראי');checkend();"   >-->

		</div>
		<!--<div class="container_pop ashray_yadany display">
			<h2 class="relative">תשלום באשראי - ידני</h2>
			<h5>לתשלום:<span style="font-size: 100%;color: #fa6f58;">₪</span><span class="span_sum zerofloat"  style="color: #fa6f58;">{{itra}}</span></h5>
			<form class="amchaa_frm" style="width: 64%;margin: 0 auto;">
				<input type="text" value="0.00" class="input_sum text ashray_yadany_text zerofloat" />
				<div style="width:38%;margin-right: 2%;float:right">
					<p>מספר כרטיס:</p>
					<p>תוקף כרטיס:</p>
					<p>cvv שלש ספרות בגב הכרטיס:</p>
					<p style="display: none" >תשלומים:</p>
					<p>ת.ז:</p>
				</div>
				<div style="width:60%;float:left">
					<input class="text ashray_numcard" name="ashray_numcard">
					<input  class="text ashray_tokef" name="ashray_tokef"/>
					<input  class="text ashray_cvv" name="ashray_cvv"/>
					<input  class="text ashray_tz" name="ashray_tz" />
					<input  class="text ashray_tashlumim" style="display: none" name="ashray_tashlumim"/>
				</div>
			</form>

			<div class="allbottom">
				<input class="mybtn btnlightgray " type="button" value="ביטול" onclick="openwrap2('','.type_pay.container_pop')">
				<input class="mybtn btnorange " type="button" value="אופציות אשראי" onclick="openwrap2('','.option_ashray.container_pop');init_sum()">
				<input class="mybtn btnblue " type="button" value="אישור" ng-click="payment.check_end2('.ashray_yadany');get_val('.ashray_yadany_text','.ashray_text');add_type('.ashray_text','אשראי ידני');checkend();">
			</div>
		</div>-->
		<div class="container_pop mecholel_amchaa display">
			<h2 class="relative">מחולל תשלומים</h2>
			<form class="amchaa_frm" style="width: 80%;">
				<div style="width:48%;margin-right: 2%;float:right">
					<p style="margin-top: 10px;">סכום סה"כ:</p>
					<p>מספר תשלומים:</p>
					<p>סכום תשלום ראשון:</p>
					<p>סכום תשלום שני ומעלה:</p>
					<p>תאריך פרעון שיק ראשון:</p>
					<p>מס' שיק  \ שובר ראשון:</p>
					<p>פרטי  בנק:</p>
					<p>מספר חשבון:</p>
				</div>
				<div style="width:50%;float:left">
					<input  class="text mecholelsum_text input_sum zerofloat" style="margin-top: 10px;" onchange="calc_tash('1')"/>
					<input  class="text"  name="mecholel_numtash" onchange="calc_tash('0')" required="required" value="2"/>
					<input  class="text"  name="mecholel_firstsum" onchange="calc_tash1()"/>
					<input  class="text"  name="mecholel_secsum"/>
					<input type="text"  class="text"  name="mecholel_datefirst"/>
					<input  class="text"  name="mecholel_numcheck"/>
					<input  class="text"  name="mecholel_bank" style="width: 48%;float:right"/>
					<input  class="text"  name="mecholel_snif" style="width: 48%;float:left"/>
					<input  class="text"  name="mecholel_bill"/>
				</div>
			</form>

			<div class="allbottom">
				<input class="mybtn btnlightgray " type="button" value="ביטול" onclick="openwrap2('','.amchaa.container_pop')">
				<input class="mybtn btnorange " type="button" value="אופציות אשראי" style="visibility: hidden" onclick="init_sum()">
				<!--<input class="mybtn btngreen " type="button" value="בדיקת המחאה" onclick="openwrap2('','.mecholel.container_pop')">-->
				<input class="mybtn btnorange " type="button" value="חולל" ng-click="payment.cholel();checkend();" >
			</div>
		</div>
		<div class="container_pop mecholel_amchaa2 display">
			<h2 class="relative">תשלומים בהמחאה</h2>
			<table class="cholel_tbl">
				<tr>
					<th>מספר המחאה</th>
					<th>תאריך</th>
					<th>בנק</th>
					<th>חשבון</th>
					<th>סניף</th>
					<th>סכום</th>
				</tr>
			</table>
			<?php if($show_check) { ?>
			 <div class="check-cheque" onclick="check_cheque(true)"  
			 ng-show = "prefers_list['pr_show_checkcheque_button'] == 'on'" >לבדוק המחאה</div>
				<?php } ?>
			 <div class="error-message"></div>
			 <input type="text" class="confirmCode" name="confirmCode" placeholder="אישור צ'ק מספר"> 
			 
			<div class="allbottom">
				<input class="mybtn btnlightgray " type="button" value="ביטול" onclick="openwrap2('','.amchaa.container_pop')">
				<input class="mybtn btnorange " type="button" value="אופציות אשראי" style="visibility: hidden" onclick="init_sum()">
				<!--<input class="mybtn btngreen " type="button" value="בדיקת המחאה" onclick="openwrap2('','.mecholel.container_pop')">-->
				<input class="mybtn btnorange submitter"  type="button" value="חולל" ng-click="payment.cholel2();"  >
			</div>
		</div>
		<div class="container_pop mecholel display">
			<h2 class="relative">מחולל תשלומים</h2>
			<form class="amchaa_frm" style="width: 80%;">
				<div style="width:48%;margin-right: 2%;float:right">
					<p style="margin-top: 10px;">סכום סה"כ:</p>
					<p>סכום תשלום ראשון:</p>
					<p>תאריך פרעון שיק ראשון:</p>
					<p>מס' שיק  \ שובר ראשון:</p>
					<p>מס' בנק:</p>
					<p>מספר סניף:</p>
					<p>מספר חשבון:</p>
				</div>
				<div style="width:50%;float:left">
					<input  class="text mecholelsum_text input_sum zerofloat" style="margin-top: 10px;"/>
					<input  class="text"  name="mecholel1_firstsum"/>
					<input type="text"  class="text"  name="mecholel1_datefirst"/>
					<input  class="text"  name="mecholel1_numcheck"/>
					<input  class="text"  name="mecholel1_bank"/>
					<input  class="text"  name="mecholel1_snif"/>
					<input  class="text"  name="mecholel1_bill"/>
				</div>
			</form>

			<div class="allbottom">
				<input class="mybtn btnlightgray " type="button" value="ביטול" onclick="openwrap2('','.ashray.container_pop')">
				<input class="mybtn btnorange " type="button" value="אופציות אשראי" style="visibility: hidden">
				<!--<input class="mybtn btngreen " type="button" value="בדיקת המחאה" onclick="openwrap2('','.mecholel.container_pop')">-->
				<input class="mybtn btnorange " type="button" value="חולל" onclick="openwrap2('','.ashray_yadany.container_pop');get_val('.mecholel .mecholelsum_text','.ashray_yadany_text')">
			</div>
		</div>
		<div class="container_pop option_ashray display">
			<h2 class="relative">אופציות אשראי</h2>
			<h5>הוסף פרטים:</h5>
			<form class="amchaa_frm" style="width: 64%;margin: 0 auto;">
				<input type="text" value="" class="optionsashray_sum text input_sum" />
				<div style="width:38%;margin-right: 2%;float:right">
					<p>תעודת זהות:</p>
					<p style="line-height: 19px;">3 ספרות אחרונות בגב הכרטיס:</p>
					<p>סוג מטבע:</p>
					<p>מספר אישור:</p>
				</div>
				<div style="width:60%;float:left">
					<input  class="text" name="optionsashray_tz"/>
					<input  class="text" name="optionsashray_threenum"/>
					<select class="text" name="optionsashray_currency">
						<option>שקל</option>
						<option>שטר</option>
					</select>
					<input  class="text" name="optionsashray_numishur"/>
				</div>
			</form>

			<input class="mybtn btnlightgray rightbottom" type="button" value="ביטול" onclick="openwrap2('','.ashray_yadany.container_pop')">
			<input class="mybtn btnblue leftbottom" type="button" value="אישור" onclick="openwrap2('','.ashray_yadany.container_pop');">
		</div>
		<div class="container_pop shovar display">
			<h2 class="relative">תשלום שובר</h2>
			<h5>לתשלום:<span style="font-size: 100%;color: #fa6f58;">₪</span><span class="span_sum zerofloat"  style="color: #fa6f58;">{{itra}}</span></h5>
			<form class="amchaa_frm" style="width: 64%;margin: 0 auto;">
				<input type="text" class="text shovar_sum input_sum zerofloat" value="0.00"  />
				<div style="width:30%;margin-right: 2%;float:right">
					<p>מספר שובר:</p>
				</div>
				<div style="width:60%;float:left">
					<input  class="text" name="shovar_num"/>
				</div>
			</form>

			<div class="allbottom">
				<input class="mybtn btnlightgray " type="button" value="ביטול" onclick="openwrap2('','.type_pay.container_pop')">
				<!--<input class="mybtn btnorange " type="button" value="אופציות אשראי" onclick="openwrap2('','.option_ashray.container_pop')">
				<input class="mybtn btnorange " type="button" value="מחולל התשלומים" onclick="openwrap2('','.mecholel.container_pop')">-->
				<input class="mybtn btnblue " type="button" value="אישור" ng-click="payment.check_end2('.shovar');add_type('.shovar_sum','שובר');checkend();"  >
			</div>
		</div>

		<div class="container_pop shovarzicuy display">
			<h2 class="relative">תשלום שובר זיכוי</h2>
			<h5>לתשלום:<span style="font-size: 100%;color: #fa6f58;">₪</span><span class="span_sum zerofloat"  style="color: #fa6f58;">{{itra}}</span></h5>
			<form class="amchaa_frm" style="width: 64%;margin: 0 auto;">
				<input type="text" class="text shovarzicuy_sum input_sum zerofloat" value="0.00"  />
				<div style="width:30%;margin-right: 2%;float:right">
					<p>מספר שובר:</p>
				</div>
				<div style="width:60%;float:left">
					<input  class="text" name="shovarzicuy_num" />
				</div>
			</form>

			<div class="allbottom">
				<input class="mybtn btnlightgray " type="button" value="ביטול" onclick="openwrap2('','.type_pay.container_pop')">
				<!--<input class="mybtn btnorange " type="button" value="אופציות אשראי" onclick="openwrap2('','.option_ashray.container_pop')">
				<input class="mybtn btnorange " type="button" value="מחולל התשלומים" onclick="openwrap2('','.mecholel.container_pop')">-->
				<input class="mybtn btnblue " type="button" value="אישור" ng-click="payment.check_end2('');add_type('.shovarzicuy_sum','שובר זיכוי');checkend();"  >
			</div>
		</div>
		<div class="container_pop points display">
			<h2 class="relative">תשלום בנקודות</h2>
			<h5>לתשלום:<span style="font-size: 100%;color: #fa6f58;">₪</span><span class="span_sum zerofloat"  style="color: #fa6f58;">{{itra}}</span></h5>
			<form class="amchaa_frm" style="width: 64%;margin: 0 auto;">
				<input type="text" class="text points_sum input_sum zerofloat" value="0.00"  />
				
			</form>

			<div class="allbottom">
				<input class="mybtn btnlightgray " type="button" value="ביטול" onclick="openwrap2('','.type_pay.container_pop')">
				<!--<input class="mybtn btnorange " type="button" value="אופציות אשראי" onclick="openwrap2('','.option_ashray.container_pop')">
				<input class="mybtn btnorange " type="button" value="מחולל התשלומים" onclick="openwrap2('','.mecholel.container_pop')">-->
				<input class="mybtn btnblue " type="button" value="אישור" ng-click="payment.check_end2('');add_type('.points_sum','נקודות');checkend();"  >
			</div>
		</div>
		<div class="container_pop credit_approval display">
			<h2 class="relative" style="margin-bottom: 30px;">אישור אשראי</h2>

			<form class="amchaa_frm" style="width: 64%;margin: 0 auto;">
				<div style="width:30%;margin-right: 2%;float:right">
					<p>מספר אישור:</p>
				</div>
				<div style="width:60%;float:left">
					<input  class="text" name="credit_approval_num" />
					<input type="hidden" name="credit_approval_details"/>
				</div>
			</form>

			<div class="allbottom">
				<input class="mybtn btnlightgray " type="button" value="ביטול" onclick="openwrap2('','.type_pay.container_pop')">
				<!--<input class="mybtn btnorange " type="button" value="אופציות אשראי" onclick="openwrap2('','.option_ashray.container_pop')">
				<input class="mybtn btnorange " type="button" value="מחולל התשלומים" onclick="openwrap2('','.mecholel.container_pop')">-->
				<!--30-08 sk-->
				<input class="mybtn btnblue " type="button" value="אישור" ng-click="payment.check_end2('');add_type('.credit_approval_num','אשראי2');checkend();"  >
			</div>
		</div>
		<div class="container_pop prifeyd display">
			<h2 class="relative">תשלום כרטיס מתנה</h2>
			<h5>לתשלום:<span style="font-size: 100%;color: #fa6f58;">₪</span><span class="span_sum zerofloat"  style="color: #fa6f58;">{{itra}}</span></h5>
			<form class="amchaa_frm" style="width: 64%;margin: 0 auto;">
				<input type="text" value="0.00" class="text zerofloat prepaid_sum input_sum" />
				 <input class="mybtn btnblue tip" ng-show = "prefers_list['pr_tip'] == 'on'" type="button" value="טיפ" style="width: 100%;margin-top: 50px;"
           onclick="$('#payments').hide();$('#credit_p').hide();$('#yadani').hide();$('#credit_appr').hide();"
           ng-controller="TipController as tipC" ng-click="start_tip('gift')" >
			</form>
			<p style="font-size: 224%;margin-top: 20px;margin-bottom: 10px;">העבר כרטיס מתנה</p>
			<!--style="background: transparent;border: transparent;color: transparent;outline: transparent;"-->
			<input type="text" name="prepaid_num" class="zerofloat prepaid_num card_visibility"  onclick="if(typeof android2!='undefined') android2.hideKeyBoard();" />
			<input class="mybtn btnlightgray rightbottom" type="button" value="ביטול" onclick="openwrap2('','.type_pay.container_pop')">
			<input class="submit_prepaid card_visibility" ng-click="payment.check_end2('');add_type('.prepaid_sum','פריפייד');checkend();"   type="button" value="לתשלום">
		</div>
		<akafa></akafa>

	</div>
	<addprod></addprod>

	<div class="popup pop_peulot  pop_debtpayments" style="z-index: 9999;left:25%" ng-controller="DebtController">
		<!--<img src="images/box_small.png" class="img_wrap"/>	-->
		<div class="container_pop debt" ng-controller="Client">
		<h2 class="relative">תשלום חוב</h2>
			<p style="font-size: 200%;margin-top: 20px;margin-bottom: 10px;">הכנס לקוח</p>
			<!--<div class="large-padded-row" style="  display: inline-block; width: 96%;" >
			      <div angucomplete-alt id="cust_search" placeholder="חיפוש לקוחות" pause="100" selected-object="selectedClient" local-data="clients" search-fields="SupplierName,sortorder,CellPhone" title-field="SupplierName,CellPhone"  minlength="1" input-class="form-control form-control-small  my_search_auto" match-class="highlight" clear-selected="true" >
			     </div>
			</div>-->
			<input type="text" class="my_search_auto cust_search_value cust_search_value2 c1 toclean" style="width: 86.5%;  margin-bottom: 20px;" placeholder="חיפוש לקוחות">
			<table class="workers_tb akafa_client_tb cl_search" style="  margin-top: 20px;width: 93%;margin: 0 auto;display: inline-block;" >
				<tr>
					<th>שם</th>
					<th>מספר</th>
					<!--<th>תאריך</th>-->
					<th>טלפון</th>
					<th>יתרה</th>
					<th>נקודות</th>
				</tr>
				<tr  ng-repeat="cust in filterc=(search_cc2  | limitTo:5) " ng-click="choose_client2(cust)" style="cursor: pointer">
					<td>{{cust.SupplierName}}</td>
					<td>{{cust.ClientNum}}</td>
					<!--<td>25.06.2014</td>-->
					<td>{{cust.CellPhone}}</td>
					<td><i color-case condition="cust.CreditBalance" class="fa fa-info-circle" ng-class="{{curr_color()}}" style="margin-right: 18px;"  ></i></span><label class="lbl2 border yitrat_hov" style="padding-right: 5px;">{{cust.CreditBalance}}  </label></td>
					<td>{{cust.points|fix2}}</td>
				<tr>
			</table>
			<p class="" style="font-size: 200%;margin-top: 20px;margin-bottom: 10px;">הכנס סכום</p>
			<input type="tel" class="text debt_sum" style="width: 92%;background: white;border: 1px solid #cfd2d9;height: 37px;"/>
			<div class="newrow2 find_cust_container display"><label class="lbl1 name">שם: {{SearchClient.SupplierName}}</label><span>|</span></span><label class="lbl2 border num">מספר: {{SearchClient.ClientNum}}</label>
  				<i class="fa fa-calendar" style="color: black;margin-right: 26px;"></i>
  				<label class="lbl1">ביקור אחרון: 25.06.2014</label><i color-case condition="SearchClient.CreditBalance" class="fa fa-info-circle" style="margin-right: 18px;  color: #e65844;  color: #e65844;"></i></span><label class="lbl2 border yitrat_hov" style="padding-right: 5px;">יתרה:{{SearchClient.CreditBalance}}  </label>
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
						<input class="mybtn btngray rightbottom" type="button" value="ביטול"  onclick="$( '.wrap' ).click();" >
			<input class="mybtn btnblue leftbottom"  ng-click="workers.save_choose2()" type="button" value="בחירה">
		</div>
	</div>

  <div class="header" style="z-index: 99999">
	<!--<div class="log" style=" position: absolute;background: red;z-index: 99999999;">
		<table>
			<th style="  width: 100px;">זמן</th>
			<th  style="  width: 100px;">שורה</th>
			<th  style="  width: 100px;">פונקציה</th>
		</table>
	</div>	-->
  	<i class="fa fa-bars"></i>
	<!--<i class="fa fa-tablet" style="margin-right: 17px;" onclick="full_screen(this)"></i>-->

	<div class="inline relative adding_p {{premission_list['permission_worker_cach']}}" style="width:50px;margin-right: 10px;  right: 15px;" onclick="openwrap('.pop_chooseworker','.pop_chooseworker,.pop_chooseworker .add_worker')">
		<i class="left fa fa-user"></i>
		<i class="left fa fa-refresh"></i>
	</div>

	<span style="color:white;  display: inline-block;" class="{{premission_list['permission_worker_cach']}} worker_top" ng-controller="WorkerController as wrkk">{{SearchWorker.SupplierName}}</span>
	<!--<i class="fa fa-usd" style="  margin-right: 18px;" onclick="openwrap3('.popup.pop_beynaim','.popup.pop_beynaim,.pop_beynaim .container_pop');$('.closebb').hide()" ng-click="alltash()"></i>-->

		<i class="fa fa-times-circle" style="color:white!important;  padding-right: 0.3%;padding-left:0.4%;padding-bottom:15px;padding-top:10px;" onclick="openwrap3('.popup.pop_beynaim','.popup.pop_beynaim,.pop_beynaim .container_pop');$('.closebb').hide();$('.hideclose').show();" ></i>
	<i class=" fa fa-clock-o clock clock" style="  padding-right:0.3%;padding-left:0.4%;padding-bottom:15px;padding-top:10px;  position: absolute;z-index: 999!important;"></i><!--</a>-->
	<i class="fa fa-credit-card prepaid" style="  padding-right: 0.3%;padding-left:0.4%;padding-bottom:15px;padding-top:10px;"></i>

	<i class="fa fa-money" style=" padding-right: 0.8%;padding-left:0.8%;padding-bottom:15px;padding-top:10px;" onclick="if(parseInt($('#total_prod').text())==''||parseInt($('#total_prod').text())==0)openwrap('.pop_debtpayments','.pop_debtpayments,.pop_debtpayments .debt')"></i>
	<!--<i class="fa fa-refresh refresh2" onclick="location.reload();" style="  margin-right:25px;"></i>-->
	<!--<i class="fa fa-ils" style="  margin-right:35px;" onclick=""></i>-->
	<i class="fa fa-ils" style="  padding-right: 0.3%;padding-left:0.4%;padding-bottom:15px;padding-top:10px;" onclick="openwrap('.mezuman_inout ,.mezuman_inout .container_pop','.mezuman_inout ,.mezuman_inout .container_pop ');"></i>
	<i class="fa fa-key" style="  padding-right: 0.3%;padding-left:0.4%;padding-bottom:15px;padding-top:10px;" ng-click="open_drawer()"></i>

	<span class='curr_dt' id="current_date" style="color: white;font-size: 160%;margin-right: 35px;">

	</span>
	<span class='curr_dt' id="curr_date" name="curr_date" style="color: white;font-size: 160%;margin-right: 1%!important;">
	<!--{{datet | date:' HH:mm'}}--><!--sk 06/09 get current date from server-->
	</span>
	<!--sk 24/02/2016 show message if there no internet connection-->
	<p style="display: none;z-index: 999" id="error_internet_connect">
		<i class="fa fa-exclamation-triangle" style="color:red;font-weight: bold">אין חיבור אינטרנט </i>
    </p>
	<!--<button onclick="localStorage.clear();location.reload();">איפוס</button>
	<button onclick="invoice()">הדפס</button>-->

   <div class="stat inline" style="width: 11%;">
        <!--sk 05/01/16 new X report-->
        <label id="stock_name" data-id="<?=$stock?>">a<?=$stock?></label>
	<!--      Of{{finalltash2['all']}} -->
   </div>
   <!-- lc 04/04/2016 change css btn close-open kupa -->
   <div class="stat inline btn" style="width: 22% !important;margin-left: -10%;">
       <div  style="width: 42% !important;margin-right: -12% !important;"  class="openclose op <? if ($stat != "open_cashbox") /*סגור קופה*/
             echo "display"; ?>">
             <!-- <i class="fa fa-check"></i> --><!-- lc 04/04/2016 change btn close-open kupa -->
             <span class=" stt open" style="width: 92%;margin-left: 3%;" onclick="openwrap('.popup.pop_beynaim','.popup.pop_beynaim,.pop_beynaim .container_pop');$('.closebb').show();$('.hideclose').hide();">פתוח</span>
       </div>
       <div style="z-index: 9999999; width: 42% !important; margin-right: -12% !important;"  class="openclose cl <? if ($stat == "open_cashbox") /*פתח קופה*/
            echo "display"; ?>" >
            <!-- <i class="fa fa-times "><!-- lc 04/04/2016 change btn close-open kupa -->
            <span class="stt close" style="z-index: 9999999; width: 92%; margin-left: 3%;">סגור</span><!--30px-->
       </div >
   </div>
   <i class=" fa fa-cog icon_of_settings_screen"  onclick="openwrap('.pop_sett','.pop_sett,.pop_sett .enterpage')"></i> <!-- lc 04/04/2016 add css media to change loction of icon  settings -->
   <div class="logo_border">

<?

/*if($stock==608000&&$userID!=570){
?>
	<img src="images/leumi.png">
<?
}
else if($stock==607000&&$userID!=570){
?>
	<img src="images/orange.png">
<?
}
else if($stock==609000&&$userID!=570){
?>
	<img src="images/yedatop.png">
<?
}
else{
?>
	<img src="images/logoex.png">
<?
}*/
?>
<img src="/themes/blue/images/vector_smart_object_12.png">
	</div>
	<script>
		user_id='<?=$userID?>';
		stock=<?=$stock?>;

	</script>

  </div>

  <div class="leftmenu display">
  	<!--<div class="leftmenu_inner" ng-click="menuclick('top.php?t=clients&stock=<?=$stock?>')" >
  		<i class=" fa fa-group"></i>
  		<p>לקוחות</p>
  	</div>
  	<div class="leftmenu_inner" ng-click="menuclick('top.php?t=reports&stock=<?=$stock?>')" >
  		<i class="fa fa-file-text-o"></i>
  		<p>דוחות</p>
  	</div>
  	<div class="leftmenu_inner"  ng-click="menuclick('top.php?t=documents&stock=<?=$stock?>')" >
  		<i class=" fa fa-file-o"></i>
  		<p>מסמכים</p>
  	</div>
  	<div class="leftmenu_inner"  ng-click="menuclick('top.php?t=mail&stock=<?=$stock?>')" >
  		<i class="fa fa-envelope-o"></i>
  		<p>מערכת דיוור</p>
  	</div>
  	<div class="leftmenu_inner"  ng-click="menuclick('top.php?t=prepaid&stock=<?=$stock?>')" >
  		<i class=" fa fa-money"></i>
  		<p>כרטיס מתנה</p>
  	</div>
  	<div class="leftmenu_inner"  ng-click="menuclick('top.php?t=check_check&stock=<?=$stock?>')" >
  		<i class="fa fa-check-square-o"></i>
  		<p>בדיקת המחאות</p>
  	</div>
  	<div class="leftmenu_inner"  ng-click="menuclick('top.php?t=check_credit&stock=<?=$stock?>')">
  		<i class="fa fa-check-square-o"></i>
  		<p>בדיקת אשראי</p>
  	</div>-->
  	<!--sk 03/12   /a.yeda-t.com/main2.php-->

  	<?$string_a="window.location.href='http://kupa.yedatop.com/main2.php'";
  		if($_SERVER['REMOTE_ADDR']=='213.8.200.78'){
  			//$string_a="window.location.href='http://a.yeda-t.com/main2.php'";
  			$string_a='go_to_office()';
  		}?>
        <div class="leftmenu_inner" ng-click="open_backoffice()">
            <i class="fa fa-file-text-o"></i>

            <p>משרד אחורי</p>
    </div>
        <div class="leftmenu_inner" style="text-align: right; margin-right: 15px;">
            <a href="https://www.peletop.co.il/production" target="_blank" style="text-decoration: none; color: inherit;"><img style="height: 70%; width: auto;" src="images/peletop.jpeg"> פלאטוק </a>
    </div>
        <?
         	/*while ($row=mysql_fetch_array($titles_to_draw))
				 {
				 	?>


					<div class="leftmenu_inner" onclick="window.location.href='https://kupa.yedatop.com/<?=$row['link']?>'">
            <i class="fa fa-circle"></i>

            <p><?=$row['link_name']?></p>
        </div>
					<?
				 }*/?>

  </div>




  <div class="mainarea" >
  	<div ng-controller="CashProdController  as cash_prod">

  	<div class="right rightside" ng-controller="ProductController as prod" id="product_main" ng-enter="search_barcode()">

  		<!-- form for barcode. not visible -->
<?
	if(isset($_REQUEST[online])&&$_REQUEST[online]=='off'){
?>
		<form>
  			<input type="text" class="search_input1" id="search_prod" onfocus="if(typeof android!='undefined')$(this).blur(); "
  				style="  background: transparent; border: transparent;  outline: none;color:transparent;position: absolute" />
  		</form>
<?
	}
	else{
?>
  		<form>
  			<input type="text" class="search_input1" id="search_prod"  onfocus="if(typeof android!='undefined')$(this).blur();"
  				style="  background: transparent; border: transparent;  outline: none;color:transparent;position: absolute" />
  		</form>


 <?
	}
 ?>
  <form class="search_form relative">
 <?
	if(isset($_REQUEST[online])&&$_REQUEST[online]=='off'){
?>
		<input type="text" class="search_input toclean" id="search_prod2"     placeholder="חיפוש מוצרים" />
<?
	}
	else{
?>
  		<input type="text" class="search_input toclean" id="search_prod2"  placeholder="חיפוש מוצרים"  />

 <?
	}
 ?>

			<input type="button" ng-click="search_p();call_setTab(4)" class="search_p_global main_search_prod" style="display: none" value="חפש"/>
			<i class="fa fa-search-plus search_p_plus" style="margin-right:5px" ng-click="call_setTab(7)"></i>
			<i class="fa fa-search" ></i>

  			<div class="relative submit_wrap">
  				<input type="button"  value="" onclick="openwrap3('.pop_add_prod','.pop_add_prod ,.pop_add_prod .container_pop')"/>
  				<i class="fa fa-tag"></i>
				<i class="fa fa-plus"></i>
  			</div>
  		</a>
  		</form>
  		<div >
  			<div class="rightcenter prod_area relative" ng-show="call_isSet(22)" >
  			<div class="prod_div">
  			<div class="prod_title">
				<p id="cat_name" style="margin-right: 15%;">מחלקות</p>
				<span id="num_product" style="float: left;margin-top: 11px;margin-left: 8px;color: white;"></span>
			</div>
  			<div class="prod_container">
  				<div id="resizable" class="cats prod_row ui-widget-content" style="text-align: center;">
  					<i class="fa fa-spinner fa-spin spinner1" style="font-size: 100px;  color: rgb(85,193,231);margin-top: 7%;"></i>
  					<div class="prod"  ng-repeat="cat in prod.catJson | filter: {ContainsGeneralItem: 1}"  ng-click="prod.getCategory2(cat.ID,cat.CategoryName)">
  					<div  class=" first main_cat categ" id="button_cats_{{cat.ID}}" >
  						<img ng-src="{{prod.image('<?=$target_image_dir?>',cat.picture)}}"></img>
						<p >{{cat.CategoryName|cut:true:15}}</p>
  					</div>
					</div>
    				</div>
  			</div>
  			</div>
  			<!--<img src="images/arrow_o.png" class="arrow_o"/>-->

  		</div>

  		<div class="rightcenter prod_area relative" ng-show="call_isSet(1)" >
  			<div class="prod_div">
  			<div class="prod_title">
				<p id="cat_name" style="margin-right: 15%;">מחלקות</p>
				<span id="num_product" style="float: left;margin-top: 11px;margin-left: 8px;color: white;"></span>
			</div>
  			<div class="prod_container">
  				<div id="resizable" class="cats prod_row ui-widget-content" style="text-align: center;">
  					<i class="fa fa-spinner fa-spin spinner1" style="font-size: 100px;  color: rgb(85,193,231);margin-top: 7%;"></i>
  					<div class="prod"  ng-repeat="cat in prod.catJson | filter: {parent_id: '0'} :true"  ng-click="prod.getCategory2(cat.ID,cat.CategoryName)">
  					<div  class=" first main_cat categ" id="button_cats_{{cat.ID}}" >
  						<img ng-src="{{prod.image('<?=$target_image_dir?>',cat.picture)}}"></img>
						<p >{{cat.CategoryName|cut:true:15}}</p>
  					</div>
					</div>
					<div class="prod" id="button_cats_{{cat2.picture}}" ng-click="cash_prod.add_cart(cat2)" ng-repeat="cat2 in filtered=(prod.products | filter: { quick_item: '1' } :true)">


                                        <div class=" first main_cat">
                                        <!--line 1625 sk 19/06/2016 add picture to product-->
                                        <!--<img src="<?= $target_image_product_dir ?>">-->

                                        <img class="{{prod.add_class(cat2.picture)}}" src="{{prod.draw_img('<?=$target_image_product_dir ?>',cat2.picture)}}">
                                            <p style="margin-top: 11px !important;">{{cat2.Title|cut:true:45}}</p>
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

  					<!-- <div class="prod" id="button_cats_{{cat2.ID}}" ng-click="cash_prod.add_cart(cat2)"  ng-repeat="cat2 in filtered=(prod.products | filter: { ProductGroup: prod.currgroup}:true )" >

  					<div  class=" first main_cat" >
						<p style="margin-top: -4px;">{{cat2.Title|cut:true:45}}</p>
  					</div>
					</div> -->
<div class="prod"  ng-repeat="cat in prod.catJson | filter: {parent_id: prod.currgroup} : true"  ng-click="prod.getCategory2(cat.ID,cat.CategoryName)">
  					<div  class=" first main_cat categ" id="button_cats_{{cat.ID}}" >
  						<img ng-src="{{prod.image('<?=$target_image_dir?>',cat.picture)}}"></img>
						<p >{{cat.CategoryName|cut:true:15}}</p>
  					</div>
					</div>
					<div class="prod" id="button_cats_{{cat2.picture}}" ng-click="cash_prod.add_cart(cat2)" ng-repeat="cat2 in filtered=(prod.products | filter: { ProductGroup: prod.currgroup } :true)">


                                        <div class=" first main_cat">
										<!--line 1625 sk 19/06/2016 add picture to product-->
										<!--<img src="<?= $target_image_product_dir ?>">-->

										<img class="{{prod.add_class(cat2.picture)}}" src="{{prod.draw_img('<?=$target_image_product_dir ?>',cat2.picture)}}">
                                            <p style="margin-top: 4px !important;">{{cat2.Title|cut:true:45}}</p>
                                        </div>
                                    </div>
    				</div>
  			</div>
  			</div>
  			<!--<img src="images/arrow_o.png" class="arrow_o"/>-->

  		</div>
  		<div class="rightcenter prod_area relative " ng-show="call_isSet(7);">
  			<div class="prod_div">
  			<div class="prod_title">

				<p  class="prod_btntop" ng-click="prev()" >חיפוש מוצרים</p>
							</div>
  			<div class="prod_container" ng-controller="AddProductController">
  				<div id="resizable" class="prod_row ui-widget-content" >
  					<div class="prod_search_contain">
  						<input type="text" placeholder="ברקוד" class="advanced_input toclean" id="advanced_s_Barcode"/>
  						<input type="text" placeholder="מחיר" class="advanced_input toclean" id="advanced_s_SalePrice"/>
  						<select id="advanced_s_ProductGroup" class="advanced_input toclean" ng-model="p_ProductGroup" ng-options="CategoryName.CategoryName for CategoryName in  category track by CategoryName.ID"></select>
  						<!--<input type="text" placeholder="קבוצה" class="advanced_input toclean" id="advanced_s_ProductGroup"/>-->
  						<input type="text" placeholder="דגם" class="advanced_input toclean" id="advanced_s_MisparZar"/>
  						<select id="advanced_s_Sapak" class="advanced_input toclean" ng-model="p_Sapak"  ng-options="SupplierName.SupplierName for SupplierName in  sapak track by SupplierName.ID"></select>
  						<input type="text" placeholder="מספר סידורי" class="advanced_input toclean" id="advanced_s_MisparSiduri"/>
  						<input type="text" placeholder="מספר חליפי" class="advanced_input toclean" id="advanced_s_chalifinum"/>
  					</div>
  					<div style="width:20%;float:left">
  						<input type="button " ng-click="advanced_search_p();" class="search_p_global advanced_btn" value="חפש" id="advanced_ProductGroup">
  					</div>
    				</div>
  			</div>
  			</div>
  			<!--<img src="images/arrow_o.png" class="arrow_o"/>-->

  		</div>
  		<div class="rightcenter prod_area relative tab8" ng-show="call_isSet(8);" ng-controller="Client">
  			<div class="prod_div">
  			<div class="prod_title">
				<p  class="prod_btntop custse" ng-click="prev()" >חיפוש לקוחות</p>
			</div>
  			<div class="prod_container">
  				<div id="resizable" class="prod_row ui-widget-content" >
  					<div>
  						<input type="text" placeholder="ת.ז (ח.פ)" class="advanced_input toclean" id="advanced_c_BusinessNum"/>
  						<input type="text" placeholder="שם" class="advanced_input toclean"  id="advanced_c_SupplierName"/>
  						<select id="advanced_c_GroupId" class="advanced_input toclean" ng-model="c_GroupId"  ng-options="GroupName.GroupName for GroupName in  clientgroups track by GroupName.ID"></select>
  						<input type="text" placeholder="טלפון" class="advanced_input toclean" id="advanced_c_CellPhone"/>
  						<input type="text" placeholder="כתובת" class="advanced_input toclean" id="advanced_c_Address"/>
  						<input type="text" placeholder="מספר לקוח/ה" class="advanced_input toclean" id="advanced_c_ClientNum"/>

  					</div>
  					<div style="width:20%;float:left">
  						<input type="button " ng-click="advanced_search_cust();call_setTab(9)" class="search_p_global advanced_btn" value="חפש" id="advanced_search_cust">
  					</div>
    				</div>
  			</div>
  			</div>
  			<!--<img src="images/arrow_o.png" class="arrow_o"/>-->

  		</div>
  		  		<div class="rightcenter prod_area relative " ng-show="call_isSet(9);" ng-controller="Client">
		  			<div class="prod_div">
		  			<div class="prod_title">
						<p  class="prod_btntop" ng-click="prev()" ng-show="isprev()">הקודם</p>
						<p  class="prod_btntop" ng-click="next()" ng-show="isnext()">הבא</p>
						<span id="num_product" style="float: left;margin-top: 11px;margin-left: 8px;color: white;">מס' הפריטים: <span class="numpritim2">{{filterc.length}}</span></span>

					</div>
		  			<div class="prod_container hidden1">
		  				<div id="resizable" class="prod_row ui-widget-content">
								<table cellspacing="0" cellpadding="0" class="workers_tb akafa_client_tb" style="  margin-top: 20px;  " >
										<tr>
											<th style="border: 1px solid #FFAB9D;">שם</th>
											<th style="border: 1px solid #FFAB9D;">מספר</th>
											<th style="border: 1px solid #FFAB9D;">טלפון</th>
											<th style="border: 1px solid #FFAB9D;">יתרה</th>
											<th style="border: 1px solid #FFAB9D;">נקודות</th>
										</tr>
								</table>
								<div class="contain_hidden" style="  overflow-y: scroll;overflow-x: hidden;">
									<table class="workers_tb akafa_client_tb" >
											<tr  ng-repeat="cust in filterc=(search_cc | limitTo:30 ) " ng-click="call_setTab(1);choose_client(cust);" style="cursor: pointer">
												<td>{{cust.SupplierName}}</td>
												<td>{{cust.ClientNum}}</td>
												<td>{{cust.CellPhone}}</td>
												<td>
													<i color-case condition="cust.CreditBalance"  class="fa fa-info-circle" style="margin-right: 18px; "></i>
													</span><label class="lbl2 border yitrat_hov" style="padding-right: 5px;">{{cust.CreditBalance}} </label>
												</td>
												<td>{{cust.points|fix2}}</td>
											<tr>
									</table>
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

  					<div class="prod" id="button_cats_{{cat2.ID}}" ng-click="cash_prod.add_cart(cat2)" ng-repeat="cat2 in filterprod=(search_prd_off  | slice:start:end) " >

  					<div  class=" first main_cat" >
<? echo '<!--1707-->'; ?>
								<p style="margin-top: -4px;">{{cat2.Title|cut:true:45}}</p>
  					</div>
					</div>
    				</div>
  			</div>
  			</div>
  			<!--<img src="images/arrow_o.png" class="arrow_o"/>-->

  		</div>

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

  					<div class="prod" id="button_cats_{{cat2.ID}}" ng-click="cash_prod.add_cart(cat2)"  ng-repeat="cat2 in filtered=(search_prd |  slice:start:end)" >

  					<div  class=" first main_cat" >
<? echo '<!--1738-->'; ?>
							<p style="margin-top: -4px;">{{cat2.Title|cut:true:45}}</p>
  					</div>
					</div>
    				</div>
  			</div>
  			</div>
  			<!--<img src="images/arrow_o.png" class="arrow_o"/>-->
  			<style>
  				/* .first.main_cat p{
  				 	left:20%!important;
  				 	margin-right: 0;
  				 	top:20%!important;
  				 	width: 70%;
  				 }
  				 .categ.first.main_cat p{
  				 	left:5%!important;
  				 	margin-right:50%;
  				 	top:40%!important;
  				 	width:auto;
  				 	width: 100%;
  				 }*/
  				 .check-cheque{    background: #a1d46f;
  				     padding: 14px;
  				     cursor:pointer;
  				     position:relative;
  				     color: white;
  				     font-weight: bold;
  				     display: block;
  				     margin: 25px auto 0 auto;
  				     clear: both;
  				     float: none;
  				     max-width: 240px;
  				     box-shadow: 0 2px 2px #383838;
  				     position: relative;
  				     top: 10px;
  				 }
  				 .btnblue:disabled {
  				     background: #b9b9b9;
  				     box-shadow: 0px 3px 0px #292929;
  				     opacity: 0.6;}
  				 .check-cheque.load{
  				
  				color:#a1d46f;
  				 
  				 }
  				  .check-cheque.load:after{
  				  	 background:url('./images/loadd.gif') no-repeat center center / 32px;
  				  	 position:absolute;
  				  	 width:100%;
  				  	 height:100%;
  				  	 left:0;
  				  	 top:0;
  				  	 z-index:10;
  				  	content:"";
  				  }
  				  .error-message{margin-top: 20px;
  				  font-size: 24px;
  				}
  				  
  				    .error-message.error{
  				    
  				      color: red;
  				    }
  				   .error-message.success{
  				   
  				   	color:green;
  				   }
  				 ::-webkit-scrollbar {
				    display: none;
				}

				input[type="text"]:disabled{background-color:white;}
				.mainarea2{
					width: 100%!important;
					overflow: hidden!important;
				}

					.keyboard_tbl .result {
					    position: absolute !important;
					    height: 295px!important;
					    width: 87px!important;
					    top: 0!important;
					    right: 0!important;
					}
				@media screen and (-webkit-min-device-pixel-ratio:0) {
				   .keyboard_tbl .result {
					    height: 100%!important;
					}
				}
			/*	html body .categ.first.main_cat p.precent,html body .first.main_cat p.precent{
					left:50%!important;
				}
				html body .categ.first.main_cat p.precent2,html body .first.main_cat p.precent2{
					left:50%!important;
				}*/

  			</style>
  			<script>
  				if(typeof android =='undefined'){
  					$(".categ.first.main_cat p,.first.main_cat p").addClass('precent');
  				}
  				else{
  					$(".categ.first.main_cat p,.first.main_cat p").addClass('precent2');
  				}
  			</script>
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
  				<div id="resizable" class=" prod_row ui-widget-content">

  					<div class="prod" id="button_cats_{{cat2.ID}}" ng-click="cash_prod.add_cart(cat2)" ng-repeat="cat2 in filterprod2=(search_prd_barcode |slice:start:end) " >

  					<div  class=" first main_cat" >
<? echo '<!--1815-->'; ?>
						<p style="margin-top: -4px">{{cat2.Title|cut:true:45}}</p>
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
				<i class="fa fa-arrow-circle-up"></i>
  				<input type="button" class="rightcenter_btn btngreen prod_btn" value="הוסף פריט כללי"  ng-show="call_isSetMulti(1,22,3,4,44,7,8,9)"  ng-click="call_setTab(2)">
  				<input type="button" class="rightcenter_btn btnorange  calc_btn" value="מחלקות / מוצרים מהירים"  ng-show="call_isSetMultiCalc(2,5)"  ng-click="call_setTab(1)">
  			</div>
  		<div class="rightcenter calc_area"   ng-show="call_isSetMultiCalc(2,5)">

  			<div class="rightcenter calc_area" style="">
  				<div class="prod_title calc_title">
					<p id="cat_name" style="margin-right: 15%;">מחשבון</p>
					<span id="num_product" style="float: left;margin-top: 11px;margin-left: 8px;color: white;"></span>
				</div>
  			<form name="Calc">
		<table style="width:100%" border="0" cellpadding="0" cellspacing="0">
		<tbody><tr>
		<td id="result_calc" class="input_result" style="height: 143.8px;">
		<input type="text" class="calc_result" value="" name="Input" style="width:98%;padding-right:2%;color:#42494f;height:92%">
		<br>
		</td>
		</tr>
		<tr>
		<td>
		<table class="inner_calc" style="direction: ltr;" border="0" cellpadding="0" cellspacing="0" ng-controller="CalcController  as calc">
			<tbody><tr>

				<td style="height: 143.8px;"><input type="button" name="one" value="  1  " ng-click="calc_type('1')">  </td>
				<td style="height: 143.8px;"><input type="button" name="two" value="  2  "  ng-click="calc_type('2')">  </td>
				<td style="height: 143.8px;"><input type="button" name="three" value="  3  " ng-click="calc_type('3')">  </td>
				<td style="height: 143.8px;"><input type="button" class="math" name="plus" value="  +  "ng-click="calc_type('+')"></td>
				<td style="height: 143.8px;"><input type="button" class="math" name="clear" onclick="$('input[name=Input]').val('')" style="background:url('images/erase.png')no-repeat 51% 50% #e6e9ee!important"></td>
			</tr>
			<tr>

		<td style="height: 143.8px;"><input type="button" name="four" value="  4  " ng-click="calc_type('4')"></td>
		<td style="height: 143.8px;"><input type="button" name="five" value="  5  " ng-click="calc_type('5')">  </td>
		<td style="height: 143.8px;"><input type="button" name="six" value="  6  "ng-click="calc_type('6')">  </td>
        <?php if(intval($row11['pr_weight_no_vat']) === 1) : ?>
        <td style="height: 71.9px;">
            <input type="button" ng-click="cash_prod.add_general_weight_cart_no_vat()" style="font-size:20px;" name="weight" value='משקל ללא מע"מ'><!--noVatWeight-->
        </td>
        <?php endif; ?>
        <td style="height: 143.8px;"><input type="button" class="math" name="times" value="  x  " ng-click="calc_type('*')"></td>
			</tr>
			<tr>
		<td style="height: 143.8px;"><input type="button" name="seven" value="  7  " ng-click="calc_type('7')"></td>
		<td style="height: 143.8px;"><input type="button" name="eight" value="  8  " ng-click="calc_type('8')">  </td>
		<td style="height: 143.8px;"><input type="button" name="nine" value="  9  " ng-click="calc_type('9')">  </td>
        <td style="height: 143.8px;">
            <input type="button" ng-click="cash_prod.add_general_weight_cart()" style="font-size:20px;" name="weight" value="משקל"><!--vatWeight-->
        </td>
        <td rowspan="2" style="position: relative; height: 143.8px;"><div name="DoIt" class="result"  ng-click="cash_prod.add_new_cart();calc.calc3();"><i class="fa fa-check-circle"></i></div><!--here code 2-->
            <div name="DoIt" class="result2 display" onclick="Calc.Input.value = eval(Calc.Input.value);anacha_doit();tip_doit();"><i class="fa fa-check-circle"></i></div>
        </td>
			</tr>
			<tr>
		<td style="height: 143.8px;"><input type="button" name="dot" value="  .  " ng-click="calc_type('.')"></td>
		<td style="height: 143.8px;"><input type="button" name="zero" value="  0  " ng-click="calc_type('0')">  </td>
		<td style="height: 143.8px;"><input type="button" name="zerozero" value="  00  " ng-click="calc_type('00')"></td>
		<!-- <td><INPUT TYPE="button" NAME="DoIt"  VALUE="  =  " OnClick="Calc.Input.value = eval(Calc.Input.value)"></td> -->
		<!--<td style="height: 143.8px;"><input type="button" class="math" name="div" value="  %  " ng-click="calc_type('%')">-->
			<td style="height: 143.8px;"><input type="button" style="font-size:20px;" name="add_category" value="הוסף למחלקה" ng-click="addCategory();call_setTab(22);"></td>

			<input type="hidden" name="flag_focused"/>
		</td>
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
			 <!--<div class="large-padded-row" style="  display: inline-block; width: 90%;">
			      <div angucomplete-alt id="cust_search" placeholder="חיפוש לקוחות" pause="100" selected-object="selectedClient" local-data="clients" search-fields="ClientNum,SupplierName,CellPhone,Address" title-field="ClientNum,SupplierName,CellPhone,Address"  minlength="1" input-class="form-control form-control-small  my_search_auto" match-class="highlight" clear-selected="true" >
			     </div>
			     <i class="fa fa-search show"></i>
			</div>-->
			<input type="text" class="search_input my_search_auto cust_search_value c1 toclean"  placeholder="חיפוש לקוחות">
			<input type="button" ng-click="search_c('.leftside .search_form .cust_search_value');call_setTab(9)" style="display: none"  class="search_p_global main_search_cust" value="חפש">
			<input type="button" ng-click="search_c2(' .cust_search_value2');" style="display: none"  class="search_p_global main_search_cust2" value="חפש">
			<span class="relative submit_wrap" onclick="openwrap('','.pop_add_client,.pop_add_client .container_pop ');$('.client.mainarea2 input').val('')">
				<input type="button"  value="" class="search_cust_sbm" onclick=""/>
				<i class="fa fa-user"></i>
				<i class="fa fa-plus"></i>
			</span>
			<i class="fa fa-search-plus search_p_plus " ng-click="call_setTab(8)" style="float:right;margin-right: 1%;margin-left: 2%;"></i>
    					<!--sk 03/03/216-->
    					<!-- search_input my_search_auto cust_search_value c1 toclean -->
            <input type="text" class="add_customer_m search_input toclean "  style="flaot:left !important" id="add_customer_m" placeholder="לקוחות מזדמנים ">
            <!-- <input type="text" class="add_customer_m my_search_auto cust_search_value c1 toclean"  style="flaot:left !important" id="add_customer_m" placeholder="לקוחות מזדמנים "> -->
			<input type="tel" id="add_customer_m_phone" style="font-size: 21px" class="search_input toclean "  placeholder="טלפון לקוחות מזדמנים">
			
			<span class="relative submit_wrap"></span>
			<span class="relative submit_wrap" style="margin-right: 10px"></span>

			<!--<div style="float:right;margin-right: 1%;margin-left: 2%;color:Transparent">fffffffff</div>-->

			<!-- //תצוגת משתמש מזדמן רכב תלוי לפי הגדות מערכת -->
			<input type="tel" id="add_customer_m_car" style="font-size: 21px" class="search_input toclean "  ng-show = "prefers_list['pr_save_mizdamen'] == 'on'"  placeholder="רכב לקוחות מזדמנים">

		</div>
		<br /><br /><br />
  			<div class="newrow2 find_cust_container display"><label class="lbl1 name">שם: {{SearchClient.SupplierName}}</label><span>|</span></span><label class="lbl2 border num">מספר: {{SearchClient.ClientNum}}</label>
  				<span>|</span>
  				<!-- <i class="fa fa-calendar" style="color: black;padding-right: 12px;"> --></i>
  				<!--<label class="lbl1">25.06.2014</label>
  				<span>|</span>--><i class="fa fa-phone" style="color: black;padding-right: 12px;"></i>
  				<label class="lbl1">{{SearchClient.CellPhone}}</label>
  				<i color-case condition="SearchClient.CreditBalance" class="fa fa-info-circle" style="margin-right: 18px; "></i></span><label class="lbl2 border yitrat_hov" style="padding-right: 5px;">יתרה: {{SearchClient.CreditBalance}}</label>
  			<span>|</span></span><label class="lbl2 border num">נקודות: {{SearchClient.points|fix2}}</label>
  			</div>
  		</div>
  		<table style="width: 100%;font-size:150%;  margin-top: 3%;">
  				<tr class="details_title">
				    <th class="" style="width:70px"></th>
				 <!--   <th style="width:20%">בר קוד</th> -->
				    <th style="width:19%">שם פריט</th>
				    <th>מחיר</th>
				    <th  style="">כמות</th>
				    <th>הנחה</th>
				    <th >סה"כ</th>
				    <th class=""  style="width:70px"></th>
				  </tr>
  			</table>
  		<div class="details_area" id="cat2" style="width: 100%;overflow-y: scroll;  margin-top: 0; height: 300px" >
  			<table style="width: 100%;font-size:150%;">
  			    <tbody ng-repeat="cash_prd in cash_prod.products">
				  <tr class="active tr_{{cash_prd.BarCode}}" >
				  	<td class=" text_center" style="width:70px" ng-controller="CommentController as commentC" ng-click="start_comment_prod(cash_prd.BarCode);call_setTab(5)" ><i class="fa fa-info-circle {{cash_prd.commentClass}}"></i></td>

				  	<td style="width:19%"><p style="height:40px;overflow: hidden;">{{cash_prd.Title|cut:true:15}}</p></td>
				  	<td class="prod_SalePrice">{{::cash_prd.SalePrice}}</td>
							<td class="text_center" ><i class="fa fa-plus-circle" ng-show="cash_prd.Unit != 2" ng-click="cash_prod.plus_count((cash_prd.SalePrice-cash_prd.Discount),cash_prd.index,cash_prd.refund)"></i>
							<p class="plusminus" ng-click="call_setTab(1);call_setCountIndex(cash_prd.index);" style="display: inline-block;width:60px;text-align:center;">
								{{cash_prd.Amount}}
							</p>
							<i class="fa fa-minus-circle" ng-show="cash_prd.Unit != 2" ng-click="cash_prod.minus_count((cash_prd.SalePrice-cash_prd.Discount),cash_prd.index,cash_prd.refund);"></i></td>
				  	<td ng-click="start_anacha_prod(cash_prd,(cash_prd.SalePrice-cash_prd.Discount)*cash_prd.Amount)"><i class="fa fa-tag {{::isdiscount(cash_prd.Discount)}}" style="margin-left: 10px;" ></i>{{cash_prd.Discount*cash_prd.Amount|fix2}}</td>
				  	<td class=" padding_5 sum_p_l" >{{(cash_prd.SalePrice-cash_prd.Discount)*cash_prd.Amount|fix2}}</td>
				  	<td id="leac111111" class=" text_center" ng-click="cash_prod.remove_cart(cash_prd.BarCode,cash_prd.SalePrice,cash_prd.index);"><i class="fa fa-times" ></i></td>
				  </tr>
				  <tr ng-show="cash_prd.discount_desc != ''" style="line-height: 2px">
				      <td></td>
				      <td><i class="fa fa-tags" aria-hidden="true"></i></td>
				      <td style="font-size: 16px;text-align: right;" colspan="3">{{cash_prd.discount_desc}}</td><td ng-show ="cash_prd.discount_sale!=0"  style="color: green;" colspan="1">-{{cash_prd.discount_sale|number:2}}</td>
				  </tr>
				  </tbody>
  			</table>
  		</div>


		<div class="abso">
			<br /><br />
  		<div class="sum_area" style="margin-top: -9px">
  			<div class="right inline">
  				<div class="newrow1" ng-controller="CommentController as commentC" ng-click="start_comment();" >
  					<label class="block" style="  font-size: 120%;"><i class="fa fa-pencil {{commentClass}}" style="width:30px"></i>הוסף הערה</label>
  					<div class="newrow2" style="  font-size: 125%;"><label class="lbl1" style="  margin-right: 30px;">סה"כ פריטים: <span id="total_prod">{{countprod}}</span></label></div>
  				</div>
  				<div class="discount_group" style="display: none;">
  					<p>לקוח חבר בקבוצת מועדון {{SearchClient['group_name']}}</p>
  					<p>אחוזי הנחה: {{SearchClient['group_p']}}</p>
  					<p>לפני הנחת מועדון:   {{before_global_dis}}</p>
  					</div>
  				<!--<div class="newrow2"><label class="lbl1">שם: יהב כהן</label><span>|</span></span><label class="lbl2 border">מספר: 159</label>
				<label class="lbl3">ביקור אחרון: 25.6.2014</label>
				</div>
  				<div class="newrow3"><label>יתרת חוב: </label><label >  ₪</label><label id=before_tax style="font-size: 150%;"></label></div>-->
  			</div>
  			<div class="left inline">
  				<div class="newrow2"><!--here code 1-->
  					<div style="width: 100%;height: 26px;font-size: 130%;"><label class="left">₪</label><label class="right">סכום ביניים:</label><label class="left in_sum zerofloat">{{original_afterprod}}</label></div>
  					<div class="before_calc" style="width: 100%;height: 26px;font-size: 130%;display: none"><label class="right">הנחה:</label><label class="left in_sum zerofloat">{{discountAsShach}}</label><label class="left">₪</label></div>
  				<div class="newrow3" >
  					<!-- <p  class="curr">&nbsp;&nbsp;&nbsp;₪</p> -->
  					<label class="finall_price zerofloat" style="float: left">{{amount}}</label>
  				</div>

  			</div>

  		</div>
  		<!-- sk 02/03/2016 view product or calculator-->
                        <input type="hidden" id="show_div_prod" name="show_div_prod" value="<?=$row11['pr_viewprod']?>" />
  		 <!--sk 07/01/16 out the payment buttons for brunch-->
       <div style="height: 40px;margin-top: 17px;position: absolute;bottom: 65px;width: 100%;" ng-controller="PaymentController as payment">
       	<!--//ng-style="{color: myColor}-->
       	     <!--<input type="button"  value="טיפ" class="tip" ng-controller="TipController as tipC" ng-click="start_tip()" />-->

       	     <!--מזומן-->
        	 <input class="mybtn btnorange" id="in_pr_show_cash_button" type="button" value="מזומן"  style="display:<?=$display_cash_button?>" ng-controller="PaymentController  as payment"  ng-click="init_sum();start_pay111('.mezuman');select();">
             <!--המחאה-->
			<input class="mybtn btnblue"  id="in_pr_show_cheque_button" type="button" value="המחאה" style="display:<?=$display_cheque_button?>" ng-click="init_sum();start_pay111('.amchaa');select();">
			 <!--אשראי-->
			<input class="mybtn btngreen" id="in_pr_show_credit_button" type="button" value="אשראי" style="display:<?=$display_credit_button?>" ng-click="init_sum2();start_pay111('.ashray');select();">
			 <!--שובר זיכוי-->
			<input class="mybtn btngray prepaid_disabled"  id="in_pr_show_shovarzicuy_button" type="button" style="display:<?=$display_shovarzicuy_button?>" value="שובר זיכוי" ng-click="init_sum();start_pay111('.shovarzicuy');select();">
			 <!--נקודות-->
			<input class="mybtn btngray prepaid_disabled"  id="in_pr_show_points_button" type="button" style="display:<?=$display_points_button?>" value="נקודות" ng-click="init_sum();start_pay111('.points');select();">
			 <!--הקפה-->
            <input class="mybtn btngray" id="in_pr_show_akafa_button" type="button"  style="display:<?=$display_akafa_button?>" value="הקפה" ng-click="init_sum();start_pay111('.akafa');select();">
             <!--כרטיס מתתנה-->
            <input class="mybtn btngray" id="in_pr_show_prepaid_button" type="button" style="display:<?=$display_prepaid_button?>" value="כרטיס נטען" ng-click="init_sum();start_pay111('.prifeyd');select();">
             <!--שובר-->
            <input class="mybtn btngray prepaid_disabled" id="in_pr_show_shovar_button" style="display:<?=$display_shovar_button?>" type="button" value="שובר" ng-click="init_sum();start_pay111('.shovar');select();">
       </div>
        <div style="clear: both;"></div>
  		<div class="peulot peulot2" ng-controller="PaymentController  as payment" style="font-size: 120%;bottom:60px;margin-right: 7.5%" >
            <input class="mybtn " ng-show = "prefers_list['pr_viewpayment_mezuman'] == 'on'" type="button" ng-click="start_pay();openwrap2('.type_pay.container_pop','.mezuman.container_pop');payment.init_sum();payment.select()" value="מזומן" />
  			<input class="mybtn " ng-show = "prefers_list['pr_viewpayment_amchaa'] == 'on'" type="button" value="המחאה" ng-click="start_pay();openwrap2('','.amchaa.container_pop');payment.init_sum();payment.select()"/>
			<input class="mybtn " ng-show = "prefers_list['pr_viewpayment_credit'] == 'on'" type="button" value="אשראי" onclick="open_credit();" ng-click="start_pay();openwrap2('','.ashray.container_pop');payment.init_sum2();start_credix();"/>
            <input class="mybtn  prepaid_disabled" ng-show = "prefers_list['pr_viewpayment_shovarzicuy'] == 'on'" type="button" value="שובר זיכוי" ng-click="start_pay();isdebt(2)"/>
			<input class="mybtn  prepaid_disabled" ng-show = "prefers_list['pr_viewpayment_points'] == 'on'" type="button" value="נקודות" ng-click="start_pay();isdebt(3)"/>
			<input class="mybtn " type="button" ng-show = "prefers_list['pr_viewpayment_akafa'] == 'on'" value="הקפה" ng-click="start_pay();isdebt(1)">
			<input class="mybtn" type="button" ng-show = "prefers_list['pr_viewpayment_prepaid'] == 'on'" value="כ. מתנה" ng-click="start_pay();openwrap2('','.prifeyd.container_pop');payment.init_sum();prepaid_start();">
		    <input class="mybtn btngray prepaid_disabled" ng-show = "prefers_list['pr_viewpayment_shovar'] == 'on'" type="button" value="שובר" ng-click="start_pay();openwrap2('','.shovar.container_pop');payment.init_sum()">
			<input class="mybtn " ng-show = "prefers_list['pr_print_temp'] == 'on'" type="button" value="הדפס זמני" ng-click="printTemp();">        

  		</div>

  		<div style="clear: both;"></div>

  		<div class="peulot" style="font-size: 120%;" >
  			<button  value=""  ng-click="isclean()" class="trash"><i class="fa fa-trash-o"></i></button>
  			<input type="button"  value="הנחה" class="anacha" ng-controller="AnachaController as anachaC" ng-click="start_anacha()" />
  			<input type="button" class="pause"  value="השהייה"/>
  			<input type="button" class="hachlafa"  value="פ. החלפה" ng-controller="AchlafaController"  ng-click="start_achlafa()"/>
  			<input type="button" ng-click="zicuy()" class="zicuy"  value="זיכוי" />
  			<input type="button"   value="לתשלום" class="pay" ng-controller="PaymentController  as payment"   ng-click="start_pay()"/>

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
<div style="display: none">
	<?php /*
<div id="receipt2"><div id="receipt" class="current" style="width: 80mm; font-size:20px;" align="center" ng-controller="CashProdController  as cash_prod">
			<table  style="display:table;width:80mm;">
			<tr><th colspan="2">ידע טופ</th></tr>
			<tr><th colspan="2">רבי עקיבא 54</th></tr>
			<tr><th colspan="2">בני ברק</th></tr>
			<tr><th colspan="2"><hr></th></tr>
			<tr><th colspan="2">חשבונית קבלה</th></tr>
			<tr><th colspan="2"><hr></th></tr>
			<tr><th><?=$stockname?></th><th>{{cash_kupanum}}-{{cash_num}}</th></tr>

			<tr><th colspan="2"><hr></th></tr>

	<tr><th width="50%">מחיר</th><th width="50%">תיאור מוצר</th></tr>

			  <tbody class="active tr_{{cash_prd.BarCode}}" ng-repeat="cash_prd in cash_prod.products" style="text-align: right;">
			  	<tr><td colspan="2" style="font-weight: bold">{{cash_prd.BarCode}}-{{cash_prd.Title|cut:true:15}}</td></tr>


				  	<tr><td style="text-align: left;" class="border_table padding_5 sum_p_l">{{(cash_prd.SalePrice-cash_prd.Discount)*cash_prd.Amount|fix2}}</td>	<td class="prod_SalePrice">{{(cash_prd.SalePrice)}} X {{cash_prd.Amount|fix2}}</tr>
				      <tr  ng-if="{{isdiscount2(cash_prd.Discount)}}"><th colspan="2">הנחת שורה: {{cash_prd.Discount}}</th></tr>



				  </tbody>
				  <tr><th colspan="2"><hr></th></tr>
				 <tr><th>סה"כ</th><th>{{amount}}</th></tr>
				   <tr><th colspan="2"><hr></th></tr>

				 	<div ng-controller="PaymentController  as payment">
				 <tbody class="workers_tb" style="text-align: left;float: left;">
					<tr  ng-repeat="pay in payments_type.cash">
						<td>{{pay.amount}}</td>
						<td>{{pay.type}}:</td>
					</tr>
					<tr  ng-repeat="pay in payments_type.cheque" >
						<td>{{pay.amount}}</td>
						<td>{{pay.type}}:</td>
					</tr>
					<tr  ng-repeat="pay in payments_type.credit">
						<td>{{pay.amount}}</td>
						<td>{{pay.type}}:</td>
					</tr>
					<tr  ng-repeat="pay in payments_type.akafa">
						<td>{{pay.amount}}</td>
						<td>{{pay.type}}:</td>
					</tr>
					<tr  ng-repeat="pay in payments_type.shovar">
						<td>{{pay.amount}}</td>
						<td>{{pay.type}}:</td>
					</tr>
					<tr  ng-repeat="pay in payments_type.shovarzicuy">
						<td>{{pay.amount}}</td>
						<td>{{pay.type}}:</td>
					</tr>
	 				<tr  ng-repeat="pay in payments_type.points">
						<td>{{pay.amount}}</td>
						<td>{{pay.type}}:</td>
					</tr>
					<tr  ng-repeat="pay in payments_type.prepaid">
						<td>{{pay.amount}}</td>
						<td>{{pay.type}}:</td>
					</tr>
					</tbody>
				</table>
				</div><img src="inc/barcode.php?barcode={{cash_kupanum|fill_num}}"/>	</div>
		*/	?>
	</div>

<div style="display: none">
	<div id="report_x">
		<table style="display:table;style:80mm" dir="rtl">
	<tr><th colspan="2">ידע טופ</th></tr>
	<tr><th colspan="2">רבי עקיבא 54</th></tr>
	<tr><th colspan="2">בני ברק</th></tr>
	<tr><th colspan="2">דוח X    {{datet | date:'yyyy-MM-dd HH:mm:ss'}}  {{kupa_num}}</th></tr>
	<tr><td colspan="2"><hr></td></tr>
<tr><td style="min-width:180px;">מספר עסקאות:</td><td>{{}}</td></tr>
<tr><td> פריטים שנמכרו:</td><td>{{numprod_hova-numprod_zchut|number:3}}</td></tr>
<tr><td> פריטים שחויבו:</td><td>{{numprod_hova|number:3}}</td></tr>
<tr><td> פריטים שזוכו:</td><td>{{numprod_zchut|number:3}}</td></tr>
<tr><td>דמי מחזור:</td><td>{{start_cash}}</td></tr>
<tr><td>סה"כ הוספת מזומן לקופה:</td><td>{{mezumanin}}</td></tr>
<tr><td>סה"כ הוצאת מזומן מהקופה:</td><td>{{mezumanout}}</td></tr>
	<tr><td colspan="2"><hr></td></tr>
<tr><td>מזומן:</td><td>{{finalltash['cash']}}</td></tr>
<tr><td>חיובים:</td><td>{{finalltash['cash1']['hova']}}</td></tr>
<tr><td>זיכויים:</td><td>{{finalltash['cash1']['zicuy']}}</td></tr>
<tr><td colspan="2"><hr></td></tr>

<tr><td>המחאה:</td><td>{{finalltash['cheque']}}</td></tr>
<tr><td>חיובים:</td><td>{{finalltash['cheque1']['hova']}}</td></tr>
<tr><td>זיכויים:</td><td>{{finalltash['cheque1']['zicuy']}}</td></tr>
<tr><td colspan="2"><hr></td></tr>

<tr><td>אשראי:</td><td>{{finalltash['credit']}}</td></tr>
<tr><td>חיובים:</td><td>{{finalltash['credit1']['hova']}}</td></tr>
<tr><td>זיכויים:</td><td>{{finalltash['credit1']['zicuy']}}</td></tr>
<tr><td colspan="2"><hr></td></tr>

<tr><td>הקפה:</td><td>{{finalltash['akafadebt']['general']}}</td></tr>
<tr><td>מזומן:</td><td>{{finalltash['akafadebt']['cash']}}</td></tr>
<tr><td>אשראי:</td><td>{{finalltash['akafadebt']['credit']}}</td></tr>
<tr><td>המחאה:</td><td>{{finalltash['akafadebt']['cheque']}}</td></tr>
<tr><td>כרטיס מתנה:</td><td>{{finalltash['akafadebt']['prepaid']}}</td></tr>
<tr><td colspan="2"><hr></td></tr>

<tr><td>פריפייד:</td><td>{{finalltash['prepaid']}}</td></tr>
<tr><td>מזומן:</td><td>{{}}</td></tr>
<tr><td>אשראי:</td><td>{{}}</td></tr>
<tr><td>המחאה:</td><td>{{}}</td></tr>
<tr><td>כרטיס מתנה:</td><td>{{}}</td></tr>
<tr><td colspan="2"><hr></td></tr>

<tr><td>סה"כ תקבולים:</td><td>{{}}</td></tr>



</table>
	</div>
	<div id="zicuy1">
		<table width="270px" style="display:table" dir="rtl">
	<tr><th colspan="2">ידע טופ</th></tr>
	<tr><th colspan="2">רבי עקיבא 54</th></tr>
	<tr><th colspan="2">בני ברק</th></tr>
		<tr><td colspan="2"><hr></td></tr>
	<tr><th colspan="2">תעודת זיכוי מקור</th></tr>
		<tr><td colspan="2"><hr></td></tr>
	<tr><th>סה"כ</th><th>{{amount}}</th></tr>
	<tr><th>חתימה</th><th>____________</th></tr>
	<tr><th></th><th></th></tr>
	</table>
	<img src="inc/barcode.php?barcode={{cash_kupanum|fill_num}}"/>
	</div>
	<div id="zicuy2">
		<table width="270px" style="display:table" dir="rtl">
	<tr><th colspan="2">ידע טופ</th></tr>
	<tr><th colspan="2">רבי עקיבא 54</th></tr>
	<tr><th colspan="2">בני ברק</th></tr>
		<tr><td colspan="2"><hr></td></tr>
	<tr><th colspan="2">תעודת זיכוי העתק</th></tr>
		<tr><td colspan="2"><hr></td></tr>
	<tr><th>סה"כ</th><th>{{amount}}</th></tr>
	<tr><th>חתימה</th><th>____________</th></tr>
	<tr><th></th><th></th></tr>
	</table>
	<img src="inc/barcode.php?barcode={{cash_kupanum|fill_num}}"/>
	</div>
	<div id="achlafa" class="container_pop an" ng-controller="AchlafaController as achlafaC">
			<table id="achlafa_pritim" dir="rtl" style="width: 80mm;" ng-show="showprod">
				<tr><th colspan="3">ידע טופ</th></tr>
				<tr><th colspan="3">רבי עקיבא 54</th></tr>
				<tr><th colspan="3">בני ברק</th></tr>
				<tr><th colspan="3"><hr></th></tr>
				<tr><th colspan="3">פתק החלפה</th></tr>
				<tr><th colspan="3"><hr></th></tr>
	  			<tr class="details_title">
	  				<th>שם פריט</th>
	  				<th>ברקוד</th><th style="">כמות</th>

	  				<th class="border_table" style="width: 50px;"></th>
	  			</tr>
	  			<tr ng-repeat="cash_prd in prod_for_achlafa" data-id="{{cash_prd.BarCode}}">
	  				<td>{{cash_prd.Title}}</td>
	  				<td>{{cash_prd.BarCode}}</td>
	  				<td>{{cash_prd.Amount}}</td>
	  			</tr>

  			</table>
  			<img src="inc/barcode.php?barcode={{curr_achlafa}}"/>

  	</div>
  </div>
    </div>
  	<keyboard></keyboard>
  	  		<div class="rightcenter calc_area calc_numbers"  style="display: none;">

  			<div class="rightcenter calc_area" style="">
  				<div class="prod_title calc_title">
					<p id="cat_name" style="margin-right: 15%;">מחשבון</p>
					<span id="num_product" style="float: left;margin-top: 11px;margin-left: 8px;color: white;"></span>
				</div>
  			<form name="Calc">
		<table style="width:100%" border="0" cellpadding="0" cellspacing="0">
		<tbody><tr>
		<td id="result_calc" class="input_result" style="height: 143.8px;">
		<input type="text" class="calc_result" value="" name="Input" style="width:98%;padding-right:2%;color:#42494f;height:92%">
		<br>
		</td>
		</tr>
		<tr>
		<td>
		<table class="inner_calc" style="direction: ltr;" border="0" cellpadding="0" cellspacing="0" ng-controller="CalcController  as calc">
			<tbody><tr>

				<td style="height: 143.8px;"><input type="button" name="one" value="  1  " ng-click="calc_type('1')">  </td>
				<td style="height: 143.8px;"><input type="button" name="two" value="  2  "  ng-click="calc_type('2')">  </td>
				<td style="height: 143.8px;"><input type="button" name="three" value="  3  " ng-click="calc_type('3')">  </td>
				<td style="height: 143.8px;"><input type="button" class="math" name="clear" onclick="$('input[name=Input]').val('')" style="background:url('images/erase.png')no-repeat 51% 50% #e6e9ee!important"></td>
			</tr>
			<tr>

		<td rowspan="1" style="height: 143.8px;"><input type="button" name="four" value="  4  " ng-click="calc_type('4')"></td>
		<td rowspan="1" style="height: 143.8px;"><input type="button" name="five" value="  5  " ng-click="calc_type('5')">  </td>
		<td rowspan="1" style="height: 143.8px;"><input type="button" name="six" value="  6  "ng-click="calc_type('6')">  </td>
		<td rowspan="3" style="position: relative; height: 143.8px;"><div name="DoIt" class="result"  ng-click ="change_count();calc_doit();"><i class="fa fa-check-circle"></i></div><!--here code 3-->
			<div name="DoIt" class="result2 display" onclick="Calc.Input.value = eval(Calc.Input.value);anacha_doit();tip_doit();"><i class="fa fa-check-circle"></i></div>
		</td>
			</tr>
			<tr>
		<td style="height: 143.8px;"><input type="button" name="seven" value="  7  " ng-click="calc_type('7')"></td>
		<td style="height: 143.8px;"><input type="button" name="eight" value="  8  " ng-click="calc_type('8')">  </td>
		<td style="height: 143.8px;"><input type="button" name="nine" value="  9  " ng-click="calc_type('9')">  </td>

			</tr>
			<tr>
		<td style="height: 143.8px;"><input type="button" name="dot" value="  .  " ng-click="calc_type('.')"></td>
		<td style="height: 143.8px;"><input type="button" name="zero" value="  0  " ng-click="calc_type('0')">  </td>
		<td style="height: 143.8px;"><input type="button" name="zerozero" value="  00  " ng-click="calc_type('00')"></td>
		<!-- <td><INPUT TYPE="button" NAME="DoIt"  VALUE="  =  " OnClick="Calc.Input.value = eval(Calc.Input.value)"></td> -->


			<input type="hidden" name="flag_focused"/>
		</td>
			</tr>
		</tbody></table>
		</td>
		</tr>
		</tbody></table>
		</form>
  </div>
  		</div>
  	<script>
  		var curr_time = new Date($.now());

  	</script>
  	<div id="feigy"></div>
  </body>
  <div class="loading" style="position: absolute;z-index: 99999;top:50%;display: none; left: 45%;">

  	 <i class="fa fa-spinner fa-spin " style="font-size: 150px;color:#aab2bd"></i>
  </div>


 <?
  if($stock==608000){
?>
	<script>
		for (var i=2; i < 6; i++) {
			  $('body').removeClass('theme'+i);
		};
		$('body').addClass('theme4');
	</script>

<?
}
else if($stock==607000){
?>
	<script>
		for (var i=2; i < 6; i++) {
		  $('body').removeClass('theme'+i);
		};
		$('body').addClass('theme5');
	</script>
<?
}
//
?>
</html>