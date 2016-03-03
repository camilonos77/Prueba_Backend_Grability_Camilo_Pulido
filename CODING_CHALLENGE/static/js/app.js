var pruebaApp = angular.module("pruebaApp", [

											'pruebaApp.controllers'
											]);


/*
 * Configuracion de las routes internas de angularjs
 * Se recomienda siempre indicar plantilla y controlador
 * */
pruebaApp.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
            when('/', {
                templateUrl: './templates/index.html',
                controller:  'indexController'
            }).

        otherwise({
                redirectTo: '/'
            });
}]);


/*
 * Metodo inicial run
 * */
pruebaApp.run(function($rootScope) {


	
});