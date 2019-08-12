from django.urls import path, include
from rest_framework import routers
from . import views

router = routers.DefaultRouter()
router.register('projects', views.ProjectView)
router.register('components', views.ComponentView)
router.register('comments', views.CommentView)

urlpatterns = [
    path('', include(router.urls))
]
