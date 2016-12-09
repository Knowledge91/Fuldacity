angular.
    module('core.authentication').
    factory('authenticationService', ['$resource',
        function($resource) {
            var authentication = {
                'user':
                        $resource('/rest-auth/user/', {}, {
                            get: {
                                method: 'GET',
                                transformResponse: function(data, headers){
                                    response = {}
                                    response.data = data;
                                    response.headers = headers();
                                    return response;
                                }
                            }
                        }),
                'register':
                    function(username, email, password, password2) {
                        Registration = $resource('/rest-auth/registration/');
                        user = new Registration();
                        user.username = username;
                        user.email = email;
                        user.password1 = password;
                        user.password2 = password2;
                        user.$save().catch(function(){
                            authentication.authenticated = false;
                        }).then(function() {
                            authentication.authenticated = true;
                        });
                    },
                'setAuthenticationStatus':
                    function() {
                        authentication.user.get(function (data) {
                            authentication.authenticated = true;
                        }, function () {
                            authentication.authenticated = false;
                        });
                    },
                'authenticated': false,
                'login':
                    function(username, password) {
                        Login = $resource('/rest-auth/login/');
                        login = new Login();
                        login.username = username;
                        login.password = password;
                        login.$save().catch(function(){
                            authentication.authenticated = false;
                        }).then(function() {
                            authentication.authenticated = true;
                        });
                    },
                'logout':
                    function() {
                        $resource('/rest-auth/logout/').get();
                        authentication.authenticated = false;
                    }
            };

            // Init
            authentication.setAuthenticationStatus();

            return authentication;
        }
    ]
 );