from django.db import models

# =======================
# Student Model
# =======================
class Student(models.Model):
    GENDER_CHOICES = [('Male', 'Male'), ('Female', 'Female'), ('Other', 'Other')]    
    ENROLLED_CLASS = [
        ('PP1', 'PP1'),
        ('PP2', 'PP2'),
        ('Grade 1', 'Grade 1'),
        ('Grade 2', 'Grade 2'),
        ('Grade 3', 'Grade 3'),
        ('Grade 4', 'Grade 4'),
        ('Grade 5', 'Grade 5'),
    ]

    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    date_of_birth = models.DateField()
    gender = models.CharField(max_length=10, choices=GENDER_CHOICES)
    parent_name = models.CharField(max_length=20)
    parent_phone = models.CharField(max_length=20)
    enrolled_class = models.CharField(max_length=10, choices=ENROLLED_CLASS)  
    admission_number = models.CharField(max_length=5)

    def __str__(self):
        return f"{self.first_name} {self.last_name}"

# =======================
# Teacher Model
# =======================
class Teacher(models.Model):
    GENDER_CHOICES = [('Male', 'Male'), ('Female', 'Female'), ('Other', 'Other')]
    MARITAL_STATUS_CHOICES = [('Single', 'Single'), ('Married', 'Married')]

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
    GENDER_CHOICES = [('Male', 'Male'), ('Female', 'Female'), ('Other', 'Other')]
    MARITAL_STATUS_CHOICES = [('Single', 'Single'), ('Married', 'Married')]
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
# Fee Structure Models
# =======================
class FeeStructureClass(models.Model):
    CLASS_CHOICES = [
        ('PP1', 'PP1'),
        ('PP2', 'PP2'),
        ('Grade 1', 'Grade 1'),
        ('Grade 2', 'Grade 2'),
        ('Grade 3', 'Grade 3'),
        ('Grade 4', 'Grade 4'),
        ('Grade 5', 'Grade 5'),
    ]
    name = models.CharField(max_length=20, choices=CLASS_CHOICES, unique=True)

    def __str__(self):
        return self.name


class TermFee(models.Model):
    TERM_CHOICES = [
        ('Term 1', 'Term 1'),
        ('Term 2', 'Term 2'),
        ('Term 3', 'Term 3'),
    ]
    fee_class = models.ForeignKey(FeeStructureClass, related_name='terms', on_delete=models.CASCADE)
    term = models.CharField(max_length=10, choices=TERM_CHOICES)

    def __str__(self):
        return f"{self.fee_class.name} - {self.term}"


class FeeItem(models.Model):
    term_fee = models.ForeignKey(TermFee, related_name='items', on_delete=models.CASCADE)
    category = models.CharField(max_length=100)
    amount = models.PositiveIntegerField()

    def __str__(self):
        return f"{self.term_fee.fee_class.name} - {self.term_fee.term} - {self.category}"
