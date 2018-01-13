from django.db import models


class Cubic(models.Model):
    name = models.CharField(max_length=200)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name


class Tag(models.Model):
    name = models.CharField(max_length=200)
    cubics = models.ManyToManyField(Cubic)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name


class CubicConnection(models.Model):
    parent = models.ForeignKey(Cubic, on_delete=models.CASCADE, related_name='parent')
    child = models.ForeignKey(Cubic, on_delete=models.CASCADE, related_name='child')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return 'Connection'

    @staticmethod
    def get_parents(cubic_id):
        result = []
        parents = CubicConnection.objects.filter(child=cubic_id)
        for parent in parents:
            result.append({'id': parent.id, 'name': parent.name})
        return result

    @staticmethod
    def get_children(cubic_id):
        result = []
        children = CubicConnection.objects.filter(parent=cubic_id)
        for child in children:
            result.append({'id': child.id, 'name': child.name})
        return result


