import { useState, useEffect } from 'react'

// Declaración global para que TypeScript reconozca la API inyectada por pywebview
declare global {
  interface Window {
    pywebview?: {
      api: {
        increment_counter: () => Promise<number>;
        get_counter: () => Promise<number>;
      }
    }
  }
}

function App() {
  const [count, setCount] = useState(0)
  const [isNative, setIsNative] = useState(false)

  // Efecto para obtener el valor inicial del contador desde Python al cargar la app
  useEffect(() => {
    window.addEventListener('pywebviewready', async () => {
      if (window.pywebview && window.pywebview.api) {
        setIsNative(true); // Confirmamos que el puente nativo conectó con éxito
        const initialCount = await window.pywebview.api.get_counter();
        setCount(initialCount);
      }
    });
  }, []);

  const handleIncrement = async () => {
    if (window.pywebview && window.pywebview.api) {
      try {
        // Le pedimos a Python que sume 1 y nos devuelva el nuevo total
        const newCount = await window.pywebview.api.increment_counter();
        setCount(newCount);
      } catch (error) {
        console.error("Error al incrementar en Python");
      }
    } else {
      // Fallback: Si abren el frontend en el navegador, sumamos localmente para pruebas de diseño
      setCount((c) => c + 1);
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center p-6 md:p-12 font-sans selection:bg-fuchsia-500/30">
      
      {/* Contenedor principal estilo "Glassmorphism" */}
      <div className="max-w-4xl w-full bg-slate-900/80 backdrop-blur-xl rounded-[2rem] shadow-[0_0_60px_-15px_rgba(192,132,252,0.2)] p-10 md:p-16 border border-white/10 flex flex-col items-center relative overflow-hidden">
        
        {/* Destellos decorativos de fondo */}
        <div className="absolute -top-32 -left-32 w-72 h-72 bg-purple-500/20 rounded-full blur-[80px] pointer-events-none"></div>
        <div className="absolute -bottom-32 -right-32 w-72 h-72 bg-emerald-500/20 rounded-full blur-[80px] pointer-events-none"></div>

        {/* Título Super Llamativo */}
        <h1 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-br from-fuchsia-400 via-purple-400 to-indigo-400 mb-4 text-center tracking-tighter drop-shadow-sm z-10 leading-tight">
          Python Webview<br/>
          <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
            Zayser Template
          </span>
        </h1>
        
        <p className="text-slate-400 text-center mb-14 text-lg md:text-xl max-w-2xl z-10 font-medium">
          El punto de partida definitivo para aplicaciones de escritorio híbridas con <span className="text-cyan-400">React</span>, <span className="text-fuchsia-400">Vite</span>, <span className="text-sky-400">Tailwind v4</span> y <span className="text-yellow-400">Python</span>.
        </p>

        {/* Tarjeta de Contador (Única y Central) */}
        <div className="w-full max-w-md bg-slate-800/50 p-8 rounded-2xl border border-white/5 flex flex-col items-center text-center z-10 backdrop-blur-md shadow-2xl transition-transform hover:scale-[1.02] duration-300">
          
          {/* Indicador de conexión */}
          <div className="flex items-center gap-3 mb-6 bg-black/30 px-4 py-2 rounded-full border border-white/5">
            <div className={`w-3 h-3 rounded-full ${isNative ? 'bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.8)] animate-pulse' : 'bg-amber-500'}`}></div>
            <span className="text-xs font-bold tracking-widest uppercase text-slate-300">
              {isNative ? 'Conectado a Python' : 'Modo Navegador Web'}
            </span>
          </div>

          <h2 className="text-3xl font-bold mb-4 text-white">Contador Nativo</h2>
          <p className="text-sm text-slate-400 mb-8 leading-relaxed">
            Presiona el botón para enviar una instrucción al <strong>Bridge API</strong>. Python sumará el valor en su memoria y Vite actualizará la interfaz al instante.
          </p>
          
          {/* Botón Principal */}
          <button 
            onClick={handleIncrement}
            className="w-full py-4 bg-gradient-to-r from-fuchsia-600 to-purple-600 hover:from-fuchsia-500 hover:to-purple-500 text-white rounded-xl transition-all font-bold text-lg cursor-pointer shadow-[0_0_30px_rgba(192,132,252,0.4)] active:scale-95 flex items-center justify-center gap-4 border border-fuchsia-400/30 hover:border-fuchsia-300/50"
          >
            <span>Sumar +1</span>
            <span className="bg-black/30 px-4 py-1.5 rounded-lg text-xl font-black font-mono">
              {count}
            </span>
          </button>
        </div>
        
      </div>
    </div>
  )
}

export default App
