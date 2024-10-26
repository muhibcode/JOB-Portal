from datetime import datetime, timedelta

from django.contrib.auth.models import User
from django.contrib.gis.db import models as gismodels
from django.contrib.gis.geos import Point
from django.core.validators import MaxValueValidator, MinValueValidator
from django.db import models

# Create your models here.


class JobType(models.TextChoices):
    Permanent = 'Permanent'
    Temporary = 'Temporary'
    Internship = 'Internship'


class Education(models.TextChoices):
    Bachelors = 'Bachelors'
    Masters = 'Masters'
    PHD = 'Phd'


class Industry(models.TextChoices):
    Business = 'Business'
    Telecom = 'Telecom'
    IT = 'Information Technology'
    Banking = 'Banking'
    Education = 'Education/Training'
    Others = 'Others'


class Experience(models.TextChoices):
    No_EXPERIENCE = 'No Experience'
    ONE_YEAR = '1 Year'
    TWO_YEARS = '2 Years'
    THREE_YEAR_PLUS = '3 Years above'


def return_date_time():
    now = datetime.now()
    return now + timedelta(days=10)


class Job(models.Model):
    title = models.CharField(max_length=255, null=True)
    description = models.TextField(null=True)
    email = models.EmailField(null=True)
    address = models.CharField(max_length=100, null=True)
    jobType = models.CharField(
        max_length=100,
        choices=JobType.choices,
        default=JobType.Permanent)
    education = models.CharField(
        max_length=100,
        choices=Education.choices,
        default=Education.Bachelors)
    industry = models.CharField(
        max_length=100,
        choices=Industry.choices,
        default=Industry.Business)
    experience = models.CharField(
        max_length=100,
        choices=Experience.choices,
        default=Experience.ONE_YEAR)
    salary = models.IntegerField(validators=[
        MinValueValidator(1), MaxValueValidator(1000000)])

    positions = models.IntegerField(default=1)
    company = models.CharField(max_length=100, null=True)

    # point = gismodels.PointField(default=Point(0.0, 0.0))
    lastDate = models.DateTimeField(default=return_date_time)
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    createdAt = models.DateTimeField(auto_now_add=True)


class CandidatesApplied(models.Model):
    job = models.ForeignKey(Job, on_delete=models.CASCADE,
                            related_name='candidateApplied')
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    resume = models.CharField(max_length=200, null=True)
    appliedAt = models.DateTimeField(auto_now_add=True)
