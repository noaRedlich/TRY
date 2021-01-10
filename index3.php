
<!DOCTYPE html>
<html lang="he" ng-app="cashbox">
  <head>
    <title></title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <meta charset="UTF-8">

    <link href="http://netdna.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css" rel="stylesheet"> 
    <link href="css/style.css" rel="stylesheet" media="screen">   

    <script src="//code.jquery.com/ui/1.11.2/jquery-ui.js"></script>
     <script src="js/script.js" type="text/javascript"></script>
     
  </head>
  <body class="" >


  <div class="mainarea">
  	<input class="rrr" />
  	<button onclick="trigg()"></button>
  	<div ng-controller="CashProdController  as cash_prod">
  	<div class="right rightside" ng-controller="ProductController as prod">
  		<form class="search_form relative">
  			<input type="text" class="search_input" id="search_prod"  ng-keydown="call_setTab(4)"  placeholder="חיפוש מוצר" ng-model="searchText" />
			<i class="fa fa-search" onclick=""></i>
			<a href="javascript:wopen('http://a.yeda-t.com/modules/stock/add_listing.php?&simple=1&fromcash=1','add')">		
  			<div class="relative submit_wrap"> 				
  				<input type="button"  value=""/>
  				<i class="fa fa-tag"></i>				
				<i class="fa fa-plus"></i>
  			</div>
  		</a>
  		</form>
  		<div >
  		<div class="rightcenter prod_area relative" ng-show="call_isSet(1)" > 			
  			<div class="prod_div">
  			<div class="prod_title">
				<p id="cat_name" style="margin-right: 15%;">מחלקות</p>				
				<span id="num_product" style="float: left;margin-top: 11px;margin-left: 8px;color: white;"></span>
			</div>			 		 
  			<div class="prod_container">
  				<div id="resizable" class="prod_row ui-widget-content" style="text-align: center;"> 
  					<i class="fa fa-spinner fa-spin spinner1" style="font-size: 100px;  color: rgb(85,193,231);margin-top: 7%;"></i> 						
  					<div class="prod"  ng-repeat="cat in prod.catJson">
  					<div  class=" first main_cat" id="button_cats_{{cat.ID}}" ng-click="prod.getCategory2(cat.ID,cat.Title)">  						
  						<img ng-src="{{prod.image('<?=$target_image_dir?>',cat.picture)}}"></img>
						<p>{{cat.CategoryName}}</p>
  					</div>
					</div>
    				</div>
  			</div>
  			</div>
  			<!--<img src="images/arrow_o.png" class="arrow_o"/>-->
  			
  		</div>
  		<div class="rightcenter prod_area relative" ng-show="call_isSet(3)">
  			<div class="prod_div">
  			<div class="prod_title">
  				<p ng-click="call_setTab(1);reset()" class="prod_btntop">למחלקות</p>				
				<p  class="prod_btntop" ng-click="prev()" ng-show="isprev()">הקודם</p>
				<p  class="prod_btntop" ng-click="next()" ng-show="isnext()">הבא</p>
				<span id="num_product" style="float: left;margin-top: 11px;margin-left: 8px;color: white;">מס' הפריטים: <span class="numpritim1">{{filtered.length}}</span></span>
			</div>			 		 
  			<div class="prod_container">
  				<div id="resizable" class="prod_row ui-widget-content" style="text-align: center;"> 
  						<i class="fa fa-spinner fa-spin spinner2" style="font-size: 100px;  color: rgb(85,193,231);margin-top: 7%;"></i> 	
  					<div class="prod"  ng-repeat="cat2 in filtered=(prod.products | filter: { ProductGroup: prod.currgroup }  | slice:start:end)" >

  					<div  class=" first main_cat" id="button_cats_{{cat2.ID}}" ng-click="cash_prod.add_cart(cat2)">  						
  						<img src="images/product.png"></img>
						<p>{{cat2.Title}}</p>
  					</div> 					 
					</div>
    				</div>
  			</div>
  			</div>
  			<!--<img src="images/arrow_o.png" class="arrow_o"/>-->
  			
  		</div>
  		<div class="rightcenter prod_area relative" ng-show="call_isSet(4)">
  			<div class="prod_div">
  			<div class="prod_title">
  				<p ng-click="call_setTab(1);reset()" class="prod_btntop">למחלקות</p>	
				
				<p  class="prod_btntop" ng-click="prev()" ng-show="isprev()">הקודם</p>	
				<p  class="prod_btntop" ng-click="next()" ng-show="isnext()">הבא</p>
				<span id="num_product" style="float: left;margin-top: 11px;margin-left: 8px;color: white;">מס' הפריטים: <span class="numpritim2">{{filterprod.length}}</span></span>
				
			</div>			 		 
  			<div class="prod_container">
  				<div id="resizable" class="prod_row ui-widget-content"> 
  					
  					<div class="prod"  ng-repeat="cat2 in filterprod=(prod.products | filter: searchText | slice:start:end) " >

  					<div  class=" first main_cat" id="button_cats_{{cat2.ID}}" ng-click="cash_prod.add_cart(cat2)">  						
  						<img src="images/product.png" ></img>
						<p>{{cat2.Title}}</p>
  					</div> 					 
					</div>
    				</div>
  			</div>
  			</div>
  			<!--<img src="images/arrow_o.png" class="arrow_o"/>-->
  			
  		</div>
  		
  		</div>
  		
		<div class="curr_btn" style="height: 40px;position: absolute;bottom: 19px;width: 39%;">
  				<input type="button" class="rightcenter_btn btngreen prod_btn" value="הוסף פריט כללי  / מזער פריסט"  ng-show="call_isSetMulti(1,3,4)"  ng-click="call_setTab(2)">
  				<input type="button" class="rightcenter_btn btnorange  calc_btn" value="מחלקות / מוצרים מהירים"  ng-show="call_isSetMultiCalc(2,5)"  ng-click="call_setTab(1)">
  			</div>
  		<div class="rightcenter calc_area"   ng-show="call_isSetMultiCalc(2,5)">
  			<div class="rightcenter calc_area" style="">
  			<form name="Calc">
		<table style="width:100%" border="0" cellpadding="0" cellspacing="0">
		<tbody><tr>
		<td id="result_calc" class="input_result" style="height: 143.8px;">
		<input type="text" name="Input" style="width:98%;padding-right:2%;color:#42494f;height:92%">
		<br>
		</td>
		</tr>
		<tr>
		<td>
		<table class="inner_calc" style="direction: ltr;" border="0" cellpadding="0" cellspacing="0" ng-controller="PaymentController  as payment">
			<tbody><tr>
				
				<td style="height: 143.8px;"><input type="button" name="one" value="  1  " onclick="Calc.Input.value += '1'">  </td>
				<td style="height: 143.8px;"><input type="button" name="two" value="  2  " onclick="Calc.Input.value += '2'">  </td>
				<td style="height: 143.8px;"><input type="button" name="three" value="  3  " onclick="Calc.Input.value += '3'">  </td>
				<td style="height: 143.8px;"><input type="button" class="math" name="plus" value="  +  " onclick="Calc.Input.value += ' + '"></td>
				<td style="height: 143.8px;"><input type="button" class="math" name="clear" onclick="Calc.Input.value = ''" style="background:url('images/erase.png')no-repeat 51% 50% #e6e9ee!important"></td>				
			</tr>
			<tr>
			
		<td rowspan="1" style="height: 143.8px;"><input type="button" name="four" value="  4  " onclick="Calc.Input.value += '4'"></td>
		<td rowspan="1" style="height: 143.8px;"><input type="button" name="five" value="  5  " onclick="Calc.Input.value += '5'">  </td>
		<td rowspan="1" style="height: 143.8px;"><input type="button" name="six" value="  6  " onclick="Calc.Input.value += '6'">  </td>
		<td rowspan="1" style="height: 143.8px;"><input type="button" class="math" name="minus" value="  -  " onclick="Calc.Input.value += ' - '"></td>
		<td rowspan="3" style="position: relative; height: 143.8px;"><div name="DoIt" class="result" onclick="Calc.Input.value = eval(Calc.Input.value);" ng-click="cash_prod.add_new_cart();payment.calc3()"><i class="fa fa-check-circle"></i></div>
			<div name="DoIt" class="result2 display" onclick="Calc.Input.value = eval(Calc.Input.value);anacha_doit()"><i class="fa fa-check-circle"></i></div>
		</td>
			</tr>
			<tr>
		<td style="height: 143.8px;"><input type="button" name="seven" value="  7  " onclick="Calc.Input.value += '7'"></td>
		<td style="height: 143.8px;"><input type="button" name="eight" value="  8  " onclick="Calc.Input.value += '8'">  </td>
		<td style="height: 143.8px;"><input type="button" name="nine" value="  9  " onclick="Calc.Input.value += '9'">  </td>
		<td style="height: 143.8px;"><input type="button" class="math" name="times" value="  x  " onclick="Calc.Input.value += ' * '"></td>
			</tr>
			<tr>
		<td style="height: 143.8px;"><input type="button" name="dot" value="  .  " onclick="Calc.Input.value += '.'"></td>
		<td style="height: 143.8px;"><input type="button" name="zero" value="  0  " onclick="Calc.Input.value += '0'">  </td>
		<td style="height: 143.8px;"><input type="button" name="zerozero" value="  00  " onclick="Calc.Input.value += '00'"></td>
		<!-- <td><INPUT TYPE="button" NAME="DoIt"  VALUE="  =  " OnClick="Calc.Input.value = eval(Calc.Input.value)"></td> -->
		<td style="height: 143.8px;"><input type="button" class="math" name="div" value="  %  " onclick="Calc.Input.value += ' % '"></td>
			</tr>
		</tbody></table>
		</td>
		</tr>
		</tbody></table>
		</form>
  </div>
  		</div>
  	</div>

  	<div class="left leftside">
  		<div ng-controller='Client as clnt'>
		<div  class="relative search_form ">
			 <div class="large-padded-row" style="  display: inline-block; width: 92%;">
			      <div angucomplete-alt id="cust_search" placeholder="חיפוש לקוחות" pause="100" selected-object="selectedClient" local-data="clients" search-fields="SupplierName,sortorder" title-field="SupplierName"  minlength="1" input-class="form-control form-control-small  my_search_auto" match-class="highlight" clear-selected="true" >
			     </div> 
			     <i class="fa fa-search show"></i>
			</div>
			
			<div class="relative submit_wrap" onclick="openwrap('','.pop_add_client,.pop_add_client .container_pop ');$('.client.mainarea2 input').val('')">
				<input type="button"  value="" class="search_cust_sbm" onclick=""/>
				<i class="fa fa-user"></i>
				<i class="fa fa-plus"></i>
			</div>
			
		</div>

  			<div class="newrow2 find_cust_container display"><label class="lbl1 name">שם: {{SearchClient.SupplierName}}</label><span>|</span></span><label class="lbl2 border num">מספר: {{SearchClient.ClientNum}}</label>
  				<i class="fa fa-calendar" style="color: black;margin-right: 26px;"></i>
  				<label class="lbl1">ביקור אחרון: 25.06.2014</label><i class="fa fa-info-circle" style="margin-right: 18px;  color: #e65844;  color: #e65844;"></i></span><label class="lbl2 border yitrat_hov" style="padding-right: 5px;">יתרה: </label>
  			</div>
  		</div>
  		<div class="details_area" id="cat2" style="width: 100%;overflow-y: scroll;" >
  			<table style="width: 100%;font-size:150%;">
  				<tr class="details_title">
				    <th class="border_table"></th>
				 <!--   <th style="width:20%">בר קוד</th> -->
				    <th>שם פריט</th>
				    <th>מחיר</th>
				    <th  style="">כמות</th>
				    <th>הנחה</th>
				    <th class="border_table">סה"כ</th>
				    <th class="border_table"></th>
				  </tr>
				  <tr class="active tr_{{cash_prd.BarCode}}" ng-repeat="cash_prd in cash_prod.products">		    
				  	<td class="border_table text_center" ng-controller="CommentController as commentC" ng-click="start_comment_prod(cash_prd.BarCode);;call_setTab(5)" onclick="openwrap('.pop_comment_prod','.comment_div_prod,.pop_comment_prod');"><i class="fa fa-info-circle {{cash_prd.commentClass}}"></i></td>		    
				  	<td><p style="height:40px;overflow: hidden;">{{cash_prd.Title}}</p></td>		    
				  	<td class="prod_SalePrice">{{cash_prd.SalePrice}}</td>		    
				  	<td class="text_center"><i class="fa fa-plus-circle" ng-click="cash_prod.plus_count(cash_prd.SalePrice,cash_prd.BarCode,cash_prd.refund)"></i><p style="display: inline-block;width:60px;text-align:center;">{{cash_prd.Amount}}</p><i class="fa fa-minus-circle" ng-click="cash_prod.minus_count(cash_prd.SalePrice,cash_prd.BarCode,cash_prd.refund);"></i></td>
				  	<td onclick="anacha_prod()" ng-click="cash_prod.start_anacha_prod(cash_prd,(cash_prd.SalePrice-cash_prd.Discount)*cash_prd.Amount)"><i class="fa fa-tag {{isdiscount(cash_prd.Discount)}}" style="margin-left: 10px;" ></i>{{cash_prd.Discount}}</td>		    
				  	<td class="border_table padding_5 sum_p_l">{{(cash_prd.SalePrice-cash_prd.Discount)*cash_prd.Amount|fix2}}</td>		    
				  	<td class="border_table text_center" ng-click="cash_prod.remove_cart(cash_prd.BarCode,cash_prd.SalePrice);"><i class="fa fa-times" ></i></td> 		  
				  </tr>
				  
				  
  			</table>
  		</div>
  		<img src="images/zigzag.png" class="bordr_wave"/>
		<div class="abso">
  		<div class="sum_area">
  			<div class="right inline">
  				<div class="newrow1" ng-controller="CommentController as commentC" ng-click="start_comment()" onclick="openwrap('.pop_comment','.comment_div,.pop_comment');"><label class="block" style="  font-size: 120%;"><i class="fa fa-pencil {{commentClass}}" style="width:30px"></i>הוסף הערה</label></div>
  				<div class="newrow2" style="  font-size: 125%;"><label class="lbl1" style="  margin-right: 30px;">סה"כ פריטים: <span id="total_prod">{{cash_prod.products.length}}</span></label></div>
  				<!--<div class="newrow2"><label class="lbl1">שם: יהב כהן</label><span>|</span></span><label class="lbl2 border">מספר: 159</label>
				<label class="lbl3">ביקור אחרון: 25.6.2014</label>
				</div>
  				<div class="newrow3"><label>יתרת חוב: </label><label >  ₪</label><label id=before_tax style="font-size: 150%;"></label></div>-->
  			</div>
  			<div class="left inline">
  				<div class="newrow2"> 				
  					<div style="width: 100%;height: 26px;font-size: 130%;"><label class="right">סכום ביניים:</label><label class="left in_sum zerofloat">{{amount_out}}</label><label class="left">₪</label></div>
  					<div style="width: 100%;height: 26px;font-size: 130%;"><label class="right">18% מע"מ:</label><label class="left tax_sum zerofloat">{{amount_maam}}</label><label class="left">₪</label></div>
  					<div class="before_calc" style="width: 100%;height: 26px;font-size: 130%;display: none"><label class="right">לפני הנחה:</label><label class="left in_sum zerofloat">{{original_afterprod}}</label><label class="left">₪</label></div>  						
  				  				
  				<div class="newrow3"><label class="finall_price zerofloat">{{amount}}</label><span class="curr">₪</span></div>
  				
  			</div>
  			
  		</div>
  		<div style="clear: both;"></div>
  		<div class="peulot" style="font-size: 120%;" >
  			<button  value=""  ng-click="cashc.call_clean()" class="trash"><i class="fa fa-trash-o"></i></button>
  			<input type="button"  value="הנחה" class="anacha" ng-controller="AnachaController as anachaC" ng-click="start_anacha();call_setTab(5)" />
  			<input type="button" class="pause"  value="השהייה"/>
  			<input type="button" class="hachlafa"  value="פ. החלפה" ng-controller="AchlafaController"  ng-click="start_achlafa()"/>
  			<input type="button" ng-click="cashc.zicuy()" class="zicuy"  value="זיכוי" />
  			<input type="button"  value="לתשלום" class="pay" ng-controller="PaymentController  as payment"   ng-click="payment.start_pay();call_setTab(5)"/>

  		</div>
		</div>
  	</div>
  </div>
  </div>
  </div>
  <div class="clear"></div>
  
<style type="text/css" media="screen">
	.ui-widget-content.ng-scope{
		display: inline-block;
	}
</style>
</span>
  </body>
</html>