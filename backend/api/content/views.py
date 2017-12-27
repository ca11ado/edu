from django.http import JsonResponse
from django.shortcuts import get_object_or_404

from .models import Cubic, Tag


def get_cubic(request, cubic_id):
    cubic = get_object_or_404(Cubic, pk=cubic_id)
    response = {'id': cubic.id, 'name': cubic.name, 'content': cubic.content}
    return JsonResponse(response)


def get_all_cubics(request):
    all_cubics = Cubic.objects.all()
    response = []
    for cubic in all_cubics:
        response.append({'id': cubic.id, 'name': cubic.name})
    return JsonResponse(response, safe=False)


def get_tag(request, tag_id):
    tag = get_object_or_404(Tag, pk=tag_id)
    cubics = []
    for cubic in tag.cubics.all():
        cubics.append(cubic.id)
    response = {'id': tag.id, 'name': tag.name, 'cubics': cubics}
    return JsonResponse(response)


def get_all_tags(request):
    all_tags = Tag.objects.all()
    response = []
    for tag in all_tags:
        response.append({'id': tag.id, 'name': tag.name})
    return JsonResponse(response, safe=False)
