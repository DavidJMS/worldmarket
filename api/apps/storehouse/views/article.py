# Django REST Framework
from rest_framework import mixins, status, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.generics import get_object_or_404
from rest_framework.views import APIView

# From Django
from django.core.exceptions import PermissionDenied
from django.db.models import Sum
from django.db.models import query

# Filters
from rest_framework.filters import SearchFilter, OrderingFilter
from django_filters.rest_framework import DjangoFilterBackend

# Permissions
from rest_framework.permissions import (AllowAny,IsAuthenticated,IsAdminUser)

# My Permissions
from apps.accounts.permissions import IsOperator

# Serializers
from apps.storehouse import serializers

# My Models
from apps.storehouse.models import (Article, EntryArticle, OutputArticle)

# Utils
import datetime as datetime_modules

class ArticleViewSet(mixins.ListModelMixin,
                mixins.RetrieveModelMixin,
                mixins.CreateModelMixin,
                mixins.UpdateModelMixin,
                mixins.DestroyModelMixin,
                viewsets.GenericViewSet):
    """
        Article House view set.

        Handle CRUD of Articles.
    """

    queryset = Article.objects.all()
    serializer_class = serializers.ArticleModelSerializer

    def get_permissions(self):
        """
            Instantiates and returns the list of permissions that this view requires.
        """
        # import pdb; pdb.set_trace()
        permission_classes:list = [IsAdminUser,]
        if self.action in ["list",]:
            permission_classes.append(IsOperator)
        return [permission() for permission in permission_classes]

    def check_permissions(self, request):
        """
            Check if the request should be permitted.
            Raises an appropriate exception if the request is not permitted.
        """
        total_permissions = self.get_permissions()
        not_permissions = len(total_permissions)
        for permission in total_permissions:
            if not permission.has_permission(request, self):
                not_permissions -=1
            
        if not_permissions == 0:    
            self.permission_denied(
                request,
                message=getattr(permission, 'message', None),
                code=getattr(permission, 'code', None)
            )

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())
        # import time
        # time.sleep(2)
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

    def create(self, request, *args, **kwargs):
        serializer = serializers.CreateArticleModelSerializer(data=request.data,context={'request':request})
        serializer.is_valid(raise_exception=True)
        article = serializer.save()
        serializer = self.get_serializer(article)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = serializers.CreateArticleModelSerializer(
            instance, 
            data=request.data,
            partial=partial,
            context={'request':request}
            )
        serializer.is_valid(raise_exception=True)
        article = serializer.save()
        serializer = self.get_serializer(article)

        if getattr(instance, '_prefetched_objects_cache', None):
            # If 'prefetch_related' has been applied to a queryset, we need to
            # forcibly invalidate the prefetch cache on the instance.
            instance._prefetched_objects_cache = {}

        return Response(serializer.data)

class EntryArticleViewSet(mixins.ListModelMixin,
                mixins.RetrieveModelMixin,
                mixins.CreateModelMixin,
                mixins.DestroyModelMixin,
                viewsets.GenericViewSet):
    """
        Entry Article view set.

        Handle CRUD of Entry Article.
    """
    
    serializer_class = serializers.EntryArticleModelSerializer

    def dispatch(self, request, *args, **kwargs):
        """Verify that the article exists."""
        article_id = kwargs['article_id']
        self.article = get_object_or_404(Article, id=article_id)
        return super(EntryArticleViewSet, self).dispatch(request, *args, **kwargs)

    def get_permissions(self):
        """
            Instantiates and returns the list of permissions that this view requires.
        """
        # import pdb; pdb.set_trace()
        permission_classes:list = [IsAdminUser,]
        if self.action != "destroy":
            permission_classes.append(IsOperator)
        return [permission() for permission in permission_classes]

    def check_permissions(self, request):
        """
            Check if the request should be permitted.
            Raises an appropriate exception if the request is not permitted.
        """
        total_permissions = self.get_permissions()
        not_permissions = len(total_permissions)
        for permission in total_permissions:
            if not permission.has_permission(request, self):
                not_permissions -=1
            
        if not_permissions == 0:    
            self.permission_denied(
                request,
                message=getattr(permission, 'message', None),
                code=getattr(permission, 'code', None)
            )

    def get_queryset(self):
        return EntryArticle.objects.filter(article=self.article)

    def create(self, request, *args, **kwargs):
        serializer = serializers.CreateEntryArticleModelSerializer(
            data=request.data,
            context={
                'request':request,
                'article':self.article
                }
            )
        serializer.is_valid(raise_exception=True)
        entry_article = serializer.save()
        serializer = self.get_serializer(entry_article)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

