// Activo la aplicación: el ruter y la función de 'historia' de Backbone

$(document).ready(function() {
  var router = new Router; // activamos el router
  Backbone.history.start();   // activamos la función de historial de Backbone
});

// MODELOS

var Categoria = Backbone.Model.extend({
  defaults: {
    id: '0',
    nombre: 'sin nombre',
    descripcion: 'sin descripción',
  }
});

var Producto = Backbone.Model.extend({
  defaults: {
    id: '0',
    imagen: 'sin imagen',
    titulo: 'sin título',
    autor: 'vacío',
    editorial: 'vacío',
    precio: '0.00',
    isbn: '0',
    categoria: 'vacío'
  }
});

// COLECCIONES

var ListaDeCategorias = Backbone.Collection.extend({
  model: Categoria // modelo del que trata la colección
});

var ListaDeProductos = Backbone.Collection.extend({
  model: Producto // modelo del que trata la colección
});

// INSTANCIAMOS LAS COLECCIONES ( DE MOMENTO INCLUYENDO LOS ITEMS )

var listaDeCategorias = new ListaDeCategorias(

  /* CATEGORIAS DE LA APP [LA BD EXTERNA SE IMPLEMENTARÁ MÁS ADELANTE] */

  [
  {id:"1", nombre: 'arquitectura', descripcion: 'arquitectura y construcción'},
  {id:"2", nombre: 'medicina', descripcion: 'medicina y salud'},
  {id:"3", nombre: 'música', descripcion: '´música y educación musical'},
  {id:"4", nombre: 'novela gráfica', descripcion: 'novela gráfica y cómics'},
  {id:"5", nombre: 'psicología', descripcion: 'psicología'}
  ]
);

