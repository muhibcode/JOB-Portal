from django.urls import path

from . import views

urlpatterns = [
    path('register/', views.register),
    path('me/', views.currentUser),
    path('me/update/', views.updateUser),

    # path('jobs/<int:id>/', views.getJob),
    # path('jobs/<int:id>/update/', views.updateJob),
    # path('jobs/new/', views.post_new),
    # path('stats/', views.statsJob),



]
