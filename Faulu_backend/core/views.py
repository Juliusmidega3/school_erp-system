from rest_framework import viewsets
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from collections import defaultdict
from .models import Student, Teacher, Staff, FeeStructure, CLASS_CHOICES
from .serializers import (
    StudentSerializer,
    TeacherSerializer,
    StaffSerializer,
    FeeStructureSerializer,
    ClassListSerializer  # ✅
)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def count_view(request):
    return Response({
        "students": Student.objects.count(),
        "teachers": Teacher.objects.count(),
        "staffs": Staff.objects.count(),
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

class FeeStructureViewSet(viewsets.ModelViewSet):
    queryset = FeeStructure.objects.all()
    serializer_class = FeeStructureSerializer
    permission_classes = [IsAuthenticated]

# ✅ Custom endpoint to group fee structure by term
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def fee_structure_by_term(request):
    structures = FeeStructure.objects.all()
    grouped = defaultdict(list)

    for item in structures:
        grouped[item.term].append({
            "class_name": item.class_name,
            "tuition": item.tuition,
            "lunch": item.lunch,
            "transport": item.transport,
            "activity": item.activity,
            "development": item.development,
            "total_fee": item.total_fee,
        })

    return Response(grouped)

# ✅ Custom endpoint to return class names and IDs
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def class_list(request):
    data = [{"id": name, "name": label} for name, label in CLASS_CHOICES]
    serializer = ClassListSerializer(data, many=True)
    return Response(serializer.data)
