
package entity

import(

	"gorm.io/gorm"
	//"time"
)

type DiseaseType struct {
	gorm.Model
	DiseaseType_NAME string
	Disease []Disease `gorm:"ForeignKey:DiseaseType_ID"`
}

type Disease struct {
	gorm.Model
	Disease_NAME   string
	DiseaseType_ID *uint
	DiseaseType DiseaseType `gorm:"references:id"` //เพิ่ม `gorm:"references:id"`
	Triages []Triage `grom:"foreignKey:Disease_ID"`
}

type InpantientDepartment struct {
	gorm.Model
	InpantientDepartment_NAME string
	Triages                   []Triage `grom:"foreignKey:IPD_ID"`
}

type Triage struct {
	gorm.Model
	Patient_ID              *uint
	Patient                 Patient	`gorm:"references:id"`
	Disease_ID              *uint
	Disease                 Disease	`gorm:"references:id"`
	InpantientDepartment_ID *uint
	InpantientDepartment    InpantientDepartment	`gorm:"references:id"`
	Triage_COMMENT          string
	User_ID                 *uint
	User                    User		`gorm:"references:id"`
	Triage_State 		int				//หญิงเพิ่ม
	Map_Bed 			[]Map_Bed 	`gorm:"ForeignKey:Triage_ID"` //หญิงเพิ่ม
}
