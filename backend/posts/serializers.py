from rest_framework import serializers
from .models import Posts, Comment, Reaction
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

class CommentSerializer(serializers.ModelSerializer):
    author = serializers.CharField(source='author.username', read_only=True)

    class Meta:
        model = Comment
        fields = ('id', 'author', 'content', 'created_at')

class ReactionActionSerializer(serializers.Serializer):
    reaction = serializers.ChoiceField(choices=Reaction.REACTION_CHOICES)

class ReactionStatsSerializer(serializers.Serializer):
    likes = serializers.IntegerField()
    dislikes = serializers.IntegerField()
    user_reaction = serializers.ChoiceField(
        choices=[(None, 'None')] + Reaction.REACTION_CHOICES,
        allow_null=True
    )
