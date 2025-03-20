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
            if($action == 'changeInitiative') {
                setInitiative($conn, $_POST['initiative'], $characterId);
            }
            if($action == 'delete') {
                deleteCharacter($conn, $characterId);
            }
            if($action == 'changeAC') {
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
                    echo '<span class="deleteBtn"><img src="media/closeIcon.svg"></span>';
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
        if($action == 'shortRest') {
            shortRest($conn);
        }
        if($action == 'deleteAllEnemies') {
            deleteAllEnemies($conn);
        }
        if($action == 'longRest') {
            longRest($conn);
        }
        if($action == 'setCurrent') {
            setCurrent($conn, $characterId);
        }
        if($action == "passTime") {
            passTime($conn, $_POST['hoursToPass']);
            echo "passtime";
        }
    }
    mysqli_close($conn);
?>