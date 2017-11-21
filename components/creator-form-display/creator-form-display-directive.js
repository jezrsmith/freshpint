/**
 * Created by JSmith on 10/7/2016.
 */
angular.module('components.creatorFormDisplay.directive', ['components.creatorFormDisplay'])
    .directive('creatorFormDisplayDirective', creatorFormDisplayDirective);

function creatorFormDisplayDirective() {
    return {
        restrict: 'EA',
        controller: 'CreatorFormDisplayController',
        controllerAs: 'creatorFormDisplay',
		scope : {
            formurl: '=',
            serviceurl: '=',
            presetdata: '='
        },
        link: function ($scope, element, attrs) {
            $scope.getContentUrl = function () {
                ////console.log ("Template path : " + attrs.templatePath);
                if (typeof attrs.templatePath  == 'undefined') {
                    ////console.log ("Template path undefined => returning default");
                    return 'components/creator-form-display/templates/creator-form-display.html';
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
