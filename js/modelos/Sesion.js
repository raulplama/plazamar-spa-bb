var Sesion = Backbone.Model.extend({
  url: '/plazamar-spa-bb/api.php/sesion',
  defaults: {
    usuario: 'anonimo',
    tipo: 'usuario',
  },
  idAttribute: '_id'
});