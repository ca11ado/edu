from django.http import JsonResponse
from django.shortcuts import get_object_or_404

from .models import Cubic


def get_cubic(request, cubic_id):
    cubic = get_object_or_404(Cubic, pk=cubic_id)
    response = {}
    response['id'] = cubic.id
    response['name'] = cubic.name
    response['content'] = cubic.content
    return JsonResponse(response)


def get_all_cubics(request):
    all_cubics = Cubic.objects.all()
    response = []
    for cubic in all_cubics:
        response.append({'id': cubic.id, 'name': cubic.name})
    return JsonResponse(response, safe=False)
