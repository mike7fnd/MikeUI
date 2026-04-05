// ─── Framework file content generators ────────────────────────────────────────
// Each framework returns a flat map of { 'path/to/file': 'file content' }

export type FileMap = Record<string, string>

// ─── React + Vite ─────────────────────────────────────────────────────────────
function reactViteFiles(projectName: string): FileMap {
  return {
    'package.json': JSON.stringify({
      name: projectName.toLowerCase().replace(/\s+/g, '-'),
      private: true,
      version: '0.0.0',
      type: 'module',
      scripts: { dev: 'vite', build: 'tsc && vite build', preview: 'vite preview' },
      dependencies: { react: '^18.3.1', 'react-dom': '^18.3.1' },
      devDependencies: {
        '@types/react': '^18.3.3', '@types/react-dom': '^18.3.0',
        '@vitejs/plugin-react': '^4.3.1', typescript: '^5.5.3',
        vite: '^5.4.1', tailwindcss: '^3.4.4', autoprefixer: '^10.4.19',
        postcss: '^8.4.40',
      },
    }, null, 2),

    'index.html': `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${projectName}</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>`,

    'vite.config.ts': `import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
})`,

    'tailwind.config.js': `/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: { extend: {} },
  plugins: [],
}`,

    'tsconfig.json': JSON.stringify({
      compilerOptions: {
        target: 'ES2020', useDefineForClassFields: true,
        lib: ['ES2020', 'DOM', 'DOM.Iterable'], module: 'ESNext',
        skipLibCheck: true, moduleResolution: 'bundler',
        allowImportingTsExtensions: true, isolatedModules: true,
        moduleDetection: 'force', noEmit: true, jsx: 'react-jsx',
        strict: true,
      },
      include: ['src'],
    }, null, 2),

    'src/main.tsx': `import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)`,

    'src/App.tsx': `import Navbar from './components/Navbar'
import Hero from './components/Hero'

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
    </div>
  )
}

export default App`,

    'src/index.css': `@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  font-family: Inter, system-ui, sans-serif;
  -webkit-font-smoothing: antialiased;
}`,

    'src/components/Navbar.tsx': `export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
        <span className="font-bold text-lg">${projectName}</span>
        <div className="flex items-center gap-6 text-sm font-medium text-gray-600">
          <a href="#" className="hover:text-black transition-colors">Home</a>
          <a href="#" className="hover:text-black transition-colors">About</a>
          <a href="#" className="hover:text-black transition-colors">Contact</a>
        </div>
      </div>
    </nav>
  )
}`,

    'src/components/Hero.tsx': `export default function Hero() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-24 text-center">
      <h1 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
        Welcome to <span className="text-blue-600">${projectName}</span>
      </h1>
      <p className="text-xl text-gray-500 mb-10 max-w-xl mx-auto">
        Build fast, ship faster. React + Vite + Tailwind CSS starter.
      </p>
      <button className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full transition-colors">
        Get Started
      </button>
    </section>
  )
}`,
  }
}

// ─── Next.js ──────────────────────────────────────────────────────────────────
function nextjsFiles(projectName: string): FileMap {
  return {
    'package.json': JSON.stringify({
      name: projectName.toLowerCase().replace(/\s+/g, '-'),
      version: '0.1.0',
      private: true,
      scripts: { dev: 'next dev', build: 'next build', start: 'next start', lint: 'next lint' },
      dependencies: { next: '^14.2.5', react: '^18', 'react-dom': '^18' },
      devDependencies: {
        '@types/node': '^20', '@types/react': '^18', '@types/react-dom': '^18',
        typescript: '^5', tailwindcss: '^3.4.4', autoprefixer: '^10',
        postcss: '^8',
      },
    }, null, 2),

    'next.config.ts': `import type { NextConfig } from 'next'

const nextConfig: NextConfig = {}

export default nextConfig`,

    'tailwind.config.js': `/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: { extend: {} },
  plugins: [],
}`,

    'app/layout.tsx': `import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: '${projectName}',
  description: 'Built with Next.js',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}`,

    'app/globals.css': `@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  font-family: Inter, system-ui, sans-serif;
  -webkit-font-smoothing: antialiased;
}`,

    'app/page.tsx': `import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <section className="max-w-6xl mx-auto px-6 py-24 text-center">
        <h1 className="text-5xl font-bold mb-6">
          The React Framework
        </h1>
        <p className="text-xl text-gray-500 mb-10 max-w-xl mx-auto">
          Production-grade apps with SSR, routing, and more.
        </p>
        <a href="#" className="px-8 py-3 bg-black hover:bg-gray-800 text-white font-semibold rounded-full transition-colors inline-block">
          Start Building
        </a>
      </section>
      <Footer />
    </main>
  )
}`,

    'app/about/page.tsx': `export default function About() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-20">
      <h1 className="text-4xl font-bold mb-4">About</h1>
      <p className="text-gray-600 text-lg">This is the about page of "${projectName}".</p>
    </main>
  )
}`,

    'components/Navbar.tsx': `export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
        <span className="font-bold text-lg">${projectName}</span>
        <div className="flex items-center gap-6 text-sm font-medium">
          <a href="/" className="hover:text-black transition-colors text-gray-600">Home</a>
          <a href="/about" className="hover:text-black transition-colors text-gray-600">About</a>
        </div>
      </div>
    </nav>
  )
}`,

    'components/Footer.tsx': `export default function Footer() {
  return (
    <footer className="border-t border-gray-100 py-8 text-center text-sm text-gray-400">
      © {new Date().getFullYear()} ${projectName}. Built with Next.js.
    </footer>
  )
}`,
  }
}

