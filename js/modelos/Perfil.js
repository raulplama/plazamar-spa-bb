var Perfil = Backbone.Model.extend({
  url: '/plazamar-spa-bb/api.php/perfil',
  defaults: {
    usuario: '',
    nombre: '',
    apellidos: '',
    email: '',
    direccion: '',
    localidad: '',
    provincia: ''
  },
  idAttribute: "_id"
});