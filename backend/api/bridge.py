import platform

class BridgeApi:
    def __init__(self):
        # Almacenamos el estado en la memoria de Python
        self.counter = 0

    def increment_counter(self):
        """
        Suma 1 al contador almacenado en Python y devuelve el nuevo valor a React.
        """
        self.counter += 1
        return self.counter

    def get_counter(self):
        """
        Devuelve el valor actual del contador de Python.
        """
        return self.counter

    def ping(self):
        """
        Una función de prueba sencilla que puedes llamar desde React.
        """
        return "¡Pong! Conexión exitosa entre React y Python."

    def get_system_info(self):
        """
        Ejemplo de función que lee datos nativos del sistema que React no podría leer solo.
        """
        return {
            "os": platform.system(),
            "release": platform.release(),
            "architecture": platform.machine()
        }
