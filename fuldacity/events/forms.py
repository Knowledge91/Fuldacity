from django import forms
from django.urls import reverse


class LoginForm(forms.Form):
    benutzername = forms.CharField()
    passwort = forms.CharField(widget=forms.PasswordInput)

class EventForm(forms.Form):
    name = forms.CharField(required=False)
    beschreibung = forms.CharField(widget=forms.Textarea, required=False)
    image = forms.ImageField()