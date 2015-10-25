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