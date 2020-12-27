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
function Line(x1,y1, x2, y2, a){
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
    this.a = a;


    this.draw = function() {
        c.beginPath();
        c.moveTo(this.x1, this.y1)
        c.lineTo(this.x2, this.y2)
        c.strokeStyle = `rgba(255, 255, 255, ${this.a})`
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
    for (let i = 0; i < innerWidth / 5; i++) {
        var radius = (Math.random() + 0.2) * 3;
        var x = Math.random() * innerWidth;
        var y = Math.random() * innerHeight;
        var dx = (Math.random() - 0.5) / 3
        var dy = (Math.random() - 0.5) / 3
        circleArray.push(new Circle(x, y, dx, dy, radius, "white"))
    }
}
addEventListener("click", (e)=>{
    circleArray.push(new Circle(e.x, e.y, (Math.random() - 0.5) / 3, (Math.random() - 0.5) / 3, Math.random() * 2.5, "white"))
})

// if (newCircle == true) {
//     circleArray.push(new Circle(e.x, e.y, (Math.random() - 0.5) / 3, (Math.random() - 0.5) / 3, (Math.random() + 0.2) * 3), "white")    
//     newCircle = false;
// }


function animate() {
    requestAnimationFrame(animate);
    c.fillStyle =  "rgba(19, 24, 98, 0.9)"
    c.fillRect(0, 0, innerWidth,  innerHeight);

    circleArray.forEach((circle, index)=>{
        circle.update();
    })
    lineArray = []
    circleArray.forEach((circle, index)=>{
        circleArray.forEach((circle2, index2)=>{
            if (index != index2 ) {
                var dist = Math.hypot(circle.x - circle2.x, circle.y - circle2.y)
                if (dist < 140) {
                    if (dist < 50) {
                        a = 0.07
                    }else if(50 < dist < 90) { 
                        a = 0.03
                    } else { a = 0.005}

                    lineArray.push(new Line(circle.x, circle.y, circle2.x, circle2.y, a))
                } else {}    
            }
        })
    })
    lineArray.forEach((line)=>{
        line.update()
    })

}

init();
animate();