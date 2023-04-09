# コマンドラインでのspring-bootの起動方法①

1. mvnwが存在するディレクトリへと移動する
```
cd ~/project/todo/api/
```


2. mvnwパッケージを作成する
```
./mvnw package

省略
.
.
.
[INFO] Replacing main artifact /home/th/project/todo/api/target/api-0.0.1-SNAPSHOT.jar with repackaged archive, adding nested dependencies in BOOT-INF/.
[INFO] The original artifact has been renamed to /home/th/project/todo/api/target/api-0.0.1-SNAPSHOT.jar.original
[INFO] ------------------------------------------------------------------------
[INFO] BUILD SUCCESS
[INFO] ------------------------------------------------------------------------
[INFO] Total time:  01:08 min
[INFO] Finished at: 2023-04-09T23:43:30+09:00
[INFO] ------------------------------------------------------------------------
th@L-Windows:~/project/todo/api$ cd target/
th@L-Windows:~/project/todo/api/target$ java -jar api-0.0.1-SNAPSHOT.jar 
api-0.0.1-SNAPSHOT.jar           generated-sources/               maven-status/                    
api-0.0.1-SNAPSHOT.jar.original  generated-test-sources/          surefire-reports/                
classes/                         maven-archiver/                  test-classes/                    
th@L-Windows:~/project/todo/api/target$ java -jar api-0.0.1-SNAPSHOT.jar 

# /project/todo/api/target配下にapi-0.0.1-SNAPSHOT.jar ファイルが作成される
```


3. ビルドされたtargetディレクトリへと移動する
```
cd target
```

4. jarファイルを実行することでSpring-bootを実行する
```
java -jar api-0.0.1-SNAPSHOT.jar
```

# コマンドラインでのspring-bootの起動方法②

1. mvnwが存在するディレクトリへと移動する
```
cd ~/project/todo/api/
```

2. mvnプラグインを使用してSpring-bootを実行する
```
mvn spring-boot:run
```
