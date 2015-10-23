<?php

// iniciamos una sesión
session_start();

require 'Slim/Slim/Slim.php';
\Slim\Slim::registerAutoloader();


// instanciar el framework Slim

$app = new \Slim\Slim();;

// definir las rutas

$app->get('/categorias', function () {
  $mongo = new MongoClient(); // conectamos con la BD
  $database = $mongo->plazamar; // seleccionamos la BD
  $collection = $database->categorias; // seleccionamos la colección de datos (categorias)

  $cursor = $collection->find()->sort(array("nombre" => 1)); // indicamos que queremos recorrer todas las entradas y ordenarlas por nombre

  // retornamos los valores de la colección
  $data = [];
  foreach ($cursor as $categoria) {
    array_push($data, $categoria);
  }

  echo json_encode($data);
});


$app->get('/productosInicio', function () {
  $mongo = new MongoClient();
  $database = $mongo->plazamar;
  $collection = $database->productos;

  $datos = [];
  $ids = [];

  // seleccionar aleatoriamente 12 productos del total existente en la BD

  for ($i = 0; $i < 12; $i++) {
    do {
      $cursor = $collection->find()->skip(mt_rand(0, $collection->count()-1))->getNext();
      $obj_producto = json_encode($cursor);
      $array_producto = json_decode($obj_producto, true);
      $id_producto = $array_producto['_id'];
    } while (in_array($id_producto, $ids));
    array_push($datos, $cursor);
    array_push($ids, $id_producto);
  }

  echo json_encode($datos);
});


$app->get('/productos', function () use ($app) {

  // conectar con la BD y seleccionar la colección

  $mongo = new MongoClient();
  $database = $mongo->plazamar;
  $collection = $database->productos;

  // recoger la query string de la url pasada por backbone

  $req = $app->request();
  $categoria = $req->get('categoria');
  $descuento = $req->get('tieneDescuento');
  $ordenar = $req->get('ordenar');
  $total = $req->get('total');
  $buscar = $req->get('buscar');

  // recoger los productos y enviarlos de vuelta a BAckbone

  if ($categoria || $descuento || $ordenar) {

    if ($categoria && $ordenar === 'si') {
      $cursor = $collection->find(array('categoria' => $categoria))->sort(array("titulo" => 1));
    } else if ($categoria && !$ordenar) {
      $cursor = $collection->find(array('categoria' => $categoria));
    } else if ($descuento) {
      $cursor = $collection->find(array('tieneDescuento' => 'true'));
    }

    $datos = [];
    foreach ($cursor as $producto) {
      array_push($datos, $producto);
    }
    echo json_encode($datos);
  }

  if ($buscar) {
    $result = $collection->find(array('titulo' => $buscar, 'autor' => $buscar, 'editorial' => $buscar), array('titulo'));
    $datos = [];
    foreach ($result as $producto) {
      array_push($datos, $producto);
    }
    echo json_encode($datos);
  }

});

$app->delete('/productos', function () use ($app) {

  // conectar con la BD y seleccionar la colección

  $mongo = new MongoClient();
  $database = $mongo->plazamar;
  $collection = $database->productos;

  // recoger la query string de la url pasada por backbone

  $req = $app->request();
  $categoria = $req->get('categoria');

  // recoger los productos y enviarlos de vuelta a BAckbone

  $cursor = $collection->remove(array('categoria' => $categoria));

  echo json_encode('productos borrados');

});

$app->get('/usuarios', function () use ($app) {

  // conectar con la BD y seleccionar la colección

  $mongo = new MongoClient();
  $database = $mongo->plazamar;
  $collection = $database->usuarios;

  // recoger la query string de la url pasada por backbone

  $req = $app->request();

  $tipo = $req->get('tipo');
  $ordenar = $req->get('ordenar');

  // recoger los productos y enviarlos de vuelta a BAckbone

  if ($tipo && $ordenar === 'si') {
    $cursor = $collection->find(array('type' => $tipo))->sort(array("usuario" => 1));
  } else if ($tipo && !$ordenar) {
    $cursor = $collection->find(array('type' => $tipo));
  } /*else if ($ultimoUsuarioEnBD) {
    $cursor = $collection->find()->sort(array('id' => -1))->limit(1);
  }*/

  $datos = [];
  foreach ($cursor as $usuario) {
    array_push($datos, $usuario);
  }
  echo json_encode($datos);

});




