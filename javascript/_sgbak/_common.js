function popup(url,width,height){	var popup = window.open(url, '_blank', 'width='+width+',height='+height+',resizable=yes,status=yes,scrollbars=yes');    if (!popup.opener) popup.opener = self;	popup.focus();}function confirm_action(url, message){	if (confirm(unescape(message)))	{		parent.location=url	}}function reloadParentBasket(){    window.opener.frames["LISTING"].window.checkBasket();} function checkBasket(){    var s;	xmlhttp = new ActiveXObject("Microsoft.XMLHTTP")	xmlhttp.open("GET","basket.php?action=getitems",false)	xmlhttp.send()	s = ","+xmlhttp.ResponseText+","    cl = document.getElementById("LISTTABLE").all.tags("INPUT");    for(i=0;i<cl.length;i++)    {           cl[i].checked = !isNaN(parseInt(cl[i].id)) && s.indexOf(","+cl[i].id+",")!=-1;    }       parent.refreshBasket();}function reloadParent(){    try    {           try        {           window.opener.refreshBasket();        }         catch(e){}        if (window.opener.document.forms.length > 0 &&  window.opener.document.forms[0].refreshable=="1")         {            window.opener.document.forms[0].submit();        }        else        {            delim = (window.opener.frames["LISTING"].window.location.href.indexOf("?")>-1)?"&":"?";            nofocus = (window.opener.frames["LISTING"].window.location.href.indexOf("nofocus")>-1)?"":(delim+"nofocus=1")            window.opener.frames["LISTING"].window.location=window.opener.frames["LISTING"].window.location.href+nofocus          }    }     catch(e)    {        try        {            delim = (window.opener.location.href.indexOf("?")>-1)?"&":"?";            window.opener.location=window.opener.location.href+delim+'nofocus=1'        }        catch(e){}    }}function get_object(name){	if (document.getElementById)	{		return document.getElementById(name); 	} 	else if (document.all)	{  		return document.all[name]; 	} 	else if (document.layers)	{  		return document.layers[name];	}	return false;}function changeTab(tabIndex){    for (i=0;i<document.all("TAB").length;i++){        tab=document.all("TAB")[i];        tab.className=(parseInt(tab.tabIndex)==tabIndex)?"sactiveTab":"sinactiveTab";    }    for (i=0;i<document.all("TROW").length;i++){        tab=document.all("TROW")[i];        tab.style.display=(parseInt(tab.tabIndex)==tabIndex)?"block":"none";    }}function openDoc(params,windowName,openerObj){    if (typeof(windowName)=="undefined"||windowName=="")windowName="document";    if (typeof(openerObj)=="undefined"||openerObj=="")openerObj=window;      s=openerObj.wopen('/modules/stock/add_document.php?'+params,windowName,screen.availWidth-100,520,true);    try{s.focus()}catch(e){}}   function validateForm(formEl){    var e=0;     var f=0;    var focusset=false;    for(i=0;i<formEl.elements.length;i++)    {        el =formEl.elements[i];        if (el.parentElement.previousSibling==null)continue;        el.parentElement.previousSibling.style.backgroundColor='';                if (el.mandatory=="1" && el.value.replace(/ /,"")=="" && !el.disabled)        {            el.parentElement.previousSibling.style.color='red';            if (!focusset){try{el.focus();}catch(e){};focusset=true}            e=1;        }        if (e==0 && el.format=="integer" && el.value!="")        {            if (isNaN(parseInt(el.value))||parseInt(el.value)!=el.value)            {                el.parentElement.previousSibling.style.color='red';                if (!focusset){try{el.focus();}catch(e){};focusset=true}                f=1;            }         }    }    if (e==1)    {        alert("�� ����� ��� ��� ���� ����");        return false;    }    else if (f==1)    {           alert("�� ����� ��� ������ ���� ������");        return false;    }    return true;}function getOffsetTop(el) {    e = el;    s = el.offsetTop;    while (e.offsetParent != null) {        s += e.offsetTop;        e = e.offsetParent;    }    return s;}function getOffsetLeft(el) {    e = el;    s = el.offsetLeft;    while (e.offsetParent != null) {        s += e.offsetLeft;        e = e.offsetParent;    }    return s + 15;}	