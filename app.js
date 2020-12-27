var canvas = document.querySelector("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext("2d");

// for (let i = 0; i < 10; i++) {
//     var x = Math.random() * window.innerWidth;
//     var y = Math.random() * window.innerHeight;
//     c.beginPath();
//     c.arc(x, y, 50, 0, Math.PI * 2, false);
//     c.strokeStyle = "brown";
//     c.stroke();
// }



function Circle(x, y, dx, dy, radius, color) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.color = color;

    this.draw = function() {
        c.beginPath()
        c.arc(this.x, this.y, this.radius, 0, Math.PI*2, false)
        c.fillStyle = this.color
        c.fill();

        // const dist = Math.hypot(this.x -200, this.y-400)
        // if (dist < 500) {
        //     c.beginPath()
        //     c.moveTo(200, 400)
        //     c.lineTo(this.x, this.y)
        //     c.strokeStyle = "white"
        //     c.stroke()
        // }

    }

    this.update = function() {
        if (this.x > innerWidth - this.radius || this.x - this.radius < 0) {
            this.dx = -dx;
        }
        if (this.y > innerHeight - this.radius || this.y - this.radius < 0) {
            this.dy = -dy;
        }
        this.x += this.dx;
        this.y += this.dy;
        this.draw();
    }

}

function Line(x1,y1, x2, y2){
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;

    this.draw = function() {
        c.beginPath();
        c.moveTo(this.x1, this.y1)
        c.lineTo(this.x2, this.y2)
        c.strokeStyle = "white"
        c.stroke()
    }

    this.update = function() {
        this.draw()
    }

}

let lineArray = [];
let circleArray = [];

function init() {
    circleArray = [];
    for (let i = 0; i < 100; i++) {
        var radius = (Math.random() + 1) * 2;
        var x = Math.random() * innerWidth;
        var y = Math.random() * innerHeight;
        var dx = (Math.random() - 0.5) * 2
        var dy = (Math.random() - 0.5) * 2
        circleArray.push(new Circle(x, y, dx, dy, radius, "white"))
    }
}

function animate() {
    requestAnimationFrame(animate);
    c.fillStyle =  "rgba(20, 24, 82, 0.4)"
    c.fillRect(0, 0, innerWidth,  innerHeight);

    circleArray.forEach((circle, index)=>{
        circle.update();
    })

    circleArray.forEach((circle, index)=>{
        circleArray.forEach((circle2, index2)=>{
            if (index != index2 ) {
                var dist = Math.hypot(circle.x - circle2.x, circle.y - circle2.y)
                if (dist < 150) {
                    lineArray.push(new Line(circle.x, circle.y, circle2.x, circle2.y))
                } else {lineArray.splice(index, 1)}    
            }
        })
    })
    lineArray.forEach((line)=>{
        line.update()
    })

}

init();
animate();