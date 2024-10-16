# BE用

## 前提
- Go/ginにて実装
- AWSのEC2上にデプロイすることとする
- 命名規則については[Golangでの命名規則におけるベストプラクティス](https://zenn.dev/kenghaya/articles/1b88417b1fa44d)を参照
- `go get`コマンドはgithubから新規に外部パッケージを利用する場合にのみ使用する(ginやgodotenvなど)
- GO PATHは使わずGo Modulesを採用

## デプロイ方法
1. AWSのEC2内のコンテナに接続(VSCodeのリモートSSHにて)
```
# Projectのディレクトリをクローンする
$ git clone {project}


# ここで各ディレクトリで`.gitignore`によって無視している`.env`ファイルを手動で配置する


# 
```


## 各階層の説明
- cmd
    - 実際にBEを動かすためのコマンドを叩く階層で`main.go`を格納している
- configs
    - `docker-compose.yaml`, `.env`といったプロジェクトの設定ファイル群を格納している
- pkg
    - 他パッケージから使用される実装を格納している
- web
    - FE実装群を格納している(`create-react-app`にて作成)


## 各フロー（①～⑥の順で実施することで動作確認が可能）
### ①Dockerコンテナ起動方法
```
# 1.compose.yamlが存在する階層でDockerを起動
$ cd /home/th/project/todoApp/configs
$ sudo service docker start

# 2.Dockerが起動されていることを確認
$ docker ps
CONTAINER ID   IMAGE     COMMAND   CREATED   STATUS    PORTS     NAMES
```

### ②DB起動方法
```
# 1.DBを起動する(compose.ymlが存在する階層で行う)
$ cd /home/th/project/todoApp/configs
$ docker compose up -d

# 2.DBが起動されていることを確認
$ docker compose ps
NAME       IMAGE         COMMAND                  SERVICE   CREATED         STATUS         PORTS
postgres   postgres:14   "docker-entrypoint.s…"   db        3 minutes ago   Up 3 minutes   0.0.0.0:5432->5432/tcp, :::5432->5432/tcp
```


### ③Goサーバー起動方法
```
$ cd /home/th/project/todoApp/cmd
$ go run .
```


### ④各API実行方法
#### 前提：`HeaderにはContent-Type= application/json`を含めること
#### 環境：API実行についてはVSCode内のThunderClientを使用してリクエストを行うこと
- GET-all(全件取得)
    - http://localhost:8080/get
    - パラメータなし

- GET-detail(1件取得)
    - http://localhost:8080/get/{DBに存在するID}
    - パラメータなし

- POST
    - http://localhost:8080/create
    - 以下パラメータをBody-JSONに設定
    ```
    {
        "title": "{追加したいタイトル}",
        "content": "{追加したい本文の内容}",
        "author": "{追加したい作成者の名前}"
    }
    ```

- PUT
    - http://localhost:8080/update/{DBに存在するID}
    - 以下パラメータをBody-JSONに設定
    ```
    {
        "title": "{更新したいタイトル}",
        "content": "{更新したい本文の内容}",
        "author": "{更新したい作成者の名前}"
    }
    ```

- DELETE
    - http://localhost:8080/delete/{DBに存在するID}
    - パラメータなし
    - `gorm`の仕様上 論理削除となっている為、物理削除を行う場合は以下Dockerコンテナ内のpostgreSQLにアクセスしDELETE構文を叩く必要がある


### ⑤Dockerコンテナ内のDBの中身確認方法
```
# 1.コンテナIDの確認
$ cd /home/th/project/todoApp/configs
$ docker compose ps
CONTAINER ID   IMAGE         COMMAND                  CREATED        STATUS         PORTS                                       NAMES
d666c7bc3784   postgres:14   "docker-entrypoint.s…"   32 hours ago   Up 5 seconds   0.0.0.0:5432->5432/tcp, :::5432->5432/tcp   postgres

# 2.コンテナ内へ入る
$ docker exec -it {コンテナID} sh

# 3.postgres内へ入る
# psql -U postgres
postgres=# 

# 4.各種SELECTや以下コマンド叩いて確認する
# テーブル一覧の表示
postgres=# \dt;

# テーブル構造の表示
postgres=# \d {テーブル名};

# レコードの削除
postgres=# DELETE FROM {テーブル名} WHERE ID = {id};

# テーブル削除
postgres=# DROP TABLE {テーブル名};

# 5.postgreから抜ける
\q

# 6.コンテナから抜ける
exit
or
ctrl + d
```


### ⑥Dockerコンテナ停止方法
```
# 1.コンテナIDの確認
$ cd /home/th/project/todoApp/configs
$ docker compose ps
CONTAINER ID   IMAGE         COMMAND                  CREATED        STATUS         PORTS                                       NAMES
d666c7bc3784   postgres:14   "docker-entrypoint.s…"   32 hours ago   Up 5 seconds   0.0.0.0:5432->5432/tcp, :::5432->5432/tcp   postgres

# 2.コンテナの停止
$ cd /home/th/project/todoApp/configs
$ docker stop {コンテナID}
```

### Docker各操作
```
# Container内部に入る
$ docker exec -it {CONTAINER ID} sh

# Dockerfileを編集してビルドしなおしつつすべのコンテナを起動したい時
$ docker compose up --build -d

# 全てのコンテナの起動のみ
$ docker compose up -d

# 全ての既存コンテナの起動と停止(2回目以降の作業をするときなど)
$ docker compose start
$ docker compose stop

# 全てのコンテナの情報を削除する時
$ docker compose down

# 現在の起動済みコンテナを確認(起動してないコンテナもすべて確認する場合は末尾に"-a"を付与)
$ docker ps

# docker composeにて発生した全てのコンテナのエラーをまとめてログで確認する
$ docker compose logs

# docker psで立ち上がっているコンテナのログを個別で確認する
$ docker logs {CONTAINER ID}

# 現在、Dockerが使用しているディスク容量を確認
$ docker system df

# イメージ削除
$ docker images
$ docker rmi -f {image id}

# 未使用イメージ全削除
# docker rmi `docker images -q`

# 使用してないコンテナの削除
$ docker rm `docker ps -a -q`

# docker ビルド時のキャッシュ削除（イメージも消える）
$ docker builder prune -a
```


### 自作のパッケージを読み込む場合
[動かして覚えるGoのモジュールの使い方
](https://qiita.com/Rqixy/items/b906fcb54cf162427775)を参照して読みこんでいる


## 備考
### 読み方
- go mod tidy = ごー もっど たいでぃ
