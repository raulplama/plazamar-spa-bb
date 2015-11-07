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
            //console.log(response);
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