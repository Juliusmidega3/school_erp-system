from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import home, StudentViewSet, TeacherViewSet

# Create the router and register viewsets
router = DefaultRouter()
router.register(r'students', StudentViewSet)
router.register(r'teachers', TeacherViewSet)

urlpatterns = [
    path('', home),
    path('', include(router.urls))
]
