# FE用

## 前提
- JS/Reactにて実装


## 各階層の説明
- node_modules
    - `npm install`にてインストールされたライブラリの一覧を格納している
- public
    - `npm start`にてブラウザが起動される際に読みこまれる親ファイル(`index.html`)を格納している
- src
    - 全体的に使用するソースコードを格納している。更に細分化できる機能は機能ごとに更に以下階層に分割している
        - components
            - ページごとにコンポーネントファイルを一元管理するために格納している
        - css
            - `.css`ファイルを一元管理するために格納している
        - logic
            - プロジェクトとして使用する機能のロジック部分を格納している(ルーティングロジックなど)


## 各フロー
### ①npm サーバー起動方法
```
# 1.Reactのサーバーを起動させる
$ cd /home/th/project/todoApp/web
$ npm start
```


### ②各URLへアクセス
- TOP
    - http://localhost:3000/top
- NOT FOUND
    - http://localhost:3000/{上記以外のアドレス全て}


## 備考
なし
