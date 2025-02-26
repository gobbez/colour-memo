from django.urls import path
from .views import TableUsersView

urlpatterns = [
    path('get/', TableUsersView.as_view(), name='get'),
    path('post/', TableUsersView.as_view(), name='post'),
]