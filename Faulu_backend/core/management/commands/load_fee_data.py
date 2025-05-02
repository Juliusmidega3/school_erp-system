import json
import os

from django.core.management.base import BaseCommand
from core.models import Class, TermFee, FeeItem
from django.conf import settings


class Command(BaseCommand):
    help = 'Load fee data from JSON file into the database'

    def handle(self, *args, **kwargs):
        file_path = os.path.join(settings.BASE_DIR, 'core', 'data', 'fee_data.json')

        if not os.path.exists(file_path):
            self.stdout.write(self.style.ERROR(f'File not found: {file_path}'))
            return

        with open(file_path, 'r') as file:
            data = json.load(file)

        for class_data in data:
            class_name = class_data['name']
            term_fees = class_data.get('term_fees', {})

            class_instance, created = Class.objects.get_or_create(name=class_name)
            if created:
                self.stdout.write(self.style.SUCCESS(f'Created class: {class_name}'))
            else:
                self.stdout.write(f'Class already exists: {class_name}')

            for term, items in term_fees.items():
                term_fee, created = TermFee.objects.get_or_create(
                    class_ref=class_instance,
                    term=term
                )
                if created:
                    self.stdout.write(self.style.SUCCESS(f'  Added term: {term}'))
                else:
                    self.stdout.write(f'  Term already exists: {term}')

                for item in items:
                    fee_item, created = FeeItem.objects.get_or_create(
                        term_fee=term_fee,
                        category=item['category'],
                        defaults={'amount': item['amount']}
                    )
                    if not created:
                        fee_item.amount = item['amount']
                        fee_item.save()
                        self.stdout.write(f'    Updated {item["category"]} - {item["amount"]}')
                    else:
                        self.stdout.write(self.style.SUCCESS(f'    Added {item["category"]} - {item["amount"]}'))

        self.stdout.write(self.style.SUCCESS('Fee data loaded successfully.'))
