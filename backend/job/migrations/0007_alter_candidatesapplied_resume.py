# Generated by Django 4.1.2 on 2022-10-26 17:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('job', '0006_rename_jobtype_job_jobtype'),
    ]

    operations = [
        migrations.AlterField(
            model_name='candidatesapplied',
            name='resume',
            field=models.CharField(max_length=200, null=True),
        ),
    ]