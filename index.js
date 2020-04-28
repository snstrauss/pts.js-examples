import { CanvasSpace } from "./lib/pts";
import examples from "./examples";

window.space = new CanvasSpace('#canvasContainer');
window.form = space.getForm();

const nav = document.querySelector('.container nav');

examples.forEach((example, i) => {

    const button = document.createElement('button');
    button.innerText = example.title;
    button.setAttribute('onclick',`playExample(${i})`);
    button.classList.add('nav-button');

    nav.appendChild(button);
});

window.playExample = function playExample(exampleIdx){
    space.removeAll();
    colorCorrectNavButton(exampleIdx);
    examples[exampleIdx].play();
}

function colorCorrectNavButton(selected){

    debugger;

    Array.from(document.querySelectorAll('.nav-button')).forEach((button, i) => {

        debugger;
        button.classList.toggle('active', i === selected);
    });
}

setTimeout(() => {
    playExample(0);
},100)