"""パーティ登録のビュー"""
import logging

from rest_framework.views import APIView

from manager_api_app.common.response_util import create_response
from manager_api_app.models.mst_party import MstParty
from manager_api_app.serializers.party_register_serializer import (
    PartySerializer
)


class PartyRegisterView(APIView):
    """パーティ登録のビュー"""

    def post(self, request):

        logger = logging.getLogger(__name__)
        logger.info("manager/party_register/")

        result_data = {}
        result_data["partyName"] = request.data.get("partyName")
        result_data["currentSelectPokemon1"] = request.data.get(
            "currentSelectPokemon1")
        result_data["currentSelectPokemon2"] = request.data.get(
            "currentSelectPokemon2")
        result_data["currentSelectPokemon3"] = request.data.get(
            "currentSelectPokemon3")
        result_data["currentSelectPokemon4"] = request.data.get(
            "currentSelectPokemon4")
        result_data["currentSelectPokemon5"] = request.data.get(
            "currentSelectPokemon5")
        result_data["currentSelectPokemon6"] = request.data.get(
            "currentSelectPokemon6")
        print(f"result_data:{result_data}")

        # リクエストデータ(パーティー名)をシリアライズ
        PartySerializer.validate_party_name_blank(
            self, result_data["partyName"])

        # リクエストデータ(パーティー名)とDBの値を比較シリアライズ
        PartySerializer.validate_party_name_same(
            self, result_data["partyName"])

        # リクエストデータ(ポケモン6匹)をシリアライズ
        for i in range(1, 7):
            PartySerializer.validate_party_pokemon_blank(
                self, result_data[f"currentSelectPokemon{i}"],)

        # リクエストデータの重複をシリアライズ
        data_lst = []
        for i in range(1, 7):
            data_lst.append(result_data[f"currentSelectPokemon{i}"],)
        PartySerializer.validate_party_pokemon_unique(self, data_lst)

        # 登録画面から受け取った値をPartyテーブルに登録する
        for i in range(1, 7):
            MstParty.objects.create(
                party_name=result_data["partyName"],
                poke_name_id=result_data[f"currentSelectPokemon{i}"],
                delete_flag=False,
            )

        # DBに登録するだけだから空のレスポンスを返却する
        return create_response(
            response_body="",
            result_code="0",
            messages=""
        )
