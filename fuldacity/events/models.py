from django.db import models

class Event(models.Model):
    name = models.CharField(max_length=200)
    created_at = models.DateTimeField('date published')
