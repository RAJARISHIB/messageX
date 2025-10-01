from rest_framework.response import Response
from django.contrib.auth import authenticate
from user.config import *
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.models import User
from django.utils import timezone
from chat.models import DirectConversation, Message

class ChatControllers:
    def __init__(self):
        pass
    
    def filter_users(self, request):
        try:
            print('Enter into function filter_users on ChatControllers')
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
            print('Exception in function filter_users on ChatControllers', err, type(err))
            return Response({'message': 'failed'}, status=500)
    
    def dumpMessageDB(self, request):
        try:
            print('Enter into function dumpMessageDB on ChatControllers')
            data = request.data
            user = request.user
            content = data.get('message')
            reciever_data = data.get('receiver')
            reciever = User.objects.get(id=reciever_data.get('id'))
            user_a, user_b = sorted([user, reciever], key=lambda user: user.id)
            conversation, created = DirectConversation.objects.get_or_create(
                user_a=user_a,
                user_b=user_b,
            )
            message = Message.objects.create(
                conversation = conversation,
                sender = user,
                content = content,
            )
            return Response({'message': 'success', 'data': ''}, status=200)
        except Exception as err:
            print('Exception in function dumpMessageDB on ChatControllers', err, type(err))
            return Response({'message': 'failed'}, status=500)