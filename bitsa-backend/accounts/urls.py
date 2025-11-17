from django.urls import path
from .views import register, login, get_users, add_user, toggle_user_block

urlpatterns = [
    path("register/", register, name="register"),
    path("login/", login, name="login"),
    path("users/", get_users, name="get_users"),
    path("users/add/", add_user, name="add_user"),
    path("users/<int:user_id>/toggle-block/", toggle_user_block, name="toggle_user_block"),
]
