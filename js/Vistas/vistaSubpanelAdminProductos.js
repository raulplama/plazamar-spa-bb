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