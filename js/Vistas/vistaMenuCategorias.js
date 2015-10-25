var VistaMenuCategorias = Backbone.View.extend({
  el: ("#categorias"),
  initialize: function() {
    this.render();
  },
  render: function() {
    this.collection.forEach(this.addUnaCategoria, this);
    return this;
  },
  addUnaCategoria: function(modelo, index, collection) {
    var vistaCategoria = new VistaCategoria({model: modelo});
  }
});