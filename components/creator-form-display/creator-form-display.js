/**
 * Created by JSmith on 26/9/2017.
 */

angular.module('components.creatorFormDisplay', ["ui.bootstrap", "ui.select", "formio", "ngJsonExplorer"])
    .controller('CreatorFormDisplayController', ['$scope', '$rootScope', '$location', '$http', function ($scope, $rootScope, $location, $http) {

        console.log("*** CreatorFormDisplayController");

        $scope.displays = [{
            name: 'form',
            title: 'Form'
        }];

        // Bind to the submission of the form.
        $scope.$on('formSubmit', function (event, submission) {
            //console.log("Submission is: " + JSON.stringify(submission));
            //$rootScope.formurl = $location.url();
            serviceUrl = $scope.serviceurl;
            //CreatorDataService.submit(submission, serviceUrl, 'PUT');
            var reqInner = {
                method: $scope.form.submissionmethod,
                url: serviceUrl,
                headers: {
                    'Content-Type': 'application/json',
                    'accept': 'application/json'
                },
                data: submission
            };
            $http(reqInner).then(function(response) {
                //console.log("Sent data - got back: " + JSON.stringify(response));
                event.preventDefault();
                $scope.submitted = true;
            })
        })

        // read form def
        var getFormDef = function () {

            // read config file
            $http.get($scope.formurl)
                .then(function (response) {
                    var formdef = response.data;
                    $scope.form = formdef;
                    $scope.ready = true;
                    $scope.renderForm = true;
                    $scope.loading= false;
                });
        };

        $scope.submission = {};
        $scope.submission = $scope.presetdata;
        getFormDef();
    }])