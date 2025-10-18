<?php
    include "parsedown/Parsedown.php";
    include "parsedown/ParsedownExtra.php";
    include "dbConnection.php";

    $ch = curl_init();
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_URL, "https://api.open5e.com/v2/conditions/?document__key__in=srd-2014");
    $output = json_decode(curl_exec($ch), true)['results'];
    $parsedown = new ParsedownExtra();
    foreach($output as $condition) {
        $name = $condition['name'];
        $description = $parsedown->text($condition['desc']);
        $documentKey = $condition['document']['key'];
        echo "$name<br>$description<br>$documentKey<br><br>";
        $stmt = $conn->prepare("INSERT INTO conditions(name, description, document_key) values(?, ?, ?)");
        $stmt->bind_param(
            "sss",
            $name,
            $description,
            $documentKey
        );
        $stmt->execute();
    }
    mysqli_close($conn);
?>