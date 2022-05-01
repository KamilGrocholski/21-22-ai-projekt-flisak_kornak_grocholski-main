<?php

// Dodac .env /config.php i zmienne do nich

$servername = "localhost"; 
// servername do zmiany potem na db, jak wczesniej
$username = "root";
$password = "";
$dbname = "biblioteka";

$conn = mysqli_connect($servername, $username, $password, $dbname);

if (!$conn) {
    echo "Connection failed!";
}

?>