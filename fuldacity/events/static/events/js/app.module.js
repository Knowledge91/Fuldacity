var AppCtrl = (function () {
    function AppCtrl($scope, $mdSidenav, $mdDialog, $mdMedia, $mdToast, $resource) {
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
        $scope.focusSearch = function () {
            $scope.searchClass = "focus";
        };
        $scope.defocusSearch = function () {
            $scope.searchClass = "lol";
        };
    };

    AppCtrl.prototype.showDialog = function (event) {
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

    AppCtrl.prototype.showToast = function (content) {
        this.$mdToast.show(this.$mdToast.simple()
            .content(content)
            .position('top right')
            .hideDelay(3000));
    };

    return AppCtrl;
}());

var LoginDialogController = (function() {
    function LoginDialogController($mdDialog, $resource) {
        this.$mdDialog = $mdDialog;
        this.$resource = $resource;
    }
    LoginDialogController.prototype.hide = function () {
        this.$mdDialog.hide();
    };
    LoginDialogController.prototype.close = function () {
        this.$mdDialog.cancel();
    };
    LoginDialogController.prototype.login = function () {
//                        var User = this.$resource('/rest-auth/login/', {});
//                        User.username = 'test';
//                        User.password = 'test1234';
//                        console.log(User);

       var Todo = this.$resource('/rest-auth/login/');

        //create a todo
        var todo1 = new Todo();
        todo1.username = 'test';
        todo1.password = 'test1234';
        todo1.$save();

        this.$mdDialog.hide({ username: this.username, password: this.password });
    };
    return LoginDialogController;
}());



var myApp = angular.module('StarterApp', ['ngMaterial', 'ngMessages', 'ngResource']).controller('AppCtrl', ['$scope', '$mdSidenav', '$mdDialog', '$mdMedia', '$mdToast', '$resource', AppCtrl]);
myApp.controller('AppCtrl', AppCtrl);
myApp.config(function($mdThemingProvider, $resourceProvider) {
    $mdThemingProvider.theme('default')
    .primaryPalette('red')
    .accentPalette('cyan');
    $resourceProvider.defaults.stripTrailingSlashes = false;
});