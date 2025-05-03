from rest_framework import serializers
from .models import Student, Teacher, Staff, FeeStructure

class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = '__all__'

class TeacherSerializer(serializers.ModelSerializer):
    class Meta:
        model = Teacher
        fields = '__all__'

class StaffSerializer(serializers.ModelSerializer):
    class Meta:
        model = Staff
        fields = '__all__'

class FeeStructureSerializer(serializers.ModelSerializer):
    total_fee = serializers.SerializerMethodField()

    class Meta:
        model = FeeStructure
        fields = '__all__'

    def get_total_fee(self, obj):
        return obj.total_fee


# ✅ Add class list serializer for CLASS_CHOICES
class ClassListSerializer(serializers.Serializer):
    id = serializers.CharField()
    name = serializers.CharField()
