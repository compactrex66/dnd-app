<?php
    include "../parsedown/Parsedown.php";
    include "../parsedown/ParsedownExtra.php";
    include "../dbConnection.php";

    function checkIfMonsterExists(mysqli $conn, string $monsterName) {
        $result = mysqli_query($conn, "SELECT `name` FROM `enemies`");
        while($row = mysqli_fetch_array($result)) {
            if($monsterName == $row[0]) return true;
        }
        return false;
    }

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
            $stmt = $conn->prepare(
                "INSERT INTO enemies (name, min_health, max_health, AC, initiative_bonus, more_info)
                VALUES (?, ?, ?, ?, ?, ?)"
            );
            $stmt->bind_param("siiiis", $name, $minHealth, $maxHealth, $armorClass, $initiativeBonus, $moreInfo);

            if ($stmt->execute()) {
                echo "1";
            } else {
                echo "Error: " . $stmt->error;
            }
            $stmt->close();
        } elseif($action == 'checkIfExists') {
            $monsterName = $_POST['monsterName'];
            echo checkIfMonsterExists($conn, $monsterName);
        }
    }
    mysqli_close($conn);
?>