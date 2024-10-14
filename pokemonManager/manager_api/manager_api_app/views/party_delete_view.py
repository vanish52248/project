"""DBからパーティーを削除するビュー"""
import logging

from rest_framework.views import APIView

from manager_api_app.common.response_util import create_response
from manager_api_app.models.mst_party import MstParty
from manager_api_app.models.mst_battle_record import MstBattleRecord


class PartyDeleteView(APIView):
    """DBからパーティーを削除するクラス"""

    def delete(self, request):
        logger = logging.getLogger(__name__)
        logger.info("party_delete/")

        # requestで受け取っているIDを取得
        party_id = request.GET.get("party_id")

        # 先にIDで引っかかるパーティー情報を取得
        party_info = MstParty.objects.filter(id=party_id)

        # パーティー情報からパーティー名を取得
        party_name = party_info[0]

        # 同時に削除を行う為、バトル戦績テーブルの情報を取得
        battle_record_info = MstBattleRecord.objects.filter(party_name=party_name)

        # パーティー情報でフィルターをかけて再取得
        partys = MstParty.objects.filter(party_name=party_name)

        # 取得パーティーをすべて削除する
        for party in partys:
            party.delete()

        # バトル戦績から取得パーティーで登録されているパーティーをすべて削除する
        for battle_record in battle_record_info:
            battle_record.delete()

        # DBから削除するだけだから空のレスポンスを返却する
        return create_response(
            response_body="",
            result_code="0",
            messages=""
        )
