var VistaSubpanelCategorias = Backbone.View.extend({
  el: ('#subpaneles'),
  template: _.template($('#subPanelCategorias').html()),
  initialize: function() {
    this.render();
    this.completarDesplegablesCategoriasAModificarYBorrar();
  },
  render: function() {
    this.$el.append(this.template());
    return this;
  },
  completarDesplegablesCategoriasAModificarYBorrar: function() {
    // recuperamos de la BD las categorias existentes
    var listaDeCategoriasEnBD = new ListaDeCategorias();
    listaDeCategoriasEnBD.fetch({
      success: function(collection, response) {
        // borramos el listado existente
        $('.cat').remove();
        // creamos un elemento del listado por cada categoria y lo incorporamos al desplegable
        _.each(response, function(element, index, list) {
          var nombreCat = element.nombre;
          $("#modificarCategoria").append("<option id='" + nombreCat + "' class='cat'>" + nombreCat + "</option>");
          $("#borrarCategoria").append("<option id='" + nombreCat + "' class='cat'>" + nombreCat + "</option>");
        });
      }
    });
  },
  events: {
    'click #botonNuevaCategoria' : 'altaCategoriaEnBD',
    'click #botonModificarNombreCategoria' : 'modificarCategoriaEnBD',
    'click #botonBorrarCategoria' : 'borrarCategoriaEnBD',
  },
  altaCategoriaEnBD: function(e) {
    e.preventDefault();
    // limpiamos la zona de info
    $("#mensajeCategorias").html('');
    // recogemos los datos introducidos
    var nombreNuevaCategoria = $("#nombreNuevaCategoria").val();
    var descripcionNuevaCategoria = $("#descripcionNuevaCategoria").val();
    // validamos los datos y los pasamos a la BD
    if (nombreNuevaCategoria !== '' && descripcionNuevaCategoria !== '') {
      var nuevaCategoria = new Categoria({
        nombre: nombreNuevaCategoria,
        descripcion: descripcionNuevaCategoria
      });
      // comprobar si existe ya la categoria
      nuevaCategoria.fetch({
        data: $.param({ nombre: nombreNuevaCategoria }),
        error: function(model, response) {
          console.log(response);
        }
      }).then(function(response) {
        if (response.valueOf() === 'false') {
          // no existe la categoría, procedemos a grabar los datos en la BD
          nuevaCategoria.save({},{
            success: function(model, response) {
              // informamos al admin
              $('#mensajeCategorias').html('creada nueva categoría en la BD: ' + nombreNuevaCategoria);
              // añadimos la nueva categoria a las listas desplegables
              $("#modificarCategoria").append("<option id='" + model.get('nombre') + "' class='cat'>" + model.get('nombre') + "</option>");
              $("#borrarCategoria").append("<option id='" + model.get('nombre') + "' class='cat'>" + model.get('nombre') + "</option>");
            },
            error: function() {
              // informamos
              $('#mensajeCategorias').html('no ha podido crearse o ya exite la categoría en la BD');
            }
          });
        } else {
          // la categoria existe, lo notificamos
          $('#mensajeCategorias').html('error: la nueva categoría ya existe en la BD');
        }
      });
    } else {
      // los campos están vacíos, lo notificamos
      $('#mensajeCategorias').html('error: la nueva categoría debe tener un nombre y una descripción');
    }
    // limpiamos los campos de texto
    $('input').val('');
  },
  modificarCategoriaEnBD: function(e) {
    e.preventDefault();
    // limpiamos la zona de info
    $("#mensajeCategorias").html('');
    // recogemos los datos introducidos
    var nombreAntiguo = $('#modificarCategoria').val();
    var nuevoNombreCategoria = $("#nuevoNombreCategoriaModif").val();
    var nuevaDescripcionCategoria = $("#nuevaDescripcionCategoriaModif").val();
    // validamos los datos y los pasamos a la BD
    if (nuevoNombreCategoria !== '' && nuevaDescripcionCategoria !== '') {
      var catAModificar = new Categoria();
      catAModificar.fetch({
        success: function(model, response) {
          catAModificar.save({
            nombre: nuevoNombreCategoria,
            descripcion: nuevaDescripcionCategoria
            }, {
            url: '/plazamar-spa-bb/api.php/categoria/' + nombreAntiguo,
            patch: true,
            beforeSend: function(xhr) {
              xhr.setRequestHeader('X-HTTP-Method-Override', 'put');
            },
            success: function(model, response) {
              // informamos al admin
              $('#mensajeCategorias').html('categoría modificada, nueva categoria: ' + nuevoNombreCategoria);
              // actualizamos los desplegables --> ¡¡ BUSCAR LA FORMA DE NO REPETIR ESTA FUNCIÓN !! (está escrita más arriba)
              // recuperamos de la BD las categorias existentes
              var listaDeCategoriasEnBD = new ListaDeCategorias();
              listaDeCategoriasEnBD.fetch({
                success: function(collection, response) {
                  // borramos el listado existente
                  $('.cat').remove();
                  // creamos un elemento del listado por cada categoria y lo incorporamos al desplegable
                  _.each(response, function(element, index, list) {
                    var nombreCat = element.nombre;
                    $("#modificarCategoria").append("<option id='" + nombreCat + "' class='cat'>" + nombreCat + "</option>");
                    $("#borrarCategoria").append("<option id='" + nombreCat + "' class='cat'>" + nombreCat + "</option>");
                  });
                }
              });
            },
            error: function() {
              // informamos al admin
              $('#mensajeCategorias').html('error: no ha podido modificarse la categoría en la BD');
            }
          })
        }
      })
    } else {
      // los campos están vacíos, lo notificamos
      $('#mensajeCategorias').html('error: la categoría modificada debe tener un nombre y una descripción');
    }
    // limpiamos los campos de texto
    $('input').val('');
  },
  borrarCategoriaEnBD: function(e) {
    e.preventDefault();
    // limpiamos la zona de la info
    $("#mensajeCategorias").html('');
    // recoger la categoría seleccionada y borrarla de la BD
    var categoriaSeleccionadaParaBorrar = $('#borrarCategoria').val();
    var categoriaABorrar = new Categoria();
    // dado que el rest no nos deja mandar directamente un 'delete' empleamos un 'fetch' y en el interior
    // le indicamos que cambie la petición a 'delete': ver función 'beforeSend' y opción 'patch'
    categoriaABorrar.fetch({
      data: $.param({ nombre: categoriaSeleccionadaParaBorrar }),
      patch: true,
      beforeSend: function(xhr) {
        xhr.setRequestHeader('X-HTTP-Method-Override', 'delete');
      },
      success: function(model, response) {
        // actualizamos los desplegables --> ¡¡ BUSCAR LA FORMA DE NO REPETIR ESTA FUNCIÓN !! (está escrita más arriba)
        // recuperamos de la BD las categorias existentes
        var listaDeCategoriasEnBD = new ListaDeCategorias();
        listaDeCategoriasEnBD.fetch({
          success: function(collection, response) {
            // borramos el listado existente
            $('.cat').remove();
            // creamos un elemento del listado por cada categoria y lo incorporamos al desplegable
            _.each(response, function(element, index, list) {
              var nombreCat = element.nombre;
              $("#modificarCategoria").append("<option id='" + nombreCat + "' class='cat'>" + nombreCat + "</option>");
              $("#borrarCategoria").append("<option id='" + nombreCat + "' class='cat'>" + nombreCat + "</option>");
            });
          }
        });
        // info para el admin
        $('#mensajeCategorias').append('<span>categoría borrada de la BD</span></br>');
      },
      error: function() {
        $('#mensajeCategorias').append('<span>error en el borrado de la BD, categoria no borrada</span>');
      }
    });
    // borrar también todos los productos de dicha categoria
    var listaDeProductosABorrar = new ListaDeProductos();
    listaDeProductosABorrar.fetch({
      data: $.param({ categoria: categoriaSeleccionadaParaBorrar }),
    });
    // para mandar la opción delete utilizamos la misma acción que con las categorias, utilizamos un fetch y en
    // el interior un delete
    listaDeProductosABorrar.fetch({
      data: $.param({ categoria: categoriaSeleccionadaParaBorrar }),
      patch: true,
      beforeSend: function(xhr) {
        xhr.setRequestHeader('X-HTTP-Method-Override', 'delete');
      },
      success: function(model, response) {
        $('#mensajeCategorias').append('<span>productos de la categoria borrados de la BD.</span></br>');
        console.log(response);
      },
      error: function() {
        $('#mensajeCategorias').append('<span>error en el borrado de la BD, productos no borrados</span>');
      }
    })
  }
});