<?php

include('connection.php');

?>

        <section class="section">
          <div class="container">
          <h1 class="title">Nowe</h1>
            <div class="columns is-multiline has-text-centered">
            <?php
                        $query = "SELECT imie, nazwisko, tytul, rok_wydania, wydawnictwo, ilosc, okladka, opis
                        FROM ksiazki k, autorzy a, autor_ksiazka ak
                        WHERE k.id_ksiazka = ak.id_ksiazka 
                        AND k.id_ksiazka > ( (select COUNT(*) from ksiazki) - 12)
                        AND a.id_autor = ak.id_autor";
                            $result = mysqli_query($conn, $query); 
                            
                            $row = mysqli_num_rows($result); 
                              
                            
                            for($i = 0; $i < 12; $i++) {   
                                list($imie, $nazwisko, $tytul, $rok_wydania, $wydawnictwo, $ilosc, $okladka, $opis) = mysqli_fetch_array($result); 
                                echo 
                                "<div class=\"column is-4-tablet is-3-desktop\">
                                    <div class=\"card\">
                                        <div class=\"card-image has-text-centered px-6\">
                                            <img src=\"$okladka\" alt=\"okładka\">
                                        </div>
                                        <div class=\"card-content\">
                                            <p></p>
                                            <p class=\"title is-size-5\">$tytul</p>
                                        </div>
                                        <footer class=\"card-footer\">
                                            <p class=\"card-footer-item\">
                                                <a href=\"\" class=\"has-text-grey\">$imie $nazwisko</a>
                                            </p>
                                        </footer>
                                    </div>
                                </div>";
                            }?>
            </div>
          </div>
        </section>



                        