import platform

class BridgeApi:
    def __init__(self):
        pass

    def ping(self):
        """
        Una función de prueba sencilla que puedes llamar desde React usando:
        const respuesta = await window.pywebview.api.ping();
        """
        return "¡Pong! Conexión exitosa entre React y Python."

    def get_system_info(self):
        """
        Ejemplo de función que lee datos nativos del sistema que React no podría leer solo.
        const info = await window.pywebview.api.get_system_info();
        """
        return {
            "os": platform.system(),
            "release": platform.release(),
            "architecture": platform.machine()
        }

