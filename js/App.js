// Activo la aplicación: el ruter y la función de 'historia' de Backbone

$(document).ready(function() {
  var router = new Router; // activamos el router
  Backbone.history.start();   // activamos la función de historial de Backbone
});

// MODELOS

var Categoria = Backbone.Model.extend({
  defaults: {
    id: '',
    nombre: '',
    descripcion: '',
  },
  idAttribute: "_id"
});

var Producto = Backbone.Model.extend({
  url: '/plazamar-spa-bb/api.php/producto',
  defaults: {
    id: '',
    imagen: '',
    titulo: '',
    autor: '',
    editorial: '',
    precio: '',
    isbn: '',
    categoria: '',
    tieneDescuento: false,
    descuento: '' // en porcentaje
  },
  idAttribute: "_id"
});

var Usuario = Backbone.Model.extend({
  url: '/plazamar-spa-bb/api.php/usuario',
  defaults: {
    usuario: '',
    email: '',
    password: '',
    type: 'usuario'
  },
  idAttribute: "_id",
  validate: function(attributes) {
    // creamos un array con los errores que vamos detectando

    var invalid = [];

    // condiciones de validación y sus errores

    if ( !attributes.usuario ) {
      invalid.push('campo usuario vacío');
    }
    if ( attributes.usuario && (attributes.usuario.length < 4 || attributes.usuario.length > 20) ) {
      invalid.push('el usuario debe tener entre 4 y 20 caracteres');
    }
    if ( !attributes.email ) {
      invalid.push('campo email vacío');
    }
    if ( attributes.email && !attributes.email.includes('@') ) {
      invalid.push('email no válido');
    }
    if ( attributes.email && attributes.email.includes('@') && attributes.email.length > 50 ) {
      invalid.push('la dirección de email debe tener menos de 50 caracteres');
    }
    if ( !attributes.password ) {
      invalid.push('campo password vacío');
    }
    if (attributes.password && (attributes.password.length < 4 || attributes.password.length >20)) {
      invalid.push('la contraseña debe tener entre 4 y 20 caracteres');
    }

    // si el array de errores tiene longitud mayor de cero es que hay errores, los retornamos

    if ( invalid.length > 0 ) { return invalid; };
  }
});

var Perfil = Backbone.Model.extend({
  url: '/plazamar-spa-bb/api.php/perfil',
  defaults: {
    usuario: '',
    nombre: '',
    apellidos: '',
    email: '',
    direccion: '',
    localidad: '',
    provincia: ''
  },
  idAttribute: "_id",
})

// COLECCIONES

var ListaDeCategorias = Backbone.Collection.extend({
  url: '/plazamar-spa-bb/api.php/categorias',
  model: Categoria,
  idAttribute: "_id"
});

var ListaDeProductos = Backbone.Collection.extend({
  url: '/plazamar-spa-bb/api.php/productos',
  model: Producto,
  idAttribute: "_id"
});

var ListaDeUsuarios = Backbone.Collection.extend({
  url: '/plazamar-spa-bb/api.php/usuarios',
  model: Usuario,
  idAttribute: "_id"
});

var ListaDePerfiles = Backbone.Collection.extend({
  url: '/plazamar-spa-bb/api.php/perfiles',
  model: Perfil,
  idAttribute: "_id"
});

// VISTAS

var VistaCategoria = Backbone.View.extend({
  el: ('#categorias'),
  template: _.template($('#listado_categorias').html()),

  initialize: function() {
    this.render();
  },
  render: function() {
    console.log('renderizando modelo');
    this.$el.append(this.template(this.model));
    return this;
  }
});

var VistaMenuCategorias = Backbone.View.extend({
  el: ("#categorias"),
  initialize: function() {
    console.log(this.collection);
    this.render();
  },
  render: function() {
    console.log('renderizando colección');
    this.collection.forEach(this.addUnaCategoria, this);
    return this;
  },
  addUnaCategoria: function(modelo, index, collection) {
    console.log(collection);
    console.log('procesando modelo ' + index);
    var vistaCategoria = new VistaCategoria({model: modelo});
  }
});

var VistaProducto = Backbone.View.extend({
  //el: $("#productos"),
  template: _.template($("#listado_productos").html()),
  initialize: function() {
    this.render();
  },
  render: function(eventName) {
    this.$el.append(this.template(this.model));
    return this;
  }
});

