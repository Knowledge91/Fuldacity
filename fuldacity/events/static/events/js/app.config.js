angular.
    module('StarterApp').
    config(['$mdThemingProvider', '$resourceProvider', '$locationProvider', '$routeProvider', '$httpProvider',
        function($mdThemingProvider, $resourceProvider, $locationProvider, $routeProvider, $httpProvider) {
            $mdThemingProvider.theme('default')
            // .primaryPalette('red')
            // .accentPalette('cyan');

            // CSRF TOKEN
            $httpProvider.defaults.xsrfCookieName = 'csrftoken';
            $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';

            // kep backslash at end of urls
            $resourceProvider.defaults.stripTrailingSlashes = false;

            $routeProvider.
                when('/events', {
                    template: '<event-list></event-list>'
                }).
                when('/event/add', {
                    template: '<event-add></event-add>'
                }).
                otherwise('/events');

            // use the HTML5 History API
            // $locationProvider.html5Mode(true);
        }
    ]
);