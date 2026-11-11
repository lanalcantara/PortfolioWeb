/**
 * ============================================================================
 * PAC-RUNNER 8-BIT ARCADE ENGINE
 * Jogo Endless Runner estilo Chrome Dino com estética Pac-Man & Pixel Art
 * ============================================================================
 */

(function () {
  'use strict';

  // 1. ÁUDIO SINTETIZADOR 8-BIT VIA WEB AUDIO API
  class RetroAudioSystem {
    constructor() {
      this.ctx = null;
      this.isMuted = false;
    }

    init() {
      if (!this.ctx) {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (AudioContext) {
          this.ctx = new AudioContext();
        }
      }
      if (this.ctx && this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
    }

    playJump() {
      if (this.isMuted || !this.ctx) return;
      try {
        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'square';
        osc.frequency.setValueAtTime(160, now);
        osc.frequency.exponentialRampToValueAtTime(480, now + 0.12);

        gain.gain.setValueAtTime(0.12, now);
        gain.gain.linearRampToValueAtTime(0.01, now + 0.12);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now);
        osc.stop(now + 0.12);
      } catch (e) {
        // Ignora silenciosamente se o áudio não foi liberado pelo navegador
      }
    }

    playScore() {
      if (this.isMuted || !this.ctx) return;
      try {
        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(587.33, now); // D5
        osc.frequency.setValueAtTime(880, now + 0.05); // A5

        gain.gain.setValueAtTime(0.1, now);
        gain.gain.linearRampToValueAtTime(0.01, now + 0.15);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now);
        osc.stop(now + 0.15);
      } catch (e) {}
    }

    playHit() {
      if (this.isMuted || !this.ctx) return;
      try {
        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(320, now);
        osc.frequency.exponentialRampToValueAtTime(60, now + 0.35);

        gain.gain.setValueAtTime(0.2, now);
        gain.gain.linearRampToValueAtTime(0.01, now + 0.35);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now);
        osc.stop(now + 0.35);
      } catch (e) {}
    }

    toggleMute() {
      this.isMuted = !this.isMuted;
      return !this.isMuted;
    }
  }

  // Instância do sistema de som
  const audio = new RetroAudioSystem();
  window.RetroAudio = audio; // expõe para o app.js

  // 2. CONFIGURAÇÕES & ESTADO DO JOGO
  const canvas = document.getElementById('pacGameCanvas');
  const ctx = canvas.getContext('2d');
  ctx.imageSmoothingEnabled = false;

  const currentScoreEl = document.getElementById('currentScore');
  const highScoreEl = document.getElementById('highScore');
  const gameSpeedEl = document.getElementById('gameSpeedDisplay');
  const gameStartOverlay = document.getElementById('gameStartOverlay');
  const gameOverOverlay = document.getElementById('gameOverOverlay');
  const finalScoreVal = document.getElementById('finalScoreVal');
  const btnStartGame = document.getElementById('btnStartGame');
  const btnRestartGame = document.getElementById('btnRestartGame');

  // Cores dos fantasmas clássicos do Pac-Man
  const GHOST_COLORS = [
    { body: '#ff3b30', eye: '#ffffff', pupil: '#002699', name: 'Blinky' }, // Vermelho
    { body: '#ff77aa', eye: '#ffffff', pupil: '#002699', name: 'Pinky' },  // Rosa
    { body: '#00ffff', eye: '#ffffff', pupil: '#002699', name: 'Inky' },   // Ciano
    { body: '#ff9500', eye: '#ffffff', pupil: '#002699', name: 'Clyde' }   // Laranja
  ];

  const STATE = {
    IDLE: 'idle',
    PLAYING: 'playing',
    GAMEOVER: 'gameover'
  };

  let gameState = STATE.IDLE;
  let score = 0;
  let highScore = parseInt(localStorage.getItem('pac_high_score') || '0', 10);
  let baseSpeed = 4.8;
  let currentSpeed = baseSpeed;
  let lastTimestamp = 0;
  let ghostSpawnTimer = 0;
  let pelletSpawnTimer = 0;
  let animationFrameId = null;

  // Atualiza exibição inicial do High Score
  highScoreEl.textContent = String(highScore).padStart(5, '0');

  // 3. ENTIDADES DO JOGO

  // Pac-Man Player
  const player = {
    x: 80,
    y: 170,
    radius: 18,
    velocityY: 0,
    gravity: 0.65,
    jumpStrength: -12.5,
    isGrounded: true,
    mouthAngle: 0.25,
    mouthDir: 1,
    groundY: 170,
    skin: 'classic', // classic, mspac, cyborg, bio

    reset() {
      this.y = this.groundY;
      this.velocityY = 0;
      this.isGrounded = true;
      this.mouthAngle = 0.25;
    },

    jump() {
      if (this.isGrounded) {
        this.velocityY = this.jumpStrength;
        this.isGrounded = false;
        audio.playJump();
        createJumpDust(this.x, this.groundY + this.radius);
      }
    },

    update() {
      // Física do pulo
      if (!this.isGrounded) {
        this.velocityY += this.gravity;
        this.y += this.velocityY;

        if (this.y >= this.groundY) {
          this.y = this.groundY;
          this.velocityY = 0;
          this.isGrounded = true;
        }
      }

      // Animação da boca do Pac-Man mastigando
      this.mouthAngle += 0.035 * this.mouthDir;
      if (this.mouthAngle > 0.45) {
        this.mouthDir = -1;
      } else if (this.mouthAngle < 0.05) {
        this.mouthDir = 1;
      }
    },

    draw(ctx) {
      ctx.save();
      ctx.translate(this.x, this.y);

      // Sombra pixelada no chão quando pula
      if (!this.isGrounded) {
        const shadowScale = Math.max(0.4, 1 - (this.groundY - this.y) / 120);
        ctx.fillStyle = 'rgba(0, 0, 0, 0.35)';
        ctx.beginPath();
        ctx.ellipse(0, this.groundY - this.y + this.radius, this.radius * shadowScale, 4, 0, 0, Math.PI * 2);
        ctx.fill();
      }

      // Cor do corpo dependendo da skin
      let bodyColor = '#feca57';
      if (this.skin === 'mspac') bodyColor = '#ffd32a';
      else if (this.skin === 'cyborg') bodyColor = '#dcdde1';
      else if (this.skin === 'bio') bodyColor = '#7bed9f';

      // Corpo do Pac-Man com a boca animada
      const mouth = this.mouthAngle * Math.PI;
      ctx.fillStyle = bodyColor;
      ctx.beginPath();
      ctx.arc(0, 0, this.radius, mouth, Math.PI * 2 - mouth, false);
      ctx.lineTo(0, 0);
      ctx.closePath();
      ctx.fill();

      // Borda preta estilo pixel art
      ctx.lineWidth = 2.5;
      ctx.strokeStyle = '#0f051d';
      ctx.stroke();

      // Detalhes especiais por skin
      if (this.skin === 'mspac') {
        // Laço Rosa da Ms. Pac-Man
        ctx.fillStyle = '#ff3c89';
        ctx.beginPath();
        ctx.ellipse(-6, -18, 5, 3, -Math.PI / 4, 0, Math.PI * 2);
        ctx.ellipse(2, -18, 5, 3, Math.PI / 4, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#ff75a0';
        ctx.beginPath();
        ctx.arc(-2, -18, 2.5, 0, Math.PI * 2);
        ctx.fill();
        // Marca de batom
        ctx.fillStyle = '#ff3c89';
        ctx.fillRect(8, 2, 3, 3);
      } else if (this.skin === 'cyborg') {
        // Visor Ciano Futurista
        ctx.fillStyle = '#00f0ff';
        ctx.fillRect(-2, -11, 14, 6);
        ctx.strokeStyle = '#0f051d';
        ctx.lineWidth = 1.5;
        ctx.strokeRect(-2, -11, 14, 6);
      } else if (this.skin === 'bio') {
        // Padrão celular orgânico
        ctx.fillStyle = '#2ed573';
        ctx.beginPath();
        ctx.arc(-4, -4, 3, 0, Math.PI * 2);
        ctx.arc(-2, 5, 2.5, 0, Math.PI * 2);
        ctx.fill();
      }

      // Olho do Pac-Man (se não for cyborg com visor)
      if (this.skin !== 'cyborg') {
        ctx.fillStyle = '#0f051d';
        ctx.beginPath();
        ctx.arc(2, -8, 3, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();
    }
  };

  // Listas de Objetos Ativos
  let ghosts = [];
  let pellets = [];
  let particles = [];
  let backgroundStars = [];

  // Gera estrelas de fundo no céu roxo
  function initBackgroundStars() {
    backgroundStars = [];
    for (let i = 0; i < 35; i++) {
      backgroundStars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * (canvas.height - 80),
        size: Math.random() > 0.8 ? 2 : 1,
        alpha: 0.3 + Math.random() * 0.7,
        blinkSpeed: 0.02 + Math.random() * 0.04
      });
    }
  }

  // Cria poeira de salto
  function createJumpDust(x, y) {
    for (let i = 0; i < 6; i++) {
      particles.push({
        x: x - 6 + Math.random() * 12,
        y: y - 2,
        vx: -1.5 - Math.random() * 2,
        vy: -0.5 - Math.random() * 1.5,
        size: 3,
        color: '#ff3c89',
        life: 1.0,
        decay: 0.06
      });
    }
  }

  // Cria explosão de Game Over
  function createExplosion(x, y) {
    for (let i = 0; i < 24; i++) {
      const angle = (Math.PI * 2 / 24) * i;
      const speed = 2 + Math.random() * 3.5;
      particles.push({
        x: x,
        y: y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: 4,
        color: i % 2 === 0 ? '#feca57' : '#ff3c89',
        life: 1.0,
        decay: 0.03
      });
    }
  }

  // Classe dos Fantasminhas Inimigos
  class Ghost {
    constructor(speed) {
      this.width = 28;
      this.height = 32;
      this.x = canvas.width + 20;
      this.y = player.groundY - this.height / 2 + 3;
      this.speed = speed;
      this.colorData = GHOST_COLORS[Math.floor(Math.random() * GHOST_COLORS.length)];
      this.waveOffset = 0;
      this.passed = false;
    }

    update() {
      this.x -= this.speed;
      this.waveOffset += 0.2;
    }

    draw(ctx) {
      ctx.save();
      ctx.translate(this.x, this.y);

      const w = this.width;
      const h = this.height;
      const r = w / 2;

      // Corpo principal do fantasma (topo arredondado e saia ondulada)
      ctx.fillStyle = this.colorData.body;
      ctx.beginPath();
      // Arco superior
      ctx.arc(0, -h / 2 + r, r, Math.PI, 0, false);
      // Lado direito
      ctx.lineTo(r, h / 2 - 4);
      // Ondulações da saia (3 tentáculos)
      const waveState = Math.sin(this.waveOffset) > 0 ? 3 : -3;
      ctx.lineTo(r - 5, h / 2 + waveState);
      ctx.lineTo(0, h / 2 - 4);
      ctx.lineTo(-r + 5, h / 2 - waveState);
      ctx.lineTo(-r, h / 2 - 4);
      ctx.closePath();
      ctx.fill();

      // Contorno pixel art
      ctx.lineWidth = 2.5;
      ctx.strokeStyle = '#0f051d';
      ctx.stroke();

      // Olhos grandes brancos olhando para o Pac-Man (esquerda)
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.ellipse(-5, -6, 4.5, 6, 0, 0, Math.PI * 2);
      ctx.ellipse(5, -6, 4.5, 6, 0, 0, Math.PI * 2);
      ctx.fill();

      // Pupilas azuis olhando para a esquerda
      ctx.fillStyle = '#002699';
      ctx.beginPath();
      ctx.arc(-7, -6, 2.5, 0, Math.PI * 2);
      ctx.arc(3, -6, 2.5, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    }

    // Colisão AABB com círculo do player
    checkCollision(p) {
      const closestX = Math.max(this.x - this.width / 2, Math.min(p.x, this.x + this.width / 2));
      const closestY = Math.max(this.y - this.height / 2, Math.min(p.y, this.y + this.height / 2));
      const distanceX = p.x - closestX;
      const distanceY = p.y - closestY;
      const distanceSquared = distanceX * distanceX + distanceY * distanceY;
      return distanceSquared < (p.radius - 4) * (p.radius - 4);
    }
  }

  // Classe das Pastilhas de Ponto Flutuantes (Pellets de Ontologia)
  class Pellet {
    constructor(speed) {
      this.x = canvas.width + 30;
      this.y = player.groundY - 35 - Math.random() * 45; // flutuando para incentivar o pulo
      this.radius = 6;
      this.speed = speed;
      this.collected = false;
      this.pulse = 0;
    }

    update() {
      this.x -= this.speed;
      this.pulse += 0.1;
    }

    draw(ctx) {
      ctx.save();
      ctx.translate(this.x, this.y);
      const glow = Math.sin(this.pulse) * 1.5;

      ctx.fillStyle = '#ffd166';
      ctx.beginPath();
      ctx.arc(0, 0, this.radius + glow, 0, Math.PI * 2);
      ctx.fill();

      ctx.lineWidth = 1.5;
      ctx.strokeStyle = '#0f051d';
      ctx.stroke();

      // Brilho central
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(-1.5, -1.5, 2, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    }

    checkCollection(p) {
      const dx = this.x - p.x;
      const dy = this.y - p.y;
      return Math.sqrt(dx * dx + dy * dy) < (this.radius + p.radius);
    }
  }

  // 4. CHÃO & CENÁRIO ARCADE SCROLLING
  let groundScrollOffset = 0;

  function drawBackgroundAndGround(ctx) {
    // Céu degradê retrô noite arcade
    const skyGrad = ctx.createLinearGradient(0, 0, 0, canvas.height);
    skyGrad.addColorStop(0, '#120524');
    skyGrad.addColorStop(0.65, '#280c4a');
    skyGrad.addColorStop(1, '#3b126d');
    ctx.fillStyle = skyGrad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Estrelas cintilantes
    backgroundStars.forEach(star => {
      star.alpha += Math.sin(Date.now() * star.blinkSpeed) * 0.03;
      ctx.fillStyle = `rgba(255, 255, 255, ${Math.max(0.1, Math.min(1, star.alpha))})`;
      ctx.fillRect(star.x, star.y, star.size, star.size);
    });

    // Linha do horizonte / Montanhas neon distantes
    ctx.fillStyle = '#1c0736';
    ctx.beginPath();
    ctx.moveTo(0, 160);
    ctx.lineTo(80, 135);
    ctx.lineTo(160, 155);
    ctx.lineTo(260, 125);
    ctx.lineTo(380, 160);
    ctx.lineTo(500, 130);
    ctx.lineTo(620, 158);
    ctx.lineTo(740, 132);
    ctx.lineTo(canvas.width, 160);
    ctx.lineTo(canvas.width, canvas.height);
    ctx.lineTo(0, canvas.height);
    ctx.closePath();
    ctx.fill();

    // Chão Arcade com blocos pixelados e trilha neon
    const groundY = player.groundY + player.radius;
    const groundHeight = canvas.height - groundY;

    // Faixa neon do topo do chão
    ctx.fillStyle = '#ff3c89';
    ctx.fillRect(0, groundY, canvas.width, 4);

    // Faixa secundária menta
    ctx.fillStyle = '#a8e6cf';
    ctx.fillRect(0, groundY + 4, canvas.width, 2);

    // Base do chão
    ctx.fillStyle = '#19072e';
    ctx.fillRect(0, groundY + 6, canvas.width, groundHeight - 6);

    // Grade pixelada que se move para a esquerda dando sensação de velocidade
    groundScrollOffset = (groundScrollOffset + currentSpeed) % 24;
    ctx.strokeStyle = 'rgba(155, 93, 229, 0.4)';
    ctx.lineWidth = 1;

    for (let x = -groundScrollOffset; x < canvas.width; x += 24) {
      ctx.beginPath();
      ctx.moveTo(x, groundY + 6);
      ctx.lineTo(x, canvas.height);
      ctx.stroke();
    }

    // Linha horizontal no chão
    ctx.beginPath();
    ctx.moveTo(0, groundY + 20);
    ctx.lineTo(canvas.width, groundY + 20);
    ctx.stroke();
  }

  // 5. LOOP PRINCIPAL DO JOGO
  function gameLoop(timestamp) {
    if (!lastTimestamp) lastTimestamp = timestamp;
    const deltaTime = timestamp - lastTimestamp;
    lastTimestamp = timestamp;

    if (gameState === STATE.PLAYING) {
      updateGame(deltaTime);
    }

    renderGame();

    animationFrameId = requestAnimationFrame(gameLoop);
  }

  function updateGame(deltaTime) {
    // Atualiza jogador
    player.update();

    // Aumenta pontuação continuamente pela distância percorrida
    score += Math.round(currentSpeed * 0.15);
    currentScoreEl.textContent = String(score).padStart(5, '0');

    // Acelera gradualmente o jogo conforme o progresso
    if (currentSpeed < 10.5) {
      currentSpeed += 0.0007;
      gameSpeedEl.textContent = (currentSpeed / baseSpeed).toFixed(1) + 'x';
    }

    // Spawn de Fantasmas Inimigos com intervalo randômico baseado em velocidade
    ghostSpawnTimer++;
    const spawnThreshold = Math.max(65, 130 - Math.floor(currentSpeed * 7));
    if (ghostSpawnTimer > spawnThreshold) {
      // Chance de criar novo fantasma
      ghosts.push(new Ghost(currentSpeed));
      ghostSpawnTimer = -Math.floor(Math.random() * 40); // variação para não ficar mecânico
    }

    // Spawn ocasional de Pellets flutuantes para pontos extras
    pelletSpawnTimer++;
    if (pelletSpawnTimer > 180) {
      pellets.push(new Pellet(currentSpeed));
      pelletSpawnTimer = -Math.floor(Math.random() * 90);
    }

    // Atualiza Fantasmas e checa colisão
    for (let i = ghosts.length - 1; i >= 0; i--) {
      const g = ghosts[i];
      g.update();

      // Checa se o Pac-Man bateu no fantasma
      if (g.checkCollision(player)) {
        triggerGameOver();
        return;
      }

      // Pontuação bônus por saltar com sucesso sobre o fantasma
      if (!g.passed && g.x < player.x - player.radius) {
        g.passed = true;
        score += 50;
        audio.playScore();
      }

      // Remove se saiu da tela
      if (g.x < -40) {
        ghosts.splice(i, 1);
      }
    }

    // Atualiza Pellets colecionáveis
    for (let i = pellets.length - 1; i >= 0; i--) {
      const p = pellets[i];
      p.update();

      if (p.checkCollection(player)) {
        score += 100;
        audio.playScore();
        createJumpDust(p.x, p.y);
        pellets.splice(i, 1);
        continue;
      }

      if (p.x < -30) {
        pellets.splice(i, 1);
      }
    }

    // Atualiza partículas de efeito
    for (let i = particles.length - 1; i >= 0; i--) {
      const pt = particles[i];
      pt.x += pt.vx;
      pt.y += pt.vy;
      pt.life -= pt.decay;
      if (pt.life <= 0) {
        particles.splice(i, 1);
      }
    }
  }

  function renderGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Fundo e Chão
    drawBackgroundAndGround(ctx);

    // Pellets colecionáveis
    pellets.forEach(p => p.draw(ctx));

    // Fantasmas inimigos
    ghosts.forEach(g => g.draw(ctx));

    // Partículas
    particles.forEach(pt => {
      ctx.fillStyle = pt.color;
      ctx.globalAlpha = Math.max(0, pt.life);
      ctx.fillRect(pt.x, pt.y, pt.size, pt.size);
      ctx.globalAlpha = 1.0;
    });

    // Player (Pac-Man)
    player.draw(ctx);
  }

  // 6. CONTROLE DE ESTADOS DO JOGO
  function startGame() {
    audio.init();
    gameState = STATE.PLAYING;
    score = 0;
    currentSpeed = baseSpeed;
    gameSpeedEl.textContent = '1.0x';
    currentScoreEl.textContent = '00000';
    ghosts = [];
    pellets = [];
    particles = [];
    ghostSpawnTimer = 0;
    pelletSpawnTimer = 0;
    player.reset();

    gameStartOverlay.classList.add('hidden');
    gameOverOverlay.classList.add('hidden');
  }

  function triggerGameOver() {
    gameState = STATE.GAMEOVER;
    audio.playHit();
    createExplosion(player.x, player.y);

    // Atualiza recorde se for novo high score
    if (score > highScore) {
      highScore = score;
      localStorage.setItem('pac_high_score', String(highScore));
      highScoreEl.textContent = String(highScore).padStart(5, '0');
    }

    finalScoreVal.textContent = String(score);
    gameOverOverlay.classList.remove('hidden');
  }

  // 7. EVENTOS DE ENTRADA (TECLADO, TOQUE, CLIQUE)
  function handleJumpAction(e) {
    if (gameState === STATE.PLAYING) {
      if (e) {
        // Previne scroll da página na tecla espaço ou seta para cima
        if (e.code === 'Space' || e.code === 'ArrowUp') {
          e.preventDefault();
        }
      }
      player.jump();
    } else if (gameState === STATE.IDLE) {
      startGame();
    } else if (gameState === STATE.GAMEOVER) {
      if (e && (e.code === 'Space' || e.code === 'Enter')) {
        startGame();
      }
    }
  }

  // Teclado
  window.addEventListener('keydown', (e) => {
    if (e.code === 'Space' || e.code === 'ArrowUp') {
      handleJumpAction(e);
    }
  });

  // Clique ou Toque no Canvas
  canvas.addEventListener('pointerdown', (e) => {
    e.preventDefault();
    audio.init();
    handleJumpAction();
  });

  // Botões dos Overlays
  btnStartGame.addEventListener('click', (e) => {
    e.stopPropagation();
    startGame();
  });

  btnRestartGame.addEventListener('click', (e) => {
    e.stopPropagation();
    startGame();
  });

  // Seletor de Personagem / Skins
  const charPills = document.querySelectorAll('.char-pill');
  charPills.forEach(pill => {
    pill.addEventListener('click', (e) => {
      e.stopPropagation();
      charPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      const skin = pill.getAttribute('data-skin') || 'classic';
      player.skin = skin;
      audio.playScore();
    });
  });

  // Inicialização
  initBackgroundStars();
  animationFrameId = requestAnimationFrame(gameLoop);

})();

