from django.db import models
from django.contrib.auth.models import User
from django.core.validators import RegexValidator
from django.utils import timezone
from django.core.exceptions import ValidationError
from django.contrib.auth.hashers import make_password, check_password

# =======================
# Shared Choices
# =======================
GENDER_CHOICES = [('Male', 'Male'), ('Female', 'Female'), ('Other', 'Other')]
MARITAL_STATUS_CHOICES = [('Single', 'Single'), ('Married', 'Married')]
CLASS_CHOICES = [
    ('PP1', 'PP1'),
    ('PP2', 'PP2'),
    ('Grade 1', 'Grade 1'),
    ('Grade 2', 'Grade 2'),
    ('Grade 3', 'Grade 3'),
    ('Grade 4', 'Grade 4'),
    ('Grade 5', 'Grade 5'),
]
TERM_CHOICES = [
    ('Term 1', 'Term 1'),
    ('Term 2', 'Term 2'),
    ('Term 3', 'Term 3'),
]

# =======================
# Validators
# =======================
phone_validator = RegexValidator(
    regex=r'^\+?\d{9,15}$',
    message="Enter a valid phone number (9 to 15 digits, optional +)."
)

def validate_past_date(value):
    if value > timezone.now().date():
        raise ValidationError("Date cannot be in the future.")

# =======================
# Student Model
# =======================
class Student(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    date_of_birth = models.DateField(validators=[validate_past_date])
    gender = models.CharField(max_length=10, choices=GENDER_CHOICES)
    parent_name = models.CharField(max_length=100)
    parent_phone = models.CharField(max_length=20, validators=[phone_validator])
    enrolled_class = models.CharField(max_length=20, choices=CLASS_CHOICES)
    admission_number = models.CharField(max_length=5, unique=True)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return f"{self.first_name} {self.last_name}"

    def check_password(self, raw_password):
        return self.user.check_password(raw_password)

    def set_password(self, raw_password):
        self.user.set_password(raw_password)
        self.user.save()

# =======================
# Teacher Model
# =======================
class Teacher(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    gender = models.CharField(max_length=10, choices=GENDER_CHOICES)
    email = models.EmailField(unique=True)
    phone_number = models.CharField(max_length=20, validators=[phone_validator])
    marital_status = models.CharField(max_length=10, choices=MARITAL_STATUS_CHOICES)
    date_of_employment = models.DateField(validators=[validate_past_date])

    def __str__(self):
        return f"{self.first_name} {self.last_name}"

# =======================
# Staff Model
# =======================
class Staff(models.Model):
    ROLE_CHOICES = [
        ('Security', 'Security'),
        ('Cook', 'Cook'),
        ('Secretary', 'Secretary'),
        ('Cleaner', 'Cleaner'),
        ('Lab_Technician', 'Lab Technician'),
        ('Nurse', 'Nurse'),
        ('Social_Media_Manager', 'Social Media Manager'),
        ('Driver', 'Driver'),
    ]

    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    gender = models.CharField(max_length=10, choices=GENDER_CHOICES)
    email = models.EmailField(unique=True)
    phone_number = models.CharField(max_length=20, validators=[phone_validator])
    marital_status = models.CharField(max_length=10, choices=MARITAL_STATUS_CHOICES)
    role = models.CharField(max_length=50, choices=ROLE_CHOICES)
    date_of_employment = models.DateField(validators=[validate_past_date])

    def __str__(self):
        return f"{self.first_name} {self.last_name}"

# =======================
# Fee Structure Model
# =======================
class FeeStructure(models.Model):
    enrolled_class = models.CharField(max_length=20, choices=CLASS_CHOICES)
    term = models.CharField(max_length=20, choices=TERM_CHOICES, default='Term 1')
    tuition = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    lunch = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    transport = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    activity = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    development = models.DecimalField(max_digits=10, decimal_places=2, default=0)

    def __str__(self):
        return f"{self.enrolled_class} - {self.term}"

    @property
    def total_fee(self):
        return self.tuition + self.lunch + self.transport + self.activity + self.development
