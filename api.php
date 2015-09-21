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




// Run app

$app->run();

?>