from rest_framework import viewsets
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from .serializers import (
    StudentSerializer,
    TeacherSerializer,
    StaffSerializer,
    FeeStructureClassSerializer
)
from .models import Student, Teacher, Staff, FeeStructureClass


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def count_view(request):
    students_count = Student.objects.count()
    teachers_count = Teacher.objects.count()
    staffs_count = Staff.objects.count()

    return Response({
        "students": students_count,
        "teachers": teachers_count,
        "staffs": staffs_count,
    })


class StudentViewSet(viewsets.ModelViewSet):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer
    permission_classes = [IsAuthenticated]


class TeacherViewSet(viewsets.ModelViewSet):
    queryset = Teacher.objects.all()
    serializer_class = TeacherSerializer
    permission_classes = [IsAuthenticated]


class StaffViewSet(viewsets.ModelViewSet):
    queryset = Staff.objects.all()
    serializer_class = StaffSerializer
    permission_classes = [IsAuthenticated]


class FeeStructureClassViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = FeeStructureClass.objects.prefetch_related('terms__fee_items')
    serializer_class = FeeStructureClassSerializer
    permission_classes = [IsAuthenticated]