$app->get('/producto', function () use ($app) {
  // conectar con la BD y seleccionar la colección

  $mongo = new MongoClient();
  $database = $mongo->plazamar;
  $collection = $database->productos;

  // recoger la query string de la url pasada por backbone

  $req = $app->request();
  $id = $req->get('identificador');
  $titulo = $req->get('titulo');
  $isbn = $req->get('isbn');

  // recoger los productos y enviarlos de vuelta a BAckbone

  if ($id) {
    $cursor = $collection->find(array('_id' => new MongoID($id))); // utilizamos el id de mongo
  } else if ($titulo) {
    $cursor = $collection->find(array('titulo' => $titulo));
  }  else if ($isbn) {
    $cursor = $collection->find(array('isbn' => $isbn));
  }

  $datos = [];
  foreach ($cursor as $producto) {
    array_push($datos, $producto);
  }

  if (count($datos) > 0) {
    echo json_encode($datos[0]);
  } else {
    echo json_encode('false');
  }

});


$app->post('/producto', function() use ($app) {
  // conectar con la BD y seleccionar la colección

  $mongo = new MongoClient();
  $database = $mongo->plazamar;
  $collection = $database->productos;

  // recuperar los datos enviados por backbone

  $req = $app->request()->getBody();
  $body = json_decode($req, true);

  $datos = [
    'titulo' => $body['titulo'],
    'autor' => $body['autor'],
    'editorial' => $body['editorial'],
    'precio' => $body['precio'],
    'isbn' => $body['isbn'],
    'categoria' => $body['categoria'],
    'tieneDescuento' => $body['tieneDescuento'],
    'descuento' => $body['descuento'],
    'imagen' => 'img/'.$body['imagen']
  ];

  // grabar los datos en mongodb

  $collection->save($datos);

  // devolvemos un json

  echo json_encode($datos);

});


// PENDIENTE DE SOLUCIONAR CÓMO RECOGER EL ARCHIVO SUBIDO

$app->post('/archivoImagen', function() use ($app) {

  //$req = $app->request();
  //$archivo = $req->get('archivo');

  $request = $app->request()->getBody();
  $datos = json_decode($request, true);

  // guardamos el archivo subido
  //move_uploaded_file($imagen, "img/archivo.png");

  echo json_encode($datos);

});

//////////////////////////////////////////////////////////

$app->put('/producto', function() use ($app) {
  // conectar con la BD y seleccionar la colección

  $mongo = new MongoClient();
  $database = $mongo->plazamar;
  $collection = $database->productos;

  // recuperar los datos enviados por backbone

  $request = $app->request()->getBody();
  $datos = json_decode($request, true);

  $nuevosDatos = [
    'titulo' => $datos['titulo'],
    'autor' => $datos['autor'],
    'editorial' => $datos['editorial'],
    'precio' => $datos['precio'],
    'isbn' => $datos['isbn'],
    'categoria' => $datos['categoria'],
    'tieneDescuento' => $datos['tieneDescuento'],
    'descuento' => $datos['descuento'],
    'imagen' => $datos['imagen']
  ];

  // establecemos la clave de búsqueda en la BD

  $claveBusqueda = [ '_id' => new MongoID($datos['id']) ];

  // grabar los datos en mongodb

  $collection->update($claveBusqueda, $nuevosDatos);

  echo json_encode($datos);

});



