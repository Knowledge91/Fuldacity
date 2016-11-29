from django.conf.urls import include, url

urlpatterns = [
    url(r'^events/', include('events.urls')),
    url(r'^rest-auth/', include('rest_auth.urls')),
    url(r'^rest-auth/registration/', include('rest_auth.registration.urls'))
]