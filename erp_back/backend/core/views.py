from rest_framework import viewsets
from .models import Student, Teacher
from .serializers import StudentSerializer, TeacherSerializer, UserSerializer
from django.http import JsonResponse
from django.contrib.auth.models import User
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import authenticate, login
from rest_framework.decorators import action
from rest_framework import status

# ViewSet for Student
class StudentViewSet(viewsets.ModelViewSet):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer

# ViewSet for Teacher
class TeacherViewSet(viewsets.ModelViewSet):
    queryset = Teacher.objects.all()
    serializer_class = TeacherSerializer

# Simple home view
def home(request):
    return JsonResponse({
        'message': 'Welcome to Faulu School'
    })

# ViewSet for User
class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    # Create admin users
    @action(detail=False, methods=['post'], permission_classes=[IsAuthenticated])
    def create_admin(self, request):
        if not request.user.is_superuser:
            return Response({"detail": "You do not have permission to create an admin user."}, status=status.HTTP_403_FORBIDDEN)
        
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            user.is_superuser = True  # Assign admin privileges
            user.save()
            return Response({"detail": "Admin user created successfully!"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Login view (for admin)
class LoginView(APIView):
    def post(self, request):
        username = request.data.get("username")
        password = request.data.get("password")
        user = authenticate(username=username, password=password)
        if user is not None:
            login(request, user)
            return Response({"detail": "Login successful!"}, status=status.HTTP_200_OK)
        return Response({"detail": "Invalid credentials!"}, status=status.HTTP_401_UNAUTHORIZED)