var images = ['img/slot1.png', 'img/slot2.png','img/slot3.png','img/slot4.png','img/slot5.png','img/slot6.png',]

var counter = 0;
var kapital = 10;
var ergebnis = 0;

function update() {
    var counterDiv = document.getElementById('counter');
    counterDiv.innerHTML = 'Versuche: ' + counter;

    var kapitalDiv = document.getElementById('kapital');
    kapitalDiv.innerHTML = 'Kapital: ' + kapital;
}



function slotMachine() {
    if (kapital > 0) {

    counter++;

    var slot1 = document.getElementById('bild1');
    var slot2 = document.getElementById('bild2');
    var slot3 = document.getElementById('bild3');

    var random1 = Math.floor(Math.random() * images.length);
    var random2 = Math.floor(Math.random() * images.length);
    var random3 = Math.floor(Math.random() * images.length);

    slot1.src = images[random1];
    slot2.src = images[random2];
    slot3.src = images[random3];

    var result = document.getElementById('result');

    if (random1 == random2 && random2 == random3) {
        result.innerHTML = 'Sie haben Gewonnen!';
        kapital = kapital + 5;
        var ergebnis = document.getElementById('ergebnis');
        ergebnis.innerHTML = '5 Chf gewonnen! ';
    } else {
        result.innerHTML = 'Leider nicht gewonnen!';
        kapital = kapital - 0.2;
        var ergebnis = document.getElementById('ergebnis');
        ergebnis.innerHTML = '0.2 Chf verloren! ';
    }

    update();

}
}

document.addEventListener("DOMContentLoaded", () => {
    update();
    var startButton = document.getElementById('start');
    startButton.addEventListener('click', slotMachine);
    //Kompetenz B7
    document.addEventListener('contextmenu', event => event.preventDefault());
  });