angular.module('eventList').
    component('eventList', {
        templateUrl: '/static/events/js/event-list/event-list.template.html',
        controller: ['$scope', '$mdSidenav', '$mdDialog', '$mdMedia', '$mdToast', '$resource',
            function EventListController($scope, $mdSidenav, $mdDialog, $mdMedia, $mdToast, $resource) {
                this.$scope = $scope;
                this.$mdDialog = $mdDialog;
                this.$mdMedia = $mdMedia;
                this.$mdToast = $mdToast;
                this.$resource = $resource;

                this.status = '';
                this.customFullscreen = this.$mdMedia('xs') || this.$mdMedia('sm');
                $scope.toggleSidenav = function () {
                    return $mdSidenav('left').toggle();
                };
                this.focusSearch = function () {
                    $scope.searchClass = "focus";
                };
                this.defocusSearch = function () {
                    $scope.searchClass = "lol";
                };
                this.showDialog = function (event) {
                    var _this = this;
                    var useFullScreen = (this.$mdMedia('sm') || this.$mdMedia('xs')) && this.customFullscreen;
                    this.$mdDialog.show({
                        controller: LoginDialogController,
                        controllerAs: 'dialog',
                        templateUrl: 'login-dialog.template.html',
                        parent: angular.element(document.body),
                        targetEvent: event,
                        clickOutsideToClose: true,
                        fullscreen: useFullScreen
                    }).then(function (credentials) { return _this.showToast("Thanks for logging in, " + credentials.username + "."); }, function () { return _this.showToast('You canceled the login.'); });
                    this.$scope.$watch(function () { return _this.$mdMedia('xs') || _this.$mdMedia('sm'); }, function (wantsFullScreen) { return _this.customFullscreen = wantsFullScreen === true; });
                };

                $scope.showToast = function (content) {
                    this.$mdToast.show(this.$mdToast.simple()
                        .content(content)
                        .position('top right')
                        .hideDelay(3000));
                };

            }
        ]
    });
