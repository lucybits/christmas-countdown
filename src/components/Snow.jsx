  import { useEffect } from 'react';

  const Snow = () => {
    useEffect(() => {
      const canvas = document.createElement('canvas');
      canvas.style.position = 'fixed';
      canvas.style.top = '0';
      canvas.style.left = '0';
      canvas.style.width = '100%';
      canvas.style.height = '100%';
      canvas.style.pointerEvents = 'none';
      canvas.style.zIndex = '9999';
      document.body.appendChild(canvas);

      const ctx = canvas.getContext('2d');
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      const snowflakes = [];
      const numberOfSnowflakes = 50;
      const colors = ['#FF69B4', '#FF1493', '#00FF00', '#FF4500', '#FFD700', '#4169E1', '#9400D3', '#00FFFF'];

      class Snowflake {
        constructor() {
          this.x = Math.random() * canvas.width;
          this.y = Math.random() * canvas.height;
          this.size = 1.5;
          this.speedX = Math.random() * 1 - 0.5;
          this.speedY = Math.random() * 1 + 0.5;
          this.opacity = Math.random() * 0.5 + 0.3;
          this.color = colors[Math.floor(Math.random() * colors.length)];
        }

        update() {
          this.x += this.speedX;
          this.y += this.speedY;

          if (this.y > canvas.height) {
            this.y = 0;
            this.x = Math.random() * canvas.width;
            this.color = colors[Math.floor(Math.random() * colors.length)];
          }
        }

        draw() {
          ctx.beginPath();

          ctx.fillStyle = this.color;
          ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      for (let i = 0; i < numberOfSnowflakes; i++) {
        snowflakes.push(new Snowflake());
      }

      const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        snowflakes.forEach(snowflake => {
          snowflake.update();
          snowflake.draw();
        });
        requestAnimationFrame(animate);
      };

      animate();

      const handleResize = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      };

      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
        document.body.removeChild(canvas);
      };
    }, []);

    return null;
  };


  export default Snow;