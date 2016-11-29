angular.
    module('StarterApp').
    config(['$mdThemingProvider', '$resourceProvider', '$locationProvider', '$routeProvider',
        function($mdThemingProvider, $resourceProvider, $locationProvider, $routeProvider) {
            $mdThemingProvider.theme('default')
            .primaryPalette('red')
            .accentPalette('cyan');

            // kep backslash at end of urls
            $resourceProvider.defaults.stripTrailingSlashes = false;

            // routing
            $locationProvider.hashPrefix('!');

            $routeProvider.
                when('/events', {
                    template: '<event-list></event-list>'
            }).
            otherwise('/events');
        }
    ]
);