const canvas = document.querySelector('canvas');

const c = canvas.getContext('2d');


canvas.width = innerWidth
canvas.height = innerHeight

// Variables
const mouse = {
    x: innerWidth / 2,
    y: innerHeight / 2
}

const colors = [
    '#2185C5',
    '#7ECEFD',
    '#FFF6E5',
    '#FF7F66',
    '#006657'
]

// Event Listeners
addEventListener('mousemove', event => {
    mouse.x = event.clientX
    mouse.y = event.clientY
})

addEventListener('resize', () => {
    canvas.width = innerWidth
    canvas.height = innerHeight

    init()
})

// Utility Functions
function randomIntFromRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function randomColor(colors) {
    return colors[Math.floor(Math.random() * colors.length)]
}

// Objects
function Particle(x, y, radius,color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.radians = Math.random()* (Math.PI *2);
    this.velocity = .05;
    this.distanceFromCenter = randomIntFromRange(50,120);
    this.lastmouse = {x:x,y:y};

this.update = function() {
    const lastPosition = {
        x:this.x,
        y:this.y
    }
    //move over time
    this.radians += this.velocity;

    //drag effect on moving mouse

    this.lastmouse.x += (mouse.x-this.lastmouse.x) *.05;
    this.lastmouse.y += (mouse.y-this.lastmouse.y) * .05;


    // circular motion

    this.x = this.lastmouse.x + Math.cos(this.radians)* this.distanceFromCenter;
    this.y = this.lastmouse.y + Math.sin(this.radians) * this.distanceFromCenter;
    this.draw(lastPosition)
}

this.draw = function(lastPosition) {
    c.beginPath()
    c.strokeStyle =this.color;
    c.lineWidth = this.radius;
    c.moveTo(lastPosition.x, lastPosition.y)
    c.lineTo(this.x,this.y)
    c.stroke()
    c.closePath()
}
}


// Implementation
let particles;

function init() {
    particles = []

    for (let i = 0; i < 70; i++) {
        radius=Math.random()*2 +1;
        let color = colors[Math.floor((Math.random() * 100) % 4)];
        particles.push(new Particle(canvas.width/2,canvas.height/2,radius,color));
    }

}

// Animation Loop
function animate() {
    requestAnimationFrame(animate)
    c.fillStyle = 'rgba(255,255,255,.1)'
    c.fillRect(0,0, canvas.width, canvas.height);
    particles.forEach(particle => {
        particle.update();
    });



}

init()
animate()