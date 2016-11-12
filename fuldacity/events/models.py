import datetime

from django.db import models
from django.contrib.auth.models import User
from django.urls import reverse

class Event(models.Model):
    name = models.CharField(max_length=200, default="Neues Event")
    author = models.ForeignKey(User, related_name='events', default=1)
    beschreibung = models.TextField(default='Keine Beschreibung vorhanden.')
    kategorie = models.CharField(max_length=200, default='')
    image = models.ImageField(upload_to='static/images/', default='static/images/no-img.png')
    pub_date = models.DateTimeField(default=datetime.datetime.now)

    def __str__(self):
        return self.name

    def get_absolute_url(self):
        return u'/events/%d' % self.id
