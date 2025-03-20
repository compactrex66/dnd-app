<?php
    include "parsedown/Parsedown.php";
    include "parsedown/ParsedownExtra.php";
    include "dbConnection.php";
?>
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
    <header>
        <form action="" method="get" class="row-form">
            <select id="enemySelect" name="enemyType">
                <?php
                    $sql = "SELECT * FROM enemies order by name asc";
                    $result = mysqli_query($conn, $sql);
                    while($row = mysqli_fetch_assoc($result)) {
                        echo "<option value='".$row['name']."'>";
                        echo $row['name'];
                        echo "</option>";
                    }
                ?>
            </select>
            <input style="border: 0;" type="number" name="enemyQuantity" value="1" max="100">
            <button>Add Enemy</button>
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
        </form>
    </header>
    <main>
        <div class="listOfCharacters" id="listOfCharacters">
            <?php
                //Adding enemies to the database
                if(isset($_GET['enemyType'])) {
                    $enemyType = $_GET['enemyType'];
                    $enemyQuantity = $_GET['enemyQuantity'] != null ? $_GET['enemyQuantity'] : 1;
                    $sql = "SELECT * FROM enemies WHERE name = '$enemyType'";
                    $result = mysqli_fetch_assoc(mysqli_query($conn, $sql));
                    $enemyNumber = mysqli_fetch_array(mysqli_query($conn, "SELECT count(*) FROM current_fight"))[0] - 2;
                    $min_health = $result['min_health'];
                    $max_health = $result['max_health'];
                    $initiativeBonus = $result['initiative_bonus'];
                    $isSurprised = isset($_GET['isSurprised']);
                    $AC = $result['AC'];
                    $enemyId = $result['id'];
                    $counter = 0;

                    for($i = 0; $i < $enemyQuantity; $i++) {
                        $health = rand($min_health, $max_health);
                        $initiative = rand(1, 20) + $initiativeBonus;
                        if($isSurprised) {
                            $secondInititative = rand(1, 20) + $initiativeBonus;
                            if($secondInititative < $initiative) {
                                $initiative = $secondInititative;
                            }
                        }
                        $sql = "INSERT INTO current_fight(name, health, max_health, initiative, AC, is_player, enemy_id) Values('$enemyType".$enemyNumber+$counter."', $health, $health, $initiative, $AC, 0, $enemyId)";
                        $result = mysqli_query($conn, $sql);
                        $counter++;
                    }

                    header("Location: index.php");
                }

                //Fetching and displaying enemies
                $sql = "SELECT * FROM current_fight ORDER BY initiative DESC";
                $result = mysqli_query($conn, $sql);
                while($row = mysqli_fetch_assoc($result)) {
                    if($row['current'] == 1) $current = 1;
                    else $current = 0;
                    echo "<div class='character' data-characterId='".$row['id']."' data-current='".$current."'>";
                    if($row['enemy_id'] != null) {
                        $moreInfo = mysqli_fetch_assoc(mysqli_query($conn, "SELECT name, more_info FROM enemies WHERE id = ".$row['enemy_id']));
                        $parsedown = new ParsedownExtra();
                        echo "<span style='display: none;' class='name'><h1>".$moreInfo['name']."</h1></span>";
                        $moreInfo['more_info'] = str_replace("___", "", $moreInfo['more_info']);
                        $moreInfo = $parsedown->text($moreInfo['more_info']);
                        $moreInfo = str_replace("<hr>", "", $moreInfo);
                        echo "<div style='display: none;' class='moreInfo'>".$moreInfo."</div>";
                    }
                    echo "<span class='characterName'>".$row['name']."</span>";
                    echo "<span class='characterHealth inline-row'><img src='media/healthIcon.svg'>".$row['health']."/".$row['max_health']."</span>";
                    echo "<span style='display: flex; gap: 10px; align-items: center;'><img src='media/initiativeBoltIcon.svg'><input class='no-spinner' type='number' value=".$row['initiative']." id='modifiedInitiativeInput'></input></span>";
                    echo "<span style='display: flex; gap: 10px; align-items: center;'><img src='media/acIcon.svg'><input class='no-spinner' type='number' value=".$row['AC']." id='modifiedACInput'></input></span>";
                    echo '<span class="inline-row"><button class="redBtn substractHealthBtn"><img src="media/removeIcon.svg"></button><input class="no-spinner" type="number" id="healthInput"></input><button class="greenBtn addHealthBtn"><img src="media/addIcon.svg"></button></span>';
                    if($row['is_player'] != 1) {
                        echo '<span class="deleteBtn"><img src="media/closeIcon.svg"></span>';
                    }
                    echo "</div>";
                }
            ?>
        </div>
        <div id="moreInfoPanel">
        </div>
    </main>
    <script src="https://cdn.jsdelivr.net/npm/markdown-it@14.1.0/dist/markdown-it.min.js" integrity="sha256-OMcKHnypGrQOLZ5uYBKYUacX7Rx9Ssu91Bv5UDeRz2g=" crossorigin="anonymous"></script>
    <script src="script.js"></script>
</body>
</html>
<?php
    mysqli_close($conn);
?>