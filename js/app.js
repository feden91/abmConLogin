
var app = angular.module('ABMangularPHP', ['ui.router', 'angularFileUpload', 'satellizer']);

app.config(function($stateProvider, $urlRouterProvider, $authProvider){

  
  $authProvider.loginUrl = 'ABM-ANGULAR/PHP/clases/autentificador.php';
  $authProvider.signupUrl = 'ABM-ANGULAR/PHP/clases/autentificador.php';
  $authProvider.tokenName = 'tokenTest2016';
  $authProvider.tokenPrefix = 'ABM_Persona';
  $authProvider.authHeader = 'Data';

  $stateProvider
  .state('menu', 
  {
    templateUrl:"templatemenu.html",
    url:'/menu',
    controller:'controlMenu'
  })
  .state('grilla', 
  {
    templateUrl:"templategrilla.html",
    url:'/grilla',
    controller:'controlGrilla'
  })
  .state('login', 
  {
    templateUrl:"templatelogin.html",
    url:'/login',
    controller:'controlLogin'
  })
  .state('alta', 
  {
    templateUrl:"templateusuario.html",
    url:'/alta',
    controller:'controlAlta'
  })
  .state('modificar', 
  {
    templateUrl:"templateusuario.html",
    url:'/modificar/{:id}?:nombre:apellido:dni:foto',
    controller:'controlModificar'
  })

  $urlRouterProvider.otherwise('/menu');

});

app.controller('controlLogin', function($scope, $http, $auth, $state) {
   $scope.DatoTest="**Login**";

$scope.login=function(){

$auth.login({nombre:$scope.persona.nombre,clave:$scope.persona.clave});

console.info("datos auth en menu" , $auth.isAuthenticated(), $auth.getPayload());

  if($auth.isAuthenticated())
  {
    $state.go("alta");
  }
  else
  {
    $state.go("alta");
  }
  


}
/*console.info("datos auth en login" , $auth.isAuthenticated(), $auth.getPayload());
if($auth.isAuthenticated())
{

$state.go("login");


}
var persona=$auth.getPayload();
console.info("datos del login",persona);
$scope.nombrepersona=persona.nombre;

$scope.SalirDelSistema function(){



  $auth.logout()
  .then(function{})
  $state.go('login');
}*/
/* function login()
        {
           
         
           $scope.persona={};
          $scope.persona.nombre= $("#nombre").val();
            $scope.persona.clave=$("#clave").val();
           

            var funcionAjax =$.ajax({
                url:"ValidarUsuario.php",
                 type:"post",
                data: DatosLogin               
                });


            funcionAjax.done(function(respuesta){
                alert(respuesta);
                if(respuesta=="correcto")
                {
                    $("#MensajeError").val("");
                    window.location.href="menu.php";            // vamos al menu
                }
                else
                {
                   alert("NO esta registrado... ");

                    // mostrar mensaje "no esta en la base"
                    //vamos al registro
                    //window.location.href="registroJquery.php";
                }
        });



        }

 

  if($auth.isAuthenticated())
     {
     $state.go("alta");
   }
   else
   {
     $state.go("menu");
   }*/

 });

app.controller('controlMenu', function($scope, $http, $auth,$state) {
  $scope.DatoTest="**Menu**";
  $auth.login({nombre:"natalia", clave:"algo"});

  console.info("datos auth en menu" , $auth.isAuthenticated(), $auth.getPayload());

  if($auth.isAuthenticated())
  {
    $state.go("alta");
  }
  else
  {
    $state.go("menu");
  }
  
});


app.controller('controlAlta', function($scope, $http, FileUploader) {
  $scope.DatoTest="**alta**";

  $scope.uploader = new FileUploader({url: 'PHP/nexo.php'});
      $scope.uploader.queueLimit = 1; // indico cuantos archivos permito cargar
            

//inicio las variables
  $scope.persona={};
  $scope.persona.nombre= "natalia" ;
  $scope.persona.dni= "12312312" ;
  $scope.persona.apellido= "natalia" ;
  $scope.persona.clave="algo";
   $scope.persona.sexo="";
  $scope.persona.foto="pordefecto.png";
  
  $scope.cargarFoto=function(nombreDeFoto){

    var direccion="fotos/"+nombreDeFoto;

    $http.get(direccion, {responseType: "blob"})
    .then(

      function(respuesta){
        var mimetype=respuesta.data.type;
        var archivo=new File([respuesta.data], direccion, {type: mimetype});
        var fotoObtenida= new FileUploader.FileItem($scope.uploader, {});
        fotoObtenida._file= archivo;
        fotoObtenida.file={};
        fotoObtenida.file=new File([respuesta.data], nombreDeFoto, {type:mimetype});
        $scope.uploader.queue.push(fotoObtenida);
      }


      );

  }

  $scope.cargarFoto($scope.persona.foto);

  $scope.uploader.onSuccessItem= function(item, response, status, headers) {

  console.info("Voy a guardar", item, response,status, headers);

  $http.post('PHP/nexo.php', { datos: {accion :"insertar",persona:$scope.persona}})
  .then(function(respuesta) {       
    //aca se ejetuca si retorno sin errores        
    console.log(respuesta.data);

  },function errorCallback(response) {        
        //aca se ejecuta cuando hay errores
        console.log( response);           
    });
  }

  $scope.Guardar=function(){

    if($scope.uploader.queue[0].file.name!='pordefecto.png')
    {
      var nombrefoto=$scope.uploader.queue[0].file.name;
      $scope.persona.foto=nombrefoto;
    }

    $scope.uploader.uploadAll();
  }
});


