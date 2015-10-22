// Activo la aplicación: el ruter y la función de 'historia' de Backbone

$(document).ready(function() {
  var router = new Router; // activamos el router
  Backbone.history.start();   // activamos la función de historial de Backbone
});

// MODELOS

var Categoria = Backbone.Model.extend({
  url: '/plazamar-spa-bb/api.php/categoria',
  defaults: {
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
    id: '',
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
  idAttribute: "_id"
})

var Sesion = Backbone.Model.extend({
  url: '/plazamar-spa-bb/api.php/sesion',
  defaults: {
    usuario: null,
    tipo: 'usuario',
  },
  idAttribute: '_id'
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
    this.$el.append(this.template(this.model));
    return this;
  }
});

var VistaMenuCategorias = Backbone.View.extend({
  el: ("#categorias"),
  initialize: function() {
    this.render();
  },
  render: function() {
    this.collection.forEach(this.addUnaCategoria, this);
    return this;
  },
  addUnaCategoria: function(modelo, index, collection) {
    var vistaCategoria = new VistaCategoria({model: modelo});
  }
});

var VistaProducto = Backbone.View.extend({
  template: _.template($("#listado_productos").html()),
  initialize: function() {
    this.render();
  },
  render: function() {
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
  events: {
    'click #comprar' : 'comprarProducto'
  },
  initialize: function() {
    console.log('aplicando vista detalle de producto');
    this.render();
  },
  render: function() {
    this.$el.append(this.template(this.model));
    return this;
  },
  comprarProducto: function(e) {
    e.preventDefault();
    ////////////////////////////////////////////////////////////////////////////////////////////////
    // pte de implementar
    ////////////////////////////////////////////////////////////////////////////////////////////////
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
      success: function(model, response){
        console.log('acceso a la BD: recuperando usuario');
        if (response.valueOf() === 'false') {
          // no existe el usuario
          console.log('el usuario no existe');
          window.location.href = '#errorEnAcceso';
        } else {
          // tenemos un usuario, comprobamos las contraseñas
          var contrasenya = response.password;
          if (password.valueOf() === contrasenya.valueOf()) {
            // obtenemos el tipo de usuario de que se trata
            var tipoUsuario = response.type;
            // abrimos una sesión para este usuario
            var sesionUsuario = new Sesion({
              usuario: usuario,
              tipo: tipoUsuario
            });
            sesionUsuario.save({},{
              success: function(model, response) {
                console.log('sesion creada');
                window.location.href = '#accesoCorrecto';
              },
              error: function(model, response) {
                console.log('error en la conexion');
              }
            })
            // guardamos en una cookie el nombre del usuario para futuras consultas
            // maxima edad de la cookie: por defecto la sesion (cierre del navegador)
            document.cookie = "usuario=" + usuario;
          } else {
            // no coinciden las contraseñas
            console.log('las contraseñas no coinciden');
            window.location.href = '#errorEnAcceso'
          }
        }
      },
      error: function(){
        console.log('error: usuario no recuperado');
      }
    });
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
            // crear un perfil vacío para el nuevo usuario y grabarlo en la BD
            var perfilNuevoUsuario = new Perfil({
              usuario: nuevoNombreUsuario,
              email: nuevoEmail
            });
            perfilNuevoUsuario.save();
            // redirigir a la página de info registro ok
            window.location.href = '#okRegistroUsuario';
          },
          error : function(model, response) {
            console.log('error');
          }
        })
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

var VistaPanelAdministracion = Backbone.View.extend({
  el: ('#container'),
  template: _.template($('#panelAdministracion').html()),
  initialize: function() {
    this.render();
  },
  render: function() {
    this.$el.append(this.template());
    return this;
  },
  events: {
    'click #botonCategorias' : 'mostrarSubpanelCategorias',
    'click #botonProductos' : 'mostrarSubpanelProductos',
    'click #botonUsuarios' : 'mostrarSubpanelUsuarios'
  },
  mostrarSubpanelCategorias: function(e) {
    e.preventDefault();
    $("#subpaneles").html("");
    var vistaSubpanelCategorias = new VistaSubpanelCategorias();
  },
  mostrarSubpanelProductos: function(e) {
    e.preventDefault();
    $("#subpaneles").html("");
    var vistaSubpanelProductos = new VistaSubpanelProductos();
  },
  mostrarSubpanelUsuarios: function(e) {
    e.preventDefault();
    $("#subpaneles").html("");
    var vistaSubpanelUsuarios = new VistaSubpanelUsuarios();
  }
});

