angular.module('eventAdd').
    component('eventAdd', {
        templateUrl: '/static/events/js/event-add/event-add.template.html',
        controller: ['$location', '$scope', '$resource', 'NgMap', 'eventsService', '$mdpDatePicker', '$mdpTimePicker',
            function DemoCtrl ($location, $scope, $resource, NgMap, events, $mdpDatePicker, $mdpTimePicker) {

             $scope.currentDate = new Date();
  	this.showDatePicker = function(ev) {
    	$mdpDatePicker($scope.currentDate, {
        targetEvent: ev
      }).then(function(selectedDate) {
        $scope.currentDate = selectedDate;
      });;
    };

    this.filterDate = function(date) {
      return moment(date).date() % 2 == 0;
    };

                this.showTimePicker = function(ev) {
                    console.log('jo');
                    $mdpTimePicker($scope.currentTime, {
                    targetEvent: ev
                  }).then(function(selectedDate) {
                    $scope.currentTime = selectedDate;
                  });
                }


                $scope.forms = {};
                var self = this;


                // NGMAP PLACES
                var vm = this;
                vm.types = "['address']";
                NgMap.getMap().then(function(map) {
                    vm.map = map;
                });

                $scope.$watch('forms.form', function(form) {
                    if(form) {
                        vm.placeChanged = function() {
                            vm.place = this.getPlace();
                            if(vm.place.geometry) {
                                form.address.$error.validationError = false;
                                form.address.$setPristine();
                                form.address.$setValidity();

                                console.log('location', vm.place.geometry.location);
                                $scope.markerLatitude = vm.place.geometry.location.lat();
                                $scope.markerLongitude = vm.place.geometry.location.lng();
                                vm.map.setCenter(vm.place.geometry.location);
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
