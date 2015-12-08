-------------
# Requisitos: 
-------------

1. Requiere la instalación de mongoDB.
2. Como datos de la aplicación pueden usarse los proporcionados en la carpeta DB
   en forma de JSON que han de ser importados a la base de datos creada con el 
   nombre de 'plazamar' como colecciones.
3. Además para la correcta comunicación entre api.php y mongoDB se ha de instalar
   la extensión php correspondiente para mongo y activarla en php.ini (se pueden 
   seguir las instrucciones buscando en el manual de php 'php.net')

----------------------------------------------------------------------------
# Errores y dificultades de la aplicación detectados pendientes de solución:
----------------------------------------------------------------------------

1. Errores ligeros en la función historial al ir hacia atrás con la navegación.
2. Error en la carga de los botones de google y facebook. Funcionan bien pero
   necesitan recargar la página para que aparezcan en la vista.
3. Duplicación del evento "click" en el uso del botón "comprar" en cada producto.
   Ver artículos en internet relacionados con las "vistas zombies en backbone"
4. Puede mejorarse la autenticación de usuario y el uso de sesiones.
5. La lógica empleada en las vistas seguro que puede mejorarse mucho.
6. El carro de la compra no está implementado.

