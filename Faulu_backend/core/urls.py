from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views  
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import (
    StudentViewSet,
    TeacherViewSet,
    StaffViewSet,
    FeeStructureViewSet,
    count_view,
    fee_structure_by_term,  # ✅
    class_list  # ✅
)

router = DefaultRouter()
router.register(r'students', StudentViewSet, basename='student')
router.register(r'teachers', TeacherViewSet, basename='teacher')
router.register(r'staffs', StaffViewSet, basename='staff')
router.register(r'fees/structure', FeeStructureViewSet, basename='fee-structure')

urlpatterns = [
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('counts/', count_view, name='counts'),
    path('fees/structure/by-term/', fee_structure_by_term, name='fee-structure-by-term'),
    path('classes/', class_list, name='class-list'),  # ✅ NEW
    path('', include(router.urls)),
    path('student-login/', views.student_login),
]