var listaDeProductos = new ListaDeProductos(

  /* PRODUCTOS DE LA APP [LA BD EXTERNA SE IMPLEMENTARÁ MÁS ADELANTE] */

  // Sección arquitectura

  [
  {id:"1", imagen:"img/Diccionario visual de terminos arquitectonicos.png", titulo:"Diccionario visual de terminos arquitectonicos", autor:"Lorenzo de la plaza escudero", editorial:"catedra", precio:"33.20", isbn:"9788437629971", categoria:"arquitectura"},
  {id:"2", imagen:"img/Color, espacio y estilo.png", titulo:"Color, espacio y estilo", autor:"VV.AA", editorial:"Gustavo Gili", precio:"29.50", isbn:"9788425225673", categoria:"arquitectura"},
  {id:"3", imagen:"img/Diseno de interiores, un manual.png", titulo:"Diseno de interiores, un manual", autor:"Francis D.K. Ching", editorial:"Gustavo Gili", precio:"35.00", isbn:"9788425223983", categoria:"arquitectura"},
  {id:"4", imagen:"img/Entender la arquitectura.png", titulo:"Entender la arquitectura", autor:"Leland M. Roth", editorial:"Gustavo Gili", precio:"42.00", isbn:"9788425217005", categoria:"arquitectura"},
  {id:"5", imagen:"img/La imagen de la ciudad.png", titulo:"La imagen de la ciudad", autor:"Kevin Lynch", editorial:"Gustavo Gili", precio:"16.50", isbn:"9788425217487", categoria:"arquitectura"},
  {id:"6", imagen:"img/Los ojos de la piel, la arquitectura y los sentido.png", titulo:"Los ojos de la piel, la arquitectura y los sentido", autor:"Juhani Pallasmaa", editorial:"Gustavo Gili", precio:"18.00", isbn:"9788425226267", categoria:"arquitectura"},
  {id:"7", imagen:"img/Manual de dibujo arquitectonico.png", titulo:"Manual de dibujo arquitectonico", autor:"Francis Ching", editorial:"Gustavo Gili", precio:"29.00", isbn:"9788425225659", categoria:"arquitectura"},
  {id:"8", imagen:"img/Neufert, el arte de proyectar en arquitectura.png", titulo:"Neufert, el arte de proyectar en arquitectura", autor:"Ernst Neufert", editorial:"Gustavo Gili", precio:"65.00", isbn:"9788425224744",categoria:"arquitectura"},
  {id:"9", imagen:"img/Pensar la arquitectura.png", titulo:"Pensar la arquitectura", autor:"Peter Zumthor", editorial:"Gustavo Gili", precio:"25.00", isbn:"9788425227301", categoria:"arquitectura"},
  {id:"10", imagen:"img/Psicologia del color.png", titulo:"Psicologia del color", autor:"Eva Heller", editorial:"Gustavo Gili", precio:"35.00", isbn:"9788425219771", categoria:"arquitectura"},
  {id:"11", imagen:"img/La sintaxis de la imagen.png", titulo:"La sintaxis de la imagen", autor:"Donis A. dondis", editorial:"Gustavo Gili", precio:"17.00", isbn:"9788425206092", categoria:"arquitectura"},
  {id:"12", imagen:"img/Tecnicas de dibujo.png", titulo:"Tecnicas de dibujo", autor:"Peter Jenny", editorial:"Gustavo Gili", precio:"12.00", isbn:"9788425226076", categoria:"arquitectura"},

  // Sección medicina

  {id:"13", imagen:"img/DUBIN INTERPRETACION DE ECG.png", titulo:"DUBIN INTERPRETACION DE ECG", autor:"DALE DUBIN", editorial:"COVER", precio:"35.00", isbn:"9780912912257", categoria:"medicina"},
  {id:"14", imagen:"img/La sintaxis de la imagen.png", titulo:"MANUAL DE ENDOCRINOLOGIA PEDIATRICA (2\u00aa ED.)", autor:"JESUS ARGENTE OLIVER", editorial:"ERGON", precio:"24.50", isbn:"9788415950738", categoria:"medicina"},
  {id:"15", imagen:"img/MANUAL DE ENDOCRINOLOGIA PEDIATRICA (2\u00aa ED.).png", titulo:"FELSON. PRINCIPIOS DE RADIOLOGIA TORACICA UN TEXTO", autor:"L.R. GOODMAN", editorial:"MCGRAW-HILL", precio:"49.00", isbn:"9788448170868", categoria:"medicina"},
  {id:"16", imagen:"img/HARRISON PRINCIPIOS DE MEDICINA INTERNA.png", titulo:"HARRISON PRINCIPIOS DE MEDICINA INTERNA", autor:"ANTHONY FAUCI", editorial:"MCGRAW-HILL", precio:"233.75", isbn:"9786071507273", categoria:"medicina"},
  {id:"17", imagen:"img/NEUROCIENCIA DEL LENGUAJE.png", titulo:"NEUROCIENCIA DEL LENGUAJE", autor:"FERNANDO CUETOS VEGA", editorial:"PANAMERICANA", precio:"35.00", isbn:"9788498353914", categoria:"medicina"},
  {id:"18", imagen:"img/M.CRUZ MANUAL DE PEDIATRIA.png", titulo:"M.CRUZ MANUAL DE PEDIATRIA", autor:"M. CRUZ", editorial:"ERGON", precio:"62.40", isbn:"9788415351573", categoria:"medicina"},
  {id:"19", imagen:"img/UN ANTROPOLOGO EN MARTE SIETE RELATOS PARADOGICOS.png", titulo:"UN ANTROPOLOGO EN MARTE SIETE RELATOS PARADOGICOS", autor:"OLIVER SACKS", editorial:"ANAGRAMA", precio:"12.90", isbn:"9788433966889", categoria:"medicina"},
  {id:"20", imagen:"img/ANATOMIA PARA EL MOVIMIENTO (T. I) INTRODUCCION AL.png", titulo:"ANATOMIA PARA EL MOVIMIENTO (T. I) INTRODUCCION AL", autor:"BLANDINE CALAIS-GERMAIN", editorial:"LA LIEBRE DE MARZO", precio:"24.00", isbn:"9788487403132", categoria:"medicina"},
  {id:"21", imagen:"img/NEUROCIENCIA COGNITIVA.png", titulo:"NEUROCIENCIA COGNITIVA", autor:"DIEGO REDOLAR RIPOLL", editorial:"PANAMERICANA", precio:"80.00", isbn:"9788498354089", categoria:"medicina"},
  {id:"22", imagen:"img/EXPRIME TUS NEURONAS.png", titulo:"EXPRIME TUS NEURONAS", autor:"JOHN MEDINA", editorial:"EDICIONES GESTION 20", precio:"8.95", isbn:"9788498752373", categoria:"medicina"},
  {id:"23", imagen:"img/MANUAL PRACTICO DE PEDIATRIA EN ATENCION PRIMARIA.png", titulo:"MANUAL PRACTICO DE PEDIATRIA EN ATENCION PRIMARIA", autor:"J. GARCIA-SICILIA LOPEZ", editorial:"PUBLIMED PUBLICACION", precio:"45.00", isbn:"9788493726218", categoria:"medicina"},
  {id:"24", imagen:"img/REHABILITACION NEUROPSICOLOGICA ESTRATEGIAS EN TRA.png", titulo:"REHABILITACION NEUROPSICOLOGICA ESTRATEGIAS EN TRA", autor:"MARTIN PEREZ MENDOZA", editorial:"MANUAL MODERNO", precio:"26.00", isbn:"9786074483710", categoria:"medicina"},

  // Sección música

  {id:"25", imagen:"img/AMY 27 AMY WINEHOUSE Y EL CLUB DE LOS DE 27.png", titulo:"AMY 27 AMY WINEHOUSE Y EL CLUB DE LOS DE 27", autor:"HOWARD SOUNES", editorial:"ALIANZA EDITORIAL", precio:"20.00", isbn:"9788420678047", categoria:"música"},
  {id:"26", imagen:"img/BRUCE.png", titulo:"BRUCE", autor:"PETER AMES CARLIN", editorial:"TIMUN MAS", precio:"23.95", isbn:"9788448008604", categoria:"música"},
  {id:"27", imagen:"img/CONVERSACIONES SOBRE MUSICA.png", titulo:"CONVERSACIONES SOBRE MUSICA", autor:"WILHELM FURTWANGLER", editorial:"EL ACANTILADO", precio:"16.00", isbn:"9788415277293", categoria:"música"},
  {id:"28", imagen:"img/EL CUARTETO DE CUERDA LABORATORIO PARA UNA SOCIEDA.png", titulo:"EL CUARTETO DE CUERDA LABORATORIO PARA UNA SOCIEDA", autor:"CIBRAN SIERRA", editorial:"ALIANZA EDITORIAL", precio:"16.00", isbn:"9788420693385", categoria:"música"},
  {id:"29", imagen:"img/INTELIGENCIA MUSICAL.png", titulo:"INTELIGENCIA MUSICAL", autor:"I\u00d1IGO PIRFANO", editorial:"PLATAFORMA", precio:"18.00", isbn:"9788415750383", categoria:"música"},
  {id:"30", imagen:"img/COMO FUNCIONA LA MUSICA.png", titulo:"COMO FUNCIONA LA MUSICA", autor:"DAVID BYRNE", editorial:"LITERATURA RANDOM HO", precio:"24.90", isbn:"9788439727972", categoria:"música"},
  {id:"31", imagen:"img/LA INTERPRETACION HISTORICA DE LA MUSICA.png", titulo:"LA INTERPRETACION HISTORICA DE LA MUSICA", autor:"ROBIN STOWELL", editorial:"ALIANZA EDITORIAL", precio:"20.40", isbn:"9788420682075", categoria:"música"},
  {id:"32", imagen:"img/EL ESTADO DE LAS COSAS DE KORTATU LUCHA, FIESTA Y .png", titulo:"EL ESTADO DE LAS COSAS DE KORTATU LUCHA, FIESTA Y ", autor:"ROBERTO HERREROS", editorial:"LENGUA DE TRAPO", precio:"16.50", isbn:"9788483812075", categoria:"música"},
  {id:"33", imagen:"img/RAMONES LA TURBULENTA AVENTURA DE LA BANDA MAS TRA.png", titulo:"RAMONES LA TURBULENTA AVENTURA DE LA BANDA MAS TRA", autor:"DICK PORTER", editorial:"MA NON TROPPO", precio:"23.00", isbn:"9788496924659", categoria:"música"},
  {id:"34", imagen:"img/EL RUIDO ETERNO.png", titulo:"EL RUIDO ETERNO", autor:"ALEX ROSS", editorial:"SEIX BARRAL", precio:"24.00", isbn:"9788432209130", categoria:"música"},
  {id:"35", imagen:"img/SLASH.png", titulo:"SLASH", autor:"ANTHONY BOZZA", editorial:"HARPERCOLLINS", precio:"25.34", isbn:"9780061351426", categoria:"música"},
  {id:"36", imagen:"img/CRONICAS DEL ROCK.png", titulo:"CRONICAS DEL ROCK", autor:"VV.AA.", editorial:"LUNWERG", precio:"29.50", isbn:"9788497859837", categoria:"música"},

  // Sección novela gráfica

  {id:"37", imagen:"img/ARRUGAS.png", titulo:"ARRUGAS", autor:"PACO ROCA", editorial:"ASTIBERRI", precio:"15.00", isbn:"9788496815391", categoria:"novela gráfica"},
  {id:"38", imagen:"img/ASTERIOS POLYP.png", titulo:"ASTERIOS POLYP", autor:"DAVID MAZZUCCHELLI", editorial:"SALAMANDRA", precio:"30.00", isbn:"9788416131112", categoria:"novela gráfica"},
  {id:"39", imagen:"img/BLANKETS.png", titulo:"BLANKETS", autor:"CRAIG THOMPSON", editorial:"ASTIBERRI", precio:"25.00", isbn:"9788493522957", categoria:"novela gráfica"},
  {id:"40", imagen:"img/CRONICAS BIRMANAS.png", titulo:"CRONICAS BIRMANAS", autor:"GUY DELISLE", editorial:"ASTIBERRI", precio:"20.00", isbn:"9788496815667", categoria:"novela gráfica"},
  {id:"41", imagen:"img/FROM HELL.png", titulo:"FROM HELL", autor:"ALAN MOORE", editorial:"PLANETA DE AGOSTINI", precio:"30.00", isbn:"9788415480846", categoria:"novela gráfica"},
  {id:"42", imagen:"img/HABIBI.png", titulo:"HABIBI", autor:"CRAIG THOMPSON", editorial:"ASTIBERRI", precio:"39.00", isbn:"9788415163299", categoria:"novela gráfica"},
  {id:"43", imagen:"img/LA FIESTA SALVAJE.png", titulo:"LA FIESTA SALVAJE", autor:"JOSEPH MONCURE MARCH", editorial:"LITERATURA RANDOM HO", precio:"15.50", isbn:"9788439722014", categoria:"novela gráfica"},
  {id:"44", imagen:"img/MAUS.png", titulo:"MAUS", autor:"ART SPIEGELMAN", editorial:"LITERATURA RANDOM HO", precio:"21.90", isbn:"9788439720713", categoria:"novela gráfica"},
  {id:"45", imagen:"img/METAMAUS.png", titulo:"METAMAUS", autor:"ART SPIEGELMAN", editorial:"LITERATURA RANDOM HO", precio:"24.90", isbn:"9788439725428", categoria:"novela gráfica"},
  {id:"46", imagen:"img/PERSEPOLIS.png", titulo:"PERSEPOLIS", autor:"MARJANE SATRAPI", editorial:"NORMA EDITORIAL", precio:"17.00", isbn:"9788467916560", categoria:"novela gráfica"},
  {id:"47", imagen:"img/PILDORAS AZULES.png", titulo:"PILDORAS AZULES", autor:"FREDERIK PEETERS", editorial:"ASTIBERRI", precio:"16.00", isbn:"9788496815063", categoria:"novela gráfica"},
  {id:"48", imagen:"img/PYONGYANG.png", titulo:"PYONGYANG", autor:"GUY DELISLE", editorial:"ASTIBERRI", precio:"18.00", isbn:"9788496815056", categoria:"novela gráfica"},

  // Sección psicología

  {id:"49", imagen:"img/ANALISIS DE DATOS EN PSICOLOGIA I.png", titulo:"ANALISIS DE DATOS EN PSICOLOGIA I", autor:"JUAN BOTELLA AUSINA", editorial:"PIRAMIDE", precio:"38.00", isbn:"9788436826555", categoria:"psicología"},
  {id:"50", imagen:"img/PSICOLOGIA DEL APRENDIZAJE PRINCIPIOS Y APLICACION.png", titulo:"PSICOLOGIA DEL APRENDIZAJE PRINCIPIOS Y APLICACION", autor:"MANUEL FROUFE", editorial:"EDICIONES PARANINFO", precio:"29.00", isbn:"9788497328494", categoria:"psicología"},
  {id:"51", imagen:"img/PSICOLOGIA DEL DESARROLLO PARA DOCENTES.png", titulo:"PSICOLOGIA DEL DESARROLLO PARA DOCENTES", autor:"CARLOS MARTIN BRAVO", editorial:"PIRAMIDE", precio:"30.00", isbn:"9788436823103",categoria:"psicología"},
  {id:"52", imagen:"img/PSICOLOGIA DE LA EMOCION.png", titulo:"PSICOLOGIA DE LA EMOCION", autor:"ENRIQUE G. FERNANDEZ ABASCAL", editorial:"EDITORIAL UNIVERSITA", precio:"44.00", isbn:"9788480049085", categoria:"psicología"},
  {id:"53", imagen:"img/EVALUACION PSICOLOGICA CONCEPTOS, METODOS Y ESTUDI.png", titulo:"EVALUACION PSICOLOGICA CONCEPTOS, METODOS Y ESTUDI", autor:"ROCIO FERNANDEZ-BALLESTEROS", editorial:"PIRAMIDE", precio:"65.00", isbn:"9788436825480", categoria:"psicología"},
  {id:"54", imagen:"img/INTRODUCCION E HISTORIA DE LA PSICOLOGIA.png", titulo:"INTRODUCCION E HISTORIA DE LA PSICOLOGIA", autor:"JUAN ANTONIO MORA MERIDA", editorial:"PIRAMIDE", precio:"29.50", isbn:"9788436824032", categoria:"psicología"},
  {id:"55", imagen:"img/MANUAL DE TECNICAS DE INTERVENCION COGNITIVO CONDU.png", titulo:"MANUAL DE TECNICAS DE INTERVENCION COGNITIVO CONDU", autor:"VV.AA.", editorial:"DESCLEE DE BROUWER", precio:"36.00", isbn:"9788433025357", categoria:"psicología"},
  {id:"56", imagen:"img/MANUAL DE NEUROPSICOLOGIA CLINICA.png", titulo:"MANUAL DE NEUROPSICOLOGIA CLINICA", autor:"MIGUEL PEREZ", editorial:"PIRAMIDE", precio:"31.50", isbn:"9788436822151", categoria:"psicología"},
  {id:"57", imagen:"img/PSICOLOGIA DE LA PERCEPCION PRACTICAS.png", titulo:"PSICOLOGIA DE LA PERCEPCION PRACTICAS", autor:"VICENTE SIERRA VAZQUEZ", editorial:"SINTESIS", precio:"28.00", isbn:"9788490770467", categoria:"psicología"},
  {id:"58", imagen:"img/PSICOFISIOLOGIA.png", titulo:"PSICOFISIOLOGIA", autor:"LUIS CARRETIE ARANG\u00dcENA", editorial:"PIRAMIDE", precio:"28.50", isbn:"9788436816181", categoria:"psicología"},
  {id:"59", imagen:"img/MANUAL DE PSICOPATOLOGIA CLINICA.png", titulo:"MANUAL DE PSICOPATOLOGIA CLINICA", autor:"PEDRO J. MESA CID", editorial:"PIRAMIDE", precio:"52.00", isbn:"9788436823424", categoria:"psicología"},
  {id:"60", imagen:"img/GUIA DE TRATAMIENTOS PSICOLOGICOS EFICACES (T. III.png", titulo:"GUIA DE TRATAMIENTOS PSICOLOGICOS EFICACES (T. III", autor:"MARINO PEREZ ALVAREZ", editorial:"PIRAMIDE", precio:"29.00", isbn:"9788436818161", categoria:"psicología"}

  ]
);

