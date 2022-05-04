let ksiazki = [];
let iloscK;
let index;

function ls() {
    // if(!JSON.parse(localStorage.getItem('ksiazki')) === null) {
        ksiazki = JSON.parse(localStorage.getItem('ksiazki'))
    // } else {
    //     console.log('empty');
    // }
}

function ss() {
    localStorage.setItem('ksiazki', JSON.stringify(ksiazki));
}

function cs() {
    localStorage.clear();
}

function ile(id_ksiazka) {
    index = ksiazki.findIndex(elem => elem.id === id_ksiazka);
    // console.log(index);
    iloscK = ksiazki[index].ilosc;
}

function czyZero(id_ksiazka) {
    ile(id_ksiazka);
    if(iloscK == 0) {
        return true;
    } else {
        return false;
    }
}

function dodaj(id_ksiazka) {
    ls();

    if(ksiazki === undefined || ksiazki.length == 0 || ksiazki == null) {
        ksiazki.push({'id': id_ksiazka, 'ilosc': 1});
    } else {
        if(ksiazki.some(elem => elem.id === id_ksiazka)) {
            ile(id_ksiazka);
            ksiazki[index].ilosc++;
        } else {
            ksiazki.push({'id': id_ksiazka, 'ilosc': 1});
        }
    }
    // else if(find) {
    //     ile(id_ksiazka);
    //     ksiazki[index].ilosc++;
    // } else {
    //     ksiazki.push({'id': id_ksiazka, 'ilosc': 1});
    // }

    ss();
}

function dodajShelf(id_ksiazka) {
    dodaj(id_ksiazka);
    const children = document.getElementById(id_ksiazka).children;
    const rdChild = children.item(2);
    rdChild.innerText = ksiazki[index].ilosc++;
}

function usun(id_ksiazka) {
    ls();

    if(ksiazki === undefined || ksiazki.length == 0 || ksiazki == null) {
        
    } else {
        if(ksiazki.some(elem => elem.id === id_ksiazka)) {
            if(!czyZero(id_ksiazka)) {
                ile(id_ksiazka);
                ksiazki[index].ilosc--;
            }
        }
    }
    // else if(find) {
    //     ile(id_ksiazka);
    //     ksiazki[index].ilosc++;
    // } else {
    //     ksiazki.push({'id': id_ksiazka, 'ilosc': 1});
    // }

    ss();
}

function usunShelf(id_ksiazka) {
    usun(id_ksiazka);
    const children = document.getElementById(id_ksiazka).children;
    const rdChild = children.item(2);
    rdChild.innerText = ksiazki[index].ilosc--;
}

function X(id_ksiazka) {
    ls();

    ile(id_ksiazka);
    ksiazki.splice(index, 1);
    const div = document.getElementById(id_ksiazka);
    div.remove();
    
    ss();
}

function pokaz() {
    ls();

    for(let ksiazka in ksiazki) {
        let div = document.createElement('div');
        // div.classList.add('block');
        div.classList.add('is-flex');
        div.classList.add('is-flex-direction-row');
        div.classList.add('is-flex-wrap-nowrap');
        div.classList.add('is-justify-content-space-between');
        div.id = ksiazki[ksiazka].id;
    
        let txtNazwa = ksiazki[ksiazka].id;
        let h1_1 = document.createElement('h1');
        h1_1.classList.add('title');
        h1_1.innerText = `Nazwa: ${txtNazwa}`;
    
        let buttonAdd = document.createElement('button');
        buttonAdd.classList.add('is-medium');
        buttonAdd.setAttribute('onClick', 'dodajShelf(this.name)');
        buttonAdd.name = ksiazki[ksiazka].id;
        buttonAdd.innerText = "+";

        let txtIlosc = ksiazki[ksiazka].ilosc;
        let h1_2 = document.createElement('h1');
        h1_2.classList.add('title');
        h1_2.setAttribute('name', 'ilosc');
        h1_2.innerText = txtIlosc;
    
        let buttonRemove = document.createElement('button');
        buttonRemove.classList.add('is-medium');
        buttonRemove.setAttribute('onClick', 'usunShelf(this.name)');
        buttonRemove.name = ksiazki[ksiazka].id;
        buttonRemove.innerText = "-";
    
        let buttonX = document.createElement('button');
        buttonX.classList.add('delete');
        buttonX.setAttribute('onClick', 'X(this.name)'); 
        buttonX.name = ksiazki[ksiazka].id;

        let ele = [h1_1, buttonAdd, h1_2, buttonRemove, buttonX];

        for(let i in ele) {
            div.append(ele[i]);
        }
        let div1 = document.getElementById('div1');
        div1.append(div);
    }
}