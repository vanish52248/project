"""パーティ登録のシリアライザ"""
from rest_framework import serializers
from manager_api_app.models.mst_party import MstParty


class PartySerializer(serializers.ModelSerializer):
    """パーティ登録のシリアライザ"""
    class Meta:
        model = MstParty
        fields = ["party_name"]
        extra_kwargs = {'party_name': {'required': True}}

        # エラーメッセージ
        message = ""

    def validate_party_name_blank(self, data):
        """パーティーの名前を必須パラメータにする"""
        if data is None:
            # UIでスナックバーに表示するメッセージ
            message = "パーティーの名前を入力しないと登録できません。"
            raise serializers.ValidationError({"error_message": message})

    def validate_party_name_same(self, data):
        """パーティーの名前を一意のパラメータにする"""
        obj = MstParty.objects.filter(party_name=data)
        if obj:
            # UIでスナックバーに表示するメッセージ
            message = "パーティーの名前が既に登録済みなので登録できません。"
            raise serializers.ValidationError({"error_message": message})

    def validate_party_pokemon_unique(self, data_lst):
        """ポケモン重複登録を防ぐ"""
        judge_unique_lst = []
        for data in data_lst:
            if data not in judge_unique_lst:
                judge_unique_lst.append(data)
            else:
                # UIでスナックバーに表示するメッセージ
                message = "パーティーに同名のポケモンは登録できません。"
                raise serializers.ValidationError({"error_message": message})

    def validate_party_pokemon_blank(self, data):
        """ポケモン6匹を必須パラメータにする"""
        if data is None:
            # UIでスナックバーに表示するメッセージ
            message = "ポケモンが1匹でも未選択の場合登録できません。"
            raise serializers.ValidationError({"error_message": message})
