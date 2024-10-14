"""バトル対戦結果のビュー"""
import logging

from rest_framework.views import APIView

from manager_api_app.common.response_util import create_response
from manager_api_app.models.mst_battle_record import MstBattleRecord


class BattleResultCountView(APIView):
    """バトル対戦結果のビュー"""

    def get(self, request):
        logger = logging.getLogger(__name__)
        logger.info("manager/item/")

        # DBから対戦結果をそれぞれ取得した際の辞書
        battle_result_data = {}
        # FEへ返却する対戦結果の最終的な辞書
        result_data = {}

        battle_result_data["win"] = MstBattleRecord.objects.filter(
            result="win",
            delete_flag=0,
        ).values()
        battle_result_data["lose"] = MstBattleRecord.objects.filter(
            result="lose",
            delete_flag=0,
        ).values()
        battle_result_data["draw"] = MstBattleRecord.objects.filter(
            result="draw",
            delete_flag=0,
        ).values()

        # DBから取得した対戦結果の内、それぞれFEへ返却する辞書に格納していく
        for _ in battle_result_data["win"]:
            result_data["win"] = len(battle_result_data["win"])
        for _ in battle_result_data["lose"]:
            result_data["lose"] = len(battle_result_data["lose"])
        for _ in battle_result_data["draw"]:
            result_data["draw"] = len(battle_result_data["draw"])

        return create_response(
            response_body=result_data,
            result_code="0",
            messages=""
        )
