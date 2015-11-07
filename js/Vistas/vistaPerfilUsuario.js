var VistaPerfilDeUsuario = Backbone.View.extend({
  el: ('#contenido'),
  template: _.template($('#formularioPerfilUsuario').html()),
  events: {
        'submit': 'onFormSubmit' // evento lanzado al pulsar el botón type submit (acceder)
  },
  initialize: function() {
    this.render();
  },
  render: function() {
    this.$el.append(this.template());
    return this;
  },
  onFormSubmit: function(e) {
    //console.log('actualizando perfil de usuario');
    e.preventDefault();

    // obtenemos los valores de los campos

    var nombre = this.$el.find('#nombre').val();
    var apellidos = this.$el.find('#apellidos').val();
    var email = this.$el.find('#email').val();
    var direccion = this.$el.find('#direccion').val();
    var localidad = this.$el.find('#localidad').val();
    var provincia = this.$el.find('#provincia').val();
    var password = this.$el.find('#password').val();

    // buscamos el perfil del usuario y trabajamos a partir de el.

    var nickname = sessionStorage.getItem('usuario');

    var usuario = new Usuario();
    usuario.fetch({ data: $.param({ usuario: nickname}) }).then(function(response) {

      // validar los datos introducidos (email y contra) y mostrar el error en su caso
      usuario.on("invalid", function(model, error) {
        $('#infoError').html('por favor, revisa los siguientes errores: ' + error);
      });

      // comprobamos la contraseña y pasamos a grabar la info introducida en los campos
      var contrasenyaCorrecta = usuario.get("password");

      if (password.valueOf() === contrasenyaCorrecta.valueOf()) {

        usuario.save(
          { email: email },
          { success: function(model, response) {
              //console.log('test ok')
              //console.log(model);
              //console.log(response);
            },
            error: function(model, response) {
              console.log('test error')
              console.log(model);
              console.log(response);
            }
          });

        var perfilUsuario = new Perfil();

        perfilUsuario.fetch({
          data: $.param({ usuario: nickname})
        }).then(function (response) {
          perfilUsuario.save(
          {
            nombre: nombre,
            apellidos: apellidos,
            email: email,
            direccion: direccion,
            localidad: localidad,
            provincia: provincia
          },
          { success: function(model, response) {
              //console.log('perfil ok')
              //console.log(model);
              //console.log(response);
            },
            error: function(model, response) {
              console.log('perfil error')
              console.log(model);
              console.log(response);
            }
          });
          window.location.href="#infoRegPerfilOk"; // redireccionamos a una página de info
        });
      } else {
        window.location.href="#infoRegPerfilError"; // redireccionamos a una página de info
      }

    });

  }
});