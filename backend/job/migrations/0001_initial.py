# Generated by Django 4.1.2 on 2022-10-06 20:06

from django.conf import settings
import django.core.validators
from django.db import migrations, models
import django.db.models.deletion
import job.models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Job',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=255, null=True)),
                ('description', models.TextField(null=True)),
                ('email', models.EmailField(max_length=254, null=True)),
                ('address', models.CharField(max_length=100, null=True)),
                ('jobtype', models.CharField(choices=[('Permanent', 'Permanent'), ('Temporary', 'Temporary'), ('Internship', 'Internship')], default='Permanent', max_length=100)),
                ('education', models.CharField(choices=[('Bachelors', 'Bachelors'), ('Masters', 'Masters'), ('PHD', 'Phd')], default='Bachelors', max_length=100)),
                ('industry', models.CharField(choices=[('Business', 'Business'), ('Telecommunication', 'Telecommunication'), ('Information Technology', 'It'), ('Banking', 'Banking'), ('Education/Training', 'Education'), ('Others', 'Others')], default='Business', max_length=100)),
                ('experience', models.CharField(choices=[('No Experience', 'No Experience'), ('1 Year', 'One Year'), ('2 Years', 'Two Years'), ('3 Years above', 'Three Year Plus')], default='1 Year', max_length=100)),
                ('salary', models.IntegerField(validators=[django.core.validators.MinValueValidator(1), django.core.validators.MaxValueValidator(1000000)])),
                ('position', models.IntegerField(verbose_name=1)),
                ('company', models.CharField(max_length=100, null=True)),
                ('lastDate', models.DateTimeField(default=job.models.return_date_time)),
                ('createdAt', models.DateTimeField(auto_now_add=True)),
                ('user', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
