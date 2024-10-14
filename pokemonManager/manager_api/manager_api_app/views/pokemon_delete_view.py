"""DBからポケモンを削除するビュー"""
import logging

from rest_framework.views import APIView

from manager_api_app.common.response_util import create_response
from manager_api_app.models.mst_pokemon import MstPokemon


class PokemonDeleteView(APIView):
    """DBからポケモンを削除するクラス"""

    def delete(self, request):
        logger = logging.getLogger(__name__)
        logger.info("pokemon_delete/")

        # requestで受け取っているIDを取得
        pokemon_id = request.GET.get("pokemon_id")

        # リクエストで受け取ったIDでポケモンテーブルから物理削除
        MstPokemon.objects.filter(id=pokemon_id).delete()

        # DBから削除するだけだから空のレスポンスを返却する
        return create_response(
            response_body="",
            result_code="0",
            messages=""
        )
