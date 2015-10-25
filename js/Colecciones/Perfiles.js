var ListaDePerfiles = Backbone.Collection.extend({
  url: '/plazamar-spa-bb/api.php/perfiles',
  model: Perfil,
  idAttribute: "_id"
});