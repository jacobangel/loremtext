from django.conf.urls.defaults import *
import views

urlpatterns = patterns('',
    (r'^lorem/$', views.lorem),
    (r'^$', views.homepage),
    (r'^about/$', views.about),
    (r'^help/$', views.help),
)
