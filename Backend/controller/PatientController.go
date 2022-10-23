package controller

import (
	"net/http"
	"github.com/panupongKanin/ProjectSA-arm/entity"
	"github.com/gin-gonic/gin"
)



////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////   		   controller blood_type    		  //////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// POST/Blood_types สำหรับ สร้างข้อมูล
func CreateBlood_type(c *gin.Context) {
	var Blood_type entity.Blood_type
	if err := c.ShouldBindJSON(&Blood_type); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if err := entity.DB().Create(&Blood_type).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": Blood_type})
}

// GET/Blood_types/:id
func GetBlood_type(c *gin.Context) {
	var Blood_type entity.Blood_type

	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM Blood_types WHERE id = ?", id).Find(&Blood_type).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": Blood_type})
}

// GET /Blood_types สำหรับเรียกดูข้อมูลทั้งหมด เอาไปใช้กับ combobox ใน fontend
func ListBlood_type(c *gin.Context) {
	var Blood_type []entity.Blood_type
	if err := entity.DB().Raw("SELECT * FROM Blood_types").Find(&Blood_type).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": Blood_type})
}

// PATCH /Blood_types  สำหรับการอัพเตค่า **แต่ไม่ได้ใช้ในระบบย่อยนี้**
func UpdateBlood_type(c *gin.Context) {
	var Blood_type entity.Blood_type
	if err := c.ShouldBindJSON(&Blood_type); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("id = ?", Blood_type.ID).First(&Blood_type); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Blood_type not found"})
		return
	}

	if err := entity.DB().Save(&Blood_type).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": Blood_type})
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////   		   controller Drug_Allergy    		////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// POST / สำหรับสร้างข้อมูล
func CreateDrug_Allergy(c *gin.Context) {
	var Drug_Allergy entity.Drug_Allergy
	if err := c.ShouldBindJSON(&Drug_Allergy); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := entity.DB().Create(&Drug_Allergy).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": Drug_Allergy})
}

// GET / แบบเฉพาะเจะจง
func GetDrug_Allergy(c *gin.Context) {
	var Drug_Allergy entity.Drug_Allergy

	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM drug_allergies WHERE id = ?", id).Find(&Drug_Allergy).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": Drug_Allergy})
}

// GET /ทั้งหมด
func ListDrug_Allergy(c *gin.Context) {
	var Drug_Allergy []entity.Drug_Allergy
	if err := entity.DB().Raw("SELECT * FROM drug_allergies").Find(&Drug_Allergy).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": Drug_Allergy})
}

// PATCH /สำหรับการอัพเตค่า **แต่ไม่ได้ใช้ในระบบย่อยนี้**
func UpdateDrug_Allergy(c *gin.Context) {
	var Drug_Allergy entity.Drug_Allergy
	if err := c.ShouldBindJSON(&Drug_Allergy); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("id = ?", Drug_Allergy.ID).First(&Drug_Allergy); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Drug_Allergy not found"})
		return
	}

	if err := entity.DB().Save(&Drug_Allergy).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": Drug_Allergy})
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////   		   controller Gender    		////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// POST /สำหรับสร้างข้อมูล
func CreateGender(c *gin.Context) {
	var Gender entity.Gender
	if err := c.ShouldBindJSON(&Gender); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := entity.DB().Create(&Gender).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": Gender})
}

// GET / แบบเฉพาพเจาะจง
func GetGender(c *gin.Context) {
	var Gender entity.Gender

	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM Genders WHERE id = ?", id).Find(&Gender).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": Gender})
}

// GET /
func ListGender(c *gin.Context) {
	var Gender []entity.Gender
	if err := entity.DB().Raw("SELECT * FROM Genders").Find(&Gender).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": Gender})
}

// PATCH / สำหรับการอัพเตค่า **แต่ไม่ได้ใช้ในระบบย่อยนี้**
func UpdateGender(c *gin.Context) {
	var Gender entity.Gender
	if err := c.ShouldBindJSON(&Gender); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("id = ?", Gender.ID).First(&Gender); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Gender not found"})
		return
	}

	if err := entity.DB().Save(&Gender).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": Gender})
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////  		   controller RIGHTS    		////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// POST / สำรับสร้างข้อมูล
func CreateRIGHTS(c *gin.Context) {
	var RIGHTS entity.RIGHTS
	if err := c.ShouldBindJSON(&RIGHTS); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := entity.DB().Create(&RIGHTS).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": RIGHTS})
}

