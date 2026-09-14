# Arquitectura del Proyecto: AI Document Builder

Este documento describe la arquitectura de la aplicación, el flujo de comunicación entre sus partes y cómo funciona el sistema de orquestación (build) multiplataforma.

## 🛠 Tecnologías Principales

La aplicación sigue una arquitectura de **Escritorio Híbrida**:

*   **Frontend (UI):** React (con TypeScript) y Vite. Se encarga de toda la interfaz gráfica. Al compilarse, Vite exporta archivos estáticos (HTML/JS/CSS) a la carpeta `backend/static`.
*   **Backend (Lógica Nativa):** Python. Utiliza la librería `pywebview` para levantar una ventana nativa del sistema operativo (WKWebView en macOS, EdgeHTML/Chromium en Windows) y cargar el frontend generado.
*   **Empaquetado Nativo:** `PyInstaller`. Se encarga de tomar el código Python y los archivos estáticos de React para generar un ejecutable final (`.app` para macOS, `.exe` para Windows).

---

## 🌉 Comunicación: El API Bridge

Dado que el frontend (React) corre en un entorno aislado de navegador, no puede acceder directamente a los recursos del sistema operativo (archivos, base de datos local, etc.). Para resolver esto, la aplicación utiliza un **API Bridge**.

1.  **En Python (`backend/api/bridge.py`):** Se define una clase (`BridgeApi`) que contiene todas las funciones nativas que el frontend podría necesitar ejecutar.
2.  **La Conexión (`backend/main.py`):** Esta clase se pasa como parámetro al inicializar la ventana (`js_api=api`).
3.  **En React:** El frontend puede llamar a estas funciones de Python de forma asíncrona a través de `window.pywebview.api.nombre_de_la_funcion()`.

---

## 🏗 El Orquestador de Build (Cross-Platform)

El proyecto utiliza un orquestador centralizado a través del archivo `package.json` ubicado en la **raíz del proyecto**. Esto permite compilar la aplicación para diferentes sistemas operativos usando un único comando: `npm run build`.

### ¿Cómo funciona `run-script-os`?
El orquestador depende del paquete de Node `run-script-os`. Esta herramienta detecta automáticamente el sistema operativo en el que te encuentras (Mac, Windows o Linux) y ejecuta el sub-script correspondiente en tu `package.json`.

### El Flujo de `npm run build`
Al ejecutar este comando en la raíz, suceden los siguientes pasos en cascada:

1.  **Limpieza (`npm run clean`):**
    *   Invoca `run-script-os` para ejecutar `clean:macos` (por defecto) o `clean:windows`.
    *   Elimina carpetas viejas de compilación (`dist`, `build`, `static`) usando los comandos correctos de cada sistema operativo (`rm -rf` en Mac, `rd /S /Q` en Windows).

2.  **Compilación del Frontend (`npm run build-frontend`):**
    *   Entra a la carpeta `frontend/`.
    *   Ejecuta Vite para compilar el código de React.
    *   Los archivos resultantes se depositan directamente en `backend/static`.

3.  **Empaquetado Nativo (`run-script-os` final):**
    *   Si estás en **Mac**, ejecuta `build:macos`. Entra a `backend/`, ejecuta PyInstaller usando `:` como separador de datos (`'static:static'`), purga atributos extendidos (`xattr -cr`) y firma el binario final para compatibilidad con Apple Silicon (arm64).
    *   Si estás en **Windows**, ejecuta `build:windows`. Entra a `backend/`, usa el PyInstaller de la carpeta Scripts de Windows y utiliza `;` como separador de datos (`"static;static"`).

### Comandos Disponibles en la Raíz

*   `npm run build`: Ejecuta el flujo completo multiplataforma (Recomendado).
*   `npm run clean`: Limpia los artefactos de builds anteriores.
*   `npm run build-frontend`: Compila únicamente el proyecto de React.

