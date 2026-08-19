/* ==========================================================================
   PREMIUM PORTFOLIO INTERACTION ENGINE — 10/10 AWWWARDS MASTERPIECE
   Engineer: Cherukuri Raghuveer
   Features:
   - 01. Web Audio UI Sound Synthesizer (Zero-Asset Micro-Haptics)
   - 02. Multi-Mode Particle Engine (Constellation, Matrix, Stardust)
   - 03. Silky Lerp Custom Cursor + Magnetic Physics + Specular Glare
   - 04. Command Palette Engine (Raycast / Linear Style `⌘K` Quick Nav)
   - 05. Fully Interactive CLI Terminal Sandbox with History & Parser
   - 06. Dynamic Role Cyber Typewriter
   - 07. Living Project Mini-Apps (E-Com Colorway & Promo, Kanban Board, Swagger API Runner, Theme Studio)
   - 08. DSA Algorithm Code Explorer Tabs
   - 09. Interactive System Architecture Tier Inspector
   - 10. Interactive Inquiry Studio (Contact Section)
   - 11. Live 60 FPS Telemetry Counter & IST India Digital Clock
   - 12. 3D Perspective Card Tilt with Specular Light Reflection
   - 13. Laser Skill Percentage Bars with Count-Up Rollup
   - 14. Quick Bio Modal Dialog
   - 15. Luxury Dark / Light Theme & Responsive Navigation
   ========================================================================== */

