from rest_framework.response import Response
from django.contrib.auth import authenticate
from user.config import *
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.models import User
from django.utils import timezone

class ChatControllers:
    def __init__(self):
        pass
    
    def filter_users(self, request):
        try:
            print('Enter into function filter_users on ChatController')
            data = request.query_params
            searchTerm = data.get('searchTerm')
            if searchTerm not in Nonelist:
                users = User.objects.filter(username__icontains=searchTerm, is_active=True)
                results = [{"id": user.id, "username": user.username} for user in users]
                return Response({"message": 'succesful', 'data': results}, status=200)
            else:
                users = User.objects.filter(is_active=True)
                results = [{'id': user.id, 'username': user.username} for user in users]
                return Response({'message': 'success', 'data': results}, status=200)
        except Exception as err:
            print('Exception in function ChatController', err, type(err))
            return Response({'message': 'failed'}, status=500)
