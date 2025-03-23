from rest_framework import serializers
from .models import Posts
from django.contrib.auth import get_user_model

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ('id', 'username')

class PostSerializer(serializers.ModelSerializer):
    author = UserSerializer(read_only=True)
    class Meta:
        model = Posts
        fields = ('id', 'author','title', 'content', 'posts_image','created_at', 'updated_at')