'use strict';

function initSaveMemes() {
    renderSavedMemes();
}

function saveToStorage(key, val) {
    var str = JSON.stringify(val);
    localStorage.setItem(key, str);
}

function loadFromStorage(key) {
    var str = localStorage.getItem(key);
    return JSON.parse(str);
}

function renderSavedMemes() {
    const elSavedMemes = document.querySelector(".saved-memes");
    const memes = loadFromStorage('memes');
    if (!memes) {
        elSavedMemes.innerText = "No memes saved yet"
        return;
    }
    memes.forEach((url) => {
        const newImg = document.createElement("img");
        newImg.src = url;
        elSavedMemes.appendChild(newImg);
    });
}