from django.urls import path

from . import views

urlpatterns = [
    path('cubic/<int:cubic_id>', views.get_cubic, name='cubic'),
    path('cubics', views.get_all_cubics, name='all_cubics'),
    path('tag/<int:tag_id>', views.get_tag, name='tag'),
    path('tags', views.get_all_tags, name='all_tags'),
]
