"""バトル戦績登録のシリアライザ"""
from rest_framework import serializers
from manager_api_app.models.mst_party import MstParty
from manager_api_app.models.mst_battle_record import MstBattleRecord


class BattleRecordSerializer(serializers.ModelSerializer):
    """バトル戦績登録のシリアライザ"""
    class Meta:
        model = MstBattleRecord()
        fields = ["my_pokemon", "enemy_pokemon"]
        extra_kwargs = {
                        'my_pokemon': {'required': True},
                        'enemy_pokemon': {'required': True},
                    }

        # エラーメッセージ
        message = ""

    def validate_choice_my_pokemon_blank(self, data):
        """自分の選択ポケモンを必須パラメータにする"""
        if len(data) == 0:
            # UIでスナックバーに表示するメッセージ
            message = "対戦に参加した自分のポケモンを最低1匹は登録して下さい。"
            raise serializers.ValidationError({"error_message": message})

    def validate_choice_enemy_pokemon_blank(self, data):
        """相手の選択ポケモンを必須パラメータにする"""
        if (data[0] is None) and (data[1] is None) and (data[2] is None):
            # UIでスナックバーに表示するメッセージ
            message = "対戦に参加した相手のポケモンを最低1匹は登録して下さい。"
            raise serializers.ValidationError({"error_message": message})

    def validate_choice_three_lte_my_pokemon(self, data):
        """選択ポケモンを3匹以下にする"""
        if len(data) > 3:
            # UIでスナックバーに表示するメッセージ
            message = "対戦に参加した自分のポケモンは3匹以下です。"
            raise serializers.ValidationError({"error_message": message})

    def validate_choice_unique_enemy_pokemon(self, data_lst):
        """相手パーティーの同名ポケモン登録をなくすようにシリアライズ"""
        enemy_unique_lst = []
        for data in data_lst:
            if data:
                if data not in enemy_unique_lst:
                    enemy_unique_lst.append(data)
                else:
                    # UIでスナックバーに表示するメッセージ
                    message = "ランクバトル戦績に同名の相手ポケモンは登録できません。"
                    raise serializers.ValidationError({"error_message": message})

    # def validate_input_pokemon_format(self, my_pokemon, party_name):
    #     """
    #     battle_record_edit_viewでのみ使用するバリデーション
    #     自分選出パーティーをパーティー内で登録されているポケモンのみ許容する
    #     """
    #     my_pokemon_lst = my_pokemon and my_pokemon

    #     if my_pokemon_lst is not None:
    #         # パーティー名を取得
    #         party_name = MstParty.objects.filter(party_name=party_name).values()
    #         print(f"party_name: {party_name}")

    #         pokemon_list = []
    #         for result_data in party_name:
    #             pokemon_list.append(result_data["poke_name_id"])

    #         print(f"pokemon_list: {pokemon_list}")

    #         for my_pokemon in my_pokemon_lst:
    #             if my_pokemon not in pokemon_list:
    #                 # UIでスナックバーに表示するメッセージ
    #                 message = f"パーティーに存在しないポケモンを登録できません。\
    #                     {pokemon_list} の中から選択してください。"
    #                 raise serializers.ValidationError({"error_message": message})
