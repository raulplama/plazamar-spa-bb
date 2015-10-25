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