// VISTAS

var VistaCategoria = Backbone.View.extend({
  el: ('#categorias'),
  template: _.template($('#listado_categorias').html()),

  initialize: function() {
    this.render();
  },
  render: function() {
    this.$el.append(this.template(this.model.toJSON()));
    return this;
  }
});

var VistaMenuCategorias = Backbone.View.extend({
  el: ("#categorias"),
  initialize: function() {
    this.render();
  },
  render: function() {
    this.collection.forEach(this.addUnaCategoria, this);
    return this;
  },
  addUnaCategoria: function(data){
    var vistaCategoria = new VistaCategoria({model: data});
  }
});

var VistaProducto = Backbone.View.extend({
  //el: $("#productos"),
  template: _.template($("#listado_productos").html()),
  initialize: function() {
    this.render();
  },
  render: function(eventName) {
    this.$el.append(this.template(this.model.toJSON()));
    return this;
  }
});

var VistaListaDeProductos = Backbone.View.extend({
  initialize: function() {
    this.render();
  },
  render: function() {
    this.collection.forEach(this.addUnProducto, this);
    return this;
  },
  addUnProducto: function(data) {
    var vistaProducto = new VistaProducto({model: data, el: $('#productos')});
  }
});

var VistaDetalleDeProducto = Backbone.View.extend({
  el: $("#contenido"),
  template: _.template($("#detalle_de_producto").html()),
  initialize: function() {
    console.log('aplicando vista detalle de producto')
    this.render();
  },
  render: function() {
     this.$el.append(this.template(this.model));
    return this;
  }
});

