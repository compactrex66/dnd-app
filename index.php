<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="shortcut icon" href="media/favicon.png" type="image/x-icon">
    <link rel="stylesheet" href="style.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Ubuntu:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,500;1,700&display=swap" rel="stylesheet">
    <title>DnD App | Main page</title>
</head>
<body>
    <header class="row-form">
            <div class="select secondary-btn" id="enemySelect" name="enemyType">
                <div id="selectedEnemy">Enemy type</div>
                <div class="options" id="enemyList">
                    <?php
                        include "parsedown/Parsedown.php";
                        include "parsedown/ParsedownExtra.php";
                        include "dbConnection.php";

                        $sql = "SELECT * FROM enemies order by name asc";
                        $result = mysqli_query($conn, $sql);
                        while($row = mysqli_fetch_assoc($result)) {
                            echo "<div class='option'>".$row["name"]."</div>";
                        }
                    ?>
                </div>
            </div>
            <input style="border: 0;" id="enemyQuantity" type="number" name="enemyQuantity" value="1" max="100">
            <button id="addEnemyBtn">Add Enemy</button>
            <button type="button" id="deleteEnemiesBtn">Delete all enemies</button>
            <div class="vl"></div>
            <a href="addEnemy/addEnemy.php"><button type="button">Add new enemy</button></a>
            <a href="enemySearch/enemySearch.php"><button type="button">Search enemies</button></a>
            <div class="vl"></div>
            <button type="button" id="shortRestBtn">Short Rest</button>
            <button type="button" id="longRestBtn">Long Rest</button>
            <button class="redBtn" type="button" id="rewindTimeBtn"><img src="media/removeIcon.svg"></button>
            <input type="number" placeholder="Hours" style="border: 0; width: 55px;" id="hoursInput">
            <button class="greenBtn" type="button" id="forwardTimeBtn"><img src="media/addIcon.svg"></button>
            <?php
               $sql = "SELECT * FROM `time` WHERE time_id = 1";
               $result = mysqli_fetch_assoc(mysqli_query($conn, $sql));
               $date = $result['date'];
               $hour = $result['hour'];
               $minute = $result['minute'];
               echo "<span class='big-text' id='time'>".($hour < 10 ? '0'.$hour : $hour).":".($minute < 10 ? '0'.$minute : $minute)." | ".$date." <img src='media/calendarIcon.svg'></span>";
            ?>
    </header>
    <main>
        <div class="listOfCharacters" id="listOfCharacters"></div>
        <div id="moreInfoPanel"></div>
    </main>
    <script src="https://cdn.jsdelivr.net/npm/markdown-it@14.1.0/dist/markdown-it.min.js" integrity="sha256-OMcKHnypGrQOLZ5uYBKYUacX7Rx9Ssu91Bv5UDeRz2g=" crossorigin="anonymous"></script>
    <script src="script.js"></script>
</body>
</html>
<?php
    mysqli_close($conn);
?>