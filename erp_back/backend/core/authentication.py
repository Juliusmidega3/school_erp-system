from django.contrib.auth.backends import BaseBackend
from django.contrib.auth import get_user_model
from .models import Student

User = get_user_model()

class AdmissionNumberAuthBackend(BaseBackend):
    def authenticate(self, request, username=None, password=None, **kwargs):
        try:
            # Find student by admission number
            student = Student.objects.get(admission_number=username)
            user = student.user
            if user.check_password(password):
                return user
        except Student.DoesNotExist:
            return None
        return None
