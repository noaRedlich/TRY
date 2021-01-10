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

//print_r($products[0]);

?>
<body dir="rtl">
<table width="270px" style="display:table">
	<tr><th colspan="3">ידע טופ</th></tr>
	<tr><th colspan="3">רבי עקיבא 54</th></tr>
	<tr><th colspan="3">בני ברק</th></tr>
		<tr><th colspan="3"><hr></th></tr>
		<tr><th colspan="3">פתק החלפה</th></tr>
		
	<tr><th width="30%">ברקוד</th><th width="60%">תיאור</th><th width="10%">כמות</th></tr>
	
	<?
	foreach ($data as $value) {
	
echo "<tr><td>".$value->BarCode."</td><td>".$value->Title."</td><td>".$value->Amount."</td></tr>";
		
	}
	?>	
	
</table>
<input type="button" id="print" value="הדפס" onclick="$('#print').hide();window.print();" />
</body>
</html>