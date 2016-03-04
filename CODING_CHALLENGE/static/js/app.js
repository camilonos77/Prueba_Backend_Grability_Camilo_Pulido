var module = angular.module("smartApp", [ 
                                                'ngRoute',
                                                
                                         ]);



module.config(function ($interpolateProvider, 
        $httpProvider,
        $locationProvider){
			$locationProvider.hashPrefix("!")
});


/*
 * Configuracion de las routes internas de angularjs
 * Se recomienda siempre indicar plantilla y controlador
 * */
module.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
            when('/inicio/', {
                templateUrl: './static/js/templates/index.html',
                controller:  'indexController'
            }).

        otherwise({
                redirectTo: '/inicio/'
            });
}]);


/*
 * Metodo inicial run
 * */
module.run(function($rootScope,$location) {

	console.log("Iniciando App");
	
});




/*
 * desarrollador por: Camilo Andres Pulido
 * email: camilonosdocs@gmail.com
 * Valida el ingreso de numeros enteros
 * */
module.directive('restrict', function($parse, $timeout) {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function(scope, iElement, iAttrs, controller,ngModel) {
        	
            scope.$watch(iAttrs.ngModel, function(value) {
                if (!value) {
                    return;
                }
             
	            value = value.toString();
	            var a =  value.replace(/[A-Za-z$.;:ÃƒÂ±@Ãƒâ€˜^~\<\Ã±\Ã‘\>`\ñ\Ñ\,_\Ã¢â€šÂ¬\(\Ã‚Âº\Ã‚Âª\$\%\&\)\=\Ã¢Ë†Å¾\-\Ã‚Â·\_\?\Ã‚Â¿\Ã‚Â¨\[\]\+\*\ÃƒÂ±\Ãƒâ€˜\}\{\Ã‚Â´\#\"\?\Ã‚Â¡\!\\\/\Ã‚Â°\Ã‚Â¬\|]/g,"").replace(/\s/g, "") 
				scope[iAttrs.ngModel] = a;
				iElement.val(a);
           });
        }
    };
});

/*
 * Controlador del App
 * Se encarga de gestionar todo el funcionamiento de la App  
 */
module.controller("indexController", function($scope,$filter) {
	
	$scope.cubo = [];
	$scope.mostrarForm = true;
	$scope.validacionNumero = 0;
	$scope.funcion  = "QUERY"; // funcion de la actualizacion
	$scope.indiceUno = "";
	$scope.indiceDos = "";
	$scope.operaciones = [];
	
	$scope.iniciar = function(){
		
		if($scope.dimension === "1"){
			alert("La dimensión debe ser mayor a uno ");
			$scope.dimension = "";
			$scope.pruebas = "";
			$scope.operaciones = [];
		}else{
			
			if($scope.pruebas === "1"){
				alert("La dimensión debe ser mayor a uno ");
				$scope.dimension = "";
				$scope.pruebas = "";
				$scope.operaciones = [];
			}else{
				
				
				$scope.mostrarForm  = false;
				// Se inicia el 
				$scope.iniciarCubo();
				
				
				// se muestra el modal
						
				$('#modal_seleccion').modal({
					  backdrop: 'static',
					  keyboard: false
					})
			}
			
			
			
		}
		
		
	};
	
	/*
	 * Limpia los input de los limites
	 * */
	$scope.limpiar =  function(){
		
		$scope.indiceUno = "";
		$scope.indiceDos = "";
	};
	
	/*
	 * Realiza las operaciones
	 * 
	 * */
	
	$scope.operacion =  function(){
		console.log($scope.cubo);
		if($scope.funcion === "UPDATE"){
			
			if($scope.cubo[''+$scope.indiceUno]  !== undefined ){
				
				$scope.cubo[''+$scope.indiceUno] = parseInt($scope.indiceDos);
				//$scope.operaciones.push(parseInt($scope.indiceDos));
				$scope.validacionNumero++;
				
			}else{
				$scope.dimension = "";
				$scope.pruebas = "";
				$scope.operaciones = [];
				$scope.indiceUno = "";
				$scope.mostrarForm = true;
				$scope.indiceDos = "";
				$('#modal_seleccion').modal("hide");
				$scope.validacionNumero = "";
				alert("Error los datos igresados \n no son correctos intente de nuevo ");
				return false;
			}
			
			$scope.indiceUno = "";
			$scope.indiceDos = "";
			
			
		}
		
		
		if($scope.funcion === "QUERY"){
			
			if($scope.cubo[''+$scope.indiceUno]  !== undefined && $scope.cubo[''+$scope.indiceDos]  !== undefined ){
				
				
				if( parseInt($scope.indiceUno) <= parseInt($scope.indiceDos)){
					
					
					var suma = 0;
					$.each($scope.cubo, function( key, value ) {
						  
						
						if(parseInt(key) >= parseInt($scope.indiceUno) &&  parseInt(key)  <= parseInt($scope.indiceDos)){
							if(value !== undefined && value !== 0 && value !== "0" ){
								
								if(parseInt(value) !== 0 ){
									console.log("LLAVE "+parseInt(key)+ " Indice uno "+parseInt($scope.indiceUno)+"  "+parseInt($scope.indiceDos));
									suma+=parseInt($scope.cubo[key+""]);
								}
								
							}
							
						}
						
					});
					
					
					
					$scope.operaciones.push(suma);
					//$scope.operaciones.push(parseInt($scope.indiceDos));
					$scope.validacionNumero++;
					$scope.indiceUno = "";
					$scope.indiceDos = "";
					
					
				}else{
					
					$scope.dimension = "";
					$scope.pruebas = "";
					$scope.operaciones = [];
					$scope.indiceUno = "";
					$scope.mostrarForm = true;
					$scope.indiceDos = "";
					$('#modal_seleccion').modal("hide");
					$scope.validacionNumero = "";
					alert("El indice uno no puede ser mayor al indice dos");
					return false;
				}
				
				
			}else{
				
				$scope.dimension = "";
				$scope.pruebas = "";
				$scope.operaciones = [];
				$scope.indiceUno = "";
				$scope.mostrarForm = true;
				$scope.indiceDos = "";
				$('#modal_seleccion').modal("hide");
				$scope.validacionNumero = "";
				alert("Error los datos igresados \n no son correctos intente de nuevo ");
				return false;
			}
			
			
		}
		
		
		if($scope.validacionNumero == $scope.pruebas ){
			
			$('#modal_seleccion').modal("hide");
			$scope.dimension = "";
			$scope.pruebas = "";
			$scope.indiceUno = "";
			$scope.mostrarForm = true;
			$scope.validacionNumero = 0;
			$scope.indiceDos = "";
			$('#modal_seleccion').modal("hide");
			$scope.validacionNumero = "";
			console.log($scope.operaciones)
			$('#modal_resultados').modal({
				  backdrop: 'static',
				  keyboard: false
			});
		}
		
	};
	
	/*
	 * Cierra el modal de resultados
	 * */
	$scope.cerrar = function(){
		
		$('#modal_seleccion').modal("hide");
		$('#modal_resultados').modal("hide");
		$scope.dimension = "";
		$scope.pruebas = "";
		$scope.indiceUno = "";
		$scope.mostrarForm = true;
		$scope.validacionNumero = 0;
		$scope.indiceDos = "";
		$('#modal_seleccion').modal("hide");
		$scope.validacionNumero = "";
	}
	
	/*
	 * Realiza la creacion del cubo
	 * 
	 * */
	$scope.iniciarCubo = function(){
		
		
		
		for(var a = 1;a <= parseInt($scope.dimension) ; a ++){
			
			console.log("Número de iteraciones ");
			$scope.cubo[""+a+""+a+""+a+""] = 0;
		}
		console.log($scope.cubo)
		
		
		
	}
	
});	

