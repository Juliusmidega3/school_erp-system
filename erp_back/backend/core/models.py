from django.db import models

# Create your models here.


class Student(models.Model):
    GENDER_CHOICES = [
        ('Male', 'Male'),
        ('Female', 'Female')
    ]
    
    CLASS_CHOICES = [
        ('PP 1', 'PP 1'),
        ('PP 2', 'PP 2'),
        ('Grade 1', 'Grade 1'),
        ('Grade 2', 'Grade 2'),        
        ('Grade 3', 'Grade 3'),        
        ('Grade 4', 'Grade 4'),        
        ('Grade 5', 'Grade 5'),        
        ('Grade 6', 'Grade 6'),        
        ('Grade 7', 'Grade 7'),        
        ('Grade 8', 'Grade 8'),        
        ('Grade 8', 'Grade 9'),        
    ] 
    
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    gender = models.CharField(max_length=10, choices = GENDER_CHOICES)
    date_of_birth = models.DateField()
    admission_number = models.CharField(max_length=50, unique=True)
    admission_date = models.DateField(auto_now_add=True)
    class_enrolled = models.CharField(max_length=10, choices = CLASS_CHOICES)
    guardian_name = models.CharField(max_length=100)
    guardian_phone = models.CharField(max_length=15)
    
    def __str__(self):
        return f"{self.first_name}{self.last_name}"
    
class Teacher(models.Model):
    GENDER_CHOICES = [
        ('Male', 'Male'),
        ('Female', 'Female'),
        ('Other', 'Other'),
    ]
    
    MARITAL_STATUS = [
        ('Single', 'Single'),
        ('Married', 'Married'),        
    ]   

    
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    email = models.EmailField()    
    phone_number = models.CharField(max_length=15)
    gender = models.CharField(max_length=10, choices=GENDER_CHOICES)
    marital_status = models.CharField(max_length=11, choices=MARITAL_STATUS)
    date_of_birth = models.DateField()
    date_of_employment = models.DateField()
    
    def __str__(self):
        return f"{self.first_name}{self.last_name}"
    
class Staff(models.Model):
    GENDER_CHOICES = [
        ('Male', 'Male'),
        ('Female', 'Female'),
        ('Other', 'Other'),
    ]
    
    MARITAL_STATUS = [
        ('Single', 'Single'),
        ('Married', 'Married'),        
    ]   

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
        return f"{self.first_name}{self.last_name}"
    
