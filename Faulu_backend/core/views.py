from rest_framework import viewsets, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from collections import defaultdict
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate

from .models import Student, Teacher, Staff, FeeStructure, CLASS_CHOICES
from .serializers import (
    StudentSerializer,
    TeacherSerializer,
    StaffSerializer,
    FeeStructureSerializer,
    ClassListSerializer
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


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def fee_structure_by_term(request):
    structures = FeeStructure.objects.all()
    grouped = defaultdict(list)

    for item in structures:
        grouped[item.term].append({
            "class_name": item.enrolled_class,
            "tuition": item.tuition,
            "lunch": item.lunch,
            "transport": item.transport,
            "activity": item.activity,
            "development": item.development,
            "total_fee": item.total_fee,
        })

    return Response(grouped)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def class_list(request):
    data = [{"id": name, "name": label} for name, label in CLASS_CHOICES]
    serializer = ClassListSerializer(data, many=True)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([AllowAny])
def student_login(request):
    admission_number = request.data.get("admission_number")
    password = request.data.get("password")

    if not admission_number or not password:
        return Response(
            {"detail": "Admission number and password are required."},
            status=status.HTTP_400_BAD_REQUEST
        )

    try:
        student = Student.objects.get(admission_number=admission_number, is_active=True)
        user = student.user

        if not user.check_password(password):
            raise ValueError("Incorrect password.")

    except (Student.DoesNotExist, ValueError):
        return Response(
            {"detail": "Invalid credentials or inactive student."},
            status=status.HTTP_401_UNAUTHORIZED
        )

    refresh = RefreshToken.for_user(user)
    return Response({
        "refresh": str(refresh),
        "access": str(refresh.access_token),
        "student": {
            "id": student.id,
            "first_name": student.first_name,
            "last_name": student.last_name,
            "admission_number": student.admission_number,
            "class_name": student.enrolled_class,
        }
    })

