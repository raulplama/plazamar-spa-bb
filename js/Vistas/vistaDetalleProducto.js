var VistaDetalleDeProducto = Backbone.View.extend({
  el: $("#contenido"),
  template: _.template($("#detalle_de_producto").html()),
  events: {
    'click #comprar' : 'comprarProducto'
  },
  initialize: function() {
    console.log('aplicando vista detalle de producto');
    this.render();
  },
  render: function() {
    this.$el.append(this.template(this.model));
    return this;
  },
  comprarProducto: function(e) {
    e.preventDefault();
    //obtenemos el id del producto
    var idProducto = this.model.id;
    // obtenemos el nombre de usuario de la sesión o null en su defecto (usuario sin registrar)
    // abrimos un registro en la bd con un array de productos que vaya seleccionando
    var usuario = docCookies.getItem('usuario'),
        idAnonimo = docCookies.getItem('idAnonimo');
    if (usuario !== null) {
      var carritoUsuario = new CarroCompra();
      carritoUsuario.set({
        usuario: usuario,
        idAnonimo: idAnonimo,
        producto: idProducto
      });
      // vemos si ya hay un carrito para el usuario o es el primer registro (update o post)
      carritoUsuario.fetch({
        data: $.param({ usuario: usuario }),
        success: function(model, response) {
          if (response === 'false') {
            // hacemos un post con el primer producto
            carritoUsuario.save({},{
              success: function(model, response) {
                console.log('producto añadido');
                // redireccionamos al listado del carro de la compra
                window.location.href = '#carrito';
              },
              error: function(model, response) {
                console.log('error en la conexion');
              }
            })
          } else {
            // hacemos un update con el nuevo producto
            carritoUsuario.save({},{
              patch: true,
              beforeSend: function(xhr) {
                xhr.setRequestHeader('X-HTTP-Method-Override', 'put');
              },
              success: function(model, response) {
                console.log('otro producto añadido');
                console.log(response);
                // redireccionamos al listado del carro de la compra
                window.location.href = '#carrito';
              },
              error: function(model, response) {
                console.log('error en la conexion');
              }
            })
          }
        },
        error: function(model, response) {
          console.log('error en la conexión');
        }
      });
    } else {
      // asignamos un usuario genérico y lo registramos en una cookie
      var sesionUsuarioAnonimo = new CarroCompra();
      sesionUsuarioAnonimo.fetch({
        data: $.param({ usuario: 'anonimo' }),
        success: function(model, response) {
          //console.log(response);
          var numUsuarioAnonimo = parseInt(response) + 1;
          //console.log(numUsuarioAnonimo);
          docCookies.setItem('usuario', 'anonimo');
          docCookies.setItem('idAnonimo', numUsuarioAnonimo);
          // añadimos el producto a su carrito
          // hacemos un post con el primer producto (si ya tiene uno, entonces entra por el if y hace un update)
          var carritoAnonimo = new CarroCompra();
          carritoAnonimo.set({
            usuario: 'anonimo',
            idAnonimo: numUsuarioAnonimo,
            producto: idProducto
          });
          carritoAnonimo.save({},{
            success: function(model, response) {
              console.log('producto añadido');
              // redireccionamos al listado del carro de la compra
              window.location.href = '#carrito';
            },
            error: function(model, response) {
              console.log('error en la conexion');
            }
          })
        },
        error: function(model, response) {
          console.log('error en la conexion');
        }
      });
    }
  }
});