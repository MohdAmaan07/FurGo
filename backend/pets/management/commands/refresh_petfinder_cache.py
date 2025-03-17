from django.core.management.base import BaseCommand
from pets.views import PetFinder
from django.core.cache import cache
import os
import logging

logger = logging.getLogger(__name__)

PET_FINDER_BASE_URL = os.getenv('PET_FINDER_BASE_URL')

class Command(BaseCommand):
    help = 'Refreshes the PetFinder cache'
    
    def handle(self, *args, **kwargs):
        pet_finder = PetFinder()
        token, error_response = pet_finder.get_access_token()
        if error_response:
            logger.error(f"Error refreshing cache: {error_response}")
            return
        
        headers = {'Authorization': f'Bearer {token}'}
        url = PET_FINDER_BASE_URL
        animals = pet_finder.animals
        
        for animal in animals:
            key = f"petfinder_animals_{animal}"
            cache.delete(key)

            try:
                resp = pet_finder.fetch_animal_data(url, headers, animal)
                cache.set(key, resp, timeout=86400)
                logger.info(f"Successfully refreshed cache for {animal}")
            except Exception as e:
                logger.error(f"Error refreshing cache for {animal}: {e}")
            
    