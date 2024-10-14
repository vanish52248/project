"""
WSGI config for manager_api project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/3.1/howto/deployment/wsgi/
"""

import os

from django.core.wsgi import get_wsgi_application

# runserverの際に --settings を指定しない場合はローカル環境として起動される
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'manager_api.settings.local')

application = get_wsgi_application()
