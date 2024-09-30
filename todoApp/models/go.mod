// module => 他パッケージからインポートされる際にimport文として記載されるディレクトリ名となる
// 一意なモジュール名が良い ex) 大体 github.com/アカウント名/プロジェクト名/hoge
module local.package/models

go 1.21.4

require gorm.io/gorm v1.25.12

require (
	github.com/jinzhu/inflection v1.0.0 // indirect
	github.com/jinzhu/now v1.1.5 // indirect
	golang.org/x/text v0.14.0 // indirect
)
