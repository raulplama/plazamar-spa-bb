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