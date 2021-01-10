<!DOCTYPE html>
<html lang="he">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	 <script src="http://code.jquery.com/jquery-latest.min.js" type="text/javascript"></script>


</head>
<?
$json=$_REQUEST[json];
//print_r($json);
$data=json_decode($json);
//print_r($data);
$products=$data->products;
//$products=json_decode($products);

$payments=$data->payments;
//$payments=json_decode($payments);

//print_r($products[0]);

?>
<body dir="rtl">
	<div class="current">
<table width="270px" style="display:table">
	<tr><th colspan="4">ידע טופ</th></tr>
	<tr><th colspan="4">רבי עקיבא 54</th></tr>
	<tr><th colspan="4">בני ברק</th></tr>
	<tr><th width="60%">תיאור</th><th width="15%">מחיר</th><th width="10%">כמות</th><th width="15%">סה"כ</th></tr>
	
	<?
	foreach ($products as $value) {
	
echo "<tr><td>".$value->Title."<br>".$value->BarCode."</td><td>".$value->SalePrice."</td><td>".$value->Amount."</td><td>".$value->SalePrice*$value->Amount."</td></tr>";
		
	}
	?>	
	<tr><th colspan="4">סה"כ: <?=$data->finalamount?></th></tr>
<tr><th></th><th></th><th>תשלום:</th><th></th></tr>
	<?
	
	
	//print_r($payments);
	
	foreach ($payments as $key => $value) {
		foreach($value as $payment){
	
echo "<tr><td></td><td></td><td>".$payment->type.":</td><td>".$payment->amount."</td></tr>";
		}
	}
	?>	
	
</table>
<hr>
<?if($data->finalamount<0 && isset($payments->shovarzicuy[0]) && $payments->shovarzicuy[0]->amount!=0){
/*	echo print_r($payments); 
	
stdClass Object
(
    [cash] =&gt; Array
        (
        )

    [cheque] =&gt; Array
        (
        )

    [credit] =&gt; Array
        (
        )

    [akafadebt] =&gt; Array
        (
        )

    [akafa] =&gt; 
    [shovar] =&gt; Array
        (
        )

    [shovarzicuy] =&gt; Array
        (
            [0] =&gt; stdClass Object
                (
                    [type] =&gt; שובר זיכוי
                    [amount] =&gt; -25.00
                    [shovarzicuy_num] =&gt; 025000002
                    [$$hashKey] =&gt; 0K3
                )

        )

    [prepaid] =&gt; Array
        (
        )

)
1*/	?>
	<table width="270px" style="display:table">
	<tr><th colspan="2">ידע טופ</th></tr>
	<tr><th colspan="2">רבי עקיבא 54</th></tr>
	<tr><th colspan="2">בני ברק</th></tr>
	<tr><th colspan="2">תעודת זיכוי מקור</th></tr>
	<tr><th>סה"כ</th><th><?=$data->finalamount?></th></tr>
	<tr><th>חתימה</th><th>____________</th></tr>
	</table>
	<hr>
	<table width="270px" style="display:table">
	<tr><th colspan="2">ידע טופ</th></tr>
	<tr><th colspan="2">רבי עקיבא 54</th></tr>
	<tr><th colspan="2">בני ברק</th></tr>
	<tr><th colspan="2">תעודת זיכוי העתק</th></tr>
	<tr><th>סה"כ</th><th><?=$data->finalamount?></th></tr>
	<tr><th>חתימה</th><th>____________</th></tr>
	</table>
	
<?}?>

</div>
</body>
</html>