
package entity

import(

	"gorm.io/gorm"
	//"time"
)

type User struct {
	gorm.Model
	Name     string
	Email    string `gorm:"uniqueIndex"`
	Password string `json:"-"`
	// // 1 user เป็นเจ้าของได้หลาย video
	Map_Bed []Map_Bed `gorm:"ForeignKey:User_ID"`

	// // 1 user เป็นเจ้าของได้หลาย playlist
	// Playlists []Playlist `gorm:"foreignKey:OwnerID"`
}