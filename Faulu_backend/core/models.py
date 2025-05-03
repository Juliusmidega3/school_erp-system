from django.db import models

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
# Student Model
# =======================
class Student(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    date_of_birth = models.DateField()
    gender = models.CharField(max_length=10, choices=GENDER_CHOICES)
    parent_name = models.CharField(max_length=20)
    parent_phone = models.CharField(max_length=20)
    enrolled_class = models.CharField(max_length=10, choices=CLASS_CHOICES)
    admission_number = models.CharField(max_length=5)

    def __str__(self):
        return f"{self.first_name} {self.last_name}"

# =======================
# Teacher Model
# =======================
class Teacher(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    gender = models.CharField(max_length=10, choices=GENDER_CHOICES)
    email = models.EmailField(unique=True)
    phone_number = models.CharField(max_length=20)
    marital_status = models.CharField(max_length=10, choices=MARITAL_STATUS_CHOICES)
    date_of_employment = models.DateField()

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
    phone_number = models.CharField(max_length=20)
    marital_status = models.CharField(max_length=10, choices=MARITAL_STATUS_CHOICES)
    role = models.CharField(max_length=50, choices=ROLE_CHOICES)
    date_of_employment = models.DateField()

    def __str__(self):
        return f"{self.first_name} {self.last_name}"

# =======================
# Fee Structure Model
# =======================
class FeeStructure(models.Model):
    class_name = models.CharField(max_length=20, choices=CLASS_CHOICES)
    term = models.CharField(max_length=20, choices=TERM_CHOICES, default='Term 1')
    tuition = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    lunch = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    transport = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    activity = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    development = models.DecimalField(max_digits=10, decimal_places=2, default=0)

    def __str__(self):
        return f"{self.class_name} - {self.term}"

    @property
    def total_fee(self):
        return self.tuition + self.lunch + self.transport + self.activity + self.development
