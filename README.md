# 🕹️ LANA.EXE — Portfólio Retro Arcade & Web Semântica

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/pt-BR/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/pt-BR/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript)
[![Unity 6](https://img.shields.io/badge/Unity_6-000000?style=for-the-badge&logo=unity&logoColor=white)](https://unity.com/)
[![Meta Quest 3](https://img.shields.io/badge/Meta_Quest_3-0467DF?style=for-the-badge&logo=meta&logoColor=white)](https://www.meta.com/quest/quest-3/)
[![GitHub Pages](https://img.shields.io/badge/GitHub_Pages-online-ff3c89?style=for-the-badge&logo=github&logoColor=white)](https://lanalcantara.github.io/PortfolioWeb/)

Portfólio pessoal interativo e responsivo feito com **HTML5, CSS3 puro e JavaScript Vanilla**, sem frameworks nem dependências. A estética mistura a nostalgia do **Tumblr** com **arcade em pixel art**: roxo escuro, rosa neon, verde menta e bege retrô.

🌐 **Site no ar:** https://lanalcantara.github.io/PortfolioWeb/

---

## 🚀 Como executar localmente

**Opção 1 — direto no navegador:** abra o arquivo [`index.html`](index.html) no Chrome, Edge ou Firefox.

**Opção 2 — servidor local:**

```bash
# Python 3
python -m http.server 8080

# ou Node.js
npx serve .
```

Depois acesse `http://localhost:8080`.

---

## 🎮 Funcionalidades

### 1. Minijogo "Pac-Runner" (cabeçalho)
- Endless runner no estilo do dinossauro do Chrome: o Pac-Man corre sozinho e você salta os fantasmas (*Blinky, Pinky, Inky e Clyde*).
- **Controles:** `Espaço`, `↑` ou clique/toque na tela.
- **Pontuação:** +50 por fantasma saltado e +100 por pastilha coletada. A velocidade aumenta com o tempo.
- **Recorde** salvo no `localStorage` e tela de **Game Over** em pixel art com botão de reiniciar.
- **Escolha de personagem:** Clássico, Ms. Pac (laço rosa), Cyborg VR (visor ciano) e Bio-Cell (verde menta).
- **Sons 8-bit** gerados em tempo real pela Web Audio API, com botão para silenciar.

### 2. Sobre mim (caixas de diálogo estilo RPG)
- **Player card** com avatar em pixel art (cabelo curto cacheado castanho claro, olhos verdes, pele marrom bege), badge **MESTRANDA**, barras de HP/Mana, player de música e tags estilo Tumblr.
- Trajetória contada em níveis:
  - **Nível 1 — A Origem:** Ciências Biológicas na UFRPE, com PIBIC e TCC em parasitologia na **Fiocruz-PE**.
  - **Nível 2 — A Grande Virada:** mudança para a computação no **SENAC-PE** e entrada no mestrado do **CIn-UFPE** (Inteligência Computacional e Web Semântica).
  - **Nível 3 — O Boss Final:** a cadeira de Realidade Virtual e Aumentada e o nascimento do **Pac-Man Semântico**.
  - **Checkpoint Final:** atalho para a aba de Projetos.

### 3. Projeto em destaque: Pac-Man Semântico
- Ferramenta em **Unity 6** para **Meta Quest 3**, integrada ao **Protégé/OWL** via **WebSocket**.
- **Problema:** ontologias no Protégé são estáticas, abstratas e cansativas de navegar.
- **Proposta:** a **TBox** vira um labirinto com placas de sinalização taxonômica, a **ABox** vira itens coletáveis e os **agentes de raciocínio** (fantasmas) validam as restrições.
- Diagrama de arquitetura (Protégé/OWL API ➔ WebSocket ➔ Unity 6 XR) e **simulador de telemetria** interativo em modal.

### 4. Galeria de fotos (polaroids)
- Cards em formato polaroid com **filtros** (Todos, VR & Projetos, Pesquisa & Bancada, Tech & CIn-UFPE).
- Clique para ampliar em um **lightbox** (fecha com `Esc`).
- Os cards usam imagens provisórias; veja abaixo como colocar fotos reais.

### 5. Checkpoints de carreira

| Nível | Etapa | Período |
|---|---|---|
| LEVEL 01 | Ciências Biológicas — UFRPE | Finalizado em 2023 |
| LEVEL 02 | Transição para o desenvolvimento de software | 2024 – 2026 |
| LEVEL 03 | Sistemas de Informação — Faculdade SENAC-PE | 2024 – 2026 |
| LEVEL 04 (Boss) | Mestrado em Ciência da Computação — CIn-UFPE | 2026.1 – presente |

### 6. Diário de bordo (Tumblr)
- Posts curtos sobre ontologias em VR, a ponte entre biologia e computação e WebSockets no Unity 6.
- Botões de **curtir** e **reblogar** com notificações retrô.

### 7. Contato, terminal e extras
- **Insert Coin:** links para GitHub, Currículo Lattes e e-mail do CIn.
- **Ask Box:** formulário de mensagem no estilo Tumblr (no momento ele só mostra uma confirmação na tela; ainda não envia e-mails).
- **Terminal CLI** (botão `⌨️ CLI`): comandos `help`, `about`, `ufrpe`, `senac`, `cin`, `pacman`, `skills`, `contact` e `clear`.
- **Filtro CRT** (scanlines) com liga/desliga.
- **Easter egg:** Konami Code (`↑ ↑ ↓ ↓ ← → ← → B A`).
- Meta tags de SEO/Open Graph e favicon em pixel art.

---

## 🖼️ Como adicionar suas fotos na galeria

1. Crie uma pasta `images/` na raiz do projeto e coloque suas fotos nela.
2. No `index.html`, dentro do card desejado da seção `#gallery-section`, troque o bloco `<div class="retro-img-placeholder ...">...</div>` por:

```html
<img src="images/minha-foto.jpg" alt="Descrição da foto" style="width:100%;height:100%;object-fit:cover;">
```

3. Ajuste os atributos `data-title`, `data-desc` e `data-tag` do card para mudar o texto que aparece no lightbox.

---

## 📁 Estrutura dos arquivos

```text
PortfolioWeb/
├── .github/workflows/deploy.yml  # Workflow de deploy no GitHub Pages
├── index.html                    # Estrutura e conteúdo de todas as seções
├── styles.css                    # Paleta retrô neon, pixel art, animações e responsividade
├── game.js                       # Engine do Pac-Runner, skins e sons 8-bit
├── app.js                        # Terminal CLI, modais, galeria, curtidas e toasts
├── LICENSE                       # Licença MIT
└── README.md                     # Esta documentação
```

---

## 👩‍💻 Autora

**Lana Alcântara**
- 🎓 Mestranda em Ciência da Computação — **CIn-UFPE** (desde 2026.1)
- 💻 Sistemas de Informação — **Faculdade SENAC-PE** (2024 – 2026)
- 🧬 Ciências Biológicas — **UFRPE** (finalizado em 2023), com PIBIC e TCC na **Fiocruz-PE**
- ✉️ lsasa@cin.ufpe.br
- 🐙 [github.com/lanalcantara](https://github.com/lanalcantara)
- 📜 [Currículo Lattes](https://buscatextual.cnpq.br/buscatextual/visualizacv.do?id=K8052185D8)

---

Distribuído sob a licença MIT. Veja [`LICENSE`](LICENSE).
