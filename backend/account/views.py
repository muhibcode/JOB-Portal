
from django.contrib.auth.hashers import make_password
from django.contrib.auth.models import User
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from .serializer import SignUpSerializer, UserSerializer

# Create your views here.


@api_view(['POST'])
def register(request):
    data = request.data
    user = SignUpSerializer(data=data)
    print(user)

    # args = {'email': data['email']}
    if user.is_valid():
        if not User.objects.filter(username=data['email']).exists():
            user = User.objects.create(
                first_name=data['first_name'],
                last_name=data['last_name'],
                username=data['email'],
                email=data['email'],
                password=make_password(data['password']),
            )

            # user.save()
            return Response({'message': 'user registerd'})
        else:
            return Response({'message': 'user already exist'})
    else:
        return Response(user.errors)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def currentUser(request):
    user = request.user
    serializer = UserSerializer(user)

    return Response(serializer.data)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateUser(request):
    user = request.user
    data = request.data
    user.first_name = data['first_name']
    user.last_name = data['last_name']
    user.username = data['email']
    user.email = data['email']

    if data['password'] != '':
        user.password = make_password(data['password'])
    user.save()
    serialzer = UserSerializer(user)
    # serialzer.is_valid(raise_exception=True)
    # serialzer.save()
    return Response(serialzer.data)
