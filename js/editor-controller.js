'use strict';

var gCanvas;
var gCtx;

function initEditor() {
    gCanvas = document.querySelector('#canvas');
    gCtx = gCanvas.getContext('2d');
    resizeCanvas();
}

function resizeCanvas() {
    var elContainer = document.querySelector('.canvas-container');
    gCanvas.width = elContainer.offsetWidth
    gCanvas.height = elContainer.offsetHeight
}