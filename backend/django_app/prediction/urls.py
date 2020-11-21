from django.urls import path
from .views import IRIS_MODEL_PREDICT


urlpatterns = [
    path('predict', IRIS_MODEL_PREDICT.as_view(), name='api_predict')
]