$app->delete('/producto', function () use ($app) {

  // recoger la query string de la url pasada por backbone

  $req = $app->request();
  $id = $req->get('identificador');

  // conectar con la BD y seleccionar la colección

  $mongo = new MongoClient();
  $database = $mongo->plazamar;
  $collection = $database->productos;

  // Borramos el producto

  $cursor = $collection->remove(array('_id' => new MongoID($id)));

  echo json_encode('producto borrado');

});



$app->get('/usuario', function () use ($app) {

  // recoger la query string de la url pasada por backbone

  $req = $app->request();

  $usuario = $req->get('usuario');
  $identificador = $req->get('identificador');

  // conectar con la BD y seleccionar la colección

  $mongo = new MongoClient();
  $database = $mongo->plazamar;
  $collection = $database->usuarios;



  if ($usuario || $identificador) {
    if ($usuario) {
      $cursor = $collection->find(array('usuario' => $usuario));
    } else if ($identificador) {
      $cursor = $collection->find(array('id' => $identificador));
    }

    $datos = [];
    foreach ($cursor as $usuario) {
      array_push($datos, $usuario);
    }

    if (count($datos) === 0) {
      $info = "false";
      echo json_encode($info);
    } else {
      echo json_encode($datos[0]);
    }
  }

});


$app->post('/usuario', function() use ($app) {
  // conectar con la BD y seleccionar la colección

  $mongo = new MongoClient();
  $database = $mongo->plazamar;
  $collection = $database->usuarios;

  // recuperar los datos enviados por backbone

  $request = $app->request()->getBody();
  $datos = json_decode($request, true);

  // buscamos el último id de la colección y le añadimos uno
  $cursor = $collection->find()->sort(array("id" => -1))->limit(1);
  foreach ($cursor as $doc) {
    $ultimoUsuario = json_encode($doc);
    $ultimoUsuario = json_decode($ultimoUsuario, true);
    $idUltimoUsuario = $ultimoUsuario['id'];
  }

  $datosAGrabar = [
    'id' => $idUltimoUsuario + 1,
    'usuario' => $datos['usuario'],
    'password' => $datos['password'],
    'email' => $datos['email'],
    'type' => $datos['type']
  ];

  // grabar los datos en mongodb

  $collection->save($datosAGrabar);

  echo json_encode($datosAGrabar);

});




$app->put('/usuario', function() use ($app) {
  // conectar con la BD y seleccionar la colección

  $mongo = new MongoClient();
  $database = $mongo->plazamar;
  $collection = $database->usuarios;

  // recuperar los datos enviados por backbone

  $request = $app->request()->getBody();
  $datos = json_decode($request, true);

  $nuevosDatos = [
    'id' => $datos['id'],
    'usuario' => $datos['usuario'],
    'email' => $datos['email'],
    'type' => $datos['type']
  ];

  // establecemos la clave de búsqueda en la BD

  $claveBusqueda = [ 'id' => $datos['id'] ];

  // grabar los datos en mongodb

  $collection->update($claveBusqueda, $nuevosDatos);

  echo json_encode($datos);

});

$app->delete('/usuario', function () use ($app) {

  // recoger la query string de la url pasada por backbone

  $req = $app->request();
  $id = $req->get('identificador');

  // conectar con la BD y seleccionar la colección

  $mongo = new MongoClient();
  $database = $mongo->plazamar;
  $collection = $database->usuarios;

  // Buscamos el categoria en la BD y lo enviamos de vuelta a BAckbone o retornamos false

  $cursor = $collection->remove(array('id' => $id));

  echo json_encode('usuario borrado');

});


