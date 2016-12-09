angular.module('eventAdd').
    component('eventAdd', {
        templateUrl: '/static/events/js/event-add/event-add.template.html',
        controller: ['$location', '$scope', '$resource', 'NgMap', 'eventsService',
            function DemoCtrl ($location, $scope, $resource, NgMap, events) {
                $scope.forms = {};
                var self = this;

                var vm = this;
                vm.types = "['address']";
                NgMap.getMap().then(function(map) {
                    vm.map = map;
                    console.log(map.getCenter());
                    console.log('markers', map.markers);
                    console.log('shapes', map.shapes);
                });

                $scope.$watch('forms.form', function(form) {
                    if(form) {
                        vm.placeChanged = function() {
                            vm.place = this.getPlace();
                            if(vm.place.geometry) {
                                form.address.$error.validationError = false;
                                form.address.$setPristine();
                                form.address.$setValidity();
                                // vm.map.setCenter(vm.place.geometry.location);
                            } else {
                                form.address.$error.validationError = true;
                                 console.log(form.address.class);

                            }

                        };
                        form.address.$error.validationError = true;
                    }
                });

                self.kategories = ['House', 'Hip Hop', 'Charts'];

                self.erstellen = function() {
                    events.eventList.save({titel: self.titel, datum: self.datum});
                    $location.path('/')
                };


                // IMG CROP
                $scope.myImage='/static/events/img/no-img.png';
                $scope.myCroppedImage='';

                var handleFileSelect=function(evt) {
                  var file=evt.currentTarget.files[0];
                  var reader = new FileReader();
                  reader.onload = function (evt) {
                    $scope.$apply(function($scope){
                      $scope.myImage=evt.target.result;
                    });
                  };
                  reader.readAsDataURL(file);
                };
                  angular.element(document.querySelector('#fileInput')).on('change',handleFileSelect);

            }
        ]
    }
);
