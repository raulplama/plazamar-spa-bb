<?php

require 'Slim/Slim/Slim.php';
\Slim\Slim::registerAutoloader();

// Create and configure Slim app
$app = new \Slim\Slim();;

// rutas

// ruta de prueba
$app->get('/hello/:name', function($name) {
  echo 'hello ' . $name;
});

$app->get('/categorias', 'getCategorias');
$app->get('/categorias2', 'devolverFixtures'); // ruta de prueba con datos fixtures
$app->get('/productos/:categoria', 'getProductos');

// Run app
$app->run();

// funciones

function getCategorias() {
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
}

// function de prueba con datos hardcodeados

function devolverFixtures() {
  $data = array(
    array('id' => 1, 'nombre' => 'arquitectura'),
    array('id' => 2 ,'nombre' => 'medicina'),
    array('id' => 3, 'nombre' => 'música'),
    array('id' => 4 ,'nombre' => 'novela gráfica'),
    array('id' => 5, 'nombre' => 'psicología')
  );
  echo json_encode($data);
}

function getProductos() {
  $mongo = new MongoClient();
  $database = $mongo->plazamar;
  $collection = $database->productos;
  $cursor = $collection->find()->sort(array("nombre" => 1)); // indicamos que queremos recorrer todas las entradas y ordenarlas por nombre
  // retornamos los valores de la colección
  $data = [];
  foreach ($cursor as $categoria) {
    array_push($data, $categoria);
  }
  echo json_encode($data);
}

?>