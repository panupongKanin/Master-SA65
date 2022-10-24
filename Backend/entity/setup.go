package entity

import (
	"context"
	"fmt"
	"time"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
)
var db *gorm.DB

func DB() *gorm.DB {
	return db
}

type SqlLogger struct {
	logger.Interface
}

func (l SqlLogger) Trace(ctx context.Context, begin time.Time, fc func() (sql string, rowsAffected int64), err error) {
	sql, _ := fc()
	fmt.Printf("%v\n=============================\n", sql)
}


func SetupDatabase() {
  database, err := gorm.Open(sqlite.Open("sa-65.db"), &gorm.Config{
    Logger: SqlLogger{},
  })
	if err != nil {
		panic("failed to connect database")
	}

	// Migrate the schema
	database.AutoMigrate(
		
		
		
		
		&User{},
		&UserType{},

		// 01 
		&Gender{},
		&Blood_type{},
		&Drug_Allergy{},
		&RIGHTS{},
		&Patient{},

		// 02 
		&DiseaseType{},
		&Disease{},
		&InpantientDepartment{},
		&Triage{},

		// 03 
      	&Bed{},
    		&Zone{},
		&Map_Bed{},

		// 04 ระบบติดตามอาการผู้ป่วย 
		&Level{},
		&Symptom{},

		// 05 ระบบโภชนาการ
		&Manage{},
		&Nutrition{},

	)

	//TODO 05 Manage
	database.Create(&Nutrition{Type: "กำหนดเอง",Receive: 0, Detail: "มีการจัดโภชนาการตามแพทย์เห็นสมควร"})
	database.Create(&Nutrition{Type: "อาหารอ่อน, นิ่ม",Receive: 2000, Detail: "ข้าวต้ม, นม, มะม่าง"})
	database.Create(&Nutrition{Type: "อาหารที่มีการเคี๊ยวหน่อย",Receive: 2200, Detail: "ไข่ต้ม, แตงกวา, ข้าวผัด, นม, มะม่วง"})
	//add data 01 (add_patient)
	//เปิดใช้งานเฉพาระตอนที่ในฐานข้อมูลว่างเปล่า เพราะจะทำการบันทึกซ้ำ
	//ใส่ข้อมูลที่เป็นข้อมูลที่ไม่เปลี่ยนแปลง
	// //ตาราง หมู่เลือดs
	// database.Create(&Blood_type{Blood_Name: "A"})
	// database.Create(&Blood_type{Blood_Name: "B"})
	// database.Create(&Blood_type{Blood_Name: "O"})
	// database.Create(&Blood_type{Blood_Name: "AB"})
	// database.Create(&Blood_type{Blood_Name: "อื่น ๆ โปรดกรอกในช่องข้อมูลเพิ่มเติม"})
	// //ตาราง เพศ
	// database.Create(&Gender{Gender_Name: "ชาย"})
	// database.Create(&Gender{Gender_Name: "หญิง"})
	// //ตาราง ข้อมูลการแพ้ยา
	// database.Create(&Drug_Allergy{Drug_Name: "ไม่เคยแพ้ยา", Drug_Group: "-"})
	// database.Create(&Drug_Allergy{Drug_Name: "Paracetamol ", Drug_Group: "ยาระงับปวดและลดไข้"})
	// database.Create(&Drug_Allergy{Drug_Name: "Penicillin  ", Drug_Group: "ยาปฏิชีวนะ"})
	// database.Create(&Drug_Allergy{Drug_Name: "NSAIDs ", Drug_Group: "ยาแก้อักเสบ"})
	// database.Create(&Drug_Allergy{Drug_Name: "Carbamazepine ", Drug_Group: "ยากันชัก"})
	// database.Create(&Drug_Allergy{Drug_Name: "อื่น ๆ โปรดกรอกในช่องข้อมูลเพิ่มเติม", Drug_Group: "-"})
	// //ตาราง สิทธิ์การรักษาพยาบาล
	// database.Create(&RIGHTS{RIGHTS_Name: "ผู้ป่วยทั่วไปที่ไม่มีสิทธิ์การรักษาพยาบาล"})
	// database.Create(&RIGHTS{RIGHTS_Name: "สิทธิ์ข้าราชการ"})
	// database.Create(&RIGHTS{RIGHTS_Name: "สิทธิ์บัตรทอง"})
	// database.Create(&RIGHTS{RIGHTS_Name: "สิทธิ์ประกันสังคม"})
	// database.Create(&RIGHTS{RIGHTS_Name: "สิทธิ์องค์กรคู่สัญญา"})
	// database.Create(&RIGHTS{RIGHTS_Name: "ผู้ป่วยที่ถือบัตรประกันสุขภาพ"})
	// database.Create(&RIGHTS{RIGHTS_Name: "อื่น ๆ โปรดกรอกในช่องข้อมูลเพิ่มเติม"})
	// database.Create(&UserType{UserType:"พยาบาล"})
	// database.Create(&UserType{UserType:"หมอ"})

	// เพิ่มข้อมูลตาราง Level
	// database.Create(&Level{Level_name: "Better"})
	// database.Create(&Level{Level_name: "Stable"})
	// database.Create(&Level{Level_name: "Worse"})
  db = database
  

}