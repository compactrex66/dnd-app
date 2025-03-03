<?php
    if(isset($_POST['action'])) {
        include '../dbConnection.php';
        $action = $_POST['action'];
        if($action == 'addEnemy') {
            $name = $_POST['name'];
            $minHealth = $_POST['minHealth'];
            $maxHealth = $_POST['maxHealth'];
            $armorClass = $_POST['armorClass'];
            $initiativeBonus = $_POST['initiativeBonus'];
            $moreInfo = $_POST['info'];

            include "../dbConnection.php";

            mysqli_query($conn, 'INSERT INTO enemies(name, min_health, max_health, AC, initiative_bonus, more_info) values("'.$name.'", '.$minHealth.', '.$maxHealth.', '.$armorClass.', '.$initiativeBonus.', "'.$moreInfo.'")');
            mysqli_close($conn);
            header("Location: enemySearch.php");
        }
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
    <title>Enemy search</title>
</head>
<body>
    <form action="" method="post" id="parseMarkdown" style="display: none;">
        <input type="text" name="name" id="nameInput">
        <input type="number" name="minHealth" id="minHealthInput">
        <input type="number" name="maxHealth" id="maxHealthInput">
        <input type="number" name="armorClass" id="armorClassInput">
        <input type="number" name="initiativeBonus" id="initiativeBonusInput">
        <input type="text" name="monsterName" id="monsterNameElement">
        <input type="text" name="action" id="actionInput">
        <textarea name="info" id="info"></textarea>
    </form>
    <div id="monsterName" style="display: none;"><?php echo !empty($_POST['monsterName']) ? $_POST['monsterName'] : ''?></div>
    <header>
        <a href="../index.php" style="justify-self: left;"><button>Fight</button></a>
        <span>Monster Search</span>
        <input type="text" id="monsterInput" placeholder="Enter a monster name" />
        <button id="searchButton">Search</button>
    </header>
    <main>
        <div id="matchList"></div>
        <div id="monsterResult" class="monster-result moreInfoPanel">
            <pre id="markdownResult" style="display: none;"><?php echo $_POST['info'] ?? '' ?></pre>
            <button id="addEnemyBtn" class="corner-btn"><img src="../media/addIcon.svg" alt=""></button>
            <?php
                include "../parsedown/Parsedown.php";
                include "../parsedown/ParsedownExtra.php";
                if(!empty($_POST['info'])) {
                    $moreInfo = $_POST['info'];
                    $parsedown = new ParsedownExtra();
                    $moreInfo = str_replace("___", "", $moreInfo);
                    $moreInfo = $parsedown->text($moreInfo);
                    $moreInfo = str_replace("<hr>", "", $moreInfo);
                    echo $moreInfo;
                }
            ?>
        </div>
    </main>
    <script src="enemySearch.js"></script>
</body>
</html>