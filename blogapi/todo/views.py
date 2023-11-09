from .models import Todo
from rest_framework.views import APIView
from .permissions import IsUserOrReadOnly
from .serializers import TodoSerializer
from rest_framework.response import Response
from rest_framework import status, generics
# Create your views here.



class TodoList(APIView):
    permission_classes = (IsUserOrReadOnly,)
    queryset = Todo.objects.all()
    serializer_class = TodoSerializer


    def get(self, request, *args, **kwargs):
        todo = Todo.objects.filter(user=request.user)
        serializer = TodoSerializer(todo, many=True)
        return Response(serializer.data)

    def post(self, request, *args, **kwargs):
        serializer = TodoSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.validated_data['user'] = request.user
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class TodoDelete(generics.RetrieveDestroyAPIView):
    permission_classes = (IsUserOrReadOnly,)
    queryset = Todo.objects.all()
    serializer_class = TodoSerializer