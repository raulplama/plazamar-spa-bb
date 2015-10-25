var ListaDeCategorias = Backbone.Collection.extend({
  url: '/plazamar-spa-bb/api.php/categorias',
  model: Categoria,
  idAttribute: "_id"
});