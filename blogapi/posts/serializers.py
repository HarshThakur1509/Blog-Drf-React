from django.contrib.auth import get_user_model 
from rest_framework import serializers

from .models import Post


        
class UserSerializer(serializers.ModelSerializer): # new
    class Meta:
        model = get_user_model()
        fields = ("id", "username",)


class PostSerializer(serializers.ModelSerializer):
    author = UserSerializer(read_only=True)
    class Meta:
        model = Post
        fields = (
            'id',
            'author',
            'title',
            'body',
            'created_at',
        )
        depth = 1 
        
    