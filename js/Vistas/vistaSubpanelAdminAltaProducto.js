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