'use strict';

var gCanvas;
var gCtx;

function init() {
    renderGallery();
    renderImgsGallery();
}

function renderImgsGallery() {
    const imgs = getImgs();
    var strHtml = imgs.map((img) => {
        return `<img class="gallery-item" onclick="setSelectedImgId(${img.id}); renderEditor();" src="${img.url}" alt="${img.id}"/>
        `
    }).join('');
    var elGallery = document.querySelector('.img-gallery');
    elGallery.innerHTML = strHtml;
}

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

function renderGallery() {
    var strHtml = `<main> <section class="filters flex space-between">
                    <input class="search-meme" type="text" placeholder="Enter search keyword">
                    <div class="keywords"></div>
                    </section>
                    <div class="img-gallery flex wrap"></div>
                    <section class="about"></section> <main/>`;
    document.querySelector('.content').innerHTML = strHtml;
}

function renderEditor() {
    var strHtml =
        `<main class="editor flex">
    <div class="canvas-container">
        <canvas id="canvas"></canvas>
    </div>
    <div class="editor-controls">
        <input class="text-input" onkeydown="handleTextChange(event)" type="text" placeholder="Enter text here">
        <div class="btns-container">
            <button onClick="handleChangeLine()"><img src="/img/icons/up-and-down-opposite-double-arrows-side-by-side.png" alt=""></button>
            <button onclick="handleAddLine()"><img src="/img/icons/add.png" alt=""></button>
            <button onclick="handleDeleteLine()"><img src="/img/icons/trash.png" alt=""></button>
            <input onchange="handleColor(event)" type="color" id="text-color" name="text-color" value="#000000">
        </div>
        <div class="text-controls">
            <button onclick="handleFontSize(${3})"><img src="/img/icons/increase font - icon.png" alt=""></button>
            <button onclick="handleFontSize(${-3})"><img src="/img/icons/decrease font - icon.png" alt=""></button>
            <button onclick="handleTextAlign('right')"><img src="/img/icons/align-to-left.png" alt=""></button>
            <button onclick="handleTextAlign('left')"><img src="/img/icons/align-to-right.png" alt=""></button>
            <button onclick="handleTextAlign('center')"><img src="/img/icons/center-text-alignment.png" alt=""></button>
            <select class="font">
                <option value="impact">Impact</option>
            </select>
            <button><img src="/img/icons/text stroke.png" alt=""></button>
        </div>
    </div>
    </main>`
    document.querySelector('.content').innerHTML = strHtml;
    console.log(gMeme);
    initEditor();
    drawImg();
}

function handleColor(ev) {
    const textColor = document.getElementById('text-color').value;
    setColor(textColor);
}

function handleAddLine() {
    addTextLine();
    drawText();
}

function handleDeleteLine() {
    deleteLine();
    drawText();
}

function handleChangeLine() {
    var line = getSelectedLine();
    document.querySelector('.text-input').value = line.txt;
    setSelectedLine();
    drawText();
}

function handleFontSize(num) {
    setfontSize(num);
    drawText();
}

function handleTextAlign(align) {
    setTextAlign(align);
    drawText();
}

function handleTextChange(ev) {
    setText(ev.target.value);
    console.log(ev.target.value);
    drawText();
}


function drawImg() {
    var imgId = getSelectedImgId();
    var img = new Image()
    img.src = getImgById(imgId).url;
    console.log(img.src);
    gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height)
}


function drawText() {
    const lines = getLines();
    drawImg();
    console.log(lines);
    lines.forEach((line, idx) => {
        gCtx.font = `${line.size}px Impact`;
        gCtx.textAlign = line.align;
        gCtx.strokeStyle = line.fill;
        gCtx.fillStyle = line.stroke;
        let y = (idx === 0) ? 100 : gCanvas.height - 100 + line.size;
        gCtx.fillText(line.txt, gCanvas.width / 2, y)
        gCtx.strokeText(line.txt, gCanvas.width / 2, y)
    });
}