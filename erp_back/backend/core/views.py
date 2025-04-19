from rest_framework import viewsets
from .models import Student, Teacher
from .serializers import StudentSerializer, TeacherSerializer
from django.http import JsonResponse

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
