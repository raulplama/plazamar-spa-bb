<?php

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

  while(count($ids) < 12) {
    for ($i = 0; $i < 12; $i++) {
      do {
        $cursor = $collection->find()->skip(mt_rand(0, $collection->count()))->getNext();
        $obj_producto = json_encode($cursor);
        $array_producto = json_decode($obj_producto, true);
        $id_producto = $array_producto['id'];
      } while (in_array($id_producto, $ids));
      array_push($datos, $cursor);
      array_push($ids, $id_producto);
    }
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

  // recoger los productos y enviarlos de vuelta a BAckbone

  if ($categoria) {
    $cursor = $collection->find(array('categoria' => $categoria));
    $datos = [];
    foreach ($cursor as $producto) {
      array_push($datos, $producto);
    }
    echo json_encode($datos);
  }

  if ($descuento) {
    $cursor = $collection->find(array('tieneDescuento' => 'true'));
    $datos = [];
    foreach ($cursor as $producto) {
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


$app->get('/producto', function () use ($app) {
  // conectar con la BD y seleccionar la colección

  $mongo = new MongoClient();
  $database = $mongo->plazamar;
  $collection = $database->productos;

  // recoger la query string de la url pasada por backbone

  $req = $app->request();
  $id = $req->get('identificador');

  // recoger los productos y enviarlos de vuelta a BAckbone

  $cursor = $collection->find(array('id' => $id));
  $datos = [];
  foreach ($cursor as $producto) {
    array_push($datos, $producto);
  }
  echo json_encode($datos[0]);

});


$app->get('/usuario', function () use ($app) {

  // recoger la query string de la url pasada por backbone

  $req = $app->request();
  $usuario = $req->get('usuario');

  // conectar con la BD y seleccionar la colección

  $mongo = new MongoClient();
  $database = $mongo->plazamar;
  $collection = $database->usuarios;

  // Buscamos el usuario en la BD y lo enviamos de vuelta a BAckbone o retornamos false

  $cursor = $collection->find(array('usuario' => $usuario));
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


$app->post('/usuario', function() use ($app) {
  // conectar con la BD y seleccionar la colección

  $mongo = new MongoClient();
  $database = $mongo->plazamar;
  $collection = $database->usuarios;

  // recuperar los datos enviados por backbone

  $request = $app->request()->getBody();
  $datos = json_decode($request);

  // grabar los datos en mongodb

  $collection->save($datos);

  echo json_encode($datos);

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
    'usuario' => $datos['usuario'],
    'password' => $datos['password'],
    'email' => $datos['email'],
    'type' => $datos['type']
  ];

  // establecemos la clave de búsqueda en la BD

  $claveBusqueda = [ 'usuario' => $datos['usuario'] ];

  // grabar los datos en mongodb

  $collection->update($claveBusqueda, $nuevosDatos);

  echo json_encode($datos);

});


$app->post('/perfil', function() use ($app) {
  // conectar con la BD y seleccionar la colección

  $mongo = new MongoClient();
  $database = $mongo->plazamar;
  $collection = $database->perfiles;

  // recuperar los datos enviados por backbone

  $request = $app->request()->getBody();
  $datos = json_decode($request);

  // grabar los datos en mongodb

  $collection->save($datos);

  echo json_encode($datos);

});


$app->get('/perfil', function () use ($app) {

  // recoger la query string de la url pasada por backbone

  $req = $app->request();
  $usuario = $req->get('usuario');

  // conectar con la BD y seleccionar la colección

  $mongo = new MongoClient();
  $database = $mongo->plazamar;
  $collection = $database->perfiles;

  // Buscamos el perfil en la BD y lo enviamos de vuelta a BAckbone o retornamos false

  $cursor = $collection->find(array('usuario' => $usuario));
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
    'usuario' => $datos['usuario'],
    'nombre' => $datos['nombre'],
    'apellidos' => $datos['apellidos'],
    'email' => $datos['email'],
    'direccion' => $datos['direccion'],
    'localidad' => $datos['localidad'],
    'provincia' => $datos['provincia']
  ];

  // establecemos la clave de búsqueda en la BD

  $claveBusqueda = [ 'usuario' => $datos['usuario'] ];

  // grabar los datos en mongodb

  $collection->update($claveBusqueda, $nuevosDatos);

  echo json_encode($datos);

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

  /*
  // recoger la query string de la url pasada por backbone

  $req = $app->request();
  $categoriaAntigua = $req->get('nombreAntiguo');
  $cat = json_decode($categoriaAntigua);
  */

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

// Run app

$app->run();

?>