// GET / แบบเฉพาะเจาะจง
func GetRIGHTS(c *gin.Context) {
	var RIGHTS entity.RIGHTS

	id := c.Param("id")
	if err := entity.DB().Preload("Owner").Raw("SELECT * FROM RIGHTS WHERE id = ?", id).Find(&RIGHTS).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": RIGHTS})
}

// GET / สำหรับเรียกดูข้อมูลทั้งหมด เอาไปใช้กับ combobox ใน fontend
func ListRIGHTS(c *gin.Context) {
	var RIGHTS []entity.RIGHTS
	if err := entity.DB().Raw("SELECT * FROM rights").Find(&RIGHTS).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": RIGHTS})
}

// PATCH /สำหรับการอัพเตค่า **แต่ไม่ได้ใช้ในระบบย่อยนี้**
func UpdateRIGHTS(c *gin.Context) {
	var RIGHTS entity.RIGHTS
	if err := c.ShouldBindJSON(&RIGHTS); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("id = ?", RIGHTS.ID).First(&RIGHTS); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "RIGHTS not found"})
		return
	}

	if err := entity.DB().Save(&RIGHTS).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": RIGHTS})
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////   		   controller PaTient    		////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// POST /patients
func CreatePatient(c *gin.Context) {
	//var User entity.User //check again come form where?
	var patient entity.Patient
	var Blood_type entity.Blood_type
	var Gender entity.Gender
	var Drug_Allergy entity.Drug_Allergy
	var RIGHTS entity.RIGHTS

	// ผลลัพธ์ที่ได้จากขั้นตอนที่ 10 จะถูก bind เข้าตัวแปร Patient
	if err := c.ShouldBindJSON(&patient); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	// : ค้นหา User ด้วย id
	// if tx := entity.DB().Where("id = ?", patient.UserID).First(&User); tx.RowsAffected == 0 {
	// 	c.JSON(http.StatusBadRequest, gin.H{"error": "User not found"})
	// 	return
	// }
	// 11: ค้นหา เพศผู้ป่วย ด้วย id
	if tx := entity.DB().Where("id = ?", patient.GenderID).First(&Gender); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Gender not found"})
		return
	}
	// 12: ค้นหา หมู่เลือดผู้ป่วย ด้วย id
	if tx := entity.DB().Where("id = ?", patient.Blood_typeID).First(&Blood_type); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Blood_type not found"})
		return
	}
	// 13: ค้นหา ยาที่ผู้ป่วยแพ้ ด้วย id
	if tx := entity.DB().Where("id = ?", patient.Drug_AllergyID).First(&Drug_Allergy); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Drug_AllergyID not found"})
		return
	}
	// 14: ค้นหา สิทธิ์การรักษา ด้วย id
	if tx := entity.DB().Where("id = ?", patient.RIGHTSID).First(&RIGHTS); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "RIGHTSID not found"})
		return
	}
	// 15: สร้างข้อมูลใน patient
	pt := entity.Patient{
		ID_Card:       patient.ID_Card,
		Patient_Name:  patient.Patient_Name,
		Date_of_Birth: patient.Date_of_Birth,
		User:          patient.User, // check again come form where?
		Gender:        Gender,
		Blood_type:    Blood_type,
		Drug_Allergy:  Drug_Allergy,
		RIGHTS:        RIGHTS,
		Addess:        patient.Addess,
		Other:         patient.Other,
	}
	// 16: บันทึก
	if err := entity.DB().Create(&pt).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": pt})

}

// GET /patient/:id
func GetPatient(c *gin.Context) {
	var patient entity.Patient
	id := c.Param("id")
	//id := 1 //for test Getpatient only
	if err := entity.DB().Preload("User").Preload("Gender").Preload("Blood_type").Preload("Drug_Allergy").Preload("RIGHTS").Raw("SELECT * FROM patients WHERE id = ?", id).Find(&patient).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": patient})
}

// GET patient
func Listpatient(c *gin.Context) {
	var patient []entity.Patient
	if err := entity.DB().Preload("User").Preload("Gender").Preload("Blood_type").Preload("Drug_Allergy").Preload("RIGHTS").Raw("SELECT * FROM patients").Find(&patient).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": patient})
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
