from django.apps import AppConfig
from django.core.management import call_command

class PetsConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'pets'

    def ready(self):
        call_command('refresh_petfinder_cache')