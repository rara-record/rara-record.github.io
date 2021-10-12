const body = document.querySelector("body");

const IMG_NUMBER = 2;

function handleImgLoad(image) {
    body.appendChild(image);
}

function paintImage(imgNumber) {
    const image = new Image();
    image.src = `img/background${imgNumber +1}.jpg`; // random 값에 0이 있을 수 있기때문에 1을 더함
    image.classList.add("bgImage");
    body.appendChild(image);
    image.addEventListener("load", handleImgLoad(image));

}

function genRandom() {
    const number = Math.floor(Math.random() * IMG_NUMBER);
    return number;
}

function init() {
    const randomNumber = genRandom();
    paintImage(randomNumber);
}

init();
