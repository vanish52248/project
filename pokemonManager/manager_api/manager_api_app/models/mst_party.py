from django.db import models
from manager_api_app.models.mst_pokemon import MstPokemon


class MstParty(models.Model):
    """
    パーティのモデル
    """
    id = models.AutoField(primary_key=True)
    party_name = models.CharField(
        max_length=256,
        verbose_name="パーティ名",
        null=False,
        blank=False,
    )
    poke_name = models.ForeignKey(
        MstPokemon,
        to_field='poke_name',
        verbose_name="ポケモン名",
        on_delete=models.CASCADE,
    )
    delete_flag = models.BooleanField(
        default=False,
        verbose_name="論理削除フラグ",
    )
    created_at = models.DateTimeField(
        auto_now_add=True,
        verbose_name="登録日時",
        null=True,
        blank=True,
    )
    updated_at = models.DateTimeField(
        auto_now=True,
        verbose_name="更新日時",
        null=True,
        blank=True,
    )

    # 下記必ずクラス内に配置するメタクラス
    class Meta:
        """テーブル定義のメタクラス"""
        verbose_name = ("パーティの登録")
        # テーブル名を下記にリネーム
        db_table = 'party'

    # 管理サイト上での表示名をobject表記から任意のカラム名に変更する
    def __str__(self):
        return self.party_name
