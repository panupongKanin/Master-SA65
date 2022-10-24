package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/panupongKanin/ProjectSA-arm/entity"
)

//TODO========================Manage========================//
// POST/ manage
func CreateManage (c *gin.Context){
	var manage entity.Manage //สังเกตว่า ไม่มี [] เพราะอะไรไปหาคำตอบมา => []index ไม่มีก็แปลว่าไม่ใช่ index
	var user entity.User
	var nutrition entity.Nutrition
	var map_bed entity.Map_Bed

	// bind into manage
	if err := c.ShouldBindJSON(&manage); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error":err.Error()})
		return
	}

	// ค้นหา doctor ด้วย id เวลาทำจริงตรงนี้ต้องคิดใหม่เพราะว่า Doctor ระบบเราไม่ต้องค้น
	if tx := entity.DB().Where("id = ?", manage.User_ID).First(&user); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error":"doctor not found"})
		return
	}
	// ค้นหา nutrition ด้วย id
	if tx := entity.DB().Where("id = ?", manage.NutritionID).First(&nutrition); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error":"nutrition not found"})
		return
	}
	// ค้นหา map_bed ด้วย id
	if tx := entity.DB().Where("id = ?", manage.Map_BedID).First(&map_bed); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error":"map_bed not found"})
		return
	}

	//สร้าง Manage // TODO มีการเปลี่ยนแปลง
	ma := entity.Manage{
		User_ID: manage.User_ID,
		NutritionID: manage.NutritionID,
		Map_BedID: manage.Map_BedID,
		Date: manage.Date, // setค่าจาก Field 
		Comment: manage.Comment, //เพิ่ม String จาก Text Field


		// User: user,
		// Nutrition: nutrition,
		// Map_Bed: map_bed,
		// Date: manage.Date, // setค่าจาก Field 
		// Comment: manage.Comment, //เพิ่ม String จาก Text Field
	}

	//บันทึก
	if err := entity.DB().Create(&ma).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error":err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data":ma})
}

// GET/ manages
func ListManage (c *gin.Context){
	var manages []entity.Manage 
	
	if err := entity.DB().Preload("Doctor").Preload("Nutrition").Preload("Map_Bed").Raw("SELECT * FROM manages").Find(&manages).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error":err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data":manages})
	
}

//TODO========================Nutrition========================//
// GET /nutritions
func ListNutritions (c *gin.Context){
	var nutritions []entity.Nutrition
	if err := entity.DB().Raw("SELECT * FROM nutritions").Scan(&nutritions).Error; err!=nil{
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data":nutritions})
}

// GET /nutrition/:id
func GetNutrition (c *gin.Context){
	var nutrition []entity.Nutrition
	id := c.Param("id")
	if tx := entity.DB().Where("id = ?", id).First(&nutrition); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error":"Nutrition not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data":nutrition})

}

