<?php
header("Access-Control-Allow-Origin: *");
$text = $_GET['text'];
$posX = rand(10,90);
$posY = rand(10,90);
$r = rand(50,255);
$g = rand(50,255);
$b = rand(50,255);
$color = "($r, $g, $b)";
$db = new mysqli('db', 'admin', 'eife4Wienein', 'log_comments');
$stmt = $db->prepare("INSERT INTO comments (text, positionX, positionY, color) VALUES (?,?,?,?)");
$stmt->bind_param('siis', $text, $posX, $posY, $color);
$stmt->execute();
echo json_encode(['ok'=>true]);
