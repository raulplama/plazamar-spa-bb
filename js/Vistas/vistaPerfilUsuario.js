var VistaPerfilDeUsuario = Backbone.View.extend({
  el: ('#contenido'),
  template: _.template($('#formularioPerfilUsuario').html()),
  events: {
        'click #registrarUsuario': 'onFormSubmit' // evento lanzado al pulsar el botón type submit (registrar)
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

    var nickname = docCookies.getItem('usuario');

    var usuario = new Usuario();
    usuario.fetch({
      data: $.param({ usuario: nickname}),
      success: function(model, response) {

        // validar los datos introducidos (email y contra) y mostrar el error en su caso
        usuario.on("invalid", function(model, error) {
          $('#infoError').html('por favor, revisa los siguientes errores: ' + error);
        });

        // comprobamos la contraseña y pasamos a grabar la info introducida en los campos
        var contrasenyaCorrecta = model.get("password");

        if (password.valueOf() === contrasenyaCorrecta.valueOf()) {
          //console.log('aqui');

          usuario.save({
            id: response.id,
            usuario: response.usuario,
            password: contrasenyaCorrecta,
            email: email,
            type: response.type
            },{
            url: '/plazamar-spa-bb/api.php/usuario',
            patch: true,
            beforeSend: function(xhr) {
              xhr.setRequestHeader('X-HTTP-Method-Override', 'put');
            },
            success: function(model, response) {
              //console.log('test ok')
              //console.log(model);
              //console.log(response);
            },
            error: function(model, response) {
              console.log('error')
              //console.log(model);
              //console.log(response);
            }
          });

          //console.log('aqui2');
          var perfilUsuario = new Perfil();

          perfilUsuario.fetch({
            data: $.param({ usuario: nickname})
          }).then(function (response) {
            perfilUsuario.save(
            {
              id: response.id,
              usuario: response.usuario,
              nombre: nombre,
              apellidos: apellidos,
              email: email,
              direccion: direccion,
              localidad: localidad,
              provincia: provincia
            },
            {
              url: '/plazamar-spa-bb/api.php/perfil',
              patch: true,
              beforeSend: function(xhr) {
                xhr.setRequestHeader('X-HTTP-Method-Override', 'put');
              },
              success: function(model, response) {
                //console.log('perfil ok')
                //console.log(model);
                //console.log(response);
              },
              error: function(model, response) {
                console.log('perfil error')
                //console.log(model);
                //console.log(response);
              }
            });
          });
          window.location.href="#infoRegPerfilOk"; // redireccionamos a una página de info
        } else {
          window.location.href="#infoRegPerfilError"; // redireccionamos a una página de info
        }

      },
      error: function(model, response) {
        console.log('error')
      }

    });

  }
});