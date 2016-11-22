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
    template_name = 'events/list.html'
    context_object_name = 'event_list'

    def get_queryset(self):
        return Event.objects.all()


class DetailView(generic.DetailView):
    model = Event
    template_name = 'events/detail.html'


class EventEditorView(LoginRequiredMixin, generic.ListView):
    login_url = '/login'
    template_name = 'events/eventEditor.html'
    context_object_name = 'event_list'

    def get_queryset(self):
        return Event.objects.filter(author=self.request.user.id)


class EventCreate(View):
    def get(self, request):
        Event.objects.create()
        return redirect('events:event-admin')

class EventErstellen(View):
    def get(self, request):
        return render(request, 'events/erstellen.html')
    def post(self, request):
        bild = request.FILES['bild']
        name = request.POST['name']
        kategorie = Kategorie.objects.get(name=request.POST['kategorie'])
        beginn = datetime.strptime(request.POST['beginnDatum'] + ' ' + request.POST['beginnZeit'], '%d.%m.%Y %H:%M')
        ende = datetime.strptime(request.POST['endeDatum'] + ' ' + request.POST['endeZeit'], '%d.%m.%Y %H:%M')
        beschreibung = request.POST['beschreibung']

        event = Event(name=name, kategorie=kategorie, beginn=beginn, ende=ende, beschreibung=beschreibung, bild=bild);

        event.save()
        # with open('static/images/events/'+ str(event.pk) +'.jpg', 'wb+') as destination:
        #     for chunk in bild.chunks():
        #         destination.write(chunk)
        # event.bild = 'static/images/events/'+ str(event.pk) +'.jpg'
        # event.save()

        return redirect('events:event-erstellen')

class EventUpdate(View):

    def get(self, request, pk):
        event = get_object_or_404(Event, pk=pk)
        form = EventForm
        return render(request, 'events/event_form.html', {'event': event, 'form': form})

    def post(self, request, pk):
        event = Event.objects.get(id=pk)
        field = request.POST['name']
        value = request.POST['value']
        field = request.POST['name']
        if(field == 'name'):
            event.name = value
        elif(field == 'beschreibung'):
            event.beschreibung = value
        event.save()
        return render(request, 'events/event_form.html', {'event': event})


def EventImageUpdate(request, pk):
    if request.method == 'POST':
        form = EventForm(request.POST, request.FILES)
        if form.is_valid():
            event = Event.objects.get(id=pk)
            event.image = form.cleaned_data['image']
            event.save()
            return redirect('events:event-update', pk=pk)


class EventDelete(View):
    def get(self, request, pk):
        Event.objects.filter(pk=pk).delete()
        return redirect('events:event-admin')


class EventEditorDetailView(generic.DetailView):
    model = Event
    template_name = 'events/eventEditorDetail.html'


def Login(request):
    if request.method == 'POST':
        form = LoginForm(request.POST)
        if form.is_valid():
            benutzername = form.cleaned_data['benutzername']
            passwort = form.cleaned_data['passwort']
            user = authenticate(username=benutzername, password=passwort)
            if user is not None:
                login(request, user)
                return HttpResponseRedirect('/')
            else:
                print('Not Valid Login')
    else:
        form = LoginForm()

    return render(request, 'events/login.html', {'form': form})

def Logout(request):
    logout(request)
    return redirect('/')


