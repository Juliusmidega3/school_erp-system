from rest_framework import viewsets, generics, permissions
from rest_framework.parsers import JSONParser, MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.views import APIView
from django.contrib.auth import get_user_model
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from .models import Student, Teacher, Staff, Class
from .serializers import (
    StudentSerializer,
    TeacherSerializer,
    StaffSerializer,
    UserSerializer,
    ClassSerializer,
)

User = get_user_model()

# -------- Custom Login for Students --------
@api_view(['POST'])
@permission_classes([permissions.AllowAny])
def student_login(request):
    admission_number = request.data.get('admission_number')
    password = request.data.get('password')

    if not admission_number or not password:
        return Response({"detail": "Admission number and password are required."}, status=400)

    try:
        student = Student.objects.get(admission_number=admission_number)
        user = student.user
    except Student.DoesNotExist:
        return Response({"detail": "Student not found."}, status=404)

    # Authenticate the user
    user = authenticate(request, username=user.email, password=password)
    if user is None:
        return Response({"detail": "Invalid credentials."}, status=401)

    # Generate JWT token
    refresh = RefreshToken.for_user(user)
    access_token = refresh.access_token

    return Response({
        'access_token': str(access_token),
        'refresh_token': str(refresh),
    })


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


# -------- Teacher ViewSet --------
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


# -------- Dashboard stats (function-based) --------
@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def dashboard_stats(request):
    data = {
        "students": Student.objects.count(),
        "teachers": Teacher.objects.count(),
        "staff": Staff.objects.count(),
    }
    return Response(data)


# -------- Dashboard stats (class-based) --------
class DashboardStatsView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        data = {
            "students": Student.objects.count(),
            "teachers": Teacher.objects.count(),
            "staff": Staff.objects.count(),
        }
        return Response(data)


# -------- Authenticated user profile with role --------
@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def user_profile(request):
    user = request.user

    role = "admin"
    if hasattr(user, "teacher"):
        role = "teacher"
    elif hasattr(user, "student"):
        role = "student"
    elif hasattr(user, "staff"):
        role = "staff"

    return Response({
        "id": user.id,
        "email": user.email,
        "first_name": user.first_name,
        "last_name": user.last_name,
        "role": role,
    })


# -------- Teacher Dashboard --------
@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def teacher_dashboard(request):
    user = request.user

    if not hasattr(user, 'teacher'):
        return Response({"detail": "You are not authorized as a teacher."}, status=403)

    teacher = user.teacher
    classes = teacher.classes.all()  # Adjust this based on related_name in model

    response_data = {
        "teacher": {
            "id": teacher.id,
            "name": teacher.name,
            "email": teacher.user.email,  # Fixed here
        },
        "classes": ClassSerializer(classes, many=True).data,
    }

    return Response(response_data)
