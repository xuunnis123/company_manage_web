from django.shortcuts import render

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response

from base.models import Order, Supplier
from base.models import Product, Order, OrderItem
from base.serializers import ProductSerializer

from base.serializers import OrderSerializer

#from base.serializers import OrderSerializer, OrderSerializer

from rest_framework import status
from datetime import datetime


"""path('orders/', views.getOrderList, name="get_order_list"),
    path('<str:pk>', views.getOrder, name="get_order"),
    path('create/', views.addOrder, name="add_order"),
    path('update/<str:pk>', views.updateOrder, name="update_order"),
    path('delete/<str:pk>', views.deleteOrder, name="delete_order"),"""
@api_view(['GET'])
def getOrderList(request):
    print("getList")
    product = Order.objects.all()
    serializer = OrderSerializer(product, many=True)
    return Response(serializer.data)



@api_view(['GET'])
def getOrder(request,pk):
    print("get")
    product = Order.objects.get(_id=pk)
    serializer = OrderSerializer(product, many=False)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def addOrder(request):
    
   def addOrderItems(request):
    user = request.user
    data = request.data
    print(data)
    orderItems = data['orderItems']

    if orderItems and len(orderItems) == 0:
        return Response({'detail': 'No Order Items'}, status=status.HTTP_400_BAD_REQUEST)
    else:

        # (1) Create order
        '''
          _id = models.AutoField(primary_key=True, editable=False)
    name = models.CharField(max_length=200, null=True, blank=True)
    
    customer = models.ForeignKey(Customer, on_delete=models.SET_NULL, null=True)
    product = models.ForeignKey(Product, on_delete=models.SET_NULL, null=True)
    memo = models.TextField(null=True, blank=True)
    isPaid = models.BooleanField(default=False)
    paidAt = models.DateTimeField(auto_now_add=False, null=True, blank=True)
    isDelivered = models.BooleanField(default=False)
    deliveredAt = models.DateTimeField(
        auto_now_add=False, null=True, blank=True)
    taxPrice = models.DecimalField(
        max_digits=7, decimal_places=2, null=True, blank=True)
    shippingPrice = models.DecimalField(
        max_digits=7, decimal_places=2, null=True, blank=True)
    total = models.IntegerField(null=True, blank=True)
    createdAt = models.DateTimeField(auto_now_add=True)
    modifiedAt = models.DateTimeField(auto_now = True)
        '''
        order = Order.objects.create(
            name=data['customer']+data['modifiedAt'],
            taxPrice=data['taxPrice'],
            shippingPrice=data['shippingPrice'],
            total=data['total']
        )

        

        # (3) Create order items adn set order to orderItem relationship
        for i in orderItems:
            product = Product.objects.get(_id=i['product'])

            item = OrderItem.objects.create(
                product=product,
                order=order,
                name=product.name,
                qty=i['qty'],
                price=i['price'],
            )

            # (4) Update stock

            product.countInStock -= item.qty
            product.save()

        serializer = OrderSerializer(order, many=False)
        print("serializer:",serializer)
        return Response(serializer.data)
    
@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateOrder(request, pk):
    
    
    
    product = Order.objects.get(_id=pk)
    
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
        
        serializer = OrderSerializer(product, many=False)

        return Response(serializer.data)   
    
    
@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def deleteOrder(request, pk):
    print("delete")
    productForDeletion = Order.objects.get(_id=pk)
    productForDeletion.delete()
    return Response('品項已刪除')