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
            elseif($action == 'changeCharacterName') {
                changeCharacterName($conn, $_POST['newName'], $characterId);
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
                    preg_match_all("/<li>.*?:\s*([^<]+)<\/li>/", $moreInfo, $matches);
                    $spells = [];
                    foreach ($matches[1] as $match) {
                        $parts = array_map('trim', explode(',', $match));
                        $spells = array_merge($spells, $parts);
                    }
                    $multiCurl = curl_multi_init();
                    $handles = [];
                    foreach($spells as $spell) {
                        $sql = "SELECT * FROM spells WHERE spell_name='$spell'";
                        $spellResults = mysqli_fetch_array(mysqli_query($conn, $sql));
                        if(!$spellResults) {
                            $curl = curl_init();
                            curl_setopt_array($curl, [
                                CURLOPT_URL => "https://api.open5e.com/v2/spells/?document__key__in=srd-2024&name=".ucwords(str_replace(' ', '%20', $spell)),
                                CURLOPT_RETURNTRANSFER => 1
                            ]);
                            curl_multi_add_handle($multiCurl, $curl);
                            $handles[spl_object_id($curl)] = ['handle' => $curl, 'spell' => $spell];
                        }
                    }

                    $running = null;
                    do {
                        curl_multi_exec($multiCurl, $running);
                        curl_multi_select($multiCurl); // wait for activity
                    } while ($running > 0);

                    foreach ($handles as $info) {
                        $curl = $info['handle'];
                        $spell = $info['spell'];

                        $response = curl_multi_getcontent($curl);

                        if (curl_errno($curl)) {
                            echo "Error fetching $spell: " . curl_error($curl) . "\n";
                        } else {
                            $decodedData = json_decode($response, true);
                            //TODO insert to db
                        }

                        // Clean up
                        curl_multi_remove_handle($multiCurl, $curl);
                        curl_close($curl);

                        // Replace in $moreInfo
                        $wrappedSpell = "<span class='spell'>$spell</span>";
                        $moreInfo = str_replace($spell, $wrappedSpell, $moreInfo);
                    }

                    curl_multi_close($multiCurl);
                    echo "<div style='display: none;' class='moreInfo'>".$moreInfo."</div>";
                }
                echo "<span class='inline-row characterName'>".$row['name']."</span>";
                echo "<span class='inline-row characterHealth'><img class='icon' src='media/healthIcon.svg'>".$row['health']."/".$row['max_health']."</span>";
                echo "<span class='inline-row'><img class='icon' src='media/initiativeBoltIcon.svg'><input class='no-spinner' type='number' value=".$row['initiative']." id='modifiedInitiativeInput'></input></span>";
                echo "<span class='inline-row'><img class='icon' src='media/acIcon.svg'><input class='no-spinner' type='number' value=".$row['AC']." id='modifiedACInput'></input></span>";
                echo '<span class="inline-row"><button class="redBtn substractHealthBtn"><img src="media/removeIcon.svg"></button><input class="no-spinner" type="number" id="healthInput"></input><button class="greenBtn addHealthBtn"><img src="media/addIcon.svg"></button></span>';
                if($row['is_player'] != 1) {
                    echo '<button class="deleteBtn"><img class="icon" src="media/closeIcon.svg"></button>';
                } else {
                    echo '<button class="inactiveDeleteBtn"><img class="icon" src="media/closeIcon.svg"></button>';
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