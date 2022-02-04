from django.urls import path
from base.views import order_views as views


urlpatterns =[
    path('orders/', views.getOrderList, name="get_order_list"),
    path('<str:pk>', views.getOrder, name="get_order"),
    path('create/', views.addOrder, name="add_order"),
    path('update/<str:pk>', views.updateOrder, name="update_order"),
    path('delete/<str:pk>', views.deleteOrder, name="delete_order"),
    
]