(function () {
  'use strict';

  const isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* --------------------------------------------------------------------------
     01. WEB AUDIO API SOUND SYNTHESIZER (ZERO-ASSET MICRO-HAPTICS)
     -------------------------------------------------------------------------- */
  let audioCtx = null;
  let isSoundEnabled = false;

  const getAudioContext = () => {
    if (!audioCtx && typeof window.AudioContext !== 'undefined') {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    return audioCtx;
  };

  const playSynthSound = (type = 'click') => {
    if (!isSoundEnabled || prefersReducedMotion) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      if (ctx.state === 'suspended') ctx.resume();

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      const now = ctx.currentTime;

      if (type === 'hover') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(440, now);
        osc.frequency.exponentialRampToValueAtTime(800, now + 0.035);
        gain.gain.setValueAtTime(0.012, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.035);
        osc.start(now);
        osc.stop(now + 0.035);
      } else if (type === 'click') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(200, now);
        osc.frequency.exponentialRampToValueAtTime(90, now + 0.05);
        gain.gain.setValueAtTime(0.05, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.05);
        osc.start(now);
        osc.stop(now + 0.05);
      } else if (type === 'type') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(700 + Math.random() * 200, now);
        gain.gain.setValueAtTime(0.02, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.025);
        osc.start(now);
        osc.stop(now + 0.025);
      } else if (type === 'success') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(523.25, now); // C5
        osc.frequency.setValueAtTime(659.25, now + 0.07); // E5
        osc.frequency.setValueAtTime(783.99, now + 0.14); // G5
        gain.gain.setValueAtTime(0.04, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.28);
        osc.start(now);
        osc.stop(now + 0.28);
      } else if (type === 'mode') {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(320, now);
        osc.frequency.exponentialRampToValueAtTime(640, now + 0.12);
        gain.gain.setValueAtTime(0.03, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.12);
        osc.start(now);
        osc.stop(now + 0.12);
      }
    } catch (err) {
      console.warn('Audio Synthesis:', err);
    }
  };

  const initSoundToggle = () => {
    const btn = document.getElementById('soundToggleBtn');
    if (!btn) return;

    btn.addEventListener('click', () => {
      isSoundEnabled = !isSoundEnabled;
      btn.classList.toggle('sound-on', isSoundEnabled);
      btn.innerHTML = isSoundEnabled ? '🔊' : '🔇';
      if (isSoundEnabled) {
        getAudioContext();
        playSynthSound('success');
        showToast('🔊 Audio sound effects enabled');
      } else {
        showToast('🔇 Audio sound effects muted');
      }
    });
  };

  /* --------------------------------------------------------------------------
     02. MULTI-MODE PARTICLE CANVAS ENGINE
     -------------------------------------------------------------------------- */
  let currentParticleMode = 'constellation';
  let canvasAccentColor = '#c9a84c';

  const initHeroCanvas = () => {
    const canvas = document.getElementById('heroCanvas');
    if (!canvas || prefersReducedMotion) return;

    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    let particles = [];
    const particleCount = isTouchDevice ? 25 : 60;
    let mouse = { x: -1000, y: -1000 };

    window.addEventListener('mousemove', (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    });

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    class Particle {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.7;
        this.vy = (Math.random() - 0.5) * 0.7;
        this.radius = Math.random() * 2 + 1;
        this.alpha = Math.random() * 0.5 + 0.2;
        this.char = String.fromCharCode(0x30A0 + Math.floor(Math.random() * 96));
        this.charSpeed = Math.random() * 3 + 2;
      }

      update() {
        if (currentParticleMode === 'constellation') {
          this.x += this.vx;
          this.y += this.vy;

          if (this.x < 0 || this.x > width) this.vx *= -1;
          if (this.y < 0 || this.y > height) this.vy *= -1;

          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 150) {
            const force = (150 - dist) / 150;
            this.x -= (dx / dist) * force * 3;
            this.y -= (dy / dist) * force * 3;
          }
        } else if (currentParticleMode === 'matrix') {
          this.y += this.charSpeed;
          if (this.y > height) {
            this.y = -20;
            this.x = Math.random() * width;
          }
        } else if (currentParticleMode === 'stardust') {
          this.y -= 0.6;
          this.x += Math.sin(this.y * 0.02) * 0.5;
          if (this.y < 0) {
            this.y = height + 10;
            this.x = Math.random() * width;
          }
        } else if (currentParticleMode === 'warp') {
          const cx = width / 2;
          const cy = height / 2;
          const dx = this.x - cx;
          const dy = this.y - cy;
          const dist = Math.sqrt(dx * dx + dy * dy) || 1;
          this.x += (dx / dist) * (this.charSpeed * 3 + 2);
          this.y += (dy / dist) * (this.charSpeed * 3 + 2);
          this.radius = Math.min(4.5, 0.5 + (dist / (width * 0.35)) * 3.5);
          if (this.x < -60 || this.x > width + 60 || this.y < -60 || this.y > height + 60) {
            this.x = cx + (Math.random() - 0.5) * 120;
            this.y = cy + (Math.random() - 0.5) * 120;
            this.radius = 1;
          }
        }
      }

      draw() {
        if (currentParticleMode === 'constellation' || currentParticleMode === 'stardust') {
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
          ctx.fillStyle = canvasAccentColor;
          ctx.globalAlpha = this.alpha;
          ctx.fill();
          ctx.globalAlpha = 1;
        } else if (currentParticleMode === 'matrix') {
          ctx.font = '12px "JetBrains Mono", monospace';
          ctx.fillStyle = canvasAccentColor;
          ctx.globalAlpha = this.alpha;
          ctx.fillText(this.char, this.x, this.y);
          ctx.globalAlpha = 1;
        } else if (currentParticleMode === 'warp') {
          const cx = width / 2;
          const cy = height / 2;
          const dx = this.x - cx;
          const dy = this.y - cy;
          const dist = Math.sqrt(dx * dx + dy * dy) || 1;
          ctx.beginPath();
          ctx.moveTo(this.x, this.y);
          ctx.lineTo(this.x - (dx / dist) * 14, this.y - (dy / dist) * 14);
          ctx.strokeStyle = canvasAccentColor;
          ctx.lineWidth = this.radius;
          ctx.globalAlpha = Math.min(1, this.alpha + 0.35);
          ctx.stroke();
          ctx.globalAlpha = 1;
        }
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      if (currentParticleMode === 'constellation') {
        const connectionDistance = 140;
        for (let i = 0; i < particles.length; i++) {
          for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < connectionDistance) {
              const alpha = (1 - dist / connectionDistance) * 0.22;
              ctx.strokeStyle = canvasAccentColor;
              ctx.globalAlpha = alpha;
              ctx.lineWidth = 0.8;
              ctx.beginPath();
              ctx.moveTo(particles[i].x, particles[i].y);
              ctx.lineTo(particles[j].x, particles[j].y);
              ctx.stroke();
              ctx.globalAlpha = 1;
            }
          }
        }
      }

      particles.forEach((p) => {
        p.update();
        p.draw();
      });

      requestAnimationFrame(animate);
    };

    animate();
  };

  /* --------------------------------------------------------------------------
     03. SILKY LERP CUSTOM CURSOR & CLICK PARTICLE BURSTS
     -------------------------------------------------------------------------- */
  const initCustomCursor = () => {
    if (isTouchDevice || prefersReducedMotion) return;

    const dot = document.querySelector('.cursor-dot');
    const ring = document.querySelector('.cursor-ring');
    const spotlight = document.querySelector('.cursor-spotlight');

    if (!dot || !ring) return;

    let targetX = -100, targetY = -100;
    let ringX = -100, ringY = -100;
    let dotX = -100, dotY = -100;

    window.addEventListener('mousemove', (e) => {
      targetX = e.clientX;
      targetY = e.clientY;

      if (spotlight) {
        spotlight.style.left = `${e.clientX}px`;
        spotlight.style.top = `${e.clientY}px`;
      }

      document.documentElement.style.setProperty('--mouse-x', `${(e.clientX / window.innerWidth) * 100}%`);
      document.documentElement.style.setProperty('--mouse-y', `${(e.clientY / window.innerHeight) * 100}%`);
    });

    const renderCursor = () => {
      dotX += (targetX - dotX) * 0.45;
      dotY += (targetY - dotY) * 0.45;
      ringX += (targetX - ringX) * 0.16;
      ringY += (targetY - ringY) * 0.16;

      dot.style.left = `${dotX}px`;
      dot.style.top = `${dotY}px`;
      ring.style.left = `${ringX}px`;
      ring.style.top = `${ringY}px`;

      requestAnimationFrame(renderCursor);
    };
    renderCursor();

    window.addEventListener('click', (e) => {
      playSynthSound('click');
      createClickBurst(e.clientX, e.clientY);
    });

    const refreshInteractiveElements = () => {
      const interactiveElements = document.querySelectorAll(
        'a, button, .btn-premium, .skill-interactive-card, .project-showcase-card, .metric-card, .contact-interactive-card, .tech-pill-card, .skill-tab-btn, .project-filter-btn, .theme-chip-btn, .canvas-mode-btn, .inquiry-chip, .arch-node, .dsa-cat-card, .algo-tab'
      );

      interactiveElements.forEach((el) => {
        el.addEventListener('mouseenter', () => {
          document.body.classList.add('cursor-hover');
          playSynthSound('hover');
        });

        el.addEventListener('mouseleave', () => {
          document.body.classList.remove('cursor-hover');
        });
      });
    };

    refreshInteractiveElements();
  };

  const createClickBurst = (x, y) => {
    const particleCount = 8;
    const colors = [canvasAccentColor, '#f3dc98', '#38bdf8', '#ffffff'];

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'click-particle';
      const angle = (Math.PI * 2 * i) / particleCount + (Math.random() - 0.5);
      const distance = Math.random() * 45 + 25;
      const dx = Math.cos(angle) * distance;
      const dy = Math.sin(angle) * distance;
      const size = Math.random() * 4 + 2;

      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.background = colors[Math.floor(Math.random() * colors.length)];
      particle.style.left = `${x}px`;
      particle.style.top = `${y}px`;
      particle.style.setProperty('--dx', `${dx}px`);
      particle.style.setProperty('--dy', `${dy}px`);

      document.body.appendChild(particle);

      setTimeout(() => particle.remove(), 750);
    }
  };

  /* --------------------------------------------------------------------------
     04. COMMAND PALETTE (RAYCAST / LINEAR `⌘K` ENGINE)
     -------------------------------------------------------------------------- */
  const initCommandPalette = () => {
    const paletteBackdrop = document.getElementById('cmdPalette');
    const cmdTriggerBtn = document.getElementById('cmdPaletteBtn');
    const cmdInput = document.getElementById('cmdSearchInput');
    const cmdResultsList = document.getElementById('cmdResultsList');

    if (!paletteBackdrop || !cmdInput || !cmdResultsList) return;

    const commands = [
      { name: 'About Raghuveer', category: 'Navigation', icon: '👤', action: () => scrollToSection('#about') },
      { name: 'Technical Skills & Arsenal', category: 'Navigation', icon: '⚡', action: () => scrollToSection('#skills') },
      { name: 'DSA & Algorithmic Hub', category: 'Navigation', icon: '🏆', action: () => scrollToSection('#dsa-hub') },
      { name: 'System Design Architecture', category: 'Navigation', icon: '🛡', action: () => scrollToSection('#architecture') },
      { name: 'Selected Projects & Demos', category: 'Navigation', icon: '💼', action: () => scrollToSection('#projects') },
      { name: 'Career Journey & Education', category: 'Navigation', icon: '⏱', action: () => scrollToSection('#journey') },
      { name: 'Contact & Hire Raghuveer', category: 'Navigation', icon: '✉', action: () => scrollToSection('#contact') },
      { name: 'Quick Bio Modal Dialog', category: 'Action', icon: '📋', action: () => openQuickBio() },
      { name: 'Copy Email to Clipboard', category: 'Action', icon: '✉', action: () => copyEmailDirect() },
      { name: 'Toggle Light / Dark Mode', category: 'Theme', icon: '🌓', action: () => toggleThemeDirect() },
      { name: 'Theme: Celestial Gold', category: 'Theme', icon: '🎨', action: () => switchThemeAccent('gold') },
      { name: 'Theme: Cyber Cyan', category: 'Theme', icon: '💎', action: () => switchThemeAccent('cyan') },
      { name: 'Theme: Emerald Matrix', category: 'Theme', icon: '🍃', action: () => switchThemeAccent('emerald') },
      { name: 'Theme: Electric Purple', category: 'Theme', icon: '🔮', action: () => switchThemeAccent('purple') },
      { name: 'Filter: Full Stack Projects', category: 'Filter', icon: '🔍', action: () => filterProjectsDirect('fullstack') },
      { name: 'Filter: Backend & APIs', category: 'Filter', icon: '🍃', action: () => filterProjectsDirect('backend') },
      { name: 'View GitHub Profile', category: 'External', icon: '↗', action: () => window.open('https://github.com/sairaghuveer85-cpu', '_blank') },
      { name: 'View LinkedIn Profile', category: 'External', icon: '↗', action: () => window.open('https://www.linkedin.com/in/raghuveer-cherukuri-95a99840a/', '_blank') }
    ];

    const openPalette = () => {
      paletteBackdrop.classList.add('open');
      cmdInput.value = '';
      renderResults(commands);
      setTimeout(() => cmdInput.focus(), 80);
      playSynthSound('click');
    };

    const closePalette = () => {
      paletteBackdrop.classList.remove('open');
    };

    if (cmdTriggerBtn) {
      cmdTriggerBtn.addEventListener('click', openPalette);
    }

    window.addEventListener('keydown', (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (paletteBackdrop.classList.contains('open')) {
          closePalette();
        } else {
          openPalette();
        }
      } else if (e.key === 'Escape' && paletteBackdrop.classList.contains('open')) {
        closePalette();
      }
    });

    paletteBackdrop.addEventListener('click', (e) => {
      if (e.target === paletteBackdrop) closePalette();
    });

    const renderResults = (items) => {
      cmdResultsList.innerHTML = '';
      if (items.length === 0) {
        cmdResultsList.innerHTML = '<li style="padding: 16px; color: var(--text-dim); text-align: center;">No matching commands found.</li>';
        return;
      }

      items.forEach((item) => {
        const li = document.createElement('li');
        li.className = 'cmd-result-item';
        li.innerHTML = `
          <div class="cmd-item-left">
            <span>${item.icon}</span>
            <span>${item.name}</span>
          </div>
          <span class="cmd-item-tag">${item.category}</span>
        `;
        li.addEventListener('click', () => {
          playSynthSound('success');
          closePalette();
          item.action();
        });
        cmdResultsList.appendChild(li);
      });
    };

    cmdInput.addEventListener('input', (e) => {
      const q = e.target.value.toLowerCase().trim();
      const filtered = commands.filter((c) => c.name.toLowerCase().includes(q) || c.category.toLowerCase().includes(q));
      renderResults(filtered);
    });
  };

  const scrollToSection = (id) => {
    const el = document.querySelector(id);
    if (el) {
      window.scrollTo({
        top: el.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  };

  const copyEmailDirect = () => {
    const email = 'sairaghuveer85@gmail.com';
    navigator.clipboard.writeText(email).then(() => {
      showToast('✓ Email copied to clipboard: ' + email);
    });
  };

  const toggleThemeDirect = () => {
    const btn = document.getElementById('themeToggleBtn');
    if (btn) btn.click();
  };

  const filterProjectsDirect = (cat) => {
    scrollToSection('#projects');
    const btn = document.querySelector(`.project-filter-btn[data-filter="${cat}"]`);
    if (btn) btn.click();
  };

  /* --------------------------------------------------------------------------
     05. FULLY FUNCTIONAL INTERACTIVE CLI TERMINAL ENGINE
     -------------------------------------------------------------------------- */
  const initHeroTerminal = () => {
    const consoleOutput = document.getElementById('termConsoleOutput');
    const cmdBtns = document.querySelectorAll('.term-cmd-btn');
    const termInput = document.getElementById('termInteractiveInput');
    const termSubmitBtn = document.getElementById('termSubmitBtn');
    const techCards = document.querySelectorAll('.tech-pill-card[data-cmd-trigger]');

    if (!consoleOutput) return;

    let commandHistory = [];
    let historyIndex = -1;

    const logToTerminal = (promptText, responseLines) => {
      const p = document.createElement('div');
      p.style.marginBottom = '4px';
      p.innerHTML = `<span class="console-line-prompt">&gt; ${promptText}</span>`;
      consoleOutput.appendChild(p);

      responseLines.forEach((line) => {
        const row = document.createElement('div');
        row.innerHTML = line;
        consoleOutput.appendChild(row);
      });

      consoleOutput.scrollTop = consoleOutput.scrollHeight;
      playSynthSound('click');
    };

    const processCommand = (rawCmd) => {
      const cmd = rawCmd.trim().toLowerCase();
      if (!cmd) return;

      commandHistory.push(rawCmd);
      historyIndex = commandHistory.length;

      if (cmd === 'help') {
        logToTerminal('help', [
          '<span class="console-line-info">Available Commands:</span>',
          '<span class="console-line-text">  • run         - Initialize Spring Boot microservices engine</span>',
          '<span class="console-line-text">  • skills      - Inspect core technical stack</span>',
          '<span class="console-line-text">  • dsa         - View DSA & algorithmic benchmarks</span>',
          '<span class="console-line-text">  • projects    - List featured production projects</span>',
          '<span class="console-line-text">  • arch        - System architecture breakdown</span>',
          '<span class="console-line-text">  • whoami      - Developer profile & credentials</span>',
          '<span class="console-line-text">  • theme &lt;name&gt; - Set accent theme (gold, cyan, emerald, purple)</span>',
          '<span class="console-line-text">  • matrix      - Engage matrix rain particle engine</span>',
          '<span class="console-line-text">  • hire        - Hire Raghuveer / contact details</span>',
          '<span class="console-line-text">  • date        - View live IST time</span>',
          '<span class="console-line-text">  • clear       - Flush terminal buffer</span>'
        ]);
      } else if (cmd === 'run') {
        logToTerminal('java -jar raghuveer-portfolio.jar', [
          '<span class="console-line-success">✔ Initializing Spring Boot v3.3.0 Engine...</span>',
          '<span class="console-line-info">✔ Connected to PostgreSQL DB (HikariCP 14ms latency)</span>',
          '<span class="console-line-text">✔ Microservices Cluster Started on port 8080 [STATUS: HEALTHY]</span>'
        ]);
      } else if (cmd === 'skills') {
        logToTerminal('fetch --skills', [
          '<span class="console-line-info">Core Backend: Java 21 (95%), Spring Boot 3 (85%), PostgreSQL (80%)</span>',
          '<span class="console-line-info">Frontend: React 19 (85%), JavaScript ES6+ (80%), HTML5/CSS3 (90%)</span>',
          '<span class="console-line-text">Mobile & Cloud: Kotlin (75%), Android Compose (70%), Docker, Git</span>'
        ]);
      } else if (cmd === 'dsa') {
        logToTerminal('benchmark --dsa', [
          '<span class="console-line-success">✔ 100+ DSA Problems Solved across LeetCode & HackerRank</span>',
          '<span class="console-line-info">✔ Primary Categories: Trees (25+), Graphs (20+), DP (20+), Arrays (35+)</span>',
          '<span class="console-line-text">✔ Time Complexity: O(log N) optimal · Space: O(1) in-place</span>'
        ]);
      } else if (cmd === 'projects') {
        logToTerminal('list --projects', [
          '<span class="console-line-info">1. E-Commerce Platform (Spring Boot + React + JWT)</span>',
          '<span class="console-line-info">2. TaskFlow Distributed Kanban (Java + WebSockets + PostgreSQL)</span>',
          '<span class="console-line-info">3. CampusPulse REST API (Spring Boot + OpenAPI / Swagger)</span>',
          '<span class="console-line-text">4. Portfolio Design Studio (Multi-mode Canvas + Web Audio)</span>'
        ]);
      } else if (cmd === 'arch' || cmd === 'architecture') {
        logToTerminal('inspect --architecture', [
          '<span class="console-line-info">Tier 1: React SPA / Native Android (Jetpack Compose)</span>',
          '<span class="console-line-info">Tier 2: Spring Cloud Gateway (JWT RBAC + Rate Limiting)</span>',
          '<span class="console-line-info">Tier 3: Spring Boot Microservices Cluster</span>',
          '<span class="console-line-text">Tier 4: PostgreSQL + Redis Cache + HikariCP Connection Pool</span>'
        ]);
      } else if (cmd === 'whoami') {
        logToTerminal('whoami', [
          '<span class="console-line-success">Cherukuri Raghuveer · Full Stack & Android Engineer</span>',
          '<span class="console-line-text">Location: Andhra Pradesh, India 🇮🇳</span>',
          '<span class="console-line-info">Focus: Scalable Microservices, Responsive Frontend, Native Android</span>'
        ]);
      } else if (cmd === 'hire' || cmd === 'sudo hire') {
        logToTerminal('sudo hire raghuveer', [
          '<span class="console-line-success">✔ Access Granted! Cherukuri Raghuveer is open to opportunities.</span>',
          '<span class="console-line-info">✉ Email: sairaghuveer85@gmail.com</span>',
          '<span class="console-line-text">🔗 GitHub: github.com/sairaghuveer85-cpu</span>'
        ]);
        showToast('✉ Opening contact composer...');
        scrollToSection('#contact');
      } else if (cmd.startsWith('theme')) {
        const parts = cmd.split(' ');
        const accent = parts[1];
        if (['gold', 'cyan', 'emerald', 'purple'].includes(accent)) {
          switchThemeAccent(accent);
          logToTerminal(cmd, [`<span class="console-line-success">✔ Accent theme set to '${accent}'.</span>`]);
        } else {
          logToTerminal(cmd, ['<span class="console-line-text">Usage: theme &lt;gold | cyan | emerald | purple&gt;</span>']);
        }
      } else if (cmd === 'matrix') {
        switchParticleMode('matrix');
        logToTerminal('matrix --stream', ['<span class="console-line-success">✔ Matrix rain background engine engaged.</span>']);
      } else if (cmd === 'date' || cmd === 'time') {
        const now = new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' });
        logToTerminal('date', [`<span class="console-line-info">IST Time: ${now} (Andhra Pradesh, India)</span>`]);
      } else if (cmd === 'clear') {
        consoleOutput.innerHTML = '<div class="console-line-text">Terminal cleared. Ready for execution.</div>';
        playSynthSound('click');
      } else {
        logToTerminal(rawCmd, [
          `<span class="console-line-text">Command not found: '${rawCmd}'. Type 'help' for available commands.</span>`
        ]);
      }
    };

    cmdBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        const cmd = btn.getAttribute('data-cmd');
        processCommand(cmd);
      });
    });

    const handleInputSubmit = () => {
      const val = termInput.value;
      if (val) {
        processCommand(val);
        termInput.value = '';
      }
    };

    if (termSubmitBtn && termInput) {
      termSubmitBtn.addEventListener('click', handleInputSubmit);
      termInput.addEventListener('keydown', (e) => {
        playSynthSound('type');
        if (e.key === 'Enter') {
          handleInputSubmit();
        } else if (e.key === 'ArrowUp') {
          if (historyIndex > 0) {
            historyIndex--;
            termInput.value = commandHistory[historyIndex] || '';
          }
        } else if (e.key === 'ArrowDown') {
          if (historyIndex < commandHistory.length - 1) {
            historyIndex++;
            termInput.value = commandHistory[historyIndex] || '';
          } else {
            historyIndex = commandHistory.length;
            termInput.value = '';
          }
        }
      });
    }

    techCards.forEach((card) => {
      card.addEventListener('click', () => {
        const trigger = card.getAttribute('data-cmd-trigger');
        if (trigger === 'java') {
          processCommand('run');
        } else if (trigger === 'react') {
          processCommand('skills');
        } else if (trigger === 'android') {
          processCommand('whoami');
        } else if (trigger === 'dsa') {
          processCommand('dsa');
        }
      });
    });
  };

  /* --------------------------------------------------------------------------
     06. DYNAMIC ROLE CYBER TYPEWRITER
     -------------------------------------------------------------------------- */
  const initRoleTicker = () => {
    const roleTarget = document.getElementById('dynamicRoleText');
    if (!roleTarget) return;

    const roles = [
      'Full Stack Engineer (Java 21 + Spring Boot 3)',
      'Modern Frontend Developer (React 19 + UI/UX)',
      'Android & Kotlin Native App Engineer',
      'DSA & High-Concurrency Systems Specialist',
      'RESTful Microservices & Cloud Architect'
    ];

    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let speed = 80;

    const typeLoop = () => {
      const currentRole = roles[roleIndex];

      if (isDeleting) {
        roleTarget.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
        speed = 35;
      } else {
        roleTarget.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
        speed = 75;
      }

      if (!isDeleting && charIndex === currentRole.length) {
        speed = 2200;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        speed = 400;
      }

      setTimeout(typeLoop, speed);
    };

    typeLoop();
  };

  /* --------------------------------------------------------------------------
     07. LIVING PROJECT MINI-APPS
     -------------------------------------------------------------------------- */
  const initProjectWidgets = () => {
    // 1. NovaSound E-Commerce Colorway Selector, Promo Code & Dynamic Cart
    const swatches = document.querySelectorAll('.color-swatch-btn');
    const productName = document.getElementById('ecomProductName');
    const priceTag = document.getElementById('ecomPriceTag');
    const ecomBtn = document.getElementById('widgetCartBtn');
    const cartCountLabel = document.getElementById('cartCountLabel');
    const promoInput = document.getElementById('ecomPromoInput');
    const promoBtn = document.getElementById('ecomApplyPromoBtn');
    const promoBadge = document.getElementById('ecomPromoBadge');
    let cartCount = 0;
    let discountApplied = false;

    swatches.forEach((swatch) => {
      swatch.addEventListener('click', () => {
        swatches.forEach((s) => s.classList.remove('active'));
        swatch.classList.add('active');
        const color = swatch.getAttribute('data-color');
        if (productName) {
          if (color === 'gold') productName.textContent = 'NovaSound Celestial Gold';
          else if (color === 'obsidian') productName.textContent = 'NovaSound Obsidian Black';
          else if (color === 'cyan') productName.textContent = 'NovaSound Cyber Cyan';
        }
        playSynthSound('mode');
      });
    });

    if (promoBtn && promoInput && priceTag) {
      promoBtn.addEventListener('click', () => {
        const code = promoInput.value.trim().toUpperCase();
        if (code === 'DEV2026') {
          discountApplied = true;
          priceTag.textContent = '$211.65';
          if (promoBadge) promoBadge.innerHTML = '🎉 CODE <strong>DEV2026</strong> APPLIED (-15%)';
          showToast('🎉 Promo code DEV2026 applied! 15% off');
          playSynthSound('success');
        } else {
          showToast('⚠️ Invalid promo code. Try DEV2026');
        }
      });
    }

    if (ecomBtn && cartCountLabel) {
      ecomBtn.addEventListener('click', () => {
        cartCount++;
        cartCountLabel.textContent = cartCount;
        ecomBtn.style.transform = 'scale(0.95)';
        setTimeout(() => (ecomBtn.style.transform = 'scale(1)'), 150);
        playSynthSound('success');
        showToast(`✓ Added NovaSound Wireless ANC to cart (${cartCount} items)`);
      });
    }

    // 2. TaskFlow Living Kanban Board with Dynamic Task Creation
    const inProgressList = document.getElementById('kanbanInProgressList');
    const doneList = document.getElementById('kanbanDoneList');
    const inProgressCount = document.getElementById('inProgressCount');
    const doneCount = document.getElementById('doneCount');
    const kanbanInput = document.getElementById('kanbanNewTaskInput');
    const kanbanAddBtn = document.getElementById('kanbanAddTaskBtn');

    const updateKanbanCounts = () => {
      if (inProgressCount && inProgressList) inProgressCount.textContent = inProgressList.children.length;
      if (doneCount && doneList) doneCount.textContent = doneList.children.length;
    };

    const attachKanbanItemListener = (item) => {
      item.addEventListener('click', () => {
        if (item.classList.contains('done')) {
          item.classList.remove('done');
          inProgressList.appendChild(item);
        } else {
          item.classList.add('done');
          doneList.appendChild(item);
          playSynthSound('success');
        }
        updateKanbanCounts();
      });
    };

    document.querySelectorAll('.kanban-card-item').forEach(attachKanbanItemListener);

    const addKanbanTask = () => {
      const title = (kanbanInput.value || '').trim();
      if (!title) return;
      const newItem = document.createElement('div');
      newItem.className = 'kanban-card-item';
      newItem.textContent = title;
      attachKanbanItemListener(newItem);
      inProgressList.appendChild(newItem);
      kanbanInput.value = '';
      updateKanbanCounts();
      playSynthSound('click');
      showToast(`⚡ Added task: "${title}"`);
    };

    if (kanbanAddBtn && kanbanInput) {
      kanbanAddBtn.addEventListener('click', addKanbanTask);
      kanbanInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') addKanbanTask();
      });
    }

    // 3. Swagger API Live Runner Simulator
    const swaggerBtn = document.getElementById('swaggerExecBtn');
    const swaggerSelect = document.getElementById('swaggerEndpointSelect');
    const swaggerResponse = document.getElementById('swaggerResponseBox');
    const swaggerStatus = document.getElementById('swaggerStatusText');
    const swaggerMethodBadge = document.getElementById('swaggerMethodBadge');

    const mockResponses = {
      students: {
        status: 200,
        endpoint: '/api/v1/students/top-performers',
        data: [
          { id: 101, name: 'Cherukuri Raghuveer', gpa: 9.4, honors: 'Magna Cum Laude', stack: 'Java 21 + Spring Boot 3' },
          { id: 102, name: 'Alex Johnson', gpa: 9.1, honors: 'Dean List', stack: 'React 19 + Node' }
        ]
      },
      courses: {
        status: 200,
        endpoint: '/api/v1/courses/enrollment',
        data: [
          { code: 'CS401', name: 'Distributed Cloud Microservices', enrolled: 120, capacity: 150 },
          { code: 'CS302', name: 'Advanced Algorithms & Big-O', enrolled: 95, capacity: 100 }
        ]
      },
      health: {
        status: 200,
        endpoint: '/api/v1/system/health',
        uptime: '99.98%',
        dbConnectionPool: 'HikariCP Active (0 idle, 14ms)',
        jvmMemory: '512MB / 2048MB'
      },
      auth: {
        status: 200,
        endpoint: '/api/v1/auth/jwt-token',
        tokenType: 'Bearer',
        expiresIn: '86400s',
        scope: ['ROLE_ADMIN', 'ROLE_DEVELOPER']
      }
    };

    if (swaggerBtn && swaggerSelect && swaggerResponse) {
      swaggerBtn.addEventListener('click', () => {
        const val = swaggerSelect.value;
        const method = val === 'auth' ? 'POST' : 'GET';
        if (swaggerMethodBadge) {
          swaggerMethodBadge.textContent = method;
          swaggerMethodBadge.style.background = method === 'POST' ? '#10b981' : '#2563eb';
        }

        swaggerResponse.textContent = 'Simulating HTTP network call...';
        playSynthSound('click');

        setTimeout(() => {
          const res = mockResponses[val] || mockResponses.students;
          swaggerResponse.textContent = JSON.stringify(res, null, 2);
          if (swaggerStatus) swaggerStatus.textContent = `Status: 200 OK · ${Math.floor(Math.random() * 10 + 10)}ms`;
          playSynthSound('success');
        }, 280);
      });
    }

    // 4. Live Theme & Particle Studio
    const themeChips = document.querySelectorAll('.theme-chip-btn');
    themeChips.forEach((chip) => {
      chip.addEventListener('click', () => {
        themeChips.forEach((c) => c.classList.remove('active'));
        chip.classList.add('active');
        const accent = chip.getAttribute('data-accent');
        switchThemeAccent(accent);
        playSynthSound('mode');
      });
    });

    const canvasModeBtns = document.querySelectorAll('.canvas-mode-btn');
    canvasModeBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        canvasModeBtns.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
        const mode = btn.getAttribute('data-mode');
        switchParticleMode(mode);
        playSynthSound('mode');
      });
    });
  };

  const switchThemeAccent = (accent) => {
    document.body.classList.remove('theme-accent-cyan', 'theme-accent-emerald', 'theme-accent-purple', 'theme-accent-rose', 'theme-accent-aurora');
    if (accent === 'cyan') {
      document.body.classList.add('theme-accent-cyan');
      canvasAccentColor = '#38bdf8';
    } else if (accent === 'emerald') {
      document.body.classList.add('theme-accent-emerald');
      canvasAccentColor = '#34d399';
    } else if (accent === 'purple') {
      document.body.classList.add('theme-accent-purple');
      canvasAccentColor = '#a855f7';
    } else if (accent === 'rose') {
      document.body.classList.add('theme-accent-rose');
      canvasAccentColor = '#fb7185';
    } else if (accent === 'aurora') {
      document.body.classList.add('theme-accent-aurora');
      canvasAccentColor = '#d946ef';
    } else {
      canvasAccentColor = '#c9a84c';
    }
    showToast(`🎨 Theme accent updated to ${accent.toUpperCase()}`);
  };

  const switchParticleMode = (mode) => {
    currentParticleMode = mode;
    showToast(`⚡ Canvas engine switched to ${mode.toUpperCase()} mode`);
  };

  /* --------------------------------------------------------------------------
     08. DSA ALGORITHM CODE EXPLORER TABS
     -------------------------------------------------------------------------- */
  const initAlgoExplorer = () => {
    const tabs = document.querySelectorAll('.algo-tab');
    const codeDisplay = document.getElementById('algoCodeDisplay');

    const snippets = {
      twopointers: `// Two-Sum Sorted (Two Pointers Pattern - O(N) Time, O(1) Space)
public int[] twoSumSorted(int[] nums, int target) {
    int left = 0, right = nums.length - 1;
    while (left < right) {
        int sum = nums[left] + nums[right];
        if (sum == target) return new int[]{left, right};
        if (sum < target) left++;
        else right--;
    }
    return new int[]{-1, -1};
}`,
      tree: `// Invert Binary Tree (DFS Traversal - O(N) Time, O(H) Space)
public TreeNode invertTree(TreeNode root) {
    if (root == null) return null;
    TreeNode temp = root.left;
    root.left = invertTree(root.right);
    root.right = invertTree(temp);
    return root;
}`,
      dp: `// 0/1 Knapsack Pattern (Memoization - O(N*W) Time, O(N*W) Space)
public int knapsack(int[] wt, int[] val, int W, int n, int[][] dp) {
    if (n == 0 || W == 0) return 0;
    if (dp[n][W] != -1) return dp[n][W];
    if (wt[n-1] <= W) {
        return dp[n][W] = Math.max(val[n-1] + knapsack(wt, val, W - wt[n-1], n - 1, dp),
                                   knapsack(wt, val, W, n - 1, dp));
    }
    return dp[n][W] = knapsack(wt, val, W, n - 1, dp);
}`,
      binarysearch: `// Binary Search (O(log N) Time, O(1) Space)
public int search(int[] nums, int target) {
    int low = 0, high = nums.length - 1;
    while (low <= high) {
        int mid = low + (high - low) / 2;
        if (nums[mid] == target) return mid;
        if (nums[mid] < target) low = mid + 1;
        else high = mid - 1;
    }
    return -1;
}`
    };

    const copyBtn = document.getElementById('algoCopyCodeBtn');
    let currentKey = 'twopointers';

    tabs.forEach((tab) => {
      tab.addEventListener('click', () => {
        tabs.forEach((t) => t.classList.remove('active'));
        tab.classList.add('active');
        currentKey = tab.getAttribute('data-snippet');
        if (codeDisplay && snippets[currentKey]) {
          codeDisplay.innerHTML = `<code>${snippets[currentKey]}</code>`;
          playSynthSound('click');
        }
      });
    });

    if (copyBtn) {
      copyBtn.addEventListener('click', () => {
        const text = snippets[currentKey] || (codeDisplay ? codeDisplay.textContent : '');
        if (navigator.clipboard) {
          navigator.clipboard.writeText(text).then(() => {
            playSynthSound('success');
            showToast('📋 Code copied to clipboard!');
            copyBtn.innerHTML = '<span>✓</span> Copied!';
            setTimeout(() => {
              copyBtn.innerHTML = '<span>📋</span> Copy Code';
            }, 2000);
          });
        }
      });
    }
  };

  /* --------------------------------------------------------------------------
     09. INTERACTIVE SYSTEM ARCHITECTURE TIER INSPECTOR
     -------------------------------------------------------------------------- */
  const initArchInspector = () => {
    const nodes = document.querySelectorAll('.arch-node[data-node]');
    const title = document.getElementById('archInspectTitle');
    const latency = document.getElementById('archInspectLatency');
    const desc = document.getElementById('archInspectDesc');
    const specs = document.getElementById('archInspectSpecs');

    const tierData = {
      client: {
        title: 'Tier 1: Client Tier (React 19 & Native Android)',
        latency: 'Latency: <16ms (60 FPS Render)',
        desc: 'Client applications are built with React 19 with hooks and state management for web, alongside Kotlin Jetpack Compose on native Android. Includes HTTP retry policies, JWT session storage, and optimistic UI updates.',
        specs: ['⚛ React 19 Virtual DOM', '📱 Jetpack Compose MVVM', '⚡ Axios & Retrofit HTTP']
      },
      gateway: {
        title: 'Tier 2: Spring Cloud API Gateway',
        latency: 'Latency: ~4ms Routing Overhead',
        desc: 'Acts as the single secure entrypoint for all incoming requests. Enforces JWT RBAC token validation, Redis token bucket rate limiting, global CORS headers, and resilient circuit breakers.',
        specs: ['🛡 JWT RBAC Filters', '⚡ Rate Limiting (Token Bucket)', '🔄 Resilience4j Circuit Breaker']
      },
      services: {
        title: 'Tier 3: Spring Boot 3 Microservices Cluster',
        latency: 'Latency: ~12ms Business Processing',
        desc: 'Domain-driven microservices running on Java 21 with Virtual Threads for high concurrency. Enforces validation, transactional business logic, domain events, and clean service abstractions.',
        specs: ['☕ Java 21 Virtual Threads', '🍃 Spring Boot 3 Web & Security', '📦 Hibernate / JPA 3.2']
      },
      database: {
        title: 'Tier 4: Persistence Tier (PostgreSQL & Redis Cache)',
        latency: 'Latency: ~2ms Cache / 14ms DB Query',
        desc: 'Relational database layer configured with HikariCP connection pooling, indexed b-trees for sub-second query performance, and Redis multi-level caching for hot session data.',
        specs: ['🗄 PostgreSQL 16 + MySQL', '🚀 Redis In-Memory Cache', '⚡ HikariCP Connection Pool']
      }
    };

    nodes.forEach((node) => {
      node.addEventListener('click', () => {
        nodes.forEach((n) => n.classList.remove('active'));
        node.classList.add('active');
        const key = node.getAttribute('data-node');
        const data = tierData[key];
        if (data) {
          if (title) title.textContent = data.title;
          if (latency) latency.textContent = data.latency;
          if (desc) desc.textContent = data.desc;
          if (specs) {
            specs.innerHTML = data.specs.map((s) => `<span class="spec-pill">${s}</span>`).join('');
          }
          playSynthSound('success');
        }
      });
    });
  };

  /* --------------------------------------------------------------------------
     10. INTERACTIVE INQUIRY STUDIO (CONTACT SECTION)
     -------------------------------------------------------------------------- */
  const initInquiryStudio = () => {
    const chips = document.querySelectorAll('.inquiry-chip');
    const textPreview = document.getElementById('inquiryGeneratedText');
    const mailBtn = document.getElementById('inquirySendMailBtn');
    const copyBtn = document.getElementById('inquiryCopyBtn');

    const inquiryTemplates = {
      fulltime: {
        subject: 'Full-time Software Engineer Opportunity - Raghuveer Portfolio',
        body: 'Hi Raghuveer, I reviewed your portfolio and would like to discuss full-time Software Engineer opportunities with our team.',
        preview: 'Hi Raghuveer, I reviewed your portfolio and would like to discuss full-time Software Engineer opportunities with our team.'
      },
      internship: {
        subject: 'Developer Internship Opportunity - Raghuveer Portfolio',
        body: 'Hi Raghuveer, we were impressed by your Java, Spring Boot, and Android skills and would love to interview you for an engineering internship.',
        preview: 'Hi Raghuveer, we were impressed by your Java, Spring Boot, and Android skills and would love to interview you for an engineering internship.'
      },
      freelance: {
        subject: 'Freelance Software Project Collaboration',
        body: 'Hi Raghuveer, we have an upcoming web / mobile application project and would like to hire you for development.',
        preview: 'Hi Raghuveer, we have an upcoming web / mobile application project and would like to hire you for development.'
      },
      tech: {
        subject: 'Tech Connect & Coffee Chat with Raghuveer',
        body: 'Hi Raghuveer, I saw your full-stack & DSA portfolio. Would love to connect, exchange engineering ideas, and network!',
        preview: 'Hi Raghuveer, I saw your full-stack & DSA portfolio. Would love to connect, exchange engineering ideas, and network!'
      }
    };

    chips.forEach((chip) => {
      chip.addEventListener('click', () => {
        chips.forEach((c) => c.classList.remove('active'));
        chip.classList.add('active');
        const topic = chip.getAttribute('data-topic');
        const item = inquiryTemplates[topic] || inquiryTemplates.fulltime;

        if (textPreview) textPreview.textContent = item.preview;
        if (mailBtn) {
          mailBtn.setAttribute('href', `mailto:sairaghuveer85@gmail.com?subject=${encodeURIComponent(item.subject)}&body=${encodeURIComponent(item.body)}`);
        }
        playSynthSound('click');
      });
    });

    if (copyBtn && textPreview) {
      copyBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(textPreview.textContent).then(() => {
          showToast('✓ Message copied to clipboard!');
        });
      });
    }
  };

  /* --------------------------------------------------------------------------
     11. LIVE 60 FPS COUNTER & PERFORMANCE TELEMETRY
     -------------------------------------------------------------------------- */
  const initFpsCounter = () => {
    const fpsEl = document.getElementById('navFpsCounter');
    if (!fpsEl) return;

    const fpsText = fpsEl.querySelector('.fps-text');
    let frameCount = 0;
    let lastTime = performance.now();

    const calculateFps = () => {
      frameCount++;
      const now = performance.now();
      if (now - lastTime >= 1000) {
        const fps = Math.round((frameCount * 1000) / (now - lastTime));
        if (fpsText) fpsText.textContent = `${Math.min(fps, 60)} FPS`;
        frameCount = 0;
        lastTime = now;
      }
      requestAnimationFrame(calculateFps);
    };

    requestAnimationFrame(calculateFps);
  };

  /* --------------------------------------------------------------------------
     12. TOP SCROLL PROGRESS BAR & NAVBAR DYNAMICS
     -------------------------------------------------------------------------- */
  const initScrollDynamics = () => {
    const progressBar = document.querySelector('.scroll-progress-bar');
    const navbar = document.querySelector('nav.navbar');
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links li a, .mobile-nav-links li a');

    let lastScrollY = window.scrollY;

    const onScroll = () => {
      const currentScrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (currentScrollY / (docHeight || 1)) * 100;

      if (progressBar) {
        progressBar.style.width = `${progress}%`;
      }

      if (navbar) {
        if (currentScrollY > 40) {
          navbar.classList.add('scrolled');
        } else {
          navbar.classList.remove('scrolled');
        }

        if (currentScrollY > 250 && currentScrollY > lastScrollY + 10) {
          navbar.classList.add('nav-hidden');
        } else if (currentScrollY < lastScrollY - 10) {
          navbar.classList.remove('nav-hidden');
        }
      }

      lastScrollY = currentScrollY;

      let currentSectionId = '';
      sections.forEach((sec) => {
        const top = sec.offsetTop - 140;
        const height = sec.offsetHeight;
        if (currentScrollY >= top && currentScrollY < top + height) {
          currentSectionId = sec.getAttribute('id');
        }
      });

      navLinks.forEach((link) => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSectionId}`) {
          link.classList.add('active');
        }
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  };

  /* --------------------------------------------------------------------------
     13. INTERSECTION OBSERVER ANIMATIONS & NUMERIC COUNTERS
     -------------------------------------------------------------------------- */
  const initScrollAnimations = () => {
    const animElements = document.querySelectorAll('.animate-on-scroll');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');

            const counter = entry.target.querySelector('[data-counter-target]');
            if (counter && !counter.dataset.hasCounted) {
              counter.dataset.hasCounted = 'true';
              animateCounter(counter);
            }
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    animElements.forEach((el) => observer.observe(el));

    // Standalone Skill Cards Observer
    const skillCards = document.querySelectorAll('.skill-interactive-card');
    const skillObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const card = entry.target;
            const bar = card.querySelector('.skill-bar-fill');
            const pctLabel = card.querySelector('.skill-percentage-value');
            const targetPct = parseInt(card.getAttribute('data-percentage'), 10) || 0;

            if (bar) bar.style.width = `${targetPct}%`;

            if (pctLabel && !pctLabel.dataset.hasCounted) {
              pctLabel.dataset.hasCounted = 'true';
              countUp(pctLabel, targetPct, 1200, '%');
            }
            skillObserver.unobserve(card);
          }
        });
      },
      { threshold: 0.2 }
    );

    skillCards.forEach((c) => skillObserver.observe(c));

    // Laboratory Progress Bars Observer
    const labBars = document.querySelectorAll('.lab-bar-fill');
    const labObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const bar = entry.target;
            const targetPct = bar.getAttribute('data-target-pct');
            bar.style.width = `${targetPct}%`;
            labObserver.unobserve(bar);
          }
        });
      },
      { threshold: 0.2 }
    );

    labBars.forEach((b) => labObserver.observe(b));
  };

  const countUp = (element, target, duration, suffix = '') => {
    const startTime = performance.now();

    const updateCount = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(easeProgress * target);

      element.textContent = `${current}${suffix}`;

      if (progress < 1) {
        requestAnimationFrame(updateCount);
      } else {
        element.textContent = `${target}${suffix}`;
      }
    };

    requestAnimationFrame(updateCount);
  };

  const animateCounter = (el) => {
    const target = parseInt(el.getAttribute('data-counter-target'), 10) || 0;
    const suffix = el.getAttribute('data-counter-suffix') || '';
    countUp(el, target, 1600, suffix);
  };

  /* --------------------------------------------------------------------------
     14. 3D PERSPECTIVE CARD TILT EFFECT & SPECULAR LIGHT
     -------------------------------------------------------------------------- */
  const init3DCardTilt = () => {
    if (isTouchDevice || prefersReducedMotion) return;

    const tiltCards = document.querySelectorAll('[data-tilt]');

    tiltCards.forEach((card) => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -4.5;
        const rotateY = ((x - centerX) / centerX) * 4.5;

        card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-6px)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
      });
    });
  };

  /* --------------------------------------------------------------------------
     15. PROJECT & SKILL CATEGORY FILTERS
     -------------------------------------------------------------------------- */
  const initFilters = () => {
    const projectFilterBtns = document.querySelectorAll('.project-filter-btn');
    const projectCards = document.querySelectorAll('.project-showcase-card');

    projectFilterBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        projectFilterBtns.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
        playSynthSound('click');

        const filterValue = btn.getAttribute('data-filter');

        projectCards.forEach((card) => {
          const categories = (card.getAttribute('data-category') || '').split(' ');
          if (filterValue === 'all' || categories.includes(filterValue)) {
            card.style.display = 'flex';
            setTimeout(() => {
              card.style.opacity = '1';
              card.style.transform = 'scale(1)';
            }, 30);
          } else {
            card.style.opacity = '0';
            card.style.transform = 'scale(0.95)';
            setTimeout(() => {
              card.style.display = 'none';
            }, 300);
          }
        });
      });
    });

    const skillTabs = document.querySelectorAll('.skill-tab-btn');
    const skillColumns = document.querySelectorAll('.skill-group-column');

    skillTabs.forEach((tab) => {
      tab.addEventListener('click', () => {
        skillTabs.forEach((t) => t.classList.remove('active'));
        tab.classList.add('active');
        playSynthSound('click');

        const cat = tab.getAttribute('data-skill-cat');

        skillColumns.forEach((col) => {
          if (cat === 'all' || col.getAttribute('data-group-cat') === cat) {
            col.style.display = 'flex';
            setTimeout(() => {
              col.style.opacity = '1';
              col.style.transform = 'translateY(0)';
            }, 30);
          } else {
            col.style.opacity = '0';
            col.style.transform = 'translateY(20px)';
            setTimeout(() => {
              col.style.display = 'none';
            }, 300);
          }
        });
      });
    });
  };

  /* --------------------------------------------------------------------------
     16. 1-CLICK EMAIL COPY & TOAST NOTIFICATION
     -------------------------------------------------------------------------- */
  const showToast = (message) => {
    const toast = document.getElementById('toastNotification');
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    playSynthSound('success');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3200);
  };

  const initEmailCopy = () => {
    const copyBtn = document.getElementById('copyEmailCard');
    if (!copyBtn) return;

    copyBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const email = 'sairaghuveer85@gmail.com';
      navigator.clipboard.writeText(email).then(() => {
        showToast('✓ Email copied to clipboard: ' + email);
      });
    });
  };

  /* --------------------------------------------------------------------------
     17. QUICK BIO MODAL DIALOG
     -------------------------------------------------------------------------- */
  const openQuickBio = () => {
    const modal = document.getElementById('quickBioModal');
    if (modal) {
      modal.classList.add('open');
      playSynthSound('click');
    }
  };

  const initQuickBioModal = () => {
    const modal = document.getElementById('quickBioModal');
    const openBtn = document.getElementById('heroQuickCvBtn');
    const closeBtn = document.getElementById('closeQuickModalBtn');

    if (!modal) return;

    if (openBtn) openBtn.addEventListener('click', openQuickBio);

    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        modal.classList.remove('open');
        playSynthSound('click');
      });
    }

    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.classList.remove('open');
    });

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('open')) {
        modal.classList.remove('open');
      }
    });
  };

  /* --------------------------------------------------------------------------
     18. LIVE IST INDIA DIGITAL CLOCK IN FOOTER
     -------------------------------------------------------------------------- */
  const initLiveClock = () => {
    const clockEl = document.getElementById('liveIstClock');
    if (!clockEl) return;

    const updateClock = () => {
      const now = new Date();
      const options = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      };
      const istString = now.toLocaleTimeString('en-US', options);
      clockEl.textContent = `${istString} IST (Andhra Pradesh, India)`;
    };

    updateClock();
    setInterval(updateClock, 1000);
  };

  /* --------------------------------------------------------------------------
     19. LUXURY THEME TOGGLE (DARK / LIGHT)
     -------------------------------------------------------------------------- */
  const initThemeToggle = () => {
    const themeBtn = document.getElementById('themeToggleBtn');
    if (!themeBtn) return;

    const savedTheme = localStorage.getItem('raghuveer_theme');
    if (savedTheme === 'light') {
      document.body.classList.add('light-theme');
      themeBtn.innerHTML = '☾';
    } else {
      themeBtn.innerHTML = '☀';
    }

    themeBtn.addEventListener('click', () => {
      document.body.classList.toggle('light-theme');
      const isLight = document.body.classList.contains('light-theme');
      localStorage.setItem('raghuveer_theme', isLight ? 'light' : 'dark');
      themeBtn.innerHTML = isLight ? '☾' : '☀';
      playSynthSound('click');
      showToast(isLight ? '☀ Light theme activated' : '☾ Dark theme activated');
    });
  };

  /* --------------------------------------------------------------------------
     20. MOBILE FULLSCREEN OVERLAY MENU
     -------------------------------------------------------------------------- */
  const initMobileMenu = () => {
    const hamburger = document.getElementById('hamburgerBtn');
    const overlay = document.getElementById('mobileNavOverlay');
    const mobileLinks = document.querySelectorAll('.mobile-nav-links a');

    if (!hamburger || !overlay) return;

    const toggleMenu = (forceClose = false) => {
      const isOpen = forceClose ? false : !overlay.classList.contains('open');
      hamburger.classList.toggle('open', isOpen);
      overlay.classList.toggle('open', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
      playSynthSound('click');
    };

    hamburger.addEventListener('click', () => toggleMenu());

    mobileLinks.forEach((link) => {
      link.addEventListener('click', () => toggleMenu(true));
    });
  };

  /* --------------------------------------------------------------------------
     21. BACK TO TOP SMOOTH SCROLL
     -------------------------------------------------------------------------- */
  /* --------------------------------------------------------------------------
     21. BACK TO TOP SMOOTH SCROLL
     -------------------------------------------------------------------------- */
  const initBackToTop = () => {
    const btn = document.getElementById('backToTopBtn');
    if (!btn) return;

    btn.addEventListener('click', () => {
      playSynthSound('click');
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  };

  /* --------------------------------------------------------------------------
     22. ARCHITECTURE LIVE REQUEST SIMULATOR
     -------------------------------------------------------------------------- */
  const initArchLiveSimulation = () => {
    const simBtn = document.getElementById('archSimulateBtn');
    const nodes = document.querySelectorAll('.arch-node');
    const titleEl = document.getElementById('archInspectTitle');
    const latencyEl = document.getElementById('archInspectLatency');
    const descEl = document.getElementById('archInspectDesc');
    const specsEl = document.getElementById('archInspectSpecs');

    if (!simBtn || nodes.length === 0) return;

    let isSimulating = false;

    const stages = [
      {
        nodeIndex: 0,
        name: 'Tier 1: Client Tier (React 19 & Android Native)',
        latency: 'Latency: 0ms (Dispatch Request)',
        desc: 'HTTPS GET request initiated with Axios/Retrofit carrying JWT authentication headers in payload.',
        specs: ['⚛ React 19 Client', '📱 Android Retrofit', '🔒 Bearer Token Auth']
      },
      {
        nodeIndex: 1,
        name: 'Tier 2: API Gateway & Security Filter',
        latency: 'Latency: +8ms (Route & Authenticate)',
        desc: 'Spring Cloud Gateway validates HMAC-SHA256 signature, enforces rate limits (Token Bucket), and dispatches route to target microservice.',
        specs: ['🛡 JWT RBAC Filter', '⚡ Rate Limiter (Redis)', '🌐 CORS Policy Enabled']
      },
      {
        nodeIndex: 2,
        name: 'Tier 3: Core Spring Boot Microservices',
        latency: 'Latency: +14ms (Business Logic Execution)',
        desc: 'Spring Boot service executes domain transaction with Spring Data JPA & Hibernate, utilizing Virtual Threads (Java 21) for maximum concurrency.',
        specs: ['☕ Java 21 Virtual Threads', '🍃 Spring Boot 3 Service', '🧩 JPA/Hibernate L1 Cache']
      },
      {
        nodeIndex: 3,
        name: 'Tier 4: Persistence Tier (PostgreSQL & Redis Cache)',
        latency: 'Latency: +22ms (Cache Hit & ACID Query)',
        desc: 'Redis Cache hit returns hot state in <2ms. Write transactions commit with PostgreSQL WAL and HikariCP connection pooling.',
        specs: ['🗄 PostgreSQL 16 ACID', '🚀 Redis Distributed Cache', '⚡ HikariCP Connection Pool']
      },
      {
        nodeIndex: 0,
        name: 'Response Returned to Client Tier (200 OK)',
        latency: 'Total Round-Trip: 28ms · HTTP 200 OK',
        desc: 'Compressed JSON payload received and rendered with optimistic UI updates in React 19 and Jetpack Compose.',
        specs: ['✓ HTTP 200 OK', '⚡ <30ms Latency', '🚀 Zero-Lag Render']
      }
    ];

    simBtn.addEventListener('click', () => {
      if (isSimulating) return;
      isSimulating = true;
      simBtn.innerHTML = '<span class="pulse-dot-green"></span> Simulating...';
      playSynthSound('click');

      let currentStage = 0;

      const runNextStage = () => {
        if (currentStage >= stages.length) {
          isSimulating = false;
          simBtn.innerHTML = '<span class="pulse-dot-green"></span> Simulate Live Request ▷';
          playSynthSound('success');
          showToast('⚡ Live Architecture Request Simulation Complete (28ms Round-Trip)');
          return;
        }

        const stage = stages[currentStage];
        nodes.forEach((n, idx) => {
          n.classList.toggle('active', idx === stage.nodeIndex);
        });

        if (titleEl) titleEl.textContent = stage.name;
        if (latencyEl) latencyEl.textContent = stage.latency;
        if (descEl) descEl.textContent = stage.desc;
        if (specsEl) {
          specsEl.innerHTML = stage.specs.map(s => `<span class="spec-pill">${s}</span>`).join('');
        }

        playSynthSound('type');
        currentStage++;
        setTimeout(runNextStage, 700);
      };

      runNextStage();
    });
  };

  /* --------------------------------------------------------------------------
     23. AI NEURAL CO-PILOT ASSISTANT (INTERACTIVE INTELLIGENCE SANDBOX)
     -------------------------------------------------------------------------- */
  const initAiAssistant = () => {
    const launcherBtn = document.getElementById('aiLauncherBtn');
    const dockAiBtn = document.getElementById('dockAiBtn');
    const modal = document.getElementById('aiModal');
    const closeBtn = document.getElementById('aiCloseBtn');
    const clearBtn = document.getElementById('aiClearHistoryBtn');
    const chatForm = document.getElementById('aiChatForm');
    const chatInput = document.getElementById('aiChatInput');
    const chatBody = document.getElementById('aiChatBody');
    const promptChips = document.querySelectorAll('.ai-prompt-chip');

    const mobileNavAiBtn = document.getElementById('mobileNavAiBtn');
    const mobileNavOverlay = document.getElementById('mobileNavOverlay');
    const hamburgerBtn = document.getElementById('hamburgerBtn');

    if (!modal) return;

    const toggleModal = (forceState) => {
      const isOpen = forceState !== undefined ? forceState : !modal.classList.contains('open');
      modal.classList.toggle('open', isOpen);
      modal.setAttribute('aria-hidden', !isOpen);
      if (isOpen) {
        playSynthSound('mode');
        if (chatInput) chatInput.focus();
      } else {
        playSynthSound('click');
      }
    };

    if (launcherBtn) launcherBtn.addEventListener('click', () => toggleModal(true));
    if (mobileNavAiBtn) {
      mobileNavAiBtn.addEventListener('click', () => {
        if (mobileNavOverlay && mobileNavOverlay.classList.contains('open')) {
          mobileNavOverlay.classList.remove('open');
          if (hamburgerBtn) hamburgerBtn.classList.remove('open');
          document.body.style.overflow = '';
        }
        toggleModal(true);
      });
    }
    if (closeBtn) closeBtn.addEventListener('click', () => toggleModal(false));

    modal.addEventListener('click', (e) => {
      if (e.target === modal) toggleModal(false);
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('open')) {
        toggleModal(false);
      }
    });

    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        playSynthSound('click');
        if (chatBody) {
          chatBody.innerHTML = `
            <div class="ai-msg ai-msg-bot">
              <div class="ai-msg-avatar">✦</div>
              <div class="ai-msg-content">
                <div class="ai-bubble">
                  <p>Conversation reset. How can I assist with your technical assessment of <strong>Cherukuri Raghuveer</strong>?</p>
                </div>
                <span class="ai-timestamp">System Ready · Active</span>
              </div>
            </div>
          `;
        }
        showToast('↺ AI conversation cleared');
      });
    }

    // Comprehensive Knowledge Base & Response Engine
    const knowledgeBase = {
      superpower: `
        <p>⚡ <strong>Raghuveer's Engineering Superpower:</strong></p>
        <p>His primary strength is <strong>bridging high-concurrency backend architecture with fluid frontend & native mobile craftsmanship</strong>.</p>
        <ul>
          <li><strong>Java 21 & Spring Boot 3:</strong> Deep understanding of Virtual Threads, microservices patterns, JWT RBAC security, and JPA/Hibernate optimization.</li>
          <li><strong>Android Native Engineering:</strong> Building clean MVVM architectures with Kotlin, Jetpack Compose, Room DB, and Coroutines.</li>
          <li><strong>Algorithmic Excellence:</strong> 100+ LeetCode problems solved with strict focus on optimal $O(N)$ and $O(\\log N)$ time complexities.</li>
          <li><strong>Modern UI/UX:</strong> React 19 with hooks, state machines, and Awwwards-level interactive web design.</li>
        </ul>
      `,
      stack: `
        <p>☕ <strong>Backend & Microservices Stack Breakdown:</strong></p>
        <ul>
          <li><strong>Core Language:</strong> Java 21 (OOP, Functional Streams, Concurrency, Virtual Threads).</li>
          <li><strong>Framework:</strong> Spring Boot 3.x, Spring MVC, Spring Security 6 (JWT stateless authentication & RBAC).</li>
          <li><strong>Data & ORM:</strong> Spring Data JPA, Hibernate, PostgreSQL, MySQL with relational schemas & indexing.</li>
          <li><strong>API Design:</strong> RESTful microservices, Swagger/OpenAPI documentation, HikariCP connection pooling.</li>
          <li><strong>DevOps & Tools:</strong> Docker containerization, Git branching, Maven/Gradle, Linux scripting.</li>
        </ul>
      `,
      android: `
        <p>📱 <strong>Android Native & Kotlin Ecosystem:</strong></p>
        <ul>
          <li><strong>Languages & Tooling:</strong> Kotlin, Java, Android Studio, Gradle.</li>
          <li><strong>Modern UI:</strong> Jetpack Compose declarative UI paradigms with state hoisting.</li>
          <li><strong>Architecture:</strong> MVVM (Model-View-ViewModel), Repository Pattern, Clean Architecture.</li>
          <li><strong>Data & Async:</strong> Room Database (SQLite), Kotlin Coroutines, Flow, StateFlow, LiveData.</li>
          <li><strong>Networking:</strong> Retrofit 2 with OkHttp interceptors and Moshi/Gson serialization.</li>
        </ul>
      `,
      projects: `
        <p>🚀 <strong>Top Production Projects Highlight:</strong></p>
        <ul>
          <li><strong>01. Full-Stack E-Commerce Platform:</strong> Enterprise-grade web app with Spring Boot 3 backend, React 19 UI, JWT auth, cart workflows, promo engine, and MySQL.</li>
          <li><strong>02. Task Management System:</strong> Real-time task orchestration board with priority matrix, PostgreSQL relational models, and collaborative UI.</li>
          <li><strong>03. Student Portal REST API:</strong> High-throughput institutional API with role-based security filters (RBAC), grading algorithms, and Swagger OpenAPI sandbox.</li>
          <li><strong>04. Developer Portfolio Studio:</strong> Interactive web app with multi-mode WebGL/Canvas particles, 3D tilt, Web Audio synthesizer, and DSA visualizers.</li>
        </ul>
      `,
      dsa: `
        <p>🏆 <strong>Data Structures & Algorithmic Rigor:</strong></p>
        <p>Raghuveer has solved <strong>100+ LeetCode & HackerRank algorithmic problems</strong> with emphasis on space-time efficiency:</p>
        <ul>
          <li><strong>Trees & Graphs:</strong> DFS, BFS, Binary Tree Inversion, Lowest Common Ancestor, Dijkstra's algorithm.</li>
          <li><strong>Dynamic Programming:</strong> Memoization, 0/1 Knapsack, Tabulation, Longest Common Subsequence.</li>
          <li><strong>Arrays & Two Pointers:</strong> Sliding Window, Binary Search ($O(\\log N)$), Fast/Slow Pointers, Sorting.</li>
        </ul>
      `,
      hire: `
        <p>💼 <strong>Why You Should Hire Cherukuri Raghuveer:</strong></p>
        <ul>
          <li><strong>1. Production Readiness:</strong> Capable of writing end-to-end features from database schemas to reactive UIs.</li>
          <li><strong>2. High Standards for Code Quality:</strong> Strong adherence to SOLID principles, clean modular architecture, and testability.</li>
          <li><strong>3. Algorithmic Rigor:</strong> Rapid problem-solving with minimal computational overhead.</li>
          <li><strong>4. Relocation & Availability:</strong> Open to worldwide relocation, hybrid, or remote full-time software engineering roles immediately.</li>
        </ul>
        <p>📩 Email him directly at: <code>sairaghuveer85@gmail.com</code></p>
      `,
      interview: `
        <p>🎯 <strong>Technical Interview Simulation:</strong></p>
        <p><em>Question:</em> "How do Virtual Threads in Java 21 improve backend throughput compared to traditional platform threads?"</p>
        <p><strong>Raghuveer's Answer:</strong></p>
        <p>Traditional platform threads map 1:1 to OS kernel threads, consuming ~1MB stack memory and incurring high context-switching overhead (limiting servers to ~few thousand concurrent connections).</p>
        <p>Java 21 Virtual Threads are lightweight, managed directly by the JVM ($M:N$ scheduling). When a virtual thread encounters I/O blocking (e.g. database query, HTTP call), the JVM unmounts it from the carrier thread, enabling millions of concurrent requests with near-zero memory footprint and preserving synchronous coding style without reactive complexity.</p>
      `
    };

    const generateAiResponse = (query) => {
      const q = query.toLowerCase().trim();

      if (q.includes('superpower') || q.includes('strength') || q.includes('who is')) {
        return knowledgeBase.superpower;
      }
      if (q.includes('stack') || q.includes('backend') || q.includes('spring') || q.includes('java') || q.includes('tech')) {
        return knowledgeBase.stack;
      }
      if (q.includes('android') || q.includes('kotlin') || q.includes('compose') || q.includes('mobile')) {
        return knowledgeBase.android;
      }
      if (q.includes('project') || q.includes('work') || q.includes('portfolio') || q.includes('ecommerce')) {
        return knowledgeBase.projects;
      }
      if (q.includes('dsa') || q.includes('leetcode') || q.includes('algorithm') || q.includes('problem')) {
        return knowledgeBase.dsa;
      }
      if (q.includes('hire') || q.includes('why') || q.includes('candidate') || q.includes('contact') || q.includes('email') || q.includes('salary') || q.includes('location')) {
        return knowledgeBase.hire;
      }
      if (q.includes('interview') || q.includes('question') || q.includes('mock') || q.includes('test')) {
        return knowledgeBase.interview;
      }

      // Default smart fallback
      return `
        <p>I parsed your query regarding: "<em>${escapeHtml(query)}</em>".</p>
        <p>Cherukuri Raghuveer is a <strong>Full Stack & Android Native Engineer</strong> specializing in <strong>Java 21, Spring Boot 3, Kotlin, React 19, and Data Structures & Algorithms</strong>.</p>
        <p>Explore his work across the site or click the prompt chips above to examine his microservices architectures, production projects, and algorithmic benchmarks!</p>
      `;
    };

    const escapeHtml = (str) => {
      return str.replace(/[&<>'"]/g, 
        tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
      );
    };

    const appendUserMessage = (text) => {
      const msg = document.createElement('div');
      msg.className = 'ai-msg ai-msg-user';
      msg.innerHTML = `
        <div class="ai-msg-avatar">👤</div>
        <div class="ai-msg-content">
          <div class="ai-bubble"><p>${escapeHtml(text)}</p></div>
          <span class="ai-timestamp">Just now</span>
        </div>
      `;
      chatBody.appendChild(msg);
      chatBody.scrollTop = chatBody.scrollHeight;
    };

    const appendBotResponse = (htmlContent) => {
      // Show typing indicator first
      const typingMsg = document.createElement('div');
      typingMsg.className = 'ai-msg ai-msg-bot typing-state';
      typingMsg.innerHTML = `
        <div class="ai-msg-avatar">✦</div>
        <div class="ai-msg-content">
          <div class="ai-bubble">
            <div class="ai-typing-dots">
              <span></span><span></span><span></span>
            </div>
          </div>
        </div>
      `;
      chatBody.appendChild(typingMsg);
      chatBody.scrollTop = chatBody.scrollHeight;
      playSynthSound('type');

      setTimeout(() => {
        if (typingMsg.parentNode) typingMsg.parentNode.removeChild(typingMsg);

        const botMsg = document.createElement('div');
        botMsg.className = 'ai-msg ai-msg-bot';
        botMsg.innerHTML = `
          <div class="ai-msg-avatar">✦</div>
          <div class="ai-msg-content">
            <div class="ai-bubble">${htmlContent}</div>
            <span class="ai-timestamp">Neural Response · Ready</span>
          </div>
        `;
        chatBody.appendChild(botMsg);
        chatBody.scrollTop = chatBody.scrollHeight;
        playSynthSound('success');
      }, 500);
    };

    const handleUserSubmit = (queryText) => {
      const text = queryText.trim();
      if (!text) return;
      if (chatInput) chatInput.value = '';

      appendUserMessage(text);
      playSynthSound('click');

      const responseHtml = generateAiResponse(text);
      appendBotResponse(responseHtml);
    };

    if (chatForm) {
      chatForm.addEventListener('submit', (e) => {
        e.preventDefault();
        if (chatInput) handleUserSubmit(chatInput.value);
      });
    }

    promptChips.forEach((chip) => {
      chip.addEventListener('click', () => {
        const queryKey = chip.getAttribute('data-ai-query');
        playSynthSound('click');
        appendUserMessage(chip.textContent.trim());
        const responseHtml = knowledgeBase[queryKey] || generateAiResponse(chip.textContent);
        appendBotResponse(responseHtml);
      });
    });
  };

  /* --------------------------------------------------------------------------
     INITIALIZE ALL SYSTEMS ON DOM READY
     -------------------------------------------------------------------------- */
  document.addEventListener('DOMContentLoaded', () => {
    initHeroCanvas();
    initCustomCursor();
    initSoundToggle();
    initCommandPalette();
    initHeroTerminal();
    initRoleTicker();
    initProjectWidgets();
    initAlgoExplorer();
    initArchInspector();
    initInquiryStudio();
    initFpsCounter();
    initScrollDynamics();
    initScrollAnimations();
    init3DCardTilt();
    initFilters();
    initEmailCopy();
    initQuickBioModal();
    initLiveClock();
    initThemeToggle();
    initMobileMenu();
    initBackToTop();
    initArchLiveSimulation();
    initAiAssistant();
  });
})();
