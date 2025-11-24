<?php
include "parsedown/Parsedown.php";
include "parsedown/ParsedownExtra.php";
include "functions.php";
include "dbConnection.php";

if (isset($_POST['action'])) {
    $action = $_POST['action'];
    if (isset($_POST['characterId'])) {
        $characterId = $_POST['characterId'];
        if ($action == 'adjustHealth') {
            changeHealth($conn, $_POST['healthNumber'], $characterId);
        } elseif ($action == 'changeHealth') {
            setHealth($conn, $_POST['health'], $characterId);
        } elseif ($action == 'changeMaxHealth') {
            changeMaxHealth($conn, $_POST['maxHealth'], $characterId);
        } elseif ($action == 'changeInitiative') {
            setInitiative($conn, $_POST['initiative'], $characterId);
        } elseif ($action == 'delete') {
            deleteCharacter($conn, $characterId);
        } elseif ($action == 'changeAC') {
            setAC($conn, $_POST['AC'], $characterId);
        } elseif ($action == 'changeCharacterName') {
            changeCharacterName($conn, $_POST['newName'], $characterId);
        } elseif ($action == 'addCondition') {
            $conditionId = $_POST['conditionId'];
            $turnsLeft = $_POST['turnsLeft'];
            $result = mysqli_query($conn, "SELECT * FROM character_conditions WHERE character_id=$characterId");
            while($row = mysqli_fetch_array($result)) {
                if($row['condition_id'] == $conditionId) {
                    $turnsLeft += $row['turns_left'];
                    mysqli_query($conn, "UPDATE character_conditions SET turns_left=$turnsLeft WHERE condition_id=$conditionId AND character_id=$characterId");
                    return;
                }
            }
            $stmt = $conn->prepare("INSERT INTO character_conditions values(null, ?, ?, ?)");
            $stmt->bind_param("iii", $conditionId, $characterId, $turnsLeft);
            $stmt->execute();
            $stmt->close();
        } elseif ($action == 'deleteCondition') {
            $conditionId = $_POST['characterConditionId'];
            echo "DELETE FROM character_conditions WHERE id=$conditionId";
            mysqli_query($conn, "DELETE FROM character_conditions WHERE id=$conditionId");
        } elseif ($action == 'setCurrent') {
            $nextTurn = $_POST['nextTurn'];
            setCurrent($conn, $characterId, $nextTurn);
        }
    } elseif ($action == 'getCharacters') {
        $sql = "SELECT * FROM current_fight ORDER BY initiative DESC";
        $result = mysqli_query($conn, $sql);
        while ($row = mysqli_fetch_assoc($result)) {
            if ($row['current'] == 1) $current = 1;
            else $current = 0;
            if($current == 1) echo "<div class='character' data-characterId='" . $row['id'] . "' data-current='" . $current . "' style='border: 1px white solid;'>";
            else echo "<div class='character' data-characterId='" . $row['id'] . "' data-current='" . $current . "'>";
            if ($row['enemy_id'] != null) {
                $moreInfo = mysqli_fetch_assoc(mysqli_query($conn, "SELECT name, more_info FROM enemies WHERE id = " . $row['enemy_id']));
                if ($moreInfo != null) {
                    echo "<span style='display: none;' class='name'><h1>" . $moreInfo['name'] . "</h1></span>";
                    $moreInfo = $moreInfo['more_info'];
                    echo "<div style='display: none;' class='moreInfo'>" . $moreInfo . "</div>";
                } else {
                    mysqli_query($conn, "DELETE FROM current_fight WHERE id=$row[id]");
                    continue;
                }
            }
            echo "
            <span class='inline-row characterName'>$row[name]</span>
            <span class='conditions'>";
                $conditions = mysqli_query($conn, "SELECT current_fight.name, turns_left, conditions.name, conditions.description, icon_filename, character_conditions.id FROM character_conditions, conditions, current_fight WHERE current_fight.id = character_conditions.character_id AND character_conditions.condition_id = conditions.id AND current_fight.id = $row[id]");
                if(mysqli_num_rows($conditions) > 0) {
                    while($condition = mysqli_fetch_array($conditions)) {
                        $name = htmlspecialchars($condition['name'], ENT_QUOTES);
                        $desc = htmlspecialchars($condition['description'], ENT_QUOTES);

                        echo "
                        <span class='inline-column fit'>
                        <img class='icon condition'
                            src='media/{$condition['icon_filename']}'
                            alt='$name'
                            data-tooltip=\"<span class='big-text bold'>$name</span>$desc\"
                            data-character-condition-id=\"$condition[id]\">
                        <span class='bottom-text'>{$condition['turns_left']}</span>
                        </span>";
                    }
                }
            echo "<img src='media/addIcon.svg' class='select fit addConditionBtn icon'>";
                $conditions = mysqli_query($conn, "SELECT * FROM conditions");
                if(mysqli_num_rows($conditions) > 0) {
                    echo "<div class='options' id='conditionOptions'>";
                    while($condition = mysqli_fetch_array($conditions)) {
                        echo "<div class='option' data-id='$condition[id]'>$condition[name]</div>";
                    }
                    echo "</div>";
                }
            echo "
            </span>
            <span class='inline-row stats'>
                <span class='inline-row characterHealth'>
                    <img class='icon' src='media/healthIcon.svg'>
                    <input class='no-spinner' type='number' value='$row[health]' id='newHealthInput' style='font-size: 100%;'></input> /
                    <input class='no-spinner' type='number' value='$row[max_health]' id='newMaxHealthInput' style='font-size: 100%;'></input>
                </span>
                <span class='inline-row'><img class='icon' src='media/initiativeBoltIcon.svg'>
                    <input class='no-spinner' type='number' value=" . $row['initiative'] . " id='modifiedInitiativeInput'></input>
                </span>
                <span class='inline-row'>
                    <img class='icon' src='media/acIcon.svg'>
                    <input class='no-spinner' type='number' value=" . $row['AC'] . " id='modifiedACInput'></input>
                </span>
                <span class='inline-row'>
                    <button class='redBtn substractHealthBtn'><img src='media/removeIcon.svg'></button>
                    <input class='no-spinner' type='number' id='healthInput'></input>
                    <button class='greenBtn addHealthBtn'><img src='media/addIcon.svg'></button>
                </span>";
                if ($row['is_player'] != 1) {
                    echo '<button class="deleteBtn"><img class="icon" src="media/closeIcon.svg"></button>';
                } else {
                    echo '<button class="inactiveDeleteBtn"><img class="icon" src="media/closeIcon.svg"></button>';
                }
            echo "
            </span>
        </div>";
        }
    } elseif ($action == 'getDate') {
        $sql = "SELECT * FROM `time` WHERE time_id = 1";
        $result = mysqli_fetch_assoc(mysqli_query($conn, $sql));
        $date = $result['date'];
        $hour = $result['hour'];
        $minute = $result['minute'];
        echo ($hour < 10 ? '0' . $hour : $hour) . ":" . ($minute < 10 ? '0' . $minute : $minute) . " | " . $date . " <img src='media/calendarIcon.svg'>";
    } elseif ($action == 'shortRest') {
        shortRest($conn);
    } elseif ($action == 'deleteAllEnemies') {
        deleteAllEnemies($conn);
    } elseif ($action == 'longRest') {
        longRest($conn);
    } elseif ($action == "passTime") {
        passTime($conn, $_POST['hoursToPass']);
        echo "passtime";
    } elseif ($action == "addEnemy") {
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
    } elseif ($action == "getSpell") {
        $spellDocumentKey = $_POST['spellDocumentKey'];
        $stmt = $conn->prepare("SELECT * FROM spells WHERE document_key = ?");
        $stmt->bind_param("s", $spellDocumentKey);
        $stmt->execute();

        $result = $stmt->get_result();
        $spell = $result->fetch_assoc();

        if (!$spell) {
            http_response_code(404);
            echo json_encode(['error' => 'Spell not found']);
            exit;
        }

        header('Content-Type: application/json; charset=utf-8');
        echo json_encode($spell, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
    } elseif ($action == "addSpell") {
        $name           = $_POST['name']           ?? '';
        $desc           = $_POST['desc']           ?? '';
        $level          = $_POST['level']          ?? '';
        $school         = $_POST['school']         ?? '';
        $higher_level   = $_POST['higher_level']   ?? '';
        $target_type    = $_POST['target_type']    ?? '';
        $range_text     = $_POST['range_text']     ?? '';
        $range_num      = $_POST['range_num']      ?? '';
        $ritual         = $_POST['ritual']         ?? '';
        $casting_time   = $_POST['casting_time']   ?? '';
        $verbal         = $_POST['verbal']         ?? '';
        $somatic        = $_POST['somatic']        ?? '';
        $material       = $_POST['material']       ?? '';
        $target_count   = $_POST['target_count']   ?? '';
        $attack_roll    = $_POST['attack_roll']    ?? '';
        $duration       = $_POST['duration']       ?? '';
        $concentration  = $_POST['concentration']  ?? '';
        $document_key   = $_POST['document_key']   ?? '';

        $stmt = $conn->prepare("
            INSERT INTO spells (name, description, level, school, higher_level, target_type,
                range_text, range_num, ritual, casting_time, verbal, somatic,
                material, target_count, attack_roll, duration, concentration, document_key
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ");

        if (!$stmt) {
            die("Prepare failed: " . $conn->error);
        }

        $stmt->bind_param(
            "ssissssiisiiisisis",
            $name,
            $desc,
            $level,
            $school,
            $higher_level,
            $target_type,
            $range_text,
            $range_num,
            $ritual,
            $casting_time,
            $verbal,
            $somatic,
            $material,
            $target_count,
            $attack_roll,
            $duration,
            $concentration,
            $document_key
        );

        if ($stmt->execute()) {
            echo "Spell inserted successfully with ID: " . $stmt->insert_id;
        } else {
            echo "  Error inserting spell: " . $stmt->error;
        }
    } elseif ($action == 'parseMarkdown') {
        $markdown = $_POST['markdown'];
        $parsedown = new ParsedownExtra();
        $parsedMakrdown = $parsedown->text($markdown);
        echo $parsedMakrdown;
    } elseif ($action == 'resetTurnCounter') {
        mysqli_query($conn, "UPDATE turn_counter SET turn_count = 1, round_count = 1");
    } elseif ($action == 'incrementTurnCounter') {
        $result = mysqli_fetch_array(mysqli_query($conn, "SELECT * FROM turn_counter LIMIT 1"));
        $currentCharacters = mysqli_query($conn, "SELECT * FROM current_fight");
        $amountOfCharacters = mysqli_num_rows($currentCharacters);
        if($result['turn_count'] + 1 > $amountOfCharacters) {
            $roundCount = $result['round_count'] + 1;
            mysqli_query($conn, "UPDATE turn_counter SET round_count = $roundCount, turn_count = 1");
        } else {
            $turnCount = $result['turn_count'] + 1;
            mysqli_query($conn, "UPDATE turn_counter SET turn_count = $turnCount");
        }
    } elseif ($action == 'decrementTurnCounter') {
        $result = mysqli_fetch_array(mysqli_query($conn, "SELECT * FROM turn_counter LIMIT 1"));
        $currentCharacters = mysqli_query($conn, "SELECT * FROM current_fight");
        $amountOfCharacters = mysqli_num_rows($currentCharacters);
        if($result['turn_count'] - 1 < 1) {
            $roundCount = $result['round_count'] - 1;
            if($roundCount > 0) {
                mysqli_query($conn, "UPDATE turn_counter SET round_count = $roundCount, turn_count = $amountOfCharacters");
            }
        } else {
            $turnCount = $result['turn_count'] - 1;
            mysqli_query($conn, "UPDATE turn_counter SET turn_count = $turnCount");
        }
    } elseif ($action == 'getTurnCounter') {
        $result = mysqli_fetch_array(mysqli_query($conn, "SELECT * FROM turn_counter LIMIT 1"));
        echo "
        <span class='bold'>Round $result[round_count]</span><br>
        <span class=''>Turn $result[turn_count]</span>
        ";
    }
}
mysqli_close($conn);
