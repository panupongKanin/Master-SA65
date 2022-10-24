package entity

import(
	"gorm.io/gorm"
	"time"
)

type Level struct{
	gorm.Model
	Level_name				string
	Symptoms				[]Symptom		`gorm:"foreignKey:LevelID"`
}

type Symptom struct{
	gorm.Model
	Check_date				time.Time
	Temperature				uint
	Pressure				uint
	Heart_rate				uint
	Comment					string
	Medicine				string
	
	// CheckID ทำหน้าที่เป็น FK
	CheckID					*uint
	// เป็นข้อมูล User เมื่อ join ตาราง
	Check					User

	// LevelID ทำหน้าที่เป็น FK
	LevelID					*uint
	// เป็นข้อมูล Level เมื่อ join ตาราง
	Level					Level
	
	// MapbID ทำหน้าที่เป็น FK
	MapbID					*uint
	// เป็นข้อมูล Map_Bed เมื่อ join ตาราง
	Mapb					Map_Bed
}

