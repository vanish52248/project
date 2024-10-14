from django.contrib import admin

from .models.mst_battle_record import MstBattleRecord
from .models.mst_party import MstParty
from .models.mst_pokemon import MstPokemon


# 管理サイト情報
admin.site.register(MstBattleRecord)
admin.site.register(MstParty)
admin.site.register(MstPokemon)