app.controller('controlGrilla', function($scope, $http) {
  	$scope.DatoTest="**grilla**";
 	
    function bien(respuesta)
    {
        $scope.ListadoPersonas = respuesta.data.listado;
        console.log(respuesta.data);
    }

    function mal(respuesta)
    {
        $scope.ListadoPersonas= [];
        console.log( response);
    }

  $http.get('PHP/nexo.php', { params: {accion :"traer"}})
  .then(bien, mal);

 	$scope.Borrar=function(persona){
		console.log("borrar"+persona);



$http.post("PHP/nexo.php",{datos:{accion :"borrar",persona:persona}},{headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
 .then(function(respuesta) {       
         //aca se ejetuca si retorno sin errores        
         console.log(respuesta.data);


        $http.get('PHP/nexo.php', { params: {accion :"traer"}})
  .then(function(respuesta) {       

         $scope.ListadoPersonas = respuesta.data.listado;
         console.log(respuesta.data);

    },function errorCallback(response) {
         $scope.ListadoPersonas= [];
        console.log( response);
   });


    },function errorCallback(response) {        
        //aca se ejecuta cuando hay errores
        console.log( response);           
    });

/*
     $http.post('PHP/nexo.php', 
      headers: 'Content-Type': 'application/x-www-form-urlencoded',
      params: {accion :"borrar",persona:persona})
    .then(function(respuesta) {       
         //aca se ejetuca si retorno sin errores        
         console.log(respuesta.data);

    },function errorCallback(response) {        
        //aca se ejecuta cuando hay errores
        console.log( response);           
    });

*/
 	}




 	$scope.Modificar=function(id){
 		
 		console.log("Modificar"+id);
 	}





});

app.controller('controlModificar', function($scope, $http, $stateParams, FileUploader) {
  $scope.DatoTest="**Modificar**";

  $scope.uploader = new FileUploader({url: 'PHP/nexo.php'});
  $scope.uploader.queueLimit = 1;

        $scope.persona={};
        $scope.persona.id=$stateParams.id ;
        $scope.persona.nombre= $stateParams.nombre ;
        $scope.persona.dni=$stateParams.dni ;
        $scope.persona.clave= $stateParams.clave ;
        $scope.persona.sexo= $stateParams.sexo ;
        $scope.persona.apellido= $stateParams.apellido ;
        $scope.persona.foto=$stateParams.foto;

  $scope.cargarFoto=function(nombreDeFoto){

    var direccion="fotos/"+nombreDeFoto;

    $http.get(direccion, {responseType: "blob"})
    .then(

      function(respuesta){
        var mimetype=respuesta.data.type;
        var archivo=new File([respuesta.data], direccion, {type: mimetype});
        var fotoObtenida= new FileUploader.FileItem($scope.uploader, {});
        fotoObtenida._file= archivo;
        fotoObtenida.file={};
        fotoObtenida.file=new File([respuesta.data], nombreDeFoto, {type:mimetype});
        $scope.uploader.queue.push(fotoObtenida);
      }


      );

  }

  $scope.cargarFoto($scope.persona.foto);

  $scope.uploader.onSuccessItem= function(item, response, status, headers) {

  console.info("Voy a modificar", item, response,status, headers);

    console.log($scope.persona);
    $http.post('PHP/nexo.php', { datos: {accion :"modificar",persona:$scope.persona}})
    .then(function(respuesta) {       
         //aca se ejetuca si retorno sin errores        
         console.log(respuesta.data);

    },function errorCallback(response) {        
        //aca se ejecuta cuando hay errores
        console.log( response);           
    });


  }

  $scope.Guardar=function(){

    if($scope.uploader.queue[0].file.name!='pordefecto.png')
    {
      var nombrefoto=$scope.uploader.queue[0].file.name;
      $scope.persona.foto=nombrefoto;
    }

    $scope.uploader.uploadAll();
  }
  
});
