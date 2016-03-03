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

	console.log("dasd");
	
});


/*
 * Controlador del App
 *   
 */
module.controller("indexController", function($scope,$filter) {
	
	
	console.log("controlador");
	
	
});	

