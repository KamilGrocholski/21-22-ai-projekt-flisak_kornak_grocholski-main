CREATE TABLE `czytelnicy` (
    `id_czytelnik` int(11) NOT NULL AUTO_INCREMENT,
    `imie` varchar(20) NOT NULL,
    `nazwisko` varchar(30) NOT NULL,
    `email` varchar(40) NOT NULL,
    `haslo` varchar(20) NOT NULL,
    `telefon` varchar(9) NOT NULL,
    PRIMARY KEY (`id_czytelnik`)
);

CREATE TABLE `autorzy` (
    `id_autor` int(11) NOT NULL AUTO_INCREMENT,
    `imie` varchar(20) NOT NULL,
    `nazwisko` varchar(75) NOT NULL,
    PRIMARY KEY (`id_autor`)
);

CREATE TABLE `ksiazki` (
    `id_ksiazka` int(11) NOT NULL AUTO_INCREMENT,
    `tytul` varchar(150) NOT NULL,
    `rok_wydania` INTEGER NOT NULL,
    `wydawnictwo` varchar(70) NOT NULL,
    `ilosc` INTEGER NOT NULL,
    `okladka` varchar(150) NOT NULL,
    `opis` TEXT NOT NULL,
    PRIMARY KEY (`id_ksiazka`)
);

CREATE TABLE `pracownicy` (
    `id_pracownik` int(11) NOT NULL AUTO_INCREMENT,
    `imie` varchar(20) NOT NULL,
    `nazwisko` varchar(30) NOT NULL,
    `email` varchar(40) NOT NULL,
    `haslo` varchar(20) NOT NULL,
    `telefon` varchar(9) NOT NULL,
    `wynagrodzenie` decimal(6,2) NOT NULL,
    PRIMARY KEY (`id_pracownik`)
);

CREATE TABLE `wypozyczenia` (
    `id_wypozyczenie` int(11) NOT NULL AUTO_INCREMENT,
    `data_wypozyczenia` datetime(6) NULL,
    `termin_oddania` datetime(6) NULL, 
    `data_oddania` datetime(6) NULL,
    `oddano` tinyint(1) NOT NULL DEFAULT 0,
    `id_czytelnik` int(11) NOT NULL,
    `id_pracownik` int(11) NOT NULL,
    FOREIGN KEY(id_pracownik) REFERENCES pracownicy(id_pracownik),
    PRIMARY KEY (`id_wypozyczenie`),
    KEY `id_czytelnik` (`id_czytelnik`),
    CONSTRAINT `wypozyczenia_ibfk_2` FOREIGN KEY (`id_czytelnik`) REFERENCES `czytelnicy` (`id_czytelnik`) ON UPDATE CASCADE
);

CREATE TABLE `autor_ksiazka` (
    id_autor_ksiazka INT(11) NOT NULL AUTO_INCREMENT,
    id_ksiazka INT(11) NOT NULL,
    id_autor INT(11) NOT NULL,
    FOREIGN KEY(id_ksiazka) REFERENCES ksiazki(id_ksiazka),
    FOREIGN KEY(id_autor) REFERENCES autorzy(id_autor),
    PRIMARY KEY(id_autor_ksiazka)
);

CREATE TABLE `oceny` (
    id_ocena INT(11) NOT NULL AUTO_INCREMENT,
    id_ksiazka INT(11) NOT NULL,
    id_czytelnik INT(11) NOT NULL,
    ocena tinyint NOT NULL,
    FOREIGN KEY(id_ksiazka) REFERENCES ksiazki(id_ksiazka),
    FOREIGN KEY(id_czytelnik) REFERENCES czytelnicy(id_czytelnik),
    PRIMARY KEY(id_ocena)
);

CREATE TABLE `ksiazka_wypozyczenie` (
    id_ksiazka_wypozyczenie INT(11) NOT NULL AUTO_INCREMENT,
    id_ksiazka INT(11) NOT NULL,
    id_wypozyczenie INT(11) NOT NULL,
    FOREIGN KEY(id_ksiazka) REFERENCES ksiazki(id_ksiazka),
    FOREIGN KEY(id_wypozyczenie) REFERENCES wypozyczenia(id_wypozyczenie),
    PRIMARY KEY(id_ksiazka_wypozyczenie)
);

CREATE VIEW autorzyKsiazki AS
SELECT k.*, a.* FROM autorzy AS a
INNER JOIN `autor_ksiazka` AS ak ON a.id_autor = ak.id_autor
INNER JOIN ksiazki AS k ON ak.id_ksiazka = k.id_ksiazka
ORDER BY k.id_ksiazka;
