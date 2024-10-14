"""アプリごとのルーティング設定"""
from django.urls import path, include
# import debug_toolbar
from manager_api_app.views import (
    party_register_view, pokemon_register_view, pokemon_list_view,
    party_list_view, party_grid_pokemon_view, party_name_pokemon_view,
    battle_record_register_view, battle_result_count_view,
    account_register_view, pokemon_selection_rate_view,
    pokemon_delete_view, pokemon_edit_view, battle_record_list_view,
    party_delete_view, party_edit_view, party_edit_pokemon_info_view,
    battle_record_delete_view, battle_record_edit_view,
)

urlpatterns = [
    # アカウント登録のルーティング
    path('account_register/',
         account_register_view.AccountRegisterView.as_view(),
         name='account_register'),
    # ポケモン登録のルーティング
    path('pokemon_register/',
         pokemon_register_view.PokemonRegisterView.as_view(),
         name='pokemon_register'),
    # ポケモン一覧取得のルーティング
    path('pokemon_list/', pokemon_list_view.PokemonListView.as_view(),
         name='pokemon_list'),
    # パーティー一覧取得のルーティング
    path('party_list/',
         party_list_view.PartyListView.as_view(), name='party_list'),
    # パーティー登録のルーティング
    path('party_register/', party_register_view.PartyRegisterView.as_view(),
         name='party_register'),
    # パーティー登録画面でのグリッド毎のポケモン情報取得のルーティング
    path('party_grid/', party_grid_pokemon_view.PartyGridView.as_view(),
         name='party_grid'),
    # 登録パーティー名でポケモン6匹を取得するルーティング
    path('party_name_pokemon/',
         party_name_pokemon_view.PartyNamePokemonView.as_view(),
         name='party_name_pokemon'),
    # バトル戦績一覧取得のルーティング
    path('battle_record_list/',
         battle_record_list_view.BattleRecordListView.as_view(),
         name='battle_record_list'),
    # バトル戦績登録のルーティング
    path('battle_record_register/',
         battle_record_register_view.BattleRecordRegisterView.as_view(),
         name='battle_record_register'),
    # バトル対戦結果取得計算のルーティング
    path('battle_result_count/',
         battle_result_count_view.BattleResultCountView.as_view(),
         name='battle_result_count'),
    # 自分と相手の選出したポケモン取得のルーティング
    path('select_pokemon_list/',
         pokemon_selection_rate_view.PokemonSelectionRateView.as_view(),
         name='pokemon_selection_rate_view'),
    # DBからポケモンを削除するルーティング
    path('pokemon_delete/',
         pokemon_delete_view.PokemonDeleteView.as_view(),
         name='pokemon_delete_view'),
    # DBのポケモン情報を編集するルーティング
    path('pokemon_edit/',
         pokemon_edit_view.PokemonEditView.as_view(),
         name='pokemon_edit_view'),
    # DBからパーティーを削除するルーティング
    path('party_delete/',
         party_delete_view.PartyDeleteView.as_view(),
         name='party_delete_view'),
    # DBのパーティー情報を編集するルーティング
    path('party_edit/',
         party_edit_view.PartyEditView.as_view(),
         name='party_edit_view'),
    # DBのパーティーのうちポケモン名を逆算して取得するルーティング
    path('party_edit_pokemon_info/',
         party_edit_pokemon_info_view.PartyEditPokemonInfoView.as_view(),
         name='party_edit_pokemon_info_view'),
    # DBからランクバトル戦績を削除するルーティング
    path('battle_record_delete/',
         battle_record_delete_view.BattleRecordDeleteView.as_view(),
         name='battle_record_delete_view'),
    # DBのランクバトル戦績情報を編集するルーティング
    path('battle_record_edit/',
         battle_record_edit_view.BattleRecordEditView.as_view(),
         name='battle_record_edit_view'),
]

# django-debug-toolbar用ルーティング
# '__debug__/'は他のURLに影響を及ぼさないならなんでも良い
# http://127.0.0.1:8000/manager_api_app/ にアクセスで確認できる(UIもAPIもDjangoで実装してるならこっち)
# if settings.DEBUG:
#     urlpatterns += [path('__debug__/', include(debug_toolbar.urls))]

# django-silk用ルーティング
# http://127.0.0.1:8000/manager_api_app/silk/ にアクセス後に
# 別タブでAPI取得するとSQLなどわかる(APIのみDjangoで実装してるならこっち)
urlpatterns += [path('silk/', include('silk.urls', namespace='silk'))]