$app->post('/perfil', function() use ($app) {
  // conectar con la BD y seleccionar la colección

  $mongo = new MongoClient();
  $database = $mongo->plazamar;
  $collection = $database->perfiles;

  // recuperar los datos enviados por backbone

  $request = $app->request()->getBody();
  $datos = json_decode($request, true);

  // buscamos el último id de la colección y le añadimos uno
  $cursor = $collection->find()->sort(array("id" => -1))->limit(1);
  foreach ($cursor as $doc) {
    $ultimoUsuario = json_encode($doc);
    $ultimoUsuario = json_decode($ultimoUsuario, true);
    $idUltimoUsuario = $ultimoUsuario['id'];
  }

  $nuevosDatos = [
    'id' => $idUltimoUsuario + 1,
    'usuario' => $datos['usuario'],
    'email' => $datos['email'],
    'nombre' => $datos['nombre'],
    'apellidos' => $datos['apellidos'],
    'direccion' => $datos['direccion'],
    'localidad' => $datos['localidad'],
    'provincia' => $datos['provincia']
  ];

  // grabar los datos en mongodb

  $collection->save($nuevosDatos);

  echo json_encode($nuevosDatos);

});


$app->get('/perfil', function () use ($app) {

  // conectar con la BD y seleccionar la colección

  $mongo = new MongoClient();
  $database = $mongo->plazamar;
  $collection = $database->perfiles;

  // recoger la query string de la url pasada por backbone

  $req = $app->request();

  $usuario = $req->get('usuario');
  $identificador = $req->get('identificador');

  // Buscamos el perfil en la BD y lo enviamos de vuelta a BAckbone o retornamos false

  if ($usuario) {
    $cursor = $collection->find(array('usuario' => $usuario));
  } else if ($identificador) {
    $cursor = $collection->find(array('id' => $identificador));
  }

  $datos = [];
  foreach ($cursor as $producto) {
    array_push($datos, $producto);
  }
  if (count($datos) === 0) {
    $info = "false";
    echo json_encode($info);
  } else {
    echo json_encode($datos[0]);
  }

});



$app->put('/perfil', function() use ($app) {
  // conectar con la BD y seleccionar la colección

  $mongo = new MongoClient();
  $database = $mongo->plazamar;
  $collection = $database->perfiles;

  // recuperar los datos enviados por backbone

  $request = $app->request()->getBody();
  $datos = json_decode($request, true);

  $nuevosDatos = [
    'id' => $datos['id'],
    'usuario' => $datos['usuario'],
    'nombre' => $datos['nombre'],
    'apellidos' => $datos['apellidos'],
    'email' => $datos['email'],
    'direccion' => $datos['direccion'],
    'localidad' => $datos['localidad'],
    'provincia' => $datos['provincia']
  ];

  // establecemos la clave de búsqueda en la BD

  $claveBusqueda = [ 'id' => $datos['id'] ];

  // grabar los datos en mongodb

  $collection->update($claveBusqueda, $nuevosDatos);

  echo json_encode($datos);

});


$app->delete('/perfil', function () use ($app) {

  // recoger la query string de la url pasada por backbone

  $req = $app->request();
  $id = $req->get('identificador');

  // conectar con la BD y seleccionar la colección

  $mongo = new MongoClient();
  $database = $mongo->plazamar;
  $collection = $database->perfiles;

  // Buscamos el categoria en la BD y lo enviamos de vuelta a BAckbone o retornamos false

  $cursor = $collection->remove(array('id' => $id));

  echo json_encode('perfil borrado');

});





$app->get('/categoria', function () use ($app) {

  // recoger la query string de la url pasada por backbone

  $req = $app->request();
  $categoria = $req->get('nombre');

  // conectar con la BD y seleccionar la colección

  $mongo = new MongoClient();
  $database = $mongo->plazamar;
  $collection = $database->categorias;

  // Buscamos el categoria en la BD y lo enviamos de vuelta a BAckbone o retornamos false

  $cursor = $collection->find(array('nombre' => $categoria));
  $datos = [];
  foreach ($cursor as $categoria) {
    array_push($datos, $categoria);
  }
  if (count($datos) === 0) {
    $info = "false";
    echo json_encode($info);
  } else {
    echo json_encode($datos[0]);
  }

});

$app->post('/categoria', function() use ($app) {
  // conectar con la BD y seleccionar la colección

  $mongo = new MongoClient();
  $database = $mongo->plazamar;
  $collection = $database->categorias;

  // recuperar los datos enviados por backbone

  $request = $app->request()->getBody();
  $body = json_decode($request, true);

  $datos = [
    'nombre' => $body['nombre'],
    'descripcion' => $body['descripcion']
  ];

  // grabar los datos en mongodb

  $collection->save($datos);

  echo json_encode($datos);

});

