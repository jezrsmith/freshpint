var appModuleName = "freshpintApp";

var mapApp = angular.module("freshpintApp", ['ngMaterial',"ngNewRouter",'components.pageHome']);

mapApp.controller("freshpintAppCtrl", function ($scope, $rootScope, $router, $location, $http, $interval) {

    console.log("*** freshpintAppCtrl");


        // read config file for s3
        $http.get("freshpint.config.json")
            .then(function (response) {
                $rootScope.config = response.data;
                console.log('refreshed');
            })


    //ROUTING Configuration
    $router.config([
        {path: '/', component: 'pageHome'}
    ]);


})