from rest_framework.viewsets import ModelViewSet
from rest_framework.decorators import action
from user.controllers import UserControllers
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response


class UserViewSet(ModelViewSet, UserControllers):

    def get_permissions(self):
        if self.action in ['check_auth']:
            return [IsAuthenticated()]
        return [AllowAny()]
    
    @action(detail=False, methods=['post'], url_path='create_user')
    def create_user(self, request):
        ret = self.create_new_user(request)
        return ret
    
    @action(detail=False, methods=['post'], url_path='do_login')
    def doLogin(self, request):
        ret = self.do_login(request)
        return ret
    
    @action(detail=False, methods=['get'], url_path='check_auth')
    def check_auth(self, request):
        return Response({'message': 'Auth Succesful'}, status=200)