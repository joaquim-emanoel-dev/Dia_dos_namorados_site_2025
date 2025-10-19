    const startHeart = document.getElementById('startHeart');
    const bgm        = document.getElementById('bgm');
    const preloader  = document.getElementById('preloader');
    const main       = document.getElementById('main');
    const heartBg    = document.getElementById('heartBackground');
    const canvas     = document.getElementById('fireworks');
    const ctx        = canvas.getContext('2d');

    startHeart.addEventListener('click', () => {
      bgm.currentTime = 0;
      bgm.play().catch(()=>{});
      preloader.style.display = 'none';
      main.style.display = 'flex';
      spawnHearts();
      initFireworks();
    });

    function spawnHearts(){
      for(let i=0;i<30;i++){
        const h = document.createElement('div');
        h.classList.add('heart');
        const size = 8 + Math.random()*12;
        h.style.width  = `${size}px`;
        h.style.height = `${size}px`;
        h.style.left   = `${Math.random()*100}%`;
        h.style.top    = `0`;
        h.style.animationDuration = `${4+Math.random()*4}s`;
        h.style.animationDelay    = `${Math.random()*4}s`;
        heartBg.appendChild(h);
      }
    }

    function initFireworks(){
      let W,H,particles=[];
      function resize(){ W=canvas.width=innerWidth; H=canvas.height=innerHeight; }
      window.addEventListener('resize',resize); resize();

      class Particle{
        constructor(x,y,dx,dy,color){
          this.x=x; this.y=y; this.dx=dx; this.dy=dy; this.life=40; this.color=color;
        }
        update(){ this.x+=this.dx; this.y+=this.dy; this.dy+=0.02; this.life--; }
        draw(){ ctx.beginPath(); ctx.arc(this.x,this.y,1.5,0,2*Math.PI); ctx.fillStyle=this.color; ctx.fill(); }
      }
      function explode(x,y){
        const cols=['#FF1461','#18FF92','#5A87FF','#FBF38C'];
        for(let i=0;i<30;i++){
          const ang=Math.random()*2*Math.PI, spd=Math.random()*2;
          particles.push(new Particle(
            x,y, Math.cos(ang)*spd, Math.sin(ang)*spd,
            cols[Math.floor(Math.random()*cols.length)]
          ));
        }
      }
      (function loop(){
        ctx.clearRect(0,0,W,H);
        if(Math.random()<0.02) explode(Math.random()*W, Math.random()*H/2);
        particles=particles.filter(p=>p.life>0);
        particles.forEach(p=>{p.update();p.draw();});
        requestAnimationFrame(loop);
      })();
    }