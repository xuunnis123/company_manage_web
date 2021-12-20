from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response

from django.contrib.auth.models import User
from base.models import Product, Supplier


from base.serializers import ProductSerializer

#rom base.serializers import ProductSerializer

from rest_framework import status
'''_id = models.AutoField(primary_key=True, editable=False)
    name = models.CharField(max_length=200, null=True, blank=True)
    model = models.CharField(max_length=200, null=True, blank=True)
    unit = models.CharField(max_length=200, null=True, blank=True)
    supplier = models.ForeignKey(Supplier, on_delete=models.SET_NULL, null=True)
    category = models.CharField(max_length=200, null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    price = models.IntegerField(null=True, blank=True)
    cost = models.IntegerField(null=True, blank=True)
    countInStock = models.IntegerField(null=True, blank=True, default=0)
    createdAt = models.DateTimeField(auto_now_add=True)
    modifiedAt = models.DateTimeField(auto_now = True)'''

@api_view(['GET'])
def getProductList(request):
    product = Product.objects.all()
    serializer = ProductSerializer(product, many=True)
    return Response(serializer.data)



@api_view(['GET'])
def getProduct(request,pk):
    product = Product.objects.get(_id=pk)
    serializer = ProductSerializer(product, many=False)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def addProduct(request):
    
    data = request.data
    
    if data and len(data) == 0:
        return Response({'detail': 'No Product Items'}, status=status.HTTP_400_BAD_REQUEST)
    else:

        # (1) Create member
        supplier = Supplier.objects.get(_id=data['supplier'])
        product = Product.objects.create(
            unit = data['unit'],
            name = data['name'],
            model = data['model'],
            supplier = supplier,
            category = data['category'],
            price = data['price'],
            cost = data['cost'],
            countInStock = data['countInStock'],
            memo = data['memo']

        )

        serializer = ProductSerializer(product, many=False)
    
        return Response(serializer.data)
    
@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateProduct(request, pk):
    
    
    
    product = Product.objects.get(_id=pk)
    
    if product:
        data = request.data
        if isinstance(data['supplier'], int):
            supplier = Supplier.objects.get(_id=data['supplier'])
            
        else:
            supplier = Supplier.objects.get(name=data['supplier'])
        
        if data and len(data) != 0:
                if data.get('name'):
                    product.name = data['name']
                
                product.supplier = supplier
                

                if data.get('unit'):
                    product.unit = data['unit']
                if data.get('model'):
                    product.model = data['model']
                if data.get('category'):
                    product.category = data['category']
                
                if data.get('cate'):
                    pass
               
            
                if data.get('description'):
                    product.description = data['description']
                if data.get('price'):
                    product.file = data['price']
                
                if data.get('cost'):
                    product.cost = data['cost']
                if data.get('countInStock'):
                    product.countInStock = data['countInStock']
                if data.get('memo'):
                    product.memo = data['memo']
           
        product.save()
        
        serializer = ProductSerializer(product, many=False)

        return Response(serializer.data)   
    
    
@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def deleteProduct(request, pk):
    print("delete")
    productForDeletion = Product.objects.get(_id=pk)
    productForDeletion.delete()
    return Response('品項已刪除')