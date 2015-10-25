var VistaListaDeProductos = Backbone.View.extend({
  initialize: function() {
    this.render();
  },
  render: function() {
    this.collection.forEach(this.addUnProducto, this);
    return this;
  },
  addUnProducto: function(data) {
    var vistaProducto = new VistaProducto({model: data, el: $('#productos')});
  }
});