package main

import (
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
)

// albumはレコードのアルバムに関するデータを表します
type album struct {
	ID     string  `json:"id"`
	Title  string  `json: "title"`
	Artist string  `json: "artist"`
	Price  float64 `json: "price"`
}

// レコードのアルバムのデータの素となるスライス`albums`
var albums = []album{
	{ID: "1", Title: "Blue Train", Artist: "John Clotrane", Price: 56.99},
	{ID: "2", Title: "Jeru", Artist: "Gerry Mulligan", Price: 17.99},
	{ID: "3", Title: "Sarah Vaughan and clifford Brown", Artist: "Sarah Vaughan", Price: 39.99},
}

func main() {
	router := gin.Default()
	router.GET("/albums", getAlbums)
	router.GET("/albums/get/:id", getAlbumByID)
	router.POST("/albums", postAlbums)
	router.POST("/albums/edit", editAlbumsByID)
	router.POST("/albums/delete", deleteAlbumsByID)
	router.Run("localhost:8080")
}

// getAlbumsはJSON形式のすべてのアルバムのリストを返します
func getAlbums(c *gin.Context) {
	c.IndentedJSON(http.StatusOK, albums)
}

// postAlbumsはリクエストボディのJSONからアルバムを追加します
func postAlbums(c *gin.Context) {
	var newAlbum album

	//　受け取ったJSONを'newAlbum'にバインドするために`BindJSON`を呼び出すpostAlbums
	if err := c.BindJSON(&newAlbum); err != nil {
		return
	}

	// スライスへ新しいアルバムを追加する
	albums = append(albums, newAlbum)
	c.IndentedJSON(http.StatusCreated, newAlbum)
}

// `getAlbumByID`は`id`にマッチするIDを持つアルバムの場所を取得します。
// クライアントからパラメタが送られたら、レスポンスとしてアルバムを返します。
func getAlbumByID(c *gin.Context) {
	id := c.Param("id")

	// IDの値とマッチするパラメタをもつアルバムを探すために
	// リストのアルバムをループします.
	for _, a := range albums {
		if a.ID == id {
			c.IndentedJSON(http.StatusOK, a)
			return
		}
	}
	c.IndentedJSON(http.StatusNotFound, gin.H{"message": "album not found"})
}

// `editAlbumByID`は`id`にマッチするIDを持つアルバムを削除します。
// クライアントからパラメタが送られたら、レスポンスとしてアルバムを返します。
func editAlbumsByID(c *gin.Context) {
	id := c.Param("id")

	for i, a := range albums {
		if a.ID == id {
			albums = append(albums[:i], albums[i+1:]...) // 削除部分
			c.IndentedJSON(http.StatusOK, a)
			return
		}
	}
	c.IndentedJSON(http.StatusNotFound, gin.H{"message": "Item not found"})
}

// `deleteAlbumByID`は`id`にマッチするIDを持つアルバムを削除します。
// クライアントからパラメタが送られたら、レスポンスとしてアルバムを返します。
func deleteAlbumsByID(c *gin.Context) {
	log.Print("=============aaaaaaaaaaaaa==============")
	id := c.Param("id")

	for i, a := range albums {
		if a.ID == id {
			albums = append(albums[:i], albums[i+1:]...) // 削除部分
			c.IndentedJSON(http.StatusOK, a)
			return
		}
	}
	c.IndentedJSON(http.StatusNotFound, gin.H{"message": "Item not found"})
}
