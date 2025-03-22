<?php
    include "parsedown/Parsedown.php";
    include "parsedown/ParsedownExtra.php";
    include "functions.php";
    include "dbConnection.php";
    
    if(isset($_POST['action'])) {
        $action = $_POST['action'];
        if(isset($_POST['characterId'])) {
            $characterId = $_POST['characterId'];
            if($action == 'adjustHealth') {
                changeHealth($conn, $_POST['healthNumber'], $characterId);
            }
            elseif($action == 'changeInitiative') {
                setInitiative($conn, $_POST['initiative'], $characterId);
            }
            elseif($action == 'delete') {
                deleteCharacter($conn, $characterId);
            }
            elseif($action == 'changeAC') {
                setAC($conn, $_POST['AC'], $characterId);
            } 
        }
        if($action == 'getCharacters') {
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
                    echo '<button class="deleteBtn"><img src="media/closeIcon.svg"></button>';
                } else {
                    echo '<button class="inactiveDeleteBtn"><img src="media/closeIcon.svg"></button>';
                }
                echo "</div>";
            }
        }
        if($action == 'getDate') {
            $sql = "SELECT * FROM `time` WHERE time_id = 1";
            $result = mysqli_fetch_assoc(mysqli_query($conn, $sql));
            $date = $result['date'];
            $hour = $result['hour'];
            $minute = $result['minute'];
            echo ($hour < 10 ? '0'.$hour : $hour).":".($minute < 10 ? '0'.$minute : $minute)." | ".$date." <img src='media/calendarIcon.svg'>";
        }
        elseif($action == 'shortRest') {
            shortRest($conn);
        }
        elseif($action == 'deleteAllEnemies') {
            deleteAllEnemies($conn);
        }
        elseif($action == 'longRest') {
            longRest($conn);
        }
        elseif($action == 'setCurrent') {
            setCurrent($conn, $characterId);
        }
        elseif($action == "passTime") {
            passTime($conn, $_POST['hoursToPass']);
            echo "passtime";
        }
        elseif($action == "addEnemy") {
            $enemyType = $_POST['enemyType'];
            $enemyQuantity = $_POST['enemyQuantity'] != null ? $_POST['enemyQuantity'] : 1;
            $sql = "SELECT * FROM enemies WHERE name = '$enemyType'";
            $result = mysqli_fetch_assoc(mysqli_query($conn, $sql));
            $enemyNumber = mysqli_fetch_array(mysqli_query($conn, "SELECT count(*) FROM current_fight"))[0] - 2;
            $min_health = $result['min_health'];
            $max_health = $result['max_health'];
            $initiativeBonus = $result['initiative_bonus'];
            $isSurprised = isset($_POST['isSurprised']);
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
        }
    }
    mysqli_close($conn);
?>