function popup(url,width,height)
{
	var popup = window.open(url, '_blank', 'width='+width+',height='+height+',resizable=yes,status=yes,scrollbars=yes');
    if (!popup.opener) popup.opener = self;
	popup.focus();
}

function confirm_action(url, message)
{
	if (confirm(unescape(message)))
	{
		parent.location=url
	}
}

function XmlHttp() {
    var request;
    try {
        request = new XMLHttpRequest();
    } catch (trymicrosoft) {
        try {
            request = new ActiveXObject("Msxml2.XMLHTTP");
        } catch (othermicrosoft) {
            try {
                request = new ActiveXObject("Microsoft.XMLHTTP");
            } catch (failed) {
                request = false;
            }
        }
    }

    if (!request)
        alert("Error initializing XMLHttpRequest!");
    else
        return request;
}

function XmlDoc() {
    var xmlDoc;
    if (window.DOMParser)
    {
          var parser = new DOMParser();
          xmlDoc = parser.parseFromString(s, "text/xml");
    }
    else
    {// code for IE
         xmlDoc=new ActiveXObject("Microsoft.XMLDOM");
    }

    if (!xmlDoc)
        alert("Error initializing xmlDoc!");
    else
        return xmlDoc;
}

function SetCookieVal(name, value) 
{  
	var argv = SetCookieVal.arguments;  
	var argc = SetCookieVal.arguments.length;  
	var expires = (argc > 2) ? argv[2] : null;  
	//var path = (argc > 3) ? argv[3] : null;  
	var domain = (argc > 4) ? argv[4] : null;  
	var secure = (argc > 5) ? argv[5] : false;  
	var path = "/"; //allows the tree to remain open across pages with diff names & paths


	document.cookie = name + "=" + escape (value) + 
	((expires == null) ? "" : ("; expires=" + expires.toGMTString())) + 
	((path == null) ? "" : ("; path=" + path)) +  
	((domain == null) ? "" : ("; domain=" + domain)) +    
	((secure == true) ? "; secure" : "");
}

function addEvent(obj, event, handler) {
    if (obj.addEventListener) {
        obj.addEventListener(event, handler, false);
    } else if (obj.attachEvent) {
        obj.attachEvent('on' + event, handler);
    }
};

function reloadParentBasket(mode){
    if (typeof(mode)=="undefined")mode="basket";
    window.opener.frames["LISTING"].window.checkBasket(mode);
}

function checkBasket(mode) 
{
    var s;
	if (typeof(mode)=="undefined")mode="basket";
	xmlhttp = new ActiveXObject("Microsoft.XMLHTTP")
	xmlhttp.open("GET",mode+".php?action=getitems",false)
	xmlhttp.send()
	s = ","+xmlhttp.responseText+","
    cl = document.getElementById("LISTTABLE").all.tags("INPUT");
    for(i=0;i<cl.length;i++)
    {   
        cl[i].checked = !isNaN(parseInt(cl[i].id)) && s.indexOf(","+cl[i].id+",")!=-1;
    }   
    if (mode=="clientbasket")
        parent.refreshClientBasket(); 
    else if (mode=="docbasket")
        parent.refreshDocBasket();
    else if (mode=="takbulbasket") 
        parent.refreshTakbulBasket();
    else if (mode=="personbasket") 
        parent.refreshPersonBasket();
    else
        parent.refreshBasket(); 
}




function reloadParent(){
    try
    {   
        try
        {
           window.opener.refreshBasket();
        } 
        catch(e){}

        if (window.opener.document.forms.length > 0 &&  window.opener.document.forms[0].getAttribute("refreshable")=="1") 
        {
            window.opener.document.forms[0].submit();
        }
        else
        {
            delim = (window.opener.frames["LISTING"].window.location.href.indexOf("?")>-1)?"&":"?";
            nofocus = (window.opener.frames["LISTING"].window.location.href.indexOf("nofocus")>-1)?"":(delim+"nofocus=1")
            window.opener.frames["LISTING"].window.location=window.opener.frames["LISTING"].window.location.href+nofocus  
        }
    } 
    catch(e)
    {
        try
        {
            delim = (window.opener.location.href.indexOf("?")>-1)?"&":"?";
            window.opener.location=window.opener.location.href+delim+'nofocus=1'
        }
        catch(e){}
    }
}

