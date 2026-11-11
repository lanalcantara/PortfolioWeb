# 🕹️ Portfólio Retro Arcade & Web Semântica

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/pt-BR/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/pt-BR/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript)
[![Unity 6](https://img.shields.io/badge/Unity_6-000000?style=for-the-badge&logo=unity&logoColor=white)](https://unity.com/)
[![Meta Quest 3](https://img.shields.io/badge/Meta_Quest_3-0467DF?style=for-the-badge&logo=meta&logoColor=white)](https://www.meta.com/quest/quest-3/)

Portfólio pessoal interativo, responsivo e funcional desenvolvido com **HTML5, CSS3 puro (com animações neo-brutalist / pixel art) e JavaScript Vanilla**. O design une a estética nostálgica do **Tumblr** e dos clássicos fliperamas de **arcade em tons de roxo escuro, rosa neon, verde menta e bege retrô**.

---

## 🚀 Como Executar Localmente

### Opção 1: Direto no Navegador (Mais Rápido)
Basta abrir o arquivo [`index.html`](index.html) diretamente no seu navegador favorito (Chrome, Edge, Firefox, etc.).

### Opção 2: Via Servidor Local
Se tiver Python ou Node.js instalado no terminal:

```bash
# Com Python 3:
python -m http.server 8080

# Ou com Node.js (npx):
npx serve .
```
Em seguida, acesse no navegador: `http://localhost:8080`

---

## 🎮 Funcionalidades Principais

### 1. Header com Minijogo 'Pac-Runner' (Estilo Chrome Dino)
- **Gameplay Fluido:** O Pac-Man corre automaticamente para a direita pelo cenário arcade.
- **Controles Universais:** Pressione **[Barra de Espaço]**, **[Seta para Cima]** ou dê um **[Clique / Toque na Tela]** para saltar sobre os fantasminhas (*Blinky, Pinky, Inky e Clyde*).
- **Seletor de Personagens (Choose Your Character):** Escolha entre *Pac-Man Clássico*, *Ms. Pac-Man* (com laço rosa), *Cyborg VR* (com visor ciano) ou *Bio-Cell* (verde menta).
- **Pontuação:** Colete pastilhas de ontologia flutuantes (+100 pts) e salte fantasmas (+50 pts).
- **Recorde Automático:** High Score salvo de forma persistente no `localStorage`.
- **Efeitos Sonoros 8-Bit:** Áudio sintetizado em tempo real via **Web Audio API** (sem arquivos externos pesados), com controle de mute na barra de navegação.

### 2. Seção "About Me" (Vibe Tumblr / Retro OS)
- **Narrativa em Caixas de Diálogo RPG:**
  - **Nível 1 (A Origem - Ciências Biológicas):** Formação na UFRPE, experimentos em anatomia e primatas, com PIBIC e TCC em parasitologia na **Fiocruz-PE**.
  - **Nível 2 (A Grande Virada - Computação & SENAC):** Transição de carreira para a área de tecnologia no **SENAC-PE**, ingressando no mestrado em Ciência da Computação no **CIn-UFPE** com foco em Inteligência Computacional e Web Semântica.
  - **Nível 3 (O Boss Final - O Pac-Man Semântico):** A superação do bloqueio com ontologias estáticas no Protégé ao cursar Realidade Virtual e Aumentada, dando vida ao Pac-Man Semântico.
  - **Checkpoint Final:** Call-to-action para explorar o labirinto ciberfísico na aba de Projetos.
- **Player Stats:** Medidores retrô de **HP (Café & Foco)** e **Mana (Pesquisa CIn)**, avatar em pixel art e player de música lofi animado.

### 3. Aba de Projetos (Destaque: 'Pac-Man Semântico')
- **A Dor Real:** Superação da sobrecarga cognitiva e da navegação estática 2D de axiomas no Protégé.
- **A Solução em VR (Meta Quest 3 & Unity 6):**
  - **TBox:** Labirintos procedurais 3D estruturados a partir da taxonomia de classes (`subClassOf`, `is-a`) com sinalização viária conceitual.
  - **ABox:** Instâncias representadas como pastilhas coletáveis com asserções de dados (`DataProperty`).
  - **Agentes de Raciocínio (Fantasmas):** Raciocinadores semânticos (*HermiT/Pellet*) que patrulham o labirinto e sinalizam conflitos lógicos (ex: `DisjointClasses`).
- **Arquitetura Full-Duplex:** Protégé/OWL API ➔ WebSocket Server ➔ Unity 6 XR Standalone.
- **Simulador Interativo de Telemetria:** Modal com console de eventos onde é possível injetar conflitos semânticos e verificar a consistência em tempo real.

### 4. Checkpoints de Carreira (RPG Timeline)
- **Level 01:** UFRPE & Fiocruz-PE &bull; Ciências Biológicas e Pesquisa de Bancada
- **Level 02:** Transição Tech &bull; Desenvolvimento Web e Lógica de Programação
- **Level 03:** Faculdade SENAC &bull; Sistemas de Informação e Engenharia de Software
- **Level 04 (Boss Stage):** CIn-UFPE &bull; Mestrado em Ciência da Computação, Web Semântica e Realidade Virtual

### 5. Diário de Bordo & Notas (Tumblr Vibe)
- Ensaios rápidos conectando biologia, taxonomia, computação espacial e WebSockets de alto desempenho.
- Botões interativos de **Curtir** (com contagem dinâmica e coração neon) e **Reblogar** (com notificações toast retrô).

### 6. Terminal CLI Retrô & Ask Box de Contato
- **Terminal CLI Embutido:** Acesse clicando no botão `⌨️ CLI` na barra superior e digite comandos como `help`, `about`, `ufrpe`, `senac`, `cin`, `pacman`, `skills` e `clear`.
- **Tumblr Ask Box:** Formulário de envio de mensagens com validação e links diretos para LinkedIn, GitHub, Currículo Lattes e E-mail.
- **Easter Egg Konami Code:** Tente digitar a famosa sequência no teclado (`↑ ↑ ↓ ↓ ← → ← → B A`)!

---

## 📁 Estrutura dos Arquivos

```text
portifólio web/
│
├── index.html        # Estrutura semântica completa e componentes de interface
├── styles.css        # Sistema de design, paleta retro neon, tipografia e responsividade
├── game.js           # Engine do minijogo Pac-Runner, física, skins e sintetizador de áudio
├── app.js            # Interatividades, Terminal CLI, Modal VR, Curtidas e Toasts
└── README.md         # Documentação completa do projeto
```

---

## 👩‍💻 Autora

**Lana Alcântara**  
- Mestranda em Ciência da Computação &bull; **CIn - UFPE**  
- Graduanda em Sistemas de Informação &bull; **Faculdade SENAC-PE**  
- Bacharel e Licenciada em Ciências Biológicas &bull; **UFRPE** (PIBIC/TCC na **Fiocruz-PE**)  
- GitHub: [@lanalcantara](https://github.com/lanalcantara)
