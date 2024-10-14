"""自分と相手が選出したポケモンのビュー"""
import json
import logging

from rest_framework.views import APIView

from manager_api_app.common.response_util import create_response
from manager_api_app.models.mst_battle_record import MstBattleRecord


class PokemonSelectionRateView(APIView):
    """自分と相手が選出したポケモンのビュー"""

    def get(self, request):
        logger = logging.getLogger(__name__)
        logger.info("manager/pokemon_selection_rate/")

        # 最初に空のクエリセットを用意
        query = MstBattleRecord.objects.none()

        # 選出したポケモンを選択している際の処理
        if "select_pokemon" in request.GET:
            # GUI上で自分の手持ちからチェックを入れたポケモンの内Trueのみリストに格納する
            my_choice_pokemon_list = []
            # 文字列型からdict型に型変換するときはjson.loads()で囲うとキャストされる
            for key, value in json.loads(
                request.GET["select_pokemon"]
            ).items():
                if value:
                    my_choice_pokemon_list.append(key)
            for i in my_choice_pokemon_list:
                # ループごとパーティー名と選出したポケモンで登録されているレコードを取得
                query |= MstBattleRecord.objects.filter(
                    party_name=request.GET.get("party_name"),
                    # joinしないと[]内のカンマが不要でエラーが出る
                    my_pokemon=("").join(i),
                ).values()
        # 選出したポケモンを選択していない場合の処理(パーティー選択時)
        else:
            # パーティー名で登録されている戦績レコードを取得してマージしていく
            query |= MstBattleRecord.objects.filter(
                party_name=request.GET.get("party_name"),
            ).values()

        # 最後に返却値に最終マージする
        result_data = query

        return create_response(
            response_body=result_data,
            result_code="0",
            messages=""
        )
