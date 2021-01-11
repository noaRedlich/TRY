<? 


//
// A very simple PHP example that sends a HTTP POST to a remote site
//
//
//ini_set('display_errors', 1);
//ini_set('display_startup_errors', 1);
//error_reporting(E_ALL);
$ch = curl_init();
$fields = $_POST;
if(intval($fields['tashlumin']) == 0) $fields['tashlumin'] = 1;
$p_num = intval($fields['tashlumin']);

$fields['amount'] = intval($fields['amount']);
$fields['chequepaymentdat'] = str_replace('/', '-', $fields['chequepaymentdat']);
 $otherchecks = array(array('id'=> '1',
 'vid' => (string)intval($fields['chequenumber']),
 'amount' => intval($fields['amount'])/$p_num,
 'date'  =>  $fields['chequepaymentdat']));
if(intval($p_num)>1){
	$parts = split('-', $fields['chequepaymentdat']);
	for ($i = 1; $i < $p_num ; $i++) {
			if($parts[1]<12)
				$parts[1]+=1;
				if($parts[1]<10)
					$parts[1]= '0'.$parts[1];
			else{
				$parts[1]= '01';
				$parts[2]+=1;
			}
			array_push($otherchecks, array(
			'id'=> strval(intval($fields['chequenumber']) + $i)  ,
			'vid' => (string)($i+1),
			'amount' => (string)floor($fields['amount']/$p_num),
			'date'  =>  $parts[0].'-'.$parts[1].'-'.$parts[2]
			));
	}	
	
	$decimal = intval($fields['amount'])/$p_num - floor(intval($fields['amount'])/$p_num);
	
	$otherchecks[0]['amount'] =floor($otherchecks[0]['amount'])  + intval($decimal*$p_num);
}
$fields['businessID'] = '820000008';
//print_r($otherchecks);
$send_fields = array(
	'total' => $fields['amount'],
	'echeance' => $fields['tashlumin'],
	'firstamount' =>  $fields['amount'],
	'firstcheque' => $fields['chequenumber'],
	'firstdate' => $fields['chequepaymentdat'],
//	'bankid' => $fields['chequebanknumber'],
//	'snifid' =>$fields['chequebranch'],
	'bankid' => '11',
	'snifid' =>'10',
	'account' => $fields['chequeaccountnumber'],
	//'identification' => '248953481',
	'identification' => $fields['identification'],
	'PullerPhone' => $fields['phone'],
	'garrantID' => $fields['garant'],
	'vouchers' => $otherchecks,
	'businessID' => $fields['businessID'],
	'IPAddress' => $_SERVER['SERVER_ADDR'],
	//'IPAddress' => '10.0.0.38',
	'MACAddress' => '00-50-56-12-05-f9',
	//'MACAddress' => '00-1B-78-85-51-A6',
	'source' => '4',
	'chainid' => '0',
	'branchid' =>'0',
	//'KupaCode' => '1234',
	//'PrincipleMode' => '7'
);
//echo '<pre>';
//print_r($send_fields);
// Echo '</pre>';
// {"total":1317,"echeance":"1","firstamount":1317,"firstcheque":"80000556","firstdate":"11-11-2019","bankid":"645","snifid":"17","account":"7815","vouchers":[{"id":"1","vid":80000556,"amount":1317,"date":"11-11-2019"},[]],"businessID":"307797514","IPAddress":"109.226.62.11","MACAddress":"00:50:56:12:05:f9","source":4,"chainid":0,"branchid":"17","KupaCode":"1234","PrincipleMode":"7"}
//
//
//echo "http://apitest.pcsglobal.co.il/GetConfirmation1?qr=".json_encode($send_fields)."&u=666871&p1=76743DE6CDC4ED119B59B2B1A4ECB4E86249671E&p2=CE13A56717AC3A02DD9812FEFBA2110174EB0C81";
 curl_setopt($ch, CURLOPT_URL,"http://apitest.pcsglobal.co.il/GetConfirmation1?qr=".urlencode(json_encode($send_fields))."&u=666871&p1=76743DE6CDC4ED119B59B2B1A4ECB4E86249671E&p2=CE13A56717AC3A02DD9812FEFBA2110174EB0C81"); 

// In real life you should use something like:
// curl_setopt($ch, CURLOPT_POSTFIELDS, 
//          http_build_query(array('postvar1' => 'value1')));

// Receive server response ...
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

$server_output = curl_exec($ch);

curl_close ($ch);

// Further processing ...  
//Echo json_encode($send_fields);

echo $server_output;
// ini_set('display_errors', 1);
// ini_set('display_startup_errors', 1);
// error_reporting(E_ALL);
//
//$params = array(
//   array
//        (
//            'total' => 7,
//            'echeance' => 1,
//            'firstamount' => 0,
//            'firstcheque' => 6915551,
//            'firstdate' => 26-05-2016,
//            'bankid' => 11,
//            'snifid' => 761,
//            'account' => 124122,
//            'identification' => 512985156,
//            'garrantID' => 0,
//            'vouchers' => array
//                (
//                     array
//                        (
//                            'id' => 1,
//                            'vid' => 6915551,
//                            'amount' => 7,
//                            'date' => 26-05-2016
//                        )
//
//                )
//
//            'businessID' => 514922274,
//            'IPAddress' => 10.0.0.38,
//            'MACAddress' => 00-1B-78-85-51-A6,
//            'source' => 4,
//            'chainid' => 0,
//            'branchid' => 0,
//            'KupaCode' => 1250
//        )
//);


//            'total' => 7,
//            'echeance' => 1,
//            'firstamount' => 0,
//            'firstcheque' => 6915551,
//            'firstdate' => 26-05-2016,
//            'bankid' => 11,
//            'snifid' => 761,
//            'account' => 124122,
//            'identification' => 512985156,
//            'garrantID' => 0,
 ?> 