var VistaAyuda1 = Backbone.View.extend({
  el: ('#contenido'),
  template: _.template($('#ayuda_1').html()),
  initialize: function() {
    this.render();
  },
  render: function() {
    this.$el.append(this.template());
    return this;
  }
});

var VistaAyuda2 = Backbone.View.extend({
  el: ('#contenido'),
  template: _.template($('#ayuda_2').html()),
  initialize: function() {
    this.render();
  },
  render: function() {
    this.$el.append(this.template());
    return this;
  }
});

var VistaAyuda3 = Backbone.View.extend({
  el: ('#contenido'),
  template: _.template($('#ayuda_3').html()),
  initialize: function() {
    this.render();
  },
  render: function() {
    this.$el.append(this.template());
    return this;
  }
});

var VistaQuienesSomos = Backbone.View.extend({
  el: ('#contenido'),
  template: _.template($('#quienesSomos').html()),
  initialize: function() {
    this.render();
  },
  render: function() {
    this.$el.append(this.template());
    return this;
  }
});

var VistaAtencionAlCliente = Backbone.View.extend({
  el: ('#contenido'),
  template: _.template($('#atencionAlCliente').html()),
  initialize: function() {
    this.render();
  },
  render: function() {
    this.$el.append(this.template());
    return this;
  }
});

