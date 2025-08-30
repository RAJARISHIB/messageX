from rest_framework.viewsets import ModelViewSet
from rest_framework.decorators import action
from user.controllers import UserControllers


class UserViewSet(ModelViewSet, UserControllers):

    @action(detail=False, methods=['post'], url_path='create_user')
    def create_user(self, request):
        ret = self.create_new_user(request)
        return ret
    
    @action(detail=False, methods=['post'], url_path='do_login')
    def doLogin(self, request):
        ret = self.do_login(request)
        return ret