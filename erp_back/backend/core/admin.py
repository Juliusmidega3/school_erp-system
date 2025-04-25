from django.contrib import admin

# Register your models here.
from .models import CustomUser, Student, Teacher, Staff, Class

admin.site.register(CustomUser)
admin.site.register(Student)
admin.site.register(Teacher)
admin.site.register(Staff)
admin.site.register(Class)