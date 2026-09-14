# AI Document Builder 📄🤖

Una aplicación de escritorio de arquitectura híbrida construida con **React** y **Python**. Combina la flexibilidad e interactividad de un frontend web moderno con el poder y el acceso nativo al sistema operativo de Python.

## 🚀 Tech Stack

*   **Frontend:** React 19, TypeScript, Vite.
*   **Backend:** Python 3, `pywebview`.
*   **Empaquetado:** PyInstaller (Multiplataforma: Mac & Windows).
*   **Orquestación:** Node.js, `run-script-os`.

Para conocer a detalle cómo se comunican estas tecnologías y cómo funciona el motor multiplataforma, revisa nuestra [Documentación de Arquitectura](docs/ARQUITECTURA.md).

---

## ⚙️ Requisitos Previos

Asegúrate de tener instalado en tu computadora:
*   [Node.js](https://nodejs.org/) (incluye `npm`)
*   [Python 3](https://www.python.org/)

---

## 🛠 Entorno de Desarrollo (Dev Mode)

Para trabajar de forma fluida, levantaremos el frontend y el backend por separado. Esto permite tener *Hot-Reload* (los cambios visuales se actualizan al instante sin reiniciar la app).

### 1. Levantar el Frontend
Abre una terminal en la raíz del proyecto y ejecuta:
```bash
cd frontend
npm install
npm run dev
```
*(Vite empezará a servir el frontend en `http://localhost:5173`)*

### 2. Levantar el Backend (Ventana Nativa)
Abre una **segunda terminal** en la raíz del proyecto y prepara el entorno de Python:

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
*(Esto abrirá la ventana de escritorio nativa e inyectará el frontend que está corriendo en Vite. Además, conectará tu API Bridge).*

---

## 📦 Empaquetado para Producción (Build)

Gracias al orquestador cruzado configurado en la raíz del proyecto, crear un ejecutable final para tu sistema operativo (Mac `.app` o Windows `.exe`) toma un solo comando.

1. Instala las dependencias del orquestador en la raíz (solo la primera vez):
```bash
npm install
```

2. Ejecuta el comando mágico de compilación:
```bash
npm run build
```

El script se encargará automáticamente de:
1. Detectar si estás en Mac o Windows para usar los comandos correctos.
2. Limpiar rastros de *builds* anteriores.
3. Compilar React (TypeScript y Vite) en archivos estáticos.
4. Empaquetar todo con PyInstaller e incluir firmas de seguridad (ej. para Apple Silicon).

🎉 **Resultado:** Encontrarás tu aplicación final lista para usar y distribuir en la carpeta `dist/` en la raíz de tu proyecto.

