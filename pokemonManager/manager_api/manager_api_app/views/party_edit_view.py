"""DBのパーティー情報を編集するビュー"""
import logging

from rest_framework.views import APIView

from manager_api_app.common.response_util import create_response
from manager_api_app.models.mst_party import MstParty
from manager_api_app.models.mst_battle_record import MstBattleRecord


class PartyEditView(APIView):
    """DBのパーティー情報を編集するクラス"""

    def put(self, request):
        logger = logging.getLogger(__name__)
        logger.info("party_edit/")

        # requestで受け取っている情報を取得
        party_id = request.GET.get("id")
        req_party_name = request.GET.get("partyName")

        # 先にIDで引っかかるパーティー情報を取得
        party_info = MstParty.objects.filter(id=party_id)

        # パーティー情報からパーティー名を取得
        res_party_name = party_info[0]

        # 同時に更新を行う為、バトル戦績テーブルの情報を取得
        battle_record_info = MstBattleRecord.objects.filter(party_name=res_party_name)

        # パーティー情報でフィルターをかけて再取得
        partys = MstParty.objects.filter(party_name=res_party_name)

        # リクエストで受け取った情報でバトル戦績テーブルを更新
        for battle_record in battle_record_info:
            battle_record.party_name = req_party_name
            battle_record.save()

        # リクエストで受け取った情報でパーティーテーブルを更新
        for party in partys:
            party.party_name = req_party_name
            party.save()

        # DB情報を更新するだけだから空のレスポンスを返却する
        return create_response(
            response_body="",
            result_code="0",
            messages=""
        )
