/**
 * ============================================================================
 * INTERAÇÕES DO PORTFÓLIO RETRO ARCADE (APP.JS)
 * Áudio, Controle de CRT, Posts Tumblr, Modal VR & Web Semântica
 * ============================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // 1. CONTROLE DE ÁUDIO 8-BIT
  const audioToggleBtn = document.getElementById('audioToggleBtn');
  if (audioToggleBtn) {
    audioToggleBtn.addEventListener('click', () => {
      if (window.RetroAudio) {
        const isMuted = window.RetroAudio.isMuted;
        window.RetroAudio.isMuted = !isMuted;
        
        if (!window.RetroAudio.isMuted) {
          window.RetroAudio.init();
          window.RetroAudio.playScore();
          audioToggleBtn.classList.remove('active');
          audioToggleBtn.innerHTML = '<span class="toggle-icon">🔊</span> <span class="toggle-text">SFX: ON</span>';
          showToast('Efeitos sonoros 8-bit ativados!');
        } else {
          audioToggleBtn.classList.add('active');
          audioToggleBtn.innerHTML = '<span class="toggle-icon">🔇</span> <span class="toggle-text">SFX: OFF</span>';
          showToast('Efeitos sonoros desativados.');
        }
      }
    });
  }

  // 2. CONTROLE DO FILTRO CRT (SCANLINES)
  const crtToggleBtn = document.getElementById('crtToggleBtn');
  if (crtToggleBtn) {
    crtToggleBtn.addEventListener('click', () => {
      document.body.classList.toggle('crt-enabled');
      const isCrt = document.body.classList.contains('crt-enabled');
      
      if (isCrt) {
        crtToggleBtn.classList.add('active');
        crtToggleBtn.innerHTML = '<span class="toggle-icon">📺</span> <span class="toggle-text">CRT: ON</span>';
        showToast('Efeito monitor de tubo (CRT) ativado.');
      } else {
        crtToggleBtn.classList.remove('active');
        crtToggleBtn.innerHTML = '<span class="toggle-icon">🖥️</span> <span class="toggle-text">CRT: OFF</span>';
        showToast('Modo de exibição nítida ativado.');
      }

      if (window.RetroAudio) {
        window.RetroAudio.playJump();
      }
    });
  }

  // 3. SISTEMA DE TOAST NOTIFICATION RETRÔ
  const toastEl = document.getElementById('retroToast');
  const toastMsg = document.getElementById('toastMsg');
  let toastTimeout = null;

  function showToast(message, duration = 3000) {
    if (!toastEl || !toastMsg) return;
    toastMsg.textContent = message;
    toastEl.classList.remove('hidden');

    if (toastTimeout) clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
      toastEl.classList.add('hidden');
    }, duration);
  }

  // 4. INTERAÇÕES DOS POSTS DO TUMBLR
  // Botão de Curtir com incremento e persistência visual
  const likeButtons = document.querySelectorAll('.like-btn');
  likeButtons.forEach(btn => {
    btn.addEventListener('click', function () {
      const isLiked = this.getAttribute('data-liked') === 'true';
      const countEl = this.querySelector('.like-count');
      const heartIcon = this.querySelector('.heart-icon');
      let count = parseInt(countEl.textContent, 10) || 0;

      if (!isLiked) {
        this.setAttribute('data-liked', 'true');
        this.classList.add('liked');
        countEl.textContent = count + 1;
        heartIcon.textContent = '💖';
        if (window.RetroAudio) window.RetroAudio.playScore();
        showToast('Você curtiu a anotação! ★');
      } else {
        this.setAttribute('data-liked', 'false');
        this.classList.remove('liked');
        countEl.textContent = Math.max(0, count - 1);
        heartIcon.textContent = '🤍';
        showToast('Curtida removida.');
      }
    });
  });

  // Botão de Reblogar estilo Tumblr
  const reblogButtons = document.querySelectorAll('.reblog-btn');
  reblogButtons.forEach(btn => {
    btn.addEventListener('click', function () {
      if (window.RetroAudio) window.RetroAudio.playJump();
      showToast('🔁 Reblogado no seu feed nostálgico!');
    });
  });

  // 5. MODAL DE SIMULAÇÃO DE ONTOLOGIA EM VR
  const ontologyModal = document.getElementById('ontologyModal');
  const btnSimulateOntology = document.getElementById('btnSimulateOntology');
  const btnCloseModal = document.getElementById('btnCloseModal');
  const modalConsoleOutput = document.getElementById('modalConsoleOutput');
  const btnTriggerInconsistency = document.getElementById('btnTriggerInconsistency');
  const btnResolveOntology = document.getElementById('btnResolveOntology');

  if (btnSimulateOntology && ontologyModal) {
    btnSimulateOntology.addEventListener('click', () => {
      ontologyModal.classList.remove('hidden');
      if (window.RetroAudio) window.RetroAudio.playScore();
    });
  }

  if (btnCloseModal && ontologyModal) {
    btnCloseModal.addEventListener('click', () => {
      ontologyModal.classList.add('hidden');
    });

    ontologyModal.addEventListener('click', (e) => {
      if (e.target === ontologyModal) {
        ontologyModal.classList.add('hidden');
      }
    });
  }

  // Ações do Simulador no Modal
  if (btnTriggerInconsistency && modalConsoleOutput) {
    btnTriggerInconsistency.addEventListener('click', () => {
      const p1 = document.createElement('p');
      p1.className = 'console-line text-pink';
      p1.textContent = `[${new Date().toLocaleTimeString()}] ⚠ DISPARO: Axioma Conflitante inserido: SubClassOf(:Ciborgue, :Organico) & DisjointClasses(:Organico, :Mecanico)`;
      
      const p2 = document.createElement('p');
      p2.className = 'console-line text-yellow';
      p2.textContent = `[${new Date().toLocaleTimeString()}] 👾 INCONSISTÊNCIA DETECTADA: Raciocinador HermiT gerou fantasma Blinky no Corredor 3B do VR!`;

      modalConsoleOutput.appendChild(p1);
      modalConsoleOutput.appendChild(p2);
      modalConsoleOutput.scrollTop = modalConsoleOutput.scrollHeight;

      if (window.RetroAudio) window.RetroAudio.playHit();
      showToast('🚨 Conflito semântico gerado! Fantasma alertado no VR.');
    });
  }

  if (btnResolveOntology && modalConsoleOutput) {
    btnResolveOntology.addEventListener('click', () => {
      const p = document.createElement('p');
      p.className = 'console-line text-green';
      p.textContent = `[${new Date().toLocaleTimeString()}] ✔ RESOLVIDO: Axioma corrigido. Grafo TBox normalizado e consistente via OWL API!`;

      modalConsoleOutput.appendChild(p);
      modalConsoleOutput.scrollTop = modalConsoleOutput.scrollHeight;

      if (window.RetroAudio) window.RetroAudio.playScore();
      showToast('✨ Ontologia validada e consistente!');
    });
  }

  // 6. EASTER EGG NO WIDGET DE MÚSICA DO TUMBLR
  const musicWidget = document.querySelector('.tumblr-music-widget');
  if (musicWidget) {
    const trackTitle = musicWidget.querySelector('.track-title');
    const tracks = [
      'Lofi Synthwave Lab',
      'Protégé 8-Bit Chillout',
      'Meta Quest VR Odyssey',
      'CIn-UFPE Retro Vibes'
    ];
    let trackIndex = 0;

    musicWidget.addEventListener('click', () => {
      trackIndex = (trackIndex + 1) % tracks.length;
      trackTitle.textContent = tracks[trackIndex];
      if (window.RetroAudio) window.RetroAudio.playScore();
      showToast(`Tocando agora: ${tracks[trackIndex]} 🎶`);
    });
  }

  // 7. FEEDBACK RETRÔ AO CLICAR EM CHIPS DE HABILIDADES
  const skillChips = document.querySelectorAll('.skill-chip');
  skillChips.forEach(chip => {
    chip.addEventListener('click', () => {
      if (window.RetroAudio) window.RetroAudio.playJump();
      showToast(`Habilidade inspecionada: ${chip.textContent}`);
    });
  });

  // 8. CONTROLE DO MODAL DE TERMINAL CLI
  const terminalToggleBtn = document.getElementById('terminalToggleBtn');
  const terminalModal = document.getElementById('terminalModal');
  const btnCloseTerminal = document.getElementById('btnCloseTerminal');
  const terminalInputForm = document.getElementById('terminalInputForm');
  const terminalInput = document.getElementById('terminalInput');
  const terminalLogs = document.getElementById('terminalLogs');

  if (terminalToggleBtn && terminalModal) {
    terminalToggleBtn.addEventListener('click', () => {
      terminalModal.classList.remove('hidden');
      if (terminalInput) terminalInput.focus();
      if (window.RetroAudio) window.RetroAudio.playScore();
    });
  }

  if (btnCloseTerminal && terminalModal) {
    btnCloseTerminal.addEventListener('click', () => {
      terminalModal.classList.add('hidden');
    });

    terminalModal.addEventListener('click', (e) => {
      if (e.target === terminalModal) {
        terminalModal.classList.add('hidden');
      }
    });
  }

  // Comandos do Terminal CLI
  if (terminalInputForm && terminalInput && terminalLogs) {
    terminalInputForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const rawCmd = terminalInput.value.trim();
      if (!rawCmd) return;
      const cmd = rawCmd.toLowerCase();
      terminalInput.value = '';

      const lineUser = document.createElement('p');
      lineUser.className = 'term-line text-cyan';
      lineUser.textContent = `lana@cin-ufpe:~$ ${rawCmd}`;
      terminalLogs.appendChild(lineUser);

      const resp = document.createElement('p');
      resp.className = 'term-line';

      switch (cmd) {
        case 'help':
          resp.innerHTML = `Comandos disponíveis:<br>
          &bull; <span class="cmd-highlight">about</span> : Trajetória resumida<br>
          &bull; <span class="cmd-highlight">ufrpe</span> : Origem na Biologia e Fiocruz<br>
          &bull; <span class="cmd-highlight">senac</span> : Graduação em Sistemas de Informação<br>
          &bull; <span class="cmd-highlight">cin</span> : Mestrado no CIn-UFPE<br>
          &bull; <span class="cmd-highlight">pacman</span> : Detalhes do Pac-Man Semântico em VR<br>
          &bull; <span class="cmd-highlight">skills</span> : Lista de tecnologias e linguagens<br>
          &bull; <span class="cmd-highlight">contact</span> : Informações de contato e redes<br>
          &bull; <span class="cmd-highlight">clear</span> : Limpa a tela do terminal`;
          break;
        case 'about':
        case 'bio':
          resp.innerHTML = `LANA &bull; Bióloga (UFRPE/Fiocruz-PE) ➔ Dev SI (SENAC-PE) ➔ Mestranda em Ciência da Computação (CIn-UFPE). Criadora do Pac-Man Semântico.`;
          break;
        case 'ufrpe':
          resp.textContent = `UFRPE: Graduação em Ciências Biológicas. Foco em parasitologia, PIBIC e TCC realizados na Fiocruz-PE. Base científica de bancada.`;
          break;
        case 'senac':
          resp.textContent = `SENAC-PE: Mudança radical para computação. Sistemas de Informação, arquitetura de software e desenvolvimento web moderno.`;
          break;
        case 'cin':
          resp.textContent = `CIn-UFPE: Mestrado em Ciência da Computação. Pesquisa em Inteligência Computacional, Ontologias (OWL), Web Semântica e Realidade Virtual (Meta Quest 3).`;
          break;
        case 'pacman':
          resp.textContent = `PAC-MAN SEMÂNTICO: Ferramenta VR imersiva em Unity 6 onde você caminha pela TBox de ontologias e os fantasmas são agentes de raciocínio lógico (HermiT)!`;
          break;
        case 'skills':
          resp.textContent = `Tech Stack: Unity 6 XR, Meta Quest 3, Protégé / OWL 2, WebSockets, JavaScript/TypeScript, Python, HTML/CSS Retrô.`;
          break;
        case 'contact':
          resp.textContent = `E-mail: lsasa@cin.ufpe.br | GitHub: github.com/lanalcantara | LinkedIn: linkedin.com/in/lanasofia | Lattes: buscatextual.cnpq.br/buscatextual/visualizacv.do?id=K8052185D8`;
          break;
        case 'clear':
          terminalLogs.innerHTML = `<p class="term-line text-cyan">&gt; Terminal limpo. Digite 'help' para comandos.</p>`;
          return;
        default:
          resp.className = 'term-line text-pink';
          resp.textContent = `Comando não reconhecido: '${rawCmd}'. Digite 'help' para ver os comandos válidos.`;
      }

      terminalLogs.appendChild(resp);
      terminalLogs.scrollTop = terminalLogs.scrollHeight;
      if (window.RetroAudio) window.RetroAudio.playJump();
    });
  }

  // 9. FORMULÁRIO DE CONTATO (TUMBLR ASK BOX)
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const senderName = document.getElementById('senderName').value;
      if (window.RetroAudio) window.RetroAudio.playScore();
      showToast(`Obrigada pela mensagem, ${senderName}! Retornarei em breve. ✉️`, 4000);
      contactForm.reset();
    });
  }

  // 10. EASTER EGG KONAMI CODE (↑ ↑ ↓ ↓ ← → ← → B A)
  const konamiSequence = [
    'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
    'KeyB', 'KeyA'
  ];
  let konamiIndex = 0;

  window.addEventListener('keydown', (e) => {
    if (e.code === konamiSequence[konamiIndex]) {
      konamiIndex++;
      if (konamiIndex === konamiSequence.length) {
        konamiIndex = 0;
        if (window.RetroAudio) window.RetroAudio.playScore();
        showToast('⭐ KONAMI CODE ATIVADO! Modo Arcade Lendário Desbloqueado! ⭐', 5000);
        document.body.style.filter = 'hue-rotate(90deg)';
        setTimeout(() => {
          document.body.style.filter = '';
        }, 6000);
      }
    } else {
      konamiIndex = 0;
    }
  });

  // 11. FILTRO DA GALERIA DE FOTOS & MODAL LIGHTBOX
  const galleryFilters = document.querySelectorAll('.gallery-filter-btn');
  const galleryCards = document.querySelectorAll('.gallery-card.polaroid');
  const photoModal = document.getElementById('photoModal');
  const btnClosePhotoModal = document.getElementById('btnClosePhotoModal');
  const photoModalFrame = document.getElementById('photoModalFrame');
  const photoModalCaptionTitle = document.getElementById('photoModalCaptionTitle');
  const photoModalCaptionDesc = document.getElementById('photoModalCaptionDesc');
  const photoModalTag = document.getElementById('photoModalTag');

  // Filtros de Categoria
  galleryFilters.forEach(btn => {
    btn.addEventListener('click', function () {
      galleryFilters.forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      const filter = this.getAttribute('data-filter');

      galleryCards.forEach(card => {
        const cat = card.getAttribute('data-category');
        if (filter === 'all' || cat === filter) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      });

      if (window.RetroAudio) window.RetroAudio.playJump();
    });
  });

  // Clique no Card para Abrir Modal
  galleryCards.forEach(card => {
    card.addEventListener('click', function () {
      if (!photoModal) return;
      const title = this.getAttribute('data-title') || this.querySelector('.caption-title').textContent;
      const desc = this.getAttribute('data-desc') || this.querySelector('.caption-desc').textContent;
      const tag = this.getAttribute('data-tag') || 'Registro';
      const imgWrap = this.querySelector('.polaroid-img-wrap');

      if (photoModalCaptionTitle) photoModalCaptionTitle.textContent = title;
      if (photoModalCaptionDesc) photoModalCaptionDesc.textContent = desc;
      if (photoModalTag) photoModalTag.textContent = tag;
      if (photoModalFrame && imgWrap) {
        photoModalFrame.innerHTML = imgWrap.innerHTML;
      }

      photoModal.classList.remove('hidden');
      if (window.RetroAudio) window.RetroAudio.playScore();
    });
  });

  // Fechar Modal de Fotos
  if (btnClosePhotoModal && photoModal) {
    btnClosePhotoModal.addEventListener('click', () => {
      photoModal.classList.add('hidden');
    });

    photoModal.addEventListener('click', (e) => {
      if (e.target === photoModal) {
        photoModal.classList.add('hidden');
      }
    });

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !photoModal.classList.contains('hidden')) {
        photoModal.classList.add('hidden');
      }
    });
  }

});

