from django.urls import path
from base.views import customer_views as views


urlpatterns =[
  
    path('customers/', views.getCustomerList, name="get_customer_list"),
    path('<str:pk>', views.getCustomer, name="get_customer"),
    path('create/', views.addCustomer, name="add_customer"),
    path('update/<str:pk>', views.updateCustomer, name="update_customer"),
    path('delete/<str:pk>', views.deleteCustomer, name="delete_customer"),
]