from django.views import generic, View
from django.contrib.auth.mixins import LoginRequiredMixin
from django.http import HttpResponseRedirect
from django.contrib.auth import logout, authenticate, login
from django.shortcuts import redirect, render, get_object_or_404
from django.urls import reverse_lazy
from datetime import datetime

from .models import Event, Kategorie
from .forms import LoginForm, EventForm

class IndexView(generic.ListView):
    template_name = 'events/base.html'
    context_object_name = 'event_list'

    def get_queryset(self):
        return Event.objects.all()






