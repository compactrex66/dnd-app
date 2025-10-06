<?php
if (isset($_GET['name'])) {
    include "../dbConnection.php";
    include "../parsedown/Parsedown.php";
    include "../parsedown/ParsedownExtra.php";

    $name = $_GET['name'];
    $minHealth = $_GET['minHealth'];
    $maxHealth = $_GET['maxHealth'];
    $armorClass = $_GET['armorClass'];
    $initiativeBonus = $_GET['initiativeBonus'];
    $moreInfo = $_GET['moreInfo'];

    $parsedown = new ParsedownExtra();
    $moreInfo = str_replace("___", "", $moreInfo);
    $moreInfo = $parsedown->text($moreInfo);
    $moreInfo = str_replace("null", "", str_replace("<hr>", "", $moreInfo));

    $stmt = $conn->prepare("INSERT INTO enemies(name, min_health, max_health, AC, initiative_bonus, more_info) values(?, ?, ?, ?, ?, ?)");
    $stmt->bind_param(
        "siiiis",
        $name,
        $minHealth,
        $maxHealth,
        $armorClass,
        $initiativeBonus,
        $moreInfo
    );
    $stmt->execute();
    mysqli_close($conn);
    header("Location: addEnemy.php");
}
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="shortcut icon" href="../media/favicon.png" type="image/x-icon">
    <link rel="stylesheet" href="../style.css">
    <link rel="stylesheet" href="style.css">
    <script src="https://kit.fontawesome.com/791dbbf45c.js" crossorigin="anonymous"></script>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Ubuntu:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,500;1,700&display=swap" rel="stylesheet">
    <title>Adding enemy</title>
</head>

<body>
    <form action="" method="get" id="addNewEnemyHiddenForm" style="display: none;">
        <input type="text" name="name" id="nameInput">
        <input type="number" name="minHealth" id="minHealthInput">
        <input type="number" name="maxHealth" id="maxHealthInput">
        <input type="number" name="armorClass" id="armorClassInput">
        <input type="number" name="initiativeBonus" id="initiativeBonusInput">
        <textarea name="moreInfo" name="moreInfo" id="moreInfoInput"></textarea>
    </form>
    <header><a href="../index.php"><button>Fight</button></a>Add New Enemy</header>
    <form action="" id="addNewEnemyForm">
        <textarea name="enemyInfo" id="enemyInfo" required></textarea>
        <span style="display: flex; width: 100%; gap: 20px; justify-content:center; ">
            <button type="button" id="addEnemyBtn">Add New Enemy</button>
        </span>
    </form>
    <script src="addEnemy.js"></script>
</body>

</html>