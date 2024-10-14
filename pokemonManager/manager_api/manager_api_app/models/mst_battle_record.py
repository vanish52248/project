from django.db import models
from django_mysql.models import ListCharField


class MstBattleRecord(models.Model):
    """
    バトル戦績のモデル
    """
    id = models.AutoField(primary_key=True)
    rank = models.CharField(
        max_length=16,
        verbose_name="ランク",
        null=True,
        blank=True,
    )

    party_name = models.CharField(
        max_length=256,
        verbose_name="パーティ名",
        null=False,
        blank=False,
    )

    # 6匹の手持ちの内3匹チェックを入れたポケモンをすべて格納する配列のカラム(モデル)
    # 例）[ポッポ, ピジョン, ピジョット]
    my_pokemon = ListCharField(
        models.CharField(
            max_length=10
        ),
        size=3,
        max_length=(3 * 16),
        verbose_name="対戦時の自分ポケモン",
        null=True,
        blank=True,
    )
    # 3匹のポケモンをすべて格納する配列のカラム(モデル)
    # 例）[ポッポ, ピジョン, ピジョット]
    enemy_pokemon = ListCharField(
        models.CharField(
            max_length=10
        ),
        size=3,
        max_length=(3 * 16),
        verbose_name="対戦時の相手ポケモン",
        null=True,
        blank=True,
    )
    result = models.CharField(
        max_length=16,
        verbose_name="対戦結果",
        null=True,
        blank=True,
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
        verbose_name = ("バトル戦績の登録")
        # テーブル名を下記にリネーム
        db_table = 'battle_record'

    # 管理サイト上での表示名をobject表記から任意のカラム名に変更する
    def __str__(self):
        return str(self.my_pokemon)