var VistaLegal1 = Backbone.View.extend({
  el: ('#contenido'),
  template: _.template($('#legal_1').html()),
  initialize: function() {
    this.render();
  },
  render: function() {
    this.$el.append(this.template());
    return this;
  }
});

var VistaLegal2 = Backbone.View.extend({
  el: ('#contenido'),
  template: _.template($('#legal_2').html()),
  initialize: function() {
    this.render();
  },
  render: function() {
    this.$el.append(this.template());
    return this;
  }
});

var VistaLegal3 = Backbone.View.extend({
  el: ('#contenido'),
  template: _.template($('#legal_3').html()),
  initialize: function() {
    this.render();
  },
  render: function() {
    this.$el.append(this.template());
    return this;
  }
});

// ROUTER

var Router = Backbone.Router.extend({
  routes: {
    ""                      : "index",    // la página de inicio
    "categoria/:categoria"  : "mostrarProductosCategoria", // enlaces del menú de categorías para mostrar sus productos
    "catalogo/:titulo"      : "mostrarProducto", // enlaces en cada imagen de producto para mostrar su detalle
    "ayuda/:page"           : "mostrarAyuda", // muestra la página de ayuda
    "quienesSomos"          : "quienesSomos",
    "atencionAlCliente"     : "atencionAlCliente",
    "legal/:page" : "legal"
   },
  initialize: function() {
    console.log('aplicando router');
  },
  index: function() {
    console.log('página del index');
    actualizarCategorias();
    seleccionarProductosDeInicio();
  },
  mostrarProductosCategoria: function(categoria) {
    console.log('página de la categoria ' + categoria);
    $('#titular').html('<h1>' + 'libros de ' + categoria + '</h1>'); // cambiamos el titular de la página (pte poner la descripción de la BD)
    actualizarCategorias(); // redibujamos el menú de las categorías
    mostrarProductosCategoria(categoria); // mostramos los productos de la categoria
  },
  mostrarProducto: function(titulo) {
    console.log('página del producto: ' + titulo);
    $('#titular').html('<h1>detalle de producto</h1>'); // cambiamos el titular
    actualizarCategorias(); // redibujamos el menú de las categorías
    mostrarDetalleDeProducto(titulo); // mostramos el detalle de producto
  },
  mostrarAyuda: function(page) {
    console.log('página de ayuda número ' + page);
    $('#titular').html('<h1>' + 'ayuda' + '</h1>'); // cambiamos el titular de la página
    actualizarCategorias(); // redibujamos el menú de las categorías
    mostrarContenidoAyuda(page); // cambiamos el contenido existente por el de ayuda
  },
  quienesSomos: function() {
    console.log('página quienes somos');
    $('#titular').html('<h1>' + 'quienes somos' + '</h1>'); // cambiamos el titular de la página
    actualizarCategorias();
    mostrarContenidoQuienesSomos();
  },
  atencionAlCliente: function() {
    console.log('página de atención al cliente');
    $('#titular').html('<h1>' + 'atención al cliente' + '</h1>'); // cambiamos el titular de la página
    actualizarCategorias();
    mostrarContenidoAtencionAlCliente();
  },
  legal: function(page) {
    console.log('página de los aspectos legales ' + page);
    $('#titular').html('<h1>' + 'aspectos legales' + '</h1>'); // cambiamos el titular de la página
    actualizarCategorias();
    mostrarContenidoLegal(page);
  }
});

