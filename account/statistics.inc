<?php
/*////////////////////////////////////////////////////////////////////////////////
//																				//
// Author: Merijn Schering <mschering@hilckmanngroep.com>						//
// Version: 1.0 Release date: 14 March 2003										//
//																				//
////////////////////////////////////////////////////////////////////////////////*/

require($GO_CONFIG->class_path . "files.class.inc");

$files = new files;

$profile = $users->get_user($GO_SECURITY->user_id);
?>
<table border="0">
    <tr>
        <td colspan="2"><br/>

            <h3><?php echo $lang['ac_login_info']; ?></h3></td>
    </tr>
    <tr>
        <td><?php echo $lang['ac_registration_time']; ?>:</td>
        <td><?php echo date($ses_date_format,$profile["registration_time"]); ?></td>
    </tr>
    <tr>
        <td><?php echo $lang['ac_lastlogin']; ?>:</td>
        <td><?php echo date($ses_date_format,$ses_lastlogin); ?></td>
    </tr>
    <tr>
        <td><?php echo $lang['ac_logins']; ?>:</td>
        <td><?php echo $profile["logins"]; ?></td>
    </tr>
</table>
