<?php include "../dbConnection.php" ?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="shortcut icon" href="../media/favicon.png" type="image/x-icon">
    <link rel="stylesheet" href="../style.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Ubuntu:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,500;1,700&display=swap" rel="stylesheet">
    <title>DnD App | Main page</title>
</head>
<body>
    <div class="side-panel" id="menu">
        <img src="../media/arrowRight.svg" alt="Close side panel arrow" id="sidePanelCloseBtn">
        <a href="../index.php"><button>Main Page</button></a>
        <a href="../enemySearch/enemySearch.php"><button>Search for new enemies</button></a>
        <a href="../addenemy/addenemy.php"><button>Add new enemies with markdown</button></a>
        <a href="#"><button>Update enemy info</button></a>
    </div>
    <header class="row-form">
        <button id="updateEnemiesInfoBtn">Update All Enemies Info</button>
        <img src="../media/menuIcon.svg" alt="Menu icon" id="menuIcon" class="header-btn">
    </header>
    <main>
        <div class="listOfCharacters" id="enemyList">
            <?php
                $result = mysqli_query($conn, "SELECT * FROM enemies");
                while($row = mysqli_fetch_array($result)) {
                    echo "
                    <div class='character'>
                        <span class='more-info' style='display: none;'>$row[more_info]</span>
                        <span>$row[name]</span>
                        <span class='character-document-key'>$row[document_key]</span>
                        <button class='third-btn'>Update Info</button>
                    </div>";
                }
            ?>
        </div>
        <div id="moreInfoPanel">

        </div>
    </main>
    <script src="https://cdn.jsdelivr.net/npm/markdown-it@14.1.0/dist/markdown-it.min.js" integrity="sha256-OMcKHnypGrQOLZ5uYBKYUacX7Rx9Ssu91Bv5UDeRz2g=" crossorigin="anonymous"></script>
    <script src="updateEnemyInfo.js"></script>
    <script src="../globalScript.js"></script>
</body>
</html>
<?php mysqli_close($conn) ?>