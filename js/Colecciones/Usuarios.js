var ListaDeUsuarios = Backbone.Collection.extend({
  url: '/plazamar-spa-bb/api.php/usuarios',
  model: Usuario,
  idAttribute: "_id"
});