var VistaListaDeProductos = Backbone.View.extend({
  initialize: function() {
    this.render();
  },
  render: function() {
    this.collection.forEach(this.addUnProducto, this);
    return this;
  },
  addUnProducto: function(data) {
    var vistaProducto = new VistaProducto({model: data, el: $('#productos')});
  }
});

var VistaDetalleDeProducto = Backbone.View.extend({
  el: $("#contenido"),
  template: _.template($("#detalle_de_producto").html()),
  initialize: function() {
    console.log('aplicando vista detalle de producto')
    this.render();
  },
  render: function() {
     this.$el.append(this.template(this.model));
    return this;
  }
});

var VistaAyuda1 = Backbone.View.extend({
  el: ('#contenido'),
  template: _.template($('#ayuda_1').html()),
  initialize: function() {
    this.render();
  },
  render: function() {
    this.$el.append(this.template());
    return this;
  }
});

var VistaAyuda2 = Backbone.View.extend({
  el: ('#contenido'),
  template: _.template($('#ayuda_2').html()),
  initialize: function() {
    this.render();
  },
  render: function() {
    this.$el.append(this.template());
    return this;
  }
});

var VistaAyuda3 = Backbone.View.extend({
  el: ('#contenido'),
  template: _.template($('#ayuda_3').html()),
  initialize: function() {
    this.render();
  },
  render: function() {
    this.$el.append(this.template());
    return this;
  }
});

var VistaQuienesSomos = Backbone.View.extend({
  el: ('#contenido'),
  template: _.template($('#quienesSomos').html()),
  initialize: function() {
    this.render();
  },
  render: function() {
    this.$el.append(this.template());
    return this;
  }
});

var VistaAtencionAlCliente = Backbone.View.extend({
  el: ('#contenido'),
  template: _.template($('#atencionAlCliente').html()),
  initialize: function() {
    this.render();
  },
  render: function() {
    this.$el.append(this.template());
    return this;
  }
});

var VistaLegal1 = Backbone.View.extend({
  el: ('#contenido'),
  template: _.template($('#legal_1').html()),
  initialize: function() {
    this.render();
  },
  render: function() {
    this.$el.append(this.template());
    return this;
  }
});

var VistaLegal2 = Backbone.View.extend({
  el: ('#contenido'),
  template: _.template($('#legal_2').html()),
  initialize: function() {
    this.render();
  },
  render: function() {
    this.$el.append(this.template());
    return this;
  }
});

var VistaLegal3 = Backbone.View.extend({
  el: ('#contenido'),
  template: _.template($('#legal_3').html()),
  initialize: function() {
    this.render();
  },
  render: function() {
    this.$el.append(this.template());
    return this;
  }
});

var VistaFormularioDeAcceso = Backbone.View.extend({
  el: ('#contenido'),
  templates: {
    'formAcceso': _.template($('#formularioDeAcceso').html()),
  },
  events: {
        'submit'           : 'onFormSubmit', // evento lanzado al pulsar el botón type submit (acceder)
        'click #registrar' : 'formularioRegistro' // evento lanzado al pulsar el boton de tipo button (formulario registro)
  },
  initialize: function() {
    this.render();
  },
  render: function() {
    this.$el.append(this.templates.formAcceso());
    return this;
  },
  onFormSubmit: function(e) {
    e.preventDefault();

    // obtenemos los valores de los campos

    var usuario = this.$el.find('#usuario').val();
    var password = this.$el.find('#password').val();

    // comprobamos si existe el usuario:
    // creamos una instancia del modelo usuario y buscamos el usuario en la BD

    var usuarioAcceso = new Usuario();

    usuarioAcceso.fetch({
      data: $.param({ usuario: usuario }), // incluimos una query string en la url con el identificador introducido en el formulario
      success: function(){
        console.log('acceso a la BD: recuperando usuario');
      },
      error: function(){
        console.log('error: usuario no recuperado');
      }
    }).then(function(response) {
      console.log(response);
      if (response.valueOf() === 'false') {
        // no existe el usuario
        console.log('el usuario no existe');
        window.location.href = '#errorEnAcceso';
      } else {
        // tenemos un usuario, comprobamos las contraseñas
        var contrasenya = usuarioAcceso.get('password');
        if (password.valueOf() === contrasenya.valueOf()) {
          // grabamos en sesión el nombre de usuario
          sessionStorage.setItem('usuario', usuario);
          window.location.href = '#accesoCorrecto';
        } else {
          // no coinciden las contraseñas
          console.log('las contraseñas no coinciden');
          window.location.href = '#errorEnAcceso'
        }
      }
    })
  },
  formularioRegistro: function(e) {
    e.preventDefault();
    console.log('accediendo al fomulario de registro');
    window.location.href = '#formRegistro';
  }
});