// ─── Vue 3 ────────────────────────────────────────────────────────────────────
function vueFiles(projectName: string): FileMap {
  return {
    'package.json': JSON.stringify({
      name: projectName.toLowerCase().replace(/\s+/g, '-'),
      version: '0.0.0',
      private: true,
      type: 'module',
      scripts: { dev: 'vite', build: 'vue-tsc && vite build', preview: 'vite preview' },
      dependencies: { vue: '^3.4.29' },
      devDependencies: {
        '@vitejs/plugin-vue': '^5.0.5', 'vue-tsc': '^2.0.21',
        typescript: '^5.4.5', vite: '^5.3.1',
        tailwindcss: '^3.4.4', autoprefixer: '^10.4.19', postcss: '^8.4.40',
      },
    }, null, 2),

    'index.html': `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${projectName}</title>
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="/src/main.ts"></script>
  </body>
</html>`,

    'vite.config.ts': `import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
})`,

    'tailwind.config.js': `/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,ts}'],
  theme: { extend: {} },
  plugins: [],
}`,

    'src/main.ts': `import { createApp } from 'vue'
import './assets/main.css'
import App from './App.vue'

createApp(App).mount('#app')`,

    'src/App.vue': `<template>
  <div class="min-h-screen bg-white">
    <TheNavbar />
    <HeroSection />
  </div>
</template>

<script setup lang="ts">
import TheNavbar from './components/TheNavbar.vue'
import HeroSection from './components/HeroSection.vue'
</script>`,

    'src/assets/main.css': `@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  font-family: Inter, system-ui, sans-serif;
  -webkit-font-smoothing: antialiased;
}`,

    'src/components/TheNavbar.vue': `<template>
  <nav class="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-gray-100">
    <div class="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
      <span class="font-bold text-lg">${projectName}</span>
      <div class="flex items-center gap-6 text-sm font-medium text-gray-600">
        <a href="#" class="hover:text-black transition-colors">Home</a>
        <a href="#" class="hover:text-black transition-colors">Features</a>
        <a href="#" class="hover:text-black transition-colors">Docs</a>
      </div>
    </div>
  </nav>
</template>`,

    'src/components/HeroSection.vue': `<template>
  <section class="max-w-6xl mx-auto px-6 py-24 text-center">
    <h1 class="text-5xl font-bold text-gray-900 mb-6">
      The Progressive Framework
    </h1>
    <p class="text-xl text-gray-500 mb-10 max-w-xl mx-auto">
      Gentle learning curve, powerful when needed.
    </p>
    <button class="px-8 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-full transition-colors">
      Try Vue
    </button>
  </section>
</template>`,
  }
}

