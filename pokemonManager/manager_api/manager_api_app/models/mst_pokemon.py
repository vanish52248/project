from django.db import models


class MstPokemon(models.Model):
    """
    ポケモンのモデル
    """
    id = models.AutoField(primary_key=True)
    poke_name = models.CharField(
        max_length=256,
        verbose_name="ポケモン名",
        null=False,
        blank=False,
        unique=True,
    )
    level = models.IntegerField(
        verbose_name="レベル",
        null=True,
        blank=True,
    )
    personality = models.CharField(
        verbose_name="性格",
        max_length=20,
        null=True,
        blank=True,
    )
    identity = models.CharField(
        verbose_name="個性",
        max_length=30,
        null=True,
        blank=True,
    )
    item = models.CharField(
        verbose_name="持ち物",
        max_length=30,
        null=True,
        blank=True,
    )
    hp = models.IntegerField(
        verbose_name="HP",
        null=True,
        blank=True,
    )
    attack = models.IntegerField(
        verbose_name="攻撃",
        null=True,
        blank=True,
    )
    defence = models.IntegerField(
        verbose_name="防御",
        null=True,
        blank=True,
    )
    special_attack = models.IntegerField(
        verbose_name="特殊攻撃",
        null=True,
        blank=True,
    )
    special_defence = models.IntegerField(
        verbose_name="特殊防御",
        null=True,
        blank=True,
    )
    speed = models.IntegerField(
        verbose_name="素早さ",
        null=True,
        blank=True,
    )
    hp_effort = models.IntegerField(
        verbose_name="HP努力値",
        null=True,
        blank=True,
    )
    attack_effort = models.IntegerField(
        verbose_name="攻撃努力値",
        null=True,
        blank=True,
    )
    defence_effort = models.IntegerField(
        verbose_name="防御努力値",
        null=True,
        blank=True,
    )
    special_attack_effort = models.IntegerField(
        verbose_name="特殊攻撃努力値",
        null=True,
        blank=True,
    )
    special_defence_effort = models.IntegerField(
        verbose_name="特殊防御努力値",
        null=True,
        blank=True,
    )
    speed_effort = models.IntegerField(
        verbose_name="素早さ努力値",
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
        verbose_name = ("ポケモンの登録")
        # テーブル名を下記にリネーム
        db_table = 'pokemon'

    # 管理サイト上での表示名をobject表記から任意のカラム名に変更する
    def __str__(self):
        return self.poke_name
