-- アプリケーションが立ち上がった時に初期化SQLを実行し、テーブル作成を行う

-- 親テーブルと子テーブルが存在するなら削除
DROP TABLE IF EXISTS person;
DROP TABLE IF EXISTS task;

-- 親テーブル作成
CREATE TABLE person(
person_id int primary key auto_increment,
name varchar(16)
);

-- 子テーブル作成
CREATE TABLE task(
task_id int auto_increment primary key,
person_id int,
name VARCHAR(32),
description VARCHAR(64),
FOREIGN KEY (person_id) REFERENCES person (person_id)
);
