<?php 
$ch = curl_init('https://credix.co.il/api/transactions/auth'); 

curl_setopt_array($ch, array( 
CURLOPT_POST => TRUE, 
CURLOPT_RETURNTRANSFER => TRUE, 
CURLOPT_HTTPHEADER => array( 
'X-CREDIX-API-KEY: dgw6RM6y6gg5OnpBY2k7BM7B395mj7zs', 
'Content-Type: application/json' 
), 
CURLOPT_POSTFIELDS => {"loginDetails":{"terminalId": "50000130","username": "idit","password": "TkwIUg5U"}, 
"transactionCommitting": { "track2": "", 
"cardNumber":"10111111130731", 
"cardExpirationDate":"1808", 
"cvv":"", 
"cardHolderId":"", 
"transactionType": "DEBIT", 
"transactionCode": "SIGNATURE_ONLY_TRANSACTION", "amount": "1.00", "numberOfPayments": "", 
"firstPaymentAmount": "", "paymentAmount": "", "cardHolderName": "", 
"comments": "", "currency": "NIS_CURRENCY", "creditTerms": "REGULAR_CREDIT", "customerFirstName": "Erez", 
"customerLastName": "Attia", "customerPhoneNumber": "", "customerEmail": "", 
"requestType": "QUERY_EXECUTION_IN_ACCORDANCE_WITH_THE_TERMINAL", "approvalNumber": "", 
"userData": "", "creditCardCompanyAdditionalData": "" } } 
)); 


$response = curl_exec($ch);


?>