var VistaSubpanelCategorias = Backbone.View.extend({
  el: ('#subpaneles'),
  template: _.template($('#subPanelCategorias').html()),
  initialize: function() {
    this.render();
    this.completarDesplegablesCategoriasAModificarYBorrar();
  },
  render: function() {
    this.$el.append(this.template());
    return this;
  },
  completarDesplegablesCategoriasAModificarYBorrar: function() {
    // recuperamos de la BD las categorias existentes
    var listaDeCategoriasEnBD = new ListaDeCategorias();
    listaDeCategoriasEnBD.fetch({
      success: function(collection, response) {
        // borramos el listado existente
        $('.cat').remove();
        // creamos un elemento del listado por cada categoria y lo incorporamos al desplegable
        _.each(response, function(element, index, list) {
          var nombreCat = element.nombre;
          $("#modificarCategoria").append("<option id='" + nombreCat + "' class='cat'>" + nombreCat + "</option>");
          $("#borrarCategoria").append("<option id='" + nombreCat + "' class='cat'>" + nombreCat + "</option>");
        });
      }
    });
  },
  events: {
    'click #botonNuevaCategoria' : 'altaCategoriaEnBD',
    'click #botonModificarNombreCategoria' : 'modificarCategoriaEnBD',
    'click #botonBorrarCategoria' : 'borrarCategoriaEnBD',
  },
  altaCategoriaEnBD: function(e) {
    e.preventDefault();
    // limpiamos la zona de info
    $("#mensajeCategorias").html('');
    // recogemos los datos introducidos
    var nombreNuevaCategoria = $("#nombreNuevaCategoria").val();
    var descripcionNuevaCategoria = $("#descripcionNuevaCategoria").val();
    // validamos los datos y los pasamos a la BD
    if (nombreNuevaCategoria !== '' && descripcionNuevaCategoria !== '') {
      var nuevaCategoria = new Categoria({
        nombre: nombreNuevaCategoria,
        descripcion: descripcionNuevaCategoria
      });
      // comprobar si existe ya la categoria
      nuevaCategoria.fetch({
        data: $.param({ nombre: nombreNuevaCategoria }),
        error: function(model, response) {
          console.log(response);
        }
      }).then(function(response) {
        if (response.valueOf() === 'false') {
          // no existe la categoría, procedemos a grabar los datos en la BD
          nuevaCategoria.save({},{
            success: function(model, response) {
              // informamos al admin
              $('#mensajeCategorias').html('creada nueva categoría en la BD: ' + nombreNuevaCategoria);
              // añadimos la nueva categoria a las listas desplegables
              $("#modificarCategoria").append("<option id='" + model.get('nombre') + "' class='cat'>" + model.get('nombre') + "</option>");
              $("#borrarCategoria").append("<option id='" + model.get('nombre') + "' class='cat'>" + model.get('nombre') + "</option>");
            },
            error: function() {
              // informamos
              $('#mensajeCategorias').html('no ha podido crearse o ya exite la categoría en la BD');
            }
          });
        } else {
          // la categoria existe, lo notificamos
          $('#mensajeCategorias').html('error: la nueva categoría ya existe en la BD');
        }
      });
    } else {
      // los campos están vacíos, lo notificamos
      $('#mensajeCategorias').html('error: la nueva categoría debe tener un nombre y una descripción');
    }
    // limpiamos los campos de texto
    $('input').val('');
  },
  modificarCategoriaEnBD: function(e) {
    e.preventDefault();
    // limpiamos la zona de info
    $("#mensajeCategorias").html('');
    // recogemos los datos introducidos
    var nombreAntiguo = $('#modificarCategoria').val();
    var nuevoNombreCategoria = $("#nuevoNombreCategoriaModif").val();
    var nuevaDescripcionCategoria = $("#nuevaDescripcionCategoriaModif").val();
    // validamos los datos y los pasamos a la BD
    if (nuevoNombreCategoria !== '' && nuevaDescripcionCategoria !== '') {
      var catAModificar = new Categoria();
      catAModificar.fetch({
        success: function(model, response) {
          catAModificar.save({
            nombre: nuevoNombreCategoria,
            descripcion: nuevaDescripcionCategoria
            }, {
            url: '/plazamar-spa-bb/api.php/categoria/' + nombreAntiguo,
            patch: true,
            beforeSend: function(xhr) {
              xhr.setRequestHeader('X-HTTP-Method-Override', 'put');
            },
            success: function(model, response) {
              // informamos al admin
              $('#mensajeCategorias').html('categoría modificada, nueva categoria: ' + nuevoNombreCategoria);
              // actualizamos los desplegables --> ¡¡ BUSCAR LA FORMA DE NO REPETIR ESTA FUNCIÓN !! (está escrita más arriba)
              // recuperamos de la BD las categorias existentes
              var listaDeCategoriasEnBD = new ListaDeCategorias();
              listaDeCategoriasEnBD.fetch({
                success: function(collection, response) {
                  // borramos el listado existente
                  $('.cat').remove();
                  // creamos un elemento del listado por cada categoria y lo incorporamos al desplegable
                  _.each(response, function(element, index, list) {
                    var nombreCat = element.nombre;
                    $("#modificarCategoria").append("<option id='" + nombreCat + "' class='cat'>" + nombreCat + "</option>");
                    $("#borrarCategoria").append("<option id='" + nombreCat + "' class='cat'>" + nombreCat + "</option>");
                  });
                }
              });
            },
            error: function() {
              // informamos al admin
              $('#mensajeCategorias').html('error: no ha podido modificarse la categoría en la BD');
            }
          })
        }
      })
    } else {
      // los campos están vacíos, lo notificamos
      $('#mensajeCategorias').html('error: la categoría modificada debe tener un nombre y una descripción');
    }
    // limpiamos los campos de texto
    $('input').val('');
  },
  borrarCategoriaEnBD: function(e) {
    e.preventDefault();
    // limpiamos la zona de la info
    $("#mensajeCategorias").html('');
    // recoger la categoría seleccionada y borrarla de la BD
    var categoriaSeleccionadaParaBorrar = $('#borrarCategoria').val();
    var categoriaABorrar = new Categoria();
    // dado que el rest no nos deja mandar directamente un 'delete' empleamos un 'fetch' y en el interior
    // le indicamos que cambie la petición a 'delete': ver función 'beforeSend' y opción 'patch'
    categoriaABorrar.fetch({
      data: $.param({ nombre: categoriaSeleccionadaParaBorrar }),
      patch: true,
      beforeSend: function(xhr) {
        xhr.setRequestHeader('X-HTTP-Method-Override', 'delete');
      },
      success: function(model, response) {
        // actualizamos los desplegables --> ¡¡ BUSCAR LA FORMA DE NO REPETIR ESTA FUNCIÓN !! (está escrita más arriba)
        // recuperamos de la BD las categorias existentes
        var listaDeCategoriasEnBD = new ListaDeCategorias();
        listaDeCategoriasEnBD.fetch({
          success: function(collection, response) {
            // borramos el listado existente
            $('.cat').remove();
            // creamos un elemento del listado por cada categoria y lo incorporamos al desplegable
            _.each(response, function(element, index, list) {
              var nombreCat = element.nombre;
              $("#modificarCategoria").append("<option id='" + nombreCat + "' class='cat'>" + nombreCat + "</option>");
              $("#borrarCategoria").append("<option id='" + nombreCat + "' class='cat'>" + nombreCat + "</option>");
            });
          }
        });
        // info para el admin
        $('#mensajeCategorias').append('<span>categoría borrada de la BD</span></br>');
      },
      error: function() {
        $('#mensajeCategorias').append('<span>error en el borrado de la BD, categoria no borrada</span>');
      }
    });
    // borrar también todos los productos de dicha categoria
    var listaDeProductosABorrar = new ListaDeProductos();
    listaDeProductosABorrar.fetch({
      data: $.param({ categoria: categoriaSeleccionadaParaBorrar }),
    });
    // para mandar la opción delete utilizamos la misma acción que con las categorias, utilizamos un fetch y en
    // el interior un delete
    listaDeProductosABorrar.fetch({
      data: $.param({ categoria: categoriaSeleccionadaParaBorrar }),
      patch: true,
      beforeSend: function(xhr) {
        xhr.setRequestHeader('X-HTTP-Method-Override', 'delete');
      },
      success: function(model, response) {
        $('#mensajeCategorias').append('<span>productos de la categoria borrados de la BD.</span></br>');
        console.log(response);
      },
      error: function() {
        $('#mensajeCategorias').append('<span>error en el borrado de la BD, productos no borrados</span>');
      }
    })
  }
});

