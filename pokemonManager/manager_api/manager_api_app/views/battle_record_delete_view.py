"""DBからランクバトル戦績を削除するビュー"""
import logging

from rest_framework.views import APIView

from manager_api_app.common.response_util import create_response
from manager_api_app.models.mst_battle_record import MstBattleRecord


class BattleRecordDeleteView(APIView):
    """DBからランクバトル戦績を削除するクラス"""

    def delete(self, request):
        logger = logging.getLogger(__name__)
        logger.info("battle_record_delete/")

        # requestで受け取っているIDを取得
        battle_id = request.GET.get("battle_id")

        # リクエストで受け取ったIDでランクバトル戦績テーブルから物理削除
        MstBattleRecord.objects.filter(id=battle_id).delete()

        # DBから削除するだけだから空のレスポンスを返却する
        return create_response(
            response_body="",
            result_code="0",
            messages=""
        )
