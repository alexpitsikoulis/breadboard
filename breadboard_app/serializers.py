from rest_framework import serializers

from .models import Project, Component, Comment


class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ('id', 'author', 'comment', 'project')


class ComponentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Component
        fields = ('id', 'name', 'img_url', 'retailer', 'projects')


class ProjectSerializer(serializers.ModelSerializer):
    comments = CommentSerializer(many=True, read_only=True)
    components = ComponentSerializer(many=True, read_only=True)

    class Meta:
        model = Project
        fields = ('id', 'name', 'schematic_url',
                  'directions', 'comments', 'components')