var VistaErrorAcceso = Backbone.View.extend({
  el: ('#contenido'),
  template: _.template($('#errorAcceso').html()),
  initialize: function() {
    this.render();
  },
  render: function() {
    this.$el.append(this.template());
    return this;
  }
});

var VistaFormularioDeRegistro = Backbone.View.extend({
  el: ('#contenido'),
  template: _.template($('#formularioDeRegistro').html()),
  events: {
        'submit': 'onSubmit' // evento lanzado al pulsar el botón type submit
  },
  initialize: function() {
    this.render();
  },
  render: function() {
    this.$el.append(this.template());
    return this;
  },
  onSubmit: function(e) {
    console.log('enviando formulario');

    e.preventDefault();

    // obtenemos los valores de los campos

    var nuevoNombreUsuario = this.$el.find('#usuario').val();
    var nuevoEmail = this.$el.find('#email').val();
    var nuevoPassword = this.$el.find('#password').val();

    // creamos una instancia del nuevo usuario y comprobamos si existe en la BD

    var usuarioRegistro = new Usuario();

    usuarioRegistro.fetch({
      data: $.param({ usuario: nuevoNombreUsuario }), // incluimos una query string en la url con el identificador introducido en el formulario
      success: function(){
        console.log('accediendo a la BD');
      },
      error: function(){
        console.log('error en la conexión con la BD');
      }
    }).then(function(response) {
      if (response.valueOf() === 'false') {
        // no existe el usuario
        console.log('el usuario no existe');
        // validamos los datos introducidos
        usuarioRegistro.on("invalid", function(model, error) {
          $('#infoError').html('por favor, revisa los siguientes errores: ' + error);
        });
        // creamos un usuario nuevo con los datos introducidos en el formulario
        var nuevoUsuario = new Usuario({
          usuario : nuevoNombreUsuario,
          email : nuevoEmail,
          password : nuevoPassword
        });
        // grabar el nuevo registro en la BD
        nuevoUsuario.save({}, {
          success : function(model, response) {
            console.log('ok');
            console.log(response);
          },
          error : function(model, response) {
            console.log('error');
            console.log(response);
          }
        })
        // crear un perfil vacío para el nuevo usuario y grabarlo en la BD
        var perfilNuevoUsuario = new Perfil({
          usuario: nuevoNombreUsuario,
          email: nuevoEmail
        });
        perfilNuevoUsuario.save();
        // redirigir a la página de info registro ok
        window.location.href = '#okRegistroUsuario';
      } else {
        // tenemos un usuario con ese nommbre
        console.log('ya existe un usuario con ese nickname');
        window.location.href = '#errorRegistro';
      }
    })
  }
});

var VistaInfoRegistro = Backbone.View.extend({
  el: ('#contenido'),
  template: _.template($('#infoRegistro').html()),
  initialize: function() {
    this.render();
  },
  render: function() {
    this.$el.append(this.template());
    return this;
  }
});

