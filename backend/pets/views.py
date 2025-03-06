from rest_framework.views import APIView
from rest_framework.response import Response
import requests
from dotenv import load_dotenv
import os

# Create your views here.

load_dotenv()
PET_FINDER_BASE_URL = os.getenv('PET_FINDER_BASE_URL')
PET_FINDER_CLIENT_ID = os.getenv('PET_FINDER_CLIENT_ID')
PET_FINDER_TOKEN_URL = os.getenv('PET_FINDER_TOKEN_URL')
PET_FINDER_CLIENT_SECRET = os.getenv('PET_FINDER_CLIENT_SECRET')

animals = ['dog', 'cat', 'fish', 'rabbit', 'turtle', 'bird']
    
class PetFinder(APIView):
    def get(self, request, *args, **kwargs):
        data = {
            "grant_type": "client_credentials",
            "client_id": PET_FINDER_CLIENT_ID,
            "client_secret": PET_FINDER_CLIENT_SECRET
        }
        response = requests.post(PET_FINDER_TOKEN_URL, data=data)
        
        access_token = Nonecl
        
        if response.status_code == 200:
            access_token = response.json()['access_token']
        
        animal_type = request.GET.get('animal_type')
        url = f'{PET_FINDER_BASE_URL}'
        headers = {'Authorization' : f'Bearer {access_token}'}
        
        if animal_type:
            response = requests.get(f'{url}animals?type={animal_type}', headers=headers)
            return Response(response.json())
        
        responses = [requests.get(f'{url}animals?type={animal}', headers=headers) for animal in animals]
        return Response([response.json() for response in responses])
