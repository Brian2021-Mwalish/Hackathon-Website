from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

class RegisterSerializer(serializers.Serializer):
    first_name = serializers.CharField(min_length=1)
    last_name = serializers.CharField(required=False, allow_blank=True)
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True, min_length=6)
    password_confirm = serializers.CharField(write_only=True, min_length=6)

    def validate_email(self, value):
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError("Email already exists")
        return value

    def validate(self, data):
        if data["password"] != data["password_confirm"]:
            raise serializers.ValidationError({"password_confirm": "Passwords do not match"})
        return data

    def create(self, validated_data):
        user = User.objects.create(
            username=validated_data["email"],
            email=validated_data["email"],
            first_name=validated_data["first_name"],
            last_name=validated_data.get("last_name", ""),
            password=make_password(validated_data["password"]),
        )
        return user

class UserSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField()
    role = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 'name', 'role', 'is_staff', 'is_superuser', 'is_active', 'date_joined']

    def get_name(self, obj):
        return f"{obj.first_name} {obj.last_name}".strip() or obj.username

    def get_role(self, obj):
        return 'admin' if obj.is_staff else 'student'

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    """
    Accept username or email in the 'username' field.
    Lookup user by email or username and verify password with check_password()
    to avoid backend-dependent authenticate() pitfalls and MultipleObjectsReturned.
    """

    def validate(self, attrs):
        identifier = attrs.get(self.username_field)  # typically 'username'
        password = attrs.get('password')

        user = None
        if identifier:
            if "@" in identifier:
                # email provided — pick the first matching user to avoid MultipleObjectsReturned
                users_qs = User.objects.filter(email__iexact=identifier).order_by('id')
                if users_qs.exists():
                    user = users_qs.first()
            else:
                try:
                    user = User.objects.get(username=identifier)
                except User.DoesNotExist:
                    user = None

        if user is None or not user.check_password(password):
            raise serializers.ValidationError('Invalid username/email or password', code='authorization')

        if not user.is_active:
            raise serializers.ValidationError('User account is disabled.', code='authorization')

        refresh = self.get_token(user)
        data = {
            'refresh': str(refresh),
            'access': str(refresh.access_token),
        }

        data['user'] = {
            'id': user.id,
            'username': user.get_username(),
            'email': user.email,
            'first_name': user.first_name,
            'last_name': user.last_name,
            'is_staff': user.is_staff,
            'is_superuser': user.is_superuser,
            'date_joined': user.date_joined,
        }

        return data
