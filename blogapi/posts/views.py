from django.contrib.auth import get_user_model
from rest_framework import  status,generics, permissions, viewsets
from rest_framework.response import Response
from  .models import Post
from .permissions import IsAuthorOrReadOnly
from .serializers import PostSerializer, UserSerializer


class PostList(generics.ListCreateAPIView):
    permission_classes = (IsAuthorOrReadOnly,)
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    
    def post(self, request):
        serializer = PostSerializer(data = request.data)
        serializer.is_valid(raise_exception=True)

    # Get the current user
        user = request.user

    # Set the author of the post to the current user
        serializer.validated_data['author'] = user

    # Save the post
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class PostDetail(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = (IsAuthorOrReadOnly,)
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    
  
class UserViewSet(viewsets.ModelViewSet): 
    permission_classes = [permissions.IsAdminUser]
    queryset = get_user_model().objects.all()
    serializer_class = UserSerializer
  
    