// FUNCIONES

// función que muestra el contenido de la atención al cliente

function mostrarContenidoLegal(page) {
  $("#contenido").html(""); // limpiamos la pantalla
  // seleccionamos la vista según la página seleccionada

  switch (page) {
    case '1' : var vistaLegal1 = new VistaLegal1; break;
    case '2' : var vistaLegal2 = new VistaLegal2; break;
    case '3' : var vistaLegal3 = new VistaLegal3; break;
    default: var vistaLegal1 = new VistaLegal1;
  }
}

// función que muestra el contenido de la atención al cliente

function mostrarContenidoAtencionAlCliente() {
  $("#contenido").html(""); // limpiamos la pantalla
  var vistaAtencionAlCliente = new VistaAtencionAlCliente  // seleccionamos la vista
}

// función que muestra el contenido de quienes somos

function mostrarContenidoQuienesSomos() {
  $("#contenido").html(""); // limpiamos la pantalla
  var vistaQuienesSomos = new VistaQuienesSomos  // seleccionamos la vista
}

// función que muestra el contenido de ayuda

function mostrarContenidoAyuda(page) {
  $("#contenido").html(""); // limpiamos la pantalla

  // seleccionamos la vista según la página seleccionada

  switch (page) {
    case '1' : var vistaAyuda1 = new VistaAyuda1; break;
    case '2' : var vistaAyuda2 = new VistaAyuda2; break;
    case '3' : var vistaAyuda3 = new VistaAyuda3; break;
    default: var vistaAyuda1 = new VistaAyuda1;
  }
}

