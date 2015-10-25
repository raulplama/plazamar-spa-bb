var Usuario = Backbone.Model.extend({
  url: '/plazamar-spa-bb/api.php/usuario',
  defaults: {
    id: '',
    usuario: '',
    email: '',
    password: '',
    type: 'usuario'
  },
  idAttribute: "_id",
  validate: function(attributes) {
    // creamos un array con los errores que vamos detectando

    var invalid = [];

    // condiciones de validación y sus errores

    if ( !attributes.usuario ) {
      invalid.push('campo usuario vacío');
    }
    if ( attributes.usuario && (attributes.usuario.length < 4 || attributes.usuario.length > 20) ) {
      invalid.push('el usuario debe tener entre 4 y 20 caracteres');
    }
    if ( !attributes.email ) {
      invalid.push('campo email vacío');
    }
    if ( attributes.email && !attributes.email.includes('@') ) {
      invalid.push('email no válido');
    }
    if ( attributes.email && attributes.email.includes('@') && attributes.email.length > 50 ) {
      invalid.push('la dirección de email debe tener menos de 50 caracteres');
    }
    if ( !attributes.password ) {
      invalid.push('campo password vacío');
    }
    if (attributes.password && (attributes.password.length < 4 || attributes.password.length >20)) {
      invalid.push('la contraseña debe tener entre 4 y 20 caracteres');
    }

    // si el array de errores tiene longitud mayor de cero es que hay errores, los retornamos

    if ( invalid.length > 0 ) { return invalid; };
  }
});