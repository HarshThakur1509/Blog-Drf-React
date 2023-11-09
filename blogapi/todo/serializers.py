from rest_framework import serializers
from .models import Todo
from posts.serializers import UserSerializer




class TodoSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    class Meta:
        model = Todo
        fields = ('id', 'user', 'task', 'created_at',)
    depth = 1