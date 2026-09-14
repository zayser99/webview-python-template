import os
import sys
import webview
from api.bridge import BridgeApi

# Prevenir crash si algún módulo usa print() en modo windowed
if sys.stdout is None:
    sys.stdout = open(os.devnull, "w")
if sys.stderr is None:
    sys.stderr = open(os.devnull, "w")

def get_entrypoint():
    if getattr(sys, 'frozen', False):
        # En macOS windowed, sys.executable apunta a Contents/MacOS/main
        # --add-data 'static:static' normalmente pone la carpeta dentro de MacOS
        base_path = os.path.dirname(sys.executable)
        html_path = os.path.join(base_path, 'static', 'index.html')
        
        # Fallback a Resources (por si ajustaste el archivo .spec)
        if not os.path.exists(html_path):
            mac_resources_path = os.path.join(os.path.dirname(base_path), 'Resources', 'static', 'index.html')
            if os.path.exists(mac_resources_path):
                html_path = mac_resources_path
                
        return html_path
    else:
        return 'http://localhost:5173'

def main():
    api = BridgeApi()
    entry = get_entrypoint()
    is_debug = not getattr(sys, 'frozen', False)
    
    window = webview.create_window(
        title='Your App Name',
        url=entry,
        js_api=api,
        width=1280,
        height=800,
        text_select=True
    )
    
    # CRÍTICO PARA VITE: http_server=True evita que WKWebView bloquee los ES Modules
    webview.start(debug=is_debug, http_server=True)

if __name__ == '__main__':
    main()