from rest_framework import viewsets
from .serializers import ProjectSerializer, ComponentSerializer, CommentSerializer
from .models import Project, Component, Comment

# Create your views here.


class ProjectView(viewsets.ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer


class ComponentView(viewsets.ModelViewSet):
    queryset = Component.objects.all()
    serializer_class = ComponentSerializer


class CommentView(viewsets.ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
