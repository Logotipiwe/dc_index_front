<?php
header("Access-Control-Allow-Origin: *");
$db = new mysqli('db', 'admin', 'eife4Wienein', 'log_comments');
echo  json_encode($db->query("SELECT * FROM comments")->fetch_all(1));
