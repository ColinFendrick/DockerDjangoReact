from django.urls import path
import prediction.views as views

urlpatterns = [
    path('/predict', views.IRIS_MODEL_PREDICT.as_view(), name='api_predict')
]