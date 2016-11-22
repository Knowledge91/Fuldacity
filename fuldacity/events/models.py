import datetime

from django.db import models
from django.contrib.auth.models import User
from django.urls import reverse

class Kategorie(models.Model):
    name = models.CharField(max_length=200)

class Event(models.Model):
    name = models.CharField(max_length=200, default="Neues Event")
    beschreibung = models.TextField(default='Keine Beschreibung vorhanden.')
    kategorie = models.ForeignKey(Kategorie, on_delete=models.CASCADE, default=1)
    bild = models.ImageField(upload_to='images/events/', default='images/no-img.png')
    pub_date = models.DateTimeField(default=datetime.datetime.now)
    beginn = models.DateTimeField(default=datetime.datetime.now)
    ende = models.DateTimeField(default=datetime.datetime.now)

    def __str__(self):
        return self.name

    def get_absolute_url(self):
        return u'/events/%d' % self.id

