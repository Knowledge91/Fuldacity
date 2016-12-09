from django.views import generic, View
from rest_framework import permissions
from events.models import Event
from events.serializers import EventSerializer
from rest_framework import generics

class IndexView(generic.ListView):
    template_name = 'events/base.html'
    context_object_name = 'event_list'

    def get_queryset(self):
        return Event.objects.all()

class Angular():
    print('jo');

# Event Model
class EventList(generics.ListCreateAPIView):
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)
    queryset = Event.objects.all()
    serializer_class = EventSerializer



