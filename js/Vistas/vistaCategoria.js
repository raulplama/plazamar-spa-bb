var VistaCategoria = Backbone.View.extend({
  el: ('#categorias'),
  template: _.template($('#listado_categorias').html()),
  initialize: function() {
    this.render();
  },
  render: function() {
    this.$el.append(this.template(this.model));
    return this;
  }
});