"""DBのバトル戦績情報を編集するビュー"""
import logging

from rest_framework.views import APIView

from manager_api_app.common.response_util import create_response
from manager_api_app.models.mst_battle_record import MstBattleRecord
from manager_api_app.serializers.battle_record_register_serializer import (
    BattleRecordSerializer
)


class BattleRecordEditView(APIView):
    """DBのバトル戦績情報を編集するクラス"""

    def put(self, request):
        logger = logging.getLogger(__name__)
        logger.info("battle_record_edit/")

        # requestで受け取っている情報を取得
        battle_record_id = request.GET.get("id")
        rank = request.GET.get("rank")
        party_name = request.GET.get("party_name")
        result = request.GET.get("result")

        # リクエストデータ(選択ポケモン)をパーティー内ポケモンにシリアライズ
        # BattleRecordSerializer.validate_input_pokemon_format(
        #     self, my_pokemon, party_name
        # )

        # リクエストで受け取った情報でバトル戦績テーブルを更新
        MstBattleRecord.objects.filter(id=battle_record_id).update(
            rank=rank,
            party_name=party_name,
            result=result,
        )

        # DB情報を更新するだけだから空のレスポンスを返却する
        return create_response(
            response_body="",
            result_code="0",
            messages=""
        )
