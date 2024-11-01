<?php
    $conn = mysqli_connect("localhost", "root", "", "dnd");

    if(isset($_GET['healthNumber']) || isset($_GET['initiative']) || isset($_GET['characterId'])) {
        if($_GET['action'] == 'adjustHealth') {
            $characterId = $_GET['characterId'];
            $health = (int)mysqli_fetch_row(mysqli_query($conn, "SELECT health FROM current_fight WHERE id = $characterId"))[0] + (int)$_GET['healthNumber'];
            mysqli_query($conn, "UPDATE current_fight set health = $health WHERE id = $characterId");
        } elseif($_GET['action'] == 'changeInitiative') {
            $characterId = $_GET['characterId'];
            $initiative = $_GET['initiative'];
            mysqli_query($conn, "UPDATE current_fight SET initiative = $initiative WHERE id = $characterId");
        } elseif($_GET['action'] == 'delete') {
            $characterId = $_GET['characterId'];
            mysqli_query($conn, "DELETE FROM current_fight WHERE id = $characterId");
        }
        header("Location: index.php");
    }
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="style.css">
    <script src="https://kit.fontawesome.com/791dbbf45c.js" crossorigin="anonymous"></script>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Ubuntu:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,500;1,700&display=swap" rel="stylesheet">
    <title>DnD App</title>
</head>
<body>
    <form action="" method="get" id="actionForm" style="display: none;">
        <input type="text" name="action" id="actionInput">
        <input type="number" name="characterId" id="characterIdInput">
        <input type="number" name="healthNumber" id="healthInput">
        <input type="number" name="initiative" id="initiativeInput">
    </form>
    <header>Fight</header>
    <main>
        <div class="listOfCharacters" id="listOfCharacters">
            <?php
                $sql = "SELECT * FROM current_fight ORDER BY initiative DESC";
                $result = mysqli_query($conn, $sql);
                while($row = mysqli_fetch_assoc($result)) {
                    echo "<div class='character' data-characterId='".$row['id']."'>";
                    echo "<span class='characterName'>".$row['name']."</span>";
                    echo "<span class='characterHealth'>Health: ".$row['health']."</span>";
                    echo "<span>Initiative: </span><input class='no-spinner' type='number' value=".$row['initiative']." id='modifiedInitiativeInput'></input>";
                    echo "<span>AC: ".$row['AC']."</span>";
                    echo '<button class="redBtn">sub</button><input class="no-spinner" type="number" id="healthInput"></input><button class="greenBtn">add</button>';
                    if($row['isPlayer'] == 1) {
                        echo "<span style='color: var(--secondary)'>X</span>";
                    } else {
                        echo "<span class='deleteBtn'>X</span>";
                    }
                    echo "</div>";
                }
                if(isset($_GET['enemyType'])) {
                    $enemyType = $_GET['enemyType'];
                    $enemyQuantity = $_GET['enemyQuantity'] != null ? $_GET['enemyQuantity'] : 1;
                    $sql = "SELECT * FROM enemies WHERE name = '$enemyType'";
                    $result = mysqli_fetch_assoc(mysqli_query($conn, $sql));
                    $enemyNumber = mysqli_fetch_array(mysqli_query($conn, "SELECT count(*) FROM current_fight"))[0] - 2;
                    $min_health = $result['min_health'];
                    $max_health = $result['max_health'];
                    $initiativeBonus = $result['initiative_bonus'];
                    $AC = $result['AC'];
                    $counter = 0;

                    for($i = 0; $i < $enemyQuantity; $i++) {
                        $health = rand($min_health, $max_health);
                        $initiative = rand(1, 20) + $initiativeBonus;
                        $sql = "INSERT INTO current_fight(name, health, initiative, AC, isPlayer) Values('$enemyType".$enemyNumber+$counter."', $health, $initiative, $AC, 0)";
                        $result = mysqli_query($conn, $sql);
                        $counter++;
                    }
                    header("Location: index.php");
                }
            ?>
        </div>
        <form action="" method="get" class="addEnemy">
            <select id="enemySelect" name="enemyType">
                <?php
                    $sql = "SELECT * FROM enemies";
                    $result = mysqli_query($conn, $sql);
                    while($row = mysqli_fetch_assoc($result)) {
                        echo "<option value='".$row['name']."'>";
                        echo "<span>".$row['name']."</span>";
                        echo "</option>";
                    }
                ?>
            </select>
            <input type="number" name="enemyQuantity" value="1">
            <button>Add Enemy</button>
            <button>Delete all enemies</button>
        </form>
    </main>
    <script src="script.js"></script>
</body>
</html>