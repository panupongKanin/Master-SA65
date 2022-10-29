package controller

import (
	"net/http"
	"github.com/gin-gonic/gin"
	"github.com/panupongKanin/ProjectSA-arm/entity"
)

//////MEDICINE//////

func GetMedicine(c *gin.Context) {
	var GetMedicine entity.MEDICINE
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM medicine WHERE id = ?", id).Scan(&GetMedicine).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": GetMedicine})
}

func ListMedicine(c *gin.Context) {

	var medicine []entity.MEDICINE
	if err := entity.DB().Raw("SELECT * FROM medicines").Scan(&medicine).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": medicine})

}

//////WHERE//////

func GetWhere(c *gin.Context) {
	var GetWhere entity.WHERE
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM wheres WHERE id = ?", id).Scan(&GetWhere).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": GetWhere})
}

func ListWhere(c *gin.Context) {

	var where []entity.WHERE
	if err := entity.DB().Raw("SELECT * FROM wheres").Scan(&where).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": where})

}

///////BASKET////////

func CreateBasket(c *gin.Context) {

	var BASKET entity.BASKET
	var WHERE entity.WHERE
	var user entity.User
	var MEDICINE entity.MEDICINE
	var Symptom entity.Symptom

	// ผลลัพธ์ที่ได้จะถูกแปลง structure ให้ golang อ่านได้
		if err := c.ShouldBindJSON(&BASKET); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	//ค้นหา Where ด้วย id
	if tx := entity.DB().Where("id = ?", BASKET.WHERE_ID).First(&WHERE); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "WHERE not found"})
		return
	}

	if tx := entity.DB().Where("id = ?", BASKET.MEDICINE_ID).First(&MEDICINE); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "bed not found"})
		return
	}

	if tx := entity.DB().Where("id = ?", BASKET.User_ID).First(&user); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "user not found"})
		return
	}

	if tx := entity.DB().Where("id = ?", BASKET.Symptom_ID).First(&Symptom); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "user not found"})
		return
	}

	// สร้างข้อมูลใน BASKET
	mb := entity.BASKET{
		Amount:      BASKET.Amount,
		Add_time:    BASKET.Add_time,
		WHERE_ID:    BASKET.WHERE_ID,
		MEDICINE_ID: BASKET.MEDICINE_ID,
		Symptom_ID:  BASKET.Symptom_ID,
		User_ID:     BASKET.User_ID,
	}

	// 15: บันทึก
	if err := entity.DB().Create(&mb).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": mb})

}

func GetBasket(c *gin.Context) {
	var GetBasket entity.BASKET
	id := c.Param("id")
	if err := entity.DB().Preload("DOCTOR").Preload("MEDICINE").Preload("WHERE").Preload("Symtom").Raw("SELECT * FROM baskets WHERE id = ?", id).Find(&GetBasket).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": GetBasket})
}

func ListBasket(c *gin.Context) {

	var basket []entity.BASKET
	if err := entity.DB().Raw("SELECT * FROM baskets").Find(&basket).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": basket})

}
