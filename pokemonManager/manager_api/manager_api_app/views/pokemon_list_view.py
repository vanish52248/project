"""登録ポケモンを一覧取得するビュー"""
import logging

from rest_framework.views import APIView

from manager_api_app.common.response_util import create_response
from manager_api_app.models.mst_pokemon import MstPokemon


class PokemonListView(APIView):
    """登録ポケモンを一覧取得するビュー"""

    def get(self, request):
        logger = logging.getLogger(__name__)
        logger.info("manager/pokemon_list/")

        result_data = MstPokemon.objects.all().values()

        return create_response(
            response_body=result_data,
            result_code="0",
            messages=""
        )
