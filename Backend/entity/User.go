package entity

import (
	"gorm.io/gorm"
	//"time"
)

type User struct {
	gorm.Model
	Name        string
	Email       string `gorm:"uniqueIndex"`
	Password    string `json:"-"`
	UserType_ID *uint
	UserType    UserType `gorm:"references:id"`

	Patient []Patient `gorm:"ForeignKey:User_ID"`
	Triage  []Triage  `gorm:"ForeignKey:User_ID"`
	Map_Bed []Map_Bed `gorm:"ForeignKey:User_ID"`
	Symptom []Symptom `gorm:"ForeignKey:CheckID"`
	BASKET  []BASKET  `gorm:"ForeignKey:User_ID"`
	Manage  []Manage `gorm:"ForeignKey:User_ID"`
}

type UserType struct {
	gorm.Model
	UserType string
	User     []User `gorm:"ForeignKey:UserType_ID"`
}
