<?php
include "../parsedown/Parsedown.php";
include "../parsedown/ParsedownExtra.php";

$markdown = $_POST['markdown'];
// echo $markdown;
$parsedown = new ParsedownExtra();
$markdown = str_replace("___", "", $markdown);
$markdown = $parsedown->text($markdown);
$markdown = str_replace("<hr>", "", $markdown);

echo $markdown;
?>