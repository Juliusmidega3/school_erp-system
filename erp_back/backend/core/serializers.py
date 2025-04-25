from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Student, Teacher, Staff, Class

User = get_user_model()

# -------- User Serializer --------
class UserSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(required=True)
    password = serializers.CharField(write_only=True)
    first_name = serializers.CharField(required=False, allow_blank=True)
    last_name = serializers.CharField(required=False, allow_blank=True)

    class Meta:
        model = User
        fields = ['id', 'email', 'password', 'first_name', 'last_name']

    def create(self, validated_data):
        return User.objects.create_user(
            email=validated_data['email'],
            password=validated_data['password'],
            first_name=validated_data.get('first_name', ''),
            last_name=validated_data.get('last_name', '')
        )

    def update(self, instance, validated_data):
        instance.email = validated_data.get('email', instance.email)
        instance.first_name = validated_data.get('first_name', instance.first_name)
        instance.last_name = validated_data.get('last_name', instance.last_name)
        if 'password' in validated_data:
            instance.set_password(validated_data['password'])
        instance.save()
        return instance

# -------- Student Serializer --------
class StudentSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    class_enrolled = serializers.SerializerMethodField()

    class Meta:
        model = Student
        fields = [
            'id', 'user', 'gender', 'date_of_birth', 'admission_number',
            'admission_date', 'class_enrolled', 'guardian_name', 'guardian_phone'
        ]

    def create(self, validated_data):
        user_data = validated_data.pop('user')
        user_serializer = UserSerializer(data=user_data)
        user_serializer.is_valid(raise_exception=True)
        user = user_serializer.save()
        # Create the student with class_id directly
        student = Student.objects.create(user=user, **validated_data)
        return student

    def update(self, instance, validated_data):
        user_data = validated_data.pop('user', None)
        if user_data:
            user_serializer = UserSerializer(instance=instance.user, data=user_data, partial=True)
            user_serializer.is_valid(raise_exception=True)
            user_serializer.save()
        # Handle class_enrolled update correctly
        return super().update(instance, validated_data)

    def get_class_enrolled(self, obj):
        # Adjust to use class_id (assuming class_enrollments is a many-to-many field to Class)
        return [class_obj.name for class_obj in obj.class_enrollments.all()]

# -------- Teacher Serializer --------
class TeacherSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    name = serializers.SerializerMethodField()

    class Meta:
        model = Teacher
        fields = [
            'id', 'user', 'phone_number', 'gender',
            'marital_status', 'date_of_birth', 'date_of_employment', 'name'
        ]

    def get_name(self, obj):
        return f"{obj.user.first_name} {obj.user.last_name}"

    def create(self, validated_data):
        user_data = validated_data.pop('user')
        user_serializer = UserSerializer(data=user_data)
        user_serializer.is_valid(raise_exception=True)
        user = user_serializer.save()
        return Teacher.objects.create(user=user, **validated_data)

    def update(self, instance, validated_data):
        user_data = validated_data.pop('user', None)
        if user_data:
            user_serializer = UserSerializer(instance=instance.user, data=user_data, partial=True)
            user_serializer.is_valid(raise_exception=True)
            user_serializer.save()
        return super().update(instance, validated_data)

# -------- Staff Serializer --------
class StaffSerializer(serializers.ModelSerializer):
    class Meta:
        model = Staff
        fields = '__all__'

# -------- Class Serializer --------
class ClassSerializer(serializers.ModelSerializer):
    teacher = TeacherSerializer(read_only=True)
    students = StudentSerializer(many=True, read_only=True)

    class Meta:
        model = Class
        fields = ['id', 'name', 'teacher', 'students']
