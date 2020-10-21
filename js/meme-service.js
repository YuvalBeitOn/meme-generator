'use strict';

var gKeywords = { 'happy': 12, 'funny puk': 1 }
var gColor = '#000000';

const gImgs = [
    { id: 1, url: 'img/1.jpg', keywords: ['happy'] },
    { id: 2, url: 'img/2.jpg', keywords: ['happy'] },
    { id: 3, url: 'img/3.jpg', keywords: ['happy'] },
    { id: 4, url: 'img/5.jpg', keywords: ['happy'] },
    { id: 5, url: 'img/6.jpg', keywords: ['happy'] },
    { id: 6, url: 'img/7.jpg', keywords: ['happy'] },
    { id: 7, url: 'img/8.jpg', keywords: ['happy'] },
    { id: 8, url: 'img/9.jpg', keywords: ['happy'] },
    { id: 9, url: 'img/10.jpg', keywords: ['happy'] },
    { id: 10, url: 'img/11.jpg', keywords: ['happy'] },
    { id: 11, url: 'img/12.jpg', keywords: ['happy'] },
    { id: 12, url: 'img/13.jpg', keywords: ['happy'] },
    { id: 13, url: 'img/14.jpg', keywords: ['happy'] },
    { id: 14, url: 'img/15.jpg', keywords: ['happy'] },
    { id: 15, url: 'img/16.jpg', keywords: ['happy'] },
    { id: 16, url: 'img/17.jpg', keywords: ['happy'] },
    { id: 17, url: 'img/18.jpg', keywords: ['happy'] },
    { id: 18, url: 'img/4.jpg', keywords: ['happy'] },

];

var gMeme = {
    selectedImgId: 1,
    selectedLineIdx: 0,
    lines: [{
        txt: '',
        size: 48,
        align: 'center',
        fill: 'white',
        stroke: 'black',
        position: {}
    }]
}

function setColor(color) {
    gMeme.lines[gMeme.selectedLineIdx].fill = color;
    gMeme.lines[gMeme.selectedLineIdx].stroke = color;
}


function setfontSize(num) {
    let currFontSize = gMeme.lines[gMeme.selectedLineIdx].size;
    if (currFontSize + num > 80 || currFontSize < 40) return;
    currFontSize = currFontSize + num;
    gMeme.lines[gMeme.selectedLineIdx].size = currFontSize;
    console.log(currFontSize);
}

function setTextAlign(align) {
    gMeme.lines[gMeme.selectedLineIdx].align = align;
}

function addTextLine() {
    let newLine = {
        txt: '',
        size: 48,
        align: 'center',
        fill: 'white',
        stroke: 'black'
    }
    if (gMeme.lines.length <= 1) gMeme.lines.push(newLine);
    gMeme.selectedLineIdx = gMeme.lines.length - 1;
}

function setSelectedLine() {
    let currLine = gMeme.selectedLineIdx;
    if (currLine === 0) currLine = 1;
    else currLine = 0;
    gMeme.selectedLineIdx = currLine;
}

function getSelectedImgId() {
    return gMeme.selectedImgId;
}

function getImgs() {
    return gImgs;
}

function getImgById(imgId) {
    const img = gImgs.find(img => {
        return imgId === img.id;
    })
    return img;
}

function setText(txt) {
    gMeme.lines[gMeme.selectedLineIdx].txt = txt;
}

function getLines() {
    return gMeme.lines;
}

function setSelectedImgId(imgId) {
    gMeme.selectedImgId = imgId;
}

function getSelectedLine() {
    return gMeme.lines[gMeme.selectedLineIdx];
}

function deleteLine() {
    gMeme.lines.splice(gMeme.selectedLineIdx, 1);
    gMeme.selectedLineIdx = 0;
}