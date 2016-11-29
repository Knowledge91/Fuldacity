angular.module('StarterApp', ['ngMaterial', 'ngMessages', 'ngResource', 'ngRoute',  'toolbar', 'eventList']);

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



