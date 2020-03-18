const days = document.getElementById('days');
const hours = document.getElementById('hours');
const minutes = document.getElementById('minutes');
const seconds = document.getElementById('seconds');
const countdown = document.getElementById('countdown');
const year = document.getElementById('year');
const loading = document.getElementById('loading');

const currentYear = new Date().getFullYear();

const newYearTime = new Date(`January 01 ${currentYear + 1} 00:00:00`);

// Set background year
year.innerText = currentYear + 1;

// Update countdown time
function updateCountdown() {
  const currentTime = new Date();
  const diff = newYearTime - currentTime;

  const d = Math.floor(diff / 1000 / 60 / 60 / 24);
  const h = Math.floor(diff / 1000 / 60 / 60) % 24;
  const m = Math.floor(diff / 1000 / 60) % 60;
  const s = Math.floor(diff / 1000) % 60;

  // Add values to DOM
  days.innerHTML = d;
  hours.innerHTML = h < 10 ? '0' + h : h;
  minutes.innerHTML = m < 10 ? '0' + m : m;
  seconds.innerHTML = s < 10 ? '0' + s : s;
}

// Show spinner before countdown
setTimeout(() => {
  loading.remove();
  countdown.style.display = 'flex';
}, 1000);

// Run every second
setInterval(updateCountdown, 1000);

//animation

window.requestAnimationFrame = (function(){
  return window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      function(callback){
          window.setTimeout(callback, 1000 / 60);
      };
})();


window.particles = {
    body: document.body || document.querySelector("body"),
    canvas: document.createElement("canvas"),
    
    i: 0,
    max: 1200,
    particles: [],
    
    colors: ["#FFF"],
    
    particle: function(x, y, r, o) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.a = Math.random()*360;
        this.o = o;
        this._o = o;
        this.on = false;
        this.cached = document.createElement("canvas");
        this.ctx = this.cached.getContext("2d");
        this.create();
    },
    
    init: function() {
        var self = this;
        self.canvas.width = window.innerWidth;
        self.canvas.height = window.innerHeight;
        self.ctx = self.canvas.getContext("2d");
        self.particle.prototype = {
            create: function() {
                this.cached.width = this.cached.height = this.r*4;
                
                var x = this.r, y = this.r, r = this.r, p = 5, m = 0.5;
                this.ctx.save();
                this.ctx.beginPath();
                this.ctx.translate(x, y);
                this.ctx.moveTo(0,0-r);
                for (var i = 0; i < p; i++) {
                    this.ctx.rotate(Math.PI / p);
                    this.ctx.lineTo(0, 0 - (r*m));
                    this.ctx.rotate(Math.PI / p);
                    this.ctx.lineTo(0, 0 - r);
                };
                this.ctx.closePath();
                this.ctx.fillStyle = this.fill();
                this.ctx.fill();
                this.ctx.restore();
            },
            fill: function() {
                var i = Math.floor(Math.random() * self.colors.length);
                return self.colors[i];
            },
            draw: function () {
                self.ctx.globalAlpha = this.o;
                self.ctx.save();
                self.ctx.translate(this.x, this.y);
                self.ctx.rotate((this.a += 0.01));
                self.ctx.drawImage(this.cached, 0, 0, this.r * 2, this.r * 2);
                self.ctx.restore();
            },
            update: function () {
                this.y = this.y + (this.r / 15);
                if (this.y < window.innerHeight) {
                    this.on = true;
                } else {
                    this.on = false;
                    this.o = this._o;
                };
            },
            fade: function() {
                if (this.y < 1) {
                    this.o = this._o;
                };
                if (this.on) {
                    this.o *= 0.9966;
                };
            }
        };
        self.body.appendChild(self.canvas);
        self.cache();
        self.fall();
        self.update();
        self.render();
    },
    
    cache: function() {
        var self = this;
        for (var i = 0; i < self.max; i++) {
            var radius = Math.floor(Math.random() * 30) + 10;
            var opacity = (Math.floor(Math.random() * 50) + 50) / 100;
            self.particles.push(new self.particle(0, window.innerHeight, radius, opacity));
        };
    },
    
    trigger: function() {
        var self = this;
        var particles = self.particles;
        var particle = particles[self.i];
        particle.x = Math.floor(Math.random() * window.innerWidth) - particle.r;
        particle.y = - particle.r * 2;
        self.i = self.i === particles.length - 1 ? 0 : ++self.i;
    },
    
    render: function() {
        var self = particles;
        requestAnimationFrame(self.render);
        self.ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
        for (var i = 0, c = self.particles.length; i < c; i++) {
            if (!self.particles[i].on) continue;
            self.particles[i].draw();
        };
    },
    
    update: function() {
        var self = particles;
        for (var i = 0, c = self.particles.length; i < c; i++) {
            self.particles[i].update();
        };
        setTimeout(self.update, 1000 / 30);
    },
    
    fall: function() {
        var self = particles;
        self.trigger();
        setTimeout(self.fall, 1000 / 20);
    }
};
particles.init();



