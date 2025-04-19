from django.db import models

# Create your models here.


class Student(models.Model):
    GENDER_CHOICES = [
        ('M', 'Male'),
        ('F', 'Female')
    ]
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    gender = models.CharField(max_length=1, choices = GENDER_CHOICES)
    date_of_birth = models.DateField()
    admission_number = models.CharField(max_length=50, unique=True)
    admission_date = models.DateField(auto_now_add=True)
    class_enrolled = models.CharField(max_length=50)
    guardian_name = models.CharField(max_length=100)
    guardian_phone = models.CharField(max_length=15)
    
    def __str__(self):
        return f"{self.first_name}{self.last_name}"
    
class Teacher(models.Model):
    GENDER_CHOICES = [
        ('M', 'Male'),
        ('F', 'Female'),
        ('O', 'Other'),
    ]
    
    MARITAL_STATUS = [
        ('S', 'Single'),
        ('M', 'Married'),        
    ]
    
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    email = models.EmailField()    
    phone_number = models.CharField(max_length=15)
    gender = models.CharField(max_length=1, choices=GENDER_CHOICES)
    marital_status = models.CharField(max_length=1, choices=MARITAL_STATUS)
    date_of_birth = models.DateField()
    date_of_employment = models.DateField()
    
    def __str__(self):
        return f"{self.first_name}{self.last_name}"
