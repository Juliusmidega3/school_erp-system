from rest_framework import serializers
from .models import Student, Teacher, Staff, FeeStructureClass, TermFee, FeeItem

# ================
# Unchanged Serializers
# ================
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


# ================
# Fee Structure Serializers
# ================
class FeeItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = FeeItem
        fields = ['category', 'amount']


class TermFeeSerializer(serializers.ModelSerializer):
    items = FeeItemSerializer(many=True, read_only=True)

    class Meta:
        model = TermFee
        fields = ['term', 'items']


class FeeStructureClassSerializer(serializers.ModelSerializer):
    terms = TermFeeSerializer(many=True, read_only=True)

    class Meta:
        model = FeeStructureClass
        fields = ['name', 'terms']
