package entity

import (
	"gorm.io/gorm"
	"time"
)

type Nutrition struct {
	gorm.Model
	Type    string `gorm:"uniqueIndex"`
	Receive int
	Detail  string

	Manage []Manage `gorm:"foreignKey:NutritionID"`
}

type Manage struct {
	gorm.Model

	User_ID *uint
	User    User `gorm:"references:id"`
	// Doctor Doctor `gorm:"references:id"`

	NutritionID *uint
	Nutrition   Nutrition `gorm:"references:id"`

	Map_BedID *uint
	Map_Bed   Map_Bed `gorm:"references:id"`

	Date    time.Time
	Comment string
}
