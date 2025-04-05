from .models import Posts, Comment, Reaction
from .serializers import PostSerializer, CommentSerializer, ReactionActionSerializer, ReactionStatsSerializer
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
# Create your views here.

class PostViewSet(viewsets.ModelViewSet):
    queryset = Posts.objects.all().select_related('author')
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticated]
    
    def perform_create(self, serializer):
        serializer.save(author=self.request.user)
        
    @action(detail=True, methods=['get', 'post'])
    def reactions(self, request, pk=None):
        post = get_object_or_404(Posts, pk=pk)

        if request.method == 'POST':
            action_ser = ReactionActionSerializer(data=request.data)
            action_ser.is_valid(raise_exception=True)
            reaction_type = action_ser.validated_data['reaction']

            obj, created = Reaction.objects.get_or_create(
                user=request.user,
                post=post,
                defaults={'reaction': reaction_type}
            )
            if not created:
                if obj.reaction == reaction_type:
                    obj.delete()  # toggle off
                else:
                    obj.reaction = reaction_type
                    obj.save()

        # GET (or after POST) → stats
        likes = post.reactions.filter(reaction=Reaction.LIKE).count()
        dislikes = post.reactions.filter(reaction=Reaction.DISLIKE).count()
        try:
            user_react = post.reactions.get(user=request.user).reaction
        except Reaction.DoesNotExist:
            user_react = None

        stats = {
            'likes': likes,
            'dislikes': dislikes,
            'user_reaction': user_react
        }
        return Response(ReactionStatsSerializer(stats).data)

    @action(detail=True, methods=['get', 'post'])
    def comments(self, request, pk=None):
        post = get_object_or_404(Posts, pk=pk)

        if request.method == 'GET':
            qs = post.comments.select_related('author').all()
            ser = CommentSerializer(qs, many=True)
            return Response(ser.data)

        ser = CommentSerializer(data=request.data)
        ser.is_valid(raise_exception=True)
        ser.save(author=request.user, post=post)
        return Response(ser.data, status=status.HTTP_201_CREATED)