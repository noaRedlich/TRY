<?
$simple=1;
$page_subtitle = "יבוא ויצוא";

include("include/common.php");
if (!loginCheck('User'))exit;
global $action, $id, $cur_page, $lang, $conn, $config;
include("$config[template_path]/admin_top.html");
DBQuery('SET NAMES "utf8"');
?> 
<style>
    .z {color:gray}
    .b {font-weight:bold}
    th {background-color:silver}
</style>  
<script>  

    function openReport(url){
        s = window.open(url+'&simple=1','','top=50,left=100,height=500,width=800,resizable=yes,scrollbars=yes');
        s.focus();
    }

    function handleDates(auto){ 
        document.F.sDate.disabled = document.F.eDate.disabled = auto!=1;
        document.all.CALFROM.disabled = document.all.CALTO.disabled = auto!=1;
        document.all.btnZed.disabled = auto!=2; 
        document.F.stock.disabled = auto==0;
        if (auto==0) document.F.stock.selectedIndex = 0;
    }

    function validate(){
        if (document.getElementById("ETYPE").style.display!="none" && document.getElementById("ETYPE").value=="")
        {
            alert("נא לבחור סוג תוכנה זרה / ממשק");
            return false;
        }
        if (document.getElementById("ITYPE").style.display!="none" && document.getElementById("ITYPE").value=="")
        {
            alert("נא לבחור סוג תוכנה זרה / ממשק");
            return false;
        }
        if(document.getElementById("DATES").style.display=="")
        {
            if(document.F.sDate.value==""||isNaN(Date.parse(document.F.sDate.value))){
                alert("הערך שהוזן אינו תקין");
                document.F.sDate.focus();
                return false;
            }
            if(document.F.eDate.value==""||isNaN(Date.parse(document.F.eDate.value))){
                alert("הערך שהוזן אינו תקין");
                document.F.eDate.focus();
                return false;
            }
        }
        return true;
    }

    function chMode(mode){
        document.F.zids.value="";
        document.getElementById("ETYPE").style.display=(mode=="e")?"":"none";
        document.getElementById("ITYPE").style.display=(mode=="i")?"":"none";
        document.getElementById("PTYPE").style.display=(mode=="p")?"":"none";
        document.getElementById("MODES").style.display=(mode=="e")?"":"none";
        document.getElementById("MODES1").style.display=(mode=="e")?"":"none";
        document.getElementById("MODES2").style.display=(mode=="e")?"":"none";
        if(mode=="e"||mode=="i")
        {
            document.getElementById((mode=="e")?"ETYPE":"ITYPE").onchange();
        }
        if(mode=="p")
        {
            document.getElementById("PTYPE").onchange();
        }
        document.getElementById("FILE").style.display=(mode=="i")?"":"none";
        document.getElementById("DATES").style.display=(mode=="e"||mode=="p")?"":"none";
        document.getElementById("DATES_RADIO").style.display="";
        document.getElementById("byZ").style.display="";


        if (mode=="e")
        {
            document.getElementById("STOCK").style.display=(document.getElementById("ETYPE").value=="nm"||document.getElementById("ETYPE").value=="hm"||document.getElementById("ETYPE").value=="hmz"||document.getElementById("ETYPE").value=="sapt"||document.getElementById("ETYPE").value=="saps"||document.getElementById("ETYPE").value=="csvm"||document.getElementById("ETYPE").value=="csva")?"":"none";
            document.getElementById("OPTIONS").style.display="none";
            document.getElementById("OPTIONS1").style.display="none";
            document.getElementById("OPTIONS2").style.display==(document.getElementById("ETYPE").value=="h")?"":"none";
        }
        else if(mode=="i")
        {
            document.getElementById("STOCK").style.display="none";
            document.getElementById("OPTIONS").style.display=(document.getElementById("ITYPE").value=="e")?"":"none";
            document.getElementById("OPTIONS1").style.display=(document.getElementById("ITYPE").value=="s"||document.getElementById("ITYPE").value=="p"||document.getElementById("ITYPE").value=="k"||document.getElementById("ITYPE").value=="sr")?"":"none";
            document.getElementById("OPTIONS2").style.display="none";
        }
        else if(mode=="p")
        {
            handleDates(1);
            document.getElementById("STOCK").style.display="";
            document.F.stock.disabled=false;
            document.getElementById("DATES_MANUAL").checked=true;
            document.getElementById("DATES_RADIO").style.display="none";
            document.getElementById("byZ").style.display="none";
            document.getElementById("OPTIONS").style.display="none";
            document.getElementById("OPTIONS1").style.display="none";
            document.getElementById("OPTIONS2").style.display="none";
        }
    }

    function chTypeE(v){
        document.getElementById("DATES").style.display=(v=="h"||v=="nk"||v=="hm"||v=="nm"||v=="hmz"||v=="sapt"||v=="saps"||v=="csvm"||v=="csva")?"":"none";
        document.getElementById("MODES").style.display=(v=="hm"||v=="nm")?"":"none";
        document.getElementById("MODES1").style.display=(v=="saps")?"":"none";
        document.getElementById("MODES2").style.display=(v=="hmz")?"":"none";
        document.getElementById("OPTIONS2").style.display="none";
        document.getElementById("ZED").style.display="none";
        document.getElementById("byZ").style.display="none";
        switch (v){
            case "h":
                document.getElementById("FRAME").src="export_hash.php?rmodule=<?=$rmodule?>";
                F.action='export_hash.php?simple=1&action=do&rmodule=<?=$rmodule?>';
                document.getElementById("STOCK").style.display="none";
                document.getElementById("OPTIONS2").style.display="";
                break;
            case "hc":
                document.getElementById("FRAME").src="export_hash_clients.php?rmodule=<?=$rmodule?>";
                F.action='export_hash_clients.php?simple=1&action=do&rmodule=<?=$rmodule?>';
                document.getElementById("STOCK").style.display="none";
                break;
            case "nk":
                document.getElementById("FRAME").src="export_hash.php?nohalim=1&rmodule=<?=$rmodule?>";
                F.action='export_hash.php?nohalim=1&simple=1&action=do&rmodule=<?=$rmodule?>';
                document.getElementById("STOCK").style.display="none";
                break;
            case "hm":
                document.getElementById("STOCK").style.display="";
                document.getElementById("FRAME").src="export_hash_movein.php?rmodule=<?=$rmodule?>";
                F.action='export_hash_movein.php?simple=1&action=do&rmodule=<?=$rmodule?>';
                document.getElementById("byZ").style.display="";
                break;
            case "nm":
                document.getElementById("STOCK").style.display="";
                document.getElementById("FRAME").src="export_hash_movein.php?nohalim=1&rmodule=<?=$rmodule?>";
                F.action='export_hash_movein.php?simple=1&nohalim=1&action=do&rmodule=<?=$rmodule?>';
                break;
            case "hmz":
                document.getElementById("STOCK").style.display="";
                document.getElementById("FRAME").src="export_hash_movein_z.php?rmodule=<?=$rmodule?>";
                F.action='export_hash_movein_z.php?simple=1&action=do&rmodule=<?=$rmodule?>';
                break;
            case "sapt":
                document.getElementById("STOCK").style.display="";
                document.getElementById("FRAME").src="export_sap_movein.php?rmodule=<?=$rmodule?>";
                F.action='export_sap_movein.php?simple=1&action=do&rmodule=<?=$rmodule?>';
                document.getElementById("byZ").style.display="";
                break;
            case "saps":
                document.getElementById("STOCK").style.display="";
                document.getElementById("FRAME").src="export_sap_tnuot.php?rmodule=<?=$rmodule?>";
                F.action='export_sap_tnuot.php?simple=1&action=do&rmodule=<?=$rmodule?>';
                break;
            case "csvm":case "csva":
                    document.getElementById("STOCK").style.display="";
                    document.getElementById("FRAME").src="export_csvdeals.php?type="+v+"&rmodule=<?=$rmodule?>";
                    F.action='export_csvdeals.php?type='+v+'&simple=1&action=do&rmodule=<?=$rmodule?>';
                    break;
                case "csvc":
                    document.getElementById("STOCK").style.display="";
                    document.getElementById("FRAME").src="export_csvclients.php?rmodule=<?=$rmodule?>";
                    F.action="export_csvclients.php?simple=1&action=do&rmodule=<?=$rmodule?>";
                    break;
                case "x":
                    document.getElementById("STOCK").style.display="none";
                    document.getElementById("ZED").style.display="";
                    document.getElementById("FRAME").src="export_xml.php?rmodule=<?=$rmodule?>";
                    F.action="export_xml.php?simple=1&action=do&rmodule=<?=$rmodule?>";
                    break;
               default:
                    document.getElementById("FRAME").src="blankimp.php?rmodule=<?=$rmodule?>";

                }
            }

            function chTypeI(v){
                document.getElementById("STOCK1").style.display="none";
                document.getElementById("DOCPERSHEET").style.display="none";
                document.getElementById("SFIRADDMODE").style.display="none";
                switch(v){
                    case"e":
                        document.getElementById("OPTIONS").style.display="";
                        document.getElementById("OPTIONS1").style.display="none";
                        document.getElementById("FRAME").src="importcsv.php?rmodule=<?=$rmodule?>";
                        F.action='importcsv.php?simple=1&action=do&rmodule=<?=$rmodule?>';
                        break;
                    case"c":
                        document.getElementById("OPTIONS").style.display="none";
                        document.getElementById("OPTIONS1").style.display="none";
                        document.getElementById("FRAME").src="importclients.php?rmodule=<?=$rmodule?>";
                        F.action='importclients.php?simple=1&action=do&rmodule=<?=$rmodule?>';
                        break;
                    case"a":
                        document.getElementById("OPTIONS").style.display="none";
                        document.getElementById("OPTIONS1").style.display="none";
                        document.getElementById("FRAME").src="importpersons.php?rmodule=<?=$rmodule?>";
                        F.action='importpersons.php?simple=1&action=do&rmodule=<?=$rmodule?>';
                        break;
                    case "s":
                        document.getElementById("OPTIONS").style.display="none";
                        document.getElementById("OPTIONS1").style.display="";
                        document.getElementById("FRAME").src="import_sfira.php?rmodule=<?=$rmodule?>";
                        F.action='import_sfira.php?simple=1&action=do&rmodule=<?=$rmodule?>';
                        document.getElementById("SFIRADDMODE").style.display="";
                        break;
                    case "sr":
                        document.getElementById("OPTIONS").style.display="none";
                        document.getElementById("OPTIONS1").style.display="";
                        document.getElementById("SFIRADDMODE").style.display="";
                        document.getElementById("FRAME").src="import_sfiraratz.php?rmodule=<?=$rmodule?>";
                        F.action='import_sfiraratz.php?simple=1&action=do&rmodule=<?=$rmodule?>';
                        break;
                    case "d":
                        document.getElementById("OPTIONS").style.display="none";
                        document.getElementById("OPTIONS1").style.display="none";
                        document.getElementById("FRAME").src="import_delete.php?rmodule=<?=$rmodule?>";
                        F.action='import_delete.php?simple=1&action=do&rmodule=<?=$rmodule?>';
                        break;
                    case "p":
                        document.getElementById("OPTIONS1").style.display="";
                        document.getElementById("DRAFT").style.display="";
                        document.getElementById("DOCPERSHEET").style.display="";
                        document.getElementById("OPTIONS").style.display="none";
                        document.getElementById("STOCK1").style.display="";
                        document.getElementById("FRAME").src="import_purchase.php?rmodule=<?=$rmodule?>";
                        F.action='import_purchase.php?simple=1&action=do&rmodule=<?=$rmodule?>';
                        break;
                    case "k":
                        document.getElementById("OPTIONS1").style.display="";
                        document.getElementById("DRAFT").style.display="";
                        document.getElementById("DOCPERSHEET").style.display="";
                        document.getElementById("OPTIONS").style.display="none";
                        document.getElementById("STOCK1").style.display="";
                        document.getElementById("FRAME").src="import_purchase.php?m=knisa&rmodule=<?=$rmodule?>";
                        F.action='import_purchase.php?simple=1&m=knisa&action=do&rmodule=<?=$rmodule?>';
                        break;
                    case "ez":
                        document.getElementById("OPTIONS1").style.display="";
                        document.getElementById("DRAFT").style.display="";
                        document.getElementById("DOCPERSHEET").style.display="";
                        document.getElementById("OPTIONS").style.display="none";
                        document.getElementById("STOCK1").style.display="";
                        document.getElementById("FRAME").src="import_purchase.php?m=echzer&rmodule=<?=$rmodule?>";
                        F.action='import_purchase.php?simple=1&m=echzer&action=do&rmodule=<?=$rmodule?>';
                        break;
                    case "s2":
                        document.getElementById("OPTIONS1").style.display="";
                        document.getElementById("DRAFT").style.display="none";
                        document.getElementById("DOCPERSHEET").style.display="";
                        document.getElementById("SFIRADDMODE").style.display="";
                        document.F.draftonly.checked=false;
                        document.getElementById("OPTIONS").style.display="none";
                        document.getElementById("STOCK1").style.display="";
                        document.getElementById("FRAME").src="import_purchase.php?m=sfira&rmodule=<?=$rmodule?>";
                        F.action='import_purchase.php?simple=1&m=sfira&action=do&rmodule=<?=$rmodule?>';
                        break;
                    case "t":
                        document.getElementById("OPTIONS").style.display="none";
                        document.getElementById("OPTIONS1").style.display="none";
                        document.getElementById("FRAME").src="import_transfer.php?rmodule=<?=$rmodule?>";
                        F.action='import_transfer.php?simple=1&action=do&rmodule=<?=$rmodule?>';
                        break;
                    case "m":
                        document.getElementById("OPTIONS").style.display="none";
                        document.getElementById("OPTIONS1").style.display="none";
                        document.getElementById("FRAME").src="import_attributes.php?rmodule=<?=$rmodule?>";
                        F.action='import_attributes.php?simple=1&action=do&rmodule=<?=$rmodule?>';
                        break;
                    case "tr":
                        document.getElementById("OPTIONS").style.display="none";
                        document.getElementById("OPTIONS1").style.display="none";
                        document.getElementById("FRAME").src="import_trans.php?rmodule=<?=$rmodule?>";
                        F.action='import_trans.php?simple=1&action=do&rmodule=<?=$rmodule?>';
                        break;
                    case "pr":
                        document.getElementById("OPTIONS").style.display="none";
                        document.getElementById("OPTIONS1").style.display="none";
                        document.getElementById("FRAME").src="import_prices.php?rmodule=<?=$rmodule?>";
                        F.action='import_prices.php?simple=1&action=do&rmodule=<?=$rmodule?>';
                        break;
                    case "h":
                        document.getElementById("OPTIONS").style.display="none";
                        document.getElementById("OPTIONS1").style.display="none";
                        document.getElementById("FRAME").src="import_chash.php?rmodule=<?=$rmodule?>";
                        F.action='import_chash.php?simple=1&action=do&rmodule=<?=$rmodule?>';
                        break;
                    default:
                        document.getElementById("FRAME").src="blankimp.php?rmodule=<?=$rmodule?>";
                    }
                }


                function chTypeP(v)
                {
                    switch(v)
                    {
                        case "full":
                            document.getElementById("FRAME").src="export_openformat.php?rmodule=<?=$rmodule?>";
                            F.action='export_openformat.php?simple=1&action=do&rmodule=<?=$rmodule?>';
                            break;
                        }
                    }

