from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from .serializers import InventorySerializer
from .models import Inventory_Item, Inventory
from rest_framework.response import Response
from rest_framework.status import (
    HTTP_201_CREATED,
    HTTP_404_NOT_FOUND,
    HTTP_204_NO_CONTENT,
    HTTP_200_OK,
    HTTP_400_BAD_REQUEST,
)


# Create your views here.
class Inventory_Manager(APIView):
    def post(self, request):
        user = request.user
        inventory, created = Inventory.objects.get_or_create(user=user)
        return Response("Inventory created successfully", status=HTTP_201_CREATED)

    def get(self, request):
        user = request.user
        inventory = get_object_or_404(Inventory, user=user)
        return Response(
            f"Inventory with ID {inventory.id} exists and belong to user {inventory.user}",
            status=HTTP_200_OK,
        )


class All_Items(APIView):
    def get(self, request, inventory_id):
        inventory = request.user.id
        items = ItemSerializer(
            Inventory_Item.objects.filter(user_inventory=inventory), many=True
        )
        return Response(items.data)


# class Item(APIView):
#     def get(self, request, item_id):
#         item = Item.objects.get(id=item_id)
#         item_serialized = ItemSerializer(item)
#         return Response(item_serialized.data, status=HTTP_200_OK)

#     def post(self, request, item_id):
#         item = get_object_or_404(Item, id=item_id)
#         client = request.user  #associated the request with the authenticated user

#         #find or create cart for client
#         cart, created = Cart.objects.get_or_create(client=client)

#         #check if item is already in cart
#         if Cart_item.objects.filter(item=item, client_cart=cart).exists():
#             return Response({"detail": "Item already in the cart."}, status=HTTP_400_BAD_REQUEST)

#         #create new cart_item instance and add it to cart
#         cart_item = Cart_item(item=item, client_cart=cart)
#         cart_item.save()

#         return Response(f"{item.name} has been added to your cart", status=HTTP_201_CREATED)

#     def delete(self, request, item_id):
#         item = get_object_or_404(Item, id=item_id)
#         client = request.user  #associated the request with the authenticated user

#         #find or create cart for client
#         cart, created = Cart.objects.get_or_create(client=client)

#         #check if item is already in cart
#         if Cart_item.objects.filter(item=item, client_cart=cart).exists():
#             Cart_item.objects.filter(item=item, client_cart=cart).delete()
#             return Response(f"{item.name} removed from cart", status=HTTP_204_NO_CONTENT)
#         else:
#             return Response("Item not found in the cart", status=HTTP_404_NOT_FOUND)


# class Item_By_Category(APIView):
#     def get(self, request, category):
#         items = Item.objects.filter(category=category.title())
#         items_serialized = ItemSerializer(items, many=True)
#         return Response(items_serialized.data, status=HTTP_200_OK)