var VistaPerfilDeUsuario = Backbone.View.extend({
  el: ('#contenido'),
  template: _.template($('#formularioPerfilUsuario').html()),
  events: {
        'submit': 'onFormSubmit' // evento lanzado al pulsar el botón type submit (acceder)
  },
  initialize: function() {
    this.render();
  },
  render: function() {
    this.$el.append(this.template());
    return this;
  },
  onFormSubmit: function(e) {
    console.log('actualizando perfil de usuario');
    e.preventDefault();

    // obtenemos los valores de los campos

    var nombre = this.$el.find('#nombre').val();
    var apellidos = this.$el.find('#apellidos').val();
    var email = this.$el.find('#email').val();
    var direccion = this.$el.find('#direccion').val();
    var localidad = this.$el.find('#localidad').val();
    var provincia = this.$el.find('#provincia').val();
    var password = this.$el.find('#password').val();

    // buscamos el perfil del usuario y trabajamos a partir de el.

    var nickname = sessionStorage.getItem('usuario');

    var usuario = new Usuario();
    usuario.fetch({ data: $.param({ usuario: nickname}) }).then(function(response) {

      // validar los datos introducidos (email y contra) y mostrar el error en su caso
      usuario.on("invalid", function(model, error) {
        $('#infoError').html('por favor, revisa los siguientes errores: ' + error);
      });

      // comprobamos la contraseña y pasamos a grabar la info introducida en los campos
      var contrasenyaCorrecta = usuario.get("password");

      if (password.valueOf() === contrasenyaCorrecta.valueOf()) {

        usuario.save(
          { email: email },
          { success: function(model, response) {
              console.log('test ok')
              console.log(model);
              console.log(response);
            },
            error: function(model, response) {
              console.log('test error')
              console.log(model);
              console.log(response);
            }
          });

        var perfilUsuario = new Perfil();

        perfilUsuario.fetch({
          data: $.param({ usuario: nickname})
        }).then(function (response) {
          perfilUsuario.save(
          {
            nombre: nombre,
            apellidos: apellidos,
            email: email,
            direccion: direccion,
            localidad: localidad,
            provincia: provincia
          },
          { success: function(model, response) {
              console.log('perfil ok')
              console.log(model);
              console.log(response);
            },
            error: function(model, response) {
              console.log('perfil error')
              console.log(model);
              console.log(response);
            }
          });
          window.location.href="#infoRegPerfilOk"; // redireccionamos a una página de info
        });
      } else {
        window.location.href="#infoRegPerfilError"; // redireccionamos a una página de info
      }

    });

  }
});

var VistaInfoPerfil = Backbone.View.extend({
  el: ('#contenido'),
  template: _.template($('#informacionPerfil').html()),
  initialize: function() {
    this.render();
  },
  render: function() {
    this.$el.append(this.template());
    return this;
  }
});

// ROUTER

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
    "infoRegPerfilError"    : "infoRegPerfilError"
   },
  initialize: function() {
    console.log('aplicando router');
  },
  index: function() {
    console.log('página del index');
    actualizarCategorias();
    if (sessionStorage.getItem('sesionActiva') === 'true') {
      window.location.href = '#accesoCorrecto'; // redireccionamos a la página de inicio personalizada
    } else {
      $('#sesion').html('<a href="#formAcceso">acceder</a>'); // modificamos el enlace de 'logout' por 'acceder'
      $('#titular').html('<h1>' + '¡ Bienvenido ! estos son algunos productos de nuestro catálogo' + '</h1>');
      seleccionarProductosDeInicio();
    }
  },
  mostrarProductosCategoria: function(categoria) {
    console.log('página de la categoria ' + categoria);
    $('#titular').html('<h1>' + 'libros de ' + categoria + '</h1>'); // cambiamos el titular de la página (pte poner la descripción de la BD)
    actualizarCategorias(); // redibujamos el menú de las categorías
    mostrarProductosCategoria(categoria); // mostramos los productos de la categoria
  },
  mostrarProducto: function(id) {
    console.log('página del producto: ' + id);
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
    $('#titular').html('<h1>' + 'hola cliente, los siguientes productos tienen descuento' + '</h1>'); // completar con el nombre de usuario
    sessionStorage.setItem('sesionActiva', 'true'); // guardamos estos datos en la sessionstore del navegador
    $('#sesion').html('<a href="#logout">cerrar sesión</a>'); // modificamos el enlace de 'acceso' por otro de 'cerrar sesión'
    actualizarCategorias();
    mostrarProductosConDescuento();
  },
  logout: function() {
    console.log('cerrando sesión');
    sessionStorage.setItem('sesionActiva', 'false'); // eliminamos el dato de sesión del sessionstore en el navegador
    $('#contenido').html("<ul id='productos'></ul>"); // borramos el contenido mostrado (necesario si estamos en la vista 'detalle de producto')
    window.location.href = '#index'; // redireccionamos a la página de inicio sin sesión
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
  }
});

// FUNCIONES

// función que muestra la vista con la información de la actualización del perfil.

function mostrarInfoRegistroPerfil() {
  $("#contenido").html(""); // limpiamos la pantalla
  var vistaInfoPerfil = new VistaInfoPerfil();
}

// función que muestra el perfil de usuario para usuarios registrados o pide el acceso a usuarios no registrados

