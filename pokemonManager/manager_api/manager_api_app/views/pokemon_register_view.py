"""ポケモン登録のビュー"""
import logging

from rest_framework.views import APIView

from manager_api_app.common.response_util import create_response
from manager_api_app.models.mst_pokemon import MstPokemon
from manager_api_app.serializers.pokemon_register_serializer import (
    PokemonSerializer
)


class PokemonRegisterView(APIView):
    """ポケモン登録のビュー"""

    def post(self, request):

        logger = logging.getLogger(__name__)
        logger.info("manager/pokemon_register/")

        result_data = {}
        result_data["pokemonName"] = request.data.get("pokemonName")
        result_data["level"] = request.data.get("level")
        result_data["personality"] = request.data.get("personality")
        result_data["identity"] = request.data.get("identity")
        result_data["item"] = request.data.get("item")
        result_data["hp"] = request.data.get("hp")
        result_data["attack"] = request.data.get("attack")
        result_data["defence"] = request.data.get("defence")
        result_data["specialAttack"] = request.data.get("specialAttack")
        result_data["specialDefence"] = request.data.get("specialDefence")
        result_data["speed"] = request.data.get("speed")
        result_data["hpEffort"] = request.data.get("hpEffort")
        result_data["attackEffort"] = request.data.get("attackEffort")
        result_data["defenceEffort"] = request.data.get("defenceEffort")
        result_data["specialAttackEffort"] = request.data.get(
            "specialAttackEffort")
        result_data["specialDefenceEffort"] = request.data.get(
            "specialDefenceEffort")
        result_data["speedEffort"] = request.data.get("speedEffort")

        # リクエストデータ(ポケモン名)を必須シリアライズ
        PokemonSerializer.validate_pokename(self, result_data["pokemonName"])

        # リクエストデータ(ポケモン名)を重複シリアライズ
        PokemonSerializer.validate_unique_pokename(
            self, request.data["pokemonName"])

        # 登録画面から受け取った値をPokemonテーブルに登録する
        MstPokemon.objects.create(
            poke_name=result_data["pokemonName"],
            level=result_data["level"],
            personality=result_data["personality"],
            identity=result_data["identity"],
            item=result_data["item"],
            hp=result_data["hp"],
            attack=result_data["attack"],
            defence=result_data["defence"],
            special_attack=result_data["specialAttack"],
            special_defence=result_data["specialDefence"],
            speed=result_data["speed"],
            hp_effort=result_data["hpEffort"],
            attack_effort=result_data["attackEffort"],
            defence_effort=result_data["defenceEffort"],
            special_attack_effort=result_data["specialAttackEffort"],
            special_defence_effort=result_data["specialDefenceEffort"],
            speed_effort=result_data["speedEffort"],
            delete_flag=False,
        )

        # DBに登録するだけだから空のレスポンスを返却する
        return create_response(
            response_body="",
            result_code="0",
            messages=""
        )
