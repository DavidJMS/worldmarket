# From Django
from django.db import models
from django.contrib.auth.models import AbstractUser
from django.db.models.base import ModelState

# Utilities
from apps.utils.models import WorldMarketModel

class Article(WorldMarketModel):

    type_article = models.ForeignKey('storehouse.TypeArticle', on_delete=models.CASCADE)
    brand = models.ForeignKey('storehouse.Brand', on_delete=models.CASCADE)
    registered_by = models.ForeignKey('accounts.User', on_delete=models.PROTECT)

    def __str__(self) -> str:
        return "{} {}".format(self.type_article.name, self.brand.name)

class EntryArticle(WorldMarketModel):

    article     = models.ForeignKey('storehouse.Article', on_delete=models.CASCADE)
    storehouse  = models.ForeignKey('storehouse.StoreHouse', on_delete=models.CASCADE)
    due_date    = models.DateTimeField(auto_created=False,auto_now_add=False)
    registered_by = models.ForeignKey('accounts.User', on_delete=models.PROTECT)
    purchase_price = models.DecimalField(max_digits=9, decimal_places=2, null=True, blank=True)
    quantity    = models.PositiveIntegerField()
    rest_quantity    = models.PositiveIntegerField()

    def __str__(self) -> str:
        type_article:str = self.article.type_article.name
        brand:str = self.article.brand.name
        article:str = type_article + brand
        return "Entry {} on {}".format(article, self.created)

class OutputArticle(WorldMarketModel):

    lote_article    = models.ForeignKey('storehouse.EntryArticle', on_delete=models.CASCADE)
    storehouse      = models.ForeignKey('storehouse.StoreHouse', on_delete=models.CASCADE)
    registered_by   = models.ForeignKey('accounts.User', on_delete=models.PROTECT)
    sale_price      = models.DecimalField(max_digits=9, decimal_places=2, null=True, blank=True)
    quantity        = models.PositiveIntegerField()

    def __str__(self) -> str:
        type_article:str = self.lote_article.article.type_article.name
        brand:str = self.lote_article.article.brand.name
        article:str =  type_article + brand
        return "Output {} article {}".format(article, self.created)