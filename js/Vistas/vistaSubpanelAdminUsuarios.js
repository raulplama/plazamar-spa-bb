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