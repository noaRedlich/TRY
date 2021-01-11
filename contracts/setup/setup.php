<?php

// This script and data application were generated by AppGini 2.4 on 25/06/2003 at 19:54:53
// Download AppGini for free from http://www.bigprof.com/appgini/download/

include("./lib.php");

if(!mysql_connect("localhost", "root", ""))
{
	echo "Error while connecting to MySQL:" . mysql_error();
	exit;
}
echo "Attempting to create database 'groupoffice' ... <br>";
	if(!mysql_query("create database if not exists groupoffice"))
	{
		echo "Error while creating database: " . mysql_error();
		echo "<br>Please make sure that the username you are using has enough permissions to create the database 'groupoffice'";
	}
mysql_close();
echo "Done ... <br>";

// create table 'realtycontracts'
echo "Attempting to create table 'realtycontracts' ... <br>";
sql("create table if not exists realtycontracts ( contract_number VARCHAR(20) not null , unique(contract_number), customer VARCHAR(45) , listingid INT , term INT , amount INT , currency VARCHAR(3) , usd_rate DECIMAL(1,2) , id INT auto_increment primary key)");
echo "Done ... <br>";

// create table 'listingsdb'
echo "Attempting to create table 'listingsdb' ... <br>";
sql("create table if not exists listingsdb ( id INT primary key, title INT )");
echo "Done ... <br>";

// create table 'realtycontractpayments'
echo "Attempting to create table 'realtycontractpayments' ... <br>";
sql("create table if not exists realtycontractpayments ( id INT not null auto_increment primary key, contract_id INT , payment_date DATE , amount INT , check_number INT , check_bank VARCHAR(50) , check_branch VARCHAR(50) )");
echo "Done ... <br>";

echo "<br>Finished database setup ...<br>";
echo "To access your database, <a href=../index.html>click here</a>.";
?>

