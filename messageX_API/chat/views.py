from rest_framework.viewsets import ModelViewSet
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from chat.controllers import ChatControllers

class ChatViewSet(ModelViewSet, ChatControllers):
    permission_classes = [IsAuthenticated]

    @action(detail=False, methods=['get'], url_path='filterUsers')
    def filterUsers(self, request):
        ret = self.filter_users(request)
        return ret
    
    @action(detail=False, methods=['post'], url_path='sendMessage')
    def sendMessage(self, request):
        ret = self.dumpMessageDB(request)
        return ret