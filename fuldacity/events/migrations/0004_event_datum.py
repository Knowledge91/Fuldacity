# -*- coding: utf-8 -*-
# Generated by Django 1.10.3 on 2016-12-07 19:40
from __future__ import unicode_literals

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('events', '0003_auto_20161206_2011'),
    ]

    operations = [
        migrations.AddField(
            model_name='event',
            name='datum',
            field=models.DateTimeField(default=datetime.datetime(2016, 12, 7, 19, 40, 38, 898520)),
        ),
    ]
