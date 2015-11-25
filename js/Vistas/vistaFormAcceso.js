var VistaFormularioDeAcceso = Backbone.View.extend({
  el: ('#contenido'),
  templates: {
    'formAcceso': _.template($('#formularioDeAcceso').html()),
  },
  events: {
    'click #acceder'     : 'onFormSubmit', // evento lanzado al pulsar el botón type submit (acceder)
    'click #registrar' : 'formularioRegistro' // evento lanzado al pulsar el boton de tipo button (formulario registro)
  },
  initialize: function() {
    this.render();
  },
  render: function() {
    this.$el.append(this.templates.formAcceso());
    return this;
  },
  onFormSubmit: function(e) {
    e.preventDefault();

    // obtenemos los valores de los camposs

    var usuario = this.$el.find('#usuario').val();
    var password = this.$el.find('#password').val();

    // comprobamos si existe el usuario:
    // creamos una instancia del modelo usuario y buscamos el usuario en la BD

    var usuarioAcceso = new Usuario();

    usuarioAcceso.fetch({
      data: $.param({ usuario: usuario }), // incluimos una query string en la url con el identificador introducido en el formulario
      success: function(model, response){
        //console.log('acceso a la BD: recuperando usuario');
        if (response.valueOf() === 'false') {
          // no existe el usuario
          //console.log('el usuario no existe');
          window.location.href = '#errorEnAcceso';
        } else {
          // tenemos un usuario, comprobamos las contraseñas
          var contrasenya = response.password;
          if (password.valueOf() === contrasenya.valueOf()) {
            // obtenemos el tipo de usuario de que se trata
            var tipoUsuario = response.type;
            // abrimos una sesión para este usuario
            var sesionUsuario = new Sesion({
              usuario: usuario,
              tipo: tipoUsuario
            });
            sesionUsuario.save({},{
              success: function(model, response) {
                //console.log('sesion creada');
                window.location.href = '#accesoCorrecto';
              },
              error: function(model, response) {
                console.log('error en la conexion');
              }
            })
            // guardamos en una cookie el nombre del usuario para futuras consultas
            // maxima edad de la cookie: por defecto la sesion (cierre del navegador)
            document.cookie = "usuario=" + usuario;
          } else {
            // no coinciden las contraseñas
            //console.log('las contraseñas no coinciden');
            window.location.href = '#errorEnAcceso'
          }
        }
      },
      error: function(){
        console.log('error: usuario no recuperado');
      }
    });
  },
  formularioRegistro: function(e) {
    e.preventDefault();
    //console.log('accediendo al fomulario de registro');
    window.location.href = '#formRegistro';
  }
});