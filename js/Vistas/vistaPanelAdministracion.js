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
    'click #botonProductos' : 'mostrarSubpanelProductos'
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
  }
});