from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination
from rest_framework import status
import requests
import os
import concurrent.futures
from django.core.cache import cache
import logging

logger = logging.getLogger(__name__)

PET_FINDER_BASE_URL = os.getenv('PET_FINDER_BASE_URL')
PET_FINDER_TOKEN_URL = os.getenv('PET_FINDER_TOKEN_URL')
PET_FINDER_CLIENT_ID = os.getenv('PET_FINDER_CLIENT_ID')
PET_FINDER_CLIENT_SECRET = os.getenv('PET_FINDER_CLIENT_SECRET')

class PetFinder(APIView, PageNumberPagination):
    page_size = 10 
    animals = ['dog', 'cat', 'fish', 'rabbit', 'turtle', 'bird']

    def get_access_token(self):
        token = cache.get("petfinder_access_token")
        if not token:
            data = {
                "grant_type": "client_credentials",
                "client_id": PET_FINDER_CLIENT_ID,
                "client_secret": PET_FINDER_CLIENT_SECRET
            }
            token_response = requests.post(PET_FINDER_TOKEN_URL, data=data)
            if token_response.status_code != status.HTTP_200_OK:
                return None, Response({"error": "Unable to Fetch Access Token"}, status=status.HTTP_400_BAD_REQUEST)
            resp_json = token_response.json()
            token = resp_json.get('access_token')
            expires_in = resp_json.get('expires_in', 3600)
            cache.set("petfinder_access_token", token, timeout=expires_in - 60)
        return token, None

    def fetch_animal_data(self, url, headers, animal):
        key = f"petfinder_animals_{animal}"
        data = cache.get(key)
        if data is None:
            resp = requests.get(f'{url}animals?type={animal}', headers=headers)
            data = resp.json().get('animals', [])
            cache.set(key, data, timeout=86400)
        return data

    def get(self, request, *args, **kwargs):
        token, error_response = self.get_access_token()
        if error_response:
            return error_response
        headers = {'Authorization': f'Bearer {token}'}
        url = PET_FINDER_BASE_URL
        
        animal_type = request.GET.get('animal_type')
        if animal_type:
            key = f"petfinder_animals_{animal_type}"
            animal_list = cache.get(key)
            
            if animal_list is None:
                resp = requests.get(f'{url}animals?type={animal_type}', headers=headers)
                animal_list = resp.json().get('animals', [])
                cache.set(key, animal_list, timeout=86400)  
                
            page = self.paginate_queryset(animal_list, request)
            if page is not None:
                return self.get_paginated_response(page)
            return Response(animal_list)
        
        combined_animals = []
        with concurrent.futures.ThreadPoolExecutor() as executor:
            futures = {
                executor.submit(self.fetch_animal_data, url, headers, animal): animal
                for animal in self.animals
            }
            for future in concurrent.futures.as_completed(futures):
                try:
                    animal_data = future.result()
                    
                    if not animal_data:
                        key = f"petfinder_animals_{futures[future]}"
                        animal_data = cache.get(key)
                        if animal_data is None:
                            resp = requests.get(f'{url}animals?type={futures[future]}', headers=headers)
                            animal_data = resp.json().get('animals', [])
                            cache.set(key, animal_data, timeout=86400)
                    
                    combined_animals.extend(animal_data)
                except Exception:
                    logger.error(f"Error fetching data for {futures[future]}")
                    
        page = self.paginate_queryset(combined_animals, request)
        if page is not None:
            return self.get_paginated_response(page)
        return Response(combined_animals)