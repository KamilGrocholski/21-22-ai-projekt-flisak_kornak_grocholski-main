<?php
    session_start();
    include('connection.php');

    $lista_ksiazek = array();

    function dodaj($lista_ksiazek ,$id_ksiazka) {
        array_push($lista_ksiazek ,$id_ksiazka);
    }

    function usun($lista_ksiazek, $id_ksiazka) {
        if(($key = array_search($id_ksiazka, $lista_ksiazek) !== false)) {
            unset($lista_ksiazek[$key]);
        }
    }
