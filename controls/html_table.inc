<?php
/*////////////////////////////////////////////////////////////////////////////////
//																				//
// Author: Merijn Schering <mschering@hilckmanngroep.com>						//
// Version: 1.0 Release date: 14 March 2003										//
//																				//
////////////////////////////////////////////////////////////////////////////////*/

$table_tabindex = isset($table_tabindex) ? $table_tabindex : 0;
$table_tabs = isset($table_tabs) ? $table_tabs : array();
$table_arguments = isset($table_arguments) ? $table_arguments : '';
$src=$GO_THEME->image_url.'yedatop.png';
//draw head of table
echo '<input type="hidden" name="table_tabindex" value="'.$table_tabindex.'" />';
echo '<table border="0" cellpadding="0" cellspacing="0" id="inner_table_login_form" class="TableBorder" width="'.$table_width.'">';
echo '<tr><td valign="top">';
echo '<table border="0" cellpadding="1" cellspacing="1" width="100%">';
echo "<tr><td colspan='99' class='TableHead' style='background:rgb(85,193,231);    border: 0;'><img src='$src' style='width: 255px;float: right;margin-top: 0px;margin-right: 20px;'/> <span style='float: left;font-size: 24px!important;margin-left: 20px;margin-top: 25px;'>1700-700-036</span></td></tr>";
$tab_count = count($table_tabs);
$remaining_width= $table_width - ($tab_count * 100);
// echo "111";
if ($tab_count > 0)
{
	echo '<tr>';
	//draw tabs and select the active doc
	for ($i=0;$i<$tab_count;$i++)
	{
		if ($i == $table_tabindex)
		{
				echo '<td align="center" class="btngray" width="100" nowrap>'.$table_tabs[$i].'</td>'; //lc 08/05/2016  class="ActiveTab"
		}else
		{
				echo '<td align="center" class="Tab" width="100" nowrap><a class="Tab" href="'.$PHP_SELF.'?table_tabindex='.$i.$table_arguments.'">'.$table_tabs[$i].'</a></td>';
		}
	}
	echo '<td class="Tab" width="'.$remaining_width.'">&nbsp;</td>';
	echo '</tr>';
}
// echo "222".$table_height;
echo '<tr><td colspan="99" cellpadding="10" cellspacing="0" class="TableInside" height="'.$table_height.'" valign="top" width="100%">';
// echo "333";
require($table_docs[$table_tabindex]); //$table_docs[$table_tabindex]=profile.inc   lc 08/05/2016  ??????   ( //login.inc )
echo '</td></tr></table></td></tr></table>';

?>