$app->put('/categoria/:nombre', function($nombre) use ($app) {
  // conectar con la BD y seleccionar la colección

  $mongo = new MongoClient();
  $database = $mongo->plazamar;
  $collection = $database->categorias;

  // recuperar los datos enviados por backbone

  $request = $app->request()->getBody();
  $datos = json_decode($request, true);

  $nuevosDatos = [
    'nombre' => $datos['nombre'],
    'descripcion' => $datos['descripcion'],
  ];

  // establecemos la clave de búsqueda en la BD

  $claveBusqueda = [ 'nombre' => $nombre ];

  // grabar los datos en mongodb

  $collection->update($claveBusqueda, $nuevosDatos);

  echo json_encode($claveBusqueda);

});

$app->delete('/categoria', function () use ($app) {

  // recoger la query string de la url pasada por backbone

  $req = $app->request();
  $categoria = $req->get('nombre');

  // conectar con la BD y seleccionar la colección

  $mongo = new MongoClient();
  $database = $mongo->plazamar;
  $collection = $database->categorias;

  // Buscamos el categoria en la BD y lo enviamos de vuelta a BAckbone o retornamos false

  $cursor = $collection->remove(array('nombre' => $categoria));

  echo json_encode('categoria borrada');

});


$app->get('/sesion', function () use ($app) {
  // conectar con la BD y seleccionar la colección

  $mongo = new MongoClient();
  $database = $mongo->plazamar;
  $collection = $database->sesiones;

  // recoger la query string de la url pasada por backbone

  $req = $app->request();
  $usuario = $req->get('comprobarSesionUsuario');

  // Buscamos si hay una sesion abierta para este usuario en la BD

  $cursor = $collection->find(array('usuario' => $usuario));

  $datos = [];
  foreach ($cursor as $usuario) {
    array_push($datos, $usuario);
  }
  if (count($datos) === 0) {
    echo json_encode('false');
  } else {
    echo json_encode($datos);
  }

});



$app->post('/sesion', function () use ($app) {
  // conectar con la BD y seleccionar la colección

  $mongo = new MongoClient();
  $database = $mongo->plazamar;
  $collection = $database->sesiones;

  // recuperar los datos enviados por backbone

  $request = $app->request()->getBody();
  $body = json_decode($request, true);

  $datos = [
    'usuario' => $body['usuario'],
    'tipo' => $body['tipo']
  ];

  // grabar los datos en mongodb

  $collection->save($datos);

  echo json_encode($datos);
});

$app->delete('/sesion', function () use ($app) {

  // recoger la query string de la url pasada por backbone

  $req = $app->request();
  $usuario = $req->get('usuario');

  // conectar con la BD y seleccionar la colección

  $mongo = new MongoClient();
  $database = $mongo->plazamar;
  $collection = $database->sesiones;

  // Buscamos el categoria en la BD y lo enviamos de vuelta a BAckbone o retornamos false

  $cursor = $collection->remove(array('usuario' => $usuario));

  echo json_encode('sesion borrada');

});

