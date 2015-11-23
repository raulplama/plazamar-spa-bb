var VistaDetalleDeUsuarioAdministrador = Backbone.View.extend({
  el: ('#subpanelUsuarios'),
  template: _.template($('#subPanelDetalleUsuario').html()),
  initialize: function() {
    this.render();
  },
  render: function() {
    this.$el.html(this.template(this.model.toJSON()));
    return this;
  },
  events: {
    'click #modificarUsuario' : 'modificarUsuarioEnBD',
    'click #borrarUsuario' : 'borrarUsuarioEnBD'
  },
  modificarUsuarioEnBD: function(e) {
    e.preventDefault();
    // recogemos los datos del usuario
    var id = $("#id").val();
    var nickusuario = $("#usuario").val();
    var mail = $("#email").val();
    var tipo = $("#tipo").val();
    // limpiamos todo los subsubpaneles
    $("#subpanelUsuarios").html('');
    $("#mensajeUsuario").html('');
    // validamos los datos, creamos el modelo y lo actualizamos en la BD
    if (id !== '' && nickusuario !== '' && mail !== '' && tipo !== '') {
      var usuarioModificar = new Usuario();
      usuarioModificar.fetch({
        data: $.param({ identificador: id }),
        success: function(model, response) {
          usuarioModificar.save({
            id: id,
            usuario: nickusuario,
            email: mail,
            type: tipo
            }, {
            url: '/plazamar-spa-bb/api.php/usuario',
            patch: true,
            beforeSend: function(xhr) {
              xhr.setRequestHeader('X-HTTP-Method-Override', 'put');
            },
            success: function(model, response) {
              // informamos al admin
              $('#mensajeUsuario').html('usuario modificado en la BD');
              // modificamos el perfil acorde con los nuevos datos del usuario
              var perfilUsuario = new Perfil();
              perfilUsuario.fetch({
                data: $.param({ identificador: id }),
                success: function() {
                  console.log('test');
                },
                error: function() {
                  console.log('error');
                }
              }).then(function (response) {
                console.log(response);
                perfilUsuario.save({
                  id: response.id,
                  usuario: nickusuario,
                  email: mail,
                  nombre: response.nombre,
                  apellidos: response.apellidos,
                  direccion: response.direccion,
                  localidad: response.localidad,
                  provincia: response.provincia
                  }, {
                  url: '/plazamar-spa-bb/api.php/perfil',
                  patch: true,
                  beforeSend: function(xhr) {
                    xhr.setRequestHeader('X-HTTP-Method-Override', 'put');
                  },
                  success: function(model, response) {
                    //console.log('perfil ok')
                  },
                  error: function(model, response) {
                    console.log('perfil error')
                  }
                });
              });
            },
            error: function() {
              // informamos al admin
              $('#mensajeUsuario').html('error: no ha podido modificarse el usuario en la BD');
            }
          });
        }
      })
    } else {
      // los campos están vacíos, lo notificamos
      $('#mensajeUsuario').html('error: deben rellenarse todos los campos');
    }
  },
  borrarUsuarioEnBD: function(e) {
    e.preventDefault();
    // recogemos el producto
    var id = $("#id").val();
    // limpiamos todo los subsubpaneles
    $("#subpanelUsuarios").html('');
    $("#mensajeUsuario").html('');
    // borramos el modelo de la bd
    var usuarioSelecc = new Usuario({ identificador: id });
    usuarioSelecc.fetch({
      data: $.param({ identificador: id }),
      success: function(model, response) {
        // borramos al usuario
        usuarioSelecc.fetch({
          data: $.param({ identificador: id }),
          patch: true,
          beforeSend: function(xhr) {
            xhr.setRequestHeader('X-HTTP-Method-Override', 'delete');
          },
          success: function(model, response) {
            $('#mensajeUsuario').append('usuario borrado de la BD');
            // borramos también el perfil del usuario
            var perfilUsuario = new Perfil();
            perfilUsuario.fetch({
              data: $.param({ identificador: id }),
              success: function(model, response) {
                //console.log('ok');
                perfilUsuario.fetch({
                  data: $.param({ identificador: id }),
                  patch: true,
                  beforeSend: function(xhr) {
                    xhr.setRequestHeader('X-HTTP-Method-Override', 'delete');
                  },
                  error: function(model, response) {
                    console.log(response);
                  }
                });
              }
            });
          },
          error: function(model, response) {
            $('#mensajeUsuario').append('error: usuario no borrado de la BD');
          }
        })
      }
    });
  }
});