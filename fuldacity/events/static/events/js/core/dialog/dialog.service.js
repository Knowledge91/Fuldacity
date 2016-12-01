angular.
    module('core.dialog').
    factory('dialog', ['$mdMedia', '$mdDialog', 'authentication',
        function($mdMedia, $mdDialog, authentication) {
            var dialog = {};
            this.$mdDialog = $mdDialog;

            // dialog.showLogin =
            //     $mdDialog.show({
            //         controller: function LoginDialogController($mdDialog) {
            //             this.$mdDialog = $mdDialog;
            //             this.hide = function () {
            //                 this.$mdDialog.hide();
            //             };
            //             this.close = function () {
            //                 this.$mdDialog.cancel();
            //             };
            //             this.login = function () {
            //                 authentication.login(this.username, this.password);
            //             };
            //         },
            //         controllerAs: 'dialog',
            //         templateUrl: '/static/events/js/core/dialog/login-dialog.template.html',
            //         parent: angular.element(document.body),
            //         targetEvent: event,
            //         clickOutsideToClose: true,
            //         fullscreen: true
            //      });
                // .then(function (credentials) { return _this.showToast("Thanks for logging in, " + credentials.username + "."); }, function () { return _this.showToast('You canceled the login.'); });
                 // this.$scope.$watch(function () { return _this.$mdMedia('xs') || _this.$mdMedia('sm'); }, function (wantsFullScreen) { return _this.customFullscreen = wantsFullScreen === true; });



            return dialog;
        }
    ]
);
