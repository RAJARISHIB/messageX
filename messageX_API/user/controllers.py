from django.contrib.auth.models import User
from rest_framework.response import Response
from django.contrib.auth import authenticate
from user.config import *
from rest_framework_simplejwt.tokens import RefreshToken

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
            return Response({"message": "User created Succesfully"})
        except Exception as err:
            print('Exception in function create_new_user on ChatController: ', err, type(err))
            return Response({"message": "User Creation Failed"})
    
    def do_login(self, request):
        try:
            print('Enter into function do_login on ChatController')
            data = request.data
            user = authenticate(username=data.get('username', ''), password=data.get('password', ''))
            if user not in Nonelist:
                refresh = RefreshToken.for_user(user)
                return Response({
                    'access': str(refresh.access_token),
                })
        except Exception as err:
            print('Exception in function create_new_user on ChatController: ', err, type(err))
            return Response({"message": "User login failed"})