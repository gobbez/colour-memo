from django.db import models
from django.contrib.auth.models import User

class TableUsers(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    record_1 = models.IntegerField()
    elo_1 = models.IntegerField()
    record_3 = models.IntegerField()
    elo_3 = models.IntegerField()
    record_max = models.IntegerField()
    elo_max = models.IntegerField()
