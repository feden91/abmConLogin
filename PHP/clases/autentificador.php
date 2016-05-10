<?php

include_once 'JWT.php';
include_once 'ExpiredException.php';
include_once 'BeforeValidException.php';
include_once 'SignatureInvalidException.php';


$objDatos=json_decode(file_get_contents("php://input"));

$idUsuario=persona::validarusuario($objDatos->nombre, $objDatos->clave); // devuelve id o flase si esta mal

 //if($objDatos->usuario=="pepito" && $objDatos->clave=="666")
 //{
 	//$idUsuario=1;
 //}



/*if($idUsuario==false)
{
 	$token=array(

	"id"=> "666",*/
// 	"nombre"=>"natalia",
// 	"perfil"=>"natalia",
// 	"exp"=>time() - 96000
// 	);

// 	$token = Firebase\JWT\JWT::encode($token, 'clave');

// 	$array['tokenTest2016']=$token;

// 	echo json_encode($array);	
// }else
// {
// 	$token=array(

// 	"id"=> "666",
// 	"nombre"=>"Jeremias",
// 	"perfil"=>"Administrador",
// 	"exp"=>time() + 96000
// 	);
 	/*$token = Firebase\JWT\JWT::encode($token, 'clave');

	$array['tokenTest2016']=$token;

	echo json_encode($array);	 }

*/

// 1- tomo dtos del http
// 2- verifico con un metodo de la clase usuario si son datos validos
// 3- de ser valido creo el token y lo retorno (Es lo que esta arriba)




?>