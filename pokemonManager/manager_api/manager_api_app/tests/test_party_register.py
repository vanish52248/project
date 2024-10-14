"""パーティー登録機能のUT"""
# Djangoアプリ内部でのリクエストの作成には、django.test.Clientクラスを使用する
# 外部=requests, 内部=Client
from django.test import Client, TestCase


class TestPost(TestCase):
    # セットアップクラス(テスト前に毎回実行される)
    def setUp(self):
        # リクエストを飛ばすクライアントの準備
        self.client = Client()

    def test_post_001(self):
        """パーティー6体登録 正常系"""

        # 認証時のアクセストークン取得に必要なデータ
        token_info = {
            "username": "admin",
            "password": "admin123",
        }

        # POSTリクエスト時に渡すパラメータ
        data = {
            "partyName": "テスト用サンプルパーティー名",
            "currentSelectPokemon1": "フシギダネ",
            "currentSelectPokemon2": "ヒトカゲ",
            "currentSelectPokemon3": "ゼニガメ",
            "currentSelectPokemon4": "ピカチュウ",
            "currentSelectPokemon5": "オニスズメ",
            "currentSelectPokemon6": "キャタピー",
        }

        # tokenを取得する
        # res = self.client.post(
        #     '/manager_api_app/v1/auth/jwt/create',
        #     token_info,
        # )
        # print(res)

        # dataをパラメータとしてPOST内部リクエストを飛ばす
        # res = self.client.post(
        #     '/manager_api_app/v1/party_register/',
        #     data,
        # )

        # assert res.status_code == 200
