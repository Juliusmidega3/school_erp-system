from rest_framework import serializers
from .models import Student, Teacher, Staff, FeeStructureClass, TermFee, FeeItem



# Model serializers
class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = '__all__'

class TeacherSerializer(serializers.ModelSerializer):
    class Meta:
        model = Teacher
        fields = '__all__'

class StaffSerializer(serializers.ModelSerializer):
    class Meta:
        model = Staff
        fields = '__all__'


class FeeItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = FeeItem
        fields = ['category', 'amount']

class TermFeeSerializer(serializers.ModelSerializer):
    items = FeeItemSerializer(many=True, read_only=True)

    class Meta:
        model = TermFee
        fields = ['term', 'items']

class FeeStructureClassSerializer(serializers.ModelSerializer):
    term_fees = serializers.SerializerMethodField()

    class Meta:
        model = FeeStructureClass
        fields = ['name', 'term_fees']

    def get_term_fees(self, obj):
        terms = obj.terms.all()
        term_dict = {}
        for term in terms:
            term_dict[term.term] = FeeItemSerializer(term.items.all(), many=True).data
        return term_dict
