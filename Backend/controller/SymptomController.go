package controller

import (
	"github.com/gin-gonic/gin"
	"github.com/panupongKanin/ProjectSA-arm/entity"
	"net/http"
)

func CreateLevel(c *gin.Context) {

	var level entity.Level
	if err := c.ShouldBindJSON(&level); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if err := entity.DB().Create(&level).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": level})

}

func GetLevel(c *gin.Context) {

	var level entity.Level
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM levels WHERE id = ?", id).Scan(&level).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": level})

}

func ListLevel(c *gin.Context) {

	var levels []entity.Level
	if err := entity.DB().Raw("SELECT * FROM levels").Scan(&levels).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": levels})

}

func CreateSymptom(c *gin.Context) {

	var user entity.User
	var level entity.Level
	var mapbed entity.Map_Bed
	var symptom entity.Symptom

	// ผลลัพธ์ที่ได้จากขั้นตอนที่ 8 จะถูก bind เข้าตัวแปร symptom
	if err := c.ShouldBindJSON(&symptom); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// 9: ค้นหา map_bed ด้วย id
	if tx := entity.DB().Where("id = ?", symptom.MapbID).First(&mapbed); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "map bed not found"})
		return
	}

	// 10: ค้นหา user ด้วย id
	if tx := entity.DB().Where("id = ?", symptom.CheckID).First(&user); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "user not found"})
		return
	}

	// 11: ค้นหา level ด้วย id
	if tx := entity.DB().Where("id = ?", symptom.LevelID).First(&level); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "level not found"})
		return
	}

	// 12: สร้าง Symptom
	s := entity.Symptom{
		Check_date:  symptom.Check_date, // ตั้งค่าฟิลด์ check_date
		Temperature: symptom.Temperature,
		Pressure:    symptom.Pressure,
		Heart_rate:  symptom.Heart_rate,
		Comment:     symptom.Comment,
		Medicine:    symptom.Medicine,
		Check:       user,   // โยงความสัมพันธ์กับ Entity User
		Level:       level,  // โยงความสัมพันธ์กับ Entity Level
		MapbID: symptom.MapbID, // โยงความสัมพันธ์กับ Entity Map_Bed
	}

	// 13: บันทึก
	if err := entity.DB().Create(&s).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": s})

}

func GetSymptom(c *gin.Context) {

	var symptom entity.Symptom
	id := c.Param("id")
	if err := entity.DB().Preload("Mapb.Triage.Patient.Gender").Preload("Mapb.Bed.Zone").Preload("Mapb.Triage.Disease.DiseaseType").Preload("Mapb.Triage.InpantientDepartment").Raw("SELECT * FROM users WHERE id = ?", id).Scan(&symptom).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": symptom})

}

func ListSymptom(c *gin.Context) {

	var symptoms []entity.Symptom

	if err := entity.DB().Preload("Mapb.Triage.Patient.Gender").Preload("Mapb.Bed.Zone").Preload("Mapb.Triage.Disease.DiseaseType").Preload("Mapb.Triage.InpantientDepartment").Raw("SELECT * FROM symptoms").Find(&symptoms).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
     }
     c.JSON(http.StatusOK, gin.H{"data": symptoms})

	c.JSON(http.StatusOK, gin.H{"data": symptoms})

}
