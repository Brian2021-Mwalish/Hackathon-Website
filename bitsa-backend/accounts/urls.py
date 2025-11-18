from django.urls import path
from .views import register, login, get_users, add_user, toggle_user_block, CustomTokenObtainPairView

urlpatterns = [
    path("register/", register, name="register"),
    path("login/", CustomTokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("users/", get_users, name="get_users"),
    path("users/add/", add_user, name="add_user"),
    path("users/<int:user_id>/toggle-block/", toggle_user_block, name="toggle_user_block"),
]
