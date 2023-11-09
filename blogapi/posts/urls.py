from django.urls import path
from rest_framework.routers import SimpleRouter

from .views import UserViewSet, PostDetail, PostList

router = SimpleRouter()
router.register("users", UserViewSet, basename = 'users')

urlpatterns = [
    path('', PostList.as_view(), name = "post_list"),
    path('<int:pk>/', PostDetail.as_view(), name="post_detail"),
]

urlpatterns += router.urls
