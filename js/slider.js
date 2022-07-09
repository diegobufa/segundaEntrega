const slider = document.querySelector("#slider");
let sliderSection = document.querySelectorAll(".slider_section");
let sliderSectionLast =  sliderSection[sliderSection.length -1];

// Botones del Slider
const btnLeft = document.querySelector("#btn-left");
const btnRight = document.querySelector ("#btn-right");

slider.insertAdjacentElement('afterbegin', sliderSectionLast);

function moverSiguiente(){
    let sliderSectionFirst = document.querySelectorAll(".slider_section")[0];
    slider.style.marginLeft = "-200%";
    slider.style.transition = "all 0.5s";
    setTimeout(function(){
        slider.style.transition = "none";
        slider.insertAdjacentElement('beforeend', sliderSectionFirst);
        slider.style.marginLeft = "-100%";
    }, 500 );


}

function moverAnterior(){
    let sliderSection = document.querySelectorAll(".slider_section");
    let sliderSectionLast = sliderSection[sliderSection.length -1];
    slider.style.marginLeft = "0";
    slider.style.transition = "all 0.5s";
    setTimeout(function(){
        slider.style.transition = "none";
        slider.insertAdjacentElement('afterbegin', sliderSectionLast);
        slider.style.marginLeft = "-100%";
        }, 500);


}

btnRight.addEventListener('click', function (){
    moverSiguiente();
});

btnLeft.addEventListener('click', function (){
        moverAnterior();
});

setInterval(function(){
    moverSiguiente();
}, 6000);
