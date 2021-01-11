<?php
/*////////////////////////////////////////////////////////////////////////////////
//																				//
// Author: Merijn Schering <mschering@hilckmanngroep.com>						//
// Version: 1.0 Release date: 14 March 2003										//
//																				//
////////////////////////////////////////////////////////////////////////////////*/

if ($REQUEST_METHOD == "POST") {
    require($GO_CONFIG->class_path . "/validate.class.inc");
    $val = new validate;
    $val->error_required = $error_required;
    $val->error_min_length = $error_min_length;
    $val->error_max_length = $error_max_length;
    $val->error_expression = $error_email;
    $val->error_match = $error_match_auth;


    $val->name = "currentpassword";
    $val->input = $currentpassword;
    $val->max_length = 8;
    $val->required = true;
    $val->validate_input();

    $val->name = "newpass1";
    $val->input = $newpass1;
    $val->min_length = 3;
    $val->max_length = 8;
    $val->validate_input();

    $val->name = "newpass2";
    $val->input = $newpass2;
    $val->min_length = 3;
    $val->max_length = 8;
    $val->validate_input();

    $val->name = "newauth1";
    $val->input = $newauth1;
    $val->min_length = 3;
    $val->max_length = 20;
    $val->validate_input();

    $val->name = "newauth2";
    $val->input = $newauth2;
    $val->min_length = 3;
    $val->max_length = 20;
    $val->validate_input();

    $val->name = "newquestion";
    $val->input = $newquestion;
    $val->max_length = 100;
    $val->validate_input();

    $val->name = "newanswer";
    $val->input = $newanswer;
    $val->max_length = 50;
    $val->validate_input();

    $val->name = "newauth1";
    $val->match1 = $newauth1;
    $val->match2 = $newauth2;
    $val->validate_input();

    $val->name = "newpass1";
    $val->match1 = $newpass1;
    $val->match2 = $newpass2;
    $val->validate_input();

    if ($val->validated == true) {
        if (!$users->check_password($currentpassword)) {
            $feedback = "<p class=\"Error\">" . $lang['security_wrong_password'] . "</p>";
        } else {
            $feedback = "<b>" . $lang['security_tasks'] . ":";
            if ($newpass1 != "") {
                //if a system account is being changed we better unregister email accounts
                if ($GO_CONFIG->enable_system_accounts == "true") {
                    session_unregister("email_id");
                    session_unregister("email_host");
                    session_unregister("email_port");
                    session_unregister("email_type");
                    session_unregister("email_username");
                    session_unregister("email_password");
                    session_unregister("email_address");
                }
                if ($users->update_password($GO_SECURITY->user_id,$newpass1))
                    $feedback .= "<p class=\"Success\">" . $lang['security_password_update'] . "</p>";
                else
                    $feedback .= "<p class=\"Error\">" . $lang['strSaveError'] . "</p>";
            }
            if ($newauth1 != "") {
                if ($users->update_authcode($newauth1))
                    $feedback .= "<p class=\"Success\">" . $lang['security_authcode_update'] . "</p>";
                else
                    $feedback .= "<p class=\"Error\">" . $lang['strSaveError'] . "</p>";

            }
            if ($newquestion || $newanswer) {
                if ($newquestion && $newanswer) {
                    $users->update_question_answer($newquestion,$newanswer);
                    $feedback .= "<p class=\"Success\">" . $lang['security_question_update'] . "</p>";
                } else {
                    $feedback .= "<p class=\"Error\">" . $lang['security_question_fail'] . "</p>";
                }
            }
            $feedback .= "</b>";
        }
    }
}
?>
<form action="<?php echo $PHP_SELF; ?>?table_tabindex=<?php echo $table_tabindex; ?>" name="save" METHOD="post">
    <table border="0" class="normal" cellpadding="2" cellspacing="0">
        <tr>
            <td colspan="2">
                <br><?php if (isset($feedback))
                    echo $feedback; ?>
                <?php echo $lang['security_text']; ?><br><br>
            </td>
        </tr>
        <?php
        if (isset($val->error["currentpassword"])) {
            ?>
            <tr>
                <td class="Error" colspan="2">
                    <?php echo $val->error["currentpassword"]; ?>
                </td>
            </tr>
        <?php } ?>
        <tr>
            <td align="right" nowrap><?php echo $lang['security_current_password']; ?>:&nbsp;</td>
            <td><input size="40" class="textbox" type="password" name="currentpassword" maxlength="8"></td>
        </tr>
        <tr>
            <td>&nbsp;</td>
        </tr>
        <?php
        if (isset($val->error["newpass1"])) {
            ?>
            <tr>
                <td class="Error" colspan="2">
                    <?php echo $val->error["newpass1"]; ?>
                </td>
            </tr>
        <?php } ?>
        <tr>
            <td align="right" nowrap><?php echo $lang['security_new_password']; ?>:&nbsp;</td>
            <td><input size="40" class="textbox" type="password" name="newpass1" maxlength="20"></td>
        </tr>
        <?php
        if (isset($val->error["newpass2"])) {
            ?>
            <tr>
                <td class="Error" colspan="2">
                    <?php echo $val->error["newpass2"]; ?>
                </td>
            </tr>
        <?php } ?>
        <tr>
            <td align="right" nowrap><?php echo $lang['security_confirm_password']; ?>:&nbsp;</td>
            <td><input size="40" class="textbox" type="password" name="newpass2" maxlength="20"></td>
        </tr>

        <tr>
            <td>&nbsp;</td>
        </tr>
        <?php
        if (isset($val->error["newauth1"])) {
            ?>
            <tr>
                <td class="Error" colspan="2">
                    <?php echo $val->error["newauth1"]; ?>
                </td>
            </tr>
        <?php } ?>
        <tr>
            <td align="right" nowrap><?php echo $lang['security_new_authcode']; ?>:&nbsp;</td>
            <td><input size="40" class="textbox" type="password" name="newauth1" maxlength="20"></td>
        </tr>
        <?php
        if (isset($val->error["newauth2"])) {
            ?>
            <tr>
                <td class="Error" colspan="2">
                    <?php echo $val->error["newauth2"]; ?>
                </td>
            </tr>
        <?php } ?>
        <tr>
            <td align="right" nowrap><?php echo $lang['security_confirm_authcode']; ?>:&nbsp;</td>
            <td><input size="40" class="textbox" type="password" name="newauth2" maxlength="20"></td>
        </tr>

        <tr>
            <td>&nbsp;</td>
        </tr>
        <?php
        if (isset($val->error["newquestion"])) {
            ?>
            <tr>
                <td class="Error" colspan="2">
                    <?php echo $val->error["newquestion"]; ?>
                </td>
            </tr>
        <?php } ?>
        <tr>
            <td align="right" nowrap><?php echo $lang['security_question']; ?>:&nbsp;</td>
            <td><input size="40" class="textbox" type="text" name="newquestion" maxlength="50"></td>
        </tr>
        <?php
        if (isset($val->error["newanswer"])) {
            ?>
            <tr>
                <td class="Error" colspan="2">
                    <?php echo $val->error["newanswer"]; ?>
                </td>
            </tr>
        <?php } ?>
        <tr>
            <td align="right" nowrap><?php echo $lang['security_answer']; ?>:&nbsp;</td>
            <td><input size="40" class="textbox" type="text" name="newanswer" maxlength="50"></td>
        </tr>
        <tr height="25">
            <td colspan="99"><?php
                $button = new button($lang['cmdSave'],'javascript:document.forms[0].submit()');
                ?></td>
        </tr>
    </table>


