angular.module('eventList').
    component('eventList', {
        templateUrl: '/static/events/js/event-list/event-list.template.html',
        controller: ['$mdDialog', '$mdToast', '$resource',
            function EventListController($mdDialog, $mdToast, $resource) {
                this.$mdDialog = $mdDialog;
                this.$mdToast = $mdToast;
                this.$resource = $resource;




            }
        ]
    });
