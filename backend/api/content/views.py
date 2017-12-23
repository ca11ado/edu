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