// función que muestra el detalle del producto seleccionado

function mostrarDetalleDeProducto(titulo) {
  $("#contenido").html(""); // limpiamos la pantalla

  var title = titulo;
  var prod = _.findWhere(listaDeProductos.toJSON(), {titulo: title}); // obtenemos el producto de la BD

  var vistaDetalleDeProducto = new VistaDetalleDeProducto({model: prod})// mostrar vista de detalle pasando el producto seleccionado
}

// función que muestra los productos de la categoría seleccionada.
// pte condicionar que la muestra de productos sea de 12 en 12 y se añada un menú de páginas

function mostrarProductosCategoria(categoria) {
  $("#contenido").html(""); // limpiamos la pantalla
  $("#contenido").append("<ul id='productos'></ul>"); // devolvemos el contenido a su estado inicial

  var cat = categoria // obtenemos el nombre de la categoria pulsada
  var arrayProductos = _.where(listaDeProductos.toJSON(), {categoria: cat}); // seleccionamos los productos de dicha categoria

  var productosCategoria = new ListaDeProductos() // creamos la colección de productos de la categoria seleccionada
  productosCategoria.add(arrayProductos); // añadimos los productos a la colección

  // pasamos la vista de productos con los nuevos productos

  var vistaProductosCategoria = new VistaListaDeProductos({collection: productosCategoria});
}

