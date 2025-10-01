from rest_framework.response import Response
from django.contrib.auth import authenticate
from user.config import *
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.models import User
from django.utils import timezone
from user.serializers import UserSerializer
class UserControllers:
    def __init__(self):
        pass

    def create_new_user(self, request):
        try:
            print('Enter into function create_new_user on ChatController')
            data = request.data
            user = User.objects.create_user(username=data.get('username', ''), password=data.get('password', ''))
            user.save()
            print('User created Succesfully')
            return Response({"message": "User created Succesfully"}, status=200)
        except Exception as err:
            print('Exception in function create_new_user on ChatController: ', err, type(err))
            return Response({"message": "User Creation Failed"}, status=500)
    
    def do_login(self, request):
        try:
            print('Enter into function do_login on ChatController')
            data = request.data
            user = authenticate(username=data.get('username', ''), password=data.get('password', ''))
            if user not in Nonelist:
                self.update_last_login(user)
                refresh = RefreshToken.for_user(user)
                return Response({'access': str(refresh.access_token)}, status=200)
            else:
                return Response({'message': "User login failed"}, status=401)
        except Exception as err:
            print('Exception in function create_new_user on ChatController: ', err, type(err))
            return Response({"message": "User login failed"}, status=500)
    
    def update_last_login(self, user):
        try:
            now = timezone.now()
            User.objects.filter(id=user.id).update(last_login=now)
        except Exception as err:
            print('Exception in function update_last_login on ChatController: ', err, type(err))
    
    def get_current_user_details_db(self, request):
        try:
            user = request.user
            serializer = UserSerializer(user)
            data = serializer.data
            return Response(data, status=200)
        except Exception as err:
            print('Exception in function get_current_user_details_db on ChatController: ', err, type(err))
            return Response({"message": "User login failed"}, status=500)