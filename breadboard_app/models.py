from django.db import models

# Create your models here.


class Component(models.Model):
    name = models.CharField(max_length=255)
    img_url = models.CharField(max_length=1000)
    retailer = models.CharField(max_length=255)
    description = models.TextField(default="")

    def __str__(self):
            return self.name


class Project(models.Model):
    name = models.CharField(max_length=255)
    schematic_url = models.CharField(max_length=1000)
    directions = models.TextField()
    components = models.ManyToManyField(Component, related_name='projects')

    def __str__(self):
        return self.name


class Comment(models.Model):
    author = models.CharField(max_length=255)
    comment = models.TextField()
    project = models.ForeignKey(
        Project, on_delete=models.CASCADE, related_name='comments')

    def __str__(self):
        return self.comment
