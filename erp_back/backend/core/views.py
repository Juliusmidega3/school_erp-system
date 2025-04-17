from rest_framework import viewsets
from .models import Student
from .serializers import StudentSerializer
from django.http import JsonResponse

class StudentViewSet(viewsets.ModelViewSet):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer
    
def home(request):
    return JsonResponse({
        'message': 'Welcome to Faulu School'
    })
