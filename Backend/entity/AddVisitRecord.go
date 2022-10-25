package entity

import (
	"time"

	"gorm.io/gorm"
)

type VisitorType struct {
	gorm.Model
	Name string

	VisitRecords []VisitRecord `gorm:"foreignKey:VisitorTypeID"`
}

type VisitRecord struct {
	gorm.Model
	//VisitorType FK
	VisitorTypeID *uint
	VisitorType   VisitorType `gorm:"references:id"`

	//Map_Bed FK
	Map_BedID *uint
	Map_Bed   Map_Bed `gorm:"references:id"`

	//User FK
	UserID *uint
	User   User `gorm:"references:id"`

	Added_Time      time.Time
	Visitor_Name    string
	Visitor_Contact string
}
