-------------
# Requisitos: 
-------------

1. Requiere la instalaci�n de mongoDB.
2. Como datos de la aplicaci�n pueden usarse los proporcionados en la carpeta DB
   en forma de JSON que han de ser importados a la base de datos creada con el 
   nombre de 'plazamar' como colecciones.
3. Adem�s para la correcta comunicaci�n entre api.php y mongoDB se ha de instalar
   la extensi�n php correspondiente para mongo y activarla en php.ini (se pueden 
   seguir las instrucciones buscando en el manual de php 'php.net')

----------------------------------------------------------------------------
# Errores y dificultades de la aplicaci�n detectados pendientes de soluci�n:
----------------------------------------------------------------------------

1. Errores ligeros en la funci�n historial al ir hacia atr�s con la navegaci�n.
2. Error en la carga de los botones de google y facebook. Funcionan bien pero
   necesitan recargar la p�gina para que aparezcan en la vista.
3. Duplicaci�n del evento "click" en el uso del bot�n "comprar" en cada producto.
   Ver art�culos en internet relacionados con las "vistas zombies en backbone"
4. Puede mejorarse la autenticaci�n de usuario y el uso de sesiones.
5. La l�gica empleada en las vistas seguro que puede mejorarse mucho.
6. El carro de la compra no est� implementado.

