<?php 
session_start();
require_once("clases/usuario.php");
require_once("clases/AccesoDatos.php");

$DatosLogin= json_decode(json_encode($_POST));

$usuarioValidado=usuario::validarusuario($DatosLogin->usuario,$DatosLogin->clave);

if(isset($usuarioValidado->correo))
{
	$_SESSION['usuarioActual']=$usuarioValidado->correo;
	echo "correcto";

}else
{
	echo "no esta en la base de datos";
}






?>