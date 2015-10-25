var VistaSubpanelAltaUsuario = Backbone.View.extend({
  el: ('#subsubpanel'),
  template: _.template($('#subPanelAltaUsuario').html()),
  initialize: function() {
    this.render();
  },
  render: function() {
    this.$el.append(this.template());
    return this;
  },
  events: {
    'click #altaUsuario' : 'altaUsuarioEnBD'
  },
  altaUsuarioEnBD: function(e) {
    e.preventDefault();
    // limpiamos la zona de info
    $("#mensajeUsuario").html('');
    // recogemos los datos introducidos
    var nickusuario = $("#usuario").val();
    var contra = $("#password").val();
    var mail = $("#email").val();
    var tipo = $("#tipo").val();
    // validamos los datos y los pasamos a la BD
    if (nickusuario !== '' && contra !== '' && mail !== '' && tipo !== '') {
      // crear modelo producto
      var nuevoUsuario = new Usuario({
        usuario: nickusuario,
        password: contra,
        email: mail,
        type: tipo
      });
      // comprobar si existe en la BD
      nuevoUsuario.fetch({
        data: $.param({ usuario: nickusuario })
      }).then(function(response) {
        if (response === 'false') {
            // no existe el usuario, procedemos a grabar los datos en la BD
            nuevoUsuario.save({},{
              success: function(model, response) {
                // informamos al admin
                $('#mensajeUsuario').html('creado nuevo usuario en la BD: ' + nickusuario);
                // crear un perfil vacío para el nuevo usuario y grabarlo en la BD
                var perfilNuevoUsuario = new Perfil({
                  usuario: nickusuario,
                  email: mail
                });
                perfilNuevoUsuario.save();
              },
              error: function() {
                // informamos
                $('#mensajeUsuario').html('no ha podido crearse o ya exite el usuario en la BD');
              }
            });
          } else {
            // el producto (id) existe, lo notificamos
            $('#mensajeUsuario').html('error: el nuevo usuario ya existe en la BD');
          }
      });
    } else {
      // los campos están vacíos, lo notificamos
      $('#mensajeUsuario').html('error: se deben rellenar todos los campos');
    }
    // limpiamos los campos de texto
    $('input').val('');
  }
});