var VistaSubpanelAltaProducto = Backbone.View.extend({
  el: ('#subsubpanel'),
  template: _.template($('#subPanelAltaProducto').html()),
  initialize: function() {
    this.render();
    this.completarDesplegableCategorias();
    $('#info').html("");
  },
  render: function() {
    this.$el.append(this.template());
    return this;
  },
  completarDesplegableCategorias: function() {
    // recuperamos de la BD las categorias existentes
    var listaDeCategoriasEnBD = new ListaDeCategorias();
    listaDeCategoriasEnBD.fetch({
      success: function(collection, response) {
        // borramos el listado existente
        $('.cat').remove();
        // creamos un elemento del listado por cada categoria y lo incorporamos al desplegable
        _.each(response, function(element, index, list) {
          var nombreCat = element.nombre;
          $("#categoria").append("<option class='cat'>" + nombreCat + "</option>");
        });
      }
    });
  },
  events: {
    'submit' : 'altaProductoEnBD',
  },
  altaProductoEnBD: function(e) {
    e.preventDefault();
    // limpiamos la zona de info
    $("#mensajeProducto").html('');
    $("#info").html('');
    // recogemos los datos introducidos
    var tituloProducto = $("#titulo").val();
    var autorProducto = $("#autor").val();
    var editorialProducto = $("#editorial").val();
    var precioProducto = $("#precio").val();
    var isbnProducto = $("#isbn").val();
    var categoriaProducto = $("#categoria").val();
    var tieneDescuentoProducto = $("#tieneDescuento").val();
    var descuentoProducto = $("#descuento").val();
    if ($('#file')[0].files[0]) {
      var archivoImagenProducto = $('#file')[0].files[0];
      var nombreArchivoImagenProducto = $('#file')[0].files[0].name;
    } else {
      $('#mensajeProducto').html('error: selecciona un archivo de imagen para el producto');
    }
    // validamos los datos y los pasamos a la BD
    if (tituloProducto !== '' && autorProducto !== '' && editorialProducto !== '' &&
      precioProducto !== '' && isbnProducto !== '' && categoriaProducto !== '' && tieneDescuentoProducto !== '' &&
      descuentoProducto !== '' && nombreArchivoImagenProducto !== '') {
      // crear modelo producto
      var nuevoProducto = new Producto({
        titulo: tituloProducto,
        autor: autorProducto,
        editorial: editorialProducto,
        precio: precioProducto,
        isbn: isbnProducto,
        categoria: categoriaProducto,
        tieneDescuento: tieneDescuentoProducto,
        descuento: descuentoProducto,
        imagen: nombreArchivoImagenProducto,
        archivo: archivoImagenProducto
      });
      // comprobar si existe en la BD
      nuevoProducto.fetch({
        data: $.param({ isbn: isbnProducto }),
        success: function(model, response) {
          if (response === 'false') {
            // no existe el producto (id), procedemos a grabar los datos en la BD
            nuevoProducto.save({},{
              success: function(model, response) {
                // informamos al admin
                $('#mensajeProducto').html('creado nuevo producto en la BD: ' + tituloProducto);
                console.log('producto creado');
                // AHORA SUBIMOS EL ARCHIVO DE IMAGEN MEDIANTE PETICION AJAX:
                // Create a new FormData object.
                var formData = new FormData();
                // añdimos el archivo al objeto formdata
                formData.append('archivo', archivoImagenProducto, nombreArchivoImagenProducto);
                // Set up the request.
                var xhr = new XMLHttpRequest();
                // Open the connection.
                xhr.open('POST', 'api.php/archivoImagen', true);
                 // Send the Data.
                xhr.send(formData);
                // Set up a handler for when the request finishes.
                xhr.onload = function (evento) {
                  if (xhr.status === 200) {
                    // File uploaded.
                    console.log('archivo subido');
                    console.log(evento.currentTarget.response);
                  } else {
                    console.log('error en la subida del archivo');
                  }
                };
              },
              error: function(model, response) {
                // informamos
                $('#mensajeProducto').html('no ha podido crearse el producto en la BD');
                console.log(model);
              }
            });
          } else {
            // el producto (id) existe, lo notificamos
            $('#mensajeProducto').html('error: el nuevo Producto (id) ya existe en la BD');
          }
        }
      });
      // si no existe lo añadimos a la BD
    } else {
      // los campos están vacíos, lo notificamos
      $('#mensajeProducto').html('error: se deben rellenar todos los campos incluído la imagen de producto');
    }
    // limpiamos los campos de texto
    $('input').val('');
  }
});

