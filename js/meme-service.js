'use strict';

var gKeywords = { 'happy': 0, 'angry': 0, 'baby': 0, 'dog': 0, 'putin': 0, 'funny': 0, 'cute': 0, 'kiss': 0, 'animal': 0 };
var gColor = '#000000';
var gFilter = '';

var gImgs = [{
        id: 0,
        url: 'img/1.jpg',
        keywords: ['trump', 'angry', 'funny']
    },
    {
        id: 1,
        url: 'img/2.jpg',
        keywords: ['cute', 'dog', 'kiss', 'animal']
    },
    {
        id: 2,
        url: 'img/3.jpg',
        keywords: ['cute', 'dog', 'baby', 'sleep', 'animal']
    },
    {
        id: 3,
        url: 'img/4.jpg',
        keywords: ['cute', 'cat', 'sleep', 'tired', 'animal']
    },
    {
        id: 4,
        url: 'img/5.jpg',
        keywords: ['funny', 'cute', 'baby', 'strong']
    },
    {
        id: 5,
        url: 'img/6.jpg',
        keywords: ['funny']
    },
    {
        id: 6,
        url: 'img/7.jpg',
        keywords: ['cute', 'baby']
    },
    {
        id: 7,
        url: 'img/8.jpg',
        keywords: ['funny', 'willi wonka']
    },
    {
        id: 8,
        url: 'img/9.jpg',
        keywords: ['funny', 'cute', 'baby', 'happy']
    },
    {
        id: 9,
        url: 'img/10.jpg',
        keywords: ['funny', 'barak obama', 'laugh', 'happy']
    },
    {
        id: 10,
        url: 'img/11.jpg',
        keywords: ['funny', 'romantic', 'gay', 'sport']
    },
    {
        id: 11,
        url: 'img/12.jpg',
        keywords: ['oops', 'chaim hecht']
    },
    {
        id: 12,
        url: 'img/13.jpg',
        keywords: ['cheers', 'satisfied', 'rich']
    },
    {
        id: 13,
        url: 'img/14.jpg',
        keywords: ['movie', 'bad', 'funny']
    },
    {
        id: 14,
        url: 'img/15.jpg',
        keywords: ['explain', 'funny']
    },
    {
        id: 15,
        url: 'img/16.jpg',
        keywords: ['funny', 'embarrassed']
    },
    {
        id: 16,
        url: 'img/17.jpg',
        keywords: ['putin', 'two']
    },
    {
        id: 17,
        url: 'img/18.jpg',
        keywords: ['toy', 'scary']
    },

]


var gMeme = {
    selectedImgId: 1,
    selectedLineIdx: 0,
    lines: [{
            txt: 'Type here',
            font: 'impact',
            size: 48,
            align: 'center',
            fill: 'white',
            stroke: 'black',
            position: { x: 0, y: 0 }
        },
        {
            txt: 'Type here',
            font: 'impact',
            size: 48,
            align: 'center',
            fill: 'white',
            stroke: 'black',
            position: { x: 0, y: 0 }
        }
    ]
}

function setCanvasSizes(width) {
    gMeme.lines.forEach((line, idx) => {
        line.position.x = width / 2;
        if (idx === 0) line.position.y = width / 4;
        else if (idx === 1) line.position.y = width - (width / 4) + line.size;
        else line.position.y = width / 2 + line.size / 2;
    });
}

function setFilter(value) {
    gFilter = value;
}

function countKeywords(keyword) {
    let count = 0;
    gImgs.forEach(img => {
        img.keywords.forEach(currWord => {
            if (currWord === keyword) count++;
        });
    });
    return count;
}

function getPopularKeywords() {
    let keywordsArray = [];
    for (let keyword in gKeywords) {
        let count = countKeywords(keyword);
        keywordsArray.push({ keyword, count: count + 15 });
    }
    keywordsArray.sort((a, b) => b.count - a.count);
    console.log(keywordsArray);
    return keywordsArray.slice(0, 6);
}


function filterImgByKeyword() {
    let filteredImgs = gImgs.filter((img) => {
        if (img.keywords.some(word => {
                if (word.startsWith(gFilter)) return word
            }))
            return img;
    });
    return filteredImgs;
}

function setLinePos(diff) {
    console.log(gMeme.lines[gMeme.selectedLineIdx].position.y + diff);
    return gMeme.lines[gMeme.selectedLineIdx].position.y += diff;
}


function setFillColor(fillColor) {
    gMeme.lines[gMeme.selectedLineIdx].fill = fillColor;
}

function setStrokeColor(strokeColor) {
    gMeme.lines[gMeme.selectedLineIdx].stroke = strokeColor;
}

function setFontFamily(font) {
    gMeme.lines[gMeme.selectedLineIdx].font = font;
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
        stroke: 'black',
        position: { x: 250, y: (gMeme.lines[gMeme.lines.length - 1].position.y) + 100 }
    }
    gMeme.lines.push(newLine);
    gMeme.selectedLineIdx = gMeme.lines.length - 1;
}

function setSelectedLine(diff) {
    if (gMeme.selectedLineIdx + diff >= gMeme.lines.length) {
        gMeme.selectedLineIdx = -1;
    }
    return gMeme.selectedLineIdx += +diff;
}

function getSelectedImgId() {
    return gMeme.selectedImgId;
}

function getImgs() {
    if (gFilter) return filterImgByKeyword();
    return gImgs;
}

function getImgById(imgId) {
    const img = gImgs.find(img => {
        return imgId === img.id;
    })
    return img;
}

function getLines() {
    return gMeme.lines;
}

function setText(txt) {
    gMeme.lines[gMeme.selectedLineIdx].txt = txt;
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