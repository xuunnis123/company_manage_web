from django.db import models

from django.contrib.auth.models import User
from django.contrib.auth.models import AbstractUser
# Create your models here.

class SocialAccount(models.Model):
    provider = models.CharField(max_length=200, default='google') # 若未來新增其他的登入方式,如Facebook,GitHub...
    unique_id = models.CharField(max_length=200)
    user = models.ForeignKey(
        User, related_name='social', on_delete=models.CASCADE)



class Customer(models.Model):
    _id = models.AutoField(primary_key=True, editable=False)
    name = models.CharField(max_length=200, null=True, blank=True)
    phone = models.CharField(max_length=200, null=True, blank=True)
    cellphone = models.CharField(max_length=200, null=True, blank=True)
    address = models.CharField(max_length=200, null=True, blank=True)
    job = models.CharField(max_length=200, null=True, blank=True) 
    memo = models.CharField(max_length=200, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return str(self.name)




class Supplier(models.Model):

    _id = models.AutoField(primary_key=True, editable=False)
    name = models.CharField(max_length=200, null=True, blank=True)
    person = models.CharField(max_length=200, null=True, blank=True)
    phone = models.CharField(max_length=200,null=True, blank=True)
    address = models.CharField(max_length=200, null=True, blank=True)
    unicode = models.CharField(max_length=200, null=True, blank=True)
    memo = models.CharField(max_length=200, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name


class Product(models.Model):

    _id = models.AutoField(primary_key=True, editable=False)
    name = models.CharField(max_length=200, null=True, blank=True)
    model = models.CharField(max_length=200, null=True, blank=True)
    unit = models.CharField(max_length=200, null=True, blank=True)
    supplier = models.ForeignKey(Supplier, on_delete=models.SET_NULL, null=True)
    category = models.CharField(max_length=200, null=True, blank=True)
    memo = models.TextField(null=True, blank=True)
    price = models.IntegerField(null=True, blank=True)
    cost = models.IntegerField(null=True, blank=True)
    countInStock = models.IntegerField(null=True, blank=True, default=0)
    createdAt = models.DateTimeField(auto_now_add=True)
    modifiedAt = models.DateTimeField(auto_now = True)

    def __str__(self):
        return self.name


