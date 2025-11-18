from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from django.contrib.auth.models import Permission
from django.contrib.contenttypes.models import ContentType
from django.db import transaction

User = get_user_model()

class Command(BaseCommand):
    help = "Create or update a staff user with permissions to add/change gallery photos and page contents."

    def add_arguments(self, parser):
        parser.add_argument(
            '--email',
            default='oscarelly81@gmail.com',
            help='Email for the admin user (default: oscarelly81@gmail.com)'
        )
        parser.add_argument(
            '--password',
            default='Password123',
            help='Password for the admin user (default: Password123)'
        )
        parser.add_argument(
            '--username',
            default=None,
            help='Username for the admin user (defaults to part before @ of email)'
        )

    @transaction.atomic
    def handle(self, *args, **options):
        email = options['email'].strip()
        password = options['password']
        username = options['username'] or (email.split('@')[0] if '@' in email else email)

        # Find an existing user by email first; fallback to username
        user = User.objects.filter(email__iexact=email).first()
        created = False
        if not user:
            user, created = User.objects.get_or_create(username=username, defaults={'email': email})
            if created:
                self.stdout.write(self.style.SUCCESS(f'Created new user with username="{username}" and email="{email}".'))
            else:
                # If user existed by username but without email, ensure email is set
                if not user.email:
                    user.email = email
                    user.save(update_fields=['email'])
                    self.stdout.write(self.style.SUCCESS(f'Updated existing username="{username}" with email="{email}".'))

        # Update password and staff flag
        user.set_password(password)
        user.is_staff = True
        # do not set is_superuser to avoid full superuser unless you want it
        user.save()
        if created:
            self.stdout.write(self.style.SUCCESS("User saved with provided password and is_staff=True."))
        else:
            self.stdout.write(self.style.SUCCESS("User updated with provided password and is_staff=True."))

        # Prepare permission codenames to assign (non-fatal if a permission isn't found)
        permission_specs = [
            # (app_label, model, action)
            ('gallery', 'photo', 'add'),
            ('gallery', 'photo', 'change'),
            ('blogs', 'blogpost', 'add'),
            ('blogs', 'blogpost', 'change'),
            ('events', 'event', 'add'),
            ('events', 'event', 'change'),
        ]

        assigned = []
        missing = []

        for app_label, model_name, action in permission_specs:
            try:
                ct = ContentType.objects.get(app_label=app_label, model=model_name)
                codename = f"{action}_{model_name}"
                perm = Permission.objects.filter(content_type=ct, codename=codename).first()
                if perm:
                    user.user_permissions.add(perm)
                    assigned.append(f"{codename} ({app_label}.{model_name})")
                else:
                    missing.append(f"{codename} ({app_label}.{model_name})")
            except ContentType.DoesNotExist:
                missing.append(f"{action}_{model_name} ({app_label}.{model_name}) - content type not found")

        user.save()

        if assigned:
            self.stdout.write(self.style.SUCCESS(f"Assigned permissions: {', '.join(assigned)}"))
        if missing:
            self.stdout.write(self.style.WARNING(f"Missing/unassigned (ensure migrations ran for these apps): {', '.join(missing)}"))

        self.stdout.write(self.style.SUCCESS(
            f"Admin user ready. Login using email/username '{user.username}' and password provided."
        ))
