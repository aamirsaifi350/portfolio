export interface Project {
  id: string;
  name: string;
  description: string;
  tech: string[];
  category: string[];
  features: string[];
  liveDemo: string;
  github: string;
  htmlCode: string;
  cssCode: string;
  jsCode: string;
}

export const projects: Project[] = [
  {
    id: "portfolio-website",
    name: "Portfolio Website",
    description: "A premium cinematic developer portfolio featuring a 3D interactive cube hero, custom cursor, GSAP animations, and cinematic dark aesthetic built with React and Three.js.",
    tech: ["React", "Three.js", "Framer Motion", "Tailwind CSS", "GSAP"],
    category: ["React", "Tailwind", "JavaScript"],
    features: [
      "Interactive 3D rotating cube with six project faces",
      "WebGL-powered rendering with CSS fallback",
      "Custom spring-physics cursor (desktop only)",
      "GSAP-animated oversized typography",
      "Smooth page transitions with Framer Motion",
      "Fully responsive — tablet and mobile optimized",
    ],
    liveDemo: "#",
    github: "#",
    htmlCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Portfolio — Frontend Developer</title>
  <link rel="stylesheet" href="style.css" />
</head>
<body>
  <div id="root"></div>

  <!-- Loading Screen -->
  <div id="loading-screen">
    <h1 class="loading-title">PORTFOLIO</h1>
    <div class="loading-bar-track">
      <div class="loading-bar"></div>
    </div>
  </div>

  <!-- Main App Mount -->
  <script type="module" src="/src/main.tsx"></script>
</body>
</html>`,
    cssCode: `/* ── Reset & Base ── */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

:root {
  --bg:      #050505;
  --surface: #0E0E0E;
  --text:    #FFFFFF;
  --muted:   #888888;
  --accent:  #FF3B30;
  --border:  rgba(255,255,255,0.08);
  --font-heading: 'Nothing You Could Do', cursive;
  --font-sub:     'Allura', cursive;
  --font-body:    'Tenali Ramakrishna', sans-serif;
  --font-mono:    'JetBrains Mono', monospace;
}

html { scroll-behavior: smooth; }

body {
  background: var(--bg);
  color: var(--text);
  font-family: var(--font-body);
  cursor: none;
  overflow-x: hidden;
}

/* ── Loading Screen ── */
#loading-screen {
  position: fixed; inset: 0; z-index: 9999;
  background: #000;
  display: flex; flex-direction: column;
  align-items: center; justify-content: center;
  gap: 2rem;
  animation: fadeOut 0.8s ease 2.5s forwards;
}

.loading-title {
  font-family: var(--font-heading);
  font-size: clamp(3rem, 10vw, 7rem);
  letter-spacing: 0.15em;
  color: #fff;
}

.loading-bar-track {
  width: 260px; height: 2px;
  background: rgba(255,255,255,0.08);
  overflow: hidden;
}

.loading-bar {
  height: 100%;
  background: var(--accent);
  animation: loadBar 1.8s ease 0.3s forwards;
  width: 0;
}

@keyframes loadBar { to { width: 100%; } }
@keyframes fadeOut { to { opacity: 0; pointer-events: none; } }`,
    jsCode: `import { createRoot } from 'react-dom/client';
import { Canvas } from '@react-three/fiber';
import { Float, Edges, Text } from '@react-three/drei';
import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';

// ── 3D Cube Component ──
function ProjectCube({ projects }) {
  const meshRef = useRef(null);
  const [hovered, setHovered] = useState(null);

  useFrame((state, delta) => {
    if (!meshRef.current) return;
    if (hovered === null) {
      meshRef.current.rotation.x += delta * 0.2;
      meshRef.current.rotation.y += delta * 0.3;
    }
    // Parallax from mouse
    const { pointer, viewport } = state;
    meshRef.current.position.x = THREE.MathUtils.lerp(
      meshRef.current.position.x,
      (pointer.x * viewport.width) / 10,
      0.05
    );
  });

  return (
    <Float speed={2} floatIntensity={1}>
      <mesh
        ref={meshRef}
        onPointerOver={(e) => setHovered(Math.floor(e.faceIndex / 2))}
        onPointerOut={() => setHovered(null)}
      >
        <boxGeometry args={[2, 2, 2]} />
        <Edges color="#FF3B30" />
      </mesh>
    </Float>
  );
}

// ── GSAP Typography Animation ──
function animateHeroText() {
  gsap.fromTo(
    '.gsap-text',
    { y: 100, opacity: 0 },
    { y: 0, opacity: 1, duration: 1.5, stagger: 0.2, ease: 'power4.out' }
  );
}`,
  },
  {
    id: "weather-app",
    name: "Weather App",
    description: "A beautiful real-time weather dashboard with dynamic backgrounds, geolocation support, 5-day forecasts, and smooth weather condition animations built with vanilla JavaScript.",
    tech: ["HTML", "CSS", "JavaScript", "API"],
    category: ["HTML", "CSS", "JavaScript"],
    features: [
      "Real-time weather data from OpenWeather API",
      "Geolocation auto-detection",
      "Dynamic backgrounds based on weather condition",
      "5-day hourly forecast display",
      "Search any city worldwide",
      "Wind speed, humidity, UV index display",
    ],
    liveDemo: "#",
    github: "#",
    htmlCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Weather App</title>
  <link rel="stylesheet" href="style.css" />
</head>
<body>
  <div class="app">
    <div class="search-bar">
      <input
        type="text"
        id="search-input"
        placeholder="Enter city name..."
        autocomplete="off"
      />
      <button id="search-btn">
        <svg width="18" height="18" viewBox="0 0 24 24"
          fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.35-4.35" />
        </svg>
      </button>
    </div>

    <div class="weather-card" id="weather-card">
      <div class="weather-main">
        <p class="city-name" id="city">New York</p>
        <p class="temperature" id="temp">24°</p>
        <p class="condition" id="condition">Partly Cloudy</p>
      </div>

      <img class="weather-icon" id="icon"
        src="icons/cloud.svg" alt="weather" />

      <div class="weather-details">
        <div class="detail">
          <span class="label">Humidity</span>
          <span class="value" id="humidity">72%</span>
        </div>
        <div class="detail">
          <span class="label">Wind</span>
          <span class="value" id="wind">14 km/h</span>
        </div>
        <div class="detail">
          <span class="label">Feels Like</span>
          <span class="value" id="feels">21°</span>
        </div>
      </div>
    </div>

    <div class="forecast" id="forecast"></div>
  </div>

  <script src="app.js"></script>
</body>
</html>`,
    cssCode: `/* ── Base ── */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

body {
  min-height: 100vh;
  font-family: 'Inter', sans-serif;
  background: linear-gradient(135deg, #0f0c29, #302b63, #24243e);
  color: #fff;
  display: flex; align-items: center; justify-content: center;
  padding: 1rem;
}

/* ── App Container ── */
.app {
  width: 100%;
  max-width: 380px;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

/* ── Search Bar ── */
.search-bar {
  display: flex;
  background: rgba(255,255,255,0.08);
  border: 1px solid rgba(255,255,255,0.12);
  border-radius: 50px;
  overflow: hidden;
  backdrop-filter: blur(10px);
}

.search-bar input {
  flex: 1;
  padding: 0.75rem 1.25rem;
  background: none; border: none; outline: none;
  color: #fff; font-size: 0.875rem;
}

.search-bar input::placeholder { color: rgba(255,255,255,0.4); }

.search-bar button {
  padding: 0.75rem 1.25rem;
  background: rgba(255,255,255,0.08);
  border: none; color: #fff; cursor: pointer;
  transition: background 0.3s;
}

.search-bar button:hover { background: rgba(255,255,255,0.16); }

/* ── Weather Card ── */
.weather-card {
  background: rgba(255,255,255,0.06);
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 24px;
  padding: 2rem;
  backdrop-filter: blur(20px);
  text-align: center;
  position: relative;
  overflow: hidden;
  transition: background 1s ease;
}

.city-name {
  font-size: 0.75rem;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.6);
  margin-bottom: 0.25rem;
}

.temperature {
  font-size: 5.5rem;
  font-weight: 200;
  line-height: 1;
  margin: 0.5rem 0;
  letter-spacing: -0.02em;
}

.condition {
  font-size: 0.875rem;
  color: rgba(255,255,255,0.7);
  margin-bottom: 1.5rem;
}

.weather-icon {
  width: 80px;
  height: 80px;
  margin: 0 auto 1.5rem;
  filter: drop-shadow(0 0 20px rgba(255,255,255,0.2));
}

.weather-details {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  border-top: 1px solid rgba(255,255,255,0.08);
  padding-top: 1.5rem;
}

.detail { display: flex; flex-direction: column; gap: 0.25rem; }
.label { font-size: 0.65rem; letter-spacing: 0.1em; text-transform: uppercase; color: rgba(255,255,255,0.4); }
.value { font-size: 1rem; font-weight: 600; }`,
    jsCode: `const API_KEY = 'YOUR_API_KEY_HERE';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

const searchInput = document.getElementById('search-input');
const searchBtn   = document.getElementById('search-btn');
const cityEl      = document.getElementById('city');
const tempEl      = document.getElementById('temp');
const condEl      = document.getElementById('condition');
const humEl       = document.getElementById('humidity');
const windEl      = document.getElementById('wind');
const feelsEl     = document.getElementById('feels');

// ── Fetch Weather ──
async function fetchWeather(city) {
  try {
    const res = await fetch(
      \`\${BASE_URL}/weather?q=\${city}&appid=\${API_KEY}&units=metric\`
    );
    if (!res.ok) throw new Error('City not found');
    const data = await res.json();
    renderWeather(data);
  } catch (err) {
    alert(err.message);
  }
}

// ── Render to DOM ──
function renderWeather(data) {
  cityEl.textContent  = \`\${data.name}, \${data.sys.country}\`;
  tempEl.textContent  = \`\${Math.round(data.main.temp)}°\`;
  condEl.textContent  = data.weather[0].description;
  humEl.textContent   = \`\${data.main.humidity}%\`;
  windEl.textContent  = \`\${Math.round(data.wind.speed)} km/h\`;
  feelsEl.textContent = \`\${Math.round(data.main.feels_like)}°\`;

  // Dynamic background based on condition
  const id = data.weather[0].id;
  const card = document.getElementById('weather-card');
  if (id >= 200 && id < 300) {
    card.style.background = 'rgba(63,63,120,0.3)'; // Thunderstorm
  } else if (id >= 600 && id < 700) {
    card.style.background = 'rgba(200,220,255,0.1)'; // Snow
  } else if (id === 800) {
    card.style.background = 'rgba(255,160,50,0.1)';  // Clear
  } else {
    card.style.background = 'rgba(255,255,255,0.06)';
  }
}

// ── Geolocation ──
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(async ({ coords }) => {
      const res = await fetch(
        \`\${BASE_URL}/weather?lat=\${coords.latitude}&lon=\${coords.longitude}&appid=\${API_KEY}&units=metric\`
      );
      const data = await res.json();
      renderWeather(data);
    });
  }
}

// ── Events ──
searchBtn.addEventListener('click', () => {
  const city = searchInput.value.trim();
  if (city) fetchWeather(city);
});

searchInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    const city = searchInput.value.trim();
    if (city) fetchWeather(city);
  }
});

// ── Init ──
getLocation();`,
  },
  {
    id: "todo-app",
    name: "Todo App",
    description: "A polished task management application with drag-and-drop reordering, categories, priority levels, local storage persistence, and smooth React animations.",
    tech: ["React", "Tailwind CSS", "JavaScript"],
    category: ["React", "Tailwind", "JavaScript"],
    features: [
      "Add, edit, and delete tasks",
      "Drag-and-drop task reordering",
      "Priority levels — High, Medium, Low",
      "Filter by status: All, Active, Completed",
      "Local storage persistence",
      "Smooth Framer Motion transitions",
    ],
    liveDemo: "#",
    github: "#",
    htmlCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Todo App</title>
  <link rel="stylesheet" href="style.css" />
</head>
<body>
  <div class="app">
    <header class="header">
      <h1>Tasks</h1>
      <p class="subtitle">
        <span id="remaining">0</span> remaining
      </p>
    </header>

    <div class="add-task">
      <input
        type="text"
        id="task-input"
        placeholder="Add a new task..."
      />
      <select id="priority-select">
        <option value="high">High</option>
        <option value="medium" selected>Medium</option>
        <option value="low">Low</option>
      </select>
      <button id="add-btn">Add</button>
    </div>

    <div class="filters">
      <button class="filter-btn active" data-filter="all">All</button>
      <button class="filter-btn" data-filter="active">Active</button>
      <button class="filter-btn" data-filter="done">Done</button>
    </div>

    <ul id="todo-list"></ul>

    <footer class="footer">
      <button id="clear-done">Clear Completed</button>
    </footer>
  </div>
  <script src="app.js"></script>
</body>
</html>`,
    cssCode: `*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

body {
  min-height: 100vh;
  background: #050505;
  color: #fff;
  font-family: 'Inter', sans-serif;
  display: flex; align-items: flex-start; justify-content: center;
  padding: 3rem 1rem;
}

.app { width: 100%; max-width: 500px; }

.header { margin-bottom: 2rem; }
.header h1 { font-size: 2.5rem; font-weight: 700; letter-spacing: -0.02em; }
.subtitle { color: #888; font-size: 0.875rem; margin-top: 0.25rem; }

/* ── Add Task ── */
.add-task {
  display: flex; gap: 0.5rem;
  margin-bottom: 1rem;
}

.add-task input {
  flex: 1;
  background: #0E0E0E;
  border: 1px solid rgba(255,255,255,0.08);
  color: #fff;
  padding: 0.75rem 1rem;
  font-size: 0.875rem;
  outline: none;
  transition: border-color 0.3s;
}
.add-task input:focus { border-color: #FF3B30; }

.add-task select {
  background: #0E0E0E;
  border: 1px solid rgba(255,255,255,0.08);
  color: #888; padding: 0 0.75rem;
  font-size: 0.75rem;
  outline: none; cursor: pointer;
}

#add-btn {
  padding: 0.75rem 1.25rem;
  background: #FF3B30; border: none;
  color: #fff; font-size: 0.75rem;
  font-weight: 700; letter-spacing: 0.1em;
  text-transform: uppercase; cursor: pointer;
  transition: background 0.3s;
}
#add-btn:hover { background: #cc2f26; }

/* ── Filters ── */
.filters { display: flex; gap: 0.5rem; margin-bottom: 1.5rem; }
.filter-btn {
  padding: 0.4rem 1rem;
  background: transparent;
  border: 1px solid rgba(255,255,255,0.08);
  color: #888; font-size: 0.75rem;
  letter-spacing: 0.1em; text-transform: uppercase;
  cursor: pointer; transition: all 0.3s;
}
.filter-btn.active, .filter-btn:hover {
  border-color: #FF3B30; color: #FF3B30;
}

/* ── Todo List ── */
#todo-list { list-style: none; display: flex; flex-direction: column; gap: 0.5rem; }

.todo-item {
  display: flex; align-items: center; gap: 0.75rem;
  background: #0E0E0E;
  border: 1px solid rgba(255,255,255,0.06);
  padding: 0.875rem 1rem;
  transition: border-color 0.3s;
  animation: slideIn 0.3s ease;
}
.todo-item:hover { border-color: rgba(255,255,255,0.15); }
.todo-item.done .task-text { text-decoration: line-through; color: #555; }

.priority-dot {
  width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0;
}
.priority-high   { background: #ef4444; }
.priority-medium { background: #f59e0b; }
.priority-low    { background: #22c55e; }

.task-text { flex: 1; font-size: 0.875rem; }

.delete-btn {
  background: none; border: none; color: #444;
  cursor: pointer; font-size: 1rem; transition: color 0.3s;
}
.delete-btn:hover { color: #FF3B30; }

@keyframes slideIn {
  from { opacity: 0; transform: translateY(-8px); }
  to   { opacity: 1; transform: translateY(0); }
}`,
    jsCode: `let todos = JSON.parse(localStorage.getItem('todos') ?? '[]');
let filter = 'all';

function saveTodos() {
  localStorage.setItem('todos', JSON.stringify(todos));
}

function render() {
  const list = document.getElementById('todo-list');
  const remaining = document.getElementById('remaining');

  const visible = todos.filter(t => {
    if (filter === 'active') return !t.done;
    if (filter === 'done')   return  t.done;
    return true;
  });

  remaining.textContent = todos.filter(t => !t.done).length;

  list.innerHTML = '';
  visible.forEach(todo => {
    const li = document.createElement('li');
    li.className = \`todo-item\${todo.done ? ' done' : ''}\`;
    li.innerHTML = \`
      <span class="priority-dot priority-\${todo.priority}"></span>
      <span class="task-text" data-id="\${todo.id}">\${todo.text}</span>
      <button class="delete-btn" data-id="\${todo.id}">✕</button>
    \`;

    // Toggle done on text click
    li.querySelector('.task-text').addEventListener('click', () => {
      const t = todos.find(t => t.id === todo.id);
      if (t) { t.done = !t.done; saveTodos(); render(); }
    });

    // Delete
    li.querySelector('.delete-btn').addEventListener('click', () => {
      todos = todos.filter(t => t.id !== todo.id);
      saveTodos(); render();
    });

    list.appendChild(li);
  });
}

// ── Add Task ──
document.getElementById('add-btn').addEventListener('click', () => {
  const input    = document.getElementById('task-input');
  const priority = document.getElementById('priority-select').value;
  const text = input.value.trim();
  if (!text) return;

  todos.push({ id: Date.now().toString(), text, priority, done: false });
  input.value = '';
  saveTodos(); render();
});

// ── Filter Buttons ──
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    filter = btn.dataset.filter;
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    render();
  });
});

// ── Clear Completed ──
document.getElementById('clear-done').addEventListener('click', () => {
  todos = todos.filter(t => !t.done);
  saveTodos(); render();
});

render();`,
  },
  {
    id: "landing-page-collection",
    name: "Landing Page Collection",
    description: "A curated set of five high-converting landing page templates featuring hero sections, feature grids, testimonials, pricing tables, and CTA sections — all built with Tailwind CSS.",
    tech: ["HTML", "Tailwind CSS", "JavaScript"],
    category: ["HTML", "Tailwind"],
    features: [
      "5 unique landing page templates",
      "Fully responsive from 320px to 4K",
      "Optimized for conversion — clear CTAs",
      "Inter + custom display font pairing",
      "Scroll-reveal animations with Intersection Observer",
      "Dark and light variants for each template",
    ],
    liveDemo: "#",
    github: "#",
    htmlCode: `<!DOCTYPE html>
<html lang="en" class="scroll-smooth">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>SaaS Landing Page</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet" />
</head>
<body class="bg-neutral-950 text-white font-[Inter]">

  <!-- Navbar -->
  <nav class="fixed top-0 inset-x-0 z-50 flex items-center justify-between
              px-6 py-4 bg-neutral-950/90 backdrop-blur-md border-b border-white/5">
    <span class="font-bold text-lg tracking-tight">YourBrand<span class="text-red-500">.</span></span>
    <div class="hidden md:flex items-center gap-8 text-sm text-neutral-400">
      <a href="#features" class="hover:text-white transition">Features</a>
      <a href="#pricing"  class="hover:text-white transition">Pricing</a>
      <a href="#faq"      class="hover:text-white transition">FAQ</a>
    </div>
    <a href="#cta" class="px-5 py-2 bg-red-500 text-white text-sm font-semibold
                          rounded hover:bg-red-400 transition">Get Started</a>
  </nav>

  <!-- Hero -->
  <section class="min-h-screen flex flex-col items-center justify-center
                  text-center px-6 pt-20 relative overflow-hidden">
    <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(239,68,68,0.05)_0%,transparent_70%)]" />
    <span class="inline-block px-4 py-1 text-xs tracking-widest uppercase
                 border border-red-500/30 text-red-400 mb-8 rounded-full">
      Now in Public Beta
    </span>
    <h1 class="text-5xl md:text-7xl font-bold leading-tight max-w-3xl
               bg-gradient-to-b from-white to-neutral-400 bg-clip-text text-transparent">
      Ship Faster Than<br/>You Ever Have
    </h1>
    <p class="mt-6 text-lg text-neutral-400 max-w-xl">
      The all-in-one platform for modern teams to build, deploy,
      and scale their products without friction.
    </p>
    <div class="mt-10 flex gap-4 flex-wrap justify-center">
      <a href="#cta" class="px-8 py-3.5 bg-red-500 text-white font-semibold
                            rounded hover:bg-red-400 transition">
        Start for Free →
      </a>
      <a href="#features" class="px-8 py-3.5 border border-white/10 text-white
                                 font-semibold rounded hover:border-white/30 transition">
        See Features
      </a>
    </div>
  </section>

</body>
</html>`,
    cssCode: `/* ── Tailwind Config Overrides ── */
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  html { scroll-behavior: smooth; }
  body { @apply antialiased; }
}

@layer components {
  /* Reusable section heading */
  .section-heading {
    @apply text-sm uppercase tracking-widest text-red-400 mb-4 font-bold;
  }

  .section-title {
    @apply text-3xl md:text-5xl font-bold leading-tight text-white;
  }

  .section-subtitle {
    @apply text-neutral-400 text-lg mt-4 max-w-xl;
  }

  /* Feature card */
  .feature-card {
    @apply p-6 bg-neutral-900 border border-white/5 rounded-xl
           hover:border-red-500/20 transition-all duration-300
           hover:-translate-y-1;
  }

  /* Gradient text */
  .gradient-text {
    @apply bg-gradient-to-r from-white to-neutral-400
           bg-clip-text text-transparent;
  }
}

@layer utilities {
  /* Scroll reveal */
  .reveal {
    @apply opacity-0 translate-y-8 transition-all duration-700;
  }
  .reveal.visible {
    @apply opacity-100 translate-y-0;
  }
}`,
    jsCode: `// ── Scroll Reveal ──
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, index * 100);
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
);

revealElements.forEach(el => revealObserver.observe(el));

// ── Sticky Navbar Shadow ──
const nav = document.querySelector('nav');
window.addEventListener('scroll', () => {
  if (window.scrollY > 20) {
    nav.classList.add('shadow-lg', 'shadow-black/50');
  } else {
    nav.classList.remove('shadow-lg', 'shadow-black/50');
  }
});

// ── Smooth Anchor Scroll ──
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    e.preventDefault();
    const target = document.querySelector(anchor.getAttribute('href'));
    target?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

// ── Pricing Toggle (Monthly / Yearly) ──
const pricingToggle = document.getElementById('pricing-toggle');
const prices = document.querySelectorAll('[data-monthly][data-yearly]');

pricingToggle?.addEventListener('change', () => {
  const yearly = pricingToggle.checked;
  prices.forEach(el => {
    el.textContent = yearly
      ? el.dataset.yearly
      : el.dataset.monthly;
  });
});`,
  },
  {
    id: "ecommerce-frontend",
    name: "E-commerce Frontend",
    description: "A complete storefront UI with product grid, advanced filtering, animated cart sidebar, checkout flow, and responsive design — built with React and Tailwind CSS.",
    tech: ["React", "JavaScript", "CSS", "Tailwind CSS"],
    category: ["React", "JavaScript", "CSS"],
    features: [
      "Product grid with category and price filters",
      "Animated cart sidebar with quantity controls",
      "Product quick-view modal",
      "Persistent cart via localStorage",
      "Checkout flow with form validation",
      "Mobile-first responsive design",
    ],
    liveDemo: "#",
    github: "#",
    htmlCode: `<!-- Product Card Component -->
<div class="product-card" data-id="1">
  <div class="product-card__image-wrap">
    <img
      class="product-card__img"
      src="/images/product-1.jpg"
      alt="Premium Sneaker"
      loading="lazy"
    />
    <button class="product-card__wishlist" aria-label="Add to wishlist">
      <svg width="18" height="18" viewBox="0 0 24 24"
        fill="none" stroke="currentColor" stroke-width="2">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06
                 a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78
                 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
      </svg>
    </button>
    <div class="product-card__badge">New</div>
  </div>

  <div class="product-card__info">
    <p class="product-card__category">Footwear</p>
    <h3 class="product-card__name">Premium Sneaker Pro</h3>
    <div class="product-card__meta">
      <span class="product-card__price">$129.00</span>
      <span class="product-card__rating">★ 4.8</span>
    </div>
    <button class="product-card__btn" data-id="1">Add to Cart</button>
  </div>
</div>

<!-- Cart Sidebar -->
<div class="cart-sidebar" id="cart-sidebar">
  <div class="cart-sidebar__header">
    <h2>Your Cart</h2>
    <button class="cart-sidebar__close" id="cart-close">✕</button>
  </div>
  <div class="cart-sidebar__items" id="cart-items"></div>
  <div class="cart-sidebar__footer">
    <div class="cart-total">
      <span>Total</span>
      <span id="cart-total">$0.00</span>
    </div>
    <button class="checkout-btn">Proceed to Checkout</button>
  </div>
</div>`,
    cssCode: `.product-card {
  background: #0E0E0E;
  border: 1px solid rgba(255,255,255,0.06);
  overflow: hidden;
  transition: transform 0.4s, border-color 0.4s;
}
.product-card:hover {
  transform: translateY(-4px);
  border-color: rgba(255,255,255,0.15);
}

.product-card__image-wrap {
  position: relative;
  aspect-ratio: 1;
  overflow: hidden;
  background: #111;
}

.product-card__img {
  width: 100%; height: 100%;
  object-fit: cover;
  transition: transform 0.6s ease;
}
.product-card:hover .product-card__img { transform: scale(1.05); }

.product-card__wishlist {
  position: absolute; top: 0.75rem; right: 0.75rem;
  width: 36px; height: 36px;
  background: rgba(0,0,0,0.6);
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  color: #fff; cursor: pointer;
  transition: background 0.3s, color 0.3s;
}
.product-card__wishlist:hover { background: #FF3B30; border-color: #FF3B30; }

.product-card__badge {
  position: absolute; top: 0.75rem; left: 0.75rem;
  padding: 0.2rem 0.6rem;
  background: #FF3B30; color: #fff;
  font-size: 0.65rem; letter-spacing: 0.1em; text-transform: uppercase;
}

.product-card__info { padding: 1.25rem; }
.product-card__category {
  font-size: 0.65rem; letter-spacing: 0.2em;
  text-transform: uppercase; color: #FF3B30;
  margin-bottom: 0.4rem;
}
.product-card__name {
  font-size: 0.95rem; font-weight: 600;
  color: #fff; margin-bottom: 0.75rem;
  line-height: 1.3;
}
.product-card__meta { display: flex; align-items: center; justify-content: space-between; margin-bottom: 1rem; }
.product-card__price { font-size: 1.1rem; font-weight: 700; color: #fff; }
.product-card__rating { font-size: 0.75rem; color: #f59e0b; }

.product-card__btn {
  width: 100%; padding: 0.75rem;
  background: transparent; border: 1px solid rgba(255,255,255,0.12);
  color: #fff; font-size: 0.72rem; font-weight: 600;
  letter-spacing: 0.15em; text-transform: uppercase;
  cursor: pointer; transition: all 0.3s;
}
.product-card__btn:hover { background: #FF3B30; border-color: #FF3B30; }

/* ── Cart Sidebar ── */
.cart-sidebar {
  position: fixed; top: 0; right: 0; bottom: 0;
  width: 380px; max-width: 100%;
  background: #0a0a0a;
  border-left: 1px solid rgba(255,255,255,0.08);
  transform: translateX(100%);
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 200; display: flex; flex-direction: column;
}
.cart-sidebar.open { transform: translateX(0); }`,
    jsCode: `import { useState, useReducer, useCallback } from 'react';

// ── Cart Reducer ──
function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD': {
      const existing = state.find(i => i.id === action.item.id);
      if (existing) {
        return state.map(i =>
          i.id === action.item.id
            ? { ...i, qty: i.qty + 1 }
            : i
        );
      }
      return [...state, { ...action.item, qty: 1 }];
    }
    case 'REMOVE':
      return state.filter(i => i.id !== action.id);
    case 'INCREMENT':
      return state.map(i =>
        i.id === action.id ? { ...i, qty: i.qty + 1 } : i
      );
    case 'DECREMENT':
      return state.map(i =>
        i.id === action.id && i.qty > 1
          ? { ...i, qty: i.qty - 1 }
          : i
      ).filter(i => i.qty > 0);
    case 'CLEAR':
      return [];
    default:
      return state;
  }
}

// ── Custom Hook ──
export function useCart() {
  const [items, dispatch] = useReducer(cartReducer, []);

  const addItem = useCallback((item) => {
    dispatch({ type: 'ADD', item });
  }, []);

  const removeItem = useCallback((id) => {
    dispatch({ type: 'REMOVE', id });
  }, []);

  const total = items.reduce(
    (sum, item) => sum + item.price * item.qty, 0
  );

  const count = items.reduce((sum, item) => sum + item.qty, 0);

  return { items, addItem, removeItem, total, count, dispatch };
}`,
  },
  {
    id: "component-library",
    name: "Component Library",
    description: "An open-source React component library with 40+ accessible, customizable UI components, full TypeScript support, Storybook documentation, and a built-in dark/light theming system.",
    tech: ["React", "TypeScript", "Tailwind CSS", "Storybook"],
    category: ["React", "Tailwind"],
    features: [
      "40+ production-ready components",
      "Full TypeScript support with type exports",
      "Storybook documentation with live examples",
      "WCAG 2.1 AA accessible",
      "Dark and light mode with CSS custom properties",
      "Zero runtime dependencies beyond React",
    ],
    liveDemo: "#",
    github: "#",
    htmlCode: `<!-- Button Component Usage -->
<div class="demo">
  <!-- Primary variant -->
  <button class="btn btn--primary" data-variant="primary">
    <span>Get Started</span>
    <svg class="btn__icon" viewBox="0 0 24 24">
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  </button>

  <!-- Ghost variant -->
  <button class="btn btn--ghost" data-variant="ghost">
    Learn More
  </button>

  <!-- Loading state -->
  <button class="btn btn--primary btn--loading" disabled>
    <span class="btn__spinner" role="status" aria-label="Loading">
      <span class="visually-hidden">Loading...</span>
    </span>
    Processing
  </button>
</div>

<!-- Input Component -->
<div class="input-group">
  <label class="input-label" for="email">
    Email Address
  </label>
  <div class="input-wrapper">
    <input
      class="input"
      type="email"
      id="email"
      placeholder="you@example.com"
      autocomplete="email"
    />
    <span class="input-icon">@</span>
  </div>
  <p class="input-hint">We'll never share your email.</p>
</div>`,
    cssCode: `/* ── Design Tokens ── */
:root {
  --clr-bg:        #050505;
  --clr-surface:   #0E0E0E;
  --clr-text:      #FFFFFF;
  --clr-muted:     #888888;
  --clr-accent:    #FF3B30;
  --clr-border:    rgba(255,255,255,0.08);
  --clr-success:   #22C55E;
  --clr-warning:   #F59E0B;
  --clr-error:     #EF4444;

  --radius-sm: 2px;
  --radius-md: 4px;
  --radius-lg: 8px;

  --shadow-sm: 0 1px 3px rgba(0,0,0,0.5);
  --shadow-md: 0 4px 12px rgba(0,0,0,0.6);
  --shadow-glow: 0 0 20px rgba(255,59,48,0.25);

  --transition: 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}

/* ── Button Base ── */
.btn {
  position: relative;
  display: inline-flex; align-items: center; gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  font-size: 0.8125rem; font-weight: 600;
  letter-spacing: 0.05em; text-transform: uppercase;
  border: none; border-radius: var(--radius-md);
  cursor: pointer; transition: all var(--transition);
  white-space: nowrap;
  -webkit-user-select: none; user-select: none;
}

.btn:focus-visible {
  outline: 2px solid var(--clr-accent);
  outline-offset: 2px;
}

.btn--primary {
  background: var(--clr-accent);
  color: #fff;
  box-shadow: var(--shadow-sm);
}
.btn--primary:hover:not(:disabled) {
  background: #cc2f26;
  box-shadow: var(--shadow-glow);
  transform: translateY(-1px);
}

.btn--ghost {
  background: transparent;
  color: var(--clr-text);
  border: 1px solid var(--clr-border);
}
.btn--ghost:hover:not(:disabled) { border-color: rgba(255,255,255,0.3); }

.btn:disabled { opacity: 0.45; cursor: not-allowed; }

.btn__icon { width: 1em; height: 1em; stroke: currentColor; fill: none; stroke-width: 2; }

/* ── Loading Spinner ── */
.btn__spinner {
  width: 1em; height: 1em;
  border: 2px solid rgba(255,255,255,0.25);
  border-top-color: #fff;
  border-radius: 50%;
  animation: spin 0.65s linear infinite;
}
@keyframes spin { to { transform: rotate(360deg); } }

/* ── Input ── */
.input-group { display: flex; flex-direction: column; gap: 0.375rem; }
.input-label { font-size: 0.75rem; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; color: var(--clr-muted); }
.input-wrapper { position: relative; }
.input {
  width: 100%;
  padding: 0.75rem 2.5rem 0.75rem 1rem;
  background: var(--clr-surface); border: 1px solid var(--clr-border);
  color: var(--clr-text); font-size: 0.875rem;
  border-radius: var(--radius-md); outline: none;
  transition: border-color var(--transition), box-shadow var(--transition);
}
.input:focus { border-color: var(--clr-accent); box-shadow: 0 0 0 3px rgba(255,59,48,0.15); }
.input-icon { position: absolute; right: 0.875rem; top: 50%; transform: translateY(-50%); color: var(--clr-muted); font-size: 0.875rem; }
.input-hint { font-size: 0.7rem; color: var(--clr-muted); }`,
    jsCode: `// ── Button Component (TypeScript) ──
import { forwardRef, ButtonHTMLAttributes } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  // Base classes
  \`relative inline-flex items-center justify-center gap-2
   px-5 py-2.5 text-sm font-semibold tracking-wide uppercase
   border rounded transition-all duration-200
   focus-visible:outline-none focus-visible:ring-2
   focus-visible:ring-accent focus-visible:ring-offset-2
   disabled:opacity-40 disabled:cursor-not-allowed\`,
  {
    variants: {
      variant: {
        primary:     'bg-accent border-accent text-white hover:bg-accent/85 hover:shadow-[0_0_20px_rgba(255,59,48,0.3)]',
        ghost:       'bg-transparent border-border text-foreground hover:border-foreground',
        destructive: 'bg-transparent border-red-500 text-red-500 hover:bg-red-500 hover:text-white',
        link:        'border-transparent text-accent hover:underline',
      },
      size: {
        sm:   'px-3 py-1.5 text-xs',
        md:   'px-5 py-2.5 text-sm',
        lg:   'px-7 py-3.5 text-base',
        icon: 'p-2.5',
      },
    },
    defaultVariants: { variant: 'primary', size: 'md' },
  }
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, isLoading, leftIcon, rightIcon, children, disabled, ...props }, ref) => (
    <button
      ref={ref}
      disabled={disabled || isLoading}
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    >
      {isLoading ? (
        <span className="w-4 h-4 border-2 border-current/30 border-t-current rounded-full animate-spin" />
      ) : leftIcon}
      {children}
      {!isLoading && rightIcon}
    </button>
  )
);

Button.displayName = 'Button';`,
  },
];
