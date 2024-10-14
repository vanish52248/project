"""バトル戦績登録のビュー"""
import logging

from rest_framework.views import APIView

from manager_api_app.common.response_util import create_response
from manager_api_app.models.mst_battle_record import MstBattleRecord
from manager_api_app.serializers.battle_record_register_serializer import (
    BattleRecordSerializer
)


class BattleRecordRegisterView(APIView):
    """バトル戦績登録のビュー"""

    def post(self, request):

        logger = logging.getLogger(__name__)
        logger.info("manager/battle_record_register/")

        # POSTのaxiosの第一引数のパラメータ(rank)をAPI側で受け取る場合
        # -> requests.data.get('rank')
        # request.POSTはフォームデータのみのデータが辞書形式で格納される
        # request.dataはJSONデータがPOST（またはPUTやPATCH）されたときに使用する

        # GUI上で自分の手持ちからチェックを入れたポケモンの内Trueのみリストに格納する
        my_choice_pokemon_list = []
        for key, value in request.data.get('my_pokemon').items():
            if value:
                my_choice_pokemon_list.append(key)

        # リクエストデータ(選択ポケモン)を必須データシリアライズ
        BattleRecordSerializer.validate_choice_my_pokemon_blank(
            self, my_choice_pokemon_list)
        # リクエストデータ(選択ポケモン)を必須データシリアライズ
        BattleRecordSerializer.validate_choice_enemy_pokemon_blank(
            self, request.data.get('enemy_pokemon'))
        # リクエストデータ(選択ポケモン)を3匹以下にシリアライズ
        BattleRecordSerializer.validate_choice_three_lte_my_pokemon(
            self, my_choice_pokemon_list)
        # リクエストデータ(相手選択ポケモン)の同名ポケモン登録をなくすようにシリアライズ
        BattleRecordSerializer.validate_choice_unique_enemy_pokemon(
            self, request.data.get('enemy_pokemon'))

        battle_record_obj = MstBattleRecord.objects.create(
            rank=request.data.get('rank'),
            party_name=request.data.get('party_name'),
            # 自分のポケモンと相手のポケモンは3匹ずつが入る配列のカラム
            my_pokemon=my_choice_pokemon_list,
            enemy_pokemon=request.data.get('enemy_pokemon'),
            result=request.data.get('result'),
        )
        battle_record_obj.save()

        # DBに登録するだけだから空のレスポンスを返却する
        return create_response(
            response_body="",
            result_code="0",
            messages=""
        )
