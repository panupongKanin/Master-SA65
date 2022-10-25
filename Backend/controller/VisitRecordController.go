package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/panupongKanin/ProjectSA-arm/entity"
)

// POST /visitrecord
func CreateVisitRecord(c *gin.Context) {

	var visitrecord entity.VisitRecord
	var visitortype entity.VisitorType
	var map_bed entity.Map_Bed
	var user entity.User

	// ผลลัพธ์ที่ได้จากขั้นตอนที่ 7 จะถูก bind เข้าตัวแปร visitrecord
	if err := c.ShouldBindJSON(&visitrecord); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// 8: ค้นหา visitortype ด้วย id
	if tx := entity.DB().Where("id = ?", visitrecord.VisitorTypeID).First(&visitortype); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "visitor_type not found"})
		return
	}

	// 9: ค้นหา map_bed ด้วย id
	if tx := entity.DB().Where("id = ?", visitrecord.Map_BedID).First(&map_bed); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "map_bed not found"})
		return
	}

	// 10: ค้นหา user ด้วย id
	if tx := entity.DB().Where("id = ?", visitrecord.UserID).First(&user); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "user not found"})
		return
	}
	// 11: สร้าง VisitRecord
	vr := entity.VisitRecord{
		VisitorTypeID:   visitrecord.VisitorTypeID, // โยงความสัมพันธ์กับ Entity VisitorType
		Map_BedID:       visitrecord.Map_BedID,     // โยงความสัมพันธ์กับ Entity Map_Bed
		UserID:          visitrecord.UserID,        // โยงความสัมพันธ์กับ Entity User
		Added_Time:      visitrecord.Added_Time,    // ตั้งค่าฟิลด์ Added_Time
		Visitor_Name:    visitrecord.Visitor_Name,
		Visitor_Contact: visitrecord.Visitor_Contact,
	}

	// 12: บันทึก
	if err := entity.DB().Create(&vr).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusCreated, gin.H{"data": vr})
}

// GET /visitrecord/:id
func GetVisitRecord(c *gin.Context) {
	var visitrecord entity.VisitRecord
	id := c.Param("id")
	if tx := entity.DB().Where("id = ?", id).First(&visitrecord); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "visit_record not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": visitrecord})
}

// GET /visitrecord
func ListVisitRecords(c *gin.Context) {
	var visitrecord []entity.VisitRecord
	if err := entity.DB().Raw("SELECT * FROM visit_records").Find(&visitrecord).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": visitrecord})
}

// // PATCH /visitrecord
// func UpdateVisitRecord(c *gin.Context) {
// 	var visitrecord entity.VisitRecord
// 	if err := c.ShouldBindJSON(&visitrecord); err != nil {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
// 		return
// 	}

// 	if tx := entity.DB().Where("id = ?", visitrecord.ID).First(&visitrecord); tx.RowsAffected == 0 {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": "visitrecord not found"})
// 		return
// 	}

// 	if err := entity.DB().Save(&visitrecord).Error; err != nil {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
// 		return
// 	}

// 	c.JSON(http.StatusOK, gin.H{"data": visitrecord})
// }

// POST /visitortypes
func CreateVisitorType(c *gin.Context) {
	var visitortype entity.VisitorType
	if err := c.ShouldBindJSON(&visitortype); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := entity.DB().Create(&visitortype).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": visitortype})
}

// GET /visitortype/:id
func GetVisitorType(c *gin.Context) {
	var visitortype entity.VisitorType

	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM VisitorTypes WHERE id = ?", id).Find(&visitortype).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": visitortype})
}

// GET / visitortype
func ListVisitorTypes(c *gin.Context) {
	var visitortypes []entity.VisitorType
	if err := entity.DB().Raw("SELECT * FROM visitor_types").Find(&visitortypes).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": visitortypes})
}

// // PATCH / สำหรับการอัพเดตค่า **แต่ไม่ได้ใช้ในระบบย่อยนี้**
// func UpdateVisitorType(c *gin.Context) {
// 	var visitortype entity.VisitorType
// 	if err := c.ShouldBindJSON(&visitortype); err != nil {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
// 		return
// 	}

// 	if tx := entity.DB().Where("id = ?", visitortype.ID).First(&visitortype); tx.RowsAffected == 0 {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": "VisitorType not found"})
// 		return
// 	}

// 	if err := entity.DB().Save(&visitortype).Error; err != nil {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
// 		return
// 	}

// 	c.JSON(http.StatusOK, gin.H{"data": visitortype})
// }
