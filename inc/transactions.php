<?php
include "conn.inc";
function updateStock($listingID,$stockid,$soldquantity,$IsRefund,$JournalNum,$TranNum,$TDate)
{

   // global $conn, $workmode, $updateQtyFromPludata;

    $sign = ($IsRefund=="1")?"+":"-";
    if (1==0)
    {
        $sql = "UPDATE listingsDB set Quantity = Quantity $sign $soldquantity where ID = $listingID ";
        DBQuery($sql);
    }
    elseif (1==1)
    {	
        $psql = "select id,Quantity from listingsStocksElements where listingID = $listingID and stockID = $stockid";
        $lse = mysql_query($psql);
		$num_rows = mysql_num_rows($result);
		$lse=mysql_fetch_array($lse);
        //$oldQuantity = $lse["Quantity"];;		
        if ($lse->EOF||$num_rows==0)
        {

            $sql = "INSERT INTO listingsStocksElements (ListingID, StockID, Quantity, LatestSyncQuantity,LatestSyncDate) VALUES
			($listingID, $stockid, 0, 0, UNIX_TIMESTAMP())";
            mysql_query($sql);
			
        }

        $sql = "UPDATE listingsStocksElements set LatestSyncDate = unix_timestamp(), LatestSyncQuantity = Quantity $sign $soldquantity, Quantity = Quantity $sign $soldquantity where listingID = $listingID and stockID = $stockid";
        
        mysql_query($sql);
		$sql = "select is_tree from listingsDB where  ID = $listingID";
		$r=mysql_query($sql);
		$r=mysql_fetch_array($r);
		if($r['is_tree']){
			$components = mysql_query("select listing_id,quantity from listings_tree where master_id =$listingID");
			while ($component=mysql_fetch_array($components))
					{
												
						$sql = "select id as lseid from listingsStocksElements where stockID = $stockid and listingid = ".$component["listing_id"];
						//echo $sql."<hr>";
						$rsu = mysql_query($sql); 
						$rsu=mysql_fetch_array($rsu);
						if (!$rsu->EOF){
							$sql = "update listingsStocksElements set quantity = ifnull(quantity,0) - ".$quantity*$component["quantity"]." where id = ".$rsu["lseid"];
						}
						else{
							$sql = "insert into listingsStocksElements (ListingID,stockID,Quantity) values(".$rsu["lseid"].",$stockid,-".$quantity*$component["quantity"].")";
						}		
						//echo $sql."<hr>";
						$res = mysql_query($sql); 
					}
		}
        $lse = mysql_query($psql);
        $lse=mysql_fetch_array($lse);
        $newQuantity = $lse["Quantity"];
        if (floatval($oldQuantity)!=floatval($newQuantity))
        {
            $chn = $JournalNum."0".$TranNum;
            $sql = "insert into history (timestamp,datetime,type,listing_id,quantity_from,quantity_to,note,stock_id_from,stock_id_to) values
			(unix_timestamp(),'$TDate','adjustment',$listingID,'".$oldQuantity."','".$newQuantity."','מכירת קופה #$chn',$stockid,$stockid)";
			echo "---kkk-$sql";
            mysql_query($sql);
        }
    }
}



		//$userID2
		//$username2
		$termID = $_REQUEST[stock];
		//$stockid=1313;
		$sql="select ID from vcx_weberp.listingsStocks where user_ID='$userID' and TerminalId='$termID'";
		echo $sql;
		$result=mysql_query($sql);
		$row=mysql_fetch_array($result);
		$stockid=$row[ID];
		
		//echo "mmm$sql";
		$JournalNum=$_REQUEST[journal];
		if(isset($_REQUEST[journal_id])){
			$journal_id=$_REQUEST[journal_id];
		}
		foreach(array('user' => "../../../../officefiles/$username",'POS' => "../../../../officefiles/$username/POS", 'terminal' => "../../../../officefiles/$username/POS/".$termID,
		 'terminal backup' => "../../../../officefiles/$username/POS/".$termID."/backup") as $key => $val){
			if (!file_exists($val)){
				//xml_report('No '.$key.' directory found. Trying to create...........');
				if (@mkdir($val,0777))
					echo ('Done.');
				else {
					echo('FAIL!');
					//throw new Exception("\nFile processing halted.");
				}
				chmod($val,0777);
			} 
				//xml_report("Found ".$key." directory.");
		} 
		file_put_contents("../../../../officefiles/$username/POS/$termID/backup/".date("dmY-His")."-".rand(0,1000).".log",$_REQUEST[trans]);
		echo "fffffffffff../../../../officefiles/$username/POS/$termID/backup/".date("dmY-His").".logfffffffffffffffffffff";
		echo "<hr>";
		//file_put_contents("feigy.log", $_REQUEST['trans']);
		$trans=json_decode($_REQUEST[trans]);
		
		$transCnt=0;
		//print_r($trans); 
		
		/*$sql = "INSERT INTO `transactionpackages`(`stock_id`, `TerminalID`, `TransVersion`, `PluVersion`, `JournalNum`, `TransCount`, `JournalDate`, `JournalQuestion`, `DateTimeStamp`)
						    		VALUES($stockid, '$termID', '100', '1', '$JournalNum', 0, '0000-00-00 00:00:00', '', UNIX_TIMESTAMP()) ";
		mysql_query($sql);
		echo mysql_error();*/
