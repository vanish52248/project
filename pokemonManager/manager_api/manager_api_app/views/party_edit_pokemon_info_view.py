"""登録パーティーからポケモンを逆算して一覧取得するビュー"""
import logging

from rest_framework.views import APIView

from manager_api_app.common.response_util import create_response
from manager_api_app.models.mst_party import MstParty


class PartyEditPokemonInfoView(APIView):
    """登録パーティーを一覧取得するビュー"""

    def get(self, request):
        logger = logging.getLogger(__name__)
        logger.info("manager/party_edit_pokemon_info/")

        # requestで受け取っている情報を取得
        party_name = request.GET.get("party_name")

        result_datas = MstParty.objects.filter(party_name=party_name).values()

        result_list = []
        for result_data in result_datas:
            result_list.append(result_data["poke_name_id"])

        return create_response(
            response_body=result_list,
            result_code="0",
            messages=""
        )
