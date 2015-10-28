// FUNCIONES UTILIZADAS EN EL ROOTER

// función que muestra la vista con los productos listos para comprar

function mostrarProductosParaComprar() {
  $("#contenido").html("<ul id='productos'></ul>"); // limpiamos la pantalla
  $("#container").removeClass('containerNormal');
  $("#container").addClass('containerAmpliado');
  // comprobamos si hay una carrito con productos
  var usuario =  docCookies.getItem('usuario');
  var idAnonimo = docCookies.getItem('idAnonimo');
  if (usuario !== null) {
    var carritoUsuario = new CarroCompra();
    carritoUsuario.fetch({
      data: $.param({ carritoUsuario: usuario, idAnonimo: idAnonimo }),
      success: function(model, response) {
        if (response === 'false') {
          $("#contenido").html("El carro de la compra está vacío");
        } else {
          // console.log(response);
          // obtenemos los productos seleccionados
          listaDeProductosSeleccionados = response.idsProductos;
          // pasamos los productos de string a array
          arrayProductos = listaDeProductosSeleccionados.split(',');
          // console.log(arrayProductos);
          // por cada producto recogemos sus datos de la bd y los incorporamos a la colección
          _.each(arrayProductos, function(element, index, list) {
            var producto = new Producto();
            producto.fetch({
              data: $.param({ idProducto: element }),
              success: function(model, response) {
                //console.log('producto ' + element + ' añadido');
                //console.log(response);
                // instanciamos una vista de producto y le pasamos el modelo
                var vistaProductoAComprar = new VistaProductoAComprar({el: $('#productos'), model: response});
              },
              error: function(model, response) {
                console.log('error conexion');
              }
            });
          });
        }
      },
      error: function(model, response) {
        console.log('error de conexion');
      }
    });
  } else {
    $("#contenido").html("El carro de la compra está vacío");
  }
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
    // comprobamos si hay una sesion abierta para el usuario o si accede con su usuario de google
    // en ambos casos accede a los productos con descuento
    var usuario = docCookies.getItem('usuario');
    var gtoken = docCookies.getItem('gtoken');
    if (usuario && gtoken && usuario === gtoken) {
      // es un usuario accediendo con google
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
      // no accede con google, comprobamos si está registrado en la tienda
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