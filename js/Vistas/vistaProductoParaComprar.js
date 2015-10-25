var VistaProductoAComprar = Backbone.View.extend({
  template: _.template($("#listaDeLaCompra").html()),
  initialize: function() {
    this.render();
  },
  render: function() {
    this.$el.append(this.template(this.model));
    return this;
  }
});