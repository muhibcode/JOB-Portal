from django.urls import path

from . import views

urlpatterns = [
    path('jobs/', views.getAllJobs),
    path('job/<int:id>/', views.getJob),
    path('jobs/<int:id>/update/', views.updateJob),
    path('jobs/<int:id>/apply/', views.appliedForJob),
    path('jobs/<int:id>/check/', views.creatingIsApplied),
    path('jobs/me/applied/', views.currentUserAppliedJobs),
    path('jobs/new/', views.post_new),
    path('stats/<str:topic>', views.statsJob),



]
