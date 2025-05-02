from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from .views import (
    StudentViewSet,
    TeacherViewSet,
    StaffViewSet,
    FeeStructureClassViewSet,
    count_view
)

# Initialize DRF Default Router
router = DefaultRouter()
router.register(r'students', StudentViewSet, basename='student')
router.register(r'teachers', TeacherViewSet, basename='teacher')
router.register(r'staffs', StaffViewSet, basename='staff')
router.register(r'fees/structure', FeeStructureClassViewSet, basename='feestructure')

urlpatterns = [
    # JWT endpoints
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    # Count statistics
    path('counts/', count_view, name='counts'),

    # ViewSets (students, teachers, staffs, fees)
    path('', include(router.urls)),
]
