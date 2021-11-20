from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response

from django.contrib.auth.models import User
from base.models import Supplier


from base.serializers import SupplierSerializer

from rest_framework import status

@api_view(['GET'])
def getSupplierList(request):
    suppliers = Supplier.objects.all()
    serializer = SupplierSerializer(suppliers, many=True)
    return Response(serializer.data)



@api_view(['GET'])
def getSupplier(request,pk):
    supplier = Supplier.objects.get(_id=pk)
    serializer = SupplierSerializer(supplier, many=False)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def addSupplier(request):
    
    data = request.data
    
    if data and len(data) == 0:
        return Response({'detail': 'No Supplier Items'}, status=status.HTTP_400_BAD_REQUEST)
    else:

        # (1) Create member
        
        supplier = Supplier.objects.create(
            person = data['person'],
            name = data['name'],
            phone = data['phone'],
            address = data['address'],
            unicode = data['unicode'],
            memo = data['memo'],

        )

        serializer = SupplierSerializer(supplier, many=False)
    
        return Response(serializer.data)




@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateSupplier(request, pk):
    
    
    print("pk:",pk)
    supplier = Supplier.objects.get(_id=pk)
    
    if supplier:
        data = request.data
        print("data=",data)
    


        if data and len(data) != 0:
                
                if data.get('name'):
                    supplier.name = data['name']

                if data.get('person'):
                    supplier.person = data['person']
                
                if data.get('phone'):
                    supplier.phone = data['phone']

                if data.get('address'):
                    supplier.address = data['address']

                if data.get('unicode'):
                    supplier.unicode = data['unicode']
 

                if data.get('memo'):
                    supplier.memo = data['memo']
                
           
        supplier.save()
        
        serializer = SupplierSerializer(supplier, many=False)

        return Response(serializer.data)
    

@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def deleteSupplier(request, pk):
    supplierForDeletion = Supplier.objects.get(_id=pk)
    supplierForDeletion.delete()
    return Response('供應商已刪除')