// ─── Svelte / SvelteKit ───────────────────────────────────────────────────────
function svelteFiles(projectName: string): FileMap {
  return {
    'package.json': JSON.stringify({
      name: projectName.toLowerCase().replace(/\s+/g, '-'),
      version: '0.0.1',
      private: true,
      scripts: { dev: 'vite dev', build: 'vite build', preview: 'vite preview' },
      dependencies: {},
      devDependencies: {
        '@sveltejs/adapter-auto': '^3.0.0', '@sveltejs/kit': '^2.0.0',
        '@sveltejs/vite-plugin-svelte': '^3.0.0', svelte: '^5.0.0-next.1',
        'svelte-check': '^3.6.0', typescript: '^5.0.0', vite: '^5.0.3',
        tailwindcss: '^3.4.4', autoprefixer: '^10', postcss: '^8',
      },
    }, null, 2),

    'svelte.config.js': `import adapter from '@sveltejs/adapter-auto'
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte'

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: vitePreprocess(),
  kit: { adapter: adapter() },
}

export default config`,

    'vite.config.ts': `import { sveltekit } from '@sveltejs/kit/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [sveltekit()],
})`,

    'tailwind.config.js': `/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,svelte,ts}'],
  theme: { extend: {} },
  plugins: [],
}`,

    'src/routes/+layout.svelte': `<script>
  import '../app.css'
  import Navbar from '$lib/Navbar.svelte'
  import Footer from '$lib/Footer.svelte'
</script>

<Navbar />
<slot />
<Footer />`,

    'src/app.css': `@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  font-family: Inter, system-ui, sans-serif;
  -webkit-font-smoothing: antialiased;
}`,

    'src/routes/+page.svelte': `<section class="max-w-6xl mx-auto px-6 py-24 text-center">
  <h1 class="text-5xl font-bold mb-6">Cybernetically Enhanced Web Apps</h1>
  <p class="text-xl text-gray-500 mb-10 max-w-xl mx-auto">No virtual DOM. Truly reactive.</p>
  <a
    href="#"
    class="px-8 py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-full transition-colors inline-block"
  >
    Explore Svelte
  </a>
</section>`,

    'src/lib/Navbar.svelte': `<nav class="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-gray-100">
  <div class="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
    <span class="font-bold text-lg">${projectName}</span>
    <div class="flex items-center gap-6 text-sm font-medium text-gray-600">
      <a href="/" class="hover:text-black transition-colors">Home</a>
      <a href="/about" class="hover:text-black transition-colors">About</a>
    </div>
  </div>
</nav>`,

    'src/lib/Footer.svelte': `<footer class="border-t border-gray-100 py-8 text-center text-sm text-gray-400">
  © {new Date().getFullYear()} ${projectName}. Built with SvelteKit.
</footer>`,
  }
}

// ─── Vanilla HTML ─────────────────────────────────────────────────────────────
function htmlFiles(projectName: string): FileMap {
  return {
    'index.html': `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${projectName}</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="css/styles.css" />
  </head>
  <body class="min-h-screen bg-white font-sans antialiased">
    <nav class="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-gray-100">
      <div class="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
        <span class="font-bold text-lg">${projectName}</span>
        <div class="flex items-center gap-6 text-sm font-medium text-gray-600">
          <a href="index.html" class="hover:text-black transition-colors">Home</a>
          <a href="about.html" class="hover:text-black transition-colors">About</a>
          <a href="#contact" class="hover:text-black transition-colors">Contact</a>
        </div>
      </div>
    </nav>

    <section class="max-w-6xl mx-auto px-6 py-24 text-center">
      <h1 class="text-5xl font-bold text-gray-900 mb-6">Hello, World!</h1>
      <p class="text-xl text-gray-500 mb-10 max-w-xl mx-auto">
        A clean HTML starter with Tailwind CSS. No frameworks, just fast.
      </p>
      <a href="#" class="px-8 py-3 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-full transition-colors inline-block">
        Get Started
      </a>
    </section>

    <script src="js/main.js"></script>
  </body>
</html>`,

    'about.html': `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>About · ${projectName}</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="css/styles.css" />
  </head>
  <body class="min-h-screen bg-white font-sans antialiased">
    <main class="max-w-4xl mx-auto px-6 py-20">
      <h1 class="text-4xl font-bold mb-4">About</h1>
      <p class="text-gray-600 text-lg">This is the about page of ${projectName}.</p>
      <a href="index.html" class="mt-6 inline-block text-red-500 hover:underline">← Back home</a>
    </main>
    <script src="js/main.js"></script>
  </body>
</html>`,

    'css/styles.css': `/* Custom styles for ${projectName} */
:root {
  --color-primary: #ef4444;
}

* {
  box-sizing: border-box;
}

body {
  font-family: Inter, system-ui, -apple-system, sans-serif;
  -webkit-font-smoothing: antialiased;
}`,

    'js/main.js': `// ${projectName} - main script
console.log('${projectName} loaded!')

document.addEventListener('DOMContentLoaded', () => {
  // Your JavaScript here
})`,
  }
}

