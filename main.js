var yyy = document.getElementById('canvas');
        page(yyy);

        window.onresize = function () {
            page(yyy)
        }

        function page(yyy) {
            var pageWidth = document.documentElement.clientWidth
            var pageHeight = document.documentElement.clientHeight

            yyy.width = pageWidth
            yyy.height = pageHeight
        }
        var context = yyy.getContext('2d');

        var using = false
        var lastPoint = {
            x: undefined,
            y: undefined
        }
        yyy.onmousedown = function (aaa) {
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
        yyy.onmousemove = function (aaa) {
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
        yyy.onmouseup = function (aaa) {
            using = false
        }

        function drawCircle(x, y, radius) {
            context.beginPath()
            context.fillStyle = 'black'
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
            actions.className = 'actions x'
        }
        brush.onclick = function () {
            eraserEnabled = false;
            actions.className = 'actions'
        }