from django.urls import path, include, re_path
from django.contrib import admin
from . import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', views.FrontendAppView.as_view()),
    path('api/v1/', include('breadboard_app.urls')),
    re_path(r'^.*$', views.FrontendAppView.as_view()),
]
