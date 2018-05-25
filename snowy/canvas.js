const canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const c = canvas.getContext('2d');
let counter = 20000;
let insideCanvas = false;

let colorArray = [
    '#DB2B39',
    '#FBF5F3',
    '#FBF5F3',
    '#0496FF',
    '#E28413'
]

let maxRadius = 30;
var mouse = {
    x: undefined,
    y: undefined
}
var mousae = {
    x: undefined,
    y: undefined
}

window.addEventListener('mousemove', (event) => {
    mouse.x = event.x;
    mouse.y = event.y;
    insideCanvas = true;

})

window.addEventListener('mouseout', (event) => {
    insideCanvas = false;

})

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
})

function Circle(x, y, dx, dy, radius) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.minRadius = radius;
    this.color = colorArray[Math.floor((Math.random() * 100) % 5)];


    this.draw = function () {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, Math.PI * 2, false);
        c.fillStyle = this.color;
        c.fill();
    }

    this.update = function () {
        if (this.x + this.radius > window.innerWidth || this.x - this.radius < 0) {
            this.dx = -this.dx;
        }


        if (this.y + this.radius > window.innerHeight || this.y - this.radius < 0) {
            this.dy = -this.dy;
        }

        this.x += this.dx;
        this.y += this.dy;


        if (insideCanvas && mouse.x - this.x < 50 && this.x - mouse.x < 50 && mouse.y - this.y < 50 && this.y - mouse.y < 50 && mouse.x < window.innerWidth && mouse.y < window.innerHeight) {
            if (this.radius < maxRadius) {
                this.radius += 4;
            }

        } else if (this.radius > this.minRadius) {
            this.radius = this.minRadius;
        }

        this.draw();
    }
}

let circleArray = [];
for (i = 0; i < 400; i++) {
    let radius = Math.floor(Math.random() * 3) + 1;
    let x = Math.random() * (window.innerWidth - (radius * 2)) + radius;
    let y = Math.random() * (window.innerHeight - (radius * 2)) + radius;
    let dx = (Math.random() - .5) * 4, dy = (Math.random() - .5) * 4;

    circleArray.push(new Circle(x, y, dx, dy, radius));


}




function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, window.innerWidth, window.innerHeight);

    for (i = 0; i < circleArray.length; i++) {
        circleArray[i].update();
    }


}

animate();








