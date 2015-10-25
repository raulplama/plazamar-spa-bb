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