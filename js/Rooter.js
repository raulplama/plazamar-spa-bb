var Router = Backbone.Router.extend({
  routes: {
    ""                      : "index",    // la página de inicio
    "index"                 : "index",    // la página de inicio
    "categoria/:categoria"  : "mostrarProductosCategoria", // enlaces del menú de categorías para mostrar sus productos
    "catalogo/:id"          : "mostrarProducto", // enlaces en cada imagen de producto para mostrar su detalle
    "ayuda/:page"           : "mostrarAyuda", // muestra la página de ayuda
    "quienesSomos"          : "quienesSomos",
    "atencionAlCliente"     : "atencionAlCliente",
    "legal/:page"           : "legal",
    "formAcceso"            : "formAcceso", // enlace al formulario de acceso a la tienda
    "errorEnAcceso"         : "infoErrorAcceso", // muestra una página con el error de acceso
    "accesoCorrecto"        : "accesoCorrecto", // gestiona el acceso del usuario a la tienda presentando la página personalizada
    "logout"                : "logout", // gestiona el cierre de sesión por el usuario
    "formRegistro"          : "formRegistro", // acceso al formulario de registro en la tienda
    "okRegistroUsuario"     : "infoNuevoUsuario",
    "errorRegistro"         : "infoErrorRegistro",
    "perfil"                : "accesoAlPerfil",
    "infoRegPerfilOk"       : "infoRegPerfilOk",
    "infoRegPerfilError"    : "infoRegPerfilError",
    "carrito"               : "carritoDeLaCompra"
   },
  initialize: function() {
    console.log('aplicando router');
  },
  index: function() {
    console.log('página del index');
    actualizarCategorias();
    // comprobamos si el usuario ha logeado o no leyendo las cookies
    var usuarioSesion = docCookies.getItem('usuario');
    // creamos un modelo de sesion y comprobamos si el usuario tiene una abierta
    var userSession = new Sesion({usuario: usuarioSesion});
    userSession.fetch({
      data: $.param({ comprobarSesionUsuario: usuarioSesion }),
      success: function(model, response) {
        if (response !== 'false') {
          window.location.href = '#accesoCorrecto'; // redireccionamos a la página de inicio personalizada
        } else {
          $('#sesion').html('<a href="#formAcceso">acceder</a>'); // modificamos el enlace de 'logout' por 'acceder'
          $('#titular').html('<h1>' + '¡ Bienvenido ! estos son algunos productos de nuestro catálogo' + '</h1>');
          seleccionarProductosDeInicio();
        }
      },
      error: function(model, response) {
        console.log('error');
        console.log(response);
        console.log(model);
      }
    });
    busquedaProductos();
  },
  mostrarProductosCategoria: function(categoria) {
    $('#titular').html('<h1>' + 'libros de ' + categoria + '</h1>'); // cambiamos el titular de la página (pte poner la descripción de la BD)
    actualizarCategorias(); // redibujamos el menú de las categorías
    mostrarProductosCategoria(categoria); // mostramos los productos de la categoria
  },
  mostrarProducto: function(id) {
    $('#titular').html('<h1>detalle de producto</h1>'); // cambiamos el titular
    actualizarCategorias(); // redibujamos el menú de las categorías
    mostrarDetalleDeProducto(id); // mostramos el detalle de producto
  },
  mostrarAyuda: function(page) {
    console.log('página de ayuda número ' + page);
    $('#titular').html('<h1>' + 'ayuda' + '</h1>'); // cambiamos el titular de la página
    actualizarCategorias(); // redibujamos el menú de las categorías
    mostrarContenidoAyuda(page); // cambiamos el contenido existente por el de ayuda
  },
  quienesSomos: function() {
    console.log('página quienes somos');
    $('#titular').html('<h1>' + 'quienes somos' + '</h1>'); // cambiamos el titular de la página
    actualizarCategorias();
    mostrarContenidoQuienesSomos();
  },
  atencionAlCliente: function() {
    console.log('página de atención al cliente');
    $('#titular').html('<h1>' + 'atención al cliente' + '</h1>'); // cambiamos el titular de la página
    actualizarCategorias();
    mostrarContenidoAtencionAlCliente();
  },
  legal: function(page) {
    console.log('página de los aspectos legales ' + page);
    $('#titular').html('<h1>' + 'aspectos legales' + '</h1>'); // cambiamos el titular de la página
    actualizarCategorias();
    mostrarContenidoLegal(page);
  },
  formAcceso: function() {
    console.log('formulario de acceso a la tienda');
    $('#titular').html('<h1>' + 'acceso a la tienda' + '</h1>'); // cambiamos el titular de la página
    actualizarCategorias();
    mostrarFormularioDeAcceso();
  },
  formRegistro: function() {
    console.log('formulario de registro');
    $('#titular').html('<h1>' + 'formulario de registro' + '</h1>');
    actualizarCategorias(); // mantemenos el menú de categorías por si quiere interrumpir el proceso de registro
    mostrarFormularioDeRegistro();
  },
  infoErrorAcceso: function() {
    console.log('página de info error');
    $('#titular').html('<h1>' + 'acceso a la tienda' + '</h1>');
    actualizarCategorias();
    mostrarInfoErrorAcceso();
  },
  accesoCorrecto: function() {
    console.log('pagina de inicio de usuario registrado');
    // obtenemos el usuario almacenado en la cookie
    var usuario = docCookies.getItem('usuario');
    // hacemos una consulta a la bd para saber si el usuario es admin o no
    var sessionUser = new Sesion({ usuario: usuario });
    sessionUser.fetch({
      data: $.param({ comprobarSesionUsuario: usuario }),
      success: function(model, response) {
        console.log('usuario registrado');
        //console.log(response);
        if (response[0].tipo === 'admin') {
          $('#titular').html('<h1>' + 'panel de administración' + '</h1>');
          mostrarTablaDeAdministracion();
        } else {
          $('#titular').html('<h1>' + 'hola cliente, los siguientes productos tienen descuento' + '</h1>'); // completar con el nombre de usuario
          actualizarCategorias();
          mostrarProductosConDescuento();
        }
      },
      error: function(model, response) {
        console.log('error');
      }
    })
    $('#sesion').html('<a href="#logout">cerrar sesión</a>'); // modificamos el enlace de 'acceso' por otro de 'cerrar sesión'
  },
  logout: function() {
    console.log('cerrando sesión');
    // leemos el nombre del usuario de la cokkie almacenada
    var usuario = docCookies.getItem('usuario');
    // si se ha logado con google salimos
    if (docCookies.getItem('gtoken')) {
      signOut();
    }
    // creamos un modelo de sesión para ese usuario
    var sesionUsuario = new Sesion({ usuario: usuario });
    // borramos la sesion del usuario de la bd
    sesionUsuario.fetch({
      data: $.param({ usuario: usuario }),
      patch: true,
      beforeSend: function(xhr) {
        xhr.setRequestHeader('X-HTTP-Method-Override', 'delete');
      },
      success: function(model, response) {
        $("#container").html("");
        var vistaDivsContainer = new VistaDivsContainer();
        $('#contenido').html("<ul id='productos'></ul>"); // borramos el contenido mostrado (necesario si estamos en la vista 'detalle de producto')
      }
    })
    // borramos la lista de la compra del usuario en caso de que la hubiera iniciado
    var carritoUsuario = new CarroCompra();
    carritoUsuario.fetch({
      data: $.param({ usuario: usuario }),
      patch: true,
      beforeSend: function(xhr) {
        xhr.setRequestHeader('X-HTTP-Method-Override', 'delete');
      },
      success: function(model, response) {
        console.log('carrito de la compra borrado');
      },
      error: function(model, response) {
        console.log('error en la conexión');
      }
    });
    // borramos la cookie con el nombre del usuario
    docCookies.removeItem('usuario');
    // redireccionamos a la página de inicio sin sesión
    window.location.href = '#index';
  },
  infoNuevoUsuario: function() {
    console.log('registro realizado correctamente');
    $('#titular').html('<h1>' + 'registro de usuario' + '</h1>');
    actualizarCategorias();
    mostrarInfoNuevoUsuario();
  },
  infoErrorRegistro: function() {
    console.log('registro no realizado, el usuario ya existe');
    $('#titular').html('<h1>' + 'registro de usuario' + '</h1>');
    actualizarCategorias();
    mostrarInfoErrorRegistro();
  },
  accesoAlPerfil: function() {
    console.log('accediendo al pefil de usuario');
    $('#titular').html('<h1>' + 'perfil de usuario' + '</h1>');
    actualizarCategorias();
    mostrarPerfilDeUsuario();
  },
  infoRegPerfilOk: function() {
    console.log('página de información de registro de perfil');
    $('#titular').html('<h1>' + 'perfil de usuario' + '</h1>');
    actualizarCategorias();
    mostrarInfoRegistroPerfil();
    $('#infoPerfil').html('perfil actualizado correctamente');
  },
  infoRegPerfilError: function() {
    console.log('página de información de registro de perfil');
    $('#titular').html('<h1>' + 'perfil de usuario' + '</h1>');
    actualizarCategorias();
    mostrarInfoRegistroPerfil();
    $('#infoPerfil').html('perfil no actualizado, la contraseña no coincide');
  },
  carritoDeLaCompra: function() {
    $('#titular').html('<h1>' + 'carrito de la compra' + '</h1>');
    actualizarCategorias();
    mostrarProductosParaComprar();
  }
});