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
                    echo "<span style='display: none;' class='name'><h1>".$moreInfo['name']."</h1></span>";
                    $moreInfo = $moreInfo['more_info'];
                    preg_match_all("/<li>[^:]+:\s*([^<]+)<\/li>/i", $moreInfo, $matches);
                    $spells = [];
                    foreach ($matches[1] as $match) {
                        $parts = array_map('trim', explode(',', $match));
                        $parts = str_replace("*", "", $parts);
                        $spells = array_merge($spells, $parts);
                    }
                    $multiCurl = curl_multi_init();
                    $handles = [];
                    usort($spells, function($a, $b) {
                        return strlen($b) <=> strlen($a);
                    });
                    foreach($spells as $spell) {
                        $sql = "SELECT * FROM spells WHERE name='$spell'";
                        $spellResults = mysqli_fetch_array(mysqli_query($conn, $sql));
                        if(!$spellResults) {
                            $curl = curl_init();
                            curl_setopt_array($curl, [
                                CURLOPT_URL => "https://api.open5e.com/v2/spells/?key__in=srd-2024_".urlencode(preg_replace('/[^a-z0-9]+/', '-', $spell)),
                                CURLOPT_RETURNTRANSFER => 1
                            ]);
                            curl_multi_add_handle($multiCurl, $curl);
                            $handles[spl_object_id($curl)] = ['handle' => $curl, 'spell' => $spell];
                        } else {
                            $wrappedSpell = "
                            <span class='spell'>
                                <div class='spell-tooltip-data' style='display: none;'>
                                <span class='big-text'>$spellResults[name]</span>
                                    <span class='hint-header'>
                                        <span>Level: $spellResults[level]</span>
                                        <span>Can target: $spellResults[target_type]</span>
                                        <span>Range: $spellResults[range_text]</span>
                                        <span>Cast Time: $spellResults[casting_time]</span>
                                    </span>
                                        <br>
                                        $spellResults[description]
                                        <br><br>
                                        $spellResults[higher_level]
                                </div>
                                $spell
                            </span>
                            ";
                            $moreInfo = str_replace($spell, $wrappedSpell, $moreInfo);
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
                            $decodedData = json_decode($response, true)['results'];
                            foreach($decodedData as $spell_response) {
                                $name = $spell_response['name'];
                                $desc = $spell_response['desc'];
                                $level = $spell_response['level'];
                                $higher_level = $spell_response['higher_level'];
                                $target_type = $spell_response['target_type'];
                                $range_text = $spell_response['range_text'];
                                $range_num = $spell_response['range'];
                                $ritual = $spell_response['ritual'];
                                $casting_time = $spell_response['casting_time'];
                                $verbal = $spell_response['verbal'];
                                $somatic = $spell_response['somatic'];
                                $target_count = $spell_response['target_count'];
                                $attack_roll = $spell_response['attack_roll'];
                                $duration = $spell_response['duration'];
                                $concentration = $spell_response['concentration'];

                                $stmt = $conn->prepare("
                                    INSERT INTO spells 
                                    (name, description, level, higher_level, target_type, range_text, range_num, ritual, casting_time, verbal, somatic, target_count, attack_roll, duration, concentration)
                                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                                ");

                                $stmt->bind_param(
                                    "ssisssiisiiiisi",
                                    $name,
                                    $desc,
                                    $level,
                                    $higher_level,
                                    $target_type,
                                    $range_text,
                                    $range_num,
                                    $ritual,
                                    $casting_time,
                                    $verbal,
                                    $somatic,
                                    $target_count,
                                    $attack_roll,
                                    $duration,
                                    $concentration
                                );
                                $stmt->execute();
                            }
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

        for ($i = 0; $i < $enemyQuantity; $i++) {
            $health = rand($min_health, $max_health);
            $initiative = rand(1, 20) + $initiativeBonus;
            if ($isSurprised) {
                $secondInititative = rand(1, 20) + $initiativeBonus;
                if ($secondInititative < $initiative) {
                    $initiative = $secondInititative;
                }
            }
            $sql = "INSERT INTO current_fight(name, health, max_health, initiative, AC, is_player, enemy_id) Values('$enemyType" . $enemyNumber + $counter . "', $health, $health, $initiative, $AC, 0, $enemyId)";
            $result = mysqli_query($conn, $sql);
            $counter++;
        }
    }
}
mysqli_close($conn);
