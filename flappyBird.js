const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');

    const birdImage = new Image();
    birdImage.src = 'assets/niks_bg.png';

    const pipeImage = new Image();
    pipeImage.src = 'assets/pipe.png';

    const backgroundImage = new Image();
    backgroundImage.src = 'assets/background.png';

    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

    function setCanvasSize() {
      // Adjust canvas width based on screen orientation
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    const bird = {
      x: 100,
      y: canvas.height / 2,
      velocityY: 0,
      gravity: 0.2,
      jump: -4,
    };

    const pipes = [];
    let gameOver = false;

    const menu = document.getElementById('menu');

    function drawBird() {
      ctx.drawImage(birdImage, bird.x - 20, bird.y - 20, 100, 100);
    }

    function drawPipe(pipe) {
      ctx.drawImage(pipeImage, pipe.x, 0, pipe.width, pipe.topHeight);
      ctx.drawImage(pipeImage, pipe.x, pipe.topHeight + 150, pipe.width, canvas.height - (pipe.topHeight + 150));
    }

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);

      if (!gameOver) {
        bird.velocityY += bird.gravity;
        bird.y += bird.velocityY;

        // Check if the bird has fallen outside the canvas
        if (bird.y + 20 > canvas.height || bird.y - 20 < 0) {
          gameOver = true;
          showMenu();
        }

        if (pipes.length === 0 || pipes[pipes.length - 1].x <= canvas.width - 300) {
          createPipe();
          
        }

        for (let i = pipes.length - 1; i >= 0; i--) {
          pipes[i].x -= 2;

          if (
            bird.x + 20 > pipes[i].x &&
            bird.x - 20 < pipes[i].x + pipes[i].width &&
            (bird.y - 20 < pipes[i].topHeight || bird.y + 20 > pipes[i].bottomY)
          ) {
            gameOver = true;
            showMenu();
          }

          if (pipes[i].x + pipes[i].width < 0) {
            pipes.splice(i, 1);
          }
        }
      }
      pipes.forEach(drawPipe);
      drawBird();

      if (!gameOver) {
        requestAnimationFrame(draw);
      }
    }

    function createPipe() {
      const pipe = {
        x: canvas.width,
        width: 50,
        topHeight: Math.random() * (canvas.height - 200) + 50,
        bottomY: 0,
      };

      pipe.bottomY = pipe.topHeight + 150;

      pipes.push(pipe);
    }

    document.addEventListener('keydown', function (e) {
      if (e.code === 'Space') {
        if (!gameOver) {
          bird.velocityY = bird.jump;
        } else {
          restartGame();
        }
      }
    });

    canvas.addEventListener('touchstart', function (event) {
        if (!gameOver) {
          bird.velocityY = bird.jump;
        } else {
          restartGame();
        }
      });


    function showMenu() {
      menu.style.display = 'block';
    }

    function restartGame() {
      bird.y = canvas.height / 2;
      bird.velocityY = 0;
      pipes.length = 0;
      gameOver = false;
      menu.style.display = 'none';
      draw();
    }

    function goHome() {
      window.location.href = "https://www.bradyhawkins.dev";

    }

    draw();




    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap';
    document.head.appendChild(link);