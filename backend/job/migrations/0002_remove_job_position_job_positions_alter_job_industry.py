# Generated by Django 4.1.2 on 2022-10-06 21:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('job', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='job',
            name='position',
        ),
        migrations.AddField(
            model_name='job',
            name='positions',
            field=models.IntegerField(default=1),
        ),
        migrations.AlterField(
            model_name='job',
            name='industry',
            field=models.CharField(choices=[('Business', 'Business'), ('Telecom', 'Telecommunication'), ('Information Technology', 'It'), ('Banking', 'Banking'), ('Education/Training', 'Education'), ('Others', 'Others')], default='Business', max_length=100),
        ),
    ]