function gel(id)
{
    var isIE = false;
    if(navigator.userAgent.indexOf('Internet Explorer')){isIE = true;}
    //fix both IE (adjust when they implement this method properly)
    if(isIE){
      var elem = document.getElementById(id);
      if(elem){
        //verify it is a valid match!
        if(elem.attributes['id'] && elem.attributes['id'].value == id){
          //valid match!
          return elem;
        } else {
          //not a valid match!
          //the non-standard, document.all array has keys for all name'd, and id'd elements
          //start at one, because we know the first match, is wrong!
          for(var i=1;i<document.all[id].length;i++){
            if(document.all[id][i].attributes['id'] && document.all[id][i].attributes['id'].value == id){
              return document.all[id][i];
            }
          }
        }
      }
      return null;
    } else {
      return document.getElementById(id);
    }
}
function get_object(name)
{
	if (document.getElementById)
	{
		return document.getElementById(name);
 	}
 	else if (document.all)
	{
  		return document.all[name];
 	}
 	else if (document.layers)
	{
  		return document.layers[name];
	}
	return false;
}

function changeTab(tabIndex){
    for (i=0;i<document.all("TAB").length;i++){
        tab=document.all("TAB")[i];
        tab.className=(parseInt(tab.tabIndex)==tabIndex)?"sactiveTab":"sinactiveTab";
    }
    for (i=0;i<document.all("TROW").length;i++){
        tab=document.all("TROW")[i];
        tab.style.display=(parseInt(tab.tabIndex)==tabIndex)?"":"none";
    }
}

function openDoc(params,windowName,openerObj)
{
    if (typeof(windowName)=="undefined"||windowName=="")windowName="document";
    if (typeof(openerObj)=="undefined"||openerObj=="")openerObj=window;  
    s=openerObj.wopen('/modules/stock/add_document.php?'+params,windowName,screen.availWidth-100,520,true);
    try{s.focus()}catch(e){}
}  

function openCrmDoc(params,windowName,openerObj)
{
    if (typeof(windowName)=="undefined"||windowName=="")windowName="document";
    if (typeof(openerObj)=="undefined"||openerObj=="")openerObj=window;  
    s=openerObj.wopen('/modules/stock/crm/crm_document.php?'+params,windowName,930,550,true);
    try{s.focus()}catch(e){}
}  

function validateForm(formEl)
{
    var e=0;
    var f=0; 
    var focusset=false;
    for(i=0;i<formEl.elements.length;i++) 
    {
        el =formEl.elements[i];
        if (el.parentNode.previousSibling==null)continue;
        if(el.parentNode.previousSibling.tagName!="TD")continue;
        el.parentNode.previousSibling.style.backgroundColor='';
        
        if (el.getAttribute("mandatory")=="1" && !el.disabled && el.value.replace(/ /,"")=="")
        {
            el.parentNode.previousSibling.style.color='red';
            fName = $(el.parentNode.previousSibling).text().replace(': *','');
            if (!focusset){try{el.focus();}catch(e){};focusset=true}
            e=1; 
        }
        if (e==0 && el.format=="integer" && el.value!="")
        {
            if (isNaN(parseInt("1"+el.value))||parseInt("1"+el.value)!="1"+el.value)
            {
                el.parentNode.previousSibling.style.color='red';
                if (!focusset){try{el.focus();}catch(e){};focusset=true}
                f=1;
            } 
        }
        if (e==0 && el.format=="decimal" && el.value!="")
        {
            if (isNaN(parseFloat(el.value)))
            {
                el.parentNode.previousSibling.style.color='red';
                if (!focusset){try{el.focus();}catch(e){};focusset=true}
                f=1;
            } 
        }        
    }
    if (e==1) 
    {
        alert("יש להזין ערך בכל שדות חובה ("+fName+")");
        return false;
    }
    else if (f==1)
    {   
        alert("יש להזין ערך נומירי בשדה המסומן");
        return false;
    }
    
    if (typeof myCustomAction == 'function')
    	return myCustomAction();
    return true;
}


