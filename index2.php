<?
$cashbox=true;
//print_r($_COOKIE);
//require("../include/common.php");
$simple=1;
require("../include/common.php");
$rootdir 	=$GOCONFIG->file_storage_path;
$stock=$_REQUEST[stock];
$rootdir.="$username/POS/$stock";
$target_image_dir="../../../officefiles/".$username."/_MlaitekPro";
//mysql_selectdb('vcx_weberp');

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

if(isset($_REQUEST[stock])){
$sql="select StockName,ID from vcx_weberp.listingsStocks where TerminalID=$stock and user_ID=$userID";
$dbname 	= $GOCONFIG->stock_db_name;

			$rs = $conn->Execute($sql);
			echo mysql_error();
			while (!$rs->EOF) {
				$stockname=$rs->fields[StockName];
				$stockid=$rs->fields[ID];			
				$rs->MoveNext(); 
			}
			$dbname="vcx_$username";
			
			$sql="select action,MAX(action_date) from vcx_$username.cashbox_actions where terminal_id=$stock";
			//echo $sql;
			$rs = $conn->Execute($sql);
			echo mysql_error();		
			if($rs->EOF){
				$stat="close";
			}	
			else{
				$stat=$rs->fields[action];				
			}
			$sql = "
			select *,CASE
           WHEN lse.SalePrice is NULL THEN ld.SalePrice          
           ELSE lse.SalePrice
        END as SalePrice,ld.ID as ID from  vcx_$username.listingsDB as ld LEFT OUTER JOIN vcx_$username.listingsStocksElements as lse on lse.ListingID=ld.ID and lse.StockID=$stockid";
	$product=sql2json($sql);
	$array=json_decode($product, true);
?>

	<script>
		var prodjson="<? echo $array?>";
	</script>
<?	
	//echo (count($array));
	$sql = "SELECT * FROM vcx_$username.listingsCategories where ID>0";
	$category=sql2json($sql);
	
	////echo count($array);
	$category_array=json_decode($category,true);
	 //echo "<!--ffff:$rootdir/club ".$_SERVER['DOCUMENT_ROOT'].'/modules/stock/cashbox/bill/json'."-->";
// if (file_exists('$rootdir/club'))
//{
	/*$sql = "SELECT listingsSuppliers.*,listingsSuppliers.SupplierName as value, clientgroups.IndexNum as `GroupIndexNum`, clientgroups.Percent as `GroupDiscPercent` 
    		FROM vcx_$username.listingsSuppliers LEFT JOIN vcx_$username.`clientgroups` ON (listingsSuppliers.GroupID = clientgroups.ID) 
    		WHERE listingsSuppliers.status = 1 and listingsSuppliers.isClient = 1 and listingsSuppliers.SupplierName <> '' and listingsSuppliers.user_ID = ".$userID." 
    			
    		ORDER BY `SupplierName`";*/
    		$sql=" 	select 1 as client, 3 as sortorder, c.id,c.id as ID,ClientNum, SupplierName,SupplierName as value, Phone as HomePhone, CellPhone,Address,
			round(sum((case when paymid=7 then hakafasum 
			when paymid = 1 then CashSum
			when paymid = 2 then ChequeSum
			when paymid = 5 or paymid = 8 then creditcardsum 
			else CouponSum end)*(case when isrefund=0 and IsDebtPayment=0 then 1 else 0 end)),2) as Hov,
    			round(sum((case when paymid=7 then hakafasum else 0 end)* (case when isrefund=1 or IsDebtPayment=1 then 1 else 0 end)),2) as Hakafa,
    			round(sum((case when paymid=7 then 0
			when paymid = 1 then CashSum
			when paymid = 2 then ChequeSum
			when paymid = 5 or paymid = 8 then creditcardsum			
			else CouponSum end)*(case when isrefund=1 or IsDebtPayment=1 then 1 else 0 end)),2) as Zikui
			from listingsSuppliers c,transactionpayments p,transactions t where
                        ifnull(c.ClientNum,'')<>'' and
			((c.ClientNum = p.CouponNumber and paymid=3)  or (p.paymid=7 and p.custid = c.ClientNum) or (t.custid = c.ClientNum and t.IsDebtPayment=1) ) and
			p.trans_id = t.id and t.user_id = $userID  and ifnull(tranErechDate,trandate) between '2003-05-15' and '".date("Y-m-d")."' 
			and c.user_id = $userID 
			and c.status=1
group by id
			union select 1 as client, 4 as sortorder, s.id,s.id as ID,s.ClientNum, s.SupplierName,s.SupplierName as value, s.Phone as HomePhone,s. CellPhone,s.Address,0 as Hov,0 as Hakafa,0 as Zikui from listingsSuppliers s where isClient=1
			group by id order by sortorder,ClientNum+0
                        ";
			//echo $sql;
    		$client=sql2json($sql);
	
    //$client=json_decode($put,true);
//}
if($client==FALSE)
{
    $client=array();
}		
//if (file_exists('$rootdir/worker'))
//{
	$sql = "SELECT  `ID` ,  `SupplierName` ,  `Phone` ,  `Phone2` ,  `CellPhone` ,  `WorkerNum` ,  `Email`  from vcx_$username.listingsSuppliers where `status` = 1 and `isWorker` = 1 and `SupplierName` <> '' and `user_ID` = ".$userID." order by `SupplierName`";
    $worker=sql2json($sql);
	
    $worker2=json_decode($worker,true);
//}
if($worker==FALSE)
{
    $worker=array();
}
}

if(isset($_REQUEST[yitrat_kupa])){
	$sql="select max(JournalNum) as JournalNum from vcx_$username.transactionpackages where TerminalID=$stock";
	$dbname 	= $GOCONFIG->stock_db_name;

			$rs = $conn->Execute($sql);
			echo mysql_error();
			if($rs->EOF){
				$journal=0;
			}
			else{
				$journal=$rs->fields[JournalNum];	
			}
			$journal=$journal+1;
			$date1=date("Y-m-d h:i:s");
			$date2=time();
			$sql="INSERT INTO vcx_$username.transactionpackages( `stock_id`, `TerminalID`, `JournalNum`, `TransCount`, `JournalDate`, `DateTimeStamp`)
			VALUES ('$stockid','$stock','$journal','0','$date1','$date2')";
			$rs = $conn->Execute($sql);	
			$sql="";		
			$trannum=1;			
			$sql="insert into vcx_$username.cashbox_actions (action,terminal_id) values ('open_cashpox',$stock)";
			mysql_query($sql);
			echo mysql_error();
			$stat="open_cashbox";
			
			
				
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
	   file_put_contents($_SERVER['DOCUMENT_ROOT'].'/modules/stock/cashbox2/bill/json', "[]");
	   }
		else{
			echo "errorrrrrrrrrrrrrrr $answer";
		}
      
	    //$put=json_decode($put,true);
	}
}
else{
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
}

setcookie("trannum",$trannum);
/*
    (number) person_type;
    (string(100)) CardId;    
    (string(100)) Name;
    (number) IsEmployee;
    (number) IsActive;
    (number) Role;     
    (string(20)) Department;
    (string(11)) StartDate;
    (string(100)) Address;        
    (string(devil)) PostalCode;
    (string(50)) City;
    (string(20)) StreetNumber;
    (string(20)) PhoneHome;
    (string(20)) PhoneWork;
    (string(20)) PhoneExtra;
    (string(20)) CellPhone;
    (string(100)) Email;
    (string(20)) NationalId;
    (number)     Sex;
    (number)  PersonalState;
    (number)  Children;
    (number)  GroupId;
    (string(11)) Birthday;
    (string(7)) RegisterTerminal;
    (number(0,1,2,3,4) ClubMemberType;
    (string(10)) ClubExpiration;
    (number with floating point) MaxDebt;
    (string(100)) Picture;
 * 
 * */


if (file_exists($_SERVER['DOCUMENT_ROOT'].'/modules/stock/cashbox2/bill/json'))
{
    $put=file_get_contents($_SERVER['DOCUMENT_ROOT'].'/modules/stock/cashbox2/bill/json');
	$tran=$put;
    $put=json_decode($put,true);
}
else
{
    $put=array();
}

if (!empty($_COOKIE['bill']))
{
    $bill=json_decode($_COOKIE['bill'],true);
    foreach ($bill as $value)
    {
        $put[]=$value;
    }
    if (!file_exists($_SERVER['DOCUMENT_ROOT'].'/modules/stock/cashbox2/bill'))
    {
        mkdir($_SERVER['DOCUMENT_ROOT'].'/modules/stock/cashbox2/bill');        
    }
//echo "<hr>";
//print_r($put);

    file_put_contents($_SERVER['DOCUMENT_ROOT'].'/modules/stock/cashbox2/bill/json',json_encode($put));

    
}

if (is_array($array)):
$a=0;
foreach ($array as $key=>$value)
{
    $a++;  
    if ($a<100)
    {
        $value['CategoryCode']=4;
    }  
    if ($a<350 and $a>100)
    {
        $value['CategoryCode']=5;
    }
    if ($a<700 and $a>350)
    {
        $value['CategoryCode']=6;
    }
    if ($a<1000 and $a>700)
    {
        $value['CategoryCode']=8;
    }
    if ($a<1050 and $a>1000)
    {
        $value['CategoryCode']=9;
    }
    if ($a<1150 and $a>1050)
    {
        $value['CategoryCode']=10;
    }
    if ($a<1300 and $a>1150)
    {
        $value['CategoryCode']=11;
    }
    if ($a<1900 and $a>1300)
    {
        $value['CategoryCode']=12;
    }

    $array5[]=array('StockID'=>$value['StockID'],'Name'=>$value['Name'],'SalePrice'=>$value['SalePrice'],'BarCode'=>$value['BarCode'],'CategoryCode'=>$value['CategoryCode'],'Unit'=>$value['Unit'],'Cost'=>$value['Cost']);
    $array2[$value['BarCode']]=$key;
    $array3[mb_strtolower($value['Name'])]=$key;
}
else:
foreach ($array as $key=>$value)
{
    $array2[$value->BarCode]=$key;
    $array3[mb_strtolower($value->Name)]=$key;
} 
endif;  
 file_put_contents($_SERVER['DOCUMENT_ROOT'].'/modules/stock/cashbox/product/json_test',json_encode($array5));
setcookie ("bill", json_encode(array()),time()+66545665);

