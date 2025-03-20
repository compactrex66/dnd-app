<?php

function passTime($conn, $hours) {
    if($hours > 0) {
        $currentHour = mysqli_fetch_array(mysqli_query($conn, "SELECT `hour` FROM `time` WHERE time_id=1"))[0];
        $overflowHour = 0;
        $daysToPass = floor(($currentHour + $hours) / 24);
        // echo $currentHour." ".$hours." ".($daysToPass);
        if($currentHour + $hours >= 24 || $currentHour + $hours < 0) {
            $overflowHour = $currentHour + $hours - (24*$daysToPass);
            mysqli_query($conn, "UPDATE `time` SET `hour` = ".$overflowHour);
            mysqli_query($conn, "UPDATE `time` SET `date`=date(date_add(date, INTERVAL $daysToPass DAY))");
        } else {
            mysqli_query($conn, "UPDATE `time` SET `hour` = ".$currentHour+$hours);
        }
    } else {
        $currentHour = mysqli_fetch_array(mysqli_query($conn, "SELECT `hour` FROM `time` WHERE time_id=1"))[0];
        $overflowHour = 0;
        $daysToPass = floor(($currentHour + $hours) / 24);
        if($currentHour + $hours >= 24 || $currentHour + $hours < 0) {
            $overflowHour = (24*($daysToPass*-1)) + ($currentHour + $hours);
            mysqli_query($conn, "UPDATE `time` SET `hour` = ".$overflowHour);
            mysqli_query($conn, "UPDATE `time` SET `date`=date(date_add(date, INTERVAL $daysToPass DAY))");
        } else {
            mysqli_query($conn, "UPDATE `time` SET `hour` = ".$currentHour+$hours);
        }
    }
}

function changeHealth($conn, $healthChange, $characterId) {
    $currentHealth = (int)mysqli_fetch_row(mysqli_query($conn, "SELECT health FROM current_fight WHERE id = $characterId"))[0];
    $maxHealth = (int)mysqli_fetch_row(mysqli_query($conn, "SELECT max_health FROM current_fight WHERE id = $characterId"))[0];
    if($currentHealth + $healthChange > $maxHealth) {
        $healthChange = $maxHealth - $currentHealth;
    }
    $health = $currentHealth + $healthChange;
    mysqli_query($conn, "UPDATE current_fight set health = $health WHERE id = $characterId");
}

function setInitiative($conn, $newInitiative, $characterId) {
    mysqli_query($conn, "UPDATE current_fight SET initiative = $newInitiative WHERE id = $characterId");
}

function deleteCharacter($conn, $characterId) {
    mysqli_query($conn, "DELETE FROM `current_fight` WHERE `id` = ".$characterId);
}

function deleteAllEnemies($conn) {
    mysqli_query($conn, "DELETE FROM current_fight WHERE is_player = 0");
}

function setAC($conn, $AC, $characterId) {
    mysqli_query($conn, "UPDATE current_fight SET AC = $AC WHERE id = $characterId");
}

function shortRest($conn) {
    passTime($conn, 2);
}

function longRest($conn) {
    passTime($conn, 8);
}

function setCurrent($conn, $characterId = null) {
    mysqli_query($conn, "UPDATE current_fight SET current=0");
    if($characterId != null) {
        mysqli_query($conn, "UPDATE current_fight SET current=1 WHERE id = ".$characterId);
    } else {
        mysqli_query($conn, "UPDATE current_fight SET current = 1 WHERE initiative = (SELECT characterId FROM current_fight WHERE initiative = (SELECT MAX(initiative) FROM current_fight) LIMIT 1)");
    }
}

?>