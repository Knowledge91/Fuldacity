angular.module('toolbar').
    controller('toolbarController', ['$mdSidenav', '$mdMedia', '$scope', '$mdDialog', '$mdToast', '$resource', 'authenticationService',
        function($mdSidenav, $mdMedia, $scope, $mdDialog, $mdToast, $resource, auth) {
            $scope.auth = auth;

            this.logout = auth.logout;
            this.showStatus = function() {
                console.log($scope.auth.authenticated);
                console.log(auth.authenticated);
            }


            self = this;
            this.$mdMedia = $mdMedia;
            this.$mdDialog = $mdDialog;
            this.$mdToast = $mdToast;
            this.$scope = $scope;
            this.toggleSidenav = function () {
                return $mdSidenav('left').toggle();
            };
            this.focusSearch = function () {
                $scope.searchClass = "focus";
            };
            this.defocusSearch = function () {
                $scope.searchClass = "lol";
            };



            this.status = '';
            this.customFullscreen = this.$mdMedia('xs') || this.$mdMedia('sm');

            this.showLogin = function (event) {
                var _this = this;
                var useFullScreen = (this.$mdMedia('sm') || this.$mdMedia('xs')) && this.customFullscreen;
                this.$mdDialog.show({
                    controller: ['$scope', '$mdDialog', '$resource',
                        function LoginDialogController($scope, $mdDialog, $resource) {
                            this.$mdDialog = $mdDialog;
                            this.$resource = $resource;
                            this.hide = function () {
                                this.$mdDialog.hide();
                            };
                            this.close = function () {
                                this.$mdDialog.cancel();
                            };
                            this.login = function () {
                                auth.login(this.username, this.password);
                                this.$mdDialog.hide({username: this.username, password: this.password});
                            };
                        }
                    ],
                    controllerAs: 'dialog',
                    templateUrl: '/static/events/js/core/authentication/login-dialog.template.html',
                    parent: angular.element(document.body),
                    targetEvent: event,
                    clickOutsideToClose: true,
                    fullscreen: useFullScreen
                }).then(function (credentials) { return _this.showToast("Thanks for logging in, " + credentials.username + "."); }, function () { return _this.showToast('You canceled the login.'); });
                this.$scope.$watch(function () { return _this.$mdMedia('xs') || _this.$mdMedia('sm'); }, function (wantsFullScreen) { return _this.customFullscreen = wantsFullScreen === true; });
            };

            this.showRegister = function (event) {
                var _this = this;
                var useFullScreen = (this.$mdMedia('sm') || this.$mdMedia('xs')) && this.customFullscreen;
                this.$mdDialog.show({
                    controller: ['$scope', '$mdDialog', '$resource',
                        function RegisterDialogController($scope, $mdDialog, $resource) {
                            this.$mdDialog = $mdDialog;
                            this.$resource = $resource;
                            this.hide = function () {
                                this.$mdDialog.hide();
                            };
                            this.close = function () {
                                this.$mdDialog.cancel();
                            };
                            this.login = function () {
                                console.log(this.username + " " + this.email + " " + this.password + " " + this.password2);
                                auth.register(this.username, this.email, this.password, this.password2);
                                this.$mdDialog.hide({username: this.username, password: this.password});
                            };
                        }
                    ],
                    controllerAs: 'dialog',
                    templateUrl: '/static/events/js/core/authentication/register-dialog.template.html',
                    parent: angular.element(document.body),
                    targetEvent: event,
                    clickOutsideToClose: true,
                    fullscreen: useFullScreen
                }).then(function (credentials) { return _this.showToast("Thanks for logging in, " + credentials.username + "."); }, function () { return _this.showToast('You canceled the login.'); });
                this.$scope.$watch(function () { return _this.$mdMedia('xs') || _this.$mdMedia('sm'); }, function (wantsFullScreen) { return _this.customFullscreen = wantsFullScreen === true; });
            };

            this.showToast = function (content) {
                this.$mdToast.show(this.$mdToast.simple()
                    .content(content)
                    .position('bottom right')
                    .hideDelay(3000));
            };
        }
    ]
);