</script>

<?php

if (!$sDate)
{
    $firstday = mktime(0,0,0,date("m"),1,date("Y"));
    $sDate = date("d/m/Y",strtotime("+0 day",$firstday));
    $eDate = date("d/m/Y",strtotime("-1 day",strtotime("+ 1 month",$firstday)));
}
?>
<body >
    <table cellpadding=5 border=0 width=100%>
        <tr>
            <td colspan=2 bgcolor=#00a7eb align=center>
                <center><strong><?=$lang["admin_menu_imports"]?></strong></center>
            </td>
        </tr>
        <tr></tr>
        <tr></tr>
        <tr></tr>
        <form name=F  onsubmit='return validate();' method=post action='importcsv.php?simple=1&action=do&rmodule=<?=$rmodule?>' encType=multipart/form-data target=log>
              <tr>
                <td width=120 bgcolor=#efefef width=1% nowrap>סוג פעולה</td>
                <td>
                    <input type=radio name=mode onclick='chMode("i")' value=i onclick='sswitch(1)' checked>יבוא
                    &nbsp;&nbsp;
                    <input type=radio name=mode onclick='chMode("e")' value=e onclick='sswitch(2)'>יצוא
                    &nbsp;&nbsp;
                    <input type=radio name=mode onclick='chMode("p")' value=p onclick='sswitch(3)'><?=$lang["open_format"]?>

                </td>
            </tr>
            <tr>
                <td bgcolor=#efefef width=1% nowrap>סוג תוכנה זרה</td>
                <td>
                    <select id=ITYPE name=itype style='width:100%' onchange="chTypeI(this.value)">
                        <option value=""></option>
                        <option value=e>קובץ EXCEL - פריטים
                        <option value=c>קובץ EXCEL - לקוחות/ספקים
                        <option value=a>קובץ EXCEL - אנשי קשר
                        <option value=s>קובץ EXCEL - ספירת מלאי
                        <option value=sr>קובץ EXCEL - ספירת מלאי רציפה
                        <option value=p>קובץ EXCEL - קניה למלאי
                        <option value=k>קובץ EXCEL - כניסה למלאי
                        <option value=ez>קובץ EXCEL - החזרה לספק
                        <option value=s2>קובץ EXCEL - ספירת מלאי (2)
                        <option value=t>קובץ EXCEL - תזוזת פריט
                        <option value=m>קובץ EXCEL - מאפיינים
                        <option value=d>קובץ EXCEL - מחיקת / שינוי סטטוס פריטים
                            <?if ($workmode=="A")
{?>
                        <option value=pr>קובץ EXCEL - הפרדת מחירים בין הנקודות
<?}?> 
                        <option value=h>קובץ חשבשבת - פריטים
                        <option value=tr>קובץ TRANS/PLUDTA מ-SUNDISK</option>
                    </select>


                    <select style='display:none;width:160' id=ETYPE name=etype onchange="chTypeE(this.value)">
                        <option value=""></option>
                        <option value=h>חשבשבת KUPA
                        <option value=hm logcode=hm>חשבשבת MOVEIN
                        <option value=hc logcode=hc>חשבשבת HESHIN
                        <option value=nk>נוהלים KUPA
                        <option value=nm>נוהלים MOVEIN
                        <option value=hmz>חשבשבת MOVEIN מרוכז
                        <option value=sapt logcode=sap>קובץ תנועות יומן SAP
                        <option value=saps>קובץ תנועות מלאי SAP
                        <option value=csvm>CSV - עסקאות מזומן
                        <option value=csva>CSV - עסקאות אשראי
                        <option value=csvc>CSV - לקוחות/ספקים
                        <option value=x>XML - חשבוניות קופה רושמת
                    </select>

                    <select style='display:none;width:250' id=PTYPE name=ptype onchange="chTypeP(this.value)">
                        <option value=full>INI.TXT + BKMVDATA.ZIP
                    </select>


                    <span id=MODES style='display:none'>
                        <input type=checkbox name='transactions' checked>קופות
                        <input type=checkbox name='documents'>מסמכים
                        <input type=checkbox name='takbulonly'>רק תקבולים
                        <input type=checkbox name='nohakafa'>ללא הקפה
                        <input type=checkbox name='newasmachta'>אסמכתא רצה
                    </span>

                    <span id=MODES1 style='display:none'>
		סוג מסמך:
                        <select name=doctype>
                            <option value="1">חשבונית מס
                            <option value="20">תעודת משלוח
                        </select>
                    </span>

                    <span id=MODES2 style='display:none'>
                        <input type=checkbox name='nohakafa'>ללא הקפה
                    </span>

                </td>
            </tr>
            <tr id=FILE >
                <td height=37 bgcolor=#efefef nowrap> שם קובץ ליבוא</td>
                <td><input  type=file name=impfile style='width:100%'></td>
            </tr>
            <tr id=DATES style='display:none'>
                <td height=37  bgcolor=#efefef nowrap> תאריכי יצוא</td>
                <td>
                    <span id="DATES_RADIO">
                        <input type=radio name=auto value=1 checked onclick=handleDates(0)> אוטומטי
                        <input type=radio name=auto id="DATES_MANUAL" value=0  onclick=handleDates(1)>
                    </span>
