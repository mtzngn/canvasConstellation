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


        c.beginPath()
        c.moveTo(this.x, this.y)
        c.lineTo(200,400)
        c.strokeStyle = "white"
        c.stroke()
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

let circleArray = [];

function init() {
    circleArray = [];
    for (let i = 0; i < 200; i++) {
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
    c.clearRect(0, 0, innerWidth,  innerHeight);
    circleArray.forEach((circle, index)=>{
        circle.update();
    })
}

init();
animate();