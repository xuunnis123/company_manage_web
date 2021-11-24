from django.urls import path
from base.views import product_views as views


urlpatterns =[
     path('products/', views.getProductList, name="get_product_list"),
    path('<str:pk>', views.getProduct, name="get_product"),
    path('create/', views.addProduct, name="add_product"),
    path('update/<str:pk>', views.updateProduct, name="update_product"),
    path('delete/<str:pk>', views.deleteProduct, name="delete_product"),
]