<?=$lang["from"]?> <input disabled size=6 name=sDate id=sDate value="<?=$sDate?>">
                    <img id=CALFROM disabled align=absmiddle style="cursor:hand" src='<?=$imgPath?>calendar.gif' onclick='ShowCalendar("F.sDate")'>
<?=$lang["to"]?> <input disabled size=6 name=eDate id=eDate value="<?=$eDate?>">
                    <img id=CALTO disabled align=absmiddle style="cursor:hand" src='<?=$imgPath?>calendar.gif' onclick='ShowCalendar("F.eDate")'>
                    <span id="byZ">
                        <input type=radio name=auto value=2 onclick=handleDates(2)> לפי Z
                        <input type=button value='בחר Z...' disabled id=btnZed onclick='selectZ()'>
                        <input type=hidden name=zids>
                    </span>
                </td>
            </tr>
            <tr id=ZED style='display:none'>
                <td height=37  bgcolor=#efefef nowrap> תווך יצוא</td>
                <td>
			מספר Z
                    <?	$rs = DBQuery("select p.id, journaldate, journalnum, stockname from
				transactionpackages p, $TABLE_LISTINGSSTOCKS s where p.stock_id = s.id order by journaldate desc,journalnum desc");
?>
                    <select name="packageid">
<?while(!$rs->EOF)
                            {?>
                        <option value="<?=$rs->fields["id"]?>">#<?=$rs->fields["journalnum"]?> (<?=dateFromSQL($rs->fields["journaldate"])?>, <?=$rs->fields["stockname"]?>)
    <?$rs->MoveNext();}?>
                    </select>
                </td>
            </tr>
            <tr id=OPTIONS style=''>
                <td height=37  bgcolor=#efefef nowrap>אפשרויות</td>
                <td>
                    <input type='checkbox' name=translit>להפוך ללועזית
                    <?if (false)
{?>
                    &nbsp;<input type='checkbox' name=forcepriceupdate>לעדכן מכיר בכל נקודות המכירה
<?}?>
                </td>
            </tr>
            <tr id=OPTIONS1 style='display:none'>
                <td height=37  bgcolor=#efefef nowrap>אפשרויות</td>
                <td>
                    <input type='checkbox' name=createproducts checked>ליצור פריטים שאינם קיימים במערכת
                    <span id="DRAFT">
                        <input type='checkbox' name=draftonly >לייצר מסמכי טיוטה
                    </span>
<?if (false)
{?>
                    &nbsp;<input type='checkbox' name=forcepriceupdate>לעדכן מכיר בכל נקודות המכירה
<?}?>
                    <div id="DOCPERSHEET">
                        <input type='checkbox' name=docpersheet >מסמך נפרד לכל גיליין
                    </div>
                    <div id="SFIRADDMODE">
                        <input type='checkbox' name=addmode >להוסיף למלאי
                    </div>
                </td>
            </tr>
            <tr id=OPTIONS2 style='display:none'>
                <td height=37  bgcolor=#efefef nowrap>אפשרויות</td>
                <td>
                    <input type='checkbox' name=forwindows >גירסת Windows
                </td>
            </tr>
            <tr id=STOCK style='display:none' >
                <td height=37  bgcolor=#efefef nowrap> נקודת מכירה</td>
                <td>
                        <?
$stocks = GetStocks(true);
?>
                    <select name=stock disabled style='width:100%'>
<?FillStockList($stocks,$stock);?>
                    </select>
                </td>
            </tr>
            <tr id=STOCK1 style='display:none' >
                <td height=37  bgcolor=#efefef nowrap> <?=$lang["stock_point"]?></td>
                <td>
<?
                        $lang['all_points'] = $lang["use_file_point"];
$stocks1 = GetStocks(true);
?>
                    <select name=stock1  style='width:100%'>
<?FillStockList($stocks1,$stock);?>
                    </select>
                </td>
            </tr>
            <tr>
                <td colspan=2 align=center><hr><input type=submit class=button value="&nbsp;אישור&nbsp;"></td>
            </tr>
            <tr><td colspan=2 ><iframe id=FRAME name=log src='blankimp.php?rmodule=<?=$rmodule?>' style='width:100%;height:240'></iframe></td></tr>
        </form>
    </table>
    <script>
                        function sswitch(mode){
                            document.F.file.disabled = (mode==2)
                            if (mode==2){
                                document.F.file.value="";
                            }

                        }

                        function selectZ()
                        {
                            s = showModalDialog("selectz.php?logcode="+document.getElementById("ETYPE").options[document.getElementById("ETYPE").selectedIndex].logcode+"&stock="+document.F.stock.value+"&zids="+document.F.zids.value,"","dialogWidth:400px;dialogHeight:400px;status:no;center:yes;help:no");
                            if (typeof(s)!="undefined"&&s!="")
                            {
                                document.F.zids.value = s;
                            }
                        }

    </script>
<?
include("$config[template_path]/admin_bottom.html");
$conn->Close(); // close the db connection
?>