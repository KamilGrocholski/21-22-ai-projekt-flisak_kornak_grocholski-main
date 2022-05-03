<?php 
        $scr = "";
        if (isset($_GET["scr"])) $scr = $_GET["scr"];
        
        function main() {
            include('../user/include/nowe.php');
        }

        function wypozyczalnia() {
            include('../user/include/wypozyczalnia.php');
        }

        function wylogowanie() {
            include('../user/include/exit.php');
        }

        function profil() {
            include('../user/include/profil.php');
        }

        switch ($scr)
        {
            case "main":
                main();
                break;
            case "wypozyczalnia":
                wypozyczalnia();
                break;
            case "wylogowanie":
                wylogowanie();
                break;
            case "profil":
                profil();
                break; 
            case "shelf";
                shelf();
                break;
            default:
                main(); 
        }
    
    ?>