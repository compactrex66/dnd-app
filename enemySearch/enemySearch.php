<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="shortcut icon" href="../media/favicon.png" type="image/x-icon">
    <link rel="stylesheet" href="../style.css">
    <link rel="stylesheet" href="style.css">
    <script src="https://kit.fontawesome.com/791dbbf45c.js" crossorigin="anonymous"></script>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Ubuntu:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,500;1,700&display=swap" rel="stylesheet">
    <title>Enemy search</title>
</head>
<body>
    <div class="side-panel" id="menu">
        <img src="../media/arrowRight.svg" alt="Close side panel arrow" id="sidePanelCloseBtn">
        <a href="../index.php"><button>Main Page</button></a>
        <a href="../enemySearch/enemySearch.php"><button>Search for new enemies</button></a>
        <a href="../addenemy/addenemy.php"><button>Add new enemies with markdown</button></a>
        <a href="../updateEnemyInfo/updateEnemyInfo.php"><button>Update enemy info</button></a>
    </div>
    <header class="row-form">
        <input type="text" id="monsterInput" placeholder="Enter a monster name" />
        <button id="searchButton">Search</button>
        <img src="../media/menuIcon.svg" alt="Menu icon" id="menuIcon" class="header-btn">
    </header>
    <main>
        <div id="matchList"></div>
        <div class="monster-result moreInfoPanel">
            <button id="addEnemyBtn" class="corner-btn"><img src="../media/addIcon.svg" alt=""></button>
            <span id="monsterInfo"></span>
        </div>
    </main>
    <script src="enemySearch.js"></script>
    <script src="../globalScript.js"></script>
</body>
</html>