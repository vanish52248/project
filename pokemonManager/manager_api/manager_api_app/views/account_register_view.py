"""アカウント登録のビュー"""
import logging

from rest_framework.views import APIView
# 既存のauth_userテーブル内の情報を取得するためのインポート
from django.contrib.auth.models import User

from manager_api_app.common.response_util import create_response
from manager_api_app.serializers.account_register_serializer import (
    AccountRegisterSerializer
)


class AccountRegisterView(APIView):
    """アカウント登録のビュー"""

    def post(self, request):

        logger = logging.getLogger(__name__)
        logger.info("manager/account_register/")

        print(f'★ username:{request.data["username"]}')
        print(f'★ password:{request.data["password"]}')

        # リクエストデータ(アカウント名)を重複シリアライズ
        AccountRegisterSerializer.validate_unique_account(
            self, request.data["username"]
        )

        # ユーザーテーブルにアカウント情報を作成して保存する
        user = User()
        user.username = request.data["username"]
        user.email = ""
        # パスワードのみハッシュ化して設定する必要がある為、既存機能を使用する
        user.set_password(request.data["password"])
        user.save()

        # DBに登録するだけだから空のレスポンスを返却する
        return create_response(
            response_body="",
            result_code="0",
            messages=""
        )
