from django.views import generic

from .models import Event

class IndexView(generic.ListView):
    template_name = 'events/list.html'
    context_object_name = 'latest_event_list'

    def get_queryset(self):
        """Return the last five published questions."""
        return Event.objects.order_by('-pub_date')[:5]