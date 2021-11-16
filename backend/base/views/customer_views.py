from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response

from django.contrib.auth.models import User
from base.models import Customer


from base.serializers import CustomerSerializer

from rest_framework import status

@api_view(['GET'])
def getCustomerList(request):
    customers = Customer.objects.all()
    serializer = CustomerSerializer(customers, many=True)
    return Response(serializer.data)



@api_view(['GET'])
def getCustomer(request,pk):
    customer = Customer.objects.get(id=pk)
    print(customer)
    serializer = CustomerSerializer(customer, many=False)
    print(serializer)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def addCustomer(request):
    
    data = request.data
    
    if data and len(data) == 0:
        return Response({'detail': 'No Customer Items'}, status=status.HTTP_400_BAD_REQUEST)
    else:
        #name,job, phone,cellphone, address, memo
        # (1) Create student
        
        customer = Customer.objects.create(
            name = data['name'],
            job = data['job'],
            phone = data['phone'],
            address = data['address'],
            cellphone = data['cellphone'],
            memo = data['memo'],
        )

        serializer = CustomerSerializer(customer, many=False)
        print("serializer:",serializer)
        return Response(serializer.data)




@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateCustomer(request, pk):

    customer = Customer.objects.get(id=pk)
    
    if customer:
        data = request.data
        
        if data and len(data) != 0:
                if data.get('name'):
                    customer.name = data['name']
                if data.get('job'):
                    customer.job = data['job']
                if data.get('phone'):
                    customer.phone = data['phone']
                if data.get('address'):
                    customer.address = data['address']
                if data.get('cellphone'):
                    customer.cellphone = data['cellphone']
                if data.get('memo'):
                    customer.memo = data['memo']
               
           
        customer.save()
        
        serializer = CustomerSerializer(customer, many=False)

        return Response(serializer.data)
    

@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def deleteCustomer(request, pk):
    customerForDeletion = Customer.objects.get(id=pk)
    customerForDeletion.delete()
    return Response('客戶已刪除')