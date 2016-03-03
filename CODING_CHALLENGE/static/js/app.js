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
 *   
 */
module.controller("indexController", function($scope,$filter) {
	
	$scope.cubo = [];
	$scope.mostrarForm = true;
	
	$scope.iniciar = function(){
		
		if($scope.dimension === "1"){
			alert("La dimensión debe ser mayor a uno ");
			$scope.dimension = "";
			$scope.pruebas = "";
		}else{
			
			if($scope.pruebas === "1"){
				alert("La dimensión debe ser mayor a uno ");
				$scope.dimension = "";
				$scope.pruebas = "";
			}else{
				
				
				$scope.mostrarForm  = false;
				// Se inicia el 
				$scope.iniciarCubo();
				
			}
			
			
			
		}
		
		
	};
	
	
	$scope.iniciarCubo = function(){
		
		for(var a = 1;a <= parseInt($scope.dimension) ; a ++){
			
			console.log("Número de iteraciones ");
			$scope.cubo[""+a+""+a+""+a+""+a] = 0;
		}
		console.log($scope.cubo)
		
	}
	
});	