$app->get('/carroCompra', function () use ($app) {
  // conectar con la BD y seleccionar la colección

  $mongo = new MongoClient();
  $database = $mongo->plazamar;
  $collection = $database->carritosCompra;

  // recoger la query string de la url pasada por backbone

  $req = $app->request();
  $usuario = $req->get('usuario');

  if ($usuario === 'anonimo') {

    // primero vemos si hay alguna sesión de usuario anónimo abierta
    // las que haya las introducimos en un array

    $cursor = $collection->find(array('usuario' => 'anonimo'));

    $anonimos = [];
    foreach ($cursor as $doc) {
      $usuariosAnonimos = json_encode($doc);
      $usuariosAnonimos = json_decode($usuariosAnonimos, true);
      $idAnonimo = (int)$usuariosAnonimos['idAnonimo'];
      array_push($anonimos, $idAnonimo);
    }

    // contamos el numero de usuarios anónimos con sesión

    $numUsuariosAnonimosEnSesion = count($anonimos);

    // devolvemos la cuenta
    echo json_encode($numUsuariosAnonimosEnSesion);

  } else {

    // Buscamos si hay un carrito abierto para este usuario en la BD

    $cursor = $collection->find(array('usuario' => $usuario));

    $datos = [];
    foreach ($cursor as $usuario) {
      array_push($datos, $usuario);
    }
    if (count($datos) === 0) {
      echo json_encode('false');
    } else {
      echo json_encode($datos);
    }

  }

});

$app->post('/carroCompra', function () use ($app) {
  // conectar con la BD y seleccionar la colección

  $mongo = new MongoClient();
  $database = $mongo->plazamar;
  $collection = $database->carritosCompra;

  // recuperar los datos enviados por backbone

  $request = $app->request()->getBody();
  $body = json_decode($request, true);

  $datos = [
    'usuario' => $body['usuario'],
    'idAnonimo' => (int)$body['idAnonimo'],
    'idsProductos' => $body['producto']
  ];

  // grabar los datos en mongodb

  $collection->save($datos);

  echo json_encode($datos);
});

$app->put('/carroCompra', function() use ($app) {
  // conectar con la BD y seleccionar la colección

  $mongo = new MongoClient();
  $database = $mongo->plazamar;
  $collection = $database->carritosCompra;

  // recuperar los datos enviados por backbone

  $request = $app->request()->getBody();
  $datos = json_decode($request, true);

  // recupero los productos existentes en el carrito del usuario y le añado el actual

  if ($datos['usuario'] === 'anonimo') {

    //$cursor = $collection->find(array('usuario' => $datos['usuario']));
    $carritoUsuario = $collection->findOne(array(
        'usuario' => 'anonimo',
        'idAnonimo' => (int)$datos['idAnonimo']
        ));

    $idsProductos = $carritoUsuario['idsProductos'];


    $listaDeProductos = $idsProductos.','.$datos['producto'];

    $nuevosDatos = [
      'usuario' => $datos['usuario'],
      'idAnonimo' => (int)$datos['idAnonimo'],
      'idsProductos' => $listaDeProductos
    ];

    // establecemos la clave de búsqueda en la BD

    $claveBusqueda = [ 'usuario' => 'anonimo', 'idAnonimo' => (int)$datos['idAnonimo'] ];

    // grabar los datos en mongodb

    $collection->update($claveBusqueda, $nuevosDatos);

    echo json_encode($listaDeProductos);

  } else {

    $cursor = $collection->find(array('usuario' => $datos['usuario']));

    foreach ($cursor as $doc) {
      $productos = json_encode($doc);
      $productos = json_decode($productos, true);
      $idsProductos = $productos['idsProductos'];
    }

    $listaDeProductos = $idsProductos.','.$datos['producto'];

    $nuevosDatos = [
      'usuario' => $datos['usuario'],
      'idsProductos' => $listaDeProductos
    ];

    // establecemos la clave de búsqueda en la BD

    $claveBusqueda = [ 'usuario' => $datos['usuario'] ];

    // grabar los datos en mongodb

    $collection->update($claveBusqueda, $nuevosDatos);

    echo json_encode($listaDeProductos);
  }

});

$app->delete('/carroCompra', function () use ($app) {

  // recoger la query string de la url pasada por backbone

  $req = $app->request();
  $usuario = $req->get('usuario');

  // conectar con la BD y seleccionar la colección

  $mongo = new MongoClient();
  $database = $mongo->plazamar;
  $collection = $database->carritosCompra;

  // borramos el carro de la compra del usuario registrado

  $cursor = $collection->remove(array('usuario' => $usuario));

  echo json_encode('carrito borrado');

});

// Run app

$app->run();

?>