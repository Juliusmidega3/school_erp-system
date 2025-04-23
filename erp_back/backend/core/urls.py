from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from .views import (
    StudentViewSet,
    TeacherViewSet,
    RegisterUser,
    UserViewSet,
    StaffViewSet,
    dashboard_stats,
    DashboardStatsView,
    user_profile,
    teacher_dashboard,  # ✅ import the new view
)

router = DefaultRouter()
router.register(r'user-profiles', UserViewSet)
router.register(r'students', StudentViewSet)
router.register(r'teachers', TeacherViewSet)
router.register(r'staffs', StaffViewSet)

urlpatterns = [
    path('', include(router.urls)),

    # User registration
    path('users/', RegisterUser.as_view(), name='register'),

    # JWT Authentication
    path('login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    # Dashboard stats
    path('dashboard-stats/', dashboard_stats, name='dashboard-stats'),

    # Authenticated user profile + role
    path('profile/', user_profile, name='user-profile'),

    # ✅ Teacher dashboard endpoint
    path('teacher-dashboard/', teacher_dashboard, name='teacher-dashboard'),
]
