from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from .views import StudentViewSet, TeacherViewSet, RegisterUser, UserViewSet, StaffViewSet, dashboard_stats, DashboardStatsView

router = DefaultRouter()
# Re-register UserViewSet to a non-conflicting route
router.register(r'user-profiles', UserViewSet)
router.register(r'students', StudentViewSet)
router.register(r'teachers', TeacherViewSet)
router.register(r'staffs', StaffViewSet)

urlpatterns = [
    path('', include(router.urls)),

    # User registration endpoint at /api/users/
    path('users/', RegisterUser.as_view(), name='register'),

    # Auth token endpoints
    path('login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    # Dashboard stats endpoint
    path('dashboard-stats/', dashboard_stats, name='dashboard-stats'),
]
