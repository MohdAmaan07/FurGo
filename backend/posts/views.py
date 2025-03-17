from .models import Posts
from .serializers import PostSerializer
from rest_framework import viewsets
# Create your views here.

class PostViewSet(viewsets.ModelViewSet):
    queryset = Posts.objects.all()
    serializer_class = PostSerializer