from django.urls import path
from .views import PetFinder

urlpatterns = [
    path('petfinder/', PetFinder.as_view(), name='petfinder')
]