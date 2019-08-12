from django.contrib import admin
from .models import Project, Component, Comment
# Register your models here.

admin.site.register(Project)
admin.site.register(Component)
admin.site.register(Comment)
