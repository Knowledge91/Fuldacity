angular.
    module('core.restAuth').
    factory('restAuth', ['$resource',
        function($resource) {
            var restAuth = {
                'setAuthenticationStatus':
                    function() {
                        $resource('/rest-auth/user/').get().$promise.
                        catch(function() {
                            restAuth.authenticated = false;
                        }).
                        then(function(){
                            restAuth.authenticated = true;
                        });
                    },
                'authenticated': false,
                'login':
                    function(username, password) {
                        console.log(username);
                        Login = $resource('/rest-auth/login/');
                        login = new Login();
                        login.username = username;
                        login.password = password;
                        login.$save().catch(function(){
                            restAuth.authenticated = false;
                        }).then(function() {
                            restAuth.authenticated = true;
                        });
                    },
                'logout':
                    function() {
                        $resource('/rest-auth/logout/').get();
                        restAuth.authenticated = false;
                    }
            };

            // Init
            restAuth.setAuthenticationStatus();

            return restAuth;
        }
    ]
 );