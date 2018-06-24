var canvas = document.getElementById('canvas');
page(canvas);

window.onresize = function () {
    page(canvas)
}

function page(canvas) {
    var pageWidth = document.documentElement.clientWidth
    var pageHeight = document.documentElement.clientHeight

    canvas.width = pageWidth
    canvas.height = pageHeight
}
var context = canvas.getContext('2d');

red.onclick = function(){
    context.fillStyle = 'red';
    context.strokeStyle='red';
    red.classList.add('active');
    green.classList.remove('active');
    blue.classList.remove('active')
}
green.onclick = function(){
    context.strokeStyle = 'green'
    red.classList.remove('active');
    green.classList.add('active');
    blue.classList.remove('active')
}

blue.onclick = function(){
    context.strokeStyle = 'blue'
    red.classList.remove('active');
    green.classList.remove('active');
    blue.classList.add('active')
}


var using = false
var lastPoint = {
    x: undefined,
    y: undefined
}
//特性检测
if(document.body.ontouchstart !== undefined){
    //触屏设备
    canvas.ontouchstart = function(aaa){
        var x= aaa.touches[0].clientX
        var y = aaa.touches[0].clientY
        if (eraserEnabled) {
            using = true
            context.clearRect(x - 5, y - 5, 10, 10)
        } else {
            using = true
    
            lastPoint = {
                'x': x,
                'y': y
            }
        }
        console.log(x,y)
    }
    canvas.ontouchmove=function(aaa){
        var x = aaa.touches[0].clientX
        var y = aaa.touches[0].clientY
    
        if (eraserEnabled) {
            if (using) {
                context.clearRect(x - 5, y - 5, 10, 10)
            }
    
        } else {
            if (using) {
                var x = aaa.touches[0].clientX
                var y = aaa.touches[0].clientY
                var newPoint = {
                    "x": x,
                    "y": y
                }
                // drawCircle(x, y, 1)
                drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
                lastPoint = newPoint //前一条线的借宿位置是后一条线的起始位置
            }
        }
        console.log(aaa)
    }
    canvas.ontouchend=function(){
        using = false
    }
}else{
    //非触屏设备
    canvas.onmousedown = function (aaa) {
        var x = aaa.clientX
        var y = aaa.clientY
        if (eraserEnabled) {
            using = true
            context.clearRect(x - 5, y - 5, 10, 10)
        } else {
            using = true
    
            lastPoint = {
                'x': x,
                'y': y
            }
        }
        // drawCircle(x, y, 1)
    }
    canvas.onmousemove = function (aaa) {
        var x = aaa.clientX
        var y = aaa.clientY
    
        if (eraserEnabled) {
            if (using) {
                context.clearRect(x - 5, y - 5, 10, 10)
            }
    
        } else {
            if (using) {
                var x = aaa.clientX
                var y = aaa.clientY
                var newPoint = {
                    "x": x,
                    "y": y
                }
                // drawCircle(x, y, 1)
                drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
                lastPoint = newPoint //前一条线的借宿位置是后一条线的起始位置
            }
        }
    }
    canvas.onmouseup = function (aaa) {
        using = false
    }
}


function drawCircle(x, y, radius) {
    context.beginPath()
    // context.fillStyle = 'black'
    context.arc(x, y, radius, 0, Math.PI * 2)
    context.fill()
}

function drawLine(x1, y1, x2, y2) {
    context.beginPath();
    context.moveTo(x1, y1); //起点
    context.lineWidth = 5
    context.lineTo(x2, y2) //终点
    context.stroke()
    context.closePath()
}

/***** 橡皮檫  *****/
var eraserEnabled = false;
// var eraser=document.getElementById('eraser')
eraser.onclick = function () {
    eraserEnabled = true;
    // actions.className = 'actions x'
    eraser.classList.add('active')
    pen.classList.remove('active')
}
pen.onclick = function () {
    eraserEnabled = false;
    pen.classList.add('active')
    eraser.classList.remove('active')
}