var VistaDetalleDeProductoAdministrador = Backbone.View.extend({
  el: ('#subpanelProductos'),
  template: _.template($('#subPanelDetalleProducto').html()),
  initialize: function() {
    this.render();
    this.completarDesplegableCategorias();
  },
  render: function() {
    this.$el.html(this.template(this.model.toJSON()));
    return this;
  },
  completarDesplegableCategorias: function() {
    // recuperamos de la BD las categorias existentes
    var listaDeCategoriasEnBD = new ListaDeCategorias();
    listaDeCategoriasEnBD.fetch({
      success: function(collection, response) {
        // borramos el listado existente
        $('.categ').remove();
        // creamos un elemento del listado por cada categoria y lo incorporamos al desplegable
        _.each(response, function(element, index, list) {
          var nombreCat = element.nombre;
          $("#categorias").append("<option class='categ'>" + nombreCat + "</option>");
        });
      }
    });
  },
  events: {
    'click #modificarProducto' : 'modificarProductoEnBD',
    'click #borrarProducto' : 'borrarProductoEnBD'
  },
  modificarProductoEnBD: function(e) {
    e.preventDefault();
    // recogemos los datos del producto
    var id = $("#id").val();
    var titulo = $("#titulo").val();
    var autor = $("#autor").val();
    var editorial = $("#editorial").val();
    var precio = $("#precio").val();
    var isbn = $("#isbn").val();
    var categoria = $("#categorias").val();
    var tieneDescuento = $("#tieneDescuento").val();
    var descuento = $("#descuento").val();
    if ($('#file')[0].files[0]) {
      var imagen = $('#file')[0].files[0].name;
    } else {
      $('#mensajeProducto').html('error: selecciona un archivo de imagen para el producto');
    }
    // limpiamos todo los subsubpaneles
    $("#subpanelProductos").html('');
    $("#mensajeProducto").html('');
    // validamos los datos, creamos el modelo y lo actualizamos en la BD
    if (id !== '' && titulo !== '' && autor !== '' && editorial !== '' && precio !== '' && isbn !== '' &&
      categoria !== '' && tieneDescuento !== '' && descuento !== '') {
      var prodModifcar = new Producto();
      prodModifcar.fetch({
        data: $.param({ identificador: id }),
        success: function(model, response) {
          prodModifcar.save({
            id: id,
            titulo: titulo,
            autor: autor,
            editorial: editorial,
            precio: precio,
            isbn: isbn,
            categoria: categoria,
            tieneDescuento: tieneDescuento,
            descuento: descuento,
            imagen: imagen
            }, {
            url: '/plazamar-spa-bb/api.php/producto',
            patch: true,
            beforeSend: function(xhr) {
              xhr.setRequestHeader('X-HTTP-Method-Override', 'put');
            },
            success: function(model, response) {
              // informamos al admin
              $('#mensajeProducto').html('producto modificado en la BD');

            },
            error: function() {
              // informamos al admin
              $('#mensajeProducto').html('error: no ha podido modificarse el producto en la BD');
            }
          })
        }
      })
    } else {
      // los campos están vacíos, lo notificamos
      $('#mensajeProducto').html('error: deben rellenarse todos los campos');
    }
  },
  borrarProductoEnBD: function(e) {
    e.preventDefault();
    // recogemos el producto
    var id = $("#id").val();
    // limpiamos todo los subsubpaneles
    $("#subpanelProductos").html('');
    $("#mensajeProducto").html('');
    // borramos el modelo de la bd
    var productoSelecc = new Producto({ identificador: id });
    productoSelecc.fetch({
      data: $.param({ identificador: id }),
      success: function(model, response) {
        productoSelecc.fetch({
          data: $.param({ identificador: id }),
          patch: true,
          beforeSend: function(xhr) {
            xhr.setRequestHeader('X-HTTP-Method-Override', 'delete');
          },
          success: function(model, response) {
            $('#mensajeProducto').append('producto borrado de la BD');
            console.log(response);
          },
          error: function(model, response) {
            $('#mensajeProducto').append('error: producto no borrado de la BD');
            console.log(response);
          }
        })
      },
      error: function(model, response) {
        console.log(response);
      }
    });
  }
})

