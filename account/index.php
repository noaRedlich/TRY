<?php
/*////////////////////////////////////////////////////////////////////////////////
//																				//
// Author: Merijn Schering <mschering@hilckmanngroep.com>						//
// Version: 1.0 Release date: 14 March 2003										//
//																				//
////////////////////////////////////////////////////////////////////////////////*/
?>
<!--lc 10/05/2016 add btn exitback (to page - הגדרות -> הגדרות עסקיות ->  הגדרות משתמש) -->  
<div id="hederPage" style="display: visible;">  
<input type="button" onclick="window.close();parent.window.close();" class="exitback" value="חזרה" style="float:left;height: 34px!important;width:100px;margin-top: -7px;">

<p style="    margin-left: 20px;float:left" class="toreserver"> YedaTop © כל הזכויות שמורות ידעטופ טכנולוגיות </p><p class="telres"></p>
</div>
<?
require("../Group-Office.php");

$GO_SECURITY->authenticate();
require($GO_LANGUAGE->get_language_file('account'));

//load account management class
require_once($GO_CONFIG->class_path."users.class.inc");
$users = new users;

$page_title = $lang['acTitle'];
//echo $GO_THEME->theme_path."header.inc";//lc 10/05/2016
require($GO_THEME->theme_path."header.inc");



//Add the tab names with thier associated documents
$table_docs[] = "profile.inc";
$table_tabs[] = $lang['acProfile'];
$table_docs[] = "security.inc";
$table_tabs[] = $lang['acSecurity'];
//$table_docs[] = "privacy.inc";
//$table_tabs[] = $acPrivacy;
$table_docs[] = "statistics.inc";
$table_tabs[] = $lang['acStatistics'];
//$table_docs[] = "google_calendar.inc";
//$table_tabs[] = $acGoogleCalendar;

$table_title = $lang['acManager'];
$table_width = "600";
$table_height = "300";
//myprint($GO_CONFIG->control_path."html_table.inc");
?>
<table border="0" cellspacing="0" cellpadding="15">
<tr>
	<td>
	<?php 
	 // echo $GO_CONFIG->control_path."html_table.inc";
	 echo "<!-- GO " . $GO_CONFIG->control_path . "-->";
	require($GO_CONFIG->control_path."html_table.inc");
?>
	</td>
</tr>
</table>
<?php 
require($GO_THEME->theme_path."footer.inc"); ?>
