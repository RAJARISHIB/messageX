from rest_framework.viewsets import ModelViewSet
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

class ChatViewSet(ModelViewSet):
    permission_classes = [IsAuthenticated]

    @action(detail=False, methods=['get'], url_path='temp')
    def create_user(self, request):
        print('temp hello')
        return Response({"message": "User Creation Failed"})