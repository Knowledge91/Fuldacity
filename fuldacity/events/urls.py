from django.conf.urls import url
from django.views.generic import TemplateView
from django.contrib.staticfiles.urls import static

from . import views

app_name = 'events'
urlpatterns = [
    url(r'^$', views.IndexView.as_view(), name='index'),
    url(r'events/(?P<pk>[0-9]+)/$', views.DetailView.as_view(), name='event-detail'),
    url(r'^eventEditor/(?P<pk>\d+)/$', views.EventEditorDetailView.as_view(), name='eventEditorDetail'),
    url(r'^meine-events/$', views.EventEditorView.as_view(), name='meine-events'),
    url(r'event/add/$', views.EventCreate.as_view(), name='event-add'),
    url(r'event/(?P<pk>[0-9]+)/$', views.EventUpdate.as_view(), name='event-update'),
    url(r'event/(?P<pk>[0-9]+)/image/$', views.EventImageUpdate, name='event-image-update'),
    url(r'event/(?P<pk>[0-9]+)/delete/$', views.EventDelete.as_view(), name='event-delete'),
    url(r'event/erstellen/$', views.EventErstellen.as_view(), name='event-erstellen'),
    url(r'^login/$', views.Login, name='login'),
    url(r'^logout/$', views.Logout, name='logout'),
]
