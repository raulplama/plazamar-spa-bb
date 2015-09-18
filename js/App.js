// Activo la aplicación: el ruter y la función de 'historia' de Backbone

$(document).ready(function() {
  var router = new Router; // activamos el router
  Backbone.history.start();   // activamos la función de historial de Backbone
});

// MODELOS

var Categoria = Backbone.Model.extend({
  defaults: {
    id: '',
    nombre: '',
    descripcion: '',
  },
  idAttribute: "_id"
});

var Producto = Backbone.Model.extend({
  defaults: {
    id: '',
    imagen: '',
    titulo: '',
    autor: '',
    editorial: '',
    precio: '',
    isbn: '',
    categoria: '',
    tieneDescuento: false,
    descuento: '' // en porcentaje
  },
  idAttribute: "_id"
});

var Usuario = Backbone.Model.extend({
  defaults: {
    id: '',
    usuario: '',
    email: '',
    password: '',
    type: 'usuario'
  },
  validate: function(attributes) {
    var invalid = []; // creamos un array con los errores que vamos detectando

    // condiciones de validación y sus errores

    if ( !attributes.usuario ) {
      invalid.push('campo usuario vacío');
    }
    if ( attributes.usuario && (attributes.usuario.length < 4 || attributes.usuario.length > 20) ) {
      invalid.push('el usuario debe tener entre 4 y 20 caracteres');
    }
    if ( listaDeUsuarios.where({usuario: attributes.usuario}).length > 0 ) {
      invalid.push('el nombre de usuario ya existe');
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

var Perfil = Backbone.Model.extend({
  defaults: {
    id: '',
    usuario: '',
    nombre: '',
    apellidos: '',
    email: '',
    direccion: '',
    localidad: '',
    provincia: ''
  },
  validate: function(attributes) {
    var invalid = [];

    // condiciones de validación y sus errores

    if (nombre.length > 20) {
      invalid.push('el nombre debe tener menos de 20 caracteres');
    }
    if (apellidos.length > 40) {
      invalid.push('los apellidos deben tener menos de 40 caracteres en total');
    }
    if (direccion.length > 50) {
      invalid.push('la dirección debe tener menos de 50 caracteres');
    }
    if (localidad.length > 50) {
      invalid.push('la localidad debe tener menos de 50 caracteres');
    }
    if (provincia.length > 50) {
      invalid.push('la provincia debe tener menos de 50 caracteres');
    }

    if ( invalid.length > 0 ) { return invalid; };
  }
})

// COLECCIONES

/*var ListaDeCategorias = Backbone.Collection.extend({
  url: '/plazamar-spa-bb/api.php/categorias',
  model: Categoria,
  idAttribute: "_id"
});*/

/*var ListaDeProductos = Backbone.Collection.extend({
  url: '/plazamar-spa-bb/api.php/productos',
  model: Producto,
  idAttribute: "_id"
});*/

var ListaDeUsuarios = Backbone.Collection.extend({
  model: Usuario
});

var ListaDePerfiles = Backbone.Collection.extend({
  model: Perfil
});

// INSTANCIAMOS LAS COLECCIONES

// var listaDeCategorias = new ListaDeCategorias();

  /* CATEGORIAS DE LA APP [LA BD EXTERNA SE IMPLEMENTARÁ MÁS ADELANTE] */
/*
  [
  {id:"1", nombre: 'arquitectura', descripcion: 'arquitectura y construcción'},
  {id:"2", nombre: 'medicina', descripcion: 'medicina y salud'},
  {id:"3", nombre: 'música', descripcion: '´música y educación musical'},
  {id:"4", nombre: 'novela gráfica', descripcion: 'novela gráfica y cómics'},
  {id:"5", nombre: 'psicología', descripcion: 'psicología'}
  ]
);*/

// var listaDeProductos = new ListaDeProductos(

  /* PRODUCTOS DE LA APP [LA BD EXTERNA SE IMPLEMENTARÁ MÁS ADELANTE] */
  /*
  // Sección arquitectura

  [
  {id:"1", imagen:"img/Diccionario visual de terminos arquitectonicos.png", titulo:"Diccionario visual de terminos arquitectonicos", autor:"Lorenzo de la plaza escudero", editorial:"catedra", precio:"33.20", isbn:"9788437629971", categoria:"arquitectura", tieneDescuento: false, descuento: "0.00"},
  {id:"2", imagen:"img/Color, espacio y estilo.png", titulo:"Color, espacio y estilo", autor:"VV.AA", editorial:"Gustavo Gili", precio:"29.50", isbn:"9788425225673", categoria:"arquitectura", tieneDescuento: false, descuento: "0.00"},
  {id:"3", imagen:"img/Diseno de interiores, un manual.png", titulo:"Diseno de interiores, un manual", autor:"Francis D.K. Ching", editorial:"Gustavo Gili", precio:"35.00", isbn:"9788425223983", categoria:"arquitectura", tieneDescuento: false, descuento: "0.00"},
  {id:"4", imagen:"img/Entender la arquitectura.png", titulo:"Entender la arquitectura", autor:"Leland M. Roth", editorial:"Gustavo Gili", precio:"42.00", isbn:"9788425217005", categoria:"arquitectura", tieneDescuento: false, descuento: "0.00"},
  {id:"5", imagen:"img/La imagen de la ciudad.png", titulo:"La imagen de la ciudad", autor:"Kevin Lynch", editorial:"Gustavo Gili", precio:"16.50", isbn:"9788425217487", categoria:"arquitectura", tieneDescuento: false, descuento: "0.00"},
  {id:"6", imagen:"img/Los ojos de la piel, la arquitectura y los sentido.png", titulo:"Los ojos de la piel, la arquitectura y los sentido", autor:"Juhani Pallasmaa", editorial:"Gustavo Gili", precio:"18.00", isbn:"9788425226267", categoria:"arquitectura", tieneDescuento: false, descuento: "0.00"},
  {id:"7", imagen:"img/Manual de dibujo arquitectonico.png", titulo:"Manual de dibujo arquitectonico", autor:"Francis Ching", editorial:"Gustavo Gili", precio:"29.00", isbn:"9788425225659", categoria:"arquitectura", tieneDescuento: true, descuento: "10.00"},
  {id:"8", imagen:"img/Neufert, el arte de proyectar en arquitectura.png", titulo:"Neufert, el arte de proyectar en arquitectura", autor:"Ernst Neufert", editorial:"Gustavo Gili", precio:"65.00", isbn:"9788425224744",categoria:"arquitectura", tieneDescuento: false, descuento: "0.00"},
  {id:"9", imagen:"img/Pensar la arquitectura.png", titulo:"Pensar la arquitectura", autor:"Peter Zumthor", editorial:"Gustavo Gili", precio:"25.00", isbn:"9788425227301", categoria:"arquitectura", tieneDescuento: false, descuento: "0.00"},
  {id:"10", imagen:"img/Psicologia del color.png", titulo:"Psicologia del color", autor:"Eva Heller", editorial:"Gustavo Gili", precio:"35.00", isbn:"9788425219771", categoria:"arquitectura", tieneDescuento: false, descuento: "0.00"},
  {id:"11", imagen:"img/La sintaxis de la imagen.png", titulo:"La sintaxis de la imagen", autor:"Donis A. dondis", editorial:"Gustavo Gili", precio:"17.00", isbn:"9788425206092", categoria:"arquitectura", tieneDescuento: false, descuento: "0.00"},
  {id:"12", imagen:"img/Tecnicas de dibujo.png", titulo:"Tecnicas de dibujo", autor:"Peter Jenny", editorial:"Gustavo Gili", precio:"12.00", isbn:"9788425226076", categoria:"arquitectura", tieneDescuento: false, descuento: "0.00"},

  // Sección medicina

  {id:"13", imagen:"img/DUBIN INTERPRETACION DE ECG.png", titulo:"DUBIN INTERPRETACION DE ECG", autor:"DALE DUBIN", editorial:"COVER", precio:"35.00", isbn:"9780912912257", categoria:"medicina", tieneDescuento: false, descuento: "0.00"},
  {id:"14", imagen:"img/La sintaxis de la imagen.png", titulo:"MANUAL DE ENDOCRINOLOGIA PEDIATRICA (2\u00aa ED.)", autor:"JESUS ARGENTE OLIVER", editorial:"ERGON", precio:"24.50", isbn:"9788415950738", categoria:"medicina", tieneDescuento: false, descuento: "0.00"},
  {id:"15", imagen:"img/MANUAL DE ENDOCRINOLOGIA PEDIATRICA (2\u00aa ED.).png", titulo:"FELSON. PRINCIPIOS DE RADIOLOGIA TORACICA UN TEXTO", autor:"L.R. GOODMAN", editorial:"MCGRAW-HILL", precio:"49.00", isbn:"9788448170868", categoria:"medicina", tieneDescuento: false, descuento: "0.00"},
  {id:"16", imagen:"img/HARRISON PRINCIPIOS DE MEDICINA INTERNA.png", titulo:"HARRISON PRINCIPIOS DE MEDICINA INTERNA", autor:"ANTHONY FAUCI", editorial:"MCGRAW-HILL", precio:"233.75", isbn:"9786071507273", categoria:"medicina", tieneDescuento: false, descuento: "0.00"},
  {id:"17", imagen:"img/NEUROCIENCIA DEL LENGUAJE.png", titulo:"NEUROCIENCIA DEL LENGUAJE", autor:"FERNANDO CUETOS VEGA", editorial:"PANAMERICANA", precio:"35.00", isbn:"9788498353914", categoria:"medicina", tieneDescuento: false, descuento: "0.00"},
  {id:"18", imagen:"img/M.CRUZ MANUAL DE PEDIATRIA.png", titulo:"M.CRUZ MANUAL DE PEDIATRIA", autor:"M. CRUZ", editorial:"ERGON", precio:"62.40", isbn:"9788415351573", categoria:"medicina", tieneDescuento: false, descuento: "0.00"},
  {id:"19", imagen:"img/UN ANTROPOLOGO EN MARTE SIETE RELATOS PARADOGICOS.png", titulo:"UN ANTROPOLOGO EN MARTE SIETE RELATOS PARADOGICOS", autor:"OLIVER SACKS", editorial:"ANAGRAMA", precio:"12.90", isbn:"9788433966889", categoria:"medicina", tieneDescuento: false, descuento: "0.00"},
  {id:"20", imagen:"img/ANATOMIA PARA EL MOVIMIENTO (T. I) INTRODUCCION AL.png", titulo:"ANATOMIA PARA EL MOVIMIENTO (T. I) INTRODUCCION AL", autor:"BLANDINE CALAIS-GERMAIN", editorial:"LA LIEBRE DE MARZO", precio:"24.00", isbn:"9788487403132", categoria:"medicina", tieneDescuento: false, descuento: "0.00"},
  {id:"21", imagen:"img/NEUROCIENCIA COGNITIVA.png", titulo:"NEUROCIENCIA COGNITIVA", autor:"DIEGO REDOLAR RIPOLL", editorial:"PANAMERICANA", precio:"80.00", isbn:"9788498354089", categoria:"medicina", tieneDescuento: false, descuento: "0.00"},
  {id:"22", imagen:"img/EXPRIME TUS NEURONAS.png", titulo:"EXPRIME TUS NEURONAS", autor:"JOHN MEDINA", editorial:"EDICIONES GESTION 20", precio:"8.95", isbn:"9788498752373", categoria:"medicina", tieneDescuento: true, descuento: "10.00"},
  {id:"23", imagen:"img/MANUAL PRACTICO DE PEDIATRIA EN ATENCION PRIMARIA.png", titulo:"MANUAL PRACTICO DE PEDIATRIA EN ATENCION PRIMARIA", autor:"J. GARCIA-SICILIA LOPEZ", editorial:"PUBLIMED PUBLICACION", precio:"45.00", isbn:"9788493726218", categoria:"medicina", tieneDescuento: false, descuento: "0.00"},
  {id:"24", imagen:"img/REHABILITACION NEUROPSICOLOGICA ESTRATEGIAS EN TRA.png", titulo:"REHABILITACION NEUROPSICOLOGICA ESTRATEGIAS EN TRA", autor:"MARTIN PEREZ MENDOZA", editorial:"MANUAL MODERNO", precio:"26.00", isbn:"9786074483710", categoria:"medicina", tieneDescuento: false, descuento: "0.00"},

  // Sección música

  {id:"25", imagen:"img/AMY 27 AMY WINEHOUSE Y EL CLUB DE LOS DE 27.png", titulo:"AMY 27 AMY WINEHOUSE Y EL CLUB DE LOS DE 27", autor:"HOWARD SOUNES", editorial:"ALIANZA EDITORIAL", precio:"20.00", isbn:"9788420678047", categoria:"música", tieneDescuento: false, descuento: "0.00"},
  {id:"26", imagen:"img/BRUCE.png", titulo:"BRUCE", autor:"PETER AMES CARLIN", editorial:"TIMUN MAS", precio:"23.95", isbn:"9788448008604", categoria:"música", tieneDescuento: false, descuento: "0.00"},
  {id:"27", imagen:"img/CONVERSACIONES SOBRE MUSICA.png", titulo:"CONVERSACIONES SOBRE MUSICA", autor:"WILHELM FURTWANGLER", editorial:"EL ACANTILADO", precio:"16.00", isbn:"9788415277293", categoria:"música", tieneDescuento: false, descuento: "0.00"},
  {id:"28", imagen:"img/EL CUARTETO DE CUERDA LABORATORIO PARA UNA SOCIEDA.png", titulo:"EL CUARTETO DE CUERDA LABORATORIO PARA UNA SOCIEDA", autor:"CIBRAN SIERRA", editorial:"ALIANZA EDITORIAL", precio:"16.00", isbn:"9788420693385", categoria:"música", tieneDescuento: false, descuento: "0.00"},
  {id:"29", imagen:"img/INTELIGENCIA MUSICAL.png", titulo:"INTELIGENCIA MUSICAL", autor:"I\u00d1IGO PIRFANO", editorial:"PLATAFORMA", precio:"18.00", isbn:"9788415750383", categoria:"música", tieneDescuento: false, descuento: "0.00"},
  {id:"30", imagen:"img/COMO FUNCIONA LA MUSICA.png", titulo:"COMO FUNCIONA LA MUSICA", autor:"DAVID BYRNE", editorial:"LITERATURA RANDOM HO", precio:"24.90", isbn:"9788439727972", categoria:"música", tieneDescuento: false, descuento: "0.00"},
  {id:"31", imagen:"img/LA INTERPRETACION HISTORICA DE LA MUSICA.png", titulo:"LA INTERPRETACION HISTORICA DE LA MUSICA", autor:"ROBIN STOWELL", editorial:"ALIANZA EDITORIAL", precio:"20.40", isbn:"9788420682075", categoria:"música", tieneDescuento: false, descuento: "0.00"},
  {id:"32", imagen:"img/EL ESTADO DE LAS COSAS DE KORTATU LUCHA, FIESTA Y .png", titulo:"EL ESTADO DE LAS COSAS DE KORTATU LUCHA, FIESTA Y ", autor:"ROBERTO HERREROS", editorial:"LENGUA DE TRAPO", precio:"16.50", isbn:"9788483812075", categoria:"música", tieneDescuento: false, descuento: "0.00"},
  {id:"33", imagen:"img/RAMONES LA TURBULENTA AVENTURA DE LA BANDA MAS TRA.png", titulo:"RAMONES LA TURBULENTA AVENTURA DE LA BANDA MAS TRA", autor:"DICK PORTER", editorial:"MA NON TROPPO", precio:"23.00", isbn:"9788496924659", categoria:"música", tieneDescuento: false, descuento: "0.00"},
  {id:"34", imagen:"img/EL RUIDO ETERNO.png", titulo:"EL RUIDO ETERNO", autor:"ALEX ROSS", editorial:"SEIX BARRAL", precio:"24.00", isbn:"9788432209130", categoria:"música", tieneDescuento: false, descuento: "0.00"},
  {id:"35", imagen:"img/SLASH.png", titulo:"SLASH", autor:"ANTHONY BOZZA", editorial:"HARPERCOLLINS", precio:"25.34", isbn:"9780061351426", categoria:"música", tieneDescuento: "false", descuento: "0.00"},
  {id:"36", imagen:"img/CRONICAS DEL ROCK.png", titulo:"CRONICAS DEL ROCK", autor:"VV.AA.", editorial:"LUNWERG", precio:"29.50", isbn:"9788497859837", categoria:"música", tieneDescuento: true, descuento: "5.00"},

  // Sección novela gráfica

  {id:"37", imagen:"img/ARRUGAS.png", titulo:"ARRUGAS", autor:"PACO ROCA", editorial:"ASTIBERRI", precio:"15.00", isbn:"9788496815391", categoria:"novela gráfica", tieneDescuento: false, descuento: "0.00"},
  {id:"38", imagen:"img/ASTERIOS POLYP.png", titulo:"ASTERIOS POLYP", autor:"DAVID MAZZUCCHELLI", editorial:"SALAMANDRA", precio:"30.00", isbn:"9788416131112", categoria:"novela gráfica", tieneDescuento: false, descuento: "0.00"},
  {id:"39", imagen:"img/BLANKETS.png", titulo:"BLANKETS", autor:"CRAIG THOMPSON", editorial:"ASTIBERRI", precio:"25.00", isbn:"9788493522957", categoria:"novela gráfica", tieneDescuento: true, descuento: "5.00"},
  {id:"40", imagen:"img/CRONICAS BIRMANAS.png", titulo:"CRONICAS BIRMANAS", autor:"GUY DELISLE", editorial:"ASTIBERRI", precio:"20.00", isbn:"9788496815667", categoria:"novela gráfica", tieneDescuento: true, descuento: "5.00"},
  {id:"41", imagen:"img/FROM HELL.png", titulo:"FROM HELL", autor:"ALAN MOORE", editorial:"PLANETA DE AGOSTINI", precio:"30.00", isbn:"9788415480846", categoria:"novela gráfica", tieneDescuento: false, descuento: "0.00"},
  {id:"42", imagen:"img/HABIBI.png", titulo:"HABIBI", autor:"CRAIG THOMPSON", editorial:"ASTIBERRI", precio:"39.00", isbn:"9788415163299", categoria:"novela gráfica", tieneDescuento: false, descuento: "0.00"},
  {id:"43", imagen:"img/LA FIESTA SALVAJE.png", titulo:"LA FIESTA SALVAJE", autor:"JOSEPH MONCURE MARCH", editorial:"LITERATURA RANDOM HO", precio:"15.50", isbn:"9788439722014", categoria:"novela gráfica", tieneDescuento: false, descuento: "0.00"},
  {id:"44", imagen:"img/MAUS.png", titulo:"MAUS", autor:"ART SPIEGELMAN", editorial:"LITERATURA RANDOM HO", precio:"21.90", isbn:"9788439720713", categoria:"novela gráfica", tieneDescuento: false, descuento: "0.00"},
  {id:"45", imagen:"img/METAMAUS.png", titulo:"METAMAUS", autor:"ART SPIEGELMAN", editorial:"LITERATURA RANDOM HO", precio:"24.90", isbn:"9788439725428", categoria:"novela gráfica", tieneDescuento: false, descuento: "0.00"},
  {id:"46", imagen:"img/PERSEPOLIS.png", titulo:"PERSEPOLIS", autor:"MARJANE SATRAPI", editorial:"NORMA EDITORIAL", precio:"17.00", isbn:"9788467916560", categoria:"novela gráfica", tieneDescuento: false, descuento: "0.00"},
  {id:"47", imagen:"img/PILDORAS AZULES.png", titulo:"PILDORAS AZULES", autor:"FREDERIK PEETERS", editorial:"ASTIBERRI", precio:"16.00", isbn:"9788496815063", categoria:"novela gráfica", tieneDescuento: false, descuento: "0.00"},
  {id:"48", imagen:"img/PYONGYANG.png", titulo:"PYONGYANG", autor:"GUY DELISLE", editorial:"ASTIBERRI", precio:"18.00", isbn:"9788496815056", categoria:"novela gráfica", tieneDescuento: false, descuento: "0.00"},

  // Sección psicología

  {id:"49", imagen:"img/ANALISIS DE DATOS EN PSICOLOGIA I.png", titulo:"ANALISIS DE DATOS EN PSICOLOGIA I", autor:"JUAN BOTELLA AUSINA", editorial:"PIRAMIDE", precio:"38.00", isbn:"9788436826555", categoria:"psicología", tieneDescuento: true, descuento: "5.00"},
  {id:"50", imagen:"img/PSICOLOGIA DEL APRENDIZAJE PRINCIPIOS Y APLICACION.png", titulo:"PSICOLOGIA DEL APRENDIZAJE PRINCIPIOS Y APLICACION", autor:"MANUEL FROUFE", editorial:"EDICIONES PARANINFO", precio:"29.00", isbn:"9788497328494", categoria:"psicología", tieneDescuento: false, descuento: "0.00"},
  {id:"51", imagen:"img/PSICOLOGIA DEL DESARROLLO PARA DOCENTES.png", titulo:"PSICOLOGIA DEL DESARROLLO PARA DOCENTES", autor:"CARLOS MARTIN BRAVO", editorial:"PIRAMIDE", precio:"30.00", isbn:"9788436823103",categoria:"psicología", tieneDescuento: false, descuento: "0.00"},
  {id:"52", imagen:"img/PSICOLOGIA DE LA EMOCION.png", titulo:"PSICOLOGIA DE LA EMOCION", autor:"ENRIQUE G. FERNANDEZ ABASCAL", editorial:"EDITORIAL UNIVERSITA", precio:"44.00", isbn:"9788480049085", categoria:"psicología", tieneDescuento: "false", descuento: "0.00"},
  {id:"53", imagen:"img/EVALUACION PSICOLOGICA CONCEPTOS, METODOS Y ESTUDI.png", titulo:"EVALUACION PSICOLOGICA CONCEPTOS, METODOS Y ESTUDI", autor:"ROCIO FERNANDEZ-BALLESTEROS", editorial:"PIRAMIDE", precio:"65.00", isbn:"9788436825480", categoria:"psicología", tieneDescuento: false, descuento: "0.00"},
  {id:"54", imagen:"img/INTRODUCCION E HISTORIA DE LA PSICOLOGIA.png", titulo:"INTRODUCCION E HISTORIA DE LA PSICOLOGIA", autor:"JUAN ANTONIO MORA MERIDA", editorial:"PIRAMIDE", precio:"29.50", isbn:"9788436824032", categoria:"psicología", tieneDescuento: false, descuento: "0.00"},
  {id:"55", imagen:"img/MANUAL DE TECNICAS DE INTERVENCION COGNITIVO CONDU.png", titulo:"MANUAL DE TECNICAS DE INTERVENCION COGNITIVO CONDU", autor:"VV.AA.", editorial:"DESCLEE DE BROUWER", precio:"36.00", isbn:"9788433025357", categoria:"psicología", tieneDescuento: false, descuento: "0.00"},
  {id:"56", imagen:"img/MANUAL DE NEUROPSICOLOGIA CLINICA.png", titulo:"MANUAL DE NEUROPSICOLOGIA CLINICA", autor:"MIGUEL PEREZ", editorial:"PIRAMIDE", precio:"31.50", isbn:"9788436822151", categoria:"psicología", tieneDescuento: false, descuento: "0.00"},
  {id:"57", imagen:"img/PSICOLOGIA DE LA PERCEPCION PRACTICAS.png", titulo:"PSICOLOGIA DE LA PERCEPCION PRACTICAS", autor:"VICENTE SIERRA VAZQUEZ", editorial:"SINTESIS", precio:"28.00", isbn:"9788490770467", categoria:"psicología", tieneDescuento: false, descuento: "0.00"},
  {id:"58", imagen:"img/PSICOFISIOLOGIA.png", titulo:"PSICOFISIOLOGIA", autor:"LUIS CARRETIE ARANG\u00dcENA", editorial:"PIRAMIDE", precio:"28.50", isbn:"9788436816181", categoria:"psicología", tieneDescuento: false, descuento: "0.00"},
  {id:"59", imagen:"img/MANUAL DE PSICOPATOLOGIA CLINICA.png", titulo:"MANUAL DE PSICOPATOLOGIA CLINICA", autor:"PEDRO J. MESA CID", editorial:"PIRAMIDE", precio:"52.00", isbn:"9788436823424", categoria:"psicología", tieneDescuento: false, descuento: "0.00"},
  {id:"60", imagen:"img/GUIA DE TRATAMIENTOS PSICOLOGICOS EFICACES (T. III.png", titulo:"GUIA DE TRATAMIENTOS PSICOLOGICOS EFICACES (T. III", autor:"MARINO PEREZ ALVAREZ", editorial:"PIRAMIDE", precio:"29.00", isbn:"9788436818161", categoria:"psicología", tieneDescuento: false, descuento: "0.00"}

  ]
);*/

var listaDeUsuarios = new ListaDeUsuarios(

  /* USUARIOS DE LA APP [LA BD EXTERNA SE IMPLEMENTARÁ MÁS ADELANTE] */

  [
  {id:"1", usuario: 'raulplama', email: 'raulplama@gmail.com', password: 'secreto', type:'admin'},
  {id:"2", usuario: 'pepito', email: 'pepito@email.com', password: 'secreto', type: 'usuario'}
  ]
);

var listaDePerfiles = new ListaDePerfiles(

  [
  {id:"1", usuario: 'raulplama', nombre: '', apellido: '', direccion: '', localidad: '', provincia: ''},
  {id:"2", usuario: 'pepito', nombre: '', apellido: '', direccion: '', localidad: '', provincia: ''},
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
    console.log('renderizando modelo');
    this.$el.append(this.template(this.model));
    return this;
  }
});

var VistaMenuCategorias = Backbone.View.extend({
  el: ("#categorias"),
  initialize: function() {
    console.log(this.collection);
    this.render();
  },
  render: function() {
    console.log('renderizando colección');
    this.collection.forEach(this.addUnaCategoria, this);
    return this;
  },
  addUnaCategoria: function(modelo, index, collection) {
    console.log(collection);
    console.log('procesando modelo ' + index);
    var vistaCategoria = new VistaCategoria({model: modelo});
  }
});

var VistaProducto = Backbone.View.extend({
  //el: $("#productos"),
  template: _.template($("#listado_productos").html()),
  initialize: function() {
    this.render();
  },
  render: function(eventName) {
    this.$el.append(this.template(this.model));
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

var VistaFormularioDeAcceso = Backbone.View.extend({
  el: ('#contenido'),
  templates: {
    'formAcceso': _.template($('#formularioDeAcceso').html()),
  },
  events: {
        'submit'           : 'onFormSubmit', // evento lanzado al pulsar el botón type submit (acceder)
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
    // obtenemos los valores de los campos
    var usuario = this.$el.find('#usuario').val();
    var password = this.$el.find('#password').val();
    // comprobamos si existe el usuario
    var usuarioRegistrado = listaDeUsuarios.where({usuario: usuario})
    // comprobamos que sólo hay uno
    if (usuarioRegistrado.length != 1) {
      // presentamos un mensaje de error
      console.log('el usuario no existe, por favor registrate para acceder');
      window.location.href = '#errorEnAcceso';
    } else {
      // obtenemos el modelo y comprobamos que coinciden las contraseñas
      var idUsuarioRegistrado = usuarioRegistrado[0].id;
      var modeloUsuarioRegistrado = listaDeUsuarios.get(idUsuarioRegistrado);
      var contrasenyaModelo = modeloUsuarioRegistrado.get('password');
      if (password !== contrasenyaModelo) {
        console.log('las contraseñas no coinciden');
        // presentamos la página con el error
        window.location.href = '#errorEnAcceso';
      } else {
        console.log('las contraseñas coinciden')
        // grabamos en sesión el nombre de usuario
        sessionStorage.setItem('usuario', usuario);
        // presentamos la página de inicio personalizado
        window.location.href = '#accesoCorrecto';
      }
    }
  },
  formularioRegistro: function(e) {
    e.preventDefault();
    console.log('accediendo al fomulario de registro');
    window.location.href = '#formRegistro';
  }
});

var VistaErrorAcceso = Backbone.View.extend({
  el: ('#contenido'),
  template: _.template($('#errorAcceso').html()),
  initialize: function() {
    this.render();
  },
  render: function() {
    this.$el.append(this.template());
    return this;
  }
});

var VistaFormularioDeRegistro = Backbone.View.extend({
  el: ('#contenido'),
  template: _.template($('#formularioDeRegistro').html()),
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
    console.log('enviando formulario');

    e.preventDefault();

    // obtenemos los valores de los campos

    var nuevoNombreUsuario = this.$el.find('#usuario').val();
    var nuevoEmail = this.$el.find('#email').val();
    var nuevoPassword = this.$el.find('#password').val();

    // creamos un nuevo usuario y le asignamos los datos introducidos, también le asignamos un id adecuado

    var nuevoUsuario = new Usuario({id: listaDeUsuarios.length + 1, usuario: nuevoNombreUsuario,
      email: nuevoEmail, password: nuevoPassword});

    // validar los datos introducidos y mostrar el error en su caso
    // DESCOMENTAR CUANDO SE IMPLEMENTE UNA BD EXTERNA Y TENGAMOS URL
    /*
    nuevoUsuario.on("invalid", function(model, error) {
      $('#infoError').html('por favor, revisa los siguientes errores: ' + error);
    });

    // grabar el nuevo registro en la BD

    nuevoUsuario.save();
    */

    // añadir el nuevo usuario a la colección (SOLO MIENTRAS NO TENGAMOS BD EXTERNA)
    // comprobar primero si existe el usuario

    if (listaDeUsuarios.where({usuario: nuevoNombreUsuario}).length > 0) {
      window.location.href="#errorRegistro"; // redireccionamos a la info de error
    } else {
      listaDeUsuarios.add(nuevoUsuario); // añadimos el usuario a la colección
      window.location.href="#okRegistroUsuario"; // redireccionamos a la info de registro ok
    }
  }
});

var VistaInfoRegistro = Backbone.View.extend({
  el: ('#contenido'),
  template: _.template($('#infoRegistro').html()),
  initialize: function() {
    this.render();
  },
  render: function() {
    this.$el.append(this.template());
    return this;
  }
});

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
    console.log('actualizando perfil de usuario');

    e.preventDefault();

    // obtenemos los valores de los campos

    var nombre = this.$el.find('#nombre').val();
    var apellidos = this.$el.find('#apellidos').val();
    var email = this.$el.find('#email').val();
    var direccion = this.$el.find('#direccion').val();
    var localidad = this.$el.find('#localidad').val();
    var provincia = this.$el.find('#provincia').val();
    var password = this.$el.find('#password').val();

    // buscamos el perfil del usuario

    var nickname = sessionStorage.getItem('usuario');
    var usuario = listaDeUsuarios.where({usuario: nickname});
    var perfilUsuario = listaDePerfiles.where({usuario: nickname});

    // añadir el perfil a la colección, comprobar primero la contraseña

    var contraseñaCorrecta = usuario[0].get('password');
    if (password === contraseñaCorrecta) {
      perfilUsuario[0].set({nombre: nombre, apellidos: apellidos, direccion: direccion, localidad: localidad, provincia: provincia});
      usuario[0].set({email: email});

      // validar los datos introducidos y mostrar el error en su caso
      // DESCOMENTAR CUANDO SE IMPLEMENTE UNA BD EXTERNA Y TENGAMOS URL
      /*
      usuario[0].on("invalid", function(model, error) {
        $('#infoError').html('por favor, revisa los siguientes errores: ' + error);
      });
      perfilUsuario[0].on("invalid", function(model, error) {
        $('#infoError').html('por favor, revisa los siguientes errores: ' + error);
      });

      // grabar el nuevo registro en la BD

      usuario[0].save();
      perfilUsuario[0].save();
      */

      window.location.href="#infoRegPerfilOk"; // redireccionamos a una página de info
    } else {
      window.location.href="#infoRegPerfilError"; // redireccionamos a una página de info
    }
  }
});

var VistaInfoPerfil = Backbone.View.extend({
  el: ('#contenido'),
  template: _.template($('#informacionPerfil').html()),
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
    "index"                 : "index",    // la página de inicio
    "categoria/:categoria"  : "mostrarProductosCategoria", // enlaces del menú de categorías para mostrar sus productos
    "catalogo/:titulo"      : "mostrarProducto", // enlaces en cada imagen de producto para mostrar su detalle
    "ayuda/:page"           : "mostrarAyuda", // muestra la página de ayuda
    "quienesSomos"          : "quienesSomos",
    "atencionAlCliente"     : "atencionAlCliente",
    "legal/:page"           : "legal",
    "formAcceso"            : "formAcceso", // enlace al formulario de acceso a la tienda
    "errorEnAcceso"         : "infoErrorAcceso", // muestra una página con el error de acceso
    "accesoCorrecto"        : "accesoCorrecto", // gestiona el acceso del usuario a la tienda presentando la página personalizada
    "logout"                : "logout", // gestiona el cierre de sesión por el usuario
    "formRegistro"          : "formRegistro", // acceso al formulario de registro en la tienda
    "okRegistroUsuario"     : "infoNuevoUsuario",
    "errorRegistro"         : "infoErrorRegistro",
    "perfil"                : "accesoAlPerfil",
    "infoRegPerfilOk"       : "infoRegPerfilOk",
    "infoRegPerfilError"    : "infoRegPerfilError"
   },
  initialize: function() {
    console.log('aplicando router');
  },
  index: function() {
    console.log('página del index');
    actualizarCategorias();
    if (sessionStorage.getItem('sesionActiva') === 'true') {
      window.location.href = '#accesoCorrecto'; // redireccionamos a la página de inicio personalizada
    } else {
      $('#sesion').html('<a href="#formAcceso">acceder</a>'); // modificamos el enlace de 'logout' por 'acceder'
      $('#titular').html('<h1>' + '¡ Bienvenido ! estos son algunos productos de nuestro catálogo' + '</h1>');
      seleccionarProductosDeInicio();
    }
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
  },
  formAcceso: function() {
    console.log('formulario de acceso a la tienda');
    $('#titular').html('<h1>' + 'acceso a la tienda' + '</h1>'); // cambiamos el titular de la página
    actualizarCategorias();
    mostrarFormularioDeAcceso();
  },
  formRegistro: function() {
    console.log('formulario de registro');
    $('#titular').html('<h1>' + 'formulario de registro' + '</h1>');
    actualizarCategorias(); // mantemenos el menú de categorías por si quiere interrumpir el proceso de registro
    mostrarFormularioDeRegistro();
  },
  infoErrorAcceso: function() {
    console.log('página de info error');
    $('#titular').html('<h1>' + 'acceso a la tienda' + '</h1>');
    actualizarCategorias();
    mostrarInfoErrorAcceso();
  },
  accesoCorrecto: function() {
    console.log('pagina de inicio de usuario registrado');
    $('#titular').html('<h1>' + 'hola cliente, los siguientes productos tienen descuento' + '</h1>'); // completar con el nombre de usuario
    sessionStorage.setItem('sesionActiva', 'true'); // guardamos estos datos en la sessionstore del navegador
    $('#sesion').html('<a href="#logout">cerrar sesión</a>'); // modificamos el enlace de 'acceso' por otro de 'cerrar sesión'
    actualizarCategorias();
    mostrarProductosConDescuento();
  },
  logout: function() {
    console.log('cerrando sesión');
    sessionStorage.setItem('sesionActiva', 'false'); // eliminamos el dato de sesión del sessionstore en el navegador
    $('#contenido').html("<ul id='productos'></ul>"); // borramos el contenido mostrado (necesario si estamos en la vista 'detalle de producto')
    window.location.href = '#index'; // redireccionamos a la página de inicio sin sesión
  },
  infoNuevoUsuario: function() {
    console.log('registro realizado correctamente');
    $('#titular').html('<h1>' + 'registro de usuario' + '</h1>');
    actualizarCategorias();
    mostrarInfoNuevoUsuario();
  },
  infoErrorRegistro: function() {
    console.log('registro no realizado, el usuario ya existe');
    $('#titular').html('<h1>' + 'registro de usuario' + '</h1>');
    actualizarCategorias();
    mostrarInfoErrorRegistro();
  },
  accesoAlPerfil: function() {
    console.log('accediendo al pefil de usuario');
    $('#titular').html('<h1>' + 'perfil de usuario' + '</h1>');
    actualizarCategorias();
    mostrarPerfilDeUsuario();
  },
  infoRegPerfilOk: function() {
    console.log('página de información de registro de perfil');
    $('#titular').html('<h1>' + 'perfil de usuario' + '</h1>');
    actualizarCategorias();
    mostrarInfoRegistroPerfil();
    $('#infoPerfil').html('perfil actualizado correctamente');
  },
  infoRegPerfilError: function() {
    console.log('página de información de registro de perfil');
    $('#titular').html('<h1>' + 'perfil de usuario' + '</h1>');
    actualizarCategorias();
    mostrarInfoRegistroPerfil();
    $('#infoPerfil').html('perfil no actualizado, la contraseña no coincide');
  }
});

// FUNCIONES

// función que muestra la vista con la información de la actualización del perfil.

function mostrarInfoRegistroPerfil() {
  $("#contenido").html(""); // limpiamos la pantalla
  var vistaInfoPerfil = new VistaInfoPerfil();
}

// función que muestra el perfil de usuario para usuarios registrados o pide el acceso a usuarios no registrados

function mostrarPerfilDeUsuario() {
  $("#contenido").html(""); // limpiamos la pantalla
  $("#container").removeClass('containerNormal');
  $("#container").addClass('containerAmpliado');
  if (sessionStorage.getItem('sesionActiva') === 'true') {
    $("#perfil").html(''); // quitamos el enlace al perfil en esta vista
    var vistaPerfilDeUsuario = new VistaPerfilDeUsuario(); // mostramos la plantilla

    // rellenamos los campos con los datos de que disponemos en la BD

    var nickname = sessionStorage.getItem('usuario');

    var usuario = listaDeUsuarios.where({usuario: nickname});
    var perfilUsuario = listaDePerfiles.where({usuario: nickname});

    var email = usuario[0].get('email');
    var nombre = perfilUsuario[0].get('nombre');
    var apellidos = perfilUsuario[0].get('apellidos');
    var direccion = perfilUsuario[0].get('direccion');
    var localidad = perfilUsuario[0].get('localidad');
    var provincia = perfilUsuario[0].get('provincia');

    $('#nombre').val();
    $('#apellidos').val();
    $('#email').val(email);
    $('#direccion').val();
    $('#localidad').val();
    $('#provincia').val();
  } else {
    window.location.href="#formRegistro"; // redireccionamos al formulario de registro
  }
}

// función que muestra el ok en el registro de un nuevo usuario

function mostrarInfoNuevoUsuario() {
  $("#contenido").html(""); // limpiamos la pantalla
  var vistaInfoRegistro2 = new VistaInfoRegistro;
  $('#inforeg').html('registro de usuario realizado correctamente');
}

// función que muestra el error de registro de usuario

function mostrarInfoErrorRegistro() {
  $("#contenido").html(""); // limpiamos la pantalla
  var vistainfoRegistro1 = new VistaInfoRegistro;
  $('#inforeg').html('Error de registro: el usuario ya existe');
}

// función que muestra en pantalla los productos con descuento para los usuarios registrados

function mostrarProductosConDescuento() {
  $("#contenido").html(""); // limpiamos la pantalla
  $("#contenido").append("<ul id='productos'></ul>"); // añadimos la lista vacía

  // seleccionamos los productos con descuento de la colección
  var arrayProductosConDescuento = _.where(listaDeProductos.toJSON(), {tieneDescuento: true});

  var productosConDescuento = new ListaDeProductos(); // creamos la colección de productos con descuento
  productosConDescuento.add(arrayProductosConDescuento); // añadimos los productos a la colección

  // pasamos la vista de productos con los nuevos productos

  var vistaProductosConDescuento = new VistaListaDeProductos({collection: productosConDescuento});
}

// función que muestra el error de credenciales incorrectas para el acceso a la tienda

function mostrarInfoErrorAcceso() {
  $("#contenido").html(""); // limpiamos la pantalla
  var vistaErrorAcceso = new VistaErrorAcceso;
}

// función que muestra el formulario de registro en la tienda

function mostrarFormularioDeRegistro() {
  $("#contenido").html(""); // limpiamos la pantalla
  var vistaFormularioDeRegistro = new VistaFormularioDeRegistro;  // mostramos la vista del formulario
}

// función que muestra el formulario de acceso a la tienda

function mostrarFormularioDeAcceso() {
  $("#contenido").html(""); // limpiamos la pantalla
  var vistaFormularioDeAcceso = new VistaFormularioDeAcceso;  // mostramos la vista del formulario
}

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
  var vistaAtencionAlCliente = new VistaAtencionAlCliente;  // seleccionamos la vista
}

