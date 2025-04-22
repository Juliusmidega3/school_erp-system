from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager
from django.utils import timezone

# ----------------------------
# Custom User Manager
# ----------------------------
class CustomUserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError("Users must have an email address")
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)
        return self.create_user(email, password, **extra_fields)

# ----------------------------
# Custom User Model
# ----------------------------
class CustomUser(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(unique=True)
    first_name = models.CharField(max_length=100, blank=True)  # ✅ Added
    last_name = models.CharField(max_length=100, blank=True)   # ✅ Added
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    date_joined = models.DateTimeField(default=timezone.now)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    objects = CustomUserManager()

    def __str__(self):
        return self.email

# ----------------------------
# Student Model
# ----------------------------
class Student(models.Model):
    GENDER_CHOICES = [('Male', 'Male'), ('Female', 'Female')]
    CLASS_CHOICES = [
        ('PP 1', 'PP 1'), ('PP 2', 'PP 2'), ('Grade 1', 'Grade 1'),
        ('Grade 2', 'Grade 2'), ('Grade 3', 'Grade 3'), ('Grade 4', 'Grade 4'),
        ('Grade 5', 'Grade 5'), ('Grade 6', 'Grade 6'), ('Grade 7', 'Grade 7'),
        ('Grade 8', 'Grade 8'), ('Grade 9', 'Grade 9'),
    ]

    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE)
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    gender = models.CharField(max_length=10, choices=GENDER_CHOICES)
    date_of_birth = models.DateField()
    admission_number = models.CharField(max_length=50, unique=True)
    admission_date = models.DateField(auto_now_add=True)
    class_enrolled = models.CharField(max_length=10, choices=CLASS_CHOICES)
    guardian_name = models.CharField(max_length=100)
    guardian_phone = models.CharField(max_length=15)

    def __str__(self):
        return f"{self.first_name} {self.last_name}"

# ----------------------------
# Teacher Model
# ----------------------------
class Teacher(models.Model):
    GENDER_CHOICES = [('Male', 'Male'), ('Female', 'Female'), ('Other', 'Other')]
    MARITAL_STATUS = [('Single', 'Single'), ('Married', 'Married')]

    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE)
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    phone_number = models.CharField(max_length=15)
    gender = models.CharField(max_length=10, choices=GENDER_CHOICES)
    marital_status = models.CharField(max_length=11, choices=MARITAL_STATUS)
    date_of_birth = models.DateField()
    date_of_employment = models.DateField()

    def __str__(self):
        return f"{self.first_name} {self.last_name}"

    @property
    def name(self):
        return f"{self.first_name} {self.last_name}"


# ----------------------------
# Staff Model (not linked to user)
# ----------------------------
class Staff(models.Model):
    GENDER_CHOICES = [('Male', 'Male'), ('Female', 'Female'), ('Other', 'Other')]
    MARITAL_STATUS = [('Single', 'Single'), ('Married', 'Married')]
    ROLES = [
        ('Security', 'Security'),
        ('Cook', 'Cook'),
        ('Secretary', 'Secretary'),
        ('Cleaner', 'Cleaner'),
        ('Lab_Technician', 'Lab_Technician'),
        ('Nurse', 'Nurse'),
        ('Social_Media_Manager', 'Social_Media_Manager'),
    ]

    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    email = models.EmailField()
    phone_number = models.CharField(max_length=15)
    gender = models.CharField(max_length=10, choices=GENDER_CHOICES)
    marital_status = models.CharField(max_length=11, choices=MARITAL_STATUS)
    role = models.CharField(max_length=20, choices=ROLES)
    date_of_employment = models.DateField()

    def __str__(self):
        return f"{self.first_name} {self.last_name}"
