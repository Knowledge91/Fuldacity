from django.conf.urls import include, url

urlpatterns = [
    url(r'^events/', include('events.urls')),
]