// función que muestra el contenido de quienes somos

function mostrarContenidoQuienesSomos() {
  $("#contenido").html(""); // limpiamos la pantalla
  var vistaQuienesSomos = new VistaQuienesSomos;  // seleccionamos la vista
}

// función que muestra el contenido de ayuda

function mostrarContenidoAyuda(page) {
  $("#contenido").html(""); // limpiamos la pantalla

  // seleccionamos la vista según la página seleccionada

  switch (page) {
    case '1' : var vistaAyuda1 = new VistaAyuda1; break;
    case '2' : var vistaAyuda2 = new VistaAyuda2; break;
    case '3' : var vistaAyuda3 = new VistaAyuda3; break;
    default  : var vistaAyuda1 = new VistaAyuda1;
  }
}

// función que muestra el detalle del producto seleccionado

function mostrarDetalleDeProducto(titulo) {
  $("#contenido").html(""); // limpiamos la pantalla

  var title = titulo;
  var prod = _.findWhere(listaDeProductos.toJSON(), {titulo: title}); // obtenemos el producto de la BD

  var vistaDetalleDeProducto = new VistaDetalleDeProducto({model: prod}); // mostrar vista de detalle pasando el producto seleccionado

  if (sessionStorage.getItem('sesionActiva') === 'true') {

    // añadimos el detalle del descuento a la vista:

    if (prod.tieneDescuento) {
      $('#precio').addClass('tachado'); // tachamos el precio sin descuento
       // añadimos el nuevo precio
      var nuevoPrecio = prod.precio * ( (100 - prod.descuento) / 100);
      var nuevoHtml = '<br>' +
                      '<h3 class="subtitulo_detalle" id="precioConDescuento">Precio con descuento: ' +
                      nuevoPrecio +
                      ' €</h3>';
      $('#precio').after(nuevoHtml);
    }
  }
}

