from django.urls import path
from . import views

urlpatterns = [
    path('predict', views.IRIS_MODEL_PREDICT.as_view(), name='api_predict')
]
