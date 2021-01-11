<?php
/*////////////////////////////////////////////////////////////////////////////////
//																				//
// Author: Merijn Schering <mschering@hilckmanngroep.com>						//
// Version: 1.0 Release date: 14 March 2003										//
//																				//
////////////////////////////////////////////////////////////////////////////////*/

require($GO_CONFIG->class_path . "/validate.class.inc");
$val = new validate;

if ($REQUEST_METHOD == "POST") {
    $val->error_required = $error_required;
    $val->error_min_length = $error_min_length;
    $val->error_max_length = $error_max_length;
    $val->error_expression = $error_email;
    $val->error_match = $error_match_auth;


    $val->name = "name";
    $val->input = $name;
    $val->max_length = 50;
    $val->required = true;
    $val->validate_input();


    $val->name = "email";
    $val->input = $email;
    $val->max_length = 75;
    $val->required = true;
    $val->expression = "^([a-z0-9]+)([._-]([a-z0-9]+))*[@]([a-z0-9]+)([._-]([a-z0-9]+))*[.]([a-z0-9]){2}([a-z0-9])?$";
	 echo "<!--validate".print_r($val,true)."-->";
    $val->validate_input();
    if ($val->validated == true) {
	 $is_own_requisite = isset($is_own_requisite) ? 1 : 0;
        if ($users->update_profile($name,$email,$work_phone,$home_phone,$fax,$cellular,$country,$state,$city,$zip,$address,$company,$work_country,$work_state,$work_city,$work_zip,$work_address,$work_fax,$businessnum,$zehut,$homepage,$department,$function, $is_own_requisite,$client_point_value)) {
            $feedback = "<p class=\"Success\">" . $lang['strSaveSuccess'] . "</b></p>";
        } else {
            $feedback = "<p class=\"Error\">" . $lang['strSaveError'] . "</p>";
        }
    } else {
        $feedback = "<p class='Error'>" . $lang['errors_in_form'] . "</p>";
    }
}

$profile = $users->get_user($GO_SECURITY->user_id);
//$dis = ($profile["stock_user"] || $profile["credit_user"]) ? "readonly style='color:gray'" : "";
$dis = ($profile["credit_user"]) ? "readonly style='color:gray'" : "";
$isStockUser = $profile["stock_user"] ? true : false;

if (!$profile) {
    echo "<p class=\"Error\">" . $lang['strDataError'] . "</p>";
}
?>