function mostrarPerfilDeUsuario() {
  $("#contenido").html(""); // limpiamos la pantalla
  $("#container").removeClass('containerNormal');
  $("#container").addClass('containerAmpliado');

  if (sessionStorage.getItem('sesionActiva') === 'true') {
    $("#perfil").html(''); // quitamos el enlace al perfil en esta vista

    var vistaPerfilDeUsuario = new VistaPerfilDeUsuario(); // mostramos la plantilla

    // rellenamos los campos con los datos de que disponemos en la BD

    var nickname = sessionStorage.getItem('usuario');

    var user = new Usuario();
    var perfilUsuario = new Perfil();

    user.fetch({ data: $.param({ usuario: nickname}) }).then(function(response) {
      var email = response.email;
      $('#email').val(email);
    });

    perfilUsuario.fetch({ data: $.param({ usuario: nickname}) }).then(function(response) {
      var nombre = response.nombre;
      var apellidos = response.apellidos;
      var direccion = response.direccion;
      var localidad = response.localidad;
      var provincia = response.provincia;
      $('#nombre').val(nombre);
      $('#apellidos').val(apellidos);
      $('#direccion').val(direccion);
      $('#localidad').val(localidad);
      $('#provincia').val(provincia);
    });

  } else {
    window.location.href="#formRegistro"; // redireccionamos al formulario de registro
  }
}

// función que muestra el ok en el registro de un nuevo usuario

function mostrarInfoNuevoUsuario() {
  $("#contenido").html(""); // limpiamos la pantalla
  var vistaInfoRegistro2 = new VistaInfoRegistro;
  $('#inforeg').html('registro de usuario realizado correctamente');
}

// función que muestra el error de registro de usuario

function mostrarInfoErrorRegistro() {
  $("#contenido").html(""); // limpiamos la pantalla
  var vistainfoRegistro1 = new VistaInfoRegistro;
  $('#inforeg').html('Error de registro: el usuario ya existe');
}

// función que muestra en pantalla los productos con descuento para los usuarios registrados

function mostrarProductosConDescuento() {
  $("#contenido").html(""); // limpiamos la pantalla
  $("#contenido").append("<ul id='productos'></ul>"); // añadimos la lista vacía

  // instanciamos una colección de productos

  var productosConDescuento = new ListaDeProductos();

  // sincronizamos con la BD y mostramos la vista

  productosConDescuento.fetch({
    data: $.param({ tieneDescuento: true}), // incluimos una query string en la url con la categoria seleccionada
    success: function(){
      console.log('acceso a la BD: recuperando productos con descuento');
    },
    error: function(){
      console.log('error: productos no recuperados');
    }
  }).then(function(response) {
    var vistaListaDeProductos = new VistaListaDeProductos({collection: response});
  })
  console.log(productosConDescuento);
}

// función que muestra el error de credenciales incorrectas para el acceso a la tienda

function mostrarInfoErrorAcceso() {
  $("#contenido").html(""); // limpiamos la pantalla
  var vistaErrorAcceso = new VistaErrorAcceso;
}

// función que muestra el formulario de registro en la tienda

function mostrarFormularioDeRegistro() {
  $("#contenido").html(""); // limpiamos la pantalla
  var vistaFormularioDeRegistro = new VistaFormularioDeRegistro;  // mostramos la vista del formulario
}

// función que muestra el formulario de acceso a la tienda

function mostrarFormularioDeAcceso() {
  $("#contenido").html(""); // limpiamos la pantalla
  var vistaFormularioDeAcceso = new VistaFormularioDeAcceso;  // mostramos la vista del formulario
}

// función que muestra el contenido de la atención al cliente

function mostrarContenidoLegal(page) {
  $("#contenido").html(""); // limpiamos la pantalla

  // seleccionamos la vista según la página seleccionada

  switch (page) {
    case '1' : var vistaLegal1 = new VistaLegal1; break;
    case '2' : var vistaLegal2 = new VistaLegal2; break;
    case '3' : var vistaLegal3 = new VistaLegal3; break;
    default: var vistaLegal1 = new VistaLegal1;
  }
}

// función que muestra el contenido de la atención al cliente

function mostrarContenidoAtencionAlCliente() {
  $("#contenido").html(""); // limpiamos la pantalla
  var vistaAtencionAlCliente = new VistaAtencionAlCliente;  // seleccionamos la vista
}

// función que muestra el contenido de quienes somos

function mostrarContenidoQuienesSomos() {
  $("#contenido").html(""); // limpiamos la pantalla
  var vistaQuienesSomos = new VistaQuienesSomos;  // seleccionamos la vista
}

// función que muestra el contenido de ayuda

