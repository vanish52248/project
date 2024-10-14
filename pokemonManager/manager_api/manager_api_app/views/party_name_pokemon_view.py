"""登録パーティー名でポケモン6匹を取得するビュー"""
import logging

from rest_framework.views import APIView

from manager_api_app.common.response_util import create_response
from manager_api_app.models.mst_party import MstParty


class PartyNamePokemonView(APIView):
    """登録パーティー名でポケモン6匹を取得するビュー"""

    def get(self, request):
        logger = logging.getLogger(__name__)
        logger.info("manager/party_name_pokemon/")

        result_data = MstParty.objects.all().filter(
            party_name=request.GET.get('party_name')
        ).values()

        return create_response(
            response_body=result_data,
            result_code="0",
            messages=""
        )
