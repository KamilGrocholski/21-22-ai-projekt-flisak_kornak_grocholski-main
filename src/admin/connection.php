<?php

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "biblioteka";

$conn = mysqli_connect($servername, $username, $password, $dbname);

if (!$conn) {
    echo "Connection failed!";
}

?>
