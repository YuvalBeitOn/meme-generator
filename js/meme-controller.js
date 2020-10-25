'use strict';

var gCanvas;
var gCtx;
var gIsDrag;

function init() {
    renderGallery();
    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('resize', resizeEditor);
}

function initEditor() {
    gCanvas = document.querySelector('#canvas');
    gCtx = gCanvas.getContext('2d');
    resizeCanvas();
}

function getCanvas() {
    return gCanvas;
}

/***** render functions *****/

function renderImgsList() {
    const imgs = getImgs();
    var strHtml = imgs.map((img) => {
        return `<img class="gallery-item" onclick="setSelectedImgId(${img.id}); renderEditor();" src="${img.url}" alt="${img.id}"/>
        `
    }).join('');
    const elGallery = document.querySelector('.img-gallery');
    elGallery.innerHTML = strHtml;
}

function renderKeywordList() {
    var elKeywords = document.querySelector('.keywords');
    let words = getPopularKeywords();
    let strHtml = words.map(word => {
        return `<span class="keyword" onclick="handleFilterKeyWord('${word.keyword}')" style="font-size: ${word.count}px">${word.keyword}</span>`
    }).join('');
    elKeywords.innerHTML = strHtml;
}

function renderGallery() {
    document.querySelector('.gallery').style.display = "block";
    document.querySelector('.main-container').style.display = "none";
    renderImgsList();
    renderKeywordList();
}

function renderEditor() {
    document.querySelector('.gallery').style.display = "none";
    document.querySelector('.main-container').style.display = "block";
    initEditor();
    drawImg();
    drawText();
    renderStickers();
}

function renderStickers() {
    const stickers = getStickers();
    var strHtml = stickers.map((sticker) => {
        return `<span class="sticker" onclick="handleAddLine('${sticker.txt}')">${sticker.txt}</span>`
    }).join('');
    const elStickers = document.querySelector('.stickers');
    elStickers.innerHTML = strHtml;
}

/***** drag and drop *****/

function dragText(ev) {
    const line = getSelectedLine();
    let width = gCanvas.width;
    let height = line.size + 10;
    let top = gCanvas.getBoundingClientRect().top;
    let left = gCanvas.getBoundingClientRect().left;
    let posX1 = line.position.x + left;
    let posY1 = line.position.y - line.size + top;
    let posX2 = line.position.x + width + left;
    let posY2 = line.position.y - line.size + height + top;
    if (ev.pageX > posX1 && ev.pageX < posX2 && ev.pageY > posY1 && ev.pageY < posY2) {
        console.log('here');
        ev.preventDefault();
        gIsDrag = true;
        gCanvas.onmousemove = moveText;
    }
}

function dropText() {
    gIsDrag = false;
    console.log(gIsDrag);
    gCanvas.onmousemove = null;
}

function moveText(ev) {
    ev.preventDefault();
    console.log(gIsDrag);
    if (gIsDrag) {
        const line = getSelectedLine();
        line.position.x = ev.pageX - gCanvas.getBoundingClientRect().left;
        line.position.y = ev.pageY - gCanvas.getBoundingClientRect().top;
        drawText();
    }
}


/***** resize functions *****/

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

function scrollToAbout() {
    const elTarget = document.querySelector('.about');
    var pos = elTarget.getBoundingClientRect();
    var options = {
        top: pos.y,
        left: 0,
        behavior: 'smooth'
    }
    window.scrollTo(options);
}

function handleFontFamily(font) {
    setFontFamily(font)
    drawText();
}

function handleFilterKeyWord(value) {
    setFilter(value);
    document.querySelector('.search-meme').value = value;
    renderImgsList();
}


function handleChangeLinePos(diff) {
    setLinePos(diff)
    drawText();
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

function handleAddLine(txt) {
    document.querySelector('.text-input').value = '';
    // setCanvasSizes(gCanvas.width);
    addTextLine(txt);
    drawText();
}

function handleDeleteLine() {
    deleteLine();
    drawText();
}

function handleChangeLine(diff) {
    setSelectedLine(diff);
    document.querySelector('.text-input').value = getSelectedLine().txt;
    drawText();
    markSelectedText();
}

function handleFontSize(num) {
    setfontSize(num);
    drawText();
    markSelectedText();
}

function handleTextAlign(align) {
    setTextAlign(align);
    drawText();
    markSelectedText();
}

function handleTextChange(ev) {
    setText(ev.target.value);
    drawText();
}

/***** canvas functions ******/

function markSelectedText() {
    const line = getSelectedLine();
    let posX = 0;
    let posY = line.position.y - line.size;
    drawRect(posX, posY, gCanvas.width, line.size + 20);
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
    drawImg();
    const lines = getLines();
    lines.forEach((line) => {
        gCtx.font = `${line.size}px ${line.font}`;
        gCtx.textAlign = line.align;
        gCtx.lineWidth = '2';
        gCtx.strokeStyle = line.stroke;
        gCtx.fillStyle = line.fill;
        gCtx.fillText(line.txt, line.position.x, line.position.y);
        gCtx.strokeText(line.txt, line.position.x, line.position.y);
    });
    markSelectedText();
}

function drawSticker(stickerId) {
    console.log(stickerId);
    const currSticker = getStickerById(stickerId);
    const sticker = new Image()
    sticker.src = currSticker.url;
    gCtx.drawImage(sticker, 0, 0, 100, 100);
}

function downloadCanvas(elLink) {
    const data = gCanvas.toDataURL();
    elLink.href = data;
    elLink.download = 'my-canvas.jpg';
}


function doneCanvas() {
    const lines = getLines();
    drawImg();
    lines.forEach((line) => {
        gCtx.font = `${line.size}px ${line.font}`;
        gCtx.textAlign = line.align;
        gCtx.lineWidth = '2';
        gCtx.strokeStyle = line.stroke;
        gCtx.fillStyle = line.fill;
        gCtx.fillText(line.txt, line.position.x, line.position.y);
        gCtx.strokeText(line.txt, line.position.x, line.position.y);
    });
}

function onSaveCanvas() {
    const data = gCanvas.toDataURL();
    saveCanvas(data);
}

function toggleMenu() {
    var curr = document.querySelector('nav').style.visibility;
    console.log(curr);
    if (curr === 'hidden') curr = 'visible';
    else curr = 'hidden';
    document.querySelector('nav').style.visibility = curr;
}