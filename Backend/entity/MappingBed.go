package entity

import(

	"gorm.io/gorm"
	"time"
)

type Zone struct{
	gorm.Model
	Zone_Name string
	Beds []Bed `gorm:"ForeignKey:Zone_ID"`
}

type Bed struct{
	gorm.Model
	Bed_Name string
	Bed_State int
	Zone_ID   *uint
	Zone Zone `gorm:"references:id"`
	Map_Bed []Map_Bed `gorm:"ForeignKey:Bed_ID"`
}

type Map_Bed struct{
	gorm.Model
	// Triage_ID ทำหน้าที่เป็น FK
	Triage_ID 		*uint
	Triage 		Triage	`gorm:"references:id"`
	Admidtime		time.Time
	// Bed_ID ทำหน้าที่เป็น FK
	Bed_ID 		*uint
	Bed    		Bed		 `gorm:"references:id"`
	MapBed_Comment	string
	// User_ID ทำหน้าที่เป็น FK
	User_ID 		*uint
	User    		User 		`gorm:"references:id"`

}

