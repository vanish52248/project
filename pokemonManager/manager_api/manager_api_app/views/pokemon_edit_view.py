"""DBのポケモン情報を編集するビュー"""
import logging

from rest_framework.views import APIView

from manager_api_app.common.response_util import create_response
from manager_api_app.models.mst_pokemon import MstPokemon


class PokemonEditView(APIView):
    """DBのポケモン情報を編集するクラス"""

    def put(self, request):
        logger = logging.getLogger(__name__)
        logger.info("pokemon_edit/")

        # requestで受け取っている情報を取得
        pokemon_id = request.GET.get("id")
        pokemon_name = request.GET.get("pokemonName")
        level = request.GET.get("level")
        personality = request.GET.get("personality")
        identity = request.GET.get("identity")
        item = request.GET.get("item")
        hp = request.GET.get("hp")
        attack = request.GET.get("attack")
        defence = request.GET.get("defence")
        specialAttack = request.GET.get("specialAttack")
        specialDefence = request.GET.get("specialDefence")
        speed = request.GET.get("speed")

        # リクエストで受け取った情報でポケモンテーブルを更新
        MstPokemon.objects.filter(id=pokemon_id).update(
            poke_name=pokemon_name,
            level=level,
            personality=personality,
            identity=identity,
            item=item,
            hp=hp,
            attack=attack,
            defence=defence,
            special_attack=specialAttack,
            special_defence=specialDefence,
            speed=speed,
        )

        # DB情報を更新するだけだから空のレスポンスを返却する
        return create_response(
            response_body="",
            result_code="0",
            messages=""
        )
