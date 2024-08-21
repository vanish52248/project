# テスト駆動開発

## テスト方法
```
# そのディレクトリにあるテストファイルがすべて読み込んで実行
$ go test -v
=== RUN   TestSum
=== RUN   TestSum/collections_of_any_size
--- PASS: TestSum (0.00s)
    --- PASS: TestSum/collections_of_any_size (0.00s)
=== RUN   TestSumAllTails
=== RUN   TestSumAllTails/make_the_sums_of_tails_of
=== RUN   TestSumAllTails/safely_sum_empty_slices
--- PASS: TestSumAllTails (0.00s)
    --- PASS: TestSumAllTails/make_the_sums_of_tails_of (0.00s)
    --- PASS: TestSumAllTails/safely_sum_empty_slices (0.00s)
PASS
ok      sandbox/project/testingProject/arrays_and_slices        0.001s


# カバレッジの確認
$ go test -cover
PASS
coverage: 100.0% of statements
ok      sandbox/project/testingProject/arrays_and_slices        0.001s
```