var VistaSubpanelModificacionProducto = Backbone.View.extend({
  el: ('#subsubpanel'),
  template: _.template($('#subPanelModificacionProducto').html()),
  initialize: function() {
    this.render();
    this.completarDesplegableCategorias();
  },
  render: function() {
    this.$el.append(this.template());
    return this;
  },
  completarDesplegableCategorias: function() {
    // recuperamos de la BD las categorias existentes
    var listaDeCategoriasEnBD = new ListaDeCategorias();
    listaDeCategoriasEnBD.fetch({
      success: function(collection, response) {
        // borramos el listado existente
        $('.cat').remove();
        // creamos un elemento del listado por cada categoria y lo incorporamos al desplegable
        _.each(response, function(element, index, list) {
          var nombreCat = element.nombre;
          $("#categoria").append("<option class='cat'>" + nombreCat + "</option>");
        });
      }
    });
  },
  events: {
    'click #buscarProductos' : 'buscarProductosCategoria',
    'click .prod' : 'seleccionarProducto'
  },
  buscarProductosCategoria: function(e) {
    e.preventDefault();
    // limpiamos todo los subsubpaneles
    $("#subpanelProductos").html('');
    $("#mensajeProducto").html('');
    // recogemos los datos introducidos
    var categoria = $("#categoria").val();
    // recogemos los productos de la categoria desde la bd
    var productosCategoria = new ListaDeProductos();
    productosCategoria.fetch({
      data: $.param({ categoria: categoria, ordenar: 'si' }),
      success: function(collection, response) {
        if (response.length === 0) {
          $("#listaProductos").remove();
          // info para el admin
          $('#mensajeProducto').html('no existen productos en esa categoría');
        } else {
          // creamos la lista de productos con los datos de la bd
          $("#listaProductos").remove();
          $("#subpanelProductos").append("<ul id='listaProductos'></ul>");
          _.each(response, function(element, index, list) {
            var tituloProducto = element.titulo;
            $("#listaProductos").append("<li class='prod'>" + tituloProducto + "</li>");
          });
        }
      }
    });
  },
  seleccionarProducto: function(e) {
    e.preventDefault();
    // obtener el titulo del elemento pulsado
    var titulo = e.target.innerHTML;
    // limpiamos todo los subsubpaneles
    $("#subpanelProductos").html('');
    $("#mensajeProducto").html('');
    // recuperamos el modelo
    var productoSeleccionado = new Producto();
    productoSeleccionado.fetch({
      data: $.param({ titulo: titulo }),
      success: function(model, response) {
        // mostramos en el subpanel los detalles del producto
      var vistaDetallesDelProducto = new VistaDetalleDeProductoAdministrador({model: productoSeleccionado});
      }
    })
  }
});

var VistaSubpanelProductos = Backbone.View.extend({
  el: ('#subpaneles'),
  template: _.template($('#subPanelProductos').html()),
  initialize: function() {
    this.render();
  },
  render: function() {
    this.$el.append(this.template());
    return this;
  },
  events: {
        'click #botonAltaProducto' : 'mostrarSubpanelAltaProducto',
        'click #botonModificacionProducto' : 'mostrarSubpanelModificacionProducto',
        'click #botonBorrarProducto' : 'mostrarSubpanelModificacionProducto'
  },
  mostrarSubpanelAltaProducto: function(e) {
    e.preventDefault();
    $("#subsubpanel").html("");
    var vistaSubpanelAltaProducto = new VistaSubpanelAltaProducto();
  },
  mostrarSubpanelModificacionProducto: function(e) {
    e.preventDefault();
    $("#subsubpanel").html("");
    var vistaSubpanelModificacionProducto = new VistaSubpanelModificacionProducto();
  }
});

var VistaSubpanelAltaUsuario = Backbone.View.extend({
  el: ('#subsubpanel'),
  template: _.template($('#subPanelAltaUsuario').html()),
  initialize: function() {
    this.render();
    //this.infoTotalUsuariosEnBD();
    //this.infoUltimoIDUsuarioenBD();
  },
  render: function() {
    this.$el.append(this.template());
    return this;
  },/*
  infoTotalUsuariosEnBD : function() {
    var usuariosTotales = new ListaDeUsuarios();
    usuariosTotales.fetch({
      data: $.param({ total: 'totalUsuarios' }),
      success: function(model, response) {
        $('#info').append("<span>número total de usuarios en la BD: " + response + "</span></br>");
      },
      error: function(model, response) {
        console.log(response);
      }
    })
  },
  infoUltimoIDUsuarioenBD: function() {
    var ultimoUsuario = new ListaDeUsuarios();
    ultimoUsuario.fetch({
      data: $.param({ ultimoUsuarioEnBD: 'ultimoUsuarioEnBD' }),
      success: function(model, response) {
        console.log(response);
        $('#info').append("<span>ID del último usuario: " + response[0].id + "</span>");
      },
      error: function(model, response) {
        console.log(response);
      }
    });
  },*/
  events: {
    'click #altaUsuario' : 'altaUsuarioEnBD'
  },
  altaUsuarioEnBD: function(e) {
    e.preventDefault();
    // limpiamos la zona de info
    $("#mensajeUsuario").html('');
    // recogemos los datos introducidos
    var nickusuario = $("#usuario").val();
    var contra = $("#password").val();
    var mail = $("#email").val();
    var tipo = $("#tipo").val();
    // validamos los datos y los pasamos a la BD
    if (nickusuario !== '' && contra !== '' && mail !== '' && tipo !== '') {
      // crear modelo producto
      var nuevoUsuario = new Usuario({
        usuario: nickusuario,
        password: contra,
        email: mail,
        type: tipo
      });
      // comprobar si existe en la BD
      nuevoUsuario.fetch({
        data: $.param({ usuario: nickusuario })
      }).then(function(response) {
        if (response === 'false') {
            // no existe el usuario, procedemos a grabar los datos en la BD
            nuevoUsuario.save({},{
              success: function(model, response) {
                // informamos al admin
                $('#mensajeUsuario').html('creado nuevo usuario en la BD: ' + nickusuario);
                // crear un perfil vacío para el nuevo usuario y grabarlo en la BD
                var perfilNuevoUsuario = new Perfil({
                  usuario: nickusuario,
                  email: mail
                });
                perfilNuevoUsuario.save();
              },
              error: function() {
                // informamos
                $('#mensajeUsuario').html('no ha podido crearse o ya exite el usuario en la BD');
              }
            });
          } else {
            // el producto (id) existe, lo notificamos
            $('#mensajeUsuario').html('error: el nuevo usuario ya existe en la BD');
          }
      });
    } else {
      // los campos están vacíos, lo notificamos
      $('#mensajeUsuario').html('error: se deben rellenar todos los campos');
    }
    // limpiamos los campos de texto
    $('input').val('');
  }
});

