from django.contrib.auth.models import User
from django.contrib.auth.hashers import check_password
from django.http import JsonResponse
from django.views import View
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from rest_framework.authtoken.models import Token
from .models import TableUsers
import json

class TableUsersView(View):
    @method_decorator(csrf_exempt)
    def dispatch(self, *args, **kwargs):
        return super().dispatch(*args, **kwargs)

    def get(self, request):
        data = json.loads(request.body.decode('utf-8'))
        ask = data.get("ask")
        username = data.get("username")
        token = request.headers.get("Authorization")

        # Verify auth token
        if not token:
            return JsonResponse({"error": "Token missing"}, status=403)

        try:
            user = Token.objects.get(key=token).user
        except Token.DoesNotExist:
            return JsonResponse({"error": "Invalid token"}, status=403)

        if ask == "showusers":
            # Show all users
            all_users = TableUsers.objects.values()
            return JsonResponse({"Users": list(all_users)})

        if ask == "showscore1":
            # Show points and elo of 1' game
            try:
                table_user = TableUsers.objects.get(user__username=username)
                return JsonResponse({"high_score": table_user.record_1, "elo": table_user.elo_1})
            except TableUsers.DoesNotExist:
                return JsonResponse({"error": "User not found"}, status=404)

    @csrf_exempt
    def post(self, request):
        data = json.loads(request.body.decode('utf-8'))
        ask = data.get("ask")
        username = data.get("username")
        password = data.get("password")

        if ask == "checkuser":
            # Check if user is registered
            try:
                password = data.get("password")
                user = User.objects.get(username=username)
                # Verify hashed password
                if user.check_password(password):
                    return JsonResponse({"Response": True}, status=200)
                else:
                    return JsonResponse({"Response": False, "error": "Invalid password"}, status=400)
            except User.DoesNotExist:
                return JsonResponse({"Response": False, "error": "User not found"}, status=400)

        if ask == "createuser":
            if User.objects.filter(username=username).exists():
                return JsonResponse({"error": "User already exists"}, status=400)

            user = User.objects.create_user(username=username, password=password)
            TableUsers.objects.create(user=user, record_1=0, elo_1=1000, record_3=0, elo_3=1000, record_max=0, elo_max=1000)

            # Genera token
            token, _ = Token.objects.get_or_create(user=user)
            return JsonResponse({"message": "User created", "token": token.key})

        if ask == "login":
            try:
                user = User.objects.get(username=username)
                if check_password(password, user.password):
                    token, _ = Token.objects.get_or_create(user=user)
                    return JsonResponse({"message": "Login successful", "token": token.key})
                else:
                    return JsonResponse({"error": "Invalid password"}, status=403)
            except User.DoesNotExist:
                return JsonResponse({"error": "User not found"}, status=404)
