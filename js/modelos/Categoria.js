var Categoria = Backbone.Model.extend({
  url: '/plazamar-spa-bb/api.php/categoria',
  defaults: {
    nombre: '',
    descripcion: '',
  },
  idAttribute: "_id"
});