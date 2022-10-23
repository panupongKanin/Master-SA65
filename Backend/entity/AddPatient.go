package entity

import (
	"time"
	"gorm.io/gorm"
)

type Gender struct {
	gorm.Model
	Gender_Name string

	// เพศ 1 เพศ เป็นของผู้ป่วยในได้ หลายคน
	Patient []Patient `gorm:"foreignKey:GenderID"`
}

type Blood_type struct {
	gorm.Model
	Blood_Name string
	// หมู่เลือด 1 ประเภท เป็นของผู้ป่วยในได้ หลายคน
	Patient []Patient `gorm:"foreignKey:Blood_typeID"`
}

type Drug_Allergy struct {
	gorm.Model
	Drug_Name  string
	Drug_Group string
	// ยา 1 ตัว เป็นของผู้ป่วยในได้ หลายคน
	Patient []Patient `gorm:"foreignKey:Drug_AllergyID"`
}

type RIGHTS struct {
	gorm.Model
	RIGHTS_Name string
	// สิทธิการรักษา 1 สิทธิ์ เป็นของผู้ป่วยในได้ หลายคน
	Patient []Patient `gorm:"foreignKey:RIGHTSID"`
}

// type TEST struct {
// 	gorm.Model
// 	TEST_Name string
//}

type Patient struct {
	gorm.Model
	ID_Card        string 	`gorm:"uniqueIndex"`
	Patient_Name   string
	Date_of_Birth  time.Time
	UserID         *uint	`gorm:"references:id"`
	User           User	
	GenderID       *uint
	Gender         Gender	`gorm:"references:id"`
	Blood_typeID   *uint
	Blood_type     Blood_type	`gorm:"references:id"`
	Drug_AllergyID *uint
	Drug_Allergy   Drug_Allergy	`gorm:"references:id"`
	RIGHTSID       *uint
	RIGHTS         RIGHTS		`gorm:"references:id"`
	Addess         string
	Other          string
}