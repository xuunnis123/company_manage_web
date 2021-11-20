from django.urls import path
from base.views import supplier_views as views


urlpatterns =[
  
    path('suppliers/', views.getSupplierList, name="get_supplier_list"),
    path('<str:pk>', views.getSupplier, name="get_supplier"),
    path('create/', views.addSupplier, name="add_member"),
    path('update/<str:pk>', views.updateSupplier, name="update_supplier"),
    path('delete/<str:pk>', views.deleteSupplier, name="delete_supplier"),
]