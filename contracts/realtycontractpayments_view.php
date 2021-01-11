<?php
// This script and data application were generated by AppGini 2.4 on 25/06/2003 at 19:54:53
// Download AppGini for free from http://www.bigprof.com/appgini/download/

	include("./lib.php");
	include("./realtycontractpayments_dml.php");
	
	$x = new DataList;
	if($HTTP_POST_VARS["Filter_x"] != "")
	{
		// Query used in filters page
		$x->Query = "select realtycontracts2.contract_number as 'Contract', realtycontractpayments.payment_date as 'Payment Date', realtycontractpayments.amount as 'Amount', realtycontractpayments.check_number as 'Check Number', realtycontractpayments.check_bank as 'Bank', realtycontractpayments.check_branch as 'Branch' from realtycontractpayments, realtycontracts as realtycontracts2 where realtycontractpayments.contract_id=realtycontracts2.id";
	}
	else
	{
		// Query used in table view
		$x->Query = "select realtycontracts2.contract_number as 'Contract', realtycontractpayments.payment_date as 'Payment Date', realtycontractpayments.amount as 'Amount', realtycontractpayments.check_number as 'Check Number', realtycontractpayments.check_bank as 'Bank', realtycontractpayments.check_branch as 'Branch' from realtycontractpayments, realtycontracts as realtycontracts2 where realtycontractpayments.contract_id=realtycontracts2.id";
	}
	$x->DataHeight = 75;
	$x->AllowSelection = 1;
	$x->AllowDelete = 1;
	$x->AllowInsert = 1;
	$x->AllowUpdate = 1;
	$x->AllowFilters = 1;
	$x->AllowSorting = 1;
	$x->AllowNavigation = 1;
	$x->AllowPrinting = 1;
	$x->AllowCSV = 1;
	$x->HideTableView = 0;
	$x->RecordsPerPage = 5;
	$x->QuickSearch = 0;
	$x->QuickSearchText = "Quick search";
	$x->ScriptFileName = "realtycontractpayments_view.php";
	$x->TableTitle = "Payments";
	$x->PrimaryKey = "realtycontractpayments.id";
	$x->ColWidth[] = 50;
	$x->ColWidth[] = 120;
	$x->ColWidth[] = 80;
	$x->ColWidth[] = 150;
	$x->ColWidth[] = 150;
	$x->ColWidth[] = 150;
	$x->Render();
	
	echo $x->HTML;
?>