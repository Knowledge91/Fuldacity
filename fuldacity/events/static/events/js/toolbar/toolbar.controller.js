angular.module('toolbar').
    controller('toolbarController', ['$mdSidenav', '$mdMedia', '$scope',  function($mdSidenav, $mdMedia, $scope) {
        self = this;
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
            this.customFullscreen = $mdMedia('xs') || $mdMedia('sm');

         this.showDialog = function (event) {
                    var _this = this;
                    var useFullScreen = (this.$mdMedia('sm') || this.$mdMedia('xs')) && this.customFullscreen;
                    this.$mdDialog.show({
                        controller: function LoginDialogController($mdDialog, $resource) {
                            this.$mdDialog = $mdDialog;
                            this.$resource = $resource;
                            this.hide = function () {
                                this.$mdDialog.hide();
                            };
                            this.close = function () {
                                this.$mdDialog.cancel();
                            };
                            this.login = function () {
                                var Todo = this.$resource('/rest-auth/login/');

                                //create a todo
                                var todo1 = new Todo();
                                todo1.username = 'test';
                                todo1.password = 'test1234';
                                todo1.$save();

                                this.$mdDialog.hide({username: this.username, password: this.password});
                            };
                        },
                        controllerAs: 'dialog',
                        templateUrl: 'login-dialog.template.html',
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
                        .position('top right')
                        .hideDelay(3000));
                };
    }]);