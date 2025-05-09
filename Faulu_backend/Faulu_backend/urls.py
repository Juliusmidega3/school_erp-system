from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),  # Admin panel
    path('api/', include('core.urls')),  # API endpoints for core app
]
