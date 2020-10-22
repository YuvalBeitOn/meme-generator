'use strict';

var gCanvas;
var gCtx;

function init() {
    renderGallery();
    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('resize', resizeEditor);
    toggleActiceNav();

}

function renderImgsList() {
    const imgs = getImgs();
    var strHtml = imgs.map((img) => {
        return `<img class="gallery-item" onclick="setSelectedImgId(${img.id}); renderEditor();" src="${img.url}" alt="${img.id}"/>
        `
    }).join('');
    const elGallery = document.querySelector('.img-gallery');
    elGallery.innerHTML = strHtml;
}

function initEditor() {
    gCanvas = document.querySelector('#canvas');
    gCtx = gCanvas.getContext('2d');
    resizeCanvas();
}

function resizeCanvas() {
    const elContainer = document.querySelector('.canvas-container');
    gCanvas.width = elContainer.offsetWidth;
    gCanvas.height = gCanvas.width;
    setCanvasSizes(gCanvas.width);
    drawImg();
    drawText();
}

function resizeEditor() {
    const elEditor = document.querySelector('.editor-controls');
    elEditor.style.height = gCanvas.height + 'px';
}

function toggleActiceNav() {
    var els = document.querySelectorAll('.nav-link');
    console.log(els);
    els.forEach(element => {
        if (element.className.includes('marked')) element.className = 'nav-link';
        else element.className = 'nav-link marked';
    });
}

function scrollToAbout() {
    const elTarget = document.querySelector('.about');
    var pos = elTarget.getBoundingClientRect();
    var options = {
        top: pos.y,
        left: 0,
        behavior: 'smooth'
    }
    console.log(pos);
    window.scrollTo(options);
}

function renderGallery() {
    const strHtml = `<main> 
    <section class="filters-container">
    <div class="filters container flex space-between align-center">
    <input onkeyup="onSearchKeyWord(this.value)" class="search-meme" type="text" placeholder="Search keyword">
    <div class="keywords">words</div>
    </div>
    </section>
    <div class="img-gallery flex wrap"></div>
    <section class="about"></section> <main/>`;
    document.querySelector('.main-container').innerHTML = strHtml;
    renderImgsList();
}

function renderEditor() {
    const strHtml =
        `<main class="editor flex">
    <div class="canvas-container">
    <canvas id="canvas"></canvas>
    </div>
    <div class="editor-controls">
    <input class="text-input" onkeyup="handleTextChange(event)" type="text" placeholder="Enter text here">
    <div class="btns-container">
    <button onClick="handleChangeLine(${1})"><img src="img/icons/up-down.png" alt=""></button>
    <button onClick="handleChangeLinePos(${-3})"><i class="fas fa-arrow-up fa-icon"></i></button>
    <button onClick="handleChangeLinePos(${3})"><i class="fas fa-arrow-down fa-icon"></i></button>
    <button onclick="handleAddLine()"><img src="img/icons/add.png" alt=""></button>
    <button onclick="handleDeleteLine()"><img src="img/icons/trash.png" alt=""></button>
    </div>
    <div class="text-controls">
    <button onclick="handleFontSize(${3})"><img src="img/icons/increase.png" alt=""></button>
    <button onclick="handleFontSize(${-3})"><img src="img/icons/decrease.png" alt=""></button>
    <button onclick="handleTextAlign('right')"><img src="img/icons/align-left.png" alt=""></button>
    <button onclick="handleTextAlign('left')"><img src="img/icons/align-right.png" alt=""></button>
    <button onclick="handleTextAlign('center')"><img src="img/icons/center-text.png" alt=""></button>
    </div>
    <div class="colors-controls">
    <label for="fill-color"><img src="img/icons/color.png" alt=""></img></label>
    <input onchange="handleFillColor()" type="color" id="fill-color" value="#000000">
    <label for="stroke-color"><img src="img/icons/text-stroke.png" alt=""></label>
    <input onchange="handleStrokeColor()" type="color" id="stroke-color" value="#000000">
    </div>
            <div class="actions">
            <button class="save-btn" onclick="saveCanvas()">Save</button>
            <a href="#" onclick="downloadCanvas(this)"><i class="fas fa-download fa-icon"></i></a>
            </div>
            </div>
            </div>
            </main>`
    document.querySelector('.main-container').innerHTML = strHtml;
    initEditor();
    drawImg();
    drawText();
}



/**** event handlers *****/

function onSearchKeyWord(value) {
    setFilter(value);
    renderImgsList()
}


function handleChangeLinePos(diff) {
    setLinePos(diff)
    drawText()
}

function handleStrokeColor() {
    const strokeColor = document.getElementById('stroke-color').value;
    setStrokeColor(strokeColor);
    drawText();
}

function handleFillColor() {
    const fillColor = document.getElementById('fill-color').value;
    setFillColor(fillColor);
    drawText();
}

function handleAddLine() {
    addTextLine();
    drawText();
}

function handleDeleteLine() {
    deleteLine();
    drawText();
}

function handleChangeLine(diff) {
    setSelectedLine(+diff);
    drawText();
    markSelectedText();
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
    console.log(ev.target.value);
    setText(ev.target.value);
    drawText();
}

/***** canvas functions ******/

function markSelectedText() {
    const line = getSelectedLine();
    const textProps = gCtx.measureText(line.txt, 'Impact');
    let posY = line.position.y - line.size;
    let posX = line.position.x - textProps.width / 2 - 10;
    drawRect(posX, posY, textProps.width + 20, line.size + 10);
}

function drawRect(x, y, width, height) {
    gCtx.beginPath()
    gCtx.rect(x, y, width, height);
    gCtx.fillStyle = 'rgba(255,255,255,0.3)';
    gCtx.fill();
}

function drawImg() {
    const imgId = getSelectedImgId();
    const img = new Image()
    img.src = getImgById(imgId).url;
    gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height)
}


function drawText() {
    const lines = getLines();
    drawImg();
    markSelectedText();
    lines.forEach((line) => {
        gCtx.font = `${line.size}px Impact`;
        gCtx.textAlign = line.align;
        gCtx.lineWidth = '2';
        gCtx.strokeStyle = line.stroke;
        gCtx.fillStyle = line.fill;
        gCtx.fillText(line.txt, line.position.x, line.position.y);
        gCtx.strokeText(line.txt, line.position.x, line.position.y);
    });
}

function downloadCanvas(elLink) {
    const data = gCanvas.toDataURL();
    elLink.href = data;
    elLink.download = 'my-canvas.jpg';
}

function saveCanvas() {
    gCtx.save()
}