function mostrarContenidoAyuda(page) {
  $("#contenido").html(""); // limpiamos la pantalla

  // seleccionamos la vista según la página seleccionada

  switch (page) {
    case '1' : var vistaAyuda1 = new VistaAyuda1; break;
    case '2' : var vistaAyuda2 = new VistaAyuda2; break;
    case '3' : var vistaAyuda3 = new VistaAyuda3; break;
    default  : var vistaAyuda1 = new VistaAyuda1;
  }
}

// función que muestra el detalle del producto seleccionado

function mostrarDetalleDeProducto(id) {
  $("#contenido").html(""); // limpiamos la pantalla

  // instanciamos el producto

  var producto = new Producto();

  // sincronizamos con la BD y mostramos la vista,
  // Comprobamos si estamos en sesión de usuario registrado y en es caso
  // en la vista sustituimos el precio del producto por el nuevo precio con descuento

  producto.fetch({
    data: $.param({ identificador: id }), // incluimos una query string en la url con el id del producto seleccionado
    success: function(){
      console.log('acceso a la BD: recuperando producto de la BD');
    },
    error: function(){
      console.log('error: producto no recuperado');
    }
  }).then(function(response) {
    var vistaDetalleDeProducto = new VistaDetalleDeProducto({model: response});
    if (sessionStorage.getItem('sesionActiva') === 'true') {
      if (producto.get('tieneDescuento') === 'true') {
        $('#precio').addClass('tachado'); // tachamos el precio sin descuento
         // añadimos el nuevo precio
        var nuevoPrecio = producto.get('precio') * ( (100 - producto.get('descuento')) / 100);
        var nuevoHtml = '<br>' +
                        '<h3 class="subtitulo_detalle" id="precioConDescuento">Precio con descuento: ' +
                        nuevoPrecio +
                        ' €</h3>';
        $('#precio').after(nuevoHtml);
      }
    }
  })
}

// función que muestra los productos de la categoría seleccionada.
// pte condicionar que la muestra de productos sea de 12 en 12 y se añada un menú de páginas

function mostrarProductosCategoria(categoria) {
  $("#contenido").html(""); // limpiamos la pantalla
  $("#contenido").append("<ul id='productos'></ul>"); // devolvemos el contenido a su estado inicial

  // instanciamos una colección de productos

  var productosCategoria = new ListaDeProductos();

  // sincronizamos con la BD y mostramos la vista

  productosCategoria.fetch({
    data: $.param({ categoria: categoria}), // incluimos una query string en la url con la categoria seleccionada
    success: function(){
      console.log('acceso a la BD: recuperando productos de la categoria ' + categoria);
    },
    error: function(){
      console.log('error: productos no recuperados');
    }
  }).then(function(response) {
    var vistaListaDeProductos = new VistaListaDeProductos({collection: response});
  })

}

// función que muestra el menú de categorías.

function actualizarCategorias() {
  // limpiamos el menu para que no se vuelvan a añadir las categorias

  $('#categorias').html('');

  // instanciamos la colección de categorias

  var listaDeCategorias = new ListaDeCategorias();

  // recogemos las categorias de la BD e instanciamos la vista con la colección recuperada

  listaDeCategorias.fetch({
    success: function(){
      console.log('acceso a la BD: recuperando categorías');
    },
    error: function(){
      console.log('error: categorias no importadas');
    }
  }).then(function(response) {
    var vistaMenuCategorias = new VistaMenuCategorias({collection: response});
  })
};

// función que muestra una selección de 12 productos aleatorios en la página de inicio

function seleccionarProductosDeInicio() {
  // limpiamos los productos en pantalla para mostrar la nueva selección

  $('#productos').html('');

  // definimos la colección de productos

  var ListaDeProductosInicio = Backbone.Collection.extend({
    url: '/plazamar-spa-bb/api.php/productosInicio',
    model: Producto,
    idAttribute: "_id"
  });

  // instanciamos una colección de productos de inicio

  var seleccionProductosPaginaInicio = new ListaDeProductosInicio();

  // sincronizamos con la BD y mostramos la vista

  seleccionProductosPaginaInicio.fetch({
    wait: true,
    success: function(){
      console.log('acceso a la BD: recuperando selección de productos');
    },
    error: function(){
      console.log('error: productos no recuperados');
    }
  }).then(function(response) {
    var vistaListaDeProductos = new VistaListaDeProductos({collection: response});
  })
}