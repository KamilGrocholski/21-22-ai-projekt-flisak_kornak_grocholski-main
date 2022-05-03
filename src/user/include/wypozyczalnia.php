<?php
    include('connection.php');
?>

<form action="" method="POST">

<div class="container mb-4">
<section class="mb-2">
    <div class="select is-small is-rounded">
        <select name="w">
            <option value="d">Wybierz wydawnictwo</option>
            <?php
                        $query = "SELECT DISTINCT wydawnictwo FROM ksiazki ORDER BY wydawnictwo";
                        $result = mysqli_query($conn, $query); 
                        $row = mysqli_num_rows($result); 
                
                        while($row = $result->fetch_assoc()) {
                            list($wydawnictwo) = mysqli_fetch_array($result);   
                            echo "<option value=\"$wydawnictwo\">$wydawnictwo</option>";
                        }
            ?>
        </select>
    </div>
</section>  

<section class="mb-2">
    <div class="select is-small is-rounded">
        <select name="a">
            <option value="d">Wybierz autora</option>
            <?php
                        $query = "SELECT DISTINCT id_autor, imie, nazwisko FROM autorzy ORDER BY nazwisko";
                        $result = mysqli_query($conn, $query); 
                        $row = mysqli_num_rows($result); 
                
                        while($row = $result->fetch_assoc()) {
                            list($id_autor, $imie, $nazwisko) = mysqli_fetch_array($result); 
                            echo "<option value=\"$id_autor\">$nazwisko $imie</option>";
                        }
            ?>
        </select>
    </div>
</section> 
</div>
<input class="input mb-2 has-text-centered" style="width: 10%;" type="submit" name="submit"/>
<input class="input mb-3 has-text-centered" style="width: 10%;" type="reset" name="reset onClick='window.location.reload(true);" onClick="history.go(0);"/>
                    </form>

<div class="container">
    <div class="columns is-multiline has-text-centered">
    <?php

                        
// $query = "  SELECT imie, nazwisko, tytul, rok_wydania, wydawnictwo, ilosc, okladka, opis
// FROM ksiazki k, autorzy a, autor_ksiazka ak
// WHERE k.id_ksiazka = ak.id_ksiazka 
// AND a.id_autor = ak.id_autor";
                                //FILTER BUTTON

        $p1 = "SELECT k.id_ksiazka, imie, nazwisko, tytul, rok_wydania, wydawnictwo, ilosc, okladka, opis
        FROM ksiazki k, autorzy a, autor_ksiazka ak
        WHERE k.id_ksiazka = ak.id_ksiazka 
        AND a.id_autor = ak.id_autor 
         ";

        if (isset($_POST['a']) && $_POST['a'] != "d" && $_POST['w'] == 'd') {
            $a = $_POST['a'];   
            $query = $p1."AND a.id_autor = '$a'";
        } elseif(isset($_POST['w']) && $_POST['w'] != "d" && $_POST['a'] == "d") {
            $w = $_POST['w']; 
            $query = $p1."AND k.wydawnictwo = '$w'"; 
        } 
            elseif(isset($_POST['a']) && isset($_POST['w']) && $_POST['a'] != "d" && $_POST['w'] != "d") {
                $a = $_POST['a'];
                $w = $_POST['w'];
                $query = $p1."AND a.id_autor = '$a' AND k.wydawnictwo = '$w'";
            }
        else {
            $query = $p1; 
        }


                        // $query = "SELECT id_ksiazka, tytul, rok_wydania, wydawnictwo, ilosc, okladka, opis FROM ksiazki ORDER BY tytul";
                        $result = mysqli_query($conn, $query); 
                        $row = mysqli_num_rows($result); 

                        $space = " ";

                        if(!empty($result)) {
                            while($row = mysqli_fetch_array($result)) {
                                    // list($imie, $nazwisko, $tytul, $rok_wydania, $wydawnictwo, $ilosc, $okladka, $opis) = mysqli_fetch_array($result); 
                                    echo "<div class='column is-4-tablet is-3-desktop' >
                                            <div class='card' onClick='dodaj(this.id)' id=".$row['id_ksiazka'].">
                                                <div class='card-image has-text-centered px-6'>
                                                    <img src=".$row['okladka']." alt='okładka'>
                                                </div>
                                                <div class='card-content'>
                                                    <p class='title is-size-5'>".$row['tytul']."</p>
                                                    </div>
                                                <footer class='card-footer'>
                                                    <p class='card-footer-item'>
                                                        <a href= class='has-text-grey'>".$row['imie']. $space .$row['nazwisko']."</a>
                                                    </p>
                                                </footer>
                                            </div>
                                        </div>";
                            }
                        }else {
                            echo
                            "<div class='brak'>Brak pozycji o podanych danych</div>";
                        }
    ?>
    </div>
</div>

<!-- <div class="column is-4-tablet is-3-desktop">
        <div class="card">
            <div class="card-image has-text-centered px-6">
                <img src="" alt="">
            </div>
            <div class="card-content">
                <p>4123</p>
                <p class="title is-size-5">XDsdasd</p>
            </div>
            <footer class="card-footer">
                <p class="card-footer-item">
                    <a href="" class="has-text-grey">View</a>
                </p>
            </footer>
        </div>
    </div>  -->