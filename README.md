# 🚀 Zayser Template: Python Webview + React

El punto de partida definitivo (y sin dolores de cabeza) para crear **Aplicaciones de Escritorio Híbridas**. Combina la inigualable experiencia de desarrollo web moderno (React, Vite, Tailwind) con el poder y el acceso nativo al sistema operativo de Python.

Olvídate de pelear con la conexión entre JavaScript y Python o lidiar con configuraciones de empaquetado tediosas. Esta plantilla lo tiene todo resuelto desde el primer segundo.

---

## ✨ Características Clave

* ⚡ **Frontend Ultrarrápido:** React 19, TypeScript, Vite y el novísimo **Tailwind CSS v4** (sin archivos de configuración extra, todo en CSS).
* 🐍 **Backend Nativo:** Python 3 + `pywebview` para levantar ventanas nativas reales (WKWebView en Mac, EdgeHTML/Chromium en Windows).
* 🌉 **API Bridge Integrado:** Incluye un ejemplo funcional. El estado (un contador) vive en la memoria de Python y se refleja instantáneamente en React.
* 🛠️ **Orquestador Cross-Platform:** Un único comando en la raíz (`npm run build`) detecta tu SO, limpia carpetas, compila el frontend, empaqueta el ejecutable final con PyInstaller y, en caso de Mac, purga atributos y firma el código (Apple Silicon Ready).

---

## 🚀 Cómo Empezar (Modo Desarrollo)

Para aprovechar el *Hot-Reload* (ver tus cambios de UI al instante), levantaremos el frontend y el backend en dos terminales separadas.

### 1. Preparar el repositorio
```bash
# Haz clic en "Use this template" en GitHub o clónalo localmente
npm install  # Instala las herramientas del orquestador en la raíz
```

### 2. Levantar el Frontend (Terminal 1)
Entra a la carpeta del frontend e inicializa Vite usando `pnpm`:
```bash
cd frontend
pnpm install
pnpm run dev
```

### 3. Levantar el Backend (Terminal 2)
Abre otra terminal en la raíz y configura el entorno de Python:

**En Mac / Linux:**
```bash
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
cd backend
python main.py
```

**En Windows:**
```cmd
python -m venv venv
.\venv\Scripts\activate
pip install -r requirements.txt
cd backend
python main.py
```
*(¡Listo! Se abrirá la ventana de escritorio nativa conectada a tu frontend y al Bridge de Python).*

---

## 📦 Empaquetado para Producción (Build)

Generar tu ejecutable final (`.app` en Mac o `.exe` en Windows) para distribuir a tus usuarios toma literalmente un solo paso. Desde la raíz de tu proyecto ejecuta:

```bash
npm run build
```

El script orquestador se encarga de todo el trabajo sucio. Tu aplicación final aparecerá lista para usarse en la carpeta **`/dist`** de la raíz de tu proyecto.

---

## 📁 Estructura del Proyecto

* **`/frontend`**: Tu app de React + Vite. Aquí maquetas toda tu UI.
* **`/backend`**:
  * `main.py`: Punto de entrada que inicializa `pywebview`.
  * `/api/bridge.py`: El corazón nativo. Aquí agregas las funciones de Python (manejo de archivos, SO, IA) que quieres exponer y llamar desde React.
* **`package.json` (raíz)**: El director de orquesta. Contiene los scripts que compilan la aplicación entera tanto para Mac como para Windows.
* **`/docs`**: Revisa nuestra [Documentación de Arquitectura](docs/ARQUITECTURA.md) para entender a detalle cómo se conectan todas estas piezas.
