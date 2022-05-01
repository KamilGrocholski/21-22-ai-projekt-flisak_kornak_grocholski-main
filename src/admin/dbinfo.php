<?php

include "connection.php";

$tables_sql = "SHOW FULL TABLES WHERE Table_Type = 'BASE TABLE'";
$views_sql = "SHOW FULL TABLES WHERE Table_Type LIKE 'VIEW'";
$fields_sql = "SHOW COLUMNS FROM ";
$result = mysqli_query($conn, $tables_sql);


$data = [];

// fetch tables and fields
if (mysqli_num_rows($result) > 0) {
    $x = mysqli_fetch_fields($result);

    while($row = mysqli_fetch_array($result, MYSQLI_NUM)) {
        $name = $row[0];
        $data["tables"][$name] = [];
        $result2 = mysqli_query($conn, $fields_sql . '`' . $name . '`');

        if (mysqli_num_rows($result2) > 0) {
            while($row2 = mysqli_fetch_array($result2, MYSQLI_NUM)) {
                array_push($data["tables"][$name], $row2[0]);
            }
        }
        mysqli_free_result($result2);
    }
    mysqli_free_result($result);
} 
else
    echo json_encode(array());

$result = mysqli_query($conn, $views_sql);

// fetch tables and fields
if (mysqli_num_rows($result) > 0) {
    $x = mysqli_fetch_fields($result);

    while($row = mysqli_fetch_array($result, MYSQLI_NUM)) {
        $name = $row[0];
        $data["views"][$name] = [];
        $result2 = mysqli_query($conn, $fields_sql . $name);

        if (mysqli_num_rows($result2) > 0) {
            while($row2 = mysqli_fetch_array($result2, MYSQLI_NUM)) array_push($data["views"][$name], $row2[0]);
        }
        mysqli_free_result($result2);
    }
    mysqli_free_result($result);
    echo json_encode($data);
} 
else
    echo json_encode(array());

// close connection with database
mysqli_close($conn);
