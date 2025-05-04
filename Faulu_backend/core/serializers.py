from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Student, Teacher, Staff, FeeStructure

class StudentSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = Student
        fields = '__all__'
        extra_kwargs = {
            'password': {'write_only': True},
        }

    def create(self, validated_data):
        password = validated_data.pop('password')

        # Always use admission number as username
        admission_number = validated_data.get('admission_number')
        if not admission_number:
            raise serializers.ValidationError({
                'admission_number': 'This field is required.'
            })

        # Remove any existing 'username' to avoid conflicts
        validated_data.pop('username', None)

        # Create associated user
        user = User.objects.create_user(
            username=admission_number,
            password=password
        )

        # Create the student with the linked user
        student = Student.objects.create(user=user, **validated_data)
        return student

    def update(self, instance, validated_data):
        password = validated_data.pop('password', None)
        if password:
            instance.user.set_password(password)
            instance.user.save()
        return super().update(instance, validated_data)

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

class ClassListSerializer(serializers.Serializer):
    id = serializers.CharField()
    name = serializers.CharField()
