<?php
require("../Group-Office.php");
$page_title=$strAccessDenied;
require($GO_THEME->theme_path."simple_header.inc");
?>
<table border="0" class="TableInside" cellpadding="10">
<tr>
	<td>
	<h1><?php echo $strAccessDenied; ?></h1>
	<?php echo $AccessDenied_text; ?>
	</td>
</tr>
<tr>
    <td>
	<?php
    $button = new button($cmdBack, "javascript:window.history.go(-1)");
    echo '&nbsp;&nbsp;';
    $button = new button($cmdClose, "javascript:window.close()");
    ?>
    </td>
</tr>
</table>
<?php
require($GO_THEME->theme_path."simple_footer.inc");
?>
