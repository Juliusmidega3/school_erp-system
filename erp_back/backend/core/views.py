from rest_framework import viewsets, generics, permissions
from rest_framework.parsers import JSONParser, MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from django.contrib.auth import get_user_model
from .models import Student, Teacher, Staff
from .serializers import (
    StudentSerializer,
    TeacherSerializer,
    StaffSerializer,
    UserSerializer
)

User = get_user_model()

# -------- User registration view --------
class RegisterUser(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.AllowAny]

# -------- User ViewSet --------
class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

# -------- Student ViewSet --------
class StudentViewSet(viewsets.ModelViewSet):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer
    permission_classes = [permissions.IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser, JSONParser]

# -------- Teacher ViewSet (supports file & nested user data) --------
class TeacherViewSet(viewsets.ModelViewSet):
    queryset = Teacher.objects.all()
    serializer_class = TeacherSerializer
    permission_classes = [permissions.IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser, JSONParser]

# -------- Staff ViewSet --------
class StaffViewSet(viewsets.ModelViewSet):
    queryset = Staff.objects.all()
    serializer_class = StaffSerializer
    permission_classes = [permissions.IsAuthenticated]

# -------- Dashboard stats (function) --------
@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def dashboard_stats(request):
    data = {
        "students": Student.objects.count(),
        "teachers": Teacher.objects.count(),
        "staff": Staff.objects.count(),
    }
    return Response(data)

# -------- Dashboard stats (class) --------
from rest_framework.views import APIView

class DashboardStatsView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        data = {
            "students": Student.objects.count(),
            "teachers": Teacher.objects.count(),
            "staff": Staff.objects.count(),
        }
        return Response(data)
