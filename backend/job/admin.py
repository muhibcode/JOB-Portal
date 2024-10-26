from django.contrib import admin

from .models import Job

# Register your models here.

admin.site.register(Job)

# class JobAdmin(admin.ModelAdmin):
#     model = Job
#     fields = '__all__'
