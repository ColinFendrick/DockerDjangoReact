from rest_auth.views import LoginView, LogoutView, PasswordChangeView, APIView
from rest_framework.generics import CreateAPIView
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework import permissions

from .serializers import UserSerializer

class APILogoutView(LogoutView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]


class APILoginView(LoginView):
    pass


class APIPasswordUpdateView(PasswordChangeView):
    authentication_classes = [TokenAuthentication]

class APICreateUserView(CreateAPIView):
    permission_classes = [permissions.AllowAny]
    serializer_class = UserSerializer
