CREATE DATABASE IF NOT EXISTS `biblioteka`;
USE `biblioteka`;

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
  `nazwisko` varchar(30) NOT NULL,
  PRIMARY KEY (`id_autor`)
);

CREATE TABLE `ksiazki` (
  `id_ksiazka` int(11) NOT NULL AUTO_INCREMENT,
  `tytul` varchar(75) NOT NULL,
  `rok_wydania` INTEGER NOT NULL,
  `wydawnictwo` varchar(70) NOT NULL,
  `ilosc` INTEGER NOT NULL,
  `id_autor` int(11) NOT NULL,
  PRIMARY KEY (`id_ksiazka`),
  KEY `id_autor` (`id_autor`),
  CONSTRAINT `ksiazki_ibfk_1` FOREIGN KEY (`id_autor`) REFERENCES `autorzy` (`id_autor`) ON UPDATE CASCADE
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
  `id_ksiazka` int(11) NOT NULL,
  `id_czytelnik` int(11) NOT NULL,
  `id_pracownik` int(11) NOT NULL,
  PRIMARY KEY (`id_wypozyczenie`),
  KEY `id_ksiazka` (`id_ksiazka`),
  KEY `id_czytelnik` (`id_czytelnik`),
  KEY `id_pracownik` (`id_pracownik`),
  CONSTRAINT `wypozyczenia_ibfk_1` FOREIGN KEY (`id_ksiazka`) REFERENCES `ksiazki` (`id_ksiazka`) ON UPDATE CASCADE,
  CONSTRAINT `wypozyczenia_ibfk_2` FOREIGN KEY (`id_czytelnik`) REFERENCES `czytelnicy` (`id_czytelnik`) ON UPDATE CASCADE,
  CONSTRAINT `wypozyczenia_ibfk_3` FOREIGN KEY (`id_pracownik`) REFERENCES `pracownicy` (`id_pracownik`) ON UPDATE CASCADE
);
