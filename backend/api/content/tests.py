from django.test import TestCase
from django.test.client import Client
from .models import Cubic, Tag


class CubicsTestCase(TestCase):
    def create_cubic(self):
        cubic = Cubic()
        cubic.name = 'Тестовый кубик'
        cubic.content = '123'
        cubic.save()
        return cubic

    def create_tag(self, cubic):
        tag = Tag()
        tag.name = 'Тестовый тег'
        tag.save()
        tag.cubics.add(cubic)
        tag.save()

    @classmethod
    def setUpClass(cls):
        test = CubicsTestCase()
        cubic = CubicsTestCase.create_cubic(test)
        CubicsTestCase.create_tag(test, cubic)
        super().setUpClass()

    def test_get_single_cubic(self):
        c = Client()
        response = c.get('/get/cubic/1')
        self.assertEqual(response.status_code, 200)

    def test_get_all_cubics(self):
        c = Client()
        response = c.get('/get/cubics')
        self.assertEqual(response.status_code, 200)

    def test_get_single_tag(self):
        c = Client()
        response = c.get('/get/tag/1')
        self.assertEqual(response.status_code, 200)

    def test_get_all_tags(self):
        c = Client()
        response = c.get('/get/tags')
        self.assertEqual(response.status_code, 200)

