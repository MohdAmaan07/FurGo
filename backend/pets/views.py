from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination
from rest_framework import status
import requests
from dotenv import load_dotenv
import os
import concurrent.futures

load_dotenv()
PET_FINDER_BASE_URL = os.getenv('PET_FINDER_BASE_URL')
PET_FINDER_TOKEN_URL = os.getenv('PET_FINDER_TOKEN_URL')
PET_FINDER_CLIENT_ID = os.getenv('PET_FINDER_CLIENT_ID')
PET_FINDER_CLIENT_SECRET = os.getenv('PET_FINDER_CLIENT_SECRET')

class PetFinder(APIView, PageNumberPagination):
    page_size = 10 
    animals = ['dog', 'cat', 'fish', 'rabbit', 'turtle', 'bird']

    def get(self, request, *args, **kwargs):
        data = {
            "grant_type": "client_credentials",
            "client_id": PET_FINDER_CLIENT_ID,
            "client_secret": PET_FINDER_CLIENT_SECRET
        }
        token_response = requests.post(PET_FINDER_TOKEN_URL, data=data)
        if token_response.status_code != status.HTTP_200_OK:
            return Response({"error": "Unable to Fetch Access Token"}, status=status.HTTP_400_BAD_REQUEST)
        
        access_token = token_response.json().get('access_token')
        headers = {'Authorization': f'Bearer {access_token}'}
        url = PET_FINDER_BASE_URL
        
        animal_type = request.GET.get('animal_type')
        if animal_type:
            resp = requests.get(f'{url}animals?type={animal_type}', headers=headers)
            animal_list = resp.json().get('animals', [])
            page = self.paginate_queryset(animal_list, request)
            if page is not None:
                return self.get_paginated_response(page)
            return Response(animal_list)
        
        combined_animals = []
        with concurrent.futures.ThreadPoolExecutor() as executor:
            futures = {
                executor.submit(requests.get, f'{url}animals?type={animal}', headers=headers): animal
                for animal in self.animals
            }
            for future in concurrent.futures.as_completed(futures):
                try:
                    resp = future.result()
                    animal_data = resp.json().get('animals', [])
                    combined_animals.extend(animal_data)
                except Exception:
                    print(f"Error fetching data for {futures[future]}")

        page = self.paginate_queryset(combined_animals, request)
        if page is not None:
            return self.get_paginated_response(page)
        return Response(combined_animals)