var VistaDetalleDeUsuarioAdministrador = Backbone.View.extend({
  el: ('#subpanelUsuarios'),
  template: _.template($('#subPanelDetalleUsuario').html()),
  initialize: function() {
    this.render();
  },
  render: function() {
    this.$el.html(this.template(this.model.toJSON()));
    return this;
  },
  events: {
    'click #modificarUsuario' : 'modificarUsuarioEnBD',
    'click #borrarUsuario' : 'borrarUsuarioEnBD'
  },
  modificarUsuarioEnBD: function(e) {
    e.preventDefault();
    // recogemos los datos del usuario
    var id = $("#id").val();
    var nickusuario = $("#usuario").val();
    var mail = $("#email").val();
    var tipo = $("#tipo").val();
    // limpiamos todo los subsubpaneles
    $("#subpanelUsuarios").html('');
    $("#mensajeUsuario").html('');
    // validamos los datos, creamos el modelo y lo actualizamos en la BD
    if (id !== '' && nickusuario !== '' && mail !== '' && tipo !== '') {
      var usuarioModificar = new Usuario();
      usuarioModificar.fetch({
        data: $.param({ identificador: id }),
        success: function(model, response) {
          usuarioModificar.save({
            id: id,
            usuario: nickusuario,
            email: mail,
            type: tipo
            }, {
            url: '/plazamar-spa-bb/api.php/usuario',
            patch: true,
            beforeSend: function(xhr) {
              xhr.setRequestHeader('X-HTTP-Method-Override', 'put');
            },
            success: function(model, response) {
              // informamos al admin
              $('#mensajeUsuario').html('usuario modificado en la BD');
              // modificamos el perfil acorde con los nuevos datos del usuario
              var perfilUsuario = new Perfil();
              perfilUsuario.fetch({
                data: $.param({ identificador: id }),
                success: function() {
                  console.log('test');
                },
                error: function() {
                  console.log('error');
                }
              }).then(function (response) {
                console.log(response);
                perfilUsuario.save({
                  id: response.id,
                  usuario: nickusuario,
                  email: mail,
                  nombre: response.nombre,
                  apellidos: response.apellidos,
                  direccion: response.direccion,
                  localidad: response.localidad,
                  provincia: response.provincia
                  }, {
                  url: '/plazamar-spa-bb/api.php/perfil',
                  patch: true,
                  beforeSend: function(xhr) {
                    xhr.setRequestHeader('X-HTTP-Method-Override', 'put');
                  },
                  success: function(model, response) {
                    console.log('perfil ok')
                  },
                  error: function(model, response) {
                    console.log('perfil error')
                  }
                });
              });
            },
            error: function() {
              // informamos al admin
              $('#mensajeUsuario').html('error: no ha podido modificarse el usuario en la BD');
            }
          });
        }
      })
    } else {
      // los campos están vacíos, lo notificamos
      $('#mensajeUsuario').html('error: deben rellenarse todos los campos');
    }
  },
  borrarUsuarioEnBD: function(e) {
    e.preventDefault();
    // recogemos el producto
    var id = $("#id").val();
    // limpiamos todo los subsubpaneles
    $("#subpanelUsuarios").html('');
    $("#mensajeUsuario").html('');
    // borramos el modelo de la bd
    var usuarioSelecc = new Usuario();
    usuarioSelecc.fetch({
      data: $.param({ identificador: id }),
      success: function(model, response) {
        // borramos al usuario
        usuarioSelecc.fetch({
          data: $.param({ identificador: id }),
          patch: true,
          beforeSend: function(xhr) {
            xhr.setRequestHeader('X-HTTP-Method-Override', 'delete');
          },
          success: function(model, response) {
            $('#mensajeUsuario').append('usuario borrado de la BD');
            // borramos también el perfil del usuario
            var perfilUsuario = new Perfil();
            perfilUsuario.fetch({
              data: $.param({ identificador: id }),
              success: function(model, response) {
                console.log('ok');
                perfilUsuario.fetch({
                  data: $.param({ identificador: id }),
                  patch: true,
                  beforeSend: function(xhr) {
                    xhr.setRequestHeader('X-HTTP-Method-Override', 'delete');
                  },
                  error: function(model, response) {
                    console.log(response);
                  }
                });
              }
            });
          },
          error: function(model, response) {
            $('#mensajeUsuario').append('error: usuario no borrado de la BD');
          }
        })
      }
    });
  }
})

