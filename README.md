# Base template only with TypeScript
You can use it for Coding-Dojos, Katas or reference to build a new project.

This template includes:

💬 TypeScript 4.0.5

# Enunciado Kata

Un fabricante de sistemas de video-vigilancia ha solicitado el desarollo de un software de un producto que dispone de un sensor de movimiento y de un grabador. El sensor de movimiento tiene:

* Una API con un solo metodo que devuelve verdadero cuando detecta que algo se ha movido y falso cuando no detecta movimiento. El grabador dispone de dos comandos, uno para empezar a grabar y otro para detener la grabacion.


Nuestra tarea sera diseñar un controlador que compruebe cada segundo si el sensor esta detectando movimiento y si es así se debe indicar al grabador que inicie la grabacion
y en caso contrario debe detener la grabación. La garabación también debería detenerse en caso de algún comportamiento inesperado del sensor. 

La principal limitación es que el fabricante no nos ofrece la posibilidad de acceder al código del sensor ni del grabador pero si nos provee de sus interfaces públicas:

```
interface MotionSensor { <br>
    isDetectingMotion(): boolean;
}
```
```
interface VideoRecorder {
    startRecording(): void;
    stopRecording(): void;
}
```

