var VistaFormularioDeRegistro = Backbone.View.extend({
  el: ('#contenido'),
  template: _.template($('#formularioDeRegistro').html()),
  events: {
        'submit': 'onSubmit' // evento lanzado al pulsar el botón type submit
  },
  initialize: function() {
    this.render();
  },
  render: function() {
    this.$el.append(this.template());
    return this;
  },
  onSubmit: function(e) {
    //console.log('enviando formulario');

    e.preventDefault();

    // obtenemos los valores de los campos

    var nuevoNombreUsuario = this.$el.find('#usuario').val();
    var nuevoEmail = this.$el.find('#email').val();
    var nuevoPassword = this.$el.find('#password').val();

    // creamos una instancia del nuevo usuario y comprobamos si existe en la BD

    var usuarioRegistro = new Usuario();

    usuarioRegistro.fetch({
      data: $.param({ usuario: nuevoNombreUsuario }), // incluimos una query string en la url con el identificador introducido en el formulario
      success: function(){
        //console.log('accediendo a la BD');
      },
      error: function(){
        console.log('error en la conexión con la BD');
      }
    }).then(function(response) {
      if (response.valueOf() === 'false') {
        // no existe el usuario
        //console.log('el usuario no existe');
        // validamos los datos introducidos
        usuarioRegistro.on("invalid", function(model, error) {
          $('#infoError').html('por favor, revisa los siguientes errores: ' + error);
        });
        // creamos un usuario nuevo con los datos introducidos en el formulario
        var nuevoUsuario = new Usuario({
          usuario : nuevoNombreUsuario,
          email : nuevoEmail,
          password : nuevoPassword
        });
        // grabar el nuevo registro en la BD
        nuevoUsuario.save({}, {
          success : function(model, response) {
            //console.log('ok');
            // crear un perfil vacío para el nuevo usuario y grabarlo en la BD
            var perfilNuevoUsuario = new Perfil({
              usuario: nuevoNombreUsuario,
              email: nuevoEmail
            });
            perfilNuevoUsuario.save();
            // redirigir a la página de info registro ok
            window.location.href = '#okRegistroUsuario';
          },
          error : function(model, response) {
            console.log('error');
          }
        })
      } else {
        // tenemos un usuario con ese nommbre
        //console.log('ya existe un usuario con ese nickname');
        window.location.href = '#errorRegistro';
      }
    })
  }
});