var VistaSubpanelModificacionUsuario = Backbone.View.extend({
  el: ('#subsubpanel'),
  template: _.template($('#subPanelModificacionUsuario').html()),
  initialize: function() {
    this.render();
  },
  render: function() {
    this.$el.append(this.template());
    return this;
  },
  events: {
    'click #buscarUsuarios' : 'buscarUsuariosPorTipo',
    'click .user' : 'seleccionarUsuario'
  },
  buscarUsuariosPorTipo: function(e) {
    e.preventDefault();
    // limpiamos todo los subsubpaneles
    $("#subpanelUsuarios").html('');
    $("#mensajeUsuario").html('');
    // recogemos los datos introducidos
    var tipo = $("#tipo").val();
    // recogemos los productos de la categoria desde la bd
    var usuariosTipo = new ListaDeUsuarios();
    usuariosTipo.fetch({
      data: $.param({ tipo: tipo, ordenar: 'si' }),
      success: function(collection, response) {
        if (response.length === 0) {
          $("#listaUsuarios").remove();
          // info para el admin
          $('#mensajeUsuario').html('no existen usuarios de ese tipo');
        } else {
          // creamos la lista de usuarios con los datos de la bd
          $("#listaUsuarios").remove();
          $("#subpanelUsuarios").append("<ul id='listaUsuarios'></ul>");
          _.each(response, function(element, index, list) {
            var usuario = element.usuario;
            $("#listaUsuarios").append("<li class='user'>" + usuario + "</li>");
          });
        }
      }
    });
  },
  seleccionarUsuario: function(e) {
    e.preventDefault();
    // obtener el titulo del elemento pulsado
    var usuario = e.target.innerHTML;
    // limpiamos todo los subsubpaneles
    $("#subpanelUsuarios").html('');
    $("#mensajeUsuario").html('');
    // recuperamos el modelo
    var usuarioSeleccionado = new Usuario();
    usuarioSeleccionado.fetch({
      data: $.param({ usuario: usuario }),
      success: function(model, response) {
        // mostramos en el subpanel los detalles del producto
      var vistaDetallesDelUsuario = new VistaDetalleDeUsuarioAdministrador({model: usuarioSeleccionado});
      }
    })
  }
});

var VistaSubpanelUsuarios = Backbone.View.extend({
  el: ('#subpaneles'),
  template: _.template($('#subPanelUsuarios').html()),
  initialize: function() {
    this.render();
  },
  render: function() {
    this.$el.append(this.template());
    return this;
  },
  events: {
    'click #botonAltaUsuario' : 'mostrarSubpanelAltaUsuario',
    'click #botonModificacionUsuario' : 'mostrarSubpanelModificacionUsuario',
    'click #botonBorrarUsuario' : 'mostrarSubpanelModificacionUsuario'
  },
  mostrarSubpanelAltaUsuario: function(e) {
    e.preventDefault();
    $("#subsubpanel").html("");
    var vistaSubpanelAltaUsuario = new VistaSubpanelAltaUsuario();
  },
  mostrarSubpanelModificacionUsuario: function(e) {
    e.preventDefault();
    $("#subsubpanel").html("");
    var vistaSubpanelModificacionUsuario = new VistaSubpanelModificacionUsuario();
  }
});

var VistaDivsContainer = Backbone.View.extend({
  el: ('#container'),
  template: _.template($('#divsContainer').html()),
  initialize: function() {
    this.render();
  },
  render: function() {
    this.$el.append(this.template());
    return this;
  }
});

var VistaProductoAComprar = Backbone.View.extend({
  el: $('#productos'),
  template: _.template($("#listaDeLaCompra").html()),
  initialize: function() {
    this.render();
  },
  render: function() {
    this.$el.append(this.template(this.model.toJSON));
    return this;
  }
});

var VistaListaDeLaCompra = Backbone.View.extend({
  initialize: function() {
    console.log(this.collection.models);
    this.render();
  },
  render: function() {
    this.collection.models.forEach(this.addUnProductoAComprar, this);
    return this;
  },
  addUnProductoAComprar: function(data) {
    console.log(data.attributes);
    var vistaProductoAComprar = new VistaProductoAComprar({model: data.attributes});
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
        console.log(response);
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
        sessionStorage.setItem('usuario', '');
        $("#container").html("");
        var vistaDivsContainer = new VistaDivsContainer();
        $('#contenido').html("<ul id='productos'></ul>"); // borramos el contenido mostrado (necesario si estamos en la vista 'detalle de producto')
      }
    })
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
  },
  carritoDeLaCompra: function() {
    $('#titular').html('<h1>' + 'carrito de la compra' + '</h1>');
    actualizarCategorias();
    mostrarProductosParaComprar();
  }
});

// FUNCIONES

// función que muestra la vista con los productos listos para comprar

function mostrarProductosParaComprar() {
  //////////////////////////////////////////////////////////////////////////////////////////////////////
  //pte de implementar
  //////////////////////////////////////////////////////////////////////////////////////////////////////
}

// función que muestra la información de los productos pasando el ratón por encima

function infoProducto() {
  $('.item').hover(
    function() {
      var isbnABuscar = $(".item").data("isbn");
      if (isbnABuscar !== '') {
          $('#infoPortada').show();
          }
          $.ajax({
              type: "GET",
              url: "/plazamar-spa-bb/api.php/producto",
              data: "isbn=" + $(this).data("isbn"),
              timeout: 3000,
              success: function(response){
                var json = JSON.parse(response);
                var html = '<p>titulo: ' + json.titulo + ', autor: ' +
                  json.autor + ', editorial: ' + json.editorial +
                  ', precio: ' + json.precio + '€ </p>'
                $("#infoPortada").html(html);
              },
              error: function() {
                  $("#infoPortada").html("<p>parece que no hay conexión a la base de datos</p>");
                }
        });
    },
    function() {
      $('#infoPortada').hide();
    }
  );
  $('.item').click(function() {
    $('#infoPortada').hide();
  });
}

// funcionalidad de la barra de busqueda

