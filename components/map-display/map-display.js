/**
 * Created by JSmith on 26/9/2017.
 */

angular.module('components.mapDisplay', ['angular-svg-round-progressbar', 'components.creatorFormDisplay.directive'])
    .controller('mapDisplayController', ['$scope', '$rootScope', '$location', '$http', 'NgMap', '$mdDialog', '$interval', function ($scope, $rootScope, $location, $http, NgMap, $mdDialog, $interval) {

        console.log("*** mapDisplayController");
        $scope.stats = {};
        $scope.percentageWeight = {};
        $scope.types = "['establishment']";
        $scope.search = false;
        NgMap.getMap().then(function(map) {
            console.log('map', map);
            $scope.map = map;
        });

            serviceUrl = $rootScope.config.pubservice;
            var reqInner = {
                method: 'GET',
                url: serviceUrl,
                headers: {
                    'Content-Type': 'application/json',
                    'accept': 'application/json'
                }
            };


            $http(reqInner).then(function (response) {
                var pubdetails = response.data;
                var markers = [];
                // add markers
                pubdetails.forEach(function (pub) {
                    var marker = {};
                    $scope.stats[pub.pubID] = {};
                    $scope.stats[pub.pubID][pub.keg[0].drinkName] = pub.keg[0].freshness;
                    $scope.percentageWeight[pub.pubID] = {};
                    $scope.percentageWeight[pub.pubID][pub.keg[0].drinkName] = pub.keg[0].percentageWeight;

                    marker.position = [parseFloat(pub.latitude), parseFloat(pub.longtitude)];
                    marker.title = pub.pubName;
                    marker.pubdetails = pub;
                    markers.push(marker);

                    // schedule updates
                    $interval(updateStats, $rootScope.config.updateInterval);
                }
            )


                $scope.pubs = pubdetails;
                $scope.markers = markers;
                $scope.ready = true;
            })

        var updateStats = function() {
            serviceUrl = $rootScope.config.pubservice;
            var reqInner = {
                method: 'GET',
                url: serviceUrl,
                headers: {
                    'Content-Type': 'application/json',
                    'accept': 'application/json'
                }
            };


            $http(reqInner).then(function (response) {
                var pubdetails = response.data;
                pubdetails.forEach(function (pub) {
                        $scope.stats[pub.pubID][pub.keg[0].drinkName] = pub.keg[0].freshness;
                        $scope.percentageWeight[pub.pubID][pub.keg[0].drinkName] = pub.keg[0].percentageWeight;
                    }
                )
            })

        }




        $scope.getStat = function(pubID, drinkName) {
            return $scope.stats[pubID][drinkName];
        }

        $scope.getWeight = function(pubID, drinkName) {
            return $scope.percentageWeight[pubID][drinkName];
        }


        $scope.setSelectedPub = function(e, marker) {
            $scope.selectedPub = marker;
            $scope.map.showInfoWindow('pub-iw', marker.pubdetails.pubID+ 'marker');

        }


        $scope.placeChanged = function() {
            $scope.place = this.getPlace();
            console.log('location', $scope.place.geometry.location);
            $scope.map.setCenter($scope.place.geometry.location);
        }

        $scope.toggleSearch = function () {
            $scope.search = !$scope.search;
        }

        $scope.sendFeedback = function(pubName, ev) {

            var presetdata = {};
            presetdata.data ={};
            presetdata.data.pub = pubName;

            $mdDialog.show({
                locals:{presetdata: presetdata},
                controller: DialogController,
                templateUrl: 'components/map-display/templates/feedback-dialog.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose:true,
                fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
            })
                .then(function(ev) {
                    $scope.status = 'You said the information was OK';
                }, function() {
                    $scope.status = 'You cancelled the dialog';
                });
        }

        function DialogController($scope, $mdDialog, presetdata) {
            $scope.presetdata = presetdata;
            console.log("Preset:" + presetdata);

            $scope.cancel = function() {
                $mdDialog.cancel();
            };
        }

    }])