// función que muestra los productos de la categoría seleccionada.
// pte condicionar que la muestra de productos sea de 12 en 12 y se añada un menú de páginas

function mostrarProductosCategoria(categoria) {
  $("#contenido").html(""); // limpiamos la pantalla
  $("#contenido").append("<ul id='productos'></ul>"); // devolvemos el contenido a su estado inicial

  // definir la colección de productos

  var ListaDeProductos = Backbone.Collection.extend({
    url: '/plazamar-spa-bb/api.php/productos',
    model: Producto,
    idAttribute: "_id"
  });

  // instanciamos una colección de productos de inicio

  var productosCategoria = new ListaDeProductos(categoria);

  // sincronizamos con la BD y mostramos la vista

  productosCategoria.fetch({
    data: $.param({ categoria: categoria}), // incluimos una query string en la url con la categoria seleccionada
    success: function(){
      console.log('acceso a la BD: recuperando productos de la categoria ' + categoria);
    },
    error: function(){
      console.log('error: productos no recuperados');
    }
  }).then(function(response) {
    var vistaListaDeProductos = new VistaListaDeProductos({collection: response});
  })

  /*var arrayProductos = _.where(listaDeProductos.toJSON(), {categoria: categoria}); // seleccionamos los productos de dicha categoria

  var productosCategoria = new ListaDeProductos() // creamos la colección de productos de la categoria seleccionada
  productosCategoria.add(arrayProductos); // añadimos los productos a la colección

  // pasamos la vista de productos con los nuevos productos

  var vistaProductosCategoria = new VistaListaDeProductos({collection: productosCategoria});*/
}

