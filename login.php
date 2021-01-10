<?php
/*////////////////////////////////////////////////////////////////////////////////
//																				//
// Author: Merijn Schering <mschering@hilckmanngroep.com>						//
// Version: 1.0 Release date: 14 March 2003										//
//																				//
////////////////////////////////////////////////////////////////////////////////*/
unset($_SESSION);
$kupa2=isset($_REQUEST['kupa'])?$_REQUEST['kupa']:"";
SetCookie("kupa2",$kupa2,time()-3600,"/","",0);
require("Group-Office.php");

$task = isset($task) ? $task : '';
$lang = isset($lang) ? $lang : $GO_LANGUAGE->default_language;

require($GO_LANGUAGE->get_language_file('login'));

if ($task == "logout")
{
	$GO_SECURITY->logout();
	unset($user_id);
	
	//yl031215
	unset($_COOKIE['GO_UN']);
	setcookie('GO_UN', null, -1, '/');
	unset($_COOKIE['$GO_PW']);
	setcookie('GO_PW', null, -1, '/');
	
	SetCookie("GO_UN","",time()-3600,"/","",0);
	SetCookie("GO_PW","",time()-3600,"/","",0);
	unset($GO_UN);
	unset($GO_PW);
}

//when the user is logged in redirect him.
if ($GO_SECURITY->logged_in == true)
{ 
	$modpath = ($GO_MODULES->has_read_permission($GO_SECURITY->user_id, "stock"))?"modules/stock/":"modules/stock_reports/";
	//if($kupa2=="yes"){
	//	header("location:http://a.yeda-t.com/modules/stock/cashbox3");
	//}
	//else{
		header("location:$modpath");
	//}
	
    //require($GO_THEME->theme_path."header.inc");
	//require($GO_CONFIG->root_path."start_page.inc");
	//require($GO_THEME->theme_path."footer.inc");
	exit();
}

//if form was posted user wants to login
//set cookies to remember login before headers are sent
if ($REQUEST_METHOD == "POST" || (isset($GO_UN) && isset($GO_PW)))
{
	if ($REQUEST_METHOD != "POST")
	{
		$remind = "true";
		$password = $GO_PW;
		$username = $GO_UN;
	}else
	{
		$username = $_POST['username'];
		$password = md5($_POST['password']);
	}
	//check if both fields were filled
	if (!$_POST["username"] || !$_POST["password"])
	{
			if ($task=="login")
			{
				$feedback = "<p class=\"Error\">".$login_missing_field."</p>";
			}
	}
	else
	{
		$username = strtolower($username);

		//on each login set language cookie for one year
		SetCookie("lang",$lang,time()+3600*24*365,"/","",0);

		//attempt login using security class inherited from index.php
		
		if ($GO_SECURITY->login($username,$password,$businessnum))
		{
            $GO_SECURITY->clearBadLogin();
			//login is correct final check if login registration was ok
			if ($GO_SECURITY->logged_in == true)
			{
				if (isset($remind))
				{
					
					//yl031215
					unset($_COOKIE['GO_UN']);
					setcookie('GO_UN', null, -1, '/');
					unset($_COOKIE['$GO_PW']);
					setcookie('GO_PW', null, -1, '/');
					
					SetCookie("GO_UN",$username,time()+3600*24*30,"/",'',0);
					SetCookie("GO_PW",$password,time()+3600*24*30,"/",'',0);
				}
                else
				{

					//yl031215
					unset($_COOKIE['GO_UN']);
					setcookie('GO_UN', null, -1, '/');
					unset($_COOKIE['$GO_PW']);
					setcookie('GO_PW', null, -1, '/');

					SetCookie("GO_UN",$username, 0);
					SetCookie("GO_PW",$password, 0);
                }
				$modpath = ($GO_MODULES->has_read_permission($GO_SECURITY->user_id, "stock"))?"modules/stock/":"modules/stock_reports/";
				
				//if($kupa2=="yes"){
				//	header("location:http://a.yeda-t.com/modules/stock/cashbox3");
				//}
				/*else{					
					header("location:$modpath");
				}*/
				header("location:$modpath");
				//require($GO_THEME->theme_path."header.inc");
				//require($GO_CONFIG->root_path."start_page.inc");
				//require($GO_THEME->theme_path."footer.inc");
				exit;

			}
            else
			{
				$feedback = "<p class=\"Error\">".$login_registration_fail."</p>";
			}
		}
        else
		{
            $GO_SECURITY->badLogin($username);
			$feedback = "<p class=\"Error\">".$login_bad_login."</p>";
			
		}
	}
	
}
 
require($GO_THEME->theme_path."simple_header.inc");
//Add the tab names with thier associated documents
$table_docs[] = "login.inc";
$table_title = "YedaTop";
$table_width = "400";
$table_height = "300";

?>
<form method="post" action="<?php echo $PHP_SELF; ?>" name="login" style="margin-top: 150px;">
<table width="100%">
<tr>
	<td align="center">
		<div id="container_login_form">
			<?php require($GO_CONFIG->control_path."html_table.inc"); ?>
		</div>
	</td>
</tr>
<tr>
</table>

</form>
<script type="text/javascript" language="javascript">
var nav4 = window.Event ? true : false;
function processkeypress(e)
{
	if(nav4)
    {
		var whichCode = e.which;
	}else
 	{
		var whichCode = event.keyCode;
	}

	if (whichCode == 13)
	{
		window.document.forms[0].submit();
		return true;
    }
}
if (window.Event) //if Navigator 4.X
{
        document.captureEvents(Event.KEYPRESS)
}
document.onkeypress = processkeypress;
document.forms[0].username.focus();
function set_language(dropbox)
{
	document.location='<?php echo $PHP_SELF; ?>?SET_LANGUAGE='+dropbox.value;
}
</script>
<?php
require($GO_THEME->theme_path."simple_footer.inc");
?>