function busquedaProductos() {

  $("#buscador-input").blur(function(){
    $('#resultados-busqueda').hide();
  });

  function search() {
    var busqueda = $("#buscador-input").val();

    if(busqueda !== '') {
      $.ajax({
        type: "GET",
        url: "/plazamar-spa-bb/api.php/productos",
        data: "buscar=" + busqueda,
        timeout: 3000,
        beforeSend: function() {
          $('#iconoCarga').show();
        },
        success: function(response){
          $('#iconoCarga').hide();
          console.log(response);
          $("#resultados-busqueda").html(response);
        },
        error: function() {
          $('#iconoCarga').hide();
          $("#resultados-busqueda").html("<p>parece que no hay conexión con la base de datos</p>");
        }
      });
    }
  }

  $("#buscador-input").on("keyup", function(e) {
    // Set Timeout
    clearTimeout($.data(this, 'timer'));

    // Set Search String
    var search_string = $(this).val();

    // Do Search
    if (search_string !== '') {
      $('#resultados-busqueda').show();
      $(this).data('timer', setTimeout(search, 500));
    } else {
      $('#resultados-busqueda').hide();
    }
  });

}

// función que anima los productos mostrados en pantalla

function animarProductos() {
  $(".item").hover(
    function() {
      $(this).addClass("tossing");
    },
    function() {
      $(this).removeClass("tossing");
    }
  );
}

// función que configura el panel de administración de productos y categorías para el admin

function mostrarTablaDeAdministracion() {
  $("#container").html(""); // limpiamos la pantalla
  $("footer").remove();
  var vistaPanelAdministracion = new VistaPanelAdministracion();
}

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
  // comprobamos si hay una sesion abierta para el usuario
  var usuario =  docCookies.getItem('usuario');
  var sesionUsuario = new Sesion({ usuario: usuario });
  sesionUsuario.fetch({
    data: $.param({ comprobarSesionUsuario: usuario }),
    success: function(model, response) {
      if (response !== 'false') {
        // mostramos la plantilla
        var vistaPerfilDeUsuario = new VistaPerfilDeUsuario();

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
    },
    error: function(model, response) {
      console.log('error');
    }
  });
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
    error: function(){
      console.log('error: producto no recuperado');
    }
  }).then(function(response) {
    var vistaDetalleDeProducto = new VistaDetalleDeProducto({model: response});
    // comprobamos si hay una sesion abierta para el usuario
    var usuario = docCookies.getItem('usuario');
    var sesionUsuario = new Sesion({ usuario: usuario });
    sesionUsuario.fetch({
      data: $.param({ comprobarSesionUsuario: usuario }),
      success: function(model, response) {
        if (response !== 'false') {
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
        } else {

        }
      },
      error: function(model, response) {
        console.log('error');
      }
    });
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
    animarProductos();
    infoProducto();
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
    error: function(model, response){
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
    error: function(){
      console.log('error: productos no recuperados');
    }
  }).then(function(response) {
    var vistaListaDeProductos = new VistaListaDeProductos({collection: response});
    animarProductos();
    infoProducto();
  })
}

/*\
|*|
|*|  :: cookies.js ::
|*|
|*|  A complete cookies reader/writer framework with full unicode support.
|*|
|*|  Revision #1 - September 4, 2014
|*|
|*|  https://developer.mozilla.org/en-US/docs/Web/API/document.cookie
|*|  https://developer.mozilla.org/User:fusionchess
|*|
|*|  This framework is released under the GNU Public License, version 3 or later.
|*|  http://www.gnu.org/licenses/gpl-3.0-standalone.html
|*|
|*|  Syntaxes:
|*|
|*|  * docCookies.setItem(name, value[, end[, path[, domain[, secure]]]])
|*|  * docCookies.getItem(name)
|*|  * docCookies.removeItem(name[, path[, domain]])
|*|  * docCookies.hasItem(name)
|*|  * docCookies.keys()
|*|
\*/

var docCookies = {
  getItem: function (sKey) {
    if (!sKey) { return null; }
    return decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null;
  },
  setItem: function (sKey, sValue, vEnd, sPath, sDomain, bSecure) {
    if (!sKey || /^(?:expires|max\-age|path|domain|secure)$/i.test(sKey)) { return false; }
    var sExpires = "";
    if (vEnd) {
      switch (vEnd.constructor) {
        case Number:
          sExpires = vEnd === Infinity ? "; expires=Fri, 31 Dec 9999 23:59:59 GMT" : "; max-age=" + vEnd;
          break;
        case String:
          sExpires = "; expires=" + vEnd;
          break;
        case Date:
          sExpires = "; expires=" + vEnd.toUTCString();
          break;
      }
    }
    document.cookie = encodeURIComponent(sKey) + "=" + encodeURIComponent(sValue) + sExpires + (sDomain ? "; domain=" + sDomain : "") + (sPath ? "; path=" + sPath : "") + (bSecure ? "; secure" : "");
    return true;
  },
  removeItem: function (sKey, sPath, sDomain) {
    if (!this.hasItem(sKey)) { return false; }
    document.cookie = encodeURIComponent(sKey) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT" + (sDomain ? "; domain=" + sDomain : "") + (sPath ? "; path=" + sPath : "");
    return true;
  },
  hasItem: function (sKey) {
    if (!sKey) { return false; }
    return (new RegExp("(?:^|;\\s*)" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=")).test(document.cookie);
  },
  keys: function () {
    var aKeys = document.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, "").split(/\s*(?:\=[^;]*)?;\s*/);
    for (var nLen = aKeys.length, nIdx = 0; nIdx < nLen; nIdx++) { aKeys[nIdx] = decodeURIComponent(aKeys[nIdx]); }
    return aKeys;
  }
};