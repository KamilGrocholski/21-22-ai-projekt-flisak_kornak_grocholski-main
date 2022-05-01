<?php
// sesję dodać do każdego pliku + sesja z logowania
    session_start();
    include('connection.php');
?>

<?php
    $query = "SELECT * FROM czytelnicy
                WHERE email = '$user_email'
                AND haslo = '$user_password'";
    $result = mysqli_query($conn, $query); 
    $row = mysqli_num_rows($result);     
    
    
?>