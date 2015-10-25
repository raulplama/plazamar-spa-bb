var VistaProducto = Backbone.View.extend({
  template: _.template($("#listado_productos").html()),
  initialize: function() {
    this.render();
  },
  render: function() {
    this.$el.append(this.template(this.model));
    return this;
  }
});