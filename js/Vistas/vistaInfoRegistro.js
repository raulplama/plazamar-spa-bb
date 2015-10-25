var VistaInfoRegistro = Backbone.View.extend({
  el: ('#contenido'),
  template: _.template($('#infoRegistro').html()),
  initialize: function() {
    this.render();
  },
  render: function() {
    this.$el.append(this.template());
    return this;
  }
});