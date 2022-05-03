let ksiazki = [];
let ilosck;
let index;

function ls() {
    ksiazki = JSON.parse(localStorage.getItem('ksiazki'))
}

function ss() {
    localStorage.setItem('ksiazki', JSON.stringify(ksiazki));
}

function cs() {
    localStorage.clear();
}

function ile(id_ksiazka) {
    index = ksiazki.findIndex(elem => elem.id === id_ksiazka);
    ilosck = ksiazki[index].ilosc;
}

function dodaj(id_ksiazka) {
    ls();

    if(ksiazki.some(elem => elem.id === id_ksiazka) == true) {
        ile(id_ksiazka);
        ksiazki[index].ilosc++;
    } else {
        ksiazki.push({'id': id_ksiazka, 'ilosc': 1});
    }

    ss();
}

// function usun(id_ksiazka) {
//     ss();

//     ile(id_ksiazka);
//     if(ilosck >= 1) {
//         ilosc--;
//     } else {
//         ilosc = 0;
//     }

//     ls();
// }

function pokaz() {
    ls();
    for(let ksiazka in ksiazki) {
        let el1 = document.createElement('p');
        let tx1 = ksiazki[ksiazka].id;
        let tx2 = ksiazki[ksiazka].ilosc;
        el1.innerHTML = `Id: ${tx1}, Ilość: ${tx2}`;
        let di1 = document.getElementById('div1');
        di1.append(el1);
        // console.log(ksiazki[ksiazka]);
    }
    // console.log(ksiazki);
}