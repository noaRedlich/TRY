<html lang="he"><head>
    <title></title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta charset="UTF-8">
    <link href="http://netdna.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css" rel="stylesheet"> 
        <link href="css/style.css" rel="stylesheet" media="screen">   
    <script src="http://code.jquery.com/jquery-latest.min.js" type="text/javascript"></script>
    <script src="js/script.js" type="text/javascript"></script>
    <link rel="stylesheet" href="//code.jquery.com/ui/1.11.2/themes/smoothness/jquery-ui.css">
    <script src="//code.jquery.com/ui/1.11.2/jquery-ui.js"></script>
    
  </head>
  <body class="" style="height: 339px;">
<div class="header">
  	<i class="fa fa-bars"></i>
	<div class="inline" style="width:47.5%"></div>
	<div class="inline relative" style="width:8%">
		<i class="left fa fa-user"></i>
		<i class="left fa fa-refresh"></i>
	</div>		
	<i class=" fa fa-clock-o"></i>
	<div class="stat inline">
		<label><a href="index.php?stock=<?=$_REQUEST[stock]?>">חזרה לקופה</a></label>
	</div>
	<div class="stat inline btn">
		<div class="openclose op">
			<i class="fa fa-check"></i>
			<span class=" stt open">פתוח</span>
		</div>	
		<div class="openclose cl display">
			<i class="fa fa-times"></i>
			<span class="stt close">סגור</span>
		</div>	
	</div>
	
	<i class=" fa fa-cog"></i>
	<div class="logo_border">
		<img src="images/logoex.png">		
	</div>
	
  </div>
  <div class="leftmenu display">
  	<div class="leftmenu_inner" onclick="location.href='index.php?stock=<?=$_REQUEST[stock]?>'">
  		<i class=" fa fa-usd"></i>
  		<p>קופה</p>
  	</div>
  	<div class="leftmenu_inner" onclick="location.href='top.php?t=clients&isClient=1&stock=<?=$_REQUEST[stock]?>'">
  		<i class=" fa fa-group"></i>
  		<p>לקוחות</p>
  	</div>
  	<div class="leftmenu_inner" onclick='location.href="top.php?t=reports&stock=<?=$_REQUEST[stock]?>"'>
  		<i class="fa fa-file-text-o"></i>
  		<p>דוחות</p>
  	</div>
  	<div class="leftmenu_inner" onclick="location.href='top.php?t=documents&stock=<?=$_REQUEST[stock]?>'">
  		<i class=" fa fa-file-o"></i>
  		<p>מסמכים</p>
  	</div>
  	<div class="leftmenu_inner"  onclick="location.href='top.php?t=mail&stock=<?=$_REQUEST[stock]?>'">
  		<i class="fa fa-envelope-o"></i>
  		<p>מערכת דיוור</p>
  	</div>
  	<div class="leftmenu_inner"  onclick="location.href='top.php?t=prepaid&stock=<?=$_REQUEST[stock]?>'">
  		<i class=" fa fa-money"></i>
  		<p>כרטיס מתנה</p>
  	</div>
  	<div class="leftmenu_inner"  onclick="location.href='top.php?t=check_check&stock=<?=$_REQUEST[stock]?>'">
  		<i class="fa fa-check-square-o"></i>
  		<p>בדיקת המחאות</p>
  	</div>
  	<div class="leftmenu_inner"  onclick="location.href='top.php?t=check_credit&stock=<?=$_REQUEST[stock]?>'">
  		<i class="fa fa-check-square-o"></i>
  		<p>בדיקת אשראי</p>
  	</div>
  </div>
  <?
  $href="";
  switch ($_GET[t]) {
      case 'clients':
          $href="/modules/stock/cppro/main.php?service=suppliers";
          break;
		  
	  case 'reports':
          $href="/modules/stock/reports.php?&simple=1";
          break;
      
	  case 'documents':
          $href="/modules/stock/pro.php?simple=1";
          break;
		  
	  case 'prepaid':
          $href="/modules/precard/?simple=1";
          break;
	  case 'clock':
		  $href="/modules/shaon/?simple=1";
		  break;
      default:
          
          break;
  }
  ?>
  <iframe src="<?=$href?>" width=100% height=100%></iframe>
  </body>
  </html>