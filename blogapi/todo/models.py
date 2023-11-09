from django.db import models
from django.conf import settings
# Create your models here.


class Todo(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    task = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ('created_at',)
    
    def __str__(self):
        return self.user.username + " -> "+ self.task