function checkIDNum(idnum) {

    while (idnum.length<9)
    {
        idnum="0"+idnum;
    }
    idnum1=idnum.substr(0,1)*1;
    idnum2=idnum.substr(1,1)*2;
    idnum3=idnum.substr(2,1)*1;
    idnum4=idnum.substr(3,1)*2;
    idnum5=idnum.substr(4,1)*1;
    idnum6=idnum.substr(5,1)*2;
    idnum7=idnum.substr(6,1)*1;
    idnum8=idnum.substr(7,1)*2;
    idnum9=idnum.substr(8,1)*1;

    if (idnum1>9) idnum1=(idnum1%10)+1;
    if (idnum2>9) idnum2=(idnum2%10)+1;
    if (idnum3>9) idnum3=(idnum3%10)+1;
    if (idnum4>9) idnum4=(idnum4%10)+1;
    if (idnum5>9) idnum5=(idnum5%10)+1;
    if (idnum6>9) idnum6=(idnum6%10)+1;
    if (idnum7>9) idnum7=(idnum7%10)+1;
    if (idnum8>9) idnum8=(idnum8%10)+1;
    if (idnum9>9) idnum9=(idnum9%10)+1;

    var sumval=idnum1+idnum2+idnum3+idnum4+idnum5+idnum6+idnum7+idnum8+idnum9;

    sumval=sumval%10;
    if (sumval>0)
    {
        return false;
    }
    return true;
}

function checkAccButton() {
    document.write('<input type=button value="לבדוק הגבלה" onclick="checkAccount(document.inf.Bank.value,document.inf.Snif.value,document.inf.Account.value);">');
}

function checkAccount(bank,dept,acc) {
    if (bank==""||dept==""||acc=="")
    {
	    alert("לבדיקת הגבלה יש להזון מספר בנק, סניף וחשבון");
	    return;
    }
    window.open("http://www.bankisrael.gov.il/black.php?bank="+bank+"&snif="+dept+"&acct="+acc,"","width=595,height=560,scrollbars=no,status=no,left=200,top=200,resizable=no");
}

function checkPersButton(title) { 
    document.write('<input type=button value="'+title+'" onclick="checkPerson(document.inf.BusinessNum.value);">');
}

function checkPerson(pers) {
    if (pers=="")
    {
	    alert("לבדיקת הגבלה יש להזון מספר עסק / זהות");
	    return;
    }
    window.open("https://app.boi.gov.il/pls/pvk_web/Pvk_Zibur?p_id="+pers,"","width=670,height=370,scrollbars=no,status=no,left=200,top=200,resizable=no");
}

function wopen(url,name,width,height,center,resizable){
	var left = 150;
	var top = 50;
		var s;
	if (typeof(width)=="undefined") width=500;
	if (typeof(height)=="undefined") height=500;
		if (typeof(resizable)=="undefined")resizable="yes";
	if (typeof(center)!="undefined") {
		left = Math.round((screen.availWidth-width)/2);
		top = Math.round((screen.availHeight-height)/2);
	}
	s = window.open(url+'&simple=1',name,'top='+top+',left='+left+',height='+height+',width='+width+',resizable='+resizable+',scrollbars=yes');
	try	{
		s.focus();
	}
	catch(e){};
}

//Show Calendar dialog
function ShowCalendar(id) {
    var name = id.split('.')[1];
    $("input[name="+name+"]").datepicker().datepicker("show");
}

function ShowCalendar1(id) {
    ShowCalendar(id);
}

function getKeyCode(e) {
	return e.which||e.keyCode;
}


function SelectSingleNode(xmlDoc, elementPath) {
    if(window.ActiveXObject)
    {
        var n = xmlDoc.selectSingleNode(elementPath);
        return n?n.text:"";
    }
    else
    {
       var xpe = new XPathEvaluator();
       var nsResolver = xpe.createNSResolver( xmlDoc.ownerDocument == null ? xmlDoc.documentElement : xmlDoc.ownerDocument.documentElement);
       var results = xpe.evaluate(elementPath,xmlDoc,nsResolver,XPathResult.FIRST_ORDERED_NODE_TYPE, null);
       return results && results.singleNodeValue ? results.singleNodeValue.textContent : "";
    }
}

function getOffsetTop(el) {
    e = el;
    s = el.offsetTop;
    while (e.offsetParent != null) 	{
        s += e.offsetTop;
        e = e.offsetParent;
    }
    return s;
}
function getOffsetLeft(el) {
    e = el;
    s = el.offsetLeft;
    while (e.offsetParent != null) {
        s += e.offsetLeft;
        e = e.offsetParent;
    }
    return s + 15;
}