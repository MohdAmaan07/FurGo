from .models import Posts
from .serializers import PostSerializer
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
# Create your views here.

class PostViewSet(viewsets.ModelViewSet):
    queryset = Posts.objects.all().select_related('author')
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticated]
    
    def perform_create(self, serializer):
        serializer.save(author=self.request.user)