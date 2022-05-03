let ksiazki = [];
let ilosc;
let index;

function ss() {
    Object.keys(localStorage).forEach((key) => {
        ksiazki[key] = sessionStorage.getItem(key);
    });
}

function ls() {
    localStorage.setItem('ksiazki', JSON.stringify(ksiazki));
    var obj = JSON.parse(localStorage.ksiazki);
}

function ile(id_ksiazka) {
    index = ksiazki.findIndex(elem => elem.id === id_ksiazka);
    ilosc = ksiazki[index].ilosc;
}

function dodaj(id_ksiazka) {
    ss();

    if(ksiazki.some(elem => elem.id === id_ksiazka)) {
        ile(id_ksiazka);
        ksiazki[index].ilosc++;
        console.log(ksiazki)
    } else {
        ksiazki.push({id: id_ksiazka, ilosc: 1});
        console.log(ksiazki)
    }

    ls();
}

function usun(id_ksiazka) {
    ss();

    ile(id_ksiazka);
    if(ilosc >= 1) {
        ilosc--;
    } else {
        ilosc = 0;
    }

    ls();
}