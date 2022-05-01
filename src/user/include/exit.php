<?php
  session_start();
  session_destroy();
  header("Location: index.php");
//   tutaj ma byc strona glowna albo strona logowania
?>