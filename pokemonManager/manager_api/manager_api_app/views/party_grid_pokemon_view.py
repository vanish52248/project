"""グリッド毎ポケモン情報取得のビュー"""
import logging
from django.db.models import Q

from rest_framework.views import APIView

from manager_api_app.common.response_util import create_response
from manager_api_app.models.mst_pokemon import MstPokemon


class PartyGridView(APIView):
    """グリッド毎ポケモン情報取得のビュー"""

    def get(self, request):
        logger = logging.getLogger(__name__)
        logger.info("manager/party_grid/")

        # GETのaxiosの第一引数のパラメータ(pokemon_name)をAPI側で受け取る場合->requests.GET.get()
        # print(f"request------>{request.GET}")

        # FEから受け取ったindexでどのデータで検索するかを動的に判定する処理
        query = Q()
        if int(request.GET.get('index')) == 0:
            query |= Q(poke_name=request.GET.get('pokemon_name1'))
        elif int(request.GET.get('index')) == 1:
            query |= Q(poke_name=request.GET.get('pokemon_name2'))
        elif int(request.GET.get('index')) == 2:
            query |= Q(poke_name=request.GET.get('pokemon_name3'))
        elif int(request.GET.get('index')) == 3:
            query |= Q(poke_name=request.GET.get('pokemon_name4'))
        elif int(request.GET.get('index')) == 4:
            query |= Q(poke_name=request.GET.get('pokemon_name5'))
        elif int(request.GET.get('index')) == 5:
            query |= Q(poke_name=request.GET.get('pokemon_name6'))

        result_data = MstPokemon.objects.filter(
            # GETのaxiosの第一引数のパラメータ(pokemon_name)をAPI側で受け取る場合->requests.GET.get()
            # POSTのaxiosの第一引数のパラメータ(pokemon_name)をAPI側で受け取る場合->requests.POST.get()
            # request.GET/requests.POSTの中でkeyErrorにならない様にget()で取得
            query, delete_flag=0,
        ).values()

        # print(f"result_data:{result_data}")

        return create_response(
            response_body=result_data,
            result_code="0",
            messages=""
        )
