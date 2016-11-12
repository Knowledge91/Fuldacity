# -*- coding: utf-8 -*-
# Generated by Django 1.10.3 on 2016-11-12 11:44
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('events', '0006_auto_20161111_1031'),
    ]

    operations = [
        migrations.AlterField(
            model_name='event',
            name='image',
            field=models.ImageField(default='static/images/no-img.png', upload_to='static/images/'),
        ),
        migrations.AlterField(
            model_name='event',
            name='name',
            field=models.CharField(default='Neues Event', max_length=200),
        ),
    ]