// función que muestra el menú de categorías.

function actualizarCategorias() {
  $('#categorias').html(''); // limpiamos el menu para que no se vuelvan a añadir las categorias
  var vistaMenuCategorias = new VistaMenuCategorias({collection: listaDeCategorias});
};

// función que muestra una selección de 12 productos aleatorios en la página de inicio

function seleccionarProductosDeInicio() {
  var seleccionProductosPaginaInicio = new ListaDeProductos(); // colección para la muestra de productos en el inicio

  // seleccionar 12 productos de entre todos los existentes en un momento dado

  var posicionUltimoProducto = listaDeProductos.length; // lá última posición de la colección
  var idUltimoProductoColeccion =  listaDeProductos.at(posicionUltimoProducto - 1).get('id');// el id del ultimo articulo de la colección (no tiene porqué coincidir con la posición);

  var pos, idPos, productoSeleccionado;

  for (var i = 0; i < 12; i++) {

    // generar un producto al azar y añadirlo al array colección de productos seleccionados siempre y cuando no se haya incluido ya

    do {
      pos = getRandomIntInclusive(1, idUltimoProductoColeccion); // seleccionar una posición al azar de entre los productos existentes
      idPos = listaDeProductos.at(pos - 1).get('id'); // obtener el id del producto en dicha posición
      productoSeleccionado = listaDeProductos.get(idPos); // seleccionar el producto con ese id
      seleccionProductosPaginaInicio.add(productoSeleccionado);
    } while (_.contains(seleccionProductosPaginaInicio, productoSeleccionado));
  }

  // limpiamos los productos en pantalla y mostramos la nueva selección

  $('#productos').html('');
  var vistaProductosInicio = new VistaListaDeProductos({collection: seleccionProductosPaginaInicio});
}

// Función que retorna un número entero aleatorio entre min y max ambos incluidos

function getRandomIntInclusive(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}