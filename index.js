const canvas = document.getElementById('particles-canvas');
      const ctx = canvas.getContext('2d');

      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      const particles = [];

      function Particle(x, y, size) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.speedX = Math.random() * 3 - 1.5;
        this.speedY = Math.random() * 3 - 1.5;
      }

      Particle.prototype.update = function () {
        this.x += this.speedX;
        this.y += this.speedY;

      //  if (this.size > 0.2) this.size -= 0.1;
      };

      Particle.prototype.draw = function () {
        ctx.fillStyle = "#ffffff"; // Adjust particle color
        ctx.strokeStyle = '#ffffff'; // Adjust particle border color
        ctx.lineWidth = 2;

        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();

        ctx.fill();
        ctx.stroke();
      };

      function createParticles() {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const size = Math.random() * 6;
        particles.push(new Particle(x, y, size));
      }

      function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (let i = 0; i < particles.length; i++) {
          particles[i].update();
          particles[i].draw();

          if (particles[i].size <= 0.2) {
            particles.splice(i, 1);
            i--;
          }
        }

        requestAnimationFrame(animateParticles);
      }

      window.addEventListener('resize', function () {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      });

      window.addEventListener('mousemove', function () {
        createParticles();
      });

      animateParticles();