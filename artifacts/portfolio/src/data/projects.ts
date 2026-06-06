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
    description: "A premium cinematic developer portfolio featuring 3D interactions and advanced animations.",
    tech: ["React", "Three.js", "Framer Motion", "Tailwind CSS"],
    category: ["React", "Tailwind", "JavaScript"],
    features: ["Interactive 3D Hero", "Page Transitions", "Custom Cursor", "Dark Theme"],
    liveDemo: "#",
    github: "#",
    htmlCode: `<div id="canvas-container"></div>`,
    cssCode: `#canvas-container { width: 100vw; height: 100vh; }`,
    jsCode: `import { Canvas } from '@react-three/fiber';`
  },
  {
    id: "weather-app",
    name: "Weather App",
    description: "A beautiful weather dashboard with real-time updates and dynamic backgrounds based on conditions.",
    tech: ["HTML", "CSS", "JavaScript"],
    category: ["HTML", "CSS", "JavaScript"],
    features: ["Real-time Data", "Geolocation", "Dynamic UI"],
    liveDemo: "#",
    github: "#",
    htmlCode: `<div class="weather-card">...</div>`,
    cssCode: `.weather-card { background: rgba(0,0,0,0.5); backdrop-filter: blur(10px); }`,
    jsCode: `fetch('api.weather.com').then(...)`
  },
  {
    id: "todo-app",
    name: "Todo App",
    description: "A minimalist task management tool with drag-and-drop ordering and local storage sync.",
    tech: ["React", "Tailwind CSS"],
    category: ["React", "Tailwind"],
    features: ["Drag and Drop", "Local Storage", "Theme Toggle"],
    liveDemo: "#",
    github: "#",
    htmlCode: `<ul id="todo-list"></ul>`,
    cssCode: `li { cursor: grab; }`,
    jsCode: `const [todos, setTodos] = useState([]);`
  },
  {
    id: "landing-page-collection",
    name: "Landing Page Collection",
    description: "A curated set of high-converting landing page templates built with modern frontend tools.",
    tech: ["HTML", "Tailwind CSS"],
    category: ["HTML", "Tailwind"],
    features: ["Responsive Design", "A/B Testing Ready", "High Performance"],
    liveDemo: "#",
    github: "#",
    htmlCode: `<section class="hero">...</section>`,
    cssCode: `@tailwind base; @tailwind components; @tailwind utilities;`,
    jsCode: `console.log('Ready');`
  },
  {
    id: "ecommerce-frontend",
    name: "E-commerce Frontend",
    description: "A complete storefront interface with product filtering, cart management, and checkout flows.",
    tech: ["React", "JavaScript", "CSS"],
    category: ["React", "JavaScript", "CSS"],
    features: ["Shopping Cart", "Product Filtering", "Checkout Flow"],
    liveDemo: "#",
    github: "#",
    htmlCode: `<div id="root"></div>`,
    cssCode: `.cart-modal { transform: translateX(100%); }`,
    jsCode: `const addToCart = (product) => { ... }`
  },
  {
    id: "component-library",
    name: "Component Library",
    description: "An open-source UI kit for building fast, accessible web applications.",
    tech: ["React", "Tailwind CSS"],
    category: ["React", "Tailwind"],
    features: ["Accessible", "Customizable", "Documentation"],
    liveDemo: "#",
    github: "#",
    htmlCode: `<button class="btn-primary">Click Me</button>`,
    cssCode: `.btn-primary { background-color: var(--accent); }`,
    jsCode: `export const Button = ({ children }) => <button>{children}</button>;`
  }
];
