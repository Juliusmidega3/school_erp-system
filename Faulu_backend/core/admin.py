from django.contrib import admin
from .models import Student, Teacher, Staff

@admin.register(Student)
class StudentAdmin(admin.ModelAdmin):
    list_display = ('first_name', 'last_name', 'enrolled_class', 'admission_number')
    search_fields = ('first_name', 'last_name', 'admission_number')
    list_filter = ('enrolled_class', 'gender')

@admin.register(Teacher)
class TeacherAdmin(admin.ModelAdmin):
    list_display = ('first_name', 'last_name', 'email', 'phone_number', 'date_of_employment')
    search_fields = ('first_name', 'last_name', 'email')
    list_filter = ('gender', 'marital_status')

@admin.register(Staff)
class StaffAdmin(admin.ModelAdmin):
    list_display = ('first_name', 'last_name', 'role', 'email', 'phone_number', 'date_of_employment')
    search_fields = ('first_name', 'last_name', 'email', 'role')
    list_filter = ('role', 'gender', 'marital_status')
