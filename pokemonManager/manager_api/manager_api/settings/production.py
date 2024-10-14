"""
本番環境で使用する設定モジュール(runserver引数有で起動した際の設定)
ex) pipenv run start --setting manager_api.settings.production
"""

print("load production settings.py")

import os
from .base import *

DEBUG = False

ALLOWED_HOSTS = [
    os.environ.get('ALLOWED_HOSTS'),
    os.environ.get('ALLOWED_HOSTS2'),
]

INSTALLED_APPS += [
    # デバッグ用は下記の内どちらか(両立不可)
    # 'debug_toolbar',
    'silk',
]

MIDDLEWARE += [
    # デバッグ用は下記の内どちらか(両立不可)
    # 'debug_toolbar.middleware.DebugToolbarMiddleware',
    'silk.middleware.SilkyMiddleware',
]

DATABASES = {
    'default': {
        'ENGINE': os.environ.get('DB_ENGINE'),
        'NAME': os.environ.get('DB_NAME'),
        'USER': os.environ.get('DB_USER'),
        'PASSWORD': os.environ.get('DB_PASSWORD'),
        'HOST': os.environ.get('DB_HOST'),
        'PORT': os.environ.get('DB_PORT'),
        'OPTIONS': {
            'charset': 'utf8mb4',
        },
    }
}

# ------------------------------------------------------------------------
# reactとDRF繋げるために下記追加
# ------------------------------------------------------------------------
CORS_ORIGIN_ALLOW_ALL = True
CORS_ALLOW_CREDENTIALS = True
CSRF_COOKIE_SECURE = True

CORS_ORIGIN_WHITELIST = [
    'http://18.176.68.186',
    "http://localhost",
    "http://127.0.0.1",
]

# Django管理サイトにCSSを利かす為に必須で設定必要
STATIC_ROOT = os.path.join(BASE_DIR, "app/static")
MEDIA_ROOT = '/usr/share/nginx/html/media'

CSRF_TRUSTED_ORIGINS = ['http://18.176.68.186', 'https://18.176.68.186']
