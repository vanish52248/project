# プロジェクト概要

# ①Dockerコンテナ起動方法
```
# 1.ルートディレクトリでDockerを起動
$ sudo service docker start

# 2.Dockerが起動されていることを確認
$ docker ps
CONTAINER ID   IMAGE     COMMAND   CREATED   STATUS    PORTS     NAMES
```

## ②DB起動方法
```
# 1.DBを起動する(docker-compose.ymlが存在する階層で行う)
$ docker compose up -d

# 2.DBが起動されていることを確認
$ docker compose ps
NAME       IMAGE         COMMAND                  SERVICE   CREATED         STATUS         PORTS
postgres   postgres:14   "docker-entrypoint.s…"   db        3 minutes ago   Up 3 minutes   0.0.0.0:5432->5432/tcp, :::5432->5432/tcp
```

## ③API実行方法
```
# 1.Goのサーバーを起動させる
$ go run .

# 2.API実行についてはVSCode内のThunderClientを使用してリクエストを行う
```

## ④DBの中身確認方法
```
# 1.コンテナIDの確認
$ docker compose ps
CONTAINER ID   IMAGE         COMMAND                  CREATED        STATUS         PORTS                                       NAMES
d666c7bc3784   postgres:14   "docker-entrypoint.s…"   32 hours ago   Up 5 seconds   0.0.0.0:5432->5432/tcp, :::5432->5432/tcp   postgres

# 2.コンテナ内へ入る
$ docker exec -it {コンテナID} sh

# 3.postgres内へ入る
$ psql -U postgres
postgres=# 

# 4.各種SELECTや以下コマンド叩いて確認する
# テーブル一覧の表示
postgres=# \dt;

# テーブル構造の表示
postgres=# \d {テーブル名};
```

## ⑤Dockerコンテナ停止方法
```
# 1.コンテナIDの確認
$ docker compose ps
CONTAINER ID   IMAGE         COMMAND                  CREATED        STATUS         PORTS                                       NAMES
d666c7bc3784   postgres:14   "docker-entrypoint.s…"   32 hours ago   Up 5 seconds   0.0.0.0:5432->5432/tcp, :::5432->5432/tcp   postgres

# 2.コンテナの停止
$ docker stop {コンテナID}
```
