angular.module('eventList').
    component('eventList', {
        templateUrl: '/static/events/js/event-list/event-list.template.html',
        controller: ['$scope', 'eventsService',
            function EventListController($scope, events) {
                $scope.showEventDetails = [];

                var eventList = events.eventList.query();

                date = new Date().setHours(0,0,0,0);
                var preparedEventList = {};

                eventList.$promise.then(function() {
                    for(i = 0; i < eventList.length; i++) {
                        dateX = new Date(eventList[i].beginn).setHours(0, 0, 0, 0);

                        if(!preparedEventList[dateX]) {
                            preparedEventList[dateX] = [];
                        }

                        preparedEventList[dateX].push(eventList[i]);
                    }
                    $scope.eventList = preparedEventList;
                    console.log($scope.eventList);
                });

            }
        ]
    });
