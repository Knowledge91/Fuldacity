import datetime

from django.db import models
from django.contrib.auth.models import User
from django.urls import reverse

class Kategorie(models.Model):
    name = models.CharField(max_length=200)

class Event(models.Model):
    titel = models.CharField(max_length=100, default="Neues Event")
    location = models.CharField(max_length=100, default="Location")
    beginn = models.DateTimeField(default=datetime.datetime.now())
    ende = models.DateTimeField(default=datetime.datetime.now())
    beschreibung = models.CharField(max_length=1000, default="Beschreibung")
    mindestalter = models.IntegerField(null=True)
    kategorien = models.CharField(max_length=200, null=True);


    def __str__(self):
        return self.name

    def get_absolute_url(self):
        return u'/events/%d' % self.id

