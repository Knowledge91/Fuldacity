angular.
    module('core.events').
    factory('eventsService', ['$resource',
        function($resource) {
            var events =  {
                'eventList':
                    $resource('/events/',{})
            };
            return events;
        }
    ]);