// función que muestra el menú de categorías.

function actualizarCategorias() {
  // limpiamos el menu para que no se vuelvan a añadir las categorias

  $('#categorias').html('');

  // definimos una colección de categorias

  var ListaDeCategorias = Backbone.Collection.extend({
    url: '/plazamar-spa-bb/api.php/categorias',
    model: Categoria,
    idAttribute: "_id"
  });

  // instanciamos la colección de categorias

  var listaDeCategorias = new ListaDeCategorias();

  // recogemos las categorias de la BD e instanciamos la vista con la colección recuperada

  listaDeCategorias.fetch({
    success: function(){
      console.log('acceso a la BD: recuperando categorías');
    },
    error: function(){
      console.log('error: categorias no importadas');
    }
  }).then(function(response) {
    var vistaMenuCategorias = new VistaMenuCategorias({collection: response});
  })
};

// función que muestra una selección de 12 productos aleatorios en la página de inicio

function seleccionarProductosDeInicio() {
  // limpiamos los productos en pantalla para mostrar la nueva selección

  $('#productos').html('');

  // definimos la colección de productos

  var ListaDeProductosInicio = Backbone.Collection.extend({
    url: '/plazamar-spa-bb/api.php/productosInicio',
    model: Producto,
    idAttribute: "_id"
  });

  // instanciamos una colección de productos de inicio

  var seleccionProductosPaginaInicio = new ListaDeProductosInicio();

  // sincronizamos con la BD y mostramos la vista

  seleccionProductosPaginaInicio.fetch({
    wait: true,
    success: function(){
      console.log('acceso a la BD: recuperando selección de productos');
    },
    error: function(){
      console.log('error: productos no recuperados');
    }
  }).then(function(response) {
    var vistaListaDeProductos = new VistaListaDeProductos({collection: response});
  })
}

/*
// Función que retorna un número entero aleatorio entre min y max ambos incluidos

function getRandomIntInclusive(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}*/