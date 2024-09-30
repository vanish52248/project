// module => 他パッケージからインポートされる際にimport文として記載されるディレクトリ名となる
// 一意なモジュール名が良い ex) 大体 github.com/アカウント名/プロジェクト名/hoge
module local.package/pkg

go 1.21.4

// replaceの記載はimportする側（今回は"models/"をインポートして使いたい）に記載する
// 自作のpackageをimportする際にローカルパスから参照する様に変更する為に必要
// → go mod tidy を叩くディレクトリから見た相対パスで記載
// replace hogehoge の部分の記載先はインポートしたいディレクトリ(今回は"models/")の"module"部分を全て記載する
replace local.package/models => ../models

require (
	github.com/joho/godotenv v1.5.1
	gorm.io/gorm v1.25.12
	// replaceしたmodelsのディレクトリの相対パス（go mod tidy を行うと自動で記載される）
	local.package/models v0.0.0-00010101000000-000000000000
)

require (
	github.com/bytedance/sonic v1.11.6 // indirect
	github.com/bytedance/sonic/loader v0.1.1 // indirect
	github.com/cloudwego/base64x v0.1.4 // indirect
	github.com/cloudwego/iasm v0.2.0 // indirect
	github.com/gabriel-vasile/mimetype v1.4.3 // indirect
	github.com/gin-contrib/sse v0.1.0 // indirect
	github.com/go-playground/locales v0.14.1 // indirect
	github.com/go-playground/universal-translator v0.18.1 // indirect
	github.com/go-playground/validator/v10 v10.20.0 // indirect
	github.com/goccy/go-json v0.10.2 // indirect
	github.com/jackc/pgpassfile v1.0.0 // indirect
	github.com/jackc/pgservicefile v0.0.0-20221227161230-091c0ba34f0a // indirect
	github.com/jackc/pgx/v5 v5.5.5 // indirect
	github.com/jackc/puddle/v2 v2.2.1 // indirect
	github.com/json-iterator/go v1.1.12 // indirect
	github.com/klauspost/cpuid/v2 v2.2.7 // indirect
	github.com/kr/text v0.2.0 // indirect
	github.com/leodido/go-urn v1.4.0 // indirect
	github.com/mattn/go-isatty v0.0.20 // indirect
	github.com/modern-go/concurrent v0.0.0-20180306012644-bacd9c7ef1dd // indirect
	github.com/modern-go/reflect2 v1.0.2 // indirect
	github.com/pelletier/go-toml/v2 v2.2.2 // indirect
	github.com/rogpeppe/go-internal v1.12.0 // indirect
	github.com/twitchyliquid64/golang-asm v0.15.1 // indirect
	github.com/ugorji/go/codec v1.2.12 // indirect
	golang.org/x/arch v0.8.0 // indirect
	golang.org/x/crypto v0.23.0 // indirect
	golang.org/x/net v0.25.0 // indirect
	golang.org/x/sync v0.1.0 // indirect
	golang.org/x/sys v0.20.0 // indirect
	google.golang.org/protobuf v1.34.1 // indirect
	gopkg.in/yaml.v3 v3.0.1 // indirect
)

require (
	github.com/gin-gonic/gin v1.10.0
	github.com/jinzhu/inflection v1.0.0 // indirect
	github.com/jinzhu/now v1.1.5 // indirect
	golang.org/x/text v0.15.0 // indirect
	gorm.io/driver/postgres v1.5.9
)
