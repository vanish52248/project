"""全体設定の共通モジュール"""

from pathlib import Path
import environ
import os
from datetime import timedelta

# ディレクトリを分けたのでparent階層を一つ深くする(2個から3個)
BASE_DIR = Path(__file__).resolve().parent.parent.parent

env = environ.Env(
    DEBUG=(bool, False)
)

environ.Env.read_env(os.path.join(BASE_DIR, '.env'))
SECRET_KEY = env('SECRET_KEY')
SECRET_KEY = os.environ.get("SECRET_KEY")

DEBUG = True

ALLOWED_HOSTS = ["localhost", "127.0.0.1"]

# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    # ------------------------------------------------------------------------
    # ローカルアプリケーション
    # --------------------- ---------------------------------------------------
    'manager_api_app.apps.ManagerApiAppConfig',
    # ------------------------------------------------------------------------
    # サードパーティアプリケーション
    # --------------------- ---------------------------------------------------
    'rest_framework',
    'corsheaders',
    # JWT認証関係の追加
    'rest_framework.authtoken',
    'djoser',
]

# ------------------------------------------------------------------------
# reactからDRFのアクセス許可する為に追加
# ------------------------------------------------------------------------
CORS_ORIGIN_ALLOW_ALL = True
CORS_ALLOW_CREDENTIALS = True
CSRF_COOKIE_SECURE = True


MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    # ------------------------------------------------------------------------
    # reactとDRF繋げるために下記追加
    # ------------------------------------------------------------------------
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',
]

DEBUG_TOOLBAR_CONFIG = {
    "SHOW_TOOLBAR_CALLBACK": lambda request: True,
}

ROOT_URLCONF = 'manager_api.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [os.path.join(BASE_DIR, 'build')],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'manager_api.wsgi.application'

# JWT認証関係の設定
REST_FRAMEWORK = {
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.IsAuthenticated',
    ],
    'DEFAULT_AUTHENTICATION_CLASSES': [
        # Simple JWTを読み込む
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ]
}

SIMPLE_JWT = {
    # トークンの時間を5分に設定
    'ACCESS_TOKEN_LIFETIME': timedelta(minutes=5),
    'REFRESH_TOKEN_LIFETIME': timedelta(days=14),
    'ROTATE_REFRESH_TOKENS': True,
    'BLACKLIST_AFTER_ROTATION': False,
    # 暗号のアルゴリズム設定
    'ALGORITHM': 'HS256',
    'SIGNING_KEY': SECRET_KEY,
    'VERIFYING_KEY': None,
    'AUTH_HEADER_TYPES': ('JWT',),
    'USER_ID_FIELD': 'id',
    'USER_ID_CLAIM': 'user_id',
    'AUTH_TOKEN_CLASSES': ('rest_framework_simplejwt.tokens.AccessToken',),
    'TOKEN_TYPE_CLAIM': 'token_type',
}

LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    # ログ出力フォーマットの設定
    'formatters': {
        'production': {
            'format': '%(asctime)s [%(levelname)s] %(process)d %(thread)d '
                      '%(pathname)s:%(lineno)d %(message)s'
        },
    },
    # ハンドラの設定（ログをどこに出すかの設定）
    'handlers': {
        # ファイルへの出力
        'file': {
            'level': 'INFO',
            'class': 'logging.FileHandler',
            # デフォルトだと C://から探してしまうからプロジェクト直下のlogs/から探すように変更
            "filename": os.path.join(BASE_DIR, "logs/manager.log"),
            'formatter': 'production',
        },
        # ターミナルへの出力
        'console': {
            'level': 'INFO',
            # こちらは標準出力に出してくれるクラスを指定
            'class': 'logging.StreamHandler',
            'formatter': 'production'
        },
    },
    # ロガーの設定
    'loggers': {
        # 自分で追加したアプリケーション全般のログを拾うロガー
        '': {
            # 先述のhandlersのログ出力先をfileとconsole共に出力する設定
            # 'handlers': ['file', 'console'],
            'handlers': ['console'],
            'level': 'INFO',
            'propagate': False,
        },
        # Django自身が出力するログ全般を拾うロガー
        'django': {
            # 先述のhandlersのログ出力先をconsoleのみに出力する設定
            'handlers': ['console'],
            'level': 'INFO',
            'propagate': False,
        },
    },
}

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

LANGUAGE_CODE = 'ja'

TIME_ZONE = 'Asia/Tokyo'

USE_I18N = True

USE_L10N = True

USE_TZ = True

STATIC_URL = '/static/'
