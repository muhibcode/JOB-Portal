# Generated by Django 4.1.2 on 2022-10-19 23:40

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('job', '0004_alter_candidatesapplied_resume'),
    ]

    operations = [
        migrations.AlterField(
            model_name='candidatesapplied',
            name='job',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='candidateApplied', to='job.job'),
        ),
        migrations.AlterField(
            model_name='job',
            name='education',
            field=models.CharField(choices=[('Bachelors', 'Bachelors'), ('Masters', 'Masters'), ('Phd', 'Phd')], default='Bachelors', max_length=100),
        ),
    ]