/*sk 03/07/2016 dont save ashray transactions twice*/
$offline= isset($_REQUEST['offline'])? $_REQUEST['offline']:0;
$ashray_offline==0;	
foreach ($trans as $key => $tran) {
		if($offline==1){
		foreach($tran->payments as $key => $payment){
		switch($key){
			case 'Credit': case 'credit':
			foreach ($payment as $credit) {
				file_put_contents('offline_tran/offline_tran'.date('Y-m-d_H:i:s').'txt',json_encode($_REQUEST[trans]) );
				$ashray_offline=1;
				break;
			}
			break;
			}
		}
	}
	if($ashray_offline==1){
	//file_put_contents('000continue.txt', $ashray_offline);	
		continue;
	}
	
	$comp_cnt=0;
	$customerid=($tran->SearchClient->ID)?$tran->SearchClient->ID:0;
	$customerid2=($tran->SearchClient->ClientNum)?$tran->SearchClient->ClientNum:0;	
	echo 'ClientNum: ' . $customerid2;
	//echo "customerid $customerid2";
	$IsRefund   = ($tran->finalamount >= 0) ? 0 : 1;			// RefundMode = 2  <-- shovar ahlafa
	$refundKey  = ($tran->finalamount >= 0) ? 1 : -1;
	$RefundMode = 0;
	$cash_kupanum2=($tran->cash_kupanum)?$tran->cash_kupanum:0;
	$cash_kupanum=($tran->cash_kupanum)?$tran->cash_kupanum:0;
	$discountperc=($tran->discountperc)?$tran->discountperc:0;
	$discountamount=($tran->discountamount)?$tran->discountamount:0;
	$IsDebtPay  = ($tran->transtype > 0) ? 1 : 0;
	//echo "is debt pay $IsDebtPay";
	$finalamount=(round($tran->finalamount * $refundKey,2));
	$firstamount=(round($tran->firstamount * $refundKey,2));
	$charge=(floatval($tran->change))?floatval($tran->change):0;
	$cashierid=(intval($tran->cashierid))?intval($tran->cashierid):0;
	$cash_kupanum=substr($cash_kupanum,-4);
	/*sk 08/12 get current time from server*/
	$t_date=date("Y-m-d", strtotime($tran->date));
	$t_date1=date("Y-m-d");
	$t_time=date("H:i:s");
	//echo $t_date."    ".$tran->date;
	$comp_cnt=count($tran->products);
	$pay_cnt=count($tran->payments);
	if($tran->discounttype==1){
		$discountperc=$discountperc;
		$discountamount=0;
	}
	else{
		$discountamount=$discountperc;
		$discountperc=0;		
	}
	
	$group_discount=0;
	$group_cash_discount=0;
	if($tran->type_group_discount==1){
		$group_cash_discount=$tran->group_discount;
	}
	else if($tran->type_group_discount==2){ 
		$group_discount=$tran->group_discount;
	}
	//*sk 20/03/16 dont saveransaction twice*/
   $sql="select `ID` from `transactions` where `package_id`=".$journal_id." and  `TranNum`=".$cash_kupanum." and `stock_id`=".$stockid;
   $result1=mysql_query($sql);
    $num_row= mysql_num_rows($result1);
	$row=mysql_fetch_array($result1);
	if($num_row==0){
	/*sk 08/12 get current date and time from server*/
    /* $sql = "INSERT INTO `transactions`(`package_id`, `stock_id`,`CompCount`,PaymntCount, `TranNum`,  `TranDiscount`, `TranCashDiscount`,  `GroupDiscount`, `GroupCashDiscount`, `TranAmount`,`TranAmountAll`,  `tChange`, `TranDate`, `TranTime`, `IsRefund`, `user_id`, `vat`, `IsDebtPayment`,  `CashierNum`, `ClubDealFlag`, `CustID`, `RefundMode`,`comment`)
			VALUES (".$journal_id.",".$stockid.", $comp_cnt,$pay_cnt,'".$cash_kupanum."', ' ".$discountperc."', ".$discountamount.", ' ".$group_discount."',' ".$group_cash_discount."', ".$firstamount.", ".$finalamount.", ".$charge.", '".$t_date."','".$tran->time."',
			 ".$IsRefund.", ".$userID.",".$tran->vat.", ".$IsDebtPay.",".$cashierid.", 0, '".$customerid2."', 0,'".$tran->comment."')";*/
   
   $sql="CREATE TABLE IF NOT EXISTS `using_clients_points` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `client_id` int(11) NOT NULL,  
  `transction_id` int(11) NULL,
  `points` float NOT NULL,
  
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;";

   //$sql = "ALTER TABLE transactions ADD COLUMN IF NOT EXISTS points decimal(15,2) DEFAULT 0";
   mysql_query($sql);
   
   $points = 0;
   $sql="CREATE TABLE IF NOT EXISTS `clients_points` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `client_id` int(11) NOT NULL, 
  `from_sum` int(11) NOT NULL,
  `to_sum` int(11) NOT NULL,
  `points` float NOT NULL,
  `percent_nis` varchar(7) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;";
	mysql_query($sql);
   $sql = "select * from clients_points where client_id = ".$customerid2." or client_id = 999999 and from_sum < ".$finalamount." and to_sum > ".$finalamount." order by client_id , from_sum desc";
	//file_put_contents("point_client.log", $sql);
	$result= mysql_query($sql);
	
	if($result){
		$row = mysql_fetch_array($result);
		if($row['percent_nis']=="nis"){
			$points=$row['points'];
		}
		else{
			$points=(float)$row['points']*(float)$finalamount/100.0;
		}
	}
	$sql = "INSERT INTO `transactions`(`package_id`, `stock_id`,`CompCount`,PaymntCount, `TranNum`,  `TranDiscount`, `TranCashDiscount`,  `GroupDiscount`, `GroupCashDiscount`, `TranAmount`,`TranAmountAll`,  `tChange`, `TranDate`, `TranTime`, `IsRefund`, `user_id`, `vat`, `IsDebtPayment`,  `CashierNum`, `ClubDealFlag`, `CustID`, `CustMizdamenName`, `CustMizdamenPhone`, `CustMizdamenCar`, `RefundMode`,`comment`)
			VALUES (".$journal_id.",".$stockid.", $comp_cnt,$pay_cnt,'".$cash_kupanum."', ' ".$discountperc."', ".$discountamount.", ' ".$group_discount."',' ".$group_cash_discount."', ".$firstamount.", ".$finalamount.", ".$charge.", '".$t_date."','".$tran->time."',
			 ".$IsRefund.", ".$userID.",".$tran->vat.", ".$IsDebtPay.",".$cashierid.", 0, '".$customerid2."', '".$tran->customer_m_name."', '".$tran->customer_m_phone."', '".$tran->customer_m_car."', 0,'".$tran->comment."')";
	
	echo "trannnnnnnn".$sql;
	mysql_query($sql);
	
	$transid=mysql_insert_id();
	
	//echo $sql;
	echo mysql_error();
	if($points!=0){
		$sql = "INSERT INTO using_clients_points (`client_id` ,`transction_id` , `points`) VALUES ($customerid2,$transid,$points)" ;
		mysql_query($sql);
		file_put_contents("using_clients_points.log", $sql.mysql_error());
	}
	if($tran->prepaid2==1){
		$sql="SELECT * FROM  `listingsDB` WHERE  `BarCode` LIKE  '0000'";
		$result=mysql_query($sql);
		$row=mysql_fetch_array($result);

		$sql = "INSERT INTO `transactioncomponents`(trans_id, CompAmount, CompCashDiscount, CompDiscount, CompCashGroupDiscount, CompGroupDiscount, PluCode, StockAmount, DepartmentFlag, DepartmentNum,listing_id)
											VALUES(".$transid.",".$tran->finalamount.",0,0,0,0 ,'0000',".$tran->finalamount.",0,0,".$row[ID].")";			

		mysql_query($sql);
		$compid=mysql_insert_id();
		$comp_cnt++;
		if(mysql_error()){
			echo $sql;
		}
		$sql = "INSERT INTO `transactioncomponents_xml`(`ComponentID`, `Code`, `Description`, `Department`,  `CFirstAmount`
			, `CMiddleAmount`, `CFinalAmount`, `CQuantity`, `CDiscType`, `CAmountDiscount`, `CPercDiscount`, `ItemDiscount`
			, `DeprtDiscount`, `SQuantity`, `SAmount`, `SPerc`, `SDesc`, `CDetails`)
		VALUES(".$compid.",'0000','".$row['Title']."','0',  ".$tran->finalamount."
			, ".$tran->finalamount.", ".$tran->finalamount.", 1, 0, 0, 0,0.00
			, 0, 0, 0, 0, NULL, '')";
			mysql_query($sql);
			//file_put_contents("feigy.log", $sql);
			//echo $sql;
			echo mysql_error();
			if(mysql_error()){
				echo $sql;
			}
			updateStock($row[ID],$stockid,1,0,$journal_id,$cash_kupanum,$t_date);
	}
				$sql = "
CREATE TABLE IF NOT EXISTS `transactioncomponents_xml` (
  `CID` mediumint(8) unsigned NOT NULL AUTO_INCREMENT,
  `ComponentID` mediumint(8) unsigned NOT NULL DEFAULT '0',
  `Code` varchar(15) DEFAULT NULL,
  `Description` varchar(255) DEFAULT NULL,
  `Department` mediumint(8) unsigned NOT NULL DEFAULT '0',
  `CompType` tinyint(3) unsigned NOT NULL DEFAULT '0',
  `CFirstAmount` float NOT NULL DEFAULT '0',
  `CMiddleAmount` float NOT NULL DEFAULT '0',
  `CFinalAmount` float NOT NULL DEFAULT '0',
  `CQuantity` decimal(12,2) unsigned NOT NULL DEFAULT '0.00',
  `CDiscType` tinyint(3) unsigned NOT NULL DEFAULT '0',
  `CAmountDiscount` float NOT NULL DEFAULT '0',
  `CPercDiscount` float NOT NULL DEFAULT '0',
  `ItemDiscount` float NOT NULL DEFAULT '0',
  `DeprtDiscount` float NOT NULL DEFAULT '0',
  `SQuantity` float NOT NULL DEFAULT '0',
  `SAmount` float NOT NULL DEFAULT '0',
  `SPerc` float NOT NULL DEFAULT '0',
  `SDesc` varchar(255) DEFAULT NULL,
  `CDetails` text,
  `CRemark` text,
  PRIMARY KEY (`CID`),
  KEY `ComponentID` (`ComponentID`)
) ENGINE=MyISAM  DEFAULT CHARSET=hebrew AUTO_INCREMENT=1 ";	
mysql_query($sql);
	foreach ($tran->products as $key => $comp) {
		/*  lc 06/06/2016 moadon
		       $CompGroupDiscount=$group_discount;
		       if($comp->Discount>0){
		         	$CompGroupDiscount=0;
		             }
		*/
		if($comp->category > 0){
		    if($comp->category == "9999"){
		        $sql = "select 1 as exist from listingsCategories where ID = 9999";
		        $result = mysql_query($sql);
                $row = mysql_fetch_array($result);
                if($row['exist'] != 1){
                    $sql = "INSERT INTO `listingsCategories`(`ID`, `CategoryName`, `SortOrder`, `Status`, `eStatus`, `user_ID`, 
                    `parent_id`, `station_id`) 
                    VALUES (9999,'טיפים', 0,1,0,'$userID', 0, 0)";
                    mysql_query($sql);
                    
                    //file_put_contents("tip.log", $sql);
                }
		    }
			$sql="select ID from listingsDB where ProductGroup = ".$comp->category." and title = '".$comp->Title."'";
			$result = mysql_query($sql);
			$row = mysql_fetch_array($result);
			if(!$row['ID']){
				$sql = "INSERT INTO listingsDB (title, export,  user_ID, active, creation_date,   lastinserted, synccatalog,ProductGroup,SalePrice)
                    VALUES ('".$comp->Title."',0,   '$userID', 'no', ".date("Y-m-d").",unix_timestamp(), 0,".$comp->category.",0)";
                mysql_query($sql);
                $comp->ID = mysql_insert_id();
            }
			else{
				$comp->ID = $row['ID'];
			}
		}
		if($comp->cdisctype==2){
			$sql = "INSERT INTO `transactioncomponents`(trans_id, CompAmount, CompCashDiscount, CompDiscount,CompCashGroupDiscount, CompGroupDiscount, PluCode, StockAmount, DepartmentFlag, DepartmentNum,listing_id)
											VALUES(".$transid.",".round($comp->SalePrice * $comp->Amount,2).",".$comp->Discount.",0, ' ".$group_cash_discount."',' ".$group_discount."', '".$comp->BarCode."',".$comp->Amount.",0,'".$comp->department."',".$comp->ID.")";			
		}
		else{	$sql = "INSERT INTO `transactioncomponents`(trans_id, CompAmount, CompCashDiscount, CompDiscount,CompCashGroupDiscount, CompGroupDiscount, PluCode, StockAmount, DepartmentFlag, DepartmentNum,listing_id)
											VALUES(".$transid.",".round($comp->SalePrice * $comp->Amount,2).",0,".$comp->Discount2.", ' ".$group_cash_discount."',' ".$group_discount."', '".$comp->BarCode."',".$comp->Amount.",0,'".$comp->department."',".$comp->ID.")"; //lc 06/062016 change paramter num 6 from $group_discount to $CompGroupDiscount 
							
		}	
		echo $sql;
		$amo=$comp->Amount;										
		mysql_query($sql);
		if(mysql_error()){
			echo $sql;
			echo mysql_error();
		}
		//echo $sql;
		$compid=mysql_insert_id();
		$comp_cnt++;
		
		if($comp->cdisctype!=0){
			$cdisctype=(intval($comp->cdisctype)==2)?1:2;
		}
		else{
			$cdisctype=0;
		}
		$discperc=round(floatval($comp->discountperc),2);
		if($cdisctype==2){
			$discperc=round(floatval($comp->discountperc),2);
			$discperc=$discperc/$comp->SalePrice*100;
		}
		if($comp->finalamount==0){
			$comp->finalamount=$comp->SalePrice;
		}
		$sql = "INSERT INTO `transactioncomponents_xml`(`ComponentID`, `Code`, `Description`, `Department`, `CompType`, `CFirstAmount`
			, `CMiddleAmount`, `CFinalAmount`, `CQuantity`, `CDiscType`, `CAmountDiscount`, `CPercDiscount`, `ItemDiscount`
			, `DeprtDiscount`, `SQuantity`, `SAmount`, `SPerc`, `SDesc`, `CDetails`)
		VALUES(".$compid.",'".$comp->BarCode."','".mysql_real_escape_string($comp->Title)."','".$comp->department."', ".intval($comp->comptype).", ".round(floatval($comp->SalePrice),2)."
			, ".round(floatval($comp->SalePrice),2).", ".round(floatval($comp->finalamount),2)*floatval($comp->Amount).", ".floatval($comp->Amount).", ".$cdisctype.", ".round(floatval($comp->discountamount),2).", ".$discperc.",0.00
			, 0, 0, 0, 0, NULL, '".mysql_real_escape_string($comp->comment)."')";
			mysql_query($sql);
			//file_put_contents("feigy.log", $sql);
			//echo $sql;
			echo mysql_error();
			if(mysql_error()){
				echo $sql;
			}
            $refund_product = ( $comp->SalePrice < 0 )?1:0;
			updateStock($comp->ID,$stockid,$amo,$refund_product,$journal_id,$cash_kupanum,$t_date);
	}

	foreach($tran->payments as $key => $payment){
		//print_r($tran->payments);
		echo $key;
		switch($key){
			
			case 'RefundVoucher': 
			case 'refundvoucher':			
			case 'shovarzicuy':
				echo "-----$key-------";
				echo "mmmm";
				foreach ($payment as $refundvoucher) {
					echo "".$refundvoucher->amount;
					if($refundvoucher->amount!=0){
						
						$paytot += $paysum = $refundvoucher->amount;
						$coupon_sum=($refundKey < 0) ? abs($paysum) : $paysum;
						$pay2=$paysum;
						if($pay2>0){
							$voucher_used=1;
						}
						else{
							$voucher_used="NULL";
						}
						$sql = "INSERT INTO `transactionpayments`(`trans_id`, `PaymID`, `CouponSum`, `CouponNumber`,IsRefundVoucher ,voucher_used)
						VALUES ($transid,3,$pay2,'".$refundvoucher->shovarzicuy_num."',1,$voucher_used)";
						
						mysql_query($sql);
						echo mysql_error();
						if(mysql_error()){
							echo $sql;
						}
						$paytot += $paysum = $refundvoucher->refundvoucheramount;
						if ($paytot==''||$paytot < 0){					// if it's refund transaction
							$tranup .= ', `RefundMode` = 1';				// setting it to "petek zikui"
							$sql = "UPDATE `transactions` SET `RefundMode` = 1  WHERE `ID` = $transid";
							//echo $sql;
							mysql_query($sql);
							echo mysql_error();
							$item=$cash_kupanum2;
							
							//$sql = "UPDATE `transactionpayments` SET `CouponNumber`='$item' WHERE `trans_id` = $transid";
							
							//mysql_query($sql);
							echo mysql_error();
						}
					}
				}	
				
				
			break;
			
case 'points':
	echo "-----$key-------";
				echo "mmmm";
				foreach ($payment as $pointpayments) {
					//echo "".$refundvoucher->amount;
					if($pointpayments->amount!=0){
						
						$paytot += $paysum = $pointpayments->amount;
						$points_sum=($refundKey < 0) ? abs($paysum) : $paysum;
						$pay2=$paysum;
						
						$sql = "INSERT INTO `transactionpayments`(`trans_id`, `PaymID`, `CashSum`, `CustID`,`CouponSum`)
						VALUES ($transid,11,$pay2,$customerid2,$pointpayments->points)";
						
						mysql_query($sql);
						echo mysql_error();
						if(mysql_error()){
							echo $sql;
						}
						$sql = "INSERT INTO `using_clients_points`( `client_id`, `transction_id`, `points`) VALUES ($customerid2,$transid,".-1*$pointpayments->points.")";
						mysql_query($sql);
						echo mysql_error();
						if(mysql_error()){
							echo $sql;
						}
					}
				}	
				
	break;
			case 'Cash': case 'cash':
			echo "-----$key-------";
				foreach ($payment as $cash) {
					echo "ggggjj".$cash->amount;
					$paytot += $paysum = $cash->amount;
					if($cash->amount!=0){
						$sql = "INSERT INTO `transactionpayments`(`trans_id`, `PaymID`, `CashSum`)
							VALUES($transid,1,".abs($cash->amount).")";
						mysql_query($sql);
						echo mysql_error();
						if(mysql_error()){
							echo $sql;
						}
						
					}
				}
				 
			break;
			
			case 'Cheque': case 'cheque':
				echo "-----$key-------";
			foreach ($payment as $cheque) {
				$paytot += $paysum = $cheque->amount;
					if($cheque->amount!=0){
						if ($cheque->chequepaymentdate && strlen($cheque->chequepaymentdate) == 6){
							// if date in format DDMMYY
							$date = '20'.implode('-',array_reverse(str_split($cheque->chequepaymentdate,2))).' 00:00:00';			// PayDate
						}		
						elseif (!$cheque->chequepaymentdate || !strlen($cheque->chequepaymentdate))		// if no date
							$date = '0000-00-00 00:00:00';			// PayDate
						else 																		// in any other case
							$date = $cheque->chequepaymentdate ? $cheque->chequepaymentdate : '0000-00-00 00:00:00';	
						$sql = "INSERT INTO `transactionpayments`(`trans_id`, `PaymID`, `CashSum`, `ChequeSum`, `FullData`, `ChequeNumber`, `PayDate`, `BankNo`, `BankDeptNo`, `BankCntNo`)
						VALUES($transid,2,0,'$cheque->amount',".floatval($cheque->chequepaymentdate && $cheque->chequebanknumber && $cheque->chequebranch && $cheque->chequeaccountnumber).",'$cheque->chequenumber','$date','$cheque->chequebanknumber','$cheque->chequebranch','$cheque->chequeaccountnumber')";
						echo "<!--Cheque-->";
						mysql_query($sql);
						echo mysql_error();
						if(mysql_error()){
							echo $sql;
						}
						$sql="update  vcx_$username.listingsSuppliers set BankNo='$cheque->chequebanknumber',BankDeptNo='$cheque->chequebranch',BankCntNo='$cheque->chequeaccountnumber' where ID='$_REQUEST[cust]'";
						 mysql_query($sql);
						 echo mysql_error();
					}
				}				
				
			break;
			
			case 'Credit': case 'credit':
				echo "-----$key-------";
				foreach ($payment as $credit) {
						$paytot += $paysum = $credit->amount;
					$ashray_numcard=substr($credit->ashray_numcard,-4);
					if($credit->amount!=0){
						$first_payment=($credit->mecholel_firstsum>0)?$credit->mecholel_firstsum:$credit->amount;
						$other_payment=$first_payment;
						if($credit->pay_num>0){
							$ashray_tashlumim=$credit->pay_num;
							if($obj->pay_first>0){
								$first_payment=$credit->pay_first;
								$other_payment=($credit->amount-$first_payment)/($ashray_tashlumim-1);
							}else{								
								$other_payment=($credit->amount-$first_payment)/($ashray_tashlumim);
								$first_payment=$other_payment;
							}
						}
						
						else{
							$ashray_tashlumim=$credit->ashray_tashlumim;
						}
						$first_payment=round($first_payment,2);
						$other_payment=round($other_payment,2);
						switch ($credit->clearinghouseCompany) {
							case 'ISRACARD':
								$CompanyNum=1;
								break;
							case 'VISA_CAL':
								$CompanyNum=2;
								break;
							case 'DINERS':
								$CompanyNum=3;
								break;
							case 'AMEX':
								$CompanyNum=4;
								break;
							case 'JCB':
								$CompanyNum=5;
								break;
							case 'LEUMICARD':
								$CompanyNum=6;
								break;							
							default:
								$CompanyNum=0;
								break;
						}
	
						//$CompanyNum=(intval($obj->creditbrand) > 6) ? 0 : $obj->CreditBrand;
						//include "../../ipay.php";
						//$ipay=new ipay();
						//$r=$ipay->transaction($credit->ashray_numcard,$credit->ashray_tokef,$credit->amount,$credit->ashray_cvv);
						//file_put_contents("payment.log", json_decode($r));
						$sql = "INSERT INTO `transactionpayments`(`trans_id`, `PaymID`, `CreditCardSum`, `FirstPayment`, `OtherPayment`, `CardNum`,  `CompanyNum`, `NumPayments`, `AuthorizCode`,  `AuthorizNo`,`ExpDate`)
						VALUES ($transid,5,".abs($credit->amount).",'$first_payment','$other_payment','$ashray_numcard','$CompanyNum','$ashray_tashlumim',".$credit->approvalNumber.",0,'".$credit->ashray_tokef."')";
						//file_put_contents("payment2.log", $sql);
						echo "<!--pay$sql-->";
						mysql_query($sql);
						echo mysql_error();
						if(mysql_error()){
							echo $sql;
						}
					}
				}
			
			break;
			
			case 'Voucher': case 'voucher':case 'shovar':
				echo "-----$key-------";
				foreach ($payment as $voucher) {
					$paytot += $paysum = $voucher->amount;
					if($voucher->amount!=0){
						// `FrnCurrSum`, `TCourse`, `CurrencyID`, `IsInShekels`, `CreditCardSum`, `FirstPayment`, `OtherPayment`, `CardNum`, `ExpDate`, `CreditTerms`, `CompanyNum`, `NumPayments`, `TranCode`, `TranType`, `AuthorizCode`, `Currency`, `AuthorizNo`, `Deposited`, `Track2`, `Track2Len`, `FileNum`, `CTransCount`, `ComReason`, `CochavAmount`, `HakafaSum`, `CustID`, `ClubCode`, `IsRefundVoucher`, `IsChangingVoucher`
						$sql = "INSERT INTO `transactionpayments`(`trans_id`, `PaymID`, `CouponSum`, `CouponNumber`)
						VALUES ($transid,3,$voucher->amount,'$voucher->shovar_num')";
						
						mysql_query($sql);
						echo mysql_error();
						if(mysql_error()){
							echo $sql;
						}
					}
				}				
			break;
			
			case 'RefundVoucher': case 'refundvoucher': case 'shovarzicuy':
				echo "-----$key-------";
				echo "mmmm";
				foreach ($payment as $refundvoucher) {
					echo "gggg".$refundvoucher->amount;
					if($refundvoucher->amount!=0){
						
						$paytot += $paysum = $refundvoucher->amount;
						$coupon_sum=($refundKey < 0) ? abs($paysum) : $paysum;
						$pay2=$paysum;
						
						$sql = "INSERT INTO `transactionpayments`(`trans_id`, `PaymID`, `CouponSum`, `CouponNumber`,IsRefundVoucher )
						VALUES ($transid,3,$pay2,'$refundvoucher->shovarzicuy_num',1)";
						//echo $sql;
						mysql_query($sql);
						echo mysql_error();
						if(mysql_error()){
							echo $sql;
						}
						$paytot += $paysum = $refundvoucher->refundvoucheramount;
						if ($paytot==''||$paytot < 0){					// if it's refund transaction
							$tranup .= ', `RefundMode` = 1';				// setting it to "petek zikui"
							$sql = "UPDATE `transactions` SET `RefundMode` = 1  WHERE `ID` = $transid";
							//echo $sql;
							mysql_query($sql);
							echo mysql_error();
							$item=$cash_kupanum2;
							
							//$sql = "UPDATE `transactionpayments` SET `CouponNumber`='$item' WHERE `trans_id` = $transid";
							
							//mysql_query($sql);
							echo mysql_error();
						}
					}
				}	
				
				
			break;
			
			case 'Hakafa': case 'hakafa': case 'akafa':
				foreach ($payment as $hakafa) {
					$paytot += $paysum = $hakafa->amount;
					if($hakafa->amount!=0){
						$sql = "INSERT INTO `transactionpayments`(`trans_id`, `PaymID`,`HakafaSum`, `CustID`)
						VALUES ($transid,7,abs($hakafa->amount),$customerid2)";
						echo "<!--hhh$sql-->";
						mysql_query($sql);					
						echo mysql_error();
					
						if(mysql_error()){
							echo $sql;
						}
						$paytot += $paysum = $refundvoucher->refundvoucheramount;
						$sql = "UPDATE `listingsSuppliers` SET `CreditBalance` = ROUND(`CreditBalance` - ".round(floatval($hakafa->amount),2).",2) WHERE `isClient` = 1 AND `Status` = 1 AND `ID` = '".$customerid."'";
						echo "balance22 $sql";
						mysql_query($sql);
						echo mysql_error();
						if(mysql_error()){
							echo $sql;
						}
						if ($refundKey < 0 && $paysum < 0)					// if it's refund transaction
							$tranup .= ', `RefundMode` = 1';				// setting it to "petek zikui"
					}
				}	
				
			break;
			
			case 'PrePaid': case 'prepaid':	
				foreach ($payment as $prepaid) {
					$paytot += $paysum = $prepaid->amount;
					if($prepaid->amount!=0){
						$sql = "INSERT INTO `transactionpayments`(`trans_id`, `PaymID`,`CreditCardSum`, `CardNum`)
						VALUES ($transid,10,$prepaid->amount,'$prepaid->prepaid_num')";
						
						mysql_query($sql);
						
						$sql="update card_prepaid set BalanceCurrent=BalanceCurrent-".$prepaid->amount." where id='".$prepaid->prepaid_num."'";
						echo $sql;
						mysql_query($sql);
						$sql="INSERT INTO `card_prepaid_history`(`ID`, `Date`, `Charge`, `Paid`) VALUES ('".$prepaid->prepaid_num."',NOW(),".-1*$prepaid->amount.",".-1*$prepaid->amount.")";
						mysql_query($sql);
						$paytot += $paysum = $prepaid->amount;
						
						//mysql_query($sql);
						echo mysql_error();
						if(mysql_error()){
							echo $sql;
						}
						//$resp = file_get_contents('https://mlaitech.info/modules/precard/api.php?Com=Pay&TerminalID='.$TERM.'&CardID='.$prepaid->prepaidcardid.'&Pay='.$prepaid->amount);
					}
				}				
			break;
			
			default:
				//throw new payFail($transid, "--WARNING--: Unknown payment type '".$key."'.\nTransaction cancelled.");
			
		}//swich payments
								
		
					
		
		}//payments
		if ($customerid){					// if there's client ID in transaction

				if ($IsDebtPay){			// if debt was payed - increase credit
					$sql = "UPDATE `listingsSuppliers` SET `CreditBalance` = ROUND(`CreditBalance` + ".round(abs(floatval($finalamount)),2).",2) WHERE `isClient` = 1 AND `Status` = 1 AND `ID` = '".$customerid."'";
					echo "fff".$sql;
					mysql_query($sql);
					echo "balance $sql";
					echo mysql_error();
					if(mysql_error()){
						echo $sql;
					}
					die();
				}
			}	
		$transCnt++;
		
	}//transaction
	}
	$sql = "UPDATE `transactionpackages` SET `TransCount` = `TransCount` + ".$transCnt." WHERE `ID` = ".$journal_id;
	//echo "rr$sql";
	mysql_query($sql);
	echo mysql_error();
	if(mysql_error()){
		echo $sql;
	}
?>
