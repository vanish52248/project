"""ポケモン登録のシリアライザ"""
from rest_framework import serializers
from manager_api_app.models.mst_pokemon import MstPokemon


class PokemonSerializer(serializers.ModelSerializer):
    """ポケモン登録のシリアライザ"""
    class Meta:
        model = MstPokemon
        fields = ["poke_name"]
        extra_kwargs = {'poke_name': {'required': True}}

        # エラーメッセージ
        message = ""

    def validate_pokename(self, data):
        """ポケモンの名前を必須パラメータにする"""
        if data is None:
            # UIでスナックバーに表示するメッセージ
            message = "ポケモンの名前を入力しないと登録できません。"
            # TODO 全てのパラメータが一致するポケモンは登録できないようにシリアライズ
            raise serializers.ValidationError({"error_message": message})

    def validate_unique_pokename(self, data):
        """ポケモン名が一意なのかチェックする"""
        pokemon_record = MstPokemon.objects.filter(poke_name=data).count()
        if pokemon_record > 0:
            # UIでスナックバーに表示するメッセージ
            message = f"ポケモン名 {data} は既に登録されています。"
            raise serializers.ValidationError({"error_message": message})
