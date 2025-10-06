<?php
    include "../dbConnection.php";

    if(isset($_POST['action'])) {
        include '../dbConnection.php';
        $action = $_POST['action'];
        if($action == 'updateEnemy') {
            $name = $_POST['name'];
            $minHealth = $_POST['minHealth'];
            $maxHealth = $_POST['maxHealth'];
            $armorClass = $_POST['armorClass'];
            $initiativeBonus = $_POST['initiativeBonus'];
            $documentKey = $_POST['documentKey'];
            $moreInfo = $_POST['info'];
            echo $moreInfo;
            $stmt = $conn->prepare(
                "UPDATE enemies SET name = ?, min_health = ?, max_health = ?, AC = ?, initiative_bonus = ?, document_key = ?, more_info = ? WHERE document_key = ?"
            );
            $stmt->bind_param("siiiisss", $name, $minHealth, $maxHealth, $armorClass, $initiativeBonus, $documentKey, $moreInfo, $documentKey);

            if ($stmt->execute()) {
                echo "1";
            } else {
                echo "Error: " . $stmt->error;
            }
            $stmt->close();
        }
    }

    mysqli_close($conn);
?>