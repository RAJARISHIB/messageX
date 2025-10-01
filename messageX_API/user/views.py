from rest_framework.viewsets import ModelViewSet
from rest_framework.decorators import action
from user.controllers import UserControllers
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response


class UserViewSet(ModelViewSet, UserControllers):

    @action(detail=False, methods=['post'], url_path='create_user', permission_classes=[AllowAny])
    def create_user(self, request):
        ret = self.create_new_user(request)
        return ret

    @action(detail=False, methods=['post'], url_path='do_login', permission_classes=[AllowAny])
    def doLogin(self, request):
        ret = self.do_login(request)
        return ret

    @action(detail=False, methods=['get'], url_path='check_auth', permission_classes=[IsAuthenticated])
    def check_auth(self, request):
        return Response({'message': 'Auth Successful'}, status=200)