var CarroCompra = Backbone.Model.extend({
  url: '/plazamar-spa-bb/api.php/carroCompra',
  defaults: {
    usuario: 'anonimo',
    idAnonimo: '0',
    producto: '0'
  },
  idAttribute: '_id'
});