# From Django
from django.contrib import admin

# My models
from .models import *

admin.site.register(Article)
admin.site.register(EntryArticle)
admin.site.register(OutputArticle)
admin.site.register(StoreHouse)
admin.site.register(TypeArticle)
admin.site.register(Brand)