<form name="modify" method="post" action="<?php echo $PHP_SELF; ?>">
    <table border="0" cellpadding="2" cellspacing="0">

        <tr heigth="25">
            <td colspan="2"><?php if (isset($feedback))
                    echo $feedback; ?>
                <br/>
                <?php echo $lang['acProfileText']; ?><br/><br/>
            </td>
        </tr>
        <tr>
            <td valign="top">
                <table border="0" class="normal" cellpadding="2" cellspacing="0">

                    <?php
                    if (isset($val->error["name"])) {
                        ?>
                        <tr>
                            <td class="Error" colspan="2">
                                <?php echo $val->error["name"]; ?>
                            </td>
                        </tr>
                    <?php } ?>
                    <tr heigth="25">  
                        <td align="right" nowrap><?php echo $lang['strName']; ?>*:&nbsp;</td>
                        <td width="100%"><input type="text" class="textbox" name="name" size="30" maxlength="50" value="<?php echo htmlspecialchars($profile["name"]); ?>"></td>
                    </tr>
                    <tr heigth="25">
                        <td align="right" nowrap><?php echo $lang['strAddress']; ?>:&nbsp;</td>
                        <td width="100%"><input type="text" class="textbox" name="address" size="30" maxlength="50" value="<?php echo htmlspecialchars($profile["address"]); ?>"></td>
                    </tr>
                    <tr heigth="25">
                        <td align="right" nowrap><?php echo $lang['strCity']; ?>:&nbsp;</td>
                        <td width="100%"><input type="text" class="textbox" name="city" size="30" maxlength="50" value="<?php echo htmlspecialchars($profile["city"]); ?>"></td>
                    </tr>
                    <tr heigth="25">
                        <td align="right" nowrap><?php echo $lang['strState']; ?>:&nbsp;</td>
                        <td width="100%"><input type="text" class="textbox" name="state" size="30" maxlength="30" value="<?php echo htmlspecialchars($profile["state"]); ?>"></td>
                    </tr>
                    <tr heigth="25">
                        <td align="right" nowrap><?php echo $lang['strCountry']; ?>:&nbsp;</td>
                        <td width="100%"><input type="text" class="textbox" name="country" size="30" maxlength="30" value="<?php echo htmlspecialchars($profile["country"]); ?>"></td>
                    </tr>
                    <tr heigth="25">
                        <td align="right" nowrap><?php echo $lang['strZip']; ?>:&nbsp;</td>
                        <td width="100%"><input type="text" class="textbox" name="zip" size="30" maxlength="20" value="<?php echo $profile["zip"]; ?>"></td>
                    </tr>
                    <?php
                    if (isset($val->error["email"])) {
                        ?>
                        <tr>
                            <td class="Error" colspan="2">
                                <?php echo $val->error["email"]; ?>
                            </td>
                        </tr>
                    <?php } ?>

                    <tr heigth="25">
                        <td align="right" nowrap><?php echo $lang['strEmail']; ?>*:&nbsp;</td>
                        <td><input type="text" class="textbox" name="email" size="30" value="<?php echo $profile["email"]; ?>" maxlength="50"></td>
                    </tr>

                    <tr heigth="25">
                        <td align="right" nowrap><?php echo $lang['strPhone']; ?>:&nbsp;</td>
                        <td><input type="text" class="textbox" name="home_phone" size="30" value="<?php echo $profile["home_phone"]; ?>" maxlength="20"></td>
                    </tr>

                    <tr heigth="25">
                        <td align="right" nowrap><?php echo $lang['strFax']; ?>:&nbsp;</td>
                        <td><input type="text" class="textbox" name="fax" size="30" value="<?php echo $profile["fax"]; ?>" maxlength="20"></td>
                    </tr>

                    <tr heigth="25">
                        <td align="right" nowrap><?php echo $lang['strCellular']; ?>:&nbsp;</td>
                        <td><input type="text" class="textbox" name="cellular" size="30" value="<?php echo $profile["cellular"]; ?>" maxlength="20"></td>
                    </tr>

                    <tr heigth="25">
                        <td align="right" nowrap><?php echo $lang['strZehut']; ?>:&nbsp;</td>
                        <td><input type="text" class="textbox" name="zehut" size="30" value="<?php echo $profile["zehut"]; ?>" maxlength="20"></td>
                    </tr>
                      <tr heigth="25">
                            <td align="right" nowrap><?php echo $lang['strDepartment']; ?>:&nbsp;</td>
                            <td><input <?= $dis ?> type="text" class="textbox" name="department" size="30" value="<?php echo htmlspecialchars($profile["department"]); ?>" maxlength="50"></td>
                        </tr>

                        <tr heigth="25">
                            <td align="right" nowrap><?php echo $lang['strFunction']; ?>:&nbsp;</td>
                            <td><input <?= $dis ?> type="text" class="textbox" name="function" size="30" value="<?php echo $profile["function"]; ?>" maxlength="50"></td>
                        </tr>
                </table>
            </td>

            <? if (!$dis) { ?>

                <td valign="top">
                    <table border="0" class="normal" cellpadding="2" cellspacing="0">

                        <tr heigth="25">
                            <td align="right" nowrap><?php echo $lang['strCompany']; ?>:&nbsp;</td>
                            <td><input <?= $dis ?> type="text" class="textbox" name="company" size="30" value="<?php echo htmlspecialchars($profile["company"]); ?>" maxlength="50"></td>
                        </tr>
                        <!--lc 09/05/2016 add readonly and style to input - strBusinessNum  and change from מספר עסק  to מספר עוסק מורשה -->
                        <?$lang['strBusinessNum']='מספר עוסק מורשה';?> 
                        <tr heigth="25">
                            <td align="right" nowrap><?php echo $lang['strBusinessNum']; ?>:&nbsp;</td>
<!--                            <td><input --><?//= $dis ?><!--type="text" readonly style="background-color: buttonface !important;" class="textbox" name="businessnum" size="30" value="--><?php //echo $profile["businessnum"]; ?><!--" maxlength="20"></td>-->
                            <td><input <?= $dis ?>type="text" readonly style="background-color: buttonface !important;" class="textbox" name="businessnum" size="30" value="<?php echo $profile["zehut"]; ?>" maxlength="20"></td>
                        </tr>
                        <tr>   
                            <td align="right" nowrap> 
                                <?php echo $lang['strAddress']; ?>:&nbsp;
                            </td>
                            <td>
                                <input <?= $dis ?> type="text" class="textbox" name="work_address" size="30" value="<?php echo htmlspecialchars($profile["work_address"]); ?>" maxlength="100">
                            </td>
                        </tr>

                       
                        <tr>
                            <td align="right" nowrap>
                                <?php echo $lang['strCity']; ?>:&nbsp;
                            </td>
                            <td>
                                <input <?= $dis ?> type="text" class="textbox" name="work_city" size="30" value="<?php echo htmlspecialchars($profile["work_city"]); ?>" maxlength="50">
                            </td>
                        </tr>


                        <tr>
                            <td align="right" nowrap>
                                <?php echo $lang['strState']; ?>:&nbsp;
                            </td>
                            <td>
                                <input <?= $dis ?> type="text" class="textbox" name="work_state" size="30" value="<?php echo htmlspecialchars($profile["work_state"]); ?>" maxlength="50">
                            </td>
                        </tr>

                        <tr>
                            <td align="right" nowrap>
                                <?php echo $lang['strCountry']; ?>:&nbsp;
                            </td>
                            <td>
                                <input <?= $dis ?> type="text" class="textbox" name="work_country" size="30" value="<?php echo htmlspecialchars($profile["work_country"]); ?>" maxlength="50">
                            </td>
                        </tr>
                        <tr>
                            <td align="right" nowrap>
                                <?php echo $lang['strZip']; ?>:&nbsp;
                            </td>
                            <td>
                                <input <?= $dis ?> type="text" class="textbox" name="work_zip" size="30" value="<?php echo $profile["work_zip"]; ?>" maxlength="20">
                            </td>
                        </tr>
                        <tr>
                            <td align="right" nowrap>
                                <?php echo $lang['strPhone']; ?>:&nbsp;
                            </td>
                            <td>
                                <input <?= $dis ?> type="text" class="textbox" name="work_phone" size="30" value="<?php echo $profile["work_phone"]; ?>" maxlength="20">
                            </td>
                        </tr>
                        <tr>
                            <td align="right" nowrap>
                                <?php echo $lang['strFax']; ?>:&nbsp;
                            </td>
                            <td>
                                <input <?= $dis ?> type="text" class="textbox" name="work_fax" size="30" value="<?php echo $profile["work_fax"]; ?>" maxlength="20">
                            </td>
                        </tr>
                        <tr heigth="25">
                            <td align="right" nowrap><?php echo $lang['strCellular']; ?>:&nbsp;</td>
                            <td><input type="text" class="textbox" name="cellular" size="30" value="<?php echo $profile["cellular"]; ?>" maxlength="20"></td>
                        </tr>
                        <tr>
                            <td align="right" nowrap>
                                <?php echo $lang['strHomepage']; ?>:&nbsp;
                            </td>
                            <td>
                                <input <?= $dis ?> type="text" class="textbox" name="homepage" size="30" value="<?php echo $profile["homepage"] ?>" maxlength="100">
                            </td>
                        </tr>
                        
								<?php if($isStockUser) : ?>
								<tr>
                            <td align="right" nowrap>
                                <?php echo "Own requisite" ?>:&nbsp;
                            </td>
                            <td>
                                <input <?= $dis ?> type="checkbox" name="is_own_requisite" value="<?php echo $profile["is_own_requisite"] ?>" <?php if (!empty($profile["is_own_requisite"])) echo "checked"; ?>>
                            </td>
                        </tr>
								<?php endif; ?>
 							<tr>
                            <td align="right" nowrap>
                                שווי נקודת מועדון בשקלים:&nbsp;
                            </td>
                            <td>
                                <input <?= $dis ?> type="text" class="textbox" name="client_point_value" size="30" value="<?php echo $profile["client_point_value"] ?>" >
                            </td>
                        </tr>
                      
                    </table>

                </td>

            <? } ?>

        </tr>
        <tr heigth="25">
            <td colspan="2">
                <?php
                $button = new button($lang['cmdSave'],'javascript:document.forms[0].submit()');
                ?></td>
        </tr>
    </table>
