var Producto = Backbone.Model.extend({
  url: '/plazamar-spa-bb/api.php/producto',
  defaults: {
    id: '',
    imagen: '',
    titulo: '',
    autor: '',
    editorial: '',
    precio: '',
    isbn: '',
    categoria: '',
    tieneDescuento: false,
    descuento: '' // en porcentaje
  },
  idAttribute: "_id"
});