class AllEntry(APIView):

    permission_classes = [IsAdminUser, IsOperator]

    def check_permissions(self, request):
        """
            Check if the request should be permitted.
            Raises an appropriate exception if the request is not permitted.
        """
        total_permissions = self.get_permissions()
        not_permissions = len(total_permissions)
        for permission in total_permissions:
            if not permission.has_permission(request, self):
                not_permissions -=1
            
        if not_permissions == 0:    
            self.permission_denied(
                request,
                message=getattr(permission, 'message', None),
                code=getattr(permission, 'code', None)
            )

    def get(self, request):
        try:
            entry_article = EntryArticle.objects.filter(rest_quantity__gt=0)
        except PermissionDenied as e:
            return Response({'detail': str(e)}, status=status.HTTP_401_UNAUTHORIZED)
        except Exception as e:
            return Response({"detail": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        serializer = serializers.EntryArticleModelSerializer(entry_article, many=True).data
        return Response(serializer, status=status.HTTP_200_OK)

class OutputArticleViewSet(mixins.ListModelMixin,
                mixins.RetrieveModelMixin,
                mixins.CreateModelMixin,
                mixins.UpdateModelMixin,
                mixins.DestroyModelMixin,
                viewsets.GenericViewSet):
    """
        Output Article view set.

        Handle CRUD of Output Article.
    """

    serializer_class = serializers.OutputArticleModelSerializer

    def dispatch(self, request, *args, **kwargs):
        """Verify that the entry article exists."""
        entry_article_id = kwargs['entry_article_id']
        self.lote_article = get_object_or_404(EntryArticle, id=entry_article_id)
        return super(OutputArticleViewSet, self).dispatch(request, *args, **kwargs)
    
    def get_permissions(self):
        """
            Instantiates and returns the list of permissions that this view requires.
        """
        # import pdb; pdb.set_trace()
        permission_classes:list = [IsAdminUser,]
        if self.action != "destroy":
            permission_classes.append(IsOperator)
        return [permission() for permission in permission_classes]

    def check_permissions(self, request):
        """
            Check if the request should be permitted.
            Raises an appropriate exception if the request is not permitted.
        """
        total_permissions = self.get_permissions()
        not_permissions = len(total_permissions)
        for permission in total_permissions:
            if not permission.has_permission(request, self):
                not_permissions -=1
            
        if not_permissions == 0:    
            self.permission_denied(
                request,
                message=getattr(permission, 'message', None),
                code=getattr(permission, 'code', None)
            )

    def get_queryset(self):
        return OutputArticle.objects.filter(lote_article=self.lote_article)

    def create(self, request, *args, **kwargs):
        serializer = serializers.CreateOutputArticleModelSerializer(
            data=request.data,
            context={
                'request':request,
                'lote_article':self.lote_article
                }
            )
        serializer.is_valid(raise_exception=True)
        output_article = serializer.save()
        serializer = self.get_serializer(output_article)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

class Logistics(viewsets.GenericViewSet):

    permission_classes = [IsAdminUser]

    def dispatch(self, request, *args, **kwargs):
        article_id = kwargs['article_id']
        self.article = get_object_or_404(Article, id=article_id)
        return super(Logistics, self).dispatch(request, *args, **kwargs)

    def get_queryset(self):
        if self.action == "sales":
            return OutputArticle.objects.filter(lote_article__article=self.article)
        if self.action == "shopping":
            return EntryArticle.objects.filter(article=self.article)
        if self.action in ["max_shopping","max_sales"]:
            return Article.objects.all()

    @action(detail=False, methods=["post"])
    def sales(self, request, *args, **kwargs):
        year:int = request.data.get("year")
        storehouse:int = request.data.get("storehouse")
        if year is None:
            return Response({'detail': "Year is required"}, status=status.HTTP_400_BAD_REQUEST)
        if storehouse is None:
            return Response({'detail': "Storehouse is required"}, status=status.HTTP_400_BAD_REQUEST)
        query = self.get_queryset()
        if int(storehouse) != 0:
            query = query.filter(storehouse=storehouse)
        data:list = []
        for index in range(1,13):
            result = query.filter(created__month=index, created__year=year).aggregate(Sum('quantity'))
            result_number = result["quantity__sum"]
            if result_number == None:
                result_number = 0
            data.append(result_number)
        return Response(data,status=status.HTTP_200_OK)

    @action(detail=False, methods=["post"])
    def shopping(self, request, *args, **kwargs):
        year = request.data.get("year")
        if year is None:
            return Response({'detail': "Year is required"}, status=status.HTTP_400_BAD_REQUEST)
        storehouse:int = request.data.get("storehouse")
        if storehouse is None:
            return Response({'detail': "Storehouse is required"}, status=status.HTTP_400_BAD_REQUEST)
        query = self.get_queryset()
        if int(storehouse) != 0:
            query = query.filter(storehouse=storehouse)
        data:list = []
        for index in range(1,13):
            result = query.filter(created__month=index, created__year=year).aggregate(Sum('quantity'))
            result_number = result["quantity__sum"]
            if result_number == None:
                result_number = 0
            data.append(result_number)
        return Response(data,status=status.HTTP_200_OK)
    
    @action(detail=False, methods=["post"])
    def max_shopping(self, request, *args, **kwargs):
        query = self.get_queryset()
        article_shoppings:list = []
        data = request.data
        my_shoppings_query = None
        
        storehouse:int = data.get("storehouse")
        if storehouse is None:
            return Response({'detail': "Storehouse is required"}, status=status.HTTP_400_BAD_REQUEST)
        
        if data.get("all") == True:
            my_shoppings_query = EntryArticle.objects.all()
        if data.get("all") == False:
            start_date = data["from_date"]
            end_date = data["to_date"]
            my_shoppings_query = EntryArticle.objects.filter(created__range=(start_date, end_date))
        
        if int(storehouse) != 0:
            my_shoppings_query = my_shoppings_query.filter(storehouse=storehouse)

        for article in query:
            name:str = "{} {}".format(article.type_article.name, article.brand.name)
            result = my_shoppings_query.filter(article=article).aggregate(Sum('quantity'))
            result_number = result["quantity__sum"]
            if result_number == None:
                result_number = 0
            article_shopping:dict = {
                "name":name,
                "quantity":result_number
            }
            article_shoppings.append(article_shopping)
        article_shoppings.sort(key=lambda x: x["quantity"],reverse=True)
        article_shoppings = article_shoppings[0:5]
        return Response(article_shoppings, status=status.HTTP_200_OK)

    @action(detail=False, methods=["post"])
    def max_sales(self, request, *args, **kwargs):
        query = self.get_queryset()
        article_sales:list = []
        data = request.data
        my_sales_query = None
        
        storehouse:int = data.get("storehouse")
        if storehouse is None:
            return Response({'detail': "Storehouse is required"}, status=status.HTTP_400_BAD_REQUEST)

        if data.get("all") == True:
            my_sales_query = OutputArticle.objects.all()
        if data.get("all") == False:
            start_date = data["from_date"]
            end_date = data["to_date"]
            my_sales_query = OutputArticle.objects.filter(created__range=(start_date, end_date))
        
        if int(storehouse) != 0:
            my_sales_query = my_sales_query.filter(storehouse=storehouse)

        for article in query:
            name:str = "{} {}".format(article.type_article.name, article.brand.name)
            result = my_sales_query.filter(lote_article__article=article).aggregate(Sum('quantity'))
            result_number = result["quantity__sum"]
            if result_number == None:
                result_number = 0
            article_shopping:dict = {
                "name":name,
                "quantity":result_number
            }
            article_sales.append(article_shopping)
        article_sales.sort(key=lambda x: x["quantity"],reverse=True)
        article_sales = article_sales[0:5]
        return Response(article_sales, status=status.HTTP_200_OK)