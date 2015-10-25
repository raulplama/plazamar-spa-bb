var ListaDeProductos = Backbone.Collection.extend({
  url: '/plazamar-spa-bb/api.php/productos',
  model: Producto,
  idAttribute: "_id"
});