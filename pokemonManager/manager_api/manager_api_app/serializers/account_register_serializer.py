"""アカウント登録のシリアライザ"""
from rest_framework import serializers
# 既存のauth_userテーブル内の情報を取得するためのインポート
from django.contrib.auth.models import User


class AccountRegisterSerializer(serializers.ModelSerializer):
    """アカウント登録のシリアライザ"""
    class Meta:
        model = User

        # エラーメッセージ
        message = ""

    def validate_unique_account(self, data):
        """アカウント名が一意なのかチェックする"""
        user_record = User.objects.filter(username=data).count()
        if user_record > 0:
            # UIでスナックバーに表示するメッセージ
            message = f"アカウント名 {data} は既に登録されています。"
            raise serializers.ValidationError({"error_message": message})
