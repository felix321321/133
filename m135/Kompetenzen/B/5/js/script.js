let li = document.createElement("li");
li.textContent = "Felix Gerber";
document.querySelector("#klasse").appendChild(li);

document.querySelector('h1').textContent = 'Meine Klasse';
document.querySelector('#klasse li').innerHTML = 'Flavio Schaffner';

let copy = document.querySelector('#one').innerHTML;
document.querySelector('#two').innerHTML = copy;