// ─── Astro ────────────────────────────────────────────────────────────────────
function astroFiles(projectName: string): FileMap {
  return {
    'package.json': JSON.stringify({
      name: projectName.toLowerCase().replace(/\s+/g, '-'),
      type: 'module',
      version: '0.0.1',
      scripts: { dev: 'astro dev', start: 'astro dev', build: 'astro build', preview: 'astro preview', astro: 'astro' },
      dependencies: { astro: '^4.11.0', '@astrojs/tailwind': '^5.1.0', tailwindcss: '^3.4.4' },
    }, null, 2),

    'astro.config.mjs': `import { defineConfig } from 'astro/config'
import tailwind from '@astrojs/tailwind'

export default defineConfig({
  integrations: [tailwind()],
})`,

    'tailwind.config.js': `/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,ts}'],
  theme: { extend: {} },
  plugins: [],
}`,

    'src/layouts/BaseLayout.astro': `---
interface Props {
  title: string
}
const { title } = Astro.props
---
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>{title}</title>
  </head>
  <body class="min-h-screen bg-white font-sans antialiased">
    <slot />
  </body>
</html>`,

    'src/pages/index.astro': `---
import BaseLayout from '../layouts/BaseLayout.astro'
import Navbar from '../components/Navbar.astro'
import Card from '../components/Card.astro'
---
<BaseLayout title="${projectName}">
  <Navbar />
  <section class="max-w-6xl mx-auto px-6 py-24 text-center">
    <h1 class="text-5xl font-bold text-gray-900 mb-6">Ship Less JavaScript</h1>
    <p class="text-xl text-gray-500 mb-10 max-w-xl mx-auto">
      Content-focused. SEO-friendly. Blazing fast.
    </p>
    <a href="#" class="px-8 py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-full transition-colors inline-block">
      Explore Astro
    </a>
  </section>
  <div class="max-w-6xl mx-auto px-6 pb-20 grid grid-cols-2 gap-6">
    <Card title="Islands Architecture" body="Only hydrate interactive components." />
    <Card title="Framework Agnostic" body="Use React, Vue, Svelte, or none at all." />
  </div>
</BaseLayout>`,

    'src/pages/about.astro': `---
import BaseLayout from '../layouts/BaseLayout.astro'
---
<BaseLayout title="About · ${projectName}">
  <main class="max-w-4xl mx-auto px-6 py-20">
    <h1 class="text-4xl font-bold mb-4">About</h1>
    <p class="text-gray-600 text-lg">This is the about page of ${projectName}.</p>
  </main>
</BaseLayout>`,

    'src/components/Navbar.astro': `<nav class="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-gray-100">
  <div class="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
    <span class="font-bold text-lg">${projectName}</span>
    <div class="flex items-center gap-6 text-sm font-medium text-gray-600">
      <a href="/" class="hover:text-black transition-colors">Home</a>
      <a href="/about" class="hover:text-black transition-colors">About</a>
    </div>
  </div>
</nav>`,

    'src/components/Card.astro': `---
interface Props {
  title: string
  body: string
}
const { title, body } = Astro.props
---
<div class="bg-gray-50 border border-gray-200 rounded-2xl p-6">
  <h3 class="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
  <p class="text-gray-500 text-sm">{body}</p>
</div>`,
  }
}

// ─── Public API ───────────────────────────────────────────────────────────────

export const FRAMEWORK_FILE_GENERATORS: Record<string, (name: string) => FileMap> = {
  'react-vite': reactViteFiles,
  'nextjs':     nextjsFiles,
  'vue':        vueFiles,
  'svelte':     svelteFiles,
  'html':       htmlFiles,
  'astro':      astroFiles,
}

/**
 * Write a FileMap to a directory chosen by the user via the File System Access API.
 * Returns 'done' on success, 'unsupported' if the browser lacks the API, or throws on error.
 */
export async function exportToDirectory(
  files: FileMap,
  dirName: string,
): Promise<'done' | 'unsupported'> {
  if (!('showDirectoryPicker' in window)) return 'unsupported'

  // @ts-expect-error — File System Access API types not always present in tsconfig lib
  const rootDir: FileSystemDirectoryHandle = await window.showDirectoryPicker({
    mode: 'readwrite',
    startIn: 'documents',
  })

  for (const [filePath, content] of Object.entries(files)) {
    const parts = filePath.split('/')
    let currentDir: FileSystemDirectoryHandle = rootDir

    // Create intermediate directories
    for (const segment of parts.slice(0, -1)) {
      // @ts-expect-error — File System Access API
      currentDir = await currentDir.getDirectoryHandle(segment, { create: true })
    }

    // Write file
    const fileName = parts[parts.length - 1]
    // @ts-expect-error — File System Access API
    const fileHandle: FileSystemFileHandle = await currentDir.getFileHandle(fileName, { create: true })
    // @ts-expect-error — File System Access API
    const writable = await fileHandle.createWritable()
    await writable.write(content)
    await writable.close()
  }

  return 'done'
}