?>
<!DOCTYPE html>
<html lang="he" ng-app="cashbox">
  <head>
    <title></title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <meta charset="UTF-8">
    <link href="js/bootstrap/bootstrap.min.css" rel="stylesheet" media="screen"> 
  <script src="angucomplete-alt-master/angucomplete-alt.css"  rel="stylesheet" ></script>
    <script src="js/angular.min.js" type="text/javascript"></script>
    <script src="angucomplete-alt-master/angucomplete-alt.js" type="text/javascript"></script>

      <script src="js/cashbox.js" type="text/javascript"></script>
       <script src="js/product.js" type="text/javascript"></script>
       <script src="js/client.js" type="text/javascript"></script>
       <script src="js/worker.js" type="text/javascript"></script>
       <script src="js/payment.js" type="text/javascript"></script>
      <script src="js/cash_prod.js" type="text/javascript"></script>
    <link href="http://netdna.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css" rel="stylesheet"> 
    <link href="css/style.css" rel="stylesheet" media="screen">   
    <script src="http://code.jquery.com/jquery-latest.min.js" type="text/javascript"></script>
   <!-- <object style="display:none" id="SOME_ID" classid="clsid:SOME_CLASS_ID" codebase="./somePath.dll"></object>-->
    <script src="js/script.js" type="text/javascript"></script>
    <script src="js/jquery.cookie.js" type="text/javascript"></script>
    <link rel="stylesheet" href="//code.jquery.com/ui/1.11.2/themes/smoothness/jquery-ui.css">
    
    
  </head>
  <body class="" ng-controller="CashboxController as cashc">

  	<script>  
  	$(document).ready(function(){
		localStorage.clear();

  	});
  	</script>  
  	<?
  	if(!isset($_REQUEST[stock])){
	?>
	<script>
		$(document).ready(function(){
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
			where user_id = $userID";
			/*$sql="SELECT TerminalID, StockName  FROM listingsStocks where StockName != ''  and (user_id = (select stock_user from vcx00.users where id = '$user_id') or user_id = '$user_id') ORDER BY StockName";*/
			//echo $sql;
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
  	?>
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
  	function alertfeigy(){
  		alert('feigy');
  		return true;
  	}
  	$(document).ready(function(){
  		
  		//my_cookie_hold="{}";
  		category2=<?php echo $category;?>;
  		category_id=0;
  		cart={};
  		journal=<?=$journal?>;
  		//trannum=<?=$trannum?>;
		order={};
		my_cookie={};
		if($.cookie('on_hold')==undefined){
			$.cookie('on_hold','[]');
		}
		current_finnal_amount=0;
		payments={};
		payments['cheque']=[];
		new_id=0;
		trans=<?if($tran==""){echo "[]";}else{echo $tran;}?>;
		refund=0;
		worker=<?php echo $worker;?>;
		var _cookie = getCookies();
		var cashier=0;
		if (!_cookie['cart'])
		{
		    _cookie['cart']=JSON.stringify({});
		}
		my_cookie=JSON.parse(_cookie['cart']);
		
		if (!my_cookie['general'])
		{
		    my_cookie['general']={};
		}
		if (!my_cookie['general']['tax'])
		{
		    my_cookie['general']['tax']=18;
		    setCookie();
		}
		if (!my_cookie['general']['view_cat'])
		{
		    my_cookie['general']['view_cat']='table';
		    setCookie();
		}
  	});
product=<?php echo json_encode($array);?>;
product_bard=<?php echo json_encode($array2);?>;
client2='<?php echo $client?>';
client=JSON.parse(client2);

//worker=JSON.parse(worker2);
product_name=<?php echo json_encode($array3)?>;
product_bard=JSON.parse(product_bard);
order_json=JSON.parse('<?php echo json_encode($put); ?>');

order_type='';
category2=<?php echo $category;?>;

function pause_deal(){
	my_cookie2=$.cookie('on_hold');
    if (!my_cookie2)
    {
        my_cookie2=[];
        a=0;
    }
    else
    {
        my_cookie2=JSON.parse(my_cookie2);
        a=0;
        for (var key in my_cookie2) {
            a++;
        }
    }
    my_cookie_hold=true;
    my_cookie2[a]=get_order_details();
    $.cookie('on_hold',JSON.stringify(my_cookie2)); 
    $('pop_pause').fadeOut();
   // alert($.cookie('on_hold'));
    clean_all();   
}
function clean_all(){
		
		$(".zerofloat").text('0.00');
		$(".zerofloat").val('0.00');
		
		$(".type_pay .fa-times-circle").parent().parent().remove();
		$(".details_area .active").remove();
		my_clear();
}
function getMainCategories(e){
	$('#num_product').empty();
	 html="";
	 $('#cat_name').text('מחלקות');
	 $(".prod_btntop").css('visibility','hidden');
	for (i = 0; i < category2.length; i++) {   
		
	  	html+="<div class='prod first main_cat' id='button_cats_"+category2[i]['ID']+"' onclick=getCategory2('"+category2[i]['ID']+"',this.children[1].innerText)>";
	  	if(category2[i]['picture']!=""){
	  	html+='					<img src="<?=$target_image_dir?>/'+category2[i]['picture']+'"></img>';
	  	}
	  	else{
	  		html+='					<img src="images/main.jpg"></img>';
	  	}
		html+='					<p>'+category2[i]['CategoryName']+'</p>';
	  	html+='				</div>';
  				
	}
	
  					  $('#resizable').empty();
  					  $('#resizable').append(html);
}
function my_search(metod)
{

    key=$('#search').val().split('[');
    if (key[1])
    {
            key=key[1].split(']');
            key=key[0];
    }
    else
    {
        key=$('#search').val();
    }
    
    if (product_bard[key]!=undefined)
    { 
        
        key=product_bard[key];
        if (cart[product[key]['BarCode']])
        {
            my_cookie[product[key]['BarCode']]['amount']=Number(my_cookie[product[key]['BarCode']]['amount'])+1;
            my_reset();                        
            return false;
        }
        my_cookie[product[key]['BarCode']]=product[key];
        my_cookie[product[key]['BarCode']]['amount']=0;
        my_cookie[product[key]['BarCode']]['discount']=0;
        setCookie();
        cart[product[key]['BarCode']]=true;
        my_reset();
    }
    if (product_name[$('#search').val().toLowerCase()]!=undefined)
    { 
        key=product_name[$('#search').val().toLowerCase()];
        if (cart[product[key]['BarCode']])
        {
            my_cookie[product[key]['BarCode']]['amount']=Number(my_cookie[product[key]['BarCode']]['amount'])+1;
            my_reset();                        
            return false;
        }
        my_cookie[product[key]['BarCode']]=product[key];
        my_cookie[product[key]['BarCode']]['amount']=0;
        my_cookie[product[key]['BarCode']]['discount']=0;
        setCookie();
        cart[product[key]['BarCode']]=true;
        my_reset();
    }
        return false;
}
function setCookie(name, value, options) {
	
    if (!name)
        name='cart';
    if (!value)
        value=JSON.stringify(my_cookie);
  options = options || {};
  var expires = options.expires;
  if (typeof expires == "number" && expires) {
    var d = new Date();
    d.setTime(d.getTime() + expires*1000);
    expires = options.expires = d;
  }
  if (expires && expires.toUTCString) {
    options.expires = expires.toUTCString();
  }
  value = encodeURIComponent(value);
  var updatedCookie = name + "=" + value;
  for(var propName in options) {
    updatedCookie += "; " + propName;
    var propValue = options[propName];   
    if (propValue !== true) {
      updatedCookie += "=" + propValue;
     }
  }
  document.cookie = updatedCookie;
}
function getCookies(){
	if(!document.cookie || document.cookie.length<2) return {};

	var res = {}, coo,
		cArr = document.cookie.split(/;\s?/);
	for (var i = 0; i < cArr.length; i++) {
		coo = cArr [i].split('=');
		res[coo[0]] = decodeURIComponent(coo[1]);
	}
	return res;
}

function plus(BarCode,amount)
{	
	//alert(amount);
    my_cookie[BarCode]['amount']=amount;
    //$('#total_'+BarCode+'').val(my_cookie[BarCode]['amount']);
    //alert(my_cookie[BarCode]['amount']);
    setCookie();
    my_reset();
        
}
function minus(bardcode,amount)
{
	//alert(amount);
    if (amount==0)
    {
        delete(my_cookie[bardcode]);
        delete(cart[bardcode]);
    }
    else
    {
         my_cookie[bardcode]['amount']=amount;
    }
    alert(my_cookie[bardcode]['amount']);
    setCookie();
    my_reset();
}
function my_delete(bardcode)
{
    delete my_cookie[bardcode];
    delete cart[bardcode];
    setCookie();
    my_reset();
}
function my_reset()
{
    total_summ=0;
    if (category_id==0)
    {
        $('#category_button').attr('class','');
    }
    else
    {
        $('#category_button').attr('class','blue big');
    }
    if (my_cookie['cart'])
    {
        my_cookie=JSON.parse(my_cookie['cart']);
    }
    $('#products').empty();
        $.each(my_cookie, function (key,value){
        if (key!='general' && key!='tax')
        {
        summ=value['SalePrice']*value['amount'];
        summ_sale=summ;
        discount_p=0;
        discount_d=0;                        
        if (value['discount_d'])
        {
            discount_d=value['discount_d'];
            summ_sale=summ-discount_d;
            summ_sale=summ_sale.toFixed(2);
            discount_p=discount_d/(summ/100);
            discount_p=discount_p.toFixed(2);
        }
        if (value['discount_p'])
        {
          
            sale=value['discount_p'];
            sale=sale/100;
            summ_sale=summ-(summ*sale);
            summ_sale=summ_sale.toFixed(2);
            
          
            discount_d=parseFloat(value['discount_p'])*(parseFloat(summ)/100);
            discount_d=discount_d.toFixed(2);
            discount_p=value['discount_p'];
        }  
        summ=summ.toFixed(2);
          total_summ=total_summ+parseFloat(summ_sale);
          summ_sale=        parseFloat(summ_sale).toFixed(2); 
                    
        /*html='<tr>';
        html=html+'<td><span><input type="text" name="" value="'+key+'"/></span></td>';
		html=html+'<td><input type="text" name="" value="'+value['Name']+'"/></td>';
		html=html+'<td>';
		html=html+'<span class="minus" onclick="minus(\''+key+'\')">-</span>';
		html=html+'<span class="num">';
		html=html+'<input type="text"  name="total_'+key+'" value="'+value['amount']+'"/>';
		html=html+'</span>';
		html=html+'<span class="plus" onclick="plus(\''+key+'\')">+</span>';
		html=html+'</td>';
		html=html+'<td><span class="num wide"><input type="text" id="discount_'+key+'" name="" value="'+discount_p+'" onkeyup="my_discouont(\''+key+'\',false)"/></span>%';
        html=html+'<span class="num wide"><input type="text" id="discount2_'+key+'" name="" value="'+discount_d+'" onkeyup="my_discouont(\''+key+'\',true)"/></span>$';
		html=html+'</td>';
        html=html+'<td>';
		html=html+'<span class="num wide"><input type="text" name="" value="'+parseFloat(value['SalePrice']).toFixed(2)+'"/></span>';
        html=html+'</td>';
		html=html+'<td><span class="num wide"><input type="text" name="" value="'+summ+'"/></span>';
		html=html+'</td>';
        html=html+'<td><span class="num wide"><input type="text" name="" value="'+summ_sale+'"/></span>';
		html=html+'</td>';
		html=html+'<td><span class="delete" onclick="my_delete(\''+key+'\')"></span></td>';
		html=html+'</tr>';
         $('#resizable').append(html);*/
        cart[key]=true;
        }
        
        });
       // my_total_summ(total_summ);
}
function my_total_summ(total_summ)
{      
    $('#summ_total').text(total_summ.toFixed(2)+'');
    total_sale=0;
    discount_p=0;
    discount_d=0;
    if (my_cookie['general']['discount_p'])
    {
        discount_p=my_cookie['general']['discount_p'];     
        discount_d=(total_summ/100)*parseFloat(discount_p);
        discount_d=discount_d.toFixed(2);
    }
    if (my_cookie['general']['discount_d'])
    {
        discount_d=my_cookie['general']['discount_d'];    
        discount_p= discount_d/(parseFloat(total_summ)/100);
        discount_p=discount_p.toFixed(2);
        
    }
    $('#discount').val(discount_p); 
    $('#discount2').val(discount_d);
    total_sale=discount_d;

    total_summ=total_summ-total_sale;
    total_summ=total_summ.toFixed(2);
    tax_d=total_summ/100*my_cookie['general']['tax'];
    total_before_tax=parseFloat(total_summ)-parseFloat(tax_d);
    total=parseFloat(total_summ).toFixed(2);
    total=parseFloat(total).toFixed(2);
    $('#tax').text(tax_d.toFixed(2));
    $('#before_tax').text(total_before_tax.toFixed(2));
    $('#total_summ').text(total);    
    
}
function get_total()
{
        retur={};
        total_sale=discount_d.toFixed(2);
        total_summ2=total_summ;
        total_summ=$('.finall_price ').text();
        //total_summ=total_summ.toFixed(2);
        tax_d=total_summ/100*my_cookie['general']['tax'];
        retur['total_summ']=total_summ;
        retur['discount_p']='0';
        retur['discount_d']='0';
        retur['tax_d']=tax_d;
        retur['total']= total_summ; 
        return retur; 
}
function my_discouont(bardcode,status)
{
    var value_d='';
    if (status==true)
    {
         value_d=$('#discount2_'+bardcode+'').val().replace(/[^\d]/g,'');
         summ=my_cookie[bardcode]['SalePrice'];
         proc=parseFloat(my_cookie[bardcode]['SalePrice'])*parseFloat(my_cookie[bardcode]['amount'])/100;
         value_proc=parseFloat(value_d)/proc;
         value_proc=value_proc.toFixed(0);
    }
    else
    {
         value_proc=$('#discount_'+bardcode+'').val().replace(/[^\d]/g,'');
    }
    if (value_proc=='NaN')
    {
        return;
    }
    if (value_proc>100)
    {
         my_reset();
         return;
    }
    if (value_d)
    {
         my_cookie[bardcode]['discount_d']=value_d; 
         my_cookie[bardcode]['discount_p']=0; 
         setCookie();
         input=document.getElementById('discount2_'+bardcode+'');
         pos=getCaretPos(input);    
         my_reset();
         input=document.getElementById('discount2_'+bardcode+'');
         setCaretPosition(input,pos);
    }
    else
    {
         my_cookie[bardcode]['discount_p']=value_proc; 
         my_cookie[bardcode]['discount_d']=0;
         setCookie();
         input=document.getElementById('discount_'+bardcode+'');
         pos=getCaretPos(input);    
         my_reset();
         input=document.getElementById('discount_'+bardcode+'');
         setCaretPosition(input,pos);
    }
    return;
   
    
}
function my_general_discouont(znak,status)
{
    type='discount_p';
    if (znak)
    {
        value=$('#discount').val();
        value=value.split('.');
        value=parseInt(value[0]);
        if (znak=='+')
            value=value+1;
        else
            value=value-1;
        value_p=value;
    }
    
    else
    {
        if (status)
        {
            value=$('#discount2').val().replace(/[^\d]/g,'');
            type='discount_d';
            var summ=get_total();
            value_p=value/(parseFloat(summ['total_summ'])/100);
        }
        else
        {
            value=$('#discount').val().replace(/[^\d]/g,'');
            value_p=value;
            
        }
    }
    value=Number(value);
    if (value=='NaN')
    {
        return;
    }
    if (value<0)
    {
        my_reset();
        return;
    }
    
    if (value_p>100)
    {
         my_reset();
         return;
    } 
    if (type=='discount_p')
    {
        my_cookie['general']['discount_p']=value;
        my_cookie['general']['discount_d']=false;
        setCookie();
        input=document.getElementById('discount');
        pos=getCaretPos(input);    
        my_reset();
        input=document.getElementById('discount');
        setCaretPosition(input,pos);
        return;
    }
    else
    {
        my_cookie['general']['discount_d']=value;
        my_cookie['general']['discount_p']=false;
        setCookie();
        input=document.getElementById('discount2');
        pos=getCaretPos(input);    
        my_reset();
        input=document.getElementById('discount2');
        setCaretPosition(input,pos);
        return;
    }   
}
function getCaretPos(obj)
{
 obj.focus();

 if(obj.selectionStart) return obj.selectionStart;
 else if (document.selection)
 {
  var sel = document.selection.createRange();
  var clone = sel.duplicate();
  sel.collapse(true);
  clone.moveToElementText(obj);
  clone.setEndPoint('EndToEnd', sel);
  return clone.text.length;
 }

 return 0;
}
function setCaretPosition(ctrl, pos) {

    if(ctrl.setSelectionRange) {

        ctrl.focus();

        ctrl.setSelectionRange(pos,pos);

        //alert(ctrl.setSelectionRange(pos,pos));

    }

    else if (ctrl.createTextRange) {

        var range = ctrl.createTextRange();

        range.collapse(true);

        range.moveEnd('character', pos);

        range.moveStart('character', pos);

        //alert(range.moveStart('character', pos));

        range.select();

    }

}
function my_clear()
{ 
    tax=my_cookie['general']['tax'];
    delete my_cookie;
    my_cookie={};
    my_cookie['general']={};
    my_cookie['general']['tax']=tax;
    setCookie();
    cart={}; 
    $('#search').val('');
    clear_search();
    close_order();
    my_reset();
    
    return;    
    
}
document.onkeyup = function (e) {



    e = e || window.event;


    if (e.keyCode === 113) {
      order_start();
    }
    if (e.keyCode === 115) {
      json_info();
    } 
    if (e.keyCode === 13) {
       my_search();
    }
    if (e.keyCode === 118) {
       get_order();
    }
}
function setting_ok()
{
    my_cookie['general']['tax']=$('#tax_p').val();
    setCookie();
    my_reset();
    $('.shadow').hide();
}
function text_num(input)
{
    input.value=input.value.replace(/[^\d]/g,'');
}
function open_setting()
{
    $('#tax_p').val(my_cookie['general']['tax']);
    $('#shadow_set').show();
    if (my_cookie['general']['view_cat']=='table')
    {
        $("#cat_but").attr('checked','checked');
    }
    else
    {
        $("#cat_tab").attr('checked','checked');
    }
}
function arrayKeys(input,output,p) {
    if (!output)
    {   var output = new Array();
        var counter = 0;
    }
    else
    {
        var counter = output.length;
    }
    
    for (i in input) {
        if (p==true)
            output[counter++] =product[input[i]]['Name']+' ['+i+']';
        else
            output[counter++] = i;
    } 
    return output; 
}

$(document).ready(function(){
    keys=arrayKeys(product_bard,'',true);
    $( "#search" ).autocomplete({ appendTo: "#search_result" });
    $( "#search" ).autocomplete( "option", "source", keys);
    $('.ui-corner-all').click(function(){
        my_search(true);
        })
    
});

my_reset();

function order_start()
{
    tot=get_total();
    if (tot['total']==0)
    {
        return;
    }
    $('#order').show();
    $('.b_order').show();
}
function my_order(type)
{
    total=get_total();
    order_type=type;
    $('#form_order').empty();
    if (type=='cash')
    {
        html='<p><label for="bill">Total:'+total['total']+'</label>';
        html=html+'</p>';
        $('#form_order').append(html);
        $('.shadow_order').show();
    }
}
function get_order_details(){
	if( typeof my_cookie_hold != "undefined" && my_cookie_hold == true){
		my_cookie_hold=false;
		//alert('ddddddd');
		order=my_cookie_hold;
		order['components']={"component":get_order_product()}; 
		order['finalamount']=$(".finall_price").text();
	    order['firstamount']=$(".finall_price").text();
	    order['amountbeforevat']=$(".pop_anacha .s_between").text();
	    order['round']= (Math.round( parseFloat($(".finall_price").text()) * 10 ) / 10).toString();
	    order['discounttype']="0";
	    if($(".pop_anacha input[name=achuz]").hasClass('btnorange')){
	    	order["discountperc"]=$(".pop_anacha .anacha_txt").val();
	    	order["discountamount"]="0.00";
	    }
	    else{
	    	order["discountamount"]=$(".pop_anacha .anacha_txt").val();
	    	order["discountperc"]="0.00";    	
	    }
	    order["customerid"]=$("#client_search_id").val();
	    order["change"]="0.00"; 
	    if(typeof variable_here === 'undefined'){
	    	cashier=0;
	    }     
	     order['cashierid']=cashier; 
	      if(parseInt($(".finall_price").text())<0){
		  	payments['refundvoucher']={};
		  	payments['refundvoucher']['refundvoucheramount']=$(".finall_price").text();
		  	payments['refundvoucher']['proucedtransid']="";
		  	payments['refundvoucher']['refundvoucherid']="";
		  }
		  
		    order['payments']=payments;  

	}
	else{
	order={};
    x=$.cookie("trannum");
    order['trannum']=journal*100000+x;
     //alert(x);
    x=parseInt(x)+1;
    //alert(x);
    $.cookie("trannum",x);
    order['journalnum']=journal;
    //order['date']
    date=new Date();
    y=date.getFullYear()
    m=date.getMonth()+1;
    d=date.getDate();
    if(m<10){
    	m='0'+m;
    }
    if(d<10){
    	d='0'+d;
    }
    order['trandate']=y+'-'+m+'-'+d;
    
    h=date.getHours();
    i=date.getMinutes();
    if(h<10){
    	h='0'+h;
    }
    if(i<10){
    	i='0'+i;
    }   
    order['trantime']=h+":"+i;
    order['finalamount']=$(".finall_price").text();
    order['firstamount']=$(".finall_price").text();
    order['amountbeforevat']=$(".s_between").text();
    order['round']= (Math.round( parseFloat($(".finall_price").text()) * 10 ) / 10).toString();
    order['discounttype']="0";
    if($("input[name=achuz]").hasClass('btnorange')){
    	order["discountperc"]=$(".anacha_txt").val();
    	order["discountamount"]="0.00";
    }
    else{
    	order["discountamount"]=$(".anacha_txt").val();
    	order["discountperc"]="0.00";    	
    }
    order["customerid"]=$("#client_search_id").val();
    order["change"]="0.00"; 
    if(typeof variable_here === 'undefined'){
    	cashier=0;
    }     
     order['cashierid']=cashier; 
    order['components']={"component":get_order_product()};
  //  order['order']=get_total();
  if(parseInt($(".finall_price").text())<0){
  	payments['refundvoucher']={};
  	payments['refundvoucher']['refundvoucheramount']=$(".finall_price").text();
  	payments['refundvoucher']['proucedtransid']="";
  	payments['refundvoucher']['refundvoucherid']="";
  }
  
    order['payments']=payments;  
    } 
    return order;
}
function order_ok()
{
    order=get_order_details();
    save_order(order);
    
}
function close_order()
{
    order_type='';
   // $('#form_order').empty();
   // $('.shadow_order').hide();
   // $('#order').hide();
    //$('.b_order').hide();
    return;
}
function save_order(order)
{
    my_cookie1=getCookies();
    if (!my_cookie1['bill'])
    {
        my_cookie1={};
        a=0;
    }
    else
    {
        my_cookie1=my_cookie1['bill'];
        my_cookie1=JSON.parse(my_cookie1);
        a=0;
        for (var key in my_cookie1) {
            a++;
        }
    }
    my_cookie1[a]=order;
    
    my_clear();
    setCookie('bill',JSON.stringify(my_cookie1));
   
    close_order();
    return;
}
function get_order_product()
{
    total_summ=0;
    product_temp={};
            a=0;
        $.each(my_cookie, function (key,value){
        pr_temp={};

        if (key!='general' && key!='tax')
        {
            summ=value['SalePrice']*(value['amount']);
           
            summ_sale=summ;
            discount_p=0;
            discount_d=0;                        
            if (value['discount_d'])
            {
                discount_d=value['discount_d'];
                summ_sale=summ-discount_d;
                summ_sale=summ_sale.toFixed(2);
                summ=summ.toFixed(2);
                discount_p=discount_d/(summ/100);
                discount_p=discount_p.toFixed(2);
            }
            if (value['discount_p'])
            {
          
                sale=value['discount_p'];
                sale=sale/100;
                summ_sale=summ-(summ*sale);
                summ_sale=summ_sale.toFixed(2);
                summ=summ.toFixed(2);
          
                discount_d=parseFloat(value['discount_p'])*(parseFloat(summ)/100);
                discount_d=discount_d.toFixed(2);
                discount_p=value['discount_p'];
            }  
            total_summ=total_summ+parseFloat(summ_sale);                   
            pr_temp['code']=key;
            pr_temp['description']=value['Title'];
            pr_temp['cpercdiscount']=discount_p;
            pr_temp['camountdiscount']=discount_d;
            pr_temp['cfirstamount']=value['SalePrice'];
            pr_temp['SaledPrice']=value['SalePrice']*value['amount'];
            pr_temp['cfinalamount']=value['SalePrice']*value['amount'];
             pr_temp['cmiddleamount']=value['SalePrice']*value['amount'];
            
            pr_temp['cquantity']=value['amount'];
            product_temp[a]=pr_temp;
            delete pr_temp;
            pr_temp={};
            a=a+1;
        }
        
        });
       return product_temp;
}
function json_info()
{
    my_cookie1=getCookies();
    my_cookie1=my_cookie1['bill'];
    //alert(my_cookie1);
}
function get_order(metod)
{
    $('#order_info').empty();
    my_cookie1=getCookies();
    my_cookie1=my_cookie1['bill'];
    if (my_cookie1.length==0 && order_json.length==0)
    {
        return false;
    }
    var html='';
    my_cookie1=JSON.parse(my_cookie1);
    i=order_json.length;
    
    if (i!==0){
    i=i-1;
    key2=order_json.length;
    for (key=i;key>=0;key--)
    { 
          value=order_json[key];
       date=Date.parse(value['date'])/1000;
        date_current=new Date();
        date2=date_current/1000-(60*60*24);
        if (metod=='z')
        {
          if (date_current>=date)
            continue;   
        }
        if (metod=='x')
        {
            if (date_current<=date)
            break;
        }
      
        html=html+'<div style="position: relative;float: left;width=100%"><h1>Order #'+key2+'</h1><br />';
        html=html+'<span>Date:'+value['date']+'</span><br />';
        html=html+'<span>Worker Id:'+value['worker']+'</span><br />';
        html=html+'<span>Lang:'+value['lang']+'</span><br /></div><br />';
        html=html+'<span>Z:'+value['Z']+'</span><br /></div><br />';
        html=html+'<table class="products">';
		html=html+'<thead>';
		html=html+'<tr>';
		html=html+'<th>BarCode</th>';
		html=html+'<th>Product name</th>';
		html=html+'<th>Amount</th>';
		html=html+'<th>Discount</th>';
		html=html+'<th>Row total</th>';
        html=html+'<th>Total</th>';
        html=html+'<th>Discount total</th>';
		html=html+'</tr>';
		html=html+'</thead>';
		html=html+'<tbody>';
        $.each(value['products'], function(a,val)
        {
            total=parseFloat(val['SalePrice'])*parseFloat(val['Count']);
            summ_sale=total-parseFloat(val['SaledPrice']);
            html=html+'<tr>';
            html=html+'<td><span><input type="text" name="" value="'+val['barckode']+'"/></span></td>';
            html=html+'<td><input type="text" name="" value="'+val['Name']+'"/></td>';
            html=html+'<td><span class="num"><input type="text" value="'+val['Count']+'"/></span></td>';
            html=html+'<td><span class="num wide"><input type="text" name="" value="'+parseFloat(val['DiscountNIS']).toFixed(2)+'"/></span>%';
            html=html+'<span class="num wide"><input type="text" " name="" value="'+parseFloat(val['DiscountPerc']).toFixed(2)+'"/></span>$</td>';
            html=html+'<td><span class="num wide"><input type="text" name="" value="'+parseFloat(val['SalePrice']).toFixed(2)+'"/></span></td>';
            html=html+'<td><span class="num wide"><input type="text" name="" value="'+total.toFixed(2)+'"/></span></td>';
            html=html+'<td><span class="num wide"><input type="text" name="" value="'+parseFloat(val['SaledPrice']).toFixed(2)+'"/></span></td>';
            html=html+'</tr>';
        });
        html=html+'</tbody>';
		html=html+'</table>';
        html=html+'<dl class="total">';
		html=html+'<dt>New total:<b>'+parseFloat(value['order']['total_summ']).toFixed(2)+'</b></dt>';
		html=html+'<dt >Total tax:<b>'+parseFloat(value['order']['tax_d']).toFixed(2)+'</b></dt>';
        html=html+'<dt>Total Before Tax:<b>'+(parseFloat(value['order']['total'])-parseFloat(value['order']['tax_d'])).toFixed(2)+'</b></dt>';  
		html=html+'<dt>Total:<b>'+parseFloat(value['order']['total'])+'</b></dt>';
		html=html+'</dl>';
        html=html+'<div class="discount">';
		html=html+'<label for="discount">Discount:</label>';
		html=html+'<input type="text" name=""  value="'+parseFloat(value['order']['discount_p']).toFixed(2)+'">';
		html=html+'%';
        html=html+'<input type="text" value="'+parseFloat(value['order']['discount_d']).toFixed(2)+'">$</div>';
        html=html+'<div class="line_clear" style="border-bottom: 2px solid #9AB7D1;border-color: #9AB7D1;border-width: 2px;margin-top: 2px;margin-bottom: 2px;width: 100%;position: relative;float: left;"></div>';
        key2--;        
        
    }
    }
    var html2=html;
    html='';
    a=my_cookie1.length;
    if (a!==0){
        a=a-1;
    
     key2=my_cookie1.length+order_json.length;
    for (a;a>=0;a--)
    {
        value=my_cookie1[a];
        date=Date.parse(value['date'])/1000;
        date_current=new Date();
        date2=date_current/1000-(60*60*24);
                if (metod=='z')
        {
          if (date_current>=date)
            continue;   
        }
        if (metod=='x')
        {
            if (date_current<=date)
            break;
        }
        
        html=html+'<div style="position: relative;float: left;width=100%"><h1>Order #'+key2+'</h1><br />';
        html=html+'<span>Date:'+value['date']+'</span><br />';
        html=html+'<span>Worker Id:'+value['worker']+'</span><br />';
        html=html+'<span>Lang:'+value['lang']+'</span><br /></div><br />';
        html=html+'<span>Z:'+value['Z']+'</span><br /></div><br />';
        html=html+'<table class="products">';
		html=html+'<thead>';
		html=html+'<tr>';
		html=html+'<th>BarCode</th>';
		html=html+'<th>Product name</th>';
		html=html+'<th>Amount</th>';
		html=html+'<th>Discount</th>';
		html=html+'<th>Row total</th>';
        html=html+'<th>Total</th>';
        html=html+'<th>Discount total</th>';
		html=html+'</tr>';
		html=html+'</thead>';
		html=html+'<tbody>';
        $.each(value['products'], function(a,val)
        {
            total=parseFloat(val['SalePrice'])*parseFloat(val['Count']);
            summ_sale=total-parseFloat(val['SaledPrice']);
            html=html+'<tr>';
            html=html+'<td><span><input type="text" name="" value="'+val['barckode']+'"/></span></td>';
            html=html+'<td><input type="text" name="" value="'+val['Name']+'"/></td>';
            html=html+'<td><span class="num"><input type="text" value="'+val['Count']+'"/></span></td>';
            html=html+'<td><span class="num wide"><input type="text" name="" value="'+parseFloat(val['DiscountNIS']).toFixed(2)+'"/></span>%';
            html=html+'<span class="num wide"><input type="text" " name="" value="'+parseFloat(val['DiscountPerc']).toFixed(2)+'"/></span>$</td>';
            html=html+'<td><span class="num wide"><input type="text" name="" value="'+parseFloat(val['SalePrice']).toFixed(2)+'"/></span></td>';
            html=html+'<td><span class="num wide"><input type="text" name="" value="'+total.toFixed(2)+'"/></span></td>';
            html=html+'<td><span class="num wide"><input type="text" name="" value="'+parseFloat(val['SaledPrice']).toFixed(2)+'"/></span></td>';
            html=html+'</tr>';
        });
        html=html+'</tbody>';
		html=html+'</table>';
        html=html+'<dl class="total">';
		html=html+'<dt>New total:<b>'+parseFloat(value['order']['total_summ']).toFixed(2)+'</b></dt>';
		html=html+'<dt >Total tax:<b>'+parseFloat(value['order']['tax_d']).toFixed(2)+'</b></dt>';
        html=html+'<dt>Total Before Tax:<b>'+(parseFloat(value['order']['total'])-parseFloat(value['order']['tax_d'])).toFixed(2)+'</b></dt>';  
		html=html+'<dt>Total:<b>'+parseFloat(value['order']['total'])+'</b></dt>';
		html=html+'</dl>';
        html=html+'<div class="discount">';
		html=html+'<label for="discount">Discount:</label>';
		html=html+'<input type="text" name=""  value="'+parseFloat(value['order']['discount_p']).toFixed(2)+'">';
		html=html+'%';
        html=html+'<input type="text" value="'+parseFloat(value['order']['discount_d']).toFixed(2)+'">$</div>';
        html=html+'<div class="line_clear" style="border-bottom: 2px solid #9AB7D1;border-color: #9AB7D1;border-width: 2px;margin-top: 2px;margin-bottom: 2px;width: 100%;position: relative;float: left;"></div>';
        key2--;
    }
    }
    if (html=='' && html2=='')
    {
        return false;
    }
    $('#order_info').append(html+html2);
    mywindow = open('','newokno','left=30,width=1250,height=10000px,status=1,menubar=1');
//Открываем документ
    mywindow.document.open();
//Создаём документ
    mywindow.document.write('<!DOCTYPE html><html><head><style>html,body{overflow: auto;height:100%}</style><title>');
    mywindow.document.write('</title></head><body>');
    mywindow.document.write($('#order_info').html());
    mywindow.document.write('</body></html>');
    //Закрываем документ но не окно
    mywindow.document.close();    
}
function clear_search()
{
    $('#search').val('');
    $('.ui-helper-hidden-accessible').text('');
    close_cat();
}
function getCategory(id_cat)
{
	
    $('#category_info').empty();
    i=product.length;
    _product_bard={};
    html='<table class="products" style="width:95%">';
	html=html+'<thead>';
	html=html+'<tr>';
	html=html+'<th></th>';
	html=html+'<th>BarCode</th>';
	html=html+'<th>Product name</th>';
	html=html+'<th>Price</th>';
	html=html+'</tr>';
	html=html+'</thead><tbody>';
    k=0;
    t=0;
    for (a=0;a<i;a++)
    {
        if (product[a]['CategoryCode']==id_cat)
        {
            t++;
            product[a]['BarCode']=(product[a]['BarCode']).toString();
            html=html+'<tr>';
            html=html+'<td><span><input type="checkbox" onchange="change_product(\''+product[a]['BarCode']+'\')"></span></td>';
            html=html+'<td ><span>'+product[a]['BarCode']+'</span></td>';
            html=html+'<td style=" width: 70%; text-align: left;"><span>'+product[a]['Name']+'</span></td>';
            html=html+'<td><span>'+product[a]['SalePrice']+'</span></td>';
            html=html+'</tr>';
        }
    }
   // resetSearch(_product_bard);
    $('#category_info').append(html);
    $('#category').show();
}
/*модальное окно с категориями*/
function CategoryChange(ids)
{
    i=product.length;
    _product_bard={};
    k=0;
    for (a=0;a<i;a++)
    {
        if (product[a]['CategoryCode']==ids)
        {
            _product_bard[k]=product[a]['BarCode'];
        }
    }
    resetSearch(_product_bard);
}
function resetSearch(arrays)
{
      $( "#search" ).autocomplete( "option", "source", arrays);
      my_clear();
      my_reset();
}
_add_product={};
function change_product(id)
{
    if (_add_product[''+id+''])
    {
        delete(_add_product[''+id+'']);
    }
    else
    {
        _add_product[''+id+'']=''+id+'';
    }
}
/*function ok_cat()
{
    key2='';
    for(var key2 in _add_product) {
        key=product_bard[key2];
        if (cart[product[key]['BarCode']])
        {
            my_cookie[product[key]['BarCode']]['amount']=Number(my_cookie[product[key]['BarCode']]['amount'])+1;                       
        }
        else
        {
            my_cookie[product[key]['BarCode']]=product[key];
            my_cookie[product[key]['BarCode']]['amount']=0;
            my_cookie[product[key]['BarCode']]['discount']=0;
            cart[product[key]['BarCode']]=true;
        }
    }
    setCookie();
    my_reset();
    _add_product={};
    $('#category').hide();
}*/
function close_cat2()
{
    _add_product={};
    $('#category').hide();
}
/*окно с категориями под поисковиком*/
function minus_count(e,sum,BarCode){
	if(my_cookie[BarCode]['discount_type']=="0"){
		sum=(100-my_cookie[BarCode]['discount'])*sum/100;
	}
	else{
		sum=sum-my_cookie[BarCode]['discount'];
	}
	var y=parseFloat($('.newrow3 label.finall_price:first').text(),10);
	$('.newrow3 label.finall_price:first').text((y-sum).toFixed(2));
	var z=parseFloat($('.newrow2 div label.tax_sum:first').text(),10);
	$('.newrow2 div label.tax_sum:first').text((z-sum*0.17).toFixed(2));
	var z2=parseFloat($('.newrow2 div label.in_sum:first').text(),10);
	$('.newrow2 div label.in_sum:first').text((z2-sum*0.83).toFixed(2));
	var x= parseFloat(e.parentElement.children[1].innerText, 10)-1;
	e.parentElement.children[1].innerText=x;
	var n= parseFloat(e.parentElement.parentElement.children[5].innerText, 10);
	e.parentElement.parentElement.children[5].innerText=(n-sum).toFixed(2);
	key=product_bard[BarCode];
	current_finnal_amount=current_finnal_amount-sum;
	var nn=parseInt($('#total_prod').text());
	$('#total_prod').text(nn-1);
	   /*  if (cart[product[key]['BarCode']])
	     {
	        my_cookie[product[key]['BarCode']]['amount']=Number(my_cookie[product[key]['BarCode']]['amount'])-1;                       
	     }
	     else
	     {
	        my_cookie[product[key]['BarCode']]=product[key];
	        my_cookie[product[key]['BarCode']]['amount']=0;
	        my_cookie[product[key]['BarCode']]['discount']=0;
	        cart[product[key]['BarCode']]=true;
	     }*/
	     minus(BarCode,e.parentElement.children[1].innerText);
}
function plus_count(e,sum,BarCode){	
	if(my_cookie[BarCode]['discount_type']=="0"){
		sum=(100-my_cookie[BarCode]['discount'])*sum/100;
	}
	else{
		sum=sum-parseInt(my_cookie[BarCode]['discount']);
	}	
	var z=parseFloat($('.newrow2 div label.tax_sum:first').text(),10);
	$('.newrow2 div label.tax_sum:first').text((z+sum*0.17).toFixed(2));
	var z2=parseFloat($('.newrow2 div label.in_sum:first').text(),10);
	$('.newrow2 div label.in_sum:first').text((z2+sum*0.83).toFixed(2));
	var y=parseFloat($('.newrow3 label.finall_price:first').text(),10);
	$('.newrow3 label.finall_price:first').text((y+sum).toFixed(2));
	var x= parseFloat(e.parentElement.children[1].innerText, 10)+1;
	e.parentElement.children[1].innerText=x;
	var n= parseFloat(e.parentElement.parentElement.children[5].innerText, 10);
	e.parentElement.parentElement.children[5].innerText=(n+sum).toFixed(2);
	current_finnal_amount=current_finnal_amount+sum;
	//var n= parseFloat($(this).parent().parent().find('.sum_p_l').text(), 10)+sum;
	//parseFloat($(this).parent().parent().find('.sum_p_l').text(n);
	plus(BarCode,e.parentElement.children[1].innerText);
	var nn=parseInt($('#total_prod').text());
	$('#total_prod').text(nn+1);
}
_id_cat=0;
function find_client(str){
	var result_clients=new Array();
	var result_auto=new Array();
	var len=client.length;
	for (var i=0; i < len; i++) {
	  if(client[i]['SupplierName'].indexOf(str)>-1||client[i]['CardNumber'].indexOf(str)>-1||client[i]['user_ID'].indexOf(str)>-1||client[i]['PayerPhone'].indexOf(str)>-1||client[i]['CellPhone'].indexOf(str)>-1)
		result_clients[result_clients.length] = client[i]; 		
	}
}
function getCategory2(id_cat,cat_name)
{
	$(".prod_btntop").css('visibility','visible');
     k=0;
    t=0;
    var html='';
    i=product.length;
    _product_bard={};
    for (a=0;a<i;a++)
    {
        if (product[a]['ProductGroup']==id_cat)
        {
            t++;  
            html=html+'<div class="prod first" onclick=add_cart("'+product[a]['BarCode']+'")><!--<img src="images/sample.png">--><p>'+product[a]['Title']+'</p></div>';         
        }
    }
    $('#cat_name').text(cat_name);
     $('#resizable').empty();
     $('#resizable').append(html);
     $('#num_product').append("מס' הפריטים: "+t)
    /*if (_id_cat==id_cat)
    {
      close_cat();
      return false;
    }
   // clear_search();
    _id_cat=id_cat;
    
   // $('#button_cats_'+id_cat).addClass('blue big');
    $('#resizable').empty();
    
    $('#left_bat').empty();
    
    $('#tabs_cat').empty();
    i=product.length;
    _product_bard={};
    //html2='<table class="products" id="product_table" style="width:100%;"><thead></thead><tbody style="background: none;border:none;">';
  
    html='<table class="products" id="product_table" style="width:100%;">';
	
	html=html+'<tbody>';
	html=html+'<tr class="details_title">';
	html=html+'			    <th class="border_table"></th>';
	html=html+'			    <th style="width:20%">בר קוד</th>'; 
	html=html+'			    <th>שם הפריט</th>';
	html=html+'			    <th>מחיר</th>';
	html=html+'			    <th>כמות</th>';
	html=html+'			    <th>הנחה</th>';
	html=html+'			    <th class="border_table">סה"כ</th>';
	html=html+'			    <th class="border_table"></th>';
	html=html+'			  </tr>';	
	html='';
    k=0;
    t=0;
    for (a=0;a<i;a++)
    {
        if (product[a]['CategoryCode']==id_cat)
        {
            t++;
            /*product[a]['BarCode']=(product[a]['BarCode']).toString();
            html=html+'<tr style="cursor:pointer;" onclick="add_cart(\''+product[a]['BarCode']+'\')">';
            html=html+'<td >'+product[a]['BarCode']+'</td>';
            html=html+'<td style=" width: 70%; text-align: left;font-size: 14px;;">'+product[a]['Name']+'</td>';
            html=html+'<td>'+product[a]['SalePrice']+'</td>';
            html=html+'</tr>';
            
           html=html+'<div class="prod first"><!--<img src="images/sample.png">--><p>'+product[a]['BarCode']+'</p></div>';

            //html2=html2+'<tr class="my_table"><td style="border:none"><button onclick="add_cart(\''+product[a]['BarCode']+'\')">'+product[a]['Name']+'</button></td></tr>';
        }
    }
   // resetSearch(_product_bard);
   html3='';
   if (my_cookie['general']['view_cat']=='table')
   {
        html3=html3+'<p><button class="blue big" onclick="change_view_cat(\'table\');">Table</button>';
        html3=html3+'<button class="" onclick="change_view_cat(\'button\');">Button</button></p>'
        //$('#tabs_cat').append(html3);
            $('#resizable').append('<span>מספר פריטים:'+t+'</span>'+html);
           // $('#product_table').filterTable({ // apply filterTable to all tables on this page
          //  inputSelector: '#search' // use the existing input instead of creating a new one
        });
       // $('#left_bat').hide();
        $('#resizable').show(); 
   }
   else
   {
        html3=html3+'<p><button class="" onclick="change_view_cat(\'table\');">Table</button>';
        html3=html3+'<button class="blue big" onclick="change_view_cat(\'button\');">Button</button></p>'
        $('#tabs_cat').append(html3);
        $('#left_bat').append('<span style="width:100%;display: block;">Product count:'+t+'</span>'+html2+'</tbody></table>');
        $('#product_table').filterTable({ // apply filterTable to all tables on this page
            inputSelector: '#search' // use the existing input instead of creating a new one
        });
        $('.active .fa-plus-circle').click(function() {
			var x= parseInt($(this).parent().children('p').text(), 10)+1;
			$(this).parent().children('p').html(x);
		});
        $('#cat2').hide();
        $('#left_bat').show(); 
   }
    
    
    $( "#search" ).autocomplete( "disable" );*/
    
}
function change_view_cat(type)
{
     my_cookie['general']['view_cat']=type;
     setCookie();
     _cat=_id_cat;
     _id_cat=0;
     getCategory2(_cat);
     return;
}
function remove_cart(id){	
	sum=parseFloat($('.details_area').find('.tr_'+id).parent().parent().find('.sum_p_l').text(),10);
	var y=parseFloat($('.newrow3 label.finall_price:first').text(),10);
	$('.newrow3 label.finall_price:first').text((y-sum).toFixed(2));
	var z=parseFloat($('.newrow2 div label.tax_sum:first').text(),10);
	$('.newrow2 div label.tax_sum:first').text((z-sum*0.17).toFixed(2));
	var z2=parseFloat($('.newrow2 div label.in_sum:first').text(),10);
	$('.newrow2 div label.in_sum:first').text((z2-sum*0.83).toFixed(2));
	$('#total_prod').text(parseInt($('#total_prod').text())-parseInt($('.details_area').find('.tr_'+id+' p:nth-child(2)').text()));
	$('.details_area').find('.tr_'+id).remove();
	
	my_delete(id);
}
function add_cart(id)
{
   		key=product_bard[id];
	     if (cart[product[key]['BarCode']])
	     {
	        //my_cookie[product[key]['BarCode']]['amount']=Number(my_cookie[product[key]['BarCode']]['amount'])+1;                       
	     }
	     else
	     {
	        my_cookie[product[key]['BarCode']]=product[key];
	       // my_cookie[product[key]['BarCode']]['amount']=1;
	        my_cookie[product[key]['BarCode']]['discount']=0;
	        cart[product[key]['BarCode']]=true;
	     }
   // setCookie();
  //  my_reset();
    // alert(key);
     if ($('.details_area').find('.tr_'+id).length>0)     
     {
       if(refund==1){
			refund=0;
			$('.details_area').find('.tr_'+id).find('.fa-minus-circle').click(); 
						
		}
		else{
			$('.details_area').find('.tr_'+id).find('.fa-plus-circle').click(); 
		}                     
     }
     else
     {
     	html='';
     	html=html+'<tr class="active tr_'+product[key]['BarCode']+'">';
		html=html+'		    <td class="border_table text_center"><i class="fa fa-info-circle"></i></td>';
		//html=html+'		    <td class="padding_5">'+product[key]['BarCode']+'</td> ';
		html=html+'		    <td><p style="height:40px;overflow: hidden;">'+product[key]['Title']+'</p></td>';
		html=html+'		    <td>'+product[key]['SalePrice']+'</td>';
		html=html+"		    <td class='text_center'><i class='fa fa-plus-circle' onclick=plus_count(this,"+product[key]['SalePrice']+",'"+product[key]['BarCode']+"')></i><p style='display: inline-block;width:60px;text-align:center;'>0</p><i class='fa fa-minus-circle' onclick=minus_count(this,"+product[key]['SalePrice']+",'"+product[key]['BarCode']+"');></i></td> ";
		html=html+'		    <td><i class="fa fa-tag" onclick="anacha_prod('+product[key]['BarCode']+')"></i></td>';
		html=html+'		    <td class="border_table padding_5 sum_p_l">0.00</td>';
		html=html+'		    <td class="border_table text_center"><i class="fa fa-times" onclick=remove_cart("'+id+'");></i></td> ';
		html=html+'		  </tr>';
		$('.details_area table tbody').append(html);
		if(refund==1){
			refund=0;
			$('.details_area').find('.tr_'+id).find('.fa-minus-circle').click(); 
						
		}
		else{
			$('.details_area').find('.tr_'+id).find('.fa-plus-circle').click(); 
		}
        my_cookie[product[key]['BarCode']]=product[key];
       // my_cookie[product[key]['BarCode']]['amount']=0;
        my_cookie[product[key]['BarCode']]['discount']=0;
        cart[product[key]['BarCode']]=true;
     }
    setCookie();
    my_reset();
}
function close_cat()
{
        $('#top_button').children().removeClass('blue big');
        _id_cat=0;
       // $('#cat2').empty();
        $( "#search" ).autocomplete( "enable" );
        $('#left_bat').empty();
        $('#tabs_cat').empty();
        //$('#cat2').hide();
        $('#left_bat').hide();
        return false;
}

function my_BarCode2()
{

    key=$('#search2').val();
    if (product_bard[key]!=undefined)
    { 
        
        key=product_bard[key];
        if (cart[product[key]['BarCode']])
        {
            my_cookie[product[key]['BarCode']]['amount']=Number(my_cookie[product[key]['BarCode']]['amount'])+1;
            setCookie();
            my_reset(); 
            key=$('#search2').val('');                       
            return false;
        }
        my_cookie[product[key]['BarCode']]=product[key];
        my_cookie[product[key]['BarCode']]['amount']=0;
        my_cookie[product[key]['BarCode']]['discount']=0;
        setCookie();
        cart[product[key]['BarCode']]=true;
        $('#search2').val('');
        my_reset();
    }
}
summ_calc=0;
zn=false;
$('.button-number').on('click',function(){
    return false;
    ev=$(this).attr('id');
    if (ev=='clear')
    {
        $('#calc_summ').val('');
    }
    if (ev=='=')
    {
        $('#calc_summ').val();
    }
    if ($('#calc_summ').val()=='')
    {
        ev2='';
    }
    else
    {
         ev2=parseFloat($('#calc_summ').val());
    }
   
    if (ev=='NaN' || ev2=='NaN')
    {
        $('#calc_summ').val('');
        return;
    }
    if (ev=='+')
    {
        summ_calc=summ_calc+ev;
        $('#calc_summ').val(summ_calc);
        zn=true;
        return;
    }
    if (ev=='-')
    {
        summ_calc=summ_calc-ev2;
       // alert(summ_calc);
        $('#calc_summ').val(summ_calc);
        zn=true;
        return;
    }
    if (zn==false)
    {
        $('#calc_summ').val( $('#calc_summ').val()+''+ev+'');
    }
    else
    {
         $('#calc_summ').val(ev);
         zn=false;
    }
    
    
});

function add_new_cart(val){
	 $('.input_result input[name=Input]:first').val('');
	new_id++;
	//for (elem in product ){
    //       StockID=elem['StockID'];
    //       break;
    //}
     
    var size = 0, key;
    for (key in product_bard) {
        if (product_bard.hasOwnProperty(key)) 
        	size++;
    }
	key=size;   
   // var key=product_bard.length;
    product_bard['new'+new_id]=key;
	//var x='{"StockID":"'+StockID+'","Title":"פריט כללי","SalePrice":"'+val+'","BarCode":"new'+new_id+'","CategoryCode":0,"Unit":0,"Cost":""}';
	//var x='{"ID":"1","user_ID":"'.$userID.'","Title":"פריט כללי","Title2":"","expiration":"","notes":"","creation_date":"","last_modified":"","hitcount":"0","featured":"no","active":"yes","lastinserted":"","lastupdated":"0","lastdeleted":"","export":"0","synccatalog":"0","priceupdated":"","titleupdated":"","basket":"0","reserved":"0.00","ordered":"0.00","discount_type":"0","discount_expiration_id":"","discount_listing_id":"","no_general_discount":"0","discount":"","is_tree":"0","ProductGroup":"","BarCode":"7291001000000","MisparZar":"1000","MisparSiduri":"","MisparChalifi":"","StockMin":"","StockMax":"","Sapak":"2","Mikum":"","Currency":"621","Cost":"118.000","SalePrice":"","Quantity":"","AgentDiscount":"","":"0","description":"","treeupdated":"","tree_origin_id":"","Code":"","expences_account_id":"","incomes_account_id":"","ProductType":"P","related_stock_id":"0","station_id":"0","publish_in_store":"0","ListingID":"2","StockID":"1312","LatestSyncQuantity":"","LatestSyncDate":"","MinStock":"","OrderedQty":"0.000","ReservedQty":"0.000"},{"ID":"2","user_ID":"601","Title":"\u05d7\u05d5\u05dc\u05e6\u05d4 \u05de\u05e1\u05ea\u05d5\u05d1\u05d1\u05ea","Title2":"","expiration":"0000-00-00","notes":"","creation_date":"2014-12-18","last_modified":"","hitcount":"0","featured":"no","active":"yes","lastinserted":"","lastupdated":"0","lastdeleted":"0","export":"0","synccatalog":"0","priceupdated":"","titleupdated":"","basket":"0","reserved":"0.00","ordered":"0.00","discount_type":"0","discount_expiration_id":"","discount_listing_id":"","no_general_discount":"0","discount":"","is_tree":"0","ProductGroup":"","BarCode":"","MisparZar":"","MisparSiduri":"","MisparChalifi":"","StockMin":"","StockMax":"","Sapak":"","Mikum":"","Currency":"","Cost":"","SalePrice":"","Quantity":"","AgentDiscount":"","Unit":"0","description":"","treeupdated":"","tree_origin_id":"","Code":"","expences_account_id":"","incomes_account_id":"","ProductType":"P","related_stock_id":"0","station_id":"0","publish_in_store":"0","ListingID":"","StockID":"","LatestSyncQuantity":"","LatestSyncDate":"","MinStock":"","OrderedQty":"0.000","ReservedQty":"0.000"}';
	   var x={"Title":"פריט כללי","BarCode":"new'+new_id+'","SalePrice":val};
	
	//product[key]=JSON.parse(x);
	product[key]=x;
	my_cookie['new'+new_id]=product[key];
	my_cookie['new'+new_id]['amount']=0;
    my_cookie['new'+new_id]['discount']=0;
    cart['new'+new_id]=true;
	     
    
		
	   	html='';
     	html=html+'<tr class="active tr_new'+new_id+'">';
		html=html+'		    <td class="border_table text_center"><i class="fa fa-info-circle"></i></td>';
//		html=html+'		    <td class="padding_5">new'+new_id+'</td> ';
		html=html+'		    <td><p style="height:40px;width:100px;overflow: hidden;">פריט כללי</p></td>';
		html=html+'		    <td>'+val+'</td>';
		html=html+"		    <td class='text_center'><i class='fa fa-plus-circle' onclick=plus_count(this,"+val+",'new"+new_id+"')></i><p style='display: inline-block;width:60px;text-align:center;'>0</p><i class='fa fa-minus-circle' onclick=minus_count(this,"+val+",'new"+new_id+"')></i></td> ";
		html=html+'		    <td></td>';
		html=html+'		    <td class="border_table padding_5">0.00</td>';
		html=html+'		    <td class="border_table text_center"><i class="fa fa-times" onclick=remove_cart("new'+new_id+'")></i></td> ';
		html=html+'		  </tr>';
		$('.details_area table tbody').append(html);
		$('.details_area').find('.tr_new'+new_id).find('.fa-plus-circle').click(); 
           Calc.Input.value = ''; 
          
           setCookie();
    my_reset();
}
function open_kupa(){
	html="<form id='open_kupa'><div style='position: absolute;width:100%;height: 100%;z-index: 1000;background: rgba(40, 38, 38, 0.9);'>";
		html=html+	"<div style='background-color: white;z-index: 2000;width: 520px;height: 398px;margin: 0 auto;margin-top: 40px;padding: 50px;position: relative;'>";
		//html=html+		"<h2 style='text-align: center;font-size: 170%;'>פתיחת קופה:</h2>";
		//html=html+"<input type='text' name='yitrat_kupa'/><input type='submit' value='שלח'/>";
		html=html+"<input type='hidden' value='<?=$stock?>' name='stock'/>";		
		//html=html+	"</div>";
		html=html+	"<div class='container_pop mezuman display' style='display: block; z-index: 9999;'>";
		html=html+	"	<h2 class='relative'>פתיחת קופה</h2>";
		html=html+	"	<h5>הכנס תזרים מזומנים:</h5>";
		html=html+	"	<input type='text' value='0.00' name='yitrat_kupa' class=''>";
		html=html+	"	<div class='shtar'>";
		html=html+	"		<img src='images/money8.png' onclick=calc2('200')>";
		html=html+	"		<img src='images/money2.png' onclick=calc2('100')>";
		html=html+	"		<img src='images/money1.png' onclick=calc2('50')>";
		html=html+	"		<img src='images/money7.png' onclick=calc2('20')>";				
		html=html+	"	</div>";
		html=html+	"	<div class='matbea'>";
		html=html+	"		<img src='images/money3.png' onclick=calc2('10')>";
		html=html+	"		<img src='images/money6.png' onclick=calc2('5')>";
		html=html+	"		<img src='images/money9.png' onclick=calc2('2')>";
		html=html+	"		<img src='images/money10.png' onclick=calc2('1')>";
		html=html+	"		<img src='images/money5.png' onclick=calc2('0.5')>";
		html=html+	"		<img src='images/money4.png' onclick=calc2('0.1')>";
		html=html+	"	</div>";
		html=html+	"	<input class='mybtn btnlightgray rightbottom' type='button' onclick=$('#open_kupa').remove() value='ביטול'>";
		html=html+	"	<input class='mybtn btnblue leftbottom' onclick=$('#open_kupa').submit() type='button' value='אישור'>";
		html=html+	"</div>";
		html=html+"</div></form>";
		$('body').prepend(html);
}
function close_kupa(){
	html="<form id='close_kupa'><div style='position: absolute;width:100%;height: 100%;z-index: 1000;background: rgba(40, 38, 38, 0.9);'>";
		html=html+	"<div style='background-color: white;z-index: 2000;width: 520px;height: 398px;margin: 0 auto;margin-top: 40px;padding: 50px;position: relative;'>";
		//html=html+		"<h2 style='text-align: center;font-size: 170%;'>פתיחת קופה:</h2>";
		//html=html+"<input type='text' name='yitrat_kupa'/><input type='submit' value='שלח'/>";
		html=html+"<input type='hidden' value='<?=$stock?>' name='stock'/>";		
		//html=html+	"</div>";
		html=html+	"<div class='container_pop mezuman display' style='display: block; z-index: 9999;'>";
		html=html+	"	<h2 class='relative'>סגירת קופה</h2>";
		html=html+	"	<h5>הכנס דמי מחזור:</h5>";
		html=html+	"	<input type='text' value='0.00' name='machzor' class=''>";
		html=html+	"	<div class='shtar'>";
		html=html+	"		<img src='images/money8.png' onclick=calc3('200')>";
		html=html+	"		<img src='images/money2.png' onclick=calc3('100')>";
		html=html+	"		<img src='images/money1.png' onclick=calc3('50')>";
		html=html+	"		<img src='images/money7.png' onclick=calc3('20')>";				
		html=html+	"	</div>";
		html=html+	"	<div class='matbea'>";
		html=html+	"		<img src='images/money3.png' onclick=calc3('10')>";
		html=html+	"		<img src='images/money6.png' onclick=calc3('5')>";
		html=html+	"		<img src='images/money9.png' onclick=calc3('2')>";
		html=html+	"		<img src='images/money10.png' onclick=calc3('1')>";
		html=html+	"		<img src='images/money5.png' onclick=calc3('0.5')>";
		html=html+	"		<img src='images/money4.png' onclick=calc3('0.1')>";
		html=html+	"	</div>";
		html=html+	"	<input class='mybtn btnlightgray rightbottom' onclick=$('#close_kupa').remove() type='button' value='ביטול'>";
		html=html+	"	<input class='mybtn btnblue leftbottom' onclick=$('#close_kupa').submit() type='button' value='אישור'>";
		html=html+	"</div>";
		html=html+"</div></form>";
		$('body').prepend(html);
}
function find_product(str){
	if(str==""){
		getMainCategories();
	}
	else{
	var t=0;
	var html='';
	i=product.length;
    _product_bard={};
    for (a=0;a<i;a++)
    {
        if (product[a]['BarCode'].indexOf(str) > -1||product[a]['Title'].indexOf(str) > -1)
        {
            t++;  
            html=html+'<div class="prod first" onclick=add_cart("'+product[a]['BarCode']+'")><!--<img src="images/sample.png">--><p>'+product[a]['Title']+'</p></div>';         
        }
    }
     $('#cat_name').text(""+t+" תוצאות חיפוש ל'"+str+"'");
     $('#resizable').empty();
     $('#resizable').append(html);
    }
}
</script>
<script>
	    $(document).ready(function(){ 

	var client3=<?php echo $client?>;	
			$('.client_search').autocomplete({
			    source: client3,
			    minChars: 1,
			    select : function(a, b) {
					$('input[name=client_search_id]').val(b.item.ID);
					search_cust_sbm();
				}
			});			
			
		});
    </script>
<div class="wrap display"></div>
	<div class="popup pop_anacha">
		<!--<img src="images/box_small.png" class="img_wrap"/>	-->	
		<div class="container_pop an" style="display:none">
			<div class="anacha_half right">
				<input class="mybtn anacha_btn" name="shch" style="width:17%" type="button" value="₪" onclick="$('.anacha_half.right .mybtn').removeClass('btnorange');$(this).toggleClass('btnorange');$('.anacha_half.right .mybtn').toggleClass('anacha_btn');calc_anacha();">
				<input  type="text" class="text anacha_txt" style="width:59%"/>
				<input class="mybtn btnorange" name="achuz" style="width:17%" type="button" value="%"  onclick="$('.anacha_half.right .mybtn').removeClass('btnorange');$(this).toggleClass('btnorange');$('.anacha_half.right .mybtn').toggleClass('anacha_btn');calc_anacha();">
			</div>
			<div class="anacha_half left">
				<div style="width:49%;margin-right: 2%;float:right">
					<p class="forty">ס. ביניים מקורי:</p>
					<p class="forty " style="color: #e65844">ס. ביניים חדש:</p>
					<input class="mybtn btngray  zerofloat2" type="button" value="ביטול" onclick="$( '.wrap' ).click();">
				</div>
				<div style="width:49%;float:left">
					<input  class="text s_between  zerofloat2" >
					<input  class="text s_anacha  zerofloat2" value="0.00" style="color: #e65844;background: #fdeeec;border:1px solid #e65844"/>
					<input class="mybtn btnblue  " type="button" value="הוסף הנחה" onclick="anac()">
				</div>	
			</div>
		</div>
		<div class="container_pop an_prod"  style="display:none">
			<div class="anacha_half right">
				<input type="hidden" name="BarCode"/>
				<input class="mybtn anacha_btn" name="shch" style="width:17%" type="button" value="₪" onclick="$('.anacha_half.right .mybtn').removeClass('btnorange');$(this).toggleClass('btnorange');$('.anacha_half.right .mybtn').toggleClass('anacha_btn');calc_anacha_prod();">
				<input  type="text" class="text anacha_txt" style="width:59%"/>
				<input class="mybtn btnorange" name="achuz" style="width:17%" type="button" value="%"  onclick="$('.anacha_half.right .mybtn').removeClass('btnorange');$(this).toggleClass('btnorange');$('.anacha_half.right .mybtn').toggleClass('anacha_btn');calc_anacha_prod();">
			</div>
			<div class="anacha_half left">
				<div style="width:49%;margin-right: 2%;float:right">
					<p class="forty">מחיר לאחר הנחה:</p>
					<input class="mybtn btngray  zerofloat2" type="button" value="ביטול" onclick="$( '.wrap' ).click();">
				</div>
				<div style="width:49%;float:left">
					<input  class="text s_between  zerofloat2" >
					<input class="mybtn btnblue  " type="button" value="הוסף הנחה" onclick="anac_prod()">
				</div>	
			</div>
		</div>
	</div>	
	
	<div class="popup pop_peulot  pop_hachlafa">
		<!--<img src="images/box_large.png" class="img_wrap"/>	-->	
		<div class="container_pop an">
			<table id="achlafa_pritim" style="width: 100%;font-size:150%;line-height: 45px;">
  				
				 
				  
  			</table>
  			<input class="mybtn btnblue rightbottom" type="button" value="בחר עיסקה" onclick="insert_trans('achlafa');openwrap('.hachlafa,.pop_hachlafa2','.an,.pop_hachlafa2,.pop_hachlafa');">
			<input class="mybtn btnblue leftbottom2" onclick="choose_all_comp();" type="button" value="עסקה שלמה">
			<input class="mybtn btnblue leftbottom" onclick="" type="button" value="הדפס">
		</div>
	</div>	
	<div class="popup pop_peulot  pop_pause">
		<!--<img src="images/box_small.png" class="img_wrap"/>	-->	
		<div class="container_pop an">
		
			<h2 style="margin-top: 30px;font-size: 150%;">מספר עסקה נוכחית: <span id="trannum"></span></h2>
  			<input class="mybtn btnblue rightbottom" style="width: 140px;" type="button" value="עיסקאות בהמתנה" onclick="insert_trans('pause');openwrap('.pause,.pop_hachlafa2','.an,.pop_hachlafa2,.pop_hachlafa');">			
			<input class="mybtn btnblue leftbottom" onclick="pause_deal()" type="button" value="השהה עיסקה">
			
		</div>
	</div>			
	<div class="popup pop_peulot  pop_hachlafa2">
		<!--<img src="images/box_large.png" class="img_wrap"/>	-->			
		<div class="container_pop an">
			<table id="achlafa_trans" style="width: 100%;font-size:150%;line-height: 45px;">
  		
  			</table>
  			<input class="mybtn btngray rightbottom" type="button" value="ביטול" onclick="">			
			<input class="mybtn btnblue leftbottom" onclick="" type="button" value="כנס לעיסקה">
		</div>
	</div>	
	<div class="popup pop_peulot popup_pay add_worker" ng-controller="PaymentController  as payment">
		<!--<img src="images/box_large.png" class="img_wrap"/>	-->		
		<div class="container_pop add_worker" ng-controller="WorkerController  as workers">
			<h2 class="relative">סה"כ לתשלום: <span style="font-size: 100%">₪</span><span class="span_sum zerofloat">{{amount}}</span></h2>
			<h5>הוסף עובד למכירה:</h5>
			
			<table class="workers_tb" style="width: 93%;">
				<tr>
					 <th>שם עובד</th>
					 <th>טלפון</th>
					 <th>נייד</th>
					 <th>אימייל</th>
					 <th>מס"ד</th>
					 <th></th>
				</tr>
				
				<tr class="worker_{{worker1.WorkerNum}}" ng-repeat="worker1 in workers.workerslist" data-id="{{worker1.WorkerNum}}" ng-click="workers.choose_worker(this,worker1.WorkerNum)">
					<td>{{worker1.SupplierName}}</td>
					<td>{{worker1.Phone}}</td>
					<td>{{worker1.CellPhone}}</td>
					<td>{{worker1.Email}}</td>
					<td>{{worker1.WorkerNum}}</td>
					<td><i  class='fa fa-check-circle display'></i></td>
				</tr>		
			</table>
			<input class="mybtn btngray rightbottom" type="button" value="ביטול" onclick="$( '.wrap' ).click();">
			<input class="mybtn btnblue leftbottom" onclick="openwrap2('.add_worker.container_pop','.type_pay.container_pop')" type="button" value="בחירה">
		</div>
		<div class="container_pop type_pay display" >
			<h2 class="relative">סה"כ לתשלום: <span style="font-size: 100%">₪</span><span class="span_sum zerofloat">{{amount}}</span></h2>
			<h5>בחר אמצעי תשלום:</h5>
			<div class="type_half right" >
				 <!--localStorage.getItem('products');-->
				<div class="type_b">
					<input class="mybtn btnorange " type="button" value="מזומן" onclick="openwrap2('.type_pay.container_pop','.mezuman.container_pop')">
					<input class="mybtn btnblue " type="button" value="המחאה" onclick="openwrap2('','.amchaa.container_pop')">
					<input class="mybtn btngreen " type="button" value="אשראי" onclick="openwrap2('','.ashray.container_pop')">
				</div>
				<div class="type_s right type_b">
					<input class="mybtn btngray " type="button" value="שובר"  onclick="openwrap2('','.shovar.container_pop')">
					<input class="mybtn btngray " type="button" value="פריפייד" onclick="openwrap2('','.prifeyd.container_pop')">
					<input class="mybtn btngray " type="button" value="אחר">
					<input class="mybtn btnlightgray " type="button" value="יציאה" onclick="openwrap2('.mezuman.container_pop','.add_worker.container_pop')">
				</div>
				<div class="type_s left type_b">
					<input class="mybtn btngray " type="button" value="הקפה"  onclick="openwrap2('','.akafa.container_pop')">
					<input class="mybtn btngray " type="button" value="סילאריקס">
					<input class="mybtn btngray " type="button" value="אחר">
					<input class="mybtn btnblue " type="button" value="אישור" onclick="openwrap2('','.finish.container_pop')" ng-click="cashc.end_cash(0)">
				</div>
			</div>
			
			
			<div class="type_half left">
				
				<table class="workers_tb">
					<tr>
						 <th>סוג תשלום</th>
						 <th>סכום</th>
						 <th  ng-click="payment.add_type('.mezuman_sum','מזומן')"></th>
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
					<tr  ng-repeat="pay in payments_type.prepaid">
						<td>{{pay.type}}</td>
						<td>{{pay.amount}}</td>
						<td><i class="fa fa-times-circle" ng-click="payment.remove_item('prepaid',$index)"></i></td>
					</tr>
				</table>
			</div>
			<div class="leftbottom">
				<p class="pay_p"><span class="right">שולם:</span><span class="left" style="width: 25px;font-size: 105%;"> ₪ </span><span class="left type_finall_sum zerofloat">{{paid|number}}</span></p>
				<p class="itra_p"><span class="right">יתרה לתשלום:</span><span class="left" style="width: 25px;font-size: 105%;"> ₪ </span><span class="left span_sum span_itra zerofloat">{{itra|number}}</span></p>
			</div>
		</div>
		<div class="container_pop mezuman display" >
			<h2 class="relative">תשלום במזומן</h2>
			<h5>הוסף סכום מזומן:<span style="font-size: 100%;color: #fa6f58;">₪</span><span class="span_sum zerofloat" style="color: #fa6f58;">{{itra}}</span></h5>
			<input type="text" value="0.00" class="mezuman_sum zerofloat"/>
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
			<input class="mybtn btnblue leftbottom" type="button" value="אישור" onclick="openwrap2('','.type_pay.container_pop');" ng-click="payment.add_type('.mezuman_sum','מזומן')">
		</div>
		<div class="container_pop finish display">
			<h2 class="relative">העסקה בוצעה</h2>
			<p style="font-size: 224%;margin-top: 20px;margin-bottom: 10px;">ההזמנה בוצעה בהצלחה</p>				
		</div>
		<div class="container_pop amchaa display">
			<h2 class="relative">תשלום בהמחאה</h2>
			<h5>הוסף סכום:<span style="font-size: 100%;color: #fa6f58;">₪</span><span class="span_sum zerofloat"  style="color: #fa6f58;">{{itra}}</span></h5>
			<form class="amchaa_frm" style="width: 64%;margin: 0 auto;">
				<input type="text" value="0.00" class="text amchaa_sum zerofloat" />
				<div style="width:30%;margin-right: 2%;float:right">
					<p>מספר המחאה:</p>
					<p>תאריך:</p>
					<p>מספר בנק:</p>
					<p>מספר סניף:</p>
					<p>מספר חשבון:</p>
				</div>
				
				<div style="width:60%;float:left">
					<input name="chequenumber" class="text" />
					<input name="chequepaymentdate"  class="text" />
					<input name="chequebanknumber"  class="text" />
					<input name="chequebranch"  class="text" />
					<input name="chequeaccountnumber" class="text" />
				</div>	
			</form>
			
			<div class="allbottom">
				<input class="mybtn btnlightgray " type="button" value="ביטול" onclick="openwrap2('','.type_pay.container_pop')">
				<!--<input class="mybtn btngreen " type="button" value="בדיקת המחאה" onclick="openwrap2('','')">-->
				<input class="mybtn btnorange " type="button" value="מחולל התשלומים" onclick="openwrap2('','.mecholel_amchaa.container_pop')">
				<input class="mybtn btnblue " type="button" value="אישור" onclick="openwrap2('','.type_pay.container_pop');" ng-click="payment.add_type('.amchaa_sum','המחאה')">
			</div>
		</div>
		<div class="container_pop ashray display">
			<h2 class="relative">תשלום באשראי</h2>
			<h5>הוסף סכום:<span style="font-size: 100%;color: #fa6f58;">₪</span><span class="span_sum zerofloat" style="color: #fa6f58;">{{itra}}</span></h5>
			<form class="amchaa_frm" style="width: 64%;margin: 0 auto;">
				<input type="text" value="0.00" class="text ashray_text zerofloat" />					
			</form>			
			<p style="font-size: 224%;margin-top: 20px;margin-bottom: 10px;">העבר כרטיס אשראי</p>
			<input class="mybtn btnorange " type="button" value="הקלדה ידנית" style="width: 64%;"onclick="openwrap2('','.ashray_yadany.container_pop')"> 
			<input class="mybtn btnlightgray rightbottom" type="button" value="ביטול" onclick="openwrap2('','.type_pay.container_pop')">
			<input class="mybtn btnblue leftbottom" type="button" value="אישור" onclick="openwrap2('','.type_pay.container_pop');" ng-click="payment.add_type('.ashray_text','אשראי')">
		</div>
		<div class="container_pop ashray_yadany display">
			<h2 class="relative">תשלום באשראי - ידני</h2>
			<h5>הוסף סכום:<span style="font-size: 100%;color: #fa6f58;">₪</span><span class="span_sum zerofloat"  style="color: #fa6f58;">{{itra}}</span></h5>
			<form class="amchaa_frm" style="width: 64%;margin: 0 auto;">
				<input type="text" value="0.00" class="text ashray_yadany_text zerofloat" />
				<div style="width:30%;margin-right: 2%;float:right">
					<p>מספר כרטיס:</p>
					<p>תוקף כרטיס:</p>
					<p>תשלומים:</p>
				</div>
				<div style="width:60%;float:left">
					<input class="text" />
					<input  class="text" />
					<input  class="text" />
				</div>	
			</form>
			
			<div class="allbottom">
				<input class="mybtn btnlightgray " type="button" value="ביטול" onclick="openwrap2('','.ashray.container_pop')">
				<input class="mybtn btnorange " type="button" value="אופציות אשראי" onclick="openwrap2('','.option_ashray.container_pop')">
				<input class="mybtn btnorange " type="button" value="מחולל התשלומים" onclick="openwrap2('','.mecholel.container_pop')">
				<input class="mybtn btnblue " type="button" value="אישור" onclick="openwrap2('','.ashray.container_pop');get_val('.ashray_yadany_text','.ashray_text')">
			</div>
		</div>
		<div class="container_pop mecholel_amchaa display">
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
					<input  class="text mecholelsum_text zerofloat" style="margin-top: 10px;"/>
					<input  class="text" />
					<input  class="text" />
					<input  class="text" />
					<input  class="text" />
					<input  class="text" />
					<input  class="text" />
				</div>	
			</form>
			
			<div class="allbottom">
				<input class="mybtn btnlightgray " type="button" value="ביטול" onclick="openwrap2('','.amchaa.container_pop')">
				<input class="mybtn btnorange " type="button" value="אופציות אשראי" style="visibility: hidden">
				<!--<input class="mybtn btngreen " type="button" value="בדיקת המחאה" onclick="openwrap2('','.mecholel.container_pop')">-->
				<input class="mybtn btnorange " type="button" value="חולל" onclick="openwrap2('','.amchaa.container_pop');get_val('.mecholel_amchaa .mecholelsum_text','.ashray_yadany_text')">
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
					<input  class="text mecholelsum_text zerofloat" style="margin-top: 10px;"/>
					<input  class="text" />
					<input  class="text" />
					<input  class="text" />
					<input  class="text" />
					<input  class="text" />
					<input  class="text" />
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
				<input type="text" value="" class="text" />
				<div style="width:38%;margin-right: 2%;float:right">
					<p>תעודת זהות:</p>
					<p style="line-height: 19px;">3 ספרות אחרונות בגב הכרטיס:</p>
					<p>סוג מטבע:</p>
					<p>מספר אישור:</p>
				</div>
				<div style="width:60%;float:left">
					<input  class="text" />
					<input  class="text" />
					<select class="text">
						<option>שקל</option>
						<option>שטר</option>
					</select>
					<input  class="text" />
				</div>	
			</form>
			
			<input class="mybtn btnlightgray rightbottom" type="button" value="ביטול" onclick="openwrap2('','.ashray_yadany.container_pop')">
			<input class="mybtn btnblue leftbottom" type="button" value="אישור" onclick="openwrap2(''.'')">
		</div>
		<div class="container_pop shovar display">
			<h2 class="relative">תשלום שובר</h2>
			<h5>הוסף סכום:<span style="font-size: 100%;color: #fa6f58;">₪</span><span class="span_sum zerofloat"  style="color: #fa6f58;">{{itra}}</span></h5>
			<form class="amchaa_frm" style="width: 64%;margin: 0 auto;">
				<input type="text shovar_sum zerofloat" value="0.00" class="text" />
				<div style="width:30%;margin-right: 2%;float:right">
					<p>מספר שובר:</p>
				</div>
				<div style="width:60%;float:left">
					<input  class="text" name="shovar_num"/>
				</div>	
			</form>
			
			<div class="allbottom">
				<input class="mybtn btnlightgray " type="button" value="ביטול" onclick="openwrap2('','.type_pay.container_pop')">
				<input class="mybtn btnorange " type="button" value="אופציות אשראי" onclick="openwrap2('','.option_ashray.container_pop')">
				<input class="mybtn btnorange " type="button" value="מחולל התשלומים" onclick="openwrap2('','.mecholel.container_pop')">
				<input class="mybtn btnblue " type="button" value="אישור" onclick="openwrap2('','.type_pay.container_pop');" ng-click="payment.add_type('.shovar_sum','שובר')">
			</div>
		</div>
		<div class="container_pop akafa display">
			<h2 class="relative">תשלום בהקפה</h2>
			<h5>הוסף סכום:<span style="font-size: 100%;color: #fa6f58;">₪</span><span class="span_sum zerofloat"  style="color: #fa6f58;">{{itra}}</span></h5>
			<form class="amchaa_frm" style="width: 64%;margin: 0 auto;">
				<input type="text" value="0.00" class="text akafa_text zerofloat akafa_sum" />					
			</form>
			<p style="font-size: 224%;margin-top: 20px;margin-bottom: 10px;">העבר כרטיס לקוח</p>
			<input class="mybtn btnorange " type="button" value="חיפוש לקוח" style="width: 64%;"onclick="openwrap2('','.cust_search.container_pop')"> 
			<input class="mybtn btnlightgray rightbottom" type="button" value="ביטול" onclick="openwrap2('','.type_pay.container_pop')">
			<input class="mybtn btnblue leftbottom"  type="button" value="אישור" onclick="openwrap2('','.type_pay.container_pop');" ng-click="payment.add_type('.akafa_sum','הקפה')">
		</div>
		<div class="container_pop prifeyd display">
			<h2 class="relative">תשלום פריפייד</h2>
			<h5>הוסף סכום:<span style="font-size: 100%;color: #fa6f58;">₪</span><span class="span_sum zerofloat"  style="color: #fa6f58;">{{itra}}</span></h5>
			<form class="amchaa_frm" style="width: 64%;margin: 0 auto;">
				<input type="text" value="0.00" class="text zerofloat prepaid_sum" />					
			</form>
			<p style="font-size: 224%;margin-top: 20px;margin-bottom: 10px;">העבר כרטיס פריפייד</p>
			<input class="mybtn btnlightgray rightbottom" type="button" value="ביטול" onclick="openwrap2('','.type_pay.container_pop')">
			<input class="mybtn btnblue leftbottom" onclick="openwrap2('.add_worker.container_pop','.type_pay.container_pop')" ng-click="payment.add_type('.prepaid_sum','פריפייד')" type="button" value="לתשלום">
		</div>
	<div ng-controller="Client as clnt" style="height: 100%;">
		<div class="container_pop cust_search display" >
			<h2 class="relative">תשלום בהקפה</h2>
			<h5>הקלד שם לקוח:</h5>
			 <div angucomplete-alt id="cust_search" placeholder="חיפוש לקוחות" pause="100" selected-object="selectedClient" local-data="clients" search-fields="SupplierName,sortorder" title-field="SupplierName"  minlength="1" input-class="form-control form-control-small  my_search_auto" match-class="highlight" clear-selected="true">
			     </div> 
			<table class="workers_tb " style="  margin-top: 20px;display:none">
				<tr>
					 <th>שם לקוח</th>
				</tr>												
				<tr  ng-repeat="clients in filtered=(clients | filter: { ID: SearchClient.id }| limitTo: 5)">
					<td>{{clients.SupplierName}}</td>
				<tr>
			</table>
			<input class="mybtn btngray rightbottom" type="button" value="ביטול"  onclick="openwrap2('','.akafa.container_pop')">
			<input class="mybtn btnblue leftbottom" onclick="openwrap2('.add_worker.container_pop','.akafa2.container_pop')" type="button" value="אישור">
		</div>
		<div class="container_pop akafa2 display" >
			<h2 class="relative">תשלום בהקפה</h2>
			<h5>הוסף סכום:<span style="font-size: 100%;color: #fa6f58;">₪</span><span class="span_sum zerofloat"  style="color: #fa6f58;">{{itra}}</span></h5>
			<form class="amchaa_frm" style="width: 64%;margin: 0 auto;">
				<input type="text" value="0.00" class="text zerofloat akafa2_sum" />					
			</form>
			<p><span style="margin-left: 20px;">לקוח: {{CurrClient.SupplierName}}</span><span>מספר: {{CurrClient.id}}</span></p>
			<p><span style="margin-left: 20px;color: #fa6f58;">יתרת חוב: {{CurrClient.Hov}}</span><span>יתרת חוב מותרת: 1000</span></p>
			<input class="mybtn btnlightgray rightbottom" type="button" value="ביטול" onclick="openwrap2('','.cust_search.container_pop')">
			<input class="mybtn btnblue leftbottom" onclick="openwrap2('.add_worker.container_pop','.type_pay.container_pop')" type="button" value="לתשלום" ng-click="payment.add_type('.akafa2_sum','הקפה')">
		</div>
	
		<div class="container_pop akafa3 display">
			<h2 class="relative">תשלום בהקפה</h2>
			<h5>הוסף סכום:<span style="font-size: 100%;color: #fa6f58;">₪</span><span class="span_sum zerofloat"  style="color: #fa6f58;">{{itra}}</span></h5>
			<form class="amchaa_frm" style="width: 64%;margin: 0 auto;">
				<input type="text" value="0.00" class="text zerofloat" />					
			</form>
			<p style="font-size: 224%;width: 300px;margin: 0 auto;">סכום חורג מהמסגרת המותרת ללקוח.</p>
			<p style="font-size: 224%;margin-top: 20px;margin-bottom: 10px;">תשלום לא בוצע.</p>
			<input class="mybtn btnorange " type="button" value="אלץ עיסקה" style="width: 64%;"onclick="openwrap2('','.akafa.container_pop')"> 
			<input class="mybtn rightbottom btnlightgray " type="button" value="ביטול" onclick="openwrap2('','.akafa.container_pop')">
			<input class="mybtn btnblue leftbottom"  type="button" value="אישור" onclick="$( '.wrap' ).click();">
		</div>
	</div>
	</div>

  <div class="header" >
  	<i class="fa fa-bars"></i>
	<div class="inline full_s" onclick="full_screen(this)" style="width:47.5%;text-align: center;color: white;">למסך מלא<button onclick="interface.callFromJS()">JavaScript interface</button></div>
	<div class="inline relative" style="width:8%">
		<i class="left fa fa-user"></i>
		<i class="left fa fa-refresh"></i>
	</div>		
	<a href="top.php?t=clock&stock=<?=$stock?>">
	<i class=" fa fa-clock-o" ></i></a>
	<div class="stat inline">
		<label><?=$stockname?></label>
	</div>
	<div class="stat inline btn">
		<div class="openclose op <?if($stat!="open_cashbox")echo "display";?>">
			<i class="fa fa-check"></i>
			<span class=" stt open">פתוח</span>
		</div>	
		<div class="openclose cl <?if($stat=="open_cashbox")echo "display";?>">
			<i class="fa fa-times"></i>
			<span class="stt close">סגור</span>
		</div>	
	</div>
	
	<i class=" fa fa-cog"></i>
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

  <div class="mainarea">
  	<div ng-controller="CashProdController  as cash_prod">

		  	

  	<div class="right rightside" ng-controller="ProductController as prod">

  		<form class="search_form relative">

  			<input type="text" class="search_input"  ng-keydown="call_setTab(4)"  placeholder="חיפוש מוצר" ng-model="searchText.Title"/>
			<i class="fa fa-search" onclick=""></i>
  			<div class="relative submit_wrap">
  				<input type="button"  value=""/>
  				<i class="fa fa-tag"></i>				
				<i class="fa fa-plus"></i>
  			</div>
  			
  		</form>
  		<div >
  		<div class="rightcenter prod_area relative" ng-show="call_isSet(4)">
  			<div class="prod_div">
  			<div class="prod_title">
  				<p ng-click="call_setTab(1)" class="prod_btntop">למחלקות</p>
				<p id="cat_name" style="margin-right: 15%;">מוצרים</p>				
				<span id="num_product" style="float: left;margin-top: 11px;margin-left: 8px;color: white;">מס' הפריטים: {{filterprod.length}}</span>
			</div>			 		 
  			<div class="prod_container">
  				<div id="resizable" class="prod_row ui-widget-content"> 
  					
  					<div class="prod"  ng-repeat="cat2 in filterprod=(prod.products | filter: searchText) " >

  					<div  class=" first main_cat" id="button_cats_{{cat2.ID}}" ng-click="cash_prod.add_cart(cat2)">  						
  						<img src="images/main.jpg"></img>
						<p>{{cat2.Title}}</p>
  					</div> 					 
					</div>
    				</div>
  			</div>
  			</div>
  			<!--<img src="images/arrow_o.png" class="arrow_o"/>-->
  			
  		</div>

  		<div class="rightcenter prod_area relative" ng-show="call_isSet(1)">
  			<div class="prod_div">
  			<div class="prod_title">
				<p id="cat_name" style="margin-right: 15%;">מחלקות</p>				
				<span id="num_product" style="float: left;margin-top: 11px;margin-left: 8px;color: white;"></span>
			</div>			 		 
  			<div class="prod_container">
  				<div id="resizable" class="prod_row ui-widget-content"> 
  						
  					<div class="prod"  ng-repeat="cat in prod.catJson">
  					

  					<div  class=" first main_cat" id="button_cats_{{cat.ID}}" ng-click="prod.getCategory2(cat.ID,cat.Title)">  						
  						<script>
  						 	var curr_src="";
  							if(cat.picture!=""){
  								curr_src=target_image_dir+"/"+cat.picture;
  							}
  							else{
  								curr_src="images/main.jpg";
  							}
  						</script>
  						<img src="images/main.jpg"></img>
						<p>{{cat.CategoryName}}</p>
  					</div>
  					 <?php /*foreach ($category_array as $v): ?>
  					 	<div class="prod first main_cat" id="button_cats_<?php echo $v['ID'];?>" onclick="getCategory2(<?php echo "'$v[ID]','$v[Title]'";?>)">
  						<img src="<?php if($v['picture']!="")echo $target_image_dir."/".$v['picture'];else{echo "images/main.jpg";} ?>"></img>
						<p><?php echo $v['CategoryName']; ?></p>
  					</div>
  					  <?php endforeach;*/?>
			       <!--
  					<div class="prod first">
  						<img src="images/sample.png"/>
						<p>כאן יופיע שם המוצר</p>
  					</div>-->
					</div>
    				</div>
  			</div>
  			</div>
  			<!--<img src="images/arrow_o.png" class="arrow_o"/>-->
  			
  		</div>
  		<div class="rightcenter prod_area relative" ng-show="call_isSet(3)">
  			<div class="prod_div">
  			<div class="prod_title">
  				<p ng-click="call_setTab(1)" class="prod_btntop">למחלקות</p>
				<p id="cat_name" style="margin-right: 15%;">מוצרים</p>
				
				<span id="num_product" style="float: left;margin-top: 11px;margin-left: 8px;color: white;">מס' הפריטים: {{filtered.length}}</span>
			</div>			 		 
  			<div class="prod_container">
  				<div id="resizable" class="prod_row ui-widget-content"> 
  						
  					<div class="prod"  ng-repeat="cat2 in filtered=(prod.products | filter: { ProductGroup: prod.currgroup })" >

  					<div  class=" first main_cat" id="button_cats_{{cat2.ID}}" ng-click="cash_prod.add_cart(cat2)">  						
  						<img src="images/main.jpg"></img>
						<p>{{cat2.Title}}</p>
  					</div> 					 
					</div>
    				</div>
  			</div>
  			</div>
  			<!--<img src="images/arrow_o.png" class="arrow_o"/>-->
  			
  		</div>
  		
  		</div>
  		
		<div class="curr_btn" style="height: 40px;position: absolute;bottom: 19px;width: 39%;">
  				<input type="button" class="rightcenter_btn btngreen prod_btn" value="הוסף פריט כללי  / מזער פריסט"  ng-show="call_isSetMulti(1,3,4)"  ng-click="call_setTab(2)">
  				<input type="button" class="rightcenter_btn btnorange  calc_btn" value="מחלקות / מוצרים מהירים"  ng-show="call_isSet(2)"  ng-click="call_setTab(1)">
  			</div>
  		<div class="rightcenter calc_area"   ng-show="call_isSet(2)">
  			<div class="rightcenter calc_area" style="">
  			<form name="Calc">
		<table style="width:100%" border="0" cellpadding="0" cellspacing="0">
		<tbody><tr>
		<td class="input_result" style="height: 143.8px;">
		<input type="text" name="Input" style="width:98%;padding-right:2%;color:#42494f;height:92%">
		<br>
		</td>
		</tr>
		<tr>
		<td>
		<table class="inner_calc" style="direction: ltr;" border="0" cellpadding="0" cellspacing="0">
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
		<td rowspan="3" style="position: relative; height: 143.8px;"><div name="DoIt" class="result" onclick="Calc.Input.value = eval(Calc.Input.value);" ng-click="cash_prod.add_new_cart()"><i class="fa fa-check-circle"></i></div>
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
			 <div class="large-padded-row" style="  display: inline-block; width: 96%;">
			      <div angucomplete-alt id="cust_search" placeholder="חיפוש לקוחות" pause="100" selected-object="selectedClient" local-data="clients" search-fields="SupplierName,sortorder" title-field="SupplierName"  minlength="1" input-class="form-control form-control-small  my_search_auto" match-class="highlight" clear-selected="true">
			     </div> 
			     <i class="fa fa-search show"></i>
			</div>
			<div class="relative submit_wrap">
				<input type="button"  value="" class="search_cust_sbm" onclick=""/>
				<i class="fa fa-user"></i>
				<i class="fa fa-plus"></i>
			</div>
		</div>
  		<!--<form class="search_form search_cust_container relative" ng-controller="Client as client ">
  			<input type="text" class="search_input client_search show" placeholder="חיפוש לקוחות" value="" onkeydown="$('input[name=client_search_id]').val('');"/>
  			<input type="hidden" name="client_search_id" id="client_search_id"/>
			<i class="fa fa-search show"></i>
  			<div class="relative submit_wrap">
  				<input type="button"  value="" class="search_cust_sbm" onclick=""/>
  				<i class="fa fa-user"></i>
				<i class="fa fa-plus"></i>
  			</div>
  		</form>-->
  		
  			<div class="newrow2 find_cust_container display"><label class="lbl1 name">שם: {{SearchClient.SupplierName}}</label><span>|</span></span><label class="lbl2 border num">מספר: {{SearchClient.id}}</label>
  				<i class="fa fa-calendar" style="color: black;margin-right: 26px;"></i>
  				<label class="lbl1">ביקור אחרון: 25.06.2014</label><i class="fa fa-info-circle" style="margin-right: 18px;  color: #e65844;  color: #e65844;"></i></span><label class="lbl2 border yitrat_hov" style="padding-right: 5px;">יתרת חוב</label>
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
				  {{cashc.d}}
				  <tr class="active tr_{{cash_prd.BarCode}}" ng-repeat="cash_prd in cash_prod.products">		    
				  	<td class="border_table text_center"><i class="fa fa-info-circle"></i></td>		    
				  	<td><p style="height:40px;overflow: hidden;">{{cash_prd.Title}}</p></td>		    
				  	<td>{{cash_prd.SalePrice}}</td>		    
				  	<td class="text_center"><i class="fa fa-plus-circle" ng-click="cash_prod.plus_count(cash_prd.SalePrice,cash_prd.BarCode)"></i><p style="display: inline-block;width:60px;text-align:center;">{{cash_prd.Amount}}</p><i class="fa fa-minus-circle" ng-click="cash_prod.minus_count(cash_prd.SalePrice,cash_prd.BarCode);"></i></td>
				  	<td><i class="fa fa-tag" onclick="anacha_prod(cash_prd.BarCode)"></i></td>		    
				  	<td class="border_table padding_5 sum_p_l">{{cash_prd.SalePrice*cash_prd.Amount}}</td>		    
				  	<td class="border_table text_center"><i class="fa fa-times" ng-click="cash_prod.remove_cart(cash_prd.BarCode);"></i></td> 		  
				  </tr>
				  
				  
  			</table>
  		</div>
  		<img src="images/zigzag.png" class="bordr_wave"/>
		<div class="abso">
  		<div class="sum_area">
  			<div class="right inline">
  				<div class="newrow1"><label class="block"><i class="fa fa-pencil"></i>הוסף הערה</label></div>
  				<div class="newrow2"><label class="lbl1">סה"כ פריטים: <span id="total_prod">{{cash_prod.products.length}}</span></label></div>
  				<!--<div class="newrow2"><label class="lbl1">שם: יהב כהן</label><span>|</span></span><label class="lbl2 border">מספר: 159</label>
				<label class="lbl3">ביקור אחרון: 25.6.2014</label>
				</div>
  				<div class="newrow3"><label>יתרת חוב: </label><label >  ₪</label><label id=before_tax style="font-size: 150%;"></label></div>-->
  			</div>
  			<div class="left inline">
  				<div class="newrow1"><label class="block"></label></div>
  				<div class="newrow2">
  					<div style="width: 100%;height: 26px;font-size: 130%;"><label class="right">סכום ביניים:</label><label class="left in_sum zerofloat">{{amount_out|number}}</label><label class="left">₪</label></div>
  					<div style="width: 100%;height: 26px;font-size: 130%;"><label class="right">18% מע"מ:</label><label class="left tax_sum zerofloat">{{amount_maam|number}}</label><label class="left">₪</label></div>
  						
  				  				
  				<div class="newrow3"><label class="finall_price zerofloat">{{amount|number}}</label><span class="curr">₪</span></div>
  				
  			</div>
  			
  		</div>
  		<div style="clear: both;"></div>
  		<div class="peulot" style="font-size: 120%;" >
  			<button  value=""  ng-click="cashc.call_clean()" class="trash"><i class="fa fa-trash-o"></i></button>
  			<input type="button"  value="הנחה" class="anacha"/>
  			<input type="button" class="pause"  value="השהייה"/>
  			<input type="button" class="hachlafa"  value="פ. החלפה"/>
  			<input type="button" onclick="refund=1;zicuy()"  value="זיכוי"/>
  			<input type="button"  value="לתשלום" class="pay" ng-controller="PaymentController  as payment" ng-click="call_setTab(2);payment.start_pay()"/>
  			
  		</div>
		</div>
  	</div>
  </div>
  </div>
  </div>
  <div class="clear"></div>
<style type="text/css" media="screen">
	.ui-widget-content.ng-scope{
		display: inline-block;
	}
</style>
  </body>
</html>