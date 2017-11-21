/**
 * Created by JSmith on 10/7/2016.
 */
angular.module('components.mapDisplay.directive', ['components.mapDisplay', 'ngMap'])
    .directive('mapDisplayDirective', mapDisplayDirective);

function mapDisplayDirective() {
    return {
        restrict: 'EA',
        controller: 'mapDisplayController',
        controllerAs: 'mapDisplay',
		scope : {

        },
        link: function ($scope, element, attrs) {
            $scope.getContentUrl = function () {
                ////console.log ("Template path : " + attrs.templatePath);
                if (typeof attrs.templatePath  == 'undefined') {
                    ////console.log ("Template path undefined => returning default");
                    return 'components/map-display/templates/map-display.html';
                } else {
                    ////console.log ("Template path is defined, returning : " + attrs.templatePath);
                    return attrs.templatePath;
                }
            },
            $scope.contentUrl = $scope.getContentUrl();
        },
        template: '<div ng-include="contentUrl"></div>'
    };
}
