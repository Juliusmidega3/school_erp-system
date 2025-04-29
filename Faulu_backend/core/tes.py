from django.db import models

class Student(models.Model):
    GENDER_CHOICES = [('Male', 'Male'), ('Female', 'Female'), ('Other', 'Other')]    
    ENROLLED_CLASS= [
        ('PP1', 'PP1'),
        ('PP2', 'PP2'),
        ('Grade 1', 'Grade 1'),
        ('Grade 2', 'Grade 2'),
        ('Grade 3', 'Grade 3'),
        ('Grade 4', 'Grade 4'),
        ('Grade 5', 'Grade 5'),
      
    ]

    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    date_of_birth = models.DateField()
    gender = models.CharField(max_length=10, choices=GENDER_CHOICES)
    parent_name = models.CharField(max_length=20)
    parent_phone = models.CharField(max_length=20)
    enrolled_class = models.CharField(max_length=10, choices=ENROLLED_CLASS)  
    admission_number = models.CharField(max_length=5)


    def __str__(self):
        return f"{self.first_name} {self.last_name}"
    
    
class Teacher(models.Model):
    GENDER_CHOICES = [('Male', 'Male'), ('Female', 'Female'), ('Other', 'Other')]
    MARITAL_STATUS_CHOICES = [('Single', 'Single'), ('Married', 'Married')]

    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    gender = models.CharField(max_length=10, choices=GENDER_CHOICES)
    email = models.EmailField(unique=True)
    phone_number = models.CharField(max_length=20)
    marital_status = models.CharField(max_length=10, choices=MARITAL_STATUS_CHOICES)
    date_of_employment = models.DateField()

    def __str__(self):
        return f"{self.first_name} {self.last_name}"
    
    
class Staff(models.Model):
    GENDER_CHOICES = [('Male', 'Male'), ('Female', 'Female'), ('Other', 'Other')]
    MARITAL_STATUS_CHOICES = [('Single', 'Single'), ('Married', 'Married')]
    ROLE_CHOICES = [
        ('Security', 'Security'),
        ('Cook', 'Cook'),
        ('Secretary', 'Secretary'),
        ('Cleaner', 'Cleaner'),
        ('Lab_Technician', 'Lab Technician'),
        ('Nurse', 'Nurse'),
        ('Social_Media_Manager', 'Social Media Manager'),
        ('Driver', 'Driver'),
    ]

    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    gender = models.CharField(max_length=10, choices=GENDER_CHOICES)
    email = models.EmailField(unique=True)
    phone_number = models.CharField(max_length=20)
    marital_status = models.CharField(max_length=10, choices=MARITAL_STATUS_CHOICES)
    role = models.CharField(max_length=50, choices=ROLE_CHOICES)
    date_of_employment = models.DateField()

    def __str__(self):
        return f"{self.first_name} {self.last_name}"
    
    
# core/views.py

from rest_framework import viewsets
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from .models import Student, Teacher, Staff
from .serializers import StudentSerializer, TeacherSerializer, StaffSerializer


# ViewSets for CRUD operations

class StudentViewSet(viewsets.ModelViewSet):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer


class TeacherViewSet(viewsets.ModelViewSet):
    queryset = Teacher.objects.all()
    serializer_class = TeacherSerializer


class StaffViewSet(viewsets.ModelViewSet):
    queryset = Staff.objects.all()
    serializer_class = StaffSerializer


# Custom dashboard stats API

# core/views.py

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import Student, Teacher, Staff

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def dashboard_stats(request):
    students_count = Student.objects.count()
    teachers_count = Teacher.objects.count()
    staffs_count = Staff.objects.count()

    return Response({
        'students': students_count,
        'teachers': teachers_count,
        'staff': staffs_count
    })

# core/urls.py

from rest_framework.routers import DefaultRouter
from django.urls import path, include
from .views import StaffViewSet, StudentViewSet, TeacherViewSet, dashboard_stats

router = DefaultRouter()
router.register(r'staffs', StaffViewSet, basename='staff')
router.register(r'students', StudentViewSet, basename='student')
router.register(r'teachers', TeacherViewSet, basename='teacher')

urlpatterns = [
    path('', include(router.urls)),
    path('dashboard-stats/', dashboard_stats, name='dashboard-stats'),
]
