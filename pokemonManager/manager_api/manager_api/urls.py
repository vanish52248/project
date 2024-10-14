"""プロジェクト全体のルーティング設定"""
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    # 通常のAPIはJWT認証されていないと401となりAPI通信不可とするルーティング
    path('manager_api_app/v1/', include('manager_api_app.urls')),
    # api/authアプリケーションのURLconf読み込み
    path('manager_api_app/v1/auth/', include('djoser.urls.jwt'))
]
