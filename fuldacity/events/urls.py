from django.conf.urls import url
from django.views.generic import TemplateView
from django.contrib.staticfiles.urls import static

from . import views

app_name = 'events'
urlpatterns = [
    url(r'^$', views.IndexView.as_view(), name='index'),
    url(r'^event/add$', views.Angular),
    # Event Model
    url(r'^events/$', views.EventList.as_view())
]

# urlpatterns = [
#     url(r'^snippets/$', views.snippet_list),
#     url(r'^snippets/(?P<pk